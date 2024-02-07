import{e as ue,s as ce,o as r,g as o,j as p,F as c,G as F,n as m,f as d,t as v,m as n,H as V,q as P,l as D,v as i,p as $,z as E,E as h,A as me}from"./vue.esm-bundler-499c3502.js";import{B as ve}from"./button-5a922869.js";import{c as he,p as ge,x as be}from"./icons-09726845.js";import{_ as ye}from"./_plugin-vue_export-helper-c27b6911.js";import"./tooltip-c0323d5b.js";const de=ue({emits:{"update:modelValue":e=>!0,change:e=>!0,finish:()=>!0},props:{alternateTitle:{required:!1,type:Boolean},hideFooter:{required:!1,type:Boolean},interceptNav:{required:!1,type:Function},isDetail:{required:!1,type:Boolean},items:{required:!0,type:Object},mobile:{required:!1,type:Boolean},modelValue:{required:!0,type:Number},nonLinear:{required:!1,type:Boolean},type:{default:"horizontal",type:String}},name:"sb-stepper",components:{"sb-button":ve},data(){return{isButtonDisabled:!1,localCurrent:1,localItems:[]}},computed:{getNextColor(){return this.localItems[this.localCurrent-1].nextColor||"secondary"},getNextText(){return this.localItems[this.localCurrent-1].nextText||"next"},getPrevColor(){return this.localItems[this.localCurrent-1].prevColor||"secondary"},getPrevText(){return this.localItems[this.localCurrent-1].prevText||"prev"},getSkipText(){return this.localItems[this.localCurrent-1].optionalText||"skip"},iconCheck(){return he()},iconPen(){return ge()},iconXMark(){return be()},isNextDisabled(){return this.isError(this.localItems[this.localCurrent-1].rules)||this.isButtonDisabled}},methods:{doNavigate(e){this.localCurrent+e<=this.items.length?(this.$emit("update:modelValue",this.localCurrent+e),this.$emit("change",this.localCurrent+e)):this.localCurrent===this.items.length&&this.$emit("finish")},async handleClickHead(e){return await this.handleNav(e+1-this.localCurrent)},async handleNav(e,t=!1){if(t)this.localItems[this.localCurrent-1].isSkip=!0,this.doNavigate(e);else{const l=this.localCurrent+e;if(this.localItems[l-1]&&this.localItems[l-1].optional&&this.localItems[l-1].isSkip&&(this.localItems[l-1].isSkip=!1),this.interceptNav){this.isButtonDisabled=!0;const I=await this.interceptNav(this.localCurrent+e);this.isButtonDisabled=!1,I&&this.doNavigate(e)}else this.doNavigate(e)}},isError(e){return e?e.some(l=>!l()):!1},isFilled(e){return this.localCurrent>e+1}},watch:{items:{deep:!0,handler(e){this.localItems=[...e]},immediate:!0},modelValue:{handler(e){this.localCurrent=e},immediate:!0}}});const Se={class:"stepper-header"},fe=["onClick"],Ce={class:"header-step-number-wrapper"},Ne={key:3},ke={key:1},Te={key:0},we={class:"stepper-body"},Ie={class:"action-buttons"},De={class:"stepper-body"},Be={class:"action-buttons"};function Fe(e,t,l,I,$e,Ee){const u=ce("sb-button");return r(),o("div",P({class:["stepper-wrapper",[e.type]]},{...e.$attrs}),[p("div",Se,[(r(!0),o(c,null,F(e.localItems,(a,s)=>(r(),o(c,{key:`header-step-${s}`},[p("div",{class:m(["header-step",{"non-linear":e.nonLinear||e.isDetail,active:e.localCurrent>=s+1&&!a.isSkip,alternate:e.alternateTitle,error:e.isError(a.rules),filled:e.isFilled(s)}]),onClick:()=>(e.nonLinear||e.isDetail)&&e.handleClickHead(s)},[p("div",Ce,[e.isDetail?(r(),o("span",ke,i(s+1),1)):(r(),o(c,{key:0},[e.isError(a.rules)?(r(),d(D(e.iconXMark),{key:0})):e.localCurrent===s+1&&!a.isSkip?(r(),d(D(e.iconPen),{key:1})):e.isFilled(s)&&!a.isSkip?(r(),d(D(e.iconCheck),{key:2})):(r(),o("span",Ne,i(s+1),1))],64))]),e.mobile?n("",!0):(r(),o("div",{key:0,class:m([{error:e.isError(a.rules)},"header-step-label-wrapper"])},[p("div",null,i(a.title),1),a.subtitle?(r(),o("div",Te,i(a.subtitle),1)):n("",!0)],2)),e.type==="vertical"?(r(),o("div",{key:1,class:m(["content-wrapper",{expanded:e.localCurrent===s+1}])},[p("div",we,[p("div",{class:"stepper-body-content",ref_for:!0,ref:`body-content-${s+1}`},[e.localCurrent===s+1?$(e.$slots,"step",E(P({key:0},{...a,index:s+1})),void 0,!0):n("",!0)],512)]),e.hideFooter?n("",!0):(r(),o("div",{key:0,class:m(["stepper-footer",{"only-next":e.localCurrent===1}])},[s!==0?(r(),d(u,{key:0,color:e.getPrevColor,disabled:e.isButtonDisabled,"no-elevation":"",type:"button",variant:"outlined",onClick:t[0]||(t[0]=B=>e.handleNav(-1))},{default:v(()=>[h(i(e.getPrevText),1)]),_:1},8,["color","disabled"])):n("",!0),p("div",Ie,[e.localItems[e.localCurrent-1].optional?(r(),d(u,{key:0,disabled:e.isButtonDisabled,"no-elevation":"",color:"secondary",type:"button",variant:"outlined",onClick:t[1]||(t[1]=B=>e.handleNav(1,!0))},{default:v(()=>[h(i(e.getSkipText),1)]),_:1},8,["disabled"])):n("",!0),V(u,{type:"button",color:e.getNextColor,disabled:e.isNextDisabled,onClick:t[2]||(t[2]=B=>e.handleNav(1))},{default:v(()=>[h(i(e.getNextText),1)]),_:1},8,["color","disabled"])])],2))],2)):n("",!0)],10,fe),s!==e.localItems.length-1&&e.type!=="vertical"?(r(),o("hr",{key:0,class:m(["header-step_divider",{active:e.isFilled(s),mobile:e.mobile}])},null,2)):n("",!0)],64))),128))]),e.type==="horizontal"?(r(),o(c,{key:0},[p("div",De,[(r(!0),o(c,null,F(e.localItems,(a,s)=>(r(),o(c,{key:`body-content-${s}`},[e.localCurrent===s+1?(r(),o("div",{key:0,ref_for:!0,ref:`body-content-${s+1}`,class:"stepper-body-content"},[$(e.$slots,"step",E(me({...a,index:s+1})),void 0,!0)],512)):n("",!0)],64))),128))]),e.hideFooter?n("",!0):(r(),o("div",{key:0,class:m(["stepper-footer",{"only-next":e.localCurrent===1}])},[e.localCurrent!==1?(r(),d(u,{key:0,color:e.getPrevColor,disabled:e.isButtonDisabled,"no-elevation":"",type:"button",variant:"outlined",onClick:t[3]||(t[3]=a=>e.handleNav(-1))},{default:v(()=>[h(i(e.getPrevText),1)]),_:1},8,["color","disabled"])):n("",!0),p("div",Be,[e.localItems[e.localCurrent-1].optional?(r(),d(u,{key:0,disabled:e.isButtonDisabled,"no-elevation":"",color:"secondary",type:"button",variant:"outlined",onClick:t[4]||(t[4]=a=>e.handleNav(1,!0))},{default:v(()=>[h(i(e.getSkipText),1)]),_:1},8,["disabled"])):n("",!0),V(u,{type:"button",color:e.getNextColor,disabled:e.isNextDisabled,onClick:t[5]||(t[5]=a=>e.handleNav(1))},{default:v(()=>[h(i(e.getNextText),1)]),_:1},8,["color","disabled"])])],2))],64)):n("",!0)],16)}const Ve=ye(de,[["render",Fe],["__scopeId","data-v-feee9646"]]);de.__docgenInfo={displayName:"sb-stepper",exportName:"default",description:"",tags:{},props:[{name:"alternateTitle",type:{name:"boolean"},required:!1},{name:"hideFooter",type:{name:"boolean"},required:!1},{name:"interceptNav",type:{name:`| ((_target: number) => boolean)
| ((_target: number) => Promise<boolean>)`},required:!1},{name:"isDetail",type:{name:"boolean"},required:!1},{name:"items",type:{name:"IStepperItem[]"},required:!0},{name:"mobile",type:{name:"boolean"},required:!1},{name:"modelValue",type:{name:"number"},required:!0},{name:"nonLinear",type:{name:"boolean"},required:!1},{name:"type",values:["horizontal","vertical"],type:{name:"string"},defaultValue:{func:!1,value:"'horizontal'"}}],events:[{name:"update:modelValue",type:{names:["undefined"]}},{name:"change",type:{names:["undefined"]}},{name:"finish"}],slots:[{name:"step",scoped:!0,bindings:[{name:"index",title:"binding"},{name:"v-bind",title:"binding"}]}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/stepper/stepper.vue"]};const{UPDATE_STORY_ARGS:Pe}=__STORYBOOK_MODULE_CORE_EVENTS__,ze={title:"Components/Stepper",component:Ve,tags:["autodocs"],argTypes:{"onUpdate:modelValue":{action:"change",control:!1,description:"Stepper will throw this event to update modelValue",table:{category:"events",type:{summary:"(active: number) => void"}},type:"function"},alternateTitle:{control:"boolean",description:"Display Stepper title alternate or default"},interceptNav:{description:"Function to intercept stepper navigation"},items:{control:"object",description:"Stepper items"},mobile:{control:"boolean",description:"If this props exist then Step label will be hidden and show Step divider for vertical orientation"},modelValue:{control:"number",description:"Current active Step"},nonLinear:{control:"boolean",description:"If this props exist then Stepper will allows users to enter multi-step flow at any point"},onChange:{action:"change",control:!1,description:"Stepper will throw this event when Stepper current Step changed",table:{category:"events",type:{summary:"(active: number) => void"}},type:"function"},onFinish:{action:"click",control:!1,description:"Stepper will throw this event when step is finished",table:{category:"events",type:{summary:"() => void"}},type:"function"},type:{control:"select",description:"Stepper orientation",options:["horizontal","vertical"]}},args:{items:[{title:"Step 1"},{title:"Step 2"},{title:"Step 3"}],modelValue:1},decorators:[(e,t)=>(delete t.args.finish,delete t.args["onUpdate:modelValue"],delete t.args.change,t.args.onFinish=()=>{console.log("STEPPER FINISHED")},t.args.onChange=l=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(Pe,{storyId:t.id,updatedArgs:{modelValue:l}})},e())],parameters:{docs:{controls:{exclude:["change","finish","update:modelValue"],sort:"requiredFirst"}},slots:{step:{description:"Step render slot",template:`
                    <template #step="{ index }">
                        <div>
                            <div class="text-lg text-gray-700 font-semibold mb-6">
                                Step {{ index }}
                            </div>
                            <div class="text-base text-gray-700">
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry.
                            </div>
                        </div>
                    </template>
                `}}}},g={args:{}},b={args:{items:[{title:"Step 1",nextColor:"primary",nextText:"Next 2"},{title:"Step 2",nextColor:"info",nextText:"Next 3",prevColor:"danger",prevText:"Prev 1"},{title:"Step 3",nextColor:"success",nextText:"Finish",prevColor:"warning",prevText:"Prev 2"}]}},y={args:{items:[{subtitle:"sub Step 1",title:"Step 1"},{subtitle:"sub Step 2",title:"Step 2"},{subtitle:"sub Step 3",title:"Step 3"}]}},S={args:{items:[{title:"Step 1"},{rules:[()=>!1],subtitle:"some error",title:"Step 2"},{title:"Step 3"}]}},f={args:{items:[{title:"Step 1"},{optional:!0,optionalText:"lewati",title:"Step 2"},{title:"Step 3"}]}},C={args:{interceptNav:e=>new Promise(t=>{e===3?(console.log("wait 5 sec"),setTimeout(()=>{t(!0)},5e3)):t(!0)}).then(t=>t)},parameters:{slots:{step:{description:"Step render slot",template:`
                    <template #step="{ index }">
                        <div>
                            <div class="text-lg text-gray-700 font-semibold mb-6">
                                Step {{ index }}
                            </div>
                            <div class="text-base text-gray-700">
                                <template v-if="index !== 2">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry.
                                </template>
                                <template v-else>
                                    This Step will wait 5 seconds before next Step
                                </template>
                            </div>
                        </div>
                    </template>
                `}}}},N={args:{nonLinear:!0}},k={args:{type:"vertical"}},T={args:{hideFooter:!0,nonLinear:!0}},w={args:{isDetail:!0}};var q,L,O;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {}
}`,...(O=(L=g.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};var x,R,z;b.parameters={...b.parameters,docs:{...(x=b.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    items: [{
      title: 'Step 1',
      nextColor: 'primary',
      nextText: 'Next 2'
    }, {
      title: 'Step 2',
      nextColor: 'info',
      nextText: 'Next 3',
      prevColor: 'danger',
      prevText: 'Prev 1'
    }, {
      title: 'Step 3',
      nextColor: 'success',
      nextText: 'Finish',
      prevColor: 'warning',
      prevText: 'Prev 2'
    }]
  }
}`,...(z=(R=b.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var A,H,U;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    items: [{
      subtitle: 'sub Step 1',
      title: 'Step 1'
    }, {
      subtitle: 'sub Step 2',
      title: 'Step 2'
    }, {
      subtitle: 'sub Step 3',
      title: 'Step 3'
    }]
  }
}`,...(U=(H=y.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};var j,M,Y;S.parameters={...S.parameters,docs:{...(j=S.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    items: [{
      title: 'Step 1'
    }, {
      rules: [() => false],
      subtitle: 'some error',
      title: 'Step 2'
    }, {
      title: 'Step 3'
    }]
  }
}`,...(Y=(M=S.parameters)==null?void 0:M.docs)==null?void 0:Y.source}}};var G,K,X;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    items: [{
      title: 'Step 1'
    }, {
      optional: true,
      optionalText: 'lewati',
      title: 'Step 2'
    }, {
      title: 'Step 3'
    }]
  }
}`,...(X=(K=f.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var J,Q,W;C.parameters={...C.parameters,docs:{...(J=C.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    interceptNav: (target: number) => {
      return new Promise<boolean>(resolve => {
        if (target === 3) {
          console.log('wait 5 sec');
          setTimeout(() => {
            resolve(true);
          }, 5000);
        } else {
          resolve(true);
        }
      }).then((value: boolean) => value);
    }
  },
  parameters: {
    slots: {
      step: {
        description: 'Step render slot',
        template: \`
                    <template #step="{ index }">
                        <div>
                            <div class="text-lg text-gray-700 font-semibold mb-6">
                                Step {{ index }}
                            </div>
                            <div class="text-base text-gray-700">
                                <template v-if="index !== 2">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry.
                                </template>
                                <template v-else>
                                    This Step will wait 5 seconds before next Step
                                </template>
                            </div>
                        </div>
                    </template>
                \`
      }
    }
  }
}`,...(W=(Q=C.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var Z,_,ee;N.parameters={...N.parameters,docs:{...(Z=N.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    nonLinear: true
  }
}`,...(ee=(_=N.parameters)==null?void 0:_.docs)==null?void 0:ee.source}}};var te,re,se;k.parameters={...k.parameters,docs:{...(te=k.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    type: 'vertical'
  }
}`,...(se=(re=k.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var oe,ae,ne;T.parameters={...T.parameters,docs:{...(oe=T.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    hideFooter: true,
    nonLinear: true
  }
}`,...(ne=(ae=T.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var ie,le,pe;w.parameters={...w.parameters,docs:{...(ie=w.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    isDetail: true
  }
}`,...(pe=(le=w.parameters)==null?void 0:le.docs)==null?void 0:pe.source}}};const Ae=["Default","ButtonNavigation","StepSubtitle","StepRules","OptionalStep","InterceptNavigation","NonLinear","Vertical","NoFooter","ViewDetail"];export{b as ButtonNavigation,g as Default,C as InterceptNavigation,T as NoFooter,N as NonLinear,f as OptionalStep,S as StepRules,y as StepSubtitle,k as Vertical,w as ViewDetail,Ae as __namedExportsOrder,ze as default};
