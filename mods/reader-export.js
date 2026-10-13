(function(){
var rd=window.__rd;
if(!rd)return;
if(rd.modules.exportLoaded)return;
if(!rd.modules.readChapter){alert('下载导出需要前置：阅读模块');return}
if(!rd.modules.siteLoaded){alert('下载导出需要前置：站点识别');return}
rd.modules.exportLoaded=1;

var c=rd.ctx;
var D=document,W=window,Q=c.Q,O=c.O;
var toast=c.toast,escH=c.escH,LSV=c.LSV;
var FH=c.FH,FC=c.FC,HT=c.HT,TP=c.TP;
var cacheGet=c.cacheGet,cacheSet=c.cacheSet;

function last_(){try{return JSON.parse(LSV('RDR_LAST')||'null')||{}}catch(e){return{}}}
function getBookUrl(){return W.__rdLastDetail||last_().bu||''}
function getBookTitle(){
  var t=Q('.t');
  if(t&&t.textContent&&t.textContent!=='加载中…')return t.textContent.trim();
  return last_().ct||'book';
}
function sanitizeName(s){return String(s||'book').replace(/[\\/:*?"<>|]/g,'_').slice(0,80)}

function downloadBlob(name,blob){
  try{
    var url=URL.createObjectURL(blob);
    var a=D.createElement('a');
    a.href=url;a.download=name;
    a.style.cssText='position:fixed;left:-9999px';
    D.body.appendChild(a);a.click();
    setTimeout(function(){URL.revokeObjectURL(url);if(a.parentNode)a.parentNode.removeChild(a)},500);
  }catch(e){toast('下载失败')}
}
function downloadText(name,text,mime){
  downloadBlob(name,new Blob([text],{type:mime||'text/plain;charset=utf-8'}));
}

function fetchBookChapters(bookUrl){
  return FH(bookUrl).then(function(h){
    var d=new DOMParser().parseFromString(h,'text/html');
    var a=[],sn={};
    var cl=d.querySelectorAll('a[href*="action=article"], a[href*="chapter"], a[href*="read"]');
    for(var i=0;i<cl.length;i++){
      var hr=cl[i].getAttribute('href');if(!hr)continue;
      var f;try{f=new URL(hr,bookUrl).href.split('#')[0]}catch(e){continue}
      if(sn[f])continue;sn[f]=1;
      var t=(cl[i].textContent||'').trim();
      if(!t||t.length>80)continue;
      if(t.indexOf('从头开始')>=0||t.indexOf('从头阅读')>=0||t.indexOf('从头看')>=0)continue;
      a.push({u:f,t:t});
    }
    a.sort(function(x,y){var ma=x.u.match(/[?&]id=(\d+)/),mb=y.u.match(/[?&]id=(\d+)/);if(!ma||!mb)return 0;return parseInt(ma[1])-parseInt(mb[1])});
    return a;
  });
}

function showProg(total){
  var el=D.createElement('div');
  el.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(20,20,24,.96);color:#fff;padding:18px 22px;border-radius:12px;z-index:2147483647;font:13px system-ui;min-width:260px;text-align:center';
  var bar='';for(var i=0;i<20;i++)bar+='□';
  el.innerHTML='<div style="margin-bottom:10px">批量下载</div><div class="rd-ex-p" style="font-family:monospace;color:#4a8fe0;letter-spacing:1px;margin-bottom:6px">'+bar+' 0%</div><div class="rd-ex-t" style="opacity:.7;font-size:12px">0/'+total+'</div>';
  D.body.appendChild(el);
  var p=el.querySelector('.rd-ex-p'),t=el.querySelector('.rd-ex-t');
  return {
    update:function(done,failed){
      var n=Math.round(done/total*20),s='';
      for(var i=0;i<20;i++)s+=i<n?'■':'□';
      p.textContent=s+' '+Math.round(done/total*100)+'%';
      t.textContent=done+'/'+total+(failed?(' 失败'+failed):'');
    },
    finish:function(failed){
      t.textContent=failed?('完成，失败'+failed+'章'):'全部完成';
      setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el)},1000);
    }
  };
}

function doBatch(bookUrl,bookName){
  if(!bookUrl){toast('未获取书籍地址');return}
  toast('正在获取章节');
  fetchBookChapters(bookUrl).then(function(chapters){
    if(!chapters.length){toast('未获取到章节');return}
    var s=prompt('开始章节序号（1-'+chapters.length+'）','1');
    if(!s)return;
    var e=prompt('结束章节序号（1-'+chapters.length+'）',String(chapters.length));
    if(!e)return;
    var si=Math.max(1,parseInt(s))-1;
    var ei=Math.min(chapters.length,parseInt(e));
    var todo=chapters.slice(si,ei).filter(function(ch){return !cacheGet(ch.u)});
    if(!todo.length){toast('所选章节已全部缓存');return}
    var total=todo.length,done=0,failed=0;
    var ov=showProg(total);
    var q=todo.slice();
    function worker(){
      if(!q.length)return Promise.resolve();
      var ch=q.shift();
      return FH(ch.u).then(function(h){
        var d=new DOMParser().parseFromString(h,'text/html');
        var cc=FC(d);
        if(!cc)throw new Error('无正文');
        var ps=TP(HT(cc.innerHTML));
        if(!ps.length)throw new Error('空正文');
        cacheSet(ch.u,ch.t,ps);
      }).then(function(){done++;ov.update(done,failed);return worker()}).catch(function(){failed++;done++;ov.update(done,failed);return worker()});
    }
    var ws=[];
    for(var i=0;i<3;i++)ws.push(worker());
    Promise.all(ws).then(function(){ov.finish(failed)});
  }).catch(function(e){toast('获取失败：'+(e.message||e))});
}

function doTxt(bookUrl,bookName){
  if(!bookUrl){toast('未获取书籍地址');return}
  toast('正在获取章节');
  fetchBookChapters(bookUrl).then(function(chapters){
    var lines=[],cnt=0;
    chapters.forEach(function(ch){
      var cached=cacheGet(ch.u);
      if(!cached||!cached.length)return;
      lines.push('');lines.push(ch.t);lines.push('');
      for(var i=0;i<cached.length;i++)lines.push(cached[i]);
      cnt++;
    });
    if(!cnt){toast('无已缓存章节');return}
    downloadText(sanitizeName(bookName)+'.txt',lines.join('\n'),'text/plain;charset=utf-8');
    toast('已导出 '+cnt+' 章');
  }).catch(function(e){toast('获取失败：'+(e.message||e))});
}

function loadJSZip(){
  return new Promise(function(resolve,reject){
    if(W.JSZip)return resolve();
    var s=D.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
    s.onload=function(){resolve()};
    s.onerror=function(){reject(new Error('JSZip 加载失败'))};
    D.head.appendChild(s);
  });
}
function doEpub(bookUrl,bookName){
  if(!bookUrl){toast('未获取书籍地址');return}
  toast('正在获取章节');
  fetchBookChapters(bookUrl).then(function(chapters){
    var list=[];
    chapters.forEach(function(ch){
      var cached=cacheGet(ch.u);
      if(cached&&cached.length)list.push({t:ch.t,p:cached});
    });
    if(!list.length){toast('无已缓存章节');return}
    toast('正在打包 EPUB');
    loadJSZip().then(function(){
      var zip=new W.JSZip();
      zip.file('mimetype','application/epub+zip',{compression:'STORE'});
      zip.file('META-INF/container.xml','<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>');
      var uuid='urn:uuid:'+Date.now()+'-'+Math.random().toString(36).slice(2,10);
      var manifest=[],spine=[],navPts=[];
      for(var i=0;i<list.length;i++){
        var ch=list[i];
        var fn='ch_'+(i+1)+'.xhtml';
        var html='<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><title>'+escH(ch.t)+'</title><link rel="stylesheet" href="style.css" type="text/css"/></head><body><h1>'+escH(ch.t)+'</h1>';
        for(var j=0;j<ch.p.length;j++)html+='<p>'+escH(ch.p[j])+'</p>';
        html+='</body></html>';
        zip.file('OEBPS/'+fn,html);
        manifest.push('<item id="c'+(i+1)+'" href="'+fn+'" media-type="application/xhtml+xml"/>');
        spine.push('<itemref idref="c'+(i+1)+'"/>');
        navPts.push('<navPoint id="n'+(i+1)+'" playOrder="'+(i+1)+'"><navLabel><text>'+escH(ch.t)+'</text></navLabel><content src="'+fn+'"/></navPoint>');
      }
      zip.file('OEBPS/style.css','body{font-family:serif;line-height:1.8;margin:1em}h1{font-size:1.2em;margin:1em 0;text-align:center}p{text-indent:2em;margin:0.3em 0;text-align:justify}');
      var opf='<?xml version="1.0" encoding="utf-8"?><package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="bookid"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf"><dc:title>'+escH(bookName)+'</dc:title><dc:language>zh-CN</dc:language><dc:identifier id="bookid">'+uuid+'</dc:identifier></metadata><manifest><item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/><item id="css" href="style.css" media-type="text/css"/>'+manifest.join('')+'</manifest><spine toc="ncx">'+spine.join('')+'</spine></package>';
      zip.file('OEBPS/content.opf',opf);
      var ncx='<?xml version="1.0" encoding="utf-8"?><!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd"><ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="'+uuid+'"/></head><docTitle><text>'+escH(bookName)+'</text></docTitle><navMap>'+navPts.join('')+'</navMap></ncx>';
      zip.file('OEBPS/toc.ncx',ncx);
      return zip.generateAsync({type:'blob',mimeType:'application/epub+zip'});
    }).then(function(blob){
      downloadBlob(sanitizeName(bookName)+'.epub',blob);
      toast('已导出 '+list.length+' 章');
    }).catch(function(e){alert('EPUB 生成失败：'+(e.message||e))});
  }).catch(function(e){toast('获取失败：'+(e.message||e))});
}

function splitChapters(text){
  text=text.replace(/\r\n/g,'\n').replace(/\r/g,'\n');
  var lines=text.split('\n');
  var chapters=[];
  var curTitle='开始';
  var curParas=[];
  var re=/^\s*第[一二三四五六七八九十百千零\d]+[章节回集卷篇]\s*.{0,30}\s*$/;
  for(var i=0;i<lines.length;i++){
    var line=lines[i];
    if(re.test(line)){
      if(curParas.length)chapters.push({t:curTitle,p:curParas});
      curTitle=line.trim();
      curParas=[];
    }else{
      var t=line.trim();
      if(t)curParas.push(t);
    }
  }
  if(curParas.length)chapters.push({t:curTitle,p:curParas});
  return chapters;
}
function importTxtFile(file){
  var reader=new FileReader();
  reader.onload=function(e){
    try{
      var result=splitChapters(e.target.result);
      if(!result.length){toast('未识别到章节');return}
      var bookId='txt_'+Date.now();
      var name=file.name.replace(/\.txt$/i,'')||'TXT';
      var catalog=[];
      var bytes=0;
      var limit=3*1024*1024;
      for(var i=0;i<result.length;i++){
        var ch=result[i];
        var u='txt://'+bookId+'/'+i;
        cacheSet(u,ch.t,ch.p);
        catalog.push({u:u,t:ch.t});
        bytes+=ch.t.length+16;
        for(var j=0;j<ch.p.length;j++)bytes+=ch.p[j].length;
        if(bytes>limit)break;
      }
      try{
        localStorage.setItem('RDR_TXT_CAT_'+bookId,JSON.stringify(catalog));
        var books=[];
        try{books=JSON.parse(localStorage.getItem('RDR_TXT_BOOKS')||'[]')}catch(err){}
        books.unshift({id:bookId,n:name,cn:catalog.length,ts:Date.now()});
        if(books.length>20)books=books.slice(0,20);
        localStorage.setItem('RDR_TXT_BOOKS',JSON.stringify(books));
      }catch(err){toast('保存失败，空间不足')}
      toast('已导入 '+catalog.length+' 章');
      setTimeout(function(){try{rd.modules.readChapter(catalog[0].u,catalog,bookId)}catch(err){toast('打开失败')}},300);
    }catch(err){toast('解析失败')}
  };
  reader.onerror=function(){toast('读取失败')};
  reader.readAsText(file);
}

function openTxtBook(id){
  try{
    var catRaw=localStorage.getItem('RDR_TXT_CAT_'+id);
    if(!catRaw){toast('记录丢失');return}
    var catalog=JSON.parse(catRaw);
    if(!catalog.length){toast('无章节');return}
    rd.modules.readChapter(catalog[0].u,catalog,id);
  }catch(e){toast('打开失败')}
}
function deleteTxtBook(id){
  try{
    var books=JSON.parse(localStorage.getItem('RDR_TXT_BOOKS')||'[]');
    var book=null;
    for(var i=0;i<books.length;i++)if(books[i].id===id){book=books[i];break}
    if(book&&book.cn)for(var j=0;j<book.cn;j++)localStorage.removeItem('CACHE_txt://'+id+'/'+j);
    localStorage.removeItem('RDR_TXT_CAT_'+id);
    books=books.filter(function(b){return b.id!==id});
    localStorage.setItem('RDR_TXT_BOOKS',JSON.stringify(books));
  }catch(e){}
}
function openTxtList(){
  var books=[];
  try{books=JSON.parse(localStorage.getItem('RDR_TXT_BOOKS')||'[]')}catch(e){}
  var ov=D.createElement('div');
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:var(--rbg,#15161a);color:var(--rfg,#cdd0d5);z-index:2147483600;overflow-y:auto;-webkit-overflow-scrolling:touch;font:14px system-ui;padding:16px 20px 40px;box-sizing:border-box';
  var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:20px"><button class="rd-ex-cl" style="background:none;border:0;color:inherit;font-size:22px;padding:0 8px 0 0;cursor:pointer">←</button><b>最近导入</b></div>';
  if(!books.length)h+='<div style="padding:60px 20px;text-align:center;opacity:.5">暂无</div>';
  else for(var i=0;i<books.length;i++){
    var b=books[i];
    h+='<div class="rd-ex-bk" data-id="'+escH(b.id)+'" style="padding:12px;border-bottom:1px solid #2e3138;cursor:pointer;display:flex;align-items:center;gap:8px"><div style="flex:1"><div style="font-size:14px">'+escH(b.n)+'</div><div style="font-size:11px;opacity:.5;margin-top:2px">'+b.cn+' 章 · '+new Date(b.ts).toLocaleString()+'</div></div><button class="rd-ex-del" data-id="'+escH(b.id)+'" style="background:none;border:0;color:#e55;font-size:22px;cursor:pointer;padding:0 6px">×</button></div>';
  }
  ov.innerHTML=h;
  (O||D.getElementById('R')||D.body).appendChild(ov);
  ov.querySelector('.rd-ex-cl').onclick=function(){ov.parentNode.removeChild(ov)};
  var items=ov.querySelectorAll('.rd-ex-bk');
  for(var j=0;j<items.length;j++){(function(el){
    el.onclick=function(ev){
      if(ev.target.classList&&ev.target.classList.contains('rd-ex-del'))return;
      var id=el.getAttribute('data-id');
      ov.parentNode.removeChild(ov);
      openTxtBook(id);
    };
  })(items[j])}
  var dels=ov.querySelectorAll('.rd-ex-del');
  for(var k=0;k<dels.length;k++){(function(el){
    el.onclick=function(ev){
      ev.stopPropagation();
      var id=el.getAttribute('data-id');
      if(!confirm('删除此书？'))return;
      deleteTxtBook(id);
      ov.parentNode.removeChild(ov);
      openTxtList();
    };
  })(dels[k])}
}

function injectDetail(){
  var DT=Q('#DT');
  if(!DT)return;
  if(DT._rdExDone)return;
  var btns=DT.querySelector('.btns');
  if(!btns)return;
  DT._rdExDone=1;
  var row=D.createElement('div');
  row.className='btns2';
  row.style.cssText='display:flex;gap:8px;margin-bottom:12px';
  var bs='flex:1;height:40px;border-radius:8px;border:0;background:#2a2d34;color:#d7dae0;font-size:13px;cursor:pointer';
  row.innerHTML='<button class="rd-ex-bd" style="'+bs+'">⬇ 批量下载</button><button class="rd-ex-tx" style="'+bs+'">📄 TXT</button><button class="rd-ex-ep" style="'+bs+'">📚 EPUB</button>';
  btns.parentNode.insertBefore(row,btns.nextSibling);
  var bookUrl=getBookUrl(),bookName=getBookTitle();
  row.querySelector('.rd-ex-bd').onclick=function(){doBatch(bookUrl,bookName)};
  row.querySelector('.rd-ex-tx').onclick=function(){doTxt(bookUrl,bookName)};
  row.querySelector('.rd-ex-ep').onclick=function(){doEpub(bookUrl,bookName)};
}
setInterval(injectDetail,900);

function injectSettings(){
  try{
    var ST=Q('#ST');
    if(!ST)return;
    if(ST.querySelector('.rd-ex-open'))return;
    var wrap=D.createElement('div');
    var h='<h3>下载导出</h3>';
    h+='<div class="row"><button class="rd-ex-imp full">📥 导入本地 TXT</button></div>';
    h+='<div class="row"><button class="rd-ex-list full">📂 最近导入</button></div>';
    h+='<input type="file" class="rd-ex-file" accept=".txt,text/plain" style="display:none">';
    wrap.innerHTML=h;
    var h3=null,kids=ST.children;
    for(var i=0;i<kids.length;i++){
      if(kids[i].tagName==='H3'&&/其它/.test(kids[i].textContent)){h3=kids[i];break}
    }
    if(h3)ST.insertBefore(wrap,h3);else ST.appendChild(wrap);
    var file=ST.querySelector('.rd-ex-file');
    ST.querySelector('.rd-ex-imp').onclick=function(){file.click()};
    file.onchange=function(){
      var f=file.files&&file.files[0];
      if(f)importTxtFile(f);
      file.value='';
    };
    ST.querySelector('.rd-ex-list').onclick=openTxtList;
  }catch(e){}
}
setTimeout(injectSettings,900);
if(D.body)new MutationObserver(injectSettings).observe(D.body,{childList:true,subtree:true});

rd.modules.export={
  doBatch:doBatch,
  doTxt:doTxt,
  doEpub:doEpub,
  importTxt:importTxtFile,
  openTxtList:openTxtList
};
console.log('[RDR-export] 已加载');
})();