import{e as y,s as w,o as r,g as c,j as $,E as d,t as u,q as M,k as b,f as O,K as I,T as B,F as E,p,C as P,v as N,u as T,m as W,n as D}from"./vue.esm-bundler-268ebf68.js";import{B as q}from"./button-ac9f758f.js";import{r as m}from"./helper-91f3687e.js";import{_ as S}from"./_plugin-vue_export-helper-c27b6911.js";import"./tooltip-922dc3de.js";const k=y({emits:{change:e=>!0},props:{color:{default:"default",type:String},disabled:{default:!1,type:Boolean},label:{required:!1,type:String},noElevation:{required:!1,type:Boolean},open:{required:!0,type:Boolean},size:{default:"base",type:String},tooltip:{required:!1,type:String},variant:{default:"contained",type:String}},name:"sb-menu",components:{"sb-button":q},data(){return{localOpen:!1,itemsWrapperStyles:[],parentWithScroll:null}},methods:{handleClose(e){const t=e.target,n=this.$refs["menu-wrapper"];t&&n&&!n.contains(t)&&!t.isSameNode(n)&&this.$emit("change",!1)},handleOpen(){this.disabled||(this.localOpen=!0,this.$emit("change",!0),this.$nextTick(()=>{this.setPopupPosition()}))},handleParentScroll(e){const t=m(this.$el);this.parentWithScroll&&this.parentWithScroll.removeEventListener("scroll",()=>{this.setPopupPosition()}),t&&(e?t.addEventListener("scroll",()=>{this.setPopupPosition()}):t.removeEventListener("scroll",()=>{this.setPopupPosition()})),this.$nextTick(()=>{this.parentWithScroll=t})},setPopupPosition(){var t;const e=this.$refs["menu-wrapper"];if(e){const n=e.getBoundingClientRect(),o=(t=this.$refs["menu-items-wrapper"])==null?void 0:t.getBoundingClientRect(),s=()=>n.width<o.width?n.x+(n.width-o.width)/2:n.x;if(o){const a=n.width>o.width?n.width:o.width;return document.body.getBoundingClientRect().height-(n.height+n.y)<=o.height?this.itemsWrapperStyles={left:`${s()}px`,top:`${n.y-6-o.height}px`,width:`${a}px`}:this.itemsWrapperStyles={left:`${s()}px`,top:`${n.y+n.height}px`,width:`${a}px`}}}}},watch:{open(e){this.localOpen=e},localOpen(e){this.handleParentScroll(e)}},mounted(){this.setPopupPosition(),document.addEventListener("click",e=>this.handleClose(e)),this.parentWithScroll=m(this.$el)},unmounted(){document.removeEventListener("click",e=>this.handleClose(e)),this.parentWithScroll&&this.parentWithScroll.removeEventListener("scroll",()=>{this.setPopupPosition()})}});const R={class:"menu-wrapper",ref:"menu-wrapper"};function L(e,t,n,o,s,a){const i=w("sb-button");return r(),c(E,null,[$("div",R,[d(i,M({"no-elevation":e.localOpen||e.noElevation},{color:e.color,disabled:e.disabled,size:e.size,tooltip:e.tooltip,variant:e.variant},{onClick:b(e.handleOpen,["stop"])}),{default:u(()=>[p(e.$slots,"slot-label",{},()=>[P(N(e.label||"..."),1)],!0)]),_:3},16,["no-elevation","onClick"])],512),(r(),O(B,{to:"body"},[d(I,null,{default:u(()=>[e.localOpen?(r(),c("div",{key:0,class:"menu-items-wrapper",ref:"menu-items-wrapper",style:T(e.itemsWrapperStyles)},[p(e.$slots,"default",{},void 0,!0)],4)):W("",!0)]),_:3})]))],64)}const h=S(k,[["render",L],["__scopeId","data-v-a8e5f115"]]);k.__docgenInfo={displayName:"sb-menu",exportName:"default",description:"",tags:{},props:[{name:"color",values:["accent","default","primary","info","secondary","warning","success","danger"],type:{name:"string"},defaultValue:{func:!1,value:"'default'"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"label",type:{name:"string"},required:!1},{name:"noElevation",type:{name:"boolean"},required:!1},{name:"open",type:{name:"boolean"},required:!0},{name:"size",values:["base","large","small"],type:{name:"string"},defaultValue:{func:!1,value:"'base'"}},{name:"tooltip",type:{name:"string"},required:!1},{name:"variant",values:["contained","outlined","text"],type:{name:"string"},defaultValue:{func:!1,value:"'contained'"}}],events:[{name:"change",type:{names:["undefined"]}}],slots:[{name:"slot-label"},{name:"default"}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/menu/menu.vue"]};const C=y({emits:{click:e=>!0},name:"sb-menu-item",data(){return{isClicked:!1}},methods:{handleClick(e){const t=e;this.isClicked=!0,setTimeout(()=>{this.isClicked=!1},200),this.$emit("click",t)}}});function V(e,t,n,o,s,a){return r(),c("div",{class:D(["menu-item",{clicked:e.isClicked}]),onClick:t[0]||(t[0]=b((...i)=>e.handleClick&&e.handleClick(...i),["stop"]))},[p(e.$slots,"default",{},void 0,!0)],2)}const x=S(C,[["render",V],["__scopeId","data-v-23ea429d"]]);C.__docgenInfo={displayName:"sb-menu-item",exportName:"default",description:"",tags:{},events:[{name:"click",type:{names:["undefined"]}}],slots:[{name:"default"}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/menu-item/menu-item.vue"]};const{UPDATE_STORY_ARGS:f}=__STORYBOOK_MODULE_CORE_EVENTS__,U={title:"Components/Menu",component:h,tags:["autodocs"],argTypes:{color:{control:"select",description:"Button color",options:["accent","default","primary","info","secondary","warning","success","danger"]},disabled:{control:"boolean",description:"Is Button disabled"},label:{control:"text",description:"Menu button label"},noElevation:{control:"boolean",description:"Button has elevation or not (default: true)"},onChange:{action:"click",control:!1,description:"Fired when Menu will open or will close",table:{category:"events",type:{summary:"(isOpen: boolean) => void"}},type:"function"},open:{control:"boolean",description:"Set Menu is open or not"},size:{control:"select",description:"Button sizes",options:["base","large","small"]},tooltip:{control:"text",description:"Button tooltip"},variant:{control:"select",description:"Button variants",options:["contained","outlined","text"]}},args:{label:"Menu Prop",open:!1},decorators:[(e,t)=>(delete t.args.change,t.args.onChange=n=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(f,{storyId:t.id,updatedArgs:{open:n}})},e())],parameters:{docs:{controls:{exclude:["change"],sort:"requiredFirst"}},slots:{"slot-label":{description:"Menu button label slot component will render this over label prop"},default:{description:"Menu item slot"}}},render:(e,{id:t})=>({components:{Menu:h,MenuItem:x},setup(){return{args:e,onClickItem:()=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(f,{storyId:t,updatedArgs:{open:!1}})}}},template:`
            <div style="height: 20rem; display: flex; justify-content: center; padding-top: 2rem;">
                <Menu v-bind="args">
                    <template v-slot:slot-label>Menu Slot</template>
                    <MenuItem @click="onClickItem">Menu 1</MenuItem>
                    <MenuItem @click="onClickItem">Menu 2</MenuItem>
                    <MenuItem @click="onClickItem">Menu 3</MenuItem>
                    <MenuItem @click="onClickItem">Menu 4</MenuItem>
                </Menu>
            </div>
        `})},l={args:{}};var g,v,_;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {}
}`,...(_=(v=l.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};const Y=["Default"];export{l as Default,Y as __namedExportsOrder,U as default};
