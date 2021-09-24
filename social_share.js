function bookmarkTo(serverType, f_url, f_ttle)
{
	var url = '';
	var a = window;
	var b = document;
	var c = encodeURIComponent;
	//var c = escape;
	var h = 450;
    var w = 750;

    var loc = b.location;
    if(typeof(f_url)!='undefined')
    loc = f_url;

    var ttle = b.title;
    if(typeof(f_ttle)!='undefined')
    ttle = f_ttle;

    switch ( serverType )
    {
		/*
        case 'google':
			bookmark_url = "http://www.google.com/bookmarks/mark?op=edit&amp;output=popup&amp;bkmk=" + c(loc) +"&amp;title=" + c(ttle);
			break;
        */

        case 'google_plus':
			bookmark_url = "https://plus.google.com/share?url="+c(loc)+"&amp;title="+c(ttle);
			break;

		case 'facebook':
            bookmark_url = 'http://www.facebook.com/sharer.php?u=' + c(loc) + '&amp;t=' + c(ttle);
            w = 600; h = 455;
			break;

		case 'del.icio.us':
			bookmark_url = 'http://del.icio.us/post?v=2&amp;url=' + c(loc) + '&amp;notes=&amp;tags=&amp;title='+ c(ttle);
            w = 920; h = 460;
			break;

		case 'digg':
			bookmark_url = 'http://digg.com/submit?phase=2&amp;url=' + c(loc)+'&amp;bodytext=&amp;tags=&amp;title=' + c(ttle);
			w = 1030; h = 300;
            break;

        case 'twitter':
			bookmark_url = 'http://twitter.com/home?status=' + c('"') + c(ttle) + c('" ') + c(loc);
            w = 800; h = 430;
			break;
	}

    //alert(bookmark_url);
    //return false;

	var d = a.open(
				bookmark_url,
				"bkmk_popup",
				"left="+ parseInt((screen.availWidth/2) - (w/2)) +
				",top="+parseInt((screen.availHeight/2) - (h/2))+
				",height="+h+"px,width="+w+"px,resizable=1,alwaysRaised=1"
			);
	a.setTimeout(function(){d.focus()},300)

}//end func....