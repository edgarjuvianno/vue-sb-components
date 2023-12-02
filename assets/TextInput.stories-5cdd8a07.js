import{h as _}from"./vue.esm-bundler-1a22c5b9.js";import{T}from"./form-input-cdc821af.js";import"./_plugin-vue_export-helper-c27b6911.js";const{UPDATE_STORY_ARGS:O}=__STORYBOOK_MODULE_CORE_EVENTS__,R={title:"Forms/Text Input",component:T,tags:["autodocs"],argTypes:{"custom-input":{description:"Input custom input slot",template:""},"update:modelValue":{action:"change",control:!1,description:"This event fired when input value changed"},autocomplete:{control:"text",description:"Is Input autocomplete on/off"},blur:{action:"change",control:!1,description:"This event fired when on blur"},disabled:{control:"boolean",description:"Is Input disabled"},errorMessage:{control:"text",description:"Input error message"},focus:{action:"change",control:!1,description:"This event fired when on focus"},icon:{control:"object",description:"Input Icon configurations"},input:{action:"change",control:!1,description:"This event fired when input value changed"},isError:{control:"boolean",description:"Is Input validation error"},isFocus:{control:"boolean",description:"Trigger input focus"},keydown:{action:"change",control:!1,description:"This event fired when on keydown"},label:{control:"text",description:"Input label"},max:{control:"number",description:'Input type "number" max value'},min:{control:"number",description:'Input type "number" min value'},modelValue:{control:"text",description:"Input value"},noSavePassword:{control:"boolean",description:'Custom Input for type "password". Use this if you do not want browser to prompt "save password" dialog'},placeholder:{control:"text",description:"Input placeholder"},readOnly:{control:"boolean",description:"Is Input read-only"},required:{control:"boolean",description:"Is Input required"},step:{control:"number",description:'Input type "number" step'},tabindex:{control:"number",description:"Input tab-index"},textAlign:{control:"select",description:"Input text align",options:["left","right"]},type:{control:"select",description:'Input type. For type "number" please use our [Number Input](/?path=/docs/forms-number-input--docs) for better experience',options:["text","number","textarea","password","email"]},value:{control:"text",description:"Input value"},variant:{control:"select",description:"Input style",options:["default","flat"]}},args:{label:"Some Text Input",modelValue:null},decorators:[(a,e)=>(delete e.args.change,delete e.args.input,delete e.args["update:modelValue"],e.args.onInput=y=>{const S=y.target.value;window.__STORYBOOK_ADDONS_CHANNEL__.emit(O,{storyId:e.id,updatedArgs:{modelValue:S}})},a())],parameters:{slots:{"icon-slot":{description:"Input icon slot"}}}},t={args:{}},o={args:{disabled:!0}},r={args:{readOnly:!0}},n={args:{errorMessage:"Some Error Message",isError:!0}},s={args:{icon:{placement:"append"}},render:a=>({components:{TextInput:T},setup(){const e=_("svg",{class:"sb-icon magnifying-glass",innerHTML:'<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>',viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg"});return{args:a,icon:e}},template:`
            <TextInput v-bind="args">
                <template v-slot:icon-slot>
                    <component :is="icon" />
                </template>
            </TextInput>
        `})};var c,i,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {}
}`,...(p=(i=t.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var l,u,d;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(d=(u=o.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var m,g,I;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(I=(g=r.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var b,h,f;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    errorMessage: 'Some Error Message',
    isError: true
  }
}`,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var v,w,x;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    icon: {
      placement: 'append'
    }
  },
  render: args => ({
    components: {
      TextInput
    },
    setup() {
      const icon: any = h('svg', {
        class: 'sb-icon magnifying-glass',
        innerHTML: '<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>',
        viewBox: '0 0 512 512',
        xmlns: 'http://www.w3.org/2000/svg'
      });
      return {
        args,
        icon
      };
    },
    template: \`
            <TextInput v-bind="args">
                <template v-slot:icon-slot>
                    <component :is="icon" />
                </template>
            </TextInput>
        \`
  })
}`,...(x=(w=s.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};const A=["Default","Disabled","ReadOnly","Error","Icon"];export{t as Default,o as Disabled,n as Error,s as Icon,r as ReadOnly,A as __namedExportsOrder,R as default};
