import{e as $,s as S,o as n,g as l,F as f,D as B,n as w,k,j as h,m as y,v as R,E,x as D,y as M,z as P,B as j,t as A,q as L,f as b,u as G,T as z,l as X}from"./vue.esm-bundler-1a22c5b9.js";import{P as I}from"./progress-circular-dd70a24d.js";import{_ as F}from"./_plugin-vue_export-helper-c27b6911.js";import{T as Q}from"./form-input-72d9bcc9.js";import{x as Y,a as Z}from"./icons-69f7cd3d.js";import{r as N}from"./helper-91f3687e.js";const T=(e,t)=>e?typeof t=="string"?e[t]:t(e):"",_=$({emits:{listChange:e=>!0,select:(e,t)=>!0},props:{activeOption:{required:!0,type:Number},infinite:{required:!1,type:Boolean},isOpen:{required:!0,type:Boolean},isScrollBottom:{required:!0,type:Boolean},multi:{required:!1,type:Boolean},noResultText:{default:"No Results Found...",type:String},onAjax:{required:!1,type:Function},optLabel:{required:!0,type:[String,Function]},selected:{required:!1,type:Object},serverSide:{required:!1,type:Object},term:{required:!0,type:String}},name:"sb-form-dropdown-option-ajax",components:{"sb-circular":I},data(){return{localAbort:null,localList:[],localLoading:!1,localPage:0}},methods:{doSelect(e){this.localLoading||this.$emit("select",e,this.isSelected(e))},async handleAjax(){var e,t,s,a,p,c,i;try{if((e=this.serverSide)!=null&&e.url){this.localLoading=!0;let o={headers:((s=(t=this.serverSide)==null?void 0:t.options)==null?void 0:s.headers)||{},payload:{...((p=(a=this.serverSide)==null?void 0:a.options)==null?void 0:p.payload)||{},term:this.term,page:this.localPage}};if(this.onAjax){const d=this.onAjax({headers:{...o.headers},payload:{...o.payload}},"BEFORE SEND",this.infinite&&this.isScrollBottom);o={...o,...d}}const r=new XMLHttpRequest;(i=(c=this.serverSide)==null?void 0:c.options)!=null&&i.withCredential&&(r.withCredentials=!0),this.localAbort&&this.localAbort.abort(),this.localAbort=r;const v=()=>{var d,m;return!((d=this.serverSide)!=null&&d.method)||((m=this.serverSide)==null?void 0:m.method)==="GET"?null:JSON.stringify(o.payload||{})},C=()=>{var d,m,O,q,g;if((d=this.serverSide)!=null&&d.url){if(((m=this.serverSide)==null?void 0:m.method)==="GET"||!((O=this.serverSide)!=null&&O.method)){const K=new URLSearchParams(o.payload||{}).toString();return`${(q=this.serverSide)==null?void 0:q.url}?${K}`}return(g=this.serverSide)==null?void 0:g.url}return""},u=this;await new Promise((d,m)=>{var O,q;r.open(((O=u.serverSide)==null?void 0:O.method)||"GET",C()),((q=u.serverSide)==null?void 0:q.method)==="POST"&&r.setRequestHeader("Content-Type","application/json;charset=UTF-8"),Object.keys(o.headers).forEach(g=>{r.setRequestHeader(g,o.headers[g])}),r.onload=()=>{if(r.status!==200)m({status:r.status,statusText:r.statusText,response:r.response});else{const g=JSON.parse(r.response);d({status:r.status,statusText:r.statusText,response:g})}},r.onabort=()=>{m({status:"ERR_ABORTED",statusText:"ERR_ABORTED",response:{message:"ERR_ABORTED"}})},r.send(v())}).then(d=>{if(this.onAjax){const m=this.onAjax({data:d.response,httpResponse:{code:d.status,message:d.statusText},status:!0},"SUCCESS");this.infinite?this.localList=[...this.localList,...m]:this.localList=[...m]}else this.localList=d.response;this.localLoading=!1}).catch(d=>{this.localLoading=!1,this.infinite||(this.localList=[]),this.onAjax&&this.onAjax({data:null,httpResponse:{code:d.status||500,message:d.response.message},status:!1},"ERROR")})}}catch{}},isSelected(e){return this.selected?this.multi?this.selected.some(t=>JSON.stringify(t).indexOf(JSON.stringify(e))>-1):JSON.stringify(this.selected).indexOf(JSON.stringify(e))>-1:!1},renderOption(e){return T(e,this.optLabel)}},watch:{isOpen:{handler(e,t){e&&!t&&(this.localPage=0,this.$nextTick(()=>this.handleAjax())),this.localAbort&&this.localAbort.abort()},immediate:!0},isScrollBottom(e){e&&!this.localLoading&&this.isOpen&&(this.localPage+=1,this.$nextTick(()=>this.handleAjax()))},localList(e){this.$emit("listChange",e)},term:{handler(){this.localPage=0,this.localList=[],this.isOpen&&this.$nextTick(()=>this.handleAjax())}}},unmounted(){this.localAbort&&this.localAbort.abort()}});const x=["onClick"],ee=["innerHTML"],te={key:1,class:"no-result"},se={key:2,class:"loading-wrapper"};function ie(e,t,s,a,p,c){const i=S("sb-circular");return n(),l(f,null,[!e.localLoading||e.infinite?(n(!0),l(f,{key:0},B(e.localList,(o,r)=>(n(),l("div",{class:w(["option",{focus:e.activeOption===r,selected:e.isSelected(o)}]),key:o,onClick:k(v=>e.doSelect(o),["stop"])},[h("span",{innerHTML:e.renderOption(o)},null,8,ee)],10,x))),128)):y("",!0),!e.localLoading&&!e.localList.length?(n(),l("div",te,R(e.noResultText),1)):y("",!0),e.localLoading?(n(),l("div",se,[E(i,{indeterminate:"",size:36})])):y("",!0)],64)}const ne=F(_,[["render",ie],["__scopeId","data-v-baafdf2c"]]);_.__docgenInfo={displayName:"sb-form-dropdown-option-ajax",exportName:"default",description:"",tags:{},props:[{name:"activeOption",type:{name:"number"},required:!0},{name:"infinite",type:{name:"boolean"},required:!1},{name:"isOpen",type:{name:"boolean"},required:!0},{name:"isScrollBottom",type:{name:"boolean"},required:!0},{name:"multi",type:{name:"boolean"},required:!1},{name:"noResultText",type:{name:"string"},defaultValue:{func:!1,value:"'No Results Found...'"}},{name:"onAjax",type:{name:`(
    _resp: IServerSideHandler,
    _type: string | 'BEFORE SEND' | 'ERROR' | 'SUCCESS',
    _isLoadMore?: boolean,
) => void`},required:!1},{name:"optLabel",type:{name:"string|func"},required:!0},{name:"selected",type:{name:"any | any[]"},required:!1},{name:"serverSide",type:{name:"IServerSide"},required:!1},{name:"term",type:{name:"string"},required:!0}],events:[{name:"listChange",type:{names:["undefined"]}},{name:"select",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/form-dropdown/options/__option-ajax.vue"]};const V=$({props:{multi:{required:!1,type:Boolean},onDelete:{required:!1,type:Function},optLabel:{required:!0,type:[String,Function]},placeholder:{required:!1,type:String},selected:{required:!1,type:Object}},name:"sb-form-dropdown-input-plain",computed:{renderEmpty(){return!this.selected||this.selected&&(this.selected.length<1||Object.keys(this.selected).length<1)}},methods:{handleClear(e){return this.onDelete?this.onDelete(e):null},renderOption(e){return T(e,this.optLabel)}}});const H=e=>(D("data-v-8cd18354"),e=e(),M(),e),oe=H(()=>h("input",{class:"dummy",tabindex:"-1",type:"text"},null,-1)),le={key:0,class:"placeholder"},re=["onClick"],ae=H(()=>h("div",{class:"clear"},"x",-1)),de={class:"content"},pe=["innerHTML"],ue={key:1,class:"content"},he=["innerHTML"];function ce(e,t,s,a,p,c){return n(),l("div",{class:w(["dropdown-input-wrapper plain",{multi:e.multi}])},[oe,e.renderEmpty?(n(),l("span",le,R(e.placeholder||" "),1)):(n(),l(f,{key:1},[e.multi?(n(!0),l(f,{key:0},B(e.selected,(i,o)=>(n(),l("div",{class:"pill",key:i,onClick:k(r=>e.handleClear(o),["stop"])},[ae,h("div",de,[h("span",{innerHTML:e.renderOption(i)},null,8,pe)])],8,re))),128)):(n(),l("div",ue,[h("span",{innerHTML:e.renderOption(e.selected)},null,8,he)]))],64))],2)}const me=F(V,[["render",ce],["__scopeId","data-v-8cd18354"]]);V.__docgenInfo={displayName:"sb-form-dropdown-input-plain",exportName:"default",description:"",tags:{},props:[{name:"multi",type:{name:"boolean"},required:!1},{name:"onDelete",type:{name:"(_index?: number) => void"},required:!1},{name:"optLabel",type:{name:"string|func"},required:!0},{name:"placeholder",type:{name:"string"},required:!1},{name:"selected",type:{name:"any | any[]"},required:!1}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/form-dropdown/inputs/__input-plain.vue"]};const U=$({emits:{select:(e,t)=>!0},props:{activeOption:{required:!0,type:Number},isLoading:{required:!1,type:Boolean},list:{required:!0,type:Object},multi:{required:!1,type:Boolean},noResultText:{default:"No Results Found...",type:String},optLabel:{required:!0,type:[String,Function]},selected:{required:!1,type:Object}},name:"sb-form-dropdown-option-plain",components:{"sb-circular":I},methods:{doSelect(e){this.isLoading||this.$emit("select",e,this.isSelected(e))},isSelected(e){return this.selected?this.multi?this.selected.some(t=>JSON.stringify(t).indexOf(JSON.stringify(e))>-1):JSON.stringify(this.selected).indexOf(JSON.stringify(e))>-1:!1},renderOption(e){return T(e,this.optLabel)}}});const fe=["onClick"],ye=["innerHTML"],ge={key:0,class:"no-result"},Se={key:1,class:"loading-wrapper"};function be(e,t,s,a,p,c){const i=S("sb-circular");return n(),l(f,null,[(n(!0),l(f,null,B(e.list,(o,r)=>(n(),l("div",{class:w(["option",{focus:e.activeOption===r,selected:e.isSelected(o)}]),key:o,onClick:k(v=>e.doSelect(o),["stop"])},[h("span",{innerHTML:e.renderOption(o)},null,8,ye)],10,fe))),128)),!e.isLoading&&!e.list.length?(n(),l("div",ge,R(e.noResultText),1)):y("",!0),e.isLoading?(n(),l("div",Se,[E(i,{indeterminate:"",size:36})])):y("",!0)],64)}const ve=F(U,[["render",be],["__scopeId","data-v-63faf936"]]);U.__docgenInfo={displayName:"sb-form-dropdown-option-plain",exportName:"default",description:"",tags:{},props:[{name:"activeOption",type:{name:"number"},required:!0},{name:"isLoading",type:{name:"boolean"},required:!1},{name:"list",type:{name:"any[]"},required:!0},{name:"multi",type:{name:"boolean"},required:!1},{name:"noResultText",type:{name:"string"},defaultValue:{func:!1,value:"'No Results Found...'"}},{name:"optLabel",type:{name:"string|func"},required:!0},{name:"selected",type:{name:"any | any[]"},required:!1}],events:[{name:"select",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/form-dropdown/options/__option-plain.vue"]};const W=$({emits:{onBlur:()=>!0},props:{disabled:{required:!1,type:Boolean},isOpen:{required:!0,type:Boolean},multi:{required:!1,type:Boolean},onBlur:{required:!1,type:Function},onFocus:{required:!1,type:Function},onDelete:{required:!1,type:Function},onFilter:{required:!1,type:Function},optLabel:{required:!0,type:[String,Function]},placeholder:{required:!1,type:String},readOnly:{required:!1,type:Boolean},selected:{required:!1,type:Object}},name:"sb-form-dropdown-input-search",data(){return{termMulti:"",termSingle:""}},computed:{isEmpty(){return!this.selected||this.selected&&(this.selected.length<1||Object.keys(this.selected).length<1)}},methods:{handleBlur(){this.onBlur&&this.onBlur()},handleFocus(){this.onFocus&&this.onFocus()},handleSearchSelected(e){e.key!=="Backspace"&&this.selected&&!this.multi?e.preventDefault():e.key==="Backspace"&&!this.isEmpty&&(this.multi&&e.target.value===""||!this.multi)&&this.handleClear()},handleClear(e){this.onDelete&&this.onDelete(e)},handleFilterList(e){e=e.replace(/\s/g,"").toLowerCase(),this.onFilter&&this.onFilter(e)},handleSearchInput(e){this.handleFilterList(e.target.value),this.termMulti=this.termSingle=e.target.value},renderOption(e){return T(e,this.optLabel)}},watch:{isOpen(e){e||(this.multi?(this.termMulti="",this.handleFilterList("")):(this.termSingle="",this.handleFilterList("")))},selected(){this.multi||(this.termSingle="")}}});const Oe=e=>(D("data-v-5a829bfa"),e=e(),M(),e),qe={class:"content"},Le=["innerHTML"],$e=["placeholder"],we=["onClick"],ke=Oe(()=>h("div",{class:"clear"},"x",-1)),Fe={class:"content"},Be=["innerHTML"],Te=["placeholder"];function Ce(e,t,s,a,p,c){return n(),l("div",{class:w(["dropdown-input-wrapper search",{multi:e.multi,selected:e.selected}])},[e.multi?(n(),l(f,{key:1},[(n(!0),l(f,null,B(e.selected,(i,o)=>(n(),l("div",{class:"pill",key:i,onClick:k(r=>e.handleClear(o),["stop"])},[ke,h("div",Fe,[h("span",{innerHTML:e.renderOption(i)},null,8,Be)])],8,we))),128)),!e.disabled&&!e.readOnly?P((n(),l("input",{key:0,placeholder:e.isEmpty?e.placeholder:"",tabindex:-1,class:"input",autocomplete:"off","onUpdate:modelValue":t[6]||(t[6]=i=>e.termMulti=i),onBlur:t[7]||(t[7]=(...i)=>e.handleBlur&&e.handleBlur(...i)),onClick:t[8]||(t[8]=i=>e.isOpen&&i.stopPropagation()),onFocus:t[9]||(t[9]=(...i)=>e.handleFocus&&e.handleFocus(...i)),onKeydown:t[10]||(t[10]=i=>e.handleSearchSelected(i)),onKeyup:t[11]||(t[11]=i=>e.handleSearchInput(i))},null,40,Te)),[[j,e.termMulti]]):y("",!0)],64)):(n(),l(f,{key:0},[h("div",qe,[h("span",{innerHTML:e.renderOption(e.selected)},null,8,Le)]),!e.disabled&&!e.readOnly?P((n(),l("input",{key:0,placeholder:e.isEmpty?e.placeholder:"",tabindex:-1,class:"input",autocomplete:"off","onUpdate:modelValue":t[0]||(t[0]=i=>e.termSingle=i),onBlur:t[1]||(t[1]=(...i)=>e.handleBlur&&e.handleBlur(...i)),onClick:t[2]||(t[2]=i=>e.isOpen&&i.stopPropagation()),onFocus:t[3]||(t[3]=(...i)=>e.handleFocus&&e.handleFocus(...i)),onKeydown:t[4]||(t[4]=i=>e.handleSearchSelected(i)),onKeyup:t[5]||(t[5]=i=>e.handleSearchInput(i))},null,40,$e)),[[j,e.termSingle]]):y("",!0)],64))],2)}const Re=F(W,[["render",Ce],["__scopeId","data-v-5a829bfa"]]);W.__docgenInfo={displayName:"sb-form-dropdown-input-search",exportName:"default",description:"",tags:{},props:[{name:"disabled",type:{name:"boolean"},required:!1},{name:"isOpen",type:{name:"boolean"},required:!0},{name:"multi",type:{name:"boolean"},required:!1},{name:"onBlur",type:{name:"() => void"},required:!1},{name:"onFocus",type:{name:"() => void"},required:!1},{name:"onDelete",type:{name:"(_index?: number) => void"},required:!1},{name:"onFilter",type:{name:"(_term: string) => void"},required:!1},{name:"optLabel",type:{name:"string|func"},required:!0},{name:"placeholder",type:{name:"string"},required:!1},{name:"readOnly",type:{name:"boolean"},required:!1},{name:"selected",type:{name:"any | any[]"},required:!1}],events:[{name:"onBlur"}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/form-dropdown/inputs/__input-search.vue"]};const J=$({emits:{"update:modelValue":e=>!0,change:e=>!0,close:()=>!0,input:e=>!0,open:()=>!0},props:{allowClear:{required:!1,type:Boolean},disabled:{required:!1,type:Boolean},closeOnSelect:{default:!0,type:Boolean},errorMessage:{required:!1,type:[String,Function]},flat:{required:!1,type:Boolean},infinite:{required:!1,type:Boolean},isError:{required:!1,type:Boolean},isLoading:{required:!1,type:Boolean},label:{required:!1,type:String},list:{required:!1,type:Object},modelValue:{required:!1,type:Object},multi:{required:!1,type:Boolean},noResultText:{default:"No Results Found...",type:String},onAjax:{required:!1,type:Function},onPopulateList:{required:!1,type:Function},optLabel:{required:!0,type:[String,Function]},placeholder:{required:!1,type:String},readOnly:{required:!1,type:Boolean},required:{required:!1,type:Boolean},search:{required:!1,type:Boolean},serverSide:{required:!1,type:Object},value:{required:!1,type:Object}},name:"sb-form-dropdown",components:{"ajax-option":ne,"plain-input":me,"plain-option":ve,"sb-input":Q,"search-input":Re},data(){return{activeOption:-1,elem:null,icon:{onClick:null,placement:"append"},isFocus:!1,isOpen:!1,localList:[],localTerm:"",optWrapperStyles:{left:"0",top:"0",width:"0"},isScrollBottom:!1,parentWithScroll:null,selected:this.modelValue||this.value||null,termMulti:null,termSingle:null}},computed:{getIcon(){return this.allowClear&&(!this.multi&&this.selected||this.multi&&this.selected&&this.selected.length>0)?{...this.icon,onClick:this.handleClickIcon}:{...this.icon}},getIconSVG(){return this.allowClear&&(!this.multi&&this.selected||this.multi&&this.selected&&this.selected.length>0)?Y():Z()}},methods:{doSelect(e,t){t?this.closeOnSelect&&!this.multi&&(this.isOpen=!1,this.handleRemoveFocus()):(this.multi?this.selected?this.selected=[...this.selected,e]:this.selected=[e]:this.selected=e,this.$nextTick(()=>{this.handleUpdateModel(),this.closeOnSelect&&!this.multi&&(this.isOpen=!1,this.handleRemoveFocus())}))},handleAjax(e,t,s){return this.onAjax?this.onAjax(e,t,s):null},handleArrowEvent(e,t){if(this.isOpen){t.preventDefault();const s=document.querySelector(`[data-target="options-${this.$.uid}"]`);if(s){const a=s.children;let p=this.activeOption+e;this.activeOption<1&&p<0?p=a.length-1:this.activeOption===a.length-1&&p>a.length-1&&(p=0);const c=a.item(p);c==null||c.scrollIntoView(!1),this.activeOption=p}}},handleClear(e){if(!this.readOnly&&!this.disabled){if(typeof e<"u"){const t=[...this.selected];t.splice(e,1),this.selected=[...t]}else if(this.search||this.serverSide)if(this.multi){const t=[...this.selected];t.pop(),this.selected=[...t]}else this.selected=null;this.$nextTick(()=>{this.handleUpdateModel()})}},handleClickIcon(){this.allowClear&&(!this.multi&&this.selected||this.multi&&this.selected&&this.selected.length>0)&&(this.selected=null,this.$nextTick(()=>{this.handleUpdateModel()}))},handleFilterList(e){this.localTerm=e,this.serverSide||(this.onPopulateList&&this.isOpen?this.onPopulateList(e):(e=e.replace(/\s/g,"").toLowerCase(),this.localList=[...this.list||[]].filter(t=>JSON.stringify(t).toLowerCase().indexOf(e)>-1)))},handleKeyEvent(e){if(e.key==="ArrowDown"||e.key==="ArrowUp"){const t=e.key==="ArrowDown"?1:-1;this.isOpen||this.handleOpen(),this.$nextTick(()=>this.handleArrowEvent(t,e))}else if(e.key==="Enter"){if(this.isOpen){e.preventDefault(),e.stopPropagation();const t=document.querySelectorAll(`[data-target="options-${this.$.uid}"] .option`),s=Array.from(t).findIndex(a=>a.classList.contains("focus")&&!a.classList.contains("selected"));s>-1&&this.doSelect(this.localList[s])}}else(e.key==="Escape"||e.key==="Tab")&&(this.isOpen=!1,this.handleRemoveFocus())},handleListChange(e){this.localList=[...e]},handleOpen(){!this.readOnly&&!this.disabled&&!this.isOpen&&(this.isOpen=!0,this.$nextTick(()=>{this.setOptionsPosition()}))},handleParentBlur(e){const t=e.target,s=e.relatedTarget;t.contains(s)||(this.isOpen=!1,this.handleRemoveFocus())},handleParentClickOutside(e){const t=e.target,s=this.$refs["dropdown-wrapper"],a=this.$refs["options-wrapper"];t&&parent&&a&&!s.contains(t)&&!a.contains(t)&&!t.isSameNode(s)&&(this.isOpen=!1,this.handleRemoveFocus())},handleParentFocus(){const t=this.$el.getElementsByTagName("input");if((t==null?void 0:t.length)>0){const s=t.item(0);s==null||s.focus()}this.isFocus=!0,this.handleOpen()},handleParentScroll(e){const t=N(this.$el);this.parentWithScroll&&this.parentWithScroll.removeEventListener("scroll",()=>{this.setOptionsPosition()}),t&&(e?t.addEventListener("scroll",()=>{this.setOptionsPosition()}):t.removeEventListener("scroll",()=>{this.setOptionsPosition()})),this.$nextTick(()=>{this.parentWithScroll=t})},handleRemoveFocus(){this.isFocus=!1;const e=this.$el;e.blur();const t=e.getElementsByTagName("input");if((t==null?void 0:t.length)>0){const s=t.item(0);s==null||s.blur()}},handleUpdateModel(){this.multi&&this.$nextTick(()=>{this.setOptionsPosition()}),this.$emit("update:modelValue",this.selected),this.$emit("input",this.selected),this.$emit("change",this.selected)},onScrollBottom(e){const{scrollTop:t,offsetHeight:s,scrollHeight:a}=e.target;t+s+20>=a?(this.isScrollBottom=!0,this.onPopulateList&&this.onPopulateList(this.localTerm||"",!0)):this.isScrollBottom&&(this.isScrollBottom=!1)},setOptionsPosition(){var e;if(this.elem){const t=this.elem.getBoundingClientRect(),s=(e=this.$refs["options-wrapper"])==null?void 0:e.getBoundingClientRect();if(s)return document.body.getBoundingClientRect().height-(t.height+t.y)<=s.height?this.optWrapperStyles={left:`${t.x}px`,top:`${t.y-6-s.height}px`,width:`${t.width}px`}:this.optWrapperStyles={left:`${t.x}px`,top:`${t.y+t.height}px`,width:`${t.width}px`}}}},watch:{isOpen(e){this.handleParentScroll(e),e?this.$emit("open"):(this.$emit("close"),this.activeOption=-1,this.search&&(this.multi?this.termMulti=null:this.termSingle=null),!this.onPopulateList&&this.search&&this.handleFilterList(""))},list:{deep:!0,handler(e){e&&(this.localList=[...e])},immediate:!0},localList:{deep:!0,handler(){this.$nextTick(()=>{this.setOptionsPosition()})}},modelValue:{deep:!0,handler(e){this.selected=e}},value:{deep:!0,handler(e){this.selected=e}}},mounted(){const e=this.$refs["input-wrapper"].$el.children,t=Array.from(e).find(s=>s.classList.contains("input-group"));t&&(this.elem=t),this.elem&&this.setOptionsPosition(),this.icon.onClick=this.handleOpen,document.addEventListener("click",s=>this.handleParentClickOutside(s)),this.parentWithScroll=N(this.$el)},unmounted(){document.removeEventListener("click",e=>this.handleParentClickOutside(e)),this.parentWithScroll&&this.parentWithScroll.removeEventListener("scroll",()=>{this.setOptionsPosition()})}});const Ee=["data-target","tabindex"],Pe=["data-target"];function je(e,t,s,a,p,c){const i=S("plain-input"),o=S("search-input"),r=S("sb-input"),v=S("plain-option"),C=S("ajax-option");return n(),l("div",L({class:["dropdown-wrapper",{multi:e.multi,ajax:e.serverSide,expanded:e.isOpen,search:e.search||e.serverSide}],"data-target":`dropdown-${e.$.uid}`,tabindex:!e.disabled&&!e.readOnly?0:-1,ref:"dropdown-wrapper"},{...e.$attrs},{onBlur:t[2]||(t[2]=(...u)=>e.handleParentBlur&&e.handleParentBlur(...u)),onFocus:t[3]||(t[3]=(...u)=>e.handleParentFocus&&e.handleParentFocus(...u)),onKeydown:t[4]||(t[4]=(...u)=>e.handleKeyEvent&&e.handleKeyEvent(...u))}),[E(r,L({"error-message":e.errorMessage,icon:e.getIcon,"is-error":e.isError,"is-focus":e.isFocus,label:e.label,placeholder:e.placeholder,required:e.required,variant:e.flat?"flat":"default",ref:"input-wrapper"},{disabled:e.disabled,readOnly:e.readOnly},{modelValue:e.selected,"onUpdate:modelValue":t[0]||(t[0]=u=>e.selected=u),onClick:k(e.handleOpen,["stop"])}),{"icon-slot":A(()=>[(n(),b(X(e.getIconSVG)))]),"custom-input":A(()=>[!e.search&&!e.serverSide?(n(),b(i,{key:0,multi:e.multi,"on-delete":e.handleClear,"opt-label":e.optLabel,placeholder:e.placeholder,selected:e.selected},null,8,["multi","on-delete","opt-label","placeholder","selected"])):(n(),b(o,L({key:1,"is-open":e.isOpen,multi:e.multi,"on-blur":e.handleRemoveFocus,"on-delete":e.handleClear,"on-filter":e.handleFilterList,"on-focus":()=>e.isFocus=!0,"opt-label":e.optLabel,placeholder:e.placeholder,selected:e.selected},{disabled:e.disabled,readOnly:e.readOnly}),null,16,["is-open","multi","on-blur","on-delete","on-filter","on-focus","opt-label","placeholder","selected"]))]),_:1},16,["error-message","icon","is-error","is-focus","label","placeholder","required","variant","modelValue","onClick"]),(n(),b(z,{to:"body"},[e.isOpen?(n(),l("div",{key:0,class:w(["sb-dropdown-options-wrapper",{multi:e.multi,expanded:e.isOpen}]),"data-target":`options-${e.$.uid}`,style:G(e.optWrapperStyles),onScroll:t[1]||(t[1]=u=>(e.serverSide||e.search)&&e.infinite&&e.isOpen&&e.onScrollBottom(u)),ref:"options-wrapper"},[e.serverSide?(n(),b(C,L({key:1,"active-option":e.activeOption,"is-open":e.isOpen,multi:e.multi,"on-ajax":e.handleAjax,optLabel:e.optLabel,selected:e.selected,"server-side":e.serverSide,term:e.localTerm,infinite:e.infinite,"is-scroll-bottom":e.isScrollBottom},{noResultText:e.noResultText},{onListChange:e.handleListChange,onSelect:e.doSelect}),null,16,["active-option","is-open","multi","on-ajax","optLabel","selected","server-side","term","infinite","is-scroll-bottom","onListChange","onSelect"])):(n(),b(v,L({key:0,"active-option":e.activeOption,"is-loading":e.isLoading,list:e.localList,multi:e.multi,optLabel:e.optLabel,selected:e.selected},{noResultText:e.noResultText},{onSelect:e.doSelect}),null,16,["active-option","is-loading","list","multi","optLabel","selected","onSelect"]))],46,Pe)):y("",!0)]))],16,Ee)}const Ve=F(J,[["render",je]]);J.__docgenInfo={displayName:"sb-form-dropdown",exportName:"default",description:"",tags:{},props:[{name:"allowClear",type:{name:"boolean"},required:!1},{name:"disabled",type:{name:"boolean"},required:!1},{name:"closeOnSelect",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"errorMessage",type:{name:"string|func"},required:!1},{name:"flat",type:{name:"boolean"},required:!1},{name:"infinite",type:{name:"boolean"},required:!1},{name:"isError",type:{name:"boolean"},required:!1},{name:"isLoading",type:{name:"boolean"},required:!1},{name:"label",type:{name:"string"},required:!1},{name:"list",type:{name:"any[]"},required:!1},{name:"modelValue",type:{name:"Record<string, any> | Record<string, any>[] | null"},required:!1},{name:"multi",type:{name:"boolean"},required:!1},{name:"noResultText",type:{name:"string"},defaultValue:{func:!1,value:"'No Results Found...'"}},{name:"onAjax",type:{name:`(
    _resp: IServerSideHandler,
    _type: string | 'BEFORE SEND' | 'ERROR' | 'SUCCESS',
    _isLoadMore?: boolean,
) => void`},required:!1},{name:"onPopulateList",type:{name:"(_term: string, _isLoadMore?: boolean) => void"},required:!1},{name:"optLabel",type:{name:"string|func"},required:!0},{name:"placeholder",type:{name:"string"},required:!1},{name:"readOnly",type:{name:"boolean"},required:!1},{name:"required",type:{name:"boolean"},required:!1},{name:"search",type:{name:"boolean"},required:!1},{name:"serverSide",type:{name:"IServerSide"},required:!1},{name:"value",type:{name:"Record<string, any> | Record<string, any>[] | null"},required:!1}],events:[{name:"update:modelValue",type:{names:["undefined"]}},{name:"change",type:{names:["undefined"]}},{name:"close"},{name:"input",type:{names:["undefined"]}},{name:"open"}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/form-dropdown/form-dropdown.vue"]};export{Ve as D};
