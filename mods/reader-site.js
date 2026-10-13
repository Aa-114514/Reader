(function(){
var rd=window.__rd;
if(!rd){console.warn('[RDR-site] 主程序未启动');return}
if(rd.modules.siteLoaded){console.warn('[RDR-site] 已加载');return}
rd.modules.siteLoaded=1;
var D=document,W=window;

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
          if(Array.isArray(arr))for(var k=0;k<arr.length;k++){var o2=compileProfile(arr[k]);if(o2&&o2.host)list.push(o2);}
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

window.__rdSite={
  matchProfile:matchProfile,
  siteCategory:siteCategory,
  findType:findType,
  detectPageType:detectPageType,
  isListPageByContent:isListPageByContent,
  SITE_PROFILES:SITE_PROFILES,
  SITE_SOURCE:SITE_SOURCE
};
rd.modules.siteAPI=window.__rdSite;
console.log('[RDR-site] 已加载');
})();