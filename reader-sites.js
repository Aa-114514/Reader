function _site(){return window.__rdSite||{}}
function matchProfile(){var s=_site();return s.matchProfile?s.matchProfile():null}
function siteCategory(){var s=_site();return s.siteCategory?s.siteCategory():''}
function findType(t){var s=_site();return s.findType?s.findType(t):null}
function detectPageType(){var s=_site();return s.detectPageType?s.detectPageType():'unknown'}
function isListPageByContent(){var s=_site();return s.isListPageByContent?s.isListPageByContent():false}

function isAdLink(a){
  if(!a)return false;
  var hr=a.getAttribute('href')||'';
  if(!hr||hr==='#'||/^javascript:/i.test(hr))return false;
  try{
    var u=new URL(hr,location.href);
    if(u.hostname===location.hostname)return false;
    var b1=location.hostname.split('.').slice(-2).join('.');
    var b2=u.hostname.split('.').slice(-2).join('.');
    return b1!==b2;
  }catch(e){return false}
}
function killAds(){
  try{
    var prof=matchProfile();
    if(prof&&prof.hidePage){
      var bs=D.body.children;
      for(var i=0;i<bs.length;i++){var el=bs[i];if(el.id==='R'||el.tagName==='SCRIPT'||el.tagName==='STYLE')continue;el.style.setProperty('display','none','important');el.style.setProperty('visibility','hidden','important');el.style.setProperty('pointer-events','none','important');}
    }
    var fx=D.querySelectorAll('body>div,body>ins,body>iframe,body>a');
    for(var k=0;k<fx.length;k++){
      var e2=fx[k];
      if(e2.id==='R')continue;
      try{
        var cs=getComputedStyle(e2);
        var z=parseInt(cs.zIndex)||0;
        if((cs.position==='fixed'||cs.position==='absolute')&&z>1000)e2.remove();
        else if(e2.tagName==='IFRAME'&&e2!==O)e2.remove();
      }catch(e){}
    }
  }catch(e){}
  try{
    var imgs=D.querySelectorAll('img');
    for(var m=0;m<imgs.length;m++){var img=imgs[m];if(O.contains(img))continue;var a=img.closest?img.closest('a'):null;if(a&&isAdLink(a)){try{a.parentNode.removeChild(a)}catch(e){}}}
  }catch(e){}
}
killAds();
try{
  var _mo=new MutationObserver(function(ms){
    for(var i=0;i<ms.length;i++){
      var ad=ms[i].addedNodes;
      for(var j=0;j<ad.length;j++){
        var n=ad[j];
        if(n.nodeType!==1)continue;
        if(n.id==='R'||n.tagName==='SCRIPT'||n.tagName==='STYLE')continue;
        var p=n.parentNode,inR=false;
        while(p){if(p===O){inR=true;break}p=p.parentNode}
        if(!inR){try{n.remove();}catch(e){try{n.style.display='none'}catch(e){}}}
      }
    }
  });
  _mo.observe(D.documentElement,{childList:true});
  _mo.observe(D.body,{childList:true});
}catch(e){}
var killAdsTimer=setInterval(function(){if(!D.hidden)killAds()},3000);

var DISPATCH={
  image:'imageReader',
  gallery:'imageReader',
  blog:'feed',
  guide:'feed',
  game:'shuku',
  app:'shuku',
  tool:'shuku',
  forum:'shuku',
  search:'shuku',
  novel:'detail',
  article:'article'
};
function routeFeedUrl(url){
  var u;try{u=new URL(url,location.href).href}catch(e){return null}
  var uh;try{uh=new URL(u).hostname}catch(e){uh=''}
  if(uh&&uh!==location.hostname){
    try{localStorage.setItem('RDR_PENDING_URL',u)}catch(e){}
    location.href=u;
    return u;
  }
  return null;
}
function _missMod(m){try{toast('未加载'+m+'模块')}catch(e){alert('未加载'+m+'模块')}}
function dispatchSite(pendingUrl){
  var prof=matchProfile();
  var _cat=prof?(prof.category||prof.type||''):'';
  var PT=(function(){var s=location.search;
    if(/action=(shuku|search|top)/i.test(s))return 'shuku';
    if(/action=list/i.test(s))return 'list';
    if(/action=article/i.test(s))return 'article';
    return 'other';
  })();
  if(prof){
    var badge=D.createElement('div');
    badge.style.cssText='position:fixed;right:6px;bottom:6px;padding:3px 10px;border-radius:12px;background:rgba(74,143,224,.2);color:#4a8fe0;font:11px system-ui;z-index:2147483000;pointer-events:none;opacity:.9';
    badge.textContent=prof.name||prof.type;
    O.appendChild(badge);
    setTimeout(function(){if(badge.parentNode)badge.parentNode.removeChild(badge)},2800);
  }
  var act=DISPATCH[_cat];
  var _shuku=_rdMod('viewShuku'),_detail=_rdMod('viewDetail'),_read=_rdMod('readChapter'),_feed=_rdMod('viewFeed'),_article=_rdMod('viewArticle'),_imgRdr=_rdMod('startImageReader');
  if(pendingUrl){
    if(act==='imageReader'){if(!_imgRdr)return _missMod('阅读');return _imgRdr('page')}
    if(act==='feed'){if(!_feed)return _missMod('订阅源');return _feed(pendingUrl)}
    if(act==='shuku'||act==='detail'){if(!_shuku)return _missMod('阅读');_shuku();setTimeout(runInfiniteGeneral,300);return}
    if(FC()){if(!_article)return _missMod('文章');return _article()}
    if(!_shuku)return _missMod('阅读');
    _shuku();setTimeout(runInfiniteGeneral,300);return;
  }
  if(act==='imageReader'){if(!_imgRdr)return _missMod('阅读');return _imgRdr('page')}
  if(act==='feed'){if(!_feed)return _missMod('订阅源');return _feed(location.href)}
  if(act==='shuku'){if(!_shuku)return _missMod('阅读');_shuku();setTimeout(runInfiniteGeneral,300);return}
  if(PT==='shuku'||PT==='search'||PT==='top'){if(!_shuku)return _missMod('阅读');_shuku();if(PT==='search')setTimeout(runInfiniteGeneral,300);return}
  if(PT==='list'){if(!_detail)return _missMod('阅读');return _detail(location.href)}
  if(PT==='article'){if(!_article)return _missMod('文章');return _article()}
  var detect=detectPageType();
  if(detect==='reader'){
    if(!_read)return _missMod('阅读');
    var title=(Q('h1')||{}).textContent||document.title||'阅读';
    _read(location.href.split('#')[0],[{u:location.href.split('#')[0],t:title.slice(0,40)}]);
  }else if(detect==='list'){if(!_shuku)return _missMod('阅读');_shuku();setTimeout(runInfiniteGeneral,300);}
  else if(isListPageByContent()){if(!_shuku)return _missMod('阅读');_shuku();setTimeout(runInfiniteGeneral,300);}
  else{var _pick=_rdMod('viewPickView');if(!_pick)return _missMod('文章');_pick();}
}

window.RDR_TTS_FILTER=function(text,title){
  var cat=siteCategory();
  if(cat==='novel'){
    if(/中间眼|中央眼|推荐阅读|本章未完|点击下一页|章节错误|加入书签/.test(text))return false;
    return true;
  }
  if(cat==='forum'){
    if(/^\d+楼|^回复$|^举报$|^点赞$|^分享$/.test(text))return false;
    return true;
  }
  if(cat==='blog'||cat==='guide'){
    if(/^标签[：:]|^分类[：:]|^版权声明|^转载/.test(text))return false;
    return true;
  }
  return true;
};