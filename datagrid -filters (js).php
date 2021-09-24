        </div>
        </div>
        </div>
        </section>

    </div>
    </div>
    </section>
    </div>
    <?php include('segment/footer.php'); ?>
</div>

<?php
///////// JQUERY Grid ////////////////////////////////////////
if(isset($grid_page)) { ?>

<style>
table.dataTable thead th, table.dataTable thead td {
border-bottom:none;
padding: 5px 10px;
}
</style>

<script src="<?=$consts['ROOT']?>bootstrap/js/bootstrap.min.js"></script>
<script src="<?=$consts['ROOT']?>plugins/datatables/jquery.dataTables.min.js"></script>
<script src="<?=$consts['ROOT']?>plugins/datatables/dataTables.bootstrap.min.js"></script>
<script src="<?=$consts['ROOT']?>plugins/slimScroll/jquery.slimscroll.min.js"></script>
<script src="<?=$consts['ROOT']?>plugins/fastclick/fastclick.js"></script>
<script src="<?=$consts['ROOT']?>dist/js/app.min.js"></script>
<script src="<?=$consts['ROOT']?>dist/js/demo.js"></script>

<?php if(isset($column_filters)) { ?>
<style>
tfoot {
    display: table-header-group;
}

#grid_table_filter {
    display:none;
}
</style>
<?php } ?>

<script>
function convertDate(date)
{
    var dateTimeParts = date.split(' ');

    // # this assumes time format HAS SPACE between time and am/pm marks.
    if(dateTimeParts[2] != undefined){
    dateTimeParts[1]+=dateTimeParts[2];
    }

    var theTime = dateTimeParts[1];
    var ampm = theTime.replace(/[0-9:]/g,'').trim();
    var time = theTime.replace(/[[^a-zA-Z]/g,'').trim();

    if(ampm == 'pm')
    {
        time_comp = time.split(':');

        // # if time is 12:00, don't add 12
        if(time[0] == 12) {
            time = parseInt(time_comp[0]) + ':' + time_comp[1];
        } else {
            time = (parseInt(time_comp[0])+12) + ':' + time_comp[1];
        }
    }

    time = time+':00';
    var dt_comp = dateTimeParts[0].split("/").reverse();

    var date = new Date(dt_comp.join('-')+'T'+time.trim()+'Z');
    //console.log(dt_comp, time, ampm, date);

    return date;

}//end func...

////////////////////---------------------------------------------

$(document).ready(function(){

<?php if(isset($range_filters) && isset($range_field)) { ?>
$.range_ts_1 = $.range_ts_2 = 0;

$.fn.dataTable.ext.search.push(
function(settings, data, dataIndex)
{
    if(isNaN( $.range_ts_1 )) $.range_ts_1 = 0;
    if(isNaN( $.range_ts_2 )) $.range_ts_2 = 0;

    if($.range_ts_1<=0 && $.range_ts_2<=0){return true;} //range not set

    var row_val = data[<?=$range_field?>];
    var date_ts = parseInt(convertDate(row_val).getTime());
    if(date_ts<=0) {return true;}

    //console.log(date_ts, $.range_ts_1, $.range_ts_2);
    //if(date_ts>=$.range_ts_1 && date_ts<=$.range_ts_2){

    if(($.range_ts_1<=0 && date_ts<=$.range_ts_2) ||
    (date_ts>=$.range_ts_1 && $.range_ts_2<=0) ||
    (date_ts>=$.range_ts_1 && date_ts<=$.range_ts_2))
    {
        return true;
    }

    return false;
});
<?php } ?>

$(function () {
$("#grid_table").DataTable({
    pageLength: 50,
    //order: []

    <?php if(isset($column_filters)) { ?>

    initComplete: function()
    {
        this.api().columns().every(function()
        {
            //console.log(this.nodes());

            var filter_me = $(this.header()).data('filter'); //see booking.php for example
            if(typeof(filter_me)!='undefined')
            {
                var col = this;
                var col_cells = col.nodes().to$();
                var filter_row = col_cells[0];
                var filter_row = $(col.footer());

                if(filter_me=='select')
                {
                    var select = $('<select><option value="">select -</option></select>');

                    select.appendTo(filter_row)
                    .on('change', function(){
                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                        col.search(val ? '^'+val+'$' : '', true, false).draw();
                    });

                    col.data().unique().sort().each( function ( d, j )
                    {
                        if(d!=''){
                        //var d_lbl = (j==0 && d=='')? 'select -':d;
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                        }
                    });
                }
                else if(filter_me=='text')
                {
                    var txt_fld = $('<input type="text" placeholder="type to search" />');

                    txt_fld.appendTo(filter_row)
                    .on('keyup change', function()
                    {
                        if(col.search() !== this.value){
                        col.search(this.value).draw();
                        }
                    });
                }
                else if(filter_me=='select_arr')
                {
                    var select = $('<select><option value="">select -</option></select>');
                    var val_arr = $(this.header()).data('vals').split('|');

                    if(typeof(val_arr)=='object' && val_arr.length>0)
                    {
                        select.appendTo(filter_row)
                        .on('change', function()
                        {
                            var val = $.fn.dataTable.util.escapeRegex($(this).val());
                            //var rgx = '/title=\\"'+val+'\\"/ims';
                            col.search(val ? val:'', true, false, true).draw();
                        });

                        for(s in val_arr)
                        {
                            select.append( '<option value="'+val_arr[s]+'">'+val_arr[s]+'</option>' );
                        }
                    }
                }
                else if(filter_me=='date')
                {
                    var date_filter = $('<input class="datepicker_filter" type="text" placeholder="pick -" style="max-width:150px" />');
                    date_filter.appendTo(filter_row);

                    date_filter.datepicker({
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: 'dd/mm/y',

                        onSelect: function(dateText, inst) {
                            if(dateText!=''){
                                col.search(dateText, true, false, true).draw();
                            }
                        },

                        onClose: function(dateText, inst)
                        {
                            if(dateText==''){
                                col.search('', true, false, true).draw();
                            }
                        }
                    });
                }
                else if(filter_me=='date_range')
                {
                    var date_range_1 = $('<input class="datepicker_filter" type="text" placeholder="pick from -" style="max-width:150px;" /><br />');
                    date_range_1.appendTo(filter_row);

                    date_range_1.datepicker({
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: 'dd/mm/yy',

                        onSelect: function(dateText, inst) {
                            if(dateText!='')
                            {
                                var date_ts = parseInt(new Date(dateText.split("/").reverse().join("-")+'T00:00:00Z').getTime()); //console.log(date_ts);
                                if(date_ts<=0){return false;}

                                $.range_ts_1 = date_ts;
                                col.draw();
                            }
                        },

                        onClose: function(dateText, inst)
                        {
                            if(dateText==''){
                                $.range_ts_1 = 0;
                                col.draw();
                            }
                        }

                    });

                    var date_range_2 = $('<input class="datepicker_filter" type="text" placeholder="pick to -" style="max-width:150px; margin-top:3px;" />');
                    date_range_2.appendTo(filter_row);

                    date_range_2.datepicker({
                        changeMonth: true,
                        changeYear: true,
                        dateFormat: 'dd/mm/yy',

                        onSelect: function(dateText, inst)
                        {
                            if(dateText!='')
                            {
                                var date_ts = parseInt(new Date(dateText.split("/").reverse().join("-")+'T00:00:00Z').getTime()); //console.log(date_ts);
                                if(date_ts<=0){return false;}

                                $.range_ts_2 = date_ts;
                                col.draw();
                            }
                        },

                        onClose: function(dateText, inst)
                        {
                            if(dateText==''){
                                $.range_ts_2 = 0;
                                col.draw();
                            }
                        }
                    });
                }//*/
            }
        });
    }
    <?php } ?>
});
});


<?php if(isset($column_filters)) { ?>
$('<div style="width:100%; text-align:right"><button type="button" onclick="$.clear_filters()" class="btn btn-primary">Clear Filter</button></div><br />')
.insertBefore($('.box'));

$.clear_filters = function()
{
    $('.filters').find('input,select').val('');
    //$('.datepicker_filter').datepicker('setDate', null);
    $.range_ts_1 = $.range_ts_2 = 0;
    $('#grid_table').DataTable().search('').columns().search('').draw();
}
<?php } ?>


$(".delete").click(function(){
    if(confirm('Are you sure you want to delete the selected record?')){
    document.location.href='<?=$grid_header['cur_page']?>?del_id='+$(this).attr('id');
    }
});
});
</script>
<?php } //end if grid page.... ?>

</body>
</html>