import{D as n}from"./datatable-0f2cc337.js";import"./vue.esm-bundler-268ebf68.js";import"./form-dropdown-4c06c30c.js";import"./progress-circular-2467358a.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./form-input-7093c838.js";import"./icons-baf5808e.js";import"./helper-91f3687e.js";const{UPDATE_STORY_ARGS:g}=__STORYBOOK_MODULE_CORE_EVENTS__,T=[{color:"red",value:"#f00"},{color:"green",value:"#0f0"},{color:"blue",value:"#00f"},{color:"cyan",value:"#0ff"},{color:"magenta",value:"#f0f"},{color:"yellow",value:"#ff0"},{color:"black",value:"#000"}],d=[...T].map((e,a)=>`
            <tr style="text-align: center;">
                <td>${a+1}</td>
                <td>${e.color}</td>
                <td>
                    <div style="border-radius: 6px; background: ${e.value}; color: white; padding: 6px 12px; margin: 0 auto; width: fit-content;">
                        ${e.value}
                    </div>
                </td>
            </tr>
        `).join(`
`),F={title:"Components/Datatable",component:n,tags:["autodocs"],argTypes:{columnSearchPlacement:{control:"select",description:'Column search input placement. This props works only if props "columns" exist',options:["bottom","top"]},columns:{control:"object",description:"Datatable columns definition & configurations"},defaultSort:{control:"object",description:'Datatable default column sort. This props works only if props "columns" exist'},isLoading:{control:"boolean",description:"Show Datatable loader"},language:{control:"object",description:'Datatable text configurations. You can use this to change text "No Results Found..."'},lengthChange:{control:"object",description:"Datatable length options"},list:{control:"object",description:"Datatable row list"},onAjax:{action:"change",control:!1,description:"Intercept Datatable on Ajax event (Server Side only)"},onChange:{action:"change",control:!1,description:"Datatable will fire this event on pagination change, row length change, column search input, search bar input",table:{category:"events",type:{summary:"(data: IDTChangeResponse) => void"}},type:"function"},pagination:{control:"object",description:"Datatable pagination configurations"},rowStyle:{control:"select",description:"Datatable row style",options:["default","odd-even"]},search:{control:"boolean",description:"Show Datatable search bar"},serverSide:{control:"object",description:"Datatable Server Side configurations"}},args:{},parameters:{docs:{controls:{exclude:["change"],sort:"requiredFirst"}},slots:{"`th-${thIndex + 1}`":{description:'Slot to render Datatable Column if props "list" exist'},body:{description:"Datatable body slot"},header:{description:"Datatable header slot"},tr:{description:'Slot to render Datatable Row if props "list" exist'}}},render:e=>({components:{Datatable:n},setup(){return{args:e}},template:'<Datatable v-bind="args" />'})},o={args:{},render:e=>({components:{Datatable:n},setup(){return{args:e}},template:`
            <Datatable v-bind="args">
                <template v-slot:header>
                    <tr>
                        <th>#</th>
                        <th>Color</th>
                        <th>Value</th>
                    </tr>
                </template>
                <template v-slot:body>
                    ${d}
                </template>
            </Datatable>
        `})},l={args:{columns:[{alignHead:"center",label:"#",sort:!0},{alignHead:"center",label:"Color",sort:!0},{alignHead:"center",label:"Value",name:"sortLast",sort:!0}]},render:e=>({components:{Datatable:n},setup(){return{args:e}},template:`
            <Datatable v-bind="args">
                <template v-slot:body>
                    ${d}
                </template>
            </Datatable>
        `})},s={args:{columns:[{alignHead:"center",label:"#"},{alignHead:"center",label:"Color"},{alignHead:"center",label:"Value"}],isLoading:!0}},i={args:{rowStyle:"odd-even"},render:e=>({components:{Datatable:n},setup(){return{args:e}},template:`
            <Datatable v-bind="args">
                <template v-slot:header>
                    <tr>
                        <th>#</th>
                        <th>Color</th>
                        <th>Value</th>
                    </tr>
                </template>
                <template v-slot:body>
                    ${d}
                </template>
            </Datatable>
        `})},c={args:{columnSearchPlacement:"top",columns:[{alignHead:"center",label:"#",sort:!0},{alignHead:"center",label:"Pokemon Name",search:!0,sort:!0},{alignHead:"center",label:"Image URL",name:"sortUrl",search:!0,sort:!0}],lengthChange:{enabled:!0,options:[5,10,20,40]},list:[],search:!0,serverSide:{options:{payload:{limit:10,offset:0}},url:"https://pokeapi.co/api/v2/pokemon"}},decorators:[(e,a)=>(delete a.args.change,a.args.onAjax=({headers:A,payload:r,response:t},N)=>{var p,u,m;return N==="BEFORE SEND"?{headers:A,payload:{...r,limit:r.length,offset:r.length*r.page}}:t!=null&&t.status?(window.__STORYBOOK_ADDONS_CHANNEL__.emit(g,{storyId:a.id,updatedArgs:{list:[...((p=t.data)==null?void 0:p.results)||[]]}}),{total:(u=t==null?void 0:t.data)==null?void 0:u.count,totalRow:(m=t==null?void 0:t.data)==null?void 0:m.results.length}):(window.__STORYBOOK_ADDONS_CHANNEL__.emit(g,{storyId:a.id,updatedArgs:{list:[]}}),null)},e())],render:e=>({components:{Datatable:n},setup(){return{args:e}},template:`
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
        `})};var b,h,D;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(D=(h=o.parameters)==null?void 0:h.docs)==null?void 0:D.source}}};var S,y,f;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(f=(y=l.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var v,_,C;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(C=(_=s.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};var x,O,w;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(w=(O=i.parameters)==null?void 0:O.docs)==null?void 0:w.source}}};var R,E,H;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(H=(E=c.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};const K=["Default","ColumnsProp","IsLoading","RowStyle","ServerSide"];export{l as ColumnsProp,o as Default,s as IsLoading,i as RowStyle,c as ServerSide,K as __namedExportsOrder,F as default};
