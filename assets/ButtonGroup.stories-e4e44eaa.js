import{e as y,o as a,g as s,F as b,D as h,q as B,n as _,v as k}from"./vue.esm-bundler-1a22c5b9.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";const v=y({emits:{click:e=>!0},props:{color:{default:"default",type:String},list:{required:!0,type:Object},orientation:{default:"horizontal",type:String},size:{default:"base",type:String},variant:{default:"contained",type:String}},name:"sb-button-group",data(){return{localList:[]}},methods:{handleClick(e){this.localList=[...this.localList].map((t,l)=>l===e?{...t,active:!0}:{...t,active:!1}),this.$emit("click",e)}},watch:{list:{deep:!0,handler(e){this.localList=[...e]},immediate:!0}}});const z=["disabled","onClick"];function C(e,t,l,$,S,j){return a(),s("div",B({class:["btn-group",[e.color,e.orientation]]},{...e.$attrs}),[(a(!0),s(b,null,h(e.localList,(r,c)=>(a(),s("button",{class:_(["btn",[`btn-${e.variant}`,e.size,e.color,r.active?"active":""]]),type:"button",disabled:r.disabled,key:`btn-${c}`,onClick:()=>e.handleClick(c)},k(r.label),11,z))),128))],16)}const i=G(v,[["render",C],["__scopeId","data-v-72393824"]]);v.__docgenInfo={displayName:"sb-button-group",exportName:"default",description:"",tags:{},props:[{name:"color",values:["accent","default","primary","info","secondary","warning","success","danger"],type:{name:"string"},defaultValue:{func:!1,value:"'default'"}},{name:"list",type:{name:"IButtonGroupItem[]"},required:!0},{name:"orientation",values:["horizontal","vertical"],type:{name:"string"},defaultValue:{func:!1,value:"'horizontal'"}},{name:"size",values:["base","large","small"],type:{name:"string"},defaultValue:{func:!1,value:"'base'"}},{name:"variant",values:["contained","outlined"],type:{name:"string"},defaultValue:{func:!1,value:"'contained'"}}],events:[{name:"click",type:{names:["undefined"]}}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/button-group/button-group.vue"]};const D={title:"Components/Button Group",component:i,tags:["autodocs"],argTypes:{color:{control:"select",description:"Button Group color",options:["accent","default","primary","info","secondary","warning","success","danger"]},list:{control:"object",description:"Button Group list"},onClick:{action:"click",control:!1,description:"Fired when Button clicked",table:{category:"events",type:{summary:"(index: number) => void"}},type:"function"},orientation:{control:"select",description:"Button Group orientation",options:["horizontal","vertical"]},size:{control:"select",description:"Button Group sizes",options:["base","large","small"]},variant:{control:"select",description:"Button Group variants",options:["contained","outlined","text"]}},args:{color:"accent",list:[{label:"Button A"},{label:"Button B"},{label:"Button C"}]},decorators:[(e,t)=>(delete t.args.click,e())],parameters:{docs:{controls:{exclude:["click"],sort:"requiredFirst"}}},render:e=>({components:{ButtonGroup:i},setup(){return{args:e}},template:'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><ButtonGroup v-bind="args" /></div>'})},n={},o={args:{orientation:"vertical"},render:e=>({components:{ButtonGroup:i},setup(){return{args:e}},template:'<div style="height: 15rem; display: flex; justify-content: center; align-items: center;"><ButtonGroup v-bind="args" /></div>'})};var u,p,d;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,g,f;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  },
  render: args => ({
    components: {
      ButtonGroup
    },
    setup() {
      return {
        args
      };
    },
    template: '<div style="height: 15rem; display: flex; justify-content: center; align-items: center;"><ButtonGroup v-bind="args" /></div>'
  })
}`,...(f=(g=o.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const F=["Default","Vertical"];export{n as Default,o as Vertical,F as __namedExportsOrder,D as default};
