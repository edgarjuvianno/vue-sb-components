import{e as z,o,g as d,F as w,j as v,f as y,n as u,l as S,m as c,u as M,G as T,q as j,p as L,E as V,v as X,z as F,A as O}from"./vue.esm-bundler-38397e95.js";import{f as H,b as G}from"./icons-d0b18b59.js";import{_ as U}from"./_plugin-vue_export-helper-c27b6911.js";const b=(e,t)=>Array.from({length:t-e+1},(n,i)=>e+i*1),J=e=>[...e].sort((n,i)=>n.breakpoint-i.breakpoint),E=z({props:{arrow:{default:!0,type:Boolean},autoplay:{required:!1,type:Boolean},cardsToShow:{default:1,type:Number},dots:{default:!0,type:Boolean},infinite:{required:!1,type:Boolean},list:{required:!0,type:Object},responsive:{required:!1,type:Object},speed:{default:3e3,type:Number}},name:"sb-carousel",data(){return{autoplayInterval:null,cardWidth:0,cardsDisplay:[],carouselWrapper:null,currentPage:1,endDrag:-1,isDrag:!1,isMounted:!1,isSmallScreen:!1,localDots:[],localResponsives:[],sliderStyle:[],startDrag:-1}},computed:{iconAngleLeft(){return H()},iconAngleRight(){return G()},isDotsEnabled(){if(this.responsive&&typeof window<"u"){const e=this.localResponsives.find(t=>t.breakpoint===window.innerWidth);if(e)return e.settings.dots||this.dots}return this.dots},isInfinite(){if(this.responsive&&typeof window<"u"){const e=this.localResponsives.find(t=>t.breakpoint===window.innerWidth);if(e)return e.settings.infinite||this.infinite}return this.infinite}},methods:{getCardsToShow(){if(this.responsive&&typeof window<"u"){const e=this.localResponsives.find(t=>t.breakpoint>=window.innerWidth);if(e)return e.settings.cardsToShow||this.cardsToShow}return this.cardsToShow},handleDot(e){if(!this.isInfinite)this.currentPage=e,this.$nextTick(()=>{this.handleScrollBasic()});else{const t=this.currentPage;this.currentPage=e,this.$nextTick(()=>{this.handleScrollInfinite(e-t)})}},handleDrag(e){e.cancelable&&e.preventDefault(),e.movementX?this.endDrag=e.movementX:e.changedTouches&&(this.endDrag=e.changedTouches[0].clientX)},handleDragEnd(e){e.cancelable&&e.preventDefault(),this.isDrag&&(this.startDrag>this.endDrag?(!this.isInfinite&&this.currentPage<this.localDots.length||this.isInfinite)&&this.handleNav(1):this.startDrag<this.endDrag&&(!this.isInfinite&&this.currentPage>1||this.isInfinite)&&this.handleNav(-1),this.isDrag=!1)},handleDragStart(e){e.cancelable&&e.preventDefault(),e.movementX?this.startDrag=e.movementX:e.changedTouches&&(this.startDrag=e.changedTouches[0].clientX),this.isDrag=!0},handleInitCards(){typeof window<"u"&&(this.modifyCards(),this.$nextTick(()=>{this.localDots=Array.from(Array(Math.ceil(this.list.length/this.getCardsToShow())).keys()),this.setSliderStyles(),this.$nextTick(()=>{var e;if(this.$refs.slider&&this.isInfinite&&this.carouselWrapper){const n=this.carouselWrapper.getBoundingClientRect().width+16;(e=this.$refs.slider)==null||e.scrollTo({left:n})}})}))},handleNav(e){this.isInfinite?(e<0&&this.currentPage<2?this.currentPage=this.localDots.length:e>0&&this.currentPage===this.localDots.length?this.currentPage=1:this.currentPage+=e,this.$nextTick(()=>{this.handleScrollInfinite(e)})):(e<0&&this.currentPage>1||e>0&&this.currentPage<this.list.length)&&(this.currentPage+=e,this.$nextTick(()=>{this.handleScrollBasic()}))},handleResize(){this.handleInitCards()},handleScrollBasic(){var e;this.$refs.slider&&((e=this.$refs.slider)==null||e.scrollTo({behavior:"smooth",left:(this.currentPage-1)*this.carouselWrapper.getBoundingClientRect().width+(this.currentPage>1?16*(this.currentPage-1):0)}))},handleScrollInfinite(e){if(this.$refs.slider){const t=this.$refs.slider.scrollLeft,n=this.carouselWrapper.getBoundingClientRect().width,i=n+16;this.modifyCards(),e<0?this.$nextTick(()=>{var l;(l=this.$refs.slider)==null||l.scrollTo({left:t+n+i}),setTimeout(()=>{var r;(r=this.$refs.slider)==null||r.scrollTo({behavior:"smooth",left:i})},50)}):this.$nextTick(()=>{var l;(l=this.$refs.slider)==null||l.scrollTo({left:0}),setTimeout(()=>{var r;(r=this.$refs.slider)==null||r.scrollTo({behavior:"smooth",left:i})},50)})}},isCardActive(e){return this.isInfinite?e>=this.getCardsToShow()&&e<this.getCardsToShow()*2:e>=this.currentPage-1*this.getCardsToShow()&&e<this.currentPage*this.getCardsToShow()},modifyCards(){if(this.isInfinite){const t=[...(()=>{let r=0,s=0;return this.currentPage<2?(r=(this.localDots.length-1)*this.getCardsToShow(),s=this.localDots.length*this.getCardsToShow()):(r=(this.currentPage-2)*this.getCardsToShow(),s=(this.currentPage-1)*this.getCardsToShow()),[...b(r,s-1)].map(a=>a<0?this.list.length+a:a>=this.list.length?a-this.list.length:a)})()].map(r=>this.list[r]),i=[...(()=>{let r=0,s=0;return this.currentPage===this.localDots.length?(r=0,s=this.getCardsToShow()):(r=this.currentPage*this.getCardsToShow(),s=(this.currentPage+1)*this.getCardsToShow()),[...b(r,s-1)].map(a=>a<0?this.list.length+a:a>=this.list.length?a-this.list.length:a)})()].map(r=>this.list[r]),l=[...this.list].filter((r,s)=>s>=(this.currentPage-1)*this.getCardsToShow()&&s<this.currentPage*this.getCardsToShow());return this.cardsDisplay=[...t,...l,...i]}return this.cardsDisplay=[...this.list]},setSliderStyles(){var n,i;const e=this.getCardsToShow(),t=(i=(n=this.carouselWrapper)==null?void 0:n.getBoundingClientRect())==null?void 0:i.width;t&&(this.sliderStyle=[`grid-auto-columns: calc((100% - ${(e-1)*16}px) / ${e})`],this.cardWidth=(t-(e-1)*16)/e)}},watch:{autoplay:{handler(e){this.autoplayInterval&&(clearInterval(this.autoplayInterval),this.autoplayInterval=null),e&&this.speed&&this.isInfinite&&this.$nextTick(()=>{this.autoplayInterval=setInterval(()=>{this.handleNav(1)},this.speed)})},immediate:!0},cardsToShow(){this.handleInitCards()},list:{deep:!0,handler(){this.handleInitCards()}},responsive:{deep:!0,handler(e){e?this.localResponsives=[...J(e)]:this.localResponsives=[]},immediate:!0}},mounted(){this.isMounted=!0,window.innerWidth<=600&&(this.isSmallScreen=!0),this.$refs["carousel-wrapper"]&&(this.carouselWrapper=this.$refs["carousel-wrapper"]),this.$nextTick(()=>{this.handleInitCards()}),window.addEventListener("resize",this.handleResize)},unmounted(){this.isMounted=!1,window.removeEventListener("resize",this.handleResize)}});const K={class:"slider-wrapper"},Q={key:0,class:"dots-wrapper"},Y=["onClick"],Z={key:1,class:"carousel-loader"};function x(e,t,n,i,l,r){return o(),d("div",j({class:"carousel-wrapper",ref:"carousel-wrapper"},{...e.$attrs}),[e.isMounted?(o(),d(w,{key:0},[v("div",K,[!e.isSmallScreen&&e.arrow?(o(),y(S(e.iconAngleLeft),{key:0,class:u(["nav",{"sb-hidden":!e.isInfinite&&e.currentPage<2}]),onClick:t[0]||(t[0]=s=>e.handleNav(-1))},null,8,["class"])):c("",!0),!e.isSmallScreen&&e.arrow?(o(),y(S(e.iconAngleRight),{key:1,class:u(["nav",{"sb-hidden":!e.isInfinite&&e.currentPage===e.localDots.length}]),onClick:t[1]||(t[1]=s=>e.handleNav(1))},null,8,["class"])):c("",!0),v("div",{draggable:"true",class:u(["slider",{grabbing:e.isDrag}]),ref:"slider",style:M(e.sliderStyle),onMousedown:t[2]||(t[2]=s=>e.handleDragStart(s)),onMousemove:t[3]||(t[3]=s=>e.handleDrag(s)),onMouseup:t[4]||(t[4]=s=>e.handleDragEnd(s)),onTouchstart:t[5]||(t[5]=s=>e.handleDragStart(s)),onTouchmove:t[6]||(t[6]=s=>e.handleDrag(s)),onTouchend:t[7]||(t[7]=s=>e.handleDragEnd(s))},[e.list?(o(!0),d(w,{key:0},T(e.cardsDisplay,(s,h)=>(o(),d("div",{class:u(["card",{active:e.isCardActive(h)}]),key:`card-${h}`},[L(e.$slots,"card",F(O({data:s})),()=>[V(X(s),1)])],2))),128)):c("",!0)],38)]),e.isDotsEnabled?(o(),d("div",Q,[(o(!0),d(w,null,T(e.localDots,(s,h)=>(o(),d("div",{class:u(["button",{active:e.currentPage-1===h}]),key:s,onClick:a=>e.handleDot(h+1)},null,10,Y))),128))])):c("",!0)],64)):(o(),d("div",Z))],16)}const _=U(E,[["render",x]]);E.__docgenInfo={displayName:"sb-carousel",exportName:"default",description:"",tags:{},props:[{name:"arrow",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"autoplay",type:{name:"boolean"},required:!1},{name:"cardsToShow",type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"dots",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"infinite",type:{name:"boolean"},required:!1},{name:"list",type:{name:"any[]"},required:!0},{name:"responsive",type:{name:"IResponsive[]"},required:!1},{name:"speed",type:{name:"number"},defaultValue:{func:!1,value:"3000"}}],slots:[{name:"card",scoped:!0,bindings:[{name:"data",title:"binding"}]}],sourceFiles:["/Users/edgar/Documents/private-projects/vue-base-lib/src/components/carousel/carousel.vue"]};const re={title:"Components/Carousel",component:_,tags:["autodocs"],argTypes:{arrow:{control:"boolean",description:"Whether Hide/Show Carousel Arrow"},autoplay:{control:"boolean",description:"Carousel auto slide or net"},cardsToShow:{control:"number",description:"Total Cards to Show for each slide"},dots:{control:"boolean",description:"Whether Hide/Show Carousel Dots Navigation"},infinite:{control:"boolean",description:"Infnite slides"},list:{control:"object",description:"Cards list"},responsive:{control:"object",description:"Configurations for each breakpoint. Breakpoint in pixels"},speed:{control:"number",description:"Autoplay speed in ms"}},args:{list:[1,2,3,4]},parameters:{docs:{sort:"requiredFirst"},slots:{card:{description:"Card render template",template:`
                    <template #card="{ data }">
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <h3>{{ data }}</h3>
                        </div>
                    </template>
                `}}}},p={args:{}},f={args:{infinite:!0}},g={args:{autoplay:!0,infinite:!0}},m={args:{list:[1,2,3,4,5,6],responsive:[{breakpoint:450,settings:{cardsToShow:1,dots:!1,infinite:!0}},{breakpoint:1024,settings:{cardsToShow:2,dots:!0,infinite:!1}},{breakpoint:1400,settings:{cardsToShow:3,dots:!0,infinite:!1}}]}};var D,C,k;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {}
}`,...(k=(C=p.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var I,P,$;f.parameters={...f.parameters,docs:{...(I=f.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    infinite: true
  }
}`,...($=(P=f.parameters)==null?void 0:P.docs)==null?void 0:$.source}}};var R,W,B;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    autoplay: true,
    infinite: true
  }
}`,...(B=(W=g.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var A,N,q;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    list: [1, 2, 3, 4, 5, 6],
    responsive: [{
      breakpoint: 450,
      settings: {
        cardsToShow: 1,
        dots: false,
        infinite: true
      }
    }, {
      breakpoint: 1024,
      settings: {
        cardsToShow: 2,
        dots: true,
        infinite: false
      }
    }, {
      breakpoint: 1400,
      settings: {
        cardsToShow: 3,
        dots: true,
        infinite: false
      }
    }]
  }
}`,...(q=(N=m.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};const ie=["Default","Infinite","AutoPlay","Responsive"];export{g as AutoPlay,p as Default,f as Infinite,m as Responsive,ie as __namedExportsOrder,re as default};