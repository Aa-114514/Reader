var SITE_SOURCE='';
var SITE_PROFILES_INLINE=[];
var SITE_BUILTIN=[
{name:'第一版主',host:'diyibanzhu\\.(me|rest|xyz|com|info)',type:'novel',category:'novel',contentSel:['#nr1','.page-content'],catalogSel:['a[href*="action=list"]'],chapterSel:['a[href*="action=article"]'],fenyeSel:'.chapterPages a[href*="fenye="]',hidePage:true},
{name:'笔趣阁',host:'biquge|biqu|69shu|shuqi|ptwxz|xbiquge|motie|bookben',type:'novel',category:'novel',contentSel:['#chaptercontent','#content','.content','.showtxt'],catalogSel:['a[href*="mulu"]','a[href*="list"]','.listmain a'],chapterSel:['a[href*="read"]','a[href*="chapter"]'],fenyeSel:'.bottem a[href*="_"]',hidePage:true},
{name:'起点',host:'qidian\\.com',type:'novel',category:'novel',contentSel:['.read-content','.content'],catalogSel:['.catalog','a[href*="catalog"]'],chapterSel:['a[href*="chapter"]'],fenyeSel:'',hidePage:true},
{name:'随机图库',host:'scdn\\.io',type:'image-api',category:'image',hidePage:false},
{name:'图库页',host:null,type:'gallery',category:'image',hidePage:false},
{name:'文章页',host:null,type:'article',category:'blog',hidePage:false},
{name:'小游戏',host:'4399\\.com|7k7k\\.com|2144\\.cn|xiaoyouxi',type:'list',category:'game',hidePage:false},
{name:'论坛',host:'tieba\\.baidu\\.com|nga\\.178\\.com|bbs\\.|forum\\.|discuz',type:'list',category:'forum',hidePage:false},
{name:'搜索',host:'baidu\\.com|bing\\.com|so\\.com|sogou\\.com',type:'list',category:'search',hidePage:false},
{name:'博客',host:'blogspot|wordpress\\.com|medium\\.com|cnblogs|csdn|juejin|jianshu|segmentfault|zhihu\\.com',type:'article',category:'blog',hidePage:false},
{name:'应用',host:'apkpure|apkmirror|coolapk|f-droid|github\\.com|gitee\\.com',type:'list',category:'app',hidePage:false},
{name:'工具箱',host:'tool\\.lu|toolnb|liulanmi',type:'list',category:'tool',hidePage:false},
{name:'攻略',host:'gamer|gamersky|3dmgame|ali213|gamekee',type:'article',category:'guide',hidePage:false}
];
function compileProfile(o){
  if(!o)return null;
  if(o.host&&typeof o.host==='string'){
    if(o.host.length>200){o.host=null;return o}
    try{o.host=new RegExp(o.host,'i')}catch(e){o.host=null}
  }
  return o;
}
function loadSiteProfilesSync(){
  var list=[];
  for(var i=0;i<SITE_BUILTIN.length;i++){var b=compileProfile(SITE_BUILTIN[i]);if(b)list.push(b);}
  for(var j=0;j<SITE_PROFILES_INLINE.length;j++){var o=compileProfile(SITE_PROFILES_INLINE[j]);if(o&&o.host)list.push(o);}
  if(SITE_SOURCE){
    var sources=Array.isArray(SITE_SOURCE)?SITE_SOURCE:[SITE_SOURCE];
    for(var s=0;s<sources.length;s++){
      try{
        var xhr=new XMLHttpRequest();
        xhr.open('GET',sources[s],false);xhr.send(null);
        if(xhr.status===200){
          var arr=JSON.parse(xhr.responseText);
          if(Array.isArray(arr)){
            for(var k=0;k<arr.length;k++){var o2=compileProfile(arr[k]);if(o2&&o2.host)list.push(o2);}
          }
        }
      }catch(e){}
    }
  }
  return list;
}
var SITE_PROFILES=loadSiteProfilesSync();
function matchProfile(){var h=location.host;for(var i=0;i<SITE_PROFILES.length;i++){var p=SITE_PROFILES[i];if(p.host&&p.host.test(h))return p;}return null;}
function siteCategory(){var p=matchProfile();return p?(p.category||p.type||''):'';}
function findType(t){for(var i=0;i<SITE_PROFILES.length;i++)if(SITE_PROFILES[i].type===t)return SITE_PROFILES[i];return SITE_PROFILES[SITE_PROFILES.length-1];}

function detectPageType(){
  try{
    var body=D.body;
    var allText=(body.innerText||body.textContent||'').trim();
    var totalLen=allText.length;
    if(totalLen<100)return 'unknown';
    var as=body.querySelectorAll('a[href]');
    var linkTextLen=0,validLinks=0;
    for(var i=0;i<as.length;i++){var t=(as[i].textContent||'').trim();var h=as[i].getAttribute('href')||'';if(h==='#'||/^javascript:/i.test(h))continue;if(t.length===0)continue;linkTextLen+=t.length;validLinks++;}
    var density=totalLen>0?linkTextLen/totalLen:0;
    var ps=body.querySelectorAll('p');
    var pTextLen=0;
    for(var j=0;j<ps.length;j++){var pt=(ps[j].textContent||'').trim();if(pt.length>20)pTextLen+=pt.length;}
    var pDensity=totalLen>0?pTextLen/totalLen:0;
    var zhCount=(allText.match(/[\u4e00-\u9fa5]/g)||[]).length;
    var zhRatio=totalLen>0?zhCount/totalLen:0;
    var _chapNum=(allText.match(/第[\d一二三四五六七八九十百千]+[章节集回话]/g)||[]).length;
var _chapLinks=0;
var _links=body.querySelectorAll('a[href]');
for(var _li=0;_li<_links.length;_li++){
  var _lt=(_links[_li].textContent||'').trim();
  var _lh=_links[_li].getAttribute('href')||'';
  if(/第[\d一二三四五六七八九十百千]+[章节集回话]/.test(_lt)||/chapter|read|article|action=article/i.test(_lh))_chapLinks++;
}
if(_chapLinks>=5)return 'list';
if(_chapNum>=10&&totalLen<8000)return 'list';
if(validLinks>=10&&density>0.4&&pDensity<0.3)return 'list';
if(pDensity>0.5&&totalLen>500)return 'reader';
    if(zhRatio>0.5&&totalLen>800&&validLinks<80)return 'reader';
    if(validLinks>=15&&density>0.25)return 'list';
    if(totalLen>1000&&pDensity>0.35)return 'reader';
    if(validLinks>ps.length*2)return 'list';
    if(ps.length>=5&&totalLen>500)return 'reader';
    if(validLinks>=3)return 'list';
    if(totalLen>=80)return 'reader';
    return 'unknown';
  }catch(e){return 'unknown'}
}
function isListPageByContent(){
  try{
    var body=D.body;
    var as=body.querySelectorAll('a[href]');
    var linkTextLen=0,validLinks=0;
    var allText=(body.innerText||body.textContent||'').trim();
    var totalLen=allText.length;
    for(var i=0;i<as.length;i++){var t=(as[i].textContent||'').trim();var h=as[i].getAttribute('href')||'';if(h==='#'||/^javascript:/i.test(h))continue;if(t.length===0)continue;linkTextLen+=t.length;validLinks++;}
    var density=totalLen>0?linkTextLen/totalLen:0;
    var ps=body.querySelectorAll('p');
    var pTextLen=0;
    for(var j=0;j<ps.length;j++){var pt=(ps[j].textContent||'').trim();if(pt.length>20)pTextLen+=pt.length;}
    var pDensity=totalLen>0?pTextLen/totalLen:0;
    if(validLinks>=8&&density>0.35&&pDensity<0.35)return true;
    if(validLinks>ps.length*2&&validLinks>=8)return true;
    return false;
  }catch(e){return false}
}

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
  if(pendingUrl){
    if(act==='imageReader')return startImageReader('page');
    if(act==='feed')return viewFeed(pendingUrl);
    if(act==='shuku'||act==='detail'){viewShuku();setTimeout(runInfiniteGeneral,300);return}
    if(FC())return viewArticle();
    viewShuku();setTimeout(runInfiniteGeneral,300);return;
  }
  if(act==='imageReader')return startImageReader('page');
  if(act==='feed')return viewFeed(location.href);
  if(act==='shuku'){viewShuku();setTimeout(runInfiniteGeneral,300);return}
  if(PT==='shuku'||PT==='search'||PT==='top'){viewShuku();if(PT==='search')setTimeout(runInfiniteGeneral,300);return}
  if(PT==='list')return viewDetail(location.href);
  if(PT==='article')return viewArticle();
  var detect=detectPageType();
  if(detect==='reader'){
    var title=(Q('h1')||{}).textContent||document.title||'阅读';
    readChapter(location.href.split('#')[0],[{u:location.href.split('#')[0],t:title.slice(0,40)}]);
  }else if(detect==='list'){viewShuku();setTimeout(runInfiniteGeneral,300);}
  else if(isListPageByContent()){viewShuku();setTimeout(runInfiniteGeneral,300);}
  else viewPickView();
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