import{d as x,M as c}from"./index-1160709c.js";import{u as p}from"./index-483e8c62.js";import"./iframe-12d21f9f.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-23102255.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./index-11d98b33.js";import"./index-9f5e787b.js";import"./index-356e4a49.js";var m={exports:{}},o={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g=x,b=Symbol.for("react.element"),f=Symbol.for("react.fragment"),u=Object.prototype.hasOwnProperty,j=g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function h(i,t,a){var r,n={},s=null,d=null;a!==void 0&&(s=""+a),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(d=t.ref);for(r in t)u.call(t,r)&&!v.hasOwnProperty(r)&&(n[r]=t[r]);if(i&&i.defaultProps)for(r in t=i.defaultProps,t)n[r]===void 0&&(n[r]=t[r]);return{$$typeof:b,type:i,key:s,ref:d,props:n,_owner:j.current}}o.Fragment=f;o.jsx=h;o.jsxs=h;m.exports=o;var e=m.exports;function l(i){const t=Object.assign({h1:"h1",p:"p"},p(),i.components);return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Home"}),`
`,e.jsx("div",{className:"sb-container",children:e.jsxs("div",{className:"sb-section-title",children:[e.jsx(t.h1,{id:"vue-sb-components",children:"Vue SB Components"}),e.jsx("p",{children:"This library created using:"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("a",{href:"https://vuejs.org/guide/introduction.html",target:"_blank",children:"Vue 3"})}),e.jsx("li",{children:e.jsx("a",{href:"https://vitejs.dev/",target:"_blank",children:"Vite"})}),e.jsx("li",{children:e.jsx("a",{href:"https://day.js.org/",target:"_blank",children:"Day.js"})}),e.jsx("li",{children:e.jsx("a",{href:"https://beholdr.github.io/maska/#/",target:"_blank",children:"Maska"})}),e.jsx("li",{children:e.jsx("a",{href:"https://mozilla.github.io/pdf.js/",target:"_blank",children:"PDF.js"})}),e.jsx("li",{children:e.jsx("a",{href:"https://github.com/bubkoo/html-to-image/",target:"_blank",children:"html-to-image"})}),e.jsx("li",{children:e.jsx("a",{href:"https://editorjs.io/",target:"_blank",children:"Editor.js"})})]}),e.jsx("div",{children:e.jsxs(t.p,{children:["This library use ",e.jsx("a",{href:"https://fonts.google.com/specimen/Poppins",target:"_blank",children:"Google Poppins"})," font-family. But you can change the font-family to whatever you want. And this library will set font-size to 13px at HTML level."]})}),e.jsx("div",{children:e.jsxs(t.p,{children:["For developers, I strongly recommend ",e.jsx("a",{href:"https://pinia.vuejs.org/",target:"_blank",children:"Pinia"})," for state management for the best experience."]})})]})}),`
`,e.jsx("style",{children:`
  .sb-container {
    margin-bottom: 48px;
  }

.sb-section {
width: 100%;
display: flex;
flex-direction: row;
gap: 20px;
}

img {
object-fit: cover;
}

.sb-section-title {
margin-bottom: 32px;
}

.sb-section a:not(h1 a, h2 a, h3 a) {
font-size: 14px;
}

.sb-section-item, .sb-grid-item {
flex: 1;
display: flex;
flex-direction: column;
}

.sb-section-item-heading {
padding-top: 20px !important;
padding-bottom: 5px !important;
margin: 0 !important;
}
.sb-section-item-paragraph {
margin: 0;
padding-bottom: 10px;
}

.sb-chevron {
margin-left: 5px;
}

.sb-features-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-gap: 32px 20px;
}

.sb-socials {
display: grid;
grid-template-columns: repeat(4, 1fr);
}

.sb-socials p {
margin-bottom: 10px;
}

.sb-explore-image {
max-height: 32px;
align-self: flex-start;
}

.sb-addon {
width: 100%;
display: flex;
align-items: center;
position: relative;
background-color: #EEF3F8;
border-radius: 5px;
border: 1px solid rgba(0, 0, 0, 0.05);
background: #EEF3F8;
height: 180px;
margin-bottom: 48px;
overflow: hidden;
}

.sb-addon-text {
padding-left: 48px;
max-width: 240px;
}

.sb-addon-text h4 {
padding-top: 0px;
}

.sb-addon-img {
position: absolute;
left: 345px;
top: 0;
height: 100%;
width: 200%;
overflow: hidden;
}

.sb-addon-img img {
width: 650px;
transform: rotate(-15deg);
margin-left: 40px;
margin-top: -72px;
box-shadow: 0 0 1px rgba(255, 255, 255, 0);
backface-visibility: hidden;
}

@media screen and (max-width: 800px) {
.sb-addon-img {
left: 300px;
}
}

@media screen and (max-width: 600px) {
.sb-section {
flex-direction: column;
}

    .sb-features-grid {
      grid-template-columns: repeat(1, 1fr);
    }

    .sb-socials {
      grid-template-columns: repeat(2, 1fr);
    }

    .sb-addon {
      height: 280px;
      align-items: flex-start;
      padding-top: 32px;
      overflow: hidden;
    }

    .sb-addon-text {
      padding-left: 24px;
    }

    .sb-addon-img {
      right: 0;
      left: 0;
      top: 130px;
      bottom: 0;
      overflow: hidden;
      height: auto;
      width: 124%;
    }

    .sb-addon-img img {
      width: 1200px;
      transform: rotate(-12deg);
      margin-left: 0;
      margin-top: 48px;
      margin-bottom: -40px;
      margin-left: -24px;
    }

}
`})]})}function R(i={}){const{wrapper:t}=Object.assign({},p(),i.components);return t?e.jsx(t,Object.assign({},i,{children:e.jsx(l,i)})):l(i)}export{R as default};
