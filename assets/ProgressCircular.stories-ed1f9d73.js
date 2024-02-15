import{P as o}from"./progress-circular-90599950.js";import"./vue.esm-bundler-38397e95.js";import"./_plugin-vue_export-helper-c27b6911.js";const f={title:"Components/Progress Circular",component:o,tags:["autodocs"],argTypes:{color:{control:"select",description:"Progress Circular color",options:["accent","default","primary","info","secondary","warning","success","danger","white","black"]},indeterminate:{control:"boolean",description:"Whether Progress Circular is indeterminate or not"},percentage:{control:"boolean",description:"Show Progress Circular percentage"},progress:{control:"number",description:"Progress Circular value"},size:{control:"number",description:"Progress Circular size in pixels"}},parameters:{docs:{controls:{sort:"requiredFirst"}}},render:m=>({components:{ProgressCircular:o},setup(){return{args:m}},template:'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><ProgressCircular v-bind="args" /></div>'})},r={args:{progress:75}},e={args:{percentage:!0,progress:75,size:60}},s={args:{indeterminate:!0}};var t,a,n;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    progress: 75
  }
}`,...(n=(a=r.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var c,i,p;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    percentage: true,
    progress: 75,
    size: 60
  }
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var g,l,d;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    indeterminate: true
  }
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const b=["Default","Percentage","Indeterminate"];export{r as Default,s as Indeterminate,e as Percentage,b as __namedExportsOrder,f as default};
