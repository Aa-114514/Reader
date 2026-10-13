(function(){
var rd=window.__rd;
if(!rd){console.warn('[RDR-anim] 主程序未启动');return}
if(rd.modules.animLoaded){console.warn('[RDR-anim] 已加载');return}
rd.modules.animLoaded=1;

var c=rd.ctx;
var D=c.D,W=c.W,Q=c.Q;
var escH=c.escH;

var CFG_KEY='RDR_ANIM_CFG';
var DEF={enabled:1,duration:600,easing:'cubic-bezier(.22,.61,.36,1)',stagger:8};
var cfg={};for(var dk in DEF)if(DEF.hasOwnProperty(dk))cfg[dk]=DEF[dk];
try{
  var s=localStorage.getItem(CFG_KEY);
  if(s){var o=JSON.parse(s);for(var k in o)if(o.hasOwnProperty(k))cfg[k]=o[k];}
}catch(e){}
function saveCfg(){try{localStorage.setItem(CFG_KEY,JSON.stringify(cfg))}catch(e){}}

function inViewport(el,pad){
  pad=pad||120;
  var r=el.getBoundingClientRect();
  return r.bottom>-pad&&r.top<W.innerHeight+pad&&r.width>0&&r.height>0;
}

function animBatch(els,opt){
  opt=opt||{};
  if(!cfg.enabled||!els.length)return;
  var dur=opt.duration||cfg.duration;
  var easing=opt.easing||cfg.easing;
  var stagger=opt.stagger!=null?opt.stagger:cfg.stagger;
  var W2=W.innerWidth,H2=W.innerHeight;
  var cx=W2/2,cy=H2/2;
  var radius=Math.sqrt(W2*W2+H2*H2)/2;
  var maxTotal=400;
  els=els.filter(function(el){return inViewport(el)});
  if(!els.length)return;
  if(els.length>80)els=els.slice(0,80);
  els.forEach(function(el,i){
    var rect=el.getBoundingClientRect();
    var ex=rect.left+rect.width/2;
    var ey=rect.top+rect.height/2;
    var dx=ex-cx,dy=ey-cy;
    var ang=Math.atan2(dy,dx);
    var dist=Math.max(rect.width,rect.height)+radius*0.8;
    var offX=Math.cos(ang)*dist;
    var offY=Math.sin(ang)*dist;
    var rot=(Math.random()-0.5)*240;
    var sc=0.3;
    el.style.transition='none';
    el.style.transform='translate('+offX.toFixed(1)+'px,'+offY.toFixed(1)+'px) rotate('+rot.toFixed(1)+'deg) scale('+sc+')';
    el.style.opacity='0';
    el.style.willChange='transform, opacity';
    el.style.transformOrigin='center center';
    var delay=Math.min(i*stagger,maxTotal);
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      el.style.transition='transform '+dur+'ms '+easing+' '+delay+'ms, opacity '+dur+'ms '+easing+' '+delay+'ms';
      el.style.transform='translate(0,0) rotate(0) scale(1)';
      el.style.opacity='1';
      setTimeout(function(){el.style.removeProperty('will-change')},dur+delay+50);
    })});
  });
}

function animChars(p){
  var text=p.textContent||'';
  if(!text.trim())return;
  var pRect=p.getBoundingClientRect();
  if(!pRect.width||!pRect.height)return;
  var pcx=pRect.left+pRect.width/2;
  var pcy=pRect.top+pRect.height/2;
  p.innerHTML='';
  var spans=[];
  var frag=document.createDocumentFragment();
  for(var i=0;i<text.length;i++){
    var ch=text[i];
    if(/\s/.test(ch)){frag.appendChild(document.createTextNode(ch));continue;}
    var sp=document.createElement('span');
    sp.textContent=ch;
    sp.style.display='inline-block';
    sp.style.willChange='transform, opacity';
    frag.appendChild(sp);
    spans.push(sp);
  }
  p.appendChild(frag);
  if(!spans.length)return;
  if(spans[0])spans[0].style.marginLeft='2em';
  var maxTotal=300;
  var baseStg=cfg.stagger*0.6;
  spans.forEach(function(sp,i){
    var sr=sp.getBoundingClientRect();
    var scx=sr.left+sr.width/2;
    var scy=sr.top+sr.height/2;
    var dx=scx-pcx,dy=scy-pcy;
    var ang=Math.atan2(dy,dx);
    var dist=320+Math.random()*180;
    var offX=Math.cos(ang)*dist;
    var offY=Math.sin(ang)*dist;
    var rot=(Math.random()-0.5)*360;
    var sc=0.15;
    sp.style.transition='none';
    sp.style.transform='translate('+offX.toFixed(1)+'px,'+offY.toFixed(1)+'px) rotate('+rot.toFixed(1)+'deg) scale('+sc+')';
    sp.style.opacity='0';
    var delay=Math.min(i*baseStg,maxTotal);
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      sp.style.transition='transform '+cfg.duration+'ms '+cfg.easing+' '+delay+'ms, opacity '+cfg.duration+'ms '+cfg.easing+' '+delay+'ms';
      sp.style.transform='translate(0,0) rotate(0) scale(1)';
      sp.style.opacity='1';
    })});
  });
}

var _lastA=null;
function triggerAnim(){
  if(!cfg.enabled)return;
  var A=Q('#A');
  if(A){
    var ps=A.querySelectorAll('p');
    if(!ps.length)return;
    var isNew=A!==_lastA;
    if(isNew){
      _lastA=A;
      for(var i=0;i<ps.length;i++){
        var p=ps[i];
        if(p._rdAnimDone)continue;
        if(!inViewport(p))continue;
        p._rdAnimDone=1;
        animChars(p);
      }
    }else{
      var arr=[];
      for(var j=0;j<ps.length;j++){
        var p2=ps[j];
        if(p2._rdAnimDone)continue;
        p2._rdAnimDone=1;
        if(!inViewport(p2))continue;
        arr.push(p2);
      }
      if(arr.length)animBatch(arr);
    }
    return;
  }
  var roots=['#SC','#ST','#DT'];
  var all=[];
  for(var r=0;r<roots.length;r++){
    var root=Q(roots[r]);
    if(!root)continue;
    var kids=root.children;
    for(var m=0;m<kids.length;m++){
      var el=kids[m];
      if(el._rdAnimDone)continue;
      el._rdAnimDone=1;
      if(!inViewport(el))continue;
      all.push(el);
    }
  }
  if(all.length)animBatch(all);
}

var BEl=Q('#B');
if(BEl){
  var _t=null;
  var mo=new MutationObserver(function(){
    if(!cfg.enabled)return;
    if(_t)clearTimeout(_t);
    _t=setTimeout(function(){_t=null;triggerAnim()},50);
  });
  mo.observe(BEl,{childList:true,subtree:true});
}

var EASES=[
  ['cubic-bezier(.22,.61,.36,1)','easeOutCubic 顺滑（推荐）'],
  ['linear','linear 线性匀速'],
  ['ease','ease 默认'],
  ['ease-in','ease-in 缓入'],
  ['ease-out','ease-out 缓出'],
  ['ease-in-out','ease-in-out 缓入缓出'],
  ['cubic-bezier(.25,.46,.45,.94)','easeOutQuad 柔和'],
  ['cubic-bezier(.16,1,.3,1)','easeOutExpo 极速'],
  ['cubic-bezier(.34,1.56,.64,1)','easeOutBack 回弹'],
  ['cubic-bezier(.68,-.55,.27,1.55)','easeInOutBack 双回弹'],
  ['cubic-bezier(.83,0,.17,1)','easeInOutExpo 对称急'],
  ['cubic-bezier(.87,0,.13,1)','easeInOutCirc 圆滑'],
  ['cubic-bezier(.17,.67,.83,.67)','easeInOutSine 平滑'],
  ['steps(8,end)','steps 8 阶梯']
];

function injectSettingUI(){
  var ST=Q('#ST');
  if(!ST)return;
  if(ST._rdAnimInjected)return;
  ST._rdAnimInjected=1;
  var div=document.createElement('div');
  var h='';
  h+='<h3>切换动画</h3>';
  h+='<div class="row"><label>开关</label><div class="seg"><button class="aeOn">开</button><button class="aeOff">关</button></div></div>';
  h+='<div class="row"><label>时长</label><input type="range" class="aeDur" min="200" max="2000" step="50" value="'+cfg.duration+'" style="flex:1;accent-color:#4a8fe0"><span class="aeDurV" style="min-width:60px;text-align:right;font-size:13px">'+cfg.duration+'ms</span></div>';
  h+='<div class="row"><label>曲线</label><select class="aeEase" style="flex:1;height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px">';
  for(var i=0;i<EASES.length;i++){
    h+='<option value="'+EASES[i][0]+'"'+(cfg.easing===EASES[i][0]?' selected':'')+'>'+EASES[i][1]+'</option>';
  }
  h+='</select></div>';
  h+='<div class="row"><label>错开</label><input type="range" class="aeStg" min="0" max="40" step="1" value="'+cfg.stagger+'" style="flex:1;accent-color:#4a8fe0"><span class="aeStgV" style="min-width:60px;text-align:right;font-size:13px">'+cfg.stagger+'ms</span></div>';
  h+='<div class="row"><button class="aeTest full">▶ 预览动画</button></div>';
  h+='<div class="row"><button class="aeReset full">恢复默认</button></div>';
  h+='<div style="font-size:11px;opacity:.5;margin-top:6px;line-height:1.6">切换界面时元素从四周飞入；阅读器首次进入时文字拆分为单字飞入</div>';
  div.innerHTML=h;
  var otherH3=null;
  var kids=ST.children;
  for(var j=0;j<kids.length;j++){
    if(kids[j].tagName==='H3'&&kids[j].textContent.indexOf('其它')>=0){otherH3=kids[j];break;}
  }
  if(otherH3)ST.insertBefore(div,otherH3);else ST.appendChild(div);

  var onBtn=ST.querySelector('.aeOn'),offBtn=ST.querySelector('.aeOff');
  function refreshAE(){
    if(onBtn)onBtn.className='aeOn'+(cfg.enabled?' on':'');
    if(offBtn)offBtn.className='aeOff'+(!cfg.enabled?' on':'');
  }
  refreshAE();
  if(onBtn)onBtn.onclick=function(){cfg.enabled=1;saveCfg();refreshAE();};
  if(offBtn)offBtn.onclick=function(){cfg.enabled=0;saveCfg();refreshAE();};

  var durEl=ST.querySelector('.aeDur'),durV=ST.querySelector('.aeDurV');
  if(durEl)durEl.oninput=function(){cfg.duration=+this.value;durV.textContent=cfg.duration+'ms';saveCfg();};
  var stgEl=ST.querySelector('.aeStg'),stgV=ST.querySelector('.aeStgV');
  if(stgEl)stgEl.oninput=function(){cfg.stagger=+this.value;stgV.textContent=cfg.stagger+'ms';saveCfg();};
  var easeEl=ST.querySelector('.aeEase');
  if(easeEl)easeEl.onchange=function(){cfg.easing=this.value;saveCfg();};

  var testBtn=ST.querySelector('.aeTest');
  if(testBtn)testBtn.onclick=function(){
    var root=Q('#ST');
    if(!root)return;
    var kk=root.children,arr=[];
    for(var t=0;t<kk.length;t++){kk[t]._rdAnimDone=0;arr.push(kk[t]);}
    animBatch(arr);
  };
  var resetBtn=ST.querySelector('.aeReset');
  if(resetBtn)resetBtn.onclick=function(){
    for(var dk in DEF)if(DEF.hasOwnProperty(dk))cfg[dk]=DEF[dk];
    saveCfg();
    var vs=c.viewSetting;
    if(vs)vs();
  };
}

var _injT=null;
var mo2=new MutationObserver(function(){
  if(_injT)return;
  _injT=setTimeout(function(){_injT=null;injectSettingUI()},100);
});
mo2.observe(D.body,{childList:true,subtree:true});
setTimeout(injectSettingUI,500);

rd.modules.anim={
  cfg:cfg,
  trigger:triggerAnim,
  preview:function(){
    var B2=Q('#B');
    if(!B2)return;
    var kids=B2.children,arr=[];
    for(var i=0;i<kids.length;i++){kids[i]._rdAnimDone=0;arr.push(kids[i]);}
    animBatch(arr);
  }
};
console.log('[RDR-anim] 已加载',cfg);
})();