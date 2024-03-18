import{D as s}from"./datatable-005e93f7.js";import"./vue.esm-bundler-38397e95.js";import"./form-dropdown-254afaaa.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./progress-circular-90599950.js";import"./form-input-e5bf6945.js";import"./icons-d0b18b59.js";import"./helper-91f3687e.js";const{UPDATE_STORY_ARGS:i}=__STORYBOOK_MODULE_CORE_EVENTS__,F=[{color:"red",value:"#f00"},{color:"green",value:"#0f0"},{color:"blue",value:"#00f"},{color:"cyan",value:"#0ff"},{color:"magenta",value:"#f0f"},{color:"yellow",value:"#ff0"},{color:"black",value:"#000"}],y=[...F].map((t,a)=>`
            <tr style="text-align: center;">
                <td>${a+1}</td>
                <td>${t.color}</td>
                <td>
                    <div style="border-radius: 6px; background: ${t.value}; color: white; padding: 6px 12px; margin: 0 auto; width: fit-content;">
                        ${t.value}
                    </div>
                </td>
            </tr>
        `).join(`
`),W={title:"Components/Datatable",component:s,tags:["autodocs"],argTypes:{columnSearchPlacement:{control:"select",description:'Column search input placement. This props works only if props "columns" exist',options:["bottom","top"]},columns:{control:"object",description:"Datatable columns definition & configurations"},defaultSort:{control:"object",description:'Datatable default column sort. This props works only if props "columns" exist'},isLoading:{control:"boolean",description:"Show Datatable loader"},language:{control:"object",description:'Datatable text configurations. You can use this to change text "No Results Found..."'},lengthChange:{control:"object",description:"Datatable length options"},list:{control:"object",description:"Datatable row list"},onAjax:{action:"change",control:!1,description:"Intercept Datatable on Ajax event (Server Side only)"},onChange:{action:"change",control:!1,description:"Datatable will fire this event on pagination change, row length change, column search input, search bar input",table:{category:"events",type:{summary:"(data: IDTChangeResponse) => void"}},type:"function"},pagination:{control:"object",description:"Datatable pagination configurations"},rowStyle:{control:"select",description:"Datatable row style",options:["default","odd-even"]},search:{control:"boolean",description:"Show Datatable search bar"},serverSide:{control:"object",description:"Datatable Server Side configurations"}},args:{},parameters:{docs:{controls:{exclude:["change"],sort:"requiredFirst"}},slots:{"`th-${thIndex + 1}`":{description:'Slot to render Datatable Column if props "list" exist'},body:{description:"Datatable body slot"},header:{description:"Datatable header slot"},tr:{description:'Slot to render Datatable Row if props "list" exist'}}},render:t=>({components:{Datatable:s},setup(){return{args:t}},template:'<Datatable v-bind="args" />'})},u={args:{},render:t=>({components:{Datatable:s},setup(){return{args:t}},template:`
            <Datatable v-bind="args">
                <template v-slot:header>
                    <tr>
                        <th>#</th>
                        <th>Color</th>
                        <th>Value</th>
                    </tr>
                </template>
                <template v-slot:body>
                    ${y}
                </template>
            </Datatable>
        `})},p={args:{columns:[{alignHead:"center",label:"#",sort:!0},{alignHead:"center",label:"Color",sort:!0},{alignHead:"center",label:"Value",name:"sortLast",sort:!0}]},render:t=>({components:{Datatable:s},setup(){return{args:t}},template:`
            <Datatable v-bind="args">
                <template v-slot:body>
                    ${y}
                </template>
            </Datatable>
        `})},g={args:{columns:[{alignHead:"center",label:"#"},{alignHead:"center",label:"Color"},{alignHead:"center",label:"Value"}],isLoading:!0}},m={args:{rowStyle:"odd-even"},render:t=>({components:{Datatable:s},setup(){return{args:t}},template:`
            <Datatable v-bind="args">
                <template v-slot:header>
                    <tr>
                        <th>#</th>
                        <th>Color</th>
                        <th>Value</th>
                    </tr>
                </template>
                <template v-slot:body>
                    ${y}
                </template>
            </Datatable>
        `})},h={args:{columnSearchPlacement:"top",columns:[{alignHead:"center",label:"#",sort:!0},{alignHead:"center",label:"Pokemon Name",search:!0,sort:!0},{alignHead:"center",label:"Image URL",name:"sortUrl",search:!0,sort:!0}],lengthChange:{enabled:!0,options:[5,10,20,40]},list:[],search:!0,serverSide:{options:{payload:{limit:10,offset:0}},url:"https://pokeapi.co/api/v2/pokemon"}},decorators:[(t,a)=>(delete a.args.change,a.args.onAjax=({headers:d,payload:n,response:e},c)=>{var r,l,o;return console.log(n,"here"),c==="BEFORE SEND"?{headers:d,payload:{...n,limit:n.length,offset:n.length*n.page}}:e!=null&&e.status?(window.__STORYBOOK_ADDONS_CHANNEL__.emit(i,{storyId:a.id,updatedArgs:{list:[...((r=e.data)==null?void 0:r.results)||[]]}}),{total:(l=e==null?void 0:e.data)==null?void 0:l.count,totalRow:(o=e==null?void 0:e.data)==null?void 0:o.results.length}):(window.__STORYBOOK_ADDONS_CHANNEL__.emit(i,{storyId:a.id,updatedArgs:{list:[]}}),null)},t())],render:t=>({components:{Datatable:s},setup(){return{args:t}},template:`
            <Datatable v-bind="args">
                <template #th-3="{ label }">
                    <span>The Label: {{ label }}</span>
                </template>
                <template #tr="{ dtConfig, index, name, url }">
                    <td style="text-align: center;">
                        {{ dtConfig.page * dtConfig.length + index + 1 }}
                    </td>
                    <td style="text-align: center;">{{ name }}</td>
                    <td style="text-align: center;">{{ url }}</td>
                </template>
            </Datatable>
        `})},b={args:{canHoverRow:!0,columnSearchPlacement:"top",columns:[{alignHead:"center",label:"#",sort:!0},{alignHead:"center",label:"Pokemon Name",search:!0,sort:!0},{alignHead:"center",label:"Image URL",name:"sortUrl",search:!0,sort:!0}],lengthChange:{enabled:!0,options:[5,10,20,40]},list:[],search:!0,serverSide:{options:{payload:{limit:10,offset:0}},url:"https://pokeapi.co/api/v2/pokemon"}},decorators:[(t,a)=>(delete a.args.change,a.args.onAjax=({headers:d,payload:n,response:e},c)=>{var r,l,o;return c==="BEFORE SEND"?{headers:d,payload:{...n,limit:n.length,offset:n.length*n.page}}:e!=null&&e.status?(window.__STORYBOOK_ADDONS_CHANNEL__.emit(i,{storyId:a.id,updatedArgs:{list:[...((r=e.data)==null?void 0:r.results)||[]]}}),{total:(l=e==null?void 0:e.data)==null?void 0:l.count,totalRow:(o=e==null?void 0:e.data)==null?void 0:o.results.length}):(window.__STORYBOOK_ADDONS_CHANNEL__.emit(i,{storyId:a.id,updatedArgs:{list:[]}}),null)},t())],render:t=>({components:{Datatable:s},setup(){return{args:t}},template:`
            <Datatable v-bind="args">
                <template #th-3="{ label }">
                    <span>The Label: {{ label }}</span>
                </template>
                <template #tr="{ dtConfig, index, name, url }">
                    <td style="text-align: center;">
                        {{ dtConfig.page * dtConfig.length + index + 1 }}
                    </td>
                    <td style="text-align: center;">{{ name }}</td>
                    <td style="text-align: center;">{{ url }}</td>
                </template>
            </Datatable>
        `})},S={args:{canClickRow:!0,columnSearchPlacement:"top",columns:[{alignHead:"center",label:"#",sort:!0},{alignHead:"center",label:"Pokemon Name",search:!0,sort:!0},{alignHead:"center",label:"Image URL",name:"sortUrl",search:!0,sort:!0}],lengthChange:{enabled:!0,options:[5,10,20,40]},list:[],search:!0,serverSide:{options:{payload:{limit:10,offset:0}},url:"https://pokeapi.co/api/v2/pokemon"}},decorators:[(t,a)=>(delete a.args.change,a.args.onAjax=({headers:d,payload:n,response:e},c)=>{var r,l,o;return c==="BEFORE SEND"?{headers:d,payload:{...n,limit:n.length,offset:n.length*n.page}}:e!=null&&e.status?(window.__STORYBOOK_ADDONS_CHANNEL__.emit(i,{storyId:a.id,updatedArgs:{list:[...((r=e.data)==null?void 0:r.results)||[]]}}),{total:(l=e==null?void 0:e.data)==null?void 0:l.count,totalRow:(o=e==null?void 0:e.data)==null?void 0:o.results.length}):(window.__STORYBOOK_ADDONS_CHANNEL__.emit(i,{storyId:a.id,updatedArgs:{list:[]}}),null)},a.args.onClickRow=(d,n)=>{console.log("row clicked",n)},t())],render:t=>({components:{Datatable:s},setup(){return{args:t}},template:`
            <Datatable v-bind="args">
                <template #th-3="{ label }">
                    <span>The Label: {{ label }}</span>
                </template>
                <template #tr="{ dtConfig, index, name, url }">
                    <td style="text-align: center;">
                        {{ dtConfig.page * dtConfig.length + index + 1 }}
                    </td>
                    <td style="text-align: center;">{{ name }}</td>
                    <td style="text-align: center;">{{ url }}</td>
                </template>
            </Datatable>
        `})};var f,O,R;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {},
  render: args => ({
    components: {
      Datatable
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <Datatable v-bind="args">
                <template v-slot:header>
                    <tr>
                        <th>#</th>
                        <th>Color</th>
                        <th>Value</th>
                    </tr>
                </template>
                <template v-slot:body>
                    \${dummyDataString}
                </template>
            </Datatable>
        \`
  })
}`,...(R=(O=u.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var C,v,w;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    columns: [{
      alignHead: 'center',
      label: '#',
      sort: true
    }, {
      alignHead: 'center',
      label: 'Color',
      sort: true
    }, {
      alignHead: 'center',
      label: 'Value',
      name: 'sortLast',
      sort: true
    }]
  },
  render: args => ({
    components: {
      Datatable
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <Datatable v-bind="args">
                <template v-slot:body>
                    \${dummyDataString}
                </template>
            </Datatable>
        \`
  })
}`,...(w=(v=p.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var x,A,E;g.parameters={...g.parameters,docs:{...(x=g.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    columns: [{
      alignHead: 'center',
      label: '#'
    }, {
      alignHead: 'center',
      label: 'Color'
    }, {
      alignHead: 'center',
      label: 'Value'
    }],
    isLoading: true
  }
}`,...(E=(A=g.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var N,H,T;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    rowStyle: 'odd-even'
  },
  render: args => ({
    components: {
      Datatable
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <Datatable v-bind="args">
                <template v-slot:header>
                    <tr>
                        <th>#</th>
                        <th>Color</th>
                        <th>Value</th>
                    </tr>
                </template>
                <template v-slot:body>
                    \${dummyDataString}
                </template>
            </Datatable>
        \`
  })
}`,...(T=(H=m.parameters)==null?void 0:H.docs)==null?void 0:T.source}}};var L,k,I;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    columnSearchPlacement: 'top',
    columns: [{
      alignHead: 'center',
      label: '#',
      sort: true
    }, {
      alignHead: 'center',
      label: 'Pokemon Name',
      search: true,
      sort: true
    }, {
      alignHead: 'center',
      label: 'Image URL',
      name: 'sortUrl',
      search: true,
      sort: true
    }],
    lengthChange: {
      enabled: true,
      options: [5, 10, 20, 40]
    },
    list: [],
    search: true,
    serverSide: {
      options: {
        payload: {
          limit: 10,
          offset: 0
        }
      },
      url: 'https://pokeapi.co/api/v2/pokemon'
    }
  },
  decorators: [(story, ctx) => {
    delete (ctx.args as any).change;
    (ctx.args as any).onAjax = ({
      headers,
      payload,
      response
    }: IDTServerSideHandler, type: 'BEFORE SEND' | 'SUCCESS' | 'ERROR') => {
      console.log(payload, 'here');
      if (type === 'BEFORE SEND') {
        return {
          headers,
          payload: {
            ...payload,
            limit: payload.length,
            offset: payload.length * payload.page
          }
        };
      } else if (response?.status) {
        const channel = ((window as any).__STORYBOOK_ADDONS_CHANNEL__ as Channel);
        channel.emit(UPDATE_STORY_ARGS, {
          storyId: ctx.id,
          updatedArgs: {
            list: [...(response.data?.results || [])]
          }
        });
        return {
          total: response?.data?.count,
          totalRow: response?.data?.results.length
        };
      }
      const channel = ((window as any).__STORYBOOK_ADDONS_CHANNEL__ as Channel);
      channel.emit(UPDATE_STORY_ARGS, {
        storyId: ctx.id,
        updatedArgs: {
          list: []
        }
      });
      return null;
    };
    return story();
  }],
  render: args => ({
    components: {
      Datatable
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <Datatable v-bind="args">
                <template #th-3="{ label }">
                    <span>The Label: {{ label }}</span>
                </template>
                <template #tr="{ dtConfig, index, name, url }">
                    <td style="text-align: center;">
                        {{ dtConfig.page * dtConfig.length + index + 1 }}
                    </td>
                    <td style="text-align: center;">{{ name }}</td>
                    <td style="text-align: center;">{{ url }}</td>
                </template>
            </Datatable>
        \`
  })
}`,...(I=(k=h.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var U,B,P;b.parameters={...b.parameters,docs:{...(U=b.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    canHoverRow: true,
    columnSearchPlacement: 'top',
    columns: [{
      alignHead: 'center',
      label: '#',
      sort: true
    }, {
      alignHead: 'center',
      label: 'Pokemon Name',
      search: true,
      sort: true
    }, {
      alignHead: 'center',
      label: 'Image URL',
      name: 'sortUrl',
      search: true,
      sort: true
    }],
    lengthChange: {
      enabled: true,
      options: [5, 10, 20, 40]
    },
    list: [],
    search: true,
    serverSide: {
      options: {
        payload: {
          limit: 10,
          offset: 0
        }
      },
      url: 'https://pokeapi.co/api/v2/pokemon'
    }
  },
  decorators: [(story, ctx) => {
    delete (ctx.args as any).change;
    (ctx.args as any).onAjax = ({
      headers,
      payload,
      response
    }: IDTServerSideHandler, type: 'BEFORE SEND' | 'SUCCESS' | 'ERROR') => {
      if (type === 'BEFORE SEND') {
        return {
          headers,
          payload: {
            ...payload,
            limit: payload.length,
            offset: payload.length * payload.page
          }
        };
      } else if (response?.status) {
        const channel = ((window as any).__STORYBOOK_ADDONS_CHANNEL__ as Channel);
        channel.emit(UPDATE_STORY_ARGS, {
          storyId: ctx.id,
          updatedArgs: {
            list: [...(response.data?.results || [])]
          }
        });
        return {
          total: response?.data?.count,
          totalRow: response?.data?.results.length
        };
      }
      const channel = ((window as any).__STORYBOOK_ADDONS_CHANNEL__ as Channel);
      channel.emit(UPDATE_STORY_ARGS, {
        storyId: ctx.id,
        updatedArgs: {
          list: []
        }
      });
      return null;
    };
    return story();
  }],
  render: args => ({
    components: {
      Datatable
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <Datatable v-bind="args">
                <template #th-3="{ label }">
                    <span>The Label: {{ label }}</span>
                </template>
                <template #tr="{ dtConfig, index, name, url }">
                    <td style="text-align: center;">
                        {{ dtConfig.page * dtConfig.length + index + 1 }}
                    </td>
                    <td style="text-align: center;">{{ name }}</td>
                    <td style="text-align: center;">{{ url }}</td>
                </template>
            </Datatable>
        \`
  })
}`,...(P=(B=b.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};var Y,j,K;S.parameters={...S.parameters,docs:{...(Y=S.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    canClickRow: true,
    columnSearchPlacement: 'top',
    columns: [{
      alignHead: 'center',
      label: '#',
      sort: true
    }, {
      alignHead: 'center',
      label: 'Pokemon Name',
      search: true,
      sort: true
    }, {
      alignHead: 'center',
      label: 'Image URL',
      name: 'sortUrl',
      search: true,
      sort: true
    }],
    lengthChange: {
      enabled: true,
      options: [5, 10, 20, 40]
    },
    list: [],
    search: true,
    serverSide: {
      options: {
        payload: {
          limit: 10,
          offset: 0
        }
      },
      url: 'https://pokeapi.co/api/v2/pokemon'
    }
  },
  decorators: [(story, ctx) => {
    delete (ctx.args as any).change;
    (ctx.args as any).onAjax = ({
      headers,
      payload,
      response
    }: IDTServerSideHandler, type: 'BEFORE SEND' | 'SUCCESS' | 'ERROR') => {
      if (type === 'BEFORE SEND') {
        return {
          headers,
          payload: {
            ...payload,
            limit: payload.length,
            offset: payload.length * payload.page
          }
        };
      } else if (response?.status) {
        const channel = ((window as any).__STORYBOOK_ADDONS_CHANNEL__ as Channel);
        channel.emit(UPDATE_STORY_ARGS, {
          storyId: ctx.id,
          updatedArgs: {
            list: [...(response.data?.results || [])]
          }
        });
        return {
          total: response?.data?.count,
          totalRow: response?.data?.results.length
        };
      }
      const channel = ((window as any).__STORYBOOK_ADDONS_CHANNEL__ as Channel);
      channel.emit(UPDATE_STORY_ARGS, {
        storyId: ctx.id,
        updatedArgs: {
          list: []
        }
      });
      return null;
    };
    (ctx.args as any).onClickRow = (_ev: MouseEvent, data: any) => {
      console.log('row clicked', data);
    };
    return story();
  }],
  render: args => ({
    components: {
      Datatable
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <Datatable v-bind="args">
                <template #th-3="{ label }">
                    <span>The Label: {{ label }}</span>
                </template>
                <template #tr="{ dtConfig, index, name, url }">
                    <td style="text-align: center;">
                        {{ dtConfig.page * dtConfig.length + index + 1 }}
                    </td>
                    <td style="text-align: center;">{{ name }}</td>
                    <td style="text-align: center;">{{ url }}</td>
                </template>
            </Datatable>
        \`
  })
}`,...(K=(j=S.parameters)==null?void 0:j.docs)==null?void 0:K.source}}};const X=["Default","ColumnsProp","IsLoading","RowStyle","ServerSide","HoverRow","ClickRow"];export{S as ClickRow,p as ColumnsProp,u as Default,b as HoverRow,g as IsLoading,m as RowStyle,h as ServerSide,X as __namedExportsOrder,W as default};
