// JS equivalent of PHP's in_array
function in_array(needle, haystack, argStrict)
{
    var key = '', strict = !!argStrict;

    if (strict)
    {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else
    {
        for (key in haystack) {
            if (haystack[key] == needle) {
            return true;
            }
        }
    }
    return false;
}//end func...


function number_format (number, decimals, dec_point, thousands_sep)
{
    // Formats a number with grouped thousands
    //
    // version: 1107.2516
    // discuss at: http://phpjs.org/functions/number_format
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival
    // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +   improved by: davook
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Jay Klehr
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +      input by: Amirouche
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: number_format('1.20', 2);
    // *    returns 10: '1.20'    // *
    // *    example 11: number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: number_format('1.2000', 3);
    // *    returns 12: '1.200'
    // *    example 13: number_format('1 000,50', 2, '.', ' ');
    // *    returns 13: '100 050.00'

    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');    }
    return s.join(dec);

}///end func.........

function IsChecked(f, n, focs=true)
{
	if(f.length)
    {
        for(var i = 0; i < f.length; i++)
        {
			if(f[i].checked == true)
            {
				return true;
			}
		}

        fancyAlert('Error', n);
        if(focs) f[0].focus();
        return false;
	}
	else if(f.checked == false)
    {
        fancyAlert('Error', n);
        if(focs) f.focus();
        return false;
	}

	return true;

}///end func.........

function unformat_str(v)
{
    v = v.replace(/\&lt\;/g, '<');
    v = v.replace(/\&gt\;/g, '>');
    v = v.replace(/\&quot\;/g, '"');
    v = v.replace(/\&\#39\;/g, "'");
    v = v.replace(/\&\#x28\;/g, "(");
    v = v.replace(/\&\#x29\;/g, ")");
    v = v.replace(/\&\#92\;/g, "\\");
    return v;
}

function TrimString(sInString)
{
	sInString = sInString.replace( /^\s+/g, "" );// strip leading
	return sInString.replace( /\s+$/g, "" );// strip trailing
}//end func...


function toggle_div(caller, div_id, close_div)
{
    if(caller.checked)
    {
        document.getElementById(div_id).style.display='';

        if(typeof(close_div)!="undefined"){
        document.getElementById(close_div).style.display='none';
        }
    }
    else
    {
        document.getElementById(div_id).style.display='none';

        if(typeof(close_div)!="undefined"){
        document.getElementById(close_div).style.display='';
        }
    }

}//end func...


function select_or_add_new(c_val, c_id, else_div)
{
    if(c_val=='new')
    {
        document.getElementById(c_id+'_div').style.display='';
        document.getElementById(c_id).disabled=false;

        if(typeof(else_div)!='undefined'){
        document.getElementById(else_div+'_div').style.display='none';
        document.getElementById(else_div).disabled=true;
        }
    }
    else
    {
        document.getElementById(c_id+'_div').style.display='none';
        document.getElementById(c_id).disabled=true;

        if(typeof(else_div)!='undefined'){
        document.getElementById(else_div+'_div').style.display='';
        document.getElementById(else_div).disabled=false;
        }
    }

}//end func...


//#/ Scroll To Top method
function goto_top()
{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/* check if date2= > date 1 */
function compare_date(dt_1, dt_2)
{
    var date_1 = new Date(dt_1);
    var date_2 = new Date(dt_2);

    return ((date_2.getTime()>=date_1.getTime()));

}//end func..

//////////////////////////////////////////////////////////////////////////////JQuery Based

$(document).ready(function(){

$.browser_js = navigator.userAgent.toLowerCase();
$.load_x = '<img id="load_x" src="'+assets_loc+'/images/102.gif" />';

// Prevent Default
$('.prevent_def').each(function(){
$(this).click(function(event){
event.preventDefault();
});
});


//#/ Scroll To Top
$.scroll_dv = '';

//alert($.browser_js);
if($.browser_js.indexOf('safari')>=0 && $.browser_js.indexOf('chrome')<0){
document.addEventListener("touchmove", function(){$.scrollShow()});
}else{
window.onscroll = function() {$.scrollShow()};
}

$.scrollShow = function()
{
    if($.scroll_dv!=''){clearTimeout($.scroll_dv);}

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    $('.scroll_top_top').show();
    $.scroll_dv = setTimeout(function(){$('.scroll_top_top').hide();}, 2300);
    } else {
    $('.scroll_top_top').hide();
    }
}


//#/ Set grid width for overflow
$.set_grid_width = function(clas_s, cur_left)
{
    var grid_width = $(window).width();

    if(cur_left==2){ //within iframe
    grid_width = grid_width-30;
    } else if(cur_left==1){ //grid_width>460 &&
    grid_width = grid_width-250;
    } else {
    grid_width = grid_width-60;
    }

    $('.'+clas_s).css('maxWidth', (grid_width)+'px');
};


//#/ preload Images
function preload(arrayOfImages)
{
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        //(new Image()).src = this;  //Alternatively approach
    });
}


//#/ must be called from onsubmit of the form ONLY!!
$.formF1_ready = false;
$.submit_f1 = function(ready, submit_now)
{
    if($.formF1_ready==true){
    return true;
    }

    if(typeof(ready)=='undefined' && $.formF1_ready==false){
    return false;
    }

    if(typeof(submit_now)!='undefined' && submit_now==true){
    $.formF1_ready = true;
    $('#f1').submit();
    return false;
    }

    return validate_f1();

}//end func...


function validate_f1()
{
    if (IsChecked(document.f1["RecordID[]"], "Please select at least 1 record to <strong>delete</strong>!", false) == false)
    return false;

    fancyConfirm("Are you sure you want to <strong>delete</strong> the selected record(s)?\n<br /><span class='reset_cache_txt'>This is irreversible and the selected record(s) will be lost forever!</span>",
    function(ret)
    {
        if(ret==true){
        $.submit_f1(true, true);
        }
    });

    return false;
}//end func...


$.update_rec = function(rec_id)
{
    location.href=$.operation_page+$.param3+'&rec_id='+rec_id;
};//end func....

$.clear_all = function()
{
    location.href = $.cur_page+$.param_;
};//end func....

$.set_this = function(f_id, title)
{
    if(title != ''){
    var fld = document.getElementById(f_id);
    fld.value='"'+title+'"';
    filter_x(fld);
    }
};//end func....

$.move_me = function(loc, rec_id, me)
{
    if(loc=='') return false;

    if(loc.search(/fbox_/i)>=0){
        $('#'+loc).click();
        $(me).val('');
        return false;
    }

    if(loc=='update_rec'){
        $.update_rec(rec_id);
        return false;
    }

    if(loc.search(/tab#_/i)>=0){
        post_url = loc.replace('tab#_', '');
        window.open(post_url, '_blank');
        $(me).val('');
        return false;
    }

    $(me).val('');
    location.href=loc;
};

$.reset_cache = function()
{
    $('#clr_cache').val('1');
    filter_x(document.getElementById('clr_cache'));
}

//grid filters
$('.datagrid th input').keydown(function(e)
{
    //alert(e.keyCode)
    if(e.keyCode==9 && $(this).attr('type')=='number'){ //due to mobile device's numeric pad not having enter key
    filter_x(this);
    }

    if(e.keyCode==13 && ($(this).attr('type')=='text' || $(this).attr('type')=='number')){
    filter_x(this);
    }
});

$.set_multi = function(key)
{
    val_t323 = '';
    var key_ele = document.getElementById(key);

    for(i=0; i<key_ele.length; i++)
    {
        if(!key_ele[i].selected){continue;}
        val_t323+= escape(key_ele[i].value)+'|';
    }

    key = key.replace('___multi', '');
    val = val_t323;

    document.getElementById(key).value=val; //put in the hidden field
};


$.desel_sumo_multi = function(id, is_empty)
{
    if(is_empty) //already empty
    {
        $(id+' .select-all').hide();
        return false;
    }
    else
    {
        $(id+' .select-all').show();
    }

    $(id+' .select-all').addClass('selected').removeClass('partial');

    $(id+' .select-all label').html('De-Select All');
    $(id+' .select-all.selected > label').css('color', '#EA5745');
    $(id+' .select-all.selected > span i').css('background-color', '#EA5745');

    $(id+' .select-all').click(function(){
    $(this).parent().siblings('.SelectBox').find('span').html();
    $(this).hide();
    //$(id+' .btnOk').click(); //auto click
    });
};

//final processing of sumo field befor form is submitted
$.finalize_sumo_multi = function(key)
{
    var val_t323 = '';
    var key_ele = document.getElementById(key);

    for(i=0; i<key_ele.length; i++)
    {
        if(!key_ele[i].selected){continue;}
        val_t323+= escape(key_ele[i].value)+',';
    }

    key = key.replace('___multi', '');
    val = val_t323;

    document.getElementById(key).value=val; //put in the hidden field

};


/* mob menu btn */
$.mbl_menu_show = function(me)
{
    if($('#tog_it').hasClass('tog_on')){
    $(me).addClass('change');
    } else {
    $(me).removeClass('change');
    }
}
setTimeout(function(){
$.mbl_menu_show('.mobile_btn_div');
}, 1200);

$.mbl_menu = function(me)
{
    $('#tog_it').click();
    $.mbl_menu_show(me);
}


$.init_calendar = function(field_id, minDate, custom_options)
{
    if(typeof(custom_options)!='undefined')
    {
        $("#"+field_id).datepicker(custom_options);
    }
    else if(typeof(minDate)!='undefined')
    {
        $("#"+field_id).datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            minDate: minDate,
        });
    }
    else
    {
        $("#"+field_id).datepicker({
            dateFormat: "yy-mm-dd",
            changeMonth: true,
            changeYear: true,
            //maxDate: "+2D"
        });
    }

    $("#"+field_id).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
        $.datepicker._clearDate(this);
        }
    });

}//end func..


$.init_calendar_range = function(field_id, skip_to)
{
    $("#"+field_id+"_from").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        //minDate: 0,
        //maxDate: "+2D"
    });

    $("#"+field_id+"_from").keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
        $.datepicker._clearDate(this);
        }
    });


    if(typeof(skip_to)=='undefined'){
    $("#"+field_id+"_to").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        //minDate: 0,
        //maxDate: "+2D"
    });

    $("#"+field_id+"_to").keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
        $.datepicker._clearDate(this);
        }
    });
    }

}//end func..


$.blick = function (field, times)
{
    if(typeof(times)=='undefined' || times<=0){return false;}
    for(i=0; i<times; i++)
    {
        $('#'+field).show().fadeOut(200).fadeIn(200);
    }
}

///////////////////////////////////////////////////////////////////////////////

preload([
    assets_loc+'/images/admin_grid/arr_up.png',
    //assets_loc+'/images/admin_grid/arr_up_hover.png',
    assets_loc+'/images/102.gif',
    assets_loc+'/images/106.gif',
]);

});