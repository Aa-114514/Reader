function viewArticle(){
  var cur=FC();
  if(!cur){var _sh=_rdMod('viewShuku');if(_sh)_sh();return}
  var sU=location.href.split('#')[0];
  var ti=(Q('h1.page-title')||{}).textContent||D.title;
  HIS_ADD(sU,ti);
  var cU=null;
  var ls=D.querySelectorAll('a[href*="action=list"], a[href*="chapter"], a[href*="mulu"], a[href*="list"]');
  for(var i=0;i<ls.length;i++){var t=(ls[i].textContent||'');if(t.indexOf('目录')>=0||t.indexOf('章节目录')>=0||t.indexOf('返回书页')>=0){cU=ls[i].href;break}}
  if(cU){
    FH(cU).then(function(h){
      var d=new DOMParser().parseFromString(h,'text/html');
      var cl=d.querySelectorAll('a[href*="action=article"], a[href*="chapter"], a[href*="read"]');
      var a=[],sn={};
      for(var i=0;i<cl.length;i++){var hr=cl[i].getAttribute('href');if(!hr)continue;var f;try{f=new URL(hr,cU).href.split('#')[0]}catch(e){continue}if(sn[f])continue;sn[f]=1;var t=(cl[i].textContent||'').trim();if(!t||t.length>80)continue;if(t.indexOf('从头开始')>=0||t.indexOf('从头阅读')>=0||t.indexOf('从头看')>=0)continue;a.push({u:f,t:t});}
      a.sort(function(x,y){var ma=x.u.match(/[?&]id=(\d+)/),mb=y.u.match(/[?&]id=(\d+)/);if(!ma||!mb)return 0;return parseInt(ma[1])-parseInt(mb[1])});
      if(!a.length)a=[{u:sU,t:ti}];
      var _rc=_rdMod('readChapter');if(_rc)_rc(sU,a,sU);
    }).catch(function(){var _rc2=_rdMod('readChapter');if(_rc2)_rc2(sU,[{u:sU,t:ti}],sU)});
  }else{var _rc3=_rdMod('readChapter');if(_rc3)_rc3(sU,[{u:sU,t:ti}],sU);}
}

function viewPickView(){
  setNav('');NAV.style.display='none';BK.style.display='none';FAVBTN.style.display='none';
  Q('.t').textContent='选择打开方式';
  B.innerHTML='<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;gap:18px;padding:30px;box-sizing:border-box"><div style="font-size:16px;opacity:.75;margin-bottom:6px;color:#e57">'+err('E001')+'</div><div style="font-size:12px;opacity:.55;margin-bottom:14px">未能自动识别此页面的类型</div><button class="pv-l" style="width:80%;max-width:320px;height:64px;border-radius:14px;font-size:16px;cursor:pointer;border:0;background:#2a2d34;color:#d7dae0">📚 当作书库列表打开</button><button class="pv-r" style="width:80%;max-width:320px;height:64px;border-radius:14px;font-size:16px;cursor:pointer;border:0;background:#2a2d34;color:#d7dae0">📖 当作小说正文打开</button></div>';
  Q('.pv-l').onclick=function(){var _sh=_rdMod('viewShuku');if(!_sh){toast('未加载阅读模块');return}_sh();setTimeout(runInfiniteGeneral,300)};
  Q('.pv-r').onclick=function(){var main=FC();if(!main){toast(err('E002'));return}var _rc=_rdMod('readChapter');if(!_rc){toast('未加载阅读模块');return}var title=(Q('h1')||{}).textContent||D.title||'阅读';_rc(location.href.split('#')[0],[{u:location.href.split('#')[0],t:title.slice(0,40)}]);};
}

function runInfiniteGeneral(){
  var SC=Q('#SC');
  if(!SC)return;
  if(SC._rInited)return;
  SC._rInited=true;
  var loading=false,finished=false,seenPage={},curUrl=location.href.split('#')[0];
  seenPage[curUrl]=1;
  function findNextLink(doc){
    doc=doc||D;
    var maxN=-1,best=null;
    var allLinks=doc.querySelectorAll('a[href*="pn="], a[href*="page="]');
    for(var k=0;k<allLinks.length;k++){var h=allLinks[k].getAttribute('href')||'';var m=h.match(/[?&]p(?:n|age)=(\d+)/);if(m){var n=parseInt(m[1],10);if(n>maxN){maxN=n;best=allLinks[k]}}}
    if(best)return best;
    var sel=['.pagination a:last-child','.page a:last-child','a[rel="next"]','a.nextPage','a.next'];
    for(var i=0;i<sel.length;i++){var els=doc.querySelectorAll(sel[i]);for(var j=0;j<els.length;j++){var t=(els[j].textContent||'').trim();var hr=els[j].getAttribute('href')||'';if(!hr||hr==='#'||/^javascript:/i.test(hr))continue;if(/^(下一页|下页|next|›|»|>)$/i.test(t))return els[j];}}
    var all=doc.querySelectorAll('a[href]');
    for(var m2=0;m2<all.length;m2++){var t2=(all[m2].textContent||'').trim();var hr2=all[m2].getAttribute('href')||'';if(hr2==='#'||/^javascript:/i.test(hr2))continue;if(/^(下一页|下页|next|›|»|>)$/i.test(t2))return all[m2];}
    return null;
  }
  function getContentContainer(doc){
    doc=doc||D;
    var sels=['#content_left','#results','.result','.c-container','.search-result','main','article','.list','ul.list'];
    for(var i=0;i<sels.length;i++){var e=doc.querySelector(sels[i]);if(e&&e.children.length>=2)return e;}
    return null;
  }
  function bindListClicks(scope){
    var as=scope.querySelectorAll('a[href]');
    for(var i=0;i<as.length;i++)(function(a){
      if(a._rdBound)return;a._rdBound=1;
      a.addEventListener('click',function(ev){
        try{
          var hr=a.getAttribute('href')||'';
          if(!hr||hr==='#'||/^javascript:/i.test(hr))return;
          var full;try{full=new URL(hr,location.href).href.split('#')[0];}catch(e){return;}
          if(isSameHost(full))return;
          ev.preventDefault();
          try{localStorage.setItem('RDR_PENDING_URL',full);}catch(e){}
          location.href=full;
        }catch(e){}
      });
    })(as[i]);
  }
  function appendResults(html,base){
    var d=new DOMParser().parseFromString(html,'text/html');
    var newBox=getContentContainer(d);
    var oldBox=getContentContainer(D);
    if(!newBox||!oldBox){finished=true;return 0}
    var added=0;
    var kids=newBox.children;
    for(var i=0;i<kids.length;i++){
      var kid=kids[i];var h=kid.innerHTML||'';var key=h.slice(0,80).replace(/\s+/g,'');
      if(!key||seenPage[key])continue;
      seenPage[key]=1;
      try{
        var clone=D.importNode(kid,true);
        var as=clone.querySelectorAll('a[href]');
        for(var j=0;j<as.length;j++){try{var href=as[j].getAttribute('href');if(href&&href.indexOf('http')!==0&&href.indexOf('//')!==0){as[j].setAttribute('href',new URL(href,base||location.href).href);}}catch(e){}}
        oldBox.appendChild(clone);bindListClicks(clone);added++;
      }catch(e){}
    }
    return added;
  }
  var tip=document.createElement('div');
  tip.style.cssText='text-align:center;padding:20px;font-size:13px;opacity:.55';
  tip.textContent='滚动到底部自动加载下一页';
  SC.appendChild(tip);
  function loadNext(){
    if(loading||finished)return;
    var next=findNextLink(D);
    if(!next){finished=true;tip.textContent='已到底';return}
    var url;try{url=new URL(next.getAttribute('href'),location.href).href}catch(e){finished=true;return}
    if(seenPage[url]){finished=true;tip.textContent='已到底';return}
    seenPage[url]=1;loading=true;tip.textContent='正在加载下一页…';
    FH(url).then(function(html){
      if(!html||html.length<200){finished=true;tip.textContent=err('E012');loading=false;return}
      var n=appendResults(html,url);loading=false;
      if(n===0){finished=true;tip.textContent='已到底'}
      else tip.textContent='已追加 '+n+' 条';
    }).catch(function(e){loading=false;finished=true;tip.innerHTML='<span style="color:#e57">'+escH((e&&e.message)||err('E010'))+' 加载失败</span>';});
  }
  var cc=getContentContainer(D);if(cc)bindListClicks(cc);
  SC.addEventListener('scroll',function(){if(finished||loading)return;if(SC.scrollHeight-SC.scrollTop-SC.clientHeight<600)loadNext();},{passive:true});
}

function pickThumb(node){
  try{
    var im=node.querySelector('img');
    if(im){
      var s=im.getAttribute('data-original')||im.getAttribute('data-src')||im.src||'';
      if(s){
        if(s.indexOf('//')===0)s='https:'+s;
        else if(s.indexOf('/')===0)s=location.origin+s;
        else if(!/^https?:/i.test(s)){try{s=new URL(s,location.href).href}catch(e){s=''}}
        if(/^https?:/i.test(s)&&!/spacer|blank\.gif|1x1\.|pixel|icon|logo|avatar|emoji|favicon/i.test(s))return s;
      }
    }
    var bg=node.querySelector('[style*="background-image"]');
    if(bg){var m=(bg.getAttribute('style')||'').match(/url\(["']?([^"')]+)["']?\)/);if(m&&m[1]){var u=m[1];if(u.indexOf('//')===0)u='https:'+u;else if(u.indexOf('/')===0)u=location.origin+u;if(/^https?:/i.test(u))return u;}}
  }catch(e){}
  return '';
}

function isRandomImgSite(){
  try{
    if(/scdn\.io/i.test(location.host))return true;
    var t=(document.title||'');
    if(t.indexOf('随机图片')>=0)return true;
    if(D.body){var h=D.body.innerHTML;if(h.indexOf('img.scdn.io')>=0&&(D.querySelector('#gallery')||D.querySelector('.topbar')))return true;}
  }catch(e){}
  return false;
}
function isGalleryPage(){
  try{
    if(!D.body)return false;
    if(FC())return false;
    var imgs=D.querySelectorAll('img');
    if(imgs.length<4)return false;
    var valid=0;
    for(var i=0;i<imgs.length;i++){
      var im=imgs[i];
      var src=im.getAttribute('data-original')||im.getAttribute('data-src')||im.src||'';
      if(!src)continue;
      if(/spacer|blank\.gif|1x1\.|pixel|icon|logo|avatar_small|emoji|favicon/i.test(src))continue;
      var w=im.naturalWidth||parseInt(im.getAttribute('width'))||0;
      var h=im.naturalHeight||parseInt(im.getAttribute('height'))||0;
      if(!w||!h){var r=im.getBoundingClientRect();w=r.width||0;h=r.height||0}
      if(w<100||h<100)continue;
      valid++;
    }
    if(valid>=8)return true;
    if(valid>=4&&imgs.length>=6)return true;
    return false;
  }catch(e){return false}
}
function getPageImages(){
  var arr=[];var seen={};
  try{
    var imgs=D.querySelectorAll('img');
    for(var i=0;i<imgs.length;i++){
      var im=imgs[i];
      var src=im.getAttribute('data-original')||im.getAttribute('data-src')||im.getAttribute('data-actual')||im.getAttribute('data-large')||im.src||'';
      if(!src)continue;
      if(src.indexOf('data:image')===0&&src.length<200)continue;
      if(src.indexOf('//')===0)src='https:'+src;
      else if(src.indexOf('/')===0)src=location.origin+src;
      else if(!/^https?:/i.test(src)){try{src=new URL(src,location.href).href}catch(e){continue}}
      if(!/^https?:/i.test(src))continue;
      if(/spacer|blank\.gif|1x1\.|pixel|icon|logo|avatar|emoji|favicon|qr_|qrcode/i.test(src))continue;
      if(seen[src])continue;
      var w=im.naturalWidth||parseInt(im.getAttribute('width'))||0;
      var h=im.naturalHeight||parseInt(im.getAttribute('height'))||0;
      if(!w||!h){var r=im.getBoundingClientRect();w=r.width||0;h=r.height||0}
      if(w<100||h<100)continue;
      seen[src]=1;
      var alt=(im.getAttribute('alt')||im.getAttribute('title')||('图片 '+(arr.length+1))).trim().slice(0,40);
      arr.push({u:'page:'+arr.length,t:alt,img:src});
    }
  }catch(e){}
  return arr;
}
function startImageReader(mode){
  if(!_rdMod('readChapter')){toast('未加载阅读模块');return}
  mode=mode||'page';
  var catalog=[];
  var targetCount=60;
  var t=D.createElement('div');
  t.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,.85);color:#fff;padding:14px 22px;border-radius:8px;z-index:2147483647;font:14px system-ui;text-align:center;max-width:80vw';
  t.textContent='正在读取图片…';
  D.body.appendChild(t);
  function grabPageImages(){
    var add=getPageImages();
    for(var i=0;i<add.length;i++){var exists=false;for(var j=0;j<catalog.length;j++)if(catalog[j].img===add[i].img){exists=true;break}if(!exists)catalog.push(add[i]);}
    return catalog.length;
  }
  function enter(){
    if(t.parentNode)t.parentNode.removeChild(t);
    if(S.m!=='p'){S.m='p';SV();}
    if(!catalog.length){
      Q('.t').textContent='图片模式';
      B.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:10px;opacity:.65;font-size:14px;padding:30px;text-align:center"><div style="font-size:36px">🖼️</div><div style="color:#e57">'+err('E003')+'</div><div style="font-size:12px;opacity:.6">未抓取到任何图片</div></div>';
      return;
    }
    try{
      for(var k=0;k<catalog.length;k++){catalog[k].paras=['@@IMG@@'+catalog[k].img+'@@IMG@@'];catalog[k].local=1;}
      _rdMod('readChapter')(catalog[0].u,catalog,catalog[0].u);
    }catch(e){toast(err('E040',(e&&e.message)||''))}
  }
  grabPageImages();
  var scrollCount=0,scrollMax=8;
  function scrollStep(){
    if(scrollCount>=scrollMax||catalog.length>=targetCount){enter();return}
    scrollCount++;
    t.textContent='正在加载更多… ('+catalog.length+')';
    W.scrollTo(0,D.body.scrollHeight);
    setTimeout(function(){
      var before=catalog.length;
      grabPageImages();
      if(catalog.length===before&&scrollCount>=3){enter();return}
      setTimeout(scrollStep,500);
    },700);
  }
  scrollStep();
}

function viewSetting(){
  setNav('setting');BK.style.display='none';FAVBTN.style.display='none';Q('.t').textContent='设置';
  var caches=cacheList();
  var bytes=0;
  try{for(var i=0;i<localStorage.length;i++){var kk=localStorage.key(i);if(kk&&kk.indexOf('CACHE_')===0)bytes+=(localStorage[kk]||'').length}}catch(e){}
  var kb=(bytes/1024).toFixed(1);
  var rc=RC;
  B.innerHTML='<div id="SC"><div id="ST">'+
    '<h3>阅读设置</h3>'+
    '<div class="row"><label>字号</label><button class="rfm" style="width:44px">−</button><span class="num" style="flex:1;text-align:center">'+(rc?rc.fs():S.f)+'px</span><button class="rfp" style="width:44px">＋</button></div>'+
    '<div class="row"><label>亮度</label><div class="seg"><button data-br="1" class="brB">100</button><button data-br=".85" class="brB">85</button><button data-br=".7" class="brB">70</button><button data-br=".5" class="brB">50</button></div></div>'+
    '<div class="row"><label>翻页</label><div class="seg"><button class="mP">▤ 分页</button><button class="mS">↕ 滚动</button></div></div>'+
    '<div class="row"><label>自动翻</label><div class="seg"><button class="apB" data-ap="0">关</button><button class="apB" data-ap="5">5s</button><button class="apB" data-ap="10">10s</button><button class="apB" data-ap="20">20s</button></div></div>'+
    '<div class="row"><label>图片显示</label><div class="seg"><button class="imB" data-im="alone">独立</button><button class="imB" data-im="auto">智能</button><button class="imB" data-im="inline">混排</button></div></div>'+
    '<div class="row"><label>退出询问</label><div class="seg"><button class="askFav1">开</button><button class="askFav0">关</button></div></div>'+
    '<h3>离线缓存</h3>'+
    '<div class="row"><span style="flex:1;font-size:13px;opacity:.75">已缓存 '+caches.length+' 章 · '+kb+' KB</span></div>'+
    '<div class="row"><button class="scc full">清空缓存</button></div>'+
    '<h3>内容净化</h3>'+
    '<div class="row"><button class="purEdit full">✎ 编辑净化规则</button></div>'+
    '<div class="row"><button class="purExp full">📤 导出净化规则</button></div>'+
    '<div class="row"><button class="purImp full">📥 导入净化规则</button></div>'+
    '<div class="impPurBox" style="display:none"><textarea placeholder="粘贴规则 JSON..."></textarea><div class="row" style="margin-top:6px"><button class="purImpOk" style="flex:1">确认导入</button><button class="purImpCc" style="flex:1">取消</button></div></div>'+
    '<div class="expPurBox" style="display:none"><textarea readonly></textarea><div class="row" style="margin-top:6px"><button class="purExpCc full">关闭</button></div></div>'+
    '<h3>主题（导入导出）</h3>'+
    '<div class="row"><button class="thExp full">📤 导出全部主题</button></div>'+
    '<div class="row"><button class="thImp full">📥 导入主题</button></div>'+
    '<div class="impThBox" style="display:none"><textarea placeholder="粘贴主题 JSON..."></textarea><div class="row" style="margin-top:6px"><button class="thImpOk" style="flex:1">确认导入</button><button class="thImpCc" style="flex:1">取消</button></div></div>'+
    '<div class="expThBox" style="display:none"><textarea readonly></textarea><div class="row" style="margin-top:6px"><button class="thExpCc full">关闭</button></div></div>'+
    '<h3>浏览历史</h3>'+
    '<div class="row"><span style="flex:1;font-size:13px;opacity:.75" class="hisCount">共 '+HIS_GET().length+' 条</span><button class="hisClear">清空</button></div>'+
    '<div class="hisList" style="max-height:240px;overflow-y:auto;border:1px solid rgba(128,128,128,.25);border-radius:8px"></div>'+
    '<h3>书架</h3>'+
    '<div class="row"><button class="sexp full">导出书架</button></div>'+
    '<div class="row"><button class="simp full">导入书架</button></div>'+
    '<div class="impBox" style="display:none"><textarea placeholder="粘贴书架 JSON..."></textarea><div class="row" style="margin-top:6px"><button class="simpok" style="flex:1">确认导入</button><button class="simpcc" style="flex:1">取消</button></div></div>'+
    '<div class="expBox" style="display:none"><textarea readonly></textarea><div class="row" style="margin-top:6px"><button class="sexpcc full">关闭</button></div></div>'+
    '<h3>模块管理</h3>'+
    '<div class="row"><button class="modBtn full">📦 打开模块管理</button></div>'+
    '<h3>其它</h3>'+
    '<div class="row"><button class="srst full">清空书架</button></div>'+
    '<div class="row"><button class="sclr full">重置所有设置</button></div>'+
    '</div></div>';
  function renderHis(){
    var list=B.querySelector('.hisList');
    if(!list)return;
    var a=HIS_GET();
    list.innerHTML='';
    if(!a.length){list.innerHTML='<div style="padding:20px;text-align:center;opacity:.55;font-size:13px">暂无历史</div>';return;}
    for(var i=0;i<a.length;i++){
      (function(idx){
        var h=a[idx];
        var r=D.createElement('div');r.className='his';
        var t=D.createElement('div');t.textContent=(idx+1)+'. '+(h.t||'未命名');
        var u=D.createElement('div');u.className='u';u.textContent=h.u;
        r.appendChild(t);r.appendChild(u);
        r.onclick=function(){try{localStorage.setItem('RDR_PENDING_URL',h.u)}catch(e){}var _vd=_rdMod('viewDetail');if(_vd&&isSameHost(h.u)){_vd(h.u);}else{location.href=h.u;}};
        list.appendChild(r);
      })(i);
    }
  }
  renderHis();
  function refreshSeg(){
    [].forEach.call(B.querySelectorAll('.brB'),function(b){b.className='brB'+(Math.abs(parseFloat(b.getAttribute('data-br'))-S.br)<0.01?' on':'')});
    [].forEach.call(B.querySelectorAll('.apB'),function(b){b.className='apB'+(parseInt(b.getAttribute('data-ap'),10)===S.ap?' on':'')});
    [].forEach.call(B.querySelectorAll('.imB'),function(b){b.className='imB'+(S.imode===b.getAttribute('data-im')?' on':'')});
    var mp=B.querySelector('.mP'),ms=B.querySelector('.mS');
    if(mp)mp.className='mP'+(S.m==='p'?' on':'');
    if(ms)ms.className='mS'+(S.m==='s'?' on':'');
    var af1=B.querySelector('.askFav1'),af0=B.querySelector('.askFav0');
    if(af1)af1.className=S.askFav!==0?'on':'';
    if(af0)af0.className=S.askFav!==0?'':'on';
  }
  refreshSeg();
  function needRead(){if(!RC){toast('请先进入阅读器');return false}return true}
  B.querySelector('.rfm').onclick=function(){if(!needRead())return;var n=RC.fs()-2;if(n<12)return;RC.fs(n);refreshCur()};
  B.querySelector('.rfp').onclick=function(){if(!needRead())return;var n=RC.fs()+2;if(n>40)return;RC.fs(n);refreshCur()};
  function refreshCur(){var n=RC.fs();var e=B.querySelector('.num');if(e)e.textContent=n+'px'}
  [].forEach.call(B.querySelectorAll('.brB'),function(b){b.onclick=function(){S.br=parseFloat(b.getAttribute('data-br'));SV();theme();refreshSeg()}});
  [].forEach.call(B.querySelectorAll('.apB'),function(b){b.onclick=function(){if(!needRead())return;RC.setAP(parseInt(b.getAttribute('data-ap'),10));refreshSeg()}});
  [].forEach.call(B.querySelectorAll('.imB'),function(b){b.onclick=function(){S.imode=b.getAttribute('data-im');SV();if(RC&&RC.reflow)RC.reflow();refreshSeg()}});
  B.querySelector('.mP').onclick=function(){if(!needRead())return;RC.setMode('p');refreshSeg()};
  B.querySelector('.mS').onclick=function(){if(!needRead())return;RC.setMode('s');refreshSeg()};
  var af1=B.querySelector('.askFav1'),af0=B.querySelector('.askFav0');
  if(af1)af1.onclick=function(){S.askFav=1;SV();refreshSeg()};
  if(af0)af0.onclick=function(){S.askFav=0;SV();refreshSeg()};
  B.querySelector('.scc').onclick=function(){if(confirm('清空离线缓存？')){cacheClearAll();viewSetting();toast('已清空')}};
  var hc=B.querySelector('.hisClear');
  if(hc)hc.onclick=function(){if(confirm('清空浏览历史？')){HIS_CLEAR();viewSetting();toast('已清空');}};
  var purEdit=B.querySelector('.purEdit');if(purEdit)purEdit.onclick=function(){viewPurify()};
  var purExp=B.querySelector('.purExp');if(purExp)purExp.onclick=function(){var box=B.querySelector('.expPurBox');box.style.display=box.style.display==='none'?'block':'none';if(box.style.display!=='none')box.querySelector('textarea').value=JSON.stringify(purifyAll());};
  var purExpCc=B.querySelector('.purExpCc');if(purExpCc)purExpCc.onclick=function(){B.querySelector('.expPurBox').style.display='none'};
  var purImp=B.querySelector('.purImp');if(purImp)purImp.onclick=function(){var box=B.querySelector('.impPurBox');box.style.display=box.style.display==='none'?'block':'none'};
  var purImpCc=B.querySelector('.purImpCc');if(purImpCc)purImpCc.onclick=function(){B.querySelector('.impPurBox').style.display='none'};
  var purImpOk=B.querySelector('.purImpOk');
  if(purImpOk)purImpOk.onclick=function(){
    var v=B.querySelector('.impPurBox textarea').value.trim();
    if(!v){toast('内容为空');return}
    try{
      var o=JSON.parse(v);var arr=o.rules||o;
      if(!Array.isArray(arr)){toast(err('E032'));return}
      var cur=JSON.parse(LSV('RDR_PURIFY')||'[]');
      for(var i=0;i<arr.length;i++){var t=arr[i];if(!t||typeof t!=='object')continue;cur.push({name:(t.name||('导入'+(cur.length+1))).slice(0,30),host:t.host||'*',scope:t.scope||'all',find:t.find||'',replace:t.replace||'',regex:t.regex?1:0,enable:t.enable===0?0:1});}
      purifySave(cur);toast('导入 '+arr.length+' 条');B.querySelector('.impPurBox').style.display='none';viewSetting();
    }catch(e){toast(err('E031'))}
  };
  var thExp=B.querySelector('.thExp');if(thExp)thExp.onclick=function(){var box=B.querySelector('.expThBox');box.style.display=box.style.display==='none'?'block':'none';if(box.style.display!=='none'){var data={v:2,ts:Date.now(),themes:S.themes,cur:S.curTheme};box.querySelector('textarea').value=JSON.stringify(data);}};
  var thExpCc=B.querySelector('.thExpCc');if(thExpCc)thExpCc.onclick=function(){B.querySelector('.expThBox').style.display='none'};
  var thImp=B.querySelector('.thImp');if(thImp)thImp.onclick=function(){var box=B.querySelector('.impThBox');box.style.display=box.style.display==='none'?'block':'none'};
  var thImpCc=B.querySelector('.thImpCc');if(thImpCc)thImpCc.onclick=function(){B.querySelector('.impThBox').style.display='none'};
  var thImpOk=B.querySelector('.thImpOk');
  if(thImpOk)thImpOk.onclick=function(){
    var ta=B.querySelector('.impThBox textarea');var v=ta.value.trim();
    if(!v){toast('内容为空');return}
    try{
      var o=JSON.parse(v);var arr=o.themes||o;
      if(!Array.isArray(arr)){toast(err('E032'));return}
      var n=0;
      for(var i=0;i<arr.length;i++){var t=arr[i];if(!t||typeof t!=='object')continue;S.themes.push({name:(t.name||('导入 '+(S.themes.length+1))).slice(0,30),bg:t.bg||'#15161a',fg:t.fg||'#cdd0d5',bgi:t.bgi||'',grad:t.grad||0,gs:t.gs||6,gc1:t.gc1||'#ff2b5e',gc2:t.gc2||'#2bd9ff',gh1:t.gh1||0,gh2:t.gh2||360,imode:t.imode||'alone',br:t.br||1,m:t.m||'p',ap:t.ap||0});n++;}
      SV();toast('导入 '+n+' 个主题');B.querySelector('.impThBox').style.display='none';viewSetting();
    }catch(e){toast(err('E031'))}
  };
  B.querySelector('.sexp').onclick=function(){var box=B.querySelector('.expBox');box.style.display=box.style.display==='none'?'block':'none';if(box.style.display!=='none'){var data={v:1,ts:Date.now(),books:GB()};box.querySelector('textarea').value=JSON.stringify(data);}};
  B.querySelector('.sexpcc').onclick=function(){B.querySelector('.expBox').style.display='none'};
  B.querySelector('.simp').onclick=function(){var box=B.querySelector('.impBox');box.style.display=box.style.display==='none'?'block':'none'};
  B.querySelector('.simpcc').onclick=function(){B.querySelector('.impBox').style.display='none'};
  B.querySelector('.simpok').onclick=function(){
    var ta=B.querySelector('.impBox textarea');var v=ta.value.trim();
    if(!v){toast('内容为空');return}
    try{
      var o=JSON.parse(v);var arr=o.books||o;
      if(!Array.isArray(arr)){toast(err('E032'));return}
      var cur=GB();var sn={};for(var i=0;i<cur.length;i++)sn[cur[i].u]=1;
      var n=0;
      for(var j=0;j<arr.length;j++){var it=arr[j];if(!it||!it.u||!it.t)continue;if(sn[it.u])continue;cur.push({u:it.u,t:it.t,ts:it.ts||Date.now()});sn[it.u]=1;n++;}
      SB(cur);toast('导入 '+n+' 本');B.querySelector('.impBox').style.display='none';viewSetting();
    }catch(e){toast(err('E031'))}
  };
  var _mb=B.querySelector('.modBtn');if(_mb)_mb.onclick=function(){viewMods()};
  B.querySelector('.srst').onclick=function(){if(confirm('清空书架？')){SB([]);var _vs=_rdMod('viewShelf');if(_vs)_vs();else viewSetting();}};
  B.querySelector('.sclr').onclick=function(){
    if(confirm('重置所有设置？')){
      try{LSV('RDR_CFG','{}')}catch(e){}
      S={f:18,l:0,m:'p',ap:0,br:1,bg:'#15161a',fg:'#cdd0d5',bgi:'',grad:0,gs:6,gc1:'#ff2b5e',gc2:'#2bd9ff',gh1:0,gh2:360,themes:[],curTheme:-1,imode:'alone',shelfView:'list',askFav:1};
      theme();viewSetting();
    }
  };
}

function viewMods(){
  setNav('setting');BK.style.display='block';FAVBTN.style.display='none';Q('.t').textContent='模块管理';
  BK.onclick=function(){viewSetting()};
  B.innerHTML='<div id="SC"><div id="ST"><div style="text-align:center;padding:60px;opacity:.6;font-size:13px">加载模块列表…</div></div></div>';
  var _cdnMap={raw:'https://raw.githubusercontent.com/Aa-114514/Reader/main/',jsdelivr:'https://cdn.jsdelivr.net/gh/Aa-114514/Reader@main/',gcore:'https://gcore.jsdelivr.net/gh/Aa-114514/Reader@main/',fastly:'https://fastly.jsdelivr.net/gh/Aa-114514/Reader@main/',testingcf:'https://testingcf.jsdelivr.net/gh/Aa-114514/Reader@main/',statically:'https://cdn.statically.io/gh/Aa-114514/Reader/main/',ghproxy:'https://ghproxy.net/https://raw.githubusercontent.com/Aa-114514/Reader/main/',gitmirror:'https://raw.gitmirror.com/Aa-114514/Reader/main/'};
  var _cdnName=null;try{_cdnName=localStorage.getItem('RDR_BEST_CDN')}catch(e){}
  var _base=_cdnMap[_cdnName]||_cdnMap.jsdelivr;
  fetch(_base+'reader-loader.js?t='+Date.now(),{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()})
    .then(function(t){
      try{new Function(t)()}catch(e){console.warn('[RDR] loader.js 执行失败',e)}
      renderMods();
    })
    .catch(function(e){
      B.innerHTML='<div id="SC"><div id="ST"><div style="text-align:center;padding:40px;color:#e57;font-size:13px">加载失败：'+escH(e.message||e)+'<br><br><button class="mRetry" style="height:40px;padding:0 24px;border-radius:8px;border:0;cursor:pointer;background:#4a8fe0;color:#fff">重试</button></div></div></div>';
      var rb=B.querySelector('.mRetry');if(rb)rb.onclick=function(){viewMods()};
    });
  function renderMods(){
    var list=window.RDR_LOADERS||[];
    if(!list.length){B.innerHTML='<div id="SC"><div id="ST"><div style="text-align:center;padding:40px;opacity:.6;font-size:13px">无可用模块</div></div></div>';return}
    var h='<div id="SC"><div id="ST">';
    h+='<div style="font-size:12px;opacity:.6;margin-bottom:12px">当前 CDN: '+escH(_cdnName||'jsdelivr')+'</div>';
    for(var i=0;i<list.length;i++){
      var m=list[i];
      var loaded=false;try{loaded=!!eval(m.test)}catch(e){}
      var persist=localStorage.getItem('RDR_MOD_'+m.id.toUpperCase())==='1';
      h+='<div style="padding:14px;border:1px solid rgba(128,128,128,.25);border-radius:10px;margin-bottom:12px">';
      h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><b style="flex:1;font-size:15px">'+escH(m.name)+'</b><span style="font-size:12px;color:'+(loaded?'#2ecc71':'#888')+'">'+(loaded?'● 已加载':'○ 未加载')+'</span></div>';
      h+='<div style="font-size:12px;opacity:.65;margin-bottom:12px;line-height:1.5">'+escH(m.desc)+'</div>';
      h+='<div style="display:flex;flex-wrap:wrap;gap:8px">';
      if(!loaded)h+='<button class="mLoad" data-i="'+i+'" style="flex:1;min-width:76px;height:36px;border-radius:8px;border:0;cursor:pointer;background:#4a8fe0;color:#fff;font-size:13px">📥 加载</button>';
      else h+='<button class="mUnload" data-i="'+i+'" style="flex:1;min-width:76px;height:36px;border-radius:8px;border:0;cursor:pointer;background:#e55;color:#fff;font-size:13px">🗑 卸载</button>';
      h+='<button class="mPersist" data-i="'+i+'" style="flex:1;min-width:76px;height:36px;border-radius:8px;border:0;cursor:pointer;background:'+(persist?'#2ecc71':'#2a2d34')+';color:#fff;font-size:13px">'+(persist?'✓ 常驻':'○ 常驻')+'</button>';
      h+='<button class="mCopy" data-i="'+i+'" style="flex:1;min-width:76px;height:36px;border-radius:8px;border:0;cursor:pointer;background:#2a2d34;color:#fff;font-size:13px">📋 书签</button>';
      h+='</div></div>';
    }
    h+='<div style="font-size:11px;opacity:.5;line-height:1.7;margin-top:16px">常驻=下次启动自动加载；书签=复制到剪贴板，可在其他页面安装本模块。</div>';
    h+='</div></div>';
    B.innerHTML=h;
    [].forEach.call(B.querySelectorAll('.mLoad'),function(el){el.onclick=function(){loadOne(+el.getAttribute('data-i'))}});
    [].forEach.call(B.querySelectorAll('.mUnload'),function(el){el.onclick=function(){unloadOne(+el.getAttribute('data-i'))}});
    [].forEach.call(B.querySelectorAll('.mPersist'),function(el){el.onclick=function(){togglePersist(+el.getAttribute('data-i'))}});
    [].forEach.call(B.querySelectorAll('.mCopy'),function(el){el.onclick=function(){copyBookmark(+el.getAttribute('data-i'))}});
  }
  function loadOne(i){
    var m=window.RDR_LOADERS[i];if(!m)return;
    if(!window.__rd){toast('RDR 未启动');return}
    toast('加载 '+m.name+' …');
    fetch(_base+m.file+'?t='+Date.now(),{cache:'no-store'})
      .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()})
      .then(function(t){
        var s=document.createElement('script');s.textContent=t;
        (document.head||document.documentElement).appendChild(s);
        setTimeout(function(){
          var ok=false;try{ok=!!eval(m.test)}catch(e){}
          toast(ok?('✔ '+m.name+' 已加载'):('✗ '+m.name+' 加载异常'));
          renderMods();
        },300);
      }).catch(function(e){toast('失败: '+(e.message||e))});
  }
  function unloadOne(i){
    var m=window.RDR_LOADERS[i];if(!m)return;
    if(!window.__rd)return;
    if(m.nav){
      var NAV=document.getElementById('NAV');
      if(NAV){
        var items=NAV.querySelectorAll('[data-v]');
        for(var j=0;j<items.length;j++){
          var v=items[j].getAttribute('data-v');
          if(m.nav.indexOf(v)>=0&&items[j].parentNode)items[j].parentNode.removeChild(items[j]);
        }
      }
    }
    if(m.unload){try{new Function(m.unload)()}catch(e){}}
    toast('已卸载 '+m.name);
    renderMods();
  }
  function togglePersist(i){
    var m=window.RDR_LOADERS[i];if(!m)return;
    var k='RDR_MOD_'+m.id.toUpperCase();
    var v=localStorage.getItem(k)==='1'?'0':'1';
    try{localStorage.setItem(k,v)}catch(e){}
    toast(m.name+' 常驻='+(v==='1'?'开':'关'));
    renderMods();
  }
  function copyBookmark(i){
    var m=window.RDR_LOADERS[i];if(!m)return;
    var bk='javascript:(function(){if(!window.__rd){alert("请先启动 RDR");return}var B="'+_base+'";fetch(B+"'+m.file+'?t="+Date.now(),{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.text()}).then(function(t){var s=document.createElement("script");s.textContent=t;(document.head||document.documentElement).appendChild(s);setTimeout(function(){alert("✔ '+m.name+' 已加载")},300)}).catch(function(e){alert("失败: "+e.message)})})();';
    function fallback(txt){
      var ta=document.createElement('textarea');ta.value=txt;
      ta.style.cssText='position:fixed;left:-9999px;top:0';
      document.body.appendChild(ta);ta.select();
      try{document.execCommand('copy');toast('已复制书签')}catch(e){alert('复制失败')}
      document.body.removeChild(ta);
    }
    try{
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(bk).then(function(){toast('已复制书签')}).catch(function(){fallback(bk)});
      }else fallback(bk);
    }catch(e){fallback(bk)}
  }
}

function viewPurify(){
  setNav('setting');BK.style.display='block';FAVBTN.style.display='none';Q('.t').textContent='替换净化';
  BK.onclick=function(){viewSetting()};
  B.innerHTML='<div id="SC"><div id="ST"><div class="row"><button class="purAdd full">➕ 新增规则</button></div><div class="purList"></div></div></div>';
  var list=B.querySelector('.purList');
  function paint(){
    var all=purifyAll();
    list.innerHTML='';
    if(!all.length){list.innerHTML='<div style="padding:30px;text-align:center;opacity:.55;font-size:13px">暂无规则<br>点上方按钮添加</div>';return}
    for(var i=0;i<all.length;i++){
      (function(idx){
        var r=all[idx];
        var box=D.createElement('div');
        box.style.cssText='display:block;padding:10px 12px;border-bottom:1px solid rgba(128,128,128,.2);cursor:pointer';
        var scL={all:'全部',lib:'书库',read:'阅读器'}[r.scope||'all']||'全部';
        box.innerHTML='<div style="display:flex;align-items:center;gap:8px"><span style="flex:1;font-size:14px;font-weight:500">'+escH(r.name||('规则'+(idx+1)))+'</span><span class="purTog" style="font-size:18px;cursor:pointer;color:'+(r.enable===0?'#888':'#4a8fe0')+'">'+(r.enable===0?'○':'●')+'</span><span class="purDel" style="font-size:18px;color:#e55;cursor:pointer;padding:0 4px">×</span></div>'+
        '<div style="font-size:12px;opacity:.6;margin-top:4px">站点:'+escH(r.host||'*')+' · 作用域:'+scL+' · '+(r.regex?'正则':'文本')+'</div>'+
        '<div style="font-size:12px;opacity:.55;margin-top:2px;word-break:break-all">查找:<code>'+escH((r.find||'').slice(0,60))+'</code></div>';
        box.querySelector('.purDel').onclick=function(ev){ev.stopPropagation();if(!confirm('删除此规则？'))return;var a=purifyAll();a.splice(idx,1);purifySave(a);paint();};
        box.querySelector('.purTog').onclick=function(ev){ev.stopPropagation();var a=purifyAll();a[idx].enable=r.enable===0?1:0;purifySave(a);paint();};
        box.onclick=function(){window.__rdPurifyBack=null;purifyEdit(idx)};
        list.appendChild(box);
      })(i);
    }
  }
  B.querySelector('.purAdd').onclick=function(){window.__rdPurifyBack=null;purifyEdit(-1)};
  paint();
}
function purifyEdit(idx,preset){
  var all=purifyAll();
  var r=idx>=0?all[idx]:(preset||{name:'',host:'*',scope:'all',find:'',replace:'',regex:0,enable:1});
  var box=D.createElement('div');
  box.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:var(--rbg,#15161a);z-index:2147483600;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:16px 20px 140px;box-sizing:border-box';
  box.innerHTML='<div style="font-size:14px;opacity:.8;margin-bottom:12px">'+(idx>=0?'编辑规则':'新增规则')+'</div>'+
    '<div style="display:flex;flex-direction:column;gap:10px">'+
    '<label style="font-size:13px;opacity:.7">名称</label><input class="pName" type="text" value="'+escH(r.name||'')+'" style="height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px">'+
    '<label style="font-size:13px;opacity:.7">站点（* 全部，支持 *.example.com）</label><input class="pHost" type="text" value="'+escH(r.host||'*')+'" style="height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px">'+
    '<label style="font-size:13px;opacity:.7">作用域</label><select class="pScope" style="height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px"><option value="all">全部</option><option value="lib">书库</option><option value="read">阅读器</option></select>'+
    '<label style="font-size:13px;opacity:.7">查找</label><textarea class="pFind" style="height:80px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:8px;font:12px monospace">'+escH(r.find||'')+'</textarea>'+
    '<label style="font-size:13px;opacity:.7">替换为（留空=删除）</label><textarea class="pRep" style="height:60px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:8px;font:12px monospace">'+escH(r.replace||'')+'</textarea>'+
    '<div style="display:flex;gap:8px"><button class="pRegex" style="flex:1;height:38px;border-radius:8px;border:0;cursor:pointer;background:'+(r.regex?'#4a8fe0':'#2a2d34')+';color:#d7dae0;font-size:13px">'+(r.regex?'正则 ✓':'正则 ✗')+'</button><button class="pEn" style="flex:1;height:38px;border-radius:8px;border:0;cursor:pointer;background:'+(r.enable===0?'#2a2d34':'#4a8fe0')+';color:#d7dae0;font-size:13px">'+(r.enable===0?'已禁用':'已启用')+'</button></div>'+
    '<div style="display:flex;gap:8px;margin-top:20px"><button class="pSave" style="flex:1;height:44px;border-radius:10px;border:0;cursor:pointer;background:#4a8fe0;color:#fff;font-size:14px">保存</button><button class="pCancel" style="flex:1;height:44px;border-radius:10px;border:0;cursor:pointer;background:#2a2d34;color:#d7dae0;font-size:14px">取消</button></div>'+
    '</div>';
  B.appendChild(box);
  box.querySelector('.pScope').value=r.scope||'all';
  var reOn=r.regex?1:0,enOn=r.enable===0?0:1;
  box.querySelector('.pRegex').onclick=function(){reOn=reOn?0:1;this.textContent=reOn?'正则 ✓':'正则 ✗';this.style.background=reOn?'#4a8fe0':'#2a2d34';};
  box.querySelector('.pEn').onclick=function(){enOn=enOn?0:1;this.textContent=enOn?'已启用':'已禁用';this.style.background=enOn?'#4a8fe0':'#2a2d34';};
  box.querySelector('.pCancel').onclick=function(){box.parentNode.removeChild(box);if(window.__rdPurifyBack==='reader')window.__rdPurifyBack=null;};
  box.querySelector('.pSave').onclick=function(){
    var o={name:box.querySelector('.pName').value.trim().slice(0,40)||('规则'+(all.length+1)),host:box.querySelector('.pHost').value.trim()||'*',scope:box.querySelector('.pScope').value,find:box.querySelector('.pFind').value,replace:box.querySelector('.pRep').value,regex:reOn,enable:enOn};
    if(!o.find){toast('查找内容不能为空');return}
    if(o.regex){try{new RegExp(o.find)}catch(e){toast('正则表达式无效');return}}
    var arr=purifyAll();
    if(idx>=0)arr[idx]=o;else arr.push(o);
    purifySave(arr);
    box.parentNode.removeChild(box);
    if(window.__rdPurifyBack==='reader'){
      window.__rdPurifyBack=null;
      if(RC&&RC.reload)RC.reload();
      toast('已应用规则');
      return;
    }
    viewPurify();
  };
}

if(window.__rdNavAdd)window.__rdNavAdd('setting',100,'⚙','设置',viewSetting);