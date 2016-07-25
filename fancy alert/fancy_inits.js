$(document).ready(function() {
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
	    minWidth    : 230,
	    minHeight   : 300,
		maxWidth	: 950,
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
	    minWidth    : 230,
	    minHeight   : 300,
		maxWidth	: 700,
		maxHeight	: 600,
		autoSize	: true,
        fitToView	: true,
        openEffect	: 'elastic',
		closeEffect	: 'elastic',

        beforeLoad: function(){
            this.href+='&ro=1';
        }
	});

    $(".fbox_max").fancybox({
        minWidth    : 20,
        minHeight   : 20,
    	maxWidth	: 950,
    	maxHeight	: 600,
        autoSize	: true,
        fitToView	: true,
        openEffect	: 'elastic',
    	closeEffect	: 'elastic',
        'overlayShow': true,

        'beforeShow': function(){
            $(window).on({
                'resize.fancybox' : function(){
                    $.fancybox.update();
                }
            });
         },

         'afterClose': function(){
              $(window).off('resize.fancybox');
         },
    });


    $.windowsize = $(window).width();
    $(".fbox_video").fancybox({
        'beforeShow': function(){
            $(window).on({
                'resize.fancybox' : function(){
                    $.fancybox.update();
                }
            });
         },

         afterLoad: function ()
         {
            $.extend(this, {
                type    : 'html',
                content : '<video id="home_vd" preload="metadata" controls width="auto" height="auto" style="border-radius:2px; width:100% !important; height:auto !important">'
                +'<source src="'+this.href+'" type="video/mp4" />'
                +'Your browser does not support the video tag.</video>'
            });
        },

        'afterShow': function()
         {
            if($.windowsize<1020){
                $('.fancybox-close').css('top', '0');
                $('.fancybox-close').css('right', '0');
            }

            var hvd = document.getElementById("home_vd");
            hvd.addEventListener("loadedmetadata", function(e){
                //var widthx = this.videoWidth;
                //alert(dump($.fancybox.width));
                $.fancybox.toggle();
                $.fancybox.toggle();
            }, false);
         },

         'afterClose': function(){
              $(window).off('resize.fancybox');
         },

         margin     : 3,
         padding    : 0,
         minWidth	: 200,
         maxWidth	: 960,

         fitToView  : true,
         closeClick : false,
         openEffect	: 'fade',
    	 closeEffect: 'elastic',
         closeBtn   : 'true',
         scrolling  : 'no',
    });


    $(".fbox_img").fancybox({
	    minHeight   : 5,
		minWidth    : 5,
        maxWidth	: 950,
		maxHeight	: 600,
		autoSize	: true,
        fitToView	: false,
        openEffect	: 'elastic',
		closeEffect	: 'elastic',
	});
});