<script type="text/javascript" src="ajax_work.js"></script>
<script type="text/javascript" src="ajax.js"></script>
<script language="javascript">
var a=1;
jsString="a++;alert(a);";
//ajax_work(url, divR, loading, mask, jsString)
ajax_work('t2.php', 'test1', '', '', jsString);
</script>

<div id='test1'></div>