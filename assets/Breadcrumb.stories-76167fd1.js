import{e as u,o as r,g as t,F as o,G as l,q as b,j as g,v as _,f,l as v,m as y}from"./vue.esm-bundler-38397e95.js";import{b as B}from"./icons-d0b18b59.js";import{_ as h}from"./_plugin-vue_export-helper-c27b6911.js";const p=u({props:{list:{required:!0,type:Object}},name:"sb-breadcrumb",computed:{angleRight(){return B()}}});const C={class:"crumb"};function j(e,k,$,q,F,L){return r(),t("div",b({class:"breadcrumb"},{...e.$attrs}),[(r(!0),t(o,null,l(e.list,(d,a)=>(r(),t(o,{key:a},[g("div",C,_(d),1),a!==e.list.length-1?(r(),f(v(e.angleRight),{key:0})):y("",!0)],64))),128))],16)}const n=h(p,[["render",j],["__scopeId","data-v-eaa49145"]]);p.__docgenInfo={displayName:"sb-breadcrumb",exportName:"default",description:"",tags:{},props:[{name:"list",type:{name:"string[]"},required:!0}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/breadcrumb/breadcrumb.vue"]};const D={title:"Components/Breadcrumb",component:n,tags:["autodocs"],argTypes:{list:{control:"object",description:"List of crumbs in string"}},args:{list:[]},parameters:{docs:{controls:{sort:"requiredFirst"}}},render:e=>({components:{Breadcrumb:n},setup(){return{args:e}},template:'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><Breadcrumb v-bind="args" /></div>'})},s={args:{list:["Vue SB Components","Components","Breadcrumb"]}};var c,i,m;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    list: ['Vue SB Components', 'Components', 'Breadcrumb']
  }
}`,...(m=(i=s.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const R=["List"];export{s as List,R as __namedExportsOrder,D as default};