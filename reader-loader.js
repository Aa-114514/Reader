/* ═══════════════════════════════════════════════════════════════
 * RDR 模块加载器清单
 * ───────────────────────────────────────────────────────────────
 * 设置界面 → 📦 模块管理 会拉取本文件，显示可加载的模块。
 * 每项包含：
 *   id       唯一标识（对应 localStorage 键 RDR_MOD_<ID大写>）
 *   name     显示名
 *   desc     描述
 *   file     模块文件名（相对 CDN 根）
 *   test     检测代码（eval 判断是否已加载）
 *   nav      注册到 NAV 的 id 列表（卸载时清除）
 *   unload   卸载代码（可选）
 * ═══════════════════════════════════════════════════════════════ */
window.RDR_LOADERS=[
  {
    id:'site',
    name:'站点识别',
    desc:'站点表匹配 / 页面类型识别',
    file:'mods/reader-site.js',
    test:'window.__rd&&window.__rd.modules.siteLoaded',
    requires:[],
    nav:[],
    unload:'window.__rdSite=null;delete window.__rd.modules.siteLoaded;delete window.__rd.modules.siteAPI;'
  },
  {
    id:'read',
    name:'阅读模块',
    desc:'书库 / 书架 / 阅读器 / 详情页',
    file:'mods/reader-read.js',
    test:'window.__rd&&window.__rd.modules.readChapter',
    requires:['site'],
    nav:['shuku','shelf'],
    unload:'delete window.__rd.modules.readChapter;delete window.__rd.modules.viewShuku;delete window.__rd.modules.viewShelf;delete window.__rd.modules.viewDetail;window.__rdRelayout=null;'
  },
  {
    id:'feed',
    name:'订阅源',
    desc:'保真渲染订阅源页面',
    file:'mods/reader-feed.js',
    test:'window.__rd&&window.__rd.modules.viewFeed',
    requires:[],
    nav:['feed'],
    unload:'delete window.__rd.modules.viewFeed;delete window.__rd.modules.viewFeedList;delete window.__rd.modules.feedList;delete window.__rd.modules.feedSave;'
  },
  {
    id:'anim',
    name:'切换动画',
    desc:'列表 3 种动画 / 翻页 4 种动画 / 上下滚动淡入',
    file:'mods/reader-anim.js',
    test:'window.__rd&&window.__rd.modules.animLoaded',
    requires:['read'],
    nav:[],
    unload:'delete window.__rd.modules.animLoaded;delete window.__rd.modules.anim;'
  },
  {
    id:'enhance',
    name:'阅读增强',
    desc:'高亮 / 段落书签 / 笔记界面 / 章节内搜索 / 全书搜索',
    file:'mods/reader-enhance.js',
    test:'window.__rd&&window.__rd.modules.enhanceLoaded',
    requires:['read','site'],
    nav:[],
    unload:'delete window.__rd.modules.enhanceLoaded;delete window.__rd.modules.enhance;'
  },
  {
    id:'ux',
    name:'阅读体验',
    desc:'自动夜间 / 进度徽章 / 手势 / 阅读统计',
    file:'mods/reader-ux.js',
    test:'window.__rd&&window.__rd.modules.uxLoaded',
    requires:['read','site'],
    nav:[],
    unload:'delete window.__rd.modules.uxLoaded;delete window.__rd.modules.ux;'
  },
  {
    id:'export',
    name:'下载导出',
    desc:'批量下载 / 导出 TXT / 导出 EPUB / 导入本地 TXT',
    file:'mods/reader-export.js',
    test:'window.__rd&&window.__rd.modules.exportLoaded',
    requires:['read','site'],
    nav:[],
    unload:'delete window.__rd.modules.exportLoaded;delete window.__rd.modules.export;'
  }
];