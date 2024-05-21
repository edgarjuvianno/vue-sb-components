import{e as M,o as t,g as a,n as u,j as o,v as T,m as p,F as V,G as w,q as D,f as $,l as j}from"./vue.esm-bundler-38397e95.js";import{c as N}from"./icons-d0b18b59.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";const E=M({emits:{"update:modelValue":e=>!0,change:e=>!0,input:e=>!0},props:{disabled:{required:!1,type:Boolean},errorMessage:{required:!1,type:[String,Function]},isError:{required:!1,type:Boolean},label:{required:!1,type:String},list:{required:!0,type:Object},modelValue:{required:!1,type:Object},readOnly:{required:!1,type:Boolean},required:{required:!1,type:Boolean},value:{required:!1,type:Object}},name:"sb-form-checkbox-input",data(){return{selected:this.modelValue||this.value||null}},computed:{check(){return N()}},methods:{doSelect(e){if(!this.disabled&&!this.readOnly){if(this.selected&&this.selected.length>0){const s=this.selected.findIndex(r=>r.value===e.value);if(s>-1){const r=[...this.selected];r.splice(s,1),this.selected=[...r]}else this.selected=[...this.selected,e]}else(!this.selected||this.selected&&this.selected.length<1)&&(this.selected=[e]);this.$nextTick(()=>{this.$emit("update:modelValue",this.selected),this.$emit("input",this.selected),this.$emit("change",this.selected)})}},handleErrorMessage(){return this.errorMessage?typeof this.errorMessage=="string"?this.errorMessage:this.errorMessage(this.selected):""},handleKeydown(e,s){e.key==="Enter"&&this.doSelect(s)},isSelected(e){return this.selected&&Object.keys(this.selected).length>0?!!this.selected.find(s=>s.value===e.value):!1}},watch:{modelValue:{deep:!0,handler(e){e?this.selected=[...e]:this.selected=null}},value:{deep:!0,handler(e){e?this.selected=[...e]:this.selected=null}}}});const L={key:0,class:"asterisk"},R=["tabindex","onClick","onKeydown"],F={class:"selector"},K=["innerHTML"],A={key:1,class:"error-wrapper"},H=["innerHTML"];function U(e,s,r,I,P,z){return t(),a("div",D({class:["checkbox-wrapper",{error:e.isError}]},{...e.$attrs}),[e.label?(t(),a("label",{key:0,class:u(["label",{required:e.required}])},[o("span",null,T(e.label),1),e.required?(t(),a("span",L,"*")):p("",!0)],2)):p("",!0),o("div",{class:u(["input-group checkboxs-wrapper",{disabled:e.disabled,readonly:e.readOnly}])},[(t(!0),a(V,null,w(e.list,(l,B)=>(t(),a("div",{class:u(["checkbox",{disabled:e.disabled,readonly:e.readOnly,selected:e.isSelected(l)}]),key:B,tabindex:!e.disabled&&!e.readOnly?0:-1,onClick:m=>e.doSelect(l),onKeydown:m=>e.handleKeydown(m,l)},[o("div",F,[(t(),$(j(e.check)))]),o("p",{class:"label",innerHTML:l.label},null,8,K)],42,R))),128))],2),e.isError?(t(),a("div",A,[o("span",{innerHTML:e.handleErrorMessage()},null,8,H)])):p("",!0)],16)}const Y=x(E,[["render",U],["__scopeId","data-v-d6b99d31"]]);E.__docgenInfo={displayName:"sb-form-checkbox-input",exportName:"default",description:"",tags:{},props:[{name:"disabled",type:{name:"boolean"},required:!1},{name:"errorMessage",type:{name:"string|func"},required:!1},{name:"isError",type:{name:"boolean"},required:!1},{name:"label",type:{name:"string"},required:!1},{name:"list",type:{name:"ICheckItem[]"},required:!0},{name:"modelValue",type:{name:"ICheckItem[] | null"},required:!1},{name:"readOnly",type:{name:"boolean"},required:!1},{name:"required",type:{name:"boolean"},required:!1},{name:"value",type:{name:"ICheckItem[] | null"},required:!1}],events:[{name:"update:modelValue",type:{names:["undefined"]}},{name:"change",type:{names:["undefined"]}},{name:"input",type:{names:["undefined"]}}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/form-checkbox/form-checkbox.vue"]};const{UPDATE_STORY_ARGS:G}=__STORYBOOK_MODULE_CORE_EVENTS__,X={title:"Forms/Check Box",component:Y,tags:["autodocs"],argTypes:{"onUpdate:modelValue":{action:"change",control:!1,description:"This event fired when users select items",table:{category:"events",type:{summary:"(selected: ICheckItem[] | null) => void"}},type:"function"},disabled:{control:"boolean",description:"Is Check Box disabled"},errorMessage:{control:"text",description:"Check Box error message"},isError:{control:"boolean",description:"Is Check Box validation error"},label:{control:"text",description:"Check Box label"},list:{control:"object",description:"Check Box items"},modelValue:{control:"object",description:"Check Box selected value"},onChange:{action:"change",control:!1,description:"This event fired when users select items",table:{category:"events",type:{summary:"(selected: ICheckItem[] | null) => void"}},type:"function"},onInput:{action:"change",control:!1,description:"This event fired when users select items",table:{category:"events",type:{summary:"(selected: ICheckItem[] | null) => void"}},type:"function"},readOnly:{control:"boolean",description:"Is Check Box read-only"},required:{control:"boolean",description:"Is Check Box required"},value:{control:"object",description:"Check Box selected value"}},args:{label:"Some Check Box",list:[{label:"1",value:1},{label:"2",value:2},{label:"3",value:3}],modelValue:null},decorators:[(e,s)=>(delete s.args.onChange,delete s.args.onInput,delete s.args["onUpdate:modelValue"],s.args.onChange=r=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(G,{storyId:s.id,updatedArgs:{modelValue:r}})},e())],parameters:{docs:{controls:{exclude:["change","input","update:modelValue"],sort:"requiredFirst"}}}},n={args:{}},d={args:{disabled:!0}},i={args:{readOnly:!0}},c={args:{errorMessage:"Some Error Message",isError:!0}};var h,y,g;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {}
}`,...(g=(y=n.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var f,b,k;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(k=(b=d.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var v,_,C;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(C=(_=i.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};var q,O,S;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    errorMessage: 'Some Error Message',
    isError: true
  }
}`,...(S=(O=c.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};const Z=["Default","Disabled","ReadOnly","Error"];export{n as Default,d as Disabled,c as Error,i as ReadOnly,Z as __namedExportsOrder,X as default};