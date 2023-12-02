import{D as y}from"./form-dropdown-c7d9270e.js";import"./vue.esm-bundler-1a22c5b9.js";import"./progress-circular-78efed5b.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./form-input-cdc821af.js";import"./icons-69f7cd3d.js";import"./helper-91f3687e.js";const{UPDATE_STORY_ARGS:z}=__STORYBOOK_MODULE_CORE_EVENTS__,oe={title:"Forms/Dropdown",component:y,tags:["autodocs"],argTypes:{"update:modelValue":{action:"change",control:!1,description:"This event fired when users select items"},allowClear:{control:"boolean",description:"Allow users to clear selection"},change:{action:"change",control:!1,description:"This event fired when users select items"},close:{action:"change",control:!1,description:"This event fired when Dropdown collapsed"},closeOnSelect:{control:"boolean",description:"Collapse Dropdown when users select options"},disabled:{control:"boolean",description:"Is Dropdown disabled"},errorMessage:{control:"text",description:"Dropdown error message"},flat:{control:"boolean",description:"Is Dropdown type flat or not"},infinite:{control:"boolean",description:"Load more when users scroll until last option"},input:{action:"change",control:!1,description:"This event fired when users select items"},isError:{control:"boolean",description:"Is Dropdown validation error"},isLoading:{control:"boolean",description:"Show loader (not working for Server Side)"},label:{control:"text",description:"Dropdown label"},list:{control:"object",description:"Dropdown items"},modelValue:{control:"object",description:"Dropdown selected value"},multi:{control:"boolean",description:"Multiple select options"},noResultText:{control:"text",description:"Text to show when no options to render"},onAjax:{action:"change",control:!1,description:"Event fired on Ajax call"},onPopulateList:{description:"Load more when users scroll until last option"},open:{action:"change",control:!1,description:"This event fired when Dropdown expanded"},optLabel:{control:"text",description:"Data Option key to render as label"},placeholder:{control:"text",description:"Dropdown placeholder"},readOnly:{control:"boolean",description:"Is Dropdown read-only"},required:{control:"boolean",description:"Is Dropdown required"},search:{control:"boolean",description:'Dropdown type search input (always true when "serverSide" prop exist)'},serverSide:{control:"object",description:"Server Side configurations"},value:{control:"object",description:"Dropdown selected value"}},args:{closeOnSelect:!0,label:"Some Dropdown",list:[{color:"red",value:"#f00"},{color:"green",value:"#0f0"},{color:"blue",value:"#00f"},{color:"cyan",value:"#0ff"},{color:"magenta",value:"#f0f"},{color:"yellow",value:"#ff0"},{color:"black",value:"#000"}],modelValue:null,optLabel:"color"},decorators:[(e,r)=>(delete r.args.change,delete r.args.input,delete r.args["update:modelValue"],r.args.onChange=o=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(z,{storyId:r.id,updatedArgs:{modelValue:o}})},e())],render:e=>({components:{Dropdown:y},setup(){return{args:e}},template:'<div style="height: 27rem; display: flex; justify-content: center; align-items: start;"><Dropdown style="min-width: 15rem;" v-bind="args" /></div>'})},l={args:{}},i={args:{allowClear:!0}},c={args:{multi:!0}},d={args:{optLabel:e=>`<span style="color: ${e.value}">${e.color}</span>`}},p={args:{search:!0},decorators:[(e,r)=>(r.args.onPopulateList=o=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(z,{storyId:r.id,updatedArgs:{list:[{color:"red",value:"#f00"},{color:"green",value:"#0f0"},{color:"blue",value:"#00f"},{color:"cyan",value:"#0ff"},{color:"magenta",value:"#f0f"},{color:"yellow",value:"#ff0"},{color:"black",value:"#000"}].filter(a=>a.color.toLowerCase().includes(o.toLowerCase()))}})},e())]},u={args:{list:void 0,onAjax:(e,r,o)=>{var n,a,t,s;return r==="SUCCESS"?(n=e.data)==null?void 0:n.items:r==="BEFORE SEND"?o?{...e,payload:{page:((a=e.payload)==null?void 0:a.page)+1,q:((t=e.payload)==null?void 0:t.term)||"demo"}}:{...e,payload:{q:((s=e.payload)==null?void 0:s.term)||"demo"}}:e},optLabel:e=>`<span>${e.name}@${e.git_url}</span>`,serverSide:{options:{payload:{q:"demo"}},url:"https://api.github.com/search/repositories"}}},m={args:{infinite:!0,list:void 0,onAjax:(e,r,o)=>{var n,a,t,s;return r==="SUCCESS"?(n=e.data)==null?void 0:n.items:r==="BEFORE SEND"?o?{...e,payload:{page:((a=e.payload)==null?void 0:a.page)+1,q:((t=e.payload)==null?void 0:t.term)||"demo"}}:{...e,payload:{q:((s=e.payload)==null?void 0:s.term)||"demo"}}:e},optLabel:e=>`<span>${e.name}@${e.git_url}</span>`,serverSide:{options:{payload:{q:"demo"}},url:"https://api.github.com/search/repositories"}}},g={args:{disabled:!0}},f={args:{readOnly:!0}},S={args:{errorMessage:"Some Error Message",isError:!0}};var h,w,v;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {}
}`,...(v=(w=l.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};var b,D,_;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    allowClear: true
  }
}`,...(_=(D=i.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var E,O,L;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    multi: true
  }
}`,...(L=(O=c.parameters)==null?void 0:O.docs)==null?void 0:L.source}}};var C,A,x;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(q=(R=p.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var N,M,I;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(I=(M=u.parameters)==null?void 0:M.docs)==null?void 0:I.source}}};var $,j,B;m.parameters={...m.parameters,docs:{...($=m.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(B=(j=m.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var U,V,Y;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(Y=(V=g.parameters)==null?void 0:V.docs)==null?void 0:Y.source}}};var k,F,H;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...(H=(F=f.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var P,K,G;S.parameters={...S.parameters,docs:{...(P=S.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    errorMessage: 'Some Error Message',
    isError: true
  }
}`,...(G=(K=S.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};const ne=["Default","AllowClear","Multiple","CustomLabel","Search","ServerSide","ServerSideInfinite","Disabled","ReadOnly","Error"];export{i as AllowClear,d as CustomLabel,l as Default,g as Disabled,S as Error,c as Multiple,f as ReadOnly,p as Search,u as ServerSide,m as ServerSideInfinite,ne as __namedExportsOrder,oe as default};
