function select_all(sel, fld)
{
    var chk_email_all = document.getElementsByName(fld);
    //alert(chk_email_all.length);

    for(var i=0; i<chk_email_all.length; i++)
    {
        if(chk_email_all[i].style.display!='none')
        chk_email_all[i].checked=sel;
    }

}//end func...


$(document).ready(function(){
$('.select_all').click(function(event){
    event.preventDefault();

    var cur = $(this).html();
    if(cur.search(/Select All/i)>0){
    select_all(true, del_field);
    $(this).html("&laquo;Select None&raquo;");
    }else{
    select_all(false, del_field);
    $(this).html("&laquo;Select All&raquo;");
    }
});

});


//#- [USAGE]
//#/1) del_field must be set before this script is called
//#/2) <script>var del_field='del_notif[]';</script><script type="text/javascript" src="assets/js/select_all.js"></script>