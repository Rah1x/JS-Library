/**
# function: srch_it
# Purpose: Javascript based client-side search / Filter
# EXAMPLE USAGE:

[STEP 1 - build search box]
<script>
var all_fr=[];
</script>

<br />
<div style="float: left;"><b>I support:</b></div>
<div style="float: right;"><input type="text" id="search_friends" name="search_friends" value="Search Friends"
style="width:130px; color:#585858; font-style:italic; font-size:12px;"
onfocus="swi_fields(this, 'Search Friends', 'focus');" onblur="swi_fields(this, 'Search Friends', 'blur');"
onkeyup="srch_it('search_friends', 'friendRow_', all_fr);" /></div>
<div style="clear: both;"></div>
<br />

[STEP2 - build rows]
inside for loop, for each row:
<tr id="friendRow_<= $friend->id; >">
<php
$t_n = $friendUser->displayName();
$t_n = preg_replace('/[^\x20-\x7E]{0,}/i', '', $t_n);
$t_n = str_replace('"', '&quot;', $t_n);
$t_n = str_replace("'", '&#39;', $t_n);
>
<script language="javascript">
var len = all_fr.length;
all_fr[len]=[];
all_fr[len][0]='<php echo $friend->id; >';
all_fr[len][1]='<php echo $t_n; >';
</script>
**/
function srch_it(input_fld, content_idx, all_frx)
{
    var cl = document.getElementById(input_fld).value;
	cl = TrimString(cl);
	cl = cl.toLowerCase();

    var indxe=count_obj(all_frx);

    if(cl!='')
    {
        srch_array = [];

        for(kwx=0; kwx<indxe; kwx++)
        {
            var ts_str = all_frx[kwx][1];
			ts_str = TrimString(ts_str);
			ts_str = ts_str.toLowerCase();

            if( (ts_str.search(cl)<0) && (cl!='') ){
			} else {
			srch_array[srch_array.length] = all_frx[kwx][0];
			}

            //# hide all
            if(document.getElementById(content_idx+all_frx[kwx][0])!=null)
            document.getElementById(content_idx+all_frx[kwx][0]).style.display='none';

        }//end for...

        //# show limited search result
        for(kwx=0; kwx<indxe; kwx++)
        {
            if(document.getElementById(content_idx+srch_array[kwx])!=null)
            document.getElementById(content_idx+srch_array[kwx]).style.display='';
        }

    }//end if not empty....
    else
    {
        for(kwx=0; kwx<indxe; kwx++)
        {
            if(document.getElementById(content_idx+all_frx[kwx][0])!=null)
            document.getElementById(content_idx+all_frx[kwx][0]).style.display='';
        }
    }

}//end func....
/////////////////////////////////////////////

function TrimString(sInString)
{
    sInString = sInString.replace( /^\s+/g, "" );// strip leading
    return sInString.replace( /\s+$/g, "" );// strip trailing
}//end func...
/////////////////////////////////////////////

function count_obj(foo)
{
	var count = 0;
	for (var k in foo)
	{
	    if (foo.hasOwnProperty(k)) {
	       ++count;
	    }
	}
	return count;
}//end func...
/////////////////////////////////////////////

/**
# function: swi_fields
# Purpose: Toogle default text written on searchboxes
**/
function swi_fields(fld, def_text, dyn)
{
    if(dyn=='focus')
    {
        if(fld.value==def_text)
        {
            fld.value='';
            fld.style.fontStyle='normal';
        }
    }
    else if(dyn=='blur')
    {
        if(fld.value=='')
        {
            fld.value = def_text;
            fld.style.fontStyle='italic';
        }
    }
}//end func....