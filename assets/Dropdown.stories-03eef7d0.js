import{D as S}from"./form-dropdown-57b9b909.js";import"./vue.esm-bundler-1a22c5b9.js";import"./progress-circular-dd70a24d.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./form-input-72d9bcc9.js";import"./icons-69f7cd3d.js";import"./helper-91f3687e.js";const{UPDATE_STORY_ARGS:z}=__STORYBOOK_MODULE_CORE_EVENTS__,oe={title:"Forms/Dropdown",component:S,tags:["autodocs"],argTypes:{"onUpdate:modelValue":{action:"change",control:!1,description:"This event fired when users select items",table:{category:"events",type:{summary:"(selected: any) => void"}},type:"function"},allowClear:{control:"boolean",description:"Allow users to clear selection"},closeOnSelect:{control:"boolean",description:"Collapse Dropdown when users select options"},disabled:{control:"boolean",description:"Is Dropdown disabled"},errorMessage:{control:"text",description:"Dropdown error message"},flat:{control:"boolean",description:"Is Dropdown type flat or not"},infinite:{control:"boolean",description:"Load more when users scroll until last option"},isError:{control:"boolean",description:"Is Dropdown validation error"},isLoading:{control:"boolean",description:"Show loader (not working for Server Side)"},label:{control:"text",description:"Dropdown label"},list:{control:"object",description:"Dropdown items"},modelValue:{control:"object",description:"Dropdown selected value"},multi:{control:"boolean",description:"Multiple select options"},noResultText:{control:"text",description:"Text to show when no options to render"},onAjax:{action:"change",control:!1,description:"Event fired on Ajax call"},onChange:{action:"change",control:!1,description:"This event fired when users select items",table:{category:"events",type:{summary:"(selected: any) => void"}},type:"function"},onClose:{action:"change",control:!1,description:"This event fired when Dropdown collapsed",table:{category:"events",type:{summary:"() => void"}},type:"function"},onInput:{action:"change",control:!1,description:"This event fired when users select items",table:{category:"events",type:{summary:"(selected: any) => void"}},type:"function"},onOpen:{action:"change",control:!1,description:"This event fired when Dropdown expanded",table:{category:"events",type:{summary:"() => void"}},type:"function"},onPopulateList:{description:"Load more when users scroll until last option"},optLabel:{control:"text",description:"Data Option key to render as label"},placeholder:{control:"text",description:"Dropdown placeholder"},readOnly:{control:"boolean",description:"Is Dropdown read-only"},required:{control:"boolean",description:"Is Dropdown required"},search:{control:"boolean",description:'Dropdown type search input (always true when "serverSide" prop exist)'},serverSide:{control:"object",description:"Server Side configurations"},value:{control:"object",description:"Dropdown selected value"}},args:{closeOnSelect:!0,label:"Some Dropdown",list:[{color:"red",value:"#f00"},{color:"green",value:"#0f0"},{color:"blue",value:"#00f"},{color:"cyan",value:"#0ff"},{color:"magenta",value:"#f0f"},{color:"yellow",value:"#ff0"},{color:"black",value:"#000"}],modelValue:null,optLabel:"color"},decorators:[(e,r)=>(delete r.args.onChange,delete r.args.onInput,delete r.args["onUpdate:modelValue"],r.args.onChange=o=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(z,{storyId:r.id,updatedArgs:{modelValue:o}})},e())],parameters:{docs:{controls:{exclude:["change","close","input","open","update:modelValue"],sort:"requiredFirst"}}},render:e=>({components:{Dropdown:S},setup(){return{args:e}},template:'<div style="height: 27rem; display: flex; justify-content: center; align-items: start;"><Dropdown style="min-width: 15rem;" v-bind="args" /></div>'})},l={args:{}},i={args:{allowClear:!0}},c={args:{multi:!0}},d={args:{optLabel:e=>`<span style="color: ${e.value}">${e.color}</span>`}},p={args:{search:!0},decorators:[(e,r)=>(r.args.onPopulateList=o=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(z,{storyId:r.id,updatedArgs:{list:[{color:"red",value:"#f00"},{color:"green",value:"#0f0"},{color:"blue",value:"#00f"},{color:"cyan",value:"#0ff"},{color:"magenta",value:"#f0f"},{color:"yellow",value:"#ff0"},{color:"black",value:"#000"}].filter(a=>a.color.toLowerCase().includes(o.toLowerCase()))}})},e())]},u={args:{list:void 0,onAjax:(e,r,o)=>{var n,a,t,s;return r==="SUCCESS"?(n=e.data)==null?void 0:n.items:r==="BEFORE SEND"?o?{...e,payload:{page:((a=e.payload)==null?void 0:a.page)+1,q:((t=e.payload)==null?void 0:t.term)||"demo"}}:{...e,payload:{q:((s=e.payload)==null?void 0:s.term)||"demo"}}:e},optLabel:e=>`<span>${e.name}@${e.git_url}</span>`,serverSide:{options:{payload:{q:"demo"}},url:"https://api.github.com/search/repositories"}}},m={args:{infinite:!0,list:void 0,onAjax:(e,r,o)=>{var n,a,t,s;return r==="SUCCESS"?(n=e.data)==null?void 0:n.items:r==="BEFORE SEND"?o?{...e,payload:{page:((a=e.payload)==null?void 0:a.page)+1,q:((t=e.payload)==null?void 0:t.term)||"demo"}}:{...e,payload:{q:((s=e.payload)==null?void 0:s.term)||"demo"}}:e},optLabel:e=>`<span>${e.name}@${e.git_url}</span>`,serverSide:{options:{payload:{q:"demo"}},url:"https://api.github.com/search/repositories"}}},g={args:{disabled:!0}},y={args:{readOnly:!0}},f={args:{errorMessage:"Some Error Message",isError:!0}};var v,h,b;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {}
}`,...(b=(h=l.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var w,D,_;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    allowClear: true
  }
}`,...(_=(D=i.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var E,O,C;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    multi: true
  }
}`,...(C=(O=c.parameters)==null?void 0:O.docs)==null?void 0:C.source}}};var L,A,x;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    optLabel: (opt: any) => {
      return \`<span style="color: \${opt.value}">\${opt.color}</span>\`;
    }
  }
}`,...(x=(A=d.parameters)==null?void 0:A.docs)==null?void 0:x.source}}};var T,R,q;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    search: true
  },
  decorators: [(story, ctx) => {
    ;
    (ctx.args as any).onPopulateList = (term: string) => {
      // eslint-disable-next-line no-underscore-dangle
      const channel = ((window as any).__STORYBOOK_ADDONS_CHANNEL__ as Channel);
      channel.emit(UPDATE_STORY_ARGS, {
        storyId: ctx.id,
        updatedArgs: {
          list: [{
            color: 'red',
            value: '#f00'
          }, {
            color: 'green',
            value: '#0f0'
          }, {
            color: 'blue',
            value: '#00f'
          }, {
            color: 'cyan',
            value: '#0ff'
          }, {
            color: 'magenta',
            value: '#f0f'
          }, {
            color: 'yellow',
            value: '#ff0'
          }, {
            color: 'black',
            value: '#000'
          }].filter((it: any) => it.color.toLowerCase().includes(term.toLowerCase()))
        }
      });
    };
    return story();
  }]
}`,...(q=(R=p.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var I,N,M;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    list: undefined,
    onAjax: (resp: IServerSideHandler, type: string, isLoadMore?: boolean) => {
      if (type === 'SUCCESS') {
        return resp.data?.items;
      } else if (type === 'BEFORE SEND') {
        if (isLoadMore) {
          return {
            ...resp,
            payload: {
              page: resp.payload?.page + 1,
              q: resp.payload?.term || 'demo'
            }
          };
        }
        return {
          ...resp,
          payload: {
            q: resp.payload?.term || 'demo'
          }
        };
      }
      return resp;
    },
    optLabel: (opt: any) => {
      return \`<span>\${opt.name}@\${opt.git_url}</span>\`;
    },
    serverSide: {
      options: {
        payload: {
          q: 'demo'
        }
      },
      url: 'https://api.github.com/search/repositories'
    }
  }
}`,...(M=(N=u.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};var $,j,U;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    infinite: true,
    list: undefined,
    onAjax: (resp: IServerSideHandler, type: string, isLoadMore?: boolean) => {
      if (type === 'SUCCESS') {
        return resp.data?.items;
      } else if (type === 'BEFORE SEND') {
        if (isLoadMore) {
          return {
            ...resp,
            payload: {
              page: resp.payload?.page + 1,
              q: resp.payload?.term || 'demo'
            }
          };
        }
        return {
          ...resp,
          payload: {
            q: resp.payload?.term || 'demo'
          }
        };
      }
      return resp;
    },
    optLabel: (opt: any) => {
      return \`<span>\${opt.name}@\${opt.git_url}</span>\`;
    },
    serverSide: {
      options: {
        payload: {
          q: 'demo'
        }
      },
      url: 'https://api.github.com/search/repositories'
    }
  }
}`,...(U=(j=m.parameters)==null?void 0:j.docs)==null?void 0:U.source}}};var B,V,F;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(F=(V=g.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};var Y,k,H;y.parameters={...y.parameters,docs:{...(Y=y.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(H=(k=y.parameters)==null?void 0:k.docs)==null?void 0:H.source}}};var P,K,G;f.parameters={...f.parameters,docs:{...(P=f.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    errorMessage: 'Some Error Message',
    isError: true
  }
}`,...(G=(K=f.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};const ne=["Default","AllowClear","Multiple","CustomLabel","Search","ServerSide","ServerSideInfinite","Disabled","ReadOnly","Error"];export{i as AllowClear,d as CustomLabel,l as Default,g as Disabled,f as Error,c as Multiple,y as ReadOnly,p as Search,u as ServerSide,m as ServerSideInfinite,ne as __namedExportsOrder,oe as default};
