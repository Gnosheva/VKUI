!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r(require("prop-types"),require("react"),require("svg-baker-runtime/browser-symbol"),require("svg-sprite-loader/runtime/browser-sprite.build"));else if("function"==typeof define&&define.amd)define(["prop-types","react","svg-baker-runtime/browser-symbol","svg-sprite-loader/runtime/browser-sprite.build"],r);else{var t="object"==typeof exports?r(require("prop-types"),require("react"),require("svg-baker-runtime/browser-symbol"),require("svg-sprite-loader/runtime/browser-sprite.build")):r(e["prop-types"],e.react,e["svg-baker-runtime/browser-symbol"],e["svg-sprite-loader/runtime/browser-sprite.build"]);for(var o in t)("object"==typeof exports?exports:e)[o]=t[o]}}(this,function(e,r,t,o){return function(e){function r(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,r),i.l=!0,i.exports}var t={};return r.m=e,r.c=t,r.i=function(e){return e},r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=93)}({0:function(r,t){r.exports=e},1:function(e,t){e.exports=r},2:function(e,r){e.exports=t},3:function(e,r){e.exports=o},93:function(e,r,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){var r="Icon Icon--"+y+" Icon--"+d.id+" "+(e.className||"");return p.default.createElement("div",{className:r,style:n({width:b+"px",height:v+"px"},e.style),onClick:e.onClick},p.default.createElement("svg",{viewBox:d.viewBox,width:b,height:v,style:{display:"block"}},p.default.createElement("use",{xlinkHref:"#"+d.id,style:{fill:"currentColor",color:e.fill}})))}Object.defineProperty(r,"__esModule",{value:!0});var n=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},s=t(2),u=o(s),l=t(3),a=o(l),c=t(1),p=o(c),f=t(0),d=(o(f),new u.default({id:"notification_24",use:"notification_24-usage",viewBox:"0 0 24 24",content:'<symbol viewBox="0 0 24 24" id="notification_24"><path d="M12.0014289,22.5 C10.3087205,22.5 9.00142888,21.625 9.00142888,20 L15.0014289,20 C15.0014289,21.625 13.6941373,22.5 12.0014289,22.5 Z M17.9953857,14.709647 C17.9953857,16.4239328 20.1428571,16.8525042 20.1428571,17.709647 C20.1428571,18.5667899 19.7142857,18.9953613 18,18.9953613 L6,18.9953613 C4.28571429,18.9953613 3.85714286,18.5667899 3.85714286,17.709647 C3.85714286,16.8525042 6,16.4239328 6,14.709647 L6,11.709647 C6,7.42393276 7.71428571,3.85714286 11.1428571,3.85714286 C11.1428571,3.21428571 11.5714286,3 12,3 C12.4285714,3 12.8571429,3.21428571 12.8571429,3.85714286 C16.2857143,3.85714286 17.9953857,7.42393276 17.9953857,11.709647 L17.9953857,14.709647 Z" /></symbol>'})),b=(a.default.add(d),d.viewBox.split(" ")[2]),v=d.viewBox.split(" ")[3],y=Math.max(b,v);i.displayName="icon-"+d.id,r.default=i}})});