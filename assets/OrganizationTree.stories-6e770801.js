import{B as Ot}from"./button-db55860c.js";import{e as gt,o as f,g as w,n as G,u as D,k as u,F as P,D as M,C as Lt,v as z,m as R,j as v,s as Rt,q as X,f as J,T as Ht}from"./vue.esm-bundler-1a22c5b9.js";import{_ as yt}from"./_plugin-vue_export-helper-c27b6911.js";import"./tooltip-6a7924cb.js";const N=(t,e)=>t<1?{x:e.x+3,y:e.y}:t>=1&&t<=3?{x:e.x,y:e.y+3}:t>=4&&t<=6?{x:e.x,y:e.y-3}:{x:e.x-3,y:e.y},H=t=>{const e=[...t.points||[]];if(e.length){const n=e.map((s,r)=>r===e.length-1?`L ${t.pathObject.to.x} ${t.pathObject.to.y}`:`L ${e[r+1].x} ${e[r+1].y}`).join(" "),o=`M ${t.pathObject.from.x} ${t.pathObject.from.y} L ${e[0].x} ${e[0].y} ${n}`;return{...t,path:o}}return{...t,path:`M ${t.pathObject.from.x} ${t.pathObject.from.y} L ${t.pathObject.to.x} ${t.pathObject.to.y}`}},Ft=(t,e,n,o)=>{const{canvasHeight:s,canvasWidth:r,x:a,y:i}=o;return[...t].map(h=>{if([...h.connections||[]].some(p=>p.from.item===e||p.to.item===e)){const p=[...h.connections||[]].map(d=>{if(d.from.item===e||d.to.item===e){const g=document.getElementById(`${n}-org-item-${d.from.item}-io-${d.from.io}`),y=document.getElementById(`${n}-org-item-${d.to.item}-io-${d.to.io}`);if(g&&y){const{height:$,width:l,x:S,y:E}=g.getBoundingClientRect().toJSON(),{height:I,width:U,x:Mt,y:Dt}=y.getBoundingClientRect().toJSON(),It=l/2+(S-a)*r,kt=$/2+(E-i)*s,Tt=U/2+(Mt-a)*r,Bt=I/2+(Dt-i)*s;return{...H({...d,pathObject:{from:{...N(d.from.io,{x:It,y:kt})},to:{...N(d.to.io,{x:Tt,y:Bt})}}})}}}return d});return{...h,connections:[...p]}}return h})};function jt(t,e){if(t.match(/^[a-z]+:\/\//i))return t;if(t.match(/^\/\//))return window.location.protocol+t;if(t.match(/^[a-z]+:/i))return t;const n=document.implementation.createHTMLDocument(),o=n.createElement("base"),s=n.createElement("a");return n.head.appendChild(o),n.body.appendChild(s),e&&(o.href=e),s.href=t,s.href}const At=(()=>{let t=0;const e=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(t+=1,`u${e()}${t}`)})();function C(t){const e=[];for(let n=0,o=t.length;n<o;n++)e.push(t[n]);return e}function F(t,e){const o=(t.ownerDocument.defaultView||window).getComputedStyle(t).getPropertyValue(e);return o?parseFloat(o.replace("px","")):0}function Gt(t){const e=F(t,"border-left-width"),n=F(t,"border-right-width");return t.clientWidth+e+n}function zt(t){const e=F(t,"border-top-width"),n=F(t,"border-bottom-width");return t.clientHeight+e+n}function wt(t,e={}){const n=e.width||Gt(t),o=e.height||zt(t);return{width:n,height:o}}function Zt(){let t,e;try{e=process}catch{}const n=e&&e.env?e.env.devicePixelRatio:null;return n&&(t=parseInt(n,10),Number.isNaN(t)&&(t=1)),t||window.devicePixelRatio||1}const b=16384;function Yt(t){(t.width>b||t.height>b)&&(t.width>b&&t.height>b?t.width>t.height?(t.height*=b/t.width,t.width=b):(t.width*=b/t.height,t.height=b):t.width>b?(t.height*=b/t.width,t.width=b):(t.width*=b/t.height,t.height=b))}function j(t){return new Promise((e,n)=>{const o=new Image;o.decode=()=>e(o),o.onload=()=>e(o),o.onerror=n,o.crossOrigin="anonymous",o.decoding="async",o.src=t})}async function Vt(t){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then(e=>`data:image/svg+xml;charset=utf-8,${e}`)}async function Wt(t,e,n){const o="http://www.w3.org/2000/svg",s=document.createElementNS(o,"svg"),r=document.createElementNS(o,"foreignObject");return s.setAttribute("width",`${e}`),s.setAttribute("height",`${n}`),s.setAttribute("viewBox",`0 0 ${e} ${n}`),r.setAttribute("width","100%"),r.setAttribute("height","100%"),r.setAttribute("x","0"),r.setAttribute("y","0"),r.setAttribute("externalResourcesRequired","true"),s.appendChild(r),r.appendChild(t),Vt(s)}const x=(t,e)=>{if(t instanceof e)return!0;const n=Object.getPrototypeOf(t);return n===null?!1:n.constructor.name===e.name||x(n,e)};function qt(t){const e=t.getPropertyValue("content");return`${t.cssText} content: '${e.replace(/'|"/g,"")}';`}function Ut(t){return C(t).map(e=>{const n=t.getPropertyValue(e),o=t.getPropertyPriority(e);return`${e}: ${n}${o?" !important":""};`}).join(" ")}function Xt(t,e,n){const o=`.${t}:${e}`,s=n.cssText?qt(n):Ut(n);return document.createTextNode(`${o}{${s}}`)}function K(t,e,n){const o=window.getComputedStyle(t,n),s=o.getPropertyValue("content");if(s===""||s==="none")return;const r=At();try{e.className=`${e.className} ${r}`}catch{return}const a=document.createElement("style");a.appendChild(Xt(r,n,o)),e.appendChild(a)}function Jt(t,e){K(t,e,":before"),K(t,e,":after")}const Q="application/font-woff",_="image/jpeg",Nt={woff:Q,woff2:Q,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:_,jpeg:_,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function Kt(t){const e=/\.([^./]*?)$/g.exec(t);return e?e[1]:""}function W(t){const e=Kt(t).toLowerCase();return Nt[e]||""}function Qt(t){return t.split(/,/)[1]}function Y(t){return t.search(/^(data:)/)!==-1}function xt(t,e){return`data:${e};base64,${t}`}async function bt(t,e,n){const o=await fetch(t,e);if(o.status===404)throw new Error(`Resource "${o.url}" not found`);const s=await o.blob();return new Promise((r,a)=>{const i=new FileReader;i.onerror=a,i.onloadend=()=>{try{r(n({res:o,result:i.result}))}catch(c){a(c)}},i.readAsDataURL(s)})}const Z={};function _t(t,e,n){let o=t.replace(/\?.*/,"");return n&&(o=t),/ttf|otf|eot|woff2?/i.test(o)&&(o=o.replace(/.*\//,"")),e?`[${e}]${o}`:o}async function q(t,e,n){const o=_t(t,e,n.includeQueryParams);if(Z[o]!=null)return Z[o];n.cacheBust&&(t+=(/\?/.test(t)?"&":"?")+new Date().getTime());let s;try{const r=await bt(t,n.fetchRequestInit,({res:a,result:i})=>(e||(e=a.headers.get("Content-Type")||""),Qt(i)));s=xt(r,e)}catch(r){s=n.imagePlaceholder||"";let a=`Failed to fetch resource: ${t}`;r&&(a=typeof r=="string"?r:r.message),a&&console.warn(a)}return Z[o]=s,s}async function te(t){const e=t.toDataURL();return e==="data:,"?t.cloneNode(!1):j(e)}async function ee(t,e){if(t.currentSrc){const r=document.createElement("canvas"),a=r.getContext("2d");r.width=t.clientWidth,r.height=t.clientHeight,a==null||a.drawImage(t,0,0,r.width,r.height);const i=r.toDataURL();return j(i)}const n=t.poster,o=W(n),s=await q(n,o,e);return j(s)}async function ne(t){var e;try{if(!((e=t==null?void 0:t.contentDocument)===null||e===void 0)&&e.body)return await A(t.contentDocument.body,{},!0)}catch{}return t.cloneNode(!1)}async function oe(t,e){return x(t,HTMLCanvasElement)?te(t):x(t,HTMLVideoElement)?ee(t,e):x(t,HTMLIFrameElement)?ne(t):t.cloneNode(!1)}const ie=t=>t.tagName!=null&&t.tagName.toUpperCase()==="SLOT";async function se(t,e,n){var o,s;let r=[];return ie(t)&&t.assignedNodes?r=C(t.assignedNodes()):x(t,HTMLIFrameElement)&&(!((o=t.contentDocument)===null||o===void 0)&&o.body)?r=C(t.contentDocument.body.childNodes):r=C(((s=t.shadowRoot)!==null&&s!==void 0?s:t).childNodes),r.length===0||x(t,HTMLVideoElement)||await r.reduce((a,i)=>a.then(()=>A(i,n)).then(c=>{c&&e.appendChild(c)}),Promise.resolve()),e}function re(t,e){const n=e.style;if(!n)return;const o=window.getComputedStyle(t);o.cssText?(n.cssText=o.cssText,n.transformOrigin=o.transformOrigin):C(o).forEach(s=>{let r=o.getPropertyValue(s);s==="font-size"&&r.endsWith("px")&&(r=`${Math.floor(parseFloat(r.substring(0,r.length-2)))-.1}px`),x(t,HTMLIFrameElement)&&s==="display"&&r==="inline"&&(r="block"),s==="d"&&e.getAttribute("d")&&(r=`path(${e.getAttribute("d")})`),n.setProperty(s,r,o.getPropertyPriority(s))})}function ae(t,e){x(t,HTMLTextAreaElement)&&(e.innerHTML=t.value),x(t,HTMLInputElement)&&e.setAttribute("value",t.value)}function ce(t,e){if(x(t,HTMLSelectElement)){const n=e,o=Array.from(n.children).find(s=>t.value===s.getAttribute("value"));o&&o.setAttribute("selected","")}}function le(t,e){return x(e,Element)&&(re(t,e),Jt(t,e),ae(t,e),ce(t,e)),e}async function he(t,e){const n=t.querySelectorAll?t.querySelectorAll("use"):[];if(n.length===0)return t;const o={};for(let r=0;r<n.length;r++){const i=n[r].getAttribute("xlink:href");if(i){const c=t.querySelector(i),h=document.querySelector(i);!c&&h&&!o[i]&&(o[i]=await A(h,e,!0))}}const s=Object.values(o);if(s.length){const r="http://www.w3.org/1999/xhtml",a=document.createElementNS(r,"svg");a.setAttribute("xmlns",r),a.style.position="absolute",a.style.width="0",a.style.height="0",a.style.overflow="hidden",a.style.display="none";const i=document.createElementNS(r,"defs");a.appendChild(i);for(let c=0;c<s.length;c++)i.appendChild(s[c]);t.appendChild(a)}return t}async function A(t,e,n){return!n&&e.filter&&!e.filter(t)?null:Promise.resolve(t).then(o=>oe(o,e)).then(o=>se(t,o,e)).then(o=>le(t,o)).then(o=>he(o,e))}const St=/url\((['"]?)([^'"]+?)\1\)/g,me=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,de=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function ue(t){const e=t.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`,"g")}function fe(t){const e=[];return t.replace(St,(n,o,s)=>(e.push(s),n)),e.filter(n=>!Y(n))}async function pe(t,e,n,o,s){try{const r=n?jt(e,n):e,a=W(e);let i;if(s){const c=await s(r);i=xt(c,a)}else i=await q(r,a,o);return t.replace(ue(e),`$1${i}$3`)}catch{}return t}function ge(t,{preferredFontFormat:e}){return e?t.replace(de,n=>{for(;;){const[o,,s]=me.exec(n)||[];if(!s)return"";if(s===e)return`src: ${o};`}}):t}function $t(t){return t.search(St)!==-1}async function Ct(t,e,n){if(!$t(t))return t;const o=ge(t,n);return fe(o).reduce((r,a)=>r.then(i=>pe(i,a,e,n)),Promise.resolve(o))}async function k(t,e,n){var o;const s=(o=e.style)===null||o===void 0?void 0:o.getPropertyValue(t);if(s){const r=await Ct(s,null,n);return e.style.setProperty(t,r,e.style.getPropertyPriority(t)),!0}return!1}async function ye(t,e){await k("background",t,e)||await k("background-image",t,e),await k("mask",t,e)||await k("mask-image",t,e)}async function we(t,e){const n=x(t,HTMLImageElement);if(!(n&&!Y(t.src))&&!(x(t,SVGImageElement)&&!Y(t.href.baseVal)))return;const o=n?t.src:t.href.baseVal,s=await q(o,W(o),e);await new Promise((r,a)=>{t.onload=r,t.onerror=a;const i=t;i.decode&&(i.decode=r),i.loading==="lazy"&&(i.loading="eager"),n?(t.srcset="",t.src=s):t.href.baseVal=s})}async function xe(t,e){const o=C(t.childNodes).map(s=>Pt(s,e));await Promise.all(o).then(()=>t)}async function Pt(t,e){x(t,Element)&&(await ye(t,e),await we(t,e),await xe(t,e))}function be(t,e){const{style:n}=t;e.backgroundColor&&(n.backgroundColor=e.backgroundColor),e.width&&(n.width=`${e.width}px`),e.height&&(n.height=`${e.height}px`);const o=e.style;return o!=null&&Object.keys(o).forEach(s=>{n[s]=o[s]}),t}const tt={};async function et(t){let e=tt[t];if(e!=null)return e;const o=await(await fetch(t)).text();return e={url:t,cssText:o},tt[t]=e,e}async function nt(t,e){let n=t.cssText;const o=/url\(["']?([^"')]+)["']?\)/g,r=(n.match(/url\([^)]+\)/g)||[]).map(async a=>{let i=a.replace(o,"$1");return i.startsWith("https://")||(i=new URL(i,t.url).href),bt(i,e.fetchRequestInit,({result:c})=>(n=n.replace(a,`url(${c})`),[a,c]))});return Promise.all(r).then(()=>n)}function ot(t){if(t==null)return[];const e=[],n=/(\/\*[\s\S]*?\*\/)/gi;let o=t.replace(n,"");const s=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const c=s.exec(o);if(c===null)break;e.push(c[0])}o=o.replace(s,"");const r=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,a="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",i=new RegExp(a,"gi");for(;;){let c=r.exec(o);if(c===null){if(c=i.exec(o),c===null)break;r.lastIndex=i.lastIndex}else i.lastIndex=r.lastIndex;e.push(c[0])}return e}async function Se(t,e){const n=[],o=[];return t.forEach(s=>{if("cssRules"in s)try{C(s.cssRules||[]).forEach((r,a)=>{if(r.type===CSSRule.IMPORT_RULE){let i=a+1;const c=r.href,h=et(c).then(m=>nt(m,e)).then(m=>ot(m).forEach(p=>{try{s.insertRule(p,p.startsWith("@import")?i+=1:s.cssRules.length)}catch(d){console.error("Error inserting rule from remote css",{rule:p,error:d})}})).catch(m=>{console.error("Error loading remote css",m.toString())});o.push(h)}})}catch(r){const a=t.find(i=>i.href==null)||document.styleSheets[0];s.href!=null&&o.push(et(s.href).then(i=>nt(i,e)).then(i=>ot(i).forEach(c=>{a.insertRule(c,s.cssRules.length)})).catch(i=>{console.error("Error loading remote stylesheet",i)})),console.error("Error inlining remote css file",r)}}),Promise.all(o).then(()=>(t.forEach(s=>{if("cssRules"in s)try{C(s.cssRules||[]).forEach(r=>{n.push(r)})}catch(r){console.error(`Error while reading CSS rules from ${s.href}`,r)}}),n))}function $e(t){return t.filter(e=>e.type===CSSRule.FONT_FACE_RULE).filter(e=>$t(e.style.getPropertyValue("src")))}async function Ce(t,e){if(t.ownerDocument==null)throw new Error("Provided element is not within a Document");const n=C(t.ownerDocument.styleSheets),o=await Se(n,e);return $e(o)}async function Pe(t,e){const n=await Ce(t,e);return(await Promise.all(n.map(s=>{const r=s.parentStyleSheet?s.parentStyleSheet.href:null;return Ct(s.cssText,r,e)}))).join(`
`)}async function ve(t,e){const n=e.fontEmbedCSS!=null?e.fontEmbedCSS:e.skipFonts?null:await Pe(t,e);if(n){const o=document.createElement("style"),s=document.createTextNode(n);o.appendChild(s),t.firstChild?t.insertBefore(o,t.firstChild):t.appendChild(o)}}async function Ee(t,e={}){const{width:n,height:o}=wt(t,e),s=await A(t,e,!0);return await ve(s,e),await Pt(s,e),be(s,e),await Wt(s,n,o)}async function Me(t,e={}){const{width:n,height:o}=wt(t,e),s=await Ee(t,e),r=await j(s),a=document.createElement("canvas"),i=a.getContext("2d"),c=e.pixelRatio||Zt(),h=e.canvasWidth||n,m=e.canvasHeight||o;return a.width=h*c,a.height=m*c,e.skipAutoScale||Yt(a),a.style.width=`${h}`,a.style.height=`${m}`,e.backgroundColor&&(i.fillStyle=e.backgroundColor,i.fillRect(0,0,a.width,a.height)),i.drawImage(r,0,0,a.width,a.height),a}async function De(t,e={}){return(await Me(t,e)).toDataURL()}const vt=gt({emits:{changePoint:(t,e)=>!0,dragItem:t=>!0,dragConnection:(t,e)=>!0,dragPoint:(t,e)=>!0,selectConnection:t=>!0},props:{canvasState:{required:!0,type:Object},connectorState:{required:!0,type:Object},isDragged:{required:!1,type:Boolean},isEditable:{required:!1,type:Boolean},item:{required:!0,type:Object},selectedConnection:{required:!1,type:String}},name:"sb-organization-tree-item",computed:{getItemPosition(){return{left:this.item.coordinates.x?`${this.item.coordinates.x}px`:0,top:this.item.coordinates.y?`${this.item.coordinates.y}px`:0}},isConnecting(){return this.connectorState.from?this.connectorState.from.split("-io-")[0]===this.$.vnode.key:!1}},methods:{getCoordinatesMove(t){return t.type==="touchstart"?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}},handleCircleDoubleClick(t,e){var n;if(this.isEditable){const o=[...this.item.connections||[]],s=[...((n=o[t])==null?void 0:n.points)||[]];s.splice(e,1);const r=H({...o[t],points:[...s]});o[t]={...r};const a=Number(String(this.$.vnode.key).split("-item-")[1]);this.$emit("changePoint",{...this.item,connections:[...o]},a)}},handleClickIO(t,e){const n=t.target;if(n&&this.isEditable){const o=n.getBoundingClientRect();this.$emit("dragConnection",`${String(this.$.vnode.key)}-io-${e}`,o)}},handleClickPoint(t,e,n){const o=t.target;if(o&&this.isEditable){const s=o.getBoundingClientRect();this.$emit("dragPoint",{connection:e,item:Number(String(this.$.vnode.key).split("-item-")[1]),point:n},s)}},handleConnectionClick(t){this.isEditable&&this.$emit("selectConnection",`${String(this.$.vnode.key)}-connection-${t}`)},handleConnectionDoubleClick(t,e){const n=[...this.item.connections||[]],{elem:o,zoom:s}=this.canvasState;if(o&&this.isEditable){const{height:r,width:a,x:i,y:c}=o.getBoundingClientRect().toJSON(),h=t.clientX,m=t.clientY,p=h*(a/(a*s))-i*(a/(a*s)),d=m*(r/(r*s))-c*(r/(r*s)),g=H({...n[e],points:[...n[e].points||[],{x:p,y:d}]});n[e]={...g};const y=Number(String(this.$.vnode.key).split("-item-")[1]);this.$emit("changePoint",{...this.item,connections:[...n]},y)}},handleItemClick(t){if(!t.target.classList.contains("io")&&this.isEditable){const n=this.getCoordinatesMove(t);this.$emit("dragItem",{coordinates:n,elem:this.$el.nextSibling,key:this.$.vnode.key})}}}}),Ie=["id"],ke=["id","onMousedown","onTouchstart"],Te=["id"],Be=["id","onMousedown","onTouchstart"],Oe={class:"data-wrapper"},Le={class:"name"},Re={class:"position"},He=["innerHTML"],Fe=["d","onClick","onDblclick"],je=["cx","cy","onDblclick","onMousedown","onTouchstart"];function Ae(t,e,n,o,s,r){return f(),w(P,null,[t.item.department?(f(),w("div",{key:0,class:G(["department",{connecting:t.isConnecting,draggable:t.isEditable,dragged:t.isDragged}]),id:String(t.$.vnode.key),style:D(t.getItemPosition),onMousedown:e[0]||(e[0]=u((...a)=>t.handleItemClick&&t.handleItemClick(...a),["stop"])),onTouchstart:e[1]||(e[1]=u((...a)=>t.handleItemClick&&t.handleItemClick(...a),["stop"]))},[(f(!0),w(P,null,M([...Array(8).keys()],a=>(f(),w("span",{class:"io",id:`${String(t.$.vnode.key)}-io-${a}`,key:`io-${a}`,onMousedown:u(i=>t.handleClickIO(i,a),["stop"]),onTouchstart:u(i=>t.handleClickIO(i,a),["stop"])},null,40,ke))),128)),Lt(" "+z(t.item.department),1)],46,Ie)):(f(),w("div",{key:1,class:G(["card",{connecting:t.isConnecting,draggable:t.isEditable,dragged:t.isDragged}]),id:String(t.$.vnode.key),style:D(t.getItemPosition),onMousedown:e[2]||(e[2]=u((...a)=>t.handleItemClick&&t.handleItemClick(...a),["stop"])),onTouchstart:e[3]||(e[3]=u((...a)=>t.handleItemClick&&t.handleItemClick(...a),["stop"]))},[(f(!0),w(P,null,M([...Array(8).keys()],a=>(f(),w("span",{class:"io",id:`${String(t.$.vnode.key)}-io-${a}`,key:`io-${a}`,onMousedown:u(i=>t.handleClickIO(i,a),["stop"]),onTouchstart:u(i=>t.handleClickIO(i,a),["stop"])},null,40,Be))),128)),t.item.photo?(f(),w("div",{key:0,class:"item-photo",style:D({backgroundImage:`url(${t.item.photo})`})},null,4)):R("",!0),v("div",Oe,[v("p",Le,z(t.item.name),1),v("p",Re,z(t.item.position),1),t.item.additionalInfo?(f(),w("div",{key:0,innerHTML:t.item.additionalInfo},null,8,He)):R("",!0)])],46,Te)),(f(!0),w(P,null,M(t.item.connections||[],(a,i)=>(f(),w("svg",{class:G(["connection",{editable:t.isEditable,selected:`${String(t.$.vnode.key)}-connection-${i}`===t.selectedConnection}]),xmlns:"http://www.w3.org/2000/svg",key:`${String(t.$.vnode.key)}-connection-${i}`},[v("path",{d:a.path,onClick:u(c=>t.handleConnectionClick(i),["stop"]),onDblclick:u(c=>t.handleConnectionDoubleClick(c,i),["stop"])},null,40,Fe),(f(!0),w(P,null,M(a.points||[],(c,h)=>(f(),w("circle",{class:"circle",r:"4",cx:c.x,cy:c.y,key:`${String(t.$.vnode.key)}-connection-${i}-circle-${h}`,onDblclick:u(m=>t.handleCircleDoubleClick(i,h),["stop"]),onMousedown:u(m=>t.handleClickPoint(m,i,h),["stop"]),onTouchstart:u(m=>t.handleClickPoint(m,i,h),["stop"])},null,40,je))),128))],2))),128))],64)}const Ge=yt(vt,[["render",Ae]]);vt.__docgenInfo={displayName:"sb-organization-tree-item",exportName:"default",description:"",tags:{},props:[{name:"canvasState",type:{name:"ICanvasState"},required:!0},{name:"connectorState",type:{name:"IConnectorState"},required:!0},{name:"isDragged",type:{name:"boolean"},required:!1},{name:"isEditable",type:{name:"boolean"},required:!1},{name:"item",type:{name:"IOrganizationTreeItem"},required:!0},{name:"selectedConnection",type:{name:"string | null"},required:!1}],events:[{name:"changePoint",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]},{name:"dragItem",type:{names:["undefined"]}},{name:"dragConnection",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]},{name:"dragPoint",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]},{name:"selectConnection",type:{names:["undefined"]}}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/organization-tree/__organization-tree-item.vue"]};const Et=gt({emits:{change:t=>!0},props:{isEditable:{required:!1,type:Boolean},list:{required:!0,type:Object}},name:"sb-organization-tree",components:{"sb-org-tree-item":Ge},data(){return{canvasState:{coordinates:{x:0,y:0},elem:null,lastZoom:1,zoom:1},canvasStyle:{},connectorState:{from:null,fromRect:null,toCoordinates:null},draggedItem:null,exportAreaStyle:{},isExporting:!1,localList:[],mouseState:{mouse:{x:0,y:0},position:{x:0,y:0},positionStart:{x:0,y:0}},parentPointerState:{events:[],prevDiff:-1},parentState:{isDrag:!1,position:{x:0,y:0}},pointState:{fromRect:null,target:null,toCoordinates:null},selectedConnection:null}},methods:{async doExport(){this.isExporting=!0,await new Promise(l=>setTimeout(()=>{l(!0)},200));const e=[...[...this.localList].flatMap(l=>l.connections?[...l.connections]:[])].flatMap(l=>l.points?[...l.points]:[]),n=[...this.localList].map((l,S)=>{const E=`${this.$.uid}-org-item-${S}`,I=document.getElementById(E);return I?I.getBoundingClientRect().toJSON():null}),o=[...n].map(l=>(l==null?void 0:l.x)||0),s=[...n].map(l=>((l==null?void 0:l.x)||0)+((l==null?void 0:l.width)||0)),r=[...n].map(l=>(l==null?void 0:l.y)||0),a=[...n].map(l=>((l==null?void 0:l.y)||0)+((l==null?void 0:l.height)||0)),i=[...[...e].map(l=>l.x),...o,...s],c=[...[...e].map(l=>l.y),...r,...a],h=Math.max.apply(null,i),m=Math.min.apply(null,i),p=Math.max.apply(null,c),d=Math.min.apply(null,c),g=Math.abs(d)+p,y=Math.abs(m)+h,$=this.canvasState.elem;if(this.exportAreaStyle={height:`${g+40}px`,width:`${y+40}px`},$){const l=$.cloneNode(!0);l.style.transform="none",l.style.background="transparent",l.style.height=`${g}px`,l.style.position="relative",l.style.width=`${y}px`;const S=document.getElementById(`${this.$.uid}-org-export-area`);if(S){S.appendChild(l);const E=await De(S,{style:{opacity:"1"}}).catch(()=>null);return l.remove(),this.isExporting=!1,E}}return null},doParentZoom(t){this.canvasState.zoom+=t,this.$nextTick(()=>this.doParentZoomRefresh())},doParentZoomRefresh(){const{coordinates:t,lastZoom:e,zoom:n}=this.canvasState,o=t.x/e*n,s=t.y/e*n;this.canvasState.lastZoom=n,this.canvasStyle={transform:`translate(${o}px, ${s}px) scale(${n})`}},doSetTempConnectionPath(){if(this.connectorState.toCoordinates&&this.connectorState.fromRect){const{x:t,y:e}=this.connectorState.toCoordinates,{height:n,width:o,x:s,y:r}=this.connectorState.fromRect,{zoom:a}=this.canvasState,i=this.getCanvasRect(),c=(i==null?void 0:i.height)||0,h=(i==null?void 0:i.width)||0,m=h/(h*a)||0,p=c/(c*a)||0,d=(i==null?void 0:i.x)||0,g=(i==null?void 0:i.y)||0,y=o/2+(s-d)*m,$=n/2+(r-g)*p,l=t*(h/(h*a))-d*(h/(h*a)),S=e*(c/(c*a))-g*(c/(c*a));this.connectorState.pathObject={from:{x:y,y:$},to:{x:l,y:S}},this.connectorState.path=`M ${y} ${$} L ${l} ${S}`}else this.connectorState.pathObject=void 0,this.connectorState.path=void 0},doUpdateConnections(t,e){const{zoom:n}=this.canvasState,o=this.getCanvasRect();if(o){const s=o.height||0,r=o.width||0,a=r/(r*n)||0,i=s/(s*n)||0;this.localList=[...Ft(e,t,String(this.$.uid),{canvasHeight:i,canvasWidth:a,x:o.x,y:o.y})]}},getCanvasRect(){return this.$refs["canvas-tree"]?{...this.$refs["canvas-tree"].getBoundingClientRect().toJSON()}:null},getCoordinatesEnd(t){return t.type==="touchend"?{x:this.mouseState.mouse.x,y:this.mouseState.mouse.y}:{x:t.clientX,y:t.clientY}},getCoordinatesMove(t){return t.type==="touchmove"||t.type==="touchstart"?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}},handleChangeItemPoint(t,e){this.localList[e]={...t},this.$nextTick(()=>this.$emit("change",this.localList))},handleConnectionDragged(t,e){this.connectorState.from=t,this.connectorState.fromRect={...e.toJSON()},this.selectedConnection=null},handleItemChangePosition(t){if(this.draggedItem){const e=Number(this.draggedItem.key.split("-item-")[1]),n=[...this.localList];n[e]={...this.localList[e],coordinates:t},this.$nextTick(()=>this.doUpdateConnections(e,n))}},handleItemDragged(t){this.draggedItem={...t},this.mouseState.position={...t.coordinates},this.selectedConnection=null},handleParentClick(t){const e=this.getCoordinatesMove(t);this.selectedConnection=null,this.mouseState.mouse={...e},this.mouseState.position={...e},this.mouseState.positionStart={...e},this.parentState.isDrag=!0},handleParentDragEnd(t){const{x:e,y:n}=this.getCoordinatesEnd(t),{coordinates:o}=this.canvasState,s=o.x+-(this.mouseState.position.x-e),r=o.y+-(this.mouseState.position.y-n);if(this.parentState.isDrag)this.canvasState.coordinates={x:s,y:r};else if(this.connectorState.from){const a=t.target;if(a.id!==this.connectorState.from&&!this.isConnectionExist(this.connectorState.from,a.id)){const c=this.connectorState.from.split("-io-")[0],h=Number(this.connectorState.from.split("-io-")[1]),m=Number(c.split("-item-")[1]),p=a.id.split("-io-")[0],d=Number(a.id.split("-io-")[1]),g=Number(p.split("-item-")[1]);if(this.localList[m]&&this.localList[g]&&this.connectorState.fromRect){const y=[...this.localList];y[m].connections=[...y[m].connections||[],{from:{io:h,item:m},to:{io:d,item:g},path:this.connectorState.path,pathObject:this.connectorState.pathObject}],this.$nextTick(()=>this.doUpdateConnections(m,y))}}}this.$nextTick(()=>{(this.draggedItem||this.pointState.target||this.connectorState.from)&&this.$nextTick(()=>this.$emit("change",this.localList)),this.parentState.isDrag=!1,this.draggedItem=null,this.connectorState={from:null,fromRect:null,path:void 0,toCoordinates:null},this.pointState={fromRect:null,target:null,toCoordinates:null}})},handleParentKeydown(t){if((t.key==="Delete"||t.key==="Backspace"&&t.metaKey)&&this.selectedConnection){const e=this.selectedConnection.split("-connection-"),n=Number(e[0].split("-item-")[1]),o=Number(e[1]);if(this.localList[n]){const s=[...this.localList[n].connections||[]];this.localList[n].connections=s.filter((r,a)=>a!==o),this.$nextTick(()=>this.$emit("change",this.localList))}}},handleParentPointerDown(t){this.parentPointerState.events.push(t)},handleParentPointerMove(t){this.parentPointerState.events=[...this.parentPointerState.events].map(e=>e.pointerId===t.pointerId?t:e),this.$nextTick(()=>{if(this.parentPointerState.events.length===2){const e=Math.abs(this.parentPointerState.events[0].clientX-this.parentPointerState.events[1].clientX);this.parentPointerState.prevDiff>100&&e>this.parentPointerState.prevDiff?this.doParentZoom(.1):this.parentPointerState.prevDiff>100&&e<this.parentPointerState.prevDiff&&this.doParentZoom(-.1),this.parentPointerState.prevDiff=e}})},handleParentPointerUp(t){this.parentPointerState.events=[...this.parentPointerState.events].filter(e=>e.pointerId!==t.pointerId),this.$nextTick(()=>{this.parentPointerState.events.length<2&&(this.parentPointerState.prevDiff=-1)})},handleParentPosition(t){const{x:e,y:n}=this.getCoordinatesMove(t),{coordinates:o,zoom:s}=this.canvasState,r=this.getCanvasRect();if(this.parentState.isDrag){const a=o.x+-(this.mouseState.position.x-e),i=o.y+-(this.mouseState.position.y-n);this.canvasStyle={transform:`translate(${a}px, ${i}px) scale(${s})`}}else if(this.draggedItem){t.preventDefault();const{x:a,y:i}=this.mouseState.position,c=(a-e)*((r==null?void 0:r.width)||0)/(((r==null?void 0:r.width)||0)*s),h=(i-n)*((r==null?void 0:r.height)||0)/(((r==null?void 0:r.height)||0)*s);this.handleItemChangePosition({x:this.draggedItem.elem.offsetLeft-c,y:this.draggedItem.elem.offsetTop-h}),this.$nextTick(()=>this.mouseState.position={x:e,y:n})}else if(this.connectorState.from)this.connectorState.toCoordinates={x:e,y:n},this.$nextTick(()=>this.doSetTempConnectionPath());else if(this.pointState.target&&this.canvasState.elem){const{height:a,width:i,x:c,y:h}=this.canvasState.elem.getBoundingClientRect().toJSON(),m=e*(i/(i*s))-c*(i/(i*s)),p=n*(a/(a*s))-h*(a/(a*s)),{target:d}=this.pointState,g=[...this.localList[d.item].connections||[]],y=[...g[d.connection].points||[]];y[d.point]={x:m,y:p};const $=H({...g[d.connection],points:[...y]});g[d.connection]={...$},this.localList[d.item].connections=[...g]}this.parentState.position={x:e,y:n},t.type==="touchmove"&&(this.mouseState.mouse={x:e,y:n})},handleParentZoom(t){t.ctrlKey&&(t.preventDefault(),t.deltaY>0&&this.canvasState.zoom>.5?this.doParentZoom(-.1):this.canvasState.zoom<1.6&&this.doParentZoom(.1))},handlePointDragged(t,e){this.pointState.target={...t},this.pointState.fromRect={...e.toJSON()}},handleSelectConnection(t){this.selectedConnection=t},isConnectionExist(t,e){return[...this.localList].flatMap(o=>o.connections?[...o.connections]:[]).some(o=>{const s=`${this.$.uid}-org-item-${o.from.item}-io-${o.from.io}`,r=`${this.$.uid}-org-item-${o.to.item}-io-${o.to.io}`;return t===s&&e===r||t===r&&e===s})},isItemDragged(t){var e;return((e=this.draggedItem)==null?void 0:e.key)===t}},watch:{list:{deep:!0,handler(t){this.localList=[...t]},immediate:!0}},mounted(){this.$refs["canvas-tree"]&&(this.canvasState.elem=this.$refs["canvas-tree"]),document.addEventListener("keydown",this.handleParentKeydown)},unmounted(){this.canvasState.elem=null,document.removeEventListener("keydown",this.handleParentKeydown)},expose:["doExport"]});const ze=["id"],Ze={key:0,class:"connection connecting",xmlns:"http://www.w3.org/2000/svg"},Ye=["d"],Ve=["id"];function We(t,e,n,o,s,r){const a=Rt("sb-org-tree-item");return f(),w(P,null,[v("div",X({class:[{connecting:t.connectorState.from,dragging:t.parentState.isDrag},"organization-wrapper"],id:`${t.$.uid}-org`},{...t.$attrs},{onMousedown:e[0]||(e[0]=u((...i)=>t.handleParentClick&&t.handleParentClick(...i),["stop"])),onMousemove:e[1]||(e[1]=u((...i)=>t.handleParentPosition&&t.handleParentPosition(...i),["stop"])),onMouseup:e[2]||(e[2]=u((...i)=>t.handleParentDragEnd&&t.handleParentDragEnd(...i),["stop"])),onPointercancel:e[3]||(e[3]=(...i)=>t.handleParentPointerUp&&t.handleParentPointerUp(...i)),onPointerdown:e[4]||(e[4]=(...i)=>t.handleParentPointerDown&&t.handleParentPointerDown(...i)),onPointerleave:e[5]||(e[5]=(...i)=>t.handleParentPointerUp&&t.handleParentPointerUp(...i)),onPointermove:e[6]||(e[6]=(...i)=>t.handleParentPointerMove&&t.handleParentPointerMove(...i)),onPointerout:e[7]||(e[7]=(...i)=>t.handleParentPointerUp&&t.handleParentPointerUp(...i)),onPointerup:e[8]||(e[8]=(...i)=>t.handleParentPointerUp&&t.handleParentPointerUp(...i)),onTouchend:e[9]||(e[9]=u((...i)=>t.handleParentDragEnd&&t.handleParentDragEnd(...i),["stop"])),onTouchmove:e[10]||(e[10]=u((...i)=>t.handleParentPosition&&t.handleParentPosition(...i),["stop"])),onTouchstart:e[11]||(e[11]=u((...i)=>t.handleParentClick&&t.handleParentClick(...i),["stop"])),onWheel:e[12]||(e[12]=u((...i)=>t.handleParentZoom&&t.handleParentZoom(...i),["stop"]))}),[v("div",{class:"canvas",ref:"canvas-tree",style:D(t.canvasStyle)},[(f(!0),w(P,null,M(t.localList,(i,c)=>(f(),J(a,X({"canvas-state":t.canvasState,"connector-state":t.connectorState,"is-dragged":t.isItemDragged(`${t.$.uid}-org-item-${c}`),key:`${t.$.uid}-org-item-${c}`},{isEditable:t.isEditable,item:i,...t.selectedConnection&&{selectedConnection:t.selectedConnection}},{onChangePoint:t.handleChangeItemPoint,onDragConnection:t.handleConnectionDragged,onDragItem:t.handleItemDragged,onDragPoint:t.handlePointDragged,onSelectConnection:t.handleSelectConnection}),null,16,["canvas-state","connector-state","is-dragged","onChangePoint","onDragConnection","onDragItem","onDragPoint","onSelectConnection"]))),128)),t.connectorState.from?(f(),w("svg",Ze,[v("path",{d:t.connectorState.path},null,8,Ye)])):R("",!0)],4)],16,ze),(f(),J(Ht,{to:"body"},[t.isExporting?(f(),w("div",{key:0,class:"export-area-org-chart",id:`${t.$.uid}-org-export-area`,style:D(t.exportAreaStyle)},null,12,Ve)):R("",!0)]))],64)}const V=yt(Et,[["render",We]]);Et.__docgenInfo={displayName:"sb-organization-tree",exportName:"default",description:"",tags:{},props:[{name:"isEditable",type:{name:"boolean"},required:!1},{name:"list",type:{name:"IOrganizationTreeItem[]"},required:!0}],events:[{name:"change",type:{names:["undefined"]}}],methods:[{name:"doExport",tags:{}}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/organization-tree/organization-tree.vue"]};const{UPDATE_STORY_ARGS:qe}=__STORYBOOK_MODULE_CORE_EVENTS__,Qe={title:"Components/Organization Tree",component:V,tags:["autodocs"],argTypes:{isEditable:{control:"boolean",description:"Is tree editable"},list:{control:"object",description:"Organization Tree items"},onChange:{action:"click",control:!1,description:"Fired when tree changed by user drag",table:{category:"events",type:{summary:"(list: IOrganizationTreeItem[]) => void"}},type:"function"}},args:{list:[{coordinates:{x:250,y:10},name:"Griffin Woldridge",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"CEO",connections:[{from:{io:5,item:0},to:{io:2,item:1},path:"M 360.5 80 L 362.5 123.5",pathObject:{from:{x:360.5,y:80},to:{x:362.5,y:123.5}}}]},{coordinates:{x:265,y:120},department:"Software Engineering",connections:[{from:{io:5,item:1},to:{io:2,item:2},path:"M 362.5 155 L 360.5 193.5",pathObject:{from:{x:362.5,y:155},to:{x:360.5,y:193.5}}}]},{coordinates:{x:250,y:190},name:"Ospan Ali",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Head of Software Engineering",connections:[{from:{io:0,item:2},to:{io:2,item:3},path:"M 253.5 227.5 L 141 228 L 140.5 323.5",pathObject:{from:{x:253.5,y:227.5},to:{x:140.5,y:323.5}},points:[{x:141,y:228}]},{from:{io:7,item:2},to:{io:3,item:4},path:"M 467.5 227.5 L 520 228 L 520.25 323.5",pathObject:{from:{x:467.5,y:227.5},to:{x:520.25,y:323.5}},points:[{x:520,y:228}]}]},{coordinates:{x:30,y:320},name:"Ellie",photo:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Jr. Software Engineer"},{coordinates:{x:360,y:320},name:"Owen",photo:"https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Software Engineer",connections:[{from:{io:4,item:4},to:{io:2,item:5},path:"M 420.75 390 L 380.5 443.5",pathObject:{from:{x:420.75,y:390},to:{x:380.5,y:443.5}}},{from:{io:6,item:4},to:{io:2,item:6},path:"M 520.25 390 L 670.5 443.5",pathObject:{from:{x:520.25,y:390},to:{x:670.5,y:443.5}}}]},{coordinates:{x:270,y:440},name:"David",photo:"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Front-End Engineer"},{coordinates:{x:560,y:440},name:"Motoki",photo:"https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Back-End Engineer"}]},decorators:[(t,e)=>(delete e.args.change,e.args.onChange=n=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(qe,{storyId:e.id,updatedArgs:{list:n}})},t())],parameters:{docs:{controls:{exclude:["change"],sort:"requiredFirst"}}},render:t=>({components:{OrganizationTree:V},setup(){return{args:t}},template:'<div style="height: 100vh; width: 100%; display: flex; justify-content: center; align-items: center;"><OrganizationTree v-bind="args" /></div>'})},T={args:{}},B={args:{isEditable:!0}},O={args:{list:[{coordinates:{x:250,y:10},name:"Griffin Woldridge",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"CEO",connections:[{from:{io:5,item:0},to:{io:2,item:1},path:"M 360.5 80 L 362.5 123.5",pathObject:{from:{x:360.5,y:80},to:{x:362.5,y:123.5}}}]},{coordinates:{x:265,y:120},department:"Software Engineering",connections:[{from:{io:5,item:1},to:{io:2,item:2},path:"M 362.5 155 L 360.5 193.5",pathObject:{from:{x:362.5,y:155},to:{x:360.5,y:193.5}}}]},{additionalInfo:'<p style="margin: 0;">additional info</p>',coordinates:{x:250,y:190},name:"Ospan Ali",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Head of Software Engineering",connections:[{from:{io:0,item:2},to:{io:2,item:3},path:"M 253.5 227.5 L 141 228 L 140.5 323.5",pathObject:{from:{x:253.5,y:227.5},to:{x:140.5,y:323.5}},points:[{x:141,y:228}]},{from:{io:7,item:2},to:{io:3,item:4},path:"M 467.5 227.5 L 520 228 L 520.25 323.5",pathObject:{from:{x:467.5,y:227.5},to:{x:520.25,y:323.5}},points:[{x:520,y:228}]}]},{coordinates:{x:30,y:320},name:"Ellie",photo:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Jr. Software Engineer"},{coordinates:{x:360,y:320},name:"Owen",photo:"https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Software Engineer",connections:[{from:{io:4,item:4},to:{io:2,item:5},path:"M 420.75 390 L 380.5 443.5",pathObject:{from:{x:420.75,y:390},to:{x:380.5,y:443.5}}},{from:{io:6,item:4},to:{io:2,item:6},path:"M 520.25 390 L 670.5 443.5",pathObject:{from:{x:520.25,y:390},to:{x:670.5,y:443.5}}}]},{coordinates:{x:270,y:440},name:"David",photo:"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Front-End Engineer"},{coordinates:{x:560,y:440},name:"Motoki",photo:"https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Back-End Engineer"}]}},L={args:{isEditable:!0},render:t=>({components:{Button:Ot,OrganizationTree:V},setup(){return{args:{...t,ref:"example-org-chart"}}},methods:{async onClickButton(){if(this.$refs["example-org-chart"]){const e=await this.$refs["example-org-chart"].doExport();console.log(e)}}},template:'<div style="height: 100vh; width: 100%; display: block; justify-content: center; align-items: center;"><Button color="accent" @click="onClickButton">Export See Console for result</Button><OrganizationTree v-bind="args" /></div>'})};var it,st,rt;T.parameters={...T.parameters,docs:{...(it=T.parameters)==null?void 0:it.docs,source:{originalSource:`{
  args: {}
}`,...(rt=(st=T.parameters)==null?void 0:st.docs)==null?void 0:rt.source}}};var at,ct,lt;B.parameters={...B.parameters,docs:{...(at=B.parameters)==null?void 0:at.docs,source:{originalSource:`{
  args: {
    isEditable: true
  }
}`,...(lt=(ct=B.parameters)==null?void 0:ct.docs)==null?void 0:lt.source}}};var ht,mt,dt;O.parameters={...O.parameters,docs:{...(ht=O.parameters)==null?void 0:ht.docs,source:{originalSource:`{
  args: {
    list: [{
      coordinates: {
        x: 250,
        y: 10
      },
      name: 'Griffin Woldridge',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
      position: 'CEO',
      connections: [{
        from: {
          io: 5,
          item: 0
        },
        to: {
          io: 2,
          item: 1
        },
        path: 'M 360.5 80 L 362.5 123.5',
        pathObject: {
          from: {
            x: 360.5,
            y: 80
          },
          to: {
            x: 362.5,
            y: 123.5
          }
        }
      }]
    }, {
      coordinates: {
        x: 265,
        y: 120
      },
      department: 'Software Engineering',
      connections: [{
        from: {
          io: 5,
          item: 1
        },
        to: {
          io: 2,
          item: 2
        },
        path: 'M 362.5 155 L 360.5 193.5',
        pathObject: {
          from: {
            x: 362.5,
            y: 155
          },
          to: {
            x: 360.5,
            y: 193.5
          }
        }
      }]
    }, {
      additionalInfo: '<p style="margin: 0;">additional info</p>',
      coordinates: {
        x: 250,
        y: 190
      },
      name: 'Ospan Ali',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
      position: 'Head of Software Engineering',
      connections: [{
        from: {
          io: 0,
          item: 2
        },
        to: {
          io: 2,
          item: 3
        },
        path: 'M 253.5 227.5 L 141 228 L 140.5 323.5',
        pathObject: {
          from: {
            x: 253.5,
            y: 227.5
          },
          to: {
            x: 140.5,
            y: 323.5
          }
        },
        points: [{
          x: 141,
          y: 228
        }]
      }, {
        from: {
          io: 7,
          item: 2
        },
        to: {
          io: 3,
          item: 4
        },
        path: 'M 467.5 227.5 L 520 228 L 520.25 323.5',
        pathObject: {
          from: {
            x: 467.5,
            y: 227.5
          },
          to: {
            x: 520.25,
            y: 323.5
          }
        },
        points: [{
          x: 520,
          y: 228
        }]
      }]
    }, {
      coordinates: {
        x: 30,
        y: 320
      },
      name: 'Ellie',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
      position: 'Jr. Software Engineer'
    }, {
      coordinates: {
        x: 360,
        y: 320
      },
      name: 'Owen',
      photo: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
      position: 'Software Engineer',
      connections: [{
        from: {
          io: 4,
          item: 4
        },
        to: {
          io: 2,
          item: 5
        },
        path: 'M 420.75 390 L 380.5 443.5',
        pathObject: {
          from: {
            x: 420.75,
            y: 390
          },
          to: {
            x: 380.5,
            y: 443.5
          }
        }
      }, {
        from: {
          io: 6,
          item: 4
        },
        to: {
          io: 2,
          item: 6
        },
        path: 'M 520.25 390 L 670.5 443.5',
        pathObject: {
          from: {
            x: 520.25,
            y: 390
          },
          to: {
            x: 670.5,
            y: 443.5
          }
        }
      }]
    }, {
      coordinates: {
        x: 270,
        y: 440
      },
      name: 'David',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
      position: 'Front-End Engineer'
    }, {
      coordinates: {
        x: 560,
        y: 440
      },
      name: 'Motoki',
      photo: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
      position: 'Back-End Engineer'
    }]
  }
}`,...(dt=(mt=O.parameters)==null?void 0:mt.docs)==null?void 0:dt.source}}};var ut,ft,pt;L.parameters={...L.parameters,docs:{...(ut=L.parameters)==null?void 0:ut.docs,source:{originalSource:`{
  args: {
    isEditable: true
  },
  render: args => ({
    components: {
      Button,
      OrganizationTree
    },
    setup() {
      return {
        args: {
          ...args,
          ref: 'example-org-chart'
        }
      };
    },
    methods: {
      async onClickButton() {
        if (this.$refs['example-org-chart']) {
          const base64: string | null = await this.$refs['example-org-chart'].doExport();
          console.log(base64);
        }
      }
    },
    template: '<div style="height: 100vh; width: 100%; display: block; justify-content: center; align-items: center;"><Button color="accent" @click="onClickButton">Export See Console for result</Button><OrganizationTree v-bind="args" /></div>'
  })
}`,...(pt=(ft=L.parameters)==null?void 0:ft.docs)==null?void 0:pt.source}}};const _e=["Default","Editable","AdditionalInfo","ExportImage"];export{O as AdditionalInfo,T as Default,B as Editable,L as ExportImage,_e as __namedExportsOrder,Qe as default};
