import{e as v,o as r,g as s,j as d,p as i,m as p,q as M}from"./vue.esm-bundler-268ebf68.js";import{_ as b}from"./_plugin-vue_export-helper-c27b6911.js";const E=v({props:{errorMessage:{required:!1,type:[String,Function]},isError:{required:!1,type:Boolean}},name:"sb-card",methods:{handleErrorMessage(){return this.errorMessage?typeof this.errorMessage=="string"?this.errorMessage:this.errorMessage():""}}});const k={class:"card-wrapper"},$={key:0,class:"header"},C={class:"body"},w={key:1,class:"footer"},F={key:0,class:"error-wrapper"},I=["innerHTML"];function H(e,n,S,q,x,B){return r(),s("div",k,[d("div",M({class:[{error:e.isError},"card"]},{...e.$attrs}),[e.$slots.header?(r(),s("div",$,[i(e.$slots,"header",{},void 0,!0)])):p("",!0),d("div",C,[i(e.$slots,"default",{},void 0,!0)]),e.$slots.footer?(r(),s("div",w,[i(e.$slots,"footer",{},void 0,!0)])):p("",!0)],16),e.isError&&e.errorMessage?(r(),s("div",F,[d("span",{innerHTML:e.handleErrorMessage()},null,8,I)])):p("",!0)])}const L=b(E,[["render",H],["__scopeId","data-v-cf578a97"]]);E.__docgenInfo={displayName:"sb-card",exportName:"default",description:"",tags:{},props:[{name:"errorMessage",type:{name:"string|func"},required:!1},{name:"isError",type:{name:"boolean"},required:!1}],slots:[{name:"header"},{name:"default"},{name:"footer"}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/card/card.vue"]};const D={title:"Components/Card",component:L,tags:["autodocs"],argTypes:{errorMessage:{control:"text",description:"Card Error Message"},isError:{control:"boolean",description:"Whether card is in error state"}},args:{},parameters:{docs:{controls:{sort:"requiredFirst"}},slots:{default:{description:"Card default slot",template:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},footer:{description:"Card Footer"},header:{description:"Card Header"}}}},o={args:{},decorators:[(e,{parameters:n})=>(delete n.slots.footer,delete n.slots.header,e())]},t={args:{},parameters:{slots:{footer:{template:"Example Footer"},header:{template:"Example Header"}}}},a={args:{errorMessage:"Example Error Message",isError:!0}};var l,c,m;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  decorators: [(story, {
    parameters
  }) => {
    delete parameters.slots.footer;
    delete parameters.slots.header;
    return story();
  }]
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  parameters: {
    slots: {
      footer: {
        template: 'Example Footer'
      },
      header: {
        template: 'Example Header'
      }
    }
  }
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,y,_;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    errorMessage: 'Example Error Message',
    isError: true
  }
}`,...(_=(y=a.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};const T=["Default","HeaderAndFooter","ErrorState"];export{o as Default,a as ErrorState,t as HeaderAndFooter,T as __namedExportsOrder,D as default};
