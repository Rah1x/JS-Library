/**
Fancy Alert, (using fancybox jquery).
Ver 1.2
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

function fancyAlert(ttl, msg) {
    jQuery.fancybox({
        modal: true,
        'wrapCSS': 'fbox_pop_'+ttl,
        'content' : "<div class=\"popup_bdy pop_slim pop_tp_"+ttl+"\" style=\"max-width:500px;\"><div class='header2 hdx'><div class='head_ttles'>"+ttl+"</div></div><div class=\"fields-comp content\"><div class='lbl'>"+msg+"</div> <div style=\"clear: both;\"></div> <div class=\"btn_lst\"><input type=\"button\" class=\"blue_btn\" value=\"Ok\" style=\"width:80px; display:inline-block;\" onclick=\"jQuery.fancybox.close();\" /></div><div style=\"clear: both;\"></div></div></div>"
    });
}

/** callback is optional **/
function fancyConfirm(msg, callback) {
    var ret;
    jQuery.fancybox({
        modal : true,

        content : "<div class=\"popup_bdy pop_slim\" style=\"max-width:500px;\"><div class='header2 hdx'><div class='head_ttles'>Confirm</div></div><div class=\"fields-comp content\"><div class='lbl'>"+msg+"</div> <div style=\"clear: both;\"></div> <div class=\"btn_lst\"><input type=\"button\" class=\"blue_btn\" id=\"fancyConfirm_cancel\" value=\"No\" style=\"width:60px; display:inline-block;\">&nbsp;<input type=\"button\" class=\"blue_btn\" id=\"fancyConfirm_ok\" value=\"Yes\" style=\"width:60px; display:inline-block;\"></div><div style=\"clear: both;\"></div></div></div>",

        afterShow : function(current, previous) {
            $("#fancyConfirm_cancel").click(function() {
                //alert('x');
                ret = false;
                jQuery.fancybox.close();
            });

            $("#fancyConfirm_ok").click(function() {
                ret = true;
                jQuery.fancybox.close();
            });
        },

        beforeClose : function() {
            if(typeof(callback)!='undefined')
            callback.call(this, ret);
        }
    });
}

function fancyConfirm_text() {
    fancyConfirm("Ceci est un test", function(ret) {
        alert(ret)
    })
}