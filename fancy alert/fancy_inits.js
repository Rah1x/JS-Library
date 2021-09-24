$(document).ready(function() {

    $.fancy_width_set = function(def)
    {
        var f_ancy_width = def;
        if($(window).width()<(def+70)){
        f_ancy_width = $(window).width()-80;}

        //console.log(def+'-'+f_ancy_width);
        return f_ancy_width;
    }
    $.fancy_width = $.fancy_width_set(450);


    $(".fbox").fancybox({
	    minWidth    : 230,
	    minHeight   : 300,
		maxWidth	: 950,
		maxHeight	: 600,
		autoSize	: true,
        fitToView	: true,
        openEffect	: 'elastic',
		closeEffect	: 'elastic',
	});

    $(".fbox_a").fancybox({
	    minWidth    : 250,
	    minHeight   : 300,
		maxWidth	: '90%',
		maxHeight	: 600,
		autoSize	: true,
        fitToView	: true,
        openEffect	: 'elastic',
		closeEffect	: 'elastic',

        prevEffect	: 'none',
		nextEffect	: 'none',
        helpers	: {
			buttons	: {}
		}
	});

    $(".fbox_if").fancybox({
	    minWidth    : $.fancy_width_set(300),
        minHeight   : 300,
    	maxWidth	: $.fancy_width_set(1200)-50,
		maxHeight	: 600,
		autoSize	: true,
        fitToView	: true,
        openEffect	: 'elastic',
		closeEffect	: 'elastic',

        beforeLoad: function(){
            this.href+='&ro=1';
        },

        beforeShow: function(){
            if(typeof($(this.element).data('fancy_custom_width'))!='undefined'){
            this.maxWidth = $(this.element).data('fancy_custom_width');
            }

            if(typeof($(this.element).data('fancy_custom_height'))!='undefined'){
            this.minHeight = $(this.element).data('fancy_custom_height');
            }
        }
	});

    $(".fbox_img").fancybox({
	    minHeight   : 5,
		minWidth    : 5,
        maxWidth	: '90%',
		maxHeight	: 600,
		autoSize	: true,
        fitToView	: false,
        openEffect	: 'elastic',
		closeEffect	: 'elastic',
        padding : 0
	});

    $(".fbox_grid_details_wide").fancybox({
	    minWidth    : $.fancy_width_set(700),
	    minHeight   : 10,
		maxWidth	: $.fancy_width_set(700),
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


    $(".fbox_grid_details").fancybox({
	    minWidth    : $.fancy_width_set(450),
	    minHeight   : 10,
		maxWidth	: $.fancy_width_set(450),
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
});