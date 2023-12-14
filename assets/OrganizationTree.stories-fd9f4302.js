import{e as O,s as q,o,g as d,F as D,q as f,k as l,v as c,m,D as T,f as I,u as E,j as p,n as Y}from"./vue.esm-bundler-1a22c5b9.js";import{_ as k}from"./_plugin-vue_export-helper-c27b6911.js";const V=e=>{let a=[];return[...e].map(r=>(r.childs&&r.childs.length&&(a=[...a,...r.childs]),r)).concat(a.length?V(a):a)},N=(e,a)=>e.childs?{...e,childs:[...e.childs,{...a}]}:{...e},j=(e,a,r)=>e.childs?[...e.childs].some(n=>n.path===a)?{...e,childs:[...e.childs].map(n=>n.path===a?{...n,childs:[...n.childs||[],r]}:n)}:{...e,childs:[...e.childs].map(n=>j(n,a,r))}:e,R=(e,a)=>{const r=[e],i=[...V(e.childs||[])];return[...r,...i].find(n=>n.path===a)},L=(e,a,r)=>e.childs?[...e.childs].some(n=>n.path===a)?{...e,childs:[...e.childs].map(n=>n.path===a?r:n)}:{...e,childs:[...e.childs].map(n=>L(n,a,r))}:e,y=(e,a)=>e.childs?[...e.childs].some(i=>i.path===a)?{...e,childs:[...e.childs].filter(i=>i.path!==a)}:{...e,childs:[...e.childs].map(i=>y(i,a))}:e,J=O({emits:{changeItem:(e,a)=>!0},props:{isDraggable:{required:!1,type:Boolean},item:{required:!0,type:Object},lastIndex:{required:!0,type:Number}},name:"sb-organization-tree-item",data(){return{draggedCards:[],dropTarget:null,onDropTimeout:null}},computed:{},methods:{handleDragCard(e,a){var i;e.stopPropagation();const r=e.target;this.draggedCards.push(r.id),(i=e.dataTransfer)==null||i.setData("text/html",JSON.stringify({data:{...a},index:a.path}))},handleDragEnd(e){e.stopPropagation();const a=e.target;this.draggedCards=[...this.draggedCards].filter(r=>r!==a.id)},handleDragEnter(e){const a=e.target;this.dropTarget=a.id,this.onDropTimeout&&clearTimeout(this.onDropTimeout)},handleDragLeave(){this.onDropTimeout=setTimeout(()=>{this.dropTarget=null},50)},handleDropCard(e,a){var i;e.stopPropagation(),this.handleDragLeave();const r=(i=e.dataTransfer)==null?void 0:i.getData("text/html");if(r){const n=r.replace('<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">',""),s={...JSON.parse(n)};this.$emit("changeItem",{data:a,index:a.path},s)}},handleEmitChange(e,a){this.$emit("changeItem",e,a)},isDragged(e){return this.draggedCards.indexOf(e)>-1}}}),U=["id"],P={key:1,class:"parent-tree"},X=["id"],K={class:"data-wrapper"},Q={class:"name"},_={class:"position"},ee=["innerHTML"],ae=["id"],te={class:"data-wrapper"},ne={class:"name"},re={class:"position"},ie=["innerHTML"],oe={class:"parent-tree"};function se(e,a,r,i,n,s){var h,v,B,H;const g=q("sb-organization-tree-item");return o(),d("li",{class:Y(["child-tree",{"has-childs":!!((h=e.item.childs)!=null&&h.length)}])},[e.item.department?(o(),d(D,{key:0},[e.item.department?(o(),d("div",f({key:0,class:["department",{"has-childs":!!((v=e.item.childs)!=null&&v.length),draggable:e.isDraggable,dragged:e.isDragged(String(e.lastIndex)),droparea:e.dropTarget===String(e.lastIndex)}],id:String(e.lastIndex)},{draggable:e.isDraggable},{onDragend:a[0]||(a[0]=(...t)=>e.handleDragEnd&&e.handleDragEnd(...t)),onDragenter:a[1]||(a[1]=l((...t)=>e.handleDragEnter&&e.handleDragEnter(...t),["prevent"])),onDragleave:a[2]||(a[2]=l((...t)=>e.handleDragLeave&&e.handleDragLeave(...t),["prevent"])),onDragover:a[3]||(a[3]=l((...t)=>e.handleDragEnter&&e.handleDragEnter(...t),["prevent"])),onDragstart:a[4]||(a[4]=t=>e.handleDragCard(t,e.item)),onDrop:a[5]||(a[5]=l(t=>e.handleDropCard(t,e.item),["prevent"]))}),c(e.item.department),17,U)):m("",!0),(B=e.item.childs)!=null&&B.length?(o(),d("ul",P,[(o(!0),d(D,null,T(e.item.childs,(t,u)=>(o(),I(g,f({item:t,key:`${String(e.$.vnode.key)}-childs-${u}`,"last-index":e.lastIndex+u+1},{isDraggable:e.isDraggable},{onChangeItem:e.handleEmitChange}),null,16,["item","last-index","onChangeItem"]))),128))])):m("",!0)],64)):(H=e.item.childs)!=null&&H.length?(o(),d(D,{key:2},[p("div",f({class:["card has-childs",{draggable:e.isDraggable&&e.lastIndex>1,dragged:e.isDragged(String(e.lastIndex)),droparea:e.dropTarget===String(e.lastIndex)}],id:String(e.lastIndex)},{draggable:e.isDraggable&&e.lastIndex>1,...e.lastIndex>1&&{onDragend:e.handleDragEnd,onDragstart:t=>e.handleDragCard(t,e.item)}},{onDragenter:a[12]||(a[12]=l((...t)=>e.handleDragEnter&&e.handleDragEnter(...t),["prevent"])),onDragleave:a[13]||(a[13]=l((...t)=>e.handleDragLeave&&e.handleDragLeave(...t),["prevent"])),onDragover:a[14]||(a[14]=l((...t)=>e.handleDragEnter&&e.handleDragEnter(...t),["prevent"])),onDrop:a[15]||(a[15]=l(t=>e.handleDropCard(t,e.item),["prevent"]))}),[e.item.photo?(o(),d("div",{key:0,class:"item-photo",style:E({backgroundImage:`url(${e.item.photo})`})},null,4)):m("",!0),p("div",te,[p("p",ne,c(e.item.name),1),p("p",re,c(e.item.position),1),e.item.additionalInfo?(o(),d("div",{key:0,innerHTML:e.item.additionalInfo},null,8,ie)):m("",!0)])],16,ae),p("ul",oe,[(o(!0),d(D,null,T(e.item.childs,(t,u)=>(o(),I(g,f({item:t,key:`${String(e.$.vnode.key)}-childs-${u}`,"last-index":e.lastIndex+u+1},{isDraggable:e.isDraggable},{onChangeItem:e.handleEmitChange}),null,16,["item","last-index","onChangeItem"]))),128))])],64)):(o(),d("div",f({key:1,class:["card",{draggable:e.isDraggable,dragged:e.isDragged(String(e.lastIndex)),droparea:e.dropTarget===String(e.lastIndex)}],id:String(e.lastIndex)},{draggable:e.isDraggable},{onDragend:a[6]||(a[6]=(...t)=>e.handleDragEnd&&e.handleDragEnd(...t)),onDragenter:a[7]||(a[7]=l((...t)=>e.handleDragEnter&&e.handleDragEnter(...t),["prevent"])),onDragleave:a[8]||(a[8]=l((...t)=>e.handleDragLeave&&e.handleDragLeave(...t),["prevent"])),onDragover:a[9]||(a[9]=l((...t)=>e.handleDragEnter&&e.handleDragEnter(...t),["prevent"])),onDragstart:a[10]||(a[10]=t=>e.handleDragCard(t,e.item)),onDrop:a[11]||(a[11]=l(t=>e.handleDropCard(t,e.item),["prevent"]))}),[e.item.photo?(o(),d("div",{key:0,class:"item-photo",style:E({backgroundImage:`url(${e.item.photo})`})},null,4)):m("",!0),p("div",K,[p("p",Q,c(e.item.name),1),p("p",_,c(e.item.position),1),e.item.additionalInfo?(o(),d("div",{key:0,innerHTML:e.item.additionalInfo},null,8,ee)):m("",!0)])],16,X))],2)}const de=k(J,[["render",se]]);J.__docgenInfo={displayName:"sb-organization-tree-item",exportName:"default",description:"",tags:{},props:[{name:"isDraggable",type:{name:"boolean"},required:!1},{name:"item",type:{name:"IOrganizationTreeItem"},required:!0},{name:"lastIndex",type:{name:"number"},required:!0}],events:[{name:"changeItem",type:{names:["undefined"]},properties:[{type:{names:["undefined"]},name:"<anonymous1>"}]}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/organization-tree/__organization-tree-item.vue"]};const W=O({emits:{change:e=>!0},props:{isDraggable:{required:!1,type:Boolean},list:{required:!0,type:Object}},name:"sb-organization-tree",components:{"sb-org-tree-item":de},data(){return{cardIndex:1,localList:{}}},methods:{handleChangeItem(e,a){const r=e.index.replace(`${this.$.uid}-org`,"").split("-").filter(n=>n!==""),i=a.index.replace(`${this.$.uid}-org`,"").split("-").filter(n=>n!=="");if(r.length){if(e.index!==a.index)if(i.length<r.length){const n={...y({...this.localList},e.index)},s=[...e.data.childs||[]],g={...R({...n},a.index)},h={...L({...n},a.index,{...e.data,childs:[...s,g]})};this.$emit("change",h)}else{const n={...y({...this.localList},a.index)},s={...j({...n},e.index,a.data)};this.$emit("change",s)}}else{const n={...y({...this.localList},a.index)},s={...N({...n},a.data)};this.$emit("change",s)}},handleModList(e){const a=(r,i,n)=>{const s=n?`${n}-childs[${i}]`:`${this.$.uid}-org`;return r.childs?{...r,childs:[...r.childs].map((g,h)=>g.childs?a(g,h,s):{...g,path:`${s}-childs[${h}]`}),path:s}:{...r,path:s}};this.localList={...a(e)}}},watch:{list:{deep:!0,handler(e){Object.keys(e).length||(this.cardIndex=1),this.handleModList(e)}}},mounted(){this.cardIndex=1,this.handleModList({...this.list||{}})}});const le={key:0,class:"parent-tree"};function ge(e,a,r,i,n,s){const g=q("sb-org-tree-item");return o(),d("div",f({class:"organization-wrapper"},{...e.$attrs}),[Object.keys(e.list).length?(o(),d("ul",le,[(o(),I(g,f({item:e.localList,key:`${e.$.uid}-org`,lastIndex:e.cardIndex},{isDraggable:e.isDraggable},{onChangeItem:e.handleChangeItem}),null,16,["item","lastIndex","onChangeItem"]))])):m("",!0)],16)}const pe=k(W,[["render",ge]]);W.__docgenInfo={displayName:"sb-organization-tree",exportName:"default",description:"",tags:{},props:[{name:"isDraggable",type:{name:"boolean"},required:!1},{name:"list",type:{name:"IOrganizationTreeItem"},required:!0}],events:[{name:"change",type:{names:["undefined"]}}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/organization-tree/organization-tree.vue"]};const{UPDATE_STORY_ARGS:he}=__STORYBOOK_MODULE_CORE_EVENTS__,ue={title:"Components/Organization Tree",component:pe,tags:["autodocs"],argTypes:{isDraggable:{control:"boolean",description:"Is Item draggable"},list:{control:"object",description:"Organization Tree items"},onChange:{action:"click",control:!1,description:"Fired when tree changed by user drag",table:{category:"events",type:{summary:"(list: IOrganizationTreeItem) => void"}},type:"function"}},args:{list:{childs:[{childs:[{childs:[{name:"Ellie",photo:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Jr. Software Engineer"},{childs:[{name:"David",photo:"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Front-End Engineer"},{name:"Motoki",photo:"https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Back-End Engineer"}],name:"Owen",photo:"https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Software Engineer"}],name:"Ospan Ali",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Head of Software Engineering"}],department:"Software Engineering"}],name:"Griffin Woldridge",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"CEO"}},decorators:[(e,a)=>(delete a.args.change,a.args.onChange=r=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(he,{storyId:a.id,updatedArgs:{list:r}})},e())],parameters:{docs:{controls:{exclude:["change"],sort:"requiredFirst"}}}},b={args:{}},w={args:{isDraggable:!0}},M={args:{list:{childs:[{childs:[{additionalInfo:'<p style="margin: 0;">additional info</p>',childs:[{additionalInfo:'<p style="margin: 0;">additional info</p>',name:"Ellie",photo:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Jr. Software Engineer"},{childs:[{additionalInfo:'<p style="margin: 0;">additional info</p>',name:"David",photo:"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Front-End Engineer"},{name:"Motoki",photo:"https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Back-End Engineer"}],name:"Owen",photo:"https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",position:"Software Engineer"}],name:"Ospan Ali",photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"Head of Software Engineering"}],department:"Software Engineering"}],name:"Griffin Woldridge",photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",position:"CEO"}}};var x,G,F;b.parameters={...b.parameters,docs:{...(x=b.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {}
}`,...(F=(G=b.parameters)==null?void 0:G.docs)==null?void 0:F.source}}};var S,A,C;w.parameters={...w.parameters,docs:{...(S=w.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    isDraggable: true
  }
}`,...(C=(A=w.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var z,$,Z;M.parameters={...M.parameters,docs:{...(z=M.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    list: {
      childs: [{
        childs: [{
          additionalInfo: '<p style="margin: 0;">additional info</p>',
          childs: [{
            additionalInfo: '<p style="margin: 0;">additional info</p>',
            name: 'Ellie',
            photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
            position: 'Jr. Software Engineer'
          }, {
            childs: [{
              additionalInfo: '<p style="margin: 0;">additional info</p>',
              name: 'David',
              photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
              position: 'Front-End Engineer'
            }, {
              name: 'Motoki',
              photo: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
              position: 'Back-End Engineer'
            }],
            name: 'Owen',
            photo: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
            position: 'Software Engineer'
          }],
          name: 'Ospan Ali',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
          position: 'Head of Software Engineering'
        }],
        department: 'Software Engineering'
      }],
      name: 'Griffin Woldridge',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww',
      position: 'CEO'
    }
  }
}`,...(Z=($=M.parameters)==null?void 0:$.docs)==null?void 0:Z.source}}};const ce=["Default","Draggable","AdditionalInfo"];export{M as AdditionalInfo,b as Default,w as Draggable,ce as __namedExportsOrder,ue as default};
