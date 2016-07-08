$(document).ready(function(){

//** Check if Popup Is Enabled
//** [usage] $.openPopUp($.DOC_ROOT_+'popup_test.htm');

$.popup_error = function(){
    dta = "Pop-up Blocker is enabled on your Browser! Please add this site to the exception list in order to procceed.";
    if(document.getElementById('err_gdM2') != null)
    {
        $('#err_gdM2').html('<b class="red-txt">ERROR:&nbsp;&nbsp;</b> '+dta);
    }
    else
    {
        var error_html = '<div><div><div class="error" id="err_gdM2"><b class="red-txt">ERROR:&nbsp;&nbsp;</b> '+dta+'</div><br /></div></div>';
        $('.fields-imCon .first_mrk').prepend(error_html);
    }
};

$.openPopUp = function(urlToOpen) {
  var popup_window=window.open(urlToOpen,"myWindow","titlebar=no, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=1, height=1");
  try {
    popup_window.focus();
    popup_window.close();
    $.popup_error();//test
  }
  catch (e) {
    $.popup_error();
  }
};//end func....

});