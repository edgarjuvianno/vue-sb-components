import{D as v}from"./form-dropdown-b91d0a88.js";import"./vue.esm-bundler-69a57796.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./progress-circular-71f86238.js";import"./form-input-e7cfc306.js";import"./icons-70109494.js";import"./helper-91f3687e.js";const{UPDATE_STORY_ARGS:X}=__STORYBOOK_MODULE_CORE_EVENTS__,se={title:"Forms/Dropdown",component:v,tags:["autodocs"],argTypes:{"onUpdate:modelValue":{action:"change",control:!1,description:"This event fired when users select items",table:{category:"events",type:{summary:"(selected: any) => void"}},type:"function"},allowClear:{control:"boolean",description:"Allow users to clear selection"},closeOnSelect:{control:"boolean",description:"Collapse Dropdown when users select options"},disabled:{control:"boolean",description:"Is Dropdown disabled"},errorMessage:{control:"text",description:"Dropdown error message"},flat:{control:"boolean",description:"Is Dropdown type flat or not"},infinite:{control:"boolean",description:"Load more when users scroll until last option"},isError:{control:"boolean",description:"Is Dropdown validation error"},isLoading:{control:"boolean",description:"Show loader (not working for Server Side)"},label:{control:"text",description:"Dropdown label"},list:{control:"object",description:"Dropdown items"},loadingText:{control:"text",description:"Text to show when loading"},modelValue:{control:"object",description:"Dropdown selected value"},multi:{control:"boolean",description:"Multiple select options"},noResultText:{control:"text",description:"Text to show when no options to render"},onAjax:{action:"change",control:!1,description:"Event fired on Ajax call"},onChange:{action:"change",control:!1,description:"This event fired when users select items",table:{category:"events",type:{summary:"(selected: any) => void"}},type:"function"},onClose:{action:"change",control:!1,description:"This event fired when Dropdown collapsed",table:{category:"events",type:{summary:"() => void"}},type:"function"},onInput:{action:"change",control:!1,description:"This event fired when users select items",table:{category:"events",type:{summary:"(selected: any) => void"}},type:"function"},onOpen:{action:"change",control:!1,description:"This event fired when Dropdown expanded",table:{category:"events",type:{summary:"() => void"}},type:"function"},onPopulateList:{description:"Load more when users scroll until last option"},optLabel:{control:"text",description:"Data Option key to render as label"},optValue:{control:"text",description:"Data Option key to use as value"},placeholder:{control:"text",description:"Dropdown placeholder"},readOnly:{control:"boolean",description:"Is Dropdown read-only"},required:{control:"boolean",description:"Is Dropdown required"},search:{control:"boolean",description:'Dropdown type search input (always true when "serverSide" prop exist)'},serverSide:{control:"object",description:"Server Side configurations"},value:{control:"object",description:"Dropdown selected value"}},args:{closeOnSelect:!0,label:"Some Dropdown",list:[{color:"Keputusan Ketua Komite Kebijakan Komite Penanganan COVID 19 dan Pemulihan Ekonomi Nasional Nomor 1 tahun 2020",value:"#f00"},{color:"green",value:"#0f0"},{color:"blue",value:"#00f"},{color:"cyan",value:"#0ff"},{color:"magenta",value:"#f0f"},{color:"yellow",value:"#ff0"},{color:"black",value:"#000"}],modelValue:null,optLabel:"color"},decorators:[(e,o)=>(delete o.args.onChange,delete o.args.onInput,delete o.args["onUpdate:modelValue"],o.args.onChange=r=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(X,{storyId:o.id,updatedArgs:{modelValue:r}})},e())],parameters:{docs:{controls:{exclude:["change","close","input","open","update:modelValue"],sort:"requiredFirst"}}},render:e=>({components:{Dropdown:v},setup(){return{args:e}},template:'<div style="height: 27rem; display: flex; justify-content: center; align-items: start;"><Dropdown style="min-width: 15rem;" v-bind="args" /></div>'})},l={args:{}},i={args:{allowClear:!0}},c={args:{multi:!0,search:!0}},d={args:{optLabel:e=>`<span style="color: ${e.value}">${e.color}</span>`}},p={args:{search:!0},decorators:[(e,o)=>(o.args.onPopulateList=r=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(X,{storyId:o.id,updatedArgs:{list:[{color:"red",value:"#f00"},{color:"green",value:"#0f0"},{color:"blue",value:"#00f"},{color:"cyan",value:"#0ff"},{color:"magenta",value:"#f0f"},{color:"yellow",value:"#ff0"},{color:"black",value:"#000"}].filter(a=>a.color.toLowerCase().includes(r.toLowerCase()))}})},e())]},u={args:{list:void 0,onAjax:(e,o,r)=>{var n,a,t,s;return o==="SUCCESS"?(n=e.data)==null?void 0:n.items:o==="BEFORE SEND"?r?{...e,payload:{page:((a=e.payload)==null?void 0:a.page)+1,q:((t=e.payload)==null?void 0:t.term)||"demo"}}:{...e,payload:{q:((s=e.payload)==null?void 0:s.term)||"demo"}}:e},optLabel:e=>`<span>${e.name}@${e.git_url}</span>`,serverSide:{options:{payload:{q:"demo"}},url:"https://api.github.com/search/repositories"}}},m={args:{infinite:!0,list:void 0,onAjax:(e,o,r)=>{var n,a,t,s;return o==="SUCCESS"?(n=e.data)==null?void 0:n.items:o==="BEFORE SEND"?r?{...e,payload:{page:((a=e.payload)==null?void 0:a.page)+1,q:((t=e.payload)==null?void 0:t.term)||"demo"}}:{...e,payload:{q:((s=e.payload)==null?void 0:s.term)||"demo"}}:e},optLabel:e=>`<span>${e.name}@${e.git_url}</span>`,serverSide:{options:{payload:{q:"demo"}},url:"https://api.github.com/search/repositories"}}},g={args:{disabled:!0}},y={args:{readOnly:!0}},f={args:{errorMessage:"Some Error Message",isError:!0}},S={args:{optValue:"value"}};var h,b,w;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {}
}`,...(w=(b=l.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var D,O,E;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    allowClear: true
  }
}`,...(E=(O=i.parameters)==null?void 0:O.docs)==null?void 0:E.source}}};var _,C,L;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    multi: true,
    search: true
  }
}`,...(L=(C=c.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var x,A,T;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    optLabel: (opt: any) => {
      return \`<span style="color: \${opt.value}">\${opt.color}</span>\`;
    }
  }
}`,...(T=(A=d.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var N,R,q;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(q=(R=p.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var I,M,V;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(V=(M=u.parameters)==null?void 0:M.docs)==null?void 0:V.source}}};var j,$,K;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(K=($=m.parameters)==null?void 0:$.docs)==null?void 0:K.source}}};var U,k,B;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(B=(k=g.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var P,F,Y;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(Y=(F=y.parameters)==null?void 0:F.docs)==null?void 0:Y.source}}};var H,G,z;f.parameters={...f.parameters,docs:{...(H=f.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    errorMessage: 'Some Error Message',
    isError: true
  }
}`,...(z=(G=f.parameters)==null?void 0:G.docs)==null?void 0:z.source}}};var J,Q,W;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    optValue: 'value'
  }
}`,...(W=(Q=S.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};const le=["Default","AllowClear","Multiple","CustomLabel","Search","ServerSide","ServerSideInfinite","Disabled","ReadOnly","Error","OptionValue"];export{i as AllowClear,d as CustomLabel,l as Default,g as Disabled,f as Error,c as Multiple,S as OptionValue,y as ReadOnly,p as Search,u as ServerSide,m as ServerSideInfinite,le as __namedExportsOrder,se as default};
