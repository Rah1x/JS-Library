/***********************************************************

InnovaStudio WYSIWYG Editor 2.2

Copyright � 2003-2005, INNOVA STUDIO (www.InnovaStudio.com). All rights reserved.

************************************************************/



var editor = new Array();



/*** Utility Object ***/

var oUtil=new InnovaEditorUtil();

function InnovaEditorUtil()

    {

    /*** Localization ***/

	this.langDir="english";

	try{if(LanguageDirectory)this.langDir=LanguageDirectory;}catch(e){;}

    var oScripts=document.getElementsByTagName("script");

    for(var i=0;i<oScripts.length;i++)

        {

        var sSrc=oScripts[i].src.toLowerCase();

        if(sSrc.indexOf("moz/editor.js")!=-1)

            {

            this.scriptPath=oScripts[i].src.replace(/editor.js/,"");

            }

        else(sSrc.indexOf("scripts/innovaeditor.js")!=-1)/*optional, kalau embed innovaeditor.js (khusus firefox perlu)*/

            {

            if(!this.scriptPath)

				this.scriptPath=oScripts[i].src.replace(/innovaeditor.js/,"")+"moz/";

            }

        }

    this.scriptPathLang=this.scriptPath.replace(/\/moz/,"")+"language/"+this.langDir+"/";

	if(this.langDir=="english")

	document.write("<scr"+"ipt src='"+this.scriptPathLang+"editor_lang.js'></scr"+"ipt>");

	/*** /Localization ***/



    this.oName;

    this.oEditor;

    this.obj;

    this.oSel;

    this.sType;

    this.bInside=bInside;

    this.useSelection=true;

    this.arrEditor=[];

    this.onSelectionChanged=function(){return true;};

    this.activeElement;

    this.activeModalWin;

    this.setEdit = setEdit;

    this.bOnLoadReplaced=false;

    }



/*** Focus stuff ***/

function bInside(oElement)

    {

    while(oElement!=null)

        {

        if(oElement.designMode && oElement.designMode=="on")return true;

        oElement=oElement.parentNode;

        }

    return false;

    }



function checkFocus()

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var parent = getSelectedElement(oSel);

    if(parent!=null)

        {

        if(!bInside(parent))return false;

        }

    else

        {

        if(!bInside(parent))return false;

        }

    return true;

    }



function iwe_focus()

    {

    var oEditor=document.getElementById("idContent"+this.oName);

    if(oEditor) oEditor.contentWindow.focus();

    }



function setEdit(oName) {

  if ((oName != null) && (oName!="")) {

      try {document.getElementById("idContent"+oName).contentDocument.designMode="on";} catch(e) {}

  } else {

    for (var i=0; i<this.arrEditor.length; i++) {

      try {document.getElementById("idContent"+this.arrEditor[i]).contentDocument.designMode="on";} catch(e) {}

    }

  }

}



/*********************

    EDITOR OBJECT

**********************/

function InnovaEditor(oName)

    {

    this.oName=oName;

    this.RENDER=RENDER;



    this.loadHTML=loadHTML;

    this.loadHTMLFull=loadHTMLFull;

    this.getHTMLBody=getHTMLBody;

    this.getHTML=getHTML;

    this.getXHTMLBody=getXHTMLBody;

    this.getXHTML=getXHTML;

    this.putHTML=putHTML;//source dialog



    this.css="";



    this.bInside=bInside;

    this.checkFocus=checkFocus;

    this.focus=iwe_focus;



    this.doCmd=doCmd;

    this.applyParagraph=applyParagraph;

    this.applyFontName=applyFontName;

    this.applyFontSize=applyFontSize;

    this.applyBullets=applyBullets;

    this.applyNumbering=applyNumbering;

    this.applyJustifyLeft=applyJustifyLeft;

    this.applyJustifyCenter=applyJustifyCenter;

    this.applyJustifyRight=applyJustifyRight;

    this.applyJustifyFull=applyJustifyFull;

    this.applyBlockDirLTR=applyBlockDirLTR;

    this.applyBlockDirRTL=applyBlockDirRTL;

    this.applySpan=applySpan;

    this.makeAbsolute=makeAbsolute;

    this.insertHTML=insertHTML;

    this.clearAll=clearAll;

    this.insertCustomTag=insertCustomTag;

    this.selectParagraph=selectParagraph;

    this.doOnPaste=doOnPaste;

    this.isAfterPaste=false;

    this.doClean=doClean;



    this.hide=hide;

    this.dropShow=dropShow;



    this.width="663";

    this.height="490";

    this.publishingPath="";//ex."htt p://localhost/InnovaStudio/"



    var oScripts=document.getElementsByTagName("script");

    for(var i=0;i<oScripts.length;i++)

        {

        var sSrc=oScripts[i].src.toLowerCase();

        if(sSrc.indexOf("moz/editor.js")!=-1)

            {

            this.scriptPath=oScripts[i].src.replace(/editor.js/,"")

            }

        }



    //this.scriptPath="scripts/";//spy aman, gunakan: relative to root



    this.iconPath="icons/";

    this.iconWidth=25;this.iconHeight=24;

    this.writeIconToggle=writeIconToggle;

    this.writeIconStandard=writeIconStandard;

    this.writeDropDown=writeDropDown;

    this.writeBreakSpace=writeBreakSpace;

    this.dropTopAdjustment=0;



    this.applyColor=applyColor;

    this.customColors=[];//["#ff4500","#ffa500","#808000","#4682b4","#1e90ff","#9400d3","#ff1493","#a9a9a9"];

    this.oColor1 = new ColorPicker("oColor1",this.oName);//to call: oEdit1.oColor1

    this.oColor2 = new ColorPicker("oColor2",this.oName);//rendered id: ...oColor1oEdit1

    this.expandSelection=expandSelection;



    this.useLastForeColor=false;

    this.useLastBackColor=false;

    this.stateForeColor="";

    this.stateBackColor="";



    this.fullScreen=fullScreen;

    this.stateFullScreen=false;



	this.arrElm=new Array(300);

	this.getElm=iwe_getElm;



    this.features=[];



    //diff: "Search","SpellCheck","Cut","Copy","Paste","PasteWord","Guidelines"

    //      "XHTMLFullSource","XHTMLSource"



	this.buttonMap=["Save","FullScreen","Preview","Print","Search","SpellCheck",

		"Cut","Copy","Paste","PasteWord","|","Undo","Redo","|",

		"ForeColor","BackColor","|","Bookmark","Hyperlink",

		"CustomTag","Image","Flash","Media","ContentBlock","InternalLink","CustomObject","|",

		"Table","Guidelines","Absolute","|","Characters","Line",

		"Form","Clean","HTMLFullSource","HTMLSource","XHTMLFullSource",

		"XHTMLSource","ClearAll","BRK",

		"StyleAndFormatting","|","Paragraph","FontName","FontSize","|",

		"Bold","Italic",

		"Underline","Strikethrough","Superscript","Subscript","|",

		"JustifyLeft","JustifyCenter","JustifyRight","JustifyFull","|",

		"Numbering","Bullets","|","Indent","Outdent","LTR","RTL"];//complete, default



    //diff: btnSearch, btnSpellCheck, btnCut, btnCopy, btnPaste, btnGuidelines, btnPasteWord,

    //      btnXHTMLFullSource, btnXHTMLSource



    this.btnSave=false;this.btnPreview=true;this.btnFullScreen=true;this.btnPrint=false;this.btnSearch=true;

    this.btnSpellCheck=false;this.btnTextFormatting=true;

    this.btnListFormatting=true;this.btnBoxFormatting=true;this.btnParagraphFormatting=true;this.btnCssText=true;

    this.btnStyles=false;this.btnParagraph=true;this.btnFontName=true;this.btnFontSize=true;

    this.btnCut=true;this.btnCopy=true;this.btnPaste=true;this.btnUndo=true;this.btnRedo=true;

    this.btnBold=true;this.btnItalic=true;this.btnUnderline=true;

    this.btnStrikethrough=false;this.btnSuperscript=false;this.btnSubscript=false;

    this.btnJustifyLeft=true;this.btnJustifyCenter=true;this.btnJustifyRight=true;this.btnJustifyFull=true;

    this.btnNumbering=true;this.btnBullets=true;this.btnIndent=true;this.btnOutdent=true;

    this.btnLTR=false;this.btnRTL=false;this.btnForeColor=true;this.btnBackColor=true;

    this.btnHyperlink=true;this.btnBookmark=true;this.btnCharacters=true;this.btnCustomTag=false;

    this.btnImage=true;this.btnFlash=false;this.btnMedia=false;

    this.btnTable=true;this.btnGuidelines=true;

    this.btnAbsolute=true;this.btnPasteWord=true;this.btnLine=true;

    this.btnForm=true;this.btnClean=true;

    this.btnHTMLFullSource=false;this.btnHTMLSource=false;

    this.btnXHTMLFullSource=false;this.btnXHTMLSource=true;

    this.btnClearAll=false;



    //*** CMS FUNCTIONS ***

    this.cmdAssetManager="";



    this.btnContentBlock=false;

    this.cmdContentBlock=";";//needs ;



    this.btnInternalLink=false;

    this.cmdInternalLink=";";//needs ;

    this.insertLink=insertLink;



    this.btnCustomObject=false;

    this.cmdCustomObject=";";//needs ;

    //**********



    this.arrStyle=[];

    this.onCustomCssShow = new Function("modelessDialogShow('"+this.scriptPath+"styles_cssText.htm',360,345)");

    this.addonCSSBuilder=addonCSSBuilder;



    this.arrParagraph=[[getText("Heading 1"),"H1"],

                        [getText("Heading 2"),"H2"],

                        [getText("Heading 3"),"H3"],

                        [getText("Heading 4"),"H4"],

                        [getText("Heading 5"),"H5"],

                        [getText("Heading 6"),"H6"],

                        [getText("Preformatted"),"PRE"],

                        [getText("Normal (P)"),"P"],

                        [getText("Normal (DIV)"),"DIV"]];



    this.arrFontName=["Arial",

                        "Arial Black",

                        "Arial Narrow",

                        "Book Antiqua",

                        "Bookman Old Style",

                        "Century Gothic",

                        "Comic Sans MS",

                        "Courier New",

                        "Franklin Gothic Medium",

                        "Garamond",

                        "Georgia",

                        "Impact",

                        "Lucida Console",

                        "Lucida Sans",

                        "Lucida Unicode",

                        "Modern",

                        "Monotype Corsiva",

                        "Palatino Linotype",

                        "Roman",

                        "Script",

                        "Small Fonts",

                        "Symbol",

                        "Tahoma",

                        "Times New Roman",

                        "Trebuchet MS",

                        "Verdana",

                        "Webdings",

                        "Wingdings",

                        "serif",

                        "sans-serif",

                        "cursive",

                        "fantasy",

                        "monoscape"];



    this.arrFontSize=[[getText("Size 1"),"11px"],
                      [getText("Size 2"),"13px"],
                      [getText("Size 3"),"16px"],
                      [getText("Size 4"),"20px"],
                      [getText("Size 5"),"25px"],
                      [getText("Size 6"),"33px"],
                      [getText("Size 7"),"40px"]];


    /*this.arrFontSize=[[getText("Size 1"),"1"],
					  [getText("Size 2"),"2"],
					  [getText("Size 3"),"3"],
					  [getText("Size 4"),"4"],
					  [getText("Size 5"),"5"],
					  [getText("Size 6"),"6"],
					  [getText("Size 7"),"7"]];*/



    this.arrCustomTag=[];   //eg.[["Full Name","{%full_name%}"],

                            //    ["Email","{%email%}"]];



    this.docType="";

    this.html="<html>";

    this.headContent="";

    this.preloadHTML="";



    this.onSave=function(){return true;};



    this.onFullScreen=function(){return true;};

    this.onNormalScreen=function(){return true;};



    this.initialRefresh=false;//not used



    this.doUndo=doUndo;

    this.doRedo=doRedo;

    this.saveForUndo=saveForUndo;

    this.doUndoRedo=doUndoRedo;



    this.arrUndoList=[];

    this.arrRedoList=[];



    this.useTagSelector=true;

    this.TagSelectorPosition="bottom";

    this.moveTagSelector=moveTagSelector;

    this.selectElement=selectElement;

    this.removeTag=removeTag;

    this.doClick_TabCreate=doClick_TabCreate;

    this.doRefresh_TabCreate=doRefresh_TabCreate;



    this.arrCustomButtons = [["CustomName1","alert(0)","caption here","btnSave.gif"],

                            ["CustomName2","alert(0)","caption here","btnSave.gif"]];



    this.onSelectionChanged=function(){return true;};



    editor[editor.length] = this;

    return this;

    }



/*********************

	ADD-ONS

**********************/

function addonCSSBuilder(bEnabled)

	{

	if(bEnabled)

		this.onCustomCssShow = new Function("modelessDialogShow('"+this.scriptPath+"styles_cssText2.htm',430,410)");

	else

		this.onCustomCssShow = new Function("modelessDialogShow('"+this.scriptPath+"styles_cssText.htm',360,345)");

	}



/*** Undo/Redo ***/



/* Save for undo in netscape */

function saveForUndo()

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var obj=this;

    if(obj.arrUndoList[0])

        if(oEditor.document.body.innerHTML==obj.arrUndoList[0][0])return;

    for(var i=20;i>1;i--)obj.arrUndoList[i-1]=obj.arrUndoList[i-2];

    obj.focus();

    var oSel=oEditor.getSelection();

    var range = oSel.getRangeAt(0);

    obj.arrUndoList[0]=[oEditor.document.body.innerHTML, range.cloneRange()];



    this.arrRedoList=[];//clear redo list



	if(this.btnUndo) makeEnableNormal(document.getElementById("btnUndo"+this.oName));

	if(this.btnRedo) makeDisabled(document.getElementById("btnRedo"+this.oName));

    }



function doUndo() {

    this.doUndoRedo(this.arrUndoList, this.arrRedoList);

}



function doRedo() {

    this.doUndoRedo(this.arrRedoList, this.arrUndoList);

}



/* undo in netscape*/

function doUndoRedo(listA, listB)

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var obj=this;

    if(!listA[0])return; //return of undo/redo array empty



    for(var i=20;i>1;i--)listB[i-1]=listB[i-2];

    var oSel=oEditor.getSelection();

    var range = oSel.getRangeAt(0);

    listB[0]=[oEditor.document.body.innerHTML, range.cloneRange()];



    sHTML=listA[0][0];



    oEditor.document.body.innerHTML=sHTML;



    oSel = oEditor.getSelection();

    oSel.removeAllRanges();

    oSel.addRange(listA[0][1]);



    for(var i=0;i<19;i++)listA[i]=listA[i+1];

    listA[19]=null;

    realTime(this);

    }



function RENDER(sPreloadHTML)

    {

    /*** Tetap Ada (For downgrade compatibility) ***/

    if(sPreloadHTML.substring(0,4)=="<!--" &&

	sPreloadHTML.substring(sPreloadHTML.length-3)=="-->")

	sPreloadHTML=sPreloadHTML.substring(4,sPreloadHTML.length-3);



	if(sPreloadHTML.substring(0,4)=="<!--" &&

	sPreloadHTML.substring(sPreloadHTML.length-6)=="--&gt;")

	sPreloadHTML=sPreloadHTML.substring(4,sPreloadHTML.length-6);



	/*** Converting back HTML-encoded content (kalau tdk encoded tdk masalah) ***/

	sPreloadHTML=sPreloadHTML.replace(/&lt;/g,"<");

	sPreloadHTML=sPreloadHTML.replace(/&gt;/g,">");

	sPreloadHTML=sPreloadHTML.replace(/&amp;/g,"&");

	sPreloadHTML=sPreloadHTML.replace(/&quot;/g,"\"");



    /*** features ***/

    var bUseFeature=false;

    if(this.features.length>0)

        {

        bUseFeature=true;

        for(var i=0;i<this.buttonMap.length;i++)

            eval(this.oName+".btn"+this.buttonMap[i]+"=true");//ex: oEdit1.btnStyleAndFormatting=true (no problem), oEdit1.btn|=true (no problem), oEdit1.btnBRK=true (no problem)



        this.btnTextFormatting=false;this.btnListFormatting=false;

        this.btnBoxFormatting=false;this.btnParagraphFormatting=false;

        this.btnCssText=false;this.btnStyles=false;

        for(var j=0;j<this.features.length;j++)

            eval(this.oName+".btn"+this.features[j]+"=true");//ex: oEdit1.btnTextFormatting=true



        for(var i=0;i<this.buttonMap.length;i++)

            {

            sButtonName=this.buttonMap[i];

            bBtnExists=false;

            for(var j=0;j<this.features.length;j++)

                if(sButtonName==this.features[j])bBtnExists=true;//ada;



            if(!bBtnExists)//tdk ada; set false

                eval(this.oName+".btn"+sButtonName+"=false");//ex: oEdit1.btnBold=false, oEdit1.btn|=false (no problem), oEdit1.btnBRK=false (no problem)

            }

        //Remove:"TextFormatting","ListFormatting",dst.=>tdk perlu(krn diabaikan)

        this.buttonMap=this.features;

        }

    /*** /features ***/



    this.preloadHTML=sPreloadHTML;



    var sHTMLDropMenus="";

    var sHTMLIcons="";

    var sTmp="";



    //*******

    for(var i=0;i<this.buttonMap.length;i++)

        {

        sButtonName=this.buttonMap[i];

        switch(sButtonName)

            {

            case "|":

                sHTMLIcons+=this.writeBreakSpace();

                break;

            case "BRK":

                sHTMLIcons+="</td></tr></table><table cellpadding=0 cellspacing=0><tr><td dir=ltr>";

                break;

            case "Save":

                if(this.btnSave)sHTMLIcons+=this.writeIconStandard("btnSave"+this.oName,this.oName+".onSave()","btnSave.gif",getText("Save"));

                break;

            case "Preview":

                if(this.btnPreview)

                    {

                    sHTMLIcons+=this.writeIconStandard("btnPreview"+this.oName,this.oName+".dropShow(this,'dropPreview"+this.oName+"')","btnPreview.gif",getText("Preview"));

                    var arrPreviewSize=[[640,480],[800,600],[1024,768]];

                    sTmp="";

                    for(var j=0;j<arrPreviewSize.length;j++)

                        {

                        sTmp+= "<tr><td onclick=\"document.getElementById('dropPreview"+this.oName+"').style.display='none';setActiveEditor("+this.oName+");modalDialogShow('"+this.scriptPath+"preview.htm',"+arrPreviewSize[j][0]+","+arrPreviewSize[j][1]+");\" "+

                            "style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on>"+arrPreviewSize[j][0]+"x"+arrPreviewSize[j][1]+"</td></tr>";

                        }

                    sHTMLDropMenus+="<table id=dropPreview"+this.oName+" cellpadding=0 cellspacing=0 "+

                        "style='z-index:1;display:none;position:absolute;border:#716F64 1px solid;"+

                        "cursor:default;background-color:#fdfdfd;' unselectable=on>"+

                        sTmp+"</table>";

                    }

                break;

            case "FullScreen":

                if(this.btnFullScreen)sHTMLIcons+=this.writeIconStandard("btnFullScreen"+this.oName,this.oName+".fullScreen()","btnFullScreen.gif",getText("Full Screen"));

                break;

            case "Print":

                if(this.btnPrint)sHTMLIcons+=this.writeIconStandard("btnPrint"+this.oName,"document.getElementById('idContent"+this.oName+"').contentWindow.print()","btnPrint.gif",getText("Print"));

                break;

            case "StyleAndFormatting":

                sTmp="";

                if(this.btnTextFormatting)

                    sTmp+="<tr><td onclick=\"modelessDialogShow('"+this.scriptPath+"text1.htm',525,485);"+

                            "document.getElementById('dropStyle"+this.oName+"').style.display='none'\""+

                            " style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on>"+getText("Text Formatting")+"</td></tr>";



                if(this.btnParagraphFormatting)

                    sTmp+="<tr><td onclick=\"modelessDialogShow('"+this.scriptPath+"paragraph.htm',440,240);"+

                            "document.getElementById('dropStyle"+this.oName+"').style.display='none'\""+

                            " style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on>"+getText("Paragraph Formatting")+"</td></tr>";



                if(this.btnListFormatting)

                    sTmp+="<tr><td onclick=\"modelessDialogShow('"+this.scriptPath+"list.htm',300,285);"+

                            "document.getElementById('dropStyle"+this.oName+"').style.display='none'\""+

                            " style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on>"+getText("List Formatting")+"</td></tr>";



                if(this.btnBoxFormatting)

                    sTmp+="<tr><td onclick=\"modelessDialogShow('"+this.scriptPath+"box.htm',438,390);"+

                            "document.getElementById('dropStyle"+this.oName+"').style.display='none'\""+

                            " style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on>"+getText("Box Formatting")+"</td></tr>";



                if(this.btnStyles)

                    sTmp+="<tr><td onclick=\"modelessDialogShow('"+this.scriptPath+"styles.htm',360,297);"+

                            "document.getElementById('dropStyle"+this.oName+"').style.display='none'\""+

                            " style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on>"+getText("Styles")+"</td></tr>";



                if(this.btnCssText)

                    sTmp+= "<tr><td onclick=\""+this.oName+".onCustomCssShow();"+

                            "document.getElementById('dropStyle"+this.oName+"').style.display='none'\""+

                            " style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on>"+getText("Custom CSS")+"</td></tr>";



                if(this.btnTextFormatting||this.btnParagraphFormatting||this.btnListFormating||this.btnBoxFormatting||this.btnStyles||this.btnCssText)

                    {

                    sHTMLIcons+=this.writeIconStandard("btnStyleAndFormat"+this.oName,this.oName+".dropShow(this,'dropStyle"+this.oName+"')","btnStyle.gif",getText("Styles & Formatting"));

                    sHTMLDropMenus+="<table id=dropStyle"+this.oName+" cellpadding=0 cellspacing=0 "+

                        "style='z-index:1;display:none;position:absolute;border:#716F64 1px solid;"+

                        "cursor:default;background-color:#fdfdfd;' unselectable=on>"+

                        sTmp+"</table>";

                    }

                break;

            case "Paragraph":

                if(this.btnParagraph)

                    {

                    sHTMLDropMenus+="<table id=dropParagraph"+this.oName+" cellpadding=0 cellspacing=0 "+

                        "style='z-index:1;display:none;position:absolute;border:#716F64 1px solid;"+

                        "cursor:default;background-color:#fdfdfd;' unselectable=on>";

                    for(var j=0;j<this.arrParagraph.length;j++)

                        {

                        sHTMLDropMenus+="<tr><td onclick=\""+this.oName+".applyParagraph('"+this.arrParagraph[j][1]+"')\" "+

                            "style=\"padding:1px;font-family:tahoma;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on align=center>"+

                            "<"+this.arrParagraph[j][1]+" style=\"\margin-bottom:4px;margin-top:4px\"  unselectable=on> "+

                            this.arrParagraph[j][0]+"</"+this.arrParagraph[j][1]+"></td></tr>";

                        }

                    sHTMLDropMenus+="</table>";

                    sHTMLIcons+=this.writeDropDown("btnParagraph"+this.oName,this.oName+".selectParagraph();"+this.oName+".dropShow(this,'dropParagraph"+this.oName+"')","btnParagraph.gif",getText("Paragraph"),77);

                    }

                break;

            case "FontName":

                if(this.btnFontName)

                    {

                    sHTMLDropMenus+="<table id=dropFontName"+this.oName+" cellpadding=0 cellspacing=0 "+

                        "style='z-index:1;display:none;position:absolute;border:#716F64 1px solid;"+

                        "cursor:default;background-color:#fdfdfd;' unselectable=on><tr><td>";



                    //~~~~ up to 120 fonts

                    var numOfFonts=0;

                    for(var j=0;j<this.arrFontName.length;j++)

                        {

                        if(this.arrFontName[j].toString().indexOf(",")==-1)

							{

							if(this.arrFontName[j]!="serif" &&

								this.arrFontName[j]!="sans-serif" &&

								this.arrFontName[j]!="cursive" &&

								this.arrFontName[j]!="fantasy" &&

								this.arrFontName[j]!="monoscape")numOfFonts++;

							}

						else numOfFonts++;

                        }



                    sHTMLDropMenus+="<table cellpadding=0 cellspacing=0>";

                    for(var j=0;j<this.arrFontName.length;j++)

                        {

                        if(this.arrFontName[j].toString().indexOf(",")==-1)

							{

							if(this.arrFontName[j]!="serif" &&

								this.arrFontName[j]!="sans-serif" &&

								this.arrFontName[j]!="cursive" &&

								this.arrFontName[j]!="fantasy" &&

								this.arrFontName[j]!="monoscape")

								sHTMLDropMenus+="<tr><td onclick=\""+this.oName+".applyFontName('"+this.arrFontName[j]+"')\" "+

									"style=\"padding:2px;padding-top:1px;font-family:"+ this.arrFontName[j] +";font-size:11px;color:black;\" "+

									"onmouseover=\"if(this.style.backgroundColor=='#708090')this.sel='true';this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

									"onmouseout=\"if(this.sel=='true'){this.sel='false'}else{this.style.backgroundColor='';this.style.color='#000000';}\" unselectable=on>"+

									this.arrFontName[j]+" <span unselectable=on style='font-family:tahoma'>("+ this.arrFontName[j] +")</span></td></tr>";

							}

						else

							{

							sHTMLDropMenus+="<tr><td onclick=\""+this.oName+".applyFontName('"+this.arrFontName[j][0]+"')\" "+

								"style=\"padding:2px;padding-top:1px;font-family:"+ this.arrFontName[j][0] +";font-size:11px;color:black;\" "+

								"onmouseover=\"if(this.style.backgroundColor=='#708090')this.sel='true';this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

								"onmouseout=\"if(this.sel=='true'){this.sel='false'}else{this.style.backgroundColor='';this.style.color='#000000';}\" unselectable=on>"+

								this.arrFontName[j][1]+" <span unselectable=on style='font-family:tahoma'>("+ this.arrFontName[j][1] +")</span></td></tr>";

							}

                        if(j==14||j==29||j==44||j==59||j==74||j==89||j==104)

                            {

                            if(j!=numOfFonts-1)

                                {

                                sHTMLDropMenus+="</table>";

                                sHTMLDropMenus+="</td><td valign=top style='border-left:#716f64 1px solid'>";//main

                                sHTMLDropMenus+="<table cellpadding=0 cellspacing=0>";

                                }

                            }

                        }

                    sHTMLDropMenus+="</table>";

                    //~~~~



                    sHTMLDropMenus+="</td></tr></table>";

                    sHTMLIcons+=this.writeDropDown("btnFontName"+this.oName,this.oName+".expandSelection();"+this.oName+".dropShow(this,'dropFontName"+this.oName+"');realtimeFontSelect('"+this.oName+"')","btnFontName.gif",getText("Font Name"),77);

                    }

                break;

            case "FontSize":

                if(this.btnFontSize)

                    {

                    sHTMLDropMenus+="<table id=dropFontSize"+this.oName+" cellpadding=0 cellspacing=0 "+

                        "style='z-index:1;display:none;position:absolute;border:#716F64 1px solid;"+

                        "cursor:default;background-color:#fdfdfd;' unselectable=on>";

                    for(var j=0;j<this.arrFontSize.length;j++)
                    {

                        sHTMLDropMenus+="<tr><td onclick=\"rx="+this.oName+".applySpan(); "+this.oName+".applyFontSize('"+this.arrFontSize[j][1]+"');\"  "+

                            "style=\"padding:0;padding-left:5px;padding-right:5px;font-family:tahoma;color:black;\" "+

                            "onmouseover=\"if(this.style.backgroundColor=='#708090')this.sel='true';this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"if(this.sel=='true'){this.sel='false'}else{this.style.backgroundColor='';this.style.color='#000000';}\" unselectable=on align=center>"+

                            "<font unselectable=on style=\"font-size:"+this.arrFontSize[j][1]+"\">"+
                            //"<font unselectable=on font=\""+this.arrFontSize[j][1]+"\">"+
                            this.arrFontSize[j][0]+"</font></td></tr>";

                     }
                     sHTMLDropMenus+="</table>";

                     sHTMLIcons+=this.writeDropDown("btnFontSize"+this.oName,this.oName+".expandSelection();" + this.oName+".dropShow(this,'dropFontSize"+this.oName+"');realtimeSizeSelect('"+this.oName+"')","btnFontSize.gif",getText("Font Size"),60);
                    }

                break;

            case "Undo":

                if(this.btnUndo)sHTMLIcons+=this.writeIconStandard("btnUndo"+this.oName,this.oName+".doUndo()","btnUndo.gif",getText("Undo"));

                break;

            case "Redo":

                if(this.btnRedo)sHTMLIcons+=this.writeIconStandard("btnRedo"+this.oName,this.oName+".doRedo()","btnRedo.gif",getText("Redo"));

                break;

			case "PasteWord":

				if(this.btnPasteWord)sHTMLIcons+=this.writeIconStandard("btnPasteWord"+this.oName,"modelessDialogShow('"+this.scriptPath+"paste_word.htm',400,280)","btnPasteWord.gif",getText("Paste from Word"));

				break;

            case "Bold":

                if(this.btnBold)sHTMLIcons+=this.writeIconToggle("btnBold"+this.oName,this.oName+".doCmd('Bold')","btnBold.gif",getText("Bold"));

                break;

            case "Italic":

                if(this.btnItalic)sHTMLIcons+=this.writeIconToggle("btnItalic"+this.oName,this.oName+".doCmd('Italic')","btnItalic.gif",getText("Italic"));

                break;

            case "Underline":

                if(this.btnUnderline)sHTMLIcons+=this.writeIconToggle("btnUnderline"+this.oName,this.oName+".doCmd('Underline')","btnUnderline.gif",getText("Underline"));

                break;

            case "Strikethrough":

                if(this.btnStrikethrough)sHTMLIcons+=this.writeIconToggle("btnStrikethrough"+this.oName,this.oName+".doCmd('Strikethrough')","btnStrikethrough.gif",getText("Strikethrough"));

                break;

            case "Superscript":

                if(this.btnSuperscript)sHTMLIcons+=this.writeIconToggle("btnSuperscript"+this.oName,this.oName+".doCmd('Superscript')","btnSuperscript.gif",getText("Superscript"));

                break;

            case "Subscript":

                if(this.btnSubscript)sHTMLIcons+=this.writeIconToggle("btnSubscript"+this.oName,this.oName+".doCmd('Subscript')","btnSubscript.gif",getText("Subscript"));

                break;

            case "JustifyLeft":

                if(this.btnJustifyLeft)sHTMLIcons+=this.writeIconToggle("btnJustifyLeft"+this.oName,this.oName+".applyJustifyLeft()","btnLeft.gif",getText("Justify Left"));

                break;

            case "JustifyCenter":

                if(this.btnJustifyCenter)sHTMLIcons+=this.writeIconToggle("btnJustifyCenter"+this.oName,this.oName+".applyJustifyCenter()","btnCenter.gif",getText("Justify Center"));

                break;

            case "JustifyRight":

                if(this.btnJustifyRight)sHTMLIcons+=this.writeIconToggle("btnJustifyRight"+this.oName,this.oName+".applyJustifyRight()","btnRight.gif",getText("Justify Right"));

                break;

            case "JustifyFull":

                if(this.btnJustifyFull)sHTMLIcons+=this.writeIconToggle("btnJustifyFull"+this.oName,this.oName+".applyJustifyFull()","btnFull.gif",getText("Justify Full"));

                break;

            case "Numbering":

                if(this.btnNumbering)sHTMLIcons+=this.writeIconToggle("btnNumbering"+this.oName,this.oName+".applyNumbering()","btnNumber.gif",getText("Numbering"));

                break;

            case "Bullets":

                if(this.btnBullets)sHTMLIcons+=this.writeIconToggle("btnBullets"+this.oName,this.oName+".applyBullets()","btnList.gif",getText("Bullets"));

                break;

            case "Indent":

                if(this.btnIndent)sHTMLIcons+=this.writeIconStandard("btnIndent"+this.oName,this.oName+".doCmd('Indent')","btnIndent.gif",getText("Indent"));

                break;

            case "Outdent":

                if(this.btnOutdent)sHTMLIcons+=this.writeIconStandard("btnOutdent"+this.oName,this.oName+".doCmd('Outdent')","btnOutdent.gif",getText("Outdent"));

                break;

            case "LTR":

                if(this.btnLTR)sHTMLIcons+=this.writeIconToggle("btnLTR"+this.oName,this.oName+".applyBlockDirLTR()","btnLTR.gif",getText("Left To Right"));

                break;

            case "RTL":

                if(this.btnRTL)sHTMLIcons+=this.writeIconToggle("btnRTL"+this.oName,this.oName+".applyBlockDirRTL()","btnRTL.gif",getText("Right To Left"));

                break;

            case "ForeColor":

                if(this.btnForeColor)sHTMLIcons+=this.writeIconStandard("btnForeColor"+this.oName,this.oName+".expandSelection();"+this.oName+".oColor1.show(this)","btnForeColor.gif",getText("Foreground Color"));

                break;

            case "BackColor":

                if(this.btnBackColor)sHTMLIcons+=this.writeIconStandard("btnBackColor"+this.oName,this.oName+".expandSelection();"+this.oName+".oColor2.show(this)","btnBackColor.gif",getText("Background Color"));

                break;

            case "Bookmark":

                if(this.btnBookmark)sHTMLIcons+=this.writeIconStandard("btnBookmark"+this.oName,"modelessDialogShow('"+this.scriptPath+"bookmark.htm',245,170)","btnBookmark.gif",getText("Bookmark"));

                break;

            case "Hyperlink":

                if(this.btnHyperlink)sHTMLIcons+=this.writeIconStandard("btnHyperlink"+this.oName,"modelessDialogShow('"+this.scriptPath+"hyperlink.htm',420,150)","btnHyperlink.gif",getText("Hyperlink"));

                break;

            case "CustomTag":

                if(this.btnCustomTag)

                    {

                    sHTMLDropMenus+="<table id=dropCustomTag"+this.oName+" cellpadding=0 cellspacing=0 "+

                        "style='z-index:1;display:none;position:absolute;border:#716F64 1px solid;"+

                        "cursor:default;background-color:#fdfdfd;' unselectable=on><tr><td valign=top>";



                    //~~~~ up to 120 tags

                    sHTMLDropMenus+="<table cellpadding=0 cellspacing=0>";

                    for(var j=0;j<this.arrCustomTag.length;j++)

                        {

                        sHTMLDropMenus+="<tr><td onclick=\""+this.oName+".insertCustomTag('"+this.arrCustomTag[j][1]+"')\" "+

                            "style=\"padding:1px;padding-left:5px;padding-right:5px;font-family:tahoma;font-size:11px;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on align=center>"+

                            this.arrCustomTag[j][0]+"</td></tr>";



                        if(j==14||j==29||j==44||j==59||j==74||j==89||j==104)

                            {

                            if(j!=this.arrCustomTag.length-1)

                                {

                                sHTMLDropMenus+="</table>";

                                sHTMLDropMenus+="</td><td valign=top style='border-left:#716f64 1px solid'>";//main

                                sHTMLDropMenus+="<table cellpadding=0 cellspacing=0>";

                                }

                            }

                        }

                    sHTMLDropMenus+="</table>";

                    //~~~~



                    sHTMLDropMenus+="</td></tr></table>";

                    sHTMLIcons+=this.writeDropDown("btnCustomTag"+this.oName,this.oName+".dropShow(this,'dropCustomTag"+this.oName+"')","btnCustomTag.gif",getText("Tags"),60);

                    }

                break;

            case "Image":

                if(this.btnImage)sHTMLIcons+=this.writeIconStandard("btnImage"+this.oName,"modelessDialogShow('"+this.scriptPath+"image.htm',440,305)","btnImage.gif",getText("Image"));

                break;

            case "Flash":

                if(this.btnFlash)sHTMLIcons+=this.writeIconStandard("btnFlash"+this.oName,"modelessDialogShow('"+this.scriptPath+"flash.htm',410,205)","btnFlash.gif",getText("Flash"));

                break;

            case "Media":

                if(this.btnMedia)sHTMLIcons+=this.writeIconStandard("btnMediah"+this.oName,"modelessDialogShow('"+this.scriptPath+"media.htm',420,232)","btnMedia.gif",getText("Media"));

                break;

            case "ContentBlock":

                if(this.btnContentBlock)sHTMLIcons+=this.writeIconStandard("btnContentBlock"+this.oName,this.cmdContentBlock,"btnContentBlock.gif",getText("Content Block"));

                break;

            case "InternalLink":

                if(this.btnInternalLink)sHTMLIcons+=this.writeIconStandard("btnInternalLink"+this.oName,this.cmdInternalLink,"btnInternalLink.gif",getText("Internal Link"));

                break;

            case "CustomObject":

                if(this.btnCustomObject)sHTMLIcons+=this.writeIconStandard("btnCustomObject"+this.oName,this.cmdCustomObject,"btnCustomObject.gif",getText("Object"));

                break;

            case "Table":

                if(this.btnTable)

                    {

                    //if(!document.getElementById("dropTable"))

                    sHTMLDropMenus+="<table id=dropTable"+this.oName+" cellpadding=0 cellspacing=0 "+

                        "style='z-index:1;display:none;position:absolute;border:#716F64 1px solid;"+

                        "cursor:default;background-color:#fdfdfd;' unselectable=on>"+

                        "<tr><td id=\"mnuTableSize"+this.oName+"\" onclick=\"if(this.style.color!='gray'){modelessDialogShow('"+this.scriptPath+"table_size.htm',240,212);"+

                        "   document.getElementById('dropTable"+this.oName+"').style.display='none'}\""+

                        "   style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black\""+

                        "   onmouseover=\"if(this.style.color!='gray'){this.style.backgroundColor='#708090';this.style.color='#FFFFFF';}\""+

                        "   onmouseout=\"if(this.style.color!='gray'){this.style.backgroundColor='';this.style.color='#000000';}\" unselectable=on>"+getText("Table Size")+" </td></tr>"+

                        "<tr><td id=\"mnuTableEdit"+this.oName+"\" onclick=\"if(this.style.color!='gray'){modelessDialogShow('"+this.scriptPath+"table_edit.htm',358,300);"+

                        "   document.getElementById('dropTable"+this.oName+"').style.display='none'}\""+

                        "   style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black\""+

                        "   onmouseover=\"if(this.style.color!='gray'){this.style.backgroundColor='#708090';this.style.color='#FFFFFF';}\""+

                        "   onmouseout=\"if(this.style.color!='gray'){this.style.backgroundColor='';this.style.color='#000000';}\" unselectable=on>"+getText("Edit Table")+" </td></tr>"+

                        "<tr><td id=\"mnuCellEdit"+this.oName+"\" onclick=\"if(this.style.color!='gray'){modelessDialogShow('"+this.scriptPath+"table_editCell.htm',427,380);"+

                        "   document.getElementById('dropTable"+this.oName+"').style.display='none'}\""+

                        "   style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black\""+

                        "   onmouseover=\"if(this.style.color!='gray'){this.style.backgroundColor='#708090';this.style.color='#FFFFFF';}\""+

                        "   onmouseout=\"if(this.style.color!='gray'){this.style.backgroundColor='';this.style.color='#000000';}\" unselectable=on>"+getText("Edit Cell")+" </td></tr>"+

                        "</table>";



                    sHTMLDropMenus+="<table width=175 id=dropTableCreate"+this.oName+" onmouseout='//doOut_TabCreate(this);event.cancelBubble=true;' style='position:absolute;display:none;cursor:default;background:#f3f3f3;border:#d3d3d3 1px solid;' cellpadding=0 cellspacing=1 unselectable=on>";

                    for(var m=0;m<8;m++)

                        {

                        sHTMLDropMenus+="<tr>";

                        for(var n=0;n<8;n++)

                            {

                            sHTMLDropMenus+="<td onclick='"+this.oName+".doClick_TabCreate(this)' onmouseover='doOver_TabCreate(this);event.cancelBubble=true;' style='background:#ffffff;font-size:1px;border:#d3d3d3 1px solid;width:20px;height:20px;' unselectable=on>&nbsp;</td>";

                            }

                        sHTMLDropMenus+="</tr>";

                        }

                    sHTMLDropMenus+="<tr><td colspan=8 onclick=\""+this.oName+".hide();modelessDialogShow('"+this.scriptPath+"table_insert.htm',380,270);\" onmouseover=\"doOut_TabCreate(document.getElementById('dropTableCreate"+this.oName+"'));this.innerHTML='"+getText("Advanced Table Insert")+"';this.style.border='#777777 1px solid';this.style.backgroundColor='#8d9aa7';this.style.color='#ffffff'\" onmouseout=\"this.style.border='#f3f3f3 1px solid';this.style.backgroundColor='#f3f3f3';this.style.color='#000000'\" align=center style='font-family:verdana;font-size:10px;font-color:black;border:#f3f3f3 1px solid;padding:1px 1px 1px 1px' unselectable=on>"+getText("Advanced Table Insert")+"</td></tr>";

                    sHTMLDropMenus+="</table>";



                    sHTMLIcons+=this.writeIconStandard("btnTable"+this.oName,this.oName+".dropShow(this, 'dropTableCreate"+this.oName+"')","btnTable.gif",getText("Insert Table"));

                    sHTMLIcons+=this.writeIconStandard("btnTableEdit"+this.oName,this.oName+".dropShow(this, 'dropTable"+this.oName+"')","btnTableEdit.gif",getText("Edit Table/Cell"));

                    }

                break;

            case "Absolute":

                if(this.btnAbsolute)sHTMLIcons+=this.writeIconStandard("btnAbsolute"+this.oName,this.oName+".makeAbsolute()","btnAbsolute.gif",getText("Absolute"));

                break;

            case "Characters":

                if(this.btnCharacters)sHTMLIcons+=this.writeIconStandard("btnCharacters"+this.oName,"modelessDialogShow('"+this.scriptPath+"characters.htm',520,150)","btnSymbol.gif",getText("Special Characters"));

                break;

            case "Line":

                if(this.btnLine)sHTMLIcons+=this.writeIconStandard("btnLine"+this.oName,this.oName+".doCmd('InsertHorizontalRule')","btnLine.gif",getText("Line"));

                break;

            case "Form":

                if(this.btnForm)

                    {

                    var arrFormMenu = [[getText("Form"),"form_form.htm","280","150"],

                                    [getText("Text Field"),"form_text.htm","285","239"],

                                    [getText("List"),"form_list.htm","295","272"],

                                    [getText("Checkbox"),"form_check.htm","235","150"],

                                    [getText("Radio Button"),"form_radio.htm","235","150"],

                                    [getText("Hidden Field"),"form_hidden.htm","235","150"],

                                    [getText("File Field"),"form_file.htm","235","150"],

                                    [getText("Button"),"form_button.htm","235","150"]];

                    sHTMLIcons+=this.writeIconStandard("btnForm"+this.oName,this.oName+".dropShow(this,'dropForm"+this.oName+"')","btnForm.gif",getText("Form Editor"));

                    //if(!document.getElementById("dropForm"))

                        //{

                    sHTMLDropMenus+="<table id=dropForm"+this.oName+" cellpadding=0 cellspacing=0 "+

                        "style='z-index:1;display:none;position:absolute;border:#716F64 1px solid;"+

                        "cursor:default;background-color:#fdfdfd;' unselectable=on>";

                        for(var j=0;j<arrFormMenu.length;j++)

                            {

                            sHTMLDropMenus+="<tr><td onclick=\"modelessDialogShow('"+this.scriptPath + arrFormMenu[j][1]+"',"+arrFormMenu[j][2]+","+arrFormMenu[j][3]+");"+

                            "document.getElementById('dropForm"+this.oName+"').style.display='none'\""+

                            " style=\"padding:2px;padding-top:1px;font-family:Tahoma;font-size:11px;color:black;\" "+

                            "onmouseover=\"this.style.backgroundColor='#708090';this.style.color='#FFFFFF';\" "+

                            "onmouseout=\"this.style.backgroundColor='';this.style.color='#000000';\" unselectable=on>"+arrFormMenu[j][0]+"</td></tr>";

                            }

                    sHTMLDropMenus+="</table>";

                        //}

                    }

                break;

            case "Clean":

                if(this.btnClean)sHTMLIcons+=this.writeIconStandard("btnClean"+this.oName,this.oName+".doClean()","btnRemoveFormat.gif",getText("Clean"));

                break;



            case "HTMLFullSource":

                if(this.btnHTMLFullSource)

                  sHTMLIcons+=this.writeIconStandard("btnHTMLFullSource"+this.oName,"setActiveEditor("+this.oName+");modalDialogShow('"+this.scriptPath+"source_html_full.htm',600,450);","btnSource.gif",getText("View/Edit Source"));

                break;



            case "HTMLSource":

				if(this.btnHTMLSource)

				  sHTMLIcons+=this.writeIconStandard("btnHTMLSource"+this.oName,"setActiveEditor("+this.oName+");modalDialogShow('"+this.scriptPath+"source_html.htm',600,450);","btnSource.gif",getText("View/Edit Source"));

                break;



            case "XHTMLFullSource":

				if(this.btnXHTMLFullSource)

				  sHTMLIcons+=this.writeIconStandard("btnXHTMLFullSource"+this.oName,"setActiveEditor("+this.oName+");modalDialogShow('"+this.scriptPath+"source_xhtml_full.htm',600,450);","btnSource.gif",getText("View/Edit Source"));

                break;



            case "XHTMLSource":

				if(this.btnXHTMLSource)

				  sHTMLIcons+=this.writeIconStandard("btnXHTMLSource"+this.oName,"setActiveEditor("+this.oName+");modalDialogShow('"+this.scriptPath+"source_xhtml.htm',600,450);","btnSource.gif",getText("View/Edit Source"));

                break;



            case "ClearAll":

                if(this.btnClearAll)sHTMLIcons+=this.writeIconStandard("btnClearAll"+this.oName,this.oName+".clearAll()","btnDelete.gif",getText("Clear All"));

                break;

            default:

                for(j=0;j<this.arrCustomButtons.length;j++)

                    {

                    if(sButtonName==this.arrCustomButtons[j][0])

                        {

                        sCbName=this.arrCustomButtons[j][0];

                        //sCbCommand=this.arrCustomButtons[j][1];

                        sCbCaption=this.arrCustomButtons[j][2];

                        sCbImage=this.arrCustomButtons[j][3];

                        sHTMLIcons+=this.writeIconStandard("btn"+sCbName+this.oName,"eval("+this.oName+".arrCustomButtons["+j+"][1])",sCbImage,sCbCaption);

                        }

                    }

                break;

            }

        }



    var sHTML="";



    if(!document.getElementById("id_refresh_z_index"))

        sHTML+="<div id=id_refresh_z_index style='margin:0px'></div>";





    sHTML+="<table id=idArea"+this.oName+" name=idArea"+this.oName+" border='0px' "+

            "cellpadding=0 cellspacing=0 width='"+this.width+"px' height='"+this.height+"px'>"+

            "<tr><td colspan=2 style=\"padding:1px; border:#cfcfcf 1px solid !important; background:url('"+this.scriptPath+"icons/bg.gif') !important;\">"+

            "<table cellpadding=0 cellspacing=0 border=0><tr><td dir=ltr>"+

            sHTMLIcons+

            "</td></tr></table>"+

            "</td></tr>"+

            "<tr id=idTagSelTopRow"+this.oName+"><td colspan=2 id=idTagSelTop"+this.oName+" height=0px></td></tr>";





    sHTML+="<tr><td colspan=2 valign=top height=100% style='background:white;padding-right:2px !important;'>";



    //Add security='restricted' =>

    //Your current security settings prohibit running ActiveX controls on this page.

    //As a result, the page may not display correctly.

    sHTML+="<iframe style='width:100%;height:100%; margin-top:1px; border:solid 1px #cfcfcf' "+
            " name=idContent"+ this.oName + " id=idContent"+this.oName+ "></iframe>";



    if(this.css!="")

        {

        document.write("<iframe style='width:1px;height:1px;overflow:auto;border:0px' id=\"myStyle"+this.oName+"\" name=\"myStyle"+this.oName+"\" src='"+this.scriptPath+"blank.gif'></iframe>");

        }





    sHTML+="</td></tr>";

    sHTML+="<tr id=idTagSelBottomRow"+this.oName+"><td colspan=2 id=idTagSelBottom"+this.oName+"></td></tr>";

    sHTML+="</table>";





    sHTML+=sHTMLDropMenus;//dropdown



    document.write(sHTML);



    //Render Color Picker (forecolor)

    this.oColor1.url=this.scriptPath+"color_picker_fg.htm";

    this.oColor1.onShow = new Function(this.oName+".hide()");

    this.oColor1.onMoreColor = new Function(this.oName+".hide()");

    this.oColor1.onPickColor = new Function(this.oName+".applyColor('ForeColor', "+this.oName+".oColor1.color)");

    this.oColor1.onRemoveColor = new Function(this.oName+".applyColor('ForeColor','')");

    this.oColor1.txtCustomColors=getText("Custom Colors");

    this.oColor1.txtMoreColors=getText("More Colors...");

    this.oColor1.RENDER();



    //Render Color Picker (backcolor)

    this.oColor2.url=this.scriptPath+"color_picker_bg.htm";

    this.oColor2.onShow = new Function(this.oName+".hide()");

    this.oColor2.onMoreColor = new Function(this.oName+".hide()");

    this.oColor2.onPickColor = new Function(this.oName+".applyColor('hilitecolor', "+this.oName+".oColor2.color)");

    this.oColor2.onRemoveColor = new Function(this.oName+".applyColor('HiliteColor','')");

    this.oColor2.txtCustomColors=getText("Custom Colors");

    this.oColor2.txtMoreColors=getText("More Colors...");

    this.oColor2.RENDER();



    if(this.useTagSelector)

        {

        if(this.TagSelectorPosition=="bottom")this.TagSelectorPosition="top";

        else this.TagSelectorPosition="bottom";

        this.moveTagSelector()

        }



    var oEditor = document.getElementById("idContent"+this.oName).contentWindow;

    //try { oEditor.document.designMode="on"; } catch (e) {}



    oUtil.oName=this.oName;//default active editor

    oUtil.oEditor=oEditor;

    oUtil.obj=this;



    oUtil.arrEditor.push(this.oName);



    var arrA = String(this.preloadHTML).match(/<HTML[^>]*>/ig);

    if(arrA)

        {//full html

        //this.putHTML(this.preloadHTML);

        this.loadHTMLFull(this.preloadHTML);

        }

    else

        {

        this.loadHTML(sPreloadHTML);

        }



	/***** Replace current body onload ******/

	if(!oUtil.bOnLoadReplaced)

		{

		if(window.onload)onload_original=window.onload;

		window.onload = new Function("onload_new()");

		oUtil.bOnLoadReplaced=true;

		}

	/****************************************/



    this.focus();



	if(this.btnTable)

		{

		this.arrElm[0]=this.getElm("btnTableEdit");

		this.arrElm[1]=this.getElm("mnuTableSize");

		this.arrElm[2]=this.getElm("mnuTableEdit");

		this.arrElm[3]=this.getElm("mnuCellEdit");

		}

	if(this.btnParagraph)this.arrElm[4]=this.getElm("btnParagraph");

	if(this.btnFontName)this.arrElm[5]=this.getElm("btnFontName");

	if(this.btnFontSize)this.arrElm[6]=this.getElm("btnFontSize");

	//if(this.btnCut)this.arrElm[7]=this.getElm("btnCut");

	//if(this.btnCopy)this.arrElm[8]=this.getElm("btnCopy");

	//if(this.btnPaste)this.arrElm[9]=this.getElm("btnPaste");

	//if(this.btnPasteWord)this.arrElm[10]=this.getElm("btnPasteWord");

	//if(this.btnPasteText)this.arrElm[11]=this.getElm("btnPasteText");

	if(this.btnUndo)this.arrElm[12]=this.getElm("btnUndo");

	if(this.btnRedo)this.arrElm[13]=this.getElm("btnRedo");

	if(this.btnBold)this.arrElm[14]=this.getElm("btnBold");

	if(this.btnItalic)this.arrElm[15]=this.getElm("btnItalic");

	if(this.btnUnderline)this.arrElm[16]=this.getElm("btnUnderline");

	if(this.btnStrikethrough)this.arrElm[17]=this.getElm("btnStrikethrough");

	if(this.btnSuperscript)this.arrElm[18]=this.getElm("btnSuperscript");

	if(this.btnSubscript)this.arrElm[19]=this.getElm("btnSubscript");

	if(this.btnNumbering)this.arrElm[20]=this.getElm("btnNumbering");

	if(this.btnBullets)this.arrElm[21]=this.getElm("btnBullets");

	if(this.btnJustifyLeft)this.arrElm[22]=this.getElm("btnJustifyLeft");

	if(this.btnJustifyCenter)this.arrElm[23]=this.getElm("btnJustifyCenter");

	if(this.btnJustifyRight)this.arrElm[24]=this.getElm("btnJustifyRight");

	if(this.btnJustifyFull)this.arrElm[25]=this.getElm("btnJustifyFull");

	if(this.btnIndent)this.arrElm[26]=this.getElm("btnIndent");

	if(this.btnOutdent)this.arrElm[27]=this.getElm("btnOutdent");

	if(this.btnLTR)this.arrElm[28]=this.getElm("btnLTR");

	if(this.btnRTL)this.arrElm[29]=this.getElm("btnRTL");

	if(this.btnForeColor)this.arrElm[30]=this.getElm("btnForeColor");

	if(this.btnBackColor)this.arrElm[31]=this.getElm("btnBackColor");

	if(this.btnLine)this.arrElm[32]=this.getElm("btnLine");

    }



function iwe_getElm(s)

	{

	return document.getElementById(s+this.oName)

	}



/***** Replace current body onload ******/

function onload_new()

	{

	onload_original();

	//alert("setEdit here");

	oUtil.setEdit();

	}

function onload_original()

	{

	}

/****************************************/



function applyColor(sType,sColor)

    {

    this.hide();

    this.focus();//Focus stuff

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    this.saveForUndo();

    if (sColor!=null && sColor!="") {

        oEditor.document.execCommand(sType,false,sColor);

        var sel = oEditor.getSelection();

        var range = sel.getRangeAt(0);

        if (range.startContainer.nodeType==Node.TEXT_NODE) {

            var el = range.startContainer.nextSibling;

            if (el) {

                range = oEditor.document.createRange();

                range.selectNode(el);

                sel = oEditor.getSelection();

                sel.removeAllRanges();

                sel.addRange(range);

            }

        }

    } else {

        var el = getSelectedElement(oEditor.getSelection());

        if (sType=="ForeColor") {

            el.style.color="";

        } else if (sType=="HiliteColor") {

            el.style.backgroundColor = "";

        }



    }



    realTime(this);

    if(sColor=="")return;

    //this.selectElement(0);

    }



/*** Color Picker Object ***/

var arrColorPickerObjects=[];

function ColorPicker(sName,sParent)

    {

    this.oParent=sParent;

    if(sParent)

        {

        this.oName=sParent+"."+sName;

        this.oRenderName=sName+sParent;

        }

    else

        {

        this.oName=sName;

        this.oRenderName=sName;

        }

    arrColorPickerObjects.push(this.oName);



    this.url="color_picker.htm";

    this.onShow=function(){return true;};

    this.onHide=function(){return true;};

    this.onPickColor=function(){return true;};

    this.onRemoveColor=function(){return true;};

    this.onMoreColor=function(){return true;};

    this.show=showColorPicker;

    this.hide=hideColorPicker;

    this.hideAll=hideColorPickerAll;

    this.color;

    this.customColors=[];

    this.refreshCustomColor=refreshCustomColor;

    this.isActive=false;

    this.txtCustomColors="Custom Colors";

    this.txtMoreColors="More Colors...";

    this.align="left";

    this.currColor="#ffffff";//default current color

    this.RENDER=drawColorPicker;

    }



function drawColorPicker()

    {

    var arrColors=[["#800000","#8b4513","#006400","#2f4f4f","#000080","#4b0082","#800080","#000000"],

                ["#ff0000","#daa520","#6b8e23","#708090","#0000cd","#483d8b","#c71585","#696969"],

                ["#ff4500","#ffa500","#808000","#4682b4","#1e90ff","#9400d3","#ff1493","#a9a9a9"],

                ["#ff6347","#ffd700","#32cd32","#87ceeb","#00bfff","#9370db","#ff69b4","#dcdcdc"],

                ["#ffdab9","#ffffe0","#98fb98","#e0ffff","#87cefa","#e6e6fa","#dda0dd","#ffffff"]];

    var sHTMLColor="<table id=dropColor"+this.oRenderName+" style=\"z-index:1;display:none;position:absolute;border:#716F64 1px solid;cursor:default;background-color:#f3f3f3;padding:2px\" unselectable=on cellpadding=0 cellspacing=0 width=145px><tr><td unselectable=on>";

    sHTMLColor+="<table align=center cellpadding=0 cellspacing=0 border=0 unselectable=on>";

    for(var i=0;i<arrColors.length;i++)

        {

        sHTMLColor+="<tr>";

        for(var j=0;j<arrColors[i].length;j++)

            sHTMLColor+="<td onclick=\""+this.oName+".color='"+arrColors[i][j]+"';"+this.oName+".onPickColor();"+this.oName+".currColor='"+arrColors[i][j]+"';"+this.oName+".hideAll()\" onmouseover=\"this.style.border='#777777 1px solid'\" onmouseout=\"this.style.border='#efefef 1px solid'\" style=\"cursor:default;padding:1px;border:#efefef 1px solid;\" unselectable=on>"+

                "<table style='margin:0px;width:13px;height:13px;background:"+arrColors[i][j]+";border:white 1px solid' cellpadding=0 cellspacing=0 unselectable=on>"+

                "<tr><td unselectable=on></td></tr>"+

                "</table></td>";

        sHTMLColor+="</tr>";

        }



    //~~~ custom colors ~~~~

    sHTMLColor+="<tr><td colspan=8 id=idCustomColor"+this.oRenderName+"></td></tr>";



    //~~~ remove color & more colors ~~~~

    sHTMLColor+= "<tr>";

    sHTMLColor+= "<td unselectable=on>"+

        "<table style='margin-left:1px;width:14px;height:14px;background:#f3f3f3;' cellpadding=0 cellspacing=0 unselectable=on>"+

        "<tr><td onclick=\""+this.oName+".onRemoveColor();"+this.oName+".currColor='';"+this.oName+".hideAll()\" onmouseover=\"this.style.border='#777777 1px solid'\" onmouseout=\"this.style.border='white 1px solid'\" style=\"cursor:default;padding:1px;border:white 1px solid;font-family:verdana;font-size:10px;font-color:black;line-height:9px;\" align=center valign=top unselectable=on>x</td></tr>"+

        "</table></td>";

    sHTMLColor+= "<td colspan=7 unselectable=on>"+

        "<table style='margin:1px;width:117px;height:16px;background:#f3f3f3;border:#f3f3f3 1px solid' cellpadding=0 cellspacing=0 unselectable=on>"+

        "<tr><td id=\""+this.oName+"moreColTd\" onclick=\""+this.oName+".onMoreColor();"+this.oName+".hideAll();modalDialogShow('"+this.url+"?" +this.oName+ "', 442, 380)\" onmouseover=\"this.style.border='#777777 1px solid';this.style.background='#8d9aa7';this.style.color='#ffffff'\" onmouseout=\"this.style.border='#efefef 1px solid';this.style.background='#f3f3f3';this.style.color='#000000'\" style=\"font-family:verdana;font-size:9px;font-color:black;line-height:9px;padding:1px\" align=center valign=top nowrap unselectable=on>"+this.txtMoreColors+"</td></tr>"+

        "</table></td>";

    sHTMLColor+= "</tr>";



    sHTMLColor+= "</table>";

    sHTMLColor+="</td></tr></table>";

    document.write(sHTMLColor);

    }



function refreshCustomColor()

    {

    this.customColors=eval(this.oParent).customColors;//[CUSTOM] (Get from public definition)



    if(this.customColors.length==0)

        {

        document.getElementById("idCustomColor"+this.oRenderName).innerHTML="";

        return;

        }

    sHTML="<table cellpadding=0 cellspacing=0 width=100%><tr><td colspan=8 style=\"font-family:verdana;font-size:9px;font-color:black;line-height:9px;padding:1px\">"+this.txtCustomColors+":</td></tr></table>";

    sHTML+="<table cellpadding=0 cellspacing=0><tr>";

    for(var i=0;i<this.customColors.length;i++)

        {

        if(i<22)

            {

            if(i==8||i==16||i==24||i==32)sHTML+="</tr></table><table cellpadding=0 cellspacing=0><tr>"

            sHTML+="<td onclick=\""+this.oName+".color='"+this.customColors[i]+"';"+this.oName+".onPickColor()\" onmouseover=\"this.style.border='#777777 1px solid'\" onmouseout=\"this.style.border='#efefef 1px solid'\" style=\"cursor:default;padding:1px;border:#efefef 1px solid;\" unselectable=on>"+

                "   <table  style='margin:0px;width:13px;height:13px;background:"+this.customColors[i]+";border:white 1px solid' cellpadding=0 cellspacing=0 unselectable=on>"+

                "   <tr><td unselectable=on></td></tr>"+

                "   </table>"+

                "</td>";

            }

        }

    sHTML+="</tr></table>";

    document.getElementById("idCustomColor"+this.oRenderName).innerHTML=sHTML;

    }



function showColorPicker(oEl)

    {

    this.onShow();



    this.hideAll();



    var box=document.getElementById("dropColor"+this.oRenderName);



    //remove hilite

    var allTds = box.getElementsByTagName("TD");

    for (var i = 0; i<allTds.length; i++) {

        allTds[i].style.border="#efefef 1px solid";

        if (allTds[i].id==this.oName+"moreColTd") {

            allTds[i].style.border="#efefef 1px solid";

            allTds[i].style.background="#f3f3f3";

            allTds[i].style.color="#000000";

        }

    }



    box.style.display="block";

    var nTop=0;

    var nLeft=0;



    oElTmp=oEl;

    while(oElTmp.tagName!="BODY" && oElTmp.tagName!="HTML")

        {

        if(oElTmp.style.top!="")

            nTop+=oElTmp.style.top.substring(1,oElTmp.style.top.length-2)*1;

        else nTop+=oElTmp.offsetTop;

        oElTmp = oElTmp.offsetParent;

        }



    oElTmp=oEl;

    while(oElTmp.tagName!="BODY" && oElTmp.tagName!="HTML")

        {

        if(oElTmp.style.left!="")

            nLeft+=oElTmp.style.left.substring(1,oElTmp.style.left.length-2)*1;

        else nLeft+=oElTmp.offsetLeft;

        oElTmp=oElTmp.offsetParent;

        }



    if(this.align=="left")

        box.style.left=nLeft+"px";

    else//right

        box.style.left=(nLeft-143+oEl.offsetWidth)+"px";



    box.style.top=(nTop+iconOffsetTop+1+oUtil.obj.dropTopAdjustment)+"px";//[CUSTOM]

    //box.style.top=nTop+1+oEl.offsetHeight;//[CUSTOM]



    this.isActive=true;



    this.refreshCustomColor();

    }



function hideColorPicker()

    {

    this.onHide();



    var box=document.getElementById("dropColor"+this.oRenderName);

    box.style.display="none";

    this.isActive=false;

    }



function hideColorPickerAll()

    {

    for(var i=0;i<arrColorPickerObjects.length;i++)

        {

        var box=document.getElementById("dropColor"+eval(arrColorPickerObjects[i]).oRenderName);

        box.style.display="none";

        eval(arrColorPickerObjects[i]).isActive=false;

        }

    }



function moveTagSelector()

    {

    var sTagSelTop="<table unselectable=on ondblclick='"+this.oName+".moveTagSelector()' width='100%' cellpadding=0 cellspacing=0><tr style='background:#e7e7e7;font-family:arial;font-size:10px;color:black;'>"+

        "<td id=idElNavigate"+ this.oName +" style='padding:1px;width:100%' valign=top>&nbsp;</td>"+

        "<td align=right valign=top nowrap>"+

        "<span id=idElCommand"+ this.oName +" unselectable=on style='display:none;text-decoration:underline;cursor:pointer;padding-right:5px;' onclick='"+this.oName+".removeTag()'>"+getText("Remove Tag")+"</span>"+

        "</td></tr></table>";



    var sTagSelBottom="<table unselectable=on ondblclick='"+this.oName+".moveTagSelector()' width='100%' cellpadding=0 cellspacing=0><tr style='background:#e7e7e7;font-family:arial;font-size:10px;color:black;'>"+

        "<td id=idElNavigate"+ this.oName +" style='padding:1px;width:100%' valign=top>&nbsp;</td>"+

        "<td align=right valign=top nowrap>"+

        "<span id=idElCommand"+ this.oName +" unselectable=on style='display:none;text-decoration:underline;cursor:pointer;padding-right:5px;' onclick='"+this.oName+".removeTag()'>"+getText("Remove Tag")+"</span>"+

        "</td></tr></table>";

    var selTop = document.getElementById("idTagSelTop"+this.oName);

    var selTopRow = document.getElementById("idTagSelTopRow"+this.oName);

    var selBottom = document.getElementById("idTagSelBottom"+this.oName);

    var selBottomRow = document.getElementById("idTagSelBottomRow"+this.oName);



    if(this.TagSelectorPosition=="top")

        {

        selTop.innerHTML="";

        selBottom.innerHTML=sTagSelBottom;

        selTopRow.style.display="none";

        selBottomRow.style.display="";

        this.TagSelectorPosition="bottom";

        }

    else//if(this.TagSelectorPosition=="bottom")

        {

        selTop.innerHTML=sTagSelTop;

        selBottom.innerHTML="";

        selTopRow.style.display="";

        selBottomRow.style.display="none";

        this.TagSelectorPosition="top";

        }

    }



function loadHTML(sHTML)//hanya utk first load.

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oDoc=oEditor.document.open("text/html","replace");

    if(this.publishingPath!="")

        {

        var arrA = String(this.preloadHTML).match(/<base[^>]*>/ig);

        if(!arrA)

            {//if no <base> found

            sHTML=this.docType+"<HTML><HEAD><BASE HREF=\""+this.publishingPath+"\"/>"+this.headContent+"</HEAD><BODY>" + sHTML + "</BODY></HTML>";

            //kalau cuma tambah <HTML><HEAD></HEAD><BODY.. tdk apa2.

            }

        }

    else

        {

        sHTML=this.docType+"<HTML><HEAD>"+this.headContent+"</HEAD><BODY>"+sHTML+"</BODY></HTML>";

        }

    oDoc.write(sHTML);

    oDoc.close();



    //RealTime

    oEditor.document.addEventListener("keydown", new Function("editorDoc_onkeydown("+this.oName+")"), true) ;

    oEditor.document.addEventListener("keyup", new Function("editorDoc_onkeyup("+this.oName+")"), true);

    oEditor.document.addEventListener("mouseup", new Function("editorDoc_onmouseup("+this.oName+")"), true);



    //Styles

    if(this.arrStyle.length>0)

        {

        var oElement=oEditor.document.createElement("STYLE");

        oEditor.document.documentElement.childNodes[0].appendChild(oElement);

        var sCssText = "";

        for(var i=0;i<this.arrStyle.length;i++)

            {

            selector=this.arrStyle[i][0];

            style=this.arrStyle[i][3];

            sCssText += selector + " { " + style + " } ";

            oEditor.document.styleSheets[0].insertRule(selector + " { " + style + " } ", 0);

            }

        oElement.appendChild(oEditor.document.createTextNode(sCssText));

        }



    oEditor.document.body.style.width="50px";

    oEditor.document.body.style.height="50px";

    oEditor.document.body.style.width="";

    oEditor.document.body.style.height="";



    if(this.css!="")

        {

        var cssFrame = document.getElementById("myStyle"+this.oName).contentWindow;

        var cssDoc = cssFrame.document.open("text/html","replace");

        cssDoc.write("<html><head><link href=\""+this.css+"\" rel=\"stylesheet\" type=\"text/css\"></head><body onload=\"parent.ApplyExternalStyle('"+this.oName+"')\"></body></html>");

        cssDoc.close();

        try{ApplyExternalStyle(this.oName)}

        catch(e){;}

        }



    //<br> or <p>

    oEditor.document.addEventListener("keydown", new Function("var e=arguments[0];doKeyPress(eval(e), "+this.oName+")"), false);

    //try { oEditor.document.designMode="on"; } catch (e) {}

    }



function doOnPaste()

    {

    this.isAfterPaste=true;

    this.saveForUndo();//Save for Undo

    }



function loadHTMLFull(sHTML, firstLoad)//first load full HTML

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;



    //save doctype (if any/if not body only)

    var arrA=String(sHTML).match(/<!DOCTYPE[^>]*>/ig);

    if(arrA)

        for(var i=0;i<arrA.length;i++)

            {

            this.docType=arrA[i];

            }

    else this.docType="";//back to default value



    //save html (if any/if not body only)

    var arrB=String(sHTML).match(/<HTML[^>]*>/ig);

    if(arrB)

        for(var i=0;i<arrB.length;i++)

            {

            s=arrB[i];

            s=s.replace(/\"[^\"]*\"/ig,function(x){

                        x=x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/[\s+]/ig,"#_#");

                        return x});

            s=s.replace(/<([^ >]*)/ig,function(x){return x.toLowerCase()});

            s=s.replace(/ ([^=]+)=([^" >]+)/ig," $1=\"$2\"");

            s=s.replace(/ ([^=]+)=/ig,function(x){return x.toLowerCase()});

            s=s.replace(/#_#/ig," ");

            this.html=s;

            }

    else this.html="<html>";//back to default value



    //Dalam pengeditan jangan pakai doctype,

    //membuat mouse tdk bisa di-klik di empty area

/*    sHTML=String(sHTML).replace(/<!DOCTYPE[^>]*>/ig,"");

*/

    if(this.publishingPath!="")

        {

        var arrA = sHTML.match(/<base[^>]*>/ig);

        if(!arrA)

            {

            sHTML="<BASE HREF=\""+this.publishingPath+"\"/>"+sHTML;

            }

        }



    if (firstLoad) {

      try {oEditor.document.designMode="on";} catch(e) {}

    }

    var oDoc=oEditor.document.open("text/html","replace");

    oDoc.write(sHTML);

    oDoc.close();



    //RealTime

    oEditor.document.addEventListener("keydown", new Function("editorDoc_onkeydown("+this.oName+")"), true) ;

    oEditor.document.addEventListener("keyup", new Function("editorDoc_onkeyup("+this.oName+")"), true);

    oEditor.document.addEventListener("mouseup", new Function("editorDoc_onmouseup("+this.oName+")"), true);



    //<br> or <p>

    oEditor.document.addEventListener("keydown", new Function("var e=arguments[0];doKeyPress(eval(e), "+this.oName+")"), false);



    }



function putHTML(sHTML)

	{//used by source editor

	this.loadHTMLFull(sHTML, true);

	}



function getHTML()

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    sHTML=getOuterHTML(oEditor.document.documentElement);

    sHTML=String(sHTML).replace(/ contentEditable=true/g,"");

    sHTML = String(sHTML).replace(/\<PARAM NAME=\"Play\" VALUE=\"0\">/ig,"<PARAM NAME=\"Play\" VALUE=\"-1\">");

    sHTML=this.docType+sHTML;//restore doctype (if any)

    return sHTML;

    }

function getHTMLBody()

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    sHTML=oEditor.document.body.innerHTML;

    sHTML=String(sHTML).replace(/ contentEditable=true/g,"");

    sHTML = String(sHTML).replace(/\<PARAM NAME=\"Play\" VALUE=\"0\">/ig,"<PARAM NAME=\"Play\" VALUE=\"-1\">");

    return sHTML;

    }



var sBaseHREF="";

function getXHTML()

  {

  var oEditor=document.getElementById("idContent"+this.oName).contentWindow;



  //base handling

  sHTML=getOuterHTML(oEditor.document.documentElement);

  var arrTmp=sHTML.match(/<BASE([^>]*)>/ig);

  if(arrTmp!=null)sBaseHREF=arrTmp[0];

  var arrBase = oEditor.document.getElementsByTagName("BASE");

  if (arrBase.length != null) {

    for(var i=0; i<arrBase.length; i++) {

      arrBase[i].parentNode.removeChild(arrBase[i]);

    }

  }



  //~~~~~~~~~~~~~

  sBaseHREF=sBaseHREF.replace(/<([^ >]*)/ig,function(x){return x.toLowerCase()});

  sBaseHREF=sBaseHREF.replace(/ [^=]+="[^"]+"/ig,function(x){

        x=x.replace(/[\s+]/ig,"#_#");

        x=x.replace(/^#_#/," ");

        return x});

  sBaseHREF=sBaseHREF.replace(/ ([^=]+)=([^" >]+)/ig," $1=\"$2\"");

  sBaseHREF=sBaseHREF.replace(/ ([^=]+)=/ig,function(x){return x.toLowerCase()});

  sBaseHREF=sBaseHREF.replace(/#_#/ig," ");



  sBaseHREF=sBaseHREF.replace(/>$/ig," \/>").replace(/\/ \/>$/ig,"\/>");

  //~~~~~~~~~~~~~



  sHTML=recur(oEditor.document.documentElement,"");

  sHTML=this.docType+this.html+sHTML+"\n</html>";//restore doctype (if any) & html

  sHTML=sHTML.replace(/<\/title>/,"<\/title>"+sBaseHREF);//restore base href

  return sHTML;

  }



function getXHTMLBody()

  {

  var oEditor=document.getElementById("idContent"+this.oName).contentWindow;



  //base handling

  sHTML=getOuterHTML(oEditor.document.documentElement);

  var arrTmp=sHTML.match(/<BASE([^>]*)>/ig);

  if(arrTmp!=null)sBaseHREF=arrTmp[0];

  var arrBase = oEditor.document.getElementsByTagName("BASE");

  if (arrBase.length != null) {

    for(var i=0; i<arrBase.length; i++) {

      arrBase[i].parentNode.removeChild(arrBase[i]);

    }

  }

  //~~~~~~~~~~~~~



  sHTML=recur(oEditor.document.body,"");



  return sHTML;

  }



function ApplyExternalStyle(oName)

    {

    var sTmp="";

    var myStyle=document.getElementById("myStyle"+oName).contentWindow;

    for(var i=0;i<myStyle.document.styleSheets[0].cssRules.length;i++)

        {

        sSelector=myStyle.document.styleSheets[0].cssRules[i].selectorText;

        sCssText=myStyle.document.styleSheets[0].cssRules[i].style.cssText.replace(/"/g,"&quot;");

        var itemCount = sSelector.split(".").length;

        if(itemCount>1) sTmp+=",[\""+sSelector+"\",true,\""+sSelector+"\",\""+ sCssText + "\"]";

        else sTmp+=",[\""+sSelector+"\",false,\"\",\""+ sCssText + "\"]";

        }

    var arrStyle = eval("["+sTmp.substr(1)+"]");



    if(arrStyle.length>0)

        {

        var oEditor=document.getElementById("idContent"+oName).contentWindow;

        var oElement=oEditor.document.createElement("STYLE");

        oEditor.document.documentElement.childNodes[0].appendChild(oElement);

        var sCssText = "";

        for(var i=0;i<arrStyle.length;i++)

            {

            selector=arrStyle[i][0];

            style=arrStyle[i][3].replace(/&quot;/g,"\"");

            sCssText += selector + " { " + style + " } ";

            if(style!="")

                oEditor.document.styleSheets[0].insertRule(selector + " { " + style + " } ", 0);

            }

        oElement.appendChild(oEditor.document.createTextNode(sCssText));

        }



    eval(oName).arrStyle=arrStyle;

    }



function doKeyPress(evt,obj)

    {//return;



    if(!obj.arrUndoList[0]){obj.saveForUndo();}//pengganti saveForUndo_First



    /*

    if(evt.ctrlKey)

        {

        switch (evt.keyCode)

            {

            case 89: obj.doRedo(); break; //redo, CTRL-Y

            case 90: obj.doUndo(); break; //undo, CTRL-Z

            case 86: obj.doOnPaste(); break; //CTRL-V

            case 88: obj.saveForUndo(); break; //CTRL-X

            }

        }*/



    if(evt.keyCode==37||evt.keyCode==38||evt.keyCode==39||evt.keyCode==40)//Arrow

        {

        obj.saveForUndo();//Save for Undo

        }



    if(evt.keyCode==13)

        {

        obj.saveForUndo();//Save for Undo

        }

    }



/*** fullScreen ***/

function fullScreen()

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var edtArea = document.getElementById("idArea"+this.oName);



    this.hide();



    if(this.stateFullScreen)

        {

        this.onNormalScreen();

        this.stateFullScreen=false;

        document.body.style.overflow="";

        document.getElementById("id_refresh_z_index").style.margin="0px";

        edtArea.style.position="";

        edtArea.style.top="0px";

        edtArea.style.left="0px";

        edtArea.style.width=this.width+"px";

        edtArea.style.height=this.height+"px";



        for(var i=0;i<oUtil.arrEditor.length;i++)

            {

            if(oUtil.arrEditor[i]!=this.oName)

				{

				document.getElementById("idArea"+oUtil.arrEditor[i]).style.display="";

				try { document.getElementById("idContent"+oUtil.arrEditor[i]).contentWindow.document.designMode="on"; } catch (e) {}//new

				}

            }

        }

    else

        {

        this.onFullScreen();

        this.stateFullScreen=true;

        window.scroll(0,0);

        document.body.style.overflow="hidden";

        document.getElementById("id_refresh_z_index").style.margin="70px";

        edtArea.style.position="absolute";

        edtArea.style.top="0px";

        edtArea.style.left="0px";

        edtArea.style.width=window.innerWidth+"px";

        edtArea.style.height=window.innerHeight+"px";



        for(var i=0;i<oUtil.arrEditor.length;i++)

            {

            if(oUtil.arrEditor[i]!=this.oName) document.getElementById("idArea"+oUtil.arrEditor[i]).style.display="none";

            }

        oEditor.focus();

        }



        try { oEditor.document.designMode="on"; } catch (e) {}

    }



/*** REALTIME ***/

function editorDoc_onkeydown(edtObj)

    {

    realTime(edtObj);

    }



function editorDoc_onkeyup(edtObj)

    {

    if(edtObj.isAfterPaste)

        {

        edtObj.isAfterPaste=false;

        }

    realTime(edtObj);

    }



function editorDoc_onmouseup(edtObj)

    {

    oUtil.activeElement=null;//focus ke editor, jgn pakai selection dari tag selector

    oUtil.oName=edtObj.oName;

    oUtil.oEditor=document.getElementById("idContent"+edtObj.oName).contentWindow;

    oUtil.obj=edtObj;

    edtObj.hide();//pengganti onfocus

    realTime(edtObj);

    }



function setActiveEditor(edtObj)

    {

    oUtil.oName=edtObj.oName;

    oUtil.oEditor=document.getElementById("idContent"+edtObj.oName).contentWindow;

    oUtil.obj=edtObj;

    }



var arrTmp=[];

function GetElement(oElement,sMatchTag)//Used in realTime() only.

    {

    while (oElement!=null&&oElement.tagName!=sMatchTag)

        {

        if(oElement.tagName=="BODY")return null;

        oElement=oElement.parentNode;

        }

    return oElement;

    }



var arrTmp2=[];//TAG SELECTOR

function realTime(edtObj)

    {

    var oName = edtObj.oName;



    var oEditor=document.getElementById("idContent"+oName).contentWindow;



    var oSel=oEditor.getSelection();

    var element = getSelectedElement(oSel);



    //Enable/Disable Table Edit & Cell Edit Menu

    if(edtObj.btnTable)

        {

        edtObj.arrElm[1].style.color="gray";

        edtObj.arrElm[2].style.color="gray";

        edtObj.arrElm[3].style.color="gray";

        var oTable=GetElement(element,"TABLE");

        if (oTable)

            {

            edtObj.arrElm[1].style.color="black";

            edtObj.arrElm[2].style.color="black";

            edtObj.arrElm[3].style.color="gray";

            makeEnableNormal(edtObj.arrElm[0]);

            }

		else makeDisabled(edtObj.arrElm[0]);



        var oTD=GetElement(element,"TD");

        if (oTD)

            {

            edtObj.arrElm[1].style.color="black";

            edtObj.arrElm[2].style.color="black";

            edtObj.arrElm[3].style.color="black";

            }

        }



    //REALTIME BUTTONS HERE

    if(edtObj.btnParagraph)

        {

        if(oEditor.document.queryCommandEnabled("FormatBlock"))

            makeEnableNormal(edtObj.arrElm[4]);

        else makeDisabled(edtObj.arrElm[4]);

        }

    if(edtObj.btnFontName)

        {

        if(oEditor.document.queryCommandEnabled("FontName"))

            makeEnableNormal(edtObj.arrElm[5]);

        else makeDisabled(edtObj.arrElm[5]);

        }

    if(edtObj.btnFontSize)

        {

        if(oEditor.document.queryCommandEnabled("FontSize"))

            makeEnableNormal(edtObj.arrElm[6]);

        else makeDisabled(edtObj.arrElm[6]);

        }

    if(edtObj.btnUndo)

        {

        if(!edtObj.arrUndoList[0])makeDisabled(edtObj.arrElm[12]);

        else makeEnableNormal(edtObj.arrElm[12]);

        }

    if(edtObj.btnRedo)

        {

        if(!edtObj.arrRedoList[0])makeDisabled(edtObj.arrElm[13]);

        else makeEnableNormal(edtObj.arrElm[13]);

        }



    if(edtObj.btnBold)

        {

        if(oEditor.document.queryCommandEnabled("Bold"))

            {

            if(oEditor.document.queryCommandState("Bold"))

                makeEnablePushed(edtObj.arrElm[14]);

            else makeEnableNormal(edtObj.arrElm[14]);

            }

        else makeDisabled(edtObj.arrElm[14]);

        }

    if(edtObj.btnItalic)

        {

        if(oEditor.document.queryCommandEnabled("Italic"))

            {

            if(oEditor.document.queryCommandState("Italic"))

                makeEnablePushed(edtObj.arrElm[15]);

            else makeEnableNormal(edtObj.arrElm[15]);

            }

        else makeDisabled(edtObj.arrElm[15]);

        }

    if(edtObj.btnUnderline)

        {

        if(oEditor.document.queryCommandEnabled("Underline"))

            {

            if(oEditor.document.queryCommandState("Underline"))

                makeEnablePushed(edtObj.arrElm[16]);

            else makeEnableNormal(edtObj.arrElm[16]);

            }

        else makeDisabled(edtObj.arrElm[16]);

        }

    if(edtObj.btnStrikethrough)

        {

        if(oEditor.document.queryCommandEnabled("Strikethrough"))

            {

            if(oEditor.document.queryCommandState('Strikethrough'))

                makeEnablePushed(edtObj.arrElm[17]);

            else makeEnableNormal(edtObj.arrElm[17]);

            }

        else makeDisabled(edtObj.arrElm[17]);

        }

    if(edtObj.btnSuperscript)

        {

        if(oEditor.document.queryCommandEnabled("Superscript"))

            {

            if(oEditor.document.queryCommandState("Superscript"))

                makeEnablePushed(edtObj.arrElm[18]);

            else makeEnableNormal(edtObj.arrElm[18]);

            }

        else makeDisabled(edtObj.arrElm[18]);

        }

    if(edtObj.btnSubscript)

        {

        if(oEditor.document.queryCommandEnabled("Subscript"))

            {

            if(oEditor.document.queryCommandState("Subscript"))

                makeEnablePushed(edtObj.arrElm[19]);

            else makeEnableNormal(edtObj.arrElm[19]);

            }

        else makeDisabled(edtObj.arrElm[19]);

        }

    if(edtObj.btnNumbering)

        {

        if(oEditor.document.queryCommandEnabled("InsertOrderedList"))

            {

            if(oEditor.document.queryCommandState("InsertOrderedList"))

                makeEnablePushed(edtObj.arrElm[20]);

            else makeEnableNormal(edtObj.arrElm[20]);

            }

        else makeDisabled(edtObj.arrElm[20]);

        }

    if(edtObj.btnBullets)

        {

        if(oEditor.document.queryCommandEnabled("InsertUnorderedList"))

            {

            if(oEditor.document.queryCommandState("InsertUnorderedList"))

                makeEnablePushed(edtObj.arrElm[21]);

            else makeEnableNormal(edtObj.arrElm[21]);

            }

        else makeDisabled(edtObj.arrElm[21]);

        }

    if(edtObj.btnJustifyLeft)

        {

        if(oEditor.document.queryCommandEnabled("JustifyLeft"))

            {

            if(oEditor.document.queryCommandState("JustifyLeft"))

                makeEnablePushed(edtObj.arrElm[22]);

            else makeEnableNormal(edtObj.arrElm[22]);

            }

        else makeDisabled(edtObj.arrElm[22]);

        }

    if(edtObj.btnJustifyCenter)

        {

        if(oEditor.document.queryCommandEnabled("JustifyCenter"))

            {

            if(oEditor.document.queryCommandState("JustifyCenter"))

                makeEnablePushed(edtObj.arrElm[23]);

            else makeEnableNormal(edtObj.arrElm[23]);

            }

        else makeDisabled(edtObj.arrElm[23]);

        }

    if(edtObj.btnJustifyRight)

        {

        if(oEditor.document.queryCommandEnabled("JustifyRight"))

            {

            if(oEditor.document.queryCommandState("JustifyRight"))

                makeEnablePushed(edtObj.arrElm[24]);

            else makeEnableNormal(edtObj.arrElm[24]);

            }

        else makeDisabled(edtObj.arrElm[24]);

        }

    if(edtObj.btnJustifyFull)

        {

        if(oEditor.document.queryCommandEnabled("JustifyFull"))

            {

            if(oEditor.document.queryCommandState("JustifyFull"))

                makeEnablePushed(edtObj.arrElm[25]);

            else makeEnableNormal(edtObj.arrElm[25]);

            }

        else makeDisabled(edtObj.arrElm[25]);

        }

    if(edtObj.btnIndent)

        {

        if(oEditor.document.queryCommandEnabled("Indent"))

            makeEnableNormal(edtObj.arrElm[26]);

        else makeDisabled(edtObj.arrElm[26]);

        }

    if(edtObj.btnOutdent)

        {

        if(oEditor.document.queryCommandEnabled("Outdent"))

            makeEnableNormal(edtObj.arrElm[27]);

        else makeDisabled(edtObj.arrElm[27]);

        }

    if(edtObj.btnLTR)

        {

        if (element.dir)

            {

            if (element.dir.toLowerCase() == "ltr")

                makeEnablePushed(edtObj.arrElm[28]);

            else

                makeEnableNormal(edtObj.arrElm[28]);

			}

        else makeEnableNormal(edtObj.arrElm[28]);

        }

    if(edtObj.btnRTL)

		{

        if (element.dir)

            {

            if (element.dir.toLowerCase() == "rtl")

                makeEnablePushed(edtObj.arrElm[29]);

            else

                makeEnableNormal(edtObj.arrElm[29]);

            }

		else makeEnableNormal(edtObj.arrElm[29]);

		}

    if(element)

        {

        if(edtObj.btnForeColor)makeEnableNormal(edtObj.arrElm[30]);

        if(edtObj.btnBackColor)makeEnableNormal(edtObj.arrElm[31]);

        if(edtObj.btnLine)makeEnableNormal(edtObj.arrElm[32]);

        //if(edtObj.btnClean)makeEnableNormal(document.getElementById("btnClean"+oName));

        }

    else

        {

        if(edtObj.btnForeColor)makeDisabled(edtObj.arrElm[30]);

        if(edtObj.btnBackColor)makeDisabled(edtObj.arrElm[31]);

        if(edtObj.btnLine)makeDisabled(edtObj.arrElm[32]);

        //if(edtObj.btnClean)makeDisabled(document.getElementById("btnClean"+oName));

        }



    try{oUtil.onSelectionChanged()}catch(e){;}



    try{edtObj.onSelectionChanged()}catch(e){;}



    //TAG SELECTOR ~~~~~~~~~~~~~~~~~~

    if(edtObj.useTagSelector)

        {

        oElement=element;

        var sHTML="";var i=0;

        arrTmp2=[];//clear

        while (oElement!=null && oElement.tagName!="BODY" && oElement.nodeType==1)

            {

            arrTmp2[i]=oElement;

            sHTML = "&nbsp; &lt;<span id=tag"+oName+i+" unselectable=on style='text-decoration:underline;cursor:pointer' onclick=\""+oName+".selectElement("+i+")\">" + oElement.tagName + "</span>&gt;" + sHTML;

            oElement = oElement.parentNode;

            i++;

            }

        sHTML = "&nbsp;&lt;BODY&gt;" + sHTML;

        document.getElementById("idElNavigate"+oName).innerHTML = sHTML;

        document.getElementById("idElCommand"+oName).style.display="none";

        for (i=0; i<arrTmp2.length; i++)

            {

            document.getElementById("tag"+oName+i).addEventListener("click", new Function(oName+".selectElement("+i+")"), true);

            }

        }

    }



function selectElement(i)//TAG SELECTOR

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;



    var range = oEditor.document.createRange();

    range.selectNode(arrTmp2[i]);



    var oSel = oEditor.getSelection();

    oSel.removeAllRanges();

    oSel.addRange(range);



    oActiveElement = arrTmp2[i];

    if(oActiveElement.tagName!="TD"&&

        oActiveElement.tagName!="TR"&&

        oActiveElement.tagName!="TBODY"&&

        oActiveElement.tagName!="LI")

        document.getElementById("idElCommand"+this.oName).style.display="block";



    for(var j=0;j<arrTmp2.length;j++)document.getElementById("tag"+this.oName+j).style.background="";

    document.getElementById("tag"+this.oName+i).style.background="DarkGray";



    if(oActiveElement)

        oUtil.activeElement=oActiveElement;//Set active element in the Editor



    this.focus();



    }



function removeTag()

    {

    this.saveForUndo();//Save for Undo

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;



    var oSel=oEditor.getSelection();

    var element = getSelectedElement(oSel);

    var nearElement = element.nextSibling==null ? (element.previousSibling == null ? element.parentNode :element.previousSibling) : element.nextSibling;

    switch (element.nodeName) {

        case "TABLE": ;

        case "IMG": ;

        case "INPUT": ;

        case "FORM": ;

        case "SELECT":

            element.parentNode.removeChild(element);

            break;

        default:

            oSel = oEditor.getSelection();

            var range = oSel.getRangeAt(0);

            var docFrag = range.createContextualFragment(element.innerHTML);

            range.deleteContents();

            range.insertNode(docFrag);

            try { oEditor.document.designMode="on"; } catch (e) {}

            break;

    }



    oSel=oEditor.getSelection();

    oSel.removeAllRanges();

    var range = oEditor.document.createRange();

    range.setStart(nearElement, 0);

    range.setEnd(nearElement, 0);

    oSel.addRange(range);



    this.focus();

    realTime(this);



    }



function realtimeFontSelect(oName)

    {

    var oEditor=document.getElementById("idContent"+oName).contentWindow;

    var sFontName = oEditor.document.queryCommandValue("FontName");

    var iCols = document.getElementById("dropFontName"+oName).rows[0].childNodes.length;

    for(var i=0;i<iCols;i++)

        {

        var oFontTable=document.getElementById("dropFontName"+oName).rows[0].childNodes[i].childNodes[0];

        var rowFonts = oFontTable.rows;



        for(var j=0;j<rowFonts.length;j++)

            {

            if(sFontName.toLowerCase()+")"==rowFonts[j].childNodes[0].childNodes[1].innerHTML.split("(")[1].toLowerCase())

                {

                rowFonts[j].childNodes[0].style.backgroundColor="#708090";

                rowFonts[j].childNodes[0].style.color="#FFFFFF";

                }

            else

                {

                rowFonts[j].childNodes[0].style.backgroundColor="";

                rowFonts[j].childNodes[0].style.color="#000000";

                }

            }

        }

    }

function realtimeSizeSelect(oName)

    {

    var oEditor=document.getElementById("idContent"+oName).contentWindow;

    var sFontSize=oEditor.document.queryCommandValue("FontSize");

    var rowFonts=document.getElementById("dropFontSize"+oName).rows;

    for(var i=0;i<rowFonts.length;i++)

        {

        if("Size "+sFontSize==rowFonts[i].childNodes[0].childNodes[0].innerHTML)

            {

            rowFonts[i].childNodes[0].style.backgroundColor="#708090";

            rowFonts[i].childNodes[0].style.color="#FFFFFF";

            }

        else

            {

            rowFonts[i].childNodes[0].style.backgroundColor="";

            rowFonts[i].childNodes[0].style.color="#000000";

            }

        }

    }



/*** OTHERS ***/



function doCmd(sCmd,sOption)
{
    this.saveForUndo();//Save for Undo
    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    if(sCmd=='fontsize')
    {
        var oSel = oEditor.getSelection();
        var oElement = getSelectedElement(oSel);
        //alert(sOption);
        oElement.style.cssText = "font-size:"+sOption+";";
    }
    else
    {
        oEditor.document.execCommand(sCmd, false, sOption);
    }

    realTime(this);

}//end func...



function applyParagraph(val)

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    this.hide();

    //oSel.select();

    this.doCmd("FormatBlock",val);

    }



function applyFontName(val)

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    this.hide(); //ini menyebabkan text yg ter-select menjadi tdk ter-select di framed-page.

    //Solusi: oSel di select lagi

    //oSel.select();

    this.doCmd("fontname",val);

    }



function applyFontSize(val)
{
    var oEditor = document.getElementById("idContent"+this.oName).contentWindow;
    var oSel = oEditor.getSelection();
    this.hide();

    //oSel.select();
    this.doCmd("fontsize", val);
}



function applyBullets()

    {

    this.doCmd("InsertUnOrderedList");

    makeEnableNormal(document.getElementById("btnNumbering"+this.oName));



    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var oElement = getSelectedElement(oSel);

    while (oElement!=null&&

        oElement.tagName!="OL"&&

        oElement.tagName!="UL")

        {

        if(oElement.tagName=="BODY")return;

        oElement=oElement.parentNode;

        }

    oElement.removeAttribute("type",0);

    oElement.style.listStyleImage="";

    }



function applyNumbering()

    {

    this.doCmd("InsertOrderedList");

    makeEnableNormal(document.getElementById("btnBullets"+this.oName));



    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var oElement = getSelectedElement(oSel);

    while (oElement!=null&&

        oElement.tagName!="OL"&&

        oElement.tagName!="UL")

        {

        if(oElement.tagName=="BODY")return;

        oElement=oElement.parentNode;

        }

    oElement.removeAttribute("type",0);

    oElement.style.listStyleImage="";

    }



function applyJustifyLeft()

    {

    this.doCmd("JustifyLeft");

    if(this.btnJustifyCenter) makeEnableNormal(document.getElementById("btnJustifyCenter"+this.oName));

    if(this.btnJustifyRight) makeEnableNormal(document.getElementById("btnJustifyRight"+this.oName));

    if(this.btnJustifyFull) makeEnableNormal(document.getElementById("btnJustifyFull"+this.oName));

    }



function applyJustifyCenter()

    {

    this.doCmd("JustifyCenter");

    if(this.btnJustifyLeft) makeEnableNormal(document.getElementById("btnJustifyLeft"+this.oName));

    if(this.btnJustifyRight) makeEnableNormal(document.getElementById("btnJustifyRight"+this.oName));

    if(this.btnJustifyFull) makeEnableNormal(document.getElementById("btnJustifyFull"+this.oName));

    }



function applyJustifyRight()

    {

    this.doCmd("JustifyRight");

    if(this.btnJustifyLeft) makeEnableNormal(document.getElementById("btnJustifyLeft"+this.oName));

    if(this.btnJustifyCenter) makeEnableNormal(document.getElementById("btnJustifyCenter"+this.oName));

    if(this.btnJustifyFull) makeEnableNormal(document.getElementById("btnJustifyFull"+this.oName));

    }



function applyJustifyFull()

    {

    this.doCmd("JustifyFull");

    if(this.btnJustifyLeft) makeEnableNormal(document.getElementById("btnJustifyLeft"+this.oName));

    if(this.btnJustifyCenter) makeEnableNormal(document.getElementById("btnJustifyCenter"+this.oName));

    if(this.btnJustifyRight) makeEnableNormal(document.getElementById("btnJustifyRight"+this.oName));

    }



function applyBlockDirLTR()

    {

    //this.doCmd("BlockDirLTR");

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var oEl = getSelectedElement(oSel);

    if (oEl.dir) oEl.removeAttribute("dir"); else oEl.dir = "ltr";

    if(this.btnRTL) makeEnableNormal(document.getElementById("btnRTL"+this.oName));

    this.focus();

    }



function applyBlockDirRTL()

    {

    //this.doCmd("BlockDirRTL");

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var oEl = getSelectedElement(oSel);

    if (oEl.dir) oEl.removeAttribute("dir"); else oEl.dir = "rtl";

    if(this.btnLTR) makeEnableNormal(document.getElementById("btnLTR"+this.oName));

    this.focus();

    }



function insertCustomTag(sTag)

    {

    this.insertHTML(sTag);

    this.hide();

    this.focus();

    }



function expandSelection()

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var range = oSel.getRangeAt(0);

    if (range.startContainer.nodeType == Node.TEXT_NODE)

        {

        if (range.toString() == "")

            {

            //select a word

            var sPos = range.startOffset;

            var ePos = range.endOffset;

            var startCont = range.startContainer;

            var str = startCont.nodeValue;

            sPos = str.substring(0, range.startOffset).search(/(\W+\w*)$/i);

            sPos = sPos == -1 ? 0 : sPos;

            var tPos = str.substring(sPos, range.startOffset).search(/\w+/i);

            sPos += (tPos==-1 ? str.substring(sPos, range.startOffset).length : tPos);

            ePos = str.substr(range.endOffset).search(/\W+/i);

            ePos = ePos == -1 ? str.length : ePos + range.endOffset;

            range = oEditor.document.createRange();

            range.setStart(startCont, sPos);

            range.setEnd(startCont, ePos);

            oSel = oEditor.getSelection();

            oSel.removeAllRanges();

            oSel.addRange(range);

            }

        }



    return;

    }



function selectParagraph()

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var selParent = getSelectedElement(oSel);

    if(selParent)

        {

        if(oSel.getRangeAt(0).toString()=="")

            {

            var oElement=selParent;

            while (oElement!=null&&

                oElement.tagName!="H1"&&

                oElement.tagName!="H2"&&

                oElement.tagName!="H3"&&

                oElement.tagName!="H4"&&

                oElement.tagName!="H5"&&

                oElement.tagName!="H6"&&

                oElement.tagName!="PRE"&&

                oElement.tagName!="P"&&

                oElement.tagName!="DIV")

                {

                if(oElement.tagName=="BODY")return;

                oElement=oElement.parentNode;

                }



            var range = oEditor.document.createRange();

            range.selectNode(oElement);

            oSel = oEditor.getSelection();

            oSel.removeAllRanges();

            oSel.addRange(range);

            }

        }

    }



function insertHTML(sHTML)

    {

    this.focus();



    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var range = oSel.getRangeAt(0);



    var docFrag = range.createContextualFragment(sHTML);

    range.collapse(true);

    var lastNode = docFrag.childNodes[docFrag.childNodes.length-1];

    range.insertNode(docFrag);

    try { oEditor.document.designMode="on"; } catch (e) {}

    if (lastNode.nodeType==Node.TEXT_NODE)

        {

        range = oEditor.document.createRange();

        range.setStart(lastNode, lastNode.nodeValue.length);

        range.setEnd(lastNode, lastNode.nodeValue.length);

        oSel = oEditor.getSelection();

        oSel.removeAllRanges();

        oSel.addRange(range);

        }

    }



function insertLink(url,title,target)

    {

    this.focus();//Focus stuff



    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var range = oSel.getRangeAt(0);



    var emptySel = false;

    if(range.toString()=="")

        {

        emptySel = true;

        var cap = (title!="" && title!=null ? title : url);

        var node = oEditor.document.createTextNode(cap);

        range.insertNode(node);

        try { oEditor.document.designMode="on"; } catch (e) {}



        range = oEditor.document.createRange();

        range.setStart(node, 0);

        range.setEnd(node, cap.length);



        oSel = oEditor.getSelection();

        oSel.removeAllRanges();

        oSel.addRange(range);

        }

    var isSelInMidText = (range.startContainer.nodeType==Node.TEXT_NODE) && (range.startOffset>0);

    oEditor.document.execCommand("CreateLink", false, url);



    oSel = oEditor.getSelection();

    range = oSel.getRangeAt(0);



        //get A element

        if (range.startContainer.nodeType == Node.TEXT_NODE) {

            var node = (emptySel || !isSelInMidText ? range.startContainer.parentNode : range.startContainer.nextSibling); //A node

            range = oEditor.document.createRange();

            range.selectNode(node);



            oSel = oEditor.getSelection();

            oSel.removeAllRanges();

            oSel.addRange(range);



        }



        var oEl = range.startContainer.childNodes[range.startOffset];

        if(oEl)

            {

            if(target!="" && target!=undefined)oEl.target=target;

            }

    }



function clearAll()

    {

    if(confirm(getText("Are you sure you wish to delete all contents?"))==true)

        {

        var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

        oEditor.document.body.innerHTML="<BR>";

        oEditor.focus();

        }

    }



function doClean()

    {

    this.saveForUndo();//Save for Undo



    if(oUtil.activeElement)

        {

        var oActiveElement=oUtil.activeElement;

        oActiveElement.removeAttribute("className");

        oActiveElement.removeAttribute("style");



        if(oActiveElement.tagName=="H1"||

            oActiveElement.tagName=="H2"||

            oActiveElement.tagName=="H3"||

            oActiveElement.tagName=="H4"||

            oActiveElement.tagName=="H5"||

            oActiveElement.tagName=="H6"||

            oActiveElement.tagName=="PRE"||

            oActiveElement.tagName=="P"||

            oActiveElement.tagName=="DIV")

            {

            this.doCmd('FormatBlock','<P>');

            }

        }

    else

        {

        var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

        var oSel=oEditor.getSelection();

        var range = oSel.getRangeAt(0);

        var oEl = getSelectedElement(oSel);

        if (oEl!=null)

            {

            if(oEl.innerHTML==range.toString())

                {

                oEl.removeAttribute("className");

                oEl.removeAttribute("style");

                if(oEl.tagName=="H1"||

                    oEl.tagName=="H2"||

                    oEl.tagName=="H3"||

                    oEl.tagName=="H4"||

                    oEl.tagName=="H5"||

                    oEl.tagName=="H6"||

                    oEl.tagName=="PRE"||

                    oEl.tagName=="P"||

                    oEl.tagName=="DIV")

                    {

                    this.doCmd('FormatBlock','<P>');

                    }

                }

            }



        }

    this.doCmd('RemoveFormat');

    realTime(this);

    }


//blockTag = tag name to be used instead of span
function applySpan(blockTag)

    {

    var useBlock = "SPAN";

    if (blockTag!=null && blockTag!="") useBlock = blockTag;



    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();



    var range;

    var oElement;

    var sHTML;

    if (!isTextSelected(oSel)) { //if not text selection

        range = oSel.getRangeAt(0);

        oElement = getSelectedElement(oSel);

        if(oElement.nodeName==useBlock) return oElement;

        return;

    }

    range = oSel.getRangeAt(0);

    sHTML=range.toString();



    var docFrag = range.extractContents();

    var idSpan = oEditor.document.createElement(useBlock);

    idSpan.appendChild(docFrag);

    range.insertNode(idSpan);

    try { oEditor.document.designMode="on"; } catch (e){}



    range = oEditor.document.createRange();

    range.selectNode(idSpan);

    oSel = oEditor.getSelection();

    oSel.removeAllRanges();

    oSel.addRange(range);



    return idSpan;

    }



function makeAbsolute()

    {

    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;

    var oSel=oEditor.getSelection();

    var oEl = getSelectedElement(oSel);

    if(oEl!=null && oEl.nodeName!="BODY")

        {

        if (oEl.style.position == "absolute") oEl.style.position="";

        else oEl.style.position="absolute";

        }

    }



function doOver_TabCreate(el)

    {

    var oTD=el;

    var oTable=oTD.parentNode.parentNode.parentNode;

    var nRow=oTD.parentNode.rowIndex;

    var nCol=oTD.cellIndex;

    var rows=oTable.rows;

    var custCell = rows[rows.length-1].childNodes[0];

    custCell.innerHTML="<div align=right>"+(nRow*1+1) + " x " + (nCol*1+1) + " Table ...  &nbsp;&nbsp;&nbsp;<span style='text-decoration:underline'>Advanced</span>&nbsp;</div>";



    custCell.style.backgroundColor="";

    custCell.style.color="#000000";

    custCell.style.border="0px";

    for(var i=0;i<rows.length-1;i++)

        {

        var oRow=rows[i];

        for(var j=0;j<oRow.childNodes.length;j++)

            {

            var oCol=oRow.childNodes[j];

            if(i<=nRow&&j<=nCol)oCol.style.backgroundColor="#316ac5";

            else oCol.style.backgroundColor="#ffffff";

            }

        }

    //event.cancelBubble=true;

    }



function doOut_TabCreate(el)

    {

    var oTable=el;

    if(oTable.nodeName!="TABLE")return;

    var rows=oTable.rows;

    rows[rows.length-1].childNodes[0].innerHTML=getText("Advanced Table Insert");

    for(var i=0;i<rows.length-1;i++)

        {

        var oRow=rows[i];

        for(var j=0;j<oRow.childNodes.length;j++)

            {

            var oCol=oRow.childNodes[j];

            oCol.style.backgroundColor="#ffffff";

            }

        }

    //event.cancelBubble=true;

    }



function doRefresh_TabCreate()

    {

    var oTable=document.getElementById("dropTableCreate"+this.oName);

    var rows=oTable.rows;

    rows[rows.length-1].childNodes[0].innerHTML=getText("Advanced Table Insert");

    for(var i=0;i<rows.length-1;i++)

        {

        var oRow=rows[i];

        for(var j=0;j<oRow.childNodes.length;j++)

            {

            var oCol=oRow.childNodes[j];

            oCol.style.backgroundColor="#ffffff";

            }

        }

    }

function doClick_TabCreate(el)

    {

    this.hide();



    var oEditor=document.getElementById("idContent"+this.oName).contentWindow;



    var oTD=el;

    var nRow=oTD.parentNode.rowIndex+1;

    var nCol=oTD.cellIndex+1;



    this.saveForUndo();



    var sHTML="<table style='border-collapse:collapse;width:100%;' selThis='selThis'>";

    for(var i=1;i<=nRow;i++)

        {

        sHTML+="<tr>";

        for(var j=1;j<=nCol;j++)

            {

            sHTML+="<td></td>";

            }

        sHTML+="</tr>";

        }

    sHTML+="</table>";



    var oSel=oEditor.getSelection();

    var range = oSel.getRangeAt(0);

    range.collapse(true);



    var docFrag = range.createContextualFragment(sHTML);

    range.insertNode(docFrag);

    try { oEditor.document.designMode="on"; } catch (e) {}

    var allTabs = oEditor.document.getElementsByTagName("TABLE");

    for (var i = 0; i< allTabs.length; i++) {

        if (allTabs[i].getAttribute("selThis") == "selThis") {

            range = oEditor.document.createRange();

            range.selectNode(allTabs[i]);

            oSel = oEditor.getSelection();

            oSel.removeAllRanges();

            oSel.addRange(range);

            allTabs[i].removeAttribute("selThis");

            break;

        }

    }

    realTime(this);

    }



var iconOffsetTop = -72;



function dropShow(oEl,boxId)

    {

    var box = document.getElementById(boxId);



    //remove hilight

    var allTds = box.getElementsByTagName("TD");

    for (var i = 0; i < allTds.length; i++) {

        allTds[i].style.backgroundColor="";

        allTds[i].style.color = "#000000";

    }



    this.hide();

    box.style.display="block";

    var nTop=0;

    var nLeft=0;



    oElTmp=oEl;

    while(oElTmp.tagName!="BODY" && oElTmp.tagName!="HTML")

        {

        if(oElTmp.style.top!="")

            nTop+=oElTmp.style.top.substring(1,oElTmp.style.top.length-2)*1;

        else nTop+=oElTmp.offsetTop;

        oElTmp = oElTmp.offsetParent;

        }



    oElTmp=oEl;

    while(oElTmp.tagName!="BODY" && oElTmp.tagName!="HTML")

        {

        if(oElTmp.style.left!="")

            nLeft+=oElTmp.style.left.substring(1,oElTmp.style.left.length-2)*1;

        else nLeft+=oElTmp.offsetLeft;

        oElTmp=oElTmp.offsetParent;

        }

    box.style.left=nLeft+"px";

    box.style.top=(nTop+iconOffsetTop+this.dropTopAdjustment)+"px";

    }



function modelessDialogShow(url,width,height)

    {

    //window.showModelessDialog(url,window,

    //    "dialogWidth:"+width+"px;dialogHeight:"+height+"px;edge:Raised;center:1;help:0;resizable:1;");

    var left = screen.availWidth/2 - width/2;

    var top = screen.availHeight/2 - height/2;

    window.open(url, "", "dependent=yes,width="+width+"px,height="+height+",left="+left+",top="+top);

    }



function modalDialogShow(url,width,height)

    {

    //window.showModalDialog(url,window,

    //    "dialogWidth:"+width+"px;dialogHeight:"+height+"px;edge:Raised;center:1;help:0;resizable:1;maximize:1");

    var left = screen.availWidth/2 - width/2;

    var top = screen.availHeight/2 - height/2;

    oUtil.activeModalWin = window.open(url, "", "width="+width+"px,height="+height+",left="+left+",top="+top);

    window.onfocus = function(){if (oUtil.activeModalWin.closed == false){oUtil.activeModalWin.focus();};};

    }



function hide()

    {

    if(this.btnPreview)document.getElementById("dropPreview"+this.oName).style.display="none";

    if(this.btnTextFormatting||this.btnParagraphFormatting||this.btnListFormating||this.btnBoxFormatting||this.btnStyles||this.btnCssText) document.getElementById("dropStyle"+this.oName).style.display="none";

    if(this.btnParagraph)document.getElementById("dropParagraph"+this.oName).style.display="none";

    if(this.btnFontName)document.getElementById("dropFontName"+this.oName).style.display="none";

    if(this.btnFontSize)document.getElementById("dropFontSize"+this.oName).style.display="none";

    if(this.btnTable)document.getElementById("dropTable"+this.oName).style.display="none";

    if(this.btnTable)document.getElementById("dropTableCreate"+this.oName).style.display="none";

    if(this.btnForm)document.getElementById("dropForm"+this.oName).style.display="none";

    if(this.btnCustomTag)document.getElementById("dropCustomTag"+this.oName).style.display="none";



    this.oColor1.hide();

    this.oColor2.hide();



    //additional

    if(this.btnTable)this.doRefresh_TabCreate();



    }



/*** HTML to XHTML ***/

function lineBreak1(tag) //[0]<TAG>[1]text[2]</TAG>

  {

  arrReturn = ["\n","",""];

  if( tag=="A"||tag=="B"||tag=="CITE"||tag=="CODE"||tag=="EM"||

    tag=="FONT"||tag=="I"||tag=="SMALL"||tag=="STRIKE"||tag=="BIG"||

    tag=="STRONG"||tag=="SUB"||tag=="SUP"||tag=="U"||tag=="SAMP"||

    tag=="S"||tag=="VAR"||tag=="BASEFONT"||tag=="KBD"||tag=="TT")

    arrReturn=["","",""];



  if( tag=="TEXTAREA"||tag=="TABLE"||tag=="THEAD"||tag=="TBODY"||

    tag=="TR"||tag=="OL"||tag=="UL"||tag=="DIR"||tag=="MENU"||

    tag=="FORM"||tag=="SELECT"||tag=="MAP"||tag=="DL"||tag=="HEAD"||

    tag=="BODY"||tag=="HTML")

    arrReturn=["\n","","\n"];



  if( tag=="STYLE"||tag=="SCRIPT")

    arrReturn=["\n","",""];



  if(tag=="BR"||tag=="HR")

    arrReturn=["","\n",""];



  return arrReturn;

  }



function fixAttr(s)

  {

  s = String(s).replace(/&/g, "&amp;");

  s = String(s).replace(/</g, "&lt;");

  s = String(s).replace(/"/g, "&quot;");

  return s;

  }



function fixVal(s)

  {

  s = String(s).replace(/&/g, "&amp;");

  s = String(s).replace(/</g, "&lt;");

  return s;

  }



function recur(oEl,sTab)

  {

  var sHTML="";

  for(var i=0;i<oEl.childNodes.length;i++)

    {

    var oNode=oEl.childNodes[i];

    if(oNode.nodeType==1)//tag

      {

      var sTagName = oNode.nodeName;



      var bDoNotProcess=false;

      if(sTagName.substring(0,1)=="/")

        {

        bDoNotProcess=true;//do not process

        }

      else

        {

        /*** tabs ***/

        var sT= sTab;

        sHTML+= lineBreak1(sTagName)[0];

        if(lineBreak1(sTagName)[0] !="") sHTML+= sT;//If new line, use base Tabs

        /************/

        }



      if(bDoNotProcess)

        {

        ;//do not process

        }

      else if(sTagName=="OBJECT" || sTagName=="EMBED")

        {

        s=getOuterHTML(oNode);



        s=s.replace(/\"[^\"]*\"/ig,function(x){

            x=x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/[\s+]/ig,"#_#");

            return x});

        s=s.replace(/<([^ >]*)/ig,function(x){return x.toLowerCase()})

        s=s.replace(/ ([^=]+)=([^"' >]+)/ig," $1=\"$2\"");//new



        s=s.replace(/ ([^=]+)=/ig,function(x){return x.toLowerCase()});

        s=s.replace(/#_#/ig," ");



        s=s.replace(/<param([^>]*)>/ig,"\n<param$1 />").replace(/\/ \/>$/ig," \/>");//no closing tag



        if(sTagName=="EMBED")

          if(oNode.innerHTML=="")

            s=s.replace(/>$/ig," \/>").replace(/\/ \/>$/ig,"\/>");//no closing tag



        s=s.replace(/<param name=\"Play\" value=\"0\" \/>/,"<param name=\"Play\" value=\"-1\" \/>")



        sHTML+=s;

        }

      else if(sTagName=="TITLE")

        {

        sHTML+="<title>"+oNode.innerHTML+"</title>";

        }

      else

        {

        if(sTagName=="AREA")

          {

          var sCoords=oNode.coords;

          var sShape=oNode.shape;

          }



        var oNode2=oNode.cloneNode(false);

        s=getOuterHTML(oNode2).replace(/<\/[^>]*>/,"");



        if(sTagName=="STYLE")

          {

          var arrTmp=s.match(/<[^>]*>/ig);

          s=arrTmp[0];

          }



        s=s.replace(/\"[^\"]*\"/ig,function(x){

            //x=x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/[\s+]/ig,"#_#");

            //x=x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\s+]/ig,"#_#");

            x=x.replace(/&/g, "&amp;").replace(/&amp;amp;/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\s+]/ig,"#_#");

            return x});

            //info ttg: .replace(/&amp;amp;/g, "&amp;")

            //ini karena '&' di (hanya) '&amp;' selalu di-replace lagi dgn &amp;.

            //tapi kalau &lt; , &gt; tdk (no problem) => default behaviour



        s=s.replace(/<([^ >]*)/ig,function(x){return x.toLowerCase()})

        s=s.replace(/ ([^=]+)=([^" >]+)/ig," $1=\"$2\"");

        s=s.replace(/ ([^=]+)=/ig,function(x){return x.toLowerCase()});

        s=s.replace(/#_#/ig," ");



        //single attribute

        s=s.replace(/[<hr]?(noshade)/ig,"noshade=\"noshade\"");

        s=s.replace(/[<input]?(checked)/ig,"checked=\"checked\"");

        s=s.replace(/[<select]?(multiple)/ig,"multiple=\"multiple\"");

        s=s.replace(/[<option]?(selected)/ig,"selected=\"true\"");

        s=s.replace(/[<input]?(readonly)/ig,"readonly=\"readonly\"");

        s=s.replace(/[<input]?(disabled)/ig,"checked=\"disabled\"");

        s=s.replace(/[<td]?(nowrap )/ig,"nowrap=\"nowrap\" ");

        s=s.replace(/[<td]?(nowrap\>)/ig,"nowrap=\"nowrap\"\>");



        s=s.replace(/ contenteditable=\"true\"/ig,"");



        if(sTagName=="AREA")

          {

          s=s.replace(/ coords=\"0,0,0,0\"/ig," coords=\""+sCoords+"\"");

          s=s.replace(/ shape=\"RECT\"/ig," shape=\""+sShape+"\"");

          }



        var bClosingTag=true;

        if(sTagName=="IMG"||sTagName=="BR"||

          sTagName=="AREA"||sTagName=="HR"||

          sTagName=="INPUT"||sTagName=="BASE"||

          sTagName=="LINK")//no closing tag

          {

          s=s.replace(/>$/ig," \/>").replace(/\/ \/>$/ig,"\/>");//no closing tag

          bClosingTag=false;

          }



        sHTML+=s;



        /*** tabs ***/

        if(sTagName!="TEXTAREA")sHTML+= lineBreak1(sTagName)[1];

        if(sTagName!="TEXTAREA")if(lineBreak1(sTagName)[1] !="") sHTML+= sT;//If new line, use base Tabs

        /************/



        if(bClosingTag)

          {

          /*** CONTENT ***/

          s=getOuterHTML(oNode);

          if(sTagName=="SCRIPT")

            {

            s = s.replace(/<script([^>]*)>[\n+\s+\t+]*/ig,"<script$1>");//clean spaces

            s = s.replace(/[\n+\s+\t+]*<\/script>/ig,"<\/script>");//clean spaces

            s = s.replace(/<script([^>]*)>\/\/<!\[CDATA\[/ig,"");

            s = s.replace(/\/\/\]\]><\/script>/ig,"");

            s = s.replace(/<script([^>]*)>/ig,"");

            s = s.replace(/<\/script>/ig,"");

            s = s.replace(/^\s+/,'').replace(/\s+$/,'');



            sHTML+="\n"+

              sT + "//<![CDATA[\n"+

              sT + s + "\n" +

              sT + "//]]>\n"+sT;



            }

          if(sTagName=="STYLE")

            {

            s = s.replace(/<style([^>]*)>[\n+\s+\t+]*/ig,"<style$1>");//clean spaces

            s = s.replace(/[\n+\s+\t+]*<\/style>/ig,"<\/style>");//clean spaces

            s = s.replace(/<style([^>]*)><!--/ig,"");

            s = s.replace(/--><\/style>/ig,"");

            s = s.replace(/<style([^>]*)>/ig,"");

            s = s.replace(/<\/style>/ig,"");

            s = s.replace(/^\s+/,"").replace(/\s+$/,"");



            sHTML+="\n"+

              sT + "<!--\n"+

              sT + s + "\n" +

              sT + "-->\n"+sT;

            }

          if(sTagName=="DIV"||sTagName=="P")

            {

            if(oNode.innerHTML==""||oNode.innerHTML=="&nbsp;")

              {

              sHTML+="&nbsp;";

              }

            else sHTML+=recur(oNode,sT+"\t");

            }

          else

            {

            sHTML+=recur(oNode,sT+"\t");

            }



          /*** tabs ***/

          if(sTagName!="TEXTAREA")sHTML+=lineBreak1(sTagName)[2];

          if(sTagName!="TEXTAREA")if(lineBreak1(sTagName)[2] !="")sHTML+=sT;//If new line, use base Tabs

          /************/



          sHTML+="</" + sTagName.toLowerCase() + ">";

          }

        }

      }

    else if(oNode.nodeType==3)//text

      {

      sHTML+= fixVal(oNode.nodeValue);

      }

    else if(oNode.nodeType==8)

      {

      if(getOuterHTML(oNode).substring(0,2)=="<"+"%")

        {//server side script

        sTmp=(getOuterHTML(oNode).substring(2))

        sTmp=sTmp.substring(0,sTmp.length-2)

        sTmp = sTmp.replace(/^\s+/,"").replace(/\s+$/,"");



        /*** tabs ***/

        var sT= sTab;

        /************/



        sHTML+="\n" +

          sT + "<%\n"+

          sT + sTmp + "\n" +

          sT + "%>\n"+sT;

        }

      else

        {//comments

        sTmp=oNode.nodeValue;

        sTmp = sTmp.replace(/^\s+/,"").replace(/\s+$/,"");



        sHTML+="\n" +

          sT + "<!--\n"+

          sT + sTmp + "\n" +

          sT + "-->\n"+sT;

        }

      }

    else

      {

      ;//Not Processed

      }

    }

  return sHTML;

  }



/**===============================================*/

/** TOOLBAR ICONS RELATED METHODS

/**===============================================*/



var buttonArrays=new Object();

var bCancel=false;



function writeIconToggle(id,command,img,title)

    {

    w=this.iconWidth;

    h=this.iconHeight;

    imgPath=this.scriptPath+this.iconPath+img;

    sHTML=""+

        "<td unselectable='on' style='padding-right:1px;VERTICAL-ALIGN: top;margin-left:0px;margin-right:1px;margin-bottom:1px;width:"+w+"px;height:"+h+"px;'>"+

        "<span unselectable='on' style='position:absolute;clip: rect(0px "+w+"px "+h+"px 0px)'>"+

        "<img name=\""+id+"\" id=\""+id+"\" unselectable='on' src='"+imgPath+"' style='position:absolute;top:"+iconOffsetTop+"px;width:"+w+"px'"+

        "onmouseover='doOver(this)' "+

        "onmouseout='doOut(this)' "+

        "onmousedown='doDown(this)' "+

		"onmouseup=\"if(doUpToggle(this)){"+command+"}\" alt=\""+title+"\" title=\"" + title + "\">"+

		"</span></td>";

    sHTML="<table align=left cellpadding=0 cellspacing=0 style='table-layout:fixed;'><tr>"+sHTML+"</tr></table>";

    buttonArrays[id] = ["inactive"];

    return sHTML;

    }



function writeIconStandard(id,command,img,title)

    {

    w=this.iconWidth;

    h=this.iconHeight;

    imgPath=this.scriptPath+this.iconPath+img;

    sHTML=""+

        "<td unselectable='on' style='padding-right:1px;VERTICAL-ALIGN: top;margin-left:0px;margin-right:1px;margin-bottom:1px;width:"+w+"px;height:"+h+"px;'>"+

        "<span unselectable='on' style='position:absolute;clip: rect(0px "+w+"px "+h+"px 0px)'>"+

        "<img name=\""+id+"\" id=\""+id+"\" unselectable='on' src='"+imgPath+"' style='position:absolute;top:"+iconOffsetTop+"px;width:"+w+"px'"+

        "onmouseover='doOver(this)' "+

        "onmouseout='doOut(this)' "+

        "onmousedown='doDown(this)' "+

        "onmouseup=\"if(doUp(this)){"+command+"}\" alt=\""+title+"\" title=\"" + title + "\">"+

        "</span></td>";

    sHTML="<table align=left cellpadding=0 cellspacing=0 style='table-layout:fixed;'><tr>"+sHTML+"</tr></table>";

    buttonArrays[id] = ["inactive"];

    return sHTML;

    }



function writeBreakSpace()

    {

    w=this.iconWidth;

    h=this.iconHeight;

    imgPath=this.scriptPath+this.iconPath+"brkspace.gif";

    sHTML=""+

        "<td unselectable='on' style='padding-left:0px;padding-right:0px;VERTICAL-ALIGN:top;margin-bottom:1px;width:5px;height:"+h+"px;'>"+

        "<img unselectable='on' src='"+imgPath+"' width=5px></td>";

    sHTML="<table align=left cellpadding=0 cellspacing=0 style='table-layout:fixed;'><tr>"+sHTML+"</tr></table>";

    return sHTML;

    }



function writeDropDown(id,command,img,title,width)

    {

    w=width;

    h=this.iconHeight;



    /*** Localization ***/

    imgPath=this.scriptPath+this.iconPath+oUtil.langDir+"/"+img;

    /*** /Localization ***/



    sHTML=""+

        "<td style='padding-right:1px;vertical-align:top;margin-left:0px;margin-right:1px;margin-bottom:1px;width:"+w+"px;height:"+h+"px;'>"+

        "<span style='position:absolute;clip: rect(0px "+w+"px "+h+"px 0px)'>"+

        "<img name=\""+id+"\" id=\""+id+"\" src='"+imgPath+"' style='position:absolute;top:"+iconOffsetTop+"px;width:"+w+"px'"+

        "onmouseover='doOver(this)' "+

        "onmouseout='doOut(this)' "+

        "onmousedown='doDown(this)' "+

        "onmouseup=\"if(doUp(this)){"+command+"}\" alt=\""+title+"\" title=\"" + title + "\">"+

        "</span></td>";

    sHTML="<table align=left cellpadding=0 cellspacing=0 style='table-layout:fixed;'><tr>"+sHTML+"</tr></table>";

    buttonArrays[id] = ["inactive"];

    return sHTML;

    }



function doOver(btn)

    {

    btnArr=buttonArrays[btn.id];

    if(btnArr[0]=="inactive")btn.style.top=(-24+iconOffsetTop)+"px";//no.2

    }



function doDown(btn)

    {

    bCancel=false;

    btnArr=buttonArrays[btn.id];

    if(btnArr[0]!="disabled")btn.style.top=(-48+iconOffsetTop)+"px";//no.3

    }



function doOut(btn)

    {

    if(btn.style.top==(-48+iconOffsetTop)+"px")

        {

        //lagi pushed tapi mouseout (cancel)

        bCancel=true;

        }



    btnArr=buttonArrays[btn.id];

    if(btnArr[0]=="active")btn.style.top=(-72+iconOffsetTop)+"px";//no.4 (remain active/pushed)

    if(btnArr[0]=="inactive")btn.style.top=(0+iconOffsetTop)+"px";//no.1 (remain inactive)

    }





function doUpToggle(btn)

    {

    if(bCancel)

        {

        //lagi pushed tapi mouseout (cancel)

        bCancel=false;btn.style.top=(0+iconOffsetTop)+"px";;

        return false;

        }

    btnArr = buttonArrays[btn.id];

    if(btnArr[0]=="inactive")

        {

        btn.style.top=(-72+iconOffsetTop)+"px";//no.4

        btnArr[0]="active";

        return true;

        }

    if(btnArr[0]=="active")

        {

        btn.style.top=(-24+iconOffsetTop)+"px";//no.2

        btnArr[0]="inactive";

        return true;

        }

    }



function doUp(btn)//return true/false

    {

    if(bCancel)

        {

        //lagi pushed tapi mouseout (cancel)

        bCancel=false;btn.style.top=(0+iconOffsetTop)+"px";

        return false;

        }

    btnArr=buttonArrays[btn.id];

    if(btnArr[0]=="disabled") return false;

    btn.style.top=(-24+iconOffsetTop)+"px";//no.2

    return true;



    }



function makeEnablePushed(btn)

    {

    btnArr=buttonArrays[btn.id];

    btnArr[0]="active";

    btn.style.top=(-72+iconOffsetTop)+"px";//no.4

    }



function makeEnableNormal(btn)

    {

    btnArr=buttonArrays[btn.id];

    btnArr[0]="inactive";

    btn.style.top=(0+iconOffsetTop)+"px";//no.1

    }



function makeDisabled(btn)

    {

    btnArr=buttonArrays[btn.id];

    btnArr[0]="disabled";

    btn.style.top=(-96+iconOffsetTop)+"px";//no.5

    }



//===================================

// Netscape range methods

//===================================



function getSelectedElement(sel) {

    var range = sel.getRangeAt(0);

    var node = range.startContainer;

    if (node.nodeType == Node.ELEMENT_NODE) {

        if (range.startOffset >= node.childNodes.length) return node;

        node = node.childNodes[range.startOffset];

    }



    if (node.nodeType == Node.TEXT_NODE) {

        while (node!=null && node.nodeType != Node.ELEMENT_NODE) {

            node = node.parentNode;

        }

    }



    return node;

}



function isTextSelected(sel) {

    var range = sel.getRangeAt(0);



    if (range!=null && range.startContainer!=null) {

        return (range.startContainer.nodeType == Node.TEXT_NODE);

    }

    return false;

}



function getOuterHTML(node)

	{

    var sHTML = "";

    switch (node.nodeType)

		{

        case Node.ELEMENT_NODE:

            sHTML = "<" + node.nodeName;



            var tagVal ="";

            for (var atr=0; atr < node.attributes.length; atr++)

				{

                if (node.attributes[atr].nodeName.substr(0,4) == "_moz" ) continue;

                if (node.attributes[atr].nodeValue.substr(0,4) == "_moz" ) continue;//yus

                if (node.nodeName=='TEXTAREA' && node.attributes[atr].nodeName.toLowerCase()=='value')

					{

                    tagVal = node.attributes[atr].nodeValue;

					}

				else

					{

                    sHTML += ' ' + node.attributes[atr].nodeName + '="' + node.attributes[atr].nodeValue + '"';

					}

				}

            sHTML += '>';

            sHTML += (node.nodeName!='TEXTAREA' ? node.innerHTML : tagVal);

            sHTML += "</"+node.nodeName+">";

            break;

        case Node.COMMENT_NODE:

            sHTML = "<!"+"--"+node.nodeValue+ "--"+">"; break;

        case Node.TEXT_NODE:

            sHTML = node.nodeValue; break;

		}

    return sHTML

	}