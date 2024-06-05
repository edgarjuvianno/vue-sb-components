import{B as Lt}from"./button-00899872.js";import{e as vt,o as g,g as y,n as F,u as H,k as w,F as I,G as L,j as M,v as J,m as R,s as et,H as Rt,q as nt,f as Ft}from"./vue.esm-bundler-38397e95.js";import{D as Ht}from"./form-dropdown-4b99b8c4.js";import{_ as $t}from"./_plugin-vue_export-helper-c27b6911.js";import"./tooltip-7b123e02.js";import"./progress-circular-90599950.js";import"./form-input-e5bf6945.js";import"./icons-d0b18b59.js";import"./helper-91f3687e.js";function jt(t,e){if(t.match(/^[a-z]+:\/\//i))return t;if(t.match(/^\/\//))return window.location.protocol+t;if(t.match(/^[a-z]+:/i))return t;const n=document.implementation.createHTMLDocument(),o=n.createElement("base"),i=n.createElement("a");return n.head.appendChild(o),n.body.appendChild(i),e&&(o.href=e),i.href=t,i.href}const Ot=(()=>{let t=0;const e=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(t+=1,`u${e()}${t}`)})();function P(t){const e=[];for(let n=0,o=t.length;n<o;n++)e.push(t[n]);return e}function G(t,e){const o=(t.ownerDocument.defaultView||window).getComputedStyle(t).getPropertyValue(e);return o?parseFloat(o.replace("px","")):0}function At(t){const e=G(t,"border-left-width"),n=G(t,"border-right-width");return t.clientWidth+e+n}function zt(t){const e=G(t,"border-top-width"),n=G(t,"border-bottom-width");return t.clientHeight+e+n}function Ct(t,e={}){const n=e.width||At(t),o=e.height||zt(t);return{width:n,height:o}}function Yt(){let t,e;try{e=process}catch{}const n=e&&e.env?e.env.devicePixelRatio:null;return n&&(t=parseInt(n,10),Number.isNaN(t)&&(t=1)),t||window.devicePixelRatio||1}const $=16384;function Gt(t){(t.width>$||t.height>$)&&(t.width>$&&t.height>$?t.width>t.height?(t.height*=$/t.width,t.width=$):(t.width*=$/t.height,t.height=$):t.width>$?(t.height*=$/t.width,t.width=$):(t.width*=$/t.height,t.height=$))}function W(t){return new Promise((e,n)=>{const o=new Image;o.decode=()=>e(o),o.onload=()=>e(o),o.onerror=n,o.crossOrigin="anonymous",o.decoding="async",o.src=t})}async function Wt(t){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then(e=>`data:image/svg+xml;charset=utf-8,${e}`)}async function Zt(t,e,n){const o="http://www.w3.org/2000/svg",i=document.createElementNS(o,"svg"),a=document.createElementNS(o,"foreignObject");return i.setAttribute("width",`${e}`),i.setAttribute("height",`${n}`),i.setAttribute("viewBox",`0 0 ${e} ${n}`),a.setAttribute("width","100%"),a.setAttribute("height","100%"),a.setAttribute("x","0"),a.setAttribute("y","0"),a.setAttribute("externalResourcesRequired","true"),i.appendChild(a),a.appendChild(t),Wt(i)}const x=(t,e)=>{if(t instanceof e)return!0;const n=Object.getPrototypeOf(t);return n===null?!1:n.constructor.name===e.name||x(n,e)};function qt(t){const e=t.getPropertyValue("content");return`${t.cssText} content: '${e.replace(/'|"/g,"")}';`}function Vt(t){return P(t).map(e=>{const n=t.getPropertyValue(e),o=t.getPropertyPriority(e);return`${e}: ${n}${o?" !important":""};`}).join(" ")}function Xt(t,e,n){const o=`.${t}:${e}`,i=n.cssText?qt(n):Vt(n);return document.createTextNode(`${o}{${i}}`)}function ot(t,e,n){const o=window.getComputedStyle(t,n),i=o.getPropertyValue("content");if(i===""||i==="none")return;const a=Ot();try{e.className=`${e.className} ${a}`}catch{return}const s=document.createElement("style");s.appendChild(Xt(a,n,o)),e.appendChild(s)}function Ut(t,e){ot(t,e,":before"),ot(t,e,":after")}const it="application/font-woff",st="image/jpeg",Jt={woff:it,woff2:it,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:st,jpeg:st,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function Nt(t){const e=/\.([^./]*?)$/g.exec(t);return e?e[1]:""}function _(t){const e=Nt(t).toLowerCase();return Jt[e]||""}function Kt(t){return t.split(/,/)[1]}function K(t){return t.search(/^(data:)/)!==-1}function kt(t,e){return`data:${e};base64,${t}`}async function Pt(t,e,n){const o=await fetch(t,e);if(o.status===404)throw new Error(`Resource "${o.url}" not found`);const i=await o.blob();return new Promise((a,s)=>{const r=new FileReader;r.onerror=s,r.onloadend=()=>{try{a(n({res:o,result:r.result}))}catch(c){s(c)}},r.readAsDataURL(i)})}const N={};function Qt(t,e,n){let o=t.replace(/\?.*/,"");return n&&(o=t),/ttf|otf|eot|woff2?/i.test(o)&&(o=o.replace(/.*\//,"")),e?`[${e}]${o}`:o}async function tt(t,e,n){const o=Qt(t,e,n.includeQueryParams);if(N[o]!=null)return N[o];n.cacheBust&&(t+=(/\?/.test(t)?"&":"?")+new Date().getTime());let i;try{const a=await Pt(t,n.fetchRequestInit,({res:s,result:r})=>(e||(e=s.headers.get("Content-Type")||""),Kt(r)));i=kt(a,e)}catch(a){i=n.imagePlaceholder||"";let s=`Failed to fetch resource: ${t}`;a&&(s=typeof a=="string"?a:a.message),s&&console.warn(s)}return N[o]=i,i}async function _t(t){const e=t.toDataURL();return e==="data:,"?t.cloneNode(!1):W(e)}async function te(t,e){if(t.currentSrc){const a=document.createElement("canvas"),s=a.getContext("2d");a.width=t.clientWidth,a.height=t.clientHeight,s==null||s.drawImage(t,0,0,a.width,a.height);const r=a.toDataURL();return W(r)}const n=t.poster,o=_(n),i=await tt(n,o,e);return W(i)}async function ee(t){var e;try{if(!((e=t==null?void 0:t.contentDocument)===null||e===void 0)&&e.body)return await q(t.contentDocument.body,{},!0)}catch{}return t.cloneNode(!1)}async function ne(t,e){return x(t,HTMLCanvasElement)?_t(t):x(t,HTMLVideoElement)?te(t,e):x(t,HTMLIFrameElement)?ee(t):t.cloneNode(!1)}const oe=t=>t.tagName!=null&&t.tagName.toUpperCase()==="SLOT";async function ie(t,e,n){var o,i;let a=[];return oe(t)&&t.assignedNodes?a=P(t.assignedNodes()):x(t,HTMLIFrameElement)&&(!((o=t.contentDocument)===null||o===void 0)&&o.body)?a=P(t.contentDocument.body.childNodes):a=P(((i=t.shadowRoot)!==null&&i!==void 0?i:t).childNodes),a.length===0||x(t,HTMLVideoElement)||await a.reduce((s,r)=>s.then(()=>q(r,n)).then(c=>{c&&e.appendChild(c)}),Promise.resolve()),e}function se(t,e){const n=e.style;if(!n)return;const o=window.getComputedStyle(t);o.cssText?(n.cssText=o.cssText,n.transformOrigin=o.transformOrigin):P(o).forEach(i=>{let a=o.getPropertyValue(i);i==="font-size"&&a.endsWith("px")&&(a=`${Math.floor(parseFloat(a.substring(0,a.length-2)))-.1}px`),x(t,HTMLIFrameElement)&&i==="display"&&a==="inline"&&(a="block"),i==="d"&&e.getAttribute("d")&&(a=`path(${e.getAttribute("d")})`),n.setProperty(i,a,o.getPropertyPriority(i))})}function ae(t,e){x(t,HTMLTextAreaElement)&&(e.innerHTML=t.value),x(t,HTMLInputElement)&&e.setAttribute("value",t.value)}function re(t,e){if(x(t,HTMLSelectElement)){const n=e,o=Array.from(n.children).find(i=>t.value===i.getAttribute("value"));o&&o.setAttribute("selected","")}}function ce(t,e){return x(e,Element)&&(se(t,e),Ut(t,e),ae(t,e),re(t,e)),e}async function le(t,e){const n=t.querySelectorAll?t.querySelectorAll("use"):[];if(n.length===0)return t;const o={};for(let a=0;a<n.length;a++){const r=n[a].getAttribute("xlink:href");if(r){const c=t.querySelector(r),l=document.querySelector(r);!c&&l&&!o[r]&&(o[r]=await q(l,e,!0))}}const i=Object.values(o);if(i.length){const a="http://www.w3.org/1999/xhtml",s=document.createElementNS(a,"svg");s.setAttribute("xmlns",a),s.style.position="absolute",s.style.width="0",s.style.height="0",s.style.overflow="hidden",s.style.display="none";const r=document.createElementNS(a,"defs");s.appendChild(r);for(let c=0;c<i.length;c++)r.appendChild(i[c]);t.appendChild(s)}return t}async function q(t,e,n){return!n&&e.filter&&!e.filter(t)?null:Promise.resolve(t).then(o=>ne(o,e)).then(o=>ie(t,o,e)).then(o=>ce(t,o)).then(o=>le(o,e))}const It=/url\((['"]?)([^'"]+?)\1\)/g,de=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,me=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function he(t){const e=t.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`,"g")}function ue(t){const e=[];return t.replace(It,(n,o,i)=>(e.push(i),n)),e.filter(n=>!K(n))}async function pe(t,e,n,o,i){try{const a=n?jt(e,n):e,s=_(e);let r;if(i){const c=await i(a);r=kt(c,s)}else r=await tt(a,s,o);return t.replace(he(e),`$1${r}$3`)}catch{}return t}function fe(t,{preferredFontFormat:e}){return e?t.replace(me,n=>{for(;;){const[o,,i]=de.exec(n)||[];if(!i)return"";if(i===e)return`src: ${o};`}}):t}function Mt(t){return t.search(It)!==-1}async function Et(t,e,n){if(!Mt(t))return t;const o=fe(t,n);return ue(o).reduce((a,s)=>a.then(r=>pe(r,s,e,n)),Promise.resolve(o))}async function j(t,e,n){var o;const i=(o=e.style)===null||o===void 0?void 0:o.getPropertyValue(t);if(i){const a=await Et(i,null,n);return e.style.setProperty(t,a,e.style.getPropertyPriority(t)),!0}return!1}async function ge(t,e){await j("background",t,e)||await j("background-image",t,e),await j("mask",t,e)||await j("mask-image",t,e)}async function ye(t,e){const n=x(t,HTMLImageElement);if(!(n&&!K(t.src))&&!(x(t,SVGImageElement)&&!K(t.href.baseVal)))return;const o=n?t.src:t.href.baseVal,i=await tt(o,_(o),e);await new Promise((a,s)=>{t.onload=a,t.onerror=s;const r=t;r.decode&&(r.decode=a),r.loading==="lazy"&&(r.loading="eager"),n?(t.srcset="",t.src=i):t.href.baseVal=i})}async function we(t,e){const o=P(t.childNodes).map(i=>Dt(i,e));await Promise.all(o).then(()=>t)}async function Dt(t,e){x(t,Element)&&(await ge(t,e),await ye(t,e),await we(t,e))}function be(t,e){const{style:n}=t;e.backgroundColor&&(n.backgroundColor=e.backgroundColor),e.width&&(n.width=`${e.width}px`),e.height&&(n.height=`${e.height}px`);const o=e.style;return o!=null&&Object.keys(o).forEach(i=>{n[i]=o[i]}),t}const at={};async function rt(t){let e=at[t];if(e!=null)return e;const o=await(await fetch(t)).text();return e={url:t,cssText:o},at[t]=e,e}async function ct(t,e){let n=t.cssText;const o=/url\(["']?([^"')]+)["']?\)/g,a=(n.match(/url\([^)]+\)/g)||[]).map(async s=>{let r=s.replace(o,"$1");return r.startsWith("https://")||(r=new URL(r,t.url).href),Pt(r,e.fetchRequestInit,({result:c})=>(n=n.replace(s,`url(${c})`),[s,c]))});return Promise.all(a).then(()=>n)}function lt(t){if(t==null)return[];const e=[],n=/(\/\*[\s\S]*?\*\/)/gi;let o=t.replace(n,"");const i=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const c=i.exec(o);if(c===null)break;e.push(c[0])}o=o.replace(i,"");const a=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,s="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",r=new RegExp(s,"gi");for(;;){let c=a.exec(o);if(c===null){if(c=r.exec(o),c===null)break;a.lastIndex=r.lastIndex}else r.lastIndex=a.lastIndex;e.push(c[0])}return e}async function Se(t,e){const n=[],o=[];return t.forEach(i=>{if("cssRules"in i)try{P(i.cssRules||[]).forEach((a,s)=>{if(a.type===CSSRule.IMPORT_RULE){let r=s+1;const c=a.href,l=rt(c).then(d=>ct(d,e)).then(d=>lt(d).forEach(h=>{try{i.insertRule(h,h.startsWith("@import")?r+=1:i.cssRules.length)}catch(u){console.error("Error inserting rule from remote css",{rule:h,error:u})}})).catch(d=>{console.error("Error loading remote css",d.toString())});o.push(l)}})}catch(a){const s=t.find(r=>r.href==null)||document.styleSheets[0];i.href!=null&&o.push(rt(i.href).then(r=>ct(r,e)).then(r=>lt(r).forEach(c=>{s.insertRule(c,i.cssRules.length)})).catch(r=>{console.error("Error loading remote stylesheet",r)})),console.error("Error inlining remote css file",a)}}),Promise.all(o).then(()=>(t.forEach(i=>{if("cssRules"in i)try{P(i.cssRules||[]).forEach(a=>{n.push(a)})}catch(a){console.error(`Error while reading CSS rules from ${i.href}`,a)}}),n))}function xe(t){return t.filter(e=>e.type===CSSRule.FONT_FACE_RULE).filter(e=>Mt(e.style.getPropertyValue("src")))}async function ve(t,e){if(t.ownerDocument==null)throw new Error("Provided element is not within a Document");const n=P(t.ownerDocument.styleSheets),o=await Se(n,e);return xe(o)}async function $e(t,e){const n=await ve(t,e);return(await Promise.all(n.map(i=>{const a=i.parentStyleSheet?i.parentStyleSheet.href:null;return Et(i.cssText,a,e)}))).join(`
`)}async function Ce(t,e){const n=e.fontEmbedCSS!=null?e.fontEmbedCSS:e.skipFonts?null:await $e(t,e);if(n){const o=document.createElement("style"),i=document.createTextNode(n);o.appendChild(i),t.firstChild?t.insertBefore(o,t.firstChild):t.appendChild(o)}}async function ke(t,e={}){const{width:n,height:o}=Ct(t,e),i=await q(t,e,!0);return await Ce(i,e),await Dt(i,e),be(i,e),await Zt(i,n,o)}async function Pe(t,e={}){const{width:n,height:o}=Ct(t,e),i=await ke(t,e),a=await W(i),s=document.createElement("canvas"),r=s.getContext("2d"),c=e.pixelRatio||Yt(),l=e.canvasWidth||n,d=e.canvasHeight||o;return s.width=l*c,s.height=d*c,e.skipAutoScale||Gt(s),s.style.width=`${l}`,s.style.height=`${d}`,e.backgroundColor&&(r.fillStyle=e.backgroundColor,r.fillRect(0,0,s.width,s.height)),r.drawImage(a,0,0,s.width,s.height),s}async function Ie(t,e={}){return(await Pe(t,e)).toDataURL()}const Z=(t,e)=>t<1?{x:e.x+5,y:e.y}:t>=1&&t<=3?{x:e.x,y:e.y+5}:t>=4&&t<=6?{x:e.x,y:e.y-5}:{x:e.x-5,y:e.y},Me=(t,e)=>[...t].sort((i,a)=>{const s=Math.sqrt((i.x-e.x)*(i.x-e.x)+(i.y-e.y)*(i.y-e.y)),r=Math.sqrt((a.x-e.x)*(a.x-e.x)+(a.y-e.y)*(a.y-e.y));return s-r}).reverse(),Ee=(t,e,n)=>{const{canvasHeight:o,canvasWidth:i,x:a,y:s}=n,{from:r,points:c,to:l}=t,d=document.querySelector(`#org-${e} #org-${e}-item-${r.item}-io-${r.io}`),h=document.querySelector(`#org-${e} #org-${e}-item-${l.item}-io-${l.io}`);if(d&&h){const{height:u,width:m,x:f,y:p}=d.getBoundingClientRect().toJSON(),{height:b,width:S,x:E,y:D}=h.getBoundingClientRect().toJSON(),C=m/2+(f-a)*i,k=u/2+(p-s)*o,v=S/2+(E-a)*i,V=b/2+(D-s)*o,T={...Z(r.io,{x:Math.round(C/5)*5,y:Math.round(k/5)*5})},B={...Z(l.io,{x:Math.round(v/5)*5,y:Math.round(V/5)*5})};if(c!=null&&c.length){const X=c.map((nn,U)=>U===c.length-1?`L ${B.x} ${B.y}`:`L ${c[U+1].x} ${c[U+1].y}`).join(" ");return`M ${T.x} ${T.y} L ${c[0].x} ${c[0].y} ${X}`}return`M ${T.x} ${T.y} L ${B.x} ${B.y}`}},De=(t,e,n,o,i)=>{const{canvasHeight:a,canvasWidth:s,x:r,y:c}=i,l=e.from.item===t,{from:d,to:h}=e,u=document.querySelector(`#org-${o} #org-${o}-item-${d.item}-io-${d.io}`),m=document.querySelector(`#org-${o} #org-${o}-item-${h.item}-io-${h.io}`);if(!l&&m&&n&&n[0]){const{height:f,width:p,x:b,y:S}=m.getBoundingClientRect().toJSON(),E=p/2+(b-r)*s,D=f/2+(S-c)*a,C={...Z(h.io,{x:Math.round(E/5)*5,y:Math.round(D/5)*5})},k=n[0].getAttribute("d");if(k){const v=k.split(" ");return v[v.length-2]=String(C.x),v[v.length-1]=String(C.y),v.join(" ")}}else if(u&&n&&n[0]){const{height:f,width:p,x:b,y:S}=u.getBoundingClientRect().toJSON(),E=p/2+(b-r)*s,D=f/2+(S-c)*a,C={...Z(d.io,{x:Math.round(E/5)*5,y:Math.round(D/5)*5})},k=n[0].getAttribute("d");if(k){const v=k.split(" ");return v[1]=String(C.x),v[2]=String(C.y),v.join(" ")}}},Te=(t,e)=>{if(e){const n=e[0].getAttribute("d");if(n){const o=n.split(" "),i=`L ${o[o.length-2]} ${o[o.length-1]}`,a=`M ${o[1]} ${o[2]}`;if(t!=null&&t.length){const s=t.map(c=>`L ${c.x} ${c.y}`).join(" ");return`${a} ${s} ${i}`}return`${a} ${i}`}}},Tt=vt({emits:{changePoint:(t,e)=>!0,clickItem:(t,e)=>!0,dragItem:t=>!0,dragConnection:(t,e)=>!0,dragPoint:(t,e)=>!0,selectConnection:t=>!0},props:{canvasState:{required:!0,type:Object},connectorState:{required:!0,type:Object},isDragged:{required:!1,type:Boolean},isSelected:{required:!1,type:Boolean},isEditable:{required:!1,type:Boolean},item:{required:!0,type:Object},selectedConnection:{required:!1,type:Object}},name:"sb-organization-tree-item",data(){return{connectionsPath:{}}},computed:{getItemPosition(){return{left:this.item.coordinates.x?`${this.item.coordinates.x}px`:0,top:this.item.coordinates.y?`${this.item.coordinates.y}px`:0}},isConnecting(){return this.connectorState.from?this.connectorState.from.split("-io-")[0]===this.$.vnode.key:!1}},methods:{getConnectionPath(t){if(this.canvasState.elem){const e=String(this.$.vnode.key).split("-item-")[0].replace("org-",""),n=this.canvasState.elem.getBoundingClientRect().toJSON(),o=n.height||0,i=n.width||0,a=i/(i*this.canvasState.zoom)||0,s=o/(o*this.canvasState.zoom)||0;return Ee(t,e,{canvasHeight:s,canvasWidth:a,x:n.x,y:n.y})}},getConnectionPathString(t){return this.connectionsPath[`${String(this.$.vnode.key)}-connection-${t.from.item}-${t.from.io}-${t.to.item}-${t.to.io}`]},getCoordinatesMove(t){return t.type==="touchstart"?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}},handleCircleDoubleClick(t,e){var n;if(this.isEditable){const o=[...this.item.connections||[]],i=[...((n=o[t])==null?void 0:n.points)||[]];i.splice(e,1),o[t]={...o[t],points:[...i]};const a=Number(String(this.$.vnode.key).split("-item-")[1]);this.$emit("changePoint",{...this.item,connections:[...o]},a)}},handleClickIO(t,e){const n=t.target;if(n&&this.isEditable){const o=n.getBoundingClientRect();this.$emit("dragConnection",`${String(this.$.vnode.key)}-io-${e}`,o)}},handleClickPoint(t,e,n){const o=t.target;if(o&&this.isEditable){const i=o.getBoundingClientRect();this.$emit("dragPoint",{connection:e,item:Number(String(this.$.vnode.key).split("-item-")[1]),point:n},i)}},handleConnectionClick(t,e){if(this.isEditable&&t.target){const n={...this.item.connections[e]||{}};this.$emit("selectConnection",{from:n.from,key:`${String(this.$.vnode.key)}-connection-${e}`,to:n.to,type:n.type})}},handleConnectionDoubleClick(t,e){const n=[...this.item.connections||[]],{elem:o,zoom:i}=this.canvasState;if(o&&this.isEditable){const{height:a,width:s,x:r,y:c}=o.getBoundingClientRect().toJSON(),l=t.clientX,d=t.clientY,h=l*(s/(s*i))-r*(s/(s*i)),u=d*(a/(a*i))-c*(a/(a*i)),m=String(this.$.vnode.key).split("-item-")[0],f=document.getElementById(`${m}-item-${n[e].to.item}-io-${n[e].to.io}`);if(f&&this.canvasState.elem){const{height:p,width:b,x:S,y:E}=f.getBoundingClientRect().toJSON(),{height:D,width:C,x:k,y:v}=this.canvasState.elem.getBoundingClientRect().toJSON(),V=b/2+(S-k)*C,T=p/2+(E-v)*D,B=[...Me([...n[e].points||[],{x:h,y:u}],{x:V,y:T})];n[e]={...n[e],points:[...B]};const X=Number(String(this.$.vnode.key).split("-item-")[1]);this.$emit("changePoint",{...this.item,connections:[...n]},X)}}},handleInitConnections(){this.item.connections&&(this.connectionsPath={},this.item.connections.forEach(t=>{const e=this.getConnectionPath(t);this.connectionsPath[`${String(this.$.vnode.key)}-connection-${t.from.item}-${t.from.io}-${t.to.item}-${t.to.io}`]=e}))},handleItemClick(t){if(!t.target.classList.contains("io"))if(this.isEditable){const n=this.getCoordinatesMove(t);this.$emit("dragItem",{coordinates:n,elem:this.$el.nextSibling,key:this.$.vnode.key})}else{const n=Number(String(this.$.vnode.key).split("-item-")[1]);this.$emit("clickItem",this.item,n)}},isConnectionSelected(t){return this.selectedConnection?`${String(this.$.vnode.key)}-connection-${t}`===this.selectedConnection.key:!1}},mounted(){const t=document.getElementById(String(this.$.vnode.key));if(t){const{height:e,width:n}=t.getBoundingClientRect().toJSON();t.style.height=`${Math.ceil(e/20)*20}px`,t.style.width=`${Math.ceil(n/20)*20}px`,this.$nextTick(()=>{this.handleInitConnections()})}},watch:{"item.connections":{deep:!0,handler(){this.$nextTick(()=>this.handleInitConnections())}}}}),Be=["id"],Le=["id","onMousedown","onTouchstart"],Re={class:"text"},Fe=["id"],He=["id","onMousedown","onTouchstart"],je=["id"],Oe={class:"data-wrapper"},Ae={class:"name"},ze={class:"position"},Ye=["innerHTML"],Ge=["id"],We=["d","onClick","onDblclick"],Ze=["cx","cy","onDblclick","onMousedown","onTouchstart"];function qe(t,e,n,o,i,a){return g(),y(I,null,[t.item.department?(g(),y("div",{key:0,class:F(["department",{connecting:t.isConnecting,draggable:t.isEditable,dragged:t.isDragged,selected:t.isSelected}]),id:String(t.$.vnode.key),style:H(t.getItemPosition),onMousedown:e[0]||(e[0]=w((...s)=>t.handleItemClick&&t.handleItemClick(...s),["stop"])),onTouchstart:e[1]||(e[1]=w((...s)=>t.handleItemClick&&t.handleItemClick(...s),["stop"]))},[(g(!0),y(I,null,L([...Array(8).keys()],s=>(g(),y("span",{class:"io",id:`${String(t.$.vnode.key)}-io-${s}`,key:`io-${s}`,onMousedown:w(r=>t.handleClickIO(r,s),["stop"]),onTouchstart:w(r=>t.handleClickIO(r,s),["stop"])},null,40,Le))),128)),M("div",Re,J(t.item.department),1)],46,Be)):(g(),y("div",{key:1,class:F(["card",{connecting:t.isConnecting,draggable:t.isEditable,dragged:t.isDragged,selected:t.isSelected}]),id:String(t.$.vnode.key),style:H(t.getItemPosition),onMousedown:e[2]||(e[2]=w((...s)=>t.handleItemClick&&t.handleItemClick(...s),["stop"])),onTouchstart:e[3]||(e[3]=w((...s)=>t.handleItemClick&&t.handleItemClick(...s),["stop"]))},[(g(!0),y(I,null,L([...Array(8).keys()],s=>(g(),y("span",{class:"io",id:`${String(t.$.vnode.key)}-io-${s}`,key:`io-${s}`,onMousedown:w(r=>t.handleClickIO(r,s),["stop"]),onTouchstart:w(r=>t.handleClickIO(r,s),["stop"])},null,40,He))),128)),t.item.photo?(g(),y("div",{key:0,class:"item-photo",id:`photo-item-${String(t.$.vnode.key)}`,style:H({backgroundImage:`url(${t.item.photo})`})},null,12,je)):R("",!0),M("div",Oe,[t.item.renderInfo?(g(),y("div",{key:1,innerHTML:t.item.renderInfo(t.item)},null,8,Ye)):(g(),y(I,{key:0},[M("p",Ae,J(t.item.name||"-"),1),M("p",ze,J(t.item.position||"-"),1)],64))])],46,Fe)),(g(!0),y(I,null,L(t.item.connections||[],(s,r)=>(g(),y("svg",{class:F(["connection",[s.type||"solid",t.isConnectionSelected(r)&&"selected",t.isEditable&&"editable"]]),xmlns:"http://www.w3.org/2000/svg",id:`${String(t.$.vnode.key)}-connection-${r}`,key:`${String(t.$.vnode.key)}-connection-${r}`},[M("path",{d:t.getConnectionPathString(s),onClick:w(c=>t.handleConnectionClick(c,r),["stop"]),onDblclick:w(c=>t.handleConnectionDoubleClick(c,r),["stop"])},null,40,We),(g(!0),y(I,null,L(s.points||[],(c,l)=>(g(),y("circle",{class:"circle",r:"6",cx:c.x,cy:c.y,key:`${String(t.$.vnode.key)}-connection-${r}-circle-${l}`,onDblclick:w(d=>t.handleCircleDoubleClick(r,l),["stop"]),onMousedown:w(d=>t.handleClickPoint(d,r,l),["stop"]),onTouchstart:w(d=>t.handleClickPoint(d,r,l),["stop"])},null,40,Ze))),128))],10,Ge))),128))],64)}const Ve=$t(Tt,[["render",qe]]);Tt.__docgenInfo={displayName:"sb-organization-tree-item",exportName:"default",description:"",tags:{},props:[{name:"canvasState",type:{name:"ICanvasState"},required:!0},{name:"connectorState",type:{name:"IConnectorState"},required:!0},{name:"isDragged",type:{name:"boolean"},required:!1},{name:"isSelected",type:{name:"boolean"},required:!1},{name:"isEditable",type:{name:"boolean"},required:!1},{name:"item",type:{name:"IOrganizationTreeItem"},required:!0},{name:"selectedConnection",type:{name:"ISelectedConnection | null"},required:!1}],events:[{name:"changePoint",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]},{name:"clickItem",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]},{name:"dragItem",type:{names:["undefined"]}},{name:"dragConnection",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]},{name:"dragPoint",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]},{name:"selectConnection",type:{names:["undefined"]}}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/organization-tree/__organization-tree-item.vue"]};const Bt=vt({emits:{change:t=>!0,clickItem:(t,e)=>!0},props:{isEditable:{required:!1,type:Boolean},list:{required:!0,type:Object}},name:"sb-organization-tree",components:{"sb-dropdown":Ht,"sb-org-tree-item":Ve},data(){return{canvasState:{coordinates:{x:0,y:0},elem:null,lastZoom:1,zoom:1},canvasStyle:{},connectorState:{from:null,fromRect:null,toCoordinates:null},draggedItem:null,exportAreaStyle:{},isExporting:!1,isItemMoved:!1,lineType:[{label:"Solid",value:"solid"},{label:"Dashed",value:"dashed"},{label:"Dotted",value:"dotted"}],localList:[],mouseState:{mouse:{x:0,y:0},position:{x:0,y:0},positionStart:{x:0,y:0}},parentPointerState:{events:[],prevDiff:-1},parentState:{isDrag:!1,position:{x:0,y:0}},pointState:{fromRect:null,target:null,toCoordinates:null},selectedConnection:null,selectedItem:null,selectedLineType:"solid"}},computed:{getMinMaxXY(){const e=[...[...this.localList].flatMap(m=>m.connections?[...m.connections]:[])].flatMap(m=>m.points?[...m.points]:[]),n=[...this.localList].map((m,f)=>{const p=document.getElementById(`org-${this.$.uid}-item-${f}`);return p?{height:p.offsetHeight,x:p.offsetLeft,y:p.offsetTop,width:p.offsetWidth}:m.coordinates}),o=[...n].map(m=>m.x),i=[...n].map(m=>m.x+(m.width||220)),a=[...n].map(m=>m.y),s=[...n].map(m=>m.y+(m.height||100)),r=[...[...e].map(m=>m.x),...o,...i],c=[...[...e].map(m=>m.y),...a,...s],l=Math.max.apply(null,r),d=Math.min.apply(null,r),h=Math.max.apply(null,c),u=Math.min.apply(null,c);return{maxX:l,minX:d,maxY:h,minY:u}}},methods:{async doExport(){try{this.selectedConnection=null,this.isExporting=!0,await new Promise(r=>setTimeout(()=>{r(!0)},200));const{maxX:t,minX:e,maxY:n,minY:o}=this.getMinMaxXY,i=(o<0?Math.abs(o):0)+n,a=(e<0?Math.abs(e):0)+t,s=document.getElementById(`canvas-tree-${this.$.uid}`);if(this.exportAreaStyle={height:`${i+40}px`,width:`${a+40}px`},s){const r=s.cloneNode(!0),c=new Date().getTime().toString();r.classList.remove("connection-selected"),r.style.transform="none",r.style.background="transparent",r.style.height=`${i+40}px`,r.style.position="relative",r.style.transform=`translate(${(e<0?Math.abs(e):e*-1)+20}px, ${(o<0?Math.abs(o):o*-1)+20}px)`,r.style.width=`${a+40}px`,r.id=`org-${this.$.uid}-export-${c}`;const l=document.getElementById(`org-${this.$.uid}-export-area`),d=r.getElementsByClassName("item-photo"),h=[];for(let u=0;u<d.length;u++){const m=d[u],f=m.style.backgroundImage.split(/"/)[1],b=await(await fetch(f)).blob();if(b){const S=URL.createObjectURL(b);h.push(S),m.style.backgroundImage=`url(${S})`}else m.style.backgroundImage=""}if(l){l.appendChild(r);const u=await Ie(r,{skipFonts:!0,style:{opacity:"1"}}).then(m=>(h.forEach(f=>{URL.revokeObjectURL(f)}),m)).catch(()=>null);return r.remove(),this.isExporting=!1,u}}return null}catch{return null}},doParentZoom(t){this.canvasState.zoom+=t,this.$nextTick(()=>this.doParentZoomRefresh())},doParentZoomRefresh(){const{coordinates:t,lastZoom:e,zoom:n}=this.canvasState,o=t.x/e*n,i=t.y/e*n;this.canvasState.lastZoom=n,this.canvasStyle={transform:`translate(${o}px, ${i}px) scale(${n})`}},doSetTempConnectionPath(){if(this.connectorState.toCoordinates&&this.connectorState.fromRect){const{x:t,y:e}=this.connectorState.toCoordinates,{height:n,width:o,x:i,y:a}=this.connectorState.fromRect,{zoom:s}=this.canvasState,r=this.getCanvasRect(),c=(r==null?void 0:r.height)||0,l=(r==null?void 0:r.width)||0,d=l/(l*s)||0,h=c/(c*s)||0,u=(r==null?void 0:r.x)||0,m=(r==null?void 0:r.y)||0,f=o/2+(i-u)*d,p=n/2+(a-m)*h,b=t*(l/(l*s))-u*(l/(l*s)),S=e*(c/(c*s))-m*(c/(c*s));this.connectorState.pathObject={from:{x:f,y:p},to:{x:b,y:S}},this.connectorState.path=`M ${f} ${p} L ${b} ${S}`}else this.connectorState.pathObject=void 0,this.connectorState.path=void 0},doUpdateItemMovedConnections(t){this.localList.forEach((e,n)=>{[...e.connections||[]].some(o=>o.from.item===t||o.to.item===t)&&[...e.connections||[]].forEach((o,i)=>{if(o.from.item===t||o.to.item===t){const a=document.getElementById(`org-${this.$.uid}-item-${n}-connection-${i}`),s=a==null?void 0:a.getElementsByTagName("path"),r=String(this.$.uid),c=this.getCanvasRect(),l=c.height||0,d=c.width||0,h=d/(d*this.canvasState.zoom)||0,u=l/(l*this.canvasState.zoom)||0,m=De(t,o,s,r,{canvasHeight:u,canvasWidth:h,x:c.x,y:c.y});m&&s&&s[0].setAttributeNS(null,"d",m)}})})},doUpdatePointMovedConnection(t,e,n){const o=document.getElementById(`org-${this.$.uid}-item-${n}-connection-${e}`),i=o==null?void 0:o.getElementsByTagName("path"),a=Te(t,i);a&&i&&i[0].setAttributeNS(null,"d",a)},getCanvasRect(){return this.$refs["canvas-tree"]?{...this.$refs["canvas-tree"].getBoundingClientRect().toJSON()}:null},getCoordinatesEnd(t){return t.type==="touchend"?{x:this.mouseState.mouse.x,y:this.mouseState.mouse.y}:{x:t.clientX,y:t.clientY}},getCoordinatesMove(t,e){const n=e||10,i=(()=>t.type==="touchmove"||t.type==="touchstart"?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY})();return e&&e<2?i:Math.abs(i.x-this.parentState.position.x)>=n||Math.abs(i.y-this.parentState.position.y)>=n?{x:Math.round(i.x/n)*n,y:Math.round(i.y/n)*n}:this.parentState.position},getOptionLine(t){return`
					<div class="line-opt ${t.value}">
						<div></div>
					</div>
				`},handleChangeItemPoint(t,e){this.localList[e]={...t},this.$nextTick(()=>this.$emit("change",this.localList))},handleChangeLineType(t){if(this.selectedConnection){const e=this.selectedConnection.key.split("-connection-");this.selectedConnection=null;const n=Number(e[0].split("-item-")[1]),o=Number(e[1]);if(this.localList[n]){const i=[...this.localList[n].connections||[]];i[o].type=t,this.localList[n].connections=[...i],this.$nextTick(()=>{this.$emit("change",this.localList)})}}},handleClickItem(t,e){this.$emit("clickItem",t,e)},handleConnectionDragged(t,e){this.connectorState.from=t,this.connectorState.fromRect={...e.toJSON()},this.selectedConnection=null},handleItemChangePosition(t){if(this.draggedItem){const e=Number(this.draggedItem.key.split("-item-")[1]),n=[...this.localList],o={...n[e].coordinates};(o.x!==t.x||o.y!==t.y)&&(this.isItemMoved=!0,n[e]={...this.localList[e],coordinates:t},this.localList=[...n],this.$nextTick(()=>this.doUpdateItemMovedConnections(e)))}},handleItemDragged(t){this.draggedItem={...t},this.selectedItem={...t},this.mouseState.position={...t.coordinates},this.parentState.position={...t.coordinates},this.selectedConnection=null},handleParentClick(t){const e=this.getCoordinatesMove(t,1),n=this.$refs["connection-options-wrapper"],o=t.target;(!this.selectedConnection||this.selectedConnection&&(!n||n&&!n.contains(o)&&!n.isSameNode(o)))&&(this.selectedConnection=null,this.parentState.isDrag=!0,this.mouseState.mouse={...e},this.mouseState.position={...e},this.mouseState.positionStart={...e},this.selectedLineType="solid",this.selectedItem=null)},handleParentClickOutside(t){const e=t.target,n=this.$refs["organization-wrapper"];e&&n&&!n.contains(e)&&!e.isSameNode(n)&&(this.isItemMoved=!1,this.parentState.isDrag=!1,this.draggedItem=null,this.connectorState={from:null,fromRect:null,path:void 0,toCoordinates:null},this.pointState={fromRect:null,target:null,toCoordinates:null},this.selectedItem=null)},handleParentDragEnd(t){const{x:e,y:n}=this.getCoordinatesEnd(t),{coordinates:o}=this.canvasState,i=o.x+-(this.mouseState.position.x-e),a=o.y+-(this.mouseState.position.y-n);if(this.parentState.isDrag)this.canvasState.coordinates={x:i,y:a};else if(this.connectorState.from){const s=t.target;if(s.id!==this.connectorState.from&&s.classList.contains("io")&&!this.isConnectionExist(this.connectorState.from,s.id)){const c=this.connectorState.from.split("-io-")[0],l=Number(this.connectorState.from.split("-io-")[1]),d=Number(c.split("-item-")[1]),h=s.id.split("-io-")[0],u=Number(s.id.split("-io-")[1]),m=Number(h.split("-item-")[1]);if(this.localList[d]&&this.localList[m]&&this.connectorState.fromRect){const f=[...this.localList];f[d].connections=[...f[d].connections||[],{from:{io:l,item:d},to:{io:u,item:m},type:"solid"}],this.localList=[...f]}}}else if(this.draggedItem&&!this.isItemMoved){const{key:s}=this.draggedItem,r=Number(String(s).split("-item-")[1]);this.$emit("clickItem",this.localList[r],r)}this.$nextTick(()=>{(this.draggedItem||this.pointState.target||this.connectorState.from)&&this.$nextTick(()=>this.$emit("change",this.localList)),this.isItemMoved=!1,this.parentState.isDrag=!1,this.draggedItem=null,this.connectorState={from:null,fromRect:null,path:void 0,toCoordinates:null},this.pointState={fromRect:null,target:null,toCoordinates:null}})},async handleParentKeydown(t){if(t.key==="Delete"||t.key==="Backspace"){if(this.selectedConnection){t.preventDefault();const e=this.selectedConnection.key.split("-connection-");this.selectedConnection=null;const n=Number(e[0].split("-item-")[1]),o=Number(e[1]);if(this.localList[n]){const i=[...this.localList[n].connections||[]];this.localList[n].connections=i.filter((a,s)=>s!==o),this.$nextTick(()=>{this.$emit("change",this.localList)})}}else if(this.selectedItem){t.preventDefault();const e=Number(this.selectedItem.key.split("-item-")[1]),o=[...[...this.localList].filter((i,a)=>a!==e)].map(i=>{if(i.connections){const a=[...i.connections].filter(s=>s.from.item!==e&&s.to.item!==e).map(s=>s.from.item>e||s.to.item>e?{...s,...s.from.item>e&&{from:{...s.from,item:s.from.item-1}},...s.to.item>e&&{to:{...s.to,item:s.to.item-1}}}:s);return{...i,connections:a}}return i});this.localList=[...o],this.$nextTick(()=>{this.$emit("change",this.localList)})}}},handleParentPointerDown(t){this.parentPointerState.events.push(t)},handleParentPointerMove(t){this.parentPointerState.events=[...this.parentPointerState.events].map(e=>e.pointerId===t.pointerId?t:e),this.$nextTick(()=>{if(this.parentPointerState.events.length===2){const e=Math.abs(this.parentPointerState.events[0].clientX-this.parentPointerState.events[1].clientX);this.parentPointerState.prevDiff>100&&e>this.parentPointerState.prevDiff?this.doParentZoom(.1):this.parentPointerState.prevDiff>100&&e<this.parentPointerState.prevDiff&&this.doParentZoom(-.1),this.parentPointerState.prevDiff=e}})},handleParentPointerUp(t){this.parentPointerState.events=[...this.parentPointerState.events].filter(e=>e.pointerId!==t.pointerId),this.$nextTick(()=>{this.parentPointerState.events.length<2&&(this.parentPointerState.prevDiff=-1)})},handleParentPosition(t){const e=this.pointState.target?5:this.connectorState.from?1:10,{x:n,y:o}=this.getCoordinatesMove(t,e),{x:i,y:a}=this.parentState.position,{coordinates:s,zoom:r}=this.canvasState,c=this.getCanvasRect();if(this.parentState.isDrag){const l=s.x+-(this.mouseState.position.x-n),d=s.y+-(this.mouseState.position.y-o);this.canvasStyle={transform:`translate(${l}px, ${d}px) scale(${r})`}}else if(this.draggedItem){t.preventDefault();const{x:l,y:d}=this.mouseState.position,h=(l-n)*((c==null?void 0:c.width)||0)/(((c==null?void 0:c.width)||0)*r),u=(d-o)*((c==null?void 0:c.height)||0)/(((c==null?void 0:c.height)||0)*r);this.handleItemChangePosition({x:Math.round((this.draggedItem.elem.offsetLeft-h)/10)*10,y:Math.round((this.draggedItem.elem.offsetTop-u)/10)*10}),this.$nextTick(()=>this.mouseState.position={x:n,y:o})}else if(this.connectorState.from)this.connectorState.toCoordinates={x:n,y:o},this.$nextTick(()=>this.doSetTempConnectionPath());else if(this.pointState.target&&this.canvasState.elem&&(n!==i||o!==a)){const{height:l,width:d,x:h,y:u}=this.canvasState.elem.getBoundingClientRect().toJSON(),m=n*(d/(d*r))-h*(d/(d*r)),f=o*(l/(l*r))-u*(l/(l*r)),{target:p}=this.pointState,b=[...this.localList[p.item].connections||[]],S=[...b[p.connection].points||[]];S[p.point]={x:Math.round(m/5)*5,y:Math.round(f/5)*5},this.doUpdatePointMovedConnection([...S],p.connection,p.item),b[p.connection]={...b[p.connection],points:[...S]},this.localList[p.item].connections=[...b]}this.parentState.position={x:n,y:o},t.type==="touchmove"&&(this.mouseState.mouse={x:n,y:o})},handleParentZoom(t){t.ctrlKey&&(t.preventDefault(),t.deltaY>0&&this.canvasState.zoom>.5?this.doParentZoom(-.1):this.canvasState.zoom<1.6&&this.doParentZoom(.1))},handlePointDragged(t,e){this.pointState.target={...t},this.pointState.fromRect={...e.toJSON()}},handleSelectConnection(t){this.selectedConnection={...t},this.selectedLineType=t.type||"solid"},isConnectionExist(t,e){return[...this.localList].flatMap(o=>o.connections?[...o.connections]:[]).some(o=>{const i=`org-${this.$.uid}-item-${o.from.item}-io-${o.from.io}`,a=`org-${this.$.uid}-item-${o.to.item}-io-${o.to.io}`;return t===i&&e===a||t===a&&e===i})},isItemDragged(t){var e;return((e=this.draggedItem)==null?void 0:e.key)===t&&this.isItemMoved},isItemSelected(t){var e;return((e=this.selectedItem)==null?void 0:e.key)===t}},watch:{list:{deep:!0,handler(t){this.localList=[...t]},immediate:!0}},mounted(){this.$refs["canvas-tree"]&&(this.canvasState.elem=this.$refs["canvas-tree"]),document.addEventListener("keydown",this.handleParentKeydown),document.addEventListener("click",t=>this.handleParentClickOutside(t))},unmounted(){this.canvasState.elem=null,document.removeEventListener("keydown",this.handleParentKeydown),document.removeEventListener("click",t=>this.handleParentClickOutside(t))},expose:["doExport"]});const Xe=["id"],Ue=["id"],Je={key:0,class:"connection connecting",xmlns:"http://www.w3.org/2000/svg"},Ne=["d"],Ke={key:0,class:"connection-options-wrapper",ref:"connection-options-wrapper"},Qe=["id"];function _e(t,e,n,o,i,a){const s=et("sb-org-tree-item"),r=et("sb-dropdown");return g(),y("div",nt({class:"organization-wrapper-parent"},{...t.$attrs}),[M("div",{class:F([{connecting:t.connectorState.from,dragging:t.parentState.isDrag},"organization-wrapper"]),id:`org-${t.$.uid}`,ref:"organization-wrapper",onMousedown:e[1]||(e[1]=w((...c)=>t.handleParentClick&&t.handleParentClick(...c),["stop"])),onMousemove:e[2]||(e[2]=w((...c)=>t.handleParentPosition&&t.handleParentPosition(...c),["stop"])),onMouseup:e[3]||(e[3]=w((...c)=>t.handleParentDragEnd&&t.handleParentDragEnd(...c),["stop"])),onPointercancel:e[4]||(e[4]=(...c)=>t.handleParentPointerUp&&t.handleParentPointerUp(...c)),onPointerdown:e[5]||(e[5]=(...c)=>t.handleParentPointerDown&&t.handleParentPointerDown(...c)),onPointerleave:e[6]||(e[6]=(...c)=>t.handleParentPointerUp&&t.handleParentPointerUp(...c)),onPointermove:e[7]||(e[7]=(...c)=>t.handleParentPointerMove&&t.handleParentPointerMove(...c)),onPointerout:e[8]||(e[8]=(...c)=>t.handleParentPointerUp&&t.handleParentPointerUp(...c)),onPointerup:e[9]||(e[9]=(...c)=>t.handleParentPointerUp&&t.handleParentPointerUp(...c)),onTouchend:e[10]||(e[10]=w((...c)=>t.handleParentDragEnd&&t.handleParentDragEnd(...c),["stop"])),onTouchmove:e[11]||(e[11]=w((...c)=>t.handleParentPosition&&t.handleParentPosition(...c),["stop"])),onTouchstart:e[12]||(e[12]=w((...c)=>t.handleParentClick&&t.handleParentClick(...c),["stop"])),onWheel:e[13]||(e[13]=w((...c)=>t.handleParentZoom&&t.handleParentZoom(...c),["stop"]))},[M("div",{class:F(["canvas",{"connection-selected":t.selectedConnection}]),ref:"canvas-tree",id:`canvas-tree-${t.$.uid}`,style:H(t.canvasStyle)},[t.canvasState.elem?(g(),y(I,{key:0},[(g(!0),y(I,null,L(t.localList,(c,l)=>(g(),Ft(s,nt({"canvas-state":t.canvasState,"connector-state":t.connectorState,"is-dragged":t.isItemDragged(`org-${t.$.uid}-item-${l}`),"is-selected":t.isItemSelected(`org-${t.$.uid}-item-${l}`),key:`org-${t.$.uid}-item-${l}`,"selected-connection":t.selectedConnection},{isEditable:t.isEditable,item:c},{onChangePoint:t.handleChangeItemPoint,onClickItem:t.handleClickItem,onDragConnection:t.handleConnectionDragged,onDragItem:t.handleItemDragged,onDragPoint:t.handlePointDragged,onSelectConnection:t.handleSelectConnection}),null,16,["canvas-state","connector-state","is-dragged","is-selected","selected-connection","onChangePoint","onClickItem","onDragConnection","onDragItem","onDragPoint","onSelectConnection"]))),128)),t.connectorState.from?(g(),y("svg",Je,[M("path",{d:t.connectorState.path},null,8,Ne)])):R("",!0)],64)):R("",!0)],14,Ue),t.selectedConnection?(g(),y("div",Ke,[Rt(r,{flat:"","opt-value":"value",type:"flat",modelValue:t.selectedLineType,"onUpdate:modelValue":e[0]||(e[0]=c=>t.selectedLineType=c),list:t.lineType,"opt-label":t.getOptionLine,onChange:t.handleChangeLineType},null,8,["modelValue","list","opt-label","onChange"])],512)):R("",!0)],42,Xe),t.isExporting?(g(),y("div",{key:0,class:"export-area-org-chart",id:`org-${t.$.uid}-export-area`,style:H(t.exportAreaStyle)},null,12,Qe)):R("",!0)],16)}const Q=$t(Bt,[["render",_e]]);Bt.__docgenInfo={displayName:"sb-organization-tree",exportName:"default",description:"",tags:{},props:[{name:"isEditable",type:{name:"boolean"},required:!1},{name:"list",type:{name:"IOrganizationTreeItem[]"},required:!0}],events:[{name:"change",type:{names:["undefined"]}},{name:"clickItem",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]}],methods:[{name:"doExport",tags:{}}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/organization-tree/organization-tree.vue"]};const{UPDATE_STORY_ARGS:tn}=__STORYBOOK_MODULE_CORE_EVENTS__,un={title:"Components/Organization Tree",component:Q,tags:["autodocs"],argTypes:{isEditable:{control:"boolean",description:"Is tree editable"},list:{control:"object",description:"Organization Tree items"},onChange:{action:"change",control:!1,description:"Fired when tree changed by user drag",table:{category:"events",type:{summary:"(list: IOrganizationTreeItem[]) => void"}},type:"function"},onClickItem:{action:"click",control:!1,description:"Fired when user click on tree item",table:{category:"events",type:{summary:"(item: IOrganizationTreeItem, index: number) => void"}},type:"function"}},args:{list:[{coordinates:{x:250,y:10},name:"Nicolas Saputra hehehehehehehe alsdkjasjdklasdjajsdjklajsdalsjdjalsjdajdalsjdalksjdalkjsdklajsdljasldjaslkjdasdajsldkjasldjaskldjlasldkjasldas",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"alsdkjasjdklasdjajsdjklajsdalsjdjalsjdajdalsjdalksjdalkjsdklajsdljasldjaslkjdasdajsldkjasldjaskldjlasldkjasldas",connections:[{from:{io:5,item:0},to:{io:2,item:1}}]},{coordinates:{x:270,y:120},department:"Software Engineering",connections:[{from:{io:5,item:1},to:{io:2,item:2}}]},{coordinates:{x:250,y:190},name:"Ospan Ali",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Head of Software Engineering",connections:[{from:{io:0,item:2},to:{io:2,item:3},points:[{x:140,y:230}]},{from:{io:7,item:2},to:{io:3,item:4},points:[{x:520,y:230}]}]},{coordinates:{x:30,y:320},name:"Ellie",photo:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Jr. Software Engineer"},{coordinates:{x:360,y:320},name:"Owen",photo:"https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Software Engineer",connections:[{from:{io:4,item:4},to:{io:2,item:5},points:[{x:420,y:430},{x:370,y:430}]},{from:{io:6,item:4},to:{io:2,item:6},points:[{x:520,y:430},{x:670,y:430}]}]},{coordinates:{x:260,y:470},name:"David",photo:"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Front-End Engineer"},{coordinates:{x:560,y:470},name:"Motoki",photo:"https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Back-End Engineer"}]},decorators:[(t,e)=>(delete e.args.change,e.args.onChange=n=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(tn,{storyId:e.id,updatedArgs:{list:n}})},e.args.onClickItem=(n,o)=>{console.log(n,o,"item clicked")},t())],parameters:{docs:{controls:{exclude:["change"],sort:"requiredFirst"}}},render:t=>({components:{OrganizationTree:Q},setup(){return{args:t}},template:'<div style="height: 100vh; width: 100%; display: flex; justify-content: center; align-items: center;"><OrganizationTree v-bind="args" /></div>'})},O={args:{}},A={args:{isEditable:!0}},z={args:{list:[{coordinates:{x:250,y:10},name:"Griffin Woldridge",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"CEO",connections:[{from:{io:5,item:0},to:{io:2,item:1}}],renderInfo:t=>`<p style="margin: 0;">additional info: ${t.position}</p>`},{coordinates:{x:270,y:120},department:"Software Engineering",connections:[{from:{io:5,item:1},to:{io:2,item:2}}]},{coordinates:{x:250,y:190},name:"Ospan Ali",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Head of Software Engineering",connections:[{from:{io:0,item:2},to:{io:2,item:3},points:[{x:140,y:230}]},{from:{io:7,item:2},to:{io:3,item:4},points:[{x:520,y:230}]}]},{coordinates:{x:30,y:320},name:"Ellie",photo:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Jr. Software Engineer"},{coordinates:{x:360,y:320},name:"Owen",photo:"https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Software Engineer",connections:[{from:{io:4,item:4},to:{io:2,item:5},points:[{x:420,y:430},{x:370,y:430}]},{from:{io:6,item:4},to:{io:2,item:6},points:[{x:520,y:430},{x:670,y:430}]}]},{coordinates:{x:260,y:470},name:"David",photo:"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Front-End Engineer"},{coordinates:{x:560,y:470},name:"Motoki",photo:"https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Back-End Engineer"}]}},Y={args:{},render:t=>({components:{Button:Lt,OrganizationTree:Q},setup(){return{args:t,list1:[{id:"internal-a7395579-dafa-44eb-9c9d-d4b1a559b984",name:"Wadda Karmila",photo:"https://master.simampu.system-dev.online/v1/File/inline/download?id=21105dba-639a-4105-8a8f-f78746b96057",position:"Deputi Bidang Logistik dan Peralatan",coordinates:{x:420,y:30},connections:[{from:{io:5,item:0},to:{io:2,item:3},type:"solid"},{from:{io:5,item:0},to:{io:2,item:2},type:"solid",points:[{x:575,y:225},{x:820,y:230}]},{from:{io:5,item:0},to:{io:7,item:1},type:"dotted"},{from:{io:7,item:0},to:{io:0,item:4},type:"dashed"}]},{id:"internal-2160332f-4a7d-4bca-b531-96b8029ee6d7",name:"Yaumi Aziza",photo:"https://master.simampu.system-dev.online/v1/File/inline/download?id=327c79f4-c78f-4971-9107-9d9deb3e66f5",position:"Seketariat",coordinates:{x:180,y:150}},{id:"internal-208a04ec-daa6-4323-974b-7b83fa04f06c",name:"Yandi Nugraha",photo:"https://master.simampu.system-dev.online/v1/File/inline/download?id=b5478ecd-8dfe-4b8f-8af5-3326740de37d",position:"Kepala Bagian Logistik",coordinates:{x:700,y:300}},{id:"internal-42c3430d-7b94-4bc7-9e27-daa49b21a3c0",name:"Angun",photo:"https://master.simampu.system-dev.online/v1/File/inline/download?id=2c8be452-d427-4644-9ad0-c7820947c8a2",position:"admin ",coordinates:{x:460,y:300}},{id:"internal-25c25abd-9d05-4fc5-99e3-95f99173e850",name:"Mawar Aulia",photo:"https://master.simampu.system-dev.online/v1/File/inline/download?id=fd364d34-fc38-4c93-87b4-eb535325dd07",position:"admin Kab/kot",coordinates:{x:870,y:20}}],list2:[{id:"internal-a7395579-dafa-44eb-9c9d-d4b1a559b984",name:"Wadda Karmila",photo:"https://master.simampu.system-dev.online/v1/File/inline/download?id=21105dba-639a-4105-8a8f-f78746b96057",position:"Deputi Bidang Logistik dan Peralatan",additionalInfo:{oldPosition:"Deputi Bidang Logistik dan Peralatan"},coordinates:{x:-140,y:-50},connections:[{from:{io:5,item:0},to:{io:7,item:3},type:"solid",points:[{x:15,y:230}]},{from:{io:5,item:0},to:{io:0,item:1},type:"solid",points:[{x:15,y:230}]},{from:{io:7,item:0},to:{io:0,item:2},type:"solid"}]},{id:"internal-2160332f-4a7d-4bca-b531-96b8029ee6d7",name:"Yaumi Aziza",photo:"https://master.simampu.system-dev.online/v1/File/inline/download?id=327c79f4-c78f-4971-9107-9d9deb3e66f5",position:"Seketariat",additionalInfo:{oldPosition:"Seketariat"},coordinates:{x:70,y:190}},{id:"internal-42c3430d-7b94-4bc7-9e27-daa49b21a3c0",name:"Angun",photo:"https://master.simampu.system-dev.online/v1/File/inline/download?id=2c8be452-d427-4644-9ad0-c7820947c8a2",position:"admin ",additionalInfo:{oldPosition:"admin "},coordinates:{x:310,y:-40}},{id:"internal-25c25abd-9d05-4fc5-99e3-95f99173e850",name:"Mawar Aulia",photo:"https://master.simampu.system-dev.online/v1/File/inline/download?id=fd364d34-fc38-4c93-87b4-eb535325dd07",position:"admin Kab/kot",additionalInfo:{oldPosition:"admin Kab/kot"},coordinates:{x:-280,y:200}}]}},methods:{async onClickButton(){if(this.$refs["example-org-chart"]){const e=await this.$refs["example-org-chart"].doExport();console.log(e)}},async onClickButtonTwo(){if(this.$refs["example-org-chart-2"]){const e=await this.$refs["example-org-chart-2"].doExport();console.log(e)}}},template:'<div style="height: 100vh; width: 100%; display: block; justify-content: center; align-items: center;"><Button color="accent" @click="onClickButton">Export See Console for result</Button><OrganizationTree ref="example-org-chart" v-bind="{...args, list: list1}" /><Button color="accent" @click="onClickButtonTwo">Export See Console for result</Button><OrganizationTree ref="example-org-chart-2" v-bind="{...args, list: list2}" /></div>'})};var dt,mt,ht;O.parameters={...O.parameters,docs:{...(dt=O.parameters)==null?void 0:dt.docs,source:{originalSource:`{
  args: {}
}`,...(ht=(mt=O.parameters)==null?void 0:mt.docs)==null?void 0:ht.source}}};var ut,pt,ft;A.parameters={...A.parameters,docs:{...(ut=A.parameters)==null?void 0:ut.docs,source:{originalSource:`{
  args: {
    isEditable: true
  }
}`,...(ft=(pt=A.parameters)==null?void 0:pt.docs)==null?void 0:ft.source}}};var gt,yt,wt;z.parameters={...z.parameters,docs:{...(gt=z.parameters)==null?void 0:gt.docs,source:{originalSource:`{
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
        }
      }],
      renderInfo: (item: IOrganizationTreeItem) => \`<p style="margin: 0;">additional info: \${item.position}</p>\`
    }, {
      coordinates: {
        x: 270,
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
        }
      }]
    }, {
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
        points: [{
          x: 140,
          y: 230
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
        points: [{
          x: 520,
          y: 230
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
        points: [{
          x: 420,
          y: 430
        }, {
          x: 370,
          y: 430
        }]
      }, {
        from: {
          io: 6,
          item: 4
        },
        to: {
          io: 2,
          item: 6
        },
        points: [{
          x: 520,
          y: 430
        }, {
          x: 670,
          y: 430
        }]
      }]
    }, {
      coordinates: {
        x: 260,
        y: 470
      },
      name: 'David',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
      position: 'Front-End Engineer'
    }, {
      coordinates: {
        x: 560,
        y: 470
      },
      name: 'Motoki',
      photo: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
      position: 'Back-End Engineer'
    }]
  }
}`,...(wt=(yt=z.parameters)==null?void 0:yt.docs)==null?void 0:wt.source}}};var bt,St,xt;Y.parameters={...Y.parameters,docs:{...(bt=Y.parameters)==null?void 0:bt.docs,source:{originalSource:`{
  args: {},
  render: args => ({
    components: {
      Button,
      OrganizationTree
    },
    setup() {
      // return {
      // 	args: {
      // 		...args,
      // 		ref: 'example-org-chart',
      // 	},
      // }
      return {
        args,
        list1: [{
          id: 'internal-a7395579-dafa-44eb-9c9d-d4b1a559b984',
          name: 'Wadda Karmila',
          photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=21105dba-639a-4105-8a8f-f78746b96057',
          position: 'Deputi Bidang Logistik dan Peralatan',
          coordinates: {
            x: 420,
            y: 30
          },
          connections: [{
            from: {
              io: 5,
              item: 0
            },
            to: {
              io: 2,
              item: 3
            },
            type: 'solid'
          }, {
            from: {
              io: 5,
              item: 0
            },
            to: {
              io: 2,
              item: 2
            },
            type: 'solid',
            points: [{
              x: 575,
              y: 225
            }, {
              x: 820,
              y: 230
            }]
          }, {
            from: {
              io: 5,
              item: 0
            },
            to: {
              io: 7,
              item: 1
            },
            type: 'dotted'
          }, {
            from: {
              io: 7,
              item: 0
            },
            to: {
              io: 0,
              item: 4
            },
            type: 'dashed'
          }]
        }, {
          id: 'internal-2160332f-4a7d-4bca-b531-96b8029ee6d7',
          name: 'Yaumi Aziza',
          photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=327c79f4-c78f-4971-9107-9d9deb3e66f5',
          position: 'Seketariat',
          coordinates: {
            x: 180,
            y: 150
          }
        }, {
          id: 'internal-208a04ec-daa6-4323-974b-7b83fa04f06c',
          name: 'Yandi Nugraha',
          photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=b5478ecd-8dfe-4b8f-8af5-3326740de37d',
          position: 'Kepala Bagian Logistik',
          coordinates: {
            x: 700,
            y: 300
          }
        }, {
          id: 'internal-42c3430d-7b94-4bc7-9e27-daa49b21a3c0',
          name: 'Angun',
          photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=2c8be452-d427-4644-9ad0-c7820947c8a2',
          position: 'admin ',
          coordinates: {
            x: 460,
            y: 300
          }
        }, {
          id: 'internal-25c25abd-9d05-4fc5-99e3-95f99173e850',
          name: 'Mawar Aulia',
          photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=fd364d34-fc38-4c93-87b4-eb535325dd07',
          position: 'admin Kab/kot',
          coordinates: {
            x: 870,
            y: 20
          }
        }],
        list2: [{
          id: 'internal-a7395579-dafa-44eb-9c9d-d4b1a559b984',
          name: 'Wadda Karmila',
          photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=21105dba-639a-4105-8a8f-f78746b96057',
          position: 'Deputi Bidang Logistik dan Peralatan',
          additionalInfo: {
            oldPosition: 'Deputi Bidang Logistik dan Peralatan'
          },
          coordinates: {
            x: -140,
            y: -50
          },
          connections: [{
            from: {
              io: 5,
              item: 0
            },
            to: {
              io: 7,
              item: 3
            },
            type: 'solid',
            points: [{
              x: 15,
              y: 230
            }]
          }, {
            from: {
              io: 5,
              item: 0
            },
            to: {
              io: 0,
              item: 1
            },
            type: 'solid',
            points: [{
              x: 15,
              y: 230
            }]
          }, {
            from: {
              io: 7,
              item: 0
            },
            to: {
              io: 0,
              item: 2
            },
            type: 'solid'
          }]
        }, {
          id: 'internal-2160332f-4a7d-4bca-b531-96b8029ee6d7',
          name: 'Yaumi Aziza',
          photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=327c79f4-c78f-4971-9107-9d9deb3e66f5',
          position: 'Seketariat',
          additionalInfo: {
            oldPosition: 'Seketariat'
          },
          coordinates: {
            x: 70,
            y: 190
          }
        }, {
          id: 'internal-42c3430d-7b94-4bc7-9e27-daa49b21a3c0',
          name: 'Angun',
          photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=2c8be452-d427-4644-9ad0-c7820947c8a2',
          position: 'admin ',
          additionalInfo: {
            oldPosition: 'admin '
          },
          coordinates: {
            x: 310,
            y: -40
          }
        }, {
          id: 'internal-25c25abd-9d05-4fc5-99e3-95f99173e850',
          name: 'Mawar Aulia',
          photo: 'https://master.simampu.system-dev.online/v1/File/inline/download?id=fd364d34-fc38-4c93-87b4-eb535325dd07',
          position: 'admin Kab/kot',
          additionalInfo: {
            oldPosition: 'admin Kab/kot'
          },
          coordinates: {
            x: -280,
            y: 200
          }
        }]
      };
    },
    methods: {
      async onClickButton() {
        if (this.$refs['example-org-chart']) {
          const base64: string | null = await this.$refs['example-org-chart'].doExport();
          console.log(base64);
        }
      },
      async onClickButtonTwo() {
        if (this.$refs['example-org-chart-2']) {
          const base64: string | null = await this.$refs['example-org-chart-2'].doExport();
          console.log(base64);
        }
      }
    },
    template: '<div style="height: 100vh; width: 100%; display: block; justify-content: center; align-items: center;"><Button color="accent" @click="onClickButton">Export See Console for result</Button><OrganizationTree ref="example-org-chart" v-bind="{...args, list: list1}" /><Button color="accent" @click="onClickButtonTwo">Export See Console for result</Button><OrganizationTree ref="example-org-chart-2" v-bind="{...args, list: list2}" /></div>'
  })
}`,...(xt=(St=Y.parameters)==null?void 0:St.docs)==null?void 0:xt.source}}};const pn=["Default","Editable","RenderInfo","ExportImage"];export{O as Default,A as Editable,Y as ExportImage,z as RenderInfo,pn as __namedExportsOrder,un as default};
