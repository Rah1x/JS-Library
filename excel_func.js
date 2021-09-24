$(document).ready(function() {

    $('.excel_dl_btn').fancybox({
        minWidth    : 550,
	    minHeight   : 10,
		maxWidth	: 750,
		maxHeight	: 600,
		autoSize	: true,
        fitToView	: false,
        openEffect	: 'elastic',
		closeEffect	: 'elastic',

        prevEffect	: 'none',
		nextEffect	: 'none',
        helpers	: {
			buttons	: {}
		}
    });


    ////////////////////////////------------

    $.download_list = function(search_it)
    {
        /*
        var x_offer_title = document.getElementById('offer_title').value;

        if(x_offer_title==''){
        alert('Please filter out a single Offer before you can export!');
        return false;
        }
        //alert(search_it);
        */

        return true;
    };
});