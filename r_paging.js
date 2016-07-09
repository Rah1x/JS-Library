/**
# Function: paging
# Description: smart next/previous pagination with result caching

# Ver 2.0 [25 Feb, 2010]
# Developed by: Raheel Hasan

# parameters:
# loc     [compulsory] = determine the drection [values = next, prev]
**/


function paging(loc)
{
    var cur_p = cur_page;

    if(loc=='next')
    {
        var nxt_t=parseInt(cur_p)+1;

        if((nxt_t+1)>total_pages)
        return false;


        if( (typeof(page_loaded[nxt_t]) != "undefined") && (page_loaded[nxt_t]==true) )
        {
            // Paging Count Display
            document.getElementById('page_'+cur_p).style.display = 'none';
            document.getElementById('page_'+nxt_t).style.display = '';
            cur_page = nxt_t;

            var cur_page_dis = parseInt(cur_page)+1;
            document.getElementById('page_count_show').value = 'Page '+cur_page_dis+' of '+total_pages;


            //Items Count Display
            var c_t=cur_page;
            var items_count_s = items_show[c_t]['items_count_s'];
            var items_count_e = items_show[c_t]['items_count_e'];
            document.getElementById('items_count_show').value = 'Showing '+items_count_s+' - '+items_count_e+'  of '+total_items;
        }
        else
        {
            url_x= ajax_res_page+'?ajax=1&tot='+total_items+'&'+query_str_params+'&page='+nxt_t;
            url = site_url+url_x;

            divR = '';
            loading = 'load_1';
            mask = 'mask_x';

            var jsObj = {runIt:function(data){
            //Create Element and Insert Response
            insert = document.createElement('div');
            insert.setAttribute('id', 'dummy_'+nxt_t);

            x_bef = document.getElementById('btm_barker');
            x_bef.parentNode.insertBefore(insert, x_bef);

            insert.innerHTML = data;


            // Paging Count Display
            document.getElementById('page_'+cur_p).style.display = 'none';
            document.getElementById('page_'+nxt_t).style.display = '';
            cur_page = nxt_t;

            var cur_page_dis = parseInt(cur_page)+1;
            document.getElementById('page_count_show').value = 'Page '+cur_page_dis+' of '+total_pages;


            //Articles Count Display
            var c_t=cur_page-1;
            var items_count_s = items_show[c_t]['items_count_e']+1;
            var items_count_e = items_count_e_new;
            document.getElementById('items_count_show').value = 'Showing '+items_count_s+' - '+items_count_e+'  of '+total_items;

            items_show[cur_page] = [];
            items_show[cur_page]['items_count_s'] = items_count_s;
            items_show[cur_page]['items_count_e'] = items_count_e;
            }};

            ajax_work(url, divR, loading, mask, jsObj);
        }
    }//end if next............
    if(loc=='prev')
    {
        var prev_t=parseInt(cur_p)-1;

        if(prev_t<0)
        return false;


        if( (typeof(page_loaded[prev_t]) != "undefined") && (page_loaded[prev_t]==true) )
        {
            // Paging Count Display
            document.getElementById('page_'+cur_p).style.display = 'none';
            document.getElementById('page_'+prev_t).style.display = '';
            cur_page = prev_t;

            var cur_page_dis = parseInt(cur_page)+1;
            document.getElementById('page_count_show').value = 'Page '+cur_page_dis+' of '+total_pages;


            //Articles Count Display
            var c_t=cur_page;
            var items_count_s = items_show[c_t]['items_count_s'];
            var items_count_e = items_show[c_t]['items_count_e'];
            document.getElementById('items_count_show').value = 'Showing '+items_count_s+' - '+items_count_e+'  of '+total_items;
        }

    }//end if prev......

}///end func.......