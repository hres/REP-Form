import{$ as Be,$a as me,A as f,C as F,Cb as at,D as n,E as C,F as Me,G as Re,H as _e,I as Le,Ia as Je,J as h,Ja as he,K as a,L as p,La as Ze,M as b,N as le,O as de,Oa as Ye,Ra as Ge,S as w,W as r,X as c,Y as v,Z as S,Za as Xe,_ as Ae,_a as G,a as N,aa as O,ab as Ke,b as J,ba as s,bb as X,c as Ee,ca as o,d as j,db as We,e as Z,ea as Oe,f as Te,g as I,ga as ce,gb as Qe,h as re,ha as Pe,i as D,ia as Ne,j as ae,ja as M,jb as E,k as g,ka as je,m as q,ma as A,n as B,na as qe,nb as et,o as be,oa as ue,ob as tt,p as De,pa as He,pb as it,qa as $e,ra as Fe,rb as nt,s as H,sa as Ue,sb as rt,t as se,ta as ke,tb as K,u as Ce,ua as ze,v as oe,va as Ve,w as we,wa as P,x as $,xa as R,y as pe,z as Y}from"./chunk-75O5Q2SR.js";var Se=class extends Ne{constructor(){super(...arguments),this.supportsDOMEvents=!0}},ge=class d extends Se{static makeCurrent(){Pe(new d)}onAndCancel(l,e,t){return l.addEventListener(e,t),()=>{l.removeEventListener(e,t)}}dispatchEvent(l,e){l.dispatchEvent(e)}remove(l){l.remove()}createElement(l,e){return e=e||this.getDefaultDocument(),e.createElement(l)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(l){return l.nodeType===Node.ELEMENT_NODE}isShadowRoot(l){return l instanceof DocumentFragment}getGlobalEventTarget(l,e){return e==="window"?window:e==="document"?l:e==="body"?l.body:null}getBaseHref(l){let e=It();return e==null?null:Et(e)}resetBaseElement(){U=null}getUserAgent(){return window.navigator.userAgent}getCookie(l){return je(document.cookie,l)}},U=null;function It(){return U=U||document.querySelector("base"),U?U.getAttribute("href"):null}function Et(d){return new URL(d,document.baseURI).pathname}var Tt=(()=>{class d{build(){return new XMLHttpRequest}static{this.\u0275fac=function(t){return new(t||d)}}static{this.\u0275prov=D({token:d,factory:d.\u0275fac})}}return d})(),ye=new ae(""),lt=(()=>{class d{constructor(e,t){this._zone=t,this._eventNameToPlugin=new Map,e.forEach(i=>{i.manager=this}),this._plugins=e.slice().reverse()}addEventListener(e,t,i){return this._findPluginFor(t).addEventListener(e,t,i)}getZone(){return this._zone}_findPluginFor(e){let t=this._eventNameToPlugin.get(e);if(t)return t;if(t=this._plugins.find(u=>u.supports(e)),!t)throw new re(5101,!1);return this._eventNameToPlugin.set(e,t),t}static{this.\u0275fac=function(t){return new(t||d)(g(ye),g(H))}}static{this.\u0275prov=D({token:d,factory:d.\u0275fac})}}return d})(),W=class{constructor(l){this._doc=l}},fe="ng-app-id",dt=(()=>{class d{constructor(e,t,i,u={}){this.doc=e,this.appId=t,this.nonce=i,this.platformId=u,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=ue(u),this.resetHostNodes()}addStyles(e){for(let t of e)this.changeUsageCount(t,1)===1&&this.onStyleAdded(t)}removeStyles(e){for(let t of e)this.changeUsageCount(t,-1)<=0&&this.onStyleRemoved(t)}ngOnDestroy(){let e=this.styleNodesInDOM;e&&(e.forEach(t=>t.remove()),e.clear());for(let t of this.getAllStyles())this.onStyleRemoved(t);this.resetHostNodes()}addHost(e){this.hostNodes.add(e);for(let t of this.getAllStyles())this.addStyleToHost(e,t)}removeHost(e){this.hostNodes.delete(e)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(e){for(let t of this.hostNodes)this.addStyleToHost(t,e)}onStyleRemoved(e){let t=this.styleRef;t.get(e)?.elements?.forEach(i=>i.remove()),t.delete(e)}collectServerRenderedStyles(){let e=this.doc.head?.querySelectorAll(`style[${fe}="${this.appId}"]`);if(e?.length){let t=new Map;return e.forEach(i=>{i.textContent!=null&&t.set(i.textContent,i)}),t}return null}changeUsageCount(e,t){let i=this.styleRef;if(i.has(e)){let u=i.get(e);return u.usage+=t,u.usage}return i.set(e,{usage:t,elements:[]}),t}getStyleElement(e,t){let i=this.styleNodesInDOM,u=i?.get(t);if(u?.parentNode===e)return i.delete(t),u.removeAttribute(fe),u;{let m=this.doc.createElement("style");return this.nonce&&m.setAttribute("nonce",this.nonce),m.textContent=t,this.platformIsServer&&m.setAttribute(fe,this.appId),e.appendChild(m),m}}addStyleToHost(e,t){let i=this.getStyleElement(e,t),u=this.styleRef,m=u.get(t)?.elements;m?m.push(i):u.set(t,{elements:[i],usage:1})}resetHostNodes(){let e=this.hostNodes;e.clear(),e.add(this.doc.head)}static{this.\u0275fac=function(t){return new(t||d)(g(M),g(oe),g(pe,8),g($))}}static{this.\u0275prov=D({token:d,factory:d.\u0275fac})}}return d})(),ve={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Ie=/%COMP%/g,ct="%COMP%",bt=`_nghost-${ct}`,Dt=`_ngcontent-${ct}`,Ct=!0,wt=new ae("",{providedIn:"root",factory:()=>Ct});function Mt(d){return Dt.replace(Ie,d)}function Rt(d){return bt.replace(Ie,d)}function ut(d,l){return l.map(e=>e.replace(Ie,d))}var st=(()=>{class d{constructor(e,t,i,u,m,y,x,T=null){this.eventManager=e,this.sharedStylesHost=t,this.appId=i,this.removeStylesOnCompDestroy=u,this.doc=m,this.platformId=y,this.ngZone=x,this.nonce=T,this.rendererByCompId=new Map,this.platformIsServer=ue(y),this.defaultRenderer=new k(e,m,x,this.platformIsServer)}createRenderer(e,t){if(!e||!t)return this.defaultRenderer;this.platformIsServer&&t.encapsulation===q.ShadowDom&&(t=J(N({},t),{encapsulation:q.Emulated}));let i=this.getOrCreateRenderer(e,t);return i instanceof Q?i.applyToHost(e):i instanceof z&&i.applyStyles(),i}getOrCreateRenderer(e,t){let i=this.rendererByCompId,u=i.get(t.id);if(!u){let m=this.doc,y=this.ngZone,x=this.eventManager,T=this.sharedStylesHost,_=this.removeStylesOnCompDestroy,L=this.platformIsServer;switch(t.encapsulation){case q.Emulated:u=new Q(x,T,t,this.appId,_,m,y,L);break;case q.ShadowDom:return new xe(x,T,e,t,m,y,this.nonce,L);default:u=new z(x,T,t,_,m,y,L);break}i.set(t.id,u)}return u}ngOnDestroy(){this.rendererByCompId.clear()}static{this.\u0275fac=function(t){return new(t||d)(g(lt),g(dt),g(oe),g(wt),g(M),g($),g(H),g(pe))}}static{this.\u0275prov=D({token:d,factory:d.\u0275fac})}}return d})(),k=class{constructor(l,e,t,i){this.eventManager=l,this.doc=e,this.ngZone=t,this.platformIsServer=i,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(l,e){return e?this.doc.createElementNS(ve[e]||e,l):this.doc.createElement(l)}createComment(l){return this.doc.createComment(l)}createText(l){return this.doc.createTextNode(l)}appendChild(l,e){(ot(l)?l.content:l).appendChild(e)}insertBefore(l,e,t){l&&(ot(l)?l.content:l).insertBefore(e,t)}removeChild(l,e){e.remove()}selectRootElement(l,e){let t=typeof l=="string"?this.doc.querySelector(l):l;if(!t)throw new re(-5104,!1);return e||(t.textContent=""),t}parentNode(l){return l.parentNode}nextSibling(l){return l.nextSibling}setAttribute(l,e,t,i){if(i){e=i+":"+e;let u=ve[i];u?l.setAttributeNS(u,e,t):l.setAttribute(e,t)}else l.setAttribute(e,t)}removeAttribute(l,e,t){if(t){let i=ve[t];i?l.removeAttributeNS(i,e):l.removeAttribute(`${t}:${e}`)}else l.removeAttribute(e)}addClass(l,e){l.classList.add(e)}removeClass(l,e){l.classList.remove(e)}setStyle(l,e,t,i){i&(F.DashCase|F.Important)?l.style.setProperty(e,t,i&F.Important?"important":""):l.style[e]=t}removeStyle(l,e,t){t&F.DashCase?l.style.removeProperty(e):l.style[e]=""}setProperty(l,e,t){l!=null&&(l[e]=t)}setValue(l,e){l.nodeValue=e}listen(l,e,t){if(typeof l=="string"&&(l=ce().getGlobalEventTarget(this.doc,l),!l))throw new Error(`Unsupported event target ${l} for event ${e}`);return this.eventManager.addEventListener(l,e,this.decoratePreventDefault(t))}decoratePreventDefault(l){return e=>{if(e==="__ngUnwrap__")return l;(this.platformIsServer?this.ngZone.runGuarded(()=>l(e)):l(e))===!1&&e.preventDefault()}}};function ot(d){return d.tagName==="TEMPLATE"&&d.content!==void 0}var xe=class extends k{constructor(l,e,t,i,u,m,y,x){super(l,u,m,x),this.sharedStylesHost=e,this.hostEl=t,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let T=ut(i.id,i.styles);for(let _ of T){let L=document.createElement("style");y&&L.setAttribute("nonce",y),L.textContent=_,this.shadowRoot.appendChild(L)}}nodeOrShadowRoot(l){return l===this.hostEl?this.shadowRoot:l}appendChild(l,e){return super.appendChild(this.nodeOrShadowRoot(l),e)}insertBefore(l,e,t){return super.insertBefore(this.nodeOrShadowRoot(l),e,t)}removeChild(l,e){return super.removeChild(null,e)}parentNode(l){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(l)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},z=class extends k{constructor(l,e,t,i,u,m,y,x){super(l,u,m,y),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=i,this.styles=x?ut(x,t.styles):t.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},Q=class extends z{constructor(l,e,t,i,u,m,y,x){let T=i+"-"+t.id;super(l,e,t,u,m,y,x,T),this.contentAttr=Mt(T),this.hostAttr=Rt(T)}applyToHost(l){this.applyStyles(),this.setAttribute(l,this.hostAttr,"")}createElement(l,e){let t=super.createElement(l,e);return super.setAttribute(t,this.contentAttr,""),t}},_t=(()=>{class d extends W{constructor(e){super(e)}supports(e){return!0}addEventListener(e,t,i){return e.addEventListener(t,i,!1),()=>this.removeEventListener(e,t,i)}removeEventListener(e,t,i){return e.removeEventListener(t,i)}static{this.\u0275fac=function(t){return new(t||d)(g(M))}}static{this.\u0275prov=D({token:d,factory:d.\u0275fac})}}return d})(),pt=["alt","control","meta","shift"],Lt={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},At={alt:d=>d.altKey,control:d=>d.ctrlKey,meta:d=>d.metaKey,shift:d=>d.shiftKey},Bt=(()=>{class d extends W{constructor(e){super(e)}supports(e){return d.parseEventName(e)!=null}addEventListener(e,t,i){let u=d.parseEventName(t),m=d.eventCallback(u.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ce().onAndCancel(e,u.domEventName,m))}static parseEventName(e){let t=e.toLowerCase().split("."),i=t.shift();if(t.length===0||!(i==="keydown"||i==="keyup"))return null;let u=d._normalizeKey(t.pop()),m="",y=t.indexOf("code");if(y>-1&&(t.splice(y,1),m="code."),pt.forEach(T=>{let _=t.indexOf(T);_>-1&&(t.splice(_,1),m+=T+".")}),m+=u,t.length!=0||u.length===0)return null;let x={};return x.domEventName=i,x.fullKey=m,x}static matchEventFullKeyCode(e,t){let i=Lt[e.key]||e.key,u="";return t.indexOf("code.")>-1&&(i=e.code,u="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),pt.forEach(m=>{if(m!==i){let y=At[m];y(e)&&(u+=m+".")}}),u+=i,u===t)}static eventCallback(e,t,i){return u=>{d.matchEventFullKeyCode(u,e)&&i.runGuarded(()=>t(u))}}static _normalizeKey(e){return e==="esc"?"escape":e}static{this.\u0275fac=function(t){return new(t||d)(g(M))}}static{this.\u0275prov=D({token:d,factory:d.\u0275fac})}}return d})();function ht(d,l){return Oe(N({rootComponent:d},Ot(l)))}function Ot(d){return{appProviders:[...Ht,...d?.providers??[]],platformProviders:qt}}function Pt(){ge.makeCurrent()}function Nt(){return new se}function jt(){return Ce(document),document}var qt=[{provide:$,useValue:qe},{provide:we,useValue:Pt,multi:!0},{provide:M,useFactory:jt,deps:[]}];var Ht=[{provide:De,useValue:"root"},{provide:se,useFactory:Nt,deps:[]},{provide:ye,useClass:_t,multi:!0,deps:[M,H,$]},{provide:ye,useClass:Bt,multi:!0,deps:[M]},st,dt,lt,{provide:Me,useExisting:st},{provide:He,useClass:Tt,deps:[]},[]];var te=(()=>{class d{constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static{this.\u0275fac=function(t){return new(t||d)(g(M))}}static{this.\u0275prov=D({token:d,factory:d.\u0275fac,providedIn:"root"})}}return d})();var ie=class{_handler;_resourcesPrefix;constructor(l,e){this._handler=l,this._resourcesPrefix=e}getTranslation(l){let e=this._resourcesPrefix.map(t=>{let i;return typeof t=="string"?i=`${t}${l}.json`:i=`${t.prefix}${l}${t.suffix||".json"}`,new Fe(this._handler).get(i).pipe(Te(u=>(typeof t!="string"&&!t.optional&&(console.group(),console.error("Something went wrong for the following translation file:",i),console.error(u),console.groupEnd()),Ee({}))))});return Z(e).pipe(j(t=>t.reduce((i,u)=>this.mergeDeep(i,u),{})))}isObject(l){return l&&typeof l=="object"&&!Array.isArray(l)}mergeDeep(l,e){let t=Object.assign({},l);return this.isObject(l)?(this.isObject(l)&&this.isObject(e)&&Object.keys(e).forEach(i=>{this.isObject(e[i])?i in l?t[i]=this.mergeDeep(l[i],e[i]):Object.assign(t,{[i]:e[i]}):Object.assign(t,{[i]:e[i]})}),t):this.mergeDeep({},e)}};var mt={providers:[ke(),be(R.forRoot({defaultLanguage:"en",loader:{provide:ze,useFactory:Ft,deps:[$e]}})),te,G,{provide:Ue,useClass:me,multi:!0},X,me,{provide:he,useClass:Xe,multi:!0},{provide:he,useClass:Qe,multi:!0}]};function Ft(d){return new ie(d,["./assets/i18n/","./assets/i18n/common/"])}var ft={appVersion:"5.0.0",byPassCheckSum:!1};var V=J(N({},ft),{production:!1,lang:"en"});var St=(()=>{class d{constructor(){}static{this.\u0275fac=function(t){return new(t||d)}}static{this.\u0275cmp=B({type:d,selectors:[["app-instruction"]],inputs:{helpTextSequences:"helpTextSequences",lang:"lang"},standalone:!0,features:[O],decls:455,vars:424,consts:[["id","no-border","role","note",1,"wb-fnote"],[3,"id"],[1,"fn-rtn"],[3,"href"],[1,"wb-inv"],[1,"fn-rep"],["target","_blank",3,"href"],[3,"lang"],[3,"innerHTML"]],template:function(t,i){t&1&&(a(0,"aside",0)(1,"dl")(2,"dt"),r(3),s(4,"translate"),p(),a(5,"dd",1)(6,"p",2)(7,"a",3)(8,"span",4),r(9),s(10,"translate"),p(),r(11),a(12,"span",4),r(13," referrer"),p()()(),a(14,"div",5)(15,"p"),r(16),s(17,"translate"),p(),a(18,"ul")(19,"li"),r(20),s(21,"translate"),p(),a(22,"li"),r(23),s(24,"translate"),p()(),a(25,"p",2)(26,"a",3)(27,"span",4),r(28),s(29,"translate"),p(),r(30),a(31,"span",4),r(32," referrer"),p()()()()(),a(33,"dt"),r(34),s(35,"translate"),p(),a(36,"dd",1)(37,"div",5)(38,"p"),r(39),s(40,"translate"),p(),a(41,"ul")(42,"li"),r(43),s(44,"translate"),p(),a(45,"li"),r(46),s(47,"translate"),p(),a(48,"li"),r(49),s(50,"translate"),p()(),a(51,"p",2)(52,"a",3)(53,"span",4),r(54),s(55,"translate"),p(),r(56),a(57,"span",4),r(58," referrer"),p()()()()(),a(59,"dt"),r(60),s(61,"translate"),p(),a(62,"dd",1)(63,"div",5)(64,"p"),r(65),s(66,"translate"),p(),a(67,"p"),r(68),s(69,"translate"),p(),a(70,"p"),r(71),s(72,"translate"),p(),a(73,"p",2)(74,"a",3)(75,"span",4),r(76),s(77,"translate"),p(),r(78),a(79,"span",4),r(80," referrer"),p()()()()(),a(81,"dt"),r(82),s(83,"translate"),p(),a(84,"dd",1)(85,"div",5)(86,"p"),r(87),s(88,"translate"),p(),a(89,"p"),r(90),s(91,"translate"),p(),a(92,"p"),r(93),s(94,"translate"),p(),a(95,"ul")(96,"li"),r(97),s(98,"translate"),p(),a(99,"li"),r(100),s(101,"translate"),p(),a(102,"li"),r(103),s(104,"translate"),p(),a(105,"li"),r(106),s(107,"translate"),p()(),a(108,"p",2)(109,"a",3)(110,"span",4),r(111),s(112,"translate"),p(),r(113),a(114,"span",4),r(115," referrer"),p()()()()(),a(116,"dt"),r(117),s(118,"translate"),p(),a(119,"dd",1)(120,"div",5)(121,"p"),r(122),s(123,"translate"),p(),a(124,"p"),r(125),s(126,"translate"),p(),a(127,"p"),r(128),s(129,"translate"),p(),a(130,"p"),r(131),s(132,"translate"),p(),a(133,"p",2)(134,"a",3)(135,"span",4),r(136),s(137,"translate"),p(),r(138),a(139,"span",4),r(140," referrer"),p()()()()(),a(141,"dt"),r(142),s(143,"translate"),p(),a(144,"dd",1)(145,"div",5)(146,"p"),r(147),s(148,"translate"),s(149,"translate"),p(),a(150,"p"),r(151),s(152,"translate"),a(153,"a",6),s(154,"translate"),r(155),s(156,"translate"),p()(),a(157,"p",2)(158,"a",3)(159,"span",4),r(160),s(161,"translate"),p(),r(162),a(163,"span",4),r(164," referrer"),p()()()()(),a(165,"dt"),r(166),s(167,"translate"),p(),a(168,"dd",1)(169,"div",5)(170,"p"),r(171),s(172,"translate"),s(173,"translate"),p(),a(174,"p"),r(175),s(176,"translate"),a(177,"a",6),s(178,"translate"),r(179),s(180,"translate"),p()(),a(181,"p",2)(182,"a",3)(183,"span",4),r(184),s(185,"translate"),p(),r(186),a(187,"span",4),r(188," referrer"),p()()()()(),a(189,"dt"),r(190),s(191,"translate"),p(),a(192,"dd",1)(193,"div",5)(194,"p"),r(195),s(196,"translate"),s(197,"translate"),p(),a(198,"p"),r(199),s(200,"translate"),a(201,"a",6),s(202,"translate"),r(203),s(204,"translate"),p(),r(205),s(206,"translate"),a(207,"a",6),s(208,"translate"),r(209),s(210,"translate"),p()(),a(211,"p",2)(212,"a",3)(213,"span",4),r(214),s(215,"translate"),p(),r(216),a(217,"span",4),r(218," referrer"),p()()()()(),a(219,"dt"),r(220),s(221,"translate"),p(),a(222,"dd",1)(223,"div",5)(224,"p"),r(225),s(226,"translate"),p(),a(227,"ul")(228,"li"),r(229),s(230,"translate"),p(),a(231,"li"),r(232),s(233,"translate"),p(),a(234,"li"),r(235),s(236,"translate"),p(),a(237,"li"),r(238),s(239,"translate"),p(),a(240,"li"),r(241),s(242,"translate"),p()(),a(243,"p",2)(244,"a",3)(245,"span",4),r(246),s(247,"translate"),p(),r(248),a(249,"span",4),r(250," referrer"),p()()()()(),a(251,"dt"),r(252),s(253,"translate"),p(),a(254,"dd",1)(255,"div",5)(256,"p"),r(257),s(258,"translate"),s(259,"translate"),p(),a(260,"p"),r(261),s(262,"translate"),p(),a(263,"ul")(264,"li"),r(265),s(266,"translate"),a(267,"a",6),s(268,"translate"),r(269),s(270,"translate"),p()(),a(271,"li"),r(272),s(273,"translate"),a(274,"a",6),s(275,"translate"),r(276),s(277,"translate"),p()()(),a(278,"p"),r(279),s(280,"translate"),p(),a(281,"ul")(282,"li")(283,"a",6),s(284,"translate"),r(285),s(286,"translate"),p()(),a(287,"li")(288,"a",6),s(289,"translate"),r(290),s(291,"translate"),p()()(),a(292,"p"),r(293),s(294,"translate"),p(),a(295,"p"),r(296),s(297,"translate"),p(),a(298,"ul")(299,"li"),r(300),s(301,"translate"),p()(),a(302,"p",2)(303,"a",3)(304,"span",4),r(305),s(306,"translate"),p(),r(307),a(308,"span",4),r(309," referrer"),p()()()()(),a(310,"dt"),r(311),s(312,"translate"),p(),a(313,"dd",1)(314,"div",5)(315,"p"),r(316),s(317,"translate"),s(318,"translate"),p(),a(319,"p"),r(320),s(321,"translate"),p(),a(322,"p"),r(323),s(324,"translate"),p(),a(325,"p"),r(326),s(327,"translate"),p(),a(328,"p"),r(329),s(330,"translate"),p(),a(331,"p",2)(332,"a",3)(333,"span",4),r(334),s(335,"translate"),p(),r(336),a(337,"span",4),r(338," referrer"),p()()()()(),a(339,"dt"),r(340),s(341,"translate"),p(),a(342,"dd",1)(343,"div",5)(344,"p"),r(345),s(346,"translate"),s(347,"translate"),p(),a(348,"p"),r(349),s(350,"translate"),p(),a(351,"p",2)(352,"a",3)(353,"span",4),r(354),s(355,"translate"),p(),r(356),a(357,"span",4),r(358," referrer"),p()()()()(),a(359,"dt"),r(360),s(361,"translate"),p(),a(362,"dd",1)(363,"div",5)(364,"p"),r(365),s(366,"translate"),p(),b(367,"app-control-number-helptext",7),a(368,"p",2)(369,"a",3)(370,"span",4),r(371),s(372,"translate"),p(),r(373),a(374,"span",4),r(375," referrer"),p()()()()(),a(376,"dt"),r(377),s(378,"translate"),p(),a(379,"dd",1)(380,"div",5)(381,"p"),r(382),s(383,"translate"),s(384,"translate"),p(),a(385,"p"),r(386),s(387,"translate"),p(),b(388,"p",8),s(389,"translate"),a(390,"p",2)(391,"a",3)(392,"span",4),r(393),s(394,"translate"),p(),r(395),a(396,"span",4),r(397," referrer"),p()()()()(),a(398,"dt"),r(399),s(400,"translate"),p(),a(401,"dd",1)(402,"div",5)(403,"p"),r(404),s(405,"translate"),p(),a(406,"p"),r(407),s(408,"translate"),p(),a(409,"p"),r(410),s(411,"translate"),p(),a(412,"p"),r(413),s(414,"translate"),p(),a(415,"p"),r(416),s(417,"translate"),p(),a(418,"p",2)(419,"a",3)(420,"span",4),r(421),s(422,"translate"),p(),r(423),a(424,"span",4),r(425," referrer"),p()()()()(),a(426,"dt"),r(427),s(428,"translate"),p(),a(429,"dd",1)(430,"div",5)(431,"p"),r(432),s(433,"translate"),p(),a(434,"p"),r(435),s(436,"translate"),p(),a(437,"ul")(438,"li"),r(439),s(440,"translate"),p(),a(441,"li"),r(442),s(443,"translate"),p()(),a(444,"p"),r(445),s(446,"translate"),p(),a(447,"p",2)(448,"a",3)(449,"span",4),r(450),s(451,"translate"),p(),r(452),a(453,"span",4),r(454," referrer"),p()()()()()()()),t&2&&(n(3),S("",o(4,186,"Instruction")," ",i.helpTextSequences.loadFileIndx[0],""),n(2),h("id",i.helpTextSequences.loadFileIndx[1]),n(2),h("href","#"+i.helpTextSequences.loadFileIndx[2],f),n(2),c(o(10,188,"return.instruction")),n(2),v(" ",i.helpTextSequences.loadFileIndx[0]," "),n(5),c(o(17,190,"load.file")),n(4),c(o(21,192,"ht.load.file.2")),n(3),c(o(24,194,"ht.load.file.3")),n(3),h("href","#"+i.helpTextSequences.loadFileIndx[2],f),n(2),c(o(29,196,"return.instruction")),n(2),v(" ",i.helpTextSequences.loadFileIndx[0]," "),n(4),S("",o(35,198,"Instruction")," ",i.helpTextSequences.dossierTypeIndx[0],""),n(2),h("id",i.helpTextSequences.dossierTypeIndx[1]),n(3),c(o(40,200,"dossier.type")),n(4),c(o(44,202,"ht.dossier.type.1")),n(3),c(o(47,204,"ht.dossier.type.2")),n(3),c(o(50,206,"ht.dossier.type.4")),n(3),h("href","#"+i.helpTextSequences.dossierTypeIndx[2],f),n(2),c(o(55,208,"return.instruction")),n(2),v(" ",i.helpTextSequences.dossierTypeIndx[0]," "),n(4),S("",o(61,210,"Instruction")," ",i.helpTextSequences.compIdIndx[0],""),n(2),h("id",i.helpTextSequences.compIdIndx[1]),n(3),c(o(66,212,"company.id")),n(3),c(o(69,214,"ht.comp.id.1")),n(3),c(o(72,216,"ht.comp.id.2")),n(3),h("href","#"+i.helpTextSequences.compIdIndx[2],f),n(2),c(o(77,218,"return.instruction")),n(2),v(" ",i.helpTextSequences.compIdIndx[0]," "),n(4),S("",o(83,220,"Instruction")," ",i.helpTextSequences.dossierIdIndx[0],""),n(2),h("id",i.helpTextSequences.dossierIdIndx[1]),n(3),c(o(88,222,"dossier.id")),n(3),c(o(91,224,"ht.dossier.id")),n(3),c(o(94,226,"ht.dossier.id.0")),n(4),c(o(98,228,"ht.dossier.id.1")),n(3),c(o(101,230,"ht.dossier.id.2")),n(3),c(o(104,232,"ht.dossier.id.3")),n(3),c(o(107,234,"ht.dossier.id.5")),n(3),h("href","#"+i.helpTextSequences.dossierIdIndx[2],f),n(2),c(o(112,236,"return.instruction")),n(2),v(" ",i.helpTextSequences.dossierIdIndx[0]," "),n(4),S("",o(118,238,"Instruction")," ",i.helpTextSequences.prodNameIndx[0],""),n(2),h("id",i.helpTextSequences.prodNameIndx[1]),n(3),c(o(123,240,"product.name")),n(3),c(o(126,242,"ht.prod.name.1")),n(3),c(o(129,244,"ht.prod.name.2")),n(3),c(o(132,246,"ht.prod.name.3")),n(3),h("href","#"+i.helpTextSequences.prodNameIndx[2],f),n(2),c(o(137,248,"return.instruction")),n(2),v(" ",i.helpTextSequences.prodNameIndx[0]," "),n(4),S("",o(143,250,"Instruction")," ",i.helpTextSequences.prioRevIndx[0],""),n(2),h("id",i.helpTextSequences.prioRevIndx[1]),n(3),S("",o(148,252,"section.show.option"),"",o(149,254,"is.priority"),""),n(4),v("",o(152,256,"ht.refer.to")," "),n(2),w("href",o(154,258,"ht.prio.rev.url"),f),n(2),c(o(156,260,"ht.prio.rev")),n(3),h("href","#"+i.helpTextSequences.prioRevIndx[2],f),n(2),c(o(161,262,"return.instruction")),n(2),v(" ",i.helpTextSequences.prioRevIndx[0]," "),n(4),S("",o(167,264,"Instruction")," ",i.helpTextSequences.nocRevIndx[0],""),n(2),h("id",i.helpTextSequences.nocRevIndx[1]),n(3),S("",o(172,266,"section.show.option"),"",o(173,268,"is.noc"),""),n(4),v("",o(176,270,"ht.refer.to")," "),n(2),w("href",o(178,272,"ht.noc.rev.url"),f),n(2),c(o(180,274,"ht.noc.rev")),n(3),h("href","#"+i.helpTextSequences.nocRevIndx[2],f),n(2),c(o(185,276,"return.instruction")),n(2),v(" ",i.helpTextSequences.nocRevIndx[0]," "),n(4),S("",o(191,278,"Instruction")," ",i.helpTextSequences.adminSubIndx[0],""),n(2),h("id",i.helpTextSequences.adminSubIndx[1]),n(3),S("",o(196,280,"section.show.option"),"",o(197,282,"is.admin.submission"),""),n(4),v("",o(200,284,"ht.refer.to")," "),n(2),w("href",o(202,286,"ht.admin.sub.url"),f),n(2),c(o(204,288,"ht.admin.sub")),n(2),v(" ",o(206,290,"ht.admin.sub.1")," "),n(2),w("href",o(208,292,"ht.admin.sub.2.url"),f),n(2),c(o(210,294,"ht.admin.sub.2")),n(3),h("href","#"+i.helpTextSequences.adminSubIndx[2],f),n(2),c(o(215,296,"return.instruction")),n(2),v(" ",i.helpTextSequences.adminSubIndx[0]," "),n(4),S("",o(221,298,"Instruction")," ",i.helpTextSequences.regActIndx[0],""),n(2),h("id",i.helpTextSequences.regActIndx[1]),n(3),c(o(226,300,"activity.lead")),n(4),c(o(230,302,"ht.act.lead.1")),n(3),c(o(233,304,"ht.act.lead.4")),n(3),c(o(236,306,"ht.act.lead.5")),n(3),c(o(239,308,"ht.act.lead.6")),n(3),c(o(242,310,"ht.act.lead.7")),n(3),h("href","#"+i.helpTextSequences.regActIndx[2],f),n(2),c(o(247,312,"return.instruction")),n(2),v(" ",i.helpTextSequences.regActIndx[0]," "),n(4),S("",o(253,314,"Instruction")," ",i.helpTextSequences.yearChangeIndx[0],""),n(2),h("id",i.helpTextSequences.yearChangeIndx[1]),n(3),S("",o(258,316,"section.show.option"),"",o(259,318,"year.change"),""),n(4),c(o(262,320,"ht.year.change.1")),n(4),v("",o(266,322,"ht.year.change.2")," "),n(2),w("href",o(268,324,"ht.year.change.url.1"),f),n(2),c(o(270,326,"ht.year.change.3")),n(3),v("",o(273,328,"ht.year.change.2")," "),n(2),w("href",o(275,330,"ht.year.change.url.2"),f),n(2),c(o(277,332,"ht.year.change.4")),n(3),c(o(280,334,"ht.year.change.5")),n(4),w("href",o(284,336,"ht.year.change.url.3"),f),n(2),c(o(286,338,"ht.year.change.6")),n(3),w("href",o(289,340,"ht.year.change.url.4"),f),n(2),c(o(291,342,"ht.year.change.7")),n(3),c(o(294,344,"ht.year.change.8")),n(3),c(o(297,346,"ht.year.change.13")),n(4),c(o(301,348,"ht.year.change.9")),n(3),h("href","#"+i.helpTextSequences.yearChangeIndx[2],f),n(2),c(o(306,350,"return.instruction")),n(2),v(" ",i.helpTextSequences.yearChangeIndx[0]," "),n(4),S("",o(312,352,"Instruction")," ",i.helpTextSequences.briefDescIndx[0],""),n(2),h("id",i.helpTextSequences.briefDescIndx[1]),n(3),S("",o(317,354,"section.show.option"),"",o(318,356,"brief.desc.change"),""),n(4),c(o(321,358,"ht.desc.change.1")),n(3),c(o(324,360,"ht.desc.change.2")),n(3),c(o(327,362,"ht.desc.change.3")),n(3),c(o(330,364,"ht.desc.change.4")),n(3),h("href","#"+i.helpTextSequences.briefDescIndx[2],f),n(2),c(o(335,366,"return.instruction")),n(2),v(" ",i.helpTextSequences.briefDescIndx[0]," "),n(4),S("",o(341,368,"Instruction")," ",i.helpTextSequences.requestSoliIndx[0],""),n(2),h("id",i.helpTextSequences.requestSoliIndx[1]),n(3),S("",o(346,370,"section.show.option"),"",o(347,372,"solicited.rq"),""),n(4),c(o(350,374,"ht.req.sol")),n(3),h("href","#"+i.helpTextSequences.requestSoliIndx[2],f),n(2),c(o(355,376,"return.instruction")),n(2),v(" ",i.helpTextSequences.requestSoliIndx[0]," "),n(4),S("",o(361,378,"Instruction")," ",i.helpTextSequences.ctrlNumIndx[0],""),n(2),h("id",i.helpTextSequences.ctrlNumIndx[1]),n(3),c(o(366,380,"ctrl.num")),n(2),h("lang",i.lang),n(2),h("href","#"+i.helpTextSequences.ctrlNumIndx[2],f),n(2),c(o(372,382,"return.instruction")),n(2),v(" ",i.helpTextSequences.ctrlNumIndx[0]," "),n(4),S("",o(378,384,"Instruction")," ",i.helpTextSequences.feesIndx[0],""),n(2),h("id",i.helpTextSequences.feesIndx[1]),n(3),S("",o(383,386,"section.show.option"),"",o(384,388,"regulatory.fees"),""),n(4),c(o(387,390,"ht.fees.1")),n(2),h("innerHTML",o(389,392,"ht.fees.2"),Y),n(3),h("href","#"+i.helpTextSequences.feesIndx[2],f),n(2),c(o(394,394,"return.instruction")),n(2),v(" ",i.helpTextSequences.feesIndx[0]," "),n(4),S("",o(400,396,"Instruction")," ",i.helpTextSequences.regContactIndx[0],""),n(2),h("id",i.helpTextSequences.regContactIndx[1]),n(3),c(o(405,398,"panel.title.reg.contact")),n(3),c(o(408,400,"ht.contact.1")),n(3),c(o(411,402,"ht.contact.4")),n(3),c(o(414,404,"ht.contact.6")),n(3),c(o(417,406,"ht.contact.7")),n(3),h("href","#"+i.helpTextSequences.regContactIndx[2],f),n(2),c(o(422,408,"return.instruction")),n(2),v(" ",i.helpTextSequences.regContactIndx[0]," "),n(4),S("",o(428,410,"Instruction")," ",i.helpTextSequences.genFinalIndx[0],""),n(2),h("id",i.helpTextSequences.genFinalIndx[1]),n(3),c(o(433,412,"generate.final")),n(3),c(o(436,414,"ht.xml.3")),n(4),c(o(440,416,"ht.xml.4")),n(3),c(o(443,418,"ht.xml.5")),n(3),c(o(446,420,"ht.xml.2")),n(3),h("href","#"+i.helpTextSequences.genFinalIndx[2],f),n(2),c(o(451,422,"return.instruction")),n(2),v(" ",i.helpTextSequences.genFinalIndx[0]," "))},dependencies:[A,R,P,rt,nt],encapsulation:2})}}return d})();var ne=(()=>{class d{constructor(e,t){this._dataService=e,this._utilsService=t,this.keywordsJsonPath=E+"keywords.json",this.countriesJsonPath=E+"countries.json",this.provincesJsonPath=E+"provinces.json",this.statesJsonPath=E+"states.json",this.dossierTypesJsonPath=E+"dossierTypes.json",this.raLeadsJsonPath=E+"raLeads.json",this.raTypesJsonPath=E+"raTypes.json",this.transactionDescriptionsJsonPath=E+"transactionDescriptions.json",this.raLeadRaTypeAndTxnDescrJsonPath=E+"raLeadRaTypeAndTxnDescrs.json",this.adminSubTypesJsonPath=E+"adminSubTypes.json",this.submissionClassesJsonPath=E+"submissionClasses.json",this.mitigationTypesJsonPath=E+"mitigationTypes.json"}getCountryList(e){return this.cachedCountries$||(this.cachedCountries$=this._dataService.getSortedDataAccents(this.countriesJsonPath,this._utilsService.getCompareFields(!1,e)).pipe(I(1))),this.cachedCountries$}getProvinceList(e){return this.cachedProvinces$||(this.cachedProvinces$=this._dataService.getSortedDataAccents(this.provincesJsonPath,this._utilsService.getCompareFields(!1,e)).pipe(I(1))),this.cachedProvinces$}getStateList(e){return this.cachedStates$||(this.cachedStates$=this._dataService.getSortedDataAccents(this.statesJsonPath,this._utilsService.getCompareFields(!1,e)).pipe(I(1))),this.cachedStates$}getDossierTypes(){return this.dossierTypes$=this._dataService.getData(this.dossierTypesJsonPath).pipe(I(1)),this.dossierTypes$}getRaLeads(){return this.raLeads$||(this.raLeads$=this._dataService.getData(this.raLeadsJsonPath).pipe(I(1))),this.raLeads$}getRaTypes(){return this.raTypes$||(this.raTypes$=this._dataService.getData(this.raTypesJsonPath).pipe(I(1))),this.raTypes$}getTransactionDescriptions(){return this.transactionDescriptions$||(this.transactionDescriptions$=this._dataService.getData(this.transactionDescriptionsJsonPath).pipe(I(1))),this.transactionDescriptions$}getDossierTypeAndRaLeads(){return this.dossierTypeAndRaLeadsRelationship$||(this.dossierTypeAndRaLeadsRelationship$=this._dataService.getData(E+"dossierTypeAndRaLeads.json").pipe(I(1))),this.dossierTypeAndRaLeadsRelationship$}getRaLeadAndRaTypes(){return this.raLeadAndRaTypesRelationship$||(this.raLeadAndRaTypesRelationship$=this._dataService.getData(E+"raLeadAndRaTypes.json").pipe(I(1))),this.raLeadAndRaTypesRelationship$}geRaLeadRaTypeAndTransactionDescriptions(){return this.raLeadRaTypeAndTxnDescrs$||(this.raLeadRaTypeAndTxnDescrs$=this._dataService.getData(this.raLeadRaTypeAndTxnDescrJsonPath).pipe(I(1))),this.raLeadRaTypeAndTxnDescrs$}getYesNoList(){return this.cachedYesNo$||(this.cachedYesNo$=this._dataService.getData(this.keywordsJsonPath).pipe(j(e=>e.find(t=>t.name==="yesno")?.data||[]),I(1))),this.cachedYesNo$}getLanguageList(){return this.cachedLanguageList$||(this.cachedLanguageList$=this._dataService.getData(this.keywordsJsonPath).pipe(j(e=>e.find(t=>t.name==="languages")?.data||[]),I(1))),this.cachedLanguageList$}getAdminSubTypes(e){return this.cachedAdminSubTypes$=this._dataService.getSortedDataAccents(this.adminSubTypesJsonPath,this._utilsService.getCompareFields(!1,e)).pipe(I(1)),this.cachedAdminSubTypes$}getSubmissionClasses(){return this.submissionClasses$=this._dataService.getData(this.submissionClassesJsonPath).pipe(I(1)),this.submissionClasses$}getMitigationTypes(){return this.mitigationTypes$||(this.mitigationTypes$=this._dataService.getData(this.mitigationTypesJsonPath).pipe(I(1))),this.mitigationTypes$}getCountryIdMapping(){return this.countryIdMapping$||(this.countryIdMapping$=this._dataService.getData(E+"countryIdMapping.json").pipe(I(1))),this.countryIdMapping$}static{this.\u0275fac=function(t){return new(t||d)(g(Ge),g(Ye))}}static{this.\u0275prov=D({token:d,factory:d.\u0275fac})}}return d})();var Vt=()=>[import("./chunk-P2K42HEQ.js").then(d=>d.FormBaseComponent)];function Jt(d,l){d&1&&b(0,"app-form-base")}var gt=(()=>{class d{constructor(e,t){this._globalService=e,this._formDataLoader=t,this.devEnv=!1,this.loadFormBaseComponent=!1,this.dataSources=[this._formDataLoader.getCountryList(this._globalService.currLanguage),this._formDataLoader.getProvinceList(this._globalService.currLanguage),this._formDataLoader.getStateList(this._globalService.currLanguage),this._formDataLoader.getDossierTypes(),this._formDataLoader.getRaLeads(),this._formDataLoader.getRaTypes(),this._formDataLoader.getTransactionDescriptions(),this._formDataLoader.getDossierTypeAndRaLeads(),this._formDataLoader.getRaLeadAndRaTypes(),this._formDataLoader.geRaLeadRaTypeAndTransactionDescriptions(),this._formDataLoader.getYesNoList(),this._formDataLoader.getAdminSubTypes(this._globalService.currLanguage),this._formDataLoader.getSubmissionClasses(),this._formDataLoader.getMitigationTypes(),this._formDataLoader.getLanguageList(),this._formDataLoader.getCountryIdMapping()]}ngOnInit(){this.language=this._globalService.currLanguage,this.helpIndex=this._globalService.helpIndex,this.devEnv=this._globalService.devEnv,Z(this.dataSources).subscribe(e=>{this._globalService.countryList=e[0],this._globalService.provinceList=e[1],this._globalService.stateList=e[2],this._globalService.dossierTypes=e[3],this._globalService.raLeads=e[4],this._globalService.raTypes=e[5],this._globalService.transactionDescriptions=e[6],this._globalService.dossierTypeAndRaLeadsRelationship=e[7],this._globalService.raLeadAndRaTypesRelationship=e[8],this._globalService.raLeadRaTypeAndTxnDescrs=e[9],this._globalService.yesnoList=e[10],this._globalService.adminSubTypes=e[11],this._globalService.submissionClasses=e[12],this._globalService.mitigationTypes=e[13],this._globalService.languageList=e[14],this._globalService.countryIdMappingList=e[15],this.loadFormBaseComponent=!0})}static{this.\u0275fac=function(t){return new(t||d)(C(K),C(ne))}}static{this.\u0275cmp=B({type:d,selectors:[["app-container"]],standalone:!0,features:[Be([ne]),O],decls:24,vars:14,consts:[["header",""],[1,"module-attention"],[1,"background-medium"],[3,"lang"],[3,"helpTextSequences","lang"],["body",""]],template:function(t,i){t&1&&(a(0,"lib-layout"),le(1,0),a(2,"section",1)(3,"details")(4,"summary",2),r(5),s(6,"translate"),p(),b(7,"pb-lib-privacy-statement",3),p()(),a(8,"div",1)(9,"details")(10,"summary",2),r(11),s(12,"translate"),p(),b(13,"lib-security-disclaimer",3),p()(),a(14,"section",1)(15,"details")(16,"summary",2),r(17),s(18,"translate"),p(),b(19,"app-instruction",4),p()(),de(),le(20,5),Re(21,Jt,1,0),_e(22,21,Vt),de(),p()),t&2&&(n(5),c(o(6,8,"top.privacy.statement")),n(2),h("lang",i.language),n(4),c(o(12,10,"top.security.declaimer")),n(2),h("lang",i.language),n(4),c(o(18,12,"top.instruction")),n(2),h("helpTextSequences",i.helpIndex)("lang",i.language),n(3),Le(i.loadFormBaseComponent))},dependencies:[A,R,P,Je,We,Ke,St,at],encapsulation:2})}}return d})();var yt=(()=>{class d{constructor(e,t,i,u,m){this.translate=e,this._versionService=t,this.titleService=i,this._globalService=u,this._instructionService=m,this.language=Ze,this.appVersion="0.0.0",e.setDefaultLang(this.language),this.language=V.lang,e.use(this.language),this._globalService.currLanguage=this.language,this._globalService.helpIndex=this._instructionService.createHelpSequence(et,tt,it),this._globalService.appVersion=this._versionService.getApplicationVersion(V),this._globalService.devEnv=!V.production,this._globalService.byPassChecksum=V.byPassCheckSum,this.translate.get("form.title").subscribe(y=>{this.setTitle(y)}),this.appVersion=this._globalService.appVersion}setTitle(e){this.titleService.setTitle(e)}static{this.\u0275fac=function(t){return new(t||d)(C(Ve),C(G),C(te),C(K),C(X))}}static{this.\u0275cmp=B({type:d,selectors:[["app-root"]],standalone:!0,features:[O],decls:8,vars:10,consts:[["property","name","id","wb-cont"],[1,"pagetag"],[3,"innerHTML"]],template:function(t,i){t&1&&(a(0,"h1",0),r(1),s(2,"translate"),s(3,"translate"),p(),a(4,"p",1),b(5,"strong",2),s(6,"translate"),p(),b(7,"app-container")),t&2&&(n(),Ae("",o(2,4,"form.title")," (",o(3,6,"version")," ",i.appVersion,")"),n(4),h("innerHTML",o(6,8,"top.fromHC"),Y))},dependencies:[A,R,P,gt],encapsulation:2})}}return d})();ht(yt,mt).catch(d=>console.error(d));