(function(){
var rd=window.__rd;
if(!rd)return;
if(rd.modules.uxLoaded)return;
if(!rd.modules.readChapter){alert('阅读体验需要前置：阅读模块');return}
if(!rd.modules.siteLoaded){alert('阅读体验需要前置：站点识别');return}
rd.modules.uxLoaded=1;

var c=rd.ctx;
var D=document,W=window,Q=c.Q,O=c.O,S=c.S,toast=c.toast,escH=c.escH,LSV=c.LSV;

var KEY='RDR_UX_CFG';
var DEF={autoNight:0,nightStart:'22:00',nightEnd:'07:00',gestures:1};
var cfg={};for(var k in DEF)cfg[k]=DEF[k];
try{var s=LSV(KEY);if(s){var o=JSON.parse(s);for(var k2 in o)cfg[k2]=o[k2]}}catch(e){}
function saveCfg(){try{LSV(KEY,JSON.stringify(cfg))}catch(e){}}
function last_(){try{return JSON.parse(LSV('RDR_LAST')||'null')||{}}catch(e){return{}}}

/* ============ 自动夜间 ============ */
var _manualAt=0,_lastNight=-1;
function inNightRange(){
  var d=new Date();
  var hm=d.getHours()*60+d.getMinutes();
  var p1=cfg.nightStart.split(':');
  var p2=cfg.nightEnd.split(':');
  var ns=(+p1[0]||22)*60+(+p1[1]||0);
  var ne=(+p2[0]||7)*60+(+p2[1]||0);
  if(ns<ne)return hm>=ns&&hm<ne;
  return hm>=ns||hm<ne;
}
function applyAutoNight(){
  if(!cfg.autoNight)return;
  if(Date.now()-_manualAt<10*60*1000)return;
  var want=inNightRange()?1:0;
  if(_lastNight===want)return;
  _lastNight=want;
  if(S.l!==want){
    S.l=want;
    try{c.SV()}catch(e){}
    try{c.theme()}catch(e){}
  }
}
setInterval(applyAutoNight,60000);
setTimeout(applyAutoNight,3000);
setInterval(function(){
  var mmc=Q('.mmc');
  if(mmc&&!mmc._rdUxHooked){
    mmc._rdUxHooked=1;
    mmc.addEventListener('click',function(){_manualAt=Date.now()},true);
  }
},600);

/* ============ 进度徽章 ============ */
function getProg(){
  var l=last_();
  if(!l.cat||!l.cat.length)return null;
  var ci=-1;
  for(var i=0;i<l.cat.length;i++)if(l.cat[i].u===l.cu){ci=i;break}
  if(ci<0)return null;
  return {ci:ci,tot:l.cat.length,pct:Math.round((ci+1)/l.cat.length*1000)/10};
}
function injectBadge(){
  var T=Q('#T');
  if(!T||T.querySelector('.rd-meta'))return;
  var b=D.createElement('span');
  b.className='rd-meta';
  b.style.cssText='font-size:11px;opacity:.7;padding:0 4px;flex:0 0 auto;white-space:nowrap';
  var x=T.querySelector('.x');
  if(x)T.insertBefore(b,x);else T.appendChild(b);
}
function updateBadge(){
  var b=Q('#T .rd-meta');
  if(!b)return;
  var p=getProg();
  b.textContent=p?((p.ci+1)+'/'+p.tot+' '+p.pct+'%'):'';
}
setInterval(function(){
  var A=Q('#A');
  if(!A)return;
  injectBadge();
  updateBadge();
},1500);

/* ============ 阅读统计 ============ */
function fd(d){
  var y=d.getFullYear();
  var m=('0'+(d.getMonth()+1)).slice(-2);
  var dd=('0'+d.getDate()).slice(-2);
  return y+''+m+''+dd;
}
function getStat(){try{return JSON.parse(LSV('RDR_STAT')||'{}')||{}}catch(e){return{}}}
function setStat(o){try{LSV('RDR_STAT',JSON.stringify(o))}catch(e){}}
function addStat(sec){
  var s=getStat();
  if(!s.d)s.d={};
  var today=fd(new Date());
  s.d[today]=(s.d[today]||0)+sec;
  setStat(s);
}
var _lastCh='',_chStart=0;
setInterval(function(){
  if(document.visibilityState!=='visible')return;
  var l=last_();
  var u=l.cu||'';
  if(!u)return;
  if(u!==_lastCh){
    if(_lastCh&&_chStart){
      var dt=(Date.now()-_chStart)/1000;
      if(dt>3&&dt<3600)addStat(Math.round(dt));
    }
    _lastCh=u;
    _chStart=Date.now();
  }
},2000);
document.addEventListener('visibilitychange',function(){
  if(document.visibilityState==='hidden'){
    if(_lastCh&&_chStart){
      var dt=(Date.now()-_chStart)/1000;
      if(dt>3)addStat(Math.round(dt));
      _chStart=0;
    }
  }else{
    _chStart=Date.now();
  }
});
function fmtDur(sec){
  sec=Math.round(sec);
  if(sec<60)return sec+'秒';
  var m=Math.floor(sec/60);
  if(m<60)return m+'分'+(sec%60)+'秒';
  var h=Math.floor(m/60);
  return h+'时'+(m%60)+'分';
}
function openStat(){
  var old=D.getElementById('rd-stat-ov');
  if(old&&old.parentNode)old.parentNode.removeChild(old);
  var st=getStat();
  var now=new Date();
  var todaySec=(st.d&&st.d[fd(now)])||0;
  var weekSec=0,totalSec=0;
  for(var i=0;i<7;i++){
    var d=new Date(now);d.setDate(d.getDate()-i);
    weekSec+=(st.d&&st.d[fd(d)])||0;
  }
  if(st.d)for(var kk in st.d)totalSec+=st.d[kk];
  var days=[];
  for(var j=6;j>=0;j--){
    var d2=new Date(now);d2.setDate(d2.getDate()-j);
    days.push({d:fd(d2),sec:(st.d&&st.d[fd(d2)])||0});
  }
  var maxSec=1;
  days.forEach(function(x){if(x.sec>maxSec)maxSec=x.sec});
  var ov=D.createElement('div');
  ov.id='rd-stat-ov';
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:var(--rbg,#15161a);color:var(--rfg,#cdd0d5);z-index:2147483600;overflow-y:auto;-webkit-overflow-scrolling:touch;font:14px system-ui;padding:16px 20px 40px;box-sizing:border-box';
  var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:20px"><button class="rd-stat-cl" style="background:none;border:0;color:inherit;font-size:22px;padding:0 8px 0 0;cursor:pointer">←</button><b>阅读统计</b></div>';
  h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:20px">';
  h+='<div style="background:#1a1c22;border-radius:10px;padding:12px;text-align:center"><div style="font-size:11px;opacity:.6;margin-bottom:4px">今日</div><div style="font-size:17px;color:#4a8fe0">'+fmtDur(todaySec)+'</div></div>';
  h+='<div style="background:#1a1c22;border-radius:10px;padding:12px;text-align:center"><div style="font-size:11px;opacity:.6;margin-bottom:4px">本周</div><div style="font-size:17px;color:#4a8fe0">'+fmtDur(weekSec)+'</div></div>';
  h+='<div style="background:#1a1c22;border-radius:10px;padding:12px;text-align:center"><div style="font-size:11px;opacity:.6;margin-bottom:4px">总计</div><div style="font-size:17px;color:#4a8fe0">'+fmtDur(totalSec)+'</div></div>';
  h+='</div>';
  h+='<h3 style="font-size:13px;opacity:.7;margin:0 0 10px;border-bottom:1px solid rgba(128,128,128,.2);padding-bottom:6px">最近 7 天</h3>';
  h+='<div style="display:flex;flex-direction:column;gap:6px">';
  days.forEach(function(x){
    var yy=x.d.slice(0,4),mm=x.d.slice(4,6),dd=x.d.slice(6,8);
    var label=(+mm)+'/'+(+dd);
    var pct=Math.round(x.sec/maxSec*100);
    h+='<div style="display:flex;align-items:center;gap:8px"><span style="font-size:12px;width:42px;opacity:.7">'+label+'</span><div style="flex:1;height:16px;background:#1a1c22;border-radius:8px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#4a8fe0,#2bd9ff);border-radius:8px"></div></div><span style="font-size:12px;min-width:64px;text-align:right;opacity:.8">'+fmtDur(x.sec)+'</span></div>';
  });
  h+='</div>';
  h+='<div style="margin-top:24px"><button class="rd-stat-reset" style="width:100%;height:40px;border-radius:8px;border:0;cursor:pointer;background:#2a2d34;color:#d7dae0;font-size:13px">清空统计</button></div>';
  ov.innerHTML=h;
  (O||D.getElementById('R')||D.body).appendChild(ov);
  ov.querySelector('.rd-stat-cl').onclick=function(){ov.parentNode.removeChild(ov)};
  ov.querySelector('.rd-stat-reset').onclick=function(){
    if(confirm('清空全部阅读统计？')){setStat({});ov.parentNode.removeChild(ov);openStat()}
  };
}

/* ============ 手势 ============ */
function togglePanel(force){
  var H=Q('#H'),MSK=Q('#MSK');
  if(!H||!MSK)return;
  var isOpen=H.classList.contains('open');
  var open=force===undefined?!isOpen:!!force;
  if(open===isOpen)return;
  var BK=Q('.bk'),FAV=Q('.fav');
  if(open){
    H.classList.add('open');
    MSK.style.display='block';
    if(BK)BK.style.display='block';
    if(FAV)FAV.style.display='block';
  }else{
    H.classList.remove('open');
    MSK.style.display='none';
    if(BK)BK.style.display='none';
    if(FAV)FAV.style.display='none';
  }
}
function setupGestures(){
  var A=Q('#A');
  if(!A||A._rdGest)return;
  A._rdGest=1;
  var sx=0,sy=0,moved=false,armed=false;
  A.addEventListener('touchstart',function(e){
    if(!cfg.gestures){armed=false;return}
    if(e.touches.length!==1){armed=false;return}
    sx=e.touches[0].clientX;
    sy=e.touches[0].clientY;
    moved=false;
    armed=true;
  },{passive:true,capture:true});
  A.addEventListener('touchmove',function(e){
    if(!armed)return;
    if(!e.touches.length)return;
    if(Math.abs(e.touches[0].clientX-sx)>20||Math.abs(e.touches[0].clientY-sy)>20)moved=true;
  },{passive:true,capture:true});
  A.addEventListener('touchend',function(e){
    if(!armed)return;
    if(!moved)return;
    if(!e.changedTouches.length)return;
    var dx=e.changedTouches[0].clientX-sx;
    var dy=e.changedTouches[0].clientY-sy;
    armed=false;
    if(Math.abs(dy)<70)return;
    if(Math.abs(dy)<Math.abs(dx)*1.2)return;
    if(dy<0){
      if(S.m==='s')return;
      togglePanel(true);
    }else{
      S.l=S.l?0:1;
      _manualAt=Date.now();
      try{c.SV()}catch(e){}
      try{c.theme()}catch(e){}
    }
  },{passive:true,capture:true});
}
setInterval(function(){
  var A=Q('#A');
  if(A&&!A._rdGest)setupGestures();
},800);

/* ============ 设置 UI ============ */
function injectSettings(){
  try{
    var ST=Q('#ST');
    if(!ST)return;
    if(ST.querySelector('.rd-ux-open'))return;
    var wrap=D.createElement('div');
    var h='<h3>阅读体验</h3>';
    h+='<div class="row"><label>自动夜间</label><select class="rd-ux-an" style="flex:1;height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px"><option value="0"'+(cfg.autoNight==0?' selected':'')+'>关闭</option><option value="1"'+(cfg.autoNight==1?' selected':'')+'>按时间</option></select></div>';
    h+='<div class="row rd-ux-ns"><label>夜起</label><input type="text" class="rd-ux-nst" value="'+cfg.nightStart+'" style="flex:1;height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px"><label style="flex:0 0 auto;margin:0 6px">止</label><input type="text" class="rd-ux-nen" value="'+cfg.nightEnd+'" style="flex:1;height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px"></div>';
    h+='<div class="row"><label>手势</label><div class="seg"><button class="rd-ux-g1">开</button><button class="rd-ux-g0">关</button></div></div>';
    h+='<div class="row"><button class="rd-ux-open full">阅读统计</button></div>';
    h+='<div style="font-size:11px;opacity:.5;margin-top:6px;line-height:1.6">手势：阅读页上滑打开面板，下滑切换昼夜</div>';
    wrap.innerHTML=h;
    var h3=null,kids=ST.children;
    for(var i=0;i<kids.length;i++){
      if(kids[i].tagName==='H3'&&/其它/.test(kids[i].textContent)){h3=kids[i];break}
    }
    if(h3)ST.insertBefore(wrap,h3);else ST.appendChild(wrap);
    var an=ST.querySelector('.rd-ux-an'),nsWrap=ST.querySelector('.rd-ux-ns');
    function refreshNs(){nsWrap.style.display=cfg.autoNight?'flex':'none'}
    refreshNs();
    an.onchange=function(){cfg.autoNight=+this.value;saveCfg();refreshNs();_lastNight=-1;applyAutoNight()};
    ST.querySelector('.rd-ux-nst').onchange=function(){cfg.nightStart=this.value.trim()||'22:00';saveCfg()};
    ST.querySelector('.rd-ux-nen').onchange=function(){cfg.nightEnd=this.value.trim()||'07:00';saveCfg()};
    function refreshG(){
      var g1=ST.querySelector('.rd-ux-g1'),g0=ST.querySelector('.rd-ux-g0');
      if(g1)g1.className='rd-ux-g1'+(cfg.gestures?' on':'');
      if(g0)g0.className='rd-ux-g0'+(!cfg.gestures?' on':'');
    }
    refreshG();
    ST.querySelector('.rd-ux-g1').onclick=function(){cfg.gestures=1;saveCfg();refreshG()};
    ST.querySelector('.rd-ux-g0').onclick=function(){cfg.gestures=0;saveCfg();refreshG()};
    ST.querySelector('.rd-ux-open').onclick=openStat;
  }catch(e){}
}
setTimeout(injectSettings,800);
if(D.body)new MutationObserver(injectSettings).observe(D.body,{childList:true,subtree:true});

rd.modules.ux={cfg:cfg,openStat:openStat,togglePanel:togglePanel};
console.log('[RDR-ux] 已加载');
})();