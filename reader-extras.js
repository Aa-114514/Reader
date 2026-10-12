var ERR={
  E001:'页面类型无法识别',E002:'未找到正文容器',E003:'章节列表为空',
  E010:'网络请求异常',E011:'HTTP 响应失败',E012:'响应为空',
  E013:'HTML 解析失败',E014:'未提取到正文',E020:'图片 URL 无效',
  E021:'图片加载失败',E022:'图片防盗链拒绝',E030:'本地存储写入失败',
  E031:'JSON 解析失败',E032:'数据格式错误',E040:'阅读器初始化失败',
  E041:'章节跳转失败'
};
function err(c,x){return '['+c+'] '+(ERR[c]||'未知错误')+(x?(' · '+x):'');}

/* RDR 契约 —— 见各文件头部注释 */

window.__rd={
  ver:RDR_VER,
  ctx:{
    D:D,W:W,O:O,Q:Q,B:B,BK:BK,NAV:NAV,RST:RST,FAVBTN:FAVBTN,
    S:S,SV:SV,escH:escH,toast:toast,LSV:LSV,CK:CK,
    GB:GB,SB:SB,ISB:ISB,isSameHost:isSameHost,GT:GT,ST_:ST_,PROG_SET:PROG_SET,PROG_GET:PROG_GET,
    cacheGet:cacheGet,cacheSet:cacheSet,cacheList:cacheList,cacheClearAll:cacheClearAll,
    HIS_ADD:HIS_ADD,HIS_GET:HIS_GET,HIS_CLEAR:HIS_CLEAR,
    purifyAll:purifyAll,purifySave:purifySave,purifyList:purifyList,purifyText:purifyText,purifyArray:purifyArray,
    FH:FH,FC:FC,pickMainContent:pickMainContent,HT:HT,TP:TP,EXF:EXF,
    theme:theme,buildGradBg:buildGradBg,setNav:setNav,
    imgView:imgView,imgFavGet:imgFavGet,imgFavSave:imgFavSave,imgFavHas:imgFavHas,imgFavToggle:imgFavToggle,
    closeReader:closeReader,err:err,
    isAdLink:isAdLink,matchProfile:matchProfile,siteCategory:siteCategory,routeFeedUrl:routeFeedUrl,
    pickThumb:pickThumb,
    viewArticle:viewArticle,viewPickView:viewPickView,
    viewSetting:viewSetting,viewPurify:viewPurify,purifyEdit:purifyEdit,
    startImageReader:startImageReader,isRandomImgSite:isRandomImgSite,isGalleryPage:isGalleryPage,getPageImages:getPageImages,
    runInfiniteGeneral:runInfiniteGeneral
  },
  modules:{},
  nav:rdNavAdd
};

function boot(){
  var pendingUrl=null;
  try{pendingUrl=LSV('RDR_PENDING_URL');if(pendingUrl)LSV('RDR_PENDING_URL','');}catch(e){}
  var resume=LSV('RDR_RESUME');
  try{LSV('RDR_RESUME','')}catch(e){}
  var M=window.__rd.modules;
  var hasRead=!!M.readChapter;
  if(resume==='1'){
    var last=null;
    try{last=JSON.parse(LSV('RDR_LAST')||'null')}catch(e){}
    if(last&&last.cat&&last.cat.length){
      if(hasRead){
        if(Date.now()-last.ts<30000){var _bu=last.bu||last.cu;M.readChapter(last.cu,last.cat,_bu,PROG_GET(_bu));}
        else M.viewShuku();
      }else viewSetting();
    }else if(hasRead)M.viewShuku();
    else viewSetting();
  }else{
    var jumpUrl=null;
    try{jumpUrl=LSV('RDR_JUMP_URL');if(jumpUrl)LSV('RDR_JUMP_URL','');}catch(e){}
    if(jumpUrl&&hasRead)M.viewDetail(jumpUrl);
    else dispatchSite(pendingUrl);
  }
}

boot();
window.__RDR__=function(){closeReader()};
})();