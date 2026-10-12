(function(){
var RDR_VER='20261012-7';
var D=document,W=window;
var ST='#R{position:fixed;top:0;left:0;width:100vw;height:100vh;background:var(--rbg,#15161a);color:var(--rfg,#cdd0d5);z-index:2147483647;font-family:"Noto Serif CJK SC",serif;display:flex;flex-direction:column}'+
'#R.withbg{background-image:var(--rbgi);background-size:cover;background-position:center}'+
'#R.light #T{background:rgba(236,228,207,.92);color:#333;border-bottom-color:#d6ccb2}'+
'#T{height:52px;display:flex;align-items:center;padding:0 6px;background:rgba(30,32,37,.92);border-bottom:1px solid #2e3138;font:13px system-ui;color:#d7dae0;position:relative;z-index:9999;pointer-events:auto!important}'+
'#T *{pointer-events:auto!important}'+
'#T .bk{background:none;border:0;color:inherit;font-size:28px;padding:6px 14px;cursor:pointer;display:none;line-height:1}'+
'#T .fav{background:none;border:0;color:inherit;font-size:22px;padding:4px 10px;cursor:pointer;display:none;line-height:1}'+
'#T .fm{background:none;border:0;color:#4a8fe0;font-size:22px;padding:4px 10px;cursor:pointer;display:none;line-height:1}'+
'#T .t{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 4px}'+
'#T button{background:none;border:0;color:inherit;font-size:16px;padding:2px 6px;cursor:pointer}'+
'#T .x{font-size:30px!important;padding:6px 16px!important;line-height:1!important}'+
'#B{flex:1;position:relative;overflow:hidden;z-index:1}'+
'#NAV{height:52px;display:flex;background:rgba(30,32,37,.95);border-top:1px solid #2e3138;font:12px system-ui;color:#8a8f99;position:relative;z-index:1000000}'+
'#R.light #NAV{background:rgba(236,228,207,.95);color:#8a7e68;border-top-color:#d6ccb2}'+
'#NAV>div{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;gap:2px;padding:4px 0}'+
'#NAV>div.act{color:#4a8fe0;font-weight:600}'+
'#NAV .ic{font-size:20px}'+
'#SC{position:absolute;top:0;left:0;right:0;bottom:0;overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;padding:0 0 40px;scrollbar-width:thin;scrollbar-color:rgba(128,128,128,.5) rgba(128,128,128,.1)}'+
'#SC::-webkit-scrollbar{width:6px;height:6px}'+
'#SC::-webkit-scrollbar-track{background:rgba(128,128,128,.1);border-radius:3px}'+
'#SC::-webkit-scrollbar-thumb{background:rgba(128,128,128,.55);border-radius:3px}'+
'#SC::-webkit-scrollbar-thumb:hover{background:rgba(128,128,128,.75)}'+
'#FEED::-webkit-scrollbar{width:6px}'+
'#FEED::-webkit-scrollbar-track{background:rgba(0,0,0,.05)}'+
'#FEED::-webkit-scrollbar-thumb{background:rgba(0,0,0,.3);border-radius:3px}'+
'#FEED{position:absolute;top:0;left:0;right:0;bottom:0;overflow:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;background:#fff;color:#000;font:16px/1.6 -apple-system,"Segoe UI",system-ui,sans-serif}'+
'#FEED a{color:#06c}'+
'#FEED img{max-width:100%;height:auto}'+
'#FEED table{max-width:100%;overflow-x:auto;display:block}'+
'#FEED pre{max-width:100%;overflow-x:auto}'+
'#FEED_TOP{width:0;height:0;overflow:hidden;position:absolute}'+
'#V{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;padding:18px 26px}'+
'#A{height:100%;line-height:1.85}'+
'#A p{margin:0 0 1em;text-indent:2em;word-break:break-word}'+
'#A img{max-width:100%;max-height:70vh;height:auto;display:block;margin:0 auto;border-radius:6px;object-fit:contain}'+
'#A .__imgw{text-align:center;margin:14px 0;break-inside:avoid;page-break-inside:avoid;-webkit-column-break-inside:avoid}'+
'#A .__imgw.__big{break-before:column;break-after:column;-webkit-column-break-before:always;-webkit-column-break-after:always}'+
'#R.scrollmode #A img{max-height:none}'+
'#R.scrollmode #A .__imgw{break-inside:auto;page-break-inside:auto}'+
'#R.scrollmode #A .__imgw.__big{break-before:auto;break-after:auto;-webkit-column-break-before:auto;-webkit-column-break-after:auto}'+
'@keyframes __gradmove{0%{background-position:0% 50%}100%{background-position:400% 50%}}'+
'#R.gradon #A p{background:var(--grad-bg,#ff2b5e);background-size:100% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}'+
'#R.rainbow #A p{background-size:400% 100%;animation:__gradmove var(--gs,6s) linear infinite}'+
'#L,#M,#Q{position:absolute;top:0;bottom:0;z-index:5}'+
'#L{left:0;width:28%}#M{left:28%;right:28%}#Q{right:0;width:28%}'+
'#H{position:absolute;left:0;right:0;bottom:0;padding:14px 16px 12px;border-radius:14px 14px 0 0;background:rgba(30,32,37,.97);color:#d7dae0;font:14px system-ui;transform:translateY(120%);visibility:hidden;pointer-events:none;transition:transform .22s ease,visibility .22s ease;z-index:30;box-shadow:0 -8px 24px rgba(0,0,0,.5);display:flex;flex-direction:column;max-height:60vh}'+
'#H.open{transform:translateY(0);visibility:visible;pointer-events:auto}'+
'#R.light #H{background:rgba(236,228,207,.97);color:#333}'+
'#H button{border:0;cursor:pointer;border-radius:8px;font-size:14px;background:#2a2d34;color:#d7dae0;padding:0}'+
'#R.light #H button{background:#ddd3ba;color:#333}'+
'#MSK{position:absolute;top:0;left:0;right:0;bottom:0;z-index:25;display:none;background:rgba(0,0,0,.2)}'+
'#H .dl{flex:1;overflow-y:auto;padding:0 0 10px;max-height:32vh}'+
'#H .dl>div{padding:10px 10px;cursor:pointer;border-bottom:1px solid #2e3138}'+
'#R.light #H .dl>div{border-bottom-color:#d6ccb2}'+
'#H .dl>div.cur{background:#2a2d34;font-weight:bold}'+
'#R.light #H .dl>div.cur{background:#ddd3ba}'+
'#H .sub{display:none;flex-direction:column;flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;margin-top:4px;min-height:0;max-height:30vh;padding:0 0 8px}'+
'#H .sub.on{display:flex}'+
'#H .subtabs{display:flex;gap:4px;margin-bottom:8px;flex:0 0 auto}'+
'#H .subtab{flex:1;height:32px;border-radius:6px;font-size:12px;border:0;cursor:pointer;background:#2a2d34;color:#d7dae0;padding:0}'+
'#R.light #H .subtab{background:#ddd3ba;color:#333}'+
'#H .subtab.on{background:#4a8fe0;color:#fff}'+
'#H .subpane{display:none}'+
'#H .subpane.on{display:block}'+
'#SC .row{padding:12px 16px;border-bottom:1px solid #2a2d34;position:relative;display:flex;align-items:center;gap:12px}'+
'#R.light #SC .row{border-bottom-color:#e0d7bf}'+
'#SC .thumb{flex:0 0 56px;width:56px;height:76px;border-radius:6px;overflow:hidden;background:#222;display:flex;align-items:center;justify-content:center}'+
'#SC .thumb img{width:100%;height:100%;object-fit:cover}'+
'#SC .thumb .ph{font-size:22px;opacity:.4}'+
'#SC .body{flex:1;min-width:0}'+
'#SC a.t{color:#4a8fe0;font-size:15px;text-decoration:none;display:block;margin-bottom:6px;font-weight:500;padding-right:36px}'+
'#SC .info{font-size:12px;color:#888;line-height:1.6}'+
'#SC .tip{text-align:center;padding:20px;font-size:13px;opacity:.5}'+
'#SC .star{position:absolute;right:12px;top:12px;font-size:20px;cursor:pointer;opacity:.5;padding:4px 8px}'+
'#SC .star.on{opacity:1}'+
'#SC .xhost{font-size:11px;opacity:.5;margin-left:6px;color:#e57}'+
'#DT{padding:16px 20px 40px}'+
'#DT h2{font-size:18px;margin:0 0 8px}'+
'#DT .au{font-size:13px;opacity:.65;margin-bottom:12px}'+
'#DT .btns{display:flex;gap:8px;margin-bottom:12px}'+
'#DT .rd{flex:1;height:46px;border-radius:10px;font-size:15px;cursor:pointer;border:0;background:#2a2d34;color:#d7dae0}'+
'#R.light #DT .rd{background:#ddd3ba;color:#333}'+
'#DT .sv{width:56px;height:46px;border-radius:10px;font-size:22px;cursor:pointer;border:0;background:#2a2d34;color:#d7dae0}'+
'#R.light #DT .sv{background:#ddd3ba;color:#333}'+
'#DT .sv.on{background:#4a8fe0;color:#fff}'+
'#DT .cnt{font-size:13px;opacity:.6;margin-bottom:8px}'+
'#DT .ch{padding:10px 4px;border-bottom:1px solid #2a2d34;cursor:pointer;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;position:relative}'+
'#R.light #DT .ch{border-bottom-color:#e0d7bf}'+
'#DT .ch .cc{position:absolute;right:4px;top:10px;font-size:11px;color:#4a8fe0;opacity:.8}'+
'#ST{padding:16px 20px}'+
'#ST h3{font-size:14px;margin:16px 0 8px;opacity:.8;font-weight:500;border-bottom:1px solid rgba(128,128,128,.2);padding-bottom:6px}'+
'#ST h3:first-child{margin-top:0}'+
'#ST .row{display:flex;align-items:center;gap:8px;margin-bottom:10px}'+
'#ST .row label{flex:0 0 80px;font-size:13px;opacity:.75}'+
'#ST .row input[type=text],#ST .row input[type=url],#ST .row select{flex:1;height:38px;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:0 10px;font-size:13px;box-sizing:border-box}'+
'#R.light #ST .row input[type=text],#R.light #ST .row input[type=url],#R.light #ST .row select{background:#f6f0e0;color:#2b2b2b;border-color:#d6ccb2}'+
'#ST .row input[type=color]{flex:1;padding:2px;height:38px;cursor:pointer;border-radius:8px;border:1px solid #2e3138;background:transparent}'+
'#ST .row button{height:38px;padding:0 14px;border-radius:8px;font-size:13px;border:0;cursor:pointer;background:#2a2d34;color:#d7dae0}'+
'#R.light #ST .row button{background:#ddd3ba;color:#333}'+
'#ST .seg{display:flex;gap:6px;flex:1}'+
'#ST .seg button{flex:1;height:38px;font-size:13px;padding:0}'+
'#ST .seg button.on{background:#4a8fe0;color:#fff}'+
'#ST .num{flex:1;text-align:center;font-size:14px}'+
'#ST textarea{width:100%;height:100px;box-sizing:border-box;border-radius:8px;border:1px solid #2e3138;background:#15161a;color:#cdd0d5;padding:8px;font:12px monospace;resize:vertical}'+
'#R.light #ST textarea{background:#f6f0e0;color:#2b2b2b;border-color:#d6ccb2}'+
'#ST .full{width:100%;height:42px;border-radius:8px;font-size:14px}'+
'#ST .his{padding:10px 12px;border-bottom:1px solid rgba(128,128,128,.2);cursor:pointer;font-size:13px}'+
'#ST .his .u{font-size:11px;opacity:.5;word-break:break-all;margin-top:2px}'+
'#RST{position:absolute;left:50%;bottom:70px;transform:translateX(-50%);padding:12px 22px;border-radius:26px;background:#4a8fe0;color:#fff;font:14px system-ui;cursor:pointer;z-index:2147483646;box-shadow:0 6px 20px rgba(74,143,224,.5);display:none}'+
'#H .tabbar{display:flex;justify-content:space-around;border-top:1px solid rgba(128,128,128,.25);padding:6px 0 0;margin-top:6px;flex:0 0 auto}'+
'#H .tabbar .tb{display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;padding:4px 2px;flex:1;opacity:.7;border-radius:8px}'+
'#H .tabbar .tb.on{opacity:1;color:#4a8fe0}'+
'#H .tabbar .tb .ic{font-size:22px;line-height:1}'+
'#H .tabbar .tb .lb{font-size:11px}'+
'#H .src{display:flex;align-items:center;gap:6px;margin-bottom:8px}'+
'#H .src>label{width:52px;font-size:13px;opacity:.75;flex:0 0 auto}'+
'#H .src button{height:34px;flex:1;font-size:13px}'+
'#H .src button.on{background:#4a8fe0;color:#fff}'+
'#H .rowbar{display:flex;align-items:center;gap:6px}'+
'#H .rowbar>button{height:34px;padding:0 12px;font-size:13px;flex:0 0 auto}'+
'#H .rowbar .pb{flex:1;accent-color:#4a8fe0;height:24px}'+
'#H .hch{display:flex;align-items:center;gap:6px;font-size:12px;opacity:.75;margin-bottom:8px;justify-content:center}'+
'#H .hch .hname{max-width:55%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'#H .hch .mmc{background:#2a2d34;color:#d7dae0;border:0;border-radius:6px;padding:4px 10px;font-size:14px;margin-right:6px;cursor:pointer}'+
'#RDM{position:fixed;background:rgba(30,32,37,.98);border-radius:10px;padding:6px 0;z-index:2147483647;box-shadow:0 4px 20px rgba(0,0,0,.6);font:14px system-ui;color:#d7dae0;min-width:140px;border:1px solid #2e3138}'+
'#RDM>div{padding:12px 18px;cursor:pointer;white-space:nowrap}'+
'#RDM>div:active{background:rgba(74,143,224,.3)}'+
'#IVO{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.96);z-index:2147483647;display:flex;align-items:center;justify-content:center;overflow:hidden}'+
'#IVO img{max-width:100%;max-height:85vh;object-fit:contain;transition:transform .15s}'+
'#IVO .cls{position:absolute;top:16px;right:20px;color:#fff;font-size:36px;cursor:pointer;padding:8px;line-height:1}'+
'#IVO .fav{position:absolute;top:20px;left:20px;font-size:15px;cursor:pointer;padding:8px 14px;background:rgba(0,0,0,.5);border-radius:20px;color:#fff}'+
'#IVO .fav.on{color:#ffc107}'+
'#IVO .meta{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.78);color:#ddd;font:13px/1.6 system-ui;padding:12px 16px;max-height:38vh;overflow-y:auto;box-sizing:border-box}'+
'#IVO .meta .mt{margin-bottom:4px;word-break:break-all}'+
'#IVO .meta .mt b{opacity:.7;font-weight:400;margin-right:4px}'+
'#IVO .meta .url{color:#4a8fe0;cursor:pointer;text-decoration:underline;font-family:monospace;font-size:12px;margin-top:6px}'+
'#IVO .meta .btnrow{display:flex;gap:8px;margin-top:10px}'+
'#IVO .meta .btnrow button{flex:1;height:36px;border-radius:8px;border:0;cursor:pointer;background:#2a2d34;color:#d7dae0;font-size:13px}';

ST+='#R,#T,#T *,#B,#B *,#NAV,#NAV *,#H,#H *,#V,#A,#L,#M,#Q,#SC,#FEED,#DT,#ST,#IVO,#IVO *,#RDM,#RDM *,#RST{pointer-events:auto!important}';
ST+='html,body{overflow:hidden!important;margin:0!important;padding:0!important;background:#000!important}';
var st=D.createElement('style');st.textContent=ST;D.head.appendChild(st);

var O=D.createElement('div');O.id='R';
O.innerHTML='<div id="T"><button class="bk">←</button><button class="fav" style="display:none">☆</button><button class="fm" style="display:none">⇄</button><span class="t"></span><button class="x">×</button></div><div id="B"></div><div id="NAV"><div data-v="shelf"><span class="ic">⭐</span><span>书架</span></div><div data-v="shuku"><span class="ic">📚</span><span>书库</span></div><div data-v="feed"><span class="ic">📡</span><span>订阅源</span></div><div data-v="setting"><span class="ic">⚙</span><span>设置</span></div></div><div id="MSK"></div><div id="RST">← 返回阅读（5）</div>';
D.body.appendChild(O);
function Q(s){return D.querySelector(s)}
O.addEventListener('touchmove',function(e){e.stopPropagation()},{passive:true});
O.addEventListener('wheel',function(e){e.stopPropagation()},{passive:true});
var B=Q('#B'),BK=Q('.bk'),NAV=Q('#NAV'),RST=Q('#RST'),FAVBTN=Q('.fav');

function LSV(k,v){try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v);}catch(e){return null}}
function CK(k,v,d){if(v===undefined){var m=document.cookie.match(new RegExp('(?:^|; )'+k+'=([^;]*)'));return m?decodeURIComponent(m[1]):null}var e=new Date();e.setTime(e.getTime()+(d||30)*864e5);document.cookie=k+'='+encodeURIComponent(v)+';expires='+e.toUTCString()+';path=/;SameSite=Lax';}
var S={f:18,l:0,m:'p',ap:0,br:1,bg:'#15161a',fg:'#cdd0d5',bgi:'',grad:0,gs:6,gc1:'#ff2b5e',gc2:'#2bd9ff',gh1:0,gh2:360,themes:[],curTheme:-1,imode:'alone',shelfView:'list',askFav:1};
try{var _o=JSON.parse(LSV('RDR_CFG')||'{}');for(var _k in _o)if(_o.hasOwnProperty(_k))S[_k]=_o[_k];}catch(e){}
function SV(){var ok=false;try{LSV('RDR_CFG',JSON.stringify(S));ok=true;}catch(e){}try{CK('RDR_CFG',JSON.stringify(S),365);ok=true;}catch(e){}if(!ok&&S._warned!==1){S._warned=1;try{toast(err('E030'))}catch(e){}}}
function escH(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

function GB(){try{var s=CK('RDR_BOOKS');if(s)return JSON.parse(s);var l=LSV('RDR_BOOKS');return l?JSON.parse(l):[];}catch(e){return[]}}
function SB(b){var j=JSON.stringify(b);try{LSV('RDR_BOOKS',j);}catch(e){}try{CK('RDR_BOOKS',j,365);}catch(e){}}
function ISB(u){var b=GB();for(var i=0;i<b.length;i++)if(b[i].u===u)return i;return -1}
function isSameHost(u){try{var h=new URL(u,location.href).hostname;return h===location.hostname;}catch(e){return false}}
function GT(u){try{return JSON.parse(LSV('PG_'+u)||'0')}catch(e){return 0}}
function ST_(u,p){try{LSV('PG_'+u,JSON.stringify(p));}catch(e){}}
function PROG_SET(b,o){try{LSV('RDR_PROG_'+b,JSON.stringify(o))}catch(e){}}
function PROG_GET(b){try{return JSON.parse(LSV('RDR_PROG_'+b)||'null')}catch(e){return null}}
function cacheGet(u){try{var j=LSV('CACHE_'+u);if(!j)return null;var o=JSON.parse(j);if(o.u!==u)return null;return o.p;}catch(e){return null}}
function cacheSet(u,t,paras){try{LSV('CACHE_'+u,JSON.stringify({u:u,t:t,p:paras,ts:Date.now()}));}catch(e){}}
function cacheList(){var r=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('CACHE_')===0){try{var o=JSON.parse(localStorage[k]);if(o&&o.u)r.push(o)}catch(e){}}}return r}
function cacheClearAll(){var ks=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('CACHE_')===0)ks.push(k)}for(var j=0;j<ks.length;j++)try{localStorage.removeItem(ks[j])}catch(e){}}
function HIS_ADD(u,t){try{var a=JSON.parse(LSV('RDR_HIS')||'[]');for(var i=0;i<a.length;i++)if(a[i].u===u){a.splice(i,1);break;}a.unshift({u:u,t:t||('历史 '+(a.length+1)),ts:Date.now()});if(a.length>200)a=a.slice(0,200);LSV('RDR_HIS',JSON.stringify(a));}catch(e){}}
function HIS_GET(){try{return JSON.parse(LSV('RDR_HIS')||'[]')}catch(e){return[]}}
function HIS_CLEAR(){try{LSV('RDR_HIS','[]')}catch(e){}}

var PURIFY_SOURCE='';
var _pCache={};
function purifyAll(){var list=[];try{var a=JSON.parse(LSV('RDR_PURIFY')||'[]');if(Array.isArray(a))list=list.concat(a);}catch(e){}if(PURIFY_SOURCE){var sources=Array.isArray(PURIFY_SOURCE)?PURIFY_SOURCE:[PURIFY_SOURCE];for(var s=0;s<sources.length;s++){try{var xhr=new XMLHttpRequest();xhr.open('GET',sources[s],false);xhr.send(null);if(xhr.status===200){var arr=JSON.parse(xhr.responseText);if(Array.isArray(arr))list=list.concat(arr);}}catch(e){}}}return list}
function purifySave(a){try{LSV('RDR_PURIFY',JSON.stringify(a))}catch(e){}}
function purifyList(scope){var all=purifyAll(),host=location.host,out=[];for(var i=0;i<all.length;i++){var r=all[i];if(!r||r.enable===0)continue;if(r.scope&&r.scope!=='all'&&r.scope!==scope)continue;if(r.host&&r.host!=='*'){try{var re=new RegExp('^(?:'+r.host.replace(/\./g,'\\.').replace(/\*/g,'.*')+')$','i');if(!re.test(host))continue;}catch(e){continue}}out.push(r);}return out}
function purifyText(text,scope){if(!text)return text;var rules=purifyList(scope);for(var i=0;i<rules.length;i++){var r=rules[i];try{if(r.regex){var key='R_'+(r.find||'');var re=_pCache[key]||(_pCache[key]=new RegExp(r.find,'g'));text=text.replace(re,r.replace||'');}else{if(!r.find)continue;text=text.split(r.find).join(r.replace||'');}}catch(e){}}return text}
function purifyArray(arr,scope){var rules=purifyList(scope);if(!rules.length)return arr;var out=[];for(var i=0;i<arr.length;i++){var t=purifyText(arr[i],scope);if(t&&t.trim())out.push(t);}return out}

function FH(u){return fetch(u,{credentials:'include'}).then(function(r){if(!r.ok)throw new Error('E011 · HTTP '+r.status);return r.text();}).catch(function(e){if(e&&e.message&&e.message.indexOf('E011')===0)throw e;throw new Error('E010 · '+((e&&e.message)||'网络异常'));}).then(function(t){if(t===null||t===undefined)throw new Error('E012');return t;});}

function FC(d){d=d||D;var ss=[];try{var prof=matchProfile();if(prof&&prof.contentSel)for(var x=0;x<prof.contentSel.length;x++)ss.push(prof.contentSel[x]);}catch(e){}ss=ss.concat(['#nr1','#content','#chaptercontent','#chapter-content','#booktext','.page-content','.chapter-content','.read-content','.novel-content','.showtxt','.txtnav','article','main','[role="main"]']);for(var i=0;i<ss.length;i++){var e=d.querySelector(ss[i]);if(e&&(e.textContent||'').trim().length>300)return e;}return pickMainContent(d);}
function pickMainContent(doc){var cands=doc.querySelectorAll('div,article,section,main');var best=null,bestScore=0;for(var i=0;i<cands.length;i++){var c=cands[i],tag=c.tagName;if(tag==='NAV'||tag==='HEADER'||tag==='FOOTER'||tag==='ASIDE')continue;var cls=(c.className||'')+' '+(c.id||'');if(/nav|header|footer|menu|sidebar|comment|ad|banner|widget|toolbar|share|recommend|related/i.test(cls))continue;var txt=c.textContent||'';var len=txt.trim().length;if(len<200)continue;var ps=c.querySelectorAll('p').length;var punct=(txt.match(/[。！？，；：、]/g)||[]).length;var linkLen=0,as=c.querySelectorAll('a');for(var k=0;k<as.length;k++)linkLen+=(as[k].textContent||'').length;var linkDensity=len>0?linkLen/len:0;var score=len*0.3+ps*50+punct*10;score=score*(1-linkDensity);if(len>20000)score*=0.5;if(score>bestScore){bestScore=score;best=c;}}return best}
function HT(h){h=h.replace(/<img[^>]*?>/gi,function(m){var src=m.match(/data-(?:original|src|actual|srcset|echo)\s*=\s*["']([^"']+)["']/i)||m.match(/src\s*=\s*["']([^"']+)["']/i);if(!src||!src[1])return '';var u=src[1].trim().split(/\s+/)[0];if(/^data:image/i.test(u)&&u.length<200)return '';if(u.indexOf('//')===0)u='https:'+u;else if(u.indexOf('/')===0)u=location.origin+u;else if(!/^https?:/i.test(u)){try{u=new URL(u,location.href).href}catch(e){return ''}}if(!/^https?:/i.test(u))return '';if(/spacer|blank\.gif|1x1\.|pixel\.|transparent/i.test(u))return '';if(/\.(gif|svg)$/i.test(u)&&/ad|banner|track|stat|beacon|analytics/i.test(u))return '';return '\n@@IMG@@'+u+'@@IMG@@\n';});h=h.replace(/<br\s*\/?>/gi,'\n').replace(/<\/(p|div|h[1-6]|li|tr)>/gi,'\n').replace(/<[^>]+>/g,'');var x=D.createElement('div');x.innerHTML=h;return x.textContent||'';}
function TP(t){if(!t)return[];t=t.replace(/\u00a0/g,' ').replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n');return purifyArray(t.split(/\n+/).map(function(s){return s.trim()}).filter(Boolean),'read');}
function EXF(d,b){var a=[];try{var prof=matchProfile();var sel=(prof&&prof.fenyeSel)?prof.fenyeSel:'.chapterPages a[href*="fenye="]';var ls=d.querySelectorAll(sel);for(var i=0;i<ls.length;i++){try{var u=new URL(ls[i].getAttribute('href'),b).href;if(/[?&]fenye=1(&|$)/.test(u))continue;if(a.indexOf(u)>=0)continue;a.push(u);}catch(e){}}}catch(e){}return a;}

function toast(m){var t=D.getElementById('RTT');if(t&&t.parentNode)t.parentNode.removeChild(t);t=D.createElement('div');t.id='RTT';t.style.cssText='position:fixed;left:50%;bottom:80px;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:8px 16px;border-radius:8px;font:13px system-ui;z-index:2147483647;pointer-events:none';t.textContent=m;D.body.appendChild(t);setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t)},1600);}
function buildGradBg(){if(S.grad===1)return 'linear-gradient(90deg,'+S.gc1+','+S.gc2+')';if(S.grad===2){var h1=parseFloat(S.gh1)||0,h2=parseFloat(S.gh2)||360;if(h2<=h1)h2=h1+1;var stops=[];for(var i=0;i<=6;i++)stops.push('hsl('+(h1+(h2-h1)*i/6)+',100%,55%)');for(var j=5;j>=1;j--)stops.push('hsl('+(h1+(h2-h1)*j/6)+',100%,55%)');return 'linear-gradient(90deg,'+stops.join(',')+')';}return 'linear-gradient(90deg,'+S.gc1+','+S.gc2+')';}
function theme(){O.className=(S.l?'light ':'');if(S.bgi)O.classList.add('withbg');if(S.grad)O.classList.add('gradon');if(S.grad===2)O.classList.add('rainbow');O.style.setProperty('--rbg',S.bg);O.style.setProperty('--rfg',S.fg);O.style.setProperty('--rbgi','url("'+S.bgi+'")');O.style.setProperty('--gs',(S.gs||6)+'s');O.style.setProperty('--grad-bg',buildGradBg());var _dim=O.querySelector('.rdr-dim');if(!_dim){_dim=D.createElement('div');_dim.className='rdr-dim';_dim.style.cssText='position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:4;transition:background .15s';O.appendChild(_dim);}var _br=parseFloat(S.br);if(isNaN(_br)||_br>1)_br=1;if(_br<1)_dim.style.background='rgba(0,0,0,'+((1-_br)*0.75).toFixed(3)+')';else _dim.style.background='transparent';var _mmc=Q('.mmc');if(_mmc)_mmc.textContent=S.l?'🌙':'☀';var tm=D.querySelector('meta[name="theme-color"]');if(tm)tm.content=S.bg;}
function setNav(v){var d=NAV.children;for(var i=0;i<d.length;i++)d[i].className=(d[i].getAttribute('data-v')===v)?'act':'';NAV.style.display=(v==='reader')?'none':'flex';var _fm=Q('.fm');if(_fm)_fm.style.display='none';}
NAV.onclick=function(e){var t=e.target;while(t&&t!==NAV){if(t.getAttribute&&t.getAttribute('data-v'))break;t=t.parentNode}if(!t||t===NAV)return;var v=t.getAttribute('data-v');if(v==='shuku')viewShuku();else if(v==='shelf')viewShelf();else if(v==='feed')viewFeedList();else if(v==='setting')viewSetting();};

function imgFavGet(){try{return JSON.parse(LSV('RDR_IMGFAV')||'[]')}catch(e){return[]}}
function imgFavSave(a){try{LSV('RDR_IMGFAV',JSON.stringify(a))}catch(e){}}
function imgFavHas(u){var a=imgFavGet();for(var i=0;i<a.length;i++)if(a[i].u===u)return i;return -1}
function imgFavToggle(d){var a=imgFavGet();var i=imgFavHas(d.image_url);if(i>=0)a.splice(i,1);else a.unshift({u:d.image_url,t:d.tags||'',de:d.content_description||'',ts:Date.now()});imgFavSave(a);return i<0}
function imgView(d){
  var o=D.createElement('div');o.id='IVO';
  o.innerHTML='<img src="'+escH(d.image_url)+'" alt=""><div class="cls">×</div><div class="fav"></div><div class="meta"></div>';
  var img=o.querySelector('img'),fav=o.querySelector('.fav'),meta=o.querySelector('.meta');
  function refreshFav(){var i=imgFavHas(d.image_url);fav.textContent=i>=0?'★ 已收藏':'☆ 收藏';fav.className='fav'+(i>=0?' on':'');}
  refreshFav();
  var mh='';
  if(d.tags)mh+='<div class="mt"><b>标签：</b>'+escH(d.tags)+'</div>';
  if(d.desc)mh+='<div class="mt"><b>描述：</b>'+escH(d.desc)+'</div>';
  if(d.file)mh+='<div class="mt"><b>文件：</b>'+escH(d.file)+'</div>';
  if(d.be||d.loc)mh+='<div class="mt"><b>存储：</b>'+escH((d.be||'')+(d.loc?(' / '+d.loc):''))+'</div>';
  mh+='<div class="mt url">'+escH(d.image_url)+'</div>';
  mh+='<div class="btnrow"><button class="bCopy">复制图片链接</button><button class="bOpen">在新标签打开原图</button></div>';
  meta.innerHTML=mh;
  meta.querySelector('.bCopy').onclick=function(e){e.stopPropagation();try{navigator.clipboard.writeText(d.image_url);toast('已复制')}catch(err){var ta=D.createElement('textarea');ta.value=d.image_url;D.body.appendChild(ta);ta.select();try{D.execCommand('copy');toast('已复制')}catch(e2){toast('复制失败')}D.body.removeChild(ta);}};
  meta.querySelector('.bOpen').onclick=function(e){e.stopPropagation();W.open(d.image_url,'_blank')};
  o.querySelector('.cls').onclick=function(){o.parentNode.removeChild(o)};
  fav.onclick=function(e){e.stopPropagation();imgFavToggle(d);refreshFav()};
  var scale=1,last=0;
  img.addEventListener('click',function(){var now=Date.now();if(now-last<300){scale=scale>1?1:2;img.style.transform='scale('+scale+')'}last=now;});
  o.onclick=function(e){if(e.target===o)o.parentNode.removeChild(o)};
  D.body.appendChild(o);
}
window.__rdImgView=imgView;

var rstTimer=null;
function closeReader(){
  if(ft){clearInterval(ft);ft=null}
  if(killAdsTimer){clearInterval(killAdsTimer);killAdsTimer=null}
  try{if(typeof _mo!=='undefined'&&_mo&&_mo.disconnect)_mo.disconnect()}catch(e){}
  if(O.parentNode)O.parentNode.removeChild(O);
  if(st.parentNode)st.parentNode.removeChild(st);
  if(oh)D.documentElement.setAttribute('style',oh);else D.documentElement.removeAttribute('style');
  if(ob)D.body.setAttribute('style',ob);else D.body.removeAttribute('style');
  try{var kids=D.body.children;for(var i=0;i<kids.length;i++){var el=kids[i];if(el.id==='R'||el.tagName==='SCRIPT'||el.tagName==='STYLE')continue;try{el.style.removeProperty('display');el.style.removeProperty('visibility');el.style.removeProperty('pointer-events');if(el.getAttribute('style')==='')el.removeAttribute('style');}catch(e){}}}catch(e){}
  try{var tm=D.querySelector('meta[name="theme-color"]');if(tm){if(originalThemeCreated&&tm.parentNode)tm.parentNode.removeChild(tm);else if(originalTheme!=null)tm.setAttribute('content',originalTheme);else tm.removeAttribute('content');}}catch(e){}
  RC=null;
  window.K=null;window.__RDR__=null;window.__rdRelayout=null;window.__rdCurImgData=null;window.__rdImgView=null;window.RDR_TTS_FILTER=null;window.__rdWantPg=null;
  var cnt=5;
  RST.style.display='block';RST.textContent='← 返回阅读（'+cnt+'）';
  RST.onclick=function(){
    if(rstTimer){clearInterval(rstTimer);rstTimer=null}
    RST.style.display='none';LSV('RDR_RESUME','1');
    var sc=D.createElement('script');
    var rawUrl=document.querySelector('script[src*="reader.js"]');
    if(rawUrl&&rawUrl.src){sc.src=rawUrl.src.split('?')[0]+'?r='+Date.now();D.head.appendChild(sc)}
  };
  rstTimer=setInterval(function(){
    cnt--;
    if(cnt<=0){
      clearInterval(rstTimer);rstTimer=null;RST.style.display='none';LSV('RDR_RESUME','');
      try{var kids2=D.body.children;for(var j=0;j<kids2.length;j++){var el2=kids2[j];if(el2.tagName==='SCRIPT'||el2.tagName==='STYLE')continue;try{el2.style.removeProperty('display');el2.style.removeProperty('visibility');el2.style.removeProperty('pointer-events');if(el2.getAttribute('style')==='')el2.removeAttribute('style');}catch(e){}}D.documentElement.style.removeProperty('background');D.documentElement.style.removeProperty('overflow');D.body.style.removeProperty('background');D.body.style.removeProperty('overflow');}catch(e){}
    }else RST.textContent='← 返回阅读（'+cnt+'）';
  },1000);
}
Q('.x').onclick=function(){closeReader()};

var oh=D.documentElement.getAttribute('style')||'',ob=D.body.getAttribute('style')||'';
var originalTheme=null,originalThemeCreated=false;
(function(){var tm=D.querySelector('meta[name="theme-color"]');if(!tm){tm=D.createElement('meta');tm.name='theme-color';D.head.appendChild(tm);originalThemeCreated=true}else originalTheme=tm.getAttribute('content');})();
theme();
var ft=setInterval(function(){if(D.hidden)return;D.documentElement.style.setProperty('background','#000','important');D.body.style.setProperty('background','#000','important');D.documentElement.style.setProperty('overflow','hidden','important');D.body.style.setProperty('overflow','hidden','important');},1000);