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

function readChapter(chUrl,catalog,bookUrl,initProg){
  var bUrl=bookUrl||chUrl.split('#')[0];
  setNav('reader');NAV.style.display='none';BK.style.display='block';FAVBTN.style.display='block';
  HIS_ADD(chUrl,(Q('h1')||{}).textContent||D.title||'章节');
  BK.onclick=function(){
    try{
      var _curU=bUrl,_curT=cs[ci].t;
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
        '<div class="src"><label>字号</label><button class="fm" style="flex:0 0 44px">−</button><span class="fx" style="flex:1;text-align:center;font-size:13px">18px</span><button class="fp" style="flex:0 0 44px">＋</button></div>'+
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
  var tabSubs={cat:Q('.scat'),tts:Q('.stts'),ui:Q('.sui'),set:Q('.sset')};
  for(var i=0;i<catalog.length;i++)cs.push({u:catalog[i].u,t:catalog[i].t,p:catalog[i].paras||null,d:catalog[i].local?1:0,l:0,f:catalog[i].local?1:0,cb:[],img:catalog[i].img,image_url:catalog[i].img,tags:catalog[i].tags||'',desc:catalog[i].desc||'',file:catalog[i].file||'',be:catalog[i].be||'',loc:catalog[i].loc||''});
  var cu=chUrl.split('#')[0];
  var idx=-1;
  for(var j=0;j<cs.length;j++)if(cs[j].u===cu){idx=j;break}
  if(idx<0){cs.unshift({u:cu,t:(D.title||'').slice(0,30),p:null,d:0,l:0,f:0,cb:[]});idx=0}
  ci=idx;A.style.fontSize=S.f+'px';Q('.fx').textContent=S.f+'px';
  var _initPg=null;
  if(initProg){if(initProg.ci!=null)ci=Math.max(0,Math.min(initProg.ci,cs.length-1));if(initProg.pg!=null)_initPg=initProg.pg;}
  LSV('RDR_LAST',JSON.stringify({cu:cs[ci].u,ct:cs[ci].t,cat:catalog.slice(0,300),ts:Date.now()}));
  var _imgMode=false;
  try{_imgMode=true;for(var _im=0;_im<catalog.length&&_im<8;_im++){var _p=catalog[_im].paras;if(!_p||_p.length!==1||(_p[0]||'').indexOf('@@IMG@@')!==0){_imgMode=false;break}}}catch(e){_imgMode=false}

  function updateHead(){var n=Q('.hname'),p=Q('.hpos');if(n)n.textContent=cs[ci].t.slice(0,20);if(p)p.textContent='('+(pg+1)+'/'+tot+')';}
  function syncFav(){FAVBTN.textContent=ISB(bUrl)>=0?'★':'☆';FAVBTN.style.color=ISB(bUrl)>=0?'#ffc107':'';}
  function showH(){pn=1;H.classList.add('open');MSK.style.display='block'}
  function hideH(){pn=0;H.classList.remove('open');MSK.style.display='none'}
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
      (function(idx){
        var r=D.createElement('div');
        if(idx===ci)r.className='cur';
        r.textContent=(idx+1)+'. '+cs[idx].t+(cs[idx].d?' (已缓存)':' ⌛');
        r.onclick=function(){Sh(idx);hideH()};
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
        (function(idx){
          var r=D.createElement('div');
          var act=S.curTheme===idx;
          r.style.cssText='padding:10px 12px;cursor:pointer;border-bottom:1px solid #2e3138;display:flex;align-items:center;gap:8px;'+(act?'background:#2a2d34;font-weight:bold':'');
          var dot=D.createElement('span');
          dot.textContent=act?'●':'○';
          dot.style.cssText='color:#4a8fe0';
          r.appendChild(dot);
          var nm=D.createElement('span');
          nm.textContent=S.themes[idx].name||('主题 '+(idx+1));
          nm.style.cssText='flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
          r.appendChild(nm);
          var del=D.createElement('span');
          del.textContent='×';
          del.style.cssText='color:#e55;padding:0 6px;font-size:18px;cursor:pointer';
          del.onclick=function(ev){ev.stopPropagation();if(!confirm('删除主题「'+(S.themes[idx].name||('主题 '+(idx+1)))+'」？'))return;S.themes.splice(idx,1);if(S.curTheme===idx)S.curTheme=-1;else if(S.curTheme>idx)S.curTheme--;SV();fillThemePanel();};
          r.appendChild(del);
          r.onclick=function(){S.curTheme=idx;applyThemeObjLocal(S.themes[idx]);fillThemePanel();};
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
    SV();theme();
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
  if(mmc)mmc.onclick=function(ev){ev.stopPropagation();S.l=S.l?0:1;SV();theme();};

  var ibg=H.querySelector('.ibg');if(ibg)ibg.oninput=function(){S.bg=this.value;SV();theme();};
  var ifg=H.querySelector('.ifg');if(ifg)ifg.oninput=function(){S.fg=this.value;SV();theme();};
  var ibgi=H.querySelector('.ibgi');if(ibgi)ibgi.onchange=function(){S.bgi=this.value.trim();SV();theme();toast('已应用背景图')};
  var igc1=H.querySelector('.igc1');if(igc1)igc1.oninput=function(){S.gc1=this.value;SV();theme();};
  var igc2=H.querySelector('.igc2');if(igc2)igc2.oninput=function(){S.gc2=this.value;SV();theme();};
  var igh1=H.querySelector('.igh1');if(igh1)igh1.oninput=function(){S.gh1=parseInt(this.value,10);SV();theme();};
  var igh2=H.querySelector('.igh2');if(igh2)igh2.oninput=function(){S.gh2=parseInt(this.value,10);SV();theme();};
  var igs=H.querySelectorAll('.igsB');for(var igi=0;igi<igs.length;igi++)(function(el){el.onclick=function(){S.gs=parseInt(el.getAttribute('data-gs'),10);SV();theme();refreshUI();}})(igs[igi]);

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
      var _tp=gl?tot-1:(_wantInit?_initPg:GT(cs[ci].u));
      _initPg=null;
      if(_wantInit&&_tp>0){window.__rdWantPg=_tp;setTimeout(function(){if(window.__rdWantPg===_tp)window.__rdWantPg=null;},5000);}
      lay(function(){go(_tp,false)});
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
    ci=i;window.__rdWantPg=null;var c=cs[i];
    Q('.t').textContent=c.t.slice(0,40);
    window.__rdCurImgData=(c&&c.img)?c:null;
    LSV('RDR_LAST',JSON.stringify({cu:c.u,ct:c.t,cat:catalog.slice(0,300),ts:Date.now()}));
    if(_initPg==null)PROG_SET(bUrl,{cu:c.u,ct:c.t,ci:i,pg:0,cat:catalog.slice(0,300),ts:Date.now()});
    HIS_ADD(c.u,c.t);
    syncFav();
    FAVBTN.onclick=function(){
      var _idx=ISB(bUrl);
      if(_idx>=0){var _b=GB();_b.splice(_idx,1);SB(_b);}
      else{var _b=GB();_b.push({u:bUrl,t:c.t,ts:Date.now()});SB(_b);}
      syncFav();
    };
    if(c.d){RP(c.p,gl);pre(i);}
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
  function nx(){if(pn)return;if(S.m==='s')return;if(pg<tot-1)return go(pg+1);var c=cs[ci];if(c&&!c.f)return;if(ci<cs.length-1)Sh(ci+1)}
  function pv(){if(pn)return;if(S.m==='s')return;if(pg>0)return go(pg-1);if(ci>0)Sh(ci-1,1)}
  function setAP(n){
    S.ap=n;SV();
    if(apTimer){clearInterval(apTimer);apTimer=null}
    if(n>0)apTimer=setInterval(function(){if(pn)return;if(pg<tot-1)go(pg+1);else if(ci<cs.length-1)Sh(ci+1);else clearInterval(apTimer);},n*1000);
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
  var fmB=H.querySelector('.fm'),fpB=H.querySelector('.fp');
  if(fmB)fmB.onclick=function(){if(S.f>12){S.f-=2;SV();A.style.fontSize=S.f+'px';var r=tot>1?pg/(tot-1):0;lay(function(){go(Math.round(r*(tot-1)),false)});refreshUI()}};
  if(fpB)fpB.onclick=function(){if(S.f<40){S.f+=2;SV();A.style.fontSize=S.f+'px';var r=tot>1?pg/(tot-1):0;lay(function(){go(Math.round(r*(tot-1)),false)});refreshUI()}};
  var brs=H.querySelectorAll('.brB');for(var bi=0;bi<brs.length;bi++)(function(el){el.onclick=function(){S.br=parseFloat(el.getAttribute('data-br'));SV();theme();refreshUI()}})(brs[bi]);
  var aps=H.querySelectorAll('.apB');for(var ai=0;ai<aps.length;ai++)(function(el){el.onclick=function(){setAP(parseInt(el.getAttribute('data-ap'),10))}})(aps[ai]);
  var mPB=H.querySelector('.mP'),mSB=H.querySelector('.mS');
  if(mPB)mPB.onclick=function(){setMode('p')};
  if(mSB)mSB.onclick=function(){setMode('s')};
  var gmB=H.querySelector('.gmode');if(gmB)gmB.onclick=function(){S.grad=(S.grad+1)%3;SV();theme();refreshUI()};

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

function viewShuku(_initHtml,_base){
  window.__rdLastDetail=null;setNav('shuku');BK.style.display='none';FAVBTN.style.display='none';Q('.t').textContent='书库';
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
      arr.push({url:f,title:title,author:aut?(aut.textContent||'').replace(/作者[：:]/,'').trim():'',words:wor?(wor.textContent||'').trim():'',date:dt?(dt.textContent||'').trim():'',latest:up?(up.textContent||'').trim():'',thumb:pickThumb(its[i])});
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
        _state.pages.push(u);
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
        _state.pages.push(_nUrl);
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
  window.__rdLastDetail=null;setNav('shelf');BK.style.display='none';FAVBTN.style.display='none';
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

function feedList(){try{return JSON.parse(LSV('RDR_FEEDS')||'[]')}catch(e){return[]}}
function feedSave(a){try{LSV('RDR_FEEDS',JSON.stringify(a))}catch(e){}}
function viewFeedList(){
  window.__rdLastDetail=null;setNav('feed');BK.style.display='none';FAVBTN.style.display='none';Q('.t').textContent='订阅源';
  B.innerHTML='<div id="SC"></div>';
  var SC=Q('#SC');
  var list=feedList();
  var html='<div style="padding:12px 16px;border-bottom:1px solid #2a2d34;display:flex;gap:8px"><button class="addCur" style="flex:1;height:44px;border-radius:10px;font-size:14px;cursor:pointer;border:0;background:#4a8fe0;color:#fff">➕ 当前页加为订阅源</button><button class="addFeed" style="flex:1;height:44px;border-radius:10px;font-size:14px;cursor:pointer;border:0;background:#2a2d34;color:#d7dae0">✎ 手动添加</button></div>';
  if(!list.length)html+='<div class="tip" style="padding:60px 20px">还没有订阅源<br><br>点上方按钮添加一个网页作为订阅源<br>打开后保留原网页布局</div>';
  else for(var i=0;i<list.length;i++)html+='<div class="row"><div class="body"><a class="t" data-u="'+escH(list[i].u)+'" style="padding-right:0">'+escH(list[i].t||list[i].u)+'</a><div class="info">'+escH(list[i].u)+'</div></div><span class="star on" data-rm="'+escH(list[i].u)+'" style="color:#e55;font-size:22px">×</span></div>';
  SC.innerHTML=html;
  SC.querySelector('.addCur').onclick=function(){var u=location.href.split('#')[0];var t=document.title||u;var l=feedList();for(var i=0;i<l.length;i++)if(l[i].u===u){toast('已存在，直接打开');viewFeed(u);return}l.push({u:u,t:t.slice(0,50),ts:Date.now()});feedSave(l);viewFeed(u);};
  SC.querySelector('.addFeed').onclick=function(){var u=prompt('输入订阅源 URL：','https://');if(!u)return;u=u.trim();if(!/^https?:\/\//i.test(u)){toast('请输入完整 URL（http/https）');return}var t=prompt('输入名称：',u)||u;var l=feedList();l.push({u:u,t:t.slice(0,50),ts:Date.now()});feedSave(l);viewFeedList();};
  var ls=SC.querySelectorAll('a.t');for(var j=0;j<ls.length;j++)(function(a){a.onclick=function(ev){ev.preventDefault();viewFeed(a.getAttribute('data-u'))}})(ls[j]);
  var rms=SC.querySelectorAll('[data-rm]');for(var k=0;k<rms.length;k++)(function(el){el.onclick=function(ev){ev.preventDefault();ev.stopPropagation();if(!confirm('删除此订阅源？'))return;var u=el.getAttribute('data-rm'),l=feedList(),out=[];for(var n=0;n<l.length;n++)if(l[n].u!==u)out.push(l[n]);feedSave(out);viewFeedList();};})(rms[k]);
}

function viewFeed(url){
  var routed=routeFeedUrl(url);
  if(routed)return;
  var _u;try{_u=new URL(url,location.href).href}catch(e){return}
  url=_u;
  window.__rdLastDetail=null;setNav('feed');NAV.style.display='none';BK.style.display='block';FAVBTN.style.display='block';
  Q('.t').textContent='加载中…';
  BK.onclick=function(){viewFeedList()};
  FAVBTN.textContent='🌐';FAVBTN.style.color='#4a8fe0';
  FAVBTN.onclick=function(){W.open(url,'_blank')};
  var _fm=Q('.fm');
  if(_fm){
    _fm.style.display='block';
    _fm.onclick=function(ev){
      ev.stopPropagation();
      var ch=prompt('1 = 转书库列表\n2 = 转阅读器\n\n输入 1 或 2：','1');
      if(ch==='1')viewShuku(FEED_BODY.innerHTML,url);
      else if(ch==='2'){
        var _ps=TP(HT(FEED_BODY.innerHTML));
        if(!_ps||!_ps.length){toast('未提取到正文');return}
        var _ti=(Q('.t')||{}).textContent||url;
        readChapter(url,[{u:url,t:_ti,paras:_ps,local:1}],url);
      }
    };
  }
  B.innerHTML='<div id="FEED"><div id="FEED_TOP"></div><div id="FEED_BODY"></div></div>';
  var FEED_TOP=Q('#FEED_TOP'),FEED_BODY=Q('#FEED_BODY');
  HIS_ADD(url,'订阅源');
  FH(url).then(function(html){
    var d=new DOMParser().parseFromString(html,'text/html');
    var h1=d.querySelector('h1');
    var t=(h1&&(h1.textContent||'').trim())||d.title||url;
    Q('.t').textContent=t.slice(0,40);
    HIS_ADD(url,t);
    var base=d.createElement('base');base.href=url;FEED_TOP.appendChild(base);
    var heads=d.head.querySelectorAll('style,link[rel="stylesheet"]');
    for(var i=0;i<heads.length;i++){
      try{
        var node=D.importNode(heads[i],true);
        if(node.tagName==='STYLE'&&node.textContent){node.textContent=node.textContent.replace(/(^|[^\w-])html\s*\{/gi,'$1#FEED{').replace(/(^|[^\w-])body\s*\{/gi,'$1#FEED{');}
        FEED_TOP.appendChild(node);
      }catch(e){}
    }
    if(d.body.className)FEED_BODY.className=d.body.className;
    var nodes=d.body.childNodes;
    for(var j=0;j<nodes.length;j++){var n=nodes[j];if(n.nodeType===1&&(n.tagName==='SCRIPT'||n.tagName==='STYLE'||n.tagName==='LINK'))continue;try{FEED_BODY.appendChild(D.importNode(n,true))}catch(e){}}
    var imgs=FEED_BODY.querySelectorAll('img');
    for(var m=0;m<imgs.length;m++){
      imgs[m].referrerPolicy='no-referrer';
      (function(im){
        im.style.cursor='zoom-in';
        im.onclick=function(ev){
          ev.preventDefault();ev.stopPropagation();
          var src=im.getAttribute('data-original')||im.getAttribute('data-src')||im.getAttribute('data-actual')||im.src||'';
          if(!src)return;
          if(src.indexOf('//')===0)src='https:'+src;
          else if(src.indexOf('/')===0)src=location.origin+src;
          else if(!/^https?:/i.test(src)){try{src=new URL(src,url).href}catch(e){return}}
          imgView({image_url:src,t:im.getAttribute('alt')||im.getAttribute('title')||'图片'});
        };
      })(imgs[m]);
    }
    var allEls=FEED_BODY.querySelectorAll('*');
    for(var q=0;q<allEls.length;q++){try{var _cs=getComputedStyle(allEls[q]);if(_cs.position==='fixed'||_cs.position==='sticky')allEls[q].style.position='relative';}catch(e){}}
    var as=FEED_BODY.querySelectorAll('a[href]');
    for(var k=0;k<as.length;k++)(function(a){
      a.onclick=function(ev){
        var hr=a.getAttribute('href')||'';
        if(!hr||hr==='#'||/^javascript:/i.test(hr))return;
        ev.preventDefault();
        var full;try{full=new URL(hr,url).href}catch(e){return}
        if(/\.(jpg|png|gif|webp|jpeg|svg|mp4|mp3|zip|apk|exe)$/i.test(full)){W.open(full,'_blank');return}
        viewFeed(full);
      };
    })(as[k]);
  }).catch(function(e){FEED_BODY.innerHTML='<div style="padding:60px 20px;text-align:center;color:#e57">'+escH((e&&e.message)||err('E010'))+'</div>';});
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
      readChapter(catalog[0].u,catalog,catalog[0].u);
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
        r.onclick=function(){try{localStorage.setItem('RDR_PENDING_URL',h.u)}catch(e){}if(isSameHost(h.u)){viewDetail(h.u);}else{location.href=h.u;}};
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
  B.querySelector('.srst').onclick=function(){if(confirm('清空书架？')){SB([]);viewShelf()}};
  B.querySelector('.sclr').onclick=function(){
    if(confirm('重置所有设置？')){
      try{LSV('RDR_CFG','{}')}catch(e){}
      S={f:18,l:0,m:'p',ap:0,br:1,bg:'#15161a',fg:'#cdd0d5',bgi:'',grad:0,gs:6,gc1:'#ff2b5e',gc2:'#2bd9ff',gh1:0,gh2:360,themes:[],curTheme:-1,imode:'alone',shelfView:'list',askFav:1};
      theme();viewSetting();
    }
  };
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
        box.onclick=function(){purifyEdit(idx)};
        list.appendChild(box);
      })(i);
    }
  }
  B.querySelector('.purAdd').onclick=function(){purifyEdit(-1)};
  paint();
}
function purifyEdit(idx){
  var all=purifyAll();
  var r=idx>=0?all[idx]:{name:'',host:'*',scope:'all',find:'',replace:'',regex:0,enable:1};
  var box=D.createElement('div');
  box.style.cssText='position:absolute;inset:0;background:var(--rbg,#15161a);z-index:5;overflow-y:auto;padding:16px 20px;box-sizing:border-box';
  box.innerHTML='<div style="font-size:14px;opacity:.8;margin-bottom:12px">'+(idx>=0?'编辑规则':'新增规则')+'</div>'+
    '<div style="display:flex;flex-direction:column;gap:10px">'+
    '<label style="font-size:13px;opacity:.7">名称</label><input class="pName" type="text" value="'+escH(r.name||'')+'" style="height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px">'+
    '<label style="font-size:13px;opacity:.7">站点（* 全部，支持 *.example.com）</label><input class="pHost" type="text" value="'+escH(r.host||'*')+'" style="height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px">'+
    '<label style="font-size:13px;opacity:.7">作用域</label><select class="pScope" style="height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px"><option value="all">全部</option><option value="lib">书库</option><option value="read">阅读器</option></select>'+
    '<label style="font-size:13px;opacity:.7">查找</label><textarea class="pFind" style="height:80px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:8px;font:12px monospace">'+escH(r.find||'')+'</textarea>'+
    '<label style="font-size:13px;opacity:.7">替换为（留空=删除）</label><textarea class="pRep" style="height:60px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:8px;font:12px monospace">'+escH(r.replace||'')+'</textarea>'+
    '<div style="display:flex;gap:8px"><button class="pRegex" style="flex:1;height:38px;border-radius:8px;border:0;cursor:pointer;background:'+(r.regex?'#4a8fe0':'#2a2d34')+';color:#d7dae0;font-size:13px">'+(r.regex?'正则 ✓':'正则 ✗')+'</button><button class="pEn" style="flex:1;height:38px;border-radius:8px;border:0;cursor:pointer;background:'+(r.enable===0?'#2a2d34':'#4a8fe0')+';color:#d7dae0;font-size:13px">'+(r.enable===0?'已禁用':'已启用')+'</button></div>'+
    '<div style="display:flex;gap:8px;margin-top:10px;position:sticky;bottom:0;padding:10px 0;background:var(--rbg,#15161a);box-shadow:0 -6px 12px rgba(0,0,0,.25)"><button class="pSave" style="flex:1;height:44px;border-radius:10px;border:0;cursor:pointer;background:#4a8fe0;color:#fff;font-size:14px">保存</button><button class="pCancel" style="flex:1;height:44px;border-radius:10px;border:0;cursor:pointer;background:#2a2d34;color:#d7dae0;font-size:14px">取消</button></div>'+
    '</div>';
  B.appendChild(box);
  box.querySelector('.pScope').value=r.scope||'all';
  var reOn=r.regex?1:0,enOn=r.enable===0?0:1;
  box.querySelector('.pRegex').onclick=function(){reOn=reOn?0:1;this.textContent=reOn?'正则 ✓':'正则 ✗';this.style.background=reOn?'#4a8fe0':'#2a2d34';};
  box.querySelector('.pEn').onclick=function(){enOn=enOn?0:1;this.textContent=enOn?'已启用':'已禁用';this.style.background=enOn?'#4a8fe0':'#2a2d34';};
  box.querySelector('.pCancel').onclick=function(){box.parentNode.removeChild(box)};
  box.querySelector('.pSave').onclick=function(){
    var o={name:box.querySelector('.pName').value.trim().slice(0,40)||('规则'+(all.length+1)),host:box.querySelector('.pHost').value.trim()||'*',scope:box.querySelector('.pScope').value,find:box.querySelector('.pFind').value,replace:box.querySelector('.pRep').value,regex:reOn,enable:enOn};
    if(!o.find){toast('查找内容不能为空');return}
    if(o.regex){try{new RegExp(o.find)}catch(e){toast('正则表达式无效');return}}
    var arr=purifyAll();
    if(idx>=0)arr[idx]=o;else arr.push(o);
    purifySave(arr);
    box.parentNode.removeChild(box);
    viewPurify();
  };
}

function viewDetail(url){
  window.__rdLastDetail=url;setNav('');NAV.style.display='none';BK.style.display='block';FAVBTN.style.display='block';BK.onclick=function(){viewShuku()};
  HIS_ADD(url,D.title||'书籍');
  Q('.t').textContent='加载中…';
  FAVBTN.textContent=ISB(url)>=0?'★':'☆';
  FAVBTN.style.color=ISB(url)>=0?'#ffc107':'';
  FAVBTN.onclick=function(){
    var idx=ISB(url);
    var title=Q('.t').textContent||D.title||'书籍';
    if(idx>=0){var b=GB();b.splice(idx,1);SB(b);FAVBTN.textContent='☆';FAVBTN.style.color='';}
    else{var b=GB();b.push({u:url