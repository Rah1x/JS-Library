function preload(arrayOfImages)
{
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

$(document).ready(function() {
preload([
    DOC_ROOT+'assets/js/fancybox/source/fancybox_overlay.png',
    DOC_ROOT+'assets/js/fancybox/source/fancybox_loading.gif',
    DOC_ROOT+'assets/js/fancybox/source/fancybox_loading@2x.gif',
    DOC_ROOT+'assets/js/fancybox/source/fancybox_sprite.png',
]);
});