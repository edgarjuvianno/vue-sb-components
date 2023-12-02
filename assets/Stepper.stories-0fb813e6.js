import{e as se,s as oe,o as s,g as a,j as n,F as h,D,f as d,t as c,m as l,E as B,n as m,q as P,l as w,v as p,p as V,G as $,C as v,H as ae}from"./vue.esm-bundler-1a22c5b9.js";import{B as ne}from"./button-32340845.js";import{c as le,p as ie,x as pe}from"./icons-69f7cd3d.js";import{_ as de}from"./_plugin-vue_export-helper-c27b6911.js";import"./tooltip-38bd4af4.js";const re=se({emits:["change","finish","update:modelValue"],props:{alternateTitle:{required:!1,type:Boolean},interceptNav:{required:!1,type:Function},items:{required:!0,type:Object},mobile:{required:!1,type:Boolean},modelValue:{required:!0,type:Number},nonLinear:{required:!1,type:Boolean},type:{default:"horizontal",type:String}},name:"sb-stepper",components:{"sb-button":ne},data(){return{isButtonDisabled:!1,localCurrent:1,localItems:[]}},computed:{getNextColor(){return this.localItems[this.localCurrent-1].nextColor||"secondary"},getNextText(){return this.localItems[this.localCurrent-1].nextText||"next"},getPrevColor(){return this.localItems[this.localCurrent-1].prevColor||"secondary"},getPrevText(){return this.localItems[this.localCurrent-1].prevText||"prev"},getSkipText(){return this.localItems[this.localCurrent-1].optionalText||"skip"},iconCheck(){return le()},iconPen(){return ie()},iconXMark(){return pe()},isNextDisabled(){return this.isError(this.localItems[this.localCurrent-1].rules)||this.isButtonDisabled}},methods:{doNavigate(e){this.localCurrent+e<=this.items.length?(this.$emit("update:modelValue",this.localCurrent+e),this.$emit("change",this.localCurrent+e)):this.localCurrent===this.items.length&&this.$emit("finish")},async handleClickHead(e){return await this.handleNav(e+1-this.localCurrent)},async handleNav(e,t=!1){if(t)this.localItems[this.localCurrent-1].isSkip=!0,this.doNavigate(e);else{const i=this.localCurrent+e;if(this.localItems[i-1]&&this.localItems[i-1].optional&&this.localItems[i-1].isSkip&&(this.localItems[i-1].isSkip=!1),this.interceptNav){this.isButtonDisabled=!0;const T=await this.interceptNav(this.localCurrent+e);this.isButtonDisabled=!1,T&&this.doNavigate(e)}else this.doNavigate(e)}},isError(e){return e?e.some(i=>!i()):!1},isFilled(e){return this.localCurrent>e+1}},watch:{items:{deep:!0,handler(e){this.localItems=[...e]},immediate:!0},modelValue:{handler(e){this.localCurrent=e},immediate:!0}}});const ue={class:"stepper-header"},ce=["onClick"],me={class:"header-step-number-wrapper"},ve={key:3},he={key:0},be={class:"stepper-body"},ge={class:"action-buttons"},Se={class:"stepper-body"},ye={class:"action-buttons"};function fe(e,t,i,T,ke,Te){const u=oe("sb-button");return s(),a("div",P({class:["stepper-wrapper",[e.type]]},{...e.$attrs}),[n("div",ue,[(s(!0),a(h,null,D(e.localItems,(o,r)=>(s(),a(h,{key:`header-step-${r}`},[n("div",{class:m(["header-step",{"non-linear":e.nonLinear,active:e.localCurrent>=r+1&&!o.isSkip,alternate:e.alternateTitle,error:e.isError(o.rules),filled:e.isFilled(r)}]),onClick:()=>e.nonLinear&&e.handleClickHead(r)},[n("div",me,[e.isError(o.rules)?(s(),d(w(e.iconXMark),{key:0})):e.localCurrent===r+1&&!o.isSkip?(s(),d(w(e.iconPen),{key:1})):e.isFilled(r)&&!o.isSkip?(s(),d(w(e.iconCheck),{key:2})):(s(),a("span",ve,p(r+1),1))]),e.mobile?l("",!0):(s(),a("div",{key:0,class:m([{error:e.isError(o.rules)},"header-step-label-wrapper"])},[n("div",null,p(o.title),1),o.subtitle?(s(),a("div",he,p(o.subtitle),1)):l("",!0)],2)),e.type==="vertical"?(s(),a("div",{key:1,class:m(["content-wrapper",{expanded:e.localCurrent===r+1}])},[n("div",be,[n("div",{class:"stepper-body-content",ref_for:!0,ref:`body-content-${r+1}`},[e.localCurrent===r+1?V(e.$slots,"step",$(P({key:0},{...o,index:r+1})),void 0,!0):l("",!0)],512)]),n("div",{class:m(["stepper-footer",{"only-next":e.localCurrent===1}])},[r!==0?(s(),d(u,{key:0,color:e.getPrevColor,disabled:e.isButtonDisabled,"no-elevation":"",type:"button",variant:"text",onClick:t[0]||(t[0]=I=>e.handleNav(-1))},{default:c(()=>[v(p(e.getPrevText),1)]),_:1},8,["color","disabled"])):l("",!0),n("div",ge,[e.localItems[e.localCurrent-1].optional?(s(),d(u,{key:0,disabled:e.isButtonDisabled,"no-elevation":"",color:"secondary",type:"button",variant:"outlined",onClick:t[1]||(t[1]=I=>e.handleNav(1,!0))},{default:c(()=>[v(p(e.getSkipText),1)]),_:1},8,["disabled"])):l("",!0),B(u,{type:"button",color:e.getNextColor,disabled:e.isNextDisabled,onClick:t[2]||(t[2]=I=>e.handleNav(1))},{default:c(()=>[v(p(e.getNextText),1)]),_:1},8,["color","disabled"])])],2)],2)):l("",!0)],10,ce),r!==e.localItems.length-1&&e.type!=="vertical"?(s(),a("hr",{key:0,class:m(["header-step_divider",{active:e.isFilled(r),mobile:e.mobile}])},null,2)):l("",!0)],64))),128))]),e.type==="horizontal"?(s(),a(h,{key:0},[n("div",Se,[(s(!0),a(h,null,D(e.localItems,(o,r)=>(s(),a(h,{key:`body-content-${r}`},[e.localCurrent===r+1?(s(),a("div",{key:0,ref_for:!0,ref:`body-content-${r+1}`,class:"stepper-body-content"},[V(e.$slots,"step",$(ae({...o,index:r+1})),void 0,!0)],512)):l("",!0)],64))),128))]),n("div",{class:m(["stepper-footer",{"only-next":e.localCurrent===1}])},[e.localCurrent!==1?(s(),d(u,{key:0,color:e.getPrevColor,disabled:e.isButtonDisabled,"no-elevation":"",type:"button",variant:"text",onClick:t[3]||(t[3]=o=>e.handleNav(-1))},{default:c(()=>[v(p(e.getPrevText),1)]),_:1},8,["color","disabled"])):l("",!0),n("div",ye,[e.localItems[e.localCurrent-1].optional?(s(),d(u,{key:0,disabled:e.isButtonDisabled,"no-elevation":"",color:"secondary",type:"button",variant:"outlined",onClick:t[4]||(t[4]=o=>e.handleNav(1,!0))},{default:c(()=>[v(p(e.getSkipText),1)]),_:1},8,["disabled"])):l("",!0),B(u,{type:"button",color:e.getNextColor,disabled:e.isNextDisabled,onClick:t[5]||(t[5]=o=>e.handleNav(1))},{default:c(()=>[v(p(e.getNextText),1)]),_:1},8,["color","disabled"])])],2)],64)):l("",!0)],16)}const Ce=de(re,[["render",fe],["__scopeId","data-v-a90a3a72"]]);re.__docgenInfo={displayName:"sb-stepper",exportName:"default",description:"",tags:{},props:[{name:"alternateTitle",type:{name:"boolean"},required:!1},{name:"interceptNav",type:{name:`| ((_target: number) => boolean)
| ((_target: number) => Promise<boolean>)`},required:!1},{name:"items",type:{name:"IStepperItem[]"},required:!0},{name:"mobile",type:{name:"boolean"},required:!1},{name:"modelValue",type:{name:"number"},required:!0},{name:"nonLinear",type:{name:"boolean"},required:!1},{name:"type",values:["horizontal","vertical"],type:{name:"string"},defaultValue:{func:!1,value:"'horizontal'"}}],events:[{name:"change",type:{names:["undefined"]}},{name:"finish"},{name:"update:modelValue",type:{names:["undefined"]}}],slots:[{name:"step",scoped:!0,bindings:[{name:"index",title:"binding"},{name:"v-bind",title:"binding"}]}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-component-lib/vue-base-lib-storybook/src/components/stepper/stepper.vue"]};const{UPDATE_STORY_ARGS:Ne}=__STORYBOOK_MODULE_CORE_EVENTS__,Ve={title:"Components/Stepper",component:Ce,tags:["autodocs"],argTypes:{"update:modelValue":{action:"change",control:!1,description:"Stepper will throw this event to update modelValue"},alternateTitle:{control:"boolean",description:"Display Stepper title alternate or default"},change:{action:"change",control:!1,description:"Stepper will throw this event when Stepper current Step changed"},finish:{action:"click",control:!1,description:"Stepper will throw this event when step is finished"},interceptNav:{description:"Function to intercept stepper navigation"},items:{control:"object",description:"Stepper items"},mobile:{control:"boolean",description:"If this props exist then Step label will be hidden and show Step divider for vertical orientation"},modelValue:{control:"number",description:"Current active Step"},nonLinear:{control:"boolean",description:"If this props exist then Stepper will allows users to enter multi-step flow at any point"},type:{control:"select",description:"Stepper orientation",options:["horizontal","vertical"]}},args:{items:[{title:"Step 1"},{title:"Step 2"},{title:"Step 3"}],modelValue:1},decorators:[(e,t)=>(delete t.args.finish,delete t.args["update:modelValue"],delete t.args.change,t.args.onFinish=()=>{console.log("STEPPER FINISHED")},t.args.onChange=i=>{window.__STORYBOOK_ADDONS_CHANNEL__.emit(Ne,{storyId:t.id,updatedArgs:{modelValue:i}})},e())],parameters:{slots:{step:{description:"Step render slot",template:`
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
                `}}}},b={args:{}},g={args:{items:[{title:"Step 1",nextColor:"primary",nextText:"Next 2"},{title:"Step 2",nextColor:"info",nextText:"Next 3",prevColor:"danger",prevText:"Prev 1"},{title:"Step 3",nextColor:"success",nextText:"Finish",prevColor:"warning",prevText:"Prev 2"}]}},S={args:{items:[{subtitle:"sub Step 1",title:"Step 1"},{subtitle:"sub Step 2",title:"Step 2"},{subtitle:"sub Step 3",title:"Step 3"}]}},y={args:{items:[{title:"Step 1"},{rules:[()=>!1],subtitle:"some error",title:"Step 2"},{title:"Step 3"}]}},f={args:{items:[{title:"Step 1"},{optional:!0,optionalText:"lewati",title:"Step 2"},{title:"Step 3"}]}},C={args:{interceptNav:e=>new Promise(t=>{e===3?(console.log("wait 5 sec"),setTimeout(()=>{t(!0)},5e3)):t(!0)}).then(t=>t)},parameters:{slots:{step:{description:"Step render slot",template:`
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
                `}}}},N={args:{nonLinear:!0}},k={args:{type:"vertical"}};var E,x,L;b.parameters={...b.parameters,docs:{...(E=b.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {}
}`,...(L=(x=b.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var O,q,F;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(F=(q=g.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};var R,z,A;S.parameters={...S.parameters,docs:{...(R=S.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(A=(z=S.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var H,j,M;y.parameters={...y.parameters,docs:{...(H=y.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(M=(j=y.parameters)==null?void 0:j.docs)==null?void 0:M.source}}};var U,Y,G;f.parameters={...f.parameters,docs:{...(U=f.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(G=(Y=f.parameters)==null?void 0:Y.docs)==null?void 0:G.source}}};var K,X,J;C.parameters={...C.parameters,docs:{...(K=C.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(J=(X=C.parameters)==null?void 0:X.docs)==null?void 0:J.source}}};var Q,W,Z;N.parameters={...N.parameters,docs:{...(Q=N.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    nonLinear: true
  }
}`,...(Z=(W=N.parameters)==null?void 0:W.docs)==null?void 0:Z.source}}};var _,ee,te;k.parameters={...k.parameters,docs:{...(_=k.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    type: 'vertical'
  }
}`,...(te=(ee=k.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const $e=["Default","ButtonNavigation","StepSubtitle","StepRules","OptionalStep","InterceptNavigation","NonLinear","Vertical"];export{g as ButtonNavigation,b as Default,C as InterceptNavigation,N as NonLinear,f as OptionalStep,y as StepRules,S as StepSubtitle,k as Vertical,$e as __namedExportsOrder,Ve as default};
