/**
Fancy Alert, (using fancybox jquery).
Ver 1.3 (Oct 2019)
Author: Raheel Hsn

[Usage Example]
fancyAlert("Error", "Please select at least 1 Email Address to Import!");
fancyAlert("Success", "Invitation(s) were sent successfully to your selected Imports");

fancyConfirm("Are you sure you want to delete this Conversation?", function(ret){
if(ret==true){
location.href='location to take to';
}
});
*/

function fancyAlert(ttl, msg, max_width)
{
    if(typeof(max_width)=='undefined')
    max_width_d = '500px';
    else
    max_width_d = max_width+'px';

    jQuery.fancybox({
        modal: true,
        'wrapCSS': 'fbox_pop_'+ttl,
        'content' : "<div class=\"popup_bdy pop_slim pop_tp_"+ttl+"\" style=\"max-width:"+max_width_d+";\"><div class='header2 hdx'><div class='head_ttles'>"+ttl+"</div></div><div class=\"fields-comp content\"><div class='lbl'>"+msg+"</div> <div style=\"clear: both;\"></div> <div class=\"btn_lst\"><input type=\"button\" class=\"blue_btn\" value=\"Ok\" style=\"width:70px; display:inline-block;\" onclick=\"jQuery.fancybox.close();\" /></div><div style=\"clear: both;\"></div></div></div>"
    });
}

function fancyConfirm(msg, callback, heading, cancel_btn, ok_btn) {

    var heading_lbl = (heading==null)? 'Confirm':heading;
    var cancel_btn_lbl = (cancel_btn==null)? 'No':cancel_btn;
    var ok_btn_lbl = (ok_btn==null)? 'Yes':ok_btn;

    var ret;
    jQuery.fancybox({
        modal : true,
        content : "<div class=\"popup_bdy pop_slim\" style=\"max-width:500px;\"><div class='header2 hdx'><div class='head_ttles'>"+heading_lbl+"</div></div><div class=\"fields-comp content\"><div class='lbl'>"+msg+"</div> <div style=\"clear: both;\"></div><br /> <div class=\"btn_lst\"><input type=\"button\" class=\"blue_btn\" id=\"fancyConfirm_cancel\" value=\""+cancel_btn_lbl+"\" style=\"width:60px; display:inline-block;\">&nbsp;&nbsp;<input type=\"button\" class=\"blue_btn\" id=\"fancyConfirm_ok\" value=\""+ok_btn_lbl+"\" style=\"width:60px; display:inline-block;\"></div><div style=\"clear: both;\"></div></div></div>",

        afterShow : function(current, previous) {
            $("#fancyConfirm_cancel").click(function() {
                ret = false;
                jQuery.fancybox.close();
            });

            $("#fancyConfirm_ok").click(function() {
                ret = true;
                jQuery.fancybox.close();
            });
        },

        beforeClose : function() {
            cb_ret = callback.call(this, ret);
            return (cb_ret!=false);
        }
    });
}

function fancyConfirm_text() {
    fancyConfirm("Ceci est un test", function(ret) {
        alert(ret)
    })
}