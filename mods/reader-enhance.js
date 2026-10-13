(function(){
var rd=window.__rd;
if(!rd)return;
if(rd.modules.enhanceLoaded)return;
if(!rd.modules.readChapter){alert('阅读增强需要前置：阅读模块');return}
if(!rd.modules.siteLoaded){alert('阅读增强需要前置：站点识别');return}
rd.modules.enhanceLoaded=1;

var c=rd.ctx;
var D=document,W=window,Q=c.Q,B=c.B,O=c.O;
var toast=c.toast,escH=c.escH,LSV=c.LSV;

var HLK='RDR_HL',BMK='RDR_BM',NK='RDR_NOTES';
function rdd(k){try{return JSON.parse(localStorage.getItem(k)||'[]')||[]}catch(e){return[]}}
function wrr(k,a){try{localStorage.setItem(k,JSON.stringify(a))}catch(e){}}
function uid(){return Date.now()+'_'+Math.random().toString(36).slice(2,6)}
function getHL(){return rdd(HLK)}
function saveHL(a){wrr(HLK,a)}
function getHLFor(u){return getHL().filter(function(h){return h.u===u})}
function addHL(o){o.id=uid();o.ts=Date.now();var a=getHL();a.unshift(o);if(a.length>2000)a=a.slice(0,2000);saveHL(a)}
function delHL(id){saveHL(getHL().filter(function(h){return h.id!==id}))}
function getBM(){return rdd(BMK)}
function saveBM(a){wrr(BMK,a)}
function addBM(o){o.id=uid();o.ts=Date.now();var a=getBM();a.unshift(o);if(a.length>1000)a=a.slice(0,1000);saveBM(a)}
function delBM(id){saveBM(getBM().filter(function(b){return b.id!==id}))}
function getNotes(){return rdd(NK)}
function saveNotes(a){wrr(NK,a)}

function last_(){try{return JSON.parse(LSV('RDR_LAST')||'null')||{}}catch(e){return{}}}
function curU(){return last_().cu||''}
function curCT(){return last_().ct||''}
function curBT(){var l=last_();if(!l.bu)return l.ct||'';try{return LSV('RDR_BOOKTITLE_'+l.bu)||l.ct||''}catch(e){return l.ct||''}}

var COL={y:'#ffeb3b',g:'#8bc34a',b:'#03a9f4'};
function applyHL(){
  var A=Q('#A');if(!A)return;
  var u=curU();if(!u)return;
  var hls=getHLFor(u);if(!hls.length)return;
  var ps=A.querySelectorAll('p');
  var byP={};
  hls.forEach(function(h){
    var p=ps[h.pIdx];
    if(!p||!p.textContent||p.textContent.indexOf(h.text)<0){
      p=null;
      for(var i=0;i<ps.length;i++){
        if((ps[i].textContent||'').indexOf(h.text)>=0){p=ps[i];h.pIdx=i;break}
      }
    }
    if(!p)return;
    var k=h.pIdx;if(!byP[k])byP[k]=[];byP[k].push(h);
  });
  Object.keys(byP).forEach(function(k){
    var p=ps[k];if(!p)return;
    var marks=byP[k];
    var txt=p.textContent||'';
    var ranges=[];
    marks.forEach(function(m){
      var idx=txt.indexOf(m.text);
      if(idx<0)return;
      ranges.push({s:idx,e:idx+m.text.length,c:m.color});
    });
    if(!ranges.length)return;
    ranges.sort(function(a,b){return a.s-b.s});
    p.innerHTML='';
    var cur=0;
    ranges.forEach(function(r){
      if(r.s<cur)return;
      if(r.s>cur)p.appendChild(D.createTextNode(txt.slice(cur,r.s)));
      var mk=D.createElement('mark');
      mk.style.cssText='background:'+(COL[r.c]||COL.y)+';color:inherit;padding:0 2px;border-radius:2px';
      mk.textContent=txt.slice(r.s,r.e);
      p.appendChild(mk);
      cur=r.e;
    });
    if(cur<txt.length)p.appendChild(D.createTextNode(txt.slice(cur)));
  });
}

var _lastA=null,_hlT=null;
setInterval(function(){
  var A=Q('#A');
  if(!A)return;
  if(A!==_lastA){
    _lastA=A;
    if(_hlT)clearTimeout(_hlT);
    _hlT=setTimeout(function(){_hlT=null;applyHL()},350);
  }
},400);

setInterval(function(){
  var BE=Q('#B');
  if(!BE||BE._rdLPCap)return;
  BE._rdLPCap=1;
  BE.addEventListener('touchstart',function(e){
    try{
      var p=e.target;
      while(p&&p!==BE&&p.tagName!=='P')p=p.parentNode;
      if(p&&p.tagName==='P')W.__rdLongP=p;else W.__rdLongP=null;
    }catch(err){}
  },{passive:true,capture:true});
},600);

var ACTS=['hl-y','hl-g','hl-b','bm','search','booksearch'];
var ACT_TXT=[['hl-y','🟡 黄色高亮'],['hl-g','🟢 绿色高亮'],['hl-b','🔵 蓝色高亮'],['bm','🔖 标书签'],['search','🔍 本章搜索'],['booksearch','📚 全书搜索']];
new MutationObserver(function(){
  var m=D.getElementById('RDM');
  if(!m||m._rdEnh)return;
  m._rdEnh=1;
  var h='';
  ACT_TXT.forEach(function(it){h+='<div data-act="'+it[0]+'">'+it[1]+'</div>'});
  m.insertAdjacentHTML('beforeend',h);
  m.addEventListener('click',function(ev){
    var t=ev.target;
    while(t&&t!==m&&!t.getAttribute('data-act'))t=t.parentNode;
    if(!t||t===m)return;
    var act=t.getAttribute('data-act');
    if(ACTS.indexOf(act)<0)return;
    if(ev.stopImmediatePropagation)ev.stopImmediatePropagation();
    ev.stopPropagation();ev.preventDefault();
    handleAction(act);
    if(m.parentNode)m.parentNode.removeChild(m);
    var msk=Q('#MSK');if(msk)msk.style.display='none';
  },true);
}).observe(D.body,{childList:true});

function handleAction(act){
  var p=W.__rdLongP;
  if(!p){toast('未找到段落');return}
  var A=Q('#A');
  var ps=A?A.querySelectorAll('p'):[];
  var pIdx=Array.prototype.indexOf.call(ps,p);
  if(pIdx<0){toast('定位失败');return}
  var text=(p.textContent||'').trim();
  if(!text){toast('段落为空');return}
  var u=curU();
  if(!u){toast('未获取章节');return}
  if(act==='hl-y'||act==='hl-g'||act==='hl-b'){
    addHL({u:u,ct:curCT(),bt:curBT(),pIdx:pIdx,text:text,color:act.slice(3)});
    applyHL();
    toast('已高亮');
  }else if(act==='bm'){
    addBM({u:u,ct:curCT(),bt:curBT(),pIdx:pIdx,text:text});
    toast('已标书签');
  }else if(act==='search'){
    openChSearch(text);
  }else if(act==='booksearch'){
    openBookSearch();
  }
}

function openChSearch(init){
  var old=D.getElementById('rd-sbar');
  if(old){old.parentNode.removeChild(old);return}
  var bar=D.createElement('div');
  bar.id='rd-sbar';
  bar.style.cssText='position:fixed;top:60px;left:16px;right:16px;background:rgba(30,32,37,.98);color:#d7dae0;padding:10px;border-radius:10px;z-index:2147483647;box-shadow:0 4px 20px rgba(0,0,0,.6);display:flex;gap:6px;align-items:center;font:13px system-ui';
  bar.innerHTML='<input class="rd-si" placeholder="本章搜索" style="flex:1;height:34px;border-radius:6px;border:1px solid #444;background:#15161a;color:#fff;padding:0 10px;font-size:13px"><span class="rd-sn" style="min-width:60px;text-align:center;opacity:.7">-/-</span><button class="rd-sx" style="width:36px;height:34px;border:0;border-radius:6px;background:#2a2d34;color:#fff;cursor:pointer">×</button>';
  O.appendChild(bar);
  var inp=bar.querySelector('.rd-si'),cnt=bar.querySelector('.rd-sn');
  if(init)inp.value=init.slice(0,20);
  function clearMarks(){
    var A=Q('#A');if(!A)return;
    var ms=A.querySelectorAll('mark.rd-hit');
    for(var i=ms.length-1;i>=0;i--){
      var mk=ms[i];
      var t=D.createTextNode(mk.textContent);
      mk.parentNode.replaceChild(t,mk);
    }
    try{A.normalize()}catch(e){}
  }
  function doSearch(){
    clearMarks();
    var kw=inp.value.trim();
    if(!kw){cnt.textContent='-/-';return}
    var A=Q('#A');if(!A)return;
    var ps=A.querySelectorAll('p');
    var escKw=escH(kw);
    for(var i=0;i<ps.length;i++){
      var p=ps[i];
      var txt=p.textContent||'';
      if(!txt||txt.indexOf(kw)<0)continue;
      var esc=escH(txt);
      var html=esc.split(escKw).join('<mark class="rd-hit" style="background:#ff5252;color:#fff;padding:0 1px;border-radius:2px">'+escKw+'</mark>');
      p.innerHTML=html;
    }
    var ms=A.querySelectorAll('mark.rd-hit');
    cnt.textContent=ms.length?('共 '+ms.length+' 处'):'-/-';
  }
  var deb=null;
  inp.oninput=function(){if(deb)clearTimeout(deb);deb=setTimeout(doSearch,350)};
  inp.onkeydown=function(e){if(e.key==='Enter')doSearch()};
  bar.querySelector('.rd-sx').onclick=function(){clearMarks();if(bar.parentNode)bar.parentNode.removeChild(bar)};
  setTimeout(doSearch,100);
}

function openBookSearch(){
  var kw=prompt('输入关键词');
  if(!kw)return;
  var list=c.cacheList();
  var results=[];
  list.forEach(function(ch){
    if(!ch.p||!ch.p.length)return;
    for(var i=0;i<ch.p.length;i++){
      var txt=ch.p[i]||'';
      var idx=txt.indexOf(kw);
      if(idx>=0){
        var pre=txt.slice(Math.max(0,idx-20),idx);
        var suf=txt.slice(idx+kw.length,idx+kw.length+30);
        results.push({u:ch.u,t:ch.t||'',i:i,pre:pre,suf:suf});
        if(results.length>200)break;
      }
    }
  });
  var old=D.getElementById('rd-bsov');
  if(old)old.parentNode.removeChild(old);
  var ov=D.createElement('div');
  ov.id='rd-bsov';
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(20,22,26,.98);color:#d7dae0;z-index:2147483600;overflow-y:auto;-webkit-overflow-scrolling:touch;font:13px system-ui';
  var h='<div style="position:sticky;top:0;background:rgba(20,22,26,.99);padding:12px 16px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #2e3138;z-index:2"><span style="flex:1">全书搜索「'+escH(kw)+'」· 命中 '+results.length+'</span><button class="rd-bscl" style="background:#2a2d34;color:#fff;border:0;border-radius:6px;padding:6px 12px;cursor:pointer">关闭</button></div>';
  if(!results.length)h+='<div style="padding:60px 20px;text-align:center;opacity:.6">未找到，可能该书还未缓存</div>';
  else{
    h+='<div>';
    results.forEach(function(r,i){
      h+='<div class="rd-bsi" data-i="'+i+'" style="padding:10px 16px;border-bottom:1px solid #2e3138;cursor:pointer">';
      h+='<div style="font-size:12px;color:#4a8fe0;margin-bottom:4px">'+escH(r.t.slice(0,40))+' · 第'+(r.i+1)+'段</div>';
      h+='<div style="opacity:.85;line-height:1.5">'+escH(r.pre)+'<mark style="background:#4a8fe0;color:#fff;padding:0 2px">'+escH(kw)+'</mark>'+escH(r.suf)+'</div>';
      h+='</div>';
    });
    h+='</div>';
  }
  ov.innerHTML=h;
  (O||D.getElementById('R')||D.body).appendChild(ov);
  ov.querySelector('.rd-bscl').onclick=function(){ov.parentNode.removeChild(ov)};
  var its=ov.querySelectorAll('.rd-bsi');
  for(var i=0;i<its.length;i++){(function(el){
    el.onclick=function(){
      var it=results[+el.getAttribute('data-i')];
      if(!it)return;
      ov.parentNode.removeChild(ov);
      var l=last_();
      var cat=l.cat||[];
      var bk=l.bu||it.u;
      try{rd.modules.readChapter(it.u,cat.length?cat:[{u:it.u,t:it.t}],bk)}catch(e){toast('跳转失败')}
    };
  })(its[i])}
}

function openNotes(){
  var old=D.getElementById('rd-ntov');
  if(old)old.parentNode.removeChild(old);
  var ov=D.createElement('div');
  ov.id='rd-ntov';
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:var(--rbg,#15161a);color:var(--rfg,#cdd0d5);z-index:2147483600;overflow-y:auto;-webkit-overflow-scrolling:touch;font:13px system-ui';
  var tab='note';
  function paint(){
    var notes=getNotes(),hls=getHL(),bms=getBM();
    var h='<div style="position:sticky;top:0;background:var(--rbg,#15161a);padding:12px 16px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #2e3138;z-index:2"><button class="rd-ntcl" style="background:none;border:0;color:inherit;font-size:22px;padding:0 8px 0 0;cursor:pointer">←</button><b style="flex:1">笔记与书签</b></div>';
    h+='<div style="display:flex;gap:6px;padding:10px 16px;border-bottom:1px solid #2e3138">';
    h+='<button class="rd-ntt" data-t="note" style="flex:1;height:34px;border:0;border-radius:8px;cursor:pointer;background:'+(tab==='note'?'#4a8fe0':'#2a2d34')+';color:#fff">笔记 '+notes.length+'</button>';
    h+='<button class="rd-ntt" data-t="hl" style="flex:1;height:34px;border:0;border-radius:8px;cursor:pointer;background:'+(tab==='hl'?'#4a8fe0':'#2a2d34')+';color:#fff">高亮 '+hls.length+'</button>';
    h+='<button class="rd-ntt" data-t="bm" style="flex:1;height:34px;border:0;border-radius:8px;cursor:pointer;background:'+(tab==='bm'?'#4a8fe0':'#2a2d34')+';color:#fff">书签 '+bms.length+'</button>';
    h+='</div>';
    var arr=tab==='note'?notes:(tab==='hl'?hls:bms);
    if(!arr.length)h+='<div style="padding:60px 20px;text-align:center;opacity:.5">暂无</div>';
    else{
      h+='<div>';
      arr.forEach(function(it,i){
        var bc=it.color?('border-left:3px solid '+(COL[it.color]||COL.y)):'';
        h+='<div class="rd-nti" data-i="'+i+'" style="padding:10px 16px;border-bottom:1px solid #2e3138;cursor:pointer;position:relative;'+bc+'">';
        h+='<div style="font-size:12px;color:#4a8fe0;margin-bottom:4px;padding-right:26px">'+escH((it.bt||'')+' · '+(it.ct||''))+'</div>';
        h+='<div style="opacity:.85;line-height:1.5;word-break:break-all;padding-right:26px">'+escH((it.sel||it.text||'').slice(0,120))+'</div>';
        h+='<div style="font-size:11px;opacity:.4;margin-top:4px">'+new Date(it.ts).toLocaleString()+'</div>';
        h+='<button class="rd-ntd" data-i="'+i+'" style="position:absolute;top:8px;right:8px;background:none;border:0;color:#e55;font-size:18px;cursor:pointer;padding:0 6px">×</button>';
        h+='</div>';
      });
      h+='</div>';
    }
    ov.innerHTML=h;
    ov.querySelector('.rd-ntcl').onclick=function(){ov.parentNode.removeChild(ov)};
    var tabs=ov.querySelectorAll('.rd-ntt');
    for(var i=0;i<tabs.length;i++){(function(el){el.onclick=function(){tab=el.getAttribute('data-t');paint()}})(tabs[i])}
    var its=ov.querySelectorAll('.rd-nti');
    for(var j=0;j<its.length;j++){(function(el){
      el.onclick=function(ev){
        if(ev.target.classList&&ev.target.classList.contains('rd-ntd'))return;
        var it=arr[+el.getAttribute('data-i')];if(!it)return;
        ov.parentNode.removeChild(ov);
        var l=last_();
        var cat=l.cat||[];
        var bk=l.bu||it.u;
        try{rd.modules.readChapter(it.u,cat.length?cat:[{u:it.u,t:it.ct||''}],bk)}catch(e){toast('跳转失败')}
      };
    })(its[j])}
    var dels=ov.querySelectorAll('.rd-ntd');
    for(var k=0;k<dels.length;k++){(function(el){
      el.onclick=function(ev){
        ev.stopPropagation();
        var i=+el.getAttribute('data-i');var it=arr[i];if(!it)return;
        if(tab==='note'){var a=getNotes();a.splice(i,1);saveNotes(a)}
        else if(tab==='hl'){delHL(it.id)}
        else{delBM(it.id)}
        paint();
      };
    })(dels[k])}
  }
  paint();
  (O||D.getElementById('R')||D.body).appendChild(ov);
}

function injectBtn(){
  try{
    var ST=Q('#ST');
    if(!ST)return;
    if(ST.querySelector('.rd-enh-open'))return;
    var wrap=D.createElement('div');
    wrap.innerHTML='<h3>笔记</h3><div class="row"><button class="rd-enh-open full">笔记与书签</button></div>';
    wrap.querySelector('.rd-enh-open').onclick=openNotes;
    var h3=null,kids=ST.children;
    for(var i=0;i<kids.length;i++){
      if(kids[i].tagName==='H3'&&/其它/.test(kids[i].textContent)){h3=kids[i];break}
    }
    if(h3)ST.insertBefore(wrap,h3);else ST.appendChild(wrap);
  }catch(e){}
}
setTimeout(injectBtn,700);
if(D.body)new MutationObserver(injectBtn).observe(D.body,{childList:true,subtree:true});

rd.modules.enhance={
  applyHL:applyHL,
  openNotes:openNotes,
  getHL:getHL,
  getBM:getBM,
  getNotes:getNotes
};
console.log('[RDR-enhance] 已加载');
})();