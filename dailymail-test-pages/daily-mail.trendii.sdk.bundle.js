if(typeof trendii==="undefined"){trendii={}}else{if(typeof trendii!="object"){throw new Error("trendii already exists and is not an object.")}}trendii.i=".mol-img-group";trendii.t="figure";trendii.o="imageCaption";trendii.l="figcaption";trendii.u="trendiiSliderUniqueString";trendii.p=window.top;trendii.m=trendii.p.document;trendii.D=[];trendii.I;trendii.h=[];trendii._=0;trendii.g=null;trendii.k=null;trendii.A="https://rahul-tatva.github.io";trendii.init=function(){trendii.console.log("SDK init method called");trendii.P.T=2;trendii.V();trendii.M(`${trendii.P.L}/styles/daily-mail/trendii-sdk-daily-mail-slider.css`);trendii.M(`${trendii.P.L}/styles/daily-mail/trendii-sdk-daily-mail-all-product.css`);if(trendii.m.readyState==="complete"||trendii.m.readyState==="interactive"){trendii.console.log(trendii.m.readyState);trendii.O()}else{trendii.console.log("DOM in progress");trendii.m.addEventListener("DOMContentLoaded",()=>{trendii.console.log(trendii.m.readyState);trendii.O()})}};trendii.$="production";trendii.P={S:"",T:0,N:480,L:"https://cdn.trendii.com/native-ads-sdk",v:`https://beeswaxcreatives.trendii.com/img-creatives`,C:"trendii-sdk-ad-products-container",R:"retailer-logo",H:"trendii-native-ad-wrapper",j:"trendii-sdk-ad-products-container",U:"trendii-products-container-728X90"};trendii.P.W=`${trendii.P.L}/templates/products-slider-dynamic.html`;trendii.P.B=`${trendii.P.L}/templates/products-728X90-all-product-dynamic.html`;trendii.console=function(){return{log:function(){if(trendii.$==="test"){let i=Array.prototype.slice.call(arguments);i.unshift("[Trendii.SDK] ==>");console.log.apply(console,i)}},error:function(){let i=Array.prototype.slice.call(arguments);i.unshift("[Trendii.SDK] ==>");console.error.apply(console,i)}}}();trendii.K=function(i){return`${trendii.P.L}/images/retailers-logo/${i}`};trendii.G=function(i,t,e,n,r,d){const o=trendii.m.createElement(i);o.classList.add(t);if(e){o.innerHTML=e}if(n){o.style=n}if(r){o.href=r}if(d){o.target=d}return o};trendii.X=function(i){trendii.P.S=i};trendii.q=function(i){trendii.m.head.appendChild(trendii.m.createElement("script")).src=i};trendii.M=function(i){let t=trendii.m.createElement("link");t.type="text/css";t.rel="stylesheet";t.href=i;trendii.m.head.appendChild(t)};trendii.V=function(){if(trendii.$==="test"){trendii.q(`${trendii.P.L}/scripts/common/intersection-observer.js`);trendii.q(`${trendii.P.L}/scripts/common/splide.js`)}else{trendii.q(`${trendii.P.L}/scripts/common/intersection-observer.min.js`);trendii.q(`${trendii.P.L}/scripts/common/splide.min.js`)}trendii.M(`${trendii.P.L}/styles/common/splide-core.min.css`)};trendii.O=function(){try{Promise.all([fetch(trendii.P.W).then(i=>i.text()),fetch(trendii.P.B).then(i=>i.text())]).then(i=>{trendii.k=i[0];trendii.g=i[1];const t={rootMargin:"0px",threshold:.1};if(trendii.p.J){trendii.I=new trendii.p.J(trendii.F,t)}else{trendii.I=new IntersectionObserver(trendii.F,t)}let e;if(trendii.p.innerWidth<=trendii.P.N){e=Array.from(trendii.m.querySelectorAll(trendii.t))}else{e=Array.from(trendii.m.querySelectorAll(trendii.i))}e.forEach(i=>{trendii.I.observe(i)})})}catch(i){trendii.console.error(i)}};trendii.F=function(i,t){try{i.forEach(i=>{trendii.Y(i,t)})}catch(i){trendii.console.error(i)}};trendii.Y=function(i,t){try{if(i.isIntersecting){const D=i.target;t.unobserve(i.target);trendii.console.log("observer unregistered for ",D);const I=Array.from(D.getElementsByTagName("img"));const e=I.map(i=>{if(i.getAttribute("data-src"))return i.getAttribute("data-src");return i.getAttribute("src")}).filter(i=>i);const n={Z:trendii.p.location.href,ii:e,ti:trendii.P.T};const r=new Headers;r.append("Content-Type","application/json");const d=JSON.stringify(n);const o={method:"POST",headers:r,body:d};fetch(trendii.P.v,o).then(i=>i.json()).then(i=>{if(i!==""){if(i.ei&&i.ei===true){const c=i;let t=null,e=null,n=null,r,d,o;const s=I.length;for(let i=0;i<s;i++){r=I[i];d=r.src;o=r.getAttribute("data-src");n=c.ni.findIndex(i=>i.ri===d||o);t=c.ni[n];if(t.di&&t.di.length>0){e=r;break}}if(t.di&&t.di.length>0){trendii.oi(t,trendii._);trendii._++;if(t.ci){if(trendii.p.innerWidth<=trendii.P.N){const u=D.getElementsByTagName(trendii.l)[0];if(u){u.after(t.ci)}else{D.appendChild(t.ci)}}else{D.getElementsByClassName(trendii.o)[0].after(t.ci);t.si=true;trendii.console.log("ad rendered for ",D)}const a=t.ai;const l=`#${a}`;if(t.li){trendii.h.push(t.ai);trendii.console.log(trendii.p.ui);if(trendii.p.ui){const p=new trendii.p.ui(l,{type:"loop",pi:false,gap:10,fi:true,mi:true}).mount();const f=trendii.m.getElementById(a);f.style.display="block";const m=t.ci;m.setAttribute("data-slider-appended","true");m.style.display="block";trendii.console.log("slider appended");p.Di("mounted",function(){console.log("mounted")})}}}}}}else{trendii.console.log("empty feed response")}}).catch(i=>{trendii.console.error(i);typeof onErrorCallback==="function"&&onErrorCallback(error)})}}catch(i){trendii.console.error(i)}};trendii.oi=function(i,t){i.ci=trendii.Ii(i,t)};trendii.wi=function(){try{trendii.D.ni.map((i,t)=>{if(i.di&&i.di.length>0){i.ci=trendii.Ii(i,t)}})}catch(i){trendii.console.error(i)}};trendii.Ii=function(e,t){try{const n=e.ri;const r=e.hi;let i=e.di;if(trendii.p.innerWidth>trendii.P.N){i=e.di.slice(0,4)}const d=e.hi;const o=`splide${t}`;e.ai=o;switch(i.length){case 1:case 2:case 3:case 4:{e.li=false;const c=new DOMParser;const s=c.parseFromString(trendii.g,"text/html");const a=trendii.K(`${d.toLowerCase()}.png`);const l=s.getElementById(trendii.P.R);l.title=d;l.src=a;const u=s.getElementById(trendii.P.U);u.innerHTML="";trendii.yi(i,u);const p=s.getElementById(trendii.P.H);return p}default:{e.li=true;const f=trendii.k.replaceAll(trendii.u,o);const c=new DOMParser;const m=c.parseFromString(f,"text/html");const a=trendii.K(`${d.toLowerCase()}.png`);const l=m.getElementById(trendii.P.R);l.title=d;l.src=a;const D=m.getElementById(o);D.style.display="none";let t=m.getElementById(trendii.P.j);t.innerHTML="";i.forEach(i=>trendii._i(i,t));const p=m.getElementById(trendii.P.H);p.style.display="none";return p}}}catch(i){trendii.console.error(i);return null}};trendii.bi=function(){try{let i;if(trendii.p.innerWidth<=trendii.P.N){i=trendii.m.querySelectorAll(trendii.t)}else{i=trendii.m.querySelectorAll(trendii.i)}const t=Array.from(i);trendii.console.log(t);let a=null;let l=null;t.forEach((i,t)=>{trendii.console.log(i.getElementsByTagName("img"));const e=Array.from(i.getElementsByTagName("img"));let n,r,d;for(let i=0;i<e.length;i++){n=e[i];r=n.src;d=n.getAttribute("data-src");a=trendii.D.ni.find(i=>i.ri===r||d);if(a.ci){l=n;break}}if(a.ci){const o=trendii.m.createElement("div");o.classList.add("adContainer");o.style.background="yellow";o.style.maxHeight="300px";const c=trendii.m.createElement("div");c.classList.add("ads-inside-the-images");if(trendii.p.innerWidth<=trendii.P.N){const s=i.getElementsByTagName(trendii.l)[0];if(s){s.after(a.ci)}else{i.appendChild(a.ci)}}else{i.getElementsByClassName(trendii.o)[0].after(a.ci)}}})}catch(i){trendii.console.error(i)}};trendii._i=function(i,t){try{const e=trendii.G("LI","splide__slide");t.appendChild(e);const n=trendii.G("A","product-redirection-link",null,"text-decoration: none;",i.url,"_blank");e.appendChild(n);const r=trendii.G("DIV","product-item-container");r.addEventListener("click",function(){adsWindow.open(i.url,"_blank")});n.appendChild(r);const d=trendii.G("DIV","product-item");d.style.backgroundImage=`url(${i.Ei})`;r.appendChild(d);if(i.gi){d.appendChild(trendii.G("SPAN","onsale","ON SALE"))}const o=trendii.G("DIV","product-details-wrapper");o.addEventListener("click",function(){adsWindow.open(i.url,"_blank")});d.appendChild(o);const c=trendii.G("DIV","product-details-wrapper-mobile");r.appendChild(c);o.appendChild(trendii.G("P","product-name",i.name));c.appendChild(trendii.G("P","product-name",i.name));o.appendChild(trendii.G("EM","product-price",i.currency+i.ki));c.appendChild(trendii.G("EM","product-price",i.currency+i.ki))}catch(i){console.Ai(i)}};trendii.Ti=function(i,t,e,n){try{const r=trendii.G("DIV",e);t.appendChild(r);const d=trendii.G("A","product-redirection-link",null,"text-decoration: none;",i.url,"_blank");r.appendChild(d);const o=trendii.G("DIV","product-item-container");o.addEventListener("click",function(){adsWindow.open(i.url,"_blank")});d.appendChild(o);const c=trendii.m.createElement("DIV");c.classList.add("product-item");o.appendChild(c);const s=trendii.G("DIV","product-item-image");s.style.backgroundImage=`url(${i.Ei})`;c.appendChild(s);if(i.gi){s.appendChild(trendii.G("SPAN","onsale","ON SALE"))}const a=trendii.G("DIV","product-details-wrapper");if(n>3){c.appendChild(a)}else{o.appendChild(a)}a.appendChild(trendii.G("P","product-name",i.name));a.appendChild(trendii.G("EM","product-price",i.currency+i.ki));if(n>2){const l=trendii.G("DIV","product-details-wrapper-mobile");o.appendChild(l);l.appendChild(trendii.G("P","product-name",i.name));l.appendChild(trendii.G("EM","product-price",i.currency+i.ki))}}catch(i){trendii.console.error(i)}};trendii.yi=function(t,i){switch(t.length){case 1:{const e=t[0];const n=trendii.G("DIV","one-product-wrapper");i.appendChild(n);const r=trendii.G("DIV","row");n.appendChild(r);trendii.Ti(e,r,"col-12",t.length);break}case 2:{const d=trendii.m.createElement("DIV");d.classList.add("two-product-wrapper");i.appendChild(d);const r=trendii.m.createElement("DIV");r.classList.add("row");d.appendChild(r);for(let i=0;i<=1;i++){trendii.Ti(t[i],r,"col-6",t.length)}break}case 3:{const o=trendii.m.createElement("DIV");o.classList.add("three-product-wrapper");i.appendChild(o);const r=trendii.m.createElement("DIV");r.classList.add("row");r.classList.add("row-cols-3");o.appendChild(r);for(let i=0;i<=2;i++){trendii.Ti(t[i],r,"col",t.length)}break}case 4:{const c=trendii.m.createElement("DIV");c.classList.add("four-product-wrapper");i.appendChild(c);const r=trendii.m.createElement("DIV");r.classList.add("row");r.classList.add("row-cols-4");c.appendChild(r);for(let i=0;i<=3;i++){trendii.Ti(t[i],r,"col",t.length)}break}default:{break}}};if(window.location.origin===trendii.A||trendii.$==="test"){trendii.init()}