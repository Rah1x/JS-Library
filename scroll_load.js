$(document).ready(function(){

/*
Scroll Load

Must Define the following variables before
$.nxt_pg
$.$tot_pg
$.pull_url
$.runx (optional) =to run any JS method on successful return
@ver = 2.0
@Author = Raheel Hasan
*/



$('#loader').spin("large", '#EF3B39'); //init loading spinner
$.stop_ld = false;
$.pull_status = true; //prevent double pull due to time delay on live server

$.load_more_x = function(){

    var urlx = $.pull_url;
    urlx = urlx.replace('{nxt_pg}', $.nxt_pg);

    if(typeof($.add_param)!='undefined')
    urlx = urlx.replace('{add_param}', $.add_param);

    //alert(urlx); return false;

    $.ajax({
    url: urlx,
    cache: false,
    })
    .done(function(msg)
    {
        if(msg!='')
        {
            $.nxt_pg++;
            $(msg).insertBefore('#last_divi_');
            $.pull_status = true;

            if(typeof($.runx)!='undefined')
            $.runx();
        }

        if((msg=='') || (($.nxt_pg)>=$.$tot_pg)) //hide & stop loader
        {
            $('#loader').css('display', 'none');
            $.stop_ld = true;
        }
    })
    .fail(function(){
    });

};///end func....

///----------------------------------------------------------------

//#/ Scroll Load work
$('.loader').appear();
$('.loader').on('appear', function(event, $affected) {
    if(($.stop_ld != true) && ($.pull_status != false))
    {
        //setTimeout(function(){
        $.pull_status = false;
        $('#loader').click();
        //}, 11400);
    }
});

///----------------------------------------------------------------

$.cxt = function()
{
    if($('.loader').visible() && ($.stop_ld != true))
    {
        setTimeout(function(){
        $.pull_status = false;
        $('#loader').click();
        $.cxt();
        }, 500);
    }
    else
    {
        return false;
    }
}

if($('.loader').visible()){
$.cxt();
}

});