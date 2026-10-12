(function(){
var rd=window.__rd;
if(!rd){console.warn('[RDR-read] 主程序未启动');return}
if(rd.modules.readChapter){console.warn('[RDR-read] 已加载');return}
var c=rd.ctx;
var D=c.D,W=c.W,Q=c.Q,B=c.B,BK=c.BK,NAV=c.NAV,FAVBTN=c.FAVBTN,O=c.O,S=c.S;
var SV=c.SV,toast=c.toast,LSV=c.LSV,escH=c.escH,err=c.err;
var GB=c.GB,SB=c.SB,ISB=c.ISB,isSameHost=c.isSameHost;
var GT=c.GT,ST_=c.ST_,PROG_SET=c.PROG_SET,PROG_GET=c.PROG_GET;
var cacheGet=c.cacheGet,cacheSet=c.cacheSet;
var HIS_ADD=c.HIS_ADD,HIS_GET=c.HIS_GET;
var purifyText=c.purifyText;
var FH=c.FH,FC=c.FC,HT=c.HT,TP=c.TP,EXF=c.EXF,pickThumb=c.pickThumb,isAdLink=c.isAdLink,siteCategory=c.siteCategory;

function appendP(container,text){
  if(text.indexOf('@@IMG@@')>=0){
    var parts=text.split('@@IMG@@');
    for(var i=0;i<parts.length;i++){
      if(i%2===1){
        var src=parts[i];if(!src)continue;
        var wrap=D.createElement('div');wrap.className='__imgw';
        var img=D.createElement('img');img.src=src;img.loading='lazy';
        img.style.cssText='user-select:none;-webkit-user-drag:none;touch-action:pan-y;cursor:pointer';
        img.onerror=function(){try{var w=this.parentNode;w.innerHTML='';var eb=D.createElement('div');eb.style.cssText='text-align:center;padding:40px 16px;font-size:13px;opacity:.7;line-height:1.8';eb.innerHTML='<div style="font-size:28px;margin-bottom:8px">🖼️</div><div style="color:#e57">'+err('E021')+'</div><div style="font-size:11px;opacity:.55;margin-top:6px;word-break:break-all;font-family:monospace">'+escH(this.src)+'</div>';w.appendChild(eb);}catch(e){}};
        img.onload=function(){try{var alone=false;if(S.imode==='alone')alone=true;else if(S.imode==='inline')alone=false;else{if(this.naturalHeight>W.innerHeight*0.5||this.naturalWidth>W.innerWidth*1.2)alone=true;else if(this.naturalWidth>W.innerWidth*0.6)alone=true;}if(alone)this.parentNode.classList.add('__big');if(imgRelayoutT)clearTimeout(imgRelayoutT);imgRelayoutT=setTimeout(function(){if(typeof S!=='undefined'&&S.m!=='p')return;if(window.__rdRelayout)window.__rdRelayout();},400);}catch(e){}};
        img.referrerPolicy='no-referrer';
        (function(im){
          var lpT=null,lpMoved=false,lx=0,ly=0;
          im.addEventListener('touchstart',function(e){if(e.touches.length!==1)return;lpMoved=false;lx=e.touches[0].clientX;ly=e.touches[0].clientY;lpT=setTimeout(function(){lpT=null;if(lpMoved)return;var cur=window.__rdCurImgData;if(cur&&window.__rdImgView){window.__rdImgView(cur)}},500);},{passive:true});
          im.addEventListener('touchmove',function(e){if(!e.touches.length)return;if(Math.abs(e.touches[0].clientX-lx)>10||Math.abs(e.touches[0].clientY-ly)>10){lpMoved=true;if(lpT){clearTimeout(lpT);lpT=null}}},{passive:true});
          im.addEventListener('touchend',function(){if(lpT){clearTimeout(lpT);lpT=null}},{passive:true});
          im.addEventListener('touchcancel',function(){if(lpT){clearTimeout(lpT);lpT=null}},{passive:true});
        })(img);
        wrap.appendChild(img);container.appendChild(wrap);
      }else{
        var t=parts[i].trim();
        if(t){var p=D.createElement('p');p.textContent=t;container.appendChild(p)}
      }
    }
  }else{
    var p=D.createElement('p');p.textContent=text;container.appendChild(p);
  }
}
var imgRelayoutT=null;

function getBookTitle(u){
  try{var t=LSV('RDR_BOOKTITLE_'+u);if(t)return t}catch(e){}
  try{var a=HIS_GET();for(var i=0;i<a.length;i++)if(a[i].u===u)return a[i].t;}catch(e){}
  return '';
}
function readChapter(chUrl,catalog,bookUrl,initProg){
  var bUrl=bookUrl||chUrl.split('#')[0];
  c.setNav('reader');NAV.style.display='none';BK.style.display='none';FAVBTN.style.display='none';
  HIS_ADD(chUrl,(Q('h1')||{}).textContent||D.title||'章节');
  BK.onclick=function(){
    try{
      var _curU=bUrl,_curT=getBookTitle(_curU)||(cs[0]&&cs[0].t)||D.title||'书籍';
      if(S.askFav!==0&&ISB(_curU)<0){
        if(confirm('是否收藏本书？')){var _b=GB();_b.push({u:_curU,t:_curT,ts:Date.now()});SB(_b);toast('已收藏');}
      }
    }catch(e){}
    if(window.__rdLastDetail){var _u=window.__rdLastDetail;window.__rdLastDetail=null;viewDetail(_u);}
    else viewShuku();
  };
  B.innerHTML='<div id="V"><div id="A"></div></div><div id="L"></div><div id="M"></div><div id="Q"></div>'+
    '<div id="H">'+
    '<div class="hch"><button class="mmc">☀</button><span class="hname"></span><span class="hpos"></span></div>'+
    '<div class="rowbar" style="margin-bottom:10px"><button class="pv">上一章</button><input class="pb" type="range" min="0" max="0" value="0"><button class="nx">下一章</button></div>'+
    '<div class="sub scat" data-sub="cat"><div class="dl"></div></div>'+
    '<div class="sub stts" data-sub="tts">'+
      '<div class="src"><label>朗读</label><button class="ttsPlay">▶ 播放</button><button class="ttsPause">⏸ 暂停</button><button class="ttsStop">■ 停止</button></div>'+
      '<div class="src"><label>语速</label><input class="ttsRate" type="range" min="0.5" max="2" step="0.1" value="1" style="flex:1;accent-color:#4a8fe0"></div>'+
      '<div class="src"><label>音调</label><input class="ttsPitch" type="range" min="0.5" max="2" step="0.1" value="1" style="flex:1;accent-color:#4a8fe0"></div>'+
      '<div style="font-size:12px;opacity:.6;line-height:1.6;padding:4px 2px">从当前页开始朗读，读完自动翻下一页</div>'+
    '</div>'+
    '<div class="sub sui" data-sub="ui">'+
      '<div class="subtabs">'+
        '<button class="subtab on" data-ui="basic">基础</button>'+
        '<button class="subtab" data-ui="color">配色</button>'+
        '<button class="subtab" data-ui="grad">渐变</button>'+
      '</div>'+
      '<div class="subpane on" data-ui-pane="basic">'+
        '<div class="src"><label>字号</label><button class="fmn" style="flex:0 0 44px">−</button><span class="fx" style="flex:1;text-align:center;font-size:13px">18px</span><button class="fp" style="flex:0 0 44px">＋</button></div>'+
        '<div class="src"><label>亮度</label><button class="brB" data-br=".5">50</button><button class="brB" data-br=".7">70</button><button class="brB" data-br=".85">85</button><button class="brB" data-br="1">100</button></div>'+
        '<div class="src"><label>翻页</label><button class="mP">▤ 分页</button><button class="mS">↕ 滚动</button></div>'+
        '<div class="src"><label>自动翻</label><button class="apB" data-ap="0">关</button><button class="apB" data-ap="5">5s</button><button class="apB" data-ap="10">10s</button><button class="apB" data-ap="20">20s</button></div>'+
      '</div>'+
      '<div class="subpane" data-ui-pane="color">'+
        '<div class="src"><label>文字模式</label><button class="gmode">单色</button></div>'+
        '<div class="src"><label>背景色</label><input type="color" class="ibg" value="'+S.bg+'"></div>'+
        '<div class="src"><label>文字色</label><input type="color" class="ifg" value="'+S.fg+'"></div>'+
        '<div class="src"><label>背景图</label><input type="url" class="ibgi" placeholder="https://..." value="'+(S.bgi||'')+'" style="flex:1;height:34px;border-radius:6px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 8px;font-size:13px;box-sizing:border-box"></div>'+
      '</div>'+
      '<div class="subpane" data-ui-pane="grad">'+
        '<div class="src"><label>渐变起</label><input type="color" class="igc1" value="'+S.gc1+'"><input type="color" class="igc2" value="'+S.gc2+'"></div>'+
        '<div class="src"><label>炫彩起</label><input type="range" class="igh1" min="0" max="360" value="'+S.gh1+'" style="flex:1;accent-color:#4a8fe0"></div>'+
        '<div class="src"><label>炫彩止</label><input type="range" class="igh2" min="0" max="360" value="'+S.gh2+'" style="flex:1;accent-color:#4a8fe0"></div>'+
        '<div class="src"><label>流速</label><button class="igsB" data-gs="3">快</button><button class="igsB" data-gs="6">中</button><button class="igsB" data-gs="12">慢</button></div>'+
      '</div>'+
    '</div>'+
      '<div class="sub sset" data-sub="set"><div class="thlist" style="max-height:32vh;overflow-y:auto"></div><div class="src" style="margin-top:6px"><button class="ithSave" style="flex:1">💾 保存当前主题</button></div></div>'+
    '<div class="tabbar"><div class="tb" data-tab="cat"><div class="ic">📑</div><div class="lb">目录</div></div><div class="tb" data-tab="tts"><div class="ic">🎧</div><div class="lb">朗读</div></div><div class="tb" data-tab="ui"><div class="ic">Aa</div><div class="lb">字体</div></div><div class="tb" data-tab="set"><div class="ic">⚙</div><div class="lb">主题</div></div></div>'+
    '</div>';
  var A=Q('#A'),V=Q('#V'),L=Q('#L'),M=Q('#M'),R2=Q('#Q'),H=Q('#H'),MSK=Q('#MSK');
  var cs=[],ci=0,pg=0,tot=1,cw=0,pn=0,did=0,tk=0,apTimer=null;
  var _lpT=null,_lpX=0,_lpY=0,_lpP=null,_lpMoved=false;
  A.addEventListener('touchstart',function(e){
    if(e.touches.length!==1)return;
    var t=e.target;
    while(t&&t!==A&&t.tagName!=='P')t=t.parentNode;
    if(!t||t===A){_lpP=null;return}
    _lpP=t;_lpX=e.touches[0].clientX;_lpY=e.touches[0].clientY;_lpMoved=false;
    if(_lpT)clearTimeout(_lpT);
    _lpT=setTimeout(function(){
      _lpT=null;
      if(_lpMoved)return;
      var txt=(_lpP&&_lpP.textContent||'').trim();
      if(!txt)return;
      _showTextMenu(_lpX,_lpY,txt);
    },500);
  },{passive:true});
  A.addEventListener('touchmove',function(e){
    if(!e.touches.length)return;
    if(Math.abs(e.touches[0].clientX-_lpX)>10||Math.abs(e.touches[0].clientY-_lpY)>10){_lpMoved=true;if(_lpT){clearTimeout(_lpT);_lpT=null;}}
  },{passive:true});
  A.addEventListener('touchend',function(){if(_lpT){clearTimeout(_lpT);_lpT=null}},{passive:true});
  A.addEventListener('touchcancel',function(){if(_lpT){clearTimeout(_lpT);_lpT=null}},{passive:true});
  function _showTextMenu(x,y,text){
    var old=D.getElementById('RDM');if(old&&old.parentNode)old.parentNode.removeChild(old);
    var m=D.createElement('div');m.id='RDM';
    m.innerHTML='<div data-act="purify">📝 替换净化</div><div data-act="copy">📋 复制</div><div data-act="note">✏️ 做笔记</div>';
    D.body.appendChild(m);
    var r=m.getBoundingClientRect();
    var vw=W.innerWidth,vh=W.innerHeight;
    var mx=x-r.width/2,my=y-r.height-12;
    if(mx<8)mx=8;
    if(mx+r.width>vw-8)mx=vw-r.width-8;
    if(my<8)my=y+24;
    if(my+r.height>vh-8)my=vh-r.height-8;
    m.style.left=mx+'px';m.style.top=my+'px';
    function _close(){if(m.parentNode)m.parentNode.removeChild(m);D.removeEventListener('touchstart',_outside)}
    function _outside(e){if(m.contains(e.target))return;_close()}
    setTimeout(function(){D.addEventListener('touchstart',_outside,{passive:true})},80);
    m.addEventListener('click',function(ev){
      var t=ev.target;
      while(t&&t!==m&&!t.getAttribute('data-act'))t=t.parentNode;
      if(!t||t===m)return;
      var act=t.getAttribute('data-act');
      if(act==='copy'){
        try{navigator.clipboard.writeText(text);toast('已复制')}catch(err2){var ta=D.createElement('textarea');ta.value=text;D.body.appendChild(ta);ta.select();try{D.execCommand('copy');toast('已复制')}catch(e2){toast('复制失败')}D.body.removeChild(ta);}
        _close();
      }else if(act==='purify'){
        _close();
        window.__rdPurifyBack='reader';
        var _pe=rd.ctx.purifyEdit;if(_pe)setTimeout(function(){_pe(-1,{name:'',host:location.host,scope:'read',find:text.slice(0,200),replace:'',regex:0,enable:1})},50);
      }else if(act==='note'){
        try{var notes=JSON.parse(LSV('RDR_NOTES')||'[]');notes.unshift({u:cs[ci].u,t:cs[ci].t,sel:text.slice(0,500),ts:Date.now()});if(notes.length>500)notes=notes.slice(0,500);LSV('RDR_NOTES',JSON.stringify(notes));toast('已保存笔记')}catch(e){toast('保存失败')}
        _close();
      }
    });
  }
  var tabSubs={cat:Q('.scat'),tts:Q('.stts'),ui:Q('.sui'),set:Q('.sset')};
  for(var i=0;i<catalog.length;i++)cs.push({u:catalog[i].u,t:catalog[i].t,p:catalog[i].paras||null,d:catalog[i].local?1:0,l:0,f:catalog[i].local?1:0,cb:[],img:catalog[i].img,image_url:catalog[i].img,tags:catalog[i].tags||'',desc:catalog[i].desc||'',file:catalog[i].file||'',be:catalog[i].be||'',loc:catalog[i].loc||''});
  var cu=chUrl.split('#')[0];
  var idx=-1;
  for(var j=0;j<cs.length;j++)if(cs[j].u===cu){idx=j;break}
  if(idx<0){cs.unshift({u:cu,t:(D.title||'').slice(0,30),p:null,d:0,l:0,f:0,cb:[]});idx=0}
  ci=idx;A.style.fontSize=S.f+'px';Q('.fx').textContent=S.f+'px';
  var _initPg=null;
  if(initProg){if(initProg.ci!=null)ci=Math.max(0,Math.min(initProg.ci,cs.length-1));if(initProg.pg!=null)_initPg=initProg.pg;}
  LSV('RDR_LAST',JSON.stringify({cu:cs[ci].u,ct:cs[ci].t,bu:bUrl,cat:catalog.slice(0,300),ts:Date.now()}));
  var _imgMode=false;
  try{_imgMode=true;for(var _im=0;_im<catalog.length&&_im<8;_im++){var _p=catalog[_im].paras;if(!_p||_p.length!==1||(_p[0]||'').indexOf('@@IMG@@')!==0){_imgMode=false;break}}}catch(e){_imgMode=false}

  function updateHead(){var n=Q('.hname'),p=Q('.hpos');if(n)n.textContent=cs[ci].t.slice(0,20);if(p)p.textContent='('+(pg+1)+'/'+tot+')';}
  function syncFav(){FAVBTN.textContent=ISB(bUrl)>=0?'★':'☆';FAVBTN.style.color=ISB(bUrl)>=0?'#ffc107':'';}
  function showH(){pn=1;H.classList.add('open');MSK.style.display='block';BK.style.display='block';FAVBTN.style.display='block'}
  function hideH(){pn=0;H.classList.remove('open');MSK.style.display='none';BK.style.display='none';FAVBTN.style.display='none'}
  function switchTab(name){
    var cur=H.querySelector('.tb.on');
    if(cur&&cur.getAttribute('data-tab')===name)name='';
    var tbs=H.querySelectorAll('.tb');
    for(var i=0;i<tbs.length;i++)tbs[i].className='tb'+(tbs[i].getAttribute('data-tab')===name?' on':'');
    for(var k in tabSubs){if(tabSubs.hasOwnProperty(k)&&tabSubs[k])tabSubs[k].className='sub s'+k+(k===name?' on':'')}
    if(name==='cat')fillCatalog();
    if(name==='set')fillThemePanel();
  }
  function fillCatalog(){
    var L2=Q('.dl');L2.innerHTML='';
    for(var i=0;i<cs.length;i++){
      (function(idx2){
        var r=D.createElement('div');
        if(idx2===ci)r.className='cur';
        r.textContent=(idx2+1)+'. '+cs[idx2].t+(cs[idx2].d?' (已缓存)':' ⌛');
        r.onclick=function(){Sh(idx2);hideH()};
        L2.appendChild(r);
      })(i);
    }
    setTimeout(function(){var cr=L2.children[ci];if(cr&&cr.scrollIntoView)try{cr.scrollIntoView({block:'center'})}catch(e){cr.scrollIntoView()}},50);
  }
  function fillThemePanel(){
    var box=Q('.sset .thlist');
    if(!box)return;
    box.innerHTML='';
    if(!S.themes.length){
      var e=D.createElement('div');
      e.style.cssText='text-align:center;padding:20px;opacity:.6;font-size:13px;line-height:1.6';
      e.textContent='还没有保存的主题';
      box.appendChild(e);
    }else{
      for(var i=0;i<S.themes.length;i++){
        (function(idx2){
          var r=D.createElement('div');
          var act=S.curTheme===idx2;
          r.style.cssText='padding:10px 12px;cursor:pointer;border-bottom:1px solid #2e3138;display:flex;align-items:center;gap:8px;'+(act?'background:#2a2d34;font-weight:bold':'');
          var dot=D.createElement('span');
          dot.textContent=act?'●':'○';
          dot.style.cssText='color:#4a8fe0';
          r.appendChild(dot);
          var nm=D.createElement('span');
          nm.textContent=S.themes[idx2].name||('主题 '+(idx2+1));
          nm.style.cssText='flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
          r.appendChild(nm);
          var del=D.createElement('span');
          del.textContent='×';
          del.style.cssText='color:#e55;padding:0 6px;font-size:18px;cursor:pointer';
          del.onclick=function(ev){ev.stopPropagation();if(!confirm('删除主题「'+(S.themes[idx2].name||('主题 '+(idx2+1)))+'」？'))return;S.themes.splice(idx2,1);if(S.curTheme===idx2)S.curTheme=-1;else if(S.curTheme>idx2)S.curTheme--;SV();fillThemePanel();};
          r.appendChild(del);
          r.onclick=function(){S.curTheme=idx2;applyThemeObjLocal(S.themes[idx2]);fillThemePanel();};
          box.appendChild(r);
        })(i);
      }
    }
  }
  function applyThemeObjLocal(t){
    if(!t)return;
    if(t.bg)S.bg=t.bg;
    if(t.fg)S.fg=t.fg;
    S.bgi=t.bgi||'';S.grad=t.grad||0;S.gs=t.gs||6;
    if(t.gc1)S.gc1=t.gc1;
    if(t.gc2)S.gc2=t.gc2;
    if(t.gh1!==undefined)S.gh1=t.gh1;
    if(t.gh2!==undefined)S.gh2=t.gh2;
    if(t.imode)S.imode=t.imode;
    if(t.br!==undefined)S.br=t.br;
    if(t.m)S.m=t.m;
    if(t.ap!==undefined)S.ap=t.ap;
    SV();c.theme();
    if(RC&&RC.reflow)RC.reflow();
    refreshUI();
  }
  var _subtabBtns=H.querySelectorAll('.subtab');
  for(var _si=0;_si<_subtabBtns.length;_si++)(function(b){
    b.onclick=function(){
      var u=b.getAttribute('data-ui');
      var all=H.querySelectorAll('.subtab');
      for(var i=0;i<all.length;i++)all[i].className='subtab'+(all[i].getAttribute('data-ui')===u?' on':'');
      var panes=H.querySelectorAll('.subpane');
      for(var j=0;j<panes.length;j++)panes[j].className='subpane'+(panes[j].getAttribute('data-ui-pane')===u?' on':'');
    };
  })(_subtabBtns[_si]);
  var ithSave=H.querySelector('.ithSave');
  if(ithSave)ithSave.onclick=function(){
    var name=prompt('输入主题名称：','主题 '+(S.themes.length+1));
    if(!name)return;
    var t={name:name.trim().slice(0,30),bg:S.bg,fg:S.fg,bgi:S.bgi,grad:S.grad,gs:S.gs,gc1:S.gc1,gc2:S.gc2,gh1:S.gh1,gh2:S.gh2,imode:S.imode,br:S.br,m:S.m,ap:S.ap};
    S.themes.push(t);S.curTheme=S.themes.length-1;SV();toast('已保存主题：'+t.name);
  };
  var tbs=H.querySelectorAll('.tb');
  for(var ti=0;ti<tbs.length;ti++)(function(el){el.onclick=function(){switchTab(el.getAttribute('data-tab'))}})(tbs[ti]);
  var mmc=H.querySelector('.mmc');
  if(mmc)mmc.onclick=function(ev){ev.stopPropagation();S.l=S.l?0:1;SV();c.theme();};

  var ibg=H.querySelector('.ibg');if(ibg)ibg.oninput=function(){S.bg=this.value;SV();c.theme();};
  var ifg=H.querySelector('.ifg');if(ifg)ifg.oninput=function(){S.fg=this.value;SV();c.theme();};
  var ibgi=H.querySelector('.ibgi');if(ibgi)ibgi.onchange=function(){S.bgi=this.value.trim();SV();c.theme();toast('已应用背景图')};
  var igc1=H.querySelector('.igc1');if(igc1)igc1.oninput=function(){S.gc1=this.value;SV();c.theme();};
  var igc2=H.querySelector('.igc2');if(igc2)igc2.oninput=function(){S.gc2=this.value;SV();c.theme();};
  var igh1=H.querySelector('.igh1');if(igh1)igh1.oninput=function(){S.gh1=parseInt(this.value,10);SV();c.theme();};
  var igh2=H.querySelector('.igh2');if(igh2)igh2.oninput=function(){S.gh2=parseInt(this.value,10);SV();c.theme();};
  var igs=H.querySelectorAll('.igsB');for(var igi=0;igi<igs.length;igi++)(function(el){el.onclick=function(){S.gs=parseInt(el.getAttribute('data-gs'),10);SV();c.theme();refreshUI();}})(igs[igi]);

  function lay(cb){
    if(S.m!=='p'){cb&&cb();return}
    var g=getComputedStyle(V),pl=parseFloat(g.paddingLeft)||0,pr=parseFloat(g.paddingRight)||0;
    var w=V.clientWidth-pl-pr;if(w<=0)w=W.innerWidth;cw=w;
    A.style.width=w+'px';A.style.columnWidth=w+'px';A.style.webkitColumnWidth=w+'px';
    A.style.columnGap='40px';A.style.webkitColumnGap='40px';
    setTimeout(function(){
      tot=Math.max(1,Math.round((A.scrollWidth+40)/(w+40)));
      if(pg>=tot)pg=tot-1;
      Q('.pb').max=tot-1;Q('.pb').value=pg;
      updateHead();cb&&cb();
    },50);
  }
  function go(p,save){
    pg=Math.max(0,Math.min(p,tot-1));
    if(window.__rdWantPg!=null&&pg===window.__rdWantPg)window.__rdWantPg=null;
    if(S.m==='p')A.style.transform='translateX('+(-pg*(cw+40))+'px)';
    Q('.pb').value=pg;updateHead();
    if(save!==false){ST_(cs[ci].u,pg);PROG_SET(bUrl,{cu:cs[ci].u,ct:cs[ci].t,ci:ci,pg:pg,cat:catalog.slice(0,300),ts:Date.now()});}
    if(ttsOn&&!ttsPaused)scheduleTTS();
  }
  function RP(ps,gl){
    if(imgRelayoutT){clearTimeout(imgRelayoutT);imgRelayoutT=null}
    A.innerHTML='';
    for(var i=0;i<ps.length;i++)appendP(A,ps[i]);
    if(S.m==='p'){
      var _wantInit=(_initPg!=null);
      var _tp=(_wantInit?_initPg:(gl===0?0:GT(cs[ci].u)));
      _initPg=null;
      if(_wantInit&&_tp>0){window.__rdWantPg=_tp;setTimeout(function(){if(window.__rdWantPg===_tp)window.__rdWantPg=null;},5000);}
      lay(function(){if(gl===1)_tp=tot-1;go(_tp,false)});
    }else{V.scrollTop=0;updateHead();}
  }
  function AP(ps){
    for(var i=0;i<ps.length;i++)appendP(A,ps[i]);
    if(S.m==='p'){
      var op=pg;
      lay(function(){
        if(window.__rdWantPg!=null){var _w=window.__rdWantPg;var _p=Math.min(_w,tot-1);go(_p,false);if(_p===_w)window.__rdWantPg=null;}
        else go(op,false);
      });
    }
  }
  function applyMode(){
    if(S.m==='s'){
      O.classList.add('scrollmode');
      V.style.overflow='auto';V.style.webkitOverflowScrolling='touch';
      A.style.height='auto';A.style.width='auto';A.style.columnWidth='auto';A.style.webkitColumnWidth='auto';A.style.transform='none';
      L.style.display='none';R2.style.display='none';
    }else{
      O.classList.remove('scrollmode');
      V.style.overflow='hidden';A.style.height='100%';L.style.display='block';R2.style.display='block';
      lay(function(){go(pg,false)});
    }
  }
  function Lc(i,cb){
    var c=cs[i];
    if(!c){cb&&cb(0);return}
    if(c.d){cb&&cb(c.p);return}
    if(!c.cb)c.cb=[];
    cb&&c.cb.push(cb);
    if(c.l)return;
    c.l=1;if(!c.p)c.p=[];
    var cached=cacheGet(c.u);
    if(cached&&cached.length){
      c.p=cached.slice();c.d=1;c.l=0;
      var cbs0=c.cb.slice();c.cb=[];
      for(var kk=0;kk<cbs0.length;kk++)cbs0[kk](c.p);
      FH(c.u).then(function(h){var d=new DOMParser().parseFromString(h,'text/html');var cc=FC(d);if(!cc)return;var fresh=TP(HT(cc.innerHTML));var fl=EXF(d,c.u);if(fl.length)rest(c,fl).then(function(){if(fresh.length)c.p=fresh.slice();cacheSet(c.u,c.t,c.p)});}).catch(function(){});
      return;
    }
    FH(c.u).then(function(h){
      var d=new DOMParser().parseFromString(h,'text/html');
      var cc=FC(d);if(!cc)throw new Error('E014 · 未找到正文容器');
      c.p=TP(HT(cc.innerHTML));c.d=1;c.l=0;
      var cbs=c.cb.slice();c.cb=[];
      for(var k=0;k<cbs.length;k++)cbs[k](c.p);
      var fl=EXF(d,c.u);
      if(fl.length)rest(c,fl).then(function(){cacheSet(c.u,c.t,c.p)});
      else cacheSet(c.u,c.t,c.p);
    }).catch(function(e){
      c.l=0;
      var code='E014';
      if(e&&e.message){
        if(e.message.indexOf('E010')===0)code='E010';
        else if(e.message.indexOf('E011')===0)code='E011';
        else if(e.message.indexOf('E012')===0)code='E012';
        else if(e.message.indexOf('E014')===0)code='E014';
      }
      c.errCode=code;c.errMsg=(e&&e.message)||err(code);
      var cbs=c.cb.slice();c.cb=[];
      for(var k=0;k<cbs.length;k++)cbs[k](null);
    });
  }
  function rest(c,us){
    var q=us.slice(),sn={};sn[c.u]=1;
    return new Promise(function(rs){
      (function st(){
        if(!q.length){c.f=1;return rs()}
        var u=q.shift();
        if(sn[u])return st();sn[u]=1;
        FH(u).then(function(h){
          var d=new DOMParser().parseFromString(h,'text/html');
          var n=FC(d);
          if(n){var mr=TP(HT(n.innerHTML));for(var i=0;i<mr.length;i++)c.p.push(mr[i]);if(cs[ci]===c)AP(mr);}
          var ml=EXF(d,u);
          for(var j=0;j<ml.length;j++)if(!sn[ml[j]])q.push(ml[j]);
        }).catch(function(){}).then(st);
      })();
    });
  }
  function pre(i){[i-1,i+1].forEach(function(x){if(x>=0&&x<cs.length&&!cs[x].d&&!cs[x].l&&!cs[x].local)Lc(x)})}
  function Sh(i,gl){
    if(i<0||i>=cs.length)return;
    ci=i;window.__rdWantPg=null;var c2=cs[i];
    Q('.t').textContent=c2.t.slice(0,40);
    window.__rdCurImgData=(c2&&c2.img)?c2:null;
    LSV('RDR_LAST',JSON.stringify({cu:c2.u,ct:c2.t,bu:bUrl,cat:catalog.slice(0,300),ts:Date.now()}));
    if(_initPg==null)PROG_SET(bUrl,{cu:c2.u,ct:c2.t,ci:i,pg:0,cat:catalog.slice(0,300),ts:Date.now()});
    HIS_ADD(c2.u,c2.t);
    syncFav();BK.style.display='none';FAVBTN.style.display='none';
    FAVBTN.onclick=function(){
      var _idx=ISB(bUrl);
      if(_idx>=0){var _b=GB();_b.splice(_idx,1);SB(_b);}
      else{var _b=GB();_b.push({u:bUrl,t:getBookTitle(bUrl)||(cs[0]&&cs[0].t)||D.title||'书籍',ts:Date.now()});SB(_b);}
      syncFav();
    };
    if(c2.d){RP(c2.p,gl);pre(i);}
    else{
      A.innerHTML='<p style="text-align:center;padding:60px 0;opacity:.6">加载中…</p>';
      lay(function(){});
      var k=++tk;
      Lc(i,function(p){
        if(tk!==k)return;
        if(!p){
          var ec=cs[ci].errCode||'E014';
          var em=cs[ci].errMsg||err(ec);
          A.innerHTML='<div style="text-align:center;padding:60px 20px;opacity:.75;font-size:14px;line-height:1.8"><div style="font-size:32px;margin-bottom:10px">⚠️</div><div style="color:#e57">'+escH(em)+'</div><div style="font-size:12px;opacity:.6;margin-top:8px">点屏幕中间可切换章节</div></div>';
          return;
        }
        RP(p,gl);pre(i);
      });
    }
  }
  function nx(){if(pn)return;if(S.m==='s')return;if(pg<tot-1)return go(pg+1);var c2=cs[ci];if(c2&&!c2.f)return;if(ci<cs.length-1)Sh(ci+1,0)}
  function pv(){if(pn)return;if(S.m==='s')return;if(pg>0)return go(pg-1);if(ci>0)Sh(ci-1,1)}
  function setAP(n){
    S.ap=n;SV();
    if(apTimer){clearInterval(apTimer);apTimer=null}
    if(n>0)apTimer=setInterval(function(){if(pn)return;if(ttsOn&&!ttsPaused)return;if(pg<tot-1)go(pg+1);else if(ci<cs.length-1)Sh(ci+1);else clearInterval(apTimer);},n*1000);
    refreshUI();
  }
  function setMode(m){S.m=m;SV();applyMode();refreshUI();}
  function refreshUI(){
    var bts;
    bts=H.querySelectorAll('.brB');for(var i=0;i<bts.length;i++)bts[i].className='brB'+(Math.abs(parseFloat(bts[i].getAttribute('data-br'))-S.br)<0.01?' on':'');
    bts=H.querySelectorAll('.apB');for(var j=0;j<bts.length;j++)bts[j].className='apB'+(parseInt(bts[j].getAttribute('data-ap'),10)===S.ap?' on':'');
    bts=H.querySelectorAll('.igsB');for(var ig=0;ig<bts.length;ig++)bts[ig].className='igsB'+(parseInt(bts[ig].getAttribute('data-gs'),10)===S.gs?' on':'');
    var mp=H.querySelector('.mP'),ms=H.querySelector('.mS');
    if(mp)mp.className='mP'+(S.m==='p'?' on':'');
    if(ms)ms.className='mS'+(S.m==='s'?' on':'');
    var fx=H.querySelector('.fx');if(fx)fx.textContent=S.f+'px';
    var gm=H.querySelector('.gmode');
    if(gm){gm.textContent=S.grad===0?'单色':(S.grad===1?'渐变':'炫彩');gm.className='gmode'+(S.grad?' on':'')}
  }
  var ttsOn=false,ttsPaused=false,ttsTimer=null,ttsRate=1,ttsPitch=1;
  if(!W.speechSynthesis){var stts=Q('.stts');if(stts)stts.innerHTML='<div style="padding:20px;text-align:center;opacity:.6;font-size:13px">当前环境不支持语音朗读</div>'}
  function speakText(text){
    if(!W.speechSynthesis||!text)return;
    try{W.speechSynthesis.cancel()}catch(e){}
    var u=new SpeechSynthesisUtterance(text);
    u.rate=ttsRate;u.pitch=ttsPitch;u.lang='zh-CN';
    u.onend=function(){
      if(!ttsOn||ttsPaused)return;
      ttsTimer=setTimeout(function(){
        if(pg<tot-1)go(pg+1);
        else if(ci<cs.length-1)Sh(ci+1);
        else{ttsOn=false;ttsPaused=false;refreshTTS()}
      },800);
    };
    W.speechSynthesis.speak(u);
  }
  function scheduleTTS(){
    if(ttsTimer){clearTimeout(ttsTimer);ttsTimer=null}
    try{W.speechSynthesis.cancel()}catch(e){}
    var ps=A.querySelectorAll('p');
    var text='';
    var flt=window.RDR_TTS_FILTER;
    for(var i=0;i<ps.length;i++){
      var t=ps[i].textContent||'';
      if(flt&&!flt(t,cs[ci].t))continue;
      text+=t+'。';
    }
    if(!text.trim())return;
    speakText(text.slice(0,4000));
  }
  function refreshTTS(){
    var a=H.querySelector('.ttsPlay'),b=H.querySelector('.ttsPause');
    if(a)a.className='ttsPlay'+(ttsOn&&!ttsPaused?' on':'');
    if(b)b.className='ttsPause'+(ttsOn&&ttsPaused?' on':'');
  }
  var ttsPlay=H.querySelector('.ttsPlay');if(ttsPlay)ttsPlay.onclick=function(){if(!W.speechSynthesis){toast('不支持语音');return}ttsOn=true;ttsPaused=false;refreshTTS();scheduleTTS()};
  var ttsPause=H.querySelector('.ttsPause');if(ttsPause)ttsPause.onclick=function(){if(!W.speechSynthesis)return;if(ttsPaused){ttsPaused=false;try{W.speechSynthesis.resume()}catch(e){}}else{ttsPaused=true;try{W.speechSynthesis.pause()}catch(e){}}refreshTTS()};
  var ttsStop=H.querySelector('.ttsStop');if(ttsStop)ttsStop.onclick=function(){ttsOn=false;ttsPaused=false;if(ttsTimer)clearTimeout(ttsTimer);try{W.speechSynthesis.cancel()}catch(e){}refreshTTS()};
  var ttsRateEl=H.querySelector('.ttsRate');if(ttsRateEl)ttsRateEl.oninput=function(){ttsRate=parseFloat(this.value)||1};
  var ttsPitchEl=H.querySelector('.ttsPitch');if(ttsPitchEl)ttsPitchEl.oninput=function(){ttsPitch=parseFloat(this.value)||1};

  MSK.onclick=hideH;
  M.onclick=function(){if(did){did=0;return}pn?hideH():showH()};
  L.onclick=function(){if(did){did=0;return}if(!pn){if(_imgMode){nx();return}pv()}};
  R2.onclick=function(){if(did){did=0;return}if(!pn)nx()};
  Q('.pv').onclick=function(){if(ci>0)Sh(ci-1)};
  Q('.nx').onclick=function(){if(ci<cs.length-1)Sh(ci+1)};
  Q('.pb').oninput=function(){go(parseInt(this.value))};
  var fmB=H.querySelector('.fmn'),fpB=H.querySelector('.fp');
  if(fmB)fmB.onclick=function(){if(S.f>12){S.f-=2;SV();A.style.fontSize=S.f+'px';var r=tot>1?pg/(tot-1):0;lay(function(){go(Math.round(r*(tot-1)),false)});refreshUI()}};
  if(fpB)fpB.onclick=function(){if(S.f<40){S.f+=2;SV();A.style.fontSize=S.f+'px';var r=tot>1?pg/(tot-1):0;lay(function(){go(Math.round(r*(tot-1)),false)});refreshUI()}};
  var brs=H.querySelectorAll('.brB');for(var bi=0;bi<brs.length;bi++)(function(el){el.onclick=function(){S.br=parseFloat(el.getAttribute('data-br'));SV();c.theme();refreshUI()}})(brs[bi]);
  var aps=H.querySelectorAll('.apB');for(var ai=0;ai<aps.length;ai++)(function(el){el.onclick=function(){setAP(parseInt(el.getAttribute('data-ap'),10))}})(aps[ai]);
  var mPB=H.querySelector('.mP'),mSB=H.querySelector('.mS');
  if(mPB)mPB.onclick=function(){setMode('p')};
  if(mSB)mSB.onclick=function(){setMode('s')};
  var gmB=H.querySelector('.gmode');if(gmB)gmB.onclick=function(){S.grad=(S.grad+1)%3;SV();c.theme();refreshUI()};

  var sx=0,sy=0,tt=null;
  B.addEventListener('touchstart',function(e){did=0;tt=e.target;if(tt!==L&&tt!==M&&tt!==R2)return;if(!e.touches.length)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
  B.addEventListener('touchend',function(e){
    if(tt!==L&&tt!==M&&tt!==R2)return;
    if(!e.changedTouches.length)return;
    var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){did=1;if(pn)return;if(_imgMode){nx();return}if(dx<0)nx();else pv();}
  },{passive:true});

  RC={
    fs:function(n){if(n===undefined)return S.f;S.f=n;SV();A.style.fontSize=n+'px';var r=tot>1?pg/(tot-1):0;lay(function(){go(Math.round(r*(tot-1)),false)});refreshUI();return S.f;},
    setAP:setAP,
    setMode:setMode,
    reload:function(){
      var c2=cs[ci];if(!c2)return;
      var _keepPg=pg;
      if(c2.local){RP(c2.p,false);return}
      try{localStorage.removeItem('CACHE_'+c2.u)}catch(e){}
      c2.d=0;c2.p=null;c2.l=0;c2.cb=[];c2.f=0;
      Lc(ci,function(p){
        if(!p)return;
        RP(p,false);
        setTimeout(function(){go(_keepPg,false);},60);
      });
    },
    reflow:function(){
      try{
        var ims=A.querySelectorAll('img');
        for(var ii=0;ii<ims.length;ii++){var im=ims[ii];var wrap=im.parentNode;if(!wrap||!wrap.classList)continue;wrap.classList.remove('__big');var alone=false;if(S.imode==='alone')alone=true;else if(S.imode==='inline')alone=false;else{if(im.naturalHeight>W.innerHeight*0.5||im.naturalWidth>W.innerWidth*1.2)alone=true;else if(im.naturalWidth>W.innerWidth*0.6)alone=true;}if(alone)wrap.classList.add('__big');}
        if(S.m==='p')lay(function(){go(pg,false)});
      }catch(e){}
    }
  };
  window.__rdRelayout=function(){
    if(S.m!=='p')return;
    if(window.__rdWantPg!=null){var _w=window.__rdWantPg;lay(function(){var _p=Math.min(_w,tot-1);go(_p,false);if(_p===_w)window.__rdWantPg=null;});return;}
    var ratio=tot>1?pg/(tot-1):0;
    lay(function(){go(Math.round(ratio*(tot-1)),false)});
  };

  refreshUI();applyMode();Sh(idx);updateHead();syncFav();
}

function viewShuku(_initHtml,_base){
  window.__rdLastDetail=null;c.setNav('shuku');BK.style.display='none';FAVBTN.style.display='none';Q('.t').textContent='书库';
  var _isGame=siteCategory()==='game';
  B.innerHTML='<div id="SC"></div>';
  var SC=Q('#SC');
  var _savedState=null;
  try{_savedState=JSON.parse(LSV('RDR_SHELF_STATE')||'null');}catch(e){}
  var _state={pages:[],scroll:0};
  var _saveT=null;
  function saveState(){
    if(_saveT)clearTimeout(_saveT);
    _saveT=setTimeout(function(){
      _state.scroll=SC.scrollTop;
      try{LSV('RDR_SHELF_STATE',JSON.stringify(_state));}catch(e){}
    },250);
  }
  SC.addEventListener('scroll',saveState,{passive:true});
  var items=[],nextUrl=null,prevUrl=null,loading=0,finished=0,seen={};
  var _prevLoading=0,_prevFinished=0,_firstUrl='';
  function paint(){
    var html='';
    if(!items.length&&finished)html='<div class="tip" style="padding:60px 20px">'+err('E003')+'<br><br>未识别到可显示列表</div>';
    else{
      for(var i=0;i<items.length;i++){
        var it=items[i],idx=ISB(it.url);
        html+='<div class="row">';
        html+='<div class="thumb">'+(it.thumb?'<img src="'+escH(it.thumb)+'" loading="lazy" onerror="this.style.display=\'none\'">':'<span class="ph">'+(_isGame?'🎮':'📖')+'</span>')+'</div>';
        html+='<div class="body">';
        html+='<a class="t" data-u="'+escH(it.url)+'">'+escH(it.title)+'</a>';
        var info='';
        if(it.author)info+='作者：'+escH(it.author)+'　';
        if(it.words)info+=escH(it.words)+'　';
        if(it.date)info+=escH(it.date);
        if(info)html+='<div class="info">'+info+'</div>';
        if(it.latest)html+='<div class="info">'+escH(it.latest)+'</div>';
        html+='</div>';
        html+='<span class="star'+(idx>=0?' on':'')+'" data-su="'+escH(it.url)+'">'+(idx>=0?'★':'☆')+'</span>';
        html+='</div>';
      }
      html+='<div class="tip">'+(finished?'已到底':(loading?'加载中…':''))+'</div>';
    }
    SC.innerHTML=html;
    var ls=SC.querySelectorAll('a.t');
    for(var j=0;j<ls.length;j++)(function(a){a.onclick=function(ev){ev.preventDefault();var u=a.getAttribute('data-u');if(_isGame){W.open(u,'_blank');return;}viewDetail(u);}})(ls[j]);
    var ss=SC.querySelectorAll('.star');
    for(var k=0;k<ss.length;k++)(function(el){
      el.onclick=function(ev){
        ev.preventDefault();ev.stopPropagation();
        var u=el.getAttribute('data-su');var idx=ISB(u);
        if(idx>=0){var b=GB();b.splice(idx,1);SB(b);el.textContent='☆';el.className='star';}
        else{var it=null;for(var m=0;m<items.length;m++)if(items[m].url===u){it=items[m];break}if(it){var b=GB();b.push({u:it.url,t:it.title,ts:Date.now()});SB(b);el.textContent='★';el.className='star on';}}
      };
    })(ss[k]);
  }
  function extractItems(html,base){
    var d=new DOMParser().parseFromString(html,'text/html');
    var its=d.querySelectorAll('.book-all-list .bd ul li.column-2, li.column-2, .book-list li, ul.list li');
    if(!its.length){
      var allLinks=d.querySelectorAll('a[href]');
      var generic=[];
      for(var z=0;z<allLinks.length;z++){
        var a=allLinks[z],t=(a.textContent||'').trim(),hr=a.getAttribute('href')||'';
        if(t.length<2||t.length>80)continue;
        if(hr==='#'||/^javascript:/i.test(hr))continue;
        var pc=a.parentNode,skip=false;
        while(pc&&pc!==d.body){var cn=(pc.className||'')+' '+(pc.id||'');if(/nav|header|footer|menu|breadcrumb|pagination|tab/i.test(cn)){skip=true;break}pc=pc.parentNode;}
        if(skip)continue;
        if(isAdLink(a))continue;
        generic.push(a);
      }
      its=generic.map(function(a){var li=d.createElement('li');li.className='column-2';li.appendChild(a.cloneNode(true));return li});
    }
    var arr=[];
    for(var i=0;i<its.length;i++){
      var nm=its[i].querySelector('a.name, a[href*="action=list"], a[href*="book"], a[href*="novel"], a[href]');
      if(!nm)continue;
      var hr=nm.getAttribute('href');if(!hr)continue;
      var f;try{f=new URL(hr,base||location.href).href.split('#')[0]}catch(e){continue}
      var title=purifyText((nm.textContent||'').trim(),'lib');
      if(title.length<1||title.length>80)continue;
      var aut=its[i].querySelector('a.author, .author'),wor=its[i].querySelector('span.words, .words'),dt=its[i].querySelector('span[style], .date'),up=its[i].querySelector('p.update, .update');
      arr.push({url:f,title:title,author:purifyText(aut?(aut.textContent||'').replace(/作者[：:]/,'').trim():'','lib'),words:purifyText(wor?(wor.textContent||'').trim():'','lib'),date:purifyText(dt?(dt.textContent||'').trim():'','lib'),latest:purifyText(up?(up.textContent||'').trim():'','lib'),thumb:pickThumb(its[i])});
    }
    return {items:arr,doc:d};
  }
  function add(html,base){
    var r=extractItems(html,base);
    var added=0;
    for(var i=0;i<r.items.length;i++){
      if(seen[r.items[i].url])continue;
      seen[r.items[i].url]=1;
      items.push(r.items[i]);
      added++;
    }
    var nA=r.doc.querySelector('a.nextPage, .pagination a:last-child, a[rel="next"]');
    if(nA){try{nextUrl=new URL(nA.getAttribute('href'),base||location.href).href}catch(e){}}
    else{nextUrl=null;finished=1;}
    return added;
  }
  function addFront(html,base){
    var r=extractItems(html,base);
    var realNew=[],added=0;
    for(var i=0;i<r.items.length;i++){
      if(seen[r.items[i].url])continue;
      seen[r.items[i].url]=1;
      realNew.push(r.items[i]);
      added++;
    }
    if(added)items=realNew.concat(items);
    var pA=r.doc.querySelector('a.prevPage, a[rel="prev"]');
    if(pA){try{prevUrl=new URL(pA.getAttribute('href'),base||location.href).href}catch(e){prevUrl=guessPrev(base);}}
    else prevUrl=guessPrev(base);
    if(!prevUrl)_prevFinished=1;
    return added;
  }
  function guessPrev(url){
    if(!url)return null;
    var m=url.match(/([?&])(page|pn|p)=(\d+)/);
    if(m){var n=parseInt(m[3],10);if(n>1)return url.replace(m[0],m[1]+m[2]+'='+(n-1));}
    return null;
  }
  var _startUrl;
  if(_initHtml){_startUrl=_base||location.href;add(_initHtml,_startUrl);}
  else{_startUrl=location.href;add(D.documentElement.innerHTML,_startUrl);}
  _state.pages=[_startUrl];
  _firstUrl=_startUrl;
  prevUrl=guessPrev(_firstUrl);
  if(!prevUrl)_prevFinished=1;
  if(!items.length)finished=1;
  paint();
  if(_savedState&&_savedState.pages&&_savedState.pages.length>1){
    var _restorePages=_savedState.pages.slice(1);
    var _restoreScroll=_savedState.scroll||0;
    (function loadRestore(){
      if(!_restorePages.length){
        setTimeout(function(){try{SC.scrollTop=_restoreScroll;}catch(e){}},150);
        return;
      }
      var u=_restorePages.shift();
      FH(u).then(function(h){
        _state.pages.push(u);if(_state.pages.length>200)_state.pages.splice(0,_state.pages.length-200);
        add(h,u);
        paint();
        loadRestore();
      }).catch(function(){loadRestore();});
    })();
  }
  SC.addEventListener('scroll',function(){
    if(loading||finished||!nextUrl)return;
    if(SC.scrollHeight-SC.scrollTop-SC.clientHeight<500){
      loading=1;
      var _nUrl=nextUrl;
      FH(_nUrl).then(function(h){
        _state.pages.push(_nUrl);if(_state.pages.length>200)_state.pages.splice(0,_state.pages.length-200);
        add(h,_nUrl);
        loading=0;
        paint();
      }).catch(function(){loading=0;finished=1;paint();});
    }
  },{passive:true});
  SC.addEventListener('scroll',function(){
    if(_prevLoading||_prevFinished||!prevUrl)return;
    if(SC.scrollTop<100){
      _prevLoading=1;
      var _pUrl=prevUrl;
      FH(_pUrl).then(function(h){
        var oldH=SC.scrollHeight,oldST=SC.scrollTop;
        var n=addFront(h,_pUrl);
        _prevLoading=0;
        if(n===0){_prevFinished=1;return;}
        _firstUrl=_pUrl;
        paint();
        SC.scrollTop=oldST+(SC.scrollHeight-oldH);
      }).catch(function(){_prevLoading=0;_prevFinished=1;});
    }
  },{passive:true});
}

function viewShelf(){
  window.__rdLastDetail=null;c.setNav('shelf');BK.style.display='none';FAVBTN.style.display='none';
  var mode=S.shelfView||'list';
  var all=GB();
  var local=[],remote=[];
  for(var i=0;i<all.length;i++){if(isSameHost(all[i].u))local.push(all[i]);else remote.push(all[i]);}
  local.sort(function(x,y){return (y.ts||0)-(x.ts||0)});
  remote.sort(function(x,y){return (y.ts||0)-(x.ts||0)});
  all=local.concat(remote);
  Q('.t').textContent='书架';
  B.innerHTML='<div style="position:absolute;top:0;left:0;right:0;height:44px;display:flex;align-items:center;padding:0 12px;border-bottom:1px solid rgba(128,128,128,.25);z-index:2;background:var(--rbg,#15161a)"><span style="flex:1;font-size:13px;opacity:.7">共 '+all.length+' 本（本域 '+local.length+'）</span><button class="svList" style="height:32px;padding:0 12px;border-radius:8px;border:0;cursor:pointer;background:'+(mode==='list'?'#4a8fe0':'#2a2d34')+';color:#d7dae0;font-size:13px;margin-right:6px">📋 列表</button><button class="svGrid" style="height:32px;padding:0 12px;border-radius:8px;border:0;cursor:pointer;background:'+(mode==='grid'?'#4a8fe0':'#2a2d34')+';color:#d7dae0;font-size:13px">▦ 网格</button></div><div id="SC" style="top:44px"></div>';
  var SC=Q('#SC');
  if(!all.length){SC.innerHTML='<div class="tip" style="padding:60px 20px">书架为空<br><br>书库里点书名右侧的 ☆ 收藏</div>';bindBtns();return;}
  function openBook(u){if(isSameHost(u)){viewDetail(u);}else{try{localStorage.setItem('RDR_JUMP_URL',u)}catch(e){}location.href=u;}}
  if(mode==='grid'){
    var html='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;padding:12px">';
    for(var g=0;g<all.length;g++){
      var same=isSameHost(all[g].u);
      html+='<div class="gcard" data-u="'+escH(all[g].u)+'" style="position:relative;background:#1a1a1a;border-radius:10px;overflow:hidden;cursor:pointer;border:1px solid '+(same?'rgba(74,143,224,.4)':'rgba(128,128,128,.2)')+'">'+
        '<div style="height:90px;display:flex;align-items:center;justify-content:center;font-size:30px;background:linear-gradient(135deg,#2a2d34,#3a3d44)">📖</div>'+
        '<div style="padding:8px 10px;font-size:13px;line-height:1.4;height:52px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">'+escH(all[g].t)+'</div>'+
        (same?'':'<div style="position:absolute;left:6px;bottom:6px;font-size:10px;color:#888;background:rgba(0,0,0,.5);padding:1px 6px;border-radius:8px">外站</div>')+
        '<div class="gdel" data-u="'+escH(all[g].u)+'" style="position:absolute;top:6px;right:6px;width:24px;height:24px;border-radius:50%;background:rgba(0,0,0,.6);color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer">×</div>'+
        '</div>';
    }
    html+='</div>';
    SC.innerHTML=html;
    var cards=SC.querySelectorAll('.gcard');
    for(var k=0;k<cards.length;k++)(function(el){el.onclick=function(ev){if(ev.target.classList.contains('gdel'))return;openBook(el.getAttribute('data-u'))}})(cards[k]);
    var dels=SC.querySelectorAll('.gdel');
    for(var m=0;m<dels.length;m++)(function(el){el.onclick=function(ev){ev.stopPropagation();var u=el.getAttribute('data-u');var arr=GB(),out=[];for(var n=0;n<arr.length;n++)if(arr[n].u!==u)out.push(arr[n]);SB(out);viewShelf();};})(dels[m]);
  }else{
    var h2='';
    for(var i2=0;i2<all.length;i2++){
      var same2=isSameHost(all[i2].u);
      var hostTag=same2?'':'<span class="xhost">外站</span>';
      h2+='<div class="row"><div class="thumb"><span class="ph">📖</span></div><div class="body"><a class="t" data-u="'+escH(all[i2].u)+'">'+escH(all[i2].t)+hostTag+'</a></div><span class="star on" data-rm="'+escH(all[i2].u)+'">★</span></div>';
    }
    SC.innerHTML=h2;
    var ls=SC.querySelectorAll('a.t');
    for(var j=0;j<ls.length;j++)(function(a){a.onclick=function(ev){ev.preventDefault();openBook(a.getAttribute('data-u'));}})(ls[j]);
    var rms=SC.querySelectorAll('[data-rm]');
    for(var r=0;r<rms.length;r++)(function(el){el.onclick=function(ev){ev.preventDefault();ev.stopPropagation();var u=el.getAttribute('data-rm');var arr=GB(),out=[];for(var s=0;s<arr.length;s++)if(arr[s].u!==u)out.push(arr[s]);SB(out);viewShelf();};})(rms[r]);
  }
  bindBtns();
  function bindBtns(){var lb=Q('.svList'),gb=Q('.svGrid');if(lb)lb.onclick=function(){S.shelfView='list';SV();viewShelf()};if(gb)gb.onclick=function(){S.shelfView='grid';SV();viewShelf()};}
}

function viewDetail(url){
  window.__rdLastDetail=url;c.setNav('');NAV.style.display='none';BK.style.display='block';FAVBTN.style.display='block';BK.onclick=function(){viewShuku()};
  HIS_ADD(url,D.title||'书籍');
  Q('.t').textContent='加载中…';
  FAVBTN.textContent=ISB(url)>=0?'★':'☆';
  FAVBTN.style.color=ISB(url)>=0?'#ffc107':'';
  FAVBTN.onclick=function(){
    var idx=ISB(url);
    var title=Q('.t').textContent||D.title||'书籍';
    if(idx>=0){var b=GB();b.splice(idx,1);SB(b);FAVBTN.textContent='☆';FAVBTN.style.color='';}
    else{var b=GB();b.push({u:url,t:title,ts:Date.now()});SB(b);FAVBTN.textContent='★';FAVBTN.style.color='#ffc107';}
  };
  B.innerHTML='<div id="DT"></div>';
  var DT=Q('#DT');
  var _catKey='RDR_CAT_'+url;
  var _catPages=[];
  try{_catPages=JSON.parse(LSV(_catKey)||'[]');}catch(e){}
  var _catPagesSet={};
  for(var _cpi=0;_cpi<_catPages.length;_cpi++)_catPagesSet[_catPages[_cpi]]=1;
  function saveCatPages(){try{LSV(_catKey,JSON.stringify(_catPages));}catch(e){}}
  FH(url).then(function(h){
    var d=new DOMParser().parseFromString(h,'text/html');
    var hh=d.querySelector('h1.page-title, h1, .book-title');
    var title=hh?(hh.textContent||'').trim():'未知';
    Q('.t').textContent=title.slice(0,40);
    HIS_ADD(url,title);
    try{LSV('RDR_BOOKTITLE_'+url,title)}catch(e){}
    var au=d.querySelector('.author, a.author');
    var auT=au?(au.textContent||'').replace(/作者[：:]/,'').trim():'';
    var a=[],sn={};
    function parseLinks(doc,base){
      var cl=doc.querySelectorAll('a[href*="action=article"], a[href*="chapter"], a[href*="read"]');
      for(var i=0;i<cl.length;i++){
        var hr=cl[i].getAttribute('href');if(!hr)continue;
        var f;try{f=new URL(hr,base).href.split('#')[0]}catch(e){continue}
        if(sn[f])continue;sn[f]=1;
        var t=(cl[i].textContent||'').trim();
        if(!t||t.length>80)continue;
        if(t.indexOf('从头开始')>=0||t.indexOf('从头阅读')>=0||t.indexOf('从头看')>=0)continue;
        a.push({u:f,t:t});
      }
    }
    function sortLinks(){a.sort(function(x,y){var ma=x.u.match(/[?&]id=(\d+)/),mb=y.u.match(/[?&]id=(\d+)/);if(!ma||!mb)return 0;return parseInt(ma[1])-parseInt(mb[1])});}
    function findNextPg(doc,base){
      var els=doc.querySelectorAll('a[href]');
      for(var _i=0;_i<els.length;_i++){var _t=(els[_i].textContent||'').trim();if(/^(下一页|下页|next|›|»|>)$/i.test(_t)){var _h=els[_i].getAttribute('href');if(_h){try{return new URL(_h,base).href.split('#')[0]}catch(e){return null}}}}
      return null;
    }
    function renderCh(){
      var html='<h2>'+escH(title)+'</h2>';
      if(auT)html+='<div class="au">'+escH(auT)+'</div>';
      var isSv=ISB(url)>=0;
      html+='<div class="btns"><button class="rd">📖 开始阅读</button><button class="sv'+(isSv?' on':'')+'">'+(isSv?'★':'☆')+'</button></div>';
      html+='<div class="cnt">共 '+a.length+' 章</div>';
      for(var j=0;j<a.length;j++){var cached=cacheGet(a[j].u)?'<span class="cc">已缓存</span>':'';html+='<div class="ch" data-i="'+j+'">'+(j+1)+'. '+escH(a[j].t)+cached+'</div>';}
      DT.innerHTML=html;
      var _prog=PROG_GET(url);
      var _rdBtn=DT.querySelector('.rd');
      if(_prog&&_prog.ci!=null&&a.length){
        var _pi=Math.max(0,Math.min(_prog.ci,a.length-1));
        _rdBtn.textContent='📖 继续阅读（第'+(_pi+1)+'章 · 第'+((_prog.pg||0)+1)+'页）';
        _rdBtn.onclick=function(){readChapter(a[_pi].u,a,url,_prog)};
      }else{
        _rdBtn.onclick=function(){readChapter(a[0]?a[0].u:url,a.length?a:[{u:url,t:title}],url)};
      }
      var svBtn=DT.querySelector('.sv');
      svBtn.onclick=function(){var idx=ISB(url);if(idx>=0){var b=GB();b.splice(idx,1);SB(b);svBtn.textContent='☆';svBtn.className='sv';FAVBTN.textContent='☆';FAVBTN.style.color='';}else{var b=GB();b.push({u:url,t:title,ts:Date.now()});SB(b);svBtn.textContent='★';svBtn.className='sv on';FAVBTN.textContent='★';FAVBTN.style.color='#ffc107';}};
      var chs=DT.querySelectorAll('.ch');
      for(var k=0;k<chs.length;k++)(function(el,i){el.onclick=function(){readChapter(a[i].u,a,url)}})(chs[k],k);
    }
    parseLinks(d,url);
    sortLinks();
    if(_catPages.length && _catPages[0]===url){
    }else{
      _catPages=[url];
      _catPagesSet={};
      _catPagesSet[url]=1;
      saveCatPages();
    }
    renderCh();
    var _queue=[];
    for(var _qi=1;_qi<_catPages.length;_qi++)_queue.push(_catPages[_qi]);
    if(!_queue.length){
      var _firstNext=findNextPg(d,url);
      if(_firstNext)_queue.push(_firstNext);
    }
    (function step(){
      if(!_queue.length)return;
      var u=_queue.shift();
      if(!u)return step();
      if(u===url || (sn[u] && _catPagesSet[u]))return step();
      FH(u).then(function(_h){
        var _d=new DOMParser().parseFromString(_h,'text/html');
        var before=a.length;
        parseLinks(_d,u);
        sortLinks();
        if(!_catPagesSet[u]){
          _catPages.push(u);
          _catPagesSet[u]=1;
          saveCatPages();
        }
        var nxt=findNextPg(_d,u);
        if(nxt && !_catPagesSet[nxt])_queue.push(nxt);
        if(a.length!==before)renderCh();
        step();
      }).catch(function(){step();});
    })();
  }).catch(function(e){DT.innerHTML='<div style="text-align:center;padding:40px;opacity:.6;color:#e57">'+escH((e&&e.message)||err('E010'))+'</div>';});
}

rd.modules.readChapter=readChapter;
rd.modules.viewShuku=viewShuku;
rd.modules.viewShelf=viewShelf;
rd.modules.viewDetail=viewDetail;
rd.modules.getBookTitle=getBookTitle;
rd.modules.appendP=appendP;
rd.nav('shuku',10,'📚','书库',viewShuku);
rd.nav('shelf',20,'⭐','书架',viewShelf);
console.log('[RDR-read] 已加载');
})();