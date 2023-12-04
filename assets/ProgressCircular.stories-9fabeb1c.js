import{P as o}from"./progress-circular-87ed01dc.js";import"./vue.esm-bundler-1a22c5b9.js";import"./_plugin-vue_export-helper-c27b6911.js";const f={title:"Components/Progress Circular",component:o,tags:["autodocs"],argTypes:{color:{control:"select",description:"Progress Circular color",options:["accent","default","primary","info","secondary","warning","success","danger","white","black"]},indeterminate:{control:"boolean",description:"Whether Progress Circular is indeterminate or not"},percentage:{control:"boolean",description:"Show Progress Circular percentage"},progress:{control:"number",description:"Progress Circular value"},size:{control:"number",description:"Progress Circular size in pixels"}},render:u=>({components:{ProgressCircular:o},setup(){return{args:u}},template:'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><ProgressCircular v-bind="args" /></div>'})},e={args:{progress:75}},r={args:{percentage:!0,progress:75,size:60}},s={args:{indeterminate:!0}};var t,n,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    progress: 75
  }
}`,...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var c,i,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    percentage: true,
    progress: 75,
    size: 60
  }
}`,...(p=(i=r.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var g,l,m;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    indeterminate: true
  }
}`,...(m=(l=s.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const b=["Default","Percentage","Indeterminate"];export{e as Default,s as Indeterminate,r as Percentage,b as __namedExportsOrder,f as default};
