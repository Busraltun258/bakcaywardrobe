function rS(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in t)){const s=Object.getOwnPropertyDescriptor(r,i);s&&Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function iS(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var iv={exports:{}},Du={},sv={exports:{}},se={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pa=Symbol.for("react.element"),sS=Symbol.for("react.portal"),oS=Symbol.for("react.fragment"),aS=Symbol.for("react.strict_mode"),lS=Symbol.for("react.profiler"),uS=Symbol.for("react.provider"),cS=Symbol.for("react.context"),hS=Symbol.for("react.forward_ref"),dS=Symbol.for("react.suspense"),fS=Symbol.for("react.memo"),pS=Symbol.for("react.lazy"),tm=Symbol.iterator;function gS(t){return t===null||typeof t!="object"?null:(t=tm&&t[tm]||t["@@iterator"],typeof t=="function"?t:null)}var ov={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},av=Object.assign,lv={};function Ps(t,e,n){this.props=t,this.context=e,this.refs=lv,this.updater=n||ov}Ps.prototype.isReactComponent={};Ps.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ps.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function uv(){}uv.prototype=Ps.prototype;function nf(t,e,n){this.props=t,this.context=e,this.refs=lv,this.updater=n||ov}var rf=nf.prototype=new uv;rf.constructor=nf;av(rf,Ps.prototype);rf.isPureReactComponent=!0;var nm=Array.isArray,cv=Object.prototype.hasOwnProperty,sf={current:null},hv={key:!0,ref:!0,__self:!0,__source:!0};function dv(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)cv.call(e,r)&&!hv.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:pa,type:t,key:s,ref:o,props:i,_owner:sf.current}}function mS(t,e){return{$$typeof:pa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function of(t){return typeof t=="object"&&t!==null&&t.$$typeof===pa}function yS(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var rm=/\/+/g;function Wc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?yS(""+t.key):e.toString(36)}function yl(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case pa:case sS:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Wc(o,0):r,nm(i)?(n="",t!=null&&(n=t.replace(rm,"$&/")+"/"),yl(i,e,n,"",function(c){return c})):i!=null&&(of(i)&&(i=mS(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(rm,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",nm(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+Wc(s,l);o+=yl(s,e,n,u,i)}else if(u=gS(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+Wc(s,l++),o+=yl(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Ga(t,e,n){if(t==null)return t;var r=[],i=0;return yl(t,r,"","",function(s){return e.call(n,s,i++)}),r}function _S(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Tt={current:null},_l={transition:null},vS={ReactCurrentDispatcher:Tt,ReactCurrentBatchConfig:_l,ReactCurrentOwner:sf};function fv(){throw Error("act(...) is not supported in production builds of React.")}se.Children={map:Ga,forEach:function(t,e,n){Ga(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ga(t,function(){e++}),e},toArray:function(t){return Ga(t,function(e){return e})||[]},only:function(t){if(!of(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};se.Component=Ps;se.Fragment=oS;se.Profiler=lS;se.PureComponent=nf;se.StrictMode=aS;se.Suspense=dS;se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vS;se.act=fv;se.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=av({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=sf.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)cv.call(e,u)&&!hv.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:pa,type:t.type,key:i,ref:s,props:r,_owner:o}};se.createContext=function(t){return t={$$typeof:cS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:uS,_context:t},t.Consumer=t};se.createElement=dv;se.createFactory=function(t){var e=dv.bind(null,t);return e.type=t,e};se.createRef=function(){return{current:null}};se.forwardRef=function(t){return{$$typeof:hS,render:t}};se.isValidElement=of;se.lazy=function(t){return{$$typeof:pS,_payload:{_status:-1,_result:t},_init:_S}};se.memo=function(t,e){return{$$typeof:fS,type:t,compare:e===void 0?null:e}};se.startTransition=function(t){var e=_l.transition;_l.transition={};try{t()}finally{_l.transition=e}};se.unstable_act=fv;se.useCallback=function(t,e){return Tt.current.useCallback(t,e)};se.useContext=function(t){return Tt.current.useContext(t)};se.useDebugValue=function(){};se.useDeferredValue=function(t){return Tt.current.useDeferredValue(t)};se.useEffect=function(t,e){return Tt.current.useEffect(t,e)};se.useId=function(){return Tt.current.useId()};se.useImperativeHandle=function(t,e,n){return Tt.current.useImperativeHandle(t,e,n)};se.useInsertionEffect=function(t,e){return Tt.current.useInsertionEffect(t,e)};se.useLayoutEffect=function(t,e){return Tt.current.useLayoutEffect(t,e)};se.useMemo=function(t,e){return Tt.current.useMemo(t,e)};se.useReducer=function(t,e,n){return Tt.current.useReducer(t,e,n)};se.useRef=function(t){return Tt.current.useRef(t)};se.useState=function(t){return Tt.current.useState(t)};se.useSyncExternalStore=function(t,e,n){return Tt.current.useSyncExternalStore(t,e,n)};se.useTransition=function(){return Tt.current.useTransition()};se.version="18.3.1";sv.exports=se;var V=sv.exports;const pv=iS(V),wS=rS({__proto__:null,default:pv},[V]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ES=V,TS=Symbol.for("react.element"),IS=Symbol.for("react.fragment"),SS=Object.prototype.hasOwnProperty,kS=ES.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,AS={key:!0,ref:!0,__self:!0,__source:!0};function gv(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)SS.call(e,r)&&!AS.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:TS,type:t,key:s,ref:o,props:i,_owner:kS.current}}Du.Fragment=IS;Du.jsx=gv;Du.jsxs=gv;iv.exports=Du;var T=iv.exports,Vh={},mv={exports:{}},Mt={},yv={exports:{}},_v={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,K){var Z=z.length;z.push(K);e:for(;0<Z;){var me=Z-1>>>1,ke=z[me];if(0<i(ke,K))z[me]=K,z[Z]=ke,Z=me;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var K=z[0],Z=z.pop();if(Z!==K){z[0]=Z;e:for(var me=0,ke=z.length,xn=ke>>>1;me<xn;){var St=2*(me+1)-1,bn=z[St],gt=St+1,Nn=z[gt];if(0>i(bn,Z))gt<ke&&0>i(Nn,bn)?(z[me]=Nn,z[gt]=Z,me=gt):(z[me]=bn,z[St]=Z,me=St);else if(gt<ke&&0>i(Nn,Z))z[me]=Nn,z[gt]=Z,me=gt;else break e}}return K}function i(z,K){var Z=z.sortIndex-K.sortIndex;return Z!==0?Z:z.id-K.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],c=[],d=1,p=null,g=3,A=!1,P=!1,x=!1,b=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S(z){for(var K=n(c);K!==null;){if(K.callback===null)r(c);else if(K.startTime<=z)r(c),K.sortIndex=K.expirationTime,e(u,K);else break;K=n(c)}}function D(z){if(x=!1,S(z),!P)if(n(u)!==null)P=!0,Q(L);else{var K=n(c);K!==null&&ie(D,K.startTime-z)}}function L(z,K){P=!1,x&&(x=!1,v(m),m=-1),A=!0;var Z=g;try{for(S(K),p=n(u);p!==null&&(!(p.expirationTime>K)||z&&!C());){var me=p.callback;if(typeof me=="function"){p.callback=null,g=p.priorityLevel;var ke=me(p.expirationTime<=K);K=t.unstable_now(),typeof ke=="function"?p.callback=ke:p===n(u)&&r(u),S(K)}else r(u);p=n(u)}if(p!==null)var xn=!0;else{var St=n(c);St!==null&&ie(D,St.startTime-K),xn=!1}return xn}finally{p=null,g=Z,A=!1}}var U=!1,w=null,m=-1,I=5,k=-1;function C(){return!(t.unstable_now()-k<I)}function R(){if(w!==null){var z=t.unstable_now();k=z;var K=!0;try{K=w(!0,z)}finally{K?E():(U=!1,w=null)}}else U=!1}var E;if(typeof _=="function")E=function(){_(R)};else if(typeof MessageChannel<"u"){var X=new MessageChannel,$=X.port2;X.port1.onmessage=R,E=function(){$.postMessage(null)}}else E=function(){b(R,0)};function Q(z){w=z,U||(U=!0,E())}function ie(z,K){m=b(function(){z(t.unstable_now())},K)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){P||A||(P=!0,Q(L))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(z){switch(g){case 1:case 2:case 3:var K=3;break;default:K=g}var Z=g;g=K;try{return z()}finally{g=Z}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,K){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var Z=g;g=z;try{return K()}finally{g=Z}},t.unstable_scheduleCallback=function(z,K,Z){var me=t.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?me+Z:me):Z=me,z){case 1:var ke=-1;break;case 2:ke=250;break;case 5:ke=1073741823;break;case 4:ke=1e4;break;default:ke=5e3}return ke=Z+ke,z={id:d++,callback:K,priorityLevel:z,startTime:Z,expirationTime:ke,sortIndex:-1},Z>me?(z.sortIndex=Z,e(c,z),n(u)===null&&z===n(c)&&(x?(v(m),m=-1):x=!0,ie(D,Z-me))):(z.sortIndex=ke,e(u,z),P||A||(P=!0,Q(L))),z},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(z){var K=g;return function(){var Z=g;g=K;try{return z.apply(this,arguments)}finally{g=Z}}}})(_v);yv.exports=_v;var RS=yv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var CS=V,Lt=RS;function j(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var vv=new Set,Mo={};function xi(t,e){gs(t,e),gs(t+"Capture",e)}function gs(t,e){for(Mo[t]=e,t=0;t<e.length;t++)vv.add(e[t])}var qn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Lh=Object.prototype.hasOwnProperty,PS=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,im={},sm={};function xS(t){return Lh.call(sm,t)?!0:Lh.call(im,t)?!1:PS.test(t)?sm[t]=!0:(im[t]=!0,!1)}function bS(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function NS(t,e,n,r){if(e===null||typeof e>"u"||bS(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function It(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var nt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){nt[t]=new It(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];nt[e]=new It(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){nt[t]=new It(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){nt[t]=new It(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){nt[t]=new It(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){nt[t]=new It(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){nt[t]=new It(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){nt[t]=new It(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){nt[t]=new It(t,5,!1,t.toLowerCase(),null,!1,!1)});var af=/[\-:]([a-z])/g;function lf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(af,lf);nt[e]=new It(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(af,lf);nt[e]=new It(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(af,lf);nt[e]=new It(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){nt[t]=new It(t,1,!1,t.toLowerCase(),null,!1,!1)});nt.xlinkHref=new It("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){nt[t]=new It(t,1,!1,t.toLowerCase(),null,!0,!0)});function uf(t,e,n,r){var i=nt.hasOwnProperty(e)?nt[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(NS(e,n,i,r)&&(n=null),r||i===null?xS(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var er=CS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Qa=Symbol.for("react.element"),qi=Symbol.for("react.portal"),Hi=Symbol.for("react.fragment"),cf=Symbol.for("react.strict_mode"),Mh=Symbol.for("react.profiler"),wv=Symbol.for("react.provider"),Ev=Symbol.for("react.context"),hf=Symbol.for("react.forward_ref"),Fh=Symbol.for("react.suspense"),jh=Symbol.for("react.suspense_list"),df=Symbol.for("react.memo"),ur=Symbol.for("react.lazy"),Tv=Symbol.for("react.offscreen"),om=Symbol.iterator;function ro(t){return t===null||typeof t!="object"?null:(t=om&&t[om]||t["@@iterator"],typeof t=="function"?t:null)}var Pe=Object.assign,qc;function fo(t){if(qc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);qc=e&&e[1]||""}return`
`+qc+t}var Hc=!1;function Kc(t,e){if(!t||Hc)return"";Hc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{Hc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?fo(t):""}function DS(t){switch(t.tag){case 5:return fo(t.type);case 16:return fo("Lazy");case 13:return fo("Suspense");case 19:return fo("SuspenseList");case 0:case 2:case 15:return t=Kc(t.type,!1),t;case 11:return t=Kc(t.type.render,!1),t;case 1:return t=Kc(t.type,!0),t;default:return""}}function Uh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Hi:return"Fragment";case qi:return"Portal";case Mh:return"Profiler";case cf:return"StrictMode";case Fh:return"Suspense";case jh:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Ev:return(t.displayName||"Context")+".Consumer";case wv:return(t._context.displayName||"Context")+".Provider";case hf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case df:return e=t.displayName||null,e!==null?e:Uh(t.type)||"Memo";case ur:e=t._payload,t=t._init;try{return Uh(t(e))}catch{}}return null}function OS(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Uh(e);case 8:return e===cf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Or(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Iv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function VS(t){var e=Iv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ya(t){t._valueTracker||(t._valueTracker=VS(t))}function Sv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Iv(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function jl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function zh(t,e){var n=e.checked;return Pe({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function am(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Or(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function kv(t,e){e=e.checked,e!=null&&uf(t,"checked",e,!1)}function Bh(t,e){kv(t,e);var n=Or(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?$h(t,e.type,n):e.hasOwnProperty("defaultValue")&&$h(t,e.type,Or(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function lm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function $h(t,e,n){(e!=="number"||jl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var po=Array.isArray;function is(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Or(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Wh(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(j(91));return Pe({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function um(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(j(92));if(po(n)){if(1<n.length)throw Error(j(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Or(n)}}function Av(t,e){var n=Or(e.value),r=Or(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function cm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Rv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function qh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Rv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ja,Cv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ja=Ja||document.createElement("div"),Ja.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ja.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Fo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Io={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},LS=["Webkit","ms","Moz","O"];Object.keys(Io).forEach(function(t){LS.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Io[e]=Io[t]})});function Pv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Io.hasOwnProperty(t)&&Io[t]?(""+e).trim():e+"px"}function xv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Pv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var MS=Pe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Hh(t,e){if(e){if(MS[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(j(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(j(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(j(61))}if(e.style!=null&&typeof e.style!="object")throw Error(j(62))}}function Kh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Gh=null;function ff(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Qh=null,ss=null,os=null;function hm(t){if(t=ya(t)){if(typeof Qh!="function")throw Error(j(280));var e=t.stateNode;e&&(e=Fu(e),Qh(t.stateNode,t.type,e))}}function bv(t){ss?os?os.push(t):os=[t]:ss=t}function Nv(){if(ss){var t=ss,e=os;if(os=ss=null,hm(t),e)for(t=0;t<e.length;t++)hm(e[t])}}function Dv(t,e){return t(e)}function Ov(){}var Gc=!1;function Vv(t,e,n){if(Gc)return t(e,n);Gc=!0;try{return Dv(t,e,n)}finally{Gc=!1,(ss!==null||os!==null)&&(Ov(),Nv())}}function jo(t,e){var n=t.stateNode;if(n===null)return null;var r=Fu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(j(231,e,typeof n));return n}var Yh=!1;if(qn)try{var io={};Object.defineProperty(io,"passive",{get:function(){Yh=!0}}),window.addEventListener("test",io,io),window.removeEventListener("test",io,io)}catch{Yh=!1}function FS(t,e,n,r,i,s,o,l,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var So=!1,Ul=null,zl=!1,Jh=null,jS={onError:function(t){So=!0,Ul=t}};function US(t,e,n,r,i,s,o,l,u){So=!1,Ul=null,FS.apply(jS,arguments)}function zS(t,e,n,r,i,s,o,l,u){if(US.apply(this,arguments),So){if(So){var c=Ul;So=!1,Ul=null}else throw Error(j(198));zl||(zl=!0,Jh=c)}}function bi(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Lv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function dm(t){if(bi(t)!==t)throw Error(j(188))}function BS(t){var e=t.alternate;if(!e){if(e=bi(t),e===null)throw Error(j(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return dm(i),t;if(s===r)return dm(i),e;s=s.sibling}throw Error(j(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(j(189))}}if(n.alternate!==r)throw Error(j(190))}if(n.tag!==3)throw Error(j(188));return n.stateNode.current===n?t:e}function Mv(t){return t=BS(t),t!==null?Fv(t):null}function Fv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Fv(t);if(e!==null)return e;t=t.sibling}return null}var jv=Lt.unstable_scheduleCallback,fm=Lt.unstable_cancelCallback,$S=Lt.unstable_shouldYield,WS=Lt.unstable_requestPaint,Me=Lt.unstable_now,qS=Lt.unstable_getCurrentPriorityLevel,pf=Lt.unstable_ImmediatePriority,Uv=Lt.unstable_UserBlockingPriority,Bl=Lt.unstable_NormalPriority,HS=Lt.unstable_LowPriority,zv=Lt.unstable_IdlePriority,Ou=null,yn=null;function KS(t){if(yn&&typeof yn.onCommitFiberRoot=="function")try{yn.onCommitFiberRoot(Ou,t,void 0,(t.current.flags&128)===128)}catch{}}var tn=Math.clz32?Math.clz32:YS,GS=Math.log,QS=Math.LN2;function YS(t){return t>>>=0,t===0?32:31-(GS(t)/QS|0)|0}var Xa=64,Za=4194304;function go(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function $l(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=go(l):(s&=o,s!==0&&(r=go(s)))}else o=n&~i,o!==0?r=go(o):s!==0&&(r=go(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-tn(e),i=1<<n,r|=t[n],e&=~i;return r}function JS(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function XS(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-tn(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=JS(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function Xh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Bv(){var t=Xa;return Xa<<=1,!(Xa&4194240)&&(Xa=64),t}function Qc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ga(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-tn(e),t[e]=n}function ZS(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-tn(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function gf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-tn(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ge=0;function $v(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Wv,mf,qv,Hv,Kv,Zh=!1,el=[],Tr=null,Ir=null,Sr=null,Uo=new Map,zo=new Map,hr=[],ek="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function pm(t,e){switch(t){case"focusin":case"focusout":Tr=null;break;case"dragenter":case"dragleave":Ir=null;break;case"mouseover":case"mouseout":Sr=null;break;case"pointerover":case"pointerout":Uo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":zo.delete(e.pointerId)}}function so(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=ya(e),e!==null&&mf(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function tk(t,e,n,r,i){switch(e){case"focusin":return Tr=so(Tr,t,e,n,r,i),!0;case"dragenter":return Ir=so(Ir,t,e,n,r,i),!0;case"mouseover":return Sr=so(Sr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return Uo.set(s,so(Uo.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,zo.set(s,so(zo.get(s)||null,t,e,n,r,i)),!0}return!1}function Gv(t){var e=oi(t.target);if(e!==null){var n=bi(e);if(n!==null){if(e=n.tag,e===13){if(e=Lv(n),e!==null){t.blockedOn=e,Kv(t.priority,function(){qv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function vl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=ed(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Gh=r,n.target.dispatchEvent(r),Gh=null}else return e=ya(n),e!==null&&mf(e),t.blockedOn=n,!1;e.shift()}return!0}function gm(t,e,n){vl(t)&&n.delete(e)}function nk(){Zh=!1,Tr!==null&&vl(Tr)&&(Tr=null),Ir!==null&&vl(Ir)&&(Ir=null),Sr!==null&&vl(Sr)&&(Sr=null),Uo.forEach(gm),zo.forEach(gm)}function oo(t,e){t.blockedOn===e&&(t.blockedOn=null,Zh||(Zh=!0,Lt.unstable_scheduleCallback(Lt.unstable_NormalPriority,nk)))}function Bo(t){function e(i){return oo(i,t)}if(0<el.length){oo(el[0],t);for(var n=1;n<el.length;n++){var r=el[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Tr!==null&&oo(Tr,t),Ir!==null&&oo(Ir,t),Sr!==null&&oo(Sr,t),Uo.forEach(e),zo.forEach(e),n=0;n<hr.length;n++)r=hr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<hr.length&&(n=hr[0],n.blockedOn===null);)Gv(n),n.blockedOn===null&&hr.shift()}var as=er.ReactCurrentBatchConfig,Wl=!0;function rk(t,e,n,r){var i=ge,s=as.transition;as.transition=null;try{ge=1,yf(t,e,n,r)}finally{ge=i,as.transition=s}}function ik(t,e,n,r){var i=ge,s=as.transition;as.transition=null;try{ge=4,yf(t,e,n,r)}finally{ge=i,as.transition=s}}function yf(t,e,n,r){if(Wl){var i=ed(t,e,n,r);if(i===null)sh(t,e,r,ql,n),pm(t,r);else if(tk(i,t,e,n,r))r.stopPropagation();else if(pm(t,r),e&4&&-1<ek.indexOf(t)){for(;i!==null;){var s=ya(i);if(s!==null&&Wv(s),s=ed(t,e,n,r),s===null&&sh(t,e,r,ql,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else sh(t,e,r,null,n)}}var ql=null;function ed(t,e,n,r){if(ql=null,t=ff(r),t=oi(t),t!==null)if(e=bi(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Lv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ql=t,null}function Qv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(qS()){case pf:return 1;case Uv:return 4;case Bl:case HS:return 16;case zv:return 536870912;default:return 16}default:return 16}}var _r=null,_f=null,wl=null;function Yv(){if(wl)return wl;var t,e=_f,n=e.length,r,i="value"in _r?_r.value:_r.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return wl=i.slice(t,1<r?1-r:void 0)}function El(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function tl(){return!0}function mm(){return!1}function Ft(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?tl:mm,this.isPropagationStopped=mm,this}return Pe(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=tl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=tl)},persist:function(){},isPersistent:tl}),e}var xs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vf=Ft(xs),ma=Pe({},xs,{view:0,detail:0}),sk=Ft(ma),Yc,Jc,ao,Vu=Pe({},ma,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ao&&(ao&&t.type==="mousemove"?(Yc=t.screenX-ao.screenX,Jc=t.screenY-ao.screenY):Jc=Yc=0,ao=t),Yc)},movementY:function(t){return"movementY"in t?t.movementY:Jc}}),ym=Ft(Vu),ok=Pe({},Vu,{dataTransfer:0}),ak=Ft(ok),lk=Pe({},ma,{relatedTarget:0}),Xc=Ft(lk),uk=Pe({},xs,{animationName:0,elapsedTime:0,pseudoElement:0}),ck=Ft(uk),hk=Pe({},xs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),dk=Ft(hk),fk=Pe({},xs,{data:0}),_m=Ft(fk),pk={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gk={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mk={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function yk(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=mk[t])?!!e[t]:!1}function wf(){return yk}var _k=Pe({},ma,{key:function(t){if(t.key){var e=pk[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=El(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?gk[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wf,charCode:function(t){return t.type==="keypress"?El(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?El(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),vk=Ft(_k),wk=Pe({},Vu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),vm=Ft(wk),Ek=Pe({},ma,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wf}),Tk=Ft(Ek),Ik=Pe({},xs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Sk=Ft(Ik),kk=Pe({},Vu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Ak=Ft(kk),Rk=[9,13,27,32],Ef=qn&&"CompositionEvent"in window,ko=null;qn&&"documentMode"in document&&(ko=document.documentMode);var Ck=qn&&"TextEvent"in window&&!ko,Jv=qn&&(!Ef||ko&&8<ko&&11>=ko),wm=" ",Em=!1;function Xv(t,e){switch(t){case"keyup":return Rk.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Zv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ki=!1;function Pk(t,e){switch(t){case"compositionend":return Zv(e);case"keypress":return e.which!==32?null:(Em=!0,wm);case"textInput":return t=e.data,t===wm&&Em?null:t;default:return null}}function xk(t,e){if(Ki)return t==="compositionend"||!Ef&&Xv(t,e)?(t=Yv(),wl=_f=_r=null,Ki=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Jv&&e.locale!=="ko"?null:e.data;default:return null}}var bk={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!bk[t.type]:e==="textarea"}function ew(t,e,n,r){bv(r),e=Hl(e,"onChange"),0<e.length&&(n=new vf("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Ao=null,$o=null;function Nk(t){hw(t,0)}function Lu(t){var e=Yi(t);if(Sv(e))return t}function Dk(t,e){if(t==="change")return e}var tw=!1;if(qn){var Zc;if(qn){var eh="oninput"in document;if(!eh){var Im=document.createElement("div");Im.setAttribute("oninput","return;"),eh=typeof Im.oninput=="function"}Zc=eh}else Zc=!1;tw=Zc&&(!document.documentMode||9<document.documentMode)}function Sm(){Ao&&(Ao.detachEvent("onpropertychange",nw),$o=Ao=null)}function nw(t){if(t.propertyName==="value"&&Lu($o)){var e=[];ew(e,$o,t,ff(t)),Vv(Nk,e)}}function Ok(t,e,n){t==="focusin"?(Sm(),Ao=e,$o=n,Ao.attachEvent("onpropertychange",nw)):t==="focusout"&&Sm()}function Vk(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Lu($o)}function Lk(t,e){if(t==="click")return Lu(e)}function Mk(t,e){if(t==="input"||t==="change")return Lu(e)}function Fk(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var on=typeof Object.is=="function"?Object.is:Fk;function Wo(t,e){if(on(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Lh.call(e,i)||!on(t[i],e[i]))return!1}return!0}function km(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Am(t,e){var n=km(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=km(n)}}function rw(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?rw(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function iw(){for(var t=window,e=jl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=jl(t.document)}return e}function Tf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function jk(t){var e=iw(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&rw(n.ownerDocument.documentElement,n)){if(r!==null&&Tf(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Am(n,s);var o=Am(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Uk=qn&&"documentMode"in document&&11>=document.documentMode,Gi=null,td=null,Ro=null,nd=!1;function Rm(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;nd||Gi==null||Gi!==jl(r)||(r=Gi,"selectionStart"in r&&Tf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ro&&Wo(Ro,r)||(Ro=r,r=Hl(td,"onSelect"),0<r.length&&(e=new vf("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Gi)))}function nl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Qi={animationend:nl("Animation","AnimationEnd"),animationiteration:nl("Animation","AnimationIteration"),animationstart:nl("Animation","AnimationStart"),transitionend:nl("Transition","TransitionEnd")},th={},sw={};qn&&(sw=document.createElement("div").style,"AnimationEvent"in window||(delete Qi.animationend.animation,delete Qi.animationiteration.animation,delete Qi.animationstart.animation),"TransitionEvent"in window||delete Qi.transitionend.transition);function Mu(t){if(th[t])return th[t];if(!Qi[t])return t;var e=Qi[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in sw)return th[t]=e[n];return t}var ow=Mu("animationend"),aw=Mu("animationiteration"),lw=Mu("animationstart"),uw=Mu("transitionend"),cw=new Map,Cm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Br(t,e){cw.set(t,e),xi(e,[t])}for(var nh=0;nh<Cm.length;nh++){var rh=Cm[nh],zk=rh.toLowerCase(),Bk=rh[0].toUpperCase()+rh.slice(1);Br(zk,"on"+Bk)}Br(ow,"onAnimationEnd");Br(aw,"onAnimationIteration");Br(lw,"onAnimationStart");Br("dblclick","onDoubleClick");Br("focusin","onFocus");Br("focusout","onBlur");Br(uw,"onTransitionEnd");gs("onMouseEnter",["mouseout","mouseover"]);gs("onMouseLeave",["mouseout","mouseover"]);gs("onPointerEnter",["pointerout","pointerover"]);gs("onPointerLeave",["pointerout","pointerover"]);xi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));xi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));xi("onBeforeInput",["compositionend","keypress","textInput","paste"]);xi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));xi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));xi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var mo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$k=new Set("cancel close invalid load scroll toggle".split(" ").concat(mo));function Pm(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,zS(r,e,void 0,t),t.currentTarget=null}function hw(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;Pm(i,l,c),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,c=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;Pm(i,l,c),s=u}}}if(zl)throw t=Jh,zl=!1,Jh=null,t}function Te(t,e){var n=e[ad];n===void 0&&(n=e[ad]=new Set);var r=t+"__bubble";n.has(r)||(dw(e,t,2,!1),n.add(r))}function ih(t,e,n){var r=0;e&&(r|=4),dw(n,t,r,e)}var rl="_reactListening"+Math.random().toString(36).slice(2);function qo(t){if(!t[rl]){t[rl]=!0,vv.forEach(function(n){n!=="selectionchange"&&($k.has(n)||ih(n,!1,t),ih(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[rl]||(e[rl]=!0,ih("selectionchange",!1,e))}}function dw(t,e,n,r){switch(Qv(e)){case 1:var i=rk;break;case 4:i=ik;break;default:i=yf}n=i.bind(null,e,n,t),i=void 0,!Yh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function sh(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=oi(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}Vv(function(){var c=s,d=ff(n),p=[];e:{var g=cw.get(t);if(g!==void 0){var A=vf,P=t;switch(t){case"keypress":if(El(n)===0)break e;case"keydown":case"keyup":A=vk;break;case"focusin":P="focus",A=Xc;break;case"focusout":P="blur",A=Xc;break;case"beforeblur":case"afterblur":A=Xc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":A=ym;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":A=ak;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":A=Tk;break;case ow:case aw:case lw:A=ck;break;case uw:A=Sk;break;case"scroll":A=sk;break;case"wheel":A=Ak;break;case"copy":case"cut":case"paste":A=dk;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":A=vm}var x=(e&4)!==0,b=!x&&t==="scroll",v=x?g!==null?g+"Capture":null:g;x=[];for(var _=c,S;_!==null;){S=_;var D=S.stateNode;if(S.tag===5&&D!==null&&(S=D,v!==null&&(D=jo(_,v),D!=null&&x.push(Ho(_,D,S)))),b)break;_=_.return}0<x.length&&(g=new A(g,P,null,n,d),p.push({event:g,listeners:x}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",A=t==="mouseout"||t==="pointerout",g&&n!==Gh&&(P=n.relatedTarget||n.fromElement)&&(oi(P)||P[Hn]))break e;if((A||g)&&(g=d.window===d?d:(g=d.ownerDocument)?g.defaultView||g.parentWindow:window,A?(P=n.relatedTarget||n.toElement,A=c,P=P?oi(P):null,P!==null&&(b=bi(P),P!==b||P.tag!==5&&P.tag!==6)&&(P=null)):(A=null,P=c),A!==P)){if(x=ym,D="onMouseLeave",v="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(x=vm,D="onPointerLeave",v="onPointerEnter",_="pointer"),b=A==null?g:Yi(A),S=P==null?g:Yi(P),g=new x(D,_+"leave",A,n,d),g.target=b,g.relatedTarget=S,D=null,oi(d)===c&&(x=new x(v,_+"enter",P,n,d),x.target=S,x.relatedTarget=b,D=x),b=D,A&&P)t:{for(x=A,v=P,_=0,S=x;S;S=Ui(S))_++;for(S=0,D=v;D;D=Ui(D))S++;for(;0<_-S;)x=Ui(x),_--;for(;0<S-_;)v=Ui(v),S--;for(;_--;){if(x===v||v!==null&&x===v.alternate)break t;x=Ui(x),v=Ui(v)}x=null}else x=null;A!==null&&xm(p,g,A,x,!1),P!==null&&b!==null&&xm(p,b,P,x,!0)}}e:{if(g=c?Yi(c):window,A=g.nodeName&&g.nodeName.toLowerCase(),A==="select"||A==="input"&&g.type==="file")var L=Dk;else if(Tm(g))if(tw)L=Mk;else{L=Vk;var U=Ok}else(A=g.nodeName)&&A.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(L=Lk);if(L&&(L=L(t,c))){ew(p,L,n,d);break e}U&&U(t,g,c),t==="focusout"&&(U=g._wrapperState)&&U.controlled&&g.type==="number"&&$h(g,"number",g.value)}switch(U=c?Yi(c):window,t){case"focusin":(Tm(U)||U.contentEditable==="true")&&(Gi=U,td=c,Ro=null);break;case"focusout":Ro=td=Gi=null;break;case"mousedown":nd=!0;break;case"contextmenu":case"mouseup":case"dragend":nd=!1,Rm(p,n,d);break;case"selectionchange":if(Uk)break;case"keydown":case"keyup":Rm(p,n,d)}var w;if(Ef)e:{switch(t){case"compositionstart":var m="onCompositionStart";break e;case"compositionend":m="onCompositionEnd";break e;case"compositionupdate":m="onCompositionUpdate";break e}m=void 0}else Ki?Xv(t,n)&&(m="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(m="onCompositionStart");m&&(Jv&&n.locale!=="ko"&&(Ki||m!=="onCompositionStart"?m==="onCompositionEnd"&&Ki&&(w=Yv()):(_r=d,_f="value"in _r?_r.value:_r.textContent,Ki=!0)),U=Hl(c,m),0<U.length&&(m=new _m(m,t,null,n,d),p.push({event:m,listeners:U}),w?m.data=w:(w=Zv(n),w!==null&&(m.data=w)))),(w=Ck?Pk(t,n):xk(t,n))&&(c=Hl(c,"onBeforeInput"),0<c.length&&(d=new _m("onBeforeInput","beforeinput",null,n,d),p.push({event:d,listeners:c}),d.data=w))}hw(p,e)})}function Ho(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Hl(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=jo(t,n),s!=null&&r.unshift(Ho(t,s,i)),s=jo(t,e),s!=null&&r.push(Ho(t,s,i))),t=t.return}return r}function Ui(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function xm(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,i?(u=jo(n,s),u!=null&&o.unshift(Ho(n,u,l))):i||(u=jo(n,s),u!=null&&o.push(Ho(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Wk=/\r\n?/g,qk=/\u0000|\uFFFD/g;function bm(t){return(typeof t=="string"?t:""+t).replace(Wk,`
`).replace(qk,"")}function il(t,e,n){if(e=bm(e),bm(t)!==e&&n)throw Error(j(425))}function Kl(){}var rd=null,id=null;function sd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var od=typeof setTimeout=="function"?setTimeout:void 0,Hk=typeof clearTimeout=="function"?clearTimeout:void 0,Nm=typeof Promise=="function"?Promise:void 0,Kk=typeof queueMicrotask=="function"?queueMicrotask:typeof Nm<"u"?function(t){return Nm.resolve(null).then(t).catch(Gk)}:od;function Gk(t){setTimeout(function(){throw t})}function oh(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),Bo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Bo(e)}function kr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Dm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var bs=Math.random().toString(36).slice(2),mn="__reactFiber$"+bs,Ko="__reactProps$"+bs,Hn="__reactContainer$"+bs,ad="__reactEvents$"+bs,Qk="__reactListeners$"+bs,Yk="__reactHandles$"+bs;function oi(t){var e=t[mn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Hn]||n[mn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Dm(t);t!==null;){if(n=t[mn])return n;t=Dm(t)}return e}t=n,n=t.parentNode}return null}function ya(t){return t=t[mn]||t[Hn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Yi(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(j(33))}function Fu(t){return t[Ko]||null}var ld=[],Ji=-1;function $r(t){return{current:t}}function Se(t){0>Ji||(t.current=ld[Ji],ld[Ji]=null,Ji--)}function we(t,e){Ji++,ld[Ji]=t.current,t.current=e}var Vr={},ft=$r(Vr),Ct=$r(!1),mi=Vr;function ms(t,e){var n=t.type.contextTypes;if(!n)return Vr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Pt(t){return t=t.childContextTypes,t!=null}function Gl(){Se(Ct),Se(ft)}function Om(t,e,n){if(ft.current!==Vr)throw Error(j(168));we(ft,e),we(Ct,n)}function fw(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(j(108,OS(t)||"Unknown",i));return Pe({},n,r)}function Ql(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Vr,mi=ft.current,we(ft,t),we(Ct,Ct.current),!0}function Vm(t,e,n){var r=t.stateNode;if(!r)throw Error(j(169));n?(t=fw(t,e,mi),r.__reactInternalMemoizedMergedChildContext=t,Se(Ct),Se(ft),we(ft,t)):Se(Ct),we(Ct,n)}var Mn=null,ju=!1,ah=!1;function pw(t){Mn===null?Mn=[t]:Mn.push(t)}function Jk(t){ju=!0,pw(t)}function Wr(){if(!ah&&Mn!==null){ah=!0;var t=0,e=ge;try{var n=Mn;for(ge=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Mn=null,ju=!1}catch(i){throw Mn!==null&&(Mn=Mn.slice(t+1)),jv(pf,Wr),i}finally{ge=e,ah=!1}}return null}var Xi=[],Zi=0,Yl=null,Jl=0,Ut=[],zt=0,yi=null,Fn=1,jn="";function ri(t,e){Xi[Zi++]=Jl,Xi[Zi++]=Yl,Yl=t,Jl=e}function gw(t,e,n){Ut[zt++]=Fn,Ut[zt++]=jn,Ut[zt++]=yi,yi=t;var r=Fn;t=jn;var i=32-tn(r)-1;r&=~(1<<i),n+=1;var s=32-tn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Fn=1<<32-tn(e)+i|n<<i|r,jn=s+t}else Fn=1<<s|n<<i|r,jn=t}function If(t){t.return!==null&&(ri(t,1),gw(t,1,0))}function Sf(t){for(;t===Yl;)Yl=Xi[--Zi],Xi[Zi]=null,Jl=Xi[--Zi],Xi[Zi]=null;for(;t===yi;)yi=Ut[--zt],Ut[zt]=null,jn=Ut[--zt],Ut[zt]=null,Fn=Ut[--zt],Ut[zt]=null}var Vt=null,Dt=null,Ae=!1,Xt=null;function mw(t,e){var n=$t(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Lm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Vt=t,Dt=kr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Vt=t,Dt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=yi!==null?{id:Fn,overflow:jn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=$t(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Vt=t,Dt=null,!0):!1;default:return!1}}function ud(t){return(t.mode&1)!==0&&(t.flags&128)===0}function cd(t){if(Ae){var e=Dt;if(e){var n=e;if(!Lm(t,e)){if(ud(t))throw Error(j(418));e=kr(n.nextSibling);var r=Vt;e&&Lm(t,e)?mw(r,n):(t.flags=t.flags&-4097|2,Ae=!1,Vt=t)}}else{if(ud(t))throw Error(j(418));t.flags=t.flags&-4097|2,Ae=!1,Vt=t}}}function Mm(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Vt=t}function sl(t){if(t!==Vt)return!1;if(!Ae)return Mm(t),Ae=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!sd(t.type,t.memoizedProps)),e&&(e=Dt)){if(ud(t))throw yw(),Error(j(418));for(;e;)mw(t,e),e=kr(e.nextSibling)}if(Mm(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(j(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Dt=kr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Dt=null}}else Dt=Vt?kr(t.stateNode.nextSibling):null;return!0}function yw(){for(var t=Dt;t;)t=kr(t.nextSibling)}function ys(){Dt=Vt=null,Ae=!1}function kf(t){Xt===null?Xt=[t]:Xt.push(t)}var Xk=er.ReactCurrentBatchConfig;function lo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(j(309));var r=n.stateNode}if(!r)throw Error(j(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(j(284));if(!n._owner)throw Error(j(290,t))}return t}function ol(t,e){throw t=Object.prototype.toString.call(e),Error(j(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Fm(t){var e=t._init;return e(t._payload)}function _w(t){function e(v,_){if(t){var S=v.deletions;S===null?(v.deletions=[_],v.flags|=16):S.push(_)}}function n(v,_){if(!t)return null;for(;_!==null;)e(v,_),_=_.sibling;return null}function r(v,_){for(v=new Map;_!==null;)_.key!==null?v.set(_.key,_):v.set(_.index,_),_=_.sibling;return v}function i(v,_){return v=Pr(v,_),v.index=0,v.sibling=null,v}function s(v,_,S){return v.index=S,t?(S=v.alternate,S!==null?(S=S.index,S<_?(v.flags|=2,_):S):(v.flags|=2,_)):(v.flags|=1048576,_)}function o(v){return t&&v.alternate===null&&(v.flags|=2),v}function l(v,_,S,D){return _===null||_.tag!==6?(_=ph(S,v.mode,D),_.return=v,_):(_=i(_,S),_.return=v,_)}function u(v,_,S,D){var L=S.type;return L===Hi?d(v,_,S.props.children,D,S.key):_!==null&&(_.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===ur&&Fm(L)===_.type)?(D=i(_,S.props),D.ref=lo(v,_,S),D.return=v,D):(D=Cl(S.type,S.key,S.props,null,v.mode,D),D.ref=lo(v,_,S),D.return=v,D)}function c(v,_,S,D){return _===null||_.tag!==4||_.stateNode.containerInfo!==S.containerInfo||_.stateNode.implementation!==S.implementation?(_=gh(S,v.mode,D),_.return=v,_):(_=i(_,S.children||[]),_.return=v,_)}function d(v,_,S,D,L){return _===null||_.tag!==7?(_=di(S,v.mode,D,L),_.return=v,_):(_=i(_,S),_.return=v,_)}function p(v,_,S){if(typeof _=="string"&&_!==""||typeof _=="number")return _=ph(""+_,v.mode,S),_.return=v,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Qa:return S=Cl(_.type,_.key,_.props,null,v.mode,S),S.ref=lo(v,null,_),S.return=v,S;case qi:return _=gh(_,v.mode,S),_.return=v,_;case ur:var D=_._init;return p(v,D(_._payload),S)}if(po(_)||ro(_))return _=di(_,v.mode,S,null),_.return=v,_;ol(v,_)}return null}function g(v,_,S,D){var L=_!==null?_.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return L!==null?null:l(v,_,""+S,D);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Qa:return S.key===L?u(v,_,S,D):null;case qi:return S.key===L?c(v,_,S,D):null;case ur:return L=S._init,g(v,_,L(S._payload),D)}if(po(S)||ro(S))return L!==null?null:d(v,_,S,D,null);ol(v,S)}return null}function A(v,_,S,D,L){if(typeof D=="string"&&D!==""||typeof D=="number")return v=v.get(S)||null,l(_,v,""+D,L);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case Qa:return v=v.get(D.key===null?S:D.key)||null,u(_,v,D,L);case qi:return v=v.get(D.key===null?S:D.key)||null,c(_,v,D,L);case ur:var U=D._init;return A(v,_,S,U(D._payload),L)}if(po(D)||ro(D))return v=v.get(S)||null,d(_,v,D,L,null);ol(_,D)}return null}function P(v,_,S,D){for(var L=null,U=null,w=_,m=_=0,I=null;w!==null&&m<S.length;m++){w.index>m?(I=w,w=null):I=w.sibling;var k=g(v,w,S[m],D);if(k===null){w===null&&(w=I);break}t&&w&&k.alternate===null&&e(v,w),_=s(k,_,m),U===null?L=k:U.sibling=k,U=k,w=I}if(m===S.length)return n(v,w),Ae&&ri(v,m),L;if(w===null){for(;m<S.length;m++)w=p(v,S[m],D),w!==null&&(_=s(w,_,m),U===null?L=w:U.sibling=w,U=w);return Ae&&ri(v,m),L}for(w=r(v,w);m<S.length;m++)I=A(w,v,m,S[m],D),I!==null&&(t&&I.alternate!==null&&w.delete(I.key===null?m:I.key),_=s(I,_,m),U===null?L=I:U.sibling=I,U=I);return t&&w.forEach(function(C){return e(v,C)}),Ae&&ri(v,m),L}function x(v,_,S,D){var L=ro(S);if(typeof L!="function")throw Error(j(150));if(S=L.call(S),S==null)throw Error(j(151));for(var U=L=null,w=_,m=_=0,I=null,k=S.next();w!==null&&!k.done;m++,k=S.next()){w.index>m?(I=w,w=null):I=w.sibling;var C=g(v,w,k.value,D);if(C===null){w===null&&(w=I);break}t&&w&&C.alternate===null&&e(v,w),_=s(C,_,m),U===null?L=C:U.sibling=C,U=C,w=I}if(k.done)return n(v,w),Ae&&ri(v,m),L;if(w===null){for(;!k.done;m++,k=S.next())k=p(v,k.value,D),k!==null&&(_=s(k,_,m),U===null?L=k:U.sibling=k,U=k);return Ae&&ri(v,m),L}for(w=r(v,w);!k.done;m++,k=S.next())k=A(w,v,m,k.value,D),k!==null&&(t&&k.alternate!==null&&w.delete(k.key===null?m:k.key),_=s(k,_,m),U===null?L=k:U.sibling=k,U=k);return t&&w.forEach(function(R){return e(v,R)}),Ae&&ri(v,m),L}function b(v,_,S,D){if(typeof S=="object"&&S!==null&&S.type===Hi&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case Qa:e:{for(var L=S.key,U=_;U!==null;){if(U.key===L){if(L=S.type,L===Hi){if(U.tag===7){n(v,U.sibling),_=i(U,S.props.children),_.return=v,v=_;break e}}else if(U.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===ur&&Fm(L)===U.type){n(v,U.sibling),_=i(U,S.props),_.ref=lo(v,U,S),_.return=v,v=_;break e}n(v,U);break}else e(v,U);U=U.sibling}S.type===Hi?(_=di(S.props.children,v.mode,D,S.key),_.return=v,v=_):(D=Cl(S.type,S.key,S.props,null,v.mode,D),D.ref=lo(v,_,S),D.return=v,v=D)}return o(v);case qi:e:{for(U=S.key;_!==null;){if(_.key===U)if(_.tag===4&&_.stateNode.containerInfo===S.containerInfo&&_.stateNode.implementation===S.implementation){n(v,_.sibling),_=i(_,S.children||[]),_.return=v,v=_;break e}else{n(v,_);break}else e(v,_);_=_.sibling}_=gh(S,v.mode,D),_.return=v,v=_}return o(v);case ur:return U=S._init,b(v,_,U(S._payload),D)}if(po(S))return P(v,_,S,D);if(ro(S))return x(v,_,S,D);ol(v,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,_!==null&&_.tag===6?(n(v,_.sibling),_=i(_,S),_.return=v,v=_):(n(v,_),_=ph(S,v.mode,D),_.return=v,v=_),o(v)):n(v,_)}return b}var _s=_w(!0),vw=_w(!1),Xl=$r(null),Zl=null,es=null,Af=null;function Rf(){Af=es=Zl=null}function Cf(t){var e=Xl.current;Se(Xl),t._currentValue=e}function hd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function ls(t,e){Zl=t,Af=es=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Rt=!0),t.firstContext=null)}function Kt(t){var e=t._currentValue;if(Af!==t)if(t={context:t,memoizedValue:e,next:null},es===null){if(Zl===null)throw Error(j(308));es=t,Zl.dependencies={lanes:0,firstContext:t}}else es=es.next=t;return e}var ai=null;function Pf(t){ai===null?ai=[t]:ai.push(t)}function ww(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Pf(e)):(n.next=i.next,i.next=n),e.interleaved=n,Kn(t,r)}function Kn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var cr=!1;function xf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ew(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Bn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Ar(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,fe&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Kn(t,n)}return i=r.interleaved,i===null?(e.next=e,Pf(r)):(e.next=i.next,i.next=e),r.interleaved=e,Kn(t,n)}function Tl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,gf(t,n)}}function jm(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function eu(t,e,n,r){var i=t.updateQueue;cr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,c=u.next;u.next=null,o===null?s=c:o.next=c,o=u;var d=t.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==o&&(l===null?d.firstBaseUpdate=c:l.next=c,d.lastBaseUpdate=u))}if(s!==null){var p=i.baseState;o=0,d=c=u=null,l=s;do{var g=l.lane,A=l.eventTime;if((r&g)===g){d!==null&&(d=d.next={eventTime:A,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var P=t,x=l;switch(g=e,A=n,x.tag){case 1:if(P=x.payload,typeof P=="function"){p=P.call(A,p,g);break e}p=P;break e;case 3:P.flags=P.flags&-65537|128;case 0:if(P=x.payload,g=typeof P=="function"?P.call(A,p,g):P,g==null)break e;p=Pe({},p,g);break e;case 2:cr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,g=i.effects,g===null?i.effects=[l]:g.push(l))}else A={eventTime:A,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(c=d=A,u=p):d=d.next=A,o|=g;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;g=l,l=g.next,g.next=null,i.lastBaseUpdate=g,i.shared.pending=null}}while(!0);if(d===null&&(u=p),i.baseState=u,i.firstBaseUpdate=c,i.lastBaseUpdate=d,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);vi|=o,t.lanes=o,t.memoizedState=p}}function Um(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(j(191,i));i.call(r)}}}var _a={},_n=$r(_a),Go=$r(_a),Qo=$r(_a);function li(t){if(t===_a)throw Error(j(174));return t}function bf(t,e){switch(we(Qo,e),we(Go,t),we(_n,_a),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:qh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=qh(e,t)}Se(_n),we(_n,e)}function vs(){Se(_n),Se(Go),Se(Qo)}function Tw(t){li(Qo.current);var e=li(_n.current),n=qh(e,t.type);e!==n&&(we(Go,t),we(_n,n))}function Nf(t){Go.current===t&&(Se(_n),Se(Go))}var Re=$r(0);function tu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var lh=[];function Df(){for(var t=0;t<lh.length;t++)lh[t]._workInProgressVersionPrimary=null;lh.length=0}var Il=er.ReactCurrentDispatcher,uh=er.ReactCurrentBatchConfig,_i=0,Ce=null,We=null,Qe=null,nu=!1,Co=!1,Yo=0,Zk=0;function st(){throw Error(j(321))}function Of(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!on(t[n],e[n]))return!1;return!0}function Vf(t,e,n,r,i,s){if(_i=s,Ce=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Il.current=t===null||t.memoizedState===null?rA:iA,t=n(r,i),Co){s=0;do{if(Co=!1,Yo=0,25<=s)throw Error(j(301));s+=1,Qe=We=null,e.updateQueue=null,Il.current=sA,t=n(r,i)}while(Co)}if(Il.current=ru,e=We!==null&&We.next!==null,_i=0,Qe=We=Ce=null,nu=!1,e)throw Error(j(300));return t}function Lf(){var t=Yo!==0;return Yo=0,t}function pn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qe===null?Ce.memoizedState=Qe=t:Qe=Qe.next=t,Qe}function Gt(){if(We===null){var t=Ce.alternate;t=t!==null?t.memoizedState:null}else t=We.next;var e=Qe===null?Ce.memoizedState:Qe.next;if(e!==null)Qe=e,We=t;else{if(t===null)throw Error(j(310));We=t,t={memoizedState:We.memoizedState,baseState:We.baseState,baseQueue:We.baseQueue,queue:We.queue,next:null},Qe===null?Ce.memoizedState=Qe=t:Qe=Qe.next=t}return Qe}function Jo(t,e){return typeof e=="function"?e(t):e}function ch(t){var e=Gt(),n=e.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=t;var r=We,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,c=s;do{var d=c.lane;if((_i&d)===d)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var p={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=p,o=r):u=u.next=p,Ce.lanes|=d,vi|=d}c=c.next}while(c!==null&&c!==s);u===null?o=r:u.next=l,on(r,e.memoizedState)||(Rt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,Ce.lanes|=s,vi|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function hh(t){var e=Gt(),n=e.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);on(s,e.memoizedState)||(Rt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function Iw(){}function Sw(t,e){var n=Ce,r=Gt(),i=e(),s=!on(r.memoizedState,i);if(s&&(r.memoizedState=i,Rt=!0),r=r.queue,Mf(Rw.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Qe!==null&&Qe.memoizedState.tag&1){if(n.flags|=2048,Xo(9,Aw.bind(null,n,r,i,e),void 0,null),Je===null)throw Error(j(349));_i&30||kw(n,e,i)}return i}function kw(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ce.updateQueue,e===null?(e={lastEffect:null,stores:null},Ce.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Aw(t,e,n,r){e.value=n,e.getSnapshot=r,Cw(e)&&Pw(t)}function Rw(t,e,n){return n(function(){Cw(e)&&Pw(t)})}function Cw(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!on(t,n)}catch{return!0}}function Pw(t){var e=Kn(t,1);e!==null&&nn(e,t,1,-1)}function zm(t){var e=pn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Jo,lastRenderedState:t},e.queue=t,t=t.dispatch=nA.bind(null,Ce,t),[e.memoizedState,t]}function Xo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Ce.updateQueue,e===null?(e={lastEffect:null,stores:null},Ce.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function xw(){return Gt().memoizedState}function Sl(t,e,n,r){var i=pn();Ce.flags|=t,i.memoizedState=Xo(1|e,n,void 0,r===void 0?null:r)}function Uu(t,e,n,r){var i=Gt();r=r===void 0?null:r;var s=void 0;if(We!==null){var o=We.memoizedState;if(s=o.destroy,r!==null&&Of(r,o.deps)){i.memoizedState=Xo(e,n,s,r);return}}Ce.flags|=t,i.memoizedState=Xo(1|e,n,s,r)}function Bm(t,e){return Sl(8390656,8,t,e)}function Mf(t,e){return Uu(2048,8,t,e)}function bw(t,e){return Uu(4,2,t,e)}function Nw(t,e){return Uu(4,4,t,e)}function Dw(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ow(t,e,n){return n=n!=null?n.concat([t]):null,Uu(4,4,Dw.bind(null,e,t),n)}function Ff(){}function Vw(t,e){var n=Gt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Of(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Lw(t,e){var n=Gt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Of(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Mw(t,e,n){return _i&21?(on(n,e)||(n=Bv(),Ce.lanes|=n,vi|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Rt=!0),t.memoizedState=n)}function eA(t,e){var n=ge;ge=n!==0&&4>n?n:4,t(!0);var r=uh.transition;uh.transition={};try{t(!1),e()}finally{ge=n,uh.transition=r}}function Fw(){return Gt().memoizedState}function tA(t,e,n){var r=Cr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},jw(t))Uw(e,n);else if(n=ww(t,e,n,r),n!==null){var i=wt();nn(n,t,r,i),zw(n,e,r)}}function nA(t,e,n){var r=Cr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(jw(t))Uw(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,on(l,o)){var u=e.interleaved;u===null?(i.next=i,Pf(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=ww(t,e,i,r),n!==null&&(i=wt(),nn(n,t,r,i),zw(n,e,r))}}function jw(t){var e=t.alternate;return t===Ce||e!==null&&e===Ce}function Uw(t,e){Co=nu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function zw(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,gf(t,n)}}var ru={readContext:Kt,useCallback:st,useContext:st,useEffect:st,useImperativeHandle:st,useInsertionEffect:st,useLayoutEffect:st,useMemo:st,useReducer:st,useRef:st,useState:st,useDebugValue:st,useDeferredValue:st,useTransition:st,useMutableSource:st,useSyncExternalStore:st,useId:st,unstable_isNewReconciler:!1},rA={readContext:Kt,useCallback:function(t,e){return pn().memoizedState=[t,e===void 0?null:e],t},useContext:Kt,useEffect:Bm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Sl(4194308,4,Dw.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Sl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Sl(4,2,t,e)},useMemo:function(t,e){var n=pn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=pn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=tA.bind(null,Ce,t),[r.memoizedState,t]},useRef:function(t){var e=pn();return t={current:t},e.memoizedState=t},useState:zm,useDebugValue:Ff,useDeferredValue:function(t){return pn().memoizedState=t},useTransition:function(){var t=zm(!1),e=t[0];return t=eA.bind(null,t[1]),pn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Ce,i=pn();if(Ae){if(n===void 0)throw Error(j(407));n=n()}else{if(n=e(),Je===null)throw Error(j(349));_i&30||kw(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Bm(Rw.bind(null,r,s,t),[t]),r.flags|=2048,Xo(9,Aw.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=pn(),e=Je.identifierPrefix;if(Ae){var n=jn,r=Fn;n=(r&~(1<<32-tn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Yo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Zk++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},iA={readContext:Kt,useCallback:Vw,useContext:Kt,useEffect:Mf,useImperativeHandle:Ow,useInsertionEffect:bw,useLayoutEffect:Nw,useMemo:Lw,useReducer:ch,useRef:xw,useState:function(){return ch(Jo)},useDebugValue:Ff,useDeferredValue:function(t){var e=Gt();return Mw(e,We.memoizedState,t)},useTransition:function(){var t=ch(Jo)[0],e=Gt().memoizedState;return[t,e]},useMutableSource:Iw,useSyncExternalStore:Sw,useId:Fw,unstable_isNewReconciler:!1},sA={readContext:Kt,useCallback:Vw,useContext:Kt,useEffect:Mf,useImperativeHandle:Ow,useInsertionEffect:bw,useLayoutEffect:Nw,useMemo:Lw,useReducer:hh,useRef:xw,useState:function(){return hh(Jo)},useDebugValue:Ff,useDeferredValue:function(t){var e=Gt();return We===null?e.memoizedState=t:Mw(e,We.memoizedState,t)},useTransition:function(){var t=hh(Jo)[0],e=Gt().memoizedState;return[t,e]},useMutableSource:Iw,useSyncExternalStore:Sw,useId:Fw,unstable_isNewReconciler:!1};function Yt(t,e){if(t&&t.defaultProps){e=Pe({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function dd(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Pe({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var zu={isMounted:function(t){return(t=t._reactInternals)?bi(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=wt(),i=Cr(t),s=Bn(r,i);s.payload=e,n!=null&&(s.callback=n),e=Ar(t,s,i),e!==null&&(nn(e,t,i,r),Tl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=wt(),i=Cr(t),s=Bn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Ar(t,s,i),e!==null&&(nn(e,t,i,r),Tl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=wt(),r=Cr(t),i=Bn(n,r);i.tag=2,e!=null&&(i.callback=e),e=Ar(t,i,r),e!==null&&(nn(e,t,r,n),Tl(e,t,r))}};function $m(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!Wo(n,r)||!Wo(i,s):!0}function Bw(t,e,n){var r=!1,i=Vr,s=e.contextType;return typeof s=="object"&&s!==null?s=Kt(s):(i=Pt(e)?mi:ft.current,r=e.contextTypes,s=(r=r!=null)?ms(t,i):Vr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=zu,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Wm(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&zu.enqueueReplaceState(e,e.state,null)}function fd(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},xf(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Kt(s):(s=Pt(e)?mi:ft.current,i.context=ms(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(dd(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&zu.enqueueReplaceState(i,i.state,null),eu(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function ws(t,e){try{var n="",r=e;do n+=DS(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function dh(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function pd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var oA=typeof WeakMap=="function"?WeakMap:Map;function $w(t,e,n){n=Bn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){su||(su=!0,Sd=r),pd(t,e)},n}function Ww(t,e,n){n=Bn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){pd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){pd(t,e),typeof r!="function"&&(Rr===null?Rr=new Set([this]):Rr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function qm(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new oA;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=wA.bind(null,t,e,n),e.then(t,t))}function Hm(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Km(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Bn(-1,1),e.tag=2,Ar(n,e,1))),n.lanes|=1),t)}var aA=er.ReactCurrentOwner,Rt=!1;function _t(t,e,n,r){e.child=t===null?vw(e,null,n,r):_s(e,t.child,n,r)}function Gm(t,e,n,r,i){n=n.render;var s=e.ref;return ls(e,i),r=Vf(t,e,n,r,s,i),n=Lf(),t!==null&&!Rt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Gn(t,e,i)):(Ae&&n&&If(e),e.flags|=1,_t(t,e,r,i),e.child)}function Qm(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Hf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,qw(t,e,s,r,i)):(t=Cl(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Wo,n(o,r)&&t.ref===e.ref)return Gn(t,e,i)}return e.flags|=1,t=Pr(s,r),t.ref=e.ref,t.return=e,e.child=t}function qw(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(Wo(s,r)&&t.ref===e.ref)if(Rt=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(Rt=!0);else return e.lanes=t.lanes,Gn(t,e,i)}return gd(t,e,n,r,i)}function Hw(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},we(ns,Nt),Nt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,we(ns,Nt),Nt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,we(ns,Nt),Nt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,we(ns,Nt),Nt|=r;return _t(t,e,i,n),e.child}function Kw(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function gd(t,e,n,r,i){var s=Pt(n)?mi:ft.current;return s=ms(e,s),ls(e,i),n=Vf(t,e,n,r,s,i),r=Lf(),t!==null&&!Rt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Gn(t,e,i)):(Ae&&r&&If(e),e.flags|=1,_t(t,e,n,i),e.child)}function Ym(t,e,n,r,i){if(Pt(n)){var s=!0;Ql(e)}else s=!1;if(ls(e,i),e.stateNode===null)kl(t,e),Bw(e,n,r),fd(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Kt(c):(c=Pt(n)?mi:ft.current,c=ms(e,c));var d=n.getDerivedStateFromProps,p=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==c)&&Wm(e,o,r,c),cr=!1;var g=e.memoizedState;o.state=g,eu(e,r,o,i),u=e.memoizedState,l!==r||g!==u||Ct.current||cr?(typeof d=="function"&&(dd(e,n,d,r),u=e.memoizedState),(l=cr||$m(e,n,l,r,g,u,c))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Ew(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:Yt(e.type,l),o.props=c,p=e.pendingProps,g=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Kt(u):(u=Pt(n)?mi:ft.current,u=ms(e,u));var A=n.getDerivedStateFromProps;(d=typeof A=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==p||g!==u)&&Wm(e,o,r,u),cr=!1,g=e.memoizedState,o.state=g,eu(e,r,o,i);var P=e.memoizedState;l!==p||g!==P||Ct.current||cr?(typeof A=="function"&&(dd(e,n,A,r),P=e.memoizedState),(c=cr||$m(e,n,c,r,g,P,u)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,P,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,P,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=P),o.props=r,o.state=P,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return md(t,e,n,r,s,i)}function md(t,e,n,r,i,s){Kw(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Vm(e,n,!1),Gn(t,e,s);r=e.stateNode,aA.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=_s(e,t.child,null,s),e.child=_s(e,null,l,s)):_t(t,e,l,s),e.memoizedState=r.state,i&&Vm(e,n,!0),e.child}function Gw(t){var e=t.stateNode;e.pendingContext?Om(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Om(t,e.context,!1),bf(t,e.containerInfo)}function Jm(t,e,n,r,i){return ys(),kf(i),e.flags|=256,_t(t,e,n,r),e.child}var yd={dehydrated:null,treeContext:null,retryLane:0};function _d(t){return{baseLanes:t,cachePool:null,transitions:null}}function Qw(t,e,n){var r=e.pendingProps,i=Re.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),we(Re,i&1),t===null)return cd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Wu(o,r,0,null),t=di(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=_d(n),e.memoizedState=yd,t):jf(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return lA(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Pr(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=Pr(l,s):(s=di(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?_d(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=yd,r}return s=t.child,t=s.sibling,r=Pr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function jf(t,e){return e=Wu({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function al(t,e,n,r){return r!==null&&kf(r),_s(e,t.child,null,n),t=jf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function lA(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=dh(Error(j(422))),al(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Wu({mode:"visible",children:r.children},i,0,null),s=di(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&_s(e,t.child,null,o),e.child.memoizedState=_d(o),e.memoizedState=yd,s);if(!(e.mode&1))return al(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(j(419)),r=dh(s,r,void 0),al(t,e,o,r)}if(l=(o&t.childLanes)!==0,Rt||l){if(r=Je,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Kn(t,i),nn(r,t,i,-1))}return qf(),r=dh(Error(j(421))),al(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=EA.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Dt=kr(i.nextSibling),Vt=e,Ae=!0,Xt=null,t!==null&&(Ut[zt++]=Fn,Ut[zt++]=jn,Ut[zt++]=yi,Fn=t.id,jn=t.overflow,yi=e),e=jf(e,r.children),e.flags|=4096,e)}function Xm(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),hd(t.return,e,n)}function fh(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function Yw(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(_t(t,e,r.children,n),r=Re.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Xm(t,n,e);else if(t.tag===19)Xm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(we(Re,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&tu(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),fh(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&tu(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}fh(e,!0,n,null,s);break;case"together":fh(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function kl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Gn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),vi|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(j(153));if(e.child!==null){for(t=e.child,n=Pr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Pr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function uA(t,e,n){switch(e.tag){case 3:Gw(e),ys();break;case 5:Tw(e);break;case 1:Pt(e.type)&&Ql(e);break;case 4:bf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;we(Xl,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(we(Re,Re.current&1),e.flags|=128,null):n&e.child.childLanes?Qw(t,e,n):(we(Re,Re.current&1),t=Gn(t,e,n),t!==null?t.sibling:null);we(Re,Re.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Yw(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),we(Re,Re.current),r)break;return null;case 22:case 23:return e.lanes=0,Hw(t,e,n)}return Gn(t,e,n)}var Jw,vd,Xw,Zw;Jw=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};vd=function(){};Xw=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,li(_n.current);var s=null;switch(n){case"input":i=zh(t,i),r=zh(t,r),s=[];break;case"select":i=Pe({},i,{value:void 0}),r=Pe({},r,{value:void 0}),s=[];break;case"textarea":i=Wh(t,i),r=Wh(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Kl)}Hh(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var l=i[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Mo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var u=r[c];if(l=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Mo.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&Te("scroll",t),s||l===u||(s=[])):(s=s||[]).push(c,u))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Zw=function(t,e,n,r){n!==r&&(e.flags|=4)};function uo(t,e){if(!Ae)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function cA(t,e,n){var r=e.pendingProps;switch(Sf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ot(e),null;case 1:return Pt(e.type)&&Gl(),ot(e),null;case 3:return r=e.stateNode,vs(),Se(Ct),Se(ft),Df(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(sl(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Xt!==null&&(Rd(Xt),Xt=null))),vd(t,e),ot(e),null;case 5:Nf(e);var i=li(Qo.current);if(n=e.type,t!==null&&e.stateNode!=null)Xw(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(j(166));return ot(e),null}if(t=li(_n.current),sl(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[mn]=e,r[Ko]=s,t=(e.mode&1)!==0,n){case"dialog":Te("cancel",r),Te("close",r);break;case"iframe":case"object":case"embed":Te("load",r);break;case"video":case"audio":for(i=0;i<mo.length;i++)Te(mo[i],r);break;case"source":Te("error",r);break;case"img":case"image":case"link":Te("error",r),Te("load",r);break;case"details":Te("toggle",r);break;case"input":am(r,s),Te("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Te("invalid",r);break;case"textarea":um(r,s),Te("invalid",r)}Hh(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&il(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&il(r.textContent,l,t),i=["children",""+l]):Mo.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&Te("scroll",r)}switch(n){case"input":Ya(r),lm(r,s,!0);break;case"textarea":Ya(r),cm(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Kl)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Rv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[mn]=e,t[Ko]=r,Jw(t,e,!1,!1),e.stateNode=t;e:{switch(o=Kh(n,r),n){case"dialog":Te("cancel",t),Te("close",t),i=r;break;case"iframe":case"object":case"embed":Te("load",t),i=r;break;case"video":case"audio":for(i=0;i<mo.length;i++)Te(mo[i],t);i=r;break;case"source":Te("error",t),i=r;break;case"img":case"image":case"link":Te("error",t),Te("load",t),i=r;break;case"details":Te("toggle",t),i=r;break;case"input":am(t,r),i=zh(t,r),Te("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Pe({},r,{value:void 0}),Te("invalid",t);break;case"textarea":um(t,r),i=Wh(t,r),Te("invalid",t);break;default:i=r}Hh(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?xv(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Cv(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Fo(t,u):typeof u=="number"&&Fo(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Mo.hasOwnProperty(s)?u!=null&&s==="onScroll"&&Te("scroll",t):u!=null&&uf(t,s,u,o))}switch(n){case"input":Ya(t),lm(t,r,!1);break;case"textarea":Ya(t),cm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Or(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?is(t,!!r.multiple,s,!1):r.defaultValue!=null&&is(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Kl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return ot(e),null;case 6:if(t&&e.stateNode!=null)Zw(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(j(166));if(n=li(Qo.current),li(_n.current),sl(e)){if(r=e.stateNode,n=e.memoizedProps,r[mn]=e,(s=r.nodeValue!==n)&&(t=Vt,t!==null))switch(t.tag){case 3:il(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&il(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[mn]=e,e.stateNode=r}return ot(e),null;case 13:if(Se(Re),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ae&&Dt!==null&&e.mode&1&&!(e.flags&128))yw(),ys(),e.flags|=98560,s=!1;else if(s=sl(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(j(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(j(317));s[mn]=e}else ys(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;ot(e),s=!1}else Xt!==null&&(Rd(Xt),Xt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Re.current&1?qe===0&&(qe=3):qf())),e.updateQueue!==null&&(e.flags|=4),ot(e),null);case 4:return vs(),vd(t,e),t===null&&qo(e.stateNode.containerInfo),ot(e),null;case 10:return Cf(e.type._context),ot(e),null;case 17:return Pt(e.type)&&Gl(),ot(e),null;case 19:if(Se(Re),s=e.memoizedState,s===null)return ot(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)uo(s,!1);else{if(qe!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=tu(t),o!==null){for(e.flags|=128,uo(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return we(Re,Re.current&1|2),e.child}t=t.sibling}s.tail!==null&&Me()>Es&&(e.flags|=128,r=!0,uo(s,!1),e.lanes=4194304)}else{if(!r)if(t=tu(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),uo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Ae)return ot(e),null}else 2*Me()-s.renderingStartTime>Es&&n!==1073741824&&(e.flags|=128,r=!0,uo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Me(),e.sibling=null,n=Re.current,we(Re,r?n&1|2:n&1),e):(ot(e),null);case 22:case 23:return Wf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Nt&1073741824&&(ot(e),e.subtreeFlags&6&&(e.flags|=8192)):ot(e),null;case 24:return null;case 25:return null}throw Error(j(156,e.tag))}function hA(t,e){switch(Sf(e),e.tag){case 1:return Pt(e.type)&&Gl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return vs(),Se(Ct),Se(ft),Df(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Nf(e),null;case 13:if(Se(Re),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(j(340));ys()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Se(Re),null;case 4:return vs(),null;case 10:return Cf(e.type._context),null;case 22:case 23:return Wf(),null;case 24:return null;default:return null}}var ll=!1,ut=!1,dA=typeof WeakSet=="function"?WeakSet:Set,H=null;function ts(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ne(t,e,r)}else n.current=null}function wd(t,e,n){try{n()}catch(r){Ne(t,e,r)}}var Zm=!1;function fA(t,e){if(rd=Wl,t=iw(),Tf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,c=0,d=0,p=t,g=null;t:for(;;){for(var A;p!==n||i!==0&&p.nodeType!==3||(l=o+i),p!==s||r!==0&&p.nodeType!==3||(u=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(A=p.firstChild)!==null;)g=p,p=A;for(;;){if(p===t)break t;if(g===n&&++c===i&&(l=o),g===s&&++d===r&&(u=o),(A=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=A}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(id={focusedElem:t,selectionRange:n},Wl=!1,H=e;H!==null;)if(e=H,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,H=t;else for(;H!==null;){e=H;try{var P=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(P!==null){var x=P.memoizedProps,b=P.memoizedState,v=e.stateNode,_=v.getSnapshotBeforeUpdate(e.elementType===e.type?x:Yt(e.type,x),b);v.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(j(163))}}catch(D){Ne(e,e.return,D)}if(t=e.sibling,t!==null){t.return=e.return,H=t;break}H=e.return}return P=Zm,Zm=!1,P}function Po(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&wd(e,n,s)}i=i.next}while(i!==r)}}function Bu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Ed(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function eE(t){var e=t.alternate;e!==null&&(t.alternate=null,eE(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[mn],delete e[Ko],delete e[ad],delete e[Qk],delete e[Yk])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function tE(t){return t.tag===5||t.tag===3||t.tag===4}function ey(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||tE(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Td(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Kl));else if(r!==4&&(t=t.child,t!==null))for(Td(t,e,n),t=t.sibling;t!==null;)Td(t,e,n),t=t.sibling}function Id(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Id(t,e,n),t=t.sibling;t!==null;)Id(t,e,n),t=t.sibling}var Xe=null,Jt=!1;function ar(t,e,n){for(n=n.child;n!==null;)nE(t,e,n),n=n.sibling}function nE(t,e,n){if(yn&&typeof yn.onCommitFiberUnmount=="function")try{yn.onCommitFiberUnmount(Ou,n)}catch{}switch(n.tag){case 5:ut||ts(n,e);case 6:var r=Xe,i=Jt;Xe=null,ar(t,e,n),Xe=r,Jt=i,Xe!==null&&(Jt?(t=Xe,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Xe.removeChild(n.stateNode));break;case 18:Xe!==null&&(Jt?(t=Xe,n=n.stateNode,t.nodeType===8?oh(t.parentNode,n):t.nodeType===1&&oh(t,n),Bo(t)):oh(Xe,n.stateNode));break;case 4:r=Xe,i=Jt,Xe=n.stateNode.containerInfo,Jt=!0,ar(t,e,n),Xe=r,Jt=i;break;case 0:case 11:case 14:case 15:if(!ut&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&wd(n,e,o),i=i.next}while(i!==r)}ar(t,e,n);break;case 1:if(!ut&&(ts(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Ne(n,e,l)}ar(t,e,n);break;case 21:ar(t,e,n);break;case 22:n.mode&1?(ut=(r=ut)||n.memoizedState!==null,ar(t,e,n),ut=r):ar(t,e,n);break;default:ar(t,e,n)}}function ty(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new dA),e.forEach(function(r){var i=TA.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Qt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Xe=l.stateNode,Jt=!1;break e;case 3:Xe=l.stateNode.containerInfo,Jt=!0;break e;case 4:Xe=l.stateNode.containerInfo,Jt=!0;break e}l=l.return}if(Xe===null)throw Error(j(160));nE(s,o,i),Xe=null,Jt=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(c){Ne(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)rE(e,t),e=e.sibling}function rE(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Qt(e,t),fn(t),r&4){try{Po(3,t,t.return),Bu(3,t)}catch(x){Ne(t,t.return,x)}try{Po(5,t,t.return)}catch(x){Ne(t,t.return,x)}}break;case 1:Qt(e,t),fn(t),r&512&&n!==null&&ts(n,n.return);break;case 5:if(Qt(e,t),fn(t),r&512&&n!==null&&ts(n,n.return),t.flags&32){var i=t.stateNode;try{Fo(i,"")}catch(x){Ne(t,t.return,x)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&kv(i,s),Kh(l,o);var c=Kh(l,s);for(o=0;o<u.length;o+=2){var d=u[o],p=u[o+1];d==="style"?xv(i,p):d==="dangerouslySetInnerHTML"?Cv(i,p):d==="children"?Fo(i,p):uf(i,d,p,c)}switch(l){case"input":Bh(i,s);break;case"textarea":Av(i,s);break;case"select":var g=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var A=s.value;A!=null?is(i,!!s.multiple,A,!1):g!==!!s.multiple&&(s.defaultValue!=null?is(i,!!s.multiple,s.defaultValue,!0):is(i,!!s.multiple,s.multiple?[]:"",!1))}i[Ko]=s}catch(x){Ne(t,t.return,x)}}break;case 6:if(Qt(e,t),fn(t),r&4){if(t.stateNode===null)throw Error(j(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(x){Ne(t,t.return,x)}}break;case 3:if(Qt(e,t),fn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Bo(e.containerInfo)}catch(x){Ne(t,t.return,x)}break;case 4:Qt(e,t),fn(t);break;case 13:Qt(e,t),fn(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Bf=Me())),r&4&&ty(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(ut=(c=ut)||d,Qt(e,t),ut=c):Qt(e,t),fn(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(H=t,d=t.child;d!==null;){for(p=H=d;H!==null;){switch(g=H,A=g.child,g.tag){case 0:case 11:case 14:case 15:Po(4,g,g.return);break;case 1:ts(g,g.return);var P=g.stateNode;if(typeof P.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,P.props=e.memoizedProps,P.state=e.memoizedState,P.componentWillUnmount()}catch(x){Ne(r,n,x)}}break;case 5:ts(g,g.return);break;case 22:if(g.memoizedState!==null){ry(p);continue}}A!==null?(A.return=g,H=A):ry(p)}d=d.sibling}e:for(d=null,p=t;;){if(p.tag===5){if(d===null){d=p;try{i=p.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=p.stateNode,u=p.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Pv("display",o))}catch(x){Ne(t,t.return,x)}}}else if(p.tag===6){if(d===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(x){Ne(t,t.return,x)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;d===p&&(d=null),p=p.return}d===p&&(d=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Qt(e,t),fn(t),r&4&&ty(t);break;case 21:break;default:Qt(e,t),fn(t)}}function fn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(tE(n)){var r=n;break e}n=n.return}throw Error(j(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Fo(i,""),r.flags&=-33);var s=ey(t);Id(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=ey(t);Td(t,l,o);break;default:throw Error(j(161))}}catch(u){Ne(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function pA(t,e,n){H=t,iE(t)}function iE(t,e,n){for(var r=(t.mode&1)!==0;H!==null;){var i=H,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ll;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||ut;l=ll;var c=ut;if(ll=o,(ut=u)&&!c)for(H=i;H!==null;)o=H,u=o.child,o.tag===22&&o.memoizedState!==null?iy(i):u!==null?(u.return=o,H=u):iy(i);for(;s!==null;)H=s,iE(s),s=s.sibling;H=i,ll=l,ut=c}ny(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,H=s):ny(t)}}function ny(t){for(;H!==null;){var e=H;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ut||Bu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!ut)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Yt(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Um(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Um(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var p=d.dehydrated;p!==null&&Bo(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(j(163))}ut||e.flags&512&&Ed(e)}catch(g){Ne(e,e.return,g)}}if(e===t){H=null;break}if(n=e.sibling,n!==null){n.return=e.return,H=n;break}H=e.return}}function ry(t){for(;H!==null;){var e=H;if(e===t){H=null;break}var n=e.sibling;if(n!==null){n.return=e.return,H=n;break}H=e.return}}function iy(t){for(;H!==null;){var e=H;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Bu(4,e)}catch(u){Ne(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Ne(e,i,u)}}var s=e.return;try{Ed(e)}catch(u){Ne(e,s,u)}break;case 5:var o=e.return;try{Ed(e)}catch(u){Ne(e,o,u)}}}catch(u){Ne(e,e.return,u)}if(e===t){H=null;break}var l=e.sibling;if(l!==null){l.return=e.return,H=l;break}H=e.return}}var gA=Math.ceil,iu=er.ReactCurrentDispatcher,Uf=er.ReactCurrentOwner,Wt=er.ReactCurrentBatchConfig,fe=0,Je=null,je=null,tt=0,Nt=0,ns=$r(0),qe=0,Zo=null,vi=0,$u=0,zf=0,xo=null,At=null,Bf=0,Es=1/0,Vn=null,su=!1,Sd=null,Rr=null,ul=!1,vr=null,ou=0,bo=0,kd=null,Al=-1,Rl=0;function wt(){return fe&6?Me():Al!==-1?Al:Al=Me()}function Cr(t){return t.mode&1?fe&2&&tt!==0?tt&-tt:Xk.transition!==null?(Rl===0&&(Rl=Bv()),Rl):(t=ge,t!==0||(t=window.event,t=t===void 0?16:Qv(t.type)),t):1}function nn(t,e,n,r){if(50<bo)throw bo=0,kd=null,Error(j(185));ga(t,n,r),(!(fe&2)||t!==Je)&&(t===Je&&(!(fe&2)&&($u|=n),qe===4&&dr(t,tt)),xt(t,r),n===1&&fe===0&&!(e.mode&1)&&(Es=Me()+500,ju&&Wr()))}function xt(t,e){var n=t.callbackNode;XS(t,e);var r=$l(t,t===Je?tt:0);if(r===0)n!==null&&fm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&fm(n),e===1)t.tag===0?Jk(sy.bind(null,t)):pw(sy.bind(null,t)),Kk(function(){!(fe&6)&&Wr()}),n=null;else{switch($v(r)){case 1:n=pf;break;case 4:n=Uv;break;case 16:n=Bl;break;case 536870912:n=zv;break;default:n=Bl}n=dE(n,sE.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function sE(t,e){if(Al=-1,Rl=0,fe&6)throw Error(j(327));var n=t.callbackNode;if(us()&&t.callbackNode!==n)return null;var r=$l(t,t===Je?tt:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=au(t,r);else{e=r;var i=fe;fe|=2;var s=aE();(Je!==t||tt!==e)&&(Vn=null,Es=Me()+500,hi(t,e));do try{_A();break}catch(l){oE(t,l)}while(!0);Rf(),iu.current=s,fe=i,je!==null?e=0:(Je=null,tt=0,e=qe)}if(e!==0){if(e===2&&(i=Xh(t),i!==0&&(r=i,e=Ad(t,i))),e===1)throw n=Zo,hi(t,0),dr(t,r),xt(t,Me()),n;if(e===6)dr(t,r);else{if(i=t.current.alternate,!(r&30)&&!mA(i)&&(e=au(t,r),e===2&&(s=Xh(t),s!==0&&(r=s,e=Ad(t,s))),e===1))throw n=Zo,hi(t,0),dr(t,r),xt(t,Me()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(j(345));case 2:ii(t,At,Vn);break;case 3:if(dr(t,r),(r&130023424)===r&&(e=Bf+500-Me(),10<e)){if($l(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){wt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=od(ii.bind(null,t,At,Vn),e);break}ii(t,At,Vn);break;case 4:if(dr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-tn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Me()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*gA(r/1960))-r,10<r){t.timeoutHandle=od(ii.bind(null,t,At,Vn),r);break}ii(t,At,Vn);break;case 5:ii(t,At,Vn);break;default:throw Error(j(329))}}}return xt(t,Me()),t.callbackNode===n?sE.bind(null,t):null}function Ad(t,e){var n=xo;return t.current.memoizedState.isDehydrated&&(hi(t,e).flags|=256),t=au(t,e),t!==2&&(e=At,At=n,e!==null&&Rd(e)),t}function Rd(t){At===null?At=t:At.push.apply(At,t)}function mA(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!on(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function dr(t,e){for(e&=~zf,e&=~$u,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-tn(e),r=1<<n;t[n]=-1,e&=~r}}function sy(t){if(fe&6)throw Error(j(327));us();var e=$l(t,0);if(!(e&1))return xt(t,Me()),null;var n=au(t,e);if(t.tag!==0&&n===2){var r=Xh(t);r!==0&&(e=r,n=Ad(t,r))}if(n===1)throw n=Zo,hi(t,0),dr(t,e),xt(t,Me()),n;if(n===6)throw Error(j(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,ii(t,At,Vn),xt(t,Me()),null}function $f(t,e){var n=fe;fe|=1;try{return t(e)}finally{fe=n,fe===0&&(Es=Me()+500,ju&&Wr())}}function wi(t){vr!==null&&vr.tag===0&&!(fe&6)&&us();var e=fe;fe|=1;var n=Wt.transition,r=ge;try{if(Wt.transition=null,ge=1,t)return t()}finally{ge=r,Wt.transition=n,fe=e,!(fe&6)&&Wr()}}function Wf(){Nt=ns.current,Se(ns)}function hi(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Hk(n)),je!==null)for(n=je.return;n!==null;){var r=n;switch(Sf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Gl();break;case 3:vs(),Se(Ct),Se(ft),Df();break;case 5:Nf(r);break;case 4:vs();break;case 13:Se(Re);break;case 19:Se(Re);break;case 10:Cf(r.type._context);break;case 22:case 23:Wf()}n=n.return}if(Je=t,je=t=Pr(t.current,null),tt=Nt=e,qe=0,Zo=null,zf=$u=vi=0,At=xo=null,ai!==null){for(e=0;e<ai.length;e++)if(n=ai[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}ai=null}return t}function oE(t,e){do{var n=je;try{if(Rf(),Il.current=ru,nu){for(var r=Ce.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}nu=!1}if(_i=0,Qe=We=Ce=null,Co=!1,Yo=0,Uf.current=null,n===null||n.return===null){qe=1,Zo=e,je=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=tt,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,d=l,p=d.tag;if(!(d.mode&1)&&(p===0||p===11||p===15)){var g=d.alternate;g?(d.updateQueue=g.updateQueue,d.memoizedState=g.memoizedState,d.lanes=g.lanes):(d.updateQueue=null,d.memoizedState=null)}var A=Hm(o);if(A!==null){A.flags&=-257,Km(A,o,l,s,e),A.mode&1&&qm(s,c,e),e=A,u=c;var P=e.updateQueue;if(P===null){var x=new Set;x.add(u),e.updateQueue=x}else P.add(u);break e}else{if(!(e&1)){qm(s,c,e),qf();break e}u=Error(j(426))}}else if(Ae&&l.mode&1){var b=Hm(o);if(b!==null){!(b.flags&65536)&&(b.flags|=256),Km(b,o,l,s,e),kf(ws(u,l));break e}}s=u=ws(u,l),qe!==4&&(qe=2),xo===null?xo=[s]:xo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var v=$w(s,u,e);jm(s,v);break e;case 1:l=u;var _=s.type,S=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(Rr===null||!Rr.has(S)))){s.flags|=65536,e&=-e,s.lanes|=e;var D=Ww(s,l,e);jm(s,D);break e}}s=s.return}while(s!==null)}uE(n)}catch(L){e=L,je===n&&n!==null&&(je=n=n.return);continue}break}while(!0)}function aE(){var t=iu.current;return iu.current=ru,t===null?ru:t}function qf(){(qe===0||qe===3||qe===2)&&(qe=4),Je===null||!(vi&268435455)&&!($u&268435455)||dr(Je,tt)}function au(t,e){var n=fe;fe|=2;var r=aE();(Je!==t||tt!==e)&&(Vn=null,hi(t,e));do try{yA();break}catch(i){oE(t,i)}while(!0);if(Rf(),fe=n,iu.current=r,je!==null)throw Error(j(261));return Je=null,tt=0,qe}function yA(){for(;je!==null;)lE(je)}function _A(){for(;je!==null&&!$S();)lE(je)}function lE(t){var e=hE(t.alternate,t,Nt);t.memoizedProps=t.pendingProps,e===null?uE(t):je=e,Uf.current=null}function uE(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=hA(n,e),n!==null){n.flags&=32767,je=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{qe=6,je=null;return}}else if(n=cA(n,e,Nt),n!==null){je=n;return}if(e=e.sibling,e!==null){je=e;return}je=e=t}while(e!==null);qe===0&&(qe=5)}function ii(t,e,n){var r=ge,i=Wt.transition;try{Wt.transition=null,ge=1,vA(t,e,n,r)}finally{Wt.transition=i,ge=r}return null}function vA(t,e,n,r){do us();while(vr!==null);if(fe&6)throw Error(j(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(j(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(ZS(t,s),t===Je&&(je=Je=null,tt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ul||(ul=!0,dE(Bl,function(){return us(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Wt.transition,Wt.transition=null;var o=ge;ge=1;var l=fe;fe|=4,Uf.current=null,fA(t,n),rE(n,t),jk(id),Wl=!!rd,id=rd=null,t.current=n,pA(n),WS(),fe=l,ge=o,Wt.transition=s}else t.current=n;if(ul&&(ul=!1,vr=t,ou=i),s=t.pendingLanes,s===0&&(Rr=null),KS(n.stateNode),xt(t,Me()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(su)throw su=!1,t=Sd,Sd=null,t;return ou&1&&t.tag!==0&&us(),s=t.pendingLanes,s&1?t===kd?bo++:(bo=0,kd=t):bo=0,Wr(),null}function us(){if(vr!==null){var t=$v(ou),e=Wt.transition,n=ge;try{if(Wt.transition=null,ge=16>t?16:t,vr===null)var r=!1;else{if(t=vr,vr=null,ou=0,fe&6)throw Error(j(331));var i=fe;for(fe|=4,H=t.current;H!==null;){var s=H,o=s.child;if(H.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(H=c;H!==null;){var d=H;switch(d.tag){case 0:case 11:case 15:Po(8,d,s)}var p=d.child;if(p!==null)p.return=d,H=p;else for(;H!==null;){d=H;var g=d.sibling,A=d.return;if(eE(d),d===c){H=null;break}if(g!==null){g.return=A,H=g;break}H=A}}}var P=s.alternate;if(P!==null){var x=P.child;if(x!==null){P.child=null;do{var b=x.sibling;x.sibling=null,x=b}while(x!==null)}}H=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,H=o;else e:for(;H!==null;){if(s=H,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Po(9,s,s.return)}var v=s.sibling;if(v!==null){v.return=s.return,H=v;break e}H=s.return}}var _=t.current;for(H=_;H!==null;){o=H;var S=o.child;if(o.subtreeFlags&2064&&S!==null)S.return=o,H=S;else e:for(o=_;H!==null;){if(l=H,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Bu(9,l)}}catch(L){Ne(l,l.return,L)}if(l===o){H=null;break e}var D=l.sibling;if(D!==null){D.return=l.return,H=D;break e}H=l.return}}if(fe=i,Wr(),yn&&typeof yn.onPostCommitFiberRoot=="function")try{yn.onPostCommitFiberRoot(Ou,t)}catch{}r=!0}return r}finally{ge=n,Wt.transition=e}}return!1}function oy(t,e,n){e=ws(n,e),e=$w(t,e,1),t=Ar(t,e,1),e=wt(),t!==null&&(ga(t,1,e),xt(t,e))}function Ne(t,e,n){if(t.tag===3)oy(t,t,n);else for(;e!==null;){if(e.tag===3){oy(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Rr===null||!Rr.has(r))){t=ws(n,t),t=Ww(e,t,1),e=Ar(e,t,1),t=wt(),e!==null&&(ga(e,1,t),xt(e,t));break}}e=e.return}}function wA(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=wt(),t.pingedLanes|=t.suspendedLanes&n,Je===t&&(tt&n)===n&&(qe===4||qe===3&&(tt&130023424)===tt&&500>Me()-Bf?hi(t,0):zf|=n),xt(t,e)}function cE(t,e){e===0&&(t.mode&1?(e=Za,Za<<=1,!(Za&130023424)&&(Za=4194304)):e=1);var n=wt();t=Kn(t,e),t!==null&&(ga(t,e,n),xt(t,n))}function EA(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),cE(t,n)}function TA(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(j(314))}r!==null&&r.delete(e),cE(t,n)}var hE;hE=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Ct.current)Rt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Rt=!1,uA(t,e,n);Rt=!!(t.flags&131072)}else Rt=!1,Ae&&e.flags&1048576&&gw(e,Jl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;kl(t,e),t=e.pendingProps;var i=ms(e,ft.current);ls(e,n),i=Vf(null,e,r,t,i,n);var s=Lf();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Pt(r)?(s=!0,Ql(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,xf(e),i.updater=zu,e.stateNode=i,i._reactInternals=e,fd(e,r,t,n),e=md(null,e,r,!0,s,n)):(e.tag=0,Ae&&s&&If(e),_t(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(kl(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=SA(r),t=Yt(r,t),i){case 0:e=gd(null,e,r,t,n);break e;case 1:e=Ym(null,e,r,t,n);break e;case 11:e=Gm(null,e,r,t,n);break e;case 14:e=Qm(null,e,r,Yt(r.type,t),n);break e}throw Error(j(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Yt(r,i),gd(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Yt(r,i),Ym(t,e,r,i,n);case 3:e:{if(Gw(e),t===null)throw Error(j(387));r=e.pendingProps,s=e.memoizedState,i=s.element,Ew(t,e),eu(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=ws(Error(j(423)),e),e=Jm(t,e,r,n,i);break e}else if(r!==i){i=ws(Error(j(424)),e),e=Jm(t,e,r,n,i);break e}else for(Dt=kr(e.stateNode.containerInfo.firstChild),Vt=e,Ae=!0,Xt=null,n=vw(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ys(),r===i){e=Gn(t,e,n);break e}_t(t,e,r,n)}e=e.child}return e;case 5:return Tw(e),t===null&&cd(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,sd(r,i)?o=null:s!==null&&sd(r,s)&&(e.flags|=32),Kw(t,e),_t(t,e,o,n),e.child;case 6:return t===null&&cd(e),null;case 13:return Qw(t,e,n);case 4:return bf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=_s(e,null,r,n):_t(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Yt(r,i),Gm(t,e,r,i,n);case 7:return _t(t,e,e.pendingProps,n),e.child;case 8:return _t(t,e,e.pendingProps.children,n),e.child;case 12:return _t(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,we(Xl,r._currentValue),r._currentValue=o,s!==null)if(on(s.value,o)){if(s.children===i.children&&!Ct.current){e=Gn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Bn(-1,n&-n),u.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?u.next=u:(u.next=d.next,d.next=u),c.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),hd(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(j(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),hd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}_t(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,ls(e,n),i=Kt(i),r=r(i),e.flags|=1,_t(t,e,r,n),e.child;case 14:return r=e.type,i=Yt(r,e.pendingProps),i=Yt(r.type,i),Qm(t,e,r,i,n);case 15:return qw(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Yt(r,i),kl(t,e),e.tag=1,Pt(r)?(t=!0,Ql(e)):t=!1,ls(e,n),Bw(e,r,i),fd(e,r,i,n),md(null,e,r,!0,t,n);case 19:return Yw(t,e,n);case 22:return Hw(t,e,n)}throw Error(j(156,e.tag))};function dE(t,e){return jv(t,e)}function IA(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $t(t,e,n,r){return new IA(t,e,n,r)}function Hf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function SA(t){if(typeof t=="function")return Hf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===hf)return 11;if(t===df)return 14}return 2}function Pr(t,e){var n=t.alternate;return n===null?(n=$t(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Cl(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Hf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Hi:return di(n.children,i,s,e);case cf:o=8,i|=8;break;case Mh:return t=$t(12,n,e,i|2),t.elementType=Mh,t.lanes=s,t;case Fh:return t=$t(13,n,e,i),t.elementType=Fh,t.lanes=s,t;case jh:return t=$t(19,n,e,i),t.elementType=jh,t.lanes=s,t;case Tv:return Wu(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case wv:o=10;break e;case Ev:o=9;break e;case hf:o=11;break e;case df:o=14;break e;case ur:o=16,r=null;break e}throw Error(j(130,t==null?t:typeof t,""))}return e=$t(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function di(t,e,n,r){return t=$t(7,t,r,e),t.lanes=n,t}function Wu(t,e,n,r){return t=$t(22,t,r,e),t.elementType=Tv,t.lanes=n,t.stateNode={isHidden:!1},t}function ph(t,e,n){return t=$t(6,t,null,e),t.lanes=n,t}function gh(t,e,n){return e=$t(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function kA(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Qc(0),this.expirationTimes=Qc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qc(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Kf(t,e,n,r,i,s,o,l,u){return t=new kA(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=$t(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},xf(s),t}function AA(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:qi,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function fE(t){if(!t)return Vr;t=t._reactInternals;e:{if(bi(t)!==t||t.tag!==1)throw Error(j(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Pt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(j(171))}if(t.tag===1){var n=t.type;if(Pt(n))return fw(t,n,e)}return e}function pE(t,e,n,r,i,s,o,l,u){return t=Kf(n,r,!0,t,i,s,o,l,u),t.context=fE(null),n=t.current,r=wt(),i=Cr(n),s=Bn(r,i),s.callback=e??null,Ar(n,s,i),t.current.lanes=i,ga(t,i,r),xt(t,r),t}function qu(t,e,n,r){var i=e.current,s=wt(),o=Cr(i);return n=fE(n),e.context===null?e.context=n:e.pendingContext=n,e=Bn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Ar(i,e,o),t!==null&&(nn(t,i,o,s),Tl(t,i,o)),o}function lu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function ay(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Gf(t,e){ay(t,e),(t=t.alternate)&&ay(t,e)}function RA(){return null}var gE=typeof reportError=="function"?reportError:function(t){console.error(t)};function Qf(t){this._internalRoot=t}Hu.prototype.render=Qf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(j(409));qu(t,e,null,null)};Hu.prototype.unmount=Qf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;wi(function(){qu(null,t,null,null)}),e[Hn]=null}};function Hu(t){this._internalRoot=t}Hu.prototype.unstable_scheduleHydration=function(t){if(t){var e=Hv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<hr.length&&e!==0&&e<hr[n].priority;n++);hr.splice(n,0,t),n===0&&Gv(t)}};function Yf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ku(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function ly(){}function CA(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=lu(o);s.call(c)}}var o=pE(e,r,t,0,null,!1,!1,"",ly);return t._reactRootContainer=o,t[Hn]=o.current,qo(t.nodeType===8?t.parentNode:t),wi(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var c=lu(u);l.call(c)}}var u=Kf(t,0,!1,null,null,!1,!1,"",ly);return t._reactRootContainer=u,t[Hn]=u.current,qo(t.nodeType===8?t.parentNode:t),wi(function(){qu(e,u,n,r)}),u}function Gu(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=lu(o);l.call(u)}}qu(e,o,t,i)}else o=CA(n,e,t,i,r);return lu(o)}Wv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=go(e.pendingLanes);n!==0&&(gf(e,n|1),xt(e,Me()),!(fe&6)&&(Es=Me()+500,Wr()))}break;case 13:wi(function(){var r=Kn(t,1);if(r!==null){var i=wt();nn(r,t,1,i)}}),Gf(t,1)}};mf=function(t){if(t.tag===13){var e=Kn(t,134217728);if(e!==null){var n=wt();nn(e,t,134217728,n)}Gf(t,134217728)}};qv=function(t){if(t.tag===13){var e=Cr(t),n=Kn(t,e);if(n!==null){var r=wt();nn(n,t,e,r)}Gf(t,e)}};Hv=function(){return ge};Kv=function(t,e){var n=ge;try{return ge=t,e()}finally{ge=n}};Qh=function(t,e,n){switch(e){case"input":if(Bh(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Fu(r);if(!i)throw Error(j(90));Sv(r),Bh(r,i)}}}break;case"textarea":Av(t,n);break;case"select":e=n.value,e!=null&&is(t,!!n.multiple,e,!1)}};Dv=$f;Ov=wi;var PA={usingClientEntryPoint:!1,Events:[ya,Yi,Fu,bv,Nv,$f]},co={findFiberByHostInstance:oi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},xA={bundleType:co.bundleType,version:co.version,rendererPackageName:co.rendererPackageName,rendererConfig:co.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:er.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Mv(t),t===null?null:t.stateNode},findFiberByHostInstance:co.findFiberByHostInstance||RA,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var cl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!cl.isDisabled&&cl.supportsFiber)try{Ou=cl.inject(xA),yn=cl}catch{}}Mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=PA;Mt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Yf(e))throw Error(j(200));return AA(t,e,null,n)};Mt.createRoot=function(t,e){if(!Yf(t))throw Error(j(299));var n=!1,r="",i=gE;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Kf(t,1,!1,null,null,n,!1,r,i),t[Hn]=e.current,qo(t.nodeType===8?t.parentNode:t),new Qf(e)};Mt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(j(188)):(t=Object.keys(t).join(","),Error(j(268,t)));return t=Mv(e),t=t===null?null:t.stateNode,t};Mt.flushSync=function(t){return wi(t)};Mt.hydrate=function(t,e,n){if(!Ku(e))throw Error(j(200));return Gu(null,t,e,!0,n)};Mt.hydrateRoot=function(t,e,n){if(!Yf(t))throw Error(j(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=gE;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=pE(e,null,t,1,n??null,i,!1,s,o),t[Hn]=e.current,qo(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Hu(e)};Mt.render=function(t,e,n){if(!Ku(e))throw Error(j(200));return Gu(null,t,e,!1,n)};Mt.unmountComponentAtNode=function(t){if(!Ku(t))throw Error(j(40));return t._reactRootContainer?(wi(function(){Gu(null,null,t,!1,function(){t._reactRootContainer=null,t[Hn]=null})}),!0):!1};Mt.unstable_batchedUpdates=$f;Mt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Ku(n))throw Error(j(200));if(t==null||t._reactInternals===void 0)throw Error(j(38));return Gu(t,e,n,!1,r)};Mt.version="18.3.1-next-f1338f8080-20240426";function mE(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mE)}catch(t){console.error(t)}}mE(),mv.exports=Mt;var bA=mv.exports,uy=bA;Vh.createRoot=uy.createRoot,Vh.hydrateRoot=uy.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ea(){return ea=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ea.apply(this,arguments)}var wr;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(wr||(wr={}));const cy="popstate";function NA(t){t===void 0&&(t={});function e(r,i){let{pathname:s,search:o,hash:l}=r.location;return Cd("",{pathname:s,search:o,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:yE(i)}return OA(e,n,null,t)}function Be(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Jf(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function DA(){return Math.random().toString(36).substr(2,8)}function hy(t,e){return{usr:t.state,key:t.key,idx:e}}function Cd(t,e,n,r){return n===void 0&&(n=null),ea({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?Ns(e):e,{state:n,key:e&&e.key||r||DA()})}function yE(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function Ns(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function OA(t,e,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,l=wr.Pop,u=null,c=d();c==null&&(c=0,o.replaceState(ea({},o.state,{idx:c}),""));function d(){return(o.state||{idx:null}).idx}function p(){l=wr.Pop;let b=d(),v=b==null?null:b-c;c=b,u&&u({action:l,location:x.location,delta:v})}function g(b,v){l=wr.Push;let _=Cd(x.location,b,v);c=d()+1;let S=hy(_,c),D=x.createHref(_);try{o.pushState(S,"",D)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;i.location.assign(D)}s&&u&&u({action:l,location:x.location,delta:1})}function A(b,v){l=wr.Replace;let _=Cd(x.location,b,v);c=d();let S=hy(_,c),D=x.createHref(_);o.replaceState(S,"",D),s&&u&&u({action:l,location:x.location,delta:0})}function P(b){let v=i.location.origin!=="null"?i.location.origin:i.location.href,_=typeof b=="string"?b:yE(b);return _=_.replace(/ $/,"%20"),Be(v,"No window.location.(origin|href) available to create URL for href: "+_),new URL(_,v)}let x={get action(){return l},get location(){return t(i,o)},listen(b){if(u)throw new Error("A history only accepts one active listener");return i.addEventListener(cy,p),u=b,()=>{i.removeEventListener(cy,p),u=null}},createHref(b){return e(i,b)},createURL:P,encodeLocation(b){let v=P(b);return{pathname:v.pathname,search:v.search,hash:v.hash}},push:g,replace:A,go(b){return o.go(b)}};return x}var dy;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(dy||(dy={}));function VA(t,e,n){return n===void 0&&(n="/"),LA(t,e,n)}function LA(t,e,n,r){let i=typeof e=="string"?Ns(e):e,s=wE(i.pathname||"/",n);if(s==null)return null;let o=_E(t);MA(o);let l=null;for(let u=0;l==null&&u<o.length;++u){let c=QA(s);l=HA(o[u],c)}return l}function _E(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(s,o,l)=>{let u={relativePath:l===void 0?s.path||"":l,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};u.relativePath.startsWith("/")&&(Be(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=fi([r,u.relativePath]),d=n.concat(u);s.children&&s.children.length>0&&(Be(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),_E(s.children,e,d,c)),!(s.path==null&&!s.index)&&e.push({path:c,score:WA(c,s.index),routesMeta:d})};return t.forEach((s,o)=>{var l;if(s.path===""||!((l=s.path)!=null&&l.includes("?")))i(s,o);else for(let u of vE(s.path))i(s,o,u)}),e}function vE(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=vE(r.join("/")),l=[];return l.push(...o.map(u=>u===""?s:[s,u].join("/"))),i&&l.push(...o),l.map(u=>t.startsWith("/")&&u===""?"/":u)}function MA(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:qA(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const FA=/^:[\w-]+$/,jA=3,UA=2,zA=1,BA=10,$A=-2,fy=t=>t==="*";function WA(t,e){let n=t.split("/"),r=n.length;return n.some(fy)&&(r+=$A),e&&(r+=UA),n.filter(i=>!fy(i)).reduce((i,s)=>i+(FA.test(s)?jA:s===""?zA:BA),r)}function qA(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function HA(t,e,n){let{routesMeta:r}=t,i={},s="/",o=[];for(let l=0;l<r.length;++l){let u=r[l],c=l===r.length-1,d=s==="/"?e:e.slice(s.length)||"/",p=KA({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},d),g=u.route;if(!p)return null;Object.assign(i,p.params),o.push({params:i,pathname:fi([s,p.pathname]),pathnameBase:e1(fi([s,p.pathnameBase])),route:g}),p.pathnameBase!=="/"&&(s=fi([s,p.pathnameBase]))}return o}function KA(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=GA(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:r.reduce((c,d,p)=>{let{paramName:g,isOptional:A}=d;if(g==="*"){let x=l[p]||"";o=s.slice(0,s.length-x.length).replace(/(.)\/+$/,"$1")}const P=l[p];return A&&!P?c[g]=void 0:c[g]=(P||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:t}}function GA(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Jf(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function QA(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Jf(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function wE(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const YA=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,JA=t=>YA.test(t);function XA(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?Ns(t):t,s;if(n)if(JA(n))s=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),Jf(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?s=py(n.substring(1),"/"):s=py(n,e)}else s=e;return{pathname:s,search:t1(r),hash:n1(i)}}function py(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function mh(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ZA(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function EE(t,e){let n=ZA(t);return e?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function TE(t,e,n,r){r===void 0&&(r=!1);let i;typeof t=="string"?i=Ns(t):(i=ea({},t),Be(!i.pathname||!i.pathname.includes("?"),mh("?","pathname","search",i)),Be(!i.pathname||!i.pathname.includes("#"),mh("#","pathname","hash",i)),Be(!i.search||!i.search.includes("#"),mh("#","search","hash",i)));let s=t===""||i.pathname==="",o=s?"/":i.pathname,l;if(o==null)l=n;else{let p=e.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),p-=1;i.pathname=g.join("/")}l=p>=0?e[p]:"/"}let u=XA(i,l),c=o&&o!=="/"&&o.endsWith("/"),d=(s||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||d)&&(u.pathname+="/"),u}const fi=t=>t.join("/").replace(/\/\/+/g,"/"),e1=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),t1=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,n1=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function r1(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const IE=["post","put","patch","delete"];new Set(IE);const i1=["get",...IE];new Set(i1);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ta(){return ta=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ta.apply(this,arguments)}const Xf=V.createContext(null),s1=V.createContext(null),va=V.createContext(null),Qu=V.createContext(null),qr=V.createContext({outlet:null,matches:[],isDataRoute:!1}),SE=V.createContext(null);function wa(){return V.useContext(Qu)!=null}function Ea(){return wa()||Be(!1),V.useContext(Qu).location}function kE(t){V.useContext(va).static||V.useLayoutEffect(t)}function Hr(){let{isDataRoute:t}=V.useContext(qr);return t?_1():o1()}function o1(){wa()||Be(!1);let t=V.useContext(Xf),{basename:e,future:n,navigator:r}=V.useContext(va),{matches:i}=V.useContext(qr),{pathname:s}=Ea(),o=JSON.stringify(EE(i,n.v7_relativeSplatPath)),l=V.useRef(!1);return kE(()=>{l.current=!0}),V.useCallback(function(c,d){if(d===void 0&&(d={}),!l.current)return;if(typeof c=="number"){r.go(c);return}let p=TE(c,JSON.parse(o),s,d.relative==="path");t==null&&e!=="/"&&(p.pathname=p.pathname==="/"?e:fi([e,p.pathname])),(d.replace?r.replace:r.push)(p,d.state,d)},[e,r,o,s,t])}function Zf(){let{matches:t}=V.useContext(qr),e=t[t.length-1];return e?e.params:{}}function a1(t,e){return l1(t,e)}function l1(t,e,n,r){wa()||Be(!1);let{navigator:i}=V.useContext(va),{matches:s}=V.useContext(qr),o=s[s.length-1],l=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let c=Ea(),d;if(e){var p;let b=typeof e=="string"?Ns(e):e;u==="/"||(p=b.pathname)!=null&&p.startsWith(u)||Be(!1),d=b}else d=c;let g=d.pathname||"/",A=g;if(u!=="/"){let b=u.replace(/^\//,"").split("/");A="/"+g.replace(/^\//,"").split("/").slice(b.length).join("/")}let P=VA(t,{pathname:A}),x=f1(P&&P.map(b=>Object.assign({},b,{params:Object.assign({},l,b.params),pathname:fi([u,i.encodeLocation?i.encodeLocation(b.pathname).pathname:b.pathname]),pathnameBase:b.pathnameBase==="/"?u:fi([u,i.encodeLocation?i.encodeLocation(b.pathnameBase).pathname:b.pathnameBase])})),s,n,r);return e&&x?V.createElement(Qu.Provider,{value:{location:ta({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:wr.Pop}},x):x}function u1(){let t=y1(),e=r1(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return V.createElement(V.Fragment,null,V.createElement("h2",null,"Unexpected Application Error!"),V.createElement("h3",{style:{fontStyle:"italic"}},e),n?V.createElement("pre",{style:i},n):null,null)}const c1=V.createElement(u1,null);class h1 extends V.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?V.createElement(qr.Provider,{value:this.props.routeContext},V.createElement(SE.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function d1(t){let{routeContext:e,match:n,children:r}=t,i=V.useContext(Xf);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),V.createElement(qr.Provider,{value:e},r)}function f1(t,e,n,r){var i;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,l=(i=n)==null?void 0:i.errors;if(l!=null){let d=o.findIndex(p=>p.route.id&&(l==null?void 0:l[p.route.id])!==void 0);d>=0||Be(!1),o=o.slice(0,Math.min(o.length,d+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let d=0;d<o.length;d++){let p=o[d];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(c=d),p.route.id){let{loaderData:g,errors:A}=n,P=p.route.loader&&g[p.route.id]===void 0&&(!A||A[p.route.id]===void 0);if(p.route.lazy||P){u=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((d,p,g)=>{let A,P=!1,x=null,b=null;n&&(A=l&&p.route.id?l[p.route.id]:void 0,x=p.route.errorElement||c1,u&&(c<0&&g===0?(v1("route-fallback"),P=!0,b=null):c===g&&(P=!0,b=p.route.hydrateFallbackElement||null)));let v=e.concat(o.slice(0,g+1)),_=()=>{let S;return A?S=x:P?S=b:p.route.Component?S=V.createElement(p.route.Component,null):p.route.element?S=p.route.element:S=d,V.createElement(d1,{match:p,routeContext:{outlet:d,matches:v,isDataRoute:n!=null},children:S})};return n&&(p.route.ErrorBoundary||p.route.errorElement||g===0)?V.createElement(h1,{location:n.location,revalidation:n.revalidation,component:x,error:A,children:_(),routeContext:{outlet:null,matches:v,isDataRoute:!0}}):_()},null)}var AE=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(AE||{}),RE=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(RE||{});function p1(t){let e=V.useContext(Xf);return e||Be(!1),e}function g1(t){let e=V.useContext(s1);return e||Be(!1),e}function m1(t){let e=V.useContext(qr);return e||Be(!1),e}function CE(t){let e=m1(),n=e.matches[e.matches.length-1];return n.route.id||Be(!1),n.route.id}function y1(){var t;let e=V.useContext(SE),n=g1(),r=CE();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function _1(){let{router:t}=p1(AE.UseNavigateStable),e=CE(RE.UseNavigateStable),n=V.useRef(!1);return kE(()=>{n.current=!0}),V.useCallback(function(i,s){s===void 0&&(s={}),n.current&&(typeof i=="number"?t.navigate(i):t.navigate(i,ta({fromRouteId:e},s)))},[t,e])}const gy={};function v1(t,e,n){gy[t]||(gy[t]=!0)}function w1(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function na(t){let{to:e,replace:n,state:r,relative:i}=t;wa()||Be(!1);let{future:s,static:o}=V.useContext(va),{matches:l}=V.useContext(qr),{pathname:u}=Ea(),c=Hr(),d=TE(e,EE(l,s.v7_relativeSplatPath),u,i==="path"),p=JSON.stringify(d);return V.useEffect(()=>c(JSON.parse(p),{replace:n,state:r,relative:i}),[c,p,i,n,r]),null}function On(t){Be(!1)}function E1(t){let{basename:e="/",children:n=null,location:r,navigationType:i=wr.Pop,navigator:s,static:o=!1,future:l}=t;wa()&&Be(!1);let u=e.replace(/^\/*/,"/"),c=V.useMemo(()=>({basename:u,navigator:s,static:o,future:ta({v7_relativeSplatPath:!1},l)}),[u,l,s,o]);typeof r=="string"&&(r=Ns(r));let{pathname:d="/",search:p="",hash:g="",state:A=null,key:P="default"}=r,x=V.useMemo(()=>{let b=wE(d,u);return b==null?null:{location:{pathname:b,search:p,hash:g,state:A,key:P},navigationType:i}},[u,d,p,g,A,P,i]);return x==null?null:V.createElement(va.Provider,{value:c},V.createElement(Qu.Provider,{children:n,value:x}))}function T1(t){let{children:e,location:n}=t;return a1(Pd(e),n)}new Promise(()=>{});function Pd(t,e){e===void 0&&(e=[]);let n=[];return V.Children.forEach(t,(r,i)=>{if(!V.isValidElement(r))return;let s=[...e,i];if(r.type===V.Fragment){n.push.apply(n,Pd(r.props.children,s));return}r.type!==On&&Be(!1),!r.props.index||!r.props.children||Be(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Pd(r.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const I1="6";try{window.__reactRouterVersion=I1}catch{}const S1="startTransition",my=wS[S1];function k1(t){let{basename:e,children:n,future:r,window:i}=t,s=V.useRef();s.current==null&&(s.current=NA({window:i,v5Compat:!0}));let o=s.current,[l,u]=V.useState({action:o.action,location:o.location}),{v7_startTransition:c}=r||{},d=V.useCallback(p=>{c&&my?my(()=>u(p)):u(p)},[u,c]);return V.useLayoutEffect(()=>o.listen(d),[o,d]),V.useEffect(()=>w1(r),[r]),V.createElement(E1,{basename:e,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}var yy;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(yy||(yy={}));var _y;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(_y||(_y={}));const A1=()=>{};var vy={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PE=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},R1=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},xE={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,c=u?t[i+2]:0,d=s>>2,p=(s&3)<<4|l>>4;let g=(l&15)<<2|c>>6,A=c&63;u||(A=64,o||(g=64)),r.push(n[d],n[p],n[g],n[A])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(PE(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):R1(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const p=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||c==null||p==null)throw new C1;const g=s<<2|l>>4;if(r.push(g),c!==64){const A=l<<4&240|c>>2;if(r.push(A),p!==64){const P=c<<6&192|p;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class C1 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const P1=function(t){const e=PE(t);return xE.encodeByteArray(e,!0)},uu=function(t){return P1(t).replace(/\./g,"")},bE=function(t){try{return xE.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x1(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b1=()=>x1().__FIREBASE_DEFAULTS__,N1=()=>{if(typeof process>"u"||typeof vy>"u")return;const t=vy.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},D1=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&bE(t[1]);return e&&JSON.parse(e)},Yu=()=>{try{return A1()||b1()||N1()||D1()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},NE=t=>{var e,n;return(n=(e=Yu())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},O1=t=>{const e=NE(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},DE=()=>{var t;return(t=Yu())==null?void 0:t.config},OE=t=>{var e;return(e=Yu())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V1{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L1(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[uu(JSON.stringify(n)),uu(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function M1(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(pt())}function F1(){var e;const t=(e=Yu())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function j1(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function U1(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function z1(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function B1(){const t=pt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function $1(){return!F1()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function VE(){try{return typeof indexedDB=="object"}catch{return!1}}function LE(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(n){e(n)}})}function W1(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q1="FirebaseError";class Pn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=q1,Object.setPrototypeOf(this,Pn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ni.prototype.create)}}class Ni{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?H1(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Pn(i,l,r)}}function H1(t,e){return t.replace(K1,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const K1=/\{\$([^}]+)}/g;function G1(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Ei(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(wy(s)&&wy(o)){if(!Ei(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function wy(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ta(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function yo(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function _o(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Q1(t,e){const n=new Y1(t,e);return n.subscribe.bind(n)}class Y1{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");J1(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=yh),i.error===void 0&&(i.error=yh),i.complete===void 0&&(i.complete=yh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function J1(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function yh(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ME(t){return(await fetch(t,{credentials:"include"})).ok}class an{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X1{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new V1;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(eR(e))try{this.getOrInitializeService({instanceIdentifier:si})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=si){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=si){return this.instances.has(e)}getOptions(e=si){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Z1(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=si){return this.component?this.component.multipleInstances?e:si:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Z1(t){return t===si?void 0:t}function eR(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tR{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new X1(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oe;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(oe||(oe={}));const nR={debug:oe.DEBUG,verbose:oe.VERBOSE,info:oe.INFO,warn:oe.WARN,error:oe.ERROR,silent:oe.SILENT},rR=oe.INFO,iR={[oe.DEBUG]:"log",[oe.VERBOSE]:"log",[oe.INFO]:"info",[oe.WARN]:"warn",[oe.ERROR]:"error"},sR=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=iR[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ep{constructor(e){this.name=e,this._logLevel=rR,this._logHandler=sR,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in oe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?nR[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,oe.DEBUG,...e),this._logHandler(this,oe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,oe.VERBOSE,...e),this._logHandler(this,oe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,oe.INFO,...e),this._logHandler(this,oe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,oe.WARN,...e),this._logHandler(this,oe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,oe.ERROR,...e),this._logHandler(this,oe.ERROR,...e)}}const oR=(t,e)=>e.some(n=>t instanceof n);let Ey,Ty;function aR(){return Ey||(Ey=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function lR(){return Ty||(Ty=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const FE=new WeakMap,xd=new WeakMap,jE=new WeakMap,_h=new WeakMap,tp=new WeakMap;function uR(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n($n(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&FE.set(n,t)}).catch(()=>{}),tp.set(e,t),e}function cR(t){if(xd.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});xd.set(t,e)}let bd={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return xd.get(t);if(e==="objectStoreNames")return t.objectStoreNames||jE.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return $n(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function hR(t){bd=t(bd)}function dR(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(vh(this),e,...n);return jE.set(r,e.sort?e.sort():[e]),$n(r)}:lR().includes(t)?function(...e){return t.apply(vh(this),e),$n(FE.get(this))}:function(...e){return $n(t.apply(vh(this),e))}}function fR(t){return typeof t=="function"?dR(t):(t instanceof IDBTransaction&&cR(t),oR(t,aR())?new Proxy(t,bd):t)}function $n(t){if(t instanceof IDBRequest)return uR(t);if(_h.has(t))return _h.get(t);const e=fR(t);return e!==t&&(_h.set(t,e),tp.set(e,t)),e}const vh=t=>tp.get(t);function Ju(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=$n(o);return r&&o.addEventListener("upgradeneeded",u=>{r($n(o.result),u.oldVersion,u.newVersion,$n(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}function wh(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",r=>e(r.oldVersion,r)),$n(n).then(()=>{})}const pR=["get","getKey","getAll","getAllKeys","count"],gR=["put","add","delete","clear"],Eh=new Map;function Iy(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Eh.get(e))return Eh.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=gR.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||pR.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&u.done]))[0]};return Eh.set(e,s),s}hR(t=>({...t,get:(e,n,r)=>Iy(e,n)||t.get(e,n,r),has:(e,n)=>!!Iy(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mR{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(yR(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function yR(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Nd="@firebase/app",Sy="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn=new ep("@firebase/app"),_R="@firebase/app-compat",vR="@firebase/analytics-compat",wR="@firebase/analytics",ER="@firebase/app-check-compat",TR="@firebase/app-check",IR="@firebase/auth",SR="@firebase/auth-compat",kR="@firebase/database",AR="@firebase/data-connect",RR="@firebase/database-compat",CR="@firebase/functions",PR="@firebase/functions-compat",xR="@firebase/installations",bR="@firebase/installations-compat",NR="@firebase/messaging",DR="@firebase/messaging-compat",OR="@firebase/performance",VR="@firebase/performance-compat",LR="@firebase/remote-config",MR="@firebase/remote-config-compat",FR="@firebase/storage",jR="@firebase/storage-compat",UR="@firebase/firestore",zR="@firebase/ai",BR="@firebase/firestore-compat",$R="firebase",WR="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd="[DEFAULT]",qR={[Nd]:"fire-core",[_R]:"fire-core-compat",[wR]:"fire-analytics",[vR]:"fire-analytics-compat",[TR]:"fire-app-check",[ER]:"fire-app-check-compat",[IR]:"fire-auth",[SR]:"fire-auth-compat",[kR]:"fire-rtdb",[AR]:"fire-data-connect",[RR]:"fire-rtdb-compat",[CR]:"fire-fn",[PR]:"fire-fn-compat",[xR]:"fire-iid",[bR]:"fire-iid-compat",[NR]:"fire-fcm",[DR]:"fire-fcm-compat",[OR]:"fire-perf",[VR]:"fire-perf-compat",[LR]:"fire-rc",[MR]:"fire-rc-compat",[FR]:"fire-gcs",[jR]:"fire-gcs-compat",[UR]:"fire-fst",[BR]:"fire-fst-compat",[zR]:"fire-vertex","fire-js":"fire-js",[$R]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu=new Map,HR=new Map,Od=new Map;function ky(t,e){try{t.container.addComponent(e)}catch(n){Qn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function An(t){const e=t.name;if(Od.has(e))return Qn.debug(`There were multiple attempts to register component ${e}.`),!1;Od.set(e,t);for(const n of cu.values())ky(n,t);for(const n of HR.values())ky(n,t);return!0}function Ds(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Zt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KR={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},xr=new Ni("app","Firebase",KR);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GR{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new an("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os=WR;function UE(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:Dd,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw xr.create("bad-app-name",{appName:String(i)});if(n||(n=DE()),!n)throw xr.create("no-options");const s=cu.get(i);if(s){if(Ei(n,s.options)&&Ei(r,s.config))return s;throw xr.create("duplicate-app",{appName:i})}const o=new tR(i);for(const u of Od.values())o.addComponent(u);const l=new GR(n,r,o);return cu.set(i,l),l}function np(t=Dd){const e=cu.get(t);if(!e&&t===Dd&&DE())return UE();if(!e)throw xr.create("no-app",{appName:t});return e}function qt(t,e,n){let r=qR[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Qn.warn(o.join(" "));return}An(new an(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QR="firebase-heartbeat-database",YR=1,ra="firebase-heartbeat-store";let Th=null;function zE(){return Th||(Th=Ju(QR,YR,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ra)}catch(n){console.warn(n)}}}}).catch(t=>{throw xr.create("idb-open",{originalErrorMessage:t.message})})),Th}async function JR(t){try{const n=(await zE()).transaction(ra),r=await n.objectStore(ra).get(BE(t));return await n.done,r}catch(e){if(e instanceof Pn)Qn.warn(e.message);else{const n=xr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Qn.warn(n.message)}}}async function Ay(t,e){try{const r=(await zE()).transaction(ra,"readwrite");await r.objectStore(ra).put(e,BE(t)),await r.done}catch(n){if(n instanceof Pn)Qn.warn(n.message);else{const r=xr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Qn.warn(r.message)}}}function BE(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XR=1024,ZR=30;class eC{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new nC(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ry();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>ZR){const o=rC(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Qn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ry(),{heartbeatsToSend:r,unsentEntries:i}=tC(this._heartbeatsCache.heartbeats),s=uu(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Qn.warn(n),""}}}function Ry(){return new Date().toISOString().substring(0,10)}function tC(t,e=XR){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Cy(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Cy(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class nC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return VE()?LE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await JR(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ay(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ay(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Cy(t){return uu(JSON.stringify({version:2,heartbeats:t})).length}function rC(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iC(t){An(new an("platform-logger",e=>new mR(e),"PRIVATE")),An(new an("heartbeat",e=>new eC(e),"PRIVATE")),qt(Nd,Sy,t),qt(Nd,Sy,"esm2020"),qt("fire-js","")}iC("");function $E(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const sC=$E,WE=new Ni("auth","Firebase",$E());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hu=new ep("@firebase/auth");function oC(t,...e){hu.logLevel<=oe.WARN&&hu.warn(`Auth (${Os}): ${t}`,...e)}function Pl(t,...e){hu.logLevel<=oe.ERROR&&hu.error(`Auth (${Os}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ln(t,...e){throw rp(t,...e)}function vn(t,...e){return rp(t,...e)}function qE(t,e,n){const r={...sC(),[e]:n};return new Ni("auth","Firebase",r).create(e,{appName:t.name})}function br(t){return qE(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function rp(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return WE.create(t,...e)}function Y(t,e,...n){if(!t)throw rp(e,...n)}function Un(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Pl(e),new Error(e)}function Yn(t,e){t||Un(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vd(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function aC(){return Py()==="http:"||Py()==="https:"}function Py(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lC(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(aC()||U1()||"connection"in navigator)?navigator.onLine:!0}function uC(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,n){this.shortDelay=e,this.longDelay=n,Yn(n>e,"Short delay should be less than long delay!"),this.isMobile=M1()||z1()}get(){return lC()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(t,e){Yn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HE{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Un("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Un("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Un("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cC={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hC=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],dC=new Sa(3e4,6e4);function Di(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Kr(t,e,n,r,i={}){return KE(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=Ta({key:t.config.apiKey,...o}).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c={method:e,headers:u,...s};return j1()||(c.referrerPolicy="no-referrer"),t.emulatorConfig&&Ia(t.emulatorConfig.host)&&(c.credentials="include"),HE.fetch()(await GE(t,t.config.apiHost,n,l),c)})}async function KE(t,e,n){t._canInitEmulator=!1;const r={...cC,...e};try{const i=new pC(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw hl(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw hl(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw hl(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw hl(t,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw qE(t,d,c);ln(t,d)}}catch(i){if(i instanceof Pn)throw i;ln(t,"network-request-failed",{message:String(i)})}}async function Xu(t,e,n,r,i={}){const s=await Kr(t,e,n,r,i);return"mfaPendingCredential"in s&&ln(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function GE(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?ip(t.config,i):`${t.config.apiScheme}://${i}`;return hC.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function fC(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class pC{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(vn(this.auth,"network-request-failed")),dC.get())})}}function hl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=vn(t,e,r);return i.customData._tokenResponse=n,i}function xy(t){return t!==void 0&&t.enterprise!==void 0}class gC{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return fC(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function mC(t,e){return Kr(t,"GET","/v2/recaptchaConfig",Di(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yC(t,e){return Kr(t,"POST","/v1/accounts:delete",e)}async function du(t,e){return Kr(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function No(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function _C(t,e=!1){const n=Oe(t),r=await n.getIdToken(e),i=sp(r);Y(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:No(Ih(i.auth_time)),issuedAtTime:No(Ih(i.iat)),expirationTime:No(Ih(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ih(t){return Number(t)*1e3}function sp(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Pl("JWT malformed, contained fewer than 3 sections"),null;try{const i=bE(n);return i?JSON.parse(i):(Pl("Failed to decode base64 JWT payload"),null)}catch(i){return Pl("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function by(t){const e=sp(t);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ia(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Pn&&vC(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function vC({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wC{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=No(this.lastLoginAt),this.creationTime=No(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fu(t){var p;const e=t.auth,n=await t.getIdToken(),r=await ia(t,du(e,{idToken:n}));Y(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=(p=i.providerUserInfo)!=null&&p.length?QE(i.providerUserInfo):[],o=TC(t.providerData,s),l=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(o!=null&&o.length),c=l?u:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Ld(i.createdAt,i.lastLoginAt),isAnonymous:c};Object.assign(t,d)}async function EC(t){const e=Oe(t);await fu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function TC(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function QE(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IC(t,e){const n=await KE(t,{},async()=>{const r=Ta({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await GE(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return t.emulatorConfig&&Ia(t.emulatorConfig.host)&&(u.credentials="include"),HE.fetch()(o,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function SC(t,e){return Kr(t,"POST","/v2/accounts:revokeToken",Di(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):by(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const n=by(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await IC(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new cs;return r&&(Y(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Y(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Y(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new cs,this.toJSON())}_performRefresh(){return Un("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(t,e){Y(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class en{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new wC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ld(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ia(this,this.stsTokenManager.getToken(this.auth,e));return Y(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return _C(this,e)}reload(){return EC(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new en({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await fu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Zt(this.auth.app))return Promise.reject(br(this.auth));const e=await this.getIdToken();return await ia(this,yC(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,l=n.tenantId??void 0,u=n._redirectEventId??void 0,c=n.createdAt??void 0,d=n.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:A,providerData:P,stsTokenManager:x}=n;Y(p&&x,e,"internal-error");const b=cs.fromJSON(this.name,x);Y(typeof p=="string",e,"internal-error"),lr(r,e.name),lr(i,e.name),Y(typeof g=="boolean",e,"internal-error"),Y(typeof A=="boolean",e,"internal-error"),lr(s,e.name),lr(o,e.name),lr(l,e.name),lr(u,e.name),lr(c,e.name),lr(d,e.name);const v=new en({uid:p,auth:e,email:i,emailVerified:g,displayName:r,isAnonymous:A,photoURL:o,phoneNumber:s,tenantId:l,stsTokenManager:b,createdAt:c,lastLoginAt:d});return P&&Array.isArray(P)&&(v.providerData=P.map(_=>({..._}))),u&&(v._redirectEventId=u),v}static async _fromIdTokenResponse(e,n,r=!1){const i=new cs;i.updateFromServerResponse(n);const s=new en({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await fu(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];Y(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?QE(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new cs;l.updateFromIdToken(r);const u=new en({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Ld(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=new Map;function zn(t){Yn(t instanceof Function,"Expected a class definition");let e=Ny.get(t);return e?(Yn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ny.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YE{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}YE.type="NONE";const Dy=YE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(t,e,n){return`firebase:${t}:${e}:${n}`}class hs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=xl(this.userKey,i.apiKey,s),this.fullPersistenceKey=xl("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await du(this.auth,{idToken:e}).catch(()=>{});return n?en._fromGetAccountInfoResponse(this.auth,n,e):null}return en._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new hs(zn(Dy),e,r);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||zn(Dy);const o=xl(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const d=await c._get(o);if(d){let p;if(typeof d=="string"){const g=await du(e,{idToken:d}).catch(()=>{});if(!g)break;p=await en._fromGetAccountInfoResponse(e,g,d)}else p=en._fromJSON(e,d);c!==s&&(l=p),s=c;break}}catch{}const u=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new hs(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new hs(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oy(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(e0(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(JE(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(n0(e))return"Blackberry";if(r0(e))return"Webos";if(XE(e))return"Safari";if((e.includes("chrome/")||ZE(e))&&!e.includes("edge/"))return"Chrome";if(t0(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function JE(t=pt()){return/firefox\//i.test(t)}function XE(t=pt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ZE(t=pt()){return/crios\//i.test(t)}function e0(t=pt()){return/iemobile/i.test(t)}function t0(t=pt()){return/android/i.test(t)}function n0(t=pt()){return/blackberry/i.test(t)}function r0(t=pt()){return/webos/i.test(t)}function op(t=pt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function kC(t=pt()){var e;return op(t)&&!!((e=window.navigator)!=null&&e.standalone)}function AC(){return B1()&&document.documentMode===10}function i0(t=pt()){return op(t)||t0(t)||r0(t)||n0(t)||/windows phone/i.test(t)||e0(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function s0(t,e=[]){let n;switch(t){case"Browser":n=Oy(pt());break;case"Worker":n=`${Oy(pt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Os}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RC{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CC(t,e={}){return Kr(t,"GET","/v2/passwordPolicy",Di(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PC=6;class xC{constructor(e){var r;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??PC,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bC{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Vy(this),this.idTokenSubscription=new Vy(this),this.beforeStateQueue=new RC(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=WE,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=zn(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await hs.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await du(this,{idToken:e}),r=await en._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(Zt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(r=u.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await fu(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=uC()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Zt(this.app))return Promise.reject(br(this));const n=e?Oe(e):null;return n&&Y(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Zt(this.app)?Promise.reject(br(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Zt(this.app)?Promise.reject(br(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(zn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await CC(this),n=new xC(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ni("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await SC(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&zn(e)||this._popupRedirectResolver;Y(n,this,"argument-error"),this.redirectPersistenceManager=await hs.create(this,[zn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=s0(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var n;if(Zt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&oC(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Vs(t){return Oe(t)}class Vy{constructor(e){this.auth=e,this.observer=null,this.addObserver=Q1(n=>this.observer=n)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function NC(t){Zu=t}function o0(t){return Zu.loadJS(t)}function DC(){return Zu.recaptchaEnterpriseScript}function OC(){return Zu.gapiScript}function VC(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class LC{constructor(){this.enterprise=new MC}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class MC{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const FC="recaptcha-enterprise",a0="NO_RECAPTCHA";class jC{constructor(e){this.type=FC,this.auth=Vs(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{mC(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new gC(u);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,o(c.siteKey)}}).catch(u=>{l(u)})})}function i(s,o,l){const u=window.grecaptcha;xy(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(c=>{o(c)}).catch(()=>{o(a0)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new LC().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(l=>{if(!n&&xy(window.grecaptcha))i(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=DC();u.length!==0&&(u+=l),o0(u).then(()=>{i(l,s,o)}).catch(c=>{o(c)})}}).catch(l=>{o(l)})})}}async function Ly(t,e,n,r=!1,i=!1){const s=new jC(t);let o;if(i)o=a0;else try{o=await s.verify(n)}catch{o=await s.verify(n,!0)}const l={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const u=l.phoneEnrollmentInfo.phoneNumber,c=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const u=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function My(t,e,n,r,i){var s;if((s=t._getRecaptchaConfig())!=null&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Ly(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Ly(t,e,n,n==="getOobCode");return r(t,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UC(t,e){const n=Ds(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Ei(s,e??{}))return i;ln(i,"already-initialized")}return n.initialize({options:e})}function zC(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(zn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function BC(t,e,n){const r=Vs(t);Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=l0(e),{host:o,port:l}=$C(e),u=l===null?"":`:${l}`,c={url:`${s}//${o}${u}/`},d=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){Y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Y(Ei(c,r.config.emulator)&&Ei(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=c,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Ia(o)?ME(`${s}//${o}${u}`):WC()}function l0(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function $C(t){const e=l0(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Fy(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Fy(o)}}}function Fy(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function WC(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ap{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Un("not implemented")}_getIdTokenResponse(e){return Un("not implemented")}_linkToIdToken(e,n){return Un("not implemented")}_getReauthenticationResolver(e){return Un("not implemented")}}async function qC(t,e){return Kr(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HC(t,e){return Xu(t,"POST","/v1/accounts:signInWithPassword",Di(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KC(t,e){return Xu(t,"POST","/v1/accounts:signInWithEmailLink",Di(t,e))}async function GC(t,e){return Xu(t,"POST","/v1/accounts:signInWithEmailLink",Di(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa extends ap{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new sa(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new sa(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return My(e,n,"signInWithPassword",HC);case"emailLink":return KC(e,{email:this._email,oobCode:this._password});default:ln(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return My(e,r,"signUpPassword",qC);case"emailLink":return GC(e,{idToken:n,email:this._email,oobCode:this._password});default:ln(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ds(t,e){return Xu(t,"POST","/v1/accounts:signInWithIdp",Di(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QC="http://localhost";class Ti extends ap{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ti(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ln("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new Ti(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return ds(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,ds(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ds(e,n)}buildRequest(){const e={requestUri:QC,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ta(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YC(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function JC(t){const e=yo(_o(t)).link,n=e?yo(_o(e)).deep_link_id:null,r=yo(_o(t)).deep_link_id;return(r?yo(_o(r)).link:null)||r||n||e||t}class lp{constructor(e){const n=yo(_o(e)),r=n.apiKey??null,i=n.oobCode??null,s=YC(n.mode??null);Y(r&&i&&s,"argument-error"),this.apiKey=r,this.operation=s,this.code=i,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=JC(e);try{return new lp(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(){this.providerId=Ls.PROVIDER_ID}static credential(e,n){return sa._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=lp.parseLink(n);return Y(r,"argument-error"),sa._fromEmailAndCode(e,r.code,r.tenantId)}}Ls.PROVIDER_ID="password";Ls.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ls.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u0{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka extends u0{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr extends ka{constructor(){super("facebook.com")}static credential(e){return Ti._fromParams({providerId:fr.PROVIDER_ID,signInMethod:fr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return fr.credentialFromTaggedObject(e)}static credentialFromError(e){return fr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return fr.credential(e.oauthAccessToken)}catch{return null}}}fr.FACEBOOK_SIGN_IN_METHOD="facebook.com";fr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr extends ka{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ti._fromParams({providerId:pr.PROVIDER_ID,signInMethod:pr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return pr.credentialFromTaggedObject(e)}static credentialFromError(e){return pr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return pr.credential(n,r)}catch{return null}}}pr.GOOGLE_SIGN_IN_METHOD="google.com";pr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr extends ka{constructor(){super("github.com")}static credential(e){return Ti._fromParams({providerId:gr.PROVIDER_ID,signInMethod:gr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return gr.credentialFromTaggedObject(e)}static credentialFromError(e){return gr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return gr.credential(e.oauthAccessToken)}catch{return null}}}gr.GITHUB_SIGN_IN_METHOD="github.com";gr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr extends ka{constructor(){super("twitter.com")}static credential(e,n){return Ti._fromParams({providerId:mr.PROVIDER_ID,signInMethod:mr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return mr.credentialFromTaggedObject(e)}static credentialFromError(e){return mr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return mr.credential(n,r)}catch{return null}}}mr.TWITTER_SIGN_IN_METHOD="twitter.com";mr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await en._fromIdTokenResponse(e,r,i),o=jy(r);return new Ts({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=jy(r);return new Ts({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function jy(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu extends Pn{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,pu.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new pu(e,n,r,i)}}function c0(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?pu._fromErrorAndOperation(t,s,e,r):s})}async function XC(t,e,n=!1){const r=await ia(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ts._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZC(t,e,n=!1){const{auth:r}=t;if(Zt(r.app))return Promise.reject(br(r));const i="reauthenticate";try{const s=await ia(t,c0(r,i,e,t),n);Y(s.idToken,r,"internal-error");const o=sp(s.idToken);Y(o,r,"internal-error");const{sub:l}=o;return Y(t.uid===l,r,"user-mismatch"),Ts._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&ln(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function h0(t,e,n=!1){if(Zt(t.app))return Promise.reject(br(t));const r="signIn",i=await c0(t,r,e),s=await Ts._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function eP(t,e){return h0(Vs(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tP(t){const e=Vs(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function nP(t,e,n){return Zt(t.app)?Promise.reject(br(t)):eP(Oe(t),Ls.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&tP(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rP(t,e){return Oe(t).setPersistence(e)}function iP(t,e,n,r){return Oe(t).onIdTokenChanged(e,n,r)}function sP(t,e,n){return Oe(t).beforeAuthStateChanged(e,n)}function oP(t,e,n,r){return Oe(t).onAuthStateChanged(e,n,r)}const gu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d0{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(gu,"1"),this.storage.removeItem(gu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aP=1e3,lP=10;class f0 extends d0{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=i0(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);AC()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,lP):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},aP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}f0.type="LOCAL";const p0=f0;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g0 extends d0{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}g0.type="SESSION";const m0=g0;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uP(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new ec(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async c=>c(n.origin,s)),u=await uP(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ec.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function up(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cP{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const c=up("",20);i.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const g=p;if(g.data.eventId===c)switch(g.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(g.data.response);break;default:clearTimeout(d),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(){return window}function hP(t){wn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y0(){return typeof wn().WorkerGlobalScope<"u"&&typeof wn().importScripts=="function"}async function dP(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function fP(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function pP(){return y0()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _0="firebaseLocalStorageDb",gP=1,mu="firebaseLocalStorage",v0="fbase_key";class Aa{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function tc(t,e){return t.transaction([mu],e?"readwrite":"readonly").objectStore(mu)}function mP(){const t=indexedDB.deleteDatabase(_0);return new Aa(t).toPromise()}function Md(){const t=indexedDB.open(_0,gP);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(mu,{keyPath:v0})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(mu)?e(r):(r.close(),await mP(),e(await Md()))})})}async function Uy(t,e,n){const r=tc(t,!0).put({[v0]:e,value:n});return new Aa(r).toPromise()}async function yP(t,e){const n=tc(t,!1).get(e),r=await new Aa(n).toPromise();return r===void 0?null:r.value}function zy(t,e){const n=tc(t,!0).delete(e);return new Aa(n).toPromise()}const _P=800,vP=3;class w0{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Md(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>vP)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return y0()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ec._getInstance(pP()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await dP(),!this.activeServiceWorker)return;this.sender=new cP(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||fP()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Md();return await Uy(e,gu,"1"),await zy(e,gu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Uy(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>yP(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>zy(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=tc(i,!1).getAll();return new Aa(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_P)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}w0.type="LOCAL";const wP=w0;new Sa(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EP(t,e){return e?zn(e):(Y(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp extends ap{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ds(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ds(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ds(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function TP(t){return h0(t.auth,new cp(t),t.bypassAuthState)}function IP(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),ZC(n,new cp(t),t.bypassAuthState)}async function SP(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),XC(n,new cp(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E0{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return TP;case"linkViaPopup":case"linkViaRedirect":return SP;case"reauthViaPopup":case"reauthViaRedirect":return IP;default:ln(this.auth,"internal-error")}}resolve(e){Yn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Yn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kP=new Sa(2e3,1e4);class rs extends E0{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,rs.currentPopupAction&&rs.currentPopupAction.cancel(),rs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){Yn(this.filter.length===1,"Popup operations only handle one event");const e=up();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(vn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(vn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,rs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(vn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,kP.get())};e()}}rs.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AP="pendingRedirect",bl=new Map;class RP extends E0{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=bl.get(this.auth._key());if(!e){try{const r=await CP(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}bl.set(this.auth._key(),e)}return this.bypassAuthState||bl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function CP(t,e){const n=bP(e),r=xP(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function PP(t,e){bl.set(t._key(),e)}function xP(t){return zn(t._redirectPersistence)}function bP(t){return xl(AP,t.config.apiKey,t.name)}async function NP(t,e,n=!1){if(Zt(t.app))return Promise.reject(br(t));const r=Vs(t),i=EP(r,e),o=await new RP(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DP=10*60*1e3;class OP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!VP(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!T0(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(vn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=DP&&this.cachedEventUids.clear(),this.cachedEventUids.has(By(e))}saveEventToCache(e){this.cachedEventUids.add(By(e)),this.lastProcessedEventTime=Date.now()}}function By(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function T0({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function VP(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return T0(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LP(t,e={}){return Kr(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MP=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,FP=/^https?/;async function jP(t){if(t.config.emulator)return;const{authorizedDomains:e}=await LP(t);for(const n of e)try{if(UP(n))return}catch{}ln(t,"unauthorized-domain")}function UP(t){const e=Vd(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!FP.test(n))return!1;if(MP.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zP=new Sa(3e4,6e4);function $y(){const t=wn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function BP(t){return new Promise((e,n)=>{var i,s,o;function r(){$y(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$y(),n(vn(t,"network-request-failed"))},timeout:zP.get()})}if((s=(i=wn().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=wn().gapi)!=null&&o.load)r();else{const l=VC("iframefcb");return wn()[l]=()=>{gapi.load?r():n(vn(t,"network-request-failed"))},o0(`${OC()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Nl=null,e})}let Nl=null;function $P(t){return Nl=Nl||BP(t),Nl}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WP=new Sa(5e3,15e3),qP="__/auth/iframe",HP="emulator/auth/iframe",KP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},GP=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function QP(t){const e=t.config;Y(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ip(e,HP):`https://${t.config.authDomain}/${qP}`,r={apiKey:e.apiKey,appName:t.name,v:Os},i=GP.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${Ta(r).slice(1)}`}async function YP(t){const e=await $P(t),n=wn().gapi;return Y(n,t,"internal-error"),e.open({where:document.body,url:QP(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:KP,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=vn(t,"network-request-failed"),l=wn().setTimeout(()=>{s(o)},WP.get());function u(){wn().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JP={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},XP=500,ZP=600,ex="_blank",tx="http://localhost";class Wy{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nx(t,e,n,r=XP,i=ZP){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={...JP,width:r.toString(),height:i.toString(),top:s,left:o},c=pt().toLowerCase();n&&(l=ZE(c)?ex:n),JE(c)&&(e=e||tx,u.scrollbars="yes");const d=Object.entries(u).reduce((g,[A,P])=>`${g}${A}=${P},`,"");if(kC(c)&&l!=="_self")return rx(e||"",l),new Wy(null);const p=window.open(e||"",l,d);Y(p,t,"popup-blocked");try{p.focus()}catch{}return new Wy(p)}function rx(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ix="__/auth/handler",sx="emulator/auth/handler",ox=encodeURIComponent("fac");async function qy(t,e,n,r,i,s){Y(t.config.authDomain,t,"auth-domain-config-required"),Y(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Os,eventId:i};if(e instanceof u0){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",G1(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof ka){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const u=await t._getAppCheckToken(),c=u?`#${ox}=${encodeURIComponent(u)}`:"";return`${ax(t)}?${Ta(l).slice(1)}${c}`}function ax({config:t}){return t.emulator?ip(t,sx):`https://${t.authDomain}/${ix}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="webStorageSupport";class lx{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=m0,this._completeRedirectFn=NP,this._overrideRedirectResult=PP}async _openPopup(e,n,r,i){var o;Yn((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await qy(e,n,r,Vd(),i);return nx(e,s,up())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await qy(e,n,r,Vd(),i);return hP(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Yn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await YP(e),r=new OP(e);return n.register("authEvent",i=>(Y(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Sh,{type:Sh},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[Sh];s!==void 0&&n(!!s),ln(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=jP(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return i0()||XE()||op()}}const ux=lx;var Hy="@firebase/auth",Ky="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cx{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hx(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function dx(t){An(new an("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;Y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:s0(t)},c=new bC(r,i,s,u);return zC(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),An(new an("auth-internal",e=>{const n=Vs(e.getProvider("auth").getImmediate());return(r=>new cx(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),qt(Hy,Ky,hx(t)),qt(Hy,Ky,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fx=5*60,px=OE("authIdTokenMaxAge")||fx;let Gy=null;const gx=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>px)return;const i=n==null?void 0:n.token;Gy!==i&&(Gy=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function mx(t=np()){const e=Ds(t,"auth");if(e.isInitialized())return e.getImmediate();const n=UC(t,{popupRedirectResolver:ux,persistence:[wP,p0,m0]}),r=OE("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=gx(s.toString());sP(n,o,()=>o(n.currentUser)),iP(n,l=>o(l))}}const i=NE("auth");return i&&BC(n,`http://${i}`),n}function yx(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}NC({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=vn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",yx().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});dx("Browser");var Qy=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nr,I0;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,m){function I(){}I.prototype=m.prototype,w.F=m.prototype,w.prototype=new I,w.prototype.constructor=w,w.D=function(k,C,R){for(var E=Array(arguments.length-2),X=2;X<arguments.length;X++)E[X-2]=arguments[X];return m.prototype[C].apply(k,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,n),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,m,I){I||(I=0);const k=Array(16);if(typeof m=="string")for(var C=0;C<16;++C)k[C]=m.charCodeAt(I++)|m.charCodeAt(I++)<<8|m.charCodeAt(I++)<<16|m.charCodeAt(I++)<<24;else for(C=0;C<16;++C)k[C]=m[I++]|m[I++]<<8|m[I++]<<16|m[I++]<<24;m=w.g[0],I=w.g[1],C=w.g[2];let R=w.g[3],E;E=m+(R^I&(C^R))+k[0]+3614090360&4294967295,m=I+(E<<7&4294967295|E>>>25),E=R+(C^m&(I^C))+k[1]+3905402710&4294967295,R=m+(E<<12&4294967295|E>>>20),E=C+(I^R&(m^I))+k[2]+606105819&4294967295,C=R+(E<<17&4294967295|E>>>15),E=I+(m^C&(R^m))+k[3]+3250441966&4294967295,I=C+(E<<22&4294967295|E>>>10),E=m+(R^I&(C^R))+k[4]+4118548399&4294967295,m=I+(E<<7&4294967295|E>>>25),E=R+(C^m&(I^C))+k[5]+1200080426&4294967295,R=m+(E<<12&4294967295|E>>>20),E=C+(I^R&(m^I))+k[6]+2821735955&4294967295,C=R+(E<<17&4294967295|E>>>15),E=I+(m^C&(R^m))+k[7]+4249261313&4294967295,I=C+(E<<22&4294967295|E>>>10),E=m+(R^I&(C^R))+k[8]+1770035416&4294967295,m=I+(E<<7&4294967295|E>>>25),E=R+(C^m&(I^C))+k[9]+2336552879&4294967295,R=m+(E<<12&4294967295|E>>>20),E=C+(I^R&(m^I))+k[10]+4294925233&4294967295,C=R+(E<<17&4294967295|E>>>15),E=I+(m^C&(R^m))+k[11]+2304563134&4294967295,I=C+(E<<22&4294967295|E>>>10),E=m+(R^I&(C^R))+k[12]+1804603682&4294967295,m=I+(E<<7&4294967295|E>>>25),E=R+(C^m&(I^C))+k[13]+4254626195&4294967295,R=m+(E<<12&4294967295|E>>>20),E=C+(I^R&(m^I))+k[14]+2792965006&4294967295,C=R+(E<<17&4294967295|E>>>15),E=I+(m^C&(R^m))+k[15]+1236535329&4294967295,I=C+(E<<22&4294967295|E>>>10),E=m+(C^R&(I^C))+k[1]+4129170786&4294967295,m=I+(E<<5&4294967295|E>>>27),E=R+(I^C&(m^I))+k[6]+3225465664&4294967295,R=m+(E<<9&4294967295|E>>>23),E=C+(m^I&(R^m))+k[11]+643717713&4294967295,C=R+(E<<14&4294967295|E>>>18),E=I+(R^m&(C^R))+k[0]+3921069994&4294967295,I=C+(E<<20&4294967295|E>>>12),E=m+(C^R&(I^C))+k[5]+3593408605&4294967295,m=I+(E<<5&4294967295|E>>>27),E=R+(I^C&(m^I))+k[10]+38016083&4294967295,R=m+(E<<9&4294967295|E>>>23),E=C+(m^I&(R^m))+k[15]+3634488961&4294967295,C=R+(E<<14&4294967295|E>>>18),E=I+(R^m&(C^R))+k[4]+3889429448&4294967295,I=C+(E<<20&4294967295|E>>>12),E=m+(C^R&(I^C))+k[9]+568446438&4294967295,m=I+(E<<5&4294967295|E>>>27),E=R+(I^C&(m^I))+k[14]+3275163606&4294967295,R=m+(E<<9&4294967295|E>>>23),E=C+(m^I&(R^m))+k[3]+4107603335&4294967295,C=R+(E<<14&4294967295|E>>>18),E=I+(R^m&(C^R))+k[8]+1163531501&4294967295,I=C+(E<<20&4294967295|E>>>12),E=m+(C^R&(I^C))+k[13]+2850285829&4294967295,m=I+(E<<5&4294967295|E>>>27),E=R+(I^C&(m^I))+k[2]+4243563512&4294967295,R=m+(E<<9&4294967295|E>>>23),E=C+(m^I&(R^m))+k[7]+1735328473&4294967295,C=R+(E<<14&4294967295|E>>>18),E=I+(R^m&(C^R))+k[12]+2368359562&4294967295,I=C+(E<<20&4294967295|E>>>12),E=m+(I^C^R)+k[5]+4294588738&4294967295,m=I+(E<<4&4294967295|E>>>28),E=R+(m^I^C)+k[8]+2272392833&4294967295,R=m+(E<<11&4294967295|E>>>21),E=C+(R^m^I)+k[11]+1839030562&4294967295,C=R+(E<<16&4294967295|E>>>16),E=I+(C^R^m)+k[14]+4259657740&4294967295,I=C+(E<<23&4294967295|E>>>9),E=m+(I^C^R)+k[1]+2763975236&4294967295,m=I+(E<<4&4294967295|E>>>28),E=R+(m^I^C)+k[4]+1272893353&4294967295,R=m+(E<<11&4294967295|E>>>21),E=C+(R^m^I)+k[7]+4139469664&4294967295,C=R+(E<<16&4294967295|E>>>16),E=I+(C^R^m)+k[10]+3200236656&4294967295,I=C+(E<<23&4294967295|E>>>9),E=m+(I^C^R)+k[13]+681279174&4294967295,m=I+(E<<4&4294967295|E>>>28),E=R+(m^I^C)+k[0]+3936430074&4294967295,R=m+(E<<11&4294967295|E>>>21),E=C+(R^m^I)+k[3]+3572445317&4294967295,C=R+(E<<16&4294967295|E>>>16),E=I+(C^R^m)+k[6]+76029189&4294967295,I=C+(E<<23&4294967295|E>>>9),E=m+(I^C^R)+k[9]+3654602809&4294967295,m=I+(E<<4&4294967295|E>>>28),E=R+(m^I^C)+k[12]+3873151461&4294967295,R=m+(E<<11&4294967295|E>>>21),E=C+(R^m^I)+k[15]+530742520&4294967295,C=R+(E<<16&4294967295|E>>>16),E=I+(C^R^m)+k[2]+3299628645&4294967295,I=C+(E<<23&4294967295|E>>>9),E=m+(C^(I|~R))+k[0]+4096336452&4294967295,m=I+(E<<6&4294967295|E>>>26),E=R+(I^(m|~C))+k[7]+1126891415&4294967295,R=m+(E<<10&4294967295|E>>>22),E=C+(m^(R|~I))+k[14]+2878612391&4294967295,C=R+(E<<15&4294967295|E>>>17),E=I+(R^(C|~m))+k[5]+4237533241&4294967295,I=C+(E<<21&4294967295|E>>>11),E=m+(C^(I|~R))+k[12]+1700485571&4294967295,m=I+(E<<6&4294967295|E>>>26),E=R+(I^(m|~C))+k[3]+2399980690&4294967295,R=m+(E<<10&4294967295|E>>>22),E=C+(m^(R|~I))+k[10]+4293915773&4294967295,C=R+(E<<15&4294967295|E>>>17),E=I+(R^(C|~m))+k[1]+2240044497&4294967295,I=C+(E<<21&4294967295|E>>>11),E=m+(C^(I|~R))+k[8]+1873313359&4294967295,m=I+(E<<6&4294967295|E>>>26),E=R+(I^(m|~C))+k[15]+4264355552&4294967295,R=m+(E<<10&4294967295|E>>>22),E=C+(m^(R|~I))+k[6]+2734768916&4294967295,C=R+(E<<15&4294967295|E>>>17),E=I+(R^(C|~m))+k[13]+1309151649&4294967295,I=C+(E<<21&4294967295|E>>>11),E=m+(C^(I|~R))+k[4]+4149444226&4294967295,m=I+(E<<6&4294967295|E>>>26),E=R+(I^(m|~C))+k[11]+3174756917&4294967295,R=m+(E<<10&4294967295|E>>>22),E=C+(m^(R|~I))+k[2]+718787259&4294967295,C=R+(E<<15&4294967295|E>>>17),E=I+(R^(C|~m))+k[9]+3951481745&4294967295,w.g[0]=w.g[0]+m&4294967295,w.g[1]=w.g[1]+(C+(E<<21&4294967295|E>>>11))&4294967295,w.g[2]=w.g[2]+C&4294967295,w.g[3]=w.g[3]+R&4294967295}r.prototype.v=function(w,m){m===void 0&&(m=w.length);const I=m-this.blockSize,k=this.C;let C=this.h,R=0;for(;R<m;){if(C==0)for(;R<=I;)i(this,w,R),R+=this.blockSize;if(typeof w=="string"){for(;R<m;)if(k[C++]=w.charCodeAt(R++),C==this.blockSize){i(this,k),C=0;break}}else for(;R<m;)if(k[C++]=w[R++],C==this.blockSize){i(this,k),C=0;break}}this.h=C,this.o+=m},r.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var m=1;m<w.length-8;++m)w[m]=0;m=this.o*8;for(var I=w.length-8;I<w.length;++I)w[I]=m&255,m/=256;for(this.v(w),w=Array(16),m=0,I=0;I<4;++I)for(let k=0;k<32;k+=8)w[m++]=this.g[I]>>>k&255;return w};function s(w,m){var I=l;return Object.prototype.hasOwnProperty.call(I,w)?I[w]:I[w]=m(w)}function o(w,m){this.h=m;const I=[];let k=!0;for(let C=w.length-1;C>=0;C--){const R=w[C]|0;k&&R==m||(I[C]=R,k=!1)}this.g=I}var l={};function u(w){return-128<=w&&w<128?s(w,function(m){return new o([m|0],m<0?-1:0)}):new o([w|0],w<0?-1:0)}function c(w){if(isNaN(w)||!isFinite(w))return p;if(w<0)return b(c(-w));const m=[];let I=1;for(let k=0;w>=I;k++)m[k]=w/I|0,I*=4294967296;return new o(m,0)}function d(w,m){if(w.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(w.charAt(0)=="-")return b(d(w.substring(1),m));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=c(Math.pow(m,8));let k=p;for(let R=0;R<w.length;R+=8){var C=Math.min(8,w.length-R);const E=parseInt(w.substring(R,R+C),m);C<8?(C=c(Math.pow(m,C)),k=k.j(C).add(c(E))):(k=k.j(I),k=k.add(c(E)))}return k}var p=u(0),g=u(1),A=u(16777216);t=o.prototype,t.m=function(){if(x(this))return-b(this).m();let w=0,m=1;for(let I=0;I<this.g.length;I++){const k=this.i(I);w+=(k>=0?k:4294967296+k)*m,m*=4294967296}return w},t.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(P(this))return"0";if(x(this))return"-"+b(this).toString(w);const m=c(Math.pow(w,6));var I=this;let k="";for(;;){const C=D(I,m).g;I=v(I,C.j(m));let R=((I.g.length>0?I.g[0]:I.h)>>>0).toString(w);if(I=C,P(I))return R+k;for(;R.length<6;)R="0"+R;k=R+k}},t.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function P(w){if(w.h!=0)return!1;for(let m=0;m<w.g.length;m++)if(w.g[m]!=0)return!1;return!0}function x(w){return w.h==-1}t.l=function(w){return w=v(this,w),x(w)?-1:P(w)?0:1};function b(w){const m=w.g.length,I=[];for(let k=0;k<m;k++)I[k]=~w.g[k];return new o(I,~w.h).add(g)}t.abs=function(){return x(this)?b(this):this},t.add=function(w){const m=Math.max(this.g.length,w.g.length),I=[];let k=0;for(let C=0;C<=m;C++){let R=k+(this.i(C)&65535)+(w.i(C)&65535),E=(R>>>16)+(this.i(C)>>>16)+(w.i(C)>>>16);k=E>>>16,R&=65535,E&=65535,I[C]=E<<16|R}return new o(I,I[I.length-1]&-2147483648?-1:0)};function v(w,m){return w.add(b(m))}t.j=function(w){if(P(this)||P(w))return p;if(x(this))return x(w)?b(this).j(b(w)):b(b(this).j(w));if(x(w))return b(this.j(b(w)));if(this.l(A)<0&&w.l(A)<0)return c(this.m()*w.m());const m=this.g.length+w.g.length,I=[];for(var k=0;k<2*m;k++)I[k]=0;for(k=0;k<this.g.length;k++)for(let C=0;C<w.g.length;C++){const R=this.i(k)>>>16,E=this.i(k)&65535,X=w.i(C)>>>16,$=w.i(C)&65535;I[2*k+2*C]+=E*$,_(I,2*k+2*C),I[2*k+2*C+1]+=R*$,_(I,2*k+2*C+1),I[2*k+2*C+1]+=E*X,_(I,2*k+2*C+1),I[2*k+2*C+2]+=R*X,_(I,2*k+2*C+2)}for(w=0;w<m;w++)I[w]=I[2*w+1]<<16|I[2*w];for(w=m;w<2*m;w++)I[w]=0;return new o(I,0)};function _(w,m){for(;(w[m]&65535)!=w[m];)w[m+1]+=w[m]>>>16,w[m]&=65535,m++}function S(w,m){this.g=w,this.h=m}function D(w,m){if(P(m))throw Error("division by zero");if(P(w))return new S(p,p);if(x(w))return m=D(b(w),m),new S(b(m.g),b(m.h));if(x(m))return m=D(w,b(m)),new S(b(m.g),m.h);if(w.g.length>30){if(x(w)||x(m))throw Error("slowDivide_ only works with positive integers.");for(var I=g,k=m;k.l(w)<=0;)I=L(I),k=L(k);var C=U(I,1),R=U(k,1);for(k=U(k,2),I=U(I,2);!P(k);){var E=R.add(k);E.l(w)<=0&&(C=C.add(I),R=E),k=U(k,1),I=U(I,1)}return m=v(w,C.j(m)),new S(C,m)}for(C=p;w.l(m)>=0;){for(I=Math.max(1,Math.floor(w.m()/m.m())),k=Math.ceil(Math.log(I)/Math.LN2),k=k<=48?1:Math.pow(2,k-48),R=c(I),E=R.j(m);x(E)||E.l(w)>0;)I-=k,R=c(I),E=R.j(m);P(R)&&(R=g),C=C.add(R),w=v(w,E)}return new S(C,w)}t.B=function(w){return D(this,w).h},t.and=function(w){const m=Math.max(this.g.length,w.g.length),I=[];for(let k=0;k<m;k++)I[k]=this.i(k)&w.i(k);return new o(I,this.h&w.h)},t.or=function(w){const m=Math.max(this.g.length,w.g.length),I=[];for(let k=0;k<m;k++)I[k]=this.i(k)|w.i(k);return new o(I,this.h|w.h)},t.xor=function(w){const m=Math.max(this.g.length,w.g.length),I=[];for(let k=0;k<m;k++)I[k]=this.i(k)^w.i(k);return new o(I,this.h^w.h)};function L(w){const m=w.g.length+1,I=[];for(let k=0;k<m;k++)I[k]=w.i(k)<<1|w.i(k-1)>>>31;return new o(I,w.h)}function U(w,m){const I=m>>5;m%=32;const k=w.g.length-I,C=[];for(let R=0;R<k;R++)C[R]=m>0?w.i(R+I)>>>m|w.i(R+I+1)<<32-m:w.i(R+I);return new o(C,w.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,I0=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=d,Nr=o}).apply(typeof Qy<"u"?Qy:typeof self<"u"?self:typeof window<"u"?window:{});var dl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var S0,vo,k0,Dl,Fd,A0,R0,C0;(function(){var t,e=Object.defineProperty;function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof dl=="object"&&dl];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function i(a,h){if(h)e:{var f=r;a=a.split(".");for(var y=0;y<a.length-1;y++){var N=a[y];if(!(N in f))break e;f=f[N]}a=a[a.length-1],y=f[a],h=h(y),h!=y&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}i("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(a){return a||function(h){var f=[],y;for(y in h)Object.prototype.hasOwnProperty.call(h,y)&&f.push([y,h[y]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},o=this||self;function l(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,f){return a.call.apply(a.bind,arguments)}function c(a,h,f){return c=u,c.apply(null,arguments)}function d(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var y=f.slice();return y.push.apply(y,arguments),a.apply(this,y)}}function p(a,h){function f(){}f.prototype=h.prototype,a.Z=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(y,N,O){for(var B=Array(arguments.length-2),re=2;re<arguments.length;re++)B[re-2]=arguments[re];return h.prototype[N].apply(y,B)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function A(a){const h=a.length;if(h>0){const f=Array(h);for(let y=0;y<h;y++)f[y]=a[y];return f}return[]}function P(a,h){for(let y=1;y<arguments.length;y++){const N=arguments[y];var f=typeof N;if(f=f!="object"?f:N?Array.isArray(N)?"array":f:"null",f=="array"||f=="object"&&typeof N.length=="number"){f=a.length||0;const O=N.length||0;a.length=f+O;for(let B=0;B<O;B++)a[f+B]=N[B]}else a.push(N)}}class x{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function b(a){o.setTimeout(()=>{throw a},0)}function v(){var a=w;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class _{constructor(){this.h=this.g=null}add(h,f){const y=S.get();y.set(h,f),this.h?this.h.next=y:this.g=y,this.h=y}}var S=new x(()=>new D,a=>a.reset());class D{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let L,U=!1,w=new _,m=()=>{const a=Promise.resolve(void 0);L=()=>{a.then(I)}};function I(){for(var a;a=v();){try{a.h.call(a.g)}catch(f){b(f)}var h=S;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}U=!1}function k(){this.u=this.u,this.C=this.C}k.prototype.u=!1,k.prototype.dispose=function(){this.u||(this.u=!0,this.N())},k.prototype[Symbol.dispose]=function(){this.dispose()},k.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function C(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}C.prototype.h=function(){this.defaultPrevented=!0};var R=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,h),o.removeEventListener("test",f,h)}catch{}return a}();function E(a){return/^[\s\xa0]*$/.test(a)}function X(a,h){C.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(X,C),X.prototype.init=function(a,h){const f=this.type=a.type,y=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&X.Z.h.call(this)},X.prototype.h=function(){X.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var $="closure_listenable_"+(Math.random()*1e6|0),Q=0;function ie(a,h,f,y,N){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!y,this.ha=N,this.key=++Q,this.da=this.fa=!1}function z(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function K(a,h,f){for(const y in a)h.call(f,a[y],y,a)}function Z(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function me(a){const h={};for(const f in a)h[f]=a[f];return h}const ke="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function xn(a,h){let f,y;for(let N=1;N<arguments.length;N++){y=arguments[N];for(f in y)a[f]=y[f];for(let O=0;O<ke.length;O++)f=ke[O],Object.prototype.hasOwnProperty.call(y,f)&&(a[f]=y[f])}}function St(a){this.src=a,this.g={},this.h=0}St.prototype.add=function(a,h,f,y,N){const O=a.toString();a=this.g[O],a||(a=this.g[O]=[],this.h++);const B=gt(a,h,y,N);return B>-1?(h=a[B],f||(h.fa=!1)):(h=new ie(h,this.src,O,!!y,N),h.fa=f,a.push(h)),h};function bn(a,h){const f=h.type;if(f in a.g){var y=a.g[f],N=Array.prototype.indexOf.call(y,h,void 0),O;(O=N>=0)&&Array.prototype.splice.call(y,N,1),O&&(z(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function gt(a,h,f,y){for(let N=0;N<a.length;++N){const O=a[N];if(!O.da&&O.listener==h&&O.capture==!!f&&O.ha==y)return N}return-1}var Nn="closure_lm_"+(Math.random()*1e6|0),Yr={};function rg(a,h,f,y,N){if(Array.isArray(h)){for(let O=0;O<h.length;O++)rg(a,h[O],f,y,N);return null}return f=og(f),a&&a[$]?a.J(h,f,l(y)?!!y.capture:!1,N):CI(a,h,f,!1,y,N)}function CI(a,h,f,y,N,O){if(!h)throw Error("Invalid event type");const B=l(N)?!!N.capture:!!N;let re=kc(a);if(re||(a[Nn]=re=new St(a)),f=re.add(h,f,y,B,O),f.proxy)return f;if(y=PI(),f.proxy=y,y.src=a,y.listener=f,a.addEventListener)R||(N=B),N===void 0&&(N=!1),a.addEventListener(h.toString(),y,N);else if(a.attachEvent)a.attachEvent(sg(h.toString()),y);else if(a.addListener&&a.removeListener)a.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return f}function PI(){function a(f){return h.call(a.src,a.listener,f)}const h=xI;return a}function ig(a,h,f,y,N){if(Array.isArray(h))for(var O=0;O<h.length;O++)ig(a,h[O],f,y,N);else y=l(y)?!!y.capture:!!y,f=og(f),a&&a[$]?(a=a.i,O=String(h).toString(),O in a.g&&(h=a.g[O],f=gt(h,f,y,N),f>-1&&(z(h[f]),Array.prototype.splice.call(h,f,1),h.length==0&&(delete a.g[O],a.h--)))):a&&(a=kc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=gt(h,f,y,N)),(f=a>-1?h[a]:null)&&Sc(f))}function Sc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[$])bn(h.i,a);else{var f=a.type,y=a.proxy;h.removeEventListener?h.removeEventListener(f,y,a.capture):h.detachEvent?h.detachEvent(sg(f),y):h.addListener&&h.removeListener&&h.removeListener(y),(f=kc(h))?(bn(f,a),f.h==0&&(f.src=null,h[Nn]=null)):z(a)}}}function sg(a){return a in Yr?Yr[a]:Yr[a]="on"+a}function xI(a,h){if(a.da)a=!0;else{h=new X(h,this);const f=a.listener,y=a.ha||a.src;a.fa&&Sc(a),a=f.call(y,h)}return a}function kc(a){return a=a[Nn],a instanceof St?a:null}var Ac="__closure_events_fn_"+(Math.random()*1e9>>>0);function og(a){return typeof a=="function"?a:(a[Ac]||(a[Ac]=function(h){return a.handleEvent(h)}),a[Ac])}function it(){k.call(this),this.i=new St(this),this.M=this,this.G=null}p(it,k),it.prototype[$]=!0,it.prototype.removeEventListener=function(a,h,f,y){ig(this,a,h,f,y)};function mt(a,h){var f,y=a.G;if(y)for(f=[];y;y=y.G)f.push(y);if(a=a.M,y=h.type||h,typeof h=="string")h=new C(h,a);else if(h instanceof C)h.target=h.target||a;else{var N=h;h=new C(y,a),xn(h,N)}N=!0;let O,B;if(f)for(B=f.length-1;B>=0;B--)O=h.g=f[B],N=La(O,y,!0,h)&&N;if(O=h.g=a,N=La(O,y,!0,h)&&N,N=La(O,y,!1,h)&&N,f)for(B=0;B<f.length;B++)O=h.g=f[B],N=La(O,y,!1,h)&&N}it.prototype.N=function(){if(it.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const f=a.g[h];for(let y=0;y<f.length;y++)z(f[y]);delete a.g[h],a.h--}}this.G=null},it.prototype.J=function(a,h,f,y){return this.i.add(String(a),h,!1,f,y)},it.prototype.K=function(a,h,f,y){return this.i.add(String(a),h,!0,f,y)};function La(a,h,f,y){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let N=!0;for(let O=0;O<h.length;++O){const B=h[O];if(B&&!B.da&&B.capture==f){const re=B.listener,$e=B.ha||B.src;B.fa&&bn(a.i,B),N=re.call($e,y)!==!1&&N}}return N&&!y.defaultPrevented}function bI(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=c(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function ag(a){a.g=bI(()=>{a.g=null,a.i&&(a.i=!1,ag(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class NI extends k{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:ag(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function zs(a){k.call(this),this.h=a,this.g={}}p(zs,k);var lg=[];function ug(a){K(a.g,function(h,f){this.g.hasOwnProperty(f)&&Sc(h)},a),a.g={}}zs.prototype.N=function(){zs.Z.N.call(this),ug(this)},zs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Rc=o.JSON.stringify,DI=o.JSON.parse,OI=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function cg(){}function hg(){}var Bs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Cc(){C.call(this,"d")}p(Cc,C);function Pc(){C.call(this,"c")}p(Pc,C);var Jr={},dg=null;function Ma(){return dg=dg||new it}Jr.Ia="serverreachability";function fg(a){C.call(this,Jr.Ia,a)}p(fg,C);function $s(a){const h=Ma();mt(h,new fg(h))}Jr.STAT_EVENT="statevent";function pg(a,h){C.call(this,Jr.STAT_EVENT,a),this.stat=h}p(pg,C);function yt(a){const h=Ma();mt(h,new pg(h,a))}Jr.Ja="timingevent";function gg(a,h){C.call(this,Jr.Ja,a),this.size=h}p(gg,C);function Ws(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function qs(){this.g=!0}qs.prototype.ua=function(){this.g=!1};function VI(a,h,f,y,N,O){a.info(function(){if(a.g)if(O){var B="",re=O.split("&");for(let ye=0;ye<re.length;ye++){var $e=re[ye].split("=");if($e.length>1){const Ke=$e[0];$e=$e[1];const dn=Ke.split("_");B=dn.length>=2&&dn[1]=="type"?B+(Ke+"="+$e+"&"):B+(Ke+"=redacted&")}}}else B=null;else B=O;return"XMLHTTP REQ ("+y+") [attempt "+N+"]: "+h+`
`+f+`
`+B})}function LI(a,h,f,y,N,O,B){a.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+N+"]: "+h+`
`+f+`
`+O+" "+B})}function Mi(a,h,f,y){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+FI(a,f)+(y?" "+y:"")})}function MI(a,h){a.info(function(){return"TIMEOUT: "+h})}qs.prototype.info=function(){};function FI(a,h){if(!a.g)return h;if(!h)return null;try{const O=JSON.parse(h);if(O){for(a=0;a<O.length;a++)if(Array.isArray(O[a])){var f=O[a];if(!(f.length<2)){var y=f[1];if(Array.isArray(y)&&!(y.length<1)){var N=y[0];if(N!="noop"&&N!="stop"&&N!="close")for(let B=1;B<y.length;B++)y[B]=""}}}}return Rc(O)}catch{return h}}var Fa={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},mg={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},yg;function xc(){}p(xc,cg),xc.prototype.g=function(){return new XMLHttpRequest},yg=new xc;function Hs(a){return encodeURIComponent(String(a))}function jI(a){var h=1;a=a.split(":");const f=[];for(;h>0&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function tr(a,h,f,y){this.j=a,this.i=h,this.l=f,this.S=y||1,this.V=new zs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new _g}function _g(){this.i=null,this.g="",this.h=!1}var vg={},bc={};function Nc(a,h,f){a.M=1,a.A=Ua(hn(h)),a.u=f,a.R=!0,wg(a,null)}function wg(a,h){a.F=Date.now(),ja(a),a.B=hn(a.A);var f=a.B,y=a.S;Array.isArray(y)||(y=[String(y)]),Dg(f.i,"t",y),a.C=0,f=a.j.L,a.h=new _g,a.g=Jg(a.j,f?h:null,!a.u),a.P>0&&(a.O=new NI(c(a.Y,a,a.g),a.P)),h=a.V,f=a.g,y=a.ba;var N="readystatechange";Array.isArray(N)||(N&&(lg[0]=N.toString()),N=lg);for(let O=0;O<N.length;O++){const B=rg(f,N[O],y||h.handleEvent,!1,h.h||h);if(!B)break;h.g[B.key]=B}h=a.J?me(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),$s(),VI(a.i,a.v,a.B,a.l,a.S,a.u)}tr.prototype.ba=function(a){a=a.target;const h=this.O;h&&ir(a)==3?h.j():this.Y(a)},tr.prototype.Y=function(a){try{if(a==this.g)e:{const re=ir(this.g),$e=this.g.ya(),ye=this.g.ca();if(!(re<3)&&(re!=3||this.g&&(this.h.h||this.g.la()||Ug(this.g)))){this.K||re!=4||$e==7||($e==8||ye<=0?$s(3):$s(2)),Dc(this);var h=this.g.ca();this.X=h;var f=UI(this);if(this.o=h==200,LI(this.i,this.v,this.B,this.l,this.S,re,h),this.o){if(this.U&&!this.L){t:{if(this.g){var y,N=this.g;if((y=N.g?N.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(y)){var O=y;break t}}O=null}if(a=O)Mi(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Oc(this,a);else{this.o=!1,this.m=3,yt(12),Xr(this),Ks(this);break e}}if(this.R){a=!0;let Ke;for(;!this.K&&this.C<f.length;)if(Ke=zI(this,f),Ke==bc){re==4&&(this.m=4,yt(14),a=!1),Mi(this.i,this.l,null,"[Incomplete Response]");break}else if(Ke==vg){this.m=4,yt(15),Mi(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else Mi(this.i,this.l,Ke,null),Oc(this,Ke);if(Eg(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),re!=4||f.length!=0||this.h.h||(this.m=1,yt(16),a=!1),this.o=this.o&&a,!a)Mi(this.i,this.l,f,"[Invalid Chunked Response]"),Xr(this),Ks(this);else if(f.length>0&&!this.W){this.W=!0;var B=this.j;B.g==this&&B.aa&&!B.P&&(B.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),Bc(B),B.P=!0,yt(11))}}else Mi(this.i,this.l,f,null),Oc(this,f);re==4&&Xr(this),this.o&&!this.K&&(re==4?Kg(this.j,this):(this.o=!1,ja(this)))}else tS(this.g),h==400&&f.indexOf("Unknown SID")>0?(this.m=3,yt(12)):(this.m=0,yt(13)),Xr(this),Ks(this)}}}catch{}finally{}};function UI(a){if(!Eg(a))return a.g.la();const h=Ug(a.g);if(h==="")return"";let f="";const y=h.length,N=ir(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Xr(a),Ks(a),"";a.h.i=new o.TextDecoder}for(let O=0;O<y;O++)a.h.h=!0,f+=a.h.i.decode(h[O],{stream:!(N&&O==y-1)});return h.length=0,a.h.g+=f,a.C=0,a.h.g}function Eg(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function zI(a,h){var f=a.C,y=h.indexOf(`
`,f);return y==-1?bc:(f=Number(h.substring(f,y)),isNaN(f)?vg:(y+=1,y+f>h.length?bc:(h=h.slice(y,y+f),a.C=y+f,h)))}tr.prototype.cancel=function(){this.K=!0,Xr(this)};function ja(a){a.T=Date.now()+a.H,Tg(a,a.H)}function Tg(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Ws(c(a.aa,a),h)}function Dc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}tr.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(MI(this.i,this.B),this.M!=2&&($s(),yt(17)),Xr(this),this.m=2,Ks(this)):Tg(this,this.T-a)};function Ks(a){a.j.I==0||a.K||Kg(a.j,a)}function Xr(a){Dc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,ug(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function Oc(a,h){try{var f=a.j;if(f.I!=0&&(f.g==a||Vc(f.h,a))){if(!a.L&&Vc(f.h,a)&&f.I==3){try{var y=f.Ba.g.parse(h)}catch{y=null}if(Array.isArray(y)&&y.length==3){var N=y;if(N[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)qa(f),$a(f);else break e;zc(f),yt(18)}}else f.xa=N[1],0<f.xa-f.K&&N[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=Ws(c(f.Va,f),6e3));kg(f.h)<=1&&f.ta&&(f.ta=void 0)}else ei(f,11)}else if((a.L||f.g==a)&&qa(f),!E(h))for(N=f.Ba.g.parse(h),h=0;h<N.length;h++){let ye=N[h];const Ke=ye[0];if(!(Ke<=f.K))if(f.K=Ke,ye=ye[1],f.I==2)if(ye[0]=="c"){f.M=ye[1],f.ba=ye[2];const dn=ye[3];dn!=null&&(f.ka=dn,f.j.info("VER="+f.ka));const ti=ye[4];ti!=null&&(f.za=ti,f.j.info("SVER="+f.za));const sr=ye[5];sr!=null&&typeof sr=="number"&&sr>0&&(y=1.5*sr,f.O=y,f.j.info("backChannelRequestTimeoutMs_="+y)),y=f;const or=a.g;if(or){const Ka=or.g?or.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ka){var O=y.h;O.g||Ka.indexOf("spdy")==-1&&Ka.indexOf("quic")==-1&&Ka.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(Lc(O,O.h),O.h=null))}if(y.G){const $c=or.g?or.g.getResponseHeader("X-HTTP-Session-Id"):null;$c&&(y.wa=$c,Ee(y.J,y.G,$c))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),y=f;var B=a;if(y.na=Yg(y,y.L?y.ba:null,y.W),B.L){Ag(y.h,B);var re=B,$e=y.O;$e&&(re.H=$e),re.D&&(Dc(re),ja(re)),y.g=B}else qg(y);f.i.length>0&&Wa(f)}else ye[0]!="stop"&&ye[0]!="close"||ei(f,7);else f.I==3&&(ye[0]=="stop"||ye[0]=="close"?ye[0]=="stop"?ei(f,7):Uc(f):ye[0]!="noop"&&f.l&&f.l.qa(ye),f.A=0)}}$s(4)}catch{}}var BI=class{constructor(a,h){this.g=a,this.map=h}};function Ig(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Sg(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function kg(a){return a.h?1:a.g?a.g.size:0}function Vc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Lc(a,h){a.g?a.g.add(h):a.h=h}function Ag(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Ig.prototype.cancel=function(){if(this.i=Rg(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Rg(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.G);return h}return A(a.i)}var Cg=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function $I(a,h){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const y=a[f].indexOf("=");let N,O=null;y>=0?(N=a[f].substring(0,y),O=a[f].substring(y+1)):N=a[f],h(N,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function nr(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof nr?(this.l=a.l,Gs(this,a.j),this.o=a.o,this.g=a.g,Qs(this,a.u),this.h=a.h,Mc(this,Og(a.i)),this.m=a.m):a&&(h=String(a).match(Cg))?(this.l=!1,Gs(this,h[1]||"",!0),this.o=Ys(h[2]||""),this.g=Ys(h[3]||"",!0),Qs(this,h[4]),this.h=Ys(h[5]||"",!0),Mc(this,h[6]||"",!0),this.m=Ys(h[7]||"")):(this.l=!1,this.i=new Xs(null,this.l))}nr.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Js(h,Pg,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Js(h,Pg,!0),"@"),a.push(Hs(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Js(f,f.charAt(0)=="/"?HI:qI,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Js(f,GI)),a.join("")},nr.prototype.resolve=function(a){const h=hn(this);let f=!!a.j;f?Gs(h,a.j):f=!!a.o,f?h.o=a.o:f=!!a.g,f?h.g=a.g:f=a.u!=null;var y=a.h;if(f)Qs(h,a.u);else if(f=!!a.h){if(y.charAt(0)!="/")if(this.g&&!this.h)y="/"+y;else{var N=h.h.lastIndexOf("/");N!=-1&&(y=h.h.slice(0,N+1)+y)}if(N=y,N==".."||N==".")y="";else if(N.indexOf("./")!=-1||N.indexOf("/.")!=-1){y=N.lastIndexOf("/",0)==0,N=N.split("/");const O=[];for(let B=0;B<N.length;){const re=N[B++];re=="."?y&&B==N.length&&O.push(""):re==".."?((O.length>1||O.length==1&&O[0]!="")&&O.pop(),y&&B==N.length&&O.push("")):(O.push(re),y=!0)}y=O.join("/")}else y=N}return f?h.h=y:f=a.i.toString()!=="",f?Mc(h,Og(a.i)):f=!!a.m,f&&(h.m=a.m),h};function hn(a){return new nr(a)}function Gs(a,h,f){a.j=f?Ys(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Qs(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Mc(a,h,f){h instanceof Xs?(a.i=h,QI(a.i,a.l)):(f||(h=Js(h,KI)),a.i=new Xs(h,a.l))}function Ee(a,h,f){a.i.set(h,f)}function Ua(a){return Ee(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Ys(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Js(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,WI),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function WI(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Pg=/[#\/\?@]/g,qI=/[#\?:]/g,HI=/[#\?]/g,KI=/[#\?@]/g,GI=/#/g;function Xs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Zr(a){a.g||(a.g=new Map,a.h=0,a.i&&$I(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}t=Xs.prototype,t.add=function(a,h){Zr(this),this.i=null,a=Fi(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function xg(a,h){Zr(a),h=Fi(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function bg(a,h){return Zr(a),h=Fi(a,h),a.g.has(h)}t.forEach=function(a,h){Zr(this),this.g.forEach(function(f,y){f.forEach(function(N){a.call(h,N,y,this)},this)},this)};function Ng(a,h){Zr(a);let f=[];if(typeof h=="string")bg(a,h)&&(f=f.concat(a.g.get(Fi(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)f=f.concat(a[h]);return f}t.set=function(a,h){return Zr(this),this.i=null,a=Fi(this,a),bg(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=Ng(this,a),a.length>0?String(a[0]):h):h};function Dg(a,h,f){xg(a,h),f.length>0&&(a.i=null,a.g.set(Fi(a,h),A(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let y=0;y<h.length;y++){var f=h[y];const N=Hs(f);f=Ng(this,f);for(let O=0;O<f.length;O++){let B=N;f[O]!==""&&(B+="="+Hs(f[O])),a.push(B)}}return this.i=a.join("&")};function Og(a){const h=new Xs;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function Fi(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function QI(a,h){h&&!a.j&&(Zr(a),a.i=null,a.g.forEach(function(f,y){const N=y.toLowerCase();y!=N&&(xg(this,y),Dg(this,N,f))},a)),a.j=h}function YI(a,h){const f=new qs;if(o.Image){const y=new Image;y.onload=d(rr,f,"TestLoadImage: loaded",!0,h,y),y.onerror=d(rr,f,"TestLoadImage: error",!1,h,y),y.onabort=d(rr,f,"TestLoadImage: abort",!1,h,y),y.ontimeout=d(rr,f,"TestLoadImage: timeout",!1,h,y),o.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=a}else h(!1)}function JI(a,h){const f=new qs,y=new AbortController,N=setTimeout(()=>{y.abort(),rr(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:y.signal}).then(O=>{clearTimeout(N),O.ok?rr(f,"TestPingServer: ok",!0,h):rr(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(N),rr(f,"TestPingServer: error",!1,h)})}function rr(a,h,f,y,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),y(f)}catch{}}function XI(){this.g=new OI}function Fc(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Fc,cg),Fc.prototype.g=function(){return new za(this.i,this.h)};function za(a,h){it.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(za,it),t=za.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,eo(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Zs(this)),this.readyState=0},t.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,eo(this)),this.g&&(this.readyState=3,eo(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Vg(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Vg(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}t.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Zs(this):eo(this),this.readyState==3&&Vg(this)}},t.Oa=function(a){this.g&&(this.response=this.responseText=a,Zs(this))},t.Na=function(a){this.g&&(this.response=a,Zs(this))},t.ga=function(){this.g&&Zs(this)};function Zs(a){a.readyState=4,a.l=null,a.j=null,a.B=null,eo(a)}t.setRequestHeader=function(a,h){this.A.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function eo(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(za.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Lg(a){let h="";return K(a,function(f,y){h+=y,h+=":",h+=f,h+=`\r
`}),h}function jc(a,h,f){e:{for(y in f){var y=!1;break e}y=!0}y||(f=Lg(f),typeof a=="string"?f!=null&&Hs(f):Ee(a,h,f))}function be(a){it.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(be,it);var ZI=/^https?$/i,eS=["POST","PUT"];t=be.prototype,t.Fa=function(a){this.H=a},t.ea=function(a,h,f,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():yg.g(),this.g.onreadystatechange=g(c(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(O){Mg(this,O);return}if(a=f||"",f=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var N in y)f.set(N,y[N]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const O of y.keys())f.set(O,y.get(O));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(f.keys()).find(O=>O.toLowerCase()=="content-type"),N=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(eS,h,void 0)>=0)||y||N||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[O,B]of f)this.g.setRequestHeader(O,B);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(O){Mg(this,O)}};function Mg(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Fg(a),Ba(a)}function Fg(a){a.A||(a.A=!0,mt(a,"complete"),mt(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,mt(this,"complete"),mt(this,"abort"),Ba(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ba(this,!0)),be.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?jg(this):this.Xa())},t.Xa=function(){jg(this)};function jg(a){if(a.h&&typeof s<"u"){if(a.v&&ir(a)==4)setTimeout(a.Ca.bind(a),0);else if(mt(a,"readystatechange"),ir(a)==4){a.h=!1;try{const O=a.ca();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var y;if(y=O===0){let B=String(a.D).match(Cg)[1]||null;!B&&o.self&&o.self.location&&(B=o.self.location.protocol.slice(0,-1)),y=!ZI.test(B?B.toLowerCase():"")}f=y}if(f)mt(a,"complete"),mt(a,"success");else{a.o=6;try{var N=ir(a)>2?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.ca()+"]",Fg(a)}}finally{Ba(a)}}}}function Ba(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,h||mt(a,"ready");try{f.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function ir(a){return a.g?a.g.readyState:0}t.ca=function(){try{return ir(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),DI(h)}};function Ug(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function tS(a){const h={};a=(a.g&&ir(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<a.length;y++){if(E(a[y]))continue;var f=jI(a[y]);const N=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const O=h[N]||[];h[N]=O,O.push(f)}Z(h,function(y){return y.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function to(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function zg(a){this.za=0,this.i=[],this.j=new qs,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=to("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=to("baseRetryDelayMs",5e3,a),this.Za=to("retryDelaySeedMs",1e4,a),this.Ta=to("forwardChannelMaxRetries",2,a),this.va=to("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Ig(a&&a.concurrentRequestLimit),this.Ba=new XI,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=zg.prototype,t.ka=8,t.I=1,t.connect=function(a,h,f,y){yt(0),this.W=a,this.H=h||{},f&&y!==void 0&&(this.H.OSID=f,this.H.OAID=y),this.F=this.X,this.J=Yg(this,null,this.W),Wa(this)};function Uc(a){if(Bg(a),a.I==3){var h=a.V++,f=hn(a.J);if(Ee(f,"SID",a.M),Ee(f,"RID",h),Ee(f,"TYPE","terminate"),no(a,f),h=new tr(a,a.j,h),h.M=2,h.A=Ua(hn(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=h.A,f=!0),f||(h.g=Jg(h.j,null),h.g.ea(h.A)),h.F=Date.now(),ja(h)}Qg(a)}function $a(a){a.g&&(Bc(a),a.g.cancel(),a.g=null)}function Bg(a){$a(a),a.v&&(o.clearTimeout(a.v),a.v=null),qa(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Wa(a){if(!Sg(a.h)&&!a.m){a.m=!0;var h=a.Ea;L||m(),U||(L(),U=!0),w.add(h,a),a.D=0}}function nS(a,h){return kg(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Ws(c(a.Ea,a,h),Gg(a,a.D)),a.D++,!0)}t.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const N=new tr(this,this.j,a);let O=this.o;if(this.U&&(O?(O=me(O),xn(O,this.U)):O=this.U),this.u!==null||this.R||(N.J=O,O=null),this.S)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var y=this.i[f];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(h+=y,h>4096){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Wg(this,N,h),f=hn(this.J),Ee(f,"RID",a),Ee(f,"CVER",22),this.G&&Ee(f,"X-HTTP-Session-Id",this.G),no(this,f),O&&(this.R?h="headers="+Hs(Lg(O))+"&"+h:this.u&&jc(f,this.u,O)),Lc(this.h,N),this.Ra&&Ee(f,"TYPE","init"),this.S?(Ee(f,"$req",h),Ee(f,"SID","null"),N.U=!0,Nc(N,f,null)):Nc(N,f,h),this.I=2}}else this.I==3&&(a?$g(this,a):this.i.length==0||Sg(this.h)||$g(this))};function $g(a,h){var f;h?f=h.l:f=a.V++;const y=hn(a.J);Ee(y,"SID",a.M),Ee(y,"RID",f),Ee(y,"AID",a.K),no(a,y),a.u&&a.o&&jc(y,a.u,a.o),f=new tr(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Wg(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Lc(a.h,f),Nc(f,y,h)}function no(a,h){a.H&&K(a.H,function(f,y){Ee(h,y,f)}),a.l&&K({},function(f,y){Ee(h,y,f)})}function Wg(a,h,f){f=Math.min(a.i.length,f);const y=a.l?c(a.l.Ka,a.l,a):null;e:{var N=a.i;let re=-1;for(;;){const $e=["count="+f];re==-1?f>0?(re=N[0].g,$e.push("ofs="+re)):re=0:$e.push("ofs="+re);let ye=!0;for(let Ke=0;Ke<f;Ke++){var O=N[Ke].g;const dn=N[Ke].map;if(O-=re,O<0)re=Math.max(0,N[Ke].g-100),ye=!1;else try{O="req"+O+"_"||"";try{var B=dn instanceof Map?dn:Object.entries(dn);for(const[ti,sr]of B){let or=sr;l(sr)&&(or=Rc(sr)),$e.push(O+ti+"="+encodeURIComponent(or))}}catch(ti){throw $e.push(O+"type="+encodeURIComponent("_badmap")),ti}}catch{y&&y(dn)}}if(ye){B=$e.join("&");break e}}B=void 0}return a=a.i.splice(0,f),h.G=a,B}function qg(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;L||m(),U||(L(),U=!0),w.add(h,a),a.A=0}}function zc(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Ws(c(a.Da,a),Gg(a,a.A)),a.A++,!0)}t.Da=function(){if(this.v=null,Hg(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Ws(c(this.Wa,this),a)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,yt(10),$a(this),Hg(this))};function Bc(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Hg(a){a.g=new tr(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=hn(a.na);Ee(h,"RID","rpc"),Ee(h,"SID",a.M),Ee(h,"AID",a.K),Ee(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&Ee(h,"TO",a.ia),Ee(h,"TYPE","xmlhttp"),no(a,h),a.u&&a.o&&jc(h,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=Ua(hn(h)),f.u=null,f.R=!0,wg(f,a)}t.Va=function(){this.C!=null&&(this.C=null,$a(this),zc(this),yt(19))};function qa(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Kg(a,h){var f=null;if(a.g==h){qa(a),Bc(a),a.g=null;var y=2}else if(Vc(a.h,h))f=h.G,Ag(a.h,h),y=1;else return;if(a.I!=0){if(h.o)if(y==1){f=h.u?h.u.length:0,h=Date.now()-h.F;var N=a.D;y=Ma(),mt(y,new gg(y,f)),Wa(a)}else qg(a);else if(N=h.m,N==3||N==0&&h.X>0||!(y==1&&nS(a,h)||y==2&&zc(a)))switch(f&&f.length>0&&(h=a.h,h.i=h.i.concat(f)),N){case 1:ei(a,5);break;case 4:ei(a,10);break;case 3:ei(a,6);break;default:ei(a,2)}}}function Gg(a,h){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*h}function ei(a,h){if(a.j.info("Error code "+h),h==2){var f=c(a.bb,a),y=a.Ua;const N=!y;y=new nr(y||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Gs(y,"https"),Ua(y),N?YI(y.toString(),f):JI(y.toString(),f)}else yt(2);a.I=0,a.l&&a.l.pa(h),Qg(a),Bg(a)}t.bb=function(a){a?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function Qg(a){if(a.I=0,a.ja=[],a.l){const h=Rg(a.h);(h.length!=0||a.i.length!=0)&&(P(a.ja,h),P(a.ja,a.i),a.h.i.length=0,A(a.i),a.i.length=0),a.l.oa()}}function Yg(a,h,f){var y=f instanceof nr?hn(f):new nr(f);if(y.g!="")h&&(y.g=h+"."+y.g),Qs(y,y.u);else{var N=o.location;y=N.protocol,h=h?h+"."+N.hostname:N.hostname,N=+N.port;const O=new nr(null);y&&Gs(O,y),h&&(O.g=h),N&&Qs(O,N),f&&(O.h=f),y=O}return f=a.G,h=a.wa,f&&h&&Ee(y,f,h),Ee(y,"VER",a.ka),no(a,y),y}function Jg(a,h,f){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new be(new Fc({ab:f})):new be(a.ma),h.Fa(a.L),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Xg(){}t=Xg.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function Ha(){}Ha.prototype.g=function(a,h){return new bt(a,h)};function bt(a,h){it.call(this),this.g=new zg(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!E(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!E(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new ji(this)}p(bt,it),bt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},bt.prototype.close=function(){Uc(this.g)},bt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=Rc(a),a=f);h.i.push(new BI(h.Ya++,a)),h.I==3&&Wa(h)},bt.prototype.N=function(){this.g.l=null,delete this.j,Uc(this.g),delete this.g,bt.Z.N.call(this)};function Zg(a){Cc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(Zg,Cc);function em(){Pc.call(this),this.status=1}p(em,Pc);function ji(a){this.g=a}p(ji,Xg),ji.prototype.ra=function(){mt(this.g,"a")},ji.prototype.qa=function(a){mt(this.g,new Zg(a))},ji.prototype.pa=function(a){mt(this.g,new em)},ji.prototype.oa=function(){mt(this.g,"b")},Ha.prototype.createWebChannel=Ha.prototype.g,bt.prototype.send=bt.prototype.o,bt.prototype.open=bt.prototype.m,bt.prototype.close=bt.prototype.close,C0=function(){return new Ha},R0=function(){return Ma()},A0=Jr,Fd={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Fa.NO_ERROR=0,Fa.TIMEOUT=8,Fa.HTTP_ERROR=6,Dl=Fa,mg.COMPLETE="complete",k0=mg,hg.EventType=Bs,Bs.OPEN="a",Bs.CLOSE="b",Bs.ERROR="c",Bs.MESSAGE="d",it.prototype.listen=it.prototype.J,vo=hg,be.prototype.listenOnce=be.prototype.K,be.prototype.getLastError=be.prototype.Ha,be.prototype.getLastErrorCode=be.prototype.ya,be.prototype.getStatus=be.prototype.ca,be.prototype.getResponseJson=be.prototype.La,be.prototype.getResponseText=be.prototype.la,be.prototype.send=be.prototype.ea,be.prototype.setWithCredentials=be.prototype.Fa,S0=be}).apply(typeof dl<"u"?dl:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}lt.UNAUTHENTICATED=new lt(null),lt.GOOGLE_CREDENTIALS=new lt("google-credentials-uid"),lt.FIRST_PARTY=new lt("first-party-uid"),lt.MOCK_USER=new lt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ms="12.12.0";function _x(t){Ms=t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii=new ep("@firebase/firestore");function Bi(){return Ii.logLevel}function q(t,...e){if(Ii.logLevel<=oe.DEBUG){const n=e.map(hp);Ii.debug(`Firestore (${Ms}): ${t}`,...n)}}function Jn(t,...e){if(Ii.logLevel<=oe.ERROR){const n=e.map(hp);Ii.error(`Firestore (${Ms}): ${t}`,...n)}}function Si(t,...e){if(Ii.logLevel<=oe.WARN){const n=e.map(hp);Ii.warn(`Firestore (${Ms}): ${t}`,...n)}}function hp(t){if(typeof t=="string")return t;try{return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,P0(t,r,n)}function P0(t,e,n){let r=`FIRESTORE (${Ms}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw Jn(r),new Error(r)}function pe(t,e,n,r){let i="Unexpected state";typeof n=="string"?i=n:r=n,t||P0(e,i,r)}function ee(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends Pn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x0{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class vx{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(lt.UNAUTHENTICATED))}shutdown(){}}class wx{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class Ex{constructor(e){this.t=e,this.currentUser=lt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){pe(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new En;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new En,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(q("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new En)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(pe(typeof r.accessToken=="string",31837,{l:r}),new x0(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return pe(e===null||typeof e=="string",2055,{h:e}),new lt(e)}}class Tx{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=lt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Ix{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new Tx(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(lt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Yy{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Sx{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Zt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){pe(this.o===void 0,3512);const r=s=>{s.error!=null&&q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,q("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Yy(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(pe(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Yy(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kx(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=kx(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%62))}return r}}function ae(t,e){return t<e?-1:t>e?1:0}function jd(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const i=t.charAt(r),s=e.charAt(r);if(i!==s)return kh(i)===kh(s)?ae(i,s):kh(i)?1:-1}return ae(t.length,e.length)}const Ax=55296,Rx=57343;function kh(t){const e=t.charCodeAt(0);return e>=Ax&&e<=Rx}function Is(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy="__name__";class gn{constructor(e,n,r){n===void 0?n=0:n>e.length&&J(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&J(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return gn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof gn?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=gn.compareSegments(e.get(i),n.get(i));if(s!==0)return s}return ae(e.length,n.length)}static compareSegments(e,n){const r=gn.isNumericId(e),i=gn.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?gn.extractNumericId(e).compare(gn.extractNumericId(n)):jd(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Nr.fromString(e.substring(4,e.length-2))}}class ve extends gn{construct(e,n,r){return new ve(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new ve(n)}static emptyPath(){return new ve([])}}const Cx=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class et extends gn{construct(e,n,r){return new et(e,n,r)}static isValidIdentifier(e){return Cx.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),et.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Jy}static keyField(){return new et([Jy])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new W(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(r+=l,i++):(s(),i++)}if(s(),o)throw new W(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new et(n)}static emptyPath(){return new et([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(ve.fromString(e))}static fromName(e){return new G(ve.fromString(e).popFirst(5))}static empty(){return new G(ve.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ve.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return ve.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new ve(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b0(t,e,n){if(!n)throw new W(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Px(t,e,n,r){if(e===!0&&r===!0)throw new W(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Xy(t){if(!G.isDocumentKey(t))throw new W(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Zy(t){if(G.isDocumentKey(t))throw new W(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function N0(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function nc(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":J(12329,{type:typeof t})}function Et(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new W(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=nc(t);throw new W(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(t,e){const n={typeString:t};return e&&(n.value=e),n}function Ra(t,e){if(!N0(t))throw new W(M.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new W(M.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e_=-62135596800,t_=1e6;class Ie{static now(){return Ie.fromMillis(Date.now())}static fromDate(e){return Ie.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*t_);return new Ie(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<e_)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/t_}_compareTo(e){return this.seconds===e.seconds?ae(this.nanoseconds,e.nanoseconds):ae(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ra(e,Ie._jsonSchema))return new Ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-e_;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ie._jsonSchemaVersion="firestore/timestamp/1.0",Ie._jsonSchema={type:ze("string",Ie._jsonSchemaVersion),seconds:ze("number"),nanoseconds:ze("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{static fromTimestamp(e){return new te(e)}static min(){return new te(new Ie(0,0))}static max(){return new te(new Ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa=-1;function xx(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=te.fromTimestamp(r===1e9?new Ie(n+1,0):new Ie(n,r));return new Lr(i,G.empty(),e)}function bx(t){return new Lr(t.readTime,t.key,oa)}class Lr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Lr(te.min(),G.empty(),oa)}static max(){return new Lr(te.max(),G.empty(),oa)}}function Nx(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=G.comparator(t.documentKey,e.documentKey),n!==0?n:ae(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dx="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ox{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fs(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==Dx)throw t;q("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&J(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new F((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof F?n:F.resolve(n)}catch(n){return F.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):F.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):F.reject(n)}static resolve(e){return new F((n,r)=>{n(e)})}static reject(e){return new F((n,r)=>{r(e)})}static waitFor(e){return new F((n,r)=>{let i=0,s=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=F.resolve(!1);for(const r of e)n=n.next(i=>i?F.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new F((r,i)=>{const s=e.length,o=new Array(s);let l=0;for(let u=0;u<s;u++){const c=u;n(e[c]).next(d=>{o[c]=d,++l,l===s&&r(o)},d=>i(d))}})}static doWhile(e,n){return new F((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function Vx(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function js(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}rc.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fp=-1;function ic(t){return t==null}function yu(t){return t===0&&1/t==-1/0}function Lx(t){return typeof t=="number"&&Number.isInteger(t)&&!yu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D0="";function Mx(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=n_(e)),e=Fx(t.get(n),e);return n_(e)}function Fx(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const s=t.charAt(i);switch(s){case"\0":n+="";break;case D0:n+="";break;default:n+=s}}return n}function n_(t){return t+D0+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r_(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Gr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function jx(t,e){const n=[];for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.push(e(t[r],r,t));return n}function O0(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,n){this.comparator=e,this.root=n||Ze.EMPTY}insert(e,n){return new xe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ze.BLACK,null,null))}remove(e){return new xe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ze.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new fl(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new fl(this.root,e,this.comparator,!1)}getReverseIterator(){return new fl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new fl(this.root,e,this.comparator,!0)}}class fl{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ze{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Ze.RED,this.left=i??Ze.EMPTY,this.right=s??Ze.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Ze(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ze.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Ze.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ze.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ze.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw J(43730,{key:this.key,value:this.value});if(this.right.isRed())throw J(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw J(27949);return e+(this.isRed()?0:1)}}Ze.EMPTY=null,Ze.RED=!0,Ze.BLACK=!1;Ze.EMPTY=new class{constructor(){this.size=0}get key(){throw J(57766)}get value(){throw J(16141)}get color(){throw J(16727)}get left(){throw J(29726)}get right(){throw J(36894)}copy(e,n,r,i,s){return this}insert(e,n,r){return new Ze(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.comparator=e,this.data=new xe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new i_(this.data.getIterator())}getIteratorFrom(e){return new i_(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof He)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new He(this.comparator);return n.data=e,n}}class i_{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e){this.fields=e,e.sort(et.comparator)}static empty(){return new Ot([])}unionWith(e){let n=new He(et.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Ot(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Is(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new V0("Invalid base64 string: "+s):s}}(e);return new rt(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new rt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ae(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}rt.EMPTY_BYTE_STRING=new rt("");const Ux=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Mr(t){if(pe(!!t,39018),typeof t=="string"){let e=0;const n=Ux.exec(t);if(pe(!!n,46558,{timestamp:t}),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Le(t.seconds),nanos:Le(t.nanos)}}function Le(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Fr(t){return typeof t=="string"?rt.fromBase64String(t):rt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L0="server_timestamp",M0="__type__",F0="__previous_value__",j0="__local_write_time__";function pp(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[M0])==null?void 0:r.stringValue)===L0}function sc(t){const e=t.mapValue.fields[F0];return pp(e)?sc(e):e}function aa(t){const e=Mr(t.mapValue.fields[j0].timestampValue);return new Ie(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zx{constructor(e,n,r,i,s,o,l,u,c,d,p){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=d,this.apiKey=p}}const _u="(default)";class la{constructor(e,n){this.projectId=e,this.database=n||_u}static empty(){return new la("","")}get isDefaultDatabase(){return this.database===_u}isEqual(e){return e instanceof la&&e.projectId===this.projectId&&e.database===this.database}}function Bx(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new W(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new la(t.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U0="__type__",$x="__max__",pl={mapValue:{}},z0="__vector__",vu="value";function jr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?pp(t)?4:qx(t)?9007199254740991:Wx(t)?10:11:J(28295,{value:t})}function Rn(t,e){if(t===e)return!0;const n=jr(t);if(n!==jr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return aa(t).isEqual(aa(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Mr(i.timestampValue),l=Mr(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return Fr(i.bytesValue).isEqual(Fr(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return Le(i.geoPointValue.latitude)===Le(s.geoPointValue.latitude)&&Le(i.geoPointValue.longitude)===Le(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Le(i.integerValue)===Le(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Le(i.doubleValue),l=Le(s.doubleValue);return o===l?yu(o)===yu(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return Is(t.arrayValue.values||[],e.arrayValue.values||[],Rn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},l=s.mapValue.fields||{};if(r_(o)!==r_(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!Rn(o[u],l[u])))return!1;return!0}(t,e);default:return J(52216,{left:t})}}function ua(t,e){return(t.values||[]).find(n=>Rn(n,e))!==void 0}function Ss(t,e){if(t===e)return 0;const n=jr(t),r=jr(e);if(n!==r)return ae(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ae(t.booleanValue,e.booleanValue);case 2:return function(s,o){const l=Le(s.integerValue||s.doubleValue),u=Le(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return s_(t.timestampValue,e.timestampValue);case 4:return s_(aa(t),aa(e));case 5:return jd(t.stringValue,e.stringValue);case 6:return function(s,o){const l=Fr(s),u=Fr(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const l=s.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const d=ae(l[c],u[c]);if(d!==0)return d}return ae(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const l=ae(Le(s.latitude),Le(o.latitude));return l!==0?l:ae(Le(s.longitude),Le(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return o_(t.arrayValue,e.arrayValue);case 10:return function(s,o){var g,A,P,x;const l=s.fields||{},u=o.fields||{},c=(g=l[vu])==null?void 0:g.arrayValue,d=(A=u[vu])==null?void 0:A.arrayValue,p=ae(((P=c==null?void 0:c.values)==null?void 0:P.length)||0,((x=d==null?void 0:d.values)==null?void 0:x.length)||0);return p!==0?p:o_(c,d)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===pl.mapValue&&o===pl.mapValue)return 0;if(s===pl.mapValue)return 1;if(o===pl.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),c=o.fields||{},d=Object.keys(c);u.sort(),d.sort();for(let p=0;p<u.length&&p<d.length;++p){const g=jd(u[p],d[p]);if(g!==0)return g;const A=Ss(l[u[p]],c[d[p]]);if(A!==0)return A}return ae(u.length,d.length)}(t.mapValue,e.mapValue);default:throw J(23264,{he:n})}}function s_(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ae(t,e);const n=Mr(t),r=Mr(e),i=ae(n.seconds,r.seconds);return i!==0?i:ae(n.nanos,r.nanos)}function o_(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=Ss(n[i],r[i]);if(s)return s}return ae(n.length,r.length)}function ks(t){return Ud(t)}function Ud(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Mr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Fr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return G.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=Ud(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Ud(n.fields[o])}`;return i+"}"}(t.mapValue):J(61005,{value:t})}function Ol(t){switch(jr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=sc(t);return e?16+Ol(e):16;case 5:return 2*t.stringValue.length;case 6:return Fr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Ol(s),0)}(t.arrayValue);case 10:case 11:return function(r){let i=0;return Gr(r.fields,(s,o)=>{i+=s.length+Ol(o)}),i}(t.mapValue);default:throw J(13486,{value:t})}}function a_(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function zd(t){return!!t&&"integerValue"in t}function gp(t){return!!t&&"arrayValue"in t}function l_(t){return!!t&&"nullValue"in t}function u_(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Vl(t){return!!t&&"mapValue"in t}function Wx(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[U0])==null?void 0:r.stringValue)===z0}function Do(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Gr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Do(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Do(t.arrayValue.values[n]);return e}return{...t}}function qx(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===$x}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.value=e}static empty(){return new vt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Vl(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Do(n)}setAll(e){let n=et.emptyPath(),r={},i=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}o?r[l.lastSegment()]=Do(o):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Vl(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Rn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Vl(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Gr(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new vt(Do(this.value))}}function B0(t){const e=[];return Gr(t.fields,(n,r)=>{const i=new et([n]);if(Vl(r)){const s=B0(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Ot(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,n,r,i,s,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new ct(e,0,te.min(),te.min(),te.min(),vt.empty(),0)}static newFoundDocument(e,n,r,i){return new ct(e,1,n,te.min(),r,i,0)}static newNoDocument(e,n){return new ct(e,2,n,te.min(),te.min(),vt.empty(),0)}static newUnknownDocument(e,n){return new ct(e,3,n,te.min(),te.min(),vt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=vt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=vt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ct&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ct(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e,n){this.position=e,this.inclusive=n}}function c_(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),n.key):r=Ss(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function h_(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Rn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e,n="asc"){this.field=e,this.dir=n}}function Hx(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $0{}class Ue extends $0{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new Gx(e,n,r):n==="array-contains"?new Jx(e,r):n==="in"?new Xx(e,r):n==="not-in"?new Zx(e,r):n==="array-contains-any"?new eb(e,r):new Ue(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new Qx(e,r):new Yx(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Ss(n,this.value)):n!==null&&jr(this.value)===jr(n)&&this.matchesComparison(Ss(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return J(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class un extends $0{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new un(e,n)}matches(e){return W0(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function W0(t){return t.op==="and"}function q0(t){return Kx(t)&&W0(t)}function Kx(t){for(const e of t.filters)if(e instanceof un)return!1;return!0}function Bd(t){if(t instanceof Ue)return t.field.canonicalString()+t.op.toString()+ks(t.value);if(q0(t))return t.filters.map(e=>Bd(e)).join(",");{const e=t.filters.map(n=>Bd(n)).join(",");return`${t.op}(${e})`}}function H0(t,e){return t instanceof Ue?function(r,i){return i instanceof Ue&&r.op===i.op&&r.field.isEqual(i.field)&&Rn(r.value,i.value)}(t,e):t instanceof un?function(r,i){return i instanceof un&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,l)=>s&&H0(o,i.filters[l]),!0):!1}(t,e):void J(19439)}function K0(t){return t instanceof Ue?function(n){return`${n.field.canonicalString()} ${n.op} ${ks(n.value)}`}(t):t instanceof un?function(n){return n.op.toString()+" {"+n.getFilters().map(K0).join(" ,")+"}"}(t):"Filter"}class Gx extends Ue{constructor(e,n,r){super(e,n,r),this.key=G.fromName(r.referenceValue)}matches(e){const n=G.comparator(e.key,this.key);return this.matchesComparison(n)}}class Qx extends Ue{constructor(e,n){super(e,"in",n),this.keys=G0("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class Yx extends Ue{constructor(e,n){super(e,"not-in",n),this.keys=G0("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function G0(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(r=>G.fromName(r.referenceValue))}class Jx extends Ue{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return gp(n)&&ua(n.arrayValue,this.value)}}class Xx extends Ue{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ua(this.value.arrayValue,n)}}class Zx extends Ue{constructor(e,n){super(e,"not-in",n)}matches(e){if(ua(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!ua(this.value.arrayValue,n)}}class eb extends Ue{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!gp(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ua(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(e,n=null,r=[],i=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=l,this.Te=null}}function d_(t,e=null,n=[],r=[],i=null,s=null,o=null){return new tb(t,e,n,r,i,s,o)}function mp(t){const e=ee(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Bd(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),ic(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ks(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ks(r)).join(",")),e.Te=n}return e.Te}function yp(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Hx(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!H0(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!h_(t.startAt,e.startAt)&&h_(t.endAt,e.endAt)}function $d(t){return G.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e,n=null,r=[],i=[],s=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function nb(t,e,n,r,i,s,o,l){return new Ca(t,e,n,r,i,s,o,l)}function oc(t){return new Ca(t)}function f_(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function rb(t){return G.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function Q0(t){return t.collectionGroup!==null}function Oo(t){const e=ee(t);if(e.Ee===null){e.Ee=[];const n=new Set;for(const s of e.explicitOrderBy)e.Ee.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new He(et.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.Ee.push(new Eu(s,r))}),n.has(et.keyField().canonicalString())||e.Ee.push(new Eu(et.keyField(),r))}return e.Ee}function Tn(t){const e=ee(t);return e.Ie||(e.Ie=Y0(e,Oo(t))),e.Ie}function ib(t){const e=ee(t);return e.Re||(e.Re=Y0(e,t.explicitOrderBy)),e.Re}function Y0(t,e){if(t.limitType==="F")return d_(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Eu(i.field,s)});const n=t.endAt?new wu(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new wu(t.startAt.position,t.startAt.inclusive):null;return d_(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Wd(t,e){const n=t.filters.concat([e]);return new Ca(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function qd(t,e,n){return new Ca(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ac(t,e){return yp(Tn(t),Tn(e))&&t.limitType===e.limitType}function J0(t){return`${mp(Tn(t))}|lt:${t.limitType}`}function $i(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>K0(i)).join(", ")}]`),ic(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>ks(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>ks(i)).join(",")),`Target(${r})`}(Tn(t))}; limitType=${t.limitType})`}function lc(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):G.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of Oo(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,l,u){const c=c_(o,l,u);return o.inclusive?c<=0:c<0}(r.startAt,Oo(r),i)||r.endAt&&!function(o,l,u){const c=c_(o,l,u);return o.inclusive?c>=0:c>0}(r.endAt,Oo(r),i))}(t,e)}function sb(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function X0(t){return(e,n)=>{let r=!1;for(const i of Oo(t)){const s=ob(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function ob(t,e,n){const r=t.field.isKeyField()?G.comparator(e.key,n.key):function(s,o,l){const u=o.data.field(s),c=l.data.field(s);return u!==null&&c!==null?Ss(u,c):J(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return J(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Gr(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return O0(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ab=new xe(G.comparator);function Xn(){return ab}const Z0=new xe(G.comparator);function wo(...t){let e=Z0;for(const n of t)e=e.insert(n.key,n);return e}function eT(t){let e=Z0;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function ui(){return Vo()}function tT(){return Vo()}function Vo(){return new Oi(t=>t.toString(),(t,e)=>t.isEqual(e))}const lb=new xe(G.comparator),ub=new He(G.comparator);function le(...t){let e=ub;for(const n of t)e=e.add(n);return e}const cb=new He(ae);function hb(){return cb}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _p(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:yu(e)?"-0":e}}function nT(t){return{integerValue:""+t}}function db(t,e){return Lx(e)?nT(e):_p(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(){this._=void 0}}function fb(t,e,n){return t instanceof Tu?function(i,s){const o={fields:{[M0]:{stringValue:L0},[j0]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&pp(s)&&(s=sc(s)),s&&(o.fields[F0]=s),{mapValue:o}}(n,e):t instanceof ca?iT(t,e):t instanceof ha?sT(t,e):function(i,s){const o=rT(i,s),l=p_(o)+p_(i.Ae);return zd(o)&&zd(i.Ae)?nT(l):_p(i.serializer,l)}(t,e)}function pb(t,e,n){return t instanceof ca?iT(t,e):t instanceof ha?sT(t,e):n}function rT(t,e){return t instanceof Iu?function(r){return zd(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Tu extends uc{}class ca extends uc{constructor(e){super(),this.elements=e}}function iT(t,e){const n=oT(e);for(const r of t.elements)n.some(i=>Rn(i,r))||n.push(r);return{arrayValue:{values:n}}}class ha extends uc{constructor(e){super(),this.elements=e}}function sT(t,e){let n=oT(e);for(const r of t.elements)n=n.filter(i=>!Rn(i,r));return{arrayValue:{values:n}}}class Iu extends uc{constructor(e,n){super(),this.serializer=e,this.Ae=n}}function p_(t){return Le(t.integerValue||t.doubleValue)}function oT(t){return gp(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function gb(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof ca&&i instanceof ca||r instanceof ha&&i instanceof ha?Is(r.elements,i.elements,Rn):r instanceof Iu&&i instanceof Iu?Rn(r.Ae,i.Ae):r instanceof Tu&&i instanceof Tu}(t.transform,e.transform)}class mb{constructor(e,n){this.version=e,this.transformResults=n}}class Ht{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Ht}static exists(e){return new Ht(void 0,e)}static updateTime(e){return new Ht(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ll(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class cc{}function aT(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new vp(t.key,Ht.none()):new Pa(t.key,t.data,Ht.none());{const n=t.data,r=vt.empty();let i=new He(et.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Qr(t.key,r,new Ot(i.toArray()),Ht.none())}}function yb(t,e,n){t instanceof Pa?function(i,s,o){const l=i.value.clone(),u=m_(i.fieldTransforms,s,o.transformResults);l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Qr?function(i,s,o){if(!Ll(i.precondition,s))return void s.convertToUnknownDocument(o.version);const l=m_(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(lT(i)),u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Lo(t,e,n,r){return t instanceof Pa?function(s,o,l,u){if(!Ll(s.precondition,o))return l;const c=s.value.clone(),d=y_(s.fieldTransforms,u,o);return c.setAll(d),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof Qr?function(s,o,l,u){if(!Ll(s.precondition,o))return l;const c=y_(s.fieldTransforms,u,o),d=o.data;return d.setAll(lT(s)),d.setAll(c),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(s,o,l){return Ll(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function _b(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=rT(r.transform,i||null);s!=null&&(n===null&&(n=vt.empty()),n.set(r.field,s))}return n||null}function g_(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Is(r,i,(s,o)=>gb(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Pa extends cc{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Qr extends cc{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function lT(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function m_(t,e,n){const r=new Map;pe(t.length===n.length,32656,{Ve:n.length,de:t.length});for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,l=e.data.field(s.field);r.set(s.field,pb(o,l,n[i]))}return r}function y_(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,fb(s,o,e))}return r}class vp extends cc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class vb extends cc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wb{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&yb(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Lo(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Lo(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=tT();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=n.has(i.key)?null:l;const u=aT(o,l);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(te.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),le())}isEqual(e){return this.batchId===e.batchId&&Is(this.mutations,e.mutations,(n,r)=>g_(n,r))&&Is(this.baseMutations,e.baseMutations,(n,r)=>g_(n,r))}}class wp{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){pe(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=function(){return lb}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new wp(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eb{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tb{constructor(e,n,r){this.alias=e,this.aggregateType=n,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ib{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fe,ue;function Sb(t){switch(t){case M.OK:return J(64938);case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0;default:return J(15467,{code:t})}}function uT(t){if(t===void 0)return Jn("GRPC error has no .code"),M.UNKNOWN;switch(t){case Fe.OK:return M.OK;case Fe.CANCELLED:return M.CANCELLED;case Fe.UNKNOWN:return M.UNKNOWN;case Fe.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Fe.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Fe.INTERNAL:return M.INTERNAL;case Fe.UNAVAILABLE:return M.UNAVAILABLE;case Fe.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Fe.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Fe.NOT_FOUND:return M.NOT_FOUND;case Fe.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Fe.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Fe.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Fe.ABORTED:return M.ABORTED;case Fe.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Fe.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Fe.DATA_LOSS:return M.DATA_LOSS;default:return J(39323,{code:t})}}(ue=Fe||(Fe={}))[ue.OK=0]="OK",ue[ue.CANCELLED=1]="CANCELLED",ue[ue.UNKNOWN=2]="UNKNOWN",ue[ue.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ue[ue.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ue[ue.NOT_FOUND=5]="NOT_FOUND",ue[ue.ALREADY_EXISTS=6]="ALREADY_EXISTS",ue[ue.PERMISSION_DENIED=7]="PERMISSION_DENIED",ue[ue.UNAUTHENTICATED=16]="UNAUTHENTICATED",ue[ue.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ue[ue.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ue[ue.ABORTED=10]="ABORTED",ue[ue.OUT_OF_RANGE=11]="OUT_OF_RANGE",ue[ue.UNIMPLEMENTED=12]="UNIMPLEMENTED",ue[ue.INTERNAL=13]="INTERNAL",ue[ue.UNAVAILABLE=14]="UNAVAILABLE",ue[ue.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kb(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ab=new Nr([4294967295,4294967295],0);function __(t){const e=kb().encode(t),n=new I0;return n.update(e),new Uint8Array(n.digest())}function v_(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Nr([n,r],0),new Nr([i,s],0)]}class Ep{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Eo(`Invalid padding: ${n}`);if(r<0)throw new Eo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Eo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Eo(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=Nr.fromNumber(this.ge)}ye(e,n,r){let i=e.add(n.multiply(Nr.fromNumber(r)));return i.compare(Ab)===1&&(i=new Nr([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=__(e),[r,i]=v_(n);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);if(!this.we(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Ep(s,i,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.ge===0)return;const n=__(e),[r,i]=v_(n);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);this.Se(o)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Eo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,xa.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new hc(te.min(),i,new xe(ae),Xn(),le())}}class xa{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new xa(r,n,le(),le(),le())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e,n,r,i){this.be=e,this.removedTargetIds=n,this.key=r,this.De=i}}class cT{constructor(e,n){this.targetId=e,this.Ce=n}}class hT{constructor(e,n,r=rt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class w_{constructor(){this.ve=0,this.Fe=E_(),this.Me=rt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=le(),n=le(),r=le();return this.Fe.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:J(38017,{changeType:s})}}),new xa(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=E_()}Ke(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,pe(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Rb{constructor(e){this.Ge=e,this.ze=new Map,this.je=Xn(),this.Je=gl(),this.He=gl(),this.Ze=new xe(ae)}Xe(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Ye(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const r=this.nt(n);switch(e.state){case 0:this.rt(n)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(n);break;case 3:this.rt(n)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(n)&&(this.it(n),r.Le(e.resumeToken));break;default:J(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((r,i)=>{this.rt(i)&&n(i)})}st(e){const n=e.targetId,r=e.Ce.count,i=this.ot(n);if(i){const s=i.target;if($d(s))if(r===0){const o=new G(s.path);this.et(n,o,ct.newNoDocument(o,te.min()))}else pe(r===1,20013,{expectedCount:r});else{const o=this._t(n);if(o!==r){const l=this.ut(e),u=l?this.ct(l,e,o):1;if(u!==0){this.it(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(n,c)}}}}}ut(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,l;try{o=Fr(r).toUint8Array()}catch(u){if(u instanceof V0)return Si("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Ep(o,i,s)}catch(u){return Si(u instanceof Eo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,n,r){return n.Ce.count===r-this.Pt(e,n.targetId)?0:2}Pt(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Ge.ht(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.et(n,s,null),i++)}),i}Tt(e){const n=new Map;this.ze.forEach((s,o)=>{const l=this.ot(o);if(l){if(s.current&&$d(l.target)){const u=new G(l.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,ct.newNoDocument(u,e))}s.Be&&(n.set(o,s.ke()),s.qe())}});let r=le();this.He.forEach((s,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.ot(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.je.forEach((s,o)=>o.setReadTime(e));const i=new hc(e,n,this.Ze,this.je,r);return this.je=Xn(),this.Je=gl(),this.He=gl(),this.Ze=new xe(ae),i}Ye(e,n){if(!this.rt(e))return;const r=this.It(e,n.key)?2:0;this.nt(e).Ke(n.key,r),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.Et(n.key).add(e)),this.He=this.He.insert(n.key,this.Rt(n.key).add(e))}et(e,n,r){if(!this.rt(e))return;const i=this.nt(e);this.It(e,n)?i.Ke(n,1):i.Ue(n),this.He=this.He.insert(n,this.Rt(n).delete(e)),this.He=this.He.insert(n,this.Rt(n).add(e)),r&&(this.je=this.je.insert(n,r))}removeTarget(e){this.ze.delete(e)}_t(e){const n=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let n=this.ze.get(e);return n||(n=new w_,this.ze.set(e,n)),n}Rt(e){let n=this.He.get(e);return n||(n=new He(ae),this.He=this.He.insert(e,n)),n}Et(e){let n=this.Je.get(e);return n||(n=new He(ae),this.Je=this.Je.insert(e,n)),n}rt(e){const n=this.ot(e)!==null;return n||q("WatchChangeAggregator","Detected inactive target",e),n}ot(e){const n=this.ze.get(e);return n&&n.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new w_),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}It(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function gl(){return new xe(G.comparator)}function E_(){return new xe(G.comparator)}const Cb={asc:"ASCENDING",desc:"DESCENDING"},Pb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},xb={and:"AND",or:"OR"};class bb{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Hd(t,e){return t.useProto3Json||ic(e)?e:{value:e}}function Su(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function dT(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Nb(t,e){return Su(t,e.toTimestamp())}function In(t){return pe(!!t,49232),te.fromTimestamp(function(n){const r=Mr(n);return new Ie(r.seconds,r.nanos)}(t))}function Tp(t,e){return Kd(t,e).canonicalString()}function Kd(t,e){const n=function(i){return new ve(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function fT(t){const e=ve.fromString(t);return pe(vT(e),10190,{key:e.toString()}),e}function Gd(t,e){return Tp(t.databaseId,e.path)}function Ah(t,e){const n=fT(e);if(n.get(1)!==t.databaseId.projectId)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new G(gT(n))}function pT(t,e){return Tp(t.databaseId,e)}function Db(t){const e=fT(t);return e.length===4?ve.emptyPath():gT(e)}function Qd(t){return new ve(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function gT(t){return pe(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function T_(t,e,n){return{name:Gd(t,e),fields:n.value.mapValue.fields}}function Ob(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:J(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,d){return c.useProto3Json?(pe(d===void 0||typeof d=="string",58123),rt.fromBase64String(d||"")):(pe(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),rt.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const d=c.code===void 0?M.UNKNOWN:uT(c.code);return new W(d,c.message||"")}(o);n=new hT(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Ah(t,r.document.name),s=In(r.document.updateTime),o=r.document.createTime?In(r.document.createTime):te.min(),l=new vt({mapValue:{fields:r.document.fields}}),u=ct.newFoundDocument(i,s,o,l),c=r.targetIds||[],d=r.removedTargetIds||[];n=new Ml(c,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Ah(t,r.document),s=r.readTime?In(r.readTime):te.min(),o=ct.newNoDocument(i,s),l=r.removedTargetIds||[];n=new Ml([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Ah(t,r.document),s=r.removedTargetIds||[];n=new Ml([],s,i,null)}else{if(!("filter"in e))return J(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new Ib(i,s),l=r.targetId;n=new cT(l,o)}}return n}function Vb(t,e){let n;if(e instanceof Pa)n={update:T_(t,e.key,e.value)};else if(e instanceof vp)n={delete:Gd(t,e.key)};else if(e instanceof Qr)n={update:T_(t,e.key,e.data),updateMask:Wb(e.fieldMask)};else{if(!(e instanceof vb))return J(16599,{dt:e.type});n={verify:Gd(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const l=o.transform;if(l instanceof Tu)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ca)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof ha)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Iu)return{fieldPath:o.field.canonicalString(),increment:l.Ae};throw J(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Nb(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:J(27497)}(t,e.precondition)),n}function Lb(t,e){return t&&t.length>0?(pe(e!==void 0,14353),t.map(n=>function(i,s){let o=i.updateTime?In(i.updateTime):In(s);return o.isEqual(te.min())&&(o=In(s)),new mb(o,i.transformResults||[])}(n,e))):[]}function Mb(t,e){return{documents:[pT(t,e.path)]}}function mT(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=pT(t,i);const s=function(c){if(c.length!==0)return _T(un.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(c){if(c.length!==0)return c.map(d=>function(g){return{field:yr(g.field),direction:zb(g.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Hd(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{ft:n,parent:i}}function Fb(t,e,n,r){const{ft:i,parent:s}=mT(t,e),o={},l=[];let u=0;return n.forEach(c=>{const d="aggregate_"+u++;o[d]=c.alias,c.aggregateType==="count"?l.push({alias:d,count:{}}):c.aggregateType==="avg"?l.push({alias:d,avg:{field:yr(c.fieldPath)}}):c.aggregateType==="sum"&&l.push({alias:d,sum:{field:yr(c.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:l,structuredQuery:i.structuredQuery},parent:i.parent},gt:o,parent:s}}function jb(t){let e=Db(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){pe(r===1,65062);const d=n.from[0];d.allDescendants?i=d.collectionId:e=e.child(d.collectionId)}let s=[];n.where&&(s=function(p){const g=yT(p);return g instanceof un&&q0(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(g=>function(P){return new Eu(Wi(P.field),function(b){switch(b){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(p){let g;return g=typeof p=="object"?p.value:p,ic(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(p){const g=!!p.before,A=p.values||[];return new wu(A,g)}(n.startAt));let c=null;return n.endAt&&(c=function(p){const g=!p.before,A=p.values||[];return new wu(A,g)}(n.endAt)),nb(e,i,o,s,l,"F",u,c)}function Ub(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return J(28987,{purpose:i})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function yT(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Wi(n.unaryFilter.field);return Ue.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Wi(n.unaryFilter.field);return Ue.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Wi(n.unaryFilter.field);return Ue.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Wi(n.unaryFilter.field);return Ue.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return J(61313);default:return J(60726)}}(t):t.fieldFilter!==void 0?function(n){return Ue.create(Wi(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return J(58110);default:return J(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return un.create(n.compositeFilter.filters.map(r=>yT(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return J(1026)}}(n.compositeFilter.op))}(t):J(30097,{filter:t})}function zb(t){return Cb[t]}function Bb(t){return Pb[t]}function $b(t){return xb[t]}function yr(t){return{fieldPath:t.canonicalString()}}function Wi(t){return et.fromServerFormat(t.fieldPath)}function _T(t){return t instanceof Ue?function(n){if(n.op==="=="){if(u_(n.value))return{unaryFilter:{field:yr(n.field),op:"IS_NAN"}};if(l_(n.value))return{unaryFilter:{field:yr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(u_(n.value))return{unaryFilter:{field:yr(n.field),op:"IS_NOT_NAN"}};if(l_(n.value))return{unaryFilter:{field:yr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:yr(n.field),op:Bb(n.op),value:n.value}}}(t):t instanceof un?function(n){const r=n.getFilters().map(i=>_T(i));return r.length===1?r[0]:{compositeFilter:{op:$b(n.op),filters:r}}}(t):J(54877,{filter:t})}function Wb(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function vT(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}function wT(t){return!!t&&typeof t._toProto=="function"&&t._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e,n,r,i,s=te.min(),o=te.min(),l=rt.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Er(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Er(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Er(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Er(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qb{constructor(e){this.yt=e}}function Hb(t){const e=jb({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?qd(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kb{constructor(){this.bn=new Gb}addToCollectionParentIndex(e,n){return this.bn.add(n),F.resolve()}getCollectionParents(e,n){return F.resolve(this.bn.getEntries(n))}addFieldIndex(e,n){return F.resolve()}deleteFieldIndex(e,n){return F.resolve()}deleteAllFieldIndexes(e){return F.resolve()}createTargetIndexes(e,n){return F.resolve()}getDocumentsMatchingTarget(e,n){return F.resolve(null)}getIndexType(e,n){return F.resolve(0)}getFieldIndexes(e,n){return F.resolve([])}getNextCollectionGroupToUpdate(e){return F.resolve(null)}getMinOffset(e,n){return F.resolve(Lr.min())}getMinOffsetFromCollectionGroup(e,n){return F.resolve(Lr.min())}updateCollectionGroup(e,n,r){return F.resolve()}updateIndexEntries(e,n){return F.resolve()}}class Gb{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new He(ve.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new He(ve.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ET=41943040;class kt{static withCacheSize(e){return new kt(e,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt.DEFAULT_COLLECTION_PERCENTILE=10,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,kt.DEFAULT=new kt(ET,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),kt.DISABLED=new kt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new As(0)}static ar(){return new As(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S_="LruGarbageCollector",Qb=1048576;function k_([t,e],[n,r]){const i=ae(t,n);return i===0?ae(e,r):i}class Yb{constructor(e){this.Pr=e,this.buffer=new He(k_),this.Tr=0}Er(){return++this.Tr}Ir(e){const n=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();k_(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class Jb{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){q(S_,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){js(n)?q(S_,"Ignoring IndexedDB error during garbage collection: ",n):await Fs(n)}await this.Ar(3e5)})}}class Xb{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.dr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return F.resolve(rc.ce);const r=new Yb(n);return this.Vr.forEachTarget(e,i=>r.Ir(i.sequenceNumber)).next(()=>this.Vr.mr(e,i=>r.Ir(i))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.Vr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(q("LruGarbageCollector","Garbage collection skipped; disabled"),F.resolve(I_)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(q("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),I_):this.gr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,n){let r,i,s,o,l,u,c;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,n))).next(p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(c=Date.now(),Bi()<=oe.DEBUG&&q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${s} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(c-u)+`ms
Total Duration: ${c-d}ms`),F.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function Zb(t,e){return new Xb(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e2{constructor(){this.changes=new Oi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ct.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?F.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t2{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n2{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&Lo(r.mutation,i,Ot.empty(),Ie.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,le()).next(()=>r))}getLocalViewOfDocuments(e,n,r=le()){const i=ui();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=wo();return s.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=ui();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,le()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,i){let s=Xn();const o=Vo(),l=function(){return Vo()}();return n.forEach((u,c)=>{const d=r.get(c.key);i.has(c.key)&&(d===void 0||d.mutation instanceof Qr)?s=s.insert(c.key,c):d!==void 0?(o.set(c.key,d.mutation.getFieldMask()),Lo(d.mutation,c,d.mutation.getFieldMask(),Ie.now())):o.set(c.key,Ot.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((c,d)=>o.set(c,d)),n.forEach((c,d)=>l.set(c,new t2(d,o.get(c)??null))),l))}recalculateAndSaveOverlays(e,n){const r=Vo();let i=new xe((o,l)=>o-l),s=le();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let d=r.get(u)||Ot.empty();d=l.applyToLocalView(c,d),r.set(u,d);const p=(i.get(l.batchId)||le()).add(u);i=i.insert(l.batchId,p)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,d=u.value,p=tT();d.forEach(g=>{if(!s.has(g)){const A=aT(n.get(g),r.get(g));A!==null&&p.set(g,A),s=s.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,p))}return F.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return rb(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Q0(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):F.resolve(ui());let l=oa,u=s;return o.next(c=>F.forEach(c,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),s.get(d)?F.resolve():this.remoteDocumentCache.getEntry(e,d).next(g=>{u=u.insert(d,g)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,u,c,le())).next(d=>({batchId:l,changes:eT(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new G(n)).next(r=>{let i=wo();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=wo();return this.indexManager.getCollectionParents(e,s).next(l=>F.forEach(l,u=>{const c=function(p,g){return new Ca(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r,i).next(d=>{d.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,c)=>{const d=c.getKey();o.get(d)===null&&(o=o.insert(d,ct.newInvalidDocument(d)))});let l=wo();return o.forEach((u,c)=>{const d=s.get(u);d!==void 0&&Lo(d.mutation,c,Ot.empty(),Ie.now()),lc(n,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r2{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,n){return F.resolve(this.Nr.get(n))}saveBundleMetadata(e,n){return this.Nr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:In(i.createTime)}}(n)),F.resolve()}getNamedQuery(e,n){return F.resolve(this.Br.get(n))}saveNamedQuery(e,n){return this.Br.set(n.name,function(i){return{name:i.name,query:Hb(i.bundledQuery),readTime:In(i.readTime)}}(n)),F.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i2{constructor(){this.overlays=new xe(G.comparator),this.Lr=new Map}getOverlay(e,n){return F.resolve(this.overlays.get(n))}getOverlays(e,n){const r=ui();return F.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.St(e,n,s)}),F.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Lr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Lr.delete(r)),F.resolve()}getOverlaysForCollection(e,n,r){const i=ui(),s=n.length+1,o=new G(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return F.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new xe((c,d)=>c-d);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let d=s.get(c.largestBatchId);d===null&&(d=ui(),s=s.insert(c.largestBatchId,d)),d.set(c.getKey(),c)}}const l=ui(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,d)=>l.set(c,d)),!(l.size()>=i)););return F.resolve(l)}St(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Eb(n,r));let s=this.Lr.get(n);s===void 0&&(s=le(),this.Lr.set(n,s)),this.Lr.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s2{constructor(){this.sessionToken=rt.EMPTY_BYTE_STRING}getSessionToken(e){return F.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,F.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(){this.kr=new He(Ge.qr),this.Kr=new He(Ge.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,n){const r=new Ge(e,n);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Wr(new Ge(e,n))}Qr(e,n){e.forEach(r=>this.removeReference(r,n))}Gr(e){const n=new G(new ve([])),r=new Ge(n,e),i=new Ge(n,e+1),s=[];return this.Kr.forEachInRange([r,i],o=>{this.Wr(o),s.push(o.key)}),s}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const n=new G(new ve([])),r=new Ge(n,e),i=new Ge(n,e+1);let s=le();return this.Kr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new Ge(e,0),r=this.kr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Ge{constructor(e,n){this.key=e,this.Jr=n}static qr(e,n){return G.comparator(e.key,n.key)||ae(e.Jr,n.Jr)}static Ur(e,n){return ae(e.Jr,n.Jr)||G.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o2{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Yn=1,this.Hr=new He(Ge.qr)}checkEmpty(e){return F.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new wb(s,n,r,i);this.mutationQueue.push(o);for(const l of i)this.Hr=this.Hr.add(new Ge(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return F.resolve(o)}lookupMutationBatch(e,n){return F.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.Xr(r),s=i<0?0:i;return F.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return F.resolve(this.mutationQueue.length===0?fp:this.Yn-1)}getAllMutationBatches(e){return F.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Ge(n,0),i=new Ge(n,Number.POSITIVE_INFINITY),s=[];return this.Hr.forEachInRange([r,i],o=>{const l=this.Zr(o.Jr);s.push(l)}),F.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new He(ae);return n.forEach(i=>{const s=new Ge(i,0),o=new Ge(i,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([s,o],l=>{r=r.add(l.Jr)})}),F.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;G.isDocumentKey(s)||(s=s.child(""));const o=new Ge(new G(s),0);let l=new He(ae);return this.Hr.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===i&&(l=l.add(u.Jr)),!0)},o),F.resolve(this.Yr(l))}Yr(e){const n=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){pe(this.ei(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return F.forEach(n.mutations,i=>{const s=new Ge(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Hr=r})}nr(e){}containsKey(e,n){const r=new Ge(n,0),i=this.Hr.firstAfterOrEqual(r);return F.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,F.resolve()}ei(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a2{constructor(e){this.ti=e,this.docs=function(){return new xe(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.ti(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return F.resolve(r?r.document.mutableCopy():ct.newInvalidDocument(n))}getEntries(e,n){let r=Xn();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ct.newInvalidDocument(i))}),F.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=Xn();const o=n.path,l=new G(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:d}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||Nx(bx(d),r)<=0||(i.has(d.key)||lc(n,d))&&(s=s.insert(d.key,d.mutableCopy()))}return F.resolve(s)}getAllFromCollectionGroup(e,n,r,i){J(9500)}ni(e,n){return F.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new l2(this)}getSize(e){return F.resolve(this.size)}}class l2 extends e2{constructor(e){super(),this.Mr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(r)}),F.waitFor(n)}getFromCache(e,n){return this.Mr.getEntry(e,n)}getAllFromCache(e,n){return this.Mr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u2{constructor(e){this.persistence=e,this.ri=new Oi(n=>mp(n),yp),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.ii=0,this.si=new Ip,this.targetCount=0,this.oi=As._r()}forEachTarget(e,n){return this.ri.forEach((r,i)=>n(i)),F.resolve()}getLastRemoteSnapshotVersion(e){return F.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return F.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),F.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.ii&&(this.ii=n),F.resolve()}lr(e){this.ri.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.oi=new As(n),this.highestTargetId=n),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,n){return this.lr(n),this.targetCount+=1,F.resolve()}updateTargetData(e,n){return this.lr(n),F.resolve()}removeTargetData(e,n){return this.ri.delete(n.target),this.si.Gr(n.targetId),this.targetCount-=1,F.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.ri.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.ri.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),F.waitFor(s).next(()=>i)}getTargetCount(e){return F.resolve(this.targetCount)}getTargetData(e,n){const r=this.ri.get(n)||null;return F.resolve(r)}addMatchingKeys(e,n,r){return this.si.$r(n,r),F.resolve()}removeMatchingKeys(e,n,r){this.si.Qr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),F.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.si.Gr(n),F.resolve()}getMatchingKeysForTargetId(e,n){const r=this.si.jr(n);return F.resolve(r)}containsKey(e,n){return F.resolve(this.si.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT{constructor(e,n){this._i={},this.overlays={},this.ai=new rc(0),this.ui=!1,this.ui=!0,this.ci=new s2,this.referenceDelegate=e(this),this.li=new u2(this),this.indexManager=new Kb,this.remoteDocumentCache=function(i){return new a2(i)}(r=>this.referenceDelegate.hi(r)),this.serializer=new qb(n),this.Pi=new r2(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new i2,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this._i[e.toKey()];return r||(r=new o2(n,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,n,r){q("MemoryPersistence","Starting transaction:",e);const i=new c2(this.ai.next());return this.referenceDelegate.Ti(),r(i).next(s=>this.referenceDelegate.Ei(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ii(e,n){return F.or(Object.values(this._i).map(r=>()=>r.containsKey(e,n)))}}class c2 extends Ox{constructor(e){super(),this.currentSequenceNumber=e}}class Sp{constructor(e){this.persistence=e,this.Ri=new Ip,this.Ai=null}static Vi(e){return new Sp(e)}get di(){if(this.Ai)return this.Ai;throw J(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.di.delete(r.toString()),F.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.di.add(r.toString()),F.resolve()}markPotentiallyOrphaned(e,n){return this.di.add(n.toString()),F.resolve()}removeTarget(e,n){this.Ri.Gr(n.targetId).forEach(i=>this.di.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.di.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}Ti(){this.Ai=new Set}Ei(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return F.forEach(this.di,r=>{const i=G.fromPath(r);return this.mi(e,i).next(s=>{s||n.removeEntry(i,te.min())})}).next(()=>(this.Ai=null,n.apply(e)))}updateLimboDocument(e,n){return this.mi(e,n).next(r=>{r?this.di.delete(n.toString()):this.di.add(n.toString())})}hi(e){return 0}mi(e,n){return F.or([()=>F.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ii(e,n)])}}class ku{constructor(e,n){this.persistence=e,this.fi=new Oi(r=>Mx(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Zb(this,n)}static Vi(e,n){return new ku(e,n)}Ti(){}Ei(e){return F.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}dr(e){const n=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(i=>r+i))}pr(e){let n=0;return this.mr(e,r=>{n++}).next(()=>n)}mr(e,n){return F.forEach(this.fi,(r,i)=>this.wr(e,r,i).next(s=>s?F.resolve():n(i)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ni(e,o=>this.wr(e,o,n).next(l=>{l||(r++,s.removeEntry(o,te.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.fi.set(n,e.currentSequenceNumber),F.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.fi.set(r,e.currentSequenceNumber),F.resolve()}removeReference(e,n,r){return this.fi.set(r,e.currentSequenceNumber),F.resolve()}updateLimboDocument(e,n){return this.fi.set(n,e.currentSequenceNumber),F.resolve()}hi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Ol(e.data.value)),n}wr(e,n,r){return F.or([()=>this.persistence.Ii(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const i=this.fi.get(n);return F.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.Ts=r,this.Es=i}static Is(e,n){let r=le(),i=le();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new kp(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h2{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d2{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return $1()?8:Vx(pt())>0?6:4}()}initialize(e,n){this.fs=e,this.indexManager=n,this.Rs=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.gs(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ps(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new h2;return this.ys(e,n,o).next(l=>{if(s.result=l,this.As)return this.ws(e,n,o,l.size)})}).next(()=>s.result)}ws(e,n,r,i){return r.documentReadCount<this.Vs?(Bi()<=oe.DEBUG&&q("QueryEngine","SDK will not create cache indexes for query:",$i(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),F.resolve()):(Bi()<=oe.DEBUG&&q("QueryEngine","Query:",$i(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(Bi()<=oe.DEBUG&&q("QueryEngine","The SDK decides to create cache indexes for query:",$i(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Tn(n))):F.resolve())}gs(e,n){if(f_(n))return F.resolve(null);let r=Tn(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=qd(n,null,"F"),r=Tn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=le(...s);return this.fs.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.Ss(n,l);return this.bs(n,c,o,u.readTime)?this.gs(e,qd(n,null,"F")):this.Ds(e,c,n,u)}))})))}ps(e,n,r,i){return f_(n)||i.isEqual(te.min())?F.resolve(null):this.fs.getDocuments(e,r).next(s=>{const o=this.Ss(n,s);return this.bs(n,o,r,i)?F.resolve(null):(Bi()<=oe.DEBUG&&q("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),$i(n)),this.Ds(e,o,n,xx(i,oa)).next(l=>l))})}Ss(e,n){let r=new He(X0(e));return n.forEach((i,s)=>{lc(e,s)&&(r=r.add(s))}),r}bs(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ys(e,n,r){return Bi()<=oe.DEBUG&&q("QueryEngine","Using full collection scan to execute query:",$i(n)),this.fs.getDocumentsMatchingQuery(e,n,Lr.min(),r)}Ds(e,n,r,i){return this.fs.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ap="LocalStore",f2=3e8;class p2{constructor(e,n,r,i){this.persistence=e,this.Cs=n,this.serializer=i,this.vs=new xe(ae),this.Fs=new Oi(s=>mp(s),yp),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new n2(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.vs))}}function g2(t,e,n,r){return new p2(t,e,n,r)}async function IT(t,e){const n=ee(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.Os(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],l=[];let u=le();for(const c of i){o.push(c.batchId);for(const d of c.mutations)u=u.add(d.key)}for(const c of s){l.push(c.batchId);for(const d of c.mutations)u=u.add(d.key)}return n.localDocuments.getDocuments(r,u).next(c=>({Ns:c,removedBatchIds:o,addedBatchIds:l}))})})}function m2(t,e){const n=ee(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.xs.newChangeBuffer({trackRemovals:!0});return function(l,u,c,d){const p=c.batch,g=p.keys();let A=F.resolve();return g.forEach(P=>{A=A.next(()=>d.getEntry(u,P)).next(x=>{const b=c.docVersions.get(P);pe(b!==null,48541),x.version.compareTo(b)<0&&(p.applyToRemoteDocument(x,c),x.isValidDocument()&&(x.setReadTime(c.commitVersion),d.addEntry(x)))})}),A.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=le();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function ST(t){const e=ee(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.li.getLastRemoteSnapshotVersion(n))}function y2(t,e){const n=ee(t),r=e.snapshotVersion;let i=n.vs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.xs.newChangeBuffer({trackRemovals:!0});i=n.vs;const l=[];e.targetChanges.forEach((d,p)=>{const g=i.get(p);if(!g)return;l.push(n.li.removeMatchingKeys(s,d.removedDocuments,p).next(()=>n.li.addMatchingKeys(s,d.addedDocuments,p)));let A=g.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?A=A.withResumeToken(rt.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):d.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(d.resumeToken,r)),i=i.insert(p,A),function(x,b,v){return x.resumeToken.approximateByteSize()===0||b.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=f2?!0:v.addedDocuments.size+v.modifiedDocuments.size+v.removedDocuments.size>0}(g,A,d)&&l.push(n.li.updateTargetData(s,A))});let u=Xn(),c=le();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,d))}),l.push(_2(s,o,e.documentUpdates).next(d=>{u=d.Bs,c=d.Ls})),!r.isEqual(te.min())){const d=n.li.getLastRemoteSnapshotVersion(s).next(p=>n.li.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(d)}return F.waitFor(l).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,c)).next(()=>u)}).then(s=>(n.vs=i,s))}function _2(t,e,n){let r=le(),i=le();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=Xn();return n.forEach((l,u)=>{const c=s.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(te.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):q(Ap,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Bs:o,Ls:i}})}function v2(t,e){const n=ee(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=fp),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function w2(t,e){const n=ee(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.li.getTargetData(r,e).next(s=>s?(i=s,F.resolve(i)):n.li.allocateTargetId(r).next(o=>(i=new Er(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.li.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.vs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.vs=n.vs.insert(r.targetId,r),n.Fs.set(e,r.targetId)),r})}async function Yd(t,e,n){const r=ee(t),i=r.vs.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!js(o))throw o;q(Ap,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(i.target)}function A_(t,e,n){const r=ee(t);let i=te.min(),s=le();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,d){const p=ee(u),g=p.Fs.get(d);return g!==void 0?F.resolve(p.vs.get(g)):p.li.getTargetData(c,d)}(r,o,Tn(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,l.targetId).next(u=>{s=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,n?i:te.min(),n?s:le())).next(l=>(E2(r,sb(e),l),{documents:l,ks:s})))}function E2(t,e,n){let r=t.Ms.get(e)||te.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.Ms.set(e,r)}class R_{constructor(){this.activeTargetIds=hb()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class T2{constructor(){this.vo=new R_,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,n,r){this.Fo[e]=n}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new R_,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I2{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C_="ConnectivityMonitor";class P_{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){q(C_,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){q(C_,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ml=null;function Jd(){return ml===null?ml=function(){return 268435456+Math.round(2147483648*Math.random())}():ml++,"0x"+ml.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh="RestConnection",S2={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class k2{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Ko=n+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===_u?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,n,r,i,s){const o=Jd(),l=this.Qo(e,n.toUriEncodedString());q(Rh,`Sending RPC '${e}' ${o}:`,l,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,i,s);const{host:c}=new URL(l),d=Ia(c);return this.zo(e,l,u,r,d).then(p=>(q(Rh,`Received RPC '${e}' ${o}: `,p),p),p=>{throw Si(Rh,`RPC '${e}' ${o} failed with error: `,p,"url: ",l,"request:",r),p})}jo(e,n,r,i,s,o){return this.Wo(e,n,r,i,s)}Go(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ms}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Qo(e,n){const r=S2[e];let i=`${this.Ko}/v1/${n}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A2{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at="WebChannelConnection",ho=(t,e,n)=>{t.listen(e,r=>{try{n(r)}catch(i){setTimeout(()=>{throw i},0)}})};class fs extends k2{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!fs.c_){const e=R0();ho(e,A0.STAT_EVENT,n=>{n.stat===Fd.PROXY?q(at,"STAT_EVENT: detected buffering proxy"):n.stat===Fd.NOPROXY&&q(at,"STAT_EVENT: detected no buffering proxy")}),fs.c_=!0}}zo(e,n,r,i,s){const o=Jd();return new Promise((l,u)=>{const c=new S0;c.setWithCredentials(!0),c.listenOnce(k0.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Dl.NO_ERROR:const p=c.getResponseJson();q(at,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),l(p);break;case Dl.TIMEOUT:q(at,`RPC '${e}' ${o} timed out`),u(new W(M.DEADLINE_EXCEEDED,"Request time out"));break;case Dl.HTTP_ERROR:const g=c.getStatus();if(q(at,`RPC '${e}' ${o} failed with status:`,g,"response text:",c.getResponseText()),g>0){let A=c.getResponseJson();Array.isArray(A)&&(A=A[0]);const P=A==null?void 0:A.error;if(P&&P.status&&P.message){const x=function(v){const _=v.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(_)>=0?_:M.UNKNOWN}(P.status);u(new W(x,P.message))}else u(new W(M.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new W(M.UNAVAILABLE,"Connection failed."));break;default:J(9055,{l_:e,streamId:o,h_:c.getLastErrorCode(),P_:c.getLastError()})}}finally{q(at,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(i);q(at,`RPC '${e}' ${o} sending request:`,i),c.send(n,"POST",d,r,15)})}T_(e,n,r){const i=Jd(),s=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const c=s.join("");q(at,`Creating RPC '${e}' stream ${i}: ${c}`,l);const d=o.createWebChannel(c,l);this.E_(d);let p=!1,g=!1;const A=new A2({Jo:P=>{g?q(at,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(p||(q(at,`Opening RPC '${e}' stream ${i} transport.`),d.open(),p=!0),q(at,`RPC '${e}' stream ${i} sending:`,P),d.send(P))},Ho:()=>d.close()});return ho(d,vo.EventType.OPEN,()=>{g||(q(at,`RPC '${e}' stream ${i} transport opened.`),A.i_())}),ho(d,vo.EventType.CLOSE,()=>{g||(g=!0,q(at,`RPC '${e}' stream ${i} transport closed`),A.o_(),this.I_(d))}),ho(d,vo.EventType.ERROR,P=>{g||(g=!0,Si(at,`RPC '${e}' stream ${i} transport errored. Name:`,P.name,"Message:",P.message),A.o_(new W(M.UNAVAILABLE,"The operation could not be completed")))}),ho(d,vo.EventType.MESSAGE,P=>{var x;if(!g){const b=P.data[0];pe(!!b,16349);const v=b,_=(v==null?void 0:v.error)||((x=v[0])==null?void 0:x.error);if(_){q(at,`RPC '${e}' stream ${i} received error:`,_);const S=_.status;let D=function(w){const m=Fe[w];if(m!==void 0)return uT(m)}(S),L=_.message;S==="NOT_FOUND"&&L.includes("database")&&L.includes("does not exist")&&L.includes(this.databaseId.database)&&Si(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),D===void 0&&(D=M.INTERNAL,L="Unknown error status: "+S+" with message "+_.message),g=!0,A.o_(new W(D,L)),d.close()}else q(at,`RPC '${e}' stream ${i} received:`,b),A.__(b)}}),fs.u_(),setTimeout(()=>{A.s_()},0),A}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(n=>n===e)}Go(e,n,r){super.Go(e,n,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return C0()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R2(t){return new fs(t)}function Ch(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dc(t){return new bb(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fs.c_=!1;class kT{constructor(e,n,r=1e3,i=1.5,s=6e4){this.Ci=e,this.timerId=n,this.R_=r,this.A_=i,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const n=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,n-r);i>0&&q("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_="PersistentStream";class AT{constructor(e,n,r,i,s,o,l,u){this.Ci=e,this.S_=r,this.b_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new kT(e,n)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(Jn(n.toString()),Jn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(n)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),n=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.D_===n&&this.G_(r,i)},r=>{e(()=>{const i=new W(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)})})}G_(e,n){const r=this.Q_(this.D_);this.stream=this.j_(e,n),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(i=>{r(()=>this.z_(i))}),this.stream.onMessage(i=>{r(()=>++this.F_==1?this.J_(i):this.onNext(i))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return q(x_,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return n=>{this.Ci.enqueueAndForget(()=>this.D_===e?n():(q(x_,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class C2 extends AT{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}j_(e,n){return this.connection.T_("Listen",e,n)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const n=Ob(this.serializer,e),r=function(s){if(!("targetChange"in s))return te.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?te.min():o.readTime?In(o.readTime):te.min()}(e);return this.listener.H_(n,r)}Z_(e){const n={};n.database=Qd(this.serializer),n.addTarget=function(s,o){let l;const u=o.target;if(l=$d(u)?{documents:Mb(s,u)}:{query:mT(s,u).ft},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=dT(s,o.resumeToken);const c=Hd(s,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(te.min())>0){l.readTime=Su(s,o.snapshotVersion.toTimestamp());const c=Hd(s,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const r=Ub(this.serializer,e);r&&(n.labels=r),this.q_(n)}X_(e){const n={};n.database=Qd(this.serializer),n.removeTarget=e,this.q_(n)}}class P2 extends AT{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,n){return this.connection.T_("Write",e,n)}J_(e){return pe(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,pe(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){pe(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const n=Lb(e.writeResults,e.commitTime),r=In(e.commitTime);return this.listener.na(r,n)}ra(){const e={};e.database=Qd(this.serializer),this.q_(e)}ea(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>Vb(this.serializer,r))};this.q_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x2{}class b2 extends x2{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Wo(e,Kd(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new W(M.UNKNOWN,s.toString())})}jo(e,n,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.jo(e,Kd(n,r),i,o,l,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(M.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function N2(t,e,n,r){return new b2(t,e,n,r)}class D2{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Jn(n),this.aa=!1):q("OnlineStateTracker",n)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ki="RemoteStore";class O2{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo(o=>{r.enqueueAndForget(async()=>{Vi(this)&&(q(ki,"Restarting streams for network reachability change."),await async function(u){const c=ee(u);c.Ia.add(4),await ba(c),c.Va.set("Unknown"),c.Ia.delete(4),await fc(c)}(this))})}),this.Va=new D2(r,i)}}async function fc(t){if(Vi(t))for(const e of t.Ra)await e(!0)}async function ba(t){for(const e of t.Ra)await e(!1)}function RT(t,e){const n=ee(t);n.Ea.has(e.targetId)||(n.Ea.set(e.targetId,e),xp(n)?Pp(n):Us(n).O_()&&Cp(n,e))}function Rp(t,e){const n=ee(t),r=Us(n);n.Ea.delete(e),r.O_()&&CT(n,e),n.Ea.size===0&&(r.O_()?r.L_():Vi(n)&&n.Va.set("Unknown"))}function Cp(t,e){if(t.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Us(t).Z_(e)}function CT(t,e){t.da.$e(e),Us(t).X_(e)}function Pp(t){t.da=new Rb({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ea.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),Us(t).start(),t.Va.ua()}function xp(t){return Vi(t)&&!Us(t).x_()&&t.Ea.size>0}function Vi(t){return ee(t).Ia.size===0}function PT(t){t.da=void 0}async function V2(t){t.Va.set("Online")}async function L2(t){t.Ea.forEach((e,n)=>{Cp(t,e)})}async function M2(t,e){PT(t),xp(t)?(t.Va.ha(e),Pp(t)):t.Va.set("Unknown")}async function F2(t,e,n){if(t.Va.set("Online"),e instanceof hT&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const l of s.targetIds)i.Ea.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.Ea.delete(l),i.da.removeTarget(l))}(t,e)}catch(r){q(ki,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Au(t,r)}else if(e instanceof Ml?t.da.Xe(e):e instanceof cT?t.da.st(e):t.da.tt(e),!n.isEqual(te.min()))try{const r=await ST(t.localStore);n.compareTo(r)>=0&&await function(s,o){const l=s.da.Tt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const d=s.Ea.get(c);d&&s.Ea.set(c,d.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const d=s.Ea.get(u);if(!d)return;s.Ea.set(u,d.withResumeToken(rt.EMPTY_BYTE_STRING,d.snapshotVersion)),CT(s,u);const p=new Er(d.target,u,c,d.sequenceNumber);Cp(s,p)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){q(ki,"Failed to raise snapshot:",r),await Au(t,r)}}async function Au(t,e,n){if(!js(e))throw e;t.Ia.add(1),await ba(t),t.Va.set("Offline"),n||(n=()=>ST(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{q(ki,"Retrying IndexedDB access"),await n(),t.Ia.delete(1),await fc(t)})}function xT(t,e){return e().catch(n=>Au(t,n,e))}async function pc(t){const e=ee(t),n=Ur(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:fp;for(;j2(e);)try{const i=await v2(e.localStore,r);if(i===null){e.Ta.length===0&&n.L_();break}r=i.batchId,U2(e,i)}catch(i){await Au(e,i)}bT(e)&&NT(e)}function j2(t){return Vi(t)&&t.Ta.length<10}function U2(t,e){t.Ta.push(e);const n=Ur(t);n.O_()&&n.Y_&&n.ea(e.mutations)}function bT(t){return Vi(t)&&!Ur(t).x_()&&t.Ta.length>0}function NT(t){Ur(t).start()}async function z2(t){Ur(t).ra()}async function B2(t){const e=Ur(t);for(const n of t.Ta)e.ea(n.mutations)}async function $2(t,e,n){const r=t.Ta.shift(),i=wp.from(r,e,n);await xT(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await pc(t)}async function W2(t,e){e&&Ur(t).Y_&&await async function(r,i){if(function(o){return Sb(o)&&o!==M.ABORTED}(i.code)){const s=r.Ta.shift();Ur(r).B_(),await xT(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await pc(r)}}(t,e),bT(t)&&NT(t)}async function b_(t,e){const n=ee(t);n.asyncQueue.verifyOperationInProgress(),q(ki,"RemoteStore received new credentials");const r=Vi(n);n.Ia.add(3),await ba(n),r&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await fc(n)}async function q2(t,e){const n=ee(t);e?(n.Ia.delete(2),await fc(n)):e||(n.Ia.add(2),await ba(n),n.Va.set("Unknown"))}function Us(t){return t.ma||(t.ma=function(n,r,i){const s=ee(n);return s.sa(),new C2(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Zo:V2.bind(null,t),Yo:L2.bind(null,t),t_:M2.bind(null,t),H_:F2.bind(null,t)}),t.Ra.push(async e=>{e?(t.ma.B_(),xp(t)?Pp(t):t.Va.set("Unknown")):(await t.ma.stop(),PT(t))})),t.ma}function Ur(t){return t.fa||(t.fa=function(n,r,i){const s=ee(n);return s.sa(),new P2(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Zo:()=>Promise.resolve(),Yo:z2.bind(null,t),t_:W2.bind(null,t),ta:B2.bind(null,t),na:$2.bind(null,t)}),t.Ra.push(async e=>{e?(t.fa.B_(),await pc(t)):(await t.fa.stop(),t.Ta.length>0&&(q(ki,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))})),t.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new En,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new bp(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Np(t,e){if(Jn("AsyncQueue",`${e}: ${t}`),js(t))return new W(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{static emptySet(e){return new ps(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||G.comparator(n.key,r.key):(n,r)=>G.comparator(n.key,r.key),this.keyedMap=wo(),this.sortedSet=new xe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ps)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new ps;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(){this.ga=new xe(G.comparator)}track(e){const n=e.doc.key,r=this.ga.get(n);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(n,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(n):e.type===1&&r.type===2?this.ga=this.ga.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(n,{type:2,doc:e.doc}):J(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(n,e)}ya(){const e=[];return this.ga.inorderTraversal((n,r)=>{e.push(r)}),e}}class Rs{constructor(e,n,r,i,s,o,l,u,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new Rs(e,n,ps.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ac(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H2{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class K2{constructor(){this.queries=D_(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(n,r){const i=ee(n),s=i.queries;i.queries=D_(),s.forEach((o,l)=>{for(const u of l.Sa)u.onError(r)})})(this,new W(M.ABORTED,"Firestore shutting down"))}}function D_(){return new Oi(t=>J0(t),ac)}async function Dp(t,e){const n=ee(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.ba()&&e.Da()&&(r=2):(s=new H2,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await n.onListen(i,!0);break;case 1:s.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const l=Np(o,`Initialization of query '${$i(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.Sa.push(e),e.va(n.onlineState),s.wa&&e.Fa(s.wa)&&Vp(n)}async function Op(t,e){const n=ee(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.Sa.indexOf(e);o>=0&&(s.Sa.splice(o,1),s.Sa.length===0?i=e.Da()?0:1:!s.ba()&&e.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function G2(t,e){const n=ee(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const l of o.Sa)l.Fa(i)&&(r=!0);o.wa=i}}r&&Vp(n)}function Q2(t,e,n){const r=ee(t),i=r.queries.get(e);if(i)for(const s of i.Sa)s.onError(n);r.queries.delete(e)}function Vp(t){t.Ca.forEach(e=>{e.next()})}var Xd,O_;(O_=Xd||(Xd={})).Ma="default",O_.Cache="cache";class Lp{constructor(e,n,r){this.query=e,this.xa=n,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Rs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),n=!0):this.La(e,this.onlineState)&&(this.ka(e),n=!0),this.Na=e,n}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let n=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),n=!0),n}La(e,n){if(!e.fromCache||!this.Da())return!0;const r=n!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const n=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}ka(e){e=Rs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Xd.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT{constructor(e){this.key=e}}class OT{constructor(e){this.key=e}}class Y2{constructor(e,n){this.query=e,this.Za=n,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=le(),this.mutatedKeys=le(),this.eu=X0(e),this.tu=new ps(this.eu)}get nu(){return this.Za}ru(e,n){const r=n?n.iu:new N_,i=n?n.tu:this.tu;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((d,p)=>{const g=i.get(d),A=lc(this.query,p)?p:null,P=!!g&&this.mutatedKeys.has(g.key),x=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let b=!1;g&&A?g.data.isEqual(A.data)?P!==x&&(r.track({type:3,doc:A}),b=!0):this.su(g,A)||(r.track({type:2,doc:A}),b=!0,(u&&this.eu(A,u)>0||c&&this.eu(A,c)<0)&&(l=!0)):!g&&A?(r.track({type:0,doc:A}),b=!0):g&&!A&&(r.track({type:1,doc:g}),b=!0,(u||c)&&(l=!0)),b&&(A?(o=o.add(A),s=x?s.add(d):s.delete(d)):(o=o.delete(d),s=s.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),s=s.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,bs:l,mutatedKeys:s}}su(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((d,p)=>function(A,P){const x=b=>{switch(b){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return J(20277,{Vt:b})}};return x(A)-x(P)}(d.type,p.type)||this.eu(d.doc,p.doc)),this.ou(r),i=i??!1;const l=n&&!i?this._u():[],u=this.Ya.size===0&&this.current&&!i?1:0,c=u!==this.Xa;return this.Xa=u,o.length!==0||c?{snapshot:new Rs(this.query,e.tu,s,o,e.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new N_,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(n=>this.Za=this.Za.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Za=this.Za.delete(n)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=le(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const n=[];return e.forEach(r=>{this.Ya.has(r)||n.push(new OT(r))}),this.Ya.forEach(r=>{e.has(r)||n.push(new DT(r))}),n}cu(e){this.Za=e.ks,this.Ya=le();const n=this.ru(e.documents);return this.applyChanges(n,!0)}lu(){return Rs.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Mp="SyncEngine";class J2{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class X2{constructor(e){this.key=e,this.hu=!1}}class Z2{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Oi(l=>J0(l),ac),this.Eu=new Map,this.Iu=new Set,this.Ru=new xe(G.comparator),this.Au=new Map,this.Vu=new Ip,this.du={},this.mu=new Map,this.fu=As.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function eN(t,e,n=!0){const r=UT(t);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await VT(r,e,n,!0),i}async function tN(t,e){const n=UT(t);await VT(n,e,!0,!1)}async function VT(t,e,n,r){const i=await w2(t.localStore,Tn(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await nN(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&RT(t.remoteStore,i),l}async function nN(t,e,n,r,i){t.pu=(p,g,A)=>async function(x,b,v,_){let S=b.view.ru(v);S.bs&&(S=await A_(x.localStore,b.query,!1).then(({documents:w})=>b.view.ru(w,S)));const D=_&&_.targetChanges.get(b.targetId),L=_&&_.targetMismatches.get(b.targetId)!=null,U=b.view.applyChanges(S,x.isPrimaryClient,D,L);return L_(x,b.targetId,U.au),U.snapshot}(t,p,g,A);const s=await A_(t.localStore,e,!0),o=new Y2(e,s.ks),l=o.ru(s.documents),u=xa.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),c=o.applyChanges(l,t.isPrimaryClient,u);L_(t,n,c.au);const d=new J2(e,n,o);return t.Tu.set(e,d),t.Eu.has(n)?t.Eu.get(n).push(e):t.Eu.set(n,[e]),c.snapshot}async function rN(t,e,n){const r=ee(t),i=r.Tu.get(e),s=r.Eu.get(i.targetId);if(s.length>1)return r.Eu.set(i.targetId,s.filter(o=>!ac(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Yd(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Rp(r.remoteStore,i.targetId),Zd(r,i.targetId)}).catch(Fs)):(Zd(r,i.targetId),await Yd(r.localStore,i.targetId,!0))}async function iN(t,e){const n=ee(t),r=n.Tu.get(e),i=n.Eu.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Rp(n.remoteStore,r.targetId))}async function sN(t,e,n){const r=dN(t);try{const i=await function(o,l){const u=ee(o),c=Ie.now(),d=l.reduce((A,P)=>A.add(P.key),le());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",A=>{let P=Xn(),x=le();return u.xs.getEntries(A,d).next(b=>{P=b,P.forEach((v,_)=>{_.isValidDocument()||(x=x.add(v))})}).next(()=>u.localDocuments.getOverlayedDocuments(A,P)).next(b=>{p=b;const v=[];for(const _ of l){const S=_b(_,p.get(_.key).overlayedDocument);S!=null&&v.push(new Qr(_.key,S,B0(S.value.mapValue),Ht.exists(!0)))}return u.mutationQueue.addMutationBatch(A,c,v,l)}).next(b=>{g=b;const v=b.applyToLocalDocumentSet(p,x);return u.documentOverlayCache.saveOverlays(A,b.batchId,v)})}).then(()=>({batchId:g.batchId,changes:eT(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let c=o.du[o.currentUser.toKey()];c||(c=new xe(ae)),c=c.insert(l,u),o.du[o.currentUser.toKey()]=c}(r,i.batchId,n),await Na(r,i.changes),await pc(r.remoteStore)}catch(i){const s=Np(i,"Failed to persist write");n.reject(s)}}async function LT(t,e){const n=ee(t);try{const r=await y2(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Au.get(s);o&&(pe(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.hu=!0:i.modifiedDocuments.size>0?pe(o.hu,14607):i.removedDocuments.size>0&&(pe(o.hu,42227),o.hu=!1))}),await Na(n,r,e)}catch(r){await Fs(r)}}function V_(t,e,n){const r=ee(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Tu.forEach((s,o)=>{const l=o.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=ee(o);u.onlineState=l;let c=!1;u.queries.forEach((d,p)=>{for(const g of p.Sa)g.va(l)&&(c=!0)}),c&&Vp(u)}(r.eventManager,e),i.length&&r.Pu.H_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function oN(t,e,n){const r=ee(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Au.get(e),s=i&&i.key;if(s){let o=new xe(G.comparator);o=o.insert(s,ct.newNoDocument(s,te.min()));const l=le().add(s),u=new hc(te.min(),new Map,new xe(ae),o,l);await LT(r,u),r.Ru=r.Ru.remove(s),r.Au.delete(e),Fp(r)}else await Yd(r.localStore,e,!1).then(()=>Zd(r,e,n)).catch(Fs)}async function aN(t,e){const n=ee(t),r=e.batch.batchId;try{const i=await m2(n.localStore,e);FT(n,r,null),MT(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Na(n,i)}catch(i){await Fs(i)}}async function lN(t,e,n){const r=ee(t);try{const i=await function(o,l){const u=ee(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let d;return u.mutationQueue.lookupMutationBatch(c,l).next(p=>(pe(p!==null,37113),d=p.keys(),u.mutationQueue.removeMutationBatch(c,p))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,d,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,d)).next(()=>u.localDocuments.getDocuments(c,d))})}(r.localStore,e);FT(r,e,n),MT(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Na(r,i)}catch(i){await Fs(i)}}function MT(t,e){(t.mu.get(e)||[]).forEach(n=>{n.resolve()}),t.mu.delete(e)}function FT(t,e,n){const r=ee(t);let i=r.du[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.du[r.currentUser.toKey()]=i}}function Zd(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Eu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Eu.delete(e),t.isPrimaryClient&&t.Vu.Gr(e).forEach(r=>{t.Vu.containsKey(r)||jT(t,r)})}function jT(t,e){t.Iu.delete(e.path.canonicalString());const n=t.Ru.get(e);n!==null&&(Rp(t.remoteStore,n),t.Ru=t.Ru.remove(e),t.Au.delete(n),Fp(t))}function L_(t,e,n){for(const r of n)r instanceof DT?(t.Vu.addReference(r.key,e),uN(t,r)):r instanceof OT?(q(Mp,"Document no longer in limbo: "+r.key),t.Vu.removeReference(r.key,e),t.Vu.containsKey(r.key)||jT(t,r.key)):J(19791,{wu:r})}function uN(t,e){const n=e.key,r=n.path.canonicalString();t.Ru.get(n)||t.Iu.has(r)||(q(Mp,"New document in limbo: "+n),t.Iu.add(r),Fp(t))}function Fp(t){for(;t.Iu.size>0&&t.Ru.size<t.maxConcurrentLimboResolutions;){const e=t.Iu.values().next().value;t.Iu.delete(e);const n=new G(ve.fromString(e)),r=t.fu.next();t.Au.set(r,new X2(n)),t.Ru=t.Ru.insert(n,r),RT(t.remoteStore,new Er(Tn(oc(n.path)),r,"TargetPurposeLimboResolution",rc.ce))}}async function Na(t,e,n){const r=ee(t),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((l,u)=>{o.push(r.pu(u,e,n).then(c=>{var d;if((c||n)&&r.isPrimaryClient){const p=c?!c.fromCache:(d=n==null?void 0:n.targetChanges.get(u.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(c){i.push(c);const p=kp.Is(u.targetId,c);s.push(p)}}))}),await Promise.all(o),r.Pu.H_(i),await async function(u,c){const d=ee(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>F.forEach(c,g=>F.forEach(g.Ts,A=>d.persistence.referenceDelegate.addReference(p,g.targetId,A)).next(()=>F.forEach(g.Es,A=>d.persistence.referenceDelegate.removeReference(p,g.targetId,A)))))}catch(p){if(!js(p))throw p;q(Ap,"Failed to update sequence numbers: "+p)}for(const p of c){const g=p.targetId;if(!p.fromCache){const A=d.vs.get(g),P=A.snapshotVersion,x=A.withLastLimboFreeSnapshotVersion(P);d.vs=d.vs.insert(g,x)}}}(r.localStore,s))}async function cN(t,e){const n=ee(t);if(!n.currentUser.isEqual(e)){q(Mp,"User change. New user:",e.toKey());const r=await IT(n.localStore,e);n.currentUser=e,function(s,o){s.mu.forEach(l=>{l.forEach(u=>{u.reject(new W(M.CANCELLED,o))})}),s.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Na(n,r.Ns)}}function hN(t,e){const n=ee(t),r=n.Au.get(e);if(r&&r.hu)return le().add(r.key);{let i=le();const s=n.Eu.get(e);if(!s)return i;for(const o of s){const l=n.Tu.get(o);i=i.unionWith(l.view.nu)}return i}}function UT(t){const e=ee(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=LT.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=hN.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=oN.bind(null,e),e.Pu.H_=G2.bind(null,e.eventManager),e.Pu.yu=Q2.bind(null,e.eventManager),e}function dN(t){const e=ee(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=aN.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=lN.bind(null,e),e}class Ru{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=dc(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,n){return null}Mu(e,n){return null}vu(e){return g2(this.persistence,new d2,e.initialUser,this.serializer)}Cu(e){return new TT(Sp.Vi,this.serializer)}Du(e){return new T2}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ru.provider={build:()=>new Ru};class fN extends Ru{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,n){pe(this.persistence.referenceDelegate instanceof ku,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Jb(r,e.asyncQueue,n)}Cu(e){const n=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new TT(r=>ku.Vi(r,n),this.serializer)}}class ef{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>V_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=cN.bind(null,this.syncEngine),await q2(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new K2}()}createDatastore(e){const n=dc(e.databaseInfo.databaseId),r=R2(e.databaseInfo);return N2(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,l){return new O2(r,i,s,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>V_(this.syncEngine,n,0),function(){return P_.v()?new P_:new I2}())}createSyncEngine(e,n){return function(i,s,o,l,u,c,d){const p=new Z2(i,s,o,l,u,c);return d&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=ee(i);q(ki,"RemoteStore shutting down."),s.Ia.add(5),await ba(s),s.Aa.shutdown(),s.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}ef.provider={build:()=>new ef};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Jn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr="FirestoreClient";class pN{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this._databaseInfo=i,this.user=lt.UNAUTHENTICATED,this.clientId=dp.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{q(zr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(q(zr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new En;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Np(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Ph(t,e){t.asyncQueue.verifyOperationInProgress(),q(zr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await IT(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function M_(t,e){t.asyncQueue.verifyOperationInProgress();const n=await gN(t);q(zr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>b_(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>b_(e.remoteStore,i)),t._onlineComponents=e}async function gN(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){q(zr,"Using user provided OfflineComponentProvider");try{await Ph(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===M.FAILED_PRECONDITION||i.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;Si("Error using user provided cache. Falling back to memory cache: "+n),await Ph(t,new Ru)}}else q(zr,"Using default OfflineComponentProvider"),await Ph(t,new fN(void 0));return t._offlineComponents}async function Up(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(q(zr,"Using user provided OnlineComponentProvider"),await M_(t,t._uninitializedComponentsProvider._online)):(q(zr,"Using default OnlineComponentProvider"),await M_(t,new ef))),t._onlineComponents}function mN(t){return Up(t).then(e=>e.syncEngine)}function yN(t){return Up(t).then(e=>e.datastore)}async function Cu(t){const e=await Up(t),n=e.eventManager;return n.onListen=eN.bind(null,e.syncEngine),n.onUnlisten=rN.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=tN.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=iN.bind(null,e.syncEngine),n}function _N(t,e,n,r){const i=new jp(r),s=new Lp(e,i,n);return t.asyncQueue.enqueueAndForget(async()=>Dp(await Cu(t),s)),()=>{i.Nu(),t.asyncQueue.enqueueAndForget(async()=>Op(await Cu(t),s))}}function vN(t,e,n={}){const r=new En;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,c){const d=new jp({next:g=>{d.Nu(),o.enqueueAndForget(()=>Op(s,p));const A=g.docs.has(l);!A&&g.fromCache?c.reject(new W(M.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&g.fromCache&&u&&u.source==="server"?c.reject(new W(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(g)},error:g=>c.reject(g)}),p=new Lp(oc(l.path),d,{includeMetadataChanges:!0,qa:!0});return Dp(s,p)}(await Cu(t),t.asyncQueue,e,n,r)),r.promise}function wN(t,e,n={}){const r=new En;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,c){const d=new jp({next:g=>{d.Nu(),o.enqueueAndForget(()=>Op(s,p)),g.fromCache&&u.source==="server"?c.reject(new W(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(g)},error:g=>c.reject(g)}),p=new Lp(l,d,{includeMetadataChanges:!0,qa:!0});return Dp(s,p)}(await Cu(t),t.asyncQueue,e,n,r)),r.promise}function EN(t,e,n){const r=new En;return t.asyncQueue.enqueueAndForget(async()=>{try{const i=await yN(t);r.resolve(async function(o,l,u){var x;const c=ee(o),{request:d,gt:p,parent:g}=Fb(c.serializer,ib(l),u);c.connection.qo||delete d.parent;const A=(await c.jo("RunAggregationQuery",c.serializer.databaseId,g,d,1)).filter(b=>!!b.result);pe(A.length===1,64727);const P=(x=A[0].result)==null?void 0:x.aggregateFields;return Object.keys(P).reduce((b,v)=>(b[p[v]]=P[v],b),{})}(i,e,n))}catch(i){r.reject(i)}}),r.promise}function TN(t,e){const n=new En;return t.asyncQueue.enqueueAndForget(async()=>sN(await mN(t),e,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zT(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IN="ComponentProvider",F_=new Map;function SN(t,e,n,r,i){return new zx(t,e,n,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,zT(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BT="firestore.googleapis.com",j_=!0;class U_{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new W(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=BT,this.ssl=j_}else this.host=e.host,this.ssl=e.ssl??j_;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ET;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Qb)throw new W(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Px("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zT(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class gc{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new U_({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new U_(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new vx;switch(r.type){case"firstParty":return new Ix(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=F_.get(n);r&&(q(IN,"Removing Datastore"),F_.delete(n),r.terminate())}(this),Promise.resolve()}}function kN(t,e,n,r={}){var c;t=Et(t,gc);const i=Ia(e),s=t._getSettings(),o={...s,emulatorOptions:t._getEmulatorOptions()},l=`${e}:${n}`;i&&ME(`https://${l}`),s.host!==BT&&s.host!==l&&Si("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:l,ssl:i,emulatorOptions:r};if(!Ei(u,o)&&(t._setSettings(u),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=lt.MOCK_USER;else{d=L1(r.mockUserToken,(c=t._app)==null?void 0:c.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new W(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new lt(g)}t._authCredentials=new wx(new x0(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Li(this.firestore,e,this._query)}}class De{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Dr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new De(this.firestore,e,this._key)}toJSON(){return{type:De._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(Ra(n,De._jsonSchema))return new De(e,r||null,new G(ve.fromString(n.referencePath)))}}De._jsonSchemaVersion="firestore/documentReference/1.0",De._jsonSchema={type:ze("string",De._jsonSchemaVersion),referencePath:ze("string")};class Dr extends Li{constructor(e,n,r){super(e,n,oc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new De(this.firestore,null,new G(e))}withConverter(e){return new Dr(this.firestore,e,this._path)}}function ht(t,e,...n){if(t=Oe(t),b0("collection","path",e),t instanceof gc){const r=ve.fromString(e,...n);return Zy(r),new Dr(t,null,r)}{if(!(t instanceof De||t instanceof Dr))throw new W(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(ve.fromString(e,...n));return Zy(r),new Dr(t.firestore,null,r)}}function Ye(t,e,...n){if(t=Oe(t),arguments.length===1&&(e=dp.newId()),b0("doc","path",e),t instanceof gc){const r=ve.fromString(e,...n);return Xy(r),new De(t,null,new G(r))}{if(!(t instanceof De||t instanceof Dr))throw new W(M.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(ve.fromString(e,...n));return Xy(r),new De(t.firestore,t instanceof Dr?t.converter:null,new G(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z_="AsyncQueue";class B_{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new kT(this,"async_queue_retry"),this._c=()=>{const r=Ch();r&&q(z_,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const n=Ch();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const n=Ch();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const n=new En;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!js(e))throw e;q(z_,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const n=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,Jn("INTERNAL UNHANDLED ERROR: ",$_(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=n,n}enqueueAfterDelay(e,n,r){this.uc(),this.oc.indexOf(e)>-1&&(n=0);const i=bp.createAndSchedule(this,e,n,r,s=>this.hc(s));return this.tc.push(i),i}uc(){this.nc&&J(47125,{Pc:$_(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const n of this.tc)if(n.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.tc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const n=this.tc.indexOf(e);this.tc.splice(n,1)}}function $_(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class Cn extends gc{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new B_,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new B_(e),this._firestoreClient=void 0,await e}}}function AN(t,e){const n=typeof t=="object"?t:np(),r=typeof t=="string"?t:_u,i=Ds(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=O1("firestore");s&&kN(i,...s)}return i}function Da(t){if(t._terminated)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||RN(t),t._firestoreClient}function RN(t){var r,i,s,o;const e=t._freezeSettings(),n=SN(t._databaseId,((r=t._app)==null?void 0:r.options.appId)||"",t._persistenceKey,(i=t._app)==null?void 0:i.options.apiKey,e);t._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new pN(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(u){const c=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(c),_online:c}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Bt(rt.fromBase64String(e))}catch(n){throw new W(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Bt(rt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Bt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ra(e,Bt._jsonSchema))return Bt.fromBase64String(e.bytes)}}Bt._jsonSchemaVersion="firestore/bytes/1.0",Bt._jsonSchema={type:ze("string",Bt._jsonSchemaVersion),bytes:ze("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new W(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new et(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new W(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new W(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ae(this._lat,e._lat)||ae(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Sn._jsonSchemaVersion}}static fromJSON(e){if(Ra(e,Sn._jsonSchema))return new Sn(e.latitude,e.longitude)}}Sn._jsonSchemaVersion="firestore/geoPoint/1.0",Sn._jsonSchema={type:ze("string",Sn._jsonSchemaVersion),latitude:ze("number"),longitude:ze("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:rn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ra(e,rn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new rn(e.vectorValues);throw new W(M.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}rn._jsonSchemaVersion="firestore/vectorValue/1.0",rn._jsonSchema={type:ze("string",rn._jsonSchemaVersion),vectorValues:ze("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CN=/^__.*__$/;class PN{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Qr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Pa(e,this.data,n,this.fieldTransforms)}}class $T{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Qr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function WT(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw J(40011,{dataSource:t})}}class $p{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new $p({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var i;const n=(i=this.path)==null?void 0:i.child(e),r=this.i({path:n,arrayElement:!1});return r.mc(e),r}fc(e){var i;const n=(i=this.path)==null?void 0:i.child(e),r=this.i({path:n,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Pu(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(WT(this.dataSource)&&CN.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class xN{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||dc(e)}I(e,n,r,i=!1){return new $p({dataSource:e,methodName:n,targetDoc:r,path:et.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function mc(t){const e=t._freezeSettings(),n=dc(t._databaseId);return new xN(t._databaseId,!!e.ignoreUndefinedProperties,n)}function qT(t,e,n,r,i,s={}){const o=t.I(s.merge||s.mergeFields?2:0,e,n,i);Wp("Data must be an object, but it was:",o,r);const l=HT(r,o);let u,c;if(s.merge)u=new Ot(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const d=[];for(const p of s.mergeFields){const g=Cs(e,p,n);if(!o.contains(g))throw new W(M.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);QT(d,g)||d.push(g)}u=new Ot(d),c=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,c=o.fieldTransforms;return new PN(new vt(l),u,c)}class yc extends Bp{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof yc}}function bN(t,e,n,r){const i=t.I(1,e,n);Wp("Data must be an object, but it was:",i,r);const s=[],o=vt.empty();Gr(r,(u,c)=>{const d=GT(e,u,n);c=Oe(c);const p=i.fc(d);if(c instanceof yc)s.push(d);else{const g=Oa(c,p);g!=null&&(s.push(d),o.set(d,g))}});const l=new Ot(s);return new $T(o,l,i.fieldTransforms)}function NN(t,e,n,r,i,s){const o=t.I(1,e,n),l=[Cs(e,r,n)],u=[i];if(s.length%2!=0)throw new W(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<s.length;g+=2)l.push(Cs(e,s[g])),u.push(s[g+1]);const c=[],d=vt.empty();for(let g=l.length-1;g>=0;--g)if(!QT(c,l[g])){const A=l[g];let P=u[g];P=Oe(P);const x=o.fc(A);if(P instanceof yc)c.push(A);else{const b=Oa(P,x);b!=null&&(c.push(A),d.set(A,b))}}const p=new Ot(c);return new $T(d,p,o.fieldTransforms)}function DN(t,e,n,r=!1){return Oa(n,t.I(r?4:3,e))}function Oa(t,e){if(KT(t=Oe(t)))return Wp("Unsupported field value:",e,t),HT(t,e);if(t instanceof Bp)return function(r,i){if(!WT(i.dataSource))throw i.yc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.yc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const l of r){let u=Oa(l,i.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=Oe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return db(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ie.fromDate(r);return{timestampValue:Su(i.serializer,s)}}if(r instanceof Ie){const s=new Ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Su(i.serializer,s)}}if(r instanceof Sn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Bt)return{bytesValue:dT(i.serializer,r._byteString)};if(r instanceof De){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Tp(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof rn)return function(o,l){const u=o instanceof rn?o.toArray():o;return{mapValue:{fields:{[U0]:{stringValue:z0},[vu]:{arrayValue:{values:u.map(d=>{if(typeof d!="number")throw l.yc("VectorValues must only contain numeric values.");return _p(l.serializer,d)})}}}}}}(r,i);if(wT(r))return r._toProto(i.serializer);throw i.yc(`Unsupported field value: ${nc(r)}`)}(t,e)}function HT(t,e){const n={};return O0(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Gr(t,(r,i)=>{const s=Oa(i,e.dc(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function KT(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ie||t instanceof Sn||t instanceof Bt||t instanceof De||t instanceof Bp||t instanceof rn||wT(t))}function Wp(t,e,n){if(!KT(n)||!N0(n)){const r=nc(n);throw r==="an object"?e.yc(t+" a custom object"):e.yc(t+" "+r)}}function Cs(t,e,n){if((e=Oe(e))instanceof zp)return e._internalPath;if(typeof e=="string")return GT(t,e);throw Pu("Field path arguments must be of type string or ",t,!1,void 0,n)}const ON=new RegExp("[~\\*/\\[\\]]");function GT(t,e,n){if(e.search(ON)>=0)throw Pu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new zp(...e.split("."))._internalPath}catch{throw Pu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Pu(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new W(M.INVALID_ARGUMENT,l+t+u)}function QT(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VN{convertValue(e,n="none"){switch(jr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Fr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw J(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Gr(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var r,i,s;const n=(s=(i=(r=e.fields)==null?void 0:r[vu].arrayValue)==null?void 0:i.values)==null?void 0:s.map(o=>Le(o.doubleValue));return new rn(n)}convertGeoPoint(e){return new Sn(Le(e.latitude),Le(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=sc(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(aa(e));default:return null}}convertTimestamp(e){const n=Mr(e);return new Ie(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=ve.fromString(e);pe(vT(r),9688,{name:e});const i=new la(r.get(1),r.get(3)),s=new G(r.popFirst(5));return i.isEqual(n)||Jn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c extends VN{constructor(e){super(),this.firestore=e}convertBytes(e){return new Bt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new De(this.firestore,null,n)}}const W_="@firebase/firestore",q_="4.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H_(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LN{constructor(e="count",n){this._internalFieldPath=n,this.type="AggregateField",this.aggregateType=e}}class MN{constructor(e,n,r){this._userDataWriter=n,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new vt({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new De(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new FN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const n=this._document.data.field(Cs("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class FN extends YT{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JT(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new W(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class qp{}class jN extends qp{}function Zn(t,e,...n){let r=[];e instanceof qp&&r.push(e),r=r.concat(n),function(s){const o=s.filter(u=>u instanceof Hp).length,l=s.filter(u=>u instanceof vc).length;if(o>1||o>0&&l>0)throw new W(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class vc extends jN{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new vc(e,n,r)}_apply(e){const n=this._parse(e);return XT(e._query,n),new Li(e.firestore,e.converter,Wd(e._query,n))}_parse(e){const n=mc(e.firestore);return function(s,o,l,u,c,d,p){let g;if(c.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new W(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){G_(p,d);const P=[];for(const x of p)P.push(K_(u,s,x));g={arrayValue:{values:P}}}else g=K_(u,s,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||G_(p,d),g=DN(l,o,p,d==="in"||d==="not-in");return Ue.create(c,d,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function kn(t,e,n){const r=e,i=Cs("where",t);return vc._create(i,r,n)}class Hp extends qp{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Hp(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:un.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i;const l=s.getFlattenedFilters();for(const u of l)XT(o,u),o=Wd(o,u)}(e._query,n),new Li(e.firestore,e.converter,Wd(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function K_(t,e,n){if(typeof(n=Oe(n))=="string"){if(n==="")throw new W(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Q0(e)&&n.indexOf("/")!==-1)throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(ve.fromString(n));if(!G.isDocumentKey(r))throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return a_(t,new G(r))}if(n instanceof De)return a_(t,n._key);throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${nc(n)}.`)}function G_(t,e){if(!Array.isArray(t)||t.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function XT(t,e){const n=function(i,s){for(const o of i)for(const l of o.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function ZT(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}function UN(){return new LN("count")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zN(t){return BN(t,{count:UN()})}function BN(t,e){const n=Et(t.firestore,Cn),r=Da(n),i=jx(e,(s,o)=>new Tb(o,s.aggregateType,s._internalFieldPath));return EN(r,t._query,i).then(s=>function(l,u,c){const d=new _c(l);return new MN(u,d,c)}(n,t,s))}class To{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class pi extends YT{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Fl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Cs("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new W(M.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=pi._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}pi._jsonSchemaVersion="firestore/documentSnapshot/1.0",pi._jsonSchema={type:ze("string",pi._jsonSchemaVersion),bundleSource:ze("string","DocumentSnapshot"),bundleName:ze("string"),bundle:ze("string")};class Fl extends pi{data(e={}){return super.data(e)}}class gi{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new To(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Fl(this._firestore,this._userDataWriter,r.key,r,new To(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new W(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new Fl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new To(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Fl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new To(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,d=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),d=o.indexOf(l.doc.key)),{type:$N(l.type),doc:u,oldIndex:c,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new W(M.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=gi._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=dp.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(n.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function $N(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return J(61501,{type:t})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */gi._jsonSchemaVersion="firestore/querySnapshot/1.0",gi._jsonSchema={type:ze("string",gi._jsonSchemaVersion),bundleSource:ze("string","QuerySnapshot"),bundleName:ze("string"),bundle:ze("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ai(t){t=Et(t,De);const e=Et(t.firestore,Cn),n=Da(e);return vN(n,t._key).then(r=>eI(e,t,r))}function Kp(t){t=Et(t,Li);const e=Et(t.firestore,Cn),n=Da(e),r=new _c(e);return JT(t._query),wN(n,t._query).then(i=>new gi(e,r,t,i))}function WN(t,e,n){t=Et(t,De);const r=Et(t.firestore,Cn),i=ZT(t.converter,e,n),s=mc(r);return wc(r,[qT(s,"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,Ht.none())])}function Va(t,e,n,...r){t=Et(t,De);const i=Et(t.firestore,Cn),s=mc(i);let o;return o=typeof(e=Oe(e))=="string"||e instanceof zp?NN(s,"updateDoc",t._key,e,n,r):bN(s,"updateDoc",t._key,e),wc(i,[o.toMutation(t._key,Ht.exists(!0))])}function xu(t){return wc(Et(t.firestore,Cn),[new vp(t._key,Ht.none())])}function Gp(t,e){const n=Et(t.firestore,Cn),r=Ye(t),i=ZT(t.converter,e),s=mc(t.firestore);return wc(n,[qT(s,"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,Ht.exists(!1))]).then(()=>r)}function Wn(t,...e){var c,d,p;t=Oe(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||H_(e[r])||(n=e[r++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(H_(e[r])){const g=e[r];e[r]=(c=g.next)==null?void 0:c.bind(g),e[r+1]=(d=g.error)==null?void 0:d.bind(g),e[r+2]=(p=g.complete)==null?void 0:p.bind(g)}let s,o,l;if(t instanceof De)o=Et(t.firestore,Cn),l=oc(t._key.path),s={next:g=>{e[r]&&e[r](eI(o,t,g))},error:e[r+1],complete:e[r+2]};else{const g=Et(t,Li);o=Et(g.firestore,Cn),l=g._query;const A=new _c(o);s={next:P=>{e[r]&&e[r](new gi(o,A,g,P))},error:e[r+1],complete:e[r+2]},JT(t._query)}const u=Da(o);return _N(u,l,i,s)}function wc(t,e){const n=Da(t);return TN(n,e)}function eI(t,e,n){const r=n.docs.get(e._key),i=new _c(t);return new pi(t,i,e._key,r,new To(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){_x(Os),An(new an("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new Cn(new Ex(r.getProvider("auth-internal")),new Sx(o,r.getProvider("app-check-internal")),Bx(o,i),o);return s={useFetchStreams:n,...s},l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),qt(W_,q_,e),qt(W_,q_,"esm2020")})();var qN="firebase",HN="12.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qt(qN,HN,"app");const tI="@firebase/installations",Qp="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nI=1e4,rI=`w:${Qp}`,iI="FIS_v2",KN="https://firebaseinstallations.googleapis.com/v1",GN=60*60*1e3,QN="installations",YN="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JN={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ri=new Ni(QN,YN,JN);function sI(t){return t instanceof Pn&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oI({projectId:t}){return`${KN}/projects/${t}/installations`}function aI(t){return{token:t.token,requestStatus:2,expiresIn:ZN(t.expiresIn),creationTime:Date.now()}}async function lI(t,e){const r=(await e.json()).error;return Ri.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function uI({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function XN(t,{refreshToken:e}){const n=uI(t);return n.append("Authorization",eD(e)),n}async function cI(t){const e=await t();return e.status>=500&&e.status<600?t():e}function ZN(t){return Number(t.replace("s","000"))}function eD(t){return`${iI} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tD({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=oI(t),i=uI(t),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:n,authVersion:iI,appId:t.appId,sdkVersion:rI},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await cI(()=>fetch(r,l));if(u.ok){const c=await u.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:aI(c.authToken)}}else throw await lI("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hI(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nD(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rD=/^[cdef][\w-]{21}$/,tf="";function iD(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=sD(t);return rD.test(n)?n:tf}catch{return tf}}function sD(t){return nD(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ec(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI=new Map;function fI(t,e){const n=Ec(t);pI(n,e),oD(n,e)}function pI(t,e){const n=dI.get(t);if(n)for(const r of n)r(e)}function oD(t,e){const n=aD();n&&n.postMessage({key:t,fid:e}),lD()}let ci=null;function aD(){return!ci&&"BroadcastChannel"in self&&(ci=new BroadcastChannel("[Firebase] FID Change"),ci.onmessage=t=>{pI(t.data.key,t.data.fid)}),ci}function lD(){dI.size===0&&ci&&(ci.close(),ci=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uD="firebase-installations-database",cD=1,Ci="firebase-installations-store";let xh=null;function Yp(){return xh||(xh=Ju(uD,cD,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Ci)}}})),xh}async function bu(t,e){const n=Ec(t),i=(await Yp()).transaction(Ci,"readwrite"),s=i.objectStore(Ci),o=await s.get(n);return await s.put(e,n),await i.done,(!o||o.fid!==e.fid)&&fI(t,e.fid),e}async function gI(t){const e=Ec(t),r=(await Yp()).transaction(Ci,"readwrite");await r.objectStore(Ci).delete(e),await r.done}async function Tc(t,e){const n=Ec(t),i=(await Yp()).transaction(Ci,"readwrite"),s=i.objectStore(Ci),o=await s.get(n),l=e(o);return l===void 0?await s.delete(n):await s.put(l,n),await i.done,l&&(!o||o.fid!==l.fid)&&fI(t,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jp(t){let e;const n=await Tc(t.appConfig,r=>{const i=hD(r),s=dD(t,i);return e=s.registrationPromise,s.installationEntry});return n.fid===tf?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function hD(t){const e=t||{fid:iD(),registrationStatus:0};return mI(e)}function dD(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Ri.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=fD(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:pD(t)}:{installationEntry:e}}async function fD(t,e){try{const n=await tD(t,e);return bu(t.appConfig,n)}catch(n){throw sI(n)&&n.customData.serverCode===409?await gI(t.appConfig):await bu(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function pD(t){let e=await Q_(t.appConfig);for(;e.registrationStatus===1;)await hI(100),e=await Q_(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Jp(t);return r||n}return e}function Q_(t){return Tc(t,e=>{if(!e)throw Ri.create("installation-not-found");return mI(e)})}function mI(t){return gD(t)?{fid:t.fid,registrationStatus:0}:t}function gD(t){return t.registrationStatus===1&&t.registrationTime+nI<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mD({appConfig:t,heartbeatServiceProvider:e},n){const r=yD(t,n),i=XN(t,n),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:rI,appId:t.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await cI(()=>fetch(r,l));if(u.ok){const c=await u.json();return aI(c)}else throw await lI("Generate Auth Token",u)}function yD(t,{fid:e}){return`${oI(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xp(t,e=!1){let n;const r=await Tc(t.appConfig,s=>{if(!yI(s))throw Ri.create("not-registered");const o=s.authToken;if(!e&&wD(o))return s;if(o.requestStatus===1)return n=_D(t,e),s;{if(!navigator.onLine)throw Ri.create("app-offline");const l=TD(s);return n=vD(t,l),l}});return n?await n:r.authToken}async function _D(t,e){let n=await Y_(t.appConfig);for(;n.authToken.requestStatus===1;)await hI(100),n=await Y_(t.appConfig);const r=n.authToken;return r.requestStatus===0?Xp(t,e):r}function Y_(t){return Tc(t,e=>{if(!yI(e))throw Ri.create("not-registered");const n=e.authToken;return ID(n)?{...e,authToken:{requestStatus:0}}:e})}async function vD(t,e){try{const n=await mD(t,e),r={...e,authToken:n};return await bu(t.appConfig,r),n}catch(n){if(sI(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await gI(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await bu(t.appConfig,r)}throw n}}function yI(t){return t!==void 0&&t.registrationStatus===2}function wD(t){return t.requestStatus===2&&!ED(t)}function ED(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+GN}function TD(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function ID(t){return t.requestStatus===1&&t.requestTime+nI<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SD(t){const e=t,{installationEntry:n,registrationPromise:r}=await Jp(e);return r?r.catch(console.error):Xp(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kD(t,e=!1){const n=t;return await AD(n),(await Xp(n,e)).token}async function AD(t){const{registrationPromise:e}=await Jp(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RD(t){if(!t||!t.options)throw bh("App Configuration");if(!t.name)throw bh("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw bh(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function bh(t){return Ri.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I="installations",CD="installations-internal",PD=t=>{const e=t.getProvider("app").getImmediate(),n=RD(e),r=Ds(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},xD=t=>{const e=t.getProvider("app").getImmediate(),n=Ds(e,_I).getImmediate();return{getId:()=>SD(n),getToken:i=>kD(n,i)}};function bD(){An(new an(_I,PD,"PUBLIC")),An(new an(CD,xD,"PRIVATE"))}bD();qt(tI,Qp);qt(tI,Qp,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ND="/firebase-messaging-sw.js",DD="/firebase-cloud-messaging-push-scope",vI="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",OD="https://fcmregistrations.googleapis.com/v1",wI="google.c.a.c_id",VD="google.c.a.c_l",LD="google.c.a.ts",MD="google.c.a.e",J_=1e4;var X_;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(X_||(X_={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var da;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(da||(da={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function FD(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let s=0;s<r.length;++s)i[s]=r.charCodeAt(s);return i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh="fcm_token_details_db",jD=5,Z_="fcm_token_object_Store";async function UD(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(s=>s.name).includes(Nh))return null;let e=null;return(await Ju(Nh,jD,{upgrade:async(r,i,s,o)=>{if(i<2||!r.objectStoreNames.contains(Z_))return;const l=o.objectStore(Z_),u=await l.index("fcmSenderId").get(t);if(await l.clear(),!!u){if(i===2){const c=u;if(!c.auth||!c.p256dh||!c.endpoint)return;e={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:Ln(c.vapidKey)}}}else if(i===3){const c=u;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Ln(c.auth),p256dh:Ln(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Ln(c.vapidKey)}}}else if(i===4){const c=u;e={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:Ln(c.auth),p256dh:Ln(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:Ln(c.vapidKey)}}}}}})).close(),await wh(Nh),await wh("fcm_vapid_details_db"),await wh("undefined"),zD(e)?e:null}function zD(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BD="firebase-messaging-database",$D=1,fa="firebase-messaging-store";let Dh=null;function EI(){return Dh||(Dh=Ju(BD,$D,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(fa)}}})),Dh}async function WD(t){const e=TI(t),r=await(await EI()).transaction(fa).objectStore(fa).get(e);if(r)return r;{const i=await UD(t.appConfig.senderId);if(i)return await Zp(t,i),i}}async function Zp(t,e){const n=TI(t),i=(await EI()).transaction(fa,"readwrite");return await i.objectStore(fa).put(e,n),await i.done,e}function TI({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qD={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},dt=new Ni("messaging","Messaging",qD);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HD(t,e){const n=await tg(t),r=II(e),i={method:"POST",headers:n,body:JSON.stringify(r)};let s;try{s=await(await fetch(eg(t.appConfig),i)).json()}catch(o){throw dt.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(s.error){const o=s.error.message;throw dt.create("token-subscribe-failed",{errorInfo:o})}if(!s.token)throw dt.create("token-subscribe-no-token");return s.token}async function KD(t,e){const n=await tg(t),r=II(e.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let s;try{s=await(await fetch(`${eg(t.appConfig)}/${e.token}`,i)).json()}catch(o){throw dt.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(s.error){const o=s.error.message;throw dt.create("token-update-failed",{errorInfo:o})}if(!s.token)throw dt.create("token-update-no-token");return s.token}async function GD(t,e){const r={method:"DELETE",headers:await tg(t)};try{const s=await(await fetch(`${eg(t.appConfig)}/${e}`,r)).json();if(s.error){const o=s.error.message;throw dt.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw dt.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}function eg({projectId:t}){return`${OD}/projects/${t}/registrations`}async function tg({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function II({p256dh:t,auth:e,endpoint:n,vapidKey:r}){const i={web:{endpoint:n,auth:e,p256dh:t}};return r!==vI&&(i.web.applicationPubKey=r),i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QD=7*24*60*60*1e3;async function YD(t){const e=await XD(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:Ln(e.getKey("auth")),p256dh:Ln(e.getKey("p256dh"))},r=await WD(t.firebaseDependencies);if(r){if(ZD(r.subscriptionOptions,n))return Date.now()>=r.createTime+QD?JD(t,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await GD(t.firebaseDependencies,r.token)}catch(i){console.warn(i)}return ev(t.firebaseDependencies,n)}else return ev(t.firebaseDependencies,n)}async function JD(t,e){try{const n=await KD(t.firebaseDependencies,e),r={...e,token:n,createTime:Date.now()};return await Zp(t.firebaseDependencies,r),n}catch(n){throw n}}async function ev(t,e){const r={token:await HD(t,e),createTime:Date.now(),subscriptionOptions:e};return await Zp(t,r),r.token}async function XD(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:FD(e)})}function ZD(t,e){const n=e.vapidKey===t.vapidKey,r=e.endpoint===t.endpoint,i=e.auth===t.auth,s=e.p256dh===t.p256dh;return n&&r&&i&&s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tv(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return eO(e,t),tO(e,t),nO(e,t),e}function eO(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const r=e.notification.body;r&&(t.notification.body=r);const i=e.notification.image;i&&(t.notification.image=i);const s=e.notification.icon;s&&(t.notification.icon=s)}function tO(t,e){e.data&&(t.data=e.data)}function nO(t,e){var i,s,o,l;if(!e.fcmOptions&&!((i=e.notification)!=null&&i.click_action))return;t.fcmOptions={};const n=((s=e.fcmOptions)==null?void 0:s.link)??((o=e.notification)==null?void 0:o.click_action);n&&(t.fcmOptions.link=n);const r=(l=e.fcmOptions)==null?void 0:l.analytics_label;r&&(t.fcmOptions.analyticsLabel=r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rO(t){return typeof t=="object"&&!!t&&wI in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iO(t){if(!t||!t.options)throw Oh("App Configuration Object");if(!t.name)throw Oh("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const r of e)if(!n[r])throw Oh(r);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Oh(t){return dt.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sO{constructor(e,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=iO(e);this.firebaseDependencies={app:e,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oO(t){try{t.swRegistration=await navigator.serviceWorker.register(ND,{scope:DD}),t.swRegistration.update().catch(()=>{}),await aO(t.swRegistration)}catch(e){throw dt.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function aO(t){return new Promise((e,n)=>{const r=setTimeout(()=>n(new Error(`Service worker not registered after ${J_} ms`)),J_),i=t.installing||t.waiting;t.active?(clearTimeout(r),e()):i?i.onstatechange=s=>{var o;((o=s.target)==null?void 0:o.state)==="activated"&&(i.onstatechange=null,clearTimeout(r),e())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lO(t,e){if(!e&&!t.swRegistration&&await oO(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw dt.create("invalid-sw-registration");t.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uO(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=vI)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SI(t,e){if(!navigator)throw dt.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw dt.create("permission-blocked");return await uO(t,e==null?void 0:e.vapidKey),await lO(t,e==null?void 0:e.serviceWorkerRegistration),YD(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cO(t,e,n){const r=hO(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[wI],message_name:n[VD],message_time:n[LD],message_device_time:Math.floor(Date.now()/1e3)})}function hO(t){switch(t){case da.NOTIFICATION_CLICKED:return"notification_open";case da.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dO(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===da.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(tv(n)):t.onMessageHandler.next(tv(n)));const r=n.data;rO(r)&&r[MD]==="1"&&await cO(t,n.messageType,r)}const nv="@firebase/messaging",rv="0.12.25";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fO=t=>{const e=new sO(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>dO(e,n)),e},pO=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:r=>SI(e,r)}};function gO(){An(new an("messaging",fO,"PUBLIC")),An(new an("messaging-internal",pO,"PRIVATE")),qt(nv,rv),qt(nv,rv,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kI(){try{await LE()}catch{return!1}return typeof window<"u"&&VE()&&W1()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mO(t,e){if(!navigator)throw dt.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yO(t=np()){return kI().then(e=>{if(!e)throw dt.create("unsupported-browser")},e=>{throw dt.create("indexed-db-unsupported")}),Ds(Oe(t),"messaging").getImmediate()}async function _O(t,e){return t=Oe(t),SI(t,e)}function vO(t,e){return t=Oe(t),mO(t,e)}gO();const wO={apiKey:"AIzaSyCuJ-3NzsNEz7L9lNAt8OjidaMs-_NiYKE",authDomain:"whattowear-45431.firebaseapp.com",projectId:"whattowear-45431",storageBucket:"whattowear-45431.firebasestorage.app",messagingSenderId:"785094348865",appId:"1:785094348865:web:1ccdd51d6b147c2de276c0",measurementId:"G-MCR5K1QR98"},ng=UE(wO),Nu=mx(ng);rP(Nu,p0).catch(console.error);const de=AN(ng),EO=kI().then(t=>t?yO(ng):null),AI=V.createContext({user:null,loading:!0,isAdmin:!1,logout:async()=>{}}),cn=()=>V.useContext(AI),TO=({children:t})=>{const[e,n]=V.useState(null),[r,i]=V.useState(!0),[s,o]=V.useState(!1),l=async()=>{await Nu.signOut(),n(null),o(!1)};return V.useEffect(()=>{const u=oP(Nu,async c=>{if(console.log("=== AUTH STATE CHANGED ==="),console.log("User:",(c==null?void 0:c.uid)??"null"),console.log("Email:",(c==null?void 0:c.email)??"null"),n(c),c)try{const d=await Ai(Ye(de,"profiles",c.uid)),p=d.data(),g=(p==null?void 0:p.isAdmin)===!0;o(g),console.log("Profile exists:",d.exists()),console.log("Is Admin:",g)}catch(d){console.error("Profile fetch error:",d),o(!1)}else o(!1);i(!1),console.log("=== AUTH CHECK COMPLETE ===")});return()=>u()},[]),T.jsx(AI.Provider,{value:{user:e,loading:r,isAdmin:s,logout:l},children:t})},zi=({children:t})=>{const{user:e,loading:n}=cn(),r=Ea();return n?T.jsx("div",{style:{padding:48,textAlign:"center",color:"#666"},children:"Yükleniyor…"}):e?T.jsx(T.Fragment,{children:t}):T.jsx(na,{to:"/login",replace:!0,state:{from:r.pathname}})},IO="BlqIVR_Ldt1_-f7UoViy3sDprdCIYsPLw6tWT4SjFK9B7yyhraxtKGbcj_DC93jzuTfi0iSn5bjl-adq47NKNnE";function SO(){const{user:t}=cn();V.useEffect(()=>{!t||!("Notification"in window)||!("serviceWorker"in navigator)||kO(t.uid).catch(console.error)},[t==null?void 0:t.uid])}async function kO(t){const e=await EO;if(!e||await Notification.requestPermission()!=="granted")return;const r=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/fcm-sw/"}),i=await _O(e,{vapidKey:IO,serviceWorkerRegistration:r});i&&(await Va(Ye(de,"profiles",t),{fcmToken:i}),vO(e,s=>{const{title:o,body:l}=s.notification??{};o&&new Notification(o,{body:l??"",icon:"/icon-192.png"})}))}const sn=()=>{const t=Hr(),e=Ea(),{user:n,logout:r,isAdmin:i}=cn(),[s,o]=V.useState(0);V.useEffect(()=>{if(n)if(i){const u=Zn(ht(de,"outfitRequests"),kn("status","==","pending"));return Wn(u,c=>o(c.size))}else{const u=Zn(ht(de,"outfitSuggestions"),kn("requesterUid","==",n.uid),kn("liked","==",null));return Wn(u,c=>o(c.size))}},[n,i]);const l=async()=>{try{await r()}catch(u){console.error("Logout hatası:",u)}finally{t("/login",{replace:!0})}};return T.jsxs("nav",{style:jt.nav,children:[T.jsx("h1",{style:jt.logo,onClick:()=>t(i?"/home":"/wardrobe"),children:i?"🎨 Admin Panel":"BAKÇAY"}),T.jsxs("div",{style:jt.links,children:[i?T.jsxs("button",{type:"button",onClick:()=>t("/home"),style:{...jt.link,...e.pathname==="/home"?jt.activeLink:{},position:"relative"},children:["Ana Sayfa",s>0&&T.jsx("span",{style:jt.badge,children:s})]}):T.jsxs(T.Fragment,{children:[T.jsx("button",{type:"button",onClick:()=>t("/wardrobe"),style:{...jt.link,...e.pathname.startsWith("/wardrobe")?jt.activeLink:{}},children:"Bakçay Dolap"}),T.jsxs("button",{type:"button",onClick:()=>t("/kombin"),style:{...jt.link,...e.pathname.startsWith("/kombin")?jt.activeLink:{},position:"relative"},children:["Kombin",s>0&&T.jsx("span",{style:jt.badge,children:s})]})]}),T.jsx("button",{type:"button",onClick:l,style:jt.logoutBtn,children:"Çıkış"})]})]})},jt={nav:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",background:"linear-gradient(135deg, #1a1a2e, #16213e)",color:"#fff",position:"sticky",top:0,zIndex:100,borderBottom:"1px solid rgba(255,255,255,0.06)"},logo:{fontSize:"20px",cursor:"pointer",margin:0},links:{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"},link:{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",color:"#ccc",padding:"6px 14px",borderRadius:"20px",cursor:"pointer",fontSize:"13px"},activeLink:{backgroundColor:"rgba(255,255,255,0.2)",borderColor:"#fff"},logoutBtn:{background:"#ef4444",border:"none",color:"#fff",padding:"6px 14px",borderRadius:"20px",cursor:"pointer",fontSize:"13px"},badge:{position:"absolute",top:-6,right:-6,background:"#ef4444",color:"#fff",fontSize:10,fontWeight:700,minWidth:18,height:18,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px",lineHeight:1}};function Pi(t){return t.imageBase64?t.imageBase64:t.imageUrl?t.imageUrl:""}async function AO(t,e,n){return new Promise((r,i)=>{const s=new Image,o=URL.createObjectURL(t);s.onload=()=>{URL.revokeObjectURL(o);let{width:l,height:u}=s;if(l>e||u>e){const p=Math.min(e/l,e/u);l=Math.round(l*p),u=Math.round(u*p)}const c=document.createElement("canvas");c.width=l,c.height=u;const d=c.getContext("2d");if(!d){i(new Error("Canvas desteklenmiyor"));return}d.drawImage(s,0,0,l,u),r(c.toDataURL("image/jpeg",n))},s.onerror=()=>{URL.revokeObjectURL(o),i(new Error("Resim okunamadı"))},s.src=o})}const RO=()=>{const{user:t}=cn(),e=Hr(),[n,r]=V.useState([]),[i,s]=V.useState([]),[o,l]=V.useState({}),[u,c]=V.useState({}),[d,p]=V.useState([]);V.useEffect(()=>{if(!t)return;const v=Zn(ht(de,"outfitRequests"),kn("status","==","pending"));return Wn(v,_=>{const S=_.docs.map(D=>({id:D.id,...D.data()}));S.sort((D,L)=>(L.createdAt??0)-(D.createdAt??0)),p(S)})},[t]),V.useEffect(()=>{if(!t)return;const v=Zn(ht(de,"outfitSuggestions"),kn("advisorUid","==",t.uid));return Wn(v,_=>{const S=_.docs.map(D=>({id:D.id,...D.data()}));S.sort((D,L)=>(L.createdAt??0)-(D.createdAt??0)),r(S)})},[t]),V.useEffect(()=>{if(t)return Wn(ht(de,"profiles"),v=>{s(v.docs.map(_=>({id:_.id,..._.data()})))})},[t]);const g=v=>{var _,S;return((_=i.find(D=>D.id===v))==null?void 0:_.displayName)??((S=i.find(D=>D.id===v))==null?void 0:S.username)??v.slice(0,6)},A=async v=>{if(o[v])return;const _=await Ai(Ye(de,"outfitRequests",v));_.exists()&&l(S=>({...S,[v]:{id:_.id,..._.data()}}))},P=async v=>{const _=v.filter(D=>!u[D]);if(!_.length)return;const S=await Promise.all(_.map(async D=>{const L=await Ai(Ye(de,"clothes",D));return L.exists()?{id:L.id,...L.data()}:null}));c(D=>{const L={...D};return S.forEach(U=>{U&&(L[U.id]=U)}),L})};V.useEffect(()=>{n.forEach(v=>{A(v.requestId),P(v.clothingItemIds??[])})},[n.map(v=>v.id).join("|")]);const x=V.useMemo(()=>n.map(v=>{const _=o[v.requestId];return{s:v,r:_}}),[n,o]),b=V.useMemo(()=>{const v=n.length,_=n.filter(L=>L.liked==="yes").length,S=n.filter(L=>L.liked==="no").length,D=n.filter(L=>L.liked===null||L.liked===void 0).length;return{total:v,liked:_,disliked:S,waiting:D}},[n]);return T.jsxs("div",{style:ne.page,children:[T.jsx(sn,{}),T.jsxs("div",{style:ne.wrap,children:[T.jsx("h2",{style:ne.h2,children:"🎨 Önerdiğim Kombinler"}),T.jsx("p",{style:ne.sub,children:"Kullanıcılara önerdiğin kombinlerin ve geri bildirimleri burada."}),T.jsxs("div",{style:ne.statsRow,children:[T.jsxs("div",{style:{...ne.statCard,borderLeft:"4px solid #4f46e5"},children:[T.jsx("span",{style:ne.statNum,children:b.total}),T.jsx("span",{style:ne.statLabel,children:"Toplam"})]}),T.jsxs("div",{style:{...ne.statCard,borderLeft:"4px solid #22c55e"},children:[T.jsx("span",{style:ne.statNum,children:b.liked}),T.jsx("span",{style:ne.statLabel,children:"👍 Beğenildi"})]}),T.jsxs("div",{style:{...ne.statCard,borderLeft:"4px solid #ef4444"},children:[T.jsx("span",{style:ne.statNum,children:b.disliked}),T.jsx("span",{style:ne.statLabel,children:"👎 Beğenilmedi"})]}),T.jsxs("div",{style:{...ne.statCard,borderLeft:"4px solid #f59e0b"},children:[T.jsx("span",{style:ne.statNum,children:b.waiting}),T.jsx("span",{style:ne.statLabel,children:"⏳ Bekliyor"})]})]}),T.jsx("h3",{style:{fontSize:18,margin:"0 0 10px",color:"#e2e2e2"},children:"📬 Gelen Talepler"}),d.length===0?T.jsx("div",{style:ne.card,children:T.jsx("p",{style:ne.muted,children:"Bekleyen talep yok."})}):d.map(v=>{const _=g(v.fromUid),S=new Date(v.createdAt).toLocaleString("tr-TR");return T.jsxs("div",{style:ne.card,children:[T.jsxs("div",{style:ne.cardHeader,children:[T.jsxs("p",{style:ne.meta,children:[T.jsx("strong",{children:_})," kombin önerisi istiyor"]}),T.jsx("span",{style:{...ne.badge,backgroundColor:"#f59e0b"},children:"⏳ Bekliyor"})]}),T.jsxs("p",{style:ne.time,children:["📅 ",S]}),v.note?T.jsxs("p",{style:{fontSize:14,color:"#ccc",margin:"6px 0 0"},children:[T.jsx("strong",{children:"Not:"})," ",v.note]}):null,T.jsxs("div",{style:{display:"flex",gap:8,marginTop:10},children:[T.jsx("button",{type:"button",onClick:()=>e(`/kombin/yanit/${v.id}`),style:ne.respondBtn,children:"👗 Öneri Hazırla"}),T.jsx("button",{type:"button",style:ne.btnDeleteReq,onClick:async()=>{if(confirm("Bu talebi silmek istediğine emin misin?"))try{await xu(Ye(de,"outfitRequests",v.id))}catch(D){console.error(D),alert("Silinemedi.")}},children:"🗑️ Talebi Sil"})]})]},v.id)}),T.jsx("h3",{style:{fontSize:18,margin:"20px 0 10px",color:"#e2e2e2"},children:"🎨 Önerdiğim Kombinler"}),x.length===0?T.jsx("div",{style:ne.card,children:T.jsx("p",{style:ne.muted,children:"Henüz öneri yapmadın."})}):x.map(({s:v,r:_})=>{const S=_?g(_.fromUid):"...",D=v.liked==="yes"?"👍 Beğendi":v.liked==="no"?"👎 Beğenmedi":"⏳ Bekleniyor",L=v.liked==="yes"?"#22c55e":v.liked==="no"?"#ef4444":"#f59e0b",U=v.feedbackAt?new Date(v.feedbackAt).toLocaleString("tr-TR"):null,w=new Date(v.createdAt).toLocaleString("tr-TR");return T.jsxs("div",{style:ne.card,children:[T.jsxs("div",{style:ne.cardHeader,children:[T.jsxs("p",{style:ne.meta,children:[T.jsx("strong",{children:S})," için öneri"]}),T.jsx("span",{style:{...ne.badge,backgroundColor:L},children:D})]}),T.jsxs("p",{style:ne.time,children:["📅 ",w]}),T.jsx("div",{style:ne.prevRow,children:(v.clothingItemIds??[]).map(m=>{const I=u[m];return I?T.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2,maxWidth:80},children:[T.jsx("img",{src:Pi(I),alt:"",style:ne.thumb}),I.description?T.jsx("span",{style:{fontSize:10,color:"#aaa",textAlign:"center",lineHeight:1.2},children:I.description}):null]},m):T.jsx("div",{style:ne.thumbPh},m)})}),v.advisorNote?T.jsxs("p",{style:ne.comment,children:[T.jsx("strong",{children:"Notun:"})," ",v.advisorNote]}):null,v.comment?T.jsxs("p",{style:ne.comment,children:[T.jsx("strong",{children:"Kullanıcı yorumu:"})," ",v.comment]}):null,U?T.jsxs("p",{style:ne.time,children:["🕒 Geri bildirim: ",U]}):null,_?T.jsxs("p",{style:ne.smallMuted,children:["İstek notu: ",_.note?`"${_.note}"`:"yok"]}):T.jsx("p",{style:ne.smallMuted,children:"İstek yükleniyor…"}),T.jsxs("div",{style:{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"},children:[T.jsx("button",{type:"button",style:ne.editBtn,onClick:()=>e(`/kombin/duzenle/${v.id}`),children:"✏️ Düzenle"}),T.jsx("button",{type:"button",style:ne.btnDeleteSugg,onClick:async()=>{if(confirm("Bu kombin önerisini silmek istediğine emin misin?"))try{await xu(Ye(de,"outfitSuggestions",v.id))}catch(m){console.error(m),alert("Silinemedi.")}},children:"🗑️ Sil"})]})]},v.id)})]})]})},ne={page:{minHeight:"100vh",background:"#0f0f14"},wrap:{maxWidth:700,margin:"0 auto",padding:16},h2:{margin:"8px 0 4px",fontSize:26,color:"#fff"},sub:{color:"#888",fontSize:14,marginBottom:16},statsRow:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(130px, 1fr))",gap:10,marginBottom:20},statCard:{background:"#1a1a24",borderRadius:12,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",gap:2},statNum:{fontSize:28,fontWeight:700,color:"#fff"},statLabel:{fontSize:13,color:"#888"},card:{background:"#1a1a24",borderRadius:14,padding:16,marginBottom:14,border:"1px solid rgba(255,255,255,0.06)"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6},meta:{margin:0,fontSize:15,color:"#e2e2e2"},badge:{color:"#fff",fontSize:12,fontWeight:600,padding:"4px 10px",borderRadius:20},muted:{color:"#666",fontSize:14,margin:0},smallMuted:{color:"#555",fontSize:12,margin:"10px 0 0"},prevRow:{display:"flex",gap:6,flexWrap:"wrap",margin:"10px 0"},thumb:{width:80,height:80,objectFit:"cover",borderRadius:10},thumbPh:{width:80,height:80,background:"#2a2a3a",borderRadius:10},comment:{margin:"8px 0 0",fontSize:14,color:"#ccc"},time:{margin:"4px 0 0",fontSize:12,color:"#666"},respondBtn:{marginTop:10,padding:"10px 18px",background:"linear-gradient(135deg, #6366f1, #8b5cf6)",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer",fontSize:14},btnDeleteReq:{padding:"10px 18px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:10,cursor:"pointer",fontSize:14,color:"#f87171"},editBtn:{padding:"8px 14px",background:"linear-gradient(135deg, #6366f1, #8b5cf6)",border:"none",borderRadius:8,cursor:"pointer",fontSize:13,color:"#fff",fontWeight:600,flex:1},btnDeleteSugg:{padding:"8px 14px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:8,cursor:"pointer",fontSize:13,color:"#f87171",flex:1}},RI=300,Ic=[{key:"pantolon",label:"Pantolon",emoji:"👖"},{key:"tisort",label:"Tişört",emoji:"👕"},{key:"kazak",label:"Kazak",emoji:"🧶"},{key:"ceket",label:"Ceket",emoji:"🧥"},{key:"gomlek",label:"Gömlek",emoji:"👔"},{key:"mont",label:"Mont",emoji:"🥼"},{key:"sort",label:"Şort",emoji:"🩳"},{key:"ayakkabi",label:"Ayakkabı",emoji:"👟"},{key:"aksesuar",label:"Aksesuar",emoji:"⌚"}],CO=5*60*1e3;async function PO(t){const e=`bk_count_${t}`;try{const s=localStorage.getItem(e);if(s){const{count:o,ts:l}=JSON.parse(s);if(Date.now()-l<CO)return o}}catch{}const n=Zn(ht(de,"clothes"),kn("ownerId","==",t)),i=(await zN(n)).data().count;try{localStorage.setItem(e,JSON.stringify({count:i,ts:Date.now()}))}catch{}return i}function xO(t,e){const n=`bk_count_${t}`;try{const r=localStorage.getItem(n);if(r){const{count:i,ts:s}=JSON.parse(r);localStorage.setItem(n,JSON.stringify({count:i+e,ts:s}))}}catch{}}async function bO(t,e,n){const r=Array.from(t??[]),i={added:0,skippedOversized:0,truncatedByQuota:0,failed:0};if(!r.length)return i;const s=await PO(n),o=RI-s;if(o<=0)return i.truncatedByQuota=r.length,i;const l=r.slice(0,o);i.truncatedByQuota=r.length-l.length;for(let u=0;u<l.length;u++){const c=l[u];try{const d=await AO(c,800,.75);if(d.length>15e5){i.skippedOversized++;continue}await Gp(ht(de,"clothes"),{category:e,ownerId:n,imageBase64:d,createdAt:Date.now()+u}),i.added++}catch(d){console.error("Tek foto yükleme hatası:",d),i.failed++}}return i.added>0&&xO(n,i.added),i}function NO(t){const e=[];return t.truncatedByQuota>0&&e.push(`${t.truncatedByQuota} fotoğraf toplam ${RI} parça sınırı yüzünden yüklenmedi.`),t.skippedOversized>0&&e.push(`${t.skippedOversized} fotoğraf sıkıştırıldıktan sonra bile çok büyüktü.`),t.failed>0&&e.push(`${t.failed} fotoğrafta yükleme hatası oluştu.`),e.length?e.join(" "):null}const DO=()=>{const{user:t}=cn(),{categoryKey:e}=Zf(),n=Ic.find($=>$.key===e),[r,i]=V.useState([]),[s,o]=V.useState(!1),l=V.useRef(null),[u,c]=V.useState(null),[d,p]=V.useState(""),[g,A]=V.useState(null),[P,x]=V.useState(null),[b,v]=V.useState([]),_=V.useRef(null),S=t&&e?`bk_clothes_${t.uid}_${e}`:null,D=t&&e?`bk_order_${t.uid}_${e}`:null;V.useEffect(()=>{if(D)try{const $=localStorage.getItem(D);$&&v(JSON.parse($))}catch{}},[D]),V.useEffect(()=>{if(!e||!t)return;if(S)try{const ie=localStorage.getItem(S);ie&&i(JSON.parse(ie))}catch{}const $=Zn(ht(de,"clothes"),kn("category","==",e)),Q=Wn($,ie=>{const K=ie.docs.map(Z=>({id:Z.id,...Z.data()})).filter(Z=>Z.ownerId===t.uid);if(S)try{localStorage.setItem(S,JSON.stringify(K))}catch{}i(K)});return()=>Q()},[e,t]);const L=V.useMemo(()=>{if(b.length===0)return[...r].sort((Q,ie)=>(ie.createdAt??0)-(Q.createdAt??0));const $=new Map(b.map((Q,ie)=>[Q,ie]));return[...r].sort((Q,ie)=>{const z=$.has(Q.id)?$.get(Q.id):1/0,K=$.has(ie.id)?$.get(ie.id):1/0;return z!==K?z-K:(ie.createdAt??0)-(Q.createdAt??0)})},[r,b]),U=async $=>{const Q=$.target.files;if(!(!(Q!=null&&Q.length)||!e||!t)){o(!0);try{const ie=await bO(Q,e,t.uid),z=NO(ie);z&&alert(z)}catch(ie){console.error(ie),alert("Yükleme sırasında hata oluştu!")}finally{o(!1),l.current&&(l.current.value="")}}},w=async $=>{if(confirm("Bu kıyafeti silmek istediğine emin misin?"))try{await xu(Ye(de,"clothes",$.id))}catch(Q){console.error(Q)}},m=$=>{c($.id),p($.label??"")},I=async $=>{try{await Va(Ye(de,"clothes",$.id),{label:d.trim()})}catch(Q){console.error(Q)}c(null)},k=()=>{const $=new Date,Q=`${$.getDate().toString().padStart(2,"0")}.${($.getMonth()+1).toString().padStart(2,"0")}.${$.getFullYear()}`;p(ie=>ie?`${ie} ${Q}`:Q)},C=$=>{_.current=$},R=($,Q)=>{$.preventDefault(),x(Q)},E=$=>{if(!_.current||_.current===$){_.current=null,x(null);return}const Q=L.map(K=>K.id),ie=Q.indexOf(_.current),z=Q.indexOf($);if(!(ie===-1||z===-1)){if(Q.splice(ie,1),Q.splice(z,0,_.current),v(Q),D)try{localStorage.setItem(D,JSON.stringify(Q))}catch{}_.current=null,x(null)}},X=()=>{_.current=null,x(null)};return n?T.jsxs("div",{style:Ve.page,children:[T.jsx(sn,{}),T.jsxs("div",{style:Ve.container,children:[T.jsxs("div",{style:Ve.header,children:[T.jsx("span",{style:{fontSize:40},children:n.emoji}),T.jsxs("div",{children:[T.jsx("h2",{style:Ve.title,children:n.label}),T.jsxs("p",{style:Ve.count,children:[r.length," parça · sürükleyerek sırala"]})]})]}),T.jsxs("label",{style:Ve.uploadBtn,children:[s?"⏳ Yükleniyor...":"+ Kıyafet Ekle",T.jsx("input",{ref:l,type:"file",accept:"image/*",multiple:!0,onChange:U,style:{display:"none"},disabled:s})]}),r.length===0?T.jsxs("div",{style:Ve.emptyState,children:[T.jsx("span",{style:{fontSize:48},children:"📂"}),T.jsx("p",{style:{color:"#888",fontSize:16,margin:0,fontWeight:600},children:"Henüz kıyafet yok"}),T.jsx("p",{style:{color:"#666",fontSize:13,margin:0},children:"Yukarıdan ekle"})]}):T.jsx("div",{style:Ve.grid,children:L.map($=>T.jsxs("div",{style:{...Ve.card,...P===$.id?Ve.cardDragOver:{}},draggable:!0,onDragStart:()=>C($.id),onDragOver:Q=>R(Q,$.id),onDrop:()=>E($.id),onDragEnd:X,children:[T.jsx("img",{src:Pi($),alt:"",style:Ve.image,loading:"lazy",decoding:"async",onClick:()=>A($)}),T.jsx("div",{style:Ve.cardOverlay,children:u===$.id?T.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4,width:"100%"},children:[T.jsxs("div",{style:{display:"flex",gap:4,alignItems:"center",minWidth:0,width:"100%"},children:[T.jsx("input",{type:"text",value:d,onChange:Q=>p(Q.target.value),placeholder:"ör. Baggy jean",autoFocus:!0,onKeyDown:Q=>Q.key==="Enter"&&I($),style:{flex:1,minWidth:0,background:"rgba(255,255,255,0.15)",border:"none",borderRadius:6,color:"#fff",padding:"5px 8px",fontSize:12,outline:"none",boxSizing:"border-box"}}),T.jsx("button",{type:"button",onClick:()=>I($),style:{flexShrink:0,background:"#22c55e",border:"none",color:"#fff",borderRadius:6,padding:"4px 8px",cursor:"pointer",fontSize:12,minWidth:28},children:"✓"}),T.jsx("button",{type:"button",onClick:()=>c(null),style:{flexShrink:0,background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",borderRadius:6,padding:"4px 8px",cursor:"pointer",fontSize:12,minWidth:28},children:"✕"})]}),T.jsx("button",{type:"button",onClick:k,style:Ve.dateBtn,children:"📅 Bugünün tarihi"})]}):T.jsx("button",{type:"button",onClick:()=>m($),style:Ve.labelBtn,children:$.label?`✏️ ${$.label}`:"✏️ Açıklama ekle"})}),$.ownerId===(t==null?void 0:t.uid)&&T.jsx("button",{type:"button",onClick:()=>w($),style:Ve.deleteBtn,children:"🗑️"})]},$.id))})]}),g&&T.jsx("div",{style:Ve.lightbox,onClick:()=>A(null),children:T.jsxs("div",{style:Ve.lightboxInner,onClick:$=>$.stopPropagation(),children:[T.jsx("button",{style:Ve.lightboxClose,onClick:()=>A(null),children:"✕"}),T.jsx("img",{src:Pi(g),alt:"",style:Ve.lightboxImg}),(g.label||g.description)&&T.jsxs("div",{style:Ve.lightboxDesc,children:[g.label&&T.jsx("p",{style:{margin:0,fontWeight:600,color:"#fff",fontSize:16},children:g.label}),g.description&&T.jsx("p",{style:{margin:"6px 0 0",color:"#aaa",fontSize:14,lineHeight:1.5},children:g.description})]})]})})]}):T.jsxs("div",{style:Ve.page,children:[T.jsx(sn,{}),T.jsx("p",{style:{textAlign:"center",marginTop:40,color:"#666"},children:"Kategori bulunamadı"})]})},Ve={page:{minHeight:"100vh",background:"#0f0f14"},container:{padding:"20px 16px",maxWidth:600,margin:"0 auto",boxSizing:"border-box"},header:{display:"flex",alignItems:"center",gap:14,marginBottom:20},title:{margin:0,fontSize:22,color:"#fff",fontWeight:700},count:{margin:0,fontSize:12,color:"#666"},uploadBtn:{display:"block",width:"100%",padding:14,background:"linear-gradient(135deg, #6366f1, #8b5cf6)",color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:600,textAlign:"center",cursor:"pointer",marginBottom:20,boxSizing:"border-box"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"60px 0"},grid:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:12},card:{position:"relative",borderRadius:14,overflow:"hidden",background:"#1a1a24",aspectRatio:"1",cursor:"grab"},cardDragOver:{outline:"2px solid #818cf8",outlineOffset:2},image:{width:"100%",height:"100%",objectFit:"cover",background:"#2a2a35",cursor:"pointer"},cardOverlay:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.8))",padding:"28px 8px 8px"},labelBtn:{background:"none",border:"none",color:"rgba(255,255,255,0.7)",fontSize:12,cursor:"pointer",padding:"2px 0",textAlign:"left",width:"100%"},dateBtn:{alignSelf:"flex-start",background:"rgba(99,102,241,0.75)",border:"none",color:"#fff",borderRadius:6,padding:"3px 8px",cursor:"pointer",fontSize:11},deleteBtn:{position:"absolute",top:8,right:8,width:32,height:32,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.55)",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},lightbox:{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:1e3,display:"flex",alignItems:"center",justifyContent:"center",padding:16},lightboxInner:{position:"relative",maxWidth:500,width:"100%",background:"#1a1a24",borderRadius:16,overflow:"hidden"},lightboxClose:{position:"absolute",top:10,right:10,background:"rgba(0,0,0,0.6)",border:"none",color:"#fff",width:34,height:34,borderRadius:"50%",fontSize:16,cursor:"pointer",zIndex:1,display:"flex",alignItems:"center",justifyContent:"center"},lightboxImg:{width:"100%",maxHeight:"70vh",objectFit:"contain",display:"block"},lightboxDesc:{padding:"12px 16px 16px"}},OO=()=>{const{suggestionId:t}=Zf(),{user:e,isAdmin:n}=cn(),r=Hr(),[i,s]=V.useState(null),[o,l]=V.useState(null),[u,c]=V.useState([]),[d,p]=V.useState(new Set),[g,A]=V.useState(""),[P,x]=V.useState(!1),[b,v]=V.useState("all"),[_,S]=V.useState("");V.useEffect(()=>{!t||!e||(async()=>{const w=await Ai(Ye(de,"outfitSuggestions",t));if(!w.exists()){S("Öneri bulunamadı.");return}const m={id:w.id,...w.data()};if(!n&&m.advisorUid!==e.uid){S("Bu öneriyi düzenleme yetkin yok.");return}s(m),p(new Set(m.clothingItemIds)),A(m.advisorNote??"");const I=await Ai(Ye(de,"outfitRequests",m.requestId));I.exists()&&l({id:I.id,...I.data()})})()},[t,e]),V.useEffect(()=>{o!=null&&o.wardrobeOwnerUid&&(async()=>{const I=(await Kp(ht(de,"clothes"))).docs.map(k=>({id:k.id,...k.data()})).filter(k=>k.ownerId===o.wardrobeOwnerUid);I.sort((k,C)=>(C.createdAt??0)-(k.createdAt??0)),c(I)})()},[o==null?void 0:o.wardrobeOwnerUid]);const D=V.useMemo(()=>b==="all"?u:u.filter(w=>w.category===b),[u,b]),L=w=>{p(m=>{const I=new Set(m);return I.has(w)?I.delete(w):I.add(w),I})},U=async()=>{if(!i||d.size===0){alert("En az bir parça seç.");return}x(!0);try{await Va(Ye(de,"outfitSuggestions",i.id),{clothingItemIds:Array.from(d),advisorNote:g.trim(),liked:null,comment:"",feedbackAt:null,editedAt:Date.now()}),alert("✅ Öneri güncellendi! Kullanıcı tekrar değerlendirecek."),r("/home",{replace:!0})}catch(w){console.error(w),alert("Kaydedilemedi.")}finally{x(!1)}};return _?T.jsxs("div",{style:_e.page,children:[T.jsx(sn,{}),T.jsx("p",{style:_e.center,children:_}),T.jsx("button",{type:"button",style:_e.secondary,onClick:()=>r("/home"),children:"Geri dön"})]}):i?T.jsxs("div",{style:_e.page,children:[T.jsx(sn,{}),T.jsxs("div",{style:_e.wrap,children:[T.jsx("h2",{style:_e.h2,children:"✏️ Öneriyi Düzenle"}),T.jsx("p",{style:_e.sub,children:"Kullanıcı bu kombini beğenmedi. Parçaları değiştirip tekrar gönderebilirsin."}),i.comment&&T.jsx("div",{style:_e.feedbackBox,children:T.jsxs("p",{style:{margin:0,fontSize:14,color:"#f87171"},children:[T.jsx("strong",{children:"👎 Kullanıcı yorumu:"})," ",i.comment]})}),T.jsxs("div",{style:_e.tabs,children:[T.jsx("button",{type:"button",style:{..._e.tab,...b==="all"?_e.tabOn:{}},onClick:()=>v("all"),children:"Tümü"}),Ic.map(w=>T.jsx("button",{type:"button",style:{..._e.tab,...b===w.key?_e.tabOn:{}},onClick:()=>v(w.key),children:w.emoji},w.key))]}),T.jsx("div",{style:_e.grid,children:D.length===0?T.jsx("p",{style:_e.empty,children:"Bu kategoride parça yok."}):D.map(w=>T.jsxs("button",{type:"button",onClick:()=>L(w.id),style:{..._e.cell,...d.has(w.id)?_e.cellOn:{}},children:[T.jsx("img",{src:Pi(w),alt:"",style:_e.img,loading:"lazy"}),w.label?T.jsx("span",{style:_e.labelTag,children:w.label}):null,d.has(w.id)?T.jsx("span",{style:_e.check,children:"✓"}):null]},w.id))}),T.jsx("textarea",{placeholder:"Not (isteğe bağlı)…",value:g,onChange:w=>A(w.target.value),style:_e.textarea,rows:3}),T.jsxs("p",{style:_e.count,children:[d.size," parça seçildi"]}),T.jsx("button",{type:"button",style:_e.primary,onClick:U,disabled:P,children:P?"Güncelleniyor…":"✅ Öneriyi Güncelle"}),T.jsx("button",{type:"button",style:_e.secondary,onClick:()=>r("/home"),children:"Vazgeç"})]})]}):T.jsxs("div",{style:_e.page,children:[T.jsx(sn,{}),T.jsx("p",{style:_e.center,children:"Yükleniyor…"})]})},_e={page:{minHeight:"100vh",background:"#0f0f14"},wrap:{maxWidth:640,margin:"0 auto",padding:"16px"},h2:{margin:"8px 0 4px",fontSize:22,color:"#fff"},sub:{color:"#888",fontSize:14,marginBottom:12},center:{textAlign:"center",padding:24,color:"#888"},feedbackBox:{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:12,padding:14,marginBottom:14},tabs:{display:"flex",flexWrap:"wrap",gap:6,margin:"12px 0"},tab:{borderWidth:1,borderStyle:"solid",borderColor:"rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",borderRadius:20,padding:"6px 10px",cursor:"pointer",fontSize:13,color:"#ccc"},tabOn:{borderColor:"#818cf8",background:"rgba(99,102,241,0.2)",color:"#fff"},grid:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:8,marginBottom:12},cell:{position:"relative",aspectRatio:"1",borderRadius:10,overflow:"hidden",borderWidth:3,borderStyle:"solid",borderColor:"transparent",padding:0,cursor:"pointer",background:"#1a1a24"},cellOn:{borderColor:"#818cf8"},img:{width:"100%",height:"100%",objectFit:"cover"},labelTag:{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,0.65)",color:"#fff",fontSize:10,padding:"3px 6px",textAlign:"center",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},check:{position:"absolute",top:4,right:4,background:"#6366f1",color:"#fff",width:24,height:24,borderRadius:"50%",fontSize:14,lineHeight:"24px",textAlign:"center"},textarea:{width:"100%",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#fff",padding:10,fontSize:14,boxSizing:"border-box"},count:{fontSize:13,color:"#888"},primary:{width:"100%",marginTop:8,padding:14,background:"linear-gradient(135deg, #6366f1, #8b5cf6)",color:"#fff",border:"none",borderRadius:12,fontWeight:600,cursor:"pointer"},secondary:{width:"100%",marginTop:8,padding:10,background:"transparent",border:"none",color:"#888",cursor:"pointer"},empty:{gridColumn:"1 / -1",textAlign:"center",color:"#666"}},VO={test:"test@dolabim.app",busra:"busra@dolap.com",altnbusra32:"busra@dolap.com",altinbusra32:"busra@dolap.com",altunbusra32:"altunbusra32@gmail.com"};function LO(t){const e=t.trim().toLowerCase();return e.includes("@")?e:VO[e]??null}function MO(t){const e=t.trim().toLowerCase();return e==="test"?"test":e==="altnbusra32"||e==="altinbusra32"||e==="altunbusra32"||e==="busra"?"Büşra":t.trim()||"Kullanıcı"}const FO=()=>{const{user:t,loading:e,isAdmin:n}=cn(),[r,i]=V.useState(""),[s,o]=V.useState(""),[l,u]=V.useState(""),[c,d]=V.useState(!1),p=Hr();if(e)return T.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0f0f14",color:"#888"},children:"Yükleniyor…"});if(t)return T.jsx(na,{to:n?"/home":"/wardrobe",replace:!0});const g=async A=>{var x,b;A.preventDefault(),u("");const P=LO(r);if(!P){u("Bilinmeyen kullanıcı adı. test, busra veya altnbusra32 dene; ya tam e-posta yaz.");return}if(!s){u("Şifre gerekli.");return}d(!0);try{const _=(await nP(Nu,P,s)).user,S=r.trim().toLowerCase(),L=["altunbusra32@gmail.com","busra@dolap.com"].includes(_.email??"");await WN(Ye(de,"profiles",_.uid),{username:S.includes("@")?(x=_.email)==null?void 0:x.split("@")[0]:S,displayName:MO(S.includes("@")?((b=_.email)==null?void 0:b.split("@")[0])??"":S),email:_.email,isAdmin:L,updatedAt:Date.now()},{merge:!0}),p(L?"/home":"/wardrobe",{replace:!0})}catch(v){const _=v&&typeof v=="object"&&"code"in v?String(v.code):"";u(_==="auth/invalid-credential"||_==="auth/wrong-password"?"Şifre yanlış veya kullanıcı yok.":_==="auth/user-not-found"?"Bu e-posta Firebase’de kayıtlı değil. Console → Authentication → kullanıcı ekle.":"Giriş başarısız. Firebase Auth ve e-posta adreslerini kontrol et.")}finally{d(!1)}};return T.jsx("div",{style:ni.container,children:T.jsxs("form",{onSubmit:g,style:ni.form,children:[T.jsx("h2",{style:ni.title,children:"Giriş Yap"}),T.jsx("input",{type:"text",placeholder:"Kullanıcı adı veya e-posta",value:r,onChange:A=>i(A.target.value),style:ni.input,autoComplete:"username",required:!0}),T.jsx("input",{type:"password",placeholder:"Şifre",value:s,onChange:A=>o(A.target.value),style:ni.input,autoComplete:"current-password",required:!0}),l?T.jsx("p",{style:ni.err,children:l}):null,T.jsx("button",{type:"submit",style:ni.button,disabled:c,children:c?"Giriş…":"Giriş"})]})})},ni={container:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",padding:16,background:"#0f0f14"},form:{display:"flex",flexDirection:"column",gap:"12px",padding:"32px",backgroundColor:"#1a1a24",borderRadius:"16px",border:"1px solid rgba(255,255,255,0.06)",width:"100%",maxWidth:400},title:{textAlign:"center",marginBottom:0,color:"#fff"},input:{padding:"12px",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.1)",fontSize:"14px",outline:"none",background:"rgba(255,255,255,0.05)",color:"#fff"},button:{padding:"12px",borderRadius:"10px",border:"none",background:"linear-gradient(135deg, #6366f1, #8b5cf6)",color:"#fff",fontSize:"16px",cursor:"pointer",fontWeight:600},err:{color:"#f87171",fontSize:13,margin:0}};function jO(t){return t===0?"Açık":t<=3?"Parçalı bulutlu":t<=48?"Sisli":t<=57?"Çisenti":t<=65?"Yağmurlu":t<=67?"Dondurucu yağmur":t<=77?"Karlı":t<=82?"Sağanak":t<=86?"Kar yağışı":t>=95?"Gök gürültülü fırtına":"Bilinmiyor"}function UO(t){return t===0?"☀️":t<=3?"⛅":t<=48?"🌫️":t<=57?"🌦️":t<=65?"🌧️":t<=67?"🧊":t<=77?"❄️":t<=82?"🌧️":t<=86?"🌨️":t>=95?"⛈️":"🌡️"}const zO=()=>{const{user:t,isAdmin:e}=cn(),n=Hr(),[r,i]=V.useState([]),[s,o]=V.useState([]),[l,u]=V.useState([]),[c,d]=V.useState([]),[p,g]=V.useState(""),[A,P]=V.useState(!1),[x,b]=V.useState(null),[v,_]=V.useState(!0);V.useEffect(()=>{t&&(async()=>{const R=await Kp(ht(de,"profiles"));i(R.docs.map(E=>({id:E.id,...E.data()})))})()},[t]),V.useEffect(()=>{if(!t)return;const R=Zn(ht(de,"outfitRequests"),kn("fromUid","==",t.uid)),E=Zn(ht(de,"outfitRequests"),kn("toUid","==",t.uid)),X=Wn(R,Q=>o(Q.docs.map(ie=>({id:ie.id,...ie.data()})))),$=Wn(E,Q=>u(Q.docs.map(ie=>({id:ie.id,...ie.data()}))));return()=>{X(),$()}},[t]);const S=V.useMemo(()=>{const R=new Map;return s.forEach(E=>R.set(E.id,E)),l.forEach(E=>R.set(E.id,E)),Array.from(R.values()).sort((E,X)=>(X.createdAt??0)-(E.createdAt??0))},[s,l]);V.useEffect(()=>{if(!t)return;const R=Wn(ht(de,"outfitSuggestions"),E=>{d(E.docs.map(X=>({id:X.id,...X.data()})))});return()=>R()},[t]);const D=V.useMemo(()=>{const R=new Set(S.map(E=>E.id));return c.filter(E=>R.has(E.requestId)).sort((E,X)=>(X.feedbackAt??X.createdAt??0)-(E.feedbackAt??E.createdAt??0))},[c,S]);V.useEffect(()=>{if(!navigator.geolocation){_(!1);return}navigator.geolocation.getCurrentPosition(async R=>{var E,X,$,Q,ie;try{const{latitude:z,longitude:K}=R.coords,me=await(await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${z}&longitude=${K}&current=temperature_2m,weather_code&timezone=auto`)).json(),ke=((E=me.current)==null?void 0:E.weather_code)??0,xn=((X=me.current)==null?void 0:X.temperature_2m)??0,St=jO(ke),bn=UO(ke);let gt="";try{const Yr=await(await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${z}&lon=${K}&format=json&accept-language=tr`)).json();gt=(($=Yr.address)==null?void 0:$.city)||((Q=Yr.address)==null?void 0:Q.town)||((ie=Yr.address)==null?void 0:ie.province)||""}catch{gt=""}b({temp:Math.round(xn),description:St,icon:bn,city:gt})}catch(z){console.error("Weather fetch error:",z)}_(!1)},()=>_(!1),{timeout:1e4})},[]);const L=R=>{var E,X;return((E=r.find($=>$.id===R))==null?void 0:E.displayName)??((X=r.find($=>$.id===R))==null?void 0:X.username)??R.slice(0,6)},U=V.useMemo(()=>S.filter(R=>R.fromUid===(t==null?void 0:t.uid)),[S,t]),w=V.useMemo(()=>l.filter(R=>R.status==="pending").sort((R,E)=>(E.createdAt??0)-(R.createdAt??0)),[l]),m=["altunbusra32@gmail.com","busra@dolap.com"],I=V.useMemo(()=>r.find(R=>R.isAdmin===!0)??r.find(R=>m.includes(R.email??"")),[r]),k=async()=>{if(!t)return;const R=I==null?void 0:I.id;if(!R){alert("Admin kullanıcı bulunamadı. Profiller yükleniyor olabilir, tekrar deneyin.");return}P(!0);try{await Gp(ht(de,"outfitRequests"),{fromUid:t.uid,toUid:R,wardrobeOwnerUid:t.uid,note:p.trim(),status:"pending",createdAt:Date.now()}),g(""),alert("İstek gönderildi.")}catch(E){console.error(E),alert("Gönderilemedi.")}finally{P(!1)}},C=async(R,E,X)=>{try{const $={comment:X.trim(),feedbackAt:Date.now()};E!==void 0&&($.liked=E),await Va(Ye(de,"outfitSuggestions",R.id),$),alert("✅ Kaydedildi!")}catch($){console.error($),alert("Kaydedilemedi.")}};return T.jsxs("div",{style:he.page,children:[T.jsx(sn,{}),T.jsxs("div",{style:he.wrap,children:[T.jsx("h2",{style:he.h2,children:"Kombin istekleri"}),T.jsx("p",{style:he.sub,children:"Dolabından parça seçtirmek için birine istek at; gelen isteklerde onun dolabından kombin öner."}),x&&T.jsxs("section",{style:{...he.card,display:"flex",alignItems:"center",gap:14},children:[T.jsx("span",{style:{fontSize:36},children:x.icon}),T.jsxs("div",{children:[T.jsxs("p",{style:{margin:0,fontSize:18,fontWeight:600,color:"#fff"},children:[x.temp,"°C · ",x.description]}),x.city&&T.jsx("p",{style:{margin:0,fontSize:13,color:"#888"},children:x.city}),T.jsx("p",{style:{margin:"4px 0 0",fontSize:12,color:"#666"},children:"Kombin seçerken havayı göz önünde bulundur 🌡️"})]})]}),v&&T.jsx("p",{style:{color:"#666",fontSize:13,marginBottom:8},children:"Hava durumu yükleniyor…"}),!e&&T.jsxs("section",{style:he.card,children:[T.jsx("h3",{style:he.h3,children:"✨ Kombin İsteği Gönder"}),T.jsx("p",{style:{fontSize:13,color:"#888",margin:"0 0 10px"},children:"Dolabından kombin önerilmesini iste — istek stilistimize iletilecek."}),T.jsx("textarea",{placeholder:"Kısa not (ör. yarın akşam davet var)…",value:p,onChange:R=>g(R.target.value),style:he.textarea,rows:2}),T.jsx("button",{type:"button",style:he.btn,onClick:k,disabled:A,children:A?"Gönderiliyor…":`📩 İstek Gönder · ${new Date().toLocaleDateString("tr-TR")}`})]}),w.length>0&&T.jsxs("section",{style:he.card,children:[T.jsx("h3",{style:he.h3,children:"📬 Gelen İstekler"}),T.jsx("p",{style:{fontSize:13,color:"#888",margin:"0 0 10px"},children:"Aşağıdaki kişiler senden kombin önerisi bekliyor."}),w.map(R=>T.jsxs("div",{style:he.block,children:[T.jsxs("p",{style:he.reqLine,children:[T.jsx("strong",{children:L(R.fromUid)})," kombin istiyor",R.note?` · "${R.note}"`:""]}),T.jsx("button",{type:"button",style:he.btn,onClick:()=>n(`/kombin/yanit/${R.id}`),children:"👗 Kombin Öner"})]},R.id))]}),T.jsxs("section",{style:he.card,children:[T.jsx("h3",{style:he.h3,children:"Gönderdiğim istekler & öneriler"}),U.length===0?T.jsx("p",{style:he.muted,children:"Henüz istek yok."}):U.map(R=>{const E=D.filter(X=>X.requestId===R.id);return T.jsxs("div",{style:he.block,children:[T.jsxs("p",{style:he.reqLine,children:["→ ",T.jsx("strong",{children:L(R.toUid)})," · ",R.status==="pending"?"bekliyor":"yanıtlandı",R.note?` · "${R.note}"`:""]}),E.length===0&&R.status==="pending"?T.jsx("p",{style:he.muted,children:"Öneri henüz yok."}):null,E.map(X=>T.jsx(BO,{s:X,isAdmin:e,itemIdsKey:[...X.clothingItemIds].sort().join("|"),profileName:L,onSave:C,onDelete:async()=>{if(confirm("Bu kombin önerisini silmek istediğine emin misin?"))try{await xu(Ye(de,"outfitSuggestions",X.id))}catch($){console.error($),alert("Silinemedi.")}}},X.id))]},R.id)})]})]})]})},BO=({s:t,isAdmin:e,itemIdsKey:n,profileName:r,onSave:i,onDelete:s})=>{const[o,l]=V.useState(t.comment??""),[u,c]=V.useState(t.liked??null),[d,p]=V.useState({});return V.useEffect(()=>{l(t.comment??""),c(t.liked??null)},[t.id,t.comment,t.liked]),V.useEffect(()=>{let g=!1;return(async()=>{const P=await Promise.all(t.clothingItemIds.map(async b=>{const v=await Ai(Ye(de,"clothes",b));return v.exists()?{id:v.id,...v.data()}:null}));if(g)return;const x={};P.forEach(b=>{b&&(x[b.id]=b)}),p(x)})(),()=>{g=!0}},[t.id,n]),T.jsxs("div",{style:he.sugg,children:[T.jsxs("p",{style:he.suggMeta,children:["Öneri: ",T.jsx("strong",{children:r(t.advisorUid)}),t.advisorNote?` · ${t.advisorNote}`:""]}),T.jsx("div",{style:he.prevRow,children:t.clothingItemIds.map(g=>{const A=d[g];return A?T.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:2,maxWidth:80},children:[T.jsx("img",{src:Pi(A),alt:"",style:he.thumb}),A.description||A.label?T.jsx("span",{style:{fontSize:10,color:"#aaa",textAlign:"center",lineHeight:1.2},children:A.description||A.label}):null]},g):T.jsx("div",{style:he.thumbPlaceholder},g)})}),T.jsxs("div",{style:he.feedRow,children:[T.jsx("button",{type:"button",style:{...he.pill,...u==="yes"?he.pillOn:{}},onClick:()=>{c("yes"),i(t,"yes",o)},children:"Beğendim"}),T.jsx("button",{type:"button",style:{...he.pill,...u==="no"?he.pillOn:{}},onClick:()=>{c("no"),i(t,"no",o)},children:"🔄 Değişiklik İste"})]}),T.jsx("textarea",{placeholder:"Yorum…",value:o,onChange:g=>l(g.target.value),style:he.textareaSmall,rows:2}),T.jsxs("div",{style:{display:"flex",gap:10,marginTop:10,flexWrap:"wrap"},children:[T.jsx("button",{type:"button",style:he.btnGhost,onClick:()=>i(t,void 0,o),children:"Yorumu kaydet"}),e&&T.jsx("button",{type:"button",style:he.btnDeleteSugg,onClick:s,children:"🗑️ Öneriyi Sil"})]})]})},he={page:{minHeight:"100vh",background:"#0f0f14"},wrap:{maxWidth:640,margin:"0 auto",padding:16},h2:{margin:"8px 0 4px",fontSize:24,color:"#fff"},sub:{color:"#888",fontSize:14,marginBottom:16},card:{background:"#1a1a24",borderRadius:14,padding:16,marginBottom:14,border:"1px solid rgba(255,255,255,0.06)"},h3:{margin:"0 0 12px",fontSize:16,color:"#e2e2e2"},textarea:{width:"100%",padding:10,borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#fff",marginBottom:8,fontSize:14,boxSizing:"border-box"},textareaSmall:{width:"100%",padding:8,borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#fff",marginTop:8,fontSize:13,boxSizing:"border-box"},btn:{padding:"12px 16px",background:"linear-gradient(135deg, #6366f1, #8b5cf6)",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer"},btnGhost:{padding:"8px 14px",background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,cursor:"pointer",fontSize:13,color:"#ccc"},muted:{color:"#666",fontSize:14},block:{marginBottom:16,paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,0.06)"},reqLine:{fontSize:14,marginBottom:8,color:"#ccc"},sugg:{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:12,marginTop:8},suggMeta:{fontSize:13,margin:"0 0 8px",color:"#aaa"},prevRow:{display:"flex",gap:6,flexWrap:"wrap"},thumb:{width:68,height:68,objectFit:"cover",borderRadius:8,flexShrink:0},thumbPlaceholder:{width:68,height:68,background:"#2a2a3a",borderRadius:8,flexShrink:0},feedRow:{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"},pill:{padding:"8px 14px",borderRadius:20,borderWidth:1,borderStyle:"solid",borderColor:"rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",cursor:"pointer",fontSize:13,color:"#ccc"},pillOn:{borderColor:"#818cf8",background:"rgba(99,102,241,0.2)",color:"#fff"},btnDeleteSugg:{padding:"8px 14px",background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:8,cursor:"pointer",fontSize:13,color:"#f87171"}},$O=()=>{const{requestId:t}=Zf(),{user:e,isAdmin:n}=cn(),r=Hr(),i=n?"/home":"/kombin",[s,o]=V.useState(null),[l,u]=V.useState(""),[c,d]=V.useState([]),[p,g]=V.useState(new Set),[A,P]=V.useState(""),[x,b]=V.useState(!1),[v,_]=V.useState("all"),[S,D]=V.useState(null);V.useEffect(()=>{!t||!e||(async()=>{const m=await Ai(Ye(de,"outfitRequests",t));if(!m.exists){u("İstek bulunamadı.");return}const I={id:m.id,...m.data()};if(!n&&I.toUid!==e.uid){u("Bu istek sana ait değil.");return}if(I.status!=="pending"){u("Bu istek zaten yanıtlanmış.");return}o(I)})()},[t,e]),V.useEffect(()=>{if(!(s!=null&&s.wardrobeOwnerUid))return;const m=s.wardrobeOwnerUid,I=`bk_clothes_all_${m}`;try{const k=localStorage.getItem(I);if(k){const C=JSON.parse(k);C.sort((R,E)=>(E.createdAt??0)-(R.createdAt??0)),d(C)}}catch{}(async()=>{const k=Zn(ht(de,"clothes"),kn("ownerId","==",m)),R=(await Kp(k)).docs.map(E=>({id:E.id,...E.data()}));R.sort((E,X)=>(X.createdAt??0)-(E.createdAt??0));try{localStorage.setItem(I,JSON.stringify(R))}catch{}d(R)})()},[s==null?void 0:s.wardrobeOwnerUid]);const L=V.useMemo(()=>v==="all"?c:c.filter(m=>m.category===v),[c,v]),U=m=>{g(I=>{const k=new Set(I);return k.has(m)?k.delete(m):k.add(m),k})},w=async()=>{if(!s||!e||p.size===0){alert("En az bir parça seç.");return}b(!0);try{await Gp(ht(de,"outfitSuggestions"),{requestId:s.id,requesterUid:s.fromUid,advisorUid:e.uid,clothingItemIds:Array.from(p),advisorNote:A.trim(),createdAt:Date.now(),liked:null,comment:"",feedbackAt:null}),await Va(Ye(de,"outfitRequests",s.id),{status:"answered"}),r(i,{replace:!0})}catch(m){console.error(m),alert("Kaydedilemedi.")}finally{b(!1)}};return l?T.jsxs("div",{style:ce.page,children:[T.jsx(sn,{}),T.jsx("p",{style:ce.center,children:l}),T.jsx("button",{type:"button",style:ce.back,onClick:()=>r(i),children:"Geri dön"})]}):s?T.jsxs("div",{style:ce.page,children:[T.jsx(sn,{}),T.jsxs("div",{style:ce.wrap,children:[T.jsx("h2",{style:ce.h2,children:"Kombin öner"}),T.jsx("p",{style:ce.sub,children:"İstek sahibinin dolabından parça seç. Seçtiklerin bir kombin önerisi olarak gidecek."}),s.note?T.jsxs("p",{style:ce.note,children:[T.jsx("strong",{children:"Not:"})," ",s.note]}):null,T.jsxs("div",{style:ce.tabs,children:[T.jsx("button",{type:"button",style:{...ce.tab,...v==="all"?ce.tabOn:{}},onClick:()=>_("all"),children:"Tümü"}),Ic.map(m=>T.jsx("button",{type:"button",style:{...ce.tab,...v===m.key?ce.tabOn:{}},onClick:()=>_(m.key),children:m.emoji},m.key))]}),T.jsx("div",{style:ce.grid,children:L.length===0?T.jsx("p",{style:ce.empty,children:"Bu dolapta bu kategoride parça yok."}):L.map(m=>T.jsxs("button",{type:"button",onClick:()=>D(m),style:{...ce.cell,...p.has(m.id)?ce.cellOn:{}},children:[T.jsx("img",{src:Pi(m),alt:"",style:ce.img}),(m.label||m.description)&&T.jsx("span",{style:ce.labelTag,children:m.label||m.description}),p.has(m.id)?T.jsx("span",{style:ce.check,children:"✓"}):null]},m.id))}),T.jsx("textarea",{placeholder:"Kısa not (isteğe bağlı)…",value:A,onChange:m=>P(m.target.value),style:ce.textarea,rows:3}),T.jsxs("p",{style:ce.count,children:[p.size," parça seçildi"]}),T.jsx("button",{type:"button",style:ce.primary,onClick:w,disabled:x,children:x?"Gönderiliyor…":"Öneriyi gönder"}),T.jsx("button",{type:"button",style:ce.secondary,onClick:()=>r(i),children:"Vazgeç"})]}),S&&T.jsx("div",{style:ce.lightbox,onClick:()=>D(null),children:T.jsxs("div",{style:ce.lightboxInner,onClick:m=>m.stopPropagation(),children:[T.jsx("button",{style:ce.lightboxClose,onClick:()=>D(null),children:"✕"}),T.jsx("img",{src:Pi(S),alt:"",style:ce.lightboxImg}),T.jsxs("div",{style:ce.lightboxBody,children:[S.label&&T.jsx("p",{style:{margin:0,fontWeight:700,color:"#fff",fontSize:16},children:S.label}),S.description&&T.jsx("p",{style:{margin:"6px 0 0",color:"#aaa",fontSize:14,lineHeight:1.6},children:S.description}),T.jsx("button",{type:"button",style:{...ce.lightboxToggle,...p.has(S.id)?ce.lightboxToggleOn:{}},onClick:()=>{U(S.id),D(null)},children:p.has(S.id)?"✓ Seçildi — Çıkar":"+ Kombine Ekle"})]})]})})]}):T.jsxs("div",{style:ce.page,children:[T.jsx(sn,{}),T.jsx("p",{style:ce.center,children:"Yükleniyor…"})]})},ce={page:{minHeight:"100vh",background:"#0f0f14"},wrap:{maxWidth:640,margin:"0 auto",padding:"16px"},h2:{margin:"8px 0 4px",fontSize:22,color:"#fff"},sub:{color:"#888",fontSize:14,marginBottom:12},note:{background:"#1a1a24",padding:12,borderRadius:10,fontSize:14,color:"#ccc",border:"1px solid rgba(255,255,255,0.06)"},tabs:{display:"flex",flexWrap:"wrap",gap:6,margin:"12px 0"},tab:{borderWidth:1,borderStyle:"solid",borderColor:"rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",borderRadius:20,padding:"6px 10px",cursor:"pointer",fontSize:13,color:"#ccc"},tabOn:{borderColor:"#818cf8",background:"rgba(99,102,241,0.2)",color:"#fff"},grid:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:8,marginBottom:12},cell:{position:"relative",aspectRatio:"1",borderRadius:10,overflow:"hidden",borderWidth:3,borderStyle:"solid",borderColor:"transparent",padding:0,cursor:"pointer",background:"#1a1a24"},cellOn:{borderColor:"#818cf8"},img:{width:"100%",height:"100%",objectFit:"cover"},labelTag:{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,0.65)",color:"#fff",fontSize:10,padding:"3px 6px",textAlign:"center",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},lightbox:{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:1e3,display:"flex",alignItems:"center",justifyContent:"center",padding:16},lightboxInner:{position:"relative",maxWidth:480,width:"100%",background:"#1a1a24",borderRadius:16,overflow:"hidden"},lightboxClose:{position:"absolute",top:10,right:10,background:"rgba(0,0,0,0.6)",border:"none",color:"#fff",width:34,height:34,borderRadius:"50%",fontSize:16,cursor:"pointer",zIndex:1,display:"flex",alignItems:"center",justifyContent:"center"},lightboxImg:{width:"100%",maxHeight:"60vh",objectFit:"contain",display:"block"},lightboxBody:{padding:"14px 16px 18px"},lightboxToggle:{marginTop:14,width:"100%",padding:"12px 0",borderRadius:10,border:"2px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.06)",color:"#ccc",fontSize:15,fontWeight:600,cursor:"pointer"},lightboxToggleOn:{borderColor:"#818cf8",background:"rgba(99,102,241,0.25)",color:"#fff"},check:{position:"absolute",top:4,right:4,background:"#6366f1",color:"#fff",width:24,height:24,borderRadius:"50%",fontSize:14,lineHeight:"24px",textAlign:"center"},textarea:{width:"100%",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#fff",padding:10,fontSize:14,boxSizing:"border-box"},count:{fontSize:13,color:"#888"},primary:{width:"100%",marginTop:8,padding:14,background:"linear-gradient(135deg, #6366f1, #8b5cf6)",color:"#fff",border:"none",borderRadius:12,fontWeight:600,cursor:"pointer"},secondary:{width:"100%",marginTop:8,padding:10,background:"transparent",border:"none",color:"#888",cursor:"pointer"},center:{textAlign:"center",padding:24,color:"#888"},back:{display:"block",margin:"16px auto",padding:"10px 20px"},empty:{gridColumn:"1 / -1",textAlign:"center",color:"#666"}},WO=()=>{const t=Hr();return T.jsxs("div",{style:Dn.page,children:[T.jsx(sn,{}),T.jsxs("div",{style:Dn.container,children:[T.jsx("h2",{style:Dn.title,children:"👗 Bakçay Dolap"}),T.jsx("p",{style:Dn.subtitle,children:"Kıyafetlerini görmek veya eklemek için kategori seç"}),T.jsx("div",{style:Dn.list,children:Ic.map(e=>T.jsxs("button",{onClick:()=>t(`/wardrobe/${e.key}`),style:Dn.item,children:[T.jsx("span",{style:Dn.emoji,children:e.emoji}),T.jsx("span",{style:Dn.label,children:e.label}),T.jsx("span",{style:Dn.arrow,children:"›"})]},e.key))})]})]})},Dn={page:{minHeight:"100vh",background:"#0f0f14"},container:{padding:"24px 16px",maxWidth:"600px",margin:"0 auto"},title:{fontSize:"24px",textAlign:"center",marginBottom:"4px",color:"#fff"},subtitle:{textAlign:"center",color:"#888",marginBottom:"20px",fontSize:"14px"},list:{display:"flex",flexDirection:"column",gap:"10px"},item:{display:"flex",alignItems:"center",gap:"14px",padding:"16px 20px",backgroundColor:"#1a1a24",borderRadius:"14px",border:"1px solid rgba(255,255,255,0.06)",cursor:"pointer",fontSize:"16px",textAlign:"left"},emoji:{fontSize:"28px"},label:{flex:1,fontWeight:600,color:"#e2e2e2"},arrow:{fontSize:"22px",color:"#555"}};function qO(){const{isAdmin:t}=cn();return SO(),T.jsxs(T1,{children:[T.jsx(On,{path:"/login",element:T.jsx(FO,{})}),T.jsx(On,{path:"/home",element:T.jsx(zi,{children:t?T.jsx(RO,{}):T.jsx(na,{to:"/wardrobe",replace:!0})})}),T.jsx(On,{path:"/wardrobe/:categoryKey",element:T.jsx(zi,{children:T.jsx(DO,{})})}),T.jsx(On,{path:"/wardrobe",element:T.jsx(zi,{children:T.jsx(WO,{})})}),T.jsx(On,{path:"/kombin",element:T.jsx(zi,{children:T.jsx(zO,{})})}),T.jsx(On,{path:"/kombin/yanit/:requestId",element:T.jsx(zi,{children:T.jsx($O,{})})}),T.jsx(On,{path:"/kombin/duzenle/:suggestionId",element:T.jsx(zi,{children:T.jsx(OO,{})})}),T.jsx(On,{path:"*",element:T.jsx(HO,{})})]})}function HO(){const{user:t,loading:e,isAdmin:n}=cn();return e?T.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0f0f14",color:"#888"},children:"Yükleniyor…"}):t?T.jsx(na,{to:n?"/home":"/wardrobe",replace:!0}):T.jsx(na,{to:"/login",replace:!0})}function KO(){return T.jsx(k1,{children:T.jsx(qO,{})})}Vh.createRoot(document.getElementById("root")).render(T.jsx(pv.StrictMode,{children:T.jsx(TO,{children:T.jsx(KO,{})})}));
