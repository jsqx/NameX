/*!
 * Copyright (c) 2021 Momo Bassit.
 * Licensed under the MIT License (MIT)
 * https://github.com/mdbassit/Coloris
 */
!function(d,p,s){var h,f,v,c,u,y,i,b,l,g,m,w,k,x,a=p.createElement("canvas").getContext("2d"),E={r:0,g:0,b:0,h:0,s:0,v:0,a:1},L={el:"[data-coloris]",parent:null,theme:"default",themeMode:"light",wrap:!0,margin:2,format:"hex",formatToggle:!1,swatches:[],swatchesOnly:!1,alpha:!0,focusInput:!0,autoClose:!1,clearButton:{show:!1,label:"Clear"},a11y:{open:"Open color picker",close:"Close color picker",marker:"Saturation: {s}. Brightness: {v}.",hueSlider:"Hue slider",alphaSlider:"Opacity slider",input:"Color value field",format:"Color format",swatch:"Color swatch",instruction:"Saturation and brightness selector. Use up, down, left and right arrow keys to select."}};function o(e){if("object"==typeof e)for(var t in e)switch(t){case"el":S(e.el),!1!==e.wrap&&T(e.el);break;case"parent":L.parent=p.querySelector(e.parent),L.parent&&L.parent.appendChild(h);break;case"themeMode":L.themeMode=e.themeMode,"auto"===e.themeMode&&d.matchMedia&&d.matchMedia("(prefers-color-scheme: dark)").matches&&(L.themeMode="dark");case"theme":e.theme&&(L.theme=e.theme),h.className="clr-picker clr-"+L.theme+" clr-"+L.themeMode;break;case"margin":e.margin*=1,L.margin=(isNaN(e.margin)?L:e).margin;break;case"wrap":e.el&&e.wrap&&T(e.el);break;case"formatToggle":N("clr-format").style.display=e.formatToggle?"block":"none",e.formatToggle&&(L.format="auto");break;case"swatches":Array.isArray(e.swatches)&&function(){var a=[];e.swatches.forEach(function(e,t){a.push('<button id="clr-swatch-'+t+'" aria-labelledby="clr-swatch-label clr-swatch-'+t+'" style="color: '+e+';">'+e+"</button>")}),a.length&&(N("clr-swatches").innerHTML="<div>"+a.join("")+"</div>")}();break;case"swatchesOnly":L.swatchesOnly=!!e.swatchesOnly,h.setAttribute("data-minimal",L.swatchesOnly),L.swatchesOnly&&(L.autoClose=!0);break;case"alpha":L.alpha=!!e.alpha,h.setAttribute("data-alpha",L.alpha);break;case"clearButton":var a="none";e.clearButton.show&&(a="block"),e.clearButton.label&&(i.innerHTML=e.clearButton.label),i.style.display=a;break;case"a11y":var l,r=e.a11y,o=!1;if("object"==typeof r)for(var n in r)r[n]&&L.a11y[n]&&(L.a11y[n]=r[n],o=!0);o&&(l=N("clr-open-label"),a=N("clr-swatch-label"),l.innerHTML=L.a11y.open,a.innerHTML=L.a11y.swatch,u.setAttribute("aria-label",L.a11y.close),b.setAttribute("aria-label",L.a11y.hueSlider),g.setAttribute("aria-label",L.a11y.alphaSlider),y.setAttribute("aria-label",L.a11y.input),f.setAttribute("aria-label",L.a11y.instruction));default:L[t]=e[t]}}function S(e){O(p,"click",e,function(e){var t=L.parent,a=e.target.getBoundingClientRect(),l=d.scrollY,r={left:!1,top:!1},o={x:0,y:0},n=a.x,i=l+a.y+a.height+L.margin;w=e.target,x=w.value,k=function(e){e=e.substring(0,3).toLowerCase();return"rgb"!==e&&"hsl"!==e?"hex":e}(x),h.classList.add("clr-open");var c,s=h.offsetWidth,u=h.offsetHeight;t?(c=d.getComputedStyle(t),e=parseFloat(c.marginTop),c=parseFloat(c.borderTopWidth),(o=t.getBoundingClientRect()).y+=c+l,n-=o.x,i-=o.y,n+s>t.clientWidth&&(n+=a.width-s,r.left=!0),i+u>t.clientHeight-e&&(i-=a.height+u+2*L.margin,r.top=!0),i+=t.scrollTop):(n+s>p.documentElement.clientWidth&&(n+=a.width-s,r.left=!0),i+u-l>p.documentElement.clientHeight&&(i=l+a.y-u-L.margin,r.top=!0)),h.classList.toggle("clr-left",r.left),h.classList.toggle("clr-top",r.top),h.style.left=n+"px",h.style.top=i+"px",v={width:f.offsetWidth,height:f.offsetHeight,x:h.offsetLeft+f.offsetLeft+o.x,y:h.offsetTop+f.offsetTop+o.y},A(x),L.focusInput&&y.focus({preventScroll:!0})}),O(p,"input",e,function(e){var t=e.target.parentNode;t.classList.contains("clr-field")&&(t.style.color=e.target.value)})}function T(e){p.querySelectorAll(e).forEach(function(e){var t,a=e.parentNode;a.classList.contains("clr-field")||((t=p.createElement("div")).innerHTML='<button aria-labelledby="clr-open-label"></button>',a.insertBefore(t,e),t.setAttribute("class","clr-field"),t.style.color=e.value,t.appendChild(e))})}function n(e){w&&(e&&x!==w.value&&(w.value=x,w.dispatchEvent(new Event("input",{bubbles:!0}))),x!==w.value&&w.dispatchEvent(new Event("change",{bubbles:!0})),h.classList.remove("clr-open"),L.focusInput&&w.focus({preventScroll:!0}),w=null)}function A(e){var t=function(e){a.fillStyle="#000",a.fillStyle=e,e=(e=/^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i.exec(a.fillStyle))?{r:+e[3],g:+e[4],b:+e[5],a:+e[6]}:(e=a.fillStyle.replace("#","").match(/.{2}/g).map(function(e){return parseInt(e,16)}),{r:e[0],g:e[1],b:e[2],a:1});return e}(e),e=function(e){var t=e.r/255,a=e.g/255,l=e.b/255,r=s.max(t,a,l),o=s.min(t,a,l),n=r-o,i=r,c=0,o=0;n&&(r===t&&(c=(a-l)/n),r===a&&(c=2+(l-t)/n),r===l&&(c=4+(t-a)/n),r&&(o=n/r));return{h:(c=s.floor(60*c))<0?c+360:c,s:s.round(100*o),v:s.round(100*i),a:e.a}}(t);M(e.s,e.v),H(t,e),b.value=e.h,h.style.color="hsl("+e.h+", 100%, 50%)",l.style.left=e.h/360*100+"%",c.style.left=v.width*e.s/100+"px",c.style.top=v.height-v.height*e.v/100+"px",g.value=100*e.a,m.style.left=100*e.a+"%"}function r(e){w&&(w.value=void 0!==e?e:y.value,w.dispatchEvent(new Event("input",{bubbles:!0})))}function C(e,t){e={h:+b.value,s:e/v.width*100,v:100-t/v.height*100,a:g.value/100},t=function(e){var t=e.s/100,a=e.v/100,l=t*a,r=e.h/60,o=l*(1-s.abs(r%2-1)),n=a-l;l+=n,o+=n;t=s.floor(r)%6,a=[l,o,n,n,o,l][t],r=[o,l,l,o,n,n][t],t=[n,n,o,l,l,o][t];return{r:s.round(255*a),g:s.round(255*r),b:s.round(255*t),a:e.a}}(e);M(e.s,e.v),H(t,e),r()}function M(e,t){var a=L.a11y.marker;e=+e.toFixed(1),t=+t.toFixed(1),a=(a=a.replace("{s}",e)).replace("{v}",t),c.setAttribute("aria-label",a)}function t(e){var t={pageX:((a=e).changedTouches?a.changedTouches[0]:a).pageX,pageY:(a.changedTouches?a.changedTouches[0]:a).pageY},a=t.pageX-v.x,t=t.pageY-v.y;L.parent&&(t+=L.parent.scrollTop),a=a<0?0:a>v.width?v.width:a,t=t<0?0:t>v.height?v.height:t,c.style.left=a+"px",c.style.top=t+"px",C(a,t),e.preventDefault(),e.stopPropagation()}function H(e,t){void 0===t&&(t={});var a,l,r=L.format;for(a in e=void 0===e?{}:e)E[a]=e[a];for(l in t)E[l]=t[l];var o,n=function(e){var t=e.r.toString(16),a=e.g.toString(16),l=e.b.toString(16),r="";e.r<16&&(t="0"+t);e.g<16&&(a="0"+a);e.b<16&&(l="0"+l);L.alpha&&e.a<1&&(e=255*e.a|0,r=e.toString(16),e<16&&(r="0"+r));return"#"+t+a+l+r}(E),i=n.substring(0,7);switch(c.style.color=i,m.parentNode.style.color=i,m.style.color=n,u.style.color=n,f.style.display="none",f.offsetHeight,f.style.display="",m.nextElementSibling.style.display="none",m.nextElementSibling.offsetHeight,m.nextElementSibling.style.display="","mixed"===r?r=1===E.a?"hex":"rgb":"auto"===r&&(r=k),r){case"hex":y.value=n;break;case"rgb":y.value=(o=E,L.alpha&&1!==o.a?"rgba("+o.r+", "+o.g+", "+o.b+", "+o.a+")":"rgb("+o.r+", "+o.g+", "+o.b+")");break;case"hsl":y.value=(o=function(e){var t,a=e.v/100,l=a*(1-e.s/100/2);0<l&&l<1&&(t=s.round((a-l)/s.min(l,1-l)*100));return{h:e.h,s:t||0,l:s.round(100*l),a:e.a}}(E),L.alpha&&1!==o.a?"hsla("+o.h+", "+o.s+"%, "+o.l+"%, "+o.a+")":"hsl("+o.h+", "+o.s+"%, "+o.l+"%)")}p.querySelector('.clr-format [value="'+r+'"]').checked=!0}function e(){var e=+b.value,t=+c.style.left.replace("px",""),a=+c.style.top.replace("px","");h.style.color="hsl("+e+", 100%, 50%)",l.style.left=e/360*100+"%",C(t,a)}function B(){var e=g.value/100;m.style.left=100*e+"%",H({a:e}),r()}function N(e){return p.getElementById(e)}function O(e,t,a,l){var r=Element.prototype.matches||Element.prototype.msMatchesSelector;"string"==typeof a?e.addEventListener(t,function(e){r.call(e.target,a)&&l.call(e.target,e)}):(l=a,e.addEventListener(t,l))}function D(e,t){t=void 0!==t?t:[],"loading"!==p.readyState?e.apply(void 0,t):p.addEventListener("DOMContentLoaded",function(){e.apply(void 0,t)})}void 0!==NodeList&&NodeList.prototype&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),d.Coloris=function(){var r={set:o,wrap:T,close:n};function e(e){D(function(){e&&("string"==typeof e?S:o)(e)})}for(var t in r)!function(l){e[l]=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];D(r[l],t)}}(t);return e}(),D(function(){(h=p.createElement("div")).setAttribute("id","clr-picker"),h.className="clr-picker",h.innerHTML='<input id="clr-color-value" class="clr-color" type="text" value="" aria-label="'+L.a11y.input+'"><div id="clr-color-area" class="clr-gradient" role="application" aria-label="'+L.a11y.instruction+'"><div id="clr-color-marker" class="clr-marker" tabindex="0"></div></div><div class="clr-hue"><input id="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="'+L.a11y.hueSlider+'"><div id="clr-hue-marker"></div></div><div class="clr-alpha"><input id="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="'+L.a11y.alphaSlider+'"><div id="clr-alpha-marker"></div><span></span></div><div id="clr-format" class="clr-format"><fieldset class="clr-segmented"><legend>'+L.a11y.format+'</legend><input id="clr-f1" type="radio" name="clr-format" value="hex"><label for="clr-f1">Hex</label><input id="clr-f2" type="radio" name="clr-format" value="rgb"><label for="clr-f2">RGB</label><input id="clr-f3" type="radio" name="clr-format" value="hsl"><label for="clr-f3">HSL</label><span></span></fieldset></div><div id="clr-swatches" class="clr-swatches"></div><button id="clr-clear" class="clr-clear">'+L.clearButton.label+'</button><button id="clr-color-preview" class="clr-preview" aria-label="'+L.a11y.close+'"></button><span id="clr-open-label" hidden>'+L.a11y.open+'</span><span id="clr-swatch-label" hidden>'+L.a11y.swatch+"</span>",p.body.appendChild(h),f=N("clr-color-area"),c=N("clr-color-marker"),i=N("clr-clear"),u=N("clr-color-preview"),y=N("clr-color-value"),b=N("clr-hue-slider"),l=N("clr-hue-marker"),g=N("clr-alpha-slider"),m=N("clr-alpha-marker"),S(L.el),T(L.el),O(h,"mousedown",function(e){h.classList.remove("clr-keyboard-nav"),e.stopPropagation()}),O(f,"mousedown",function(e){O(p,"mousemove",t)}),O(f,"touchstart",function(e){p.addEventListener("touchmove",t,{passive:!1})}),O(c,"mousedown",function(e){O(p,"mousemove",t)}),O(c,"touchstart",function(e){p.addEventListener("touchmove",t,{passive:!1})}),O(y,"change",function(e){A(y.value),r()}),O(i,"click",function(e){r(""),n()}),O(u,"click",function(e){r(),n()}),O(p,"click",".clr-format input",function(e){k=e.target.value,H(),r()}),O(h,"click",".clr-swatches button",function(e){A(e.target.textContent),r(),L.autoClose&&n()}),O(p,"mouseup",function(e){p.removeEventListener("mousemove",t)}),O(p,"touchend",function(e){p.removeEventListener("touchmove",t)}),O(p,"mousedown",function(e){h.classList.remove("clr-keyboard-nav"),n()}),O(p,"keydown",function(e){"Escape"===e.key?n(!0):"Tab"===e.key&&h.classList.add("clr-keyboard-nav")}),O(p,"click",".clr-field button",function(e){e.target.nextElementSibling.dispatchEvent(new Event("click",{bubbles:!0}))}),O(c,"keydown",function(e){var t={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};-1!==Object.keys(t).indexOf(e.key)&&(!function(e,t){e=+c.style.left.replace("px","")+e,t=+c.style.top.replace("px","")+t,c.style.left=e+"px",c.style.top=t+"px",C(e,t)}.apply(void 0,t[e.key]),e.preventDefault())}),O(f,"click",t),O(b,"input",e),O(g,"input",B)})}(window,document,Math);