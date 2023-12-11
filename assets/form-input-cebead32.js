import{e as q,o as l,g as s,j as t,n as o,v as b,m as u,p as h,F as d,z as g,A as k,q as p,B as I,C as V}from"./vue.esm-bundler-1a22c5b9.js";import{_ as M}from"./_plugin-vue_export-helper-c27b6911.js";const v=q({emits:{"update:modelValue":e=>!0,blur:e=>!0,focus:e=>!0,input:e=>!0,keydown:e=>!0},props:{autocomplete:{default:"on",type:String},disabled:{required:!1,type:Boolean},errorMessage:{required:!1,type:[String,Function]},icon:{required:!1,type:Object},isError:{required:!1,type:Boolean},isFocus:{required:!1,type:Boolean},label:{required:!1,type:String},max:{required:!1,type:[Number,String]},min:{required:!1,type:[Number,String]},modelValue:{required:!1,type:null},noSavePassword:{required:!1,type:Boolean},placeholder:{required:!1,type:String},readOnly:{required:!1,type:Boolean},required:{required:!1,type:Boolean},step:{required:!1,type:Number},tabindex:{required:!1,type:Number},textAlign:{default:"left",type:String},type:{default:"text",type:String},value:{required:!1,type:null},variant:{default:"default",required:!1,type:String}},name:"sb-form-input",data(){return{localIsFocus:!1,localValue:this.modelValue||this.value||null}},computed:{getInputType(){return this.type==="password"&&this.noSavePassword?"text":this.type},isFilled(){var e;return this.localValue!==null&&typeof this.localValue<"u"?this.type!=="number"?this.localValue!==""&&(((e=this.localValue)==null?void 0:e.length)||Object.keys(this.localValue).length>0):!0:!1}},methods:{handleBlur(e){this.localIsFocus=!1,this.$emit("blur",e)},handleChange(e){this.$emit("input",e),this.$emit("update:modelValue",this.localValue)},handleClickIcon(e){var n;return((n=this.icon)==null?void 0:n.onClick)&&this.icon.onClick(e)},handleClickOutsideInput(e){const n=e.target,r=this.$refs["input-wrapper"];n&&r&&!r.contains(n)&&!n.isSameNode(r)&&this.toggleFocus(!1)},handleErrorMessage(){return this.errorMessage?typeof this.errorMessage=="string"?this.errorMessage:this.errorMessage(this.localValue):""},handleInputFocus(e){this.localIsFocus=!0,this.$emit("focus",e)},handleMouseLeaveIcon(e){var n;return((n=this.icon)==null?void 0:n.onMouseLeave)&&this.icon.onMouseLeave(e)},handleMouseOverIcon(e){var n;return((n=this.icon)==null?void 0:n.onMouseOver)&&this.icon.onMouseOver(e)},toggleFocus(e,n){if(n){const r=n.target,i=r==null?void 0:r.querySelectorAll("input, textarea");i.length>0&&i[0].focus()}this.localIsFocus=e}},watch:{isFocus(e){this.localIsFocus=e},modelValue:{deep:!0,handler(e){this.localValue=e}},value:{deep:!0,handler(e){this.localValue=e}}},mounted(){document.addEventListener("click",e=>this.handleClickOutsideInput(e))},unmounted(){document.removeEventListener("click",e=>this.handleClickOutsideInput(e))}});const F={key:0,class:"asterisk"},w=["type","tabindex"],C=["tabindex"],O={class:"input-border"},S={class:"notch"},B={key:0,class:"asterisk"},$={key:0,class:"error-wrapper"},N=["innerHTML"];function E(e,n,r,i,c,L){var m,f,y;return l(),s("div",p({class:["input-wrapper",{error:e.isError,flat:e.variant==="flat"}],ref:"input-wrapper"},{...e.$attrs}),[t("div",{class:o(["input-group",{disabled:e.disabled,filled:e.isFilled,focus:e.isFocus||e.localIsFocus,icon_append:((m=e.icon)==null?void 0:m.placement)==="append",icon_prepend:((f=e.icon)==null?void 0:f.placement)==="prepend","multi-line":e.type==="textarea",readonly:e.readOnly}])},[e.label?(l(),s("label",{key:0,class:o(["label",{required:e.required,multiline:e.type==="textarea"}])},[t("span",null,b(e.label),1),e.required?(l(),s("span",F,"*")):u("",!0)],2)):u("",!0),e.icon?(l(),s("span",{key:1,class:o([{"sb-cursor-pointer":(y=e.icon)==null?void 0:y.onClick},"icon"]),onClick:n[0]||(n[0]=(...a)=>e.handleClickIcon&&e.handleClickIcon(...a)),onMouseover:n[1]||(n[1]=(...a)=>e.handleMouseOverIcon&&e.handleMouseOverIcon(...a)),onMouseleave:n[2]||(n[2]=(...a)=>e.handleMouseLeaveIcon&&e.handleMouseLeaveIcon(...a))},[h(e.$slots,"icon-slot")],34)):u("",!0),t("div",{class:o(["form-control",[e.textAlign,e.type,e.noSavePassword&&"no-save-password"]]),onClick:n[13]||(n[13]=a=>e.toggleFocus(!0,a))},[e.$slots["custom-input"]?h(e.$slots,"custom-input",{key:1}):(l(),s(d,{key:0},[e.type!=="textarea"?g((l(),s("input",p({key:0,type:e.getInputType,tabindex:e.readOnly||e.disabled?-1:e.tabindex,"onUpdate:modelValue":n[3]||(n[3]=a=>e.localValue=a)},{autocomplete:e.autocomplete,disabled:e.disabled,min:e.min,max:e.max,placeholder:e.placeholder,step:e.step,readonly:e.readOnly},{onBlur:n[4]||(n[4]=a=>e.handleBlur(a)),onFocus:n[5]||(n[5]=a=>e.handleInputFocus(a)),onInput:n[6]||(n[6]=a=>e.handleChange(a)),onKeydown:n[7]||(n[7]=a=>e.$emit("keydown",a))}),null,16,w)),[[k,e.localValue]]):g((l(),s("textarea",p({key:1,class:{readonly:e.readOnly},rows:"6",tabindex:e.readOnly||e.disabled?-1:e.tabindex},{autocomplete:e.autocomplete,disabled:e.disabled,placeholder:e.placeholder,readonly:e.readOnly},{"onUpdate:modelValue":n[8]||(n[8]=a=>e.localValue=a),onBlur:n[9]||(n[9]=a=>e.handleBlur(a)),onFocus:n[10]||(n[10]=a=>e.handleInputFocus(a)),onInput:n[11]||(n[11]=a=>e.handleChange(a)),onKeydown:n[12]||(n[12]=a=>e.$emit("keydown",a))}),null,16,C)),[[I,e.localValue]])],64))],2),t("fieldset",O,[t("legend",S,[t("span",{class:o(["notch-label",{"no-label":!e.label||e.label===""}])},[e.label&&e.label!==""?(l(),s(d,{key:0},[t("span",null,b(e.label),1),e.required?(l(),s("span",B,"*")):u("",!0)],64)):(l(),s(d,{key:1},[V("​")],64))],2)])])],2),e.isError&&e.errorMessage?(l(),s("div",$,[t("span",{innerHTML:e.handleErrorMessage()},null,8,N)])):u("",!0)],16)}const A=M(v,[["render",E]]);v.__docgenInfo={displayName:"sb-form-input",exportName:"default",description:"",tags:{},props:[{name:"autocomplete",values:["off","on"],type:{name:"string"},defaultValue:{func:!1,value:"'on'"}},{name:"disabled",type:{name:"boolean"},required:!1},{name:"errorMessage",type:{name:"string|func"},required:!1},{name:"icon",type:{name:"IIcon"},required:!1},{name:"isError",type:{name:"boolean"},required:!1},{name:"isFocus",type:{name:"boolean"},required:!1},{name:"label",type:{name:"string"},required:!1},{name:"max",type:{name:"number|string"},required:!1},{name:"min",type:{name:"number|string"},required:!1},{name:"modelValue",type:{name:"string | number | object | null"},required:!1},{name:"noSavePassword",type:{name:"boolean"},required:!1},{name:"placeholder",type:{name:"string"},required:!1},{name:"readOnly",type:{name:"boolean"},required:!1},{name:"required",type:{name:"boolean"},required:!1},{name:"step",type:{name:"number"},required:!1},{name:"tabindex",type:{name:"number"},required:!1},{name:"textAlign",values:["left","right"],type:{name:"string"},defaultValue:{func:!1,value:"'left'"}},{name:"type",type:{name:`| string
| 'text'
| 'number'
| 'textarea'
| 'password'
| 'email'`},defaultValue:{func:!1,value:"'text'"}},{name:"value",type:{name:"string | number | object | null"},required:!1},{name:"variant",values:["default","flat"],type:{name:"string"},required:!1,defaultValue:{func:!1,value:"'default'"}}],events:[{name:"keydown"},{name:"update:modelValue",type:{names:["undefined"]}},{name:"blur",type:{names:["undefined"]}},{name:"focus",type:{names:["undefined"]}},{name:"input",type:{names:["undefined"]}}],slots:[{name:"icon-slot"},{name:"custom-input"}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/form-input/form-input.vue"]};export{A as T};
