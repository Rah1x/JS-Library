<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-18795257-2']);
_gaq.push(['_trackPageview']);

<?php if($id){ ?>
_gaq.push(['_addTrans',
    '<?php echo $id; ?>',           // order ID - required
    'Store 123',                    // affiliation or store name
    '<?php echo $total_grand; ?>',  // total - required
    '<?php echo $buyer_city; ?>',   // city
    '<?php echo $buyer_state; ?>',  // state or province
    'USA'                           // country
]);

<?php
if(!empty($prod))
foreach ($prod as $v)
{
    ?>
    _gaq.push(['_addItem',
        '<?php echo $id; ?>',               // order ID - required
        '<?php echo $v['sku']; ?>',         // SKU/code - required
        '<?php echo $v['name']; ?>',        // product name
        '<?php echo $category_name; ?>',    // category or variation
        '<?php echo $v['amount']; ?>',      // unit price - required
        '1'                                 // quantity - required
    ]);
    <?php
}
?>

_gaq.push(['_trackTrans']);

<?php } ?>


(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>


<!-- Google Code for Sale Conversion Page -->
<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 980217773;
var google_conversion_language = "en";
var google_conversion_format = "1";
var google_conversion_color = "ffffff";
var google_conversion_label = "D7x_CJPZ4gIQrd-z0wM";
var google_conversion_value = 0;
/* ]]> */
</script>
<script type="text/javascript" src="http://www.googleadservices.com/pagead/conversion.js">
</script>

<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="http://www.googleadservices.com/pagead/conversion/980217773/?label=D7x_CJPZ4gIQrd-z0wM&amp;guid=ON&amp;script=0"/>
</div>
</noscript>