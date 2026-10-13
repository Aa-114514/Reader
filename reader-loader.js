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
    id:'read',
    name:'阅读模块',
    desc:'书库 / 书架 / 阅读器 / 详情页',
    file:'mods/reader-read.js',
    test:'window.__rd&&window.__rd.modules.readChapter',
    nav:['shuku','shelf'],
    unload:'...'
  },
  {
    id:'feed',
    name:'订阅源',
    desc:'保真渲染订阅源页面',
    file:'mods/reader-feed.js',
    test:'window.__rd&&window.__rd.modules.viewFeed',
    nav:['feed'],
    unload:'...'
  },
  {
    id:'anim',
    name:'切换动画',
    desc:'...',
    file:'mods/reader-anim.js',
    test:'window.__rd&&window.__rd.modules.animLoaded',
    nav:[],
    unload:''
  }
];