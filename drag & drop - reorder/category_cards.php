<?php
//var_dump($_POST);
if(isset($_POST['todo']) && ($_POST['todo']=='del'))
{
    if($_POST['p_id']!='')
    {
        $res = false;
        $res = mysql_exec("delete from brh_products where p_id='{$_POST['p_id']}'", 'save');

        if($res!=false){
        echo "<script>alert('The Card was successfully Deleted.');</script>";
        } else {
        echo "<script>alert('ERROR deleting the selected Card !!');</script>";
        }
    }
}//end del.....

if(isset($_POST['todo']) && ($_POST['todo']=='status'))
{
    if($_POST['p_id']!='')
    {
        $res = false;
        $res = mysql_exec("update brh_products set prod_status={$_POST['op1']} where p_id='{$_POST['p_id']}'", 'save');

        if($res!=false){
        echo "<script>alert('The Status was successfully updated.');</script>";
        } else {
        echo "<script>alert('ERROR updating the selected Card !!');</script>";
        }
    }
}//end del.....

if(isset($_POST['todo']) && ($_POST['todo']=='sort'))
{
    if(stristr($_POST['op1'], 'c_id')!=false)
    {
        # category id
        $c_id_t = explode(':', $_POST['op1']);
        $c_id = $c_id_t[1];

        # sub cat id
        $sc_id = 0;
        if($_POST['op2']!=''){
        $sc_id_t = explode(':', $_POST['op2']);
        $sc_id = $sc_id_t[1];
        }

        $sort_data = $_POST['op3'];
        $sort_data = str_replace('p[]', '$p[]', $sort_data);
        $sort_data = str_replace('d', "'", $sort_data);
        $sort_data = str_replace('&', "';", $sort_data);
        $sort_data .="';";

        $res = false;
        if(strlen($sort_data)>=5)
        {
            $p=array();
            eval($sort_data);
            if(count($p)>0)
            {

                $p_cnt = count($p);
                $pos = $p_cnt;

                function c_map($a){
                global $p, $pos;
                $r = $a;
                $r_t = explode('_', $a);

                $ret = array('id'=>$r_t[0], 'pos'=>$pos--);
                return $ret;
                }

                $p2 = array_map('c_map', $p);
                $query_up = "INSERT INTO brh_products (p_id, prod_sort_order) VALUES ";

                $qr_tmp = ''; $l = 0;
                foreach($p2 as $v)
                {
                    $qr_tmp .= "('{$v['id']}','{$v['pos']}')";

                    if(($l+1)<count($p2))
                    $qr_tmp .= ',';

                    $l++;
                }

                $query_up .= $qr_tmp." ON DUPLICATE KEY UPDATE p_id=VALUES(p_id), prod_sort_order=VALUES(prod_sort_order)";
                //var_dump($p_cnt, $query_up); die();

                if($qr_tmp!='')
                $res = mysql_exec($query_up, 'save');
                //die(mysql_error());
            }
        }

        if($res!=false){
        echo "<script>alert('The cards have been successfully re-arranged.');</script>";
        } else {
        echo "<script>alert('ERROR updating the selected Category !!');</script>";
        }
    }
}//end sort.....
//////////////////////////////////////////////////////////////////////

$where = '';
if($cat['c_id']==4)
{
    $where = "and p.iscalendar='1'";
}

if(isset($_GET['sub_id']))
$cards_qry = "select * from brh_products as p where p.prod_category='{$cat['c_id']}' and p.prod_subcategory='{$cat['sc_id']}' {$where} order by prod_sort_order desc";
else
$cards_qry = "select * from brh_products as p where p.prod_category='{$cat['c_id']}' {$where} order by prod_sort_order desc";
$cards = mysql_exec($cards_qry);
//echo $cards_qry;

$sc_id_dx = 0;
if(isset($cat['sc_id']))
$sc_id_dx = $cat['sc_id'];

if($cards){
$i=1;
?>
<style>
.col_st{
min-width:151px;
<?php
if(stristr($browser, 'msie')!=false)
    echo "style=\"width:expression(this.width<141? 141:'auto' + 'px');\"";
else if(stristr($browser, 'safari')!=false)
    echo "width:151px;";
?>
}
</style>


<div style="display:none;">
<form action="" method="post" id="card_form">
<input type="hidden" name="todo" value="">
<input type="hidden" name="p_id" value="">
<input type="hidden" name="op1" value="">
<input type="hidden" name="op2" value="">
<input type="hidden" name="op3" value="">
</form></div>

<div id="page_desc" style="height:26px;">The folowing are the cards in the <?php echo $cat_title; ?> category. Move mouse over the images to see the action links. Drag to reOrder.</div>

<div id="message" style="display:none;"></div>

<div id="sort_btn1" style="display:none; height:26px;">
<input type="button" value="Save Sort Order" class="btn_x" onclick="save('card_form', '<?php echo $cat['c_id']; ?>', '<?php echo $sc_id_dx; ?>')" style="width:140px;"></div>
<br />

<div id="drag">
<table cellpadding=0 cellspacing=0 id="table1">

<colgroup class="col_st">
<col class="col_st"/>
<col class="col_st"/>
<col class="col_st"/>
<col class="col_st"/>
<col class="col_st"/>
</colgroup>

<tr>
<?php
foreach($cards as $v)
{
    ## Number
    $card_number = $v['prod_image'];
    $c_t1 = explode('.', $card_number);
    $card_number = cut_str($c_t1[0], 15);

    ## Name
    $card_name2 = '';
    $card_name = format_str($v['prod_name']);
    if($card_name!='')
    $card_name2 = '<b>'.str_replace(' ', '&nbsp;', cut_str($card_name, 15)).'</b><br />';

    ##Status
    $status='active';
    if($v['prod_status']==0){
    $status='deactive';
    $new_status = 1;
    }else{
    $new_status = 0;
    }

    echo "<td style='padding:0px; width:1px;' valign=top>";
    echo "<div id=\"d{$v['p_id']}\" class=\"drag t1\" style=\"border:none !important;\">";
    echo "<div style='padding:0 15px 30px 0; font-size:10px;' onmouseover=\"toogle_div('del_div_', '{$i}'); toogle_div('edit_div_', '{$i}'); toogle_div('status_div_', '{$i}');\" onmouseout=\"toogle_div('del_div_', '0'); toogle_div('edit_div_', '0'); toogle_div('status_div_', '0');\">";

        echo "<div id='del_div_{$i}' style='display:none; position:absolute; z-index:2; margin:3px;'><img src=\"images/del.png\" style='cursor:pointer;' onclick=\"form_it('del', '{$v['p_id']}', '{$card_number}');\" title=\"Click here to Delete\"></div>";
        echo "<div id='edit_div_{$i}' style='display:none; position:absolute; z-index:2; margin:4px 3px 3px 25px;'><img src=\"images/edit2.png\" style='cursor:pointer;' onclick=\"location.href='edit_products.php?{$qr_x}card={$card_number}&pid={$v['p_id']}';\" title=\"Click here to Edit\"></div>";
        echo "<div id='status_div_{$i}' style='display:none; position:absolute; z-index:2; margin:5px 3px 3px 45px;'><img src=\"images/toogle.png\" style='cursor:pointer;' onclick=\"form_it('status', '{$v['p_id']}', '{$card_number}', '{$new_status}');\" title=\"Click here to Toggle Status\"></div>";

        echo "<img src=\"../images/cards/{$v['prod_image_small']}\" style=\"max-height:300px; max-width:150px; ";
        if(stristr($browser, 'msie')!=false) echo "width:expression(this.width>140? 140:'auto' + 'px'); height:expression(this.height>300? 300:'auto' + 'px');";
        echo "\" border=0 title=\"{$card_name}\">";
        echo "<br />{$card_name2}";
        echo "<img src=\"images/{$status}.png\" style=\"margin-bottom:-5px; margin-left:-3px;\">{$card_number}";
        //echo "<br />{$v['p_id']}";

    echo "</div>";
    echo "</div>";
    echo "</td>";

    if($i%5==0)
    echo "</tr><tr>";

    $i++;
}//end foreach...
?>
</tr></table></div>

<div id="sort_btn2" style="display:none;">
<input type="button" value="Save Sort Order" class="btn_x" onclick="save('card_form', '<?php echo $cat['c_id']; ?>', '<?php echo $sc_id_dx; ?>')" style="width:140px;"></div><br />

<style>
.drag{border:none !important};
</style>
<?php
}
else
{
    echo "There are no cards in this category !!";
}
?>

<script type="text/javascript" language="javascript">
var total = <?php echo $i--; ?>;
function toogle_div(div_i, cur)
{
    for(ii=1; ii<=total; ii++)
    {
        var d = document.getElementById(div_i+''+ii);

        if(d!=null)
        d.style.display='none';
    }//end for...

    var c = document.getElementById(div_i+''+cur);

    if(c!=null)
    c.style.display='';

}//end func....


function form_it(type, id, card, op_1)
{
    if(type=='del')
    {
        var conf = false;
        conf = confirm('You are about to DELETE this card ['+card+']. Click OK if you are sure.');

        if(conf==true)
        {
            form = document.getElementById('card_form');
            form.todo.value=type;
            form.p_id.value=id;
            form.submit();
        }
    }
    else if(type=='status')
    {
        form = document.getElementById('card_form');
        form.todo.value=type;
        form.p_id.value=id;
        form.op1.value=op_1;
        form.submit();
    }

}//end func....

//load_x();
</script>