/*! Kargo Data Library - v1.3.0 [20190620] */!function(o){var a={};function r(t){if(a[t])return a[t].exports;var e=a[t]={i:t,l:!1,exports:{}};return o[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=o,r.c=a,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(o,a,function(t){return e[t]}.bind(null,a));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=2)}({2:function(t,e,o){"use strict";function a(t,e){for(var o,a=t.document.cookie.split(";"),r=null,n=e+"=",i=0;i<a.length;i+=1){for(;" "===a[i].charAt(0);)a[i]=a[i].substring(1,a[i].length);if(0===a[i].indexOf(n)){o=a[i].substring(n.length,a[i].length);try{r=JSON.parse(o)}catch(t){r=o}return r}}return null}function r(t,e,o,a){void 0===a&&(a=0);var r=e+"=";(r+="object"==typeof o?JSON.stringify(o):o,a)&&(r+="; expires="+new Date(Date.now()+a).toUTCString());r+="; path=/",t.document.cookie=r}function n(t){for(var e=t,o=t.top;e!==o;){var a=void 0;try{a=e.parent.location.href}catch(t){a=!1}if(!a)break;for(var r=e.parent.document.getElementsByTagName("iframe"),n=void 0,i=null,s=0;s<r.length;s+=1)if((n=r[s]).contentWindow===e){i=n;break}if(i&&-1<i.className.split(" ").indexOf("krg-nobust"))break;e=e.parent}return e}o.r(e);var i,s,p=n(window),c=function(){function t(){this.STORE_PREFIX="krg_",this.COOKIE_LIFE_TIME=126144e6,this.data={expireTime:Date.now()},this.isCookieStorageEnabled=!1}return t.supportsLocalStorage=function(){var t=!1;try{var e="__storage_test__";p.localStorage.setItem(e,e),p.localStorage.removeItem(e),t=!0}catch(t){}return t},t.prototype.enableCookieStorage=function(t){this.isCookieStorageEnabled=t},t.prototype.getData=function(){return this.data},t.prototype.getExpireTime=function(){return this.data.expireTime},t.prototype.saveData=function(){this.data.expireTime=Date.now()+this.DATA_LIFE_TIME,t.supportsLocalStorage()&&this.updateStorageData(),this.isCookieStorageEnabled?this.updateCookieData():this.removeCookieData()},t.prototype.removeData=function(){t.supportsLocalStorage()&&this.removeStorageData(),this.removeCookieData()},t.prototype.clearData=function(){this.data=this.EMPTY_DATA,this.saveData()},t.prototype.isExpired=function(){return Date.now()>this.data.expireTime},t.prototype.fetchData=function(){this.isCookieStorageEnabled&&this.fetchCookieData(),t.supportsLocalStorage()&&this.fetchStorageData(),this.isCookieStorageEnabled&&this.updateCookieData()},t.prototype.getStoreName=function(){return this.STORE_PREFIX+this.STORE_NAME},t.prototype.encodeDataForStorage=function(t){return btoa(JSON.stringify(t))},t.prototype.decodeDataFromStorage=function(t){var e=null;try{e=JSON.parse(atob(t))}catch(t){}return e},t.prototype.encodeDataForCookie=function(t){return this.encodeDataForStorage(t)},t.prototype.decodeDataFromCookie=function(t){return this.decodeDataFromStorage(t)},t.prototype.fetchStorageData=function(){var t=p.localStorage.getItem(this.getStoreName());if(t){var e=this.decodeDataFromStorage(t);e&&(this.data=e)}},t.prototype.updateStorageData=function(){p.localStorage.setItem(this.getStoreName(),this.encodeDataForStorage(this.data))},t.prototype.removeStorageData=function(){p.localStorage.removeItem(this.getStoreName())},t.prototype.fetchCookieData=function(){var t=a(p,this.getStoreName());if(t){var e=this.decodeDataFromCookie(t);e&&(this.data=e)}},t.prototype.updateCookieData=function(){var t=this.cleanDataForCookie(this.data);r(p,this.getStoreName(),this.encodeDataForCookie(t),this.COOKIE_LIFE_TIME)},t.prototype.removeCookieData=function(){r(p,this.getStoreName(),"",1)},t.prototype.cleanDataForCookie=function(t){return t},t}(),u=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.MAX_COOKIE_SEGMENTS=100,t.UID_STORE_NAME=t.STORE_PREFIX+"uid",t.OLD_STORE_NAME=t.STORE_PREFIX+"cerberus",t.STORE_NAME="crb",t.DATA_LIFE_TIME=864e5,t.EMPTY_DATA={clientId:null,lexId:null,segments:[],syncIds:{},ktcId:null,expireTime:Date.now()+t.DATA_LIFE_TIME,lastSyncedAt:null,pageViewId:""},t.data=Object.assign({},t.EMPTY_DATA),t.isCookieStorageEnabled=!0,t}return u(t,e),t.prototype.saveData=function(){if(e.prototype.saveData.call(this),this.isCookieStorageEnabled){var t={clientId:this.data.clientId,userId:this.data.lexId,optOut:"optout"===this.data.lexId};r(p,this.UID_STORE_NAME,this.encodeUIDCookieData(t),this.COOKIE_LIFE_TIME)}this.removeOldData()},t.prototype.removeData=function(){e.prototype.removeData.call(this),r(p,this.UID_STORE_NAME,"",1),this.removeOldData()},t.prototype.removeOldData=function(){a(p,this.OLD_STORE_NAME)&&r(p,this.OLD_STORE_NAME,"",1),t.supportsLocalStorage()&&p.localStorage.removeItem(this.OLD_STORE_NAME)},t.prototype.clearData=function(){if(e.prototype.clearData.call(this),this.isCookieStorageEnabled){r(p,this.UID_STORE_NAME,this.encodeUIDCookieData({clientId:null,userId:null,optOut:!1}),this.COOKIE_LIFE_TIME)}},t.prototype.getData=function(){return e.prototype.getData.call(this)},t.prototype.cleanDataForCookie=function(t){var e=Object.assign({},t);return e.segments=e.segments.slice(0,this.MAX_COOKIE_SEGMENTS),e},t.prototype.encodeDataForCookie=function(t){return encodeURIComponent(JSON.stringify({v:btoa(JSON.stringify(t))}))},t.prototype.encodeUIDCookieData=function(t){return encodeURIComponent(JSON.stringify({v:t}))},t.prototype.decodeDataFromCookie=function(t){var e=null;try{e=JSON.parse(atob(JSON.parse(decodeURIComponent(t)).v))}catch(t){}return e},t.prototype.getClientId=function(){return this.data.clientId},t.prototype.setClientId=function(t){this.data.clientId=t,this.saveData()},t.prototype.getUserId=function(){return this.data.lexId},t.prototype.setUserId=function(t){this.data.lexId=t,this.saveData()},t.prototype.getSegments=function(){return this.data.segments},t.prototype.setSegments=function(t){this.data.segments=t,this.saveData()},t.prototype.getSyncIds=function(){return this.data.syncIds},t.prototype.setSyncIds=function(t){this.data.syncIds=t,this.saveData()},t.prototype.getKtcId=function(){return this.data.ktcId},t.prototype.setKtcId=function(t){this.data.ktcId=t,this.saveData()},t.prototype.getLastSyncTime=function(){return this.data.lastSyncedAt},t.prototype.setLastSyncTime=function(t){this.data.lastSyncedAt=t,this.saveData()},t.prototype.isOptOut=function(){return"optout"===this.getUserId()},t.prototype.setOptOut=function(t){t?(this.data=Object.assign({},this.EMPTY_DATA),this.data.lexId="optout"):"optout"===this.data.lexId&&(this.data.lexId=null),this.saveData()},t.prototype.setBrandedTakeover=function(t,e){this.data.pageViewId=t?e:"",this.saveData()},t}(c),l=(s=function(t,e){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.MAX_COOKIE_SEGMENTS=100,t.STORE_NAME="krx",t.DATA_LIFE_TIME=864e5,t.EMPTY_DATA={user:null,fingerprintId:null,segments:[],expireTime:Date.now()+t.DATA_LIFE_TIME,optout:!1},t.data=Object.assign({},t.EMPTY_DATA),t}return l(t,e),t.prototype.saveData=function(){e.prototype.saveData.call(this)},t.prototype.getData=function(){return e.prototype.getData.call(this)},t.prototype.cleanDataForCookie=function(t){var e=Object.assign({},t);return e.segments=e.segments.slice(0,this.MAX_COOKIE_SEGMENTS),e},t.prototype.getUserId=function(){return this.data.user},t.prototype.setUserId=function(t){this.data.user=t,this.saveData()},t.prototype.getFingerprintId=function(){return this.data.fingerprintId},t.prototype.setFingerprintId=function(t){this.data.fingerprintId=t,this.saveData()},t.prototype.getSegments=function(){return this.data.segments},t.prototype.setSegments=function(t){this.data.segments=t,this.saveData()},t.prototype.isOptOut=function(){return this.data.optout},t.prototype.setOptOut=function(t){t&&(this.data=Object.assign({},this.EMPTY_DATA)),this.data.optout=t,this.saveData()},t}(c);if(p.Kargo=p.Kargo||{},!p.Kargo.Data){var h=new d;h.fetchData();var g=new f;g.fetchData(),p.Kargo.Data={Cerberus:h,Krux:g}}}});