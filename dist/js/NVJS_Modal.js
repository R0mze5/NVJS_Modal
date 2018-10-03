"use strict";function NVJSModal(o,...t){const e=this;let n,l,c,a,i,s,d=!0,r=!1,u=!0,h=[],m=[],f=!1,y="open",p=".modal__container",b=".modal__close";function v(){l&&(e.buttons=function o(t){let e=[];if("object"==typeof t)return t.map(t=>{o(t).forEach(o=>e.push(o))}),e;if("string"==typeof t)return Array.prototype.slice.call(document.querySelectorAll(t),0)}(l)),i&&h.push(i),e.modal.querySelector(a)?(c=e.modal.querySelector(a),m.push(c),h.push(e.modal)):Array.prototype.slice.call(document.querySelectorAll(a),0).some(o=>o==e.modal)&&(m.push(e.modal),h.push(document.body)),function(){m.forEach(o=>o.addEventListener("click",o=>{o.cancelBubble=!0})),h&&(e.modal.addEventListener("show",()=>{h.forEach(o=>o.addEventListener("click",w))}),e.modal.addEventListener("hide",()=>{h.forEach(o=>o.removeEventListener("click",w))}));e.buttons&&e.buttons.forEach(o=>{o.addEventListener("click",o=>{f||o.stopPropagation(),o.preventDefault(),e.show()})})}()}function E(){S.call(e.modal,"add",y),g.call(e.body,"lock"),e.modal.dispatchEvent(new Event("show")),k()}function w(){g.call(e.body,"unlock"),S.call(e.modal,"remove",y),e.modal.dispatchEvent(new Event("hide")),k()}function g(o){u&&("lock"==o?(n=document.body.style.overflow,document.body.style.overflow="hidden"):"unlock"==o&&(document.body.style.overflow=n,n=void 0))}function S(o,t){("add"==o&&!this.classList.contains(t)||"remove"==o&&this.classList.contains(t))&&this.classList[o](t)}function k(){f=!f}function q(o){if(r)throw new Error(o)}this.toggle=(()=>{f?w():E()}),this.hide=function(){f&&w()},this.show=function(){f||E()},this.initialize=function(){v()},function(){switch(typeof o){case"string":if(document.body.querySelectorAll(o)){let n=document.body.querySelectorAll(o);1==n.length?1==t.length&&t[0]instanceof Object?function(o){document.querySelector(this)&&(e.modal=document.querySelector(this)),o&&(l=o.callButtons,a=o.modalBody?o.modalBody:p,s=o.modalCloseButton?o.modalCloseButton:b,i=e.modal.querySelector(s),y=o.modalShowClass?o.modalShowClass:y,r=o.logErrors?o.logErrors:r,u=null!=o.lockBody?o.lockBody:u,d=o.autoInitialize?o.autoInitialize:d,l=o.modalShowButtons),d&&v()}.call(o,t[0]):q("configuration is not object"):n.length}else q(`${o} not found on this page`);break;case"object":Array;break;case"undefined":q("no data to configurate modal")}}()}