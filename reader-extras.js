var ERR={
  E001:'页面类型无法识别',E002:'未找到正文容器',E003:'章节列表为空',
  E010:'网络请求异常',E011:'HTTP 响应失败',E012:'响应为空',
  E013:'HTML 解析失败',E014:'未提取到正文',E020:'图片 URL 无效',
  E021:'图片加载失败',E022:'图片防盗链拒绝',E030:'本地存储写入失败',
  E031:'JSON 解析失败',E032:'数据格式错误',E040:'阅读器初始化失败',
  E041:'章节跳转失败'
};
function err(c,x){return '['+c+'] '+(ERR[c]||'未知错误')+(x?(' · '+x):'');}

/*
 * RDR 分段契约
 * ═══════════════════════════════════════════════════
 * 【reader-interface.js —— P1】
 *   环境: D, W, S, SV
 *   工具: escH, toast, LSV, CK
 *   存储: GB, SB, ISB, isSameHost, GT, ST_, PROG_SET, PROG_GET,
 *         cacheGet, cacheSet, cacheList, cacheClearAll,
 *         HIS_ADD, HIS_GET, HIS_CLEAR
 *   解析: FH, FC, pickMainContent, HT, TP, EXF
 *   净化: purifyAll, purifySave, purifyList, purifyText, purifyArray
 *   主题: theme, buildGradBg, setNav
 *   容器: O, Q, B, BK, NAV, RST, FAVBTN
 *   图片工具: imgView, imgFavGet, imgFavSave, imgFavHas, imgFavToggle
 *   阅读器关闭: closeReader
 *   清理定时器: ft
 *
 * 【reader-sites.js —— P2】
 *   站点表: SITE_SOURCE, SITE_PROFILES_INLINE, SITE_BUILTIN
 *   匹配: compileProfile, loadSiteProfilesSync, SITE_PROFILES,
 *         matchProfile, siteCategory, findType
 *   识别: detectPageType, isListPageByContent
 *   反广告: isAdLink, killAds, _mo, killAdsTimer
 *   路由: DISPATCH, routeFeedUrl, dispatchSite
 *   TTS过滤: window.RDR_TTS_FILTER
 *
 * 【reader-structure.js —— P3】
 *   阅读器: appendP, imgRelayoutT, readChapter, __rdRelayout
 *   书库: runInfiniteGeneral, pickThumb, viewShuku
 *   书架/详情: viewShelf, viewDetail
 *   订阅源: feedList, feedSave, viewFeedList, viewFeed
 *   图片模式: isRandomImgSite, isGalleryPage, getPageImages, startImageReader
 *   设置: viewSetting
 *   净化UI: viewPurify, purifyEdit
 *   其他: viewArticle, viewPickView
 *
 * 【reader-extras.js —— P4】
 *   错误码: ERR, err
 *   启动: boot()
 *   全局: window.__RDR__
 *
 * 扩展点
 * ─────
 *   window.RDR_TTS_FILTER(text, title) → bool  (P2 提供)
 *   window.__rdRelayout()             → void  (P3 提供)
 *   window.__rdWantPg                 → number|null  (P3 用于恢复目标页)
 *   window.__rdCurImgData             → object|null  (P3 供图片长按使用)
 *
 * 拼接顺序
 * ─────
 *   interface → sites → structure → extras
 *   P1 不闭合，P4 结尾 })();
 */

function boot(){
  var pendingUrl=null;
  try{pendingUrl=LSV('RDR_PENDING_URL');if(pendingUrl)LSV('RDR_PENDING_URL','');}catch(e){}
  var resume=LSV('RDR_RESUME');
  try{LSV('RDR_RESUME','')}catch(e){}
  if(resume==='1'){
    var last=null;
    try{last=JSON.parse(LSV('RDR_LAST')||'null')}catch(e){}
    if(last&&last.cat&&last.cat.length){
      if(Date.now()-last.ts<30000)readChapter(last.cu,last.cat);
      else viewShuku();
    }else viewShuku();
  }else{
    var jumpUrl=null;
    try{jumpUrl=LSV('RDR_JUMP_URL');if(jumpUrl)LSV('RDR_JUMP_URL','');}catch(e){}
    if(jumpUrl)viewDetail(jumpUrl);
    else dispatchSite(pendingUrl);
  }
}

boot();
window.__RDR__=function(){closeReader()};
})();