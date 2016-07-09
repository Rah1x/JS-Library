function select_all(sel, fld)
{
    var chk_all = document.getElementsByName(fld);
    for(var i=0; i<chk_all.length; i++)
    {
        if(chk_all[i].style.display!='none')
        chk_all[i].checked=sel;
    }
}//end func...

$(document).ready(function(){
$('.select_all').click(function(event){
    select_all($(this).prop('checked'), del_fieldx);
});
});

//#- [USAGE]
//#/1) del_fieldx must be set before this script is called
//#/2) `.select_all` field must be a checkbox (like in gmail)
//#/2) <script>var del_fieldx='del_notif[]';</script><script type="text/javascript" src="assets/js/select_all.js"></script>