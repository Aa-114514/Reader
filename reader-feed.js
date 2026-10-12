(function(){
var rd=window.__rd;
if(!rd){console.warn('[RDR-feed] 主程序未启动');return}
if(rd.modules.viewFeed){console.warn('[RDR-feed] 已加载');return}
var c=rd.ctx;
var D=c.D,W=c.W,Q=c.Q,B=c.B,BK=c.BK,NAV=c.NAV,FAVBTN=c.FAVBTN,S=c.S;
var toast=c.toast,LSV=c.LSV,escH=c.escH,err=c.err;
var HIS_ADD=c.HIS_ADD;
var FH=c.FH,HT=c.HT,TP=c.TP;
var routeFeedUrl=c.routeFeedUrl;

function feedList(){try{return JSON.parse(LSV('RDR_FEEDS')||'[]')}catch(e){return[]}}
function feedSave(a){try{LSV('RDR_FEEDS',JSON.stringify(a))}catch(e){}}
function viewFeedList(){
  window.__rdLastDetail=null;c.setNav('feed');BK.style.display='none';FAVBTN.style.display='none';Q('.t').textContent='订阅源';
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
  window.__rdLastDetail=null;c.setNav('feed');NAV.style.display='none';BK.style.display='block';FAVBTN.style.display='block';
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
      if(ch==='1'){
        var _sh=rd.modules.viewShuku;if(!_sh){toast('未加载阅读模块');return}
        _sh(FEED_BODY.innerHTML,url);
      }else if(ch==='2'){
        var _rc=rd.modules.readChapter;if(!_rc){toast('未加载阅读模块');return}
        var _ps=TP(HT(FEED_BODY.innerHTML));
        if(!_ps||!_ps.length){toast('未提取到正文');return}
        var _ti=(Q('.t')||{}).textContent||url;
        _rc(url,[{u:url,t:_ti,paras:_ps,local:1}],url);
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
          c.imgView({image_url:src,t:im.getAttribute('alt')||im.getAttribute('title')||'图片'});
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

rd.modules.feedList=feedList;
rd.modules.feedSave=feedSave;
rd.modules.viewFeedList=viewFeedList;
rd.modules.viewFeed=viewFeed;
rd.nav('feed',30,'📡','订阅源',viewFeedList);
console.log('[RDR-feed] 已加载');
})();