<?php
if(in_array($_SERVER['SERVER_NAME'], array('cusa-local', 'localhost'))==false) //SERVER
{
    define('DOC_ROOT2', '/home4/socialgu/public_html/collaborateusa.com/www_new/www_root/back_adm/');
}
else
{
    define('DOC_ROOT2', 'F:/Projects/collaborate_usa/www_new/www_root/back_adm/');
}
///////////////////////////////////////////////////////


$bReturnAbsolute=false;
$sBaseVirtual0=DOC_ROOT2."includes/editor/assets";

chdir('../');
//echo getcwd();
$sBase0 = DOC_ROOT2."includes/editor/assets";
$sName0="Assets";


$sBaseVirtual1="";
$sBase1="";
$sName1="";

$sBaseVirtual2="";
$sBase2="";
$sName2="";

$sBaseVirtual3="";
$sBase3="";
$sName3="";
?>