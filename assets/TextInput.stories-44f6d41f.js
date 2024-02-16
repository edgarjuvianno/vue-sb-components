import{h as E}from"./vue.esm-bundler-38397e95.js";import{T as c}from"./form-input-6ffa0c0a.js";import"./_plugin-vue_export-helper-c27b6911.js";const{UPDATE_STORY_ARGS:_}=__STORYBOOK_MODULE_CORE_EVENTS__,R={title:"Forms/Text Input",component:c,tags:["autodocs"],argTypes:{"onUpdate:modelValue":{action:"change",control:!1,description:"This event fired when input value changed",table:{category:"events",type:{summary:"(value: any) => void"}},type:"function"},autocomplete:{control:"text",description:"Is Input autocomplete on/off"},disabled:{control:"boolean",description:"Is Input disabled"},errorMessage:{control:"text",description:"Input error message"},icon:{control:"object",description:"Input Icon configurations"},isError:{control:"boolean",description:"Is Input validation error"},isFocus:{control:"boolean",description:"Trigger input focus"},label:{control:"text",description:"Input label"},max:{control:"number",description:'Input type "number" max value'},min:{control:"number",description:'Input type "number" min value'},modelValue:{control:"text",description:"Input value"},name:{control:"text",description:"Input Name"},noSavePassword:{control:"boolean",description:'Custom Input for type "password". Use this if you do not want browser to prompt "save password" dialog'},onBlur:{action:"change",control:!1,description:"This event fired when on blur",table:{category:"events",type:{summary:"(event: Event) => void"}},type:"function"},onFocus:{action:"change",control:!1,description:"This event fired when on focus",table:{category:"events",type:{summary:"(event: Event) => void"}},type:"function"},onInput:{action:"change",control:!1,description:"This event fired when input value changed",table:{category:"events",type:{summary:"(event: Event) => void"}},type:"function"},onKeydown:{action:"change",control:!1,description:"This event fired when on keydown",table:{category:"events",type:{summary:"(event: Event) => void"}},type:"function"},placeholder:{control:"text",description:"Input placeholder"},readOnly:{control:"boolean",description:"Is Input read-only"},required:{control:"boolean",description:"Is Input required"},step:{control:"number",description:'Input type "number" step'},tabindex:{control:"number",description:"Input tab-index"},textAlign:{control:"select",description:"Input text align",options:["left","right"]},type:{control:"select",description:'Input type. For type "number" please use our [Number Input](/?path=/docs/forms-number-input--docs) for better experience',options:["text","number","textarea","password","email"]},value:{control:"text",description:"Input value"},variant:{control:"select",description:"Input style",options:["default","flat"]}},args:{label:"Some Text Input",modelValue:null,name:"test"},decorators:[(t,e)=>(delete e.args.onChange,delete e.args.onInput,delete e.args["onUpdate:modelValue"],e.args.onInput=T=>{const S=T.target.value;window.__STORYBOOK_ADDONS_CHANNEL__.emit(_,{storyId:e.id,updatedArgs:{modelValue:S}})},t())],parameters:{docs:{controls:{exclude:["blur","focus","input","keydown","update:modelValue"],sort:"requiredFirst"}},slots:{"custom-input":{description:"Input custom input slot"},"icon-slot":{description:"Input icon slot"}}},render:t=>({components:{TextInput:c},setup(){return{args:t}},template:'<TextInput v-bind="args" />'})},o={args:{}},n={args:{disabled:!0}},r={args:{readOnly:!0}},s={args:{errorMessage:"Some Error Message",isError:!0}},a={args:{icon:{placement:"append"}},render:t=>({components:{TextInput:c},setup(){const e=E("svg",{class:"sb-icon magnifying-glass",innerHTML:'<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>',viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg"});return{args:t,icon:e}},template:`
            <TextInput v-bind="args">
                <template v-slot:icon-slot>
                    <component :is="icon" />
                </template>
            </TextInput>
        `})};var i,p,l;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {}
}`,...(l=(p=o.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,d,m;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var g,v,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(y=(v=r.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var I,b,f;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    errorMessage: 'Some Error Message',
    isError: true
  }
}`,...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var h,x,w;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(w=(x=a.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};const V=["Default","Disabled","ReadOnly","Error","Icon"];export{o as Default,n as Disabled,s as Error,a as Icon,r as ReadOnly,V as __namedExportsOrder,R as default};
