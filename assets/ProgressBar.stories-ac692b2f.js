import{P as t}from"./progress-bar-5c4333e4.js";import"./vue.esm-bundler-1a22c5b9.js";import"./_plugin-vue_export-helper-c27b6911.js";const f={title:"Components/Progress Bar",component:t,tags:["autodocs"],argTypes:{color:{control:"select",description:"Progress Bar color",options:["accent","default","primary","info","secondary","warning","success","danger","white","black"]},height:{control:"number",description:"Progress Bar height in pixels"},indeterminate:{control:"boolean",description:"Whether Progress Bar is indeterminate or not"},percentage:{control:"boolean",description:"Show Progress Bar percentage"},progress:{control:"number",description:"Progress Bar value"}},render:l=>({components:{ProgressBar:t},setup(){return{args:l}},template:'<div style="height: 5rem; display: flex; justify-content: center; align-items: center;"><ProgressBar v-bind="args" /></div>'})},e={args:{progress:75}},r={args:{percentage:!0,progress:75}},s={args:{indeterminate:!0}};var o,a,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    progress: 75
  }
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var c,i,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    percentage: true,
    progress: 75
  }
}`,...(p=(i=r.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var g,m,d;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    indeterminate: true
  }
}`,...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const B=["Default","Percentage","Indeterminate"];export{e as Default,s as Indeterminate,r as Percentage,B as __namedExportsOrder,f as default};
