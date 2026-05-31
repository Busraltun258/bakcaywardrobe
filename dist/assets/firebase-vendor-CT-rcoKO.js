const s_=()=>{};var kl={};/**
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
 */const Fd=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},i_=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],c=r[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Ud={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,c=o?r[s+1]:0,u=s+2<r.length,h=u?r[s+2]:0,f=i>>2,g=(i&3)<<4|c>>4;let I=(c&15)<<2|h>>6,R=h&63;u||(R=64,o||(I=64)),n.push(t[f],t[g],t[I],t[R])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Fd(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):i_(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const g=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||h==null||g==null)throw new o_;const I=i<<2|c>>4;if(n.push(I),h!==64){const R=c<<4&240|h>>2;if(n.push(R),g!==64){const V=h<<6&192|g;n.push(V)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class o_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const a_=function(r){const e=Fd(r);return Ud.encodeByteArray(e,!0)},Bd=function(r){return a_(r).replace(/\./g,"")},qd=function(r){try{return Ud.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function jd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const c_=()=>jd().__FIREBASE_DEFAULTS__,u_=()=>{if(typeof process>"u"||typeof kl>"u")return;const r=kl.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},l_=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&qd(r[1]);return e&&JSON.parse(e)},ao=()=>{try{return s_()||c_()||u_()||l_()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},h_=r=>{var e,t;return(t=(e=ao())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},$d=()=>{var r;return(r=ao())==null?void 0:r.config},zd=r=>{var e;return(e=ao())==null?void 0:e[`_${r}`]};/**
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
 */class d_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
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
 */function _e(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function f_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_e())}function Kd(){var e;const r=(e=ao())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function p_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function g_(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function m_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function __(){const r=_e();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Gd(){return!Kd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Hd(){return!Kd()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function mc(){try{return typeof indexedDB=="object"}catch{return!1}}function Wd(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}function y_(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const I_="FirebaseError";class ut extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=I_,Object.setPrototypeOf(this,ut.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,kn.prototype.create)}}class kn{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?E_(i,n):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new ut(s,c,n)}}function E_(r,e){return r.replace(T_,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const T_=/\{\$([^}]+)}/g;function w_(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function En(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Dl(i)&&Dl(o)){if(!En(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Dl(r){return r!==null&&typeof r=="object"}/**
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
 */function Ds(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Yr(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Xr(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function v_(r,e){const t=new A_(r,e);return t.subscribe.bind(t)}class A_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");S_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=ha),s.error===void 0&&(s.error=ha),s.complete===void 0&&(s.complete=ha);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function S_(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function ha(){}/**
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
 */function he(r){return r&&r._delegate?r._delegate:r}/**
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
 */function Ns(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Qd(r){return(await fetch(r,{credentials:"include"})).ok}class Qe{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const on="[DEFAULT]";/**
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
 */class b_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new d_;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(P_(e))try{this.getOrInitializeService({instanceIdentifier:on})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=on){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=on){return this.instances.has(e)}getOptions(e=on){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:R_(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=on){return this.component?this.component.multipleInstances?e:on:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function R_(r){return r===on?void 0:r}function P_(r){return r.instantiationMode==="EAGER"}/**
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
 */class C_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new b_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));const V_={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},k_=H.INFO,D_={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},N_=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=D_[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class _c{constructor(e){this.name=e,this._logLevel=k_,this._logHandler=N_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?V_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const x_=(r,e)=>e.some(t=>r instanceof t);let Nl,xl;function O_(){return Nl||(Nl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function M_(){return xl||(xl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Jd=new WeakMap,Na=new WeakMap,Yd=new WeakMap,da=new WeakMap,yc=new WeakMap;function L_(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(pt(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Jd.set(t,r)}).catch(()=>{}),yc.set(e,r),e}function F_(r){if(Na.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});Na.set(r,e)}let xa={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Na.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Yd.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return pt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function U_(r){xa=r(xa)}function B_(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(fa(this),e,...t);return Yd.set(n,e.sort?e.sort():[e]),pt(n)}:M_().includes(r)?function(...e){return r.apply(fa(this),e),pt(Jd.get(this))}:function(...e){return pt(r.apply(fa(this),e))}}function q_(r){return typeof r=="function"?B_(r):(r instanceof IDBTransaction&&F_(r),x_(r,O_())?new Proxy(r,xa):r)}function pt(r){if(r instanceof IDBRequest)return L_(r);if(da.has(r))return da.get(r);const e=q_(r);return e!==r&&(da.set(r,e),yc.set(e,r)),e}const fa=r=>yc.get(r);function co(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),c=pt(o);return n&&o.addEventListener("upgradeneeded",u=>{n(pt(o.result),u.oldVersion,u.newVersion,pt(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}function pa(r,{blocked:e}={}){const t=indexedDB.deleteDatabase(r);return e&&t.addEventListener("blocked",n=>e(n.oldVersion,n)),pt(t).then(()=>{})}const j_=["get","getKey","getAll","getAllKeys","count"],$_=["put","add","delete","clear"],ga=new Map;function Ol(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(ga.get(e))return ga.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=$_.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||j_.includes(t)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return ga.set(e,i),i}U_(r=>({...r,get:(e,t,n)=>Ol(e,t)||r.get(e,t,n),has:(e,t)=>!!Ol(e,t)||r.has(e,t)}));/**
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
 */class z_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(K_(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function K_(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Oa="@firebase/app",Ml="0.14.11";/**
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
 */const gt=new _c("@firebase/app"),G_="@firebase/app-compat",H_="@firebase/analytics-compat",W_="@firebase/analytics",Q_="@firebase/app-check-compat",J_="@firebase/app-check",Y_="@firebase/auth",X_="@firebase/auth-compat",Z_="@firebase/database",ey="@firebase/data-connect",ty="@firebase/database-compat",ny="@firebase/functions",ry="@firebase/functions-compat",sy="@firebase/installations",iy="@firebase/installations-compat",oy="@firebase/messaging",ay="@firebase/messaging-compat",cy="@firebase/performance",uy="@firebase/performance-compat",ly="@firebase/remote-config",hy="@firebase/remote-config-compat",dy="@firebase/storage",fy="@firebase/storage-compat",py="@firebase/firestore",gy="@firebase/ai",my="@firebase/firestore-compat",_y="firebase",yy="12.12.0";/**
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
 */const Ma="[DEFAULT]",Iy={[Oa]:"fire-core",[G_]:"fire-core-compat",[W_]:"fire-analytics",[H_]:"fire-analytics-compat",[J_]:"fire-app-check",[Q_]:"fire-app-check-compat",[Y_]:"fire-auth",[X_]:"fire-auth-compat",[Z_]:"fire-rtdb",[ey]:"fire-data-connect",[ty]:"fire-rtdb-compat",[ny]:"fire-fn",[ry]:"fire-fn-compat",[sy]:"fire-iid",[iy]:"fire-iid-compat",[oy]:"fire-fcm",[ay]:"fire-fcm-compat",[cy]:"fire-perf",[uy]:"fire-perf-compat",[ly]:"fire-rc",[hy]:"fire-rc-compat",[dy]:"fire-gcs",[fy]:"fire-gcs-compat",[py]:"fire-fst",[my]:"fire-fst-compat",[gy]:"fire-vertex","fire-js":"fire-js",[_y]:"fire-js-all"};/**
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
 */const Ni=new Map,Ey=new Map,La=new Map;function Ll(r,e){try{r.container.addComponent(e)}catch(t){gt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function ot(r){const e=r.name;if(La.has(e))return gt.debug(`There were multiple attempts to register component ${e}.`),!1;La.set(e,r);for(const t of Ni.values())Ll(t,r);for(const t of Ey.values())Ll(t,r);return!0}function Er(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Ke(r){return r==null?!1:r.settings!==void 0}/**
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
 */const Ty={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ft=new kn("app","Firebase",Ty);/**
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
 */class wy{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ft.create("app-deleted",{appName:this._name})}}/**
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
 */const Tr=yy;function vy(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:Ma,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw Ft.create("bad-app-name",{appName:String(s)});if(t||(t=$d()),!t)throw Ft.create("no-options");const i=Ni.get(s);if(i){if(En(t,i.options)&&En(n,i.config))return i;throw Ft.create("duplicate-app",{appName:s})}const o=new C_(s);for(const u of La.values())o.addComponent(u);const c=new wy(t,n,o);return Ni.set(s,c),c}function Xd(r=Ma){const e=Ni.get(r);if(!e&&r===Ma&&$d())return vy();if(!e)throw Ft.create("no-app",{appName:r});return e}function $e(r,e,t){let n=Iy[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),gt.warn(o.join(" "));return}ot(new Qe(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
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
 */const Ay="firebase-heartbeat-database",Sy=1,ps="firebase-heartbeat-store";let ma=null;function Zd(){return ma||(ma=co(Ay,Sy,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ps)}catch(t){console.warn(t)}}}}).catch(r=>{throw Ft.create("idb-open",{originalErrorMessage:r.message})})),ma}async function by(r){try{const t=(await Zd()).transaction(ps),n=await t.objectStore(ps).get(ef(r));return await t.done,n}catch(e){if(e instanceof ut)gt.warn(e.message);else{const t=Ft.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});gt.warn(t.message)}}}async function Fl(r,e){try{const n=(await Zd()).transaction(ps,"readwrite");await n.objectStore(ps).put(e,ef(r)),await n.done}catch(t){if(t instanceof ut)gt.warn(t.message);else{const n=Ft.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});gt.warn(n.message)}}}function ef(r){return`${r.name}!${r.options.appId}`}/**
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
 */const Ry=1024,Py=30;class Cy{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ky(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ul();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Py){const o=Dy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){gt.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ul(),{heartbeatsToSend:n,unsentEntries:s}=Vy(this._heartbeatsCache.heartbeats),i=Bd(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return gt.warn(t),""}}}function Ul(){return new Date().toISOString().substring(0,10)}function Vy(r,e=Ry){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Bl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Bl(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class ky{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return mc()?Wd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await by(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Fl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Fl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Bl(r){return Bd(JSON.stringify({version:2,heartbeats:r})).length}function Dy(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
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
 */function Ny(r){ot(new Qe("platform-logger",e=>new z_(e),"PRIVATE")),ot(new Qe("heartbeat",e=>new Cy(e),"PRIVATE")),$e(Oa,Ml,r),$e(Oa,Ml,"esm2020"),$e("fire-js","")}Ny("");function tf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const xy=tf,nf=new kn("auth","Firebase",tf());/**
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
 */const xi=new _c("@firebase/auth");function Oy(r,...e){xi.logLevel<=H.WARN&&xi.warn(`Auth (${Tr}): ${r}`,...e)}function _i(r,...e){xi.logLevel<=H.ERROR&&xi.error(`Auth (${Tr}): ${r}`,...e)}/**
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
 */function Je(r,...e){throw Ic(r,...e)}function rt(r,...e){return Ic(r,...e)}function rf(r,e,t){const n={...xy(),[e]:t};return new kn("auth","Firebase",n).create(e,{appName:r.name})}function Ut(r){return rf(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ic(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return nf.create(r,...e)}function B(r,e,...t){if(!r)throw Ic(e,...t)}function ht(r){const e="INTERNAL ASSERTION FAILED: "+r;throw _i(e),new Error(e)}function mt(r,e){r||ht(e)}/**
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
 */function Fa(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function My(){return ql()==="http:"||ql()==="https:"}function ql(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
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
 */function Ly(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(My()||g_()||"connection"in navigator)?navigator.onLine:!0}function Fy(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
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
 */class xs{constructor(e,t){this.shortDelay=e,this.longDelay=t,mt(t>e,"Short delay should be less than long delay!"),this.isMobile=f_()||m_()}get(){return Ly()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ec(r,e){mt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class sf{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Uy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const By=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],qy=new xs(3e4,6e4);function Dn(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function Ht(r,e,t,n,s={}){return of(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const c=Ds({key:r.config.apiKey,...o}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h={method:e,headers:u,...i};return p_()||(h.referrerPolicy="no-referrer"),r.emulatorConfig&&Ns(r.emulatorConfig.host)&&(h.credentials="include"),sf.fetch()(await af(r,r.config.apiHost,t,c),h)})}async function of(r,e,t){r._canInitEmulator=!1;const n={...Uy,...e};try{const s=new $y(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ui(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ui(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw ui(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw ui(r,"user-disabled",o);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw rf(r,f,h);Je(r,f)}}catch(s){if(s instanceof ut)throw s;Je(r,"network-request-failed",{message:String(s)})}}async function uo(r,e,t,n,s={}){const i=await Ht(r,e,t,n,s);return"mfaPendingCredential"in i&&Je(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function af(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?Ec(r.config,s):`${r.config.apiScheme}://${s}`;return By.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function jy(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class $y{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(rt(this.auth,"network-request-failed")),qy.get())})}}function ui(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=rt(r,e,n);return s.customData._tokenResponse=t,s}function jl(r){return r!==void 0&&r.enterprise!==void 0}class zy{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return jy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Ky(r,e){return Ht(r,"GET","/v2/recaptchaConfig",Dn(r,e))}/**
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
 */async function Gy(r,e){return Ht(r,"POST","/v1/accounts:delete",e)}async function Oi(r,e){return Ht(r,"POST","/v1/accounts:lookup",e)}/**
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
 */function ss(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Hy(r,e=!1){const t=he(r),n=await t.getIdToken(e),s=Tc(n);B(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:ss(_a(s.auth_time)),issuedAtTime:ss(_a(s.iat)),expirationTime:ss(_a(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function _a(r){return Number(r)*1e3}function Tc(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return _i("JWT malformed, contained fewer than 3 sections"),null;try{const s=qd(t);return s?JSON.parse(s):(_i("Failed to decode base64 JWT payload"),null)}catch(s){return _i("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function $l(r){const e=Tc(r);return B(e,"internal-error"),B(typeof e.exp<"u","internal-error"),B(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function gs(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof ut&&Wy(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function Wy({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
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
 */class Qy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Ua{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ss(this.lastLoginAt),this.creationTime=ss(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Mi(r){var g;const e=r.auth,t=await r.getIdToken(),n=await gs(r,Oi(e,{idToken:t}));B(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=(g=s.providerUserInfo)!=null&&g.length?cf(s.providerUserInfo):[],o=Yy(r.providerData,i),c=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Ua(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(r,f)}async function Jy(r){const e=he(r);await Mi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Yy(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function cf(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function Xy(r,e){const t=await of(r,{},async()=>{const n=Ds({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await af(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return r.emulatorConfig&&Ns(r.emulatorConfig.host)&&(u.credentials="include"),sf.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Zy(r,e){return Ht(r,"POST","/v2/accounts:revokeToken",Dn(r,e))}/**
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
 */class Qn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){B(e.idToken,"internal-error"),B(typeof e.idToken<"u","internal-error"),B(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):$l(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){B(e.length!==0,"internal-error");const t=$l(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(B(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await Xy(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new Qn;return n&&(B(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(B(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(B(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qn,this.toJSON())}_performRefresh(){return ht("not implemented")}}/**
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
 */function Rt(r,e){B(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Ge{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new Qy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ua(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await gs(this,this.stsTokenManager.getToken(this.auth,e));return B(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Hy(this,e)}reload(){return Jy(this)}_assign(e){this!==e&&(B(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ge({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){B(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Mi(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ke(this.auth.app))return Promise.reject(Ut(this.auth));const e=await this.getIdToken();return await gs(this,Gy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:g,emailVerified:I,isAnonymous:R,providerData:V,stsTokenManager:x}=t;B(g&&x,e,"internal-error");const N=Qn.fromJSON(this.name,x);B(typeof g=="string",e,"internal-error"),Rt(n,e.name),Rt(s,e.name),B(typeof I=="boolean",e,"internal-error"),B(typeof R=="boolean",e,"internal-error"),Rt(i,e.name),Rt(o,e.name),Rt(c,e.name),Rt(u,e.name),Rt(h,e.name),Rt(f,e.name);const z=new Ge({uid:g,auth:e,email:s,emailVerified:I,displayName:n,isAnonymous:R,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:N,createdAt:h,lastLoginAt:f});return V&&Array.isArray(V)&&(z.providerData=V.map($=>({...$}))),u&&(z._redirectEventId=u),z}static async _fromIdTokenResponse(e,t,n=!1){const s=new Qn;s.updateFromServerResponse(t);const i=new Ge({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Mi(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];B(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?cf(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Qn;c.updateFromIdToken(n);const u=new Ge({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ua(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const zl=new Map;function dt(r){mt(r instanceof Function,"Expected a class definition");let e=zl.get(r);return e?(mt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,zl.set(r,e),e)}/**
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
 */class uf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}uf.type="NONE";const Kl=uf;/**
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
 */function yi(r,e,t){return`firebase:${r}:${e}:${t}`}class Jn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=yi(this.userKey,s.apiKey,i),this.fullPersistenceKey=yi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Oi(this.auth,{idToken:e}).catch(()=>{});return t?Ge._fromGetAccountInfoResponse(this.auth,t,e):null}return Ge._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Jn(dt(Kl),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||dt(Kl);const o=yi(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let g;if(typeof f=="string"){const I=await Oi(e,{idToken:f}).catch(()=>{});if(!I)break;g=await Ge._fromGetAccountInfoResponse(e,I,f)}else g=Ge._fromJSON(e,f);h!==i&&(c=g),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Jn(i,e,n):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Jn(i,e,n))}}/**
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
 */function Gl(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ff(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(lf(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(gf(e))return"Blackberry";if(mf(e))return"Webos";if(hf(e))return"Safari";if((e.includes("chrome/")||df(e))&&!e.includes("edge/"))return"Chrome";if(pf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function lf(r=_e()){return/firefox\//i.test(r)}function hf(r=_e()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function df(r=_e()){return/crios\//i.test(r)}function ff(r=_e()){return/iemobile/i.test(r)}function pf(r=_e()){return/android/i.test(r)}function gf(r=_e()){return/blackberry/i.test(r)}function mf(r=_e()){return/webos/i.test(r)}function wc(r=_e()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function eI(r=_e()){var e;return wc(r)&&!!((e=window.navigator)!=null&&e.standalone)}function tI(){return __()&&document.documentMode===10}function _f(r=_e()){return wc(r)||pf(r)||mf(r)||gf(r)||/windows phone/i.test(r)||ff(r)}/**
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
 */function yf(r,e=[]){let t;switch(r){case"Browser":t=Gl(_e());break;case"Worker":t=`${Gl(_e())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Tr}/${n}`}/**
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
 */class nI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,c)=>{try{const u=e(i);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
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
 */async function rI(r,e={}){return Ht(r,"GET","/v2/passwordPolicy",Dn(r,e))}/**
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
 */const sI=6;class iI{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??sI,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class oI{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Hl(this),this.idTokenSubscription=new Hl(this),this.beforeStateQueue=new nI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=nf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=dt(t)),this._initializationPromise=this.queue(async()=>{var n,s,i;if(!this._deleted&&(this.persistenceManager=await Jn.create(this,e),(n=this._resolvePersistenceManagerAvailable)==null||n.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Oi(this,{idToken:e}),n=await Ge._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Ke(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=n==null?void 0:n._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(n=u.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return B(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Mi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Fy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ke(this.app))return Promise.reject(Ut(this));const t=e?he(e):null;return t&&B(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&B(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ke(this.app)?Promise.reject(Ut(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ke(this.app)?Promise.reject(Ut(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(dt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await rI(this),t=new iI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new kn("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await Zy(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&dt(e)||this._popupRedirectResolver;B(t,this,"argument-error"),this.redirectPersistenceManager=await Jn.create(this,[dt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(B(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return B(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=yf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(Ke(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Oy(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function wr(r){return he(r)}class Hl{constructor(e){this.auth=e,this.observer=null,this.addObserver=v_(t=>this.observer=t)}get next(){return B(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let lo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function aI(r){lo=r}function If(r){return lo.loadJS(r)}function cI(){return lo.recaptchaEnterpriseScript}function uI(){return lo.gapiScript}function lI(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class hI{constructor(){this.enterprise=new dI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class dI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const fI="recaptcha-enterprise",Ef="NO_RECAPTCHA";class pI{constructor(e){this.type=fI,this.auth=wr(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{Ky(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new zy(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;jl(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(Ef)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new hI().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{n(this.auth).then(c=>{if(!t&&jl(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=cI();u.length!==0&&(u+=c),If(u).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function Wl(r,e,t,n=!1,s=!1){const i=new pI(r);let o;if(s)o=Ef;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return n?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ql(r,e,t,n,s){var i;if((i=r._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Wl(r,e,t,t==="getOobCode");return n(r,o)}else return n(r,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Wl(r,e,t,t==="getOobCode");return n(r,c)}else return Promise.reject(o)})}/**
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
 */function gI(r,e){const t=Er(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(En(i,e??{}))return s;Je(s,"already-initialized")}return t.initialize({options:e})}function mI(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(dt);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function _I(r,e,t){const n=wr(r);B(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=Tf(e),{host:o,port:c}=yI(e),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){B(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),B(En(h,n.config.emulator)&&En(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,Ns(o)?Qd(`${i}//${o}${u}`):II()}function Tf(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function yI(r){const e=Tf(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:Jl(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:Jl(o)}}}function Jl(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function II(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
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
 */class vc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ht("not implemented")}_getIdTokenResponse(e){return ht("not implemented")}_linkToIdToken(e,t){return ht("not implemented")}_getReauthenticationResolver(e){return ht("not implemented")}}async function EI(r,e){return Ht(r,"POST","/v1/accounts:signUp",e)}/**
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
 */async function TI(r,e){return uo(r,"POST","/v1/accounts:signInWithPassword",Dn(r,e))}/**
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
 */async function wI(r,e){return uo(r,"POST","/v1/accounts:signInWithEmailLink",Dn(r,e))}async function vI(r,e){return uo(r,"POST","/v1/accounts:signInWithEmailLink",Dn(r,e))}/**
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
 */class ms extends vc{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new ms(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new ms(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ql(e,t,"signInWithPassword",TI);case"emailLink":return wI(e,{email:this._email,oobCode:this._password});default:Je(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ql(e,n,"signUpPassword",EI);case"emailLink":return vI(e,{idToken:t,email:this._email,oobCode:this._password});default:Je(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Yn(r,e){return uo(r,"POST","/v1/accounts:signInWithIdp",Dn(r,e))}/**
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
 */const AI="http://localhost";class Tn extends vc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Tn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new Tn(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Yn(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Yn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yn(e,t)}buildRequest(){const e={requestUri:AI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ds(t)}return e}}/**
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
 */function SI(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function bI(r){const e=Yr(Xr(r)).link,t=e?Yr(Xr(e)).deep_link_id:null,n=Yr(Xr(r)).deep_link_id;return(n?Yr(Xr(n)).link:null)||n||t||e||r}class Ac{constructor(e){const t=Yr(Xr(e)),n=t.apiKey??null,s=t.oobCode??null,i=SI(t.mode??null);B(n&&s&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=bI(e);try{return new Ac(t)}catch{return null}}}/**
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
 */class vr{constructor(){this.providerId=vr.PROVIDER_ID}static credential(e,t){return ms._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Ac.parseLink(t);return B(n,"argument-error"),ms._fromEmailAndCode(e,n.code,n.tenantId)}}vr.PROVIDER_ID="password";vr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";vr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class wf{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Os extends wf{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class kt extends Os{constructor(){super("facebook.com")}static credential(e){return Tn._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kt.credential(e.oauthAccessToken)}catch{return null}}}kt.FACEBOOK_SIGN_IN_METHOD="facebook.com";kt.PROVIDER_ID="facebook.com";/**
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
 */class Dt extends Os{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Tn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Dt.credential(t,n)}catch{return null}}}Dt.GOOGLE_SIGN_IN_METHOD="google.com";Dt.PROVIDER_ID="google.com";/**
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
 */class Nt extends Os{constructor(){super("github.com")}static credential(e){return Tn._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Nt.credential(e.oauthAccessToken)}catch{return null}}}Nt.GITHUB_SIGN_IN_METHOD="github.com";Nt.PROVIDER_ID="github.com";/**
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
 */class xt extends Os{constructor(){super("twitter.com")}static credential(e,t){return Tn._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return xt.credential(t,n)}catch{return null}}}xt.TWITTER_SIGN_IN_METHOD="twitter.com";xt.PROVIDER_ID="twitter.com";/**
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
 */class er{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await Ge._fromIdTokenResponse(e,n,s),o=Yl(n);return new er({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=Yl(n);return new er({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function Yl(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
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
 */class Li extends ut{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Li.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Li(e,t,n,s)}}function vf(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Li._fromErrorAndOperation(r,i,e,n):i})}async function RI(r,e,t=!1){const n=await gs(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return er._forOperation(r,"link",n)}/**
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
 */async function PI(r,e,t=!1){const{auth:n}=r;if(Ke(n.app))return Promise.reject(Ut(n));const s="reauthenticate";try{const i=await gs(r,vf(n,s,e,r),t);B(i.idToken,n,"internal-error");const o=Tc(i.idToken);B(o,n,"internal-error");const{sub:c}=o;return B(r.uid===c,n,"user-mismatch"),er._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Je(n,"user-mismatch"),i}}/**
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
 */async function Af(r,e,t=!1){if(Ke(r.app))return Promise.reject(Ut(r));const n="signIn",s=await vf(r,n,e),i=await er._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}async function CI(r,e){return Af(wr(r),e)}/**
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
 */async function VI(r){const e=wr(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function ub(r,e,t){return Ke(r.app)?Promise.reject(Ut(r)):CI(he(r),vr.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&VI(r),n})}/**
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
 */function lb(r,e){return he(r).setPersistence(e)}function kI(r,e,t,n){return he(r).onIdTokenChanged(e,t,n)}function DI(r,e,t){return he(r).beforeAuthStateChanged(e,t)}function hb(r,e,t,n){return he(r).onAuthStateChanged(e,t,n)}const Fi="__sak";/**
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
 */class Sf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Fi,"1"),this.storage.removeItem(Fi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const NI=1e3,xI=10;class bf extends Sf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=_f(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);tI()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,xI):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},NI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}bf.type="LOCAL";const OI=bf;/**
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
 */class Rf extends Sf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Rf.type="SESSION";const Pf=Rf;/**
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
 */function MI(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ho{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new ho(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),u=await MI(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ho.receivers=[];/**
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
 */function Sc(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
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
 */class LI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=Sc("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(g){const I=g;if(I.data.eventId===h)switch(I.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(I.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function st(){return window}function FI(r){st().location.href=r}/**
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
 */function Cf(){return typeof st().WorkerGlobalScope<"u"&&typeof st().importScripts=="function"}async function UI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function BI(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function qI(){return Cf()?self:null}/**
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
 */const Vf="firebaseLocalStorageDb",jI=1,Ui="firebaseLocalStorage",kf="fbase_key";class Ms{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function fo(r,e){return r.transaction([Ui],e?"readwrite":"readonly").objectStore(Ui)}function $I(){const r=indexedDB.deleteDatabase(Vf);return new Ms(r).toPromise()}function Ba(){const r=indexedDB.open(Vf,jI);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Ui,{keyPath:kf})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Ui)?e(n):(n.close(),await $I(),e(await Ba()))})})}async function Xl(r,e,t){const n=fo(r,!0).put({[kf]:e,value:t});return new Ms(n).toPromise()}async function zI(r,e){const t=fo(r,!1).get(e),n=await new Ms(t).toPromise();return n===void 0?null:n.value}function Zl(r,e){const t=fo(r,!0).delete(e);return new Ms(t).toPromise()}const KI=800,GI=3;class Df{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ba(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>GI)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Cf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ho._getInstance(qI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await UI(),!this.activeServiceWorker)return;this.sender=new LI(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||BI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ba();return await Xl(e,Fi,"1"),await Zl(e,Fi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Xl(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>zI(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Zl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=fo(s,!1).getAll();return new Ms(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),KI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Df.type="LOCAL";const HI=Df;new xs(3e4,6e4);/**
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
 */function WI(r,e){return e?dt(e):(B(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
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
 */class bc extends vc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Yn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Yn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Yn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function QI(r){return Af(r.auth,new bc(r),r.bypassAuthState)}function JI(r){const{auth:e,user:t}=r;return B(t,e,"internal-error"),PI(t,new bc(r),r.bypassAuthState)}async function YI(r){const{auth:e,user:t}=r;return B(t,e,"internal-error"),RI(t,new bc(r),r.bypassAuthState)}/**
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
 */class Nf{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return QI;case"linkViaPopup":case"linkViaRedirect":return YI;case"reauthViaPopup":case"reauthViaRedirect":return JI;default:Je(this.auth,"internal-error")}}resolve(e){mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const XI=new xs(2e3,1e4);class Wn extends Nf{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Wn.currentPopupAction&&Wn.currentPopupAction.cancel(),Wn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return B(e,this.auth,"internal-error"),e}async onExecution(){mt(this.filter.length===1,"Popup operations only handle one event");const e=Sc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(rt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(rt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Wn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)==null?void 0:t.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(rt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,XI.get())};e()}}Wn.currentPopupAction=null;/**
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
 */const ZI="pendingRedirect",Ii=new Map;class eE extends Nf{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Ii.get(this.auth._key());if(!e){try{const n=await tE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Ii.set(this.auth._key(),e)}return this.bypassAuthState||Ii.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tE(r,e){const t=sE(e),n=rE(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function nE(r,e){Ii.set(r._key(),e)}function rE(r){return dt(r._redirectPersistence)}function sE(r){return yi(ZI,r.config.apiKey,r.name)}async function iE(r,e,t=!1){if(Ke(r.app))return Promise.reject(Ut(r));const n=wr(r),s=WI(n,e),o=await new eE(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
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
 */const oE=10*60*1e3;class aE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!xf(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";t.onError(rt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=oE&&this.cachedEventUids.clear(),this.cachedEventUids.has(eh(e))}saveEventToCache(e){this.cachedEventUids.add(eh(e)),this.lastProcessedEventTime=Date.now()}}function eh(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function xf({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cE(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return xf(r);default:return!1}}/**
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
 */async function uE(r,e={}){return Ht(r,"GET","/v1/projects",e)}/**
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
 */const lE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,hE=/^https?/;async function dE(r){if(r.config.emulator)return;const{authorizedDomains:e}=await uE(r);for(const t of e)try{if(fE(t))return}catch{}Je(r,"unauthorized-domain")}function fE(r){const e=Fa(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!hE.test(t))return!1;if(lE.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
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
 */const pE=new xs(3e4,6e4);function th(){const r=st().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function gE(r){return new Promise((e,t)=>{var s,i,o;function n(){th(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{th(),t(rt(r,"network-request-failed"))},timeout:pE.get()})}if((i=(s=st().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=st().gapi)!=null&&o.load)n();else{const c=lI("iframefcb");return st()[c]=()=>{gapi.load?n():t(rt(r,"network-request-failed"))},If(`${uI()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ei=null,e})}let Ei=null;function mE(r){return Ei=Ei||gE(r),Ei}/**
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
 */const _E=new xs(5e3,15e3),yE="__/auth/iframe",IE="emulator/auth/iframe",EE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},TE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function wE(r){const e=r.config;B(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Ec(e,IE):`https://${r.config.authDomain}/${yE}`,n={apiKey:e.apiKey,appName:r.name,v:Tr},s=TE.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${Ds(n).slice(1)}`}async function vE(r){const e=await mE(r),t=st().gapi;return B(t,r,"internal-error"),e.open({where:document.body,url:wE(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:EE,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=rt(r,"network-request-failed"),c=st().setTimeout(()=>{i(o)},_E.get());function u(){st().clearTimeout(c),s(n)}n.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const AE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},SE=500,bE=600,RE="_blank",PE="http://localhost";class nh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function CE(r,e,t,n=SE,s=bE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={...AE,width:n.toString(),height:s.toString(),top:i,left:o},h=_e().toLowerCase();t&&(c=df(h)?RE:t),lf(h)&&(e=e||PE,u.scrollbars="yes");const f=Object.entries(u).reduce((I,[R,V])=>`${I}${R}=${V},`,"");if(eI(h)&&c!=="_self")return VE(e||"",c),new nh(null);const g=window.open(e||"",c,f);B(g,r,"popup-blocked");try{g.focus()}catch{}return new nh(g)}function VE(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
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
 */const kE="__/auth/handler",DE="emulator/auth/handler",NE=encodeURIComponent("fac");async function rh(r,e,t,n,s,i){B(r.config.authDomain,r,"auth-domain-config-required"),B(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Tr,eventId:s};if(e instanceof wf){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",w_(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))o[f]=g}if(e instanceof Os){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${NE}=${encodeURIComponent(u)}`:"";return`${xE(r)}?${Ds(c).slice(1)}${h}`}function xE({config:r}){return r.emulator?Ec(r,DE):`https://${r.authDomain}/${kE}`}/**
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
 */const ya="webStorageSupport";class OE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Pf,this._completeRedirectFn=iE,this._overrideRedirectResult=nE}async _openPopup(e,t,n,s){var o;mt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await rh(e,t,n,Fa(),s);return CE(e,i,Sc())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await rh(e,t,n,Fa(),s);return FI(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(mt(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await vE(e),n=new aE(e);return t.register("authEvent",s=>(B(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ya,{type:ya},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[ya];i!==void 0&&t(!!i),Je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=dE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return _f()||hf()||wc()}}const ME=OE;var sh="@firebase/auth",ih="1.13.0";/**
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
 */class LE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){B(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function FE(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function UE(r){ot(new Qe("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;B(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:yf(r)},h=new oI(n,s,i,u);return mI(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),ot(new Qe("auth-internal",e=>{const t=wr(e.getProvider("auth").getImmediate());return(n=>new LE(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),$e(sh,ih,FE(r)),$e(sh,ih,"esm2020")}/**
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
 */const BE=5*60,qE=zd("authIdTokenMaxAge")||BE;let oh=null;const jE=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>qE)return;const s=t==null?void 0:t.token;oh!==s&&(oh=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function db(r=Xd()){const e=Er(r,"auth");if(e.isInitialized())return e.getImmediate();const t=gI(r,{popupRedirectResolver:ME,persistence:[HI,OI,Pf]}),n=zd("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=jE(i.toString());DI(t,o,()=>o(t.currentUser)),kI(t,c=>o(c))}}const s=h_("auth");return s&&_I(t,`http://${s}`),t}function $E(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}aI({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=rt("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",$E().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});UE("Browser");var ah=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bt,Of;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,m){function y(){}y.prototype=m.prototype,E.F=m.prototype,E.prototype=new y,E.prototype.constructor=E,E.D=function(w,T,S){for(var _=Array(arguments.length-2),Ne=2;Ne<arguments.length;Ne++)_[Ne-2]=arguments[Ne];return m.prototype[T].apply(w,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,m,y){y||(y=0);const w=Array(16);if(typeof m=="string")for(var T=0;T<16;++T)w[T]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(T=0;T<16;++T)w[T]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=E.g[0],y=E.g[1],T=E.g[2];let S=E.g[3],_;_=m+(S^y&(T^S))+w[0]+3614090360&4294967295,m=y+(_<<7&4294967295|_>>>25),_=S+(T^m&(y^T))+w[1]+3905402710&4294967295,S=m+(_<<12&4294967295|_>>>20),_=T+(y^S&(m^y))+w[2]+606105819&4294967295,T=S+(_<<17&4294967295|_>>>15),_=y+(m^T&(S^m))+w[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=m+(S^y&(T^S))+w[4]+4118548399&4294967295,m=y+(_<<7&4294967295|_>>>25),_=S+(T^m&(y^T))+w[5]+1200080426&4294967295,S=m+(_<<12&4294967295|_>>>20),_=T+(y^S&(m^y))+w[6]+2821735955&4294967295,T=S+(_<<17&4294967295|_>>>15),_=y+(m^T&(S^m))+w[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=m+(S^y&(T^S))+w[8]+1770035416&4294967295,m=y+(_<<7&4294967295|_>>>25),_=S+(T^m&(y^T))+w[9]+2336552879&4294967295,S=m+(_<<12&4294967295|_>>>20),_=T+(y^S&(m^y))+w[10]+4294925233&4294967295,T=S+(_<<17&4294967295|_>>>15),_=y+(m^T&(S^m))+w[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=m+(S^y&(T^S))+w[12]+1804603682&4294967295,m=y+(_<<7&4294967295|_>>>25),_=S+(T^m&(y^T))+w[13]+4254626195&4294967295,S=m+(_<<12&4294967295|_>>>20),_=T+(y^S&(m^y))+w[14]+2792965006&4294967295,T=S+(_<<17&4294967295|_>>>15),_=y+(m^T&(S^m))+w[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=m+(T^S&(y^T))+w[1]+4129170786&4294967295,m=y+(_<<5&4294967295|_>>>27),_=S+(y^T&(m^y))+w[6]+3225465664&4294967295,S=m+(_<<9&4294967295|_>>>23),_=T+(m^y&(S^m))+w[11]+643717713&4294967295,T=S+(_<<14&4294967295|_>>>18),_=y+(S^m&(T^S))+w[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=m+(T^S&(y^T))+w[5]+3593408605&4294967295,m=y+(_<<5&4294967295|_>>>27),_=S+(y^T&(m^y))+w[10]+38016083&4294967295,S=m+(_<<9&4294967295|_>>>23),_=T+(m^y&(S^m))+w[15]+3634488961&4294967295,T=S+(_<<14&4294967295|_>>>18),_=y+(S^m&(T^S))+w[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=m+(T^S&(y^T))+w[9]+568446438&4294967295,m=y+(_<<5&4294967295|_>>>27),_=S+(y^T&(m^y))+w[14]+3275163606&4294967295,S=m+(_<<9&4294967295|_>>>23),_=T+(m^y&(S^m))+w[3]+4107603335&4294967295,T=S+(_<<14&4294967295|_>>>18),_=y+(S^m&(T^S))+w[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=m+(T^S&(y^T))+w[13]+2850285829&4294967295,m=y+(_<<5&4294967295|_>>>27),_=S+(y^T&(m^y))+w[2]+4243563512&4294967295,S=m+(_<<9&4294967295|_>>>23),_=T+(m^y&(S^m))+w[7]+1735328473&4294967295,T=S+(_<<14&4294967295|_>>>18),_=y+(S^m&(T^S))+w[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=m+(y^T^S)+w[5]+4294588738&4294967295,m=y+(_<<4&4294967295|_>>>28),_=S+(m^y^T)+w[8]+2272392833&4294967295,S=m+(_<<11&4294967295|_>>>21),_=T+(S^m^y)+w[11]+1839030562&4294967295,T=S+(_<<16&4294967295|_>>>16),_=y+(T^S^m)+w[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=m+(y^T^S)+w[1]+2763975236&4294967295,m=y+(_<<4&4294967295|_>>>28),_=S+(m^y^T)+w[4]+1272893353&4294967295,S=m+(_<<11&4294967295|_>>>21),_=T+(S^m^y)+w[7]+4139469664&4294967295,T=S+(_<<16&4294967295|_>>>16),_=y+(T^S^m)+w[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=m+(y^T^S)+w[13]+681279174&4294967295,m=y+(_<<4&4294967295|_>>>28),_=S+(m^y^T)+w[0]+3936430074&4294967295,S=m+(_<<11&4294967295|_>>>21),_=T+(S^m^y)+w[3]+3572445317&4294967295,T=S+(_<<16&4294967295|_>>>16),_=y+(T^S^m)+w[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=m+(y^T^S)+w[9]+3654602809&4294967295,m=y+(_<<4&4294967295|_>>>28),_=S+(m^y^T)+w[12]+3873151461&4294967295,S=m+(_<<11&4294967295|_>>>21),_=T+(S^m^y)+w[15]+530742520&4294967295,T=S+(_<<16&4294967295|_>>>16),_=y+(T^S^m)+w[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=m+(T^(y|~S))+w[0]+4096336452&4294967295,m=y+(_<<6&4294967295|_>>>26),_=S+(y^(m|~T))+w[7]+1126891415&4294967295,S=m+(_<<10&4294967295|_>>>22),_=T+(m^(S|~y))+w[14]+2878612391&4294967295,T=S+(_<<15&4294967295|_>>>17),_=y+(S^(T|~m))+w[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=m+(T^(y|~S))+w[12]+1700485571&4294967295,m=y+(_<<6&4294967295|_>>>26),_=S+(y^(m|~T))+w[3]+2399980690&4294967295,S=m+(_<<10&4294967295|_>>>22),_=T+(m^(S|~y))+w[10]+4293915773&4294967295,T=S+(_<<15&4294967295|_>>>17),_=y+(S^(T|~m))+w[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=m+(T^(y|~S))+w[8]+1873313359&4294967295,m=y+(_<<6&4294967295|_>>>26),_=S+(y^(m|~T))+w[15]+4264355552&4294967295,S=m+(_<<10&4294967295|_>>>22),_=T+(m^(S|~y))+w[6]+2734768916&4294967295,T=S+(_<<15&4294967295|_>>>17),_=y+(S^(T|~m))+w[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=m+(T^(y|~S))+w[4]+4149444226&4294967295,m=y+(_<<6&4294967295|_>>>26),_=S+(y^(m|~T))+w[11]+3174756917&4294967295,S=m+(_<<10&4294967295|_>>>22),_=T+(m^(S|~y))+w[2]+718787259&4294967295,T=S+(_<<15&4294967295|_>>>17),_=y+(S^(T|~m))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+S&4294967295}n.prototype.v=function(E,m){m===void 0&&(m=E.length);const y=m-this.blockSize,w=this.C;let T=this.h,S=0;for(;S<m;){if(T==0)for(;S<=y;)s(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<m;)if(w[T++]=E.charCodeAt(S++),T==this.blockSize){s(this,w),T=0;break}}else for(;S<m;)if(w[T++]=E[S++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=m},n.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;m=this.o*8;for(var y=E.length-8;y<E.length;++y)E[y]=m&255,m/=256;for(this.v(E),E=Array(16),m=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)E[m++]=this.g[y]>>>w&255;return E};function i(E,m){var y=c;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=m(E)}function o(E,m){this.h=m;const y=[];let w=!0;for(let T=E.length-1;T>=0;T--){const S=E[T]|0;w&&S==m||(y[T]=S,w=!1)}this.g=y}var c={};function u(E){return-128<=E&&E<128?i(E,function(m){return new o([m|0],m<0?-1:0)}):new o([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return g;if(E<0)return N(h(-E));const m=[];let y=1;for(let w=0;E>=y;w++)m[w]=E/y|0,y*=4294967296;return new o(m,0)}function f(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return N(f(E.substring(1),m));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(m,8));let w=g;for(let S=0;S<E.length;S+=8){var T=Math.min(8,E.length-S);const _=parseInt(E.substring(S,S+T),m);T<8?(T=h(Math.pow(m,T)),w=w.j(T).add(h(_))):(w=w.j(y),w=w.add(h(_)))}return w}var g=u(0),I=u(1),R=u(16777216);r=o.prototype,r.m=function(){if(x(this))return-N(this).m();let E=0,m=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);E+=(w>=0?w:4294967296+w)*m,m*=4294967296}return E},r.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(V(this))return"0";if(x(this))return"-"+N(this).toString(E);const m=h(Math.pow(E,6));var y=this;let w="";for(;;){const T=se(y,m).g;y=z(y,T.j(m));let S=((y.g.length>0?y.g[0]:y.h)>>>0).toString(E);if(y=T,V(y))return S+w;for(;S.length<6;)S="0"+S;w=S+w}},r.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function V(E){if(E.h!=0)return!1;for(let m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function x(E){return E.h==-1}r.l=function(E){return E=z(this,E),x(E)?-1:V(E)?0:1};function N(E){const m=E.g.length,y=[];for(let w=0;w<m;w++)y[w]=~E.g[w];return new o(y,~E.h).add(I)}r.abs=function(){return x(this)?N(this):this},r.add=function(E){const m=Math.max(this.g.length,E.g.length),y=[];let w=0;for(let T=0;T<=m;T++){let S=w+(this.i(T)&65535)+(E.i(T)&65535),_=(S>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=_>>>16,S&=65535,_&=65535,y[T]=_<<16|S}return new o(y,y[y.length-1]&-2147483648?-1:0)};function z(E,m){return E.add(N(m))}r.j=function(E){if(V(this)||V(E))return g;if(x(this))return x(E)?N(this).j(N(E)):N(N(this).j(E));if(x(E))return N(this.j(N(E)));if(this.l(R)<0&&E.l(R)<0)return h(this.m()*E.m());const m=this.g.length+E.g.length,y=[];for(var w=0;w<2*m;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<E.g.length;T++){const S=this.i(w)>>>16,_=this.i(w)&65535,Ne=E.i(T)>>>16,Xt=E.i(T)&65535;y[2*w+2*T]+=_*Xt,$(y,2*w+2*T),y[2*w+2*T+1]+=S*Xt,$(y,2*w+2*T+1),y[2*w+2*T+1]+=_*Ne,$(y,2*w+2*T+1),y[2*w+2*T+2]+=S*Ne,$(y,2*w+2*T+2)}for(E=0;E<m;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=m;E<2*m;E++)y[E]=0;return new o(y,0)};function $(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function j(E,m){this.g=E,this.h=m}function se(E,m){if(V(m))throw Error("division by zero");if(V(E))return new j(g,g);if(x(E))return m=se(N(E),m),new j(N(m.g),N(m.h));if(x(m))return m=se(E,N(m)),new j(N(m.g),m.h);if(E.g.length>30){if(x(E)||x(m))throw Error("slowDivide_ only works with positive integers.");for(var y=I,w=m;w.l(E)<=0;)y=J(y),w=J(w);var T=Y(y,1),S=Y(w,1);for(w=Y(w,2),y=Y(y,2);!V(w);){var _=S.add(w);_.l(E)<=0&&(T=T.add(y),S=_),w=Y(w,1),y=Y(y,1)}return m=z(E,T.j(m)),new j(T,m)}for(T=g;E.l(m)>=0;){for(y=Math.max(1,Math.floor(E.m()/m.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),S=h(y),_=S.j(m);x(_)||_.l(E)>0;)y-=w,S=h(y),_=S.j(m);V(S)&&(S=I),T=T.add(S),E=z(E,_)}return new j(T,E)}r.B=function(E){return se(this,E).h},r.and=function(E){const m=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<m;w++)y[w]=this.i(w)&E.i(w);return new o(y,this.h&E.h)},r.or=function(E){const m=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<m;w++)y[w]=this.i(w)|E.i(w);return new o(y,this.h|E.h)},r.xor=function(E){const m=Math.max(this.g.length,E.g.length),y=[];for(let w=0;w<m;w++)y[w]=this.i(w)^E.i(w);return new o(y,this.h^E.h)};function J(E){const m=E.g.length+1,y=[];for(let w=0;w<m;w++)y[w]=E.i(w)<<1|E.i(w-1)>>>31;return new o(y,E.h)}function Y(E,m){const y=m>>5;m%=32;const w=E.g.length-y,T=[];for(let S=0;S<w;S++)T[S]=m>0?E.i(S+y)>>>m|E.i(S+y+1)<<32-m:E.i(S+y);return new o(T,E.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Of=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Bt=o}).apply(typeof ah<"u"?ah:typeof self<"u"?self:typeof window<"u"?window:{});var li=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Mf,Zr,Lf,Ti,qa,Ff,Uf,Bf;(function(){var r,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof li=="object"&&li];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var A=a[p];if(!(A in d))break e;d=d[A]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&d.push([p,l[p]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=u,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function g(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(p,A,b){for(var D=Array(arguments.length-2),K=2;K<arguments.length;K++)D[K-2]=arguments[K];return l.prototype[A].apply(p,D)}}var I=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function R(a){const l=a.length;if(l>0){const d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function V(a,l){for(let p=1;p<arguments.length;p++){const A=arguments[p];var d=typeof A;if(d=d!="object"?d:A?Array.isArray(A)?"array":d:"null",d=="array"||d=="object"&&typeof A.length=="number"){d=a.length||0;const b=A.length||0;a.length=d+b;for(let D=0;D<b;D++)a[d+D]=A[D]}else a.push(A)}}class x{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function N(a){o.setTimeout(()=>{throw a},0)}function z(){var a=E;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class ${constructor(){this.h=this.g=null}add(l,d){const p=j.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var j=new x(()=>new se,a=>a.reset());class se{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let J,Y=!1,E=new $,m=()=>{const a=Promise.resolve(void 0);J=()=>{a.then(y)}};function y(){for(var a;a=z();){try{a.h.call(a.g)}catch(d){N(d)}var l=j;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}Y=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a}();function _(a){return/^[\s\xa0]*$/.test(a)}function Ne(a,l){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}g(Ne,T),Ne.prototype.init=function(a,l){const d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Ne.Z.h.call(this)},Ne.prototype.h=function(){Ne.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Xt="closure_listenable_"+(Math.random()*1e6|0),bm=0;function Rm(a,l,d,p,A){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=A,this.key=++bm,this.da=this.fa=!1}function Ws(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Qs(a,l,d){for(const p in a)l.call(d,a[p],p,a)}function Pm(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function Vu(a){const l={};for(const d in a)l[d]=a[d];return l}const ku="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Du(a,l){let d,p;for(let A=1;A<arguments.length;A++){p=arguments[A];for(d in p)a[d]=p[d];for(let b=0;b<ku.length;b++)d=ku[b],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function Js(a){this.src=a,this.g={},this.h=0}Js.prototype.add=function(a,l,d,p,A){const b=a.toString();a=this.g[b],a||(a=this.g[b]=[],this.h++);const D=jo(a,l,p,A);return D>-1?(l=a[D],d||(l.fa=!1)):(l=new Rm(l,this.src,b,!!p,A),l.fa=d,a.push(l)),l};function qo(a,l){const d=l.type;if(d in a.g){var p=a.g[d],A=Array.prototype.indexOf.call(p,l,void 0),b;(b=A>=0)&&Array.prototype.splice.call(p,A,1),b&&(Ws(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function jo(a,l,d,p){for(let A=0;A<a.length;++A){const b=a[A];if(!b.da&&b.listener==l&&b.capture==!!d&&b.ha==p)return A}return-1}var $o="closure_lm_"+(Math.random()*1e6|0),zo={};function Nu(a,l,d,p,A){if(Array.isArray(l)){for(let b=0;b<l.length;b++)Nu(a,l[b],d,p,A);return null}return d=Mu(d),a&&a[Xt]?a.J(l,d,c(p)?!!p.capture:!1,A):Cm(a,l,d,!1,p,A)}function Cm(a,l,d,p,A,b){if(!l)throw Error("Invalid event type");const D=c(A)?!!A.capture:!!A;let K=Go(a);if(K||(a[$o]=K=new Js(a)),d=K.add(l,d,p,D,b),d.proxy)return d;if(p=Vm(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)S||(A=D),A===void 0&&(A=!1),a.addEventListener(l.toString(),p,A);else if(a.attachEvent)a.attachEvent(Ou(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Vm(){function a(d){return l.call(a.src,a.listener,d)}const l=km;return a}function xu(a,l,d,p,A){if(Array.isArray(l))for(var b=0;b<l.length;b++)xu(a,l[b],d,p,A);else p=c(p)?!!p.capture:!!p,d=Mu(d),a&&a[Xt]?(a=a.i,b=String(l).toString(),b in a.g&&(l=a.g[b],d=jo(l,d,p,A),d>-1&&(Ws(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[b],a.h--)))):a&&(a=Go(a))&&(l=a.g[l.toString()],a=-1,l&&(a=jo(l,d,p,A)),(d=a>-1?l[a]:null)&&Ko(d))}function Ko(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Xt])qo(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(Ou(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=Go(l))?(qo(d,a),d.h==0&&(d.src=null,l[$o]=null)):Ws(a)}}}function Ou(a){return a in zo?zo[a]:zo[a]="on"+a}function km(a,l){if(a.da)a=!0;else{l=new Ne(l,this);const d=a.listener,p=a.ha||a.src;a.fa&&Ko(a),a=d.call(p,l)}return a}function Go(a){return a=a[$o],a instanceof Js?a:null}var Ho="__closure_events_fn_"+(Math.random()*1e9>>>0);function Mu(a){return typeof a=="function"?a:(a[Ho]||(a[Ho]=function(l){return a.handleEvent(l)}),a[Ho])}function ve(){w.call(this),this.i=new Js(this),this.M=this,this.G=null}g(ve,w),ve.prototype[Xt]=!0,ve.prototype.removeEventListener=function(a,l,d,p){xu(this,a,l,d,p)};function Ve(a,l){var d,p=a.G;if(p)for(d=[];p;p=p.G)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new T(l,a);else if(l instanceof T)l.target=l.target||a;else{var A=l;l=new T(p,a),Du(l,A)}A=!0;let b,D;if(d)for(D=d.length-1;D>=0;D--)b=l.g=d[D],A=Ys(b,p,!0,l)&&A;if(b=l.g=a,A=Ys(b,p,!0,l)&&A,A=Ys(b,p,!1,l)&&A,d)for(D=0;D<d.length;D++)b=l.g=d[D],A=Ys(b,p,!1,l)&&A}ve.prototype.N=function(){if(ve.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let p=0;p<d.length;p++)Ws(d[p]);delete a.g[l],a.h--}}this.G=null},ve.prototype.J=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},ve.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Ys(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let A=!0;for(let b=0;b<l.length;++b){const D=l[b];if(D&&!D.da&&D.capture==d){const K=D.listener,me=D.ha||D.src;D.fa&&qo(a.i,D),A=K.call(me,p)!==!1&&A}}return A&&!p.defaultPrevented}function Dm(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Lu(a){a.g=Dm(()=>{a.g=null,a.i&&(a.i=!1,Lu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Nm extends w{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Lu(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Cr(a){w.call(this),this.h=a,this.g={}}g(Cr,w);var Fu=[];function Uu(a){Qs(a.g,function(l,d){this.g.hasOwnProperty(d)&&Ko(l)},a),a.g={}}Cr.prototype.N=function(){Cr.Z.N.call(this),Uu(this)},Cr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Wo=o.JSON.stringify,xm=o.JSON.parse,Om=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Bu(){}function qu(){}var Vr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Qo(){T.call(this,"d")}g(Qo,T);function Jo(){T.call(this,"c")}g(Jo,T);var Zt={},ju=null;function Xs(){return ju=ju||new ve}Zt.Ia="serverreachability";function $u(a){T.call(this,Zt.Ia,a)}g($u,T);function kr(a){const l=Xs();Ve(l,new $u(l))}Zt.STAT_EVENT="statevent";function zu(a,l){T.call(this,Zt.STAT_EVENT,a),this.stat=l}g(zu,T);function ke(a){const l=Xs();Ve(l,new zu(l,a))}Zt.Ja="timingevent";function Ku(a,l){T.call(this,Zt.Ja,a),this.size=l}g(Ku,T);function Dr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function Nr(){this.g=!0}Nr.prototype.ua=function(){this.g=!1};function Mm(a,l,d,p,A,b){a.info(function(){if(a.g)if(b){var D="",K=b.split("&");for(let ne=0;ne<K.length;ne++){var me=K[ne].split("=");if(me.length>1){const Ie=me[0];me=me[1];const Xe=Ie.split("_");D=Xe.length>=2&&Xe[1]=="type"?D+(Ie+"="+me+"&"):D+(Ie+"=redacted&")}}}else D=null;else D=b;return"XMLHTTP REQ ("+p+") [attempt "+A+"]: "+l+`
`+d+`
`+D})}function Lm(a,l,d,p,A,b,D){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+A+"]: "+l+`
`+d+`
`+b+" "+D})}function On(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Um(a,d)+(p?" "+p:"")})}function Fm(a,l){a.info(function(){return"TIMEOUT: "+l})}Nr.prototype.info=function(){};function Um(a,l){if(!a.g)return l;if(!l)return null;try{const b=JSON.parse(l);if(b){for(a=0;a<b.length;a++)if(Array.isArray(b[a])){var d=b[a];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var A=p[0];if(A!="noop"&&A!="stop"&&A!="close")for(let D=1;D<p.length;D++)p[D]=""}}}}return Wo(b)}catch{return l}}var Zs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Gu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Hu;function Yo(){}g(Yo,Bu),Yo.prototype.g=function(){return new XMLHttpRequest},Hu=new Yo;function xr(a){return encodeURIComponent(String(a))}function Bm(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function Tt(a,l,d,p){this.j=a,this.i=l,this.l=d,this.S=p||1,this.V=new Cr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Wu}function Wu(){this.i=null,this.g="",this.h=!1}var Qu={},Xo={};function Zo(a,l,d){a.M=1,a.A=ti(Ye(l)),a.u=d,a.R=!0,Ju(a,null)}function Ju(a,l){a.F=Date.now(),ei(a),a.B=Ye(a.A);var d=a.B,p=a.S;Array.isArray(p)||(p=[String(p)]),ul(d.i,"t",p),a.C=0,d=a.j.L,a.h=new Wu,a.g=Rl(a.j,d?l:null,!a.u),a.P>0&&(a.O=new Nm(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,p=a.ba;var A="readystatechange";Array.isArray(A)||(A&&(Fu[0]=A.toString()),A=Fu);for(let b=0;b<A.length;b++){const D=Nu(d,A[b],p||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=a.J?Vu(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),kr(),Mm(a.i,a.v,a.B,a.l,a.S,a.u)}Tt.prototype.ba=function(a){a=a.target;const l=this.O;l&&At(a)==3?l.j():this.Y(a)},Tt.prototype.Y=function(a){try{if(a==this.g)e:{const K=At(this.g),me=this.g.ya(),ne=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||ml(this.g)))){this.K||K!=4||me==7||(me==8||ne<=0?kr(3):kr(2)),ea(this);var l=this.g.ca();this.X=l;var d=qm(this);if(this.o=l==200,Lm(this.i,this.v,this.B,this.l,this.S,K,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,A=this.g;if((p=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(p)){var b=p;break t}}b=null}if(a=b)On(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ta(this,a);else{this.o=!1,this.m=3,ke(12),en(this),Or(this);break e}}if(this.R){a=!0;let Ie;for(;!this.K&&this.C<d.length;)if(Ie=jm(this,d),Ie==Xo){K==4&&(this.m=4,ke(14),a=!1),On(this.i,this.l,null,"[Incomplete Response]");break}else if(Ie==Qu){this.m=4,ke(15),On(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else On(this.i,this.l,Ie,null),ta(this,Ie);if(Yu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||d.length!=0||this.h.h||(this.m=1,ke(16),a=!1),this.o=this.o&&a,!a)On(this.i,this.l,d,"[Invalid Chunked Response]"),en(this),Or(this);else if(d.length>0&&!this.W){this.W=!0;var D=this.j;D.g==this&&D.aa&&!D.P&&(D.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),ua(D),D.P=!0,ke(11))}}else On(this.i,this.l,d,null),ta(this,d);K==4&&en(this),this.o&&!this.K&&(K==4?vl(this.j,this):(this.o=!1,ei(this)))}else n_(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,ke(12)):(this.m=0,ke(13)),en(this),Or(this)}}}catch{}finally{}};function qm(a){if(!Yu(a))return a.g.la();const l=ml(a.g);if(l==="")return"";let d="";const p=l.length,A=At(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return en(a),Or(a),"";a.h.i=new o.TextDecoder}for(let b=0;b<p;b++)a.h.h=!0,d+=a.h.i.decode(l[b],{stream:!(A&&b==p-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function Yu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function jm(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?Xo:(d=Number(l.substring(d,p)),isNaN(d)?Qu:(p+=1,p+d>l.length?Xo:(l=l.slice(p,p+d),a.C=p+d,l)))}Tt.prototype.cancel=function(){this.K=!0,en(this)};function ei(a){a.T=Date.now()+a.H,Xu(a,a.H)}function Xu(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Dr(h(a.aa,a),l)}function ea(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Tt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Fm(this.i,this.B),this.M!=2&&(kr(),ke(17)),en(this),this.m=2,Or(this)):Xu(this,this.T-a)};function Or(a){a.j.I==0||a.K||vl(a.j,a)}function en(a){ea(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Uu(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function ta(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||na(d.h,a))){if(!a.L&&na(d.h,a)&&d.I==3){try{var p=d.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var A=p;if(A[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)oi(d),si(d);else break e;ca(d),ke(18)}}else d.xa=A[1],0<d.xa-d.K&&A[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Dr(h(d.Va,d),6e3));tl(d.h)<=1&&d.ta&&(d.ta=void 0)}else nn(d,11)}else if((a.L||d.g==a)&&oi(d),!_(l))for(A=d.Ba.g.parse(l),l=0;l<A.length;l++){let ne=A[l];const Ie=ne[0];if(!(Ie<=d.K))if(d.K=Ie,ne=ne[1],d.I==2)if(ne[0]=="c"){d.M=ne[1],d.ba=ne[2];const Xe=ne[3];Xe!=null&&(d.ka=Xe,d.j.info("VER="+d.ka));const rn=ne[4];rn!=null&&(d.za=rn,d.j.info("SVER="+d.za));const St=ne[5];St!=null&&typeof St=="number"&&St>0&&(p=1.5*St,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const bt=a.g;if(bt){const ci=bt.g?bt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ci){var b=p.h;b.g||ci.indexOf("spdy")==-1&&ci.indexOf("quic")==-1&&ci.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(ra(b,b.h),b.h=null))}if(p.G){const la=bt.g?bt.g.getResponseHeader("X-HTTP-Session-Id"):null;la&&(p.wa=la,ie(p.J,p.G,la))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var D=a;if(p.na=bl(p,p.L?p.ba:null,p.W),D.L){nl(p.h,D);var K=D,me=p.O;me&&(K.H=me),K.D&&(ea(K),ei(K)),p.g=D}else Tl(p);d.i.length>0&&ii(d)}else ne[0]!="stop"&&ne[0]!="close"||nn(d,7);else d.I==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?nn(d,7):aa(d):ne[0]!="noop"&&d.l&&d.l.qa(ne),d.A=0)}}kr(4)}catch{}}var $m=class{constructor(a,l){this.g=a,this.map=l}};function Zu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function el(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function tl(a){return a.h?1:a.g?a.g.size:0}function na(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function ra(a,l){a.g?a.g.add(l):a.h=l}function nl(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Zu.prototype.cancel=function(){if(this.i=rl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function rl(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return R(a.i)}var sl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function zm(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const p=a[d].indexOf("=");let A,b=null;p>=0?(A=a[d].substring(0,p),b=a[d].substring(p+1)):A=a[d],l(A,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function wt(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof wt?(this.l=a.l,Mr(this,a.j),this.o=a.o,this.g=a.g,Lr(this,a.u),this.h=a.h,sa(this,ll(a.i)),this.m=a.m):a&&(l=String(a).match(sl))?(this.l=!1,Mr(this,l[1]||"",!0),this.o=Fr(l[2]||""),this.g=Fr(l[3]||"",!0),Lr(this,l[4]),this.h=Fr(l[5]||"",!0),sa(this,l[6]||"",!0),this.m=Fr(l[7]||"")):(this.l=!1,this.i=new Br(null,this.l))}wt.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(Ur(l,il,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Ur(l,il,!0),"@"),a.push(xr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Ur(d,d.charAt(0)=="/"?Hm:Gm,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Ur(d,Qm)),a.join("")},wt.prototype.resolve=function(a){const l=Ye(this);let d=!!a.j;d?Mr(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var p=a.h;if(d)Lr(l,a.u);else if(d=!!a.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var A=l.h.lastIndexOf("/");A!=-1&&(p=l.h.slice(0,A+1)+p)}if(A=p,A==".."||A==".")p="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){p=A.lastIndexOf("/",0)==0,A=A.split("/");const b=[];for(let D=0;D<A.length;){const K=A[D++];K=="."?p&&D==A.length&&b.push(""):K==".."?((b.length>1||b.length==1&&b[0]!="")&&b.pop(),p&&D==A.length&&b.push("")):(b.push(K),p=!0)}p=b.join("/")}else p=A}return d?l.h=p:d=a.i.toString()!=="",d?sa(l,ll(a.i)):d=!!a.m,d&&(l.m=a.m),l};function Ye(a){return new wt(a)}function Mr(a,l,d){a.j=d?Fr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Lr(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function sa(a,l,d){l instanceof Br?(a.i=l,Jm(a.i,a.l)):(d||(l=Ur(l,Wm)),a.i=new Br(l,a.l))}function ie(a,l,d){a.i.set(l,d)}function ti(a){return ie(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Fr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ur(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Km),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Km(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var il=/[#\/\?@]/g,Gm=/[#\?:]/g,Hm=/[#\?]/g,Wm=/[#\?@]/g,Qm=/#/g;function Br(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function tn(a){a.g||(a.g=new Map,a.h=0,a.i&&zm(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Br.prototype,r.add=function(a,l){tn(this),this.i=null,a=Mn(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function ol(a,l){tn(a),l=Mn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function al(a,l){return tn(a),l=Mn(a,l),a.g.has(l)}r.forEach=function(a,l){tn(this),this.g.forEach(function(d,p){d.forEach(function(A){a.call(l,A,p,this)},this)},this)};function cl(a,l){tn(a);let d=[];if(typeof l=="string")al(a,l)&&(d=d.concat(a.g.get(Mn(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}r.set=function(a,l){return tn(this),this.i=null,a=Mn(this,a),al(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=cl(this,a),a.length>0?String(a[0]):l):l};function ul(a,l,d){ol(a,l),d.length>0&&(a.i=null,a.g.set(Mn(a,l),R(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var d=l[p];const A=xr(d);d=cl(this,d);for(let b=0;b<d.length;b++){let D=A;d[b]!==""&&(D+="="+xr(d[b])),a.push(D)}}return this.i=a.join("&")};function ll(a){const l=new Br;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function Mn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Jm(a,l){l&&!a.j&&(tn(a),a.i=null,a.g.forEach(function(d,p){const A=p.toLowerCase();p!=A&&(ol(this,p),ul(this,A,d))},a)),a.j=l}function Ym(a,l){const d=new Nr;if(o.Image){const p=new Image;p.onload=f(vt,d,"TestLoadImage: loaded",!0,l,p),p.onerror=f(vt,d,"TestLoadImage: error",!1,l,p),p.onabort=f(vt,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=f(vt,d,"TestLoadImage: timeout",!1,l,p),o.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Xm(a,l){const d=new Nr,p=new AbortController,A=setTimeout(()=>{p.abort(),vt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(b=>{clearTimeout(A),b.ok?vt(d,"TestPingServer: ok",!0,l):vt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),vt(d,"TestPingServer: error",!1,l)})}function vt(a,l,d,p,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),p(d)}catch{}}function Zm(){this.g=new Om}function ia(a){this.i=a.Sb||null,this.h=a.ab||!1}g(ia,Bu),ia.prototype.g=function(){return new ni(this.i,this.h)};function ni(a,l){ve.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(ni,ve),r=ni.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,jr(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,qr(this)),this.readyState=0},r.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,jr(this)),this.g&&(this.readyState=3,jr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;hl(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function hl(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}r.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?qr(this):jr(this),this.readyState==3&&hl(this)}},r.Oa=function(a){this.g&&(this.response=this.responseText=a,qr(this))},r.Na=function(a){this.g&&(this.response=a,qr(this))},r.ga=function(){this.g&&qr(this)};function qr(a){a.readyState=4,a.l=null,a.j=null,a.B=null,jr(a)}r.setRequestHeader=function(a,l){this.A.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function jr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ni.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function dl(a){let l="";return Qs(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function oa(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=dl(d),typeof a=="string"?d!=null&&xr(d):ie(a,l,d))}function ce(a){ve.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(ce,ve);var e_=/^https?$/i,t_=["POST","PUT"];r=ce.prototype,r.Fa=function(a){this.H=a},r.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Hu.g(),this.g.onreadystatechange=I(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(b){fl(this,b);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var A in p)d.set(A,p[A]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const b of p.keys())d.set(b,p.get(b));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(b=>b.toLowerCase()=="content-type"),A=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(t_,l,void 0)>=0)||p||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,D]of d)this.g.setRequestHeader(b,D);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(b){fl(this,b)}};function fl(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,pl(a),ri(a)}function pl(a){a.A||(a.A=!0,Ve(a,"complete"),Ve(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ve(this,"complete"),Ve(this,"abort"),ri(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ri(this,!0)),ce.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?gl(this):this.Xa())},r.Xa=function(){gl(this)};function gl(a){if(a.h&&typeof i<"u"){if(a.v&&At(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ve(a,"readystatechange"),At(a)==4){a.h=!1;try{const b=a.ca();e:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=b===0){let D=String(a.D).match(sl)[1]||null;!D&&o.self&&o.self.location&&(D=o.self.location.protocol.slice(0,-1)),p=!e_.test(D?D.toLowerCase():"")}d=p}if(d)Ve(a,"complete"),Ve(a,"success");else{a.o=6;try{var A=At(a)>2?a.g.statusText:""}catch{A=""}a.l=A+" ["+a.ca()+"]",pl(a)}}finally{ri(a)}}}}function ri(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||Ve(a,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function At(a){return a.g?a.g.readyState:0}r.ca=function(){try{return At(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),xm(l)}};function ml(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function n_(a){const l={};a=(a.g&&At(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(_(a[p]))continue;var d=Bm(a[p]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const b=l[A]||[];l[A]=b,b.push(d)}Pm(l,function(p){return p.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function $r(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function _l(a){this.za=0,this.i=[],this.j=new Nr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=$r("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=$r("baseRetryDelayMs",5e3,a),this.Za=$r("retryDelaySeedMs",1e4,a),this.Ta=$r("forwardChannelMaxRetries",2,a),this.va=$r("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Zu(a&&a.concurrentRequestLimit),this.Ba=new Zm,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=_l.prototype,r.ka=8,r.I=1,r.connect=function(a,l,d,p){ke(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=bl(this,null,this.W),ii(this)};function aa(a){if(yl(a),a.I==3){var l=a.V++,d=Ye(a.J);if(ie(d,"SID",a.M),ie(d,"RID",l),ie(d,"TYPE","terminate"),zr(a,d),l=new Tt(a,a.j,l),l.M=2,l.A=ti(Ye(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=Rl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),ei(l)}Sl(a)}function si(a){a.g&&(ua(a),a.g.cancel(),a.g=null)}function yl(a){si(a),a.v&&(o.clearTimeout(a.v),a.v=null),oi(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function ii(a){if(!el(a.h)&&!a.m){a.m=!0;var l=a.Ea;J||m(),Y||(J(),Y=!0),E.add(l,a),a.D=0}}function r_(a,l){return tl(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Dr(h(a.Ea,a,l),Al(a,a.D)),a.D++,!0)}r.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const A=new Tt(this,this.j,a);let b=this.o;if(this.U&&(b?(b=Vu(b),Du(b,this.U)):b=this.U),this.u!==null||this.R||(A.J=b,b=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=El(this,A,l),d=Ye(this.J),ie(d,"RID",a),ie(d,"CVER",22),this.G&&ie(d,"X-HTTP-Session-Id",this.G),zr(this,d),b&&(this.R?l="headers="+xr(dl(b))+"&"+l:this.u&&oa(d,this.u,b)),ra(this.h,A),this.Ra&&ie(d,"TYPE","init"),this.S?(ie(d,"$req",l),ie(d,"SID","null"),A.U=!0,Zo(A,d,null)):Zo(A,d,l),this.I=2}}else this.I==3&&(a?Il(this,a):this.i.length==0||el(this.h)||Il(this))};function Il(a,l){var d;l?d=l.l:d=a.V++;const p=Ye(a.J);ie(p,"SID",a.M),ie(p,"RID",d),ie(p,"AID",a.K),zr(a,p),a.u&&a.o&&oa(p,a.u,a.o),d=new Tt(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=El(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),ra(a.h,d),Zo(d,p,l)}function zr(a,l){a.H&&Qs(a.H,function(d,p){ie(l,p,d)}),a.l&&Qs({},function(d,p){ie(l,p,d)})}function El(a,l,d){d=Math.min(a.i.length,d);const p=a.l?h(a.l.Ka,a.l,a):null;e:{var A=a.i;let K=-1;for(;;){const me=["count="+d];K==-1?d>0?(K=A[0].g,me.push("ofs="+K)):K=0:me.push("ofs="+K);let ne=!0;for(let Ie=0;Ie<d;Ie++){var b=A[Ie].g;const Xe=A[Ie].map;if(b-=K,b<0)K=Math.max(0,A[Ie].g-100),ne=!1;else try{b="req"+b+"_"||"";try{var D=Xe instanceof Map?Xe:Object.entries(Xe);for(const[rn,St]of D){let bt=St;c(St)&&(bt=Wo(St)),me.push(b+rn+"="+encodeURIComponent(bt))}}catch(rn){throw me.push(b+"type="+encodeURIComponent("_badmap")),rn}}catch{p&&p(Xe)}}if(ne){D=me.join("&");break e}}D=void 0}return a=a.i.splice(0,d),l.G=a,D}function Tl(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;J||m(),Y||(J(),Y=!0),E.add(l,a),a.A=0}}function ca(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Dr(h(a.Da,a),Al(a,a.A)),a.A++,!0)}r.Da=function(){if(this.v=null,wl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Dr(h(this.Wa,this),a)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ke(10),si(this),wl(this))};function ua(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function wl(a){a.g=new Tt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=Ye(a.na);ie(l,"RID","rpc"),ie(l,"SID",a.M),ie(l,"AID",a.K),ie(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&ie(l,"TO",a.ia),ie(l,"TYPE","xmlhttp"),zr(a,l),a.u&&a.o&&oa(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=ti(Ye(l)),d.u=null,d.R=!0,Ju(d,a)}r.Va=function(){this.C!=null&&(this.C=null,si(this),ca(this),ke(19))};function oi(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function vl(a,l){var d=null;if(a.g==l){oi(a),ua(a),a.g=null;var p=2}else if(na(a.h,l))d=l.G,nl(a.h,l),p=1;else return;if(a.I!=0){if(l.o)if(p==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var A=a.D;p=Xs(),Ve(p,new Ku(p,d)),ii(a)}else Tl(a);else if(A=l.m,A==3||A==0&&l.X>0||!(p==1&&r_(a,l)||p==2&&ca(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),A){case 1:nn(a,5);break;case 4:nn(a,10);break;case 3:nn(a,6);break;default:nn(a,2)}}}function Al(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function nn(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),p=a.Ua;const A=!p;p=new wt(p||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Mr(p,"https"),ti(p),A?Ym(p.toString(),d):Xm(p.toString(),d)}else ke(2);a.I=0,a.l&&a.l.pa(l),Sl(a),yl(a)}r.bb=function(a){a?(this.j.info("Successfully pinged google.com"),ke(2)):(this.j.info("Failed to ping google.com"),ke(1))};function Sl(a){if(a.I=0,a.ja=[],a.l){const l=rl(a.h);(l.length!=0||a.i.length!=0)&&(V(a.ja,l),V(a.ja,a.i),a.h.i.length=0,R(a.i),a.i.length=0),a.l.oa()}}function bl(a,l,d){var p=d instanceof wt?Ye(d):new wt(d);if(p.g!="")l&&(p.g=l+"."+p.g),Lr(p,p.u);else{var A=o.location;p=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;const b=new wt(null);p&&Mr(b,p),l&&(b.g=l),A&&Lr(b,A),d&&(b.h=d),p=b}return d=a.G,l=a.wa,d&&l&&ie(p,d,l),ie(p,"VER",a.ka),zr(a,p),p}function Rl(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new ce(new ia({ab:d})):new ce(a.ma),l.Fa(a.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Pl(){}r=Pl.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function ai(){}ai.prototype.g=function(a,l){return new Le(a,l)};function Le(a,l){ve.call(this),this.g=new _l(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!_(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!_(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Ln(this)}g(Le,ve),Le.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Le.prototype.close=function(){aa(this.g)},Le.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Wo(a),a=d);l.i.push(new $m(l.Ya++,a)),l.I==3&&ii(l)},Le.prototype.N=function(){this.g.l=null,delete this.j,aa(this.g),delete this.g,Le.Z.N.call(this)};function Cl(a){Qo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}g(Cl,Qo);function Vl(){Jo.call(this),this.status=1}g(Vl,Jo);function Ln(a){this.g=a}g(Ln,Pl),Ln.prototype.ra=function(){Ve(this.g,"a")},Ln.prototype.qa=function(a){Ve(this.g,new Cl(a))},Ln.prototype.pa=function(a){Ve(this.g,new Vl)},Ln.prototype.oa=function(){Ve(this.g,"b")},ai.prototype.createWebChannel=ai.prototype.g,Le.prototype.send=Le.prototype.o,Le.prototype.open=Le.prototype.m,Le.prototype.close=Le.prototype.close,Bf=function(){return new ai},Uf=function(){return Xs()},Ff=Zt,qa={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Zs.NO_ERROR=0,Zs.TIMEOUT=8,Zs.HTTP_ERROR=6,Ti=Zs,Gu.COMPLETE="complete",Lf=Gu,qu.EventType=Vr,Vr.OPEN="a",Vr.CLOSE="b",Vr.ERROR="c",Vr.MESSAGE="d",ve.prototype.listen=ve.prototype.J,Zr=qu,ce.prototype.listenOnce=ce.prototype.K,ce.prototype.getLastError=ce.prototype.Ha,ce.prototype.getLastErrorCode=ce.prototype.ya,ce.prototype.getStatus=ce.prototype.ca,ce.prototype.getResponseJson=ce.prototype.La,ce.prototype.getResponseText=ce.prototype.la,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Fa,Mf=ce}).apply(typeof li<"u"?li:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class Se{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Se.UNAUTHENTICATED=new Se(null),Se.GOOGLE_CREDENTIALS=new Se("google-credentials-uid"),Se.FIRST_PARTY=new Se("first-party-uid"),Se.MOCK_USER=new Se("mock-user");/**
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
 */let Ar="12.12.0";function zE(r){Ar=r}/**
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
 */const wn=new _c("@firebase/firestore");function zn(){return wn.logLevel}function C(r,...e){if(wn.logLevel<=H.DEBUG){const t=e.map(Rc);wn.debug(`Firestore (${Ar}): ${r}`,...t)}}function de(r,...e){if(wn.logLevel<=H.ERROR){const t=e.map(Rc);wn.error(`Firestore (${Ar}): ${r}`,...t)}}function tr(r,...e){if(wn.logLevel<=H.WARN){const t=e.map(Rc);wn.warn(`Firestore (${Ar}): ${r}`,...t)}}function Rc(r){if(typeof r=="string")return r;try{return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
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
 */function M(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,qf(r,n,t)}function qf(r,e,t){let n=`FIRESTORE (${Ar}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw de(n),new Error(n)}function F(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||qf(e,s,n)}function L(r,e){return r}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends ut{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class He{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class KE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class GE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Se.UNAUTHENTICATED))}shutdown(){}}class HE{constructor(e){this.t=e,this.currentUser=Se.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0,42304);let n=this.i;const s=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let i=new He;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new He,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new He)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string",31837,{l:n}),new KE(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string",2055,{h:e}),new Se(e)}}class WE{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Se.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class QE{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new WE(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Se.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ch{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class JE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ke(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){F(this.o===void 0,3512);const n=i=>{i.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,C("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>n(i))};const s=i=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ch(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(F(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ch(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function YE(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
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
 */class Pc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=YE(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function q(r,e){return r<e?-1:r>e?1:0}function ja(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return Ia(s)===Ia(i)?q(s,i):Ia(s)?1:-1}return q(r.length,e.length)}const XE=55296,ZE=57343;function Ia(r){const e=r.charCodeAt(0);return e>=XE&&e<=ZE}function nr(r,e,t){return r.length===e.length&&r.every((n,s)=>t(n,e[s]))}function jf(r){return r+"\0"}/**
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
 */const $a="__name__";class Ze{constructor(e,t,n){t===void 0?t=0:t>e.length&&M(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&M(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Ze.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ze?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=Ze.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return q(e.length,t.length)}static compareSegments(e,t){const n=Ze.isNumericId(e),s=Ze.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?Ze.extractNumericId(e).compare(Ze.extractNumericId(t)):ja(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Bt.fromString(e.substring(4,e.length-2))}}class X extends Ze{construct(e,t,n){return new X(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new k(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(s=>s.length>0))}return new X(t)}static emptyPath(){return new X([])}}const eT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ae extends Ze{construct(e,t,n){return new ae(e,t,n)}static isValidIdentifier(e){return eT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ae.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===$a}static keyField(){return new ae([$a])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new k(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new k(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new k(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(n+=c,s++):(i(),s++)}if(i(),o)throw new k(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ae(t)}static emptyPath(){return new ae([])}}/**
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
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(X.fromString(e))}static fromName(e){return new O(X.fromString(e).popFirst(5))}static empty(){return new O(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new X(e.slice()))}}/**
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
 */function $f(r,e,t){if(!t)throw new k(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function tT(r,e,t,n){if(e===!0&&n===!0)throw new k(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function uh(r){if(!O.isDocumentKey(r))throw new k(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function lh(r){if(O.isDocumentKey(r))throw new k(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function zf(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function po(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function Me(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new k(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=po(r);throw new k(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
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
 */function ge(r,e){const t={typeString:r};return e&&(t.value=e),t}function Ls(r,e){if(!zf(r))throw new k(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new k(P.INVALID_ARGUMENT,t);return!0}/**
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
 */const hh=-62135596800,dh=1e6;class Z{static now(){return Z.fromMillis(Date.now())}static fromDate(e){return Z.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*dh);return new Z(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<hh)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/dh}_compareTo(e){return this.seconds===e.seconds?q(this.nanoseconds,e.nanoseconds):q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Z._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ls(e,Z._jsonSchema))return new Z(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-hh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:ge("string",Z._jsonSchemaVersion),seconds:ge("number"),nanoseconds:ge("number")};/**
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
 */class U{static fromTimestamp(e){return new U(e)}static min(){return new U(new Z(0,0))}static max(){return new U(new Z(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const rr=-1;class Bi{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function za(r){return r.fields.find(e=>e.kind===2)}function an(r){return r.fields.filter(e=>e.kind!==2)}Bi.UNKNOWN_ID=-1;class wi{constructor(e,t){this.fieldPath=e,this.kind=t}}class _s{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new _s(0,qe.min())}}function Kf(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=U.fromTimestamp(n===1e9?new Z(t+1,0):new Z(t,n));return new qe(s,O.empty(),e)}function Gf(r){return new qe(r.readTime,r.key,rr)}class qe{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new qe(U.min(),O.empty(),rr)}static max(){return new qe(U.max(),O.empty(),rr)}}function Cc(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(r.documentKey,e.documentKey),t!==0?t:q(r.largestBatchId,e.largestBatchId))}/**
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
 */const Hf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Wf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Wt(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Hf)throw r;C("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class v{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new v((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof v?t:v.resolve(t)}catch(t){return v.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):v.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):v.reject(t)}static resolve(e){return new v((t,n)=>{t(e)})}static reject(e){return new v((t,n)=>{n(e)})}static waitFor(e){return new v((t,n)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},u=>n(u))}),o=!0,i===s&&t()})}static or(e){let t=v.resolve(!1);for(const n of e)t=t.next(s=>s?v.resolve(s):n());return t}static forEach(e,t){const n=[];return e.forEach((s,i)=>{n.push(t.call(this,s,i))}),this.waitFor(n)}static mapArray(e,t){return new v((n,s)=>{const i=e.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next(f=>{o[h]=f,++c,c===i&&n(o)},f=>s(f))}})}static doWhile(e,t){return new v((n,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):n()};i()})}}/**
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
 */const Fe="SimpleDb";class go{static open(e,t,n,s){try{return new go(t,e.transaction(s,n))}catch(i){throw new is(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new He,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new is(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=Vc(n.target.error);this.S.reject(new is(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(C(Fe,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new rT(t)}}class qt{static delete(e){return C(Fe,"Removing database:",e),un(jd().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!mc())return!1;if(qt.F())return!0;const e=_e(),t=qt.M(e),n=0<t&&t<10,s=Qf(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,qt.M(_e())===12.2&&de("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(C(Fe,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new is(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new k(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new k(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new is(e,o))},s.onupgradeneeded=i=>{C(Fe,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next(()=>{C(Fe,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=go.open(this.db,e,i?"readonly":"readwrite",n),u=s(c).next(h=>(c.C(),h)).catch(h=>(c.abort(h),v.reject(h))).toPromise();return u.catch(()=>{}),await c.D,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&o<3;if(C(Fe,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Qf(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class nT{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return un(this.U.delete())}}class is extends k{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Qt(r){return r.name==="IndexedDbTransactionError"}class rT{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(C(Fe,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(C(Fe,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),un(n)}add(e){return C(Fe,"ADD",this.store.name,e,e),un(this.store.add(e))}get(e){return un(this.store.get(e)).next(t=>(t===void 0&&(t=null),C(Fe,"GET",this.store.name,e,t),t))}delete(e){return C(Fe,"DELETE",this.store.name,e),un(this.store.delete(e))}count(){return C(Fe,"COUNT",this.store.name),un(this.store.count())}J(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v((o,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{o(u.target.result)}})}{const i=this.cursor(n),o=[];return this.H(i,(c,u)=>{o.push(u)}).next(()=>o)}}Z(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new v((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}})}X(e,t){C(Fe,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const s=this.cursor(n);return this.H(s,(i,o,c)=>c.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.H(s,t)}te(e){const t=this.cursor({});return new v((n,s)=>{t.onerror=i=>{const o=Vc(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():n()}):n()}})}H(e,t){const n=[];return new v((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const u=new nT(c),h=t(c.primaryKey,c.value,u);if(h instanceof v){const f=h.catch(g=>(u.done(),v.reject(g)));n.push(f)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}}).next(()=>v.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function un(r){return new v((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=Vc(n.target.error);t(s)}})}let fh=!1;function Vc(r){const e=qt.M(_e());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new k("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return fh||(fh=!0,setTimeout(()=>{throw n},0)),n}}return r}const os="IndexBackfiller";class sT{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){C(os,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ne.ie();C(os,`Documents written: ${t}`)}catch(t){Qt(t)?C(os,"Ignoring IndexedDB error during index backfill: ",t):await Wt(t)}await this.re(6e4)})}}class iT{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let s=t,i=!0;return v.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return C(os,`Processing collection: ${o}`),this.oe(e,o,s).next(c=>{s-=c,n.add(o)});i=!1})).next(()=>t-s)}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this._e(s,i)).next(c=>(C(os,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}_e(e,t){let n=e;return t.changes.forEach((s,i)=>{const o=Gf(i);Cc(o,n)>0&&(n=o)}),new qe(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class xe{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}xe.ce=-1;/**
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
 */const gn=-1;function mo(r){return r==null}function ys(r){return r===0&&1/r==-1/0}function Jf(r){return typeof r=="number"&&Number.isInteger(r)&&!ys(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const qi="";function Pe(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=ph(e)),e=oT(r.get(t),e);return ph(e)}function oT(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case qi:t+="";break;default:t+=i}}return t}function ph(r){return r+qi+""}function tt(r){const e=r.length;if(F(e>=2,64408,{path:r}),e===2)return F(r.charAt(0)===qi&&r.charAt(1)==="",56145,{path:r}),X.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(qi,i);switch((o<0||o>t)&&M(50515,{path:r}),r.charAt(o+1)){case"":const c=r.substring(i,o);let u;s.length===0?u=c:(s+=c,u=s,s=""),n.push(u);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:M(61167,{path:r})}i=o+2}return new X(n)}/**
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
 */const cn="remoteDocuments",Fs="owner",Fn="owner",Is="mutationQueues",aT="userId",ze="mutations",gh="batchId",fn="userMutationsIndex",mh=["userId","batchId"];/**
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
 */function vi(r,e){return[r,Pe(e)]}function Yf(r,e,t){return[r,Pe(e),t]}const cT={},sr="documentMutations",ji="remoteDocumentsV14",uT=["prefixPath","collectionGroup","readTime","documentId"],Ai="documentKeyIndex",lT=["prefixPath","collectionGroup","documentId"],Xf="collectionGroupIndex",hT=["collectionGroup","readTime","prefixPath","documentId"],Es="remoteDocumentGlobal",Ka="remoteDocumentGlobalKey",ir="targets",Zf="queryTargetsIndex",dT=["canonicalId","targetId"],or="targetDocuments",fT=["targetId","path"],kc="documentTargetsIndex",pT=["path","targetId"],$i="targetGlobalKey",mn="targetGlobal",Ts="collectionParents",gT=["collectionId","parent"],ar="clientMetadata",mT="clientId",_o="bundles",_T="bundleId",yo="namedQueries",yT="name",Dc="indexConfiguration",IT="indexId",Ga="collectionGroupIndex",ET="collectionGroup",as="indexState",TT=["indexId","uid"],ep="sequenceNumberIndex",wT=["uid","sequenceNumber"],cs="indexEntries",vT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],tp="documentKeyIndex",AT=["indexId","uid","orderedDocumentKey"],Io="documentOverlays",ST=["userId","collectionPath","documentId"],Ha="collectionPathOverlayIndex",bT=["userId","collectionPath","largestBatchId"],np="collectionGroupOverlayIndex",RT=["userId","collectionGroup","largestBatchId"],Nc="globals",PT="name",rp=[Is,ze,sr,cn,ir,Fs,mn,or,ar,Es,Ts,_o,yo],CT=[...rp,Io],sp=[Is,ze,sr,ji,ir,Fs,mn,or,ar,Es,Ts,_o,yo,Io],ip=sp,xc=[...ip,Dc,as,cs],VT=xc,op=[...xc,Nc],kT=op;/**
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
 */class Wa extends Wf{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function ye(r,e){const t=L(r);return qt.O(t.le,e)}/**
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
 */function _h(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Jt(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function DT(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function ap(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
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
 */class re{constructor(e,t){this.comparator=e,this.root=t||Te.EMPTY}insert(e,t){return new re(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Te.BLACK,null,null))}remove(e){return new re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Te.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new hi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new hi(this.root,e,this.comparator,!1)}getReverseIterator(){return new hi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new hi(this.root,e,this.comparator,!0)}}class hi{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Te{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Te.RED,this.left=s??Te.EMPTY,this.right=i??Te.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Te(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Te.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Te.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Te.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Te.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}}Te.EMPTY=null,Te.RED=!0,Te.BLACK=!1;Te.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Te(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class te{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new yh(this.data.getIterator())}getIteratorFrom(e){return new yh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof te)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new te(this.comparator);return t.data=e,t}}class yh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Un(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class Oe{constructor(e){this.fields=e,e.sort(ae.comparator)}static empty(){return new Oe([])}unionWith(e){let t=new te(ae.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Oe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return nr(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
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
 */class cp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class fe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new cp("Invalid base64 string: "+i):i}}(e);return new fe(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new fe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}fe.EMPTY_BYTE_STRING=new fe("");const NT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function _t(r){if(F(!!r,39018),typeof r=="string"){let e=0;const t=NT.exec(r);if(F(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:oe(r.seconds),nanos:oe(r.nanos)}}function oe(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function yt(r){return typeof r=="string"?fe.fromBase64String(r):fe.fromUint8Array(r)}/**
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
 */const up="server_timestamp",lp="__type__",hp="__previous_value__",dp="__local_write_time__";function Oc(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[lp])==null?void 0:n.stringValue)===up}function Eo(r){const e=r.mapValue.fields[hp];return Oc(e)?Eo(e):e}function ws(r){const e=_t(r.mapValue.fields[dp].timestampValue);return new Z(e.seconds,e.nanos)}/**
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
 */class xT{constructor(e,t,n,s,i,o,c,u,h,f,g){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=g}}const zi="(default)";class vn{constructor(e,t){this.projectId=e,this.database=t||zi}static empty(){return new vn("","")}get isDefaultDatabase(){return this.database===zi}isEqual(e){return e instanceof vn&&e.projectId===this.projectId&&e.database===this.database}}function OT(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new k(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vn(r.options.projectId,e)}/**
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
 */const Mc="__type__",fp="__max__",Lt={mapValue:{fields:{__type__:{stringValue:fp}}}},Lc="__vector__",cr="value",Si={nullValue:"NULL_VALUE"};function $t(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Oc(r)?4:pp(r)?9007199254740991:To(r)?10:11:M(28295,{value:r})}function at(r,e){if(r===e)return!0;const t=$t(r);if(t!==$t(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return ws(r).isEqual(ws(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=_t(s.timestampValue),c=_t(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(s,i){return yt(s.bytesValue).isEqual(yt(i.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(s,i){return oe(s.geoPointValue.latitude)===oe(i.geoPointValue.latitude)&&oe(s.geoPointValue.longitude)===oe(i.geoPointValue.longitude)}(r,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return oe(s.integerValue)===oe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=oe(s.doubleValue),c=oe(i.doubleValue);return o===c?ys(o)===ys(c):isNaN(o)&&isNaN(c)}return!1}(r,e);case 9:return nr(r.arrayValue.values||[],e.arrayValue.values||[],at);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(_h(o)!==_h(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!at(o[u],c[u])))return!1;return!0}(r,e);default:return M(52216,{left:r})}}function vs(r,e){return(r.values||[]).find(t=>at(t,e))!==void 0}function zt(r,e){if(r===e)return 0;const t=$t(r),n=$t(e);if(t!==n)return q(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return q(r.booleanValue,e.booleanValue);case 2:return function(i,o){const c=oe(i.integerValue||i.doubleValue),u=oe(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(r,e);case 3:return Ih(r.timestampValue,e.timestampValue);case 4:return Ih(ws(r),ws(e));case 5:return ja(r.stringValue,e.stringValue);case 6:return function(i,o){const c=yt(i),u=yt(o);return c.compareTo(u)}(r.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=q(c[h],u[h]);if(f!==0)return f}return q(c.length,u.length)}(r.referenceValue,e.referenceValue);case 8:return function(i,o){const c=q(oe(i.latitude),oe(o.latitude));return c!==0?c:q(oe(i.longitude),oe(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Eh(r.arrayValue,e.arrayValue);case 10:return function(i,o){var I,R,V,x;const c=i.fields||{},u=o.fields||{},h=(I=c[cr])==null?void 0:I.arrayValue,f=(R=u[cr])==null?void 0:R.arrayValue,g=q(((V=h==null?void 0:h.values)==null?void 0:V.length)||0,((x=f==null?void 0:f.values)==null?void 0:x.length)||0);return g!==0?g:Eh(h,f)}(r.mapValue,e.mapValue);case 11:return function(i,o){if(i===Lt.mapValue&&o===Lt.mapValue)return 0;if(i===Lt.mapValue)return 1;if(o===Lt.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let g=0;g<u.length&&g<f.length;++g){const I=ja(u[g],f[g]);if(I!==0)return I;const R=zt(c[u[g]],h[f[g]]);if(R!==0)return R}return q(u.length,f.length)}(r.mapValue,e.mapValue);default:throw M(23264,{he:t})}}function Ih(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return q(r,e);const t=_t(r),n=_t(e),s=q(t.seconds,n.seconds);return s!==0?s:q(t.nanos,n.nanos)}function Eh(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=zt(t[s],n[s]);if(i)return i}return q(t.length,n.length)}function ur(r){return Qa(r)}function Qa(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=_t(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return yt(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return O.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Qa(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${Qa(t.fields[o])}`;return s+"}"}(r.mapValue):M(61005,{value:r})}function bi(r){switch($t(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Eo(r);return e?16+bi(e):16;case 5:return 2*r.stringValue.length;case 6:return yt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+bi(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return Jt(n.fields,(i,o)=>{s+=i.length+bi(o)}),s}(r.mapValue);default:throw M(13486,{value:r})}}function As(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Ja(r){return!!r&&"integerValue"in r}function Ss(r){return!!r&&"arrayValue"in r}function Th(r){return!!r&&"nullValue"in r}function wh(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ri(r){return!!r&&"mapValue"in r}function To(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Mc])==null?void 0:n.stringValue)===Lc}function us(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return Jt(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=us(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=us(r.arrayValue.values[t]);return e}return{...r}}function pp(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===fp}const gp={mapValue:{fields:{[Mc]:{stringValue:Lc},[cr]:{arrayValue:{}}}}};function MT(r){return"nullValue"in r?Si:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?As(vn.empty(),O.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?To(r)?gp:{mapValue:{}}:M(35942,{value:r})}function LT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?As(vn.empty(),O.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?gp:"mapValue"in r?To(r)?{mapValue:{}}:Lt:M(61959,{value:r})}function vh(r,e){const t=zt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Ah(r,e){const t=zt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
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
 */class we{constructor(e){this.value=e}static empty(){return new we({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Ri(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=us(t)}setAll(e){let t=ae.emptyPath(),n={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=c.popLast()}o?n[c.lastSegment()]=us(o):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Ri(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return at(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Ri(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Jt(t,(s,i)=>e[s]=i);for(const s of n)delete e[s]}clone(){return new we(us(this.value))}}function mp(r){const e=[];return Jt(r.fields,(t,n)=>{const s=new ae([t]);if(Ri(n)){const i=mp(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Oe(e)}/**
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
 */class ue{constructor(e,t,n,s,i,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new ue(e,0,U.min(),U.min(),U.min(),we.empty(),0)}static newFoundDocument(e,t,n,s){return new ue(e,1,t,U.min(),n,s,0)}static newNoDocument(e,t){return new ue(e,2,t,U.min(),U.min(),we.empty(),0)}static newUnknownDocument(e,t){return new ue(e,3,t,U.min(),U.min(),we.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=we.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=we.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ue&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ue(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class lr{constructor(e,t){this.position=e,this.inclusive=t}}function Sh(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=O.comparator(O.fromName(o.referenceValue),t.key):n=zt(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function bh(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!at(r.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ki{constructor(e,t="asc"){this.field=e,this.dir=t}}function FT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
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
 */class _p{}class W extends _p{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new UT(e,t,n):t==="array-contains"?new jT(e,n):t==="in"?new vp(e,n):t==="not-in"?new $T(e,n):t==="array-contains-any"?new zT(e,n):new W(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new BT(e,n):new qT(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(zt(t,this.value)):t!==null&&$t(this.value)===$t(t)&&this.matchesComparison(zt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ee extends _p{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ee(e,t)}matches(e){return hr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function hr(r){return r.op==="and"}function Ya(r){return r.op==="or"}function Fc(r){return yp(r)&&hr(r)}function yp(r){for(const e of r.filters)if(e instanceof ee)return!1;return!0}function Xa(r){if(r instanceof W)return r.field.canonicalString()+r.op.toString()+ur(r.value);if(Fc(r))return r.filters.map(e=>Xa(e)).join(",");{const e=r.filters.map(t=>Xa(t)).join(",");return`${r.op}(${e})`}}function Ip(r,e){return r instanceof W?function(n,s){return s instanceof W&&n.op===s.op&&n.field.isEqual(s.field)&&at(n.value,s.value)}(r,e):r instanceof ee?function(n,s){return s instanceof ee&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,o,c)=>i&&Ip(o,s.filters[c]),!0):!1}(r,e):void M(19439)}function Ep(r,e){const t=r.filters.concat(e);return ee.create(t,r.op)}function Tp(r){return r instanceof W?function(t){return`${t.field.canonicalString()} ${t.op} ${ur(t.value)}`}(r):r instanceof ee?function(t){return t.op.toString()+" {"+t.getFilters().map(Tp).join(" ,")+"}"}(r):"Filter"}class UT extends W{constructor(e,t,n){super(e,t,n),this.key=O.fromName(n.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class BT extends W{constructor(e,t){super(e,"in",t),this.keys=wp("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class qT extends W{constructor(e,t){super(e,"not-in",t),this.keys=wp("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function wp(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(n=>O.fromName(n.referenceValue))}class jT extends W{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ss(t)&&vs(t.arrayValue,this.value)}}class vp extends W{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&vs(this.value.arrayValue,t)}}class $T extends W{constructor(e,t){super(e,"not-in",t)}matches(e){if(vs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!vs(this.value.arrayValue,t)}}class zT extends W{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ss(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>vs(this.value.arrayValue,n))}}/**
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
 */class KT{constructor(e,t=null,n=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function Za(r,e=null,t=[],n=[],s=null,i=null,o=null){return new KT(r,e,t,n,s,i,o)}function An(r){const e=L(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>Xa(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),mo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>ur(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>ur(n)).join(",")),e.Te=t}return e.Te}function Us(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!FT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Ip(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!bh(r.startAt,e.startAt)&&bh(r.endAt,e.endAt)}function Gi(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Hi(r,e){return r.filters.filter(t=>t instanceof W&&t.field.isEqual(e))}function Rh(r,e,t){let n=Si,s=!0;for(const i of Hi(r,e)){let o=Si,c=!0;switch(i.op){case"<":case"<=":o=MT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Si}vh({value:n,inclusive:s},{value:o,inclusive:c})<0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];vh({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function Ph(r,e,t){let n=Lt,s=!0;for(const i of Hi(r,e)){let o=Lt,c=!0;switch(i.op){case">=":case">":o=LT(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=Lt}Ah({value:n,inclusive:s},{value:o,inclusive:c})>0&&(n=o,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Ah({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class Bs{constructor(e,t=null,n=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Ap(r,e,t,n,s,i,o,c){return new Bs(r,e,t,n,s,i,o,c)}function qs(r){return new Bs(r)}function Ch(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function GT(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Sp(r){return r.collectionGroup!==null}function ls(r){const e=L(r);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new te(ae.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new Ki(i,n))}),t.has(ae.keyField().canonicalString())||e.Ee.push(new Ki(ae.keyField(),n))}return e.Ee}function Be(r){const e=L(r);return e.Ie||(e.Ie=bp(e,ls(r))),e.Ie}function HT(r){const e=L(r);return e.Re||(e.Re=bp(e,r.explicitOrderBy)),e.Re}function bp(r,e){if(r.limitType==="F")return Za(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ki(s.field,i)});const t=r.endAt?new lr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new lr(r.startAt.position,r.startAt.inclusive):null;return Za(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function ec(r,e){const t=r.filters.concat([e]);return new Bs(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function tc(r,e,t){return new Bs(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function wo(r,e){return Us(Be(r),Be(e))&&r.limitType===e.limitType}function Rp(r){return`${An(Be(r))}|lt:${r.limitType}`}function Kn(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(s=>Tp(s)).join(", ")}]`),mo(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(s=>ur(s)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(s=>ur(s)).join(",")),`Target(${n})`}(Be(r))}; limitType=${r.limitType})`}function js(r,e){return e.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):O.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,e)&&function(n,s){for(const i of ls(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,e)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,e)&&function(n,s){return!(n.startAt&&!function(o,c,u){const h=Sh(o,c,u);return o.inclusive?h<=0:h<0}(n.startAt,ls(n),s)||n.endAt&&!function(o,c,u){const h=Sh(o,c,u);return o.inclusive?h>=0:h>0}(n.endAt,ls(n),s))}(r,e)}function Pp(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Cp(r){return(e,t)=>{let n=!1;for(const s of ls(r)){const i=WT(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function WT(r,e,t){const n=r.field.isKeyField()?O.comparator(e.key,t.key):function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?zt(u,h):M(42886)}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
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
 */class It{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Jt(this.inner,(t,n)=>{for(const[s,i]of n)e(s,i)})}isEmpty(){return ap(this.inner)}size(){return this.innerSize}}/**
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
 */const QT=new re(O.comparator);function Ue(){return QT}const Vp=new re(O.comparator);function es(...r){let e=Vp;for(const t of r)e=e.insert(t.key,t);return e}function kp(r){let e=Vp;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function nt(){return hs()}function Dp(){return hs()}function hs(){return new It(r=>r.toString(),(r,e)=>r.isEqual(e))}const JT=new re(O.comparator),YT=new te(O.comparator);function G(...r){let e=YT;for(const t of r)e=e.add(t);return e}const XT=new te(q);function Uc(){return XT}/**
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
 */function Bc(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ys(e)?"-0":e}}function Np(r){return{integerValue:""+r}}function ZT(r,e){return Jf(e)?Np(e):Bc(r,e)}/**
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
 */class vo{constructor(){this._=void 0}}function ew(r,e,t){return r instanceof bs?function(s,i){const o={fields:{[lp]:{stringValue:up},[dp]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Oc(i)&&(i=Eo(i)),i&&(o.fields[hp]=i),{mapValue:o}}(t,e):r instanceof dr?Op(r,e):r instanceof fr?Mp(r,e):function(s,i){const o=xp(s,i),c=Vh(o)+Vh(s.Ae);return Ja(o)&&Ja(s.Ae)?Np(c):Bc(s.serializer,c)}(r,e)}function tw(r,e,t){return r instanceof dr?Op(r,e):r instanceof fr?Mp(r,e):t}function xp(r,e){return r instanceof Rs?function(n){return Ja(n)||function(i){return!!i&&"doubleValue"in i}(n)}(e)?e:{integerValue:0}:null}class bs extends vo{}class dr extends vo{constructor(e){super(),this.elements=e}}function Op(r,e){const t=Lp(e);for(const n of r.elements)t.some(s=>at(s,n))||t.push(n);return{arrayValue:{values:t}}}class fr extends vo{constructor(e){super(),this.elements=e}}function Mp(r,e){let t=Lp(e);for(const n of r.elements)t=t.filter(s=>!at(s,n));return{arrayValue:{values:t}}}class Rs extends vo{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Vh(r){return oe(r.integerValue||r.doubleValue)}function Lp(r){return Ss(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class nw{constructor(e,t){this.field=e,this.transform=t}}function rw(r,e){return r.field.isEqual(e.field)&&function(n,s){return n instanceof dr&&s instanceof dr||n instanceof fr&&s instanceof fr?nr(n.elements,s.elements,at):n instanceof Rs&&s instanceof Rs?at(n.Ae,s.Ae):n instanceof bs&&s instanceof bs}(r.transform,e.transform)}class sw{constructor(e,t){this.version=e,this.transformResults=t}}class Re{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Re}static exists(e){return new Re(void 0,e)}static updateTime(e){return new Re(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Pi(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Ao{}function Fp(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new So(r.key,Re.none()):new Sr(r.key,r.data,Re.none());{const t=r.data,n=we.empty();let s=new te(ae.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new Et(r.key,n,new Oe(s.toArray()),Re.none())}}function iw(r,e,t){r instanceof Sr?function(s,i,o){const c=s.value.clone(),u=Dh(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):r instanceof Et?function(s,i,o){if(!Pi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Dh(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(Up(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(r,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ds(r,e,t,n){return r instanceof Sr?function(i,o,c,u){if(!Pi(i.precondition,o))return c;const h=i.value.clone(),f=Nh(i.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(r,e,t,n):r instanceof Et?function(i,o,c,u){if(!Pi(i.precondition,o))return c;const h=Nh(i.fieldTransforms,u,o),f=o.data;return f.setAll(Up(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(r,e,t,n):function(i,o,c){return Pi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(r,e,t)}function ow(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=xp(n.transform,s||null);i!=null&&(t===null&&(t=we.empty()),t.set(n.field,i))}return t||null}function kh(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&nr(n,s,(i,o)=>rw(i,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class Sr extends Ao{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Et extends Ao{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Up(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function Dh(r,e,t){const n=new Map;F(r.length===t.length,32656,{Ve:t.length,de:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,c=e.data.field(i.field);n.set(i.field,tw(o,c,t[s]))}return n}function Nh(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,ew(i,o,e))}return n}class So extends Ao{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Bp extends Ao{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class qc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&iw(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ds(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ds(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Dp();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const u=Fp(o,c);u!==null&&n.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(U.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),G())}isEqual(e){return this.batchId===e.batchId&&nr(this.mutations,e.mutations,(t,n)=>kh(t,n))&&nr(this.baseMutations,e.baseMutations,(t,n)=>kh(t,n))}}class jc{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){F(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=function(){return JT}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new jc(e,t,n,s)}}/**
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
 */class $c{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class aw{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
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
 */class cw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var pe,Q;function uw(r){switch(r){case P.OK:return M(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function qp(r){if(r===void 0)return de("GRPC error has no .code"),P.UNKNOWN;switch(r){case pe.OK:return P.OK;case pe.CANCELLED:return P.CANCELLED;case pe.UNKNOWN:return P.UNKNOWN;case pe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case pe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case pe.INTERNAL:return P.INTERNAL;case pe.UNAVAILABLE:return P.UNAVAILABLE;case pe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case pe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case pe.NOT_FOUND:return P.NOT_FOUND;case pe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case pe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case pe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case pe.ABORTED:return P.ABORTED;case pe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case pe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case pe.DATA_LOSS:return P.DATA_LOSS;default:return M(39323,{code:r})}}(Q=pe||(pe={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function lw(){return new TextEncoder}/**
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
 */const hw=new Bt([4294967295,4294967295],0);function xh(r){const e=lw().encode(r),t=new Of;return t.update(e),new Uint8Array(t.digest())}function Oh(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Bt([t,n],0),new Bt([s,i],0)]}class zc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new ts(`Invalid padding: ${t}`);if(n<0)throw new ts(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new ts(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new ts(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Bt.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(Bt.fromNumber(n)));return s.compare(hw)===1&&(s=new Bt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=xh(e),[n,s]=Oh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);if(!this.we(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new zc(i,s,t);return n.forEach(c=>o.insert(c)),o}insert(e){if(this.ge===0)return;const t=xh(e),[n,s]=Oh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(n,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class ts extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class $s{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,zs.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new $s(U.min(),s,new re(q),Ue(),G())}}class zs{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new zs(n,t,G(),G(),G())}}/**
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
 */class Ci{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class jp{constructor(e,t){this.targetId=e,this.Ce=t}}class $p{constructor(e,t,n=fe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Mh{constructor(){this.ve=0,this.Fe=Lh(),this.Me=fe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=G(),t=G(),n=G();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:M(38017,{changeType:i})}}),new zs(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Lh()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,F(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class dw{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ue(),this.Je=di(),this.He=di(),this.Ze=new re(q)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:M(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((n,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Gi(i))if(n===0){const o=new O(i.path);this.et(t,o,ue.newNoDocument(o,U.min()))}else F(n===1,20013,{expectedCount:n});else{const o=this._t(t);if(o!==n){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=yt(n).toUint8Array()}catch(u){if(u instanceof cp)return tr("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new zc(o,s,i)}catch(u){return tr(u instanceof ts?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach(i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,o)=>{const c=this.ot(o);if(c){if(i.current&&Gi(c.target)){const u=new O(c.target.path);this.Et(u).has(o)||this.It(o,u)||this.et(o,u,ue.newNoDocument(u,e))}i.Be&&(t.set(o,i.ke()),i.qe())}});let n=G();this.He.forEach((i,o)=>{let c=!0;o.forEachWhile(u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(i))}),this.je.forEach((i,o)=>o.setReadTime(e));const s=new $s(e,t,this.Ze,this.je,n);return this.je=Ue(),this.Je=di(),this.He=di(),this.Ze=new re(q),s}Ye(e,t){if(!this.rt(e))return;const n=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Mh,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new te(q),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new te(q),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||C("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Mh),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function di(){return new re(O.comparator)}function Lh(){return new re(O.comparator)}const fw={asc:"ASCENDING",desc:"DESCENDING"},pw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gw={and:"AND",or:"OR"};class mw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function nc(r,e){return r.useProto3Json||mo(e)?e:{value:e}}function pr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function zp(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function _w(r,e){return pr(r,e.toTimestamp())}function De(r){return F(!!r,49232),U.fromTimestamp(function(t){const n=_t(t);return new Z(n.seconds,n.nanos)}(r))}function Kc(r,e){return rc(r,e).canonicalString()}function rc(r,e){const t=function(s){return new X(["projects",s.projectId,"databases",s.database])}(r).child("documents");return e===void 0?t:t.child(e)}function Kp(r){const e=X.fromString(r);return F(Zp(e),10190,{key:e.toString()}),e}function Wi(r,e){return Kc(r.databaseId,e.path)}function _n(r,e){const t=Kp(e);if(t.get(1)!==r.databaseId.projectId)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new O(Wp(t))}function Gp(r,e){return Kc(r.databaseId,e)}function Hp(r){const e=Kp(r);return e.length===4?X.emptyPath():Wp(e)}function sc(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Wp(r){return F(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Fh(r,e,t){return{name:Wi(r,e),fields:t.value.mapValue.fields}}function yw(r,e,t){const n=_n(r,e.name),s=De(e.updateTime),i=e.createTime?De(e.createTime):U.min(),o=new we({mapValue:{fields:e.fields}}),c=ue.newFoundDocument(n,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function Iw(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:M(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(F(f===void 0||typeof f=="string",58123),fe.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),fe.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(h){const f=h.code===void 0?P.UNKNOWN:qp(h.code);return new k(f,h.message||"")}(o);t=new $p(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=_n(r,n.document.name),i=De(n.document.updateTime),o=n.document.createTime?De(n.document.createTime):U.min(),c=new we({mapValue:{fields:n.document.fields}}),u=ue.newFoundDocument(s,i,o,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new Ci(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=_n(r,n.document),i=n.readTime?De(n.readTime):U.min(),o=ue.newNoDocument(s,i),c=n.removedTargetIds||[];t=new Ci([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=_n(r,n.document),i=n.removedTargetIds||[];t=new Ci([],i,s,null)}else{if(!("filter"in e))return M(11601,{Vt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new cw(s,i),c=n.targetId;t=new jp(c,o)}}return t}function Qi(r,e){let t;if(e instanceof Sr)t={update:Fh(r,e.key,e.value)};else if(e instanceof So)t={delete:Wi(r,e.key)};else if(e instanceof Et)t={update:Fh(r,e.key,e.data),updateMask:bw(e.fieldMask)};else{if(!(e instanceof Bp))return M(16599,{dt:e.type});t={verify:Wi(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(i,o){const c=o.transform;if(c instanceof bs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof dr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof fr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Rs)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw M(20930,{transform:o.transform})}(0,n))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:_w(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)}(r,e.precondition)),t}function ic(r,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?Re.updateTime(De(i.updateTime)):i.exists!==void 0?Re.exists(i.exists):Re.none()}(e.currentDocument):Re.none(),n=e.updateTransforms?e.updateTransforms.map(s=>function(o,c){let u=null;if("setToServerValue"in c)F(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new bs;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new dr(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new fr(f)}else"increment"in c?u=new Rs(o,c.increment):M(16584,{proto:c});const h=ae.fromServerFormat(c.fieldPath);return new nw(h,u)}(r,s)):[];if(e.update){e.update.name;const s=_n(r,e.update.name),i=new we({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const h=u.fieldPaths||[];return new Oe(h.map(f=>ae.fromServerFormat(f)))}(e.updateMask);return new Et(s,i,o,t,n)}return new Sr(s,i,t,n)}if(e.delete){const s=_n(r,e.delete);return new So(s,t)}if(e.verify){const s=_n(r,e.verify);return new Bp(s,t)}return M(1463,{proto:e})}function Ew(r,e){return r&&r.length>0?(F(e!==void 0,14353),r.map(t=>function(s,i){let o=s.updateTime?De(s.updateTime):De(i);return o.isEqual(U.min())&&(o=De(i)),new sw(o,s.transformResults||[])}(t,e))):[]}function Qp(r,e){return{documents:[Gp(r,e.path)]}}function Gc(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Gp(r,s);const i=function(h){if(h.length!==0)return Xp(ee.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(f=>function(I){return{field:Ot(I.field),direction:vw(I.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=nc(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ft:t,parent:s}}function Tw(r,e,t,n){const{ft:s,parent:i}=Gc(r,e),o={},c=[];let u=0;return t.forEach(h=>{const f="aggregate_"+u++;o[f]=h.alias,h.aggregateType==="count"?c.push({alias:f,count:{}}):h.aggregateType==="avg"?c.push({alias:f,avg:{field:Ot(h.fieldPath)}}):h.aggregateType==="sum"&&c.push({alias:f,sum:{field:Ot(h.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:c,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function Jp(r){let e=Hp(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){F(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(g){const I=Yp(g);return I instanceof ee&&Fc(I)?I.getFilters():[I]}(t.where));let o=[];t.orderBy&&(o=function(g){return g.map(I=>function(V){return new Ki(Gn(V.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(V.direction))}(I))}(t.orderBy));let c=null;t.limit&&(c=function(g){let I;return I=typeof g=="object"?g.value:g,mo(I)?null:I}(t.limit));let u=null;t.startAt&&(u=function(g){const I=!!g.before,R=g.values||[];return new lr(R,I)}(t.startAt));let h=null;return t.endAt&&(h=function(g){const I=!g.before,R=g.values||[];return new lr(R,I)}(t.endAt)),Ap(e,s,o,i,c,"F",u,h)}function ww(r,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Yp(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Gn(t.unaryFilter.field);return W.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Gn(t.unaryFilter.field);return W.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Gn(t.unaryFilter.field);return W.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Gn(t.unaryFilter.field);return W.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(r):r.fieldFilter!==void 0?function(t){return W.create(Gn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return ee.create(t.compositeFilter.filters.map(n=>Yp(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(t.compositeFilter.op))}(r):M(30097,{filter:r})}function vw(r){return fw[r]}function Aw(r){return pw[r]}function Sw(r){return gw[r]}function Ot(r){return{fieldPath:r.canonicalString()}}function Gn(r){return ae.fromServerFormat(r.fieldPath)}function Xp(r){return r instanceof W?function(t){if(t.op==="=="){if(wh(t.value))return{unaryFilter:{field:Ot(t.field),op:"IS_NAN"}};if(Th(t.value))return{unaryFilter:{field:Ot(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(wh(t.value))return{unaryFilter:{field:Ot(t.field),op:"IS_NOT_NAN"}};if(Th(t.value))return{unaryFilter:{field:Ot(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ot(t.field),op:Aw(t.op),value:t.value}}}(r):r instanceof ee?function(t){const n=t.getFilters().map(s=>Xp(s));return n.length===1?n[0]:{compositeFilter:{op:Sw(t.op),filters:n}}}(r):M(54877,{filter:r})}function bw(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Zp(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function eg(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
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
 */class ft{constructor(e,t,n,s,i=U.min(),o=U.min(),c=fe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new ft(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class tg{constructor(e){this.yt=e}}function Rw(r,e){let t;if(e.document)t=yw(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=O.fromSegments(e.noDocument.path),s=bn(e.noDocument.readTime);t=ue.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return M(56709);{const n=O.fromSegments(e.unknownDocument.path),s=bn(e.unknownDocument.version);t=ue.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime(function(s){const i=new Z(s[0],s[1]);return U.fromTimestamp(i)}(e.readTime)),t}function Uh(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ji(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(i,o){return{name:Wi(i,o.key),fields:o.data.value.mapValue.fields,updateTime:pr(i,o.version.toTimestamp()),createTime:pr(i,o.createTime.toTimestamp())}}(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Sn(e.version)};else{if(!e.isUnknownDocument())return M(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Sn(e.version)}}return n}function Ji(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Sn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function bn(r){const e=new Z(r.seconds,r.nanoseconds);return U.fromTimestamp(e)}function ln(r,e){const t=(e.baseMutations||[]).map(i=>ic(r.yt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map(i=>ic(r.yt,i)),s=Z.fromMillis(e.localWriteTimeMs);return new qc(e.batchId,s,t,n)}function ns(r){const e=bn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?bn(r.lastLimboFreeSnapshotVersion):U.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){const o=i.documents.length;return F(o===1,1966,{count:o}),Be(qs(Hp(i.documents[0])))}(r.query):function(i){return Be(Jp(i))}(r.query),new ft(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,fe.fromBase64String(r.resumeToken))}function ng(r,e){const t=Sn(e.snapshotVersion),n=Sn(e.lastLimboFreeSnapshotVersion);let s;s=Gi(e.target)?Qp(r.yt,e.target):Gc(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:An(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function rg(r){const e=Jp({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?tc(e,e.limit,"L"):e}function Ea(r,e){return new $c(e.largestBatchId,ic(r.yt,e.overlayMutation))}function Bh(r,e){const t=e.path.lastSegment();return[r,Pe(e.path.popLast()),t]}function qh(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Sn(n.readTime),documentKey:Pe(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class Pw{getBundleMetadata(e,t){return jh(e).get(t).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:bn(i.createTime),version:i.version}}(n)})}saveBundleMetadata(e,t){return jh(e).put(function(s){return{bundleId:s.id,createTime:Sn(De(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return $h(e).get(t).next(n=>{if(n)return function(i){return{name:i.name,query:rg(i.bundledQuery),readTime:bn(i.readTime)}}(n)})}saveNamedQuery(e,t){return $h(e).put(function(s){return{name:s.name,readTime:Sn(De(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function jh(r){return ye(r,_o)}function $h(r){return ye(r,yo)}/**
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
 */class bo{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new bo(e,n)}getOverlay(e,t){return Kr(e).get(Bh(this.userId,t)).next(n=>n?Ea(this.serializer,n):null)}getOverlays(e,t){const n=nt();return v.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){const s=[];return n.forEach((i,o)=>{const c=new $c(t,o);s.push(this.St(e,c))}),v.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach(o=>s.add(Pe(o.getCollectionPath())));const i=[];return s.forEach(o=>{const c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(Kr(e).X(Ha,c))}),v.waitFor(i)}getOverlaysForCollection(e,t,n){const s=nt(),i=Pe(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Kr(e).J(Ha,o).next(c=>{for(const u of c){const h=Ea(this.serializer,u);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(e,t,n,s){const i=nt();let o;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Kr(e).ee({index:np,range:c},(u,h,f)=>{const g=Ea(this.serializer,h);i.size()<s||g.largestBatchId===o?(i.set(g.getKey(),g),o=g.largestBatchId):f.done()}).next(()=>i)}St(e,t){return Kr(e).put(function(s,i,o){const[c,u,h]=Bh(i,o.mutation.key);return{userId:i,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Qi(s.yt,o.mutation)}}(this.serializer,this.userId,t))}}function Kr(r){return ye(r,Io)}/**
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
 */class Cw{bt(e){return ye(e,Nc)}getSessionToken(e){return this.bt(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?fe.fromUint8Array(n):fe.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class hn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(oe(e.integerValue));else if("doubleValue"in e){const n=oe(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),ys(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=_t(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(yt(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?pp(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):To(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):M(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){var o,c;const n=e.fields||{};this.Ft(t,53);const s=cr,i=((c=(o=n[s].arrayValue)==null?void 0:o.values)==null?void 0:c.length)||0;this.Ft(t,15),t.Mt(oe(i)),this.Ot(s,t),this.Ct(n[s],t)}Kt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),O.fromName(e).path.forEach(n=>{this.Ft(t,60),this.$t(n,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}hn.Wt=new hn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bn=255;function Vw(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function zh(r){const e=64-function(n){let s=0;for(let i=0;i<8;++i){const o=Vw(255&n[i]);if(s+=o,o!==8)break}return s}(r);return Math.ceil(e/8)}class kw{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Xt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Yt(e){const t=this.en(e),n=zh(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=zh(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(Bn),this.sn(255)}_n(){this.an(Bn),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===Bn?(this.sn(Bn),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===Bn?(this.an(Bn),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class Dw{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class Nw{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Gr{constructor(){this.cn=new kw,this.ascending=new Dw(this.cn),this.descending=new Nw(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
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
 */class dn{constructor(e,t,n,s){this.hn=e,this.Pn=t,this.Tn=n,this.En=s}In(){const e=this.En.length,t=e===0||this.En[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.En,0),t!==e?n.set([0],this.En.length):++n[n.length-1],new dn(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:Vi(this.Tn),directionalValue:Vi(this.En),orderedDocumentKey:Vi(t),documentKey:n.path.toArray()}}An(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Pt(r,e){let t=r.hn-e.hn;return t!==0?t:(t=Kh(r.Tn,e.Tn),t!==0?t:(t=Kh(r.En,e.En),t!==0?t:O.comparator(r.Pn,e.Pn)))}function Kh(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function Vi(r){return Hd()?function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n}(r):r}function Gh(r){return typeof r!="string"?r:function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(r)}class Hh{constructor(e){this.Vn=new te((t,n)=>ae.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.mn.push(n)}}get fn(){return this.Vn.size>1}gn(e){if(F(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=za(e);if(t!==void 0&&!this.pn(t))return!1;const n=an(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.pn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=n[i];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++i}for(;i<n.length;++i){const c=n[i];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}Sn(){if(this.fn)return null;let e=new te(ae.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new wi(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new wi(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new wi(n.field,n.dir==="asc"?0:1)));return new Bi(Bi.UNKNOWN_ID,this.collectionId,t,_s.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function sg(r){var t,n;if(F(r instanceof W||r instanceof ee,20012),r instanceof W){if(r instanceof vp){const s=((n=(t=r.value.arrayValue)==null?void 0:t.values)==null?void 0:n.map(i=>W.create(r.field,"==",i)))||[];return ee.create(s,"or")}return r}const e=r.filters.map(s=>sg(s));return ee.create(e,r.op)}function xw(r){if(r.getFilters().length===0)return[];const e=cc(sg(r));return F(ig(e),7391),oc(e)||ac(e)?[e]:e.getFilters()}function oc(r){return r instanceof W}function ac(r){return r instanceof ee&&Fc(r)}function ig(r){return oc(r)||ac(r)||function(t){if(t instanceof ee&&Ya(t)){for(const n of t.getFilters())if(!oc(n)&&!ac(n))return!1;return!0}return!1}(r)}function cc(r){if(F(r instanceof W||r instanceof ee,34018),r instanceof W)return r;if(r.filters.length===1)return cc(r.filters[0]);const e=r.filters.map(n=>cc(n));let t=ee.create(e,r.op);return t=Yi(t),ig(t)?t:(F(t instanceof ee,64498),F(hr(t),40251),F(t.filters.length>1,57927),t.filters.reduce((n,s)=>Hc(n,s)))}function Hc(r,e){let t;return F(r instanceof W||r instanceof ee,38388),F(e instanceof W||e instanceof ee,25473),t=r instanceof W?e instanceof W?function(s,i){return ee.create([s,i],"and")}(r,e):Wh(r,e):e instanceof W?Wh(e,r):function(s,i){if(F(s.filters.length>0&&i.filters.length>0,48005),hr(s)&&hr(i))return Ep(s,i.getFilters());const o=Ya(s)?s:i,c=Ya(s)?i:s,u=o.filters.map(h=>Hc(h,c));return ee.create(u,"or")}(r,e),Yi(t)}function Wh(r,e){if(hr(e))return Ep(e,r.getFilters());{const t=e.filters.map(n=>Hc(r,n));return ee.create(t,"or")}}function Yi(r){if(F(r instanceof W||r instanceof ee,11850),r instanceof W)return r;const e=r.getFilters();if(e.length===1)return Yi(e[0]);if(yp(r))return r;const t=e.map(s=>Yi(s)),n=[];return t.forEach(s=>{s instanceof W?n.push(s):s instanceof ee&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:ee.create(n,r.op)}/**
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
 */class Ow{constructor(){this.bn=new Wc}addToCollectionParentIndex(e,t){return this.bn.add(t),v.resolve()}getCollectionParents(e,t){return v.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return v.resolve()}deleteFieldIndex(e,t){return v.resolve()}deleteAllFieldIndexes(e){return v.resolve()}createTargetIndexes(e,t){return v.resolve()}getDocumentsMatchingTarget(e,t){return v.resolve(null)}getIndexType(e,t){return v.resolve(0)}getFieldIndexes(e,t){return v.resolve([])}getNextCollectionGroupToUpdate(e){return v.resolve(null)}getMinOffset(e,t){return v.resolve(qe.min())}getMinOffsetFromCollectionGroup(e,t){return v.resolve(qe.min())}updateCollectionGroup(e,t,n){return v.resolve()}updateIndexEntries(e,t){return v.resolve()}}class Wc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new te(X.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new te(X.comparator)).toArray()}}/**
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
 */const Qh="IndexedDbIndexManager",fi=new Uint8Array(0);class Mw{constructor(e,t){this.databaseId=t,this.Dn=new Wc,this.Cn=new It(n=>An(n),(n,s)=>Us(n,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const i={collectionId:n,parent:Pe(s)};return Jh(e).put(i)}return v.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[jf(t),""],!1,!0);return Jh(e).J(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;n.push(tt(o.parent))}return n})}addFieldIndex(e,t){const n=Hr(e),s=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=jn(e);return i.next(c=>{o.put(qh(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const n=Hr(e),s=jn(e),i=qn(e);return n.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Hr(e),n=qn(e),s=jn(e);return t.X().next(()=>n.X()).next(()=>s.X())}createTargetIndexes(e,t){return v.forEach(this.vn(t),n=>this.getIndexType(e,n).next(s=>{if(s===0||s===1){const i=new Hh(n).Sn();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const n=qn(e);let s=!0;const i=new Map;return v.forEach(this.vn(t),o=>this.Fn(e,o).next(c=>{s&&(s=!!c),i.set(o,c)})).next(()=>{if(s){let o=G();const c=[];return v.forEach(i,(u,h)=>{C(Qh,`Using index ${function(j){return`id=${j.indexId}|cg=${j.collectionGroup}|f=${j.fields.map(se=>`${se.fieldPath}:${se.kind}`).join(",")}`}(u)} to execute ${An(t)}`);const f=function(j,se){const J=za(se);if(J===void 0)return null;for(const Y of Hi(j,J.fieldPath))switch(Y.op){case"array-contains-any":return Y.value.arrayValue.values||[];case"array-contains":return[Y.value]}return null}(h,u),g=function(j,se){const J=new Map;for(const Y of an(se))for(const E of Hi(j,Y.fieldPath))switch(E.op){case"==":case"in":J.set(Y.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return J.set(Y.fieldPath.canonicalString(),E.value),Array.from(J.values())}return null}(h,u),I=function(j,se){const J=[];let Y=!0;for(const E of an(se)){const m=E.kind===0?Rh(j,E.fieldPath,j.startAt):Ph(j,E.fieldPath,j.startAt);J.push(m.value),Y&&(Y=m.inclusive)}return new lr(J,Y)}(h,u),R=function(j,se){const J=[];let Y=!0;for(const E of an(se)){const m=E.kind===0?Ph(j,E.fieldPath,j.endAt):Rh(j,E.fieldPath,j.endAt);J.push(m.value),Y&&(Y=m.inclusive)}return new lr(J,Y)}(h,u),V=this.Mn(u,h,I),x=this.Mn(u,h,R),N=this.xn(u,h,g),z=this.On(u.indexId,f,V,I.inclusive,x,R.inclusive,N);return v.forEach(z,$=>n.Z($,t.limit).next(j=>{j.forEach(se=>{const J=O.fromSegments(se.documentKey);o.has(J)||(o=o.add(J),c.push(J))})}))}).next(()=>c)}return v.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=xw(ee.create(e.filters,"and")).map(n=>Za(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,n,s,i,o,c){const u=(t!=null?t.length:1)*Math.max(n.length,i.length),h=u/(t!=null?t.length:1),f=[];for(let g=0;g<u;++g){const I=t?this.Nn(t[g/h]):fi,R=this.Bn(e,I,n[g%h],s),V=this.Ln(e,I,i[g%h],o),x=c.map(N=>this.Bn(e,I,N,!0));f.push(...this.createRange(R,V,x))}return f}Bn(e,t,n,s){const i=new dn(e,O.empty(),t,n);return s?i:i.In()}Ln(e,t,n,s){const i=new dn(e,O.empty(),t,n);return s?i.In():i}Fn(e,t){const n=new Hh(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const c of i)n.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let n=2;const s=this.vn(t);return v.forEach(s,i=>this.Fn(e,i).next(o=>{o?n!==0&&o.fields.length<function(u){let h=new te(ae.comparator),f=!1;for(const g of u.filters)for(const I of g.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?f=!0:h=h.add(I.field));for(const g of u.orderBy)g.field.isKeyField()||(h=h.add(g.field));return h.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&n===2?1:n)}kn(e,t){const n=new Gr;for(const s of an(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.ln(s.kind);hn.Wt.Dt(i,o)}return n.un()}Nn(e){const t=new Gr;return hn.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){const n=new Gr;return hn.Wt.Dt(As(this.databaseId,t),n.ln(function(i){const o=an(i);return o.length===0?0:o[o.length-1].kind}(e))),n.un()}xn(e,t,n){if(n===null)return[];let s=[];s.push(new Gr);let i=0;for(const o of an(e)){const c=n[i++];for(const u of s)if(this.Kn(t,o.fieldPath)&&Ss(c))s=this.Un(s,o,c);else{const h=u.ln(o.kind);hn.Wt.Dt(c,h)}}return this.$n(s)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const c of s){const u=new Gr;u.seed(c.un()),hn.Wt.Dt(o,u.ln(t.kind)),i.push(u)}return i}Kn(e,t){return!!e.filters.find(n=>n instanceof W&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=Hr(e),s=jn(e);return(t?n.J(Ga,IDBKeyRange.bound(t,t)):n.J()).next(i=>{const o=[];return v.forEach(i,c=>s.get([c.indexId,this.uid]).next(u=>{o.push(function(f,g){const I=g?new _s(g.sequenceNumber,new qe(bn(g.readTime),new O(tt(g.documentKey)),g.largestBatchId)):_s.empty(),R=f.fields.map(([V,x])=>new wi(ae.fromServerFormat(V),x));return new Bi(f.indexId,f.collectionGroup,R,I)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:q(n.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const s=Hr(e),i=jn(e);return this.Wn(e).next(o=>s.J(Ga,IDBKeyRange.bound(t,t)).next(c=>v.forEach(c,u=>i.put(qh(u.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return v.forEach(t,(s,i)=>{const o=n.get(s.collectionGroup);return(o?v.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(c=>(n.set(s.collectionGroup,c),v.forEach(c,u=>this.Qn(e,s,u).next(h=>{const f=this.Gn(i,u);return h.isEqual(f)?v.resolve():this.zn(e,i,u,h,f)}))))})}jn(e,t,n,s){return qn(e).put(s.Rn(this.uid,this.qn(n,t.key),t.key))}Jn(e,t,n,s){return qn(e).delete(s.An(this.uid,this.qn(n,t.key),t.key))}Qn(e,t,n){const s=qn(e);let i=new te(Pt);return s.ee({index:tp,range:IDBKeyRange.only([n.indexId,this.uid,Vi(this.qn(n,t))])},(o,c)=>{i=i.add(new dn(n.indexId,t,Gh(c.arrayValue),Gh(c.directionalValue)))}).next(()=>i)}Gn(e,t){let n=new te(Pt);const s=this.kn(t,e);if(s==null)return n;const i=za(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Ss(o))for(const c of o.arrayValue.values||[])n=n.add(new dn(t.indexId,e.key,this.Nn(c),s))}else n=n.add(new dn(t.indexId,e.key,fi,s));return n}zn(e,t,n,s,i){C(Qh,"Updating index entries for document '%s'",t.key);const o=[];return function(u,h,f,g,I){const R=u.getIterator(),V=h.getIterator();let x=Un(R),N=Un(V);for(;x||N;){let z=!1,$=!1;if(x&&N){const j=f(x,N);j<0?$=!0:j>0&&(z=!0)}else x!=null?$=!0:z=!0;z?(g(N),N=Un(V)):$?(I(x),x=Un(R)):(x=Un(R),N=Un(V))}}(s,i,Pt,c=>{o.push(this.jn(e,t,n,c))},c=>{o.push(this.Jn(e,t,n,c))}),v.waitFor(o)}Wn(e){let t=1;return jn(e).ee({index:ep,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,c)=>Pt(o,c)).filter((o,c,u)=>!c||Pt(o,u[c-1])!==0);const s=[];s.push(e);for(const o of n){const c=Pt(o,e),u=Pt(o,t);if(c===0)s[0]=e.In();else if(c>0&&u<0)s.push(o),s.push(o.In());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Hn(s[o],s[o+1]))return[];const c=s[o].An(this.uid,fi,O.empty()),u=s[o+1].An(this.uid,fi,O.empty());i.push(IDBKeyRange.bound(c,u))}return i}Hn(e,t){return Pt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Yh)}getMinOffset(e,t){return v.mapArray(this.vn(t),n=>this.Fn(e,n).next(s=>s||M(44426))).next(Yh)}}function Jh(r){return ye(r,Ts)}function qn(r){return ye(r,cs)}function Hr(r){return ye(r,Dc)}function jn(r){return ye(r,as)}function Yh(r){F(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Cc(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new qe(e.readTime,e.documentKey,t)}/**
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
 */const Xh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},og=41943040;class be{static withCacheSize(e){return new be(e,be.DEFAULT_COLLECTION_PERCENTILE,be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function ag(r,e,t){const n=r.store(ze),s=r.store(sr),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=n.ee({range:o},(f,g,I)=>(c++,I.delete()));i.push(u.next(()=>{F(c===1,47070,{batchId:t.batchId})}));const h=[];for(const f of t.mutations){const g=Yf(e,f.key.path,t.batchId);i.push(s.delete(g)),h.push(f.key)}return v.waitFor(i).next(()=>h)}function Xi(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw M(14731);e=r.noDocument}return JSON.stringify(e).length}/**
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
 */be.DEFAULT_COLLECTION_PERCENTILE=10,be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,be.DEFAULT=new be(og,be.DEFAULT_COLLECTION_PERCENTILE,be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),be.DISABLED=new be(-1,0,0);class Ro{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static wt(e,t,n,s){F(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new Ro(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ct(e).ee({index:fn,range:n},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,s){const i=Hn(e),o=Ct(e);return o.add({}).next(c=>{F(typeof c=="number",49019);const u=new qc(c,t,n,s),h=function(R,V,x){const N=x.baseMutations.map($=>Qi(R.yt,$)),z=x.mutations.map($=>Qi(R.yt,$));return{userId:V,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:N,mutations:z}}(this.serializer,this.userId,u),f=[];let g=new te((I,R)=>q(I.canonicalString(),R.canonicalString()));for(const I of s){const R=Yf(this.userId,I.key.path,c);g=g.add(I.key.path.popLast()),f.push(o.put(h)),f.push(i.put(R,cT))}return g.forEach(I=>{f.push(this.indexManager.addToCollectionParentIndex(e,I))}),e.addOnCommittedListener(()=>{this.Zn[c]=u.keys()}),v.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return Ct(e).get(t).next(n=>n?(F(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),ln(this.serializer,n)):null)}Xn(e,t){return this.Zn[t]?v.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const s=n.keys();return this.Zn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Ct(e).ee({index:fn,range:s},(o,c,u)=>{c.userId===this.userId&&(F(c.batchId>=n,47524,{Yn:n}),i=ln(this.serializer,c)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=gn;return Ct(e).ee({index:fn,range:t,reverse:!0},(s,i,o)=>{n=i.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,gn],[this.userId,Number.POSITIVE_INFINITY]);return Ct(e).J(fn,t).next(n=>n.map(s=>ln(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=vi(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return Hn(e).ee({range:s},(o,c,u)=>{const[h,f,g]=o,I=tt(f);if(h===this.userId&&t.path.isEqual(I))return Ct(e).get(g).next(R=>{if(!R)throw M(61480,{er:o,batchId:g});F(R.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:R.userId,batchId:g}),i.push(ln(this.serializer,R))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(q);const s=[];return t.forEach(i=>{const o=vi(this.userId,i.path),c=IDBKeyRange.lowerBound(o),u=Hn(e).ee({range:c},(h,f,g)=>{const[I,R,V]=h,x=tt(R);I===this.userId&&i.path.isEqual(x)?n=n.add(V):g.done()});s.push(u)}),v.waitFor(s).next(()=>this.tr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=vi(this.userId,n),o=IDBKeyRange.lowerBound(i);let c=new te(q);return Hn(e).ee({range:o},(u,h,f)=>{const[g,I,R]=u,V=tt(I);g===this.userId&&n.isPrefixOf(V)?V.length===s&&(c=c.add(R)):f.done()}).next(()=>this.tr(e,c))}tr(e,t){const n=[],s=[];return t.forEach(i=>{s.push(Ct(e).get(i).next(o=>{if(o===null)throw M(35274,{batchId:i});F(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(ln(this.serializer,o))}))}),v.waitFor(s).next(()=>n)}removeMutationBatch(e,t){return ag(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),v.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return v.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return Hn(e).ee({range:n},(i,o,c)=>{if(i[0]===this.userId){const u=tt(i[1]);s.push(u)}else c.done()}).next(()=>{F(s.length===0,56720,{rr:s.map(i=>i.canonicalString())})})})}containsKey(e,t){return cg(e,this.userId,t)}ir(e){return ug(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:gn,lastStreamToken:""})}}function cg(r,e,t){const n=vi(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return Hn(r).ee({range:i,Y:!0},(c,u,h)=>{const[f,g,I]=c;f===e&&g===s&&(o=!0),h.done()}).next(()=>o)}function Ct(r){return ye(r,ze)}function Hn(r){return ye(r,sr)}function ug(r){return ye(r,Is)}/**
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
 */class Rn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Rn(0)}static ar(){return new Rn(-1)}}/**
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
 */class Lw{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const n=new Rn(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(t=>U.fromTimestamp(new Z(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.ur(e).next(s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.cr(e,s)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>$n(e).delete(t.targetId)).next(()=>this.ur(e)).next(n=>(F(n.targetCount>0,8065),n.targetCount-=1,this.cr(e,n)))}removeTargets(e,t,n){let s=0;const i=[];return $n(e).ee((o,c)=>{const u=ns(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>v.waitFor(i)).next(()=>s)}forEachTarget(e,t){return $n(e).ee((n,s)=>{const i=ns(s);t(i)})}ur(e){return Zh(e).get($i).next(t=>(F(t!==null,2888),t))}cr(e,t){return Zh(e).put($i,t)}lr(e,t){return $n(e).put(ng(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next(t=>t.targetCount)}getTargetData(e,t){const n=An(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return $n(e).ee({range:s,index:Zf},(o,c,u)=>{const h=ns(c);Us(t,h.target)&&(i=h,u.done())}).next(()=>i)}addMatchingKeys(e,t,n){const s=[],i=Mt(e);return t.forEach(o=>{const c=Pe(o.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,o))}),v.waitFor(s)}removeMatchingKeys(e,t,n){const s=Mt(e);return v.forEach(t,i=>{const o=Pe(i.path);return v.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])})}removeMatchingKeysForTargetId(e,t){const n=Mt(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=Mt(e);let i=G();return s.ee({range:n,Y:!0},(o,c,u)=>{const h=tt(o[1]),f=new O(h);i=i.add(f)}).next(()=>i)}containsKey(e,t){const n=Pe(t.path),s=IDBKeyRange.bound([n],[jf(n)],!1,!0);let i=0;return Mt(e).ee({index:kc,Y:!0,range:s},([o,c],u,h)=>{o!==0&&(i++,h.done())}).next(()=>i>0)}At(e,t){return $n(e).get(t).next(n=>n?ns(n):null)}}function $n(r){return ye(r,ir)}function Zh(r){return ye(r,mn)}function Mt(r){return ye(r,or)}/**
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
 */const ed="LruGarbageCollector",lg=1048576;function td([r,e],[t,n]){const s=q(r,t);return s===0?q(e,n):s}class Fw{constructor(e){this.Pr=e,this.buffer=new te(td),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();td(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class hg{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){C(ed,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Qt(t)?C(ed,"Ignoring IndexedDB error during garbage collection: ",t):await Wt(t)}await this.Ar(3e5)})}}class Uw{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return v.resolve(xe.ce);const n=new Fw(t);return this.Vr.forEachTarget(e,s=>n.Ir(s.sequenceNumber)).next(()=>this.Vr.mr(e,s=>n.Ir(s))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(Xh)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xh):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,s,i,o,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,o=Date.now(),this.nthSequenceNumber(e,s))).next(g=>(n=g,c=Date.now(),this.removeTargets(e,n,t))).next(g=>(i=g,u=Date.now(),this.removeOrphanedDocuments(e,n))).next(g=>(h=Date.now(),zn()<=H.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${g} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g})))}}function dg(r,e){return new Uw(r,e)}/**
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
 */class Bw{constructor(e,t){this.db=e,this.garbageCollector=dg(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}pr(e){let t=0;return this.mr(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(n,s)=>t(s))}addReference(e,t,n){return pi(e,n)}removeReference(e,t,n){return pi(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return pi(e,t)}wr(e,t){return function(s,i){let o=!1;return ug(s).te(c=>cg(s,c,i).next(u=>(u&&(o=!0),v.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.yr(e,(o,c)=>{if(c<=t){const u=this.wr(e,o).next(h=>{if(!h)return i++,n.getEntry(e,o).next(()=>(n.removeEntry(o,U.min()),Mt(e).delete(function(g){return[0,Pe(g.path)]}(o))))});s.push(u)}}).next(()=>v.waitFor(s)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return pi(e,t)}yr(e,t){const n=Mt(e);let s,i=xe.ce;return n.ee({index:kc},([o,c],{path:u,sequenceNumber:h})=>{o===0?(i!==xe.ce&&t(new O(tt(s)),i),i=h,s=u):i=xe.ce}).next(()=>{i!==xe.ce&&t(new O(tt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function pi(r,e){return Mt(r).put(function(n,s){return{targetId:0,path:Pe(n.path),sequenceNumber:s}}(e,r.currentSequenceNumber))}/**
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
 */class fg{constructor(){this.changes=new It(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ue.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?v.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class qw{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return sn(e).put(n)}removeEntry(e,t,n){return sn(e).delete(function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ji(o),c[c.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.Sr(e,n)))}getEntry(e,t){let n=ue.newInvalidDocument(t);return sn(e).ee({index:Ai,range:IDBKeyRange.only(Wr(t))},(s,i)=>{n=this.br(t,i)}).next(()=>n)}Dr(e,t){let n={size:0,document:ue.newInvalidDocument(t)};return sn(e).ee({index:Ai,range:IDBKeyRange.only(Wr(t))},(s,i)=>{n={document:this.br(t,i),size:Xi(i)}}).next(()=>n)}getEntries(e,t){let n=Ue();return this.Cr(e,t,(s,i)=>{const o=this.br(s,i);n=n.insert(s,o)}).next(()=>n)}vr(e,t){let n=Ue(),s=new re(O.comparator);return this.Cr(e,t,(i,o)=>{const c=this.br(i,o);n=n.insert(i,c),s=s.insert(i,Xi(o))}).next(()=>({documents:n,Fr:s}))}Cr(e,t,n){if(t.isEmpty())return v.resolve();let s=new te(sd);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(Wr(s.first()),Wr(s.last())),o=s.getIterator();let c=o.getNext();return sn(e).ee({index:Ai,range:i},(u,h,f)=>{const g=O.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&sd(c,g)<0;)n(c,null),c=o.getNext();c&&c.isEqual(g)&&(n(c,h),c=o.hasNext()?o.getNext():null),c?f.j(Wr(c)):f.done()}).next(()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),Ji(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return sn(e).J(IDBKeyRange.bound(c,u,!0)).next(h=>{i==null||i.incrementDocumentReadCount(h.length);let f=Ue();for(const g of h){const I=this.br(O.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);I.isFoundDocument()&&(js(t,I)||s.has(I.key))&&(f=f.insert(I.key,I))}return f})}getAllFromCollectionGroup(e,t,n,s){let i=Ue();const o=rd(t,n),c=rd(t,qe.max());return sn(e).ee({index:Xf,range:IDBKeyRange.bound(o,c,!0)},(u,h,f)=>{const g=this.br(O.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(g.key,g),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(e){return new jw(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return nd(e).get(Ka).next(t=>(F(!!t,20021),t))}Sr(e,t){return nd(e).put(Ka,t)}br(e,t){if(t){const n=Rw(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(U.min())))return n}return ue.newInvalidDocument(e)}}function pg(r){return new qw(r)}class jw extends fg{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new It(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(e){const t=[];let n=0,s=new te((i,o)=>q(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const c=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const u=Uh(this.Mr.serializer,o);s=s.add(i.path.popLast());const h=Xi(u);n+=h-c.size,t.push(this.Mr.addEntry(e,i,u))}else if(n-=c.size,this.trackRemovals){const u=Uh(this.Mr.serializer,o.convertToNoDocument(U.min()));t.push(this.Mr.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.Mr.updateMetadata(e,n)),v.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(n=>(this.Or.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:n,Fr:s})=>(s.forEach((i,o)=>{this.Or.set(i,{size:o,readTime:n.get(i).readTime})}),n))}}function nd(r){return ye(r,Es)}function sn(r){return ye(r,ji)}function Wr(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function rd(r,e){const t=e.documentKey.path.toArray();return[r,Ji(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function sd(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=q(t[i],n[i]),s)return s;return s=q(t.length,n.length),s||(s=q(t[t.length-2],n[n.length-2]),s||q(t[t.length-1],n[n.length-1]))}/**
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
 */class $w{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class gg{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(n=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(n!==null&&ds(n.mutation,s,Oe.empty(),Z.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,G()).next(()=>n))}getLocalViewOfDocuments(e,t,n=G()){const s=nt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,n).next(i=>{let o=es();return i.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=nt();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,G()))}populateOverlays(e,t,n){const s=[];return n.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,n,s){let i=Ue();const o=hs(),c=function(){return hs()}();return t.forEach((u,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Et)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),ds(f.mutation,h,f.mutation.getFieldMask(),Z.now())):o.set(h.key,Oe.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>c.set(h,new $w(f,o.get(h)??null))),c))}recalculateAndSaveOverlays(e,t){const n=hs();let s=new re((o,c)=>o-c),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||Oe.empty();f=c.applyToLocalView(h,f),n.set(u,f);const g=(s.get(c.batchId)||G()).add(u);s=s.insert(c.batchId,g)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,g=Dp();f.forEach(I=>{if(!i.has(I)){const R=Fp(t.get(I),n.get(I));R!==null&&g.set(I,R),i=i.add(I)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,g))}return v.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,s){return GT(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Sp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):v.resolve(nt());let c=rr,u=i;return o.next(h=>v.forEach(h,(f,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),i.get(f)?v.resolve():this.remoteDocumentCache.getEntry(e,f).next(I=>{u=u.insert(f,I)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,G())).next(f=>({batchId:c,changes:kp(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next(n=>{let s=es();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=es();return this.indexManager.getCollectionParents(e,i).next(c=>v.forEach(c,u=>{const h=function(g,I){return new Bs(I,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next(f=>{f.forEach((g,I)=>{o=o.insert(g,I)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s))).next(o=>{i.forEach((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,ue.newInvalidDocument(f)))});let c=es();return o.forEach((u,h)=>{const f=i.get(u);f!==void 0&&ds(f.mutation,h,Oe.empty(),Z.now()),js(t,h)&&(c=c.insert(u,h))}),c})}}/**
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
 */class zw{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return v.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:De(s.createTime)}}(t)),v.resolve()}getNamedQuery(e,t){return v.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(s){return{name:s.name,query:rg(s.bundledQuery),readTime:De(s.readTime)}}(t)),v.resolve()}}/**
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
 */class Kw{constructor(){this.overlays=new re(O.comparator),this.Lr=new Map}getOverlay(e,t){return v.resolve(this.overlays.get(t))}getOverlays(e,t){const n=nt();return v.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((s,i)=>{this.St(e,t,i)}),v.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Lr.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(n)),v.resolve()}getOverlaysForCollection(e,t,n){const s=nt(),i=t.length+1,o=new O(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>n&&s.set(u.getKey(),u)}return v.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new re((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=nt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=nt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return v.resolve(c)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Lr.get(s.largestBatchId).delete(n.key);this.Lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new $c(t,n));let i=this.Lr.get(t);i===void 0&&(i=G(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}/**
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
 */class Gw{constructor(){this.sessionToken=fe.EMPTY_BYTE_STRING}getSessionToken(e){return v.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,v.resolve()}}/**
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
 */class Qc{constructor(){this.kr=new te(Ee.qr),this.Kr=new te(Ee.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new Ee(e,t);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Wr(new Ee(e,t))}Qr(e,t){e.forEach(n=>this.removeReference(n,t))}Gr(e){const t=new O(new X([])),n=new Ee(t,e),s=new Ee(t,e+1),i=[];return this.Kr.forEachInRange([n,s],o=>{this.Wr(o),i.push(o.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new O(new X([])),n=new Ee(t,e),s=new Ee(t,e+1);let i=G();return this.Kr.forEachInRange([n,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Ee(e,0),n=this.kr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Ee{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return O.comparator(e.key,t.key)||q(e.Jr,t.Jr)}static Ur(e,t){return q(e.Jr,t.Jr)||O.comparator(e.key,t.key)}}/**
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
 */class Hw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new te(Ee.qr)}checkEmpty(e){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new qc(i,t,n,s);this.mutationQueue.push(o);for(const c of s)this.Hr=this.Hr.add(new Ee(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return v.resolve(o)}lookupMutationBatch(e,t){return v.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.Xr(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?gn:this.Yn-1)}getAllMutationBatches(e){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Ee(t,0),s=new Ee(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,s],o=>{const c=this.Zr(o.Jr);i.push(c)}),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(q);return t.forEach(s=>{const i=new Ee(s,0),o=new Ee(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,o],c=>{n=n.add(c.Jr)})}),v.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;O.isDocumentKey(i)||(i=i.child(""));const o=new Ee(new O(i),0);let c=new te(q);return this.Hr.forEachWhile(u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Jr)),!0)},o),v.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach(n=>{const s=this.Zr(n);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){F(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Hr;return v.forEach(t.mutations,s=>{const i=new Ee(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Hr=n})}nr(e){}containsKey(e,t){const n=new Ee(t,0),s=this.Hr.firstAfterOrEqual(n);return v.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,v.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Ww{constructor(e){this.ti=e,this.docs=function(){return new re(O.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return v.resolve(n?n.document.mutableCopy():ue.newInvalidDocument(t))}getEntries(e,t){let n=Ue();return t.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ue.newInvalidDocument(s))}),v.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=Ue();const o=t.path,c=new O(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Cc(Gf(f),n)<=0||(s.has(f.key)||js(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(e,t,n,s){M(9500)}ni(e,t){return v.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new Qw(this)}getSize(e){return v.resolve(this.size)}}class Qw extends fg{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(n)}),v.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
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
 */class Jw{constructor(e){this.persistence=e,this.ri=new It(t=>An(t),Us),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.ii=0,this.si=new Qc,this.targetCount=0,this.oi=Rn._r()}forEachTarget(e,t){return this.ri.forEach((n,s)=>t(s)),v.resolve()}getLastRemoteSnapshotVersion(e){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return v.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),v.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Rn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,v.resolve()}updateTargetData(e,t){return this.lr(t),v.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,v.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.ri.forEach((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.ri.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),v.waitFor(i).next(()=>s)}getTargetCount(e){return v.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return v.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),v.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),v.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),v.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return v.resolve(n)}containsKey(e,t){return v.resolve(this.si.containsKey(t))}}/**
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
 */class Jc{constructor(e,t){this._i={},this.overlays={},this.ai=new xe(0),this.ui=!1,this.ui=!0,this.ci=new Gw,this.referenceDelegate=e(this),this.li=new Jw(this),this.indexManager=new Ow,this.remoteDocumentCache=function(s){return new Ww(s)}(n=>this.referenceDelegate.hi(n)),this.serializer=new tg(t),this.Pi=new zw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Kw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new Hw(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){C("MemoryPersistence","Starting transaction:",e);const s=new Yw(this.ai.next());return this.referenceDelegate.Ti(),n(s).next(i=>this.referenceDelegate.Ei(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ii(e,t){return v.or(Object.values(this._i).map(n=>()=>n.containsKey(e,t)))}}class Yw extends Wf{constructor(e){super(),this.currentSequenceNumber=e}}class Po{constructor(e){this.persistence=e,this.Ri=new Qc,this.Ai=null}static Vi(e){return new Po(e)}get di(){if(this.Ai)return this.Ai;throw M(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),v.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),v.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),v.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(s=>this.di.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.di.add(i.toString()))}).next(()=>n.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.di,n=>{const s=O.fromPath(n);return this.mi(e,s).next(i=>{i||t.removeEntry(s,U.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(n=>{n?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return v.or([()=>v.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Zi{constructor(e,t){this.persistence=e,this.fi=new It(n=>Pe(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=dg(this,t)}static Vi(e,t){return new Zi(e,t)}Ti(){}Ei(e){return v.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}pr(e){let t=0;return this.mr(e,n=>{t++}).next(()=>t)}mr(e,t){return v.forEach(this.fi,(n,s)=>this.wr(e,n,s).next(i=>i?v.resolve():t(s)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,o=>this.wr(e,o,t).next(c=>{c||(n++,i.removeEntry(o,U.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),v.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),v.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),v.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),v.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=bi(e.data.value)),t}wr(e,t,n){return v.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Xw{constructor(e){this.serializer=e}k(e,t,n,s){const i=new go("createOrUpgrade",t);n<1&&s>=1&&(function(u){u.createObjectStore(Fs)}(e),function(u){u.createObjectStore(Is,{keyPath:aT}),u.createObjectStore(ze,{keyPath:gh,autoIncrement:!0}).createIndex(fn,mh,{unique:!0}),u.createObjectStore(sr)}(e),id(e),function(u){u.createObjectStore(cn)}(e));let o=v.resolve();return n<3&&s>=3&&(n!==0&&(function(u){u.deleteObjectStore(or),u.deleteObjectStore(ir),u.deleteObjectStore(mn)}(e),id(e)),o=o.next(()=>function(u){const h=u.store(mn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:U.min().toTimestamp(),targetCount:0};return h.put($i,f)}(i))),n<4&&s>=4&&(n!==0&&(o=o.next(()=>function(u,h){return h.store(ze).J().next(g=>{u.deleteObjectStore(ze),u.createObjectStore(ze,{keyPath:gh,autoIncrement:!0}).createIndex(fn,mh,{unique:!0});const I=h.store(ze),R=g.map(V=>I.put(V));return v.waitFor(R)})}(e,i))),o=o.next(()=>{(function(u){u.createObjectStore(ar,{keyPath:mT})})(e)})),n<5&&s>=5&&(o=o.next(()=>this.gi(i))),n<6&&s>=6&&(o=o.next(()=>(function(u){u.createObjectStore(Es)}(e),this.pi(i)))),n<7&&s>=7&&(o=o.next(()=>this.yi(i))),n<8&&s>=8&&(o=o.next(()=>this.wi(e,i))),n<9&&s>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&s>=10&&(o=o.next(()=>this.Si(i))),n<11&&s>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(_o,{keyPath:_T})})(e),function(u){u.createObjectStore(yo,{keyPath:yT})}(e)})),n<12&&s>=12&&(o=o.next(()=>{(function(u){const h=u.createObjectStore(Io,{keyPath:ST});h.createIndex(Ha,bT,{unique:!1}),h.createIndex(np,RT,{unique:!1})})(e)})),n<13&&s>=13&&(o=o.next(()=>function(u){const h=u.createObjectStore(ji,{keyPath:uT});h.createIndex(Ai,lT),h.createIndex(Xf,hT)}(e)).next(()=>this.bi(e,i)).next(()=>e.deleteObjectStore(cn))),n<14&&s>=14&&(o=o.next(()=>this.Di(e,i))),n<15&&s>=15&&(o=o.next(()=>function(u){u.createObjectStore(Dc,{keyPath:IT,autoIncrement:!0}).createIndex(Ga,ET,{unique:!1}),u.createObjectStore(as,{keyPath:TT}).createIndex(ep,wT,{unique:!1}),u.createObjectStore(cs,{keyPath:vT}).createIndex(tp,AT,{unique:!1})}(e))),n<16&&s>=16&&(o=o.next(()=>{t.objectStore(as).clear()}).next(()=>{t.objectStore(cs).clear()})),n<17&&s>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Nc,{keyPath:PT})})(e)})),n<18&&s>=18&&Hd()&&(o=o.next(()=>{t.objectStore(as).clear()}).next(()=>{t.objectStore(cs).clear()})),o}pi(e){let t=0;return e.store(cn).ee((n,s)=>{t+=Xi(s)}).next(()=>{const n={byteSize:t};return e.store(Es).put(Ka,n)})}gi(e){const t=e.store(Is),n=e.store(ze);return t.J().next(s=>v.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,gn],[i.userId,i.lastAcknowledgedBatchId]);return n.J(fn,o).next(c=>v.forEach(c,u=>{F(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=ln(this.serializer,u);return ag(e,i.userId,h).next(()=>{})}))}))}yi(e){const t=e.store(or),n=e.store(cn);return e.store(mn).get($i).next(s=>{const i=[];return n.ee((o,c)=>{const u=new X(o),h=function(g){return[0,Pe(g)]}(u);i.push(t.get(h).next(f=>f?v.resolve():(g=>t.put({targetId:0,path:Pe(g),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>v.waitFor(i))})}wi(e,t){e.createObjectStore(Ts,{keyPath:gT});const n=t.store(Ts),s=new Wc,i=o=>{if(s.add(o)){const c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:Pe(u)})}};return t.store(cn).ee({Y:!0},(o,c)=>{const u=new X(o);return i(u.popLast())}).next(()=>t.store(sr).ee({Y:!0},([o,c,u],h)=>{const f=tt(c);return i(f.popLast())}))}Si(e){const t=e.store(ir);return t.ee((n,s)=>{const i=ns(s),o=ng(this.serializer,i);return t.put(o)})}bi(e,t){const n=t.store(cn),s=[];return n.ee((i,o)=>{const c=t.store(ji),u=function(g){return g.document?new O(X.fromString(g.document.name).popFirst(5)):g.noDocument?O.fromSegments(g.noDocument.path):g.unknownDocument?O.fromSegments(g.unknownDocument.path):M(36783)}(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))}).next(()=>v.waitFor(s))}Di(e,t){const n=t.store(ze),s=pg(this.serializer),i=new Jc(Po.Vi,this.serializer.yt);return n.J().next(o=>{const c=new Map;return o.forEach(u=>{let h=c.get(u.userId)??G();ln(this.serializer,u).keys().forEach(f=>h=h.add(f)),c.set(u.userId,h)}),v.forEach(c,(u,h)=>{const f=new Se(h),g=bo.wt(this.serializer,f),I=i.getIndexManager(f),R=Ro.wt(f,this.serializer,I,i.referenceDelegate);return new gg(s,R,g,I).recalculateAndSaveOverlaysForDocumentKeys(new Wa(t,xe.ce),u).next()})})}}function id(r){r.createObjectStore(or,{keyPath:fT}).createIndex(kc,pT,{unique:!0}),r.createObjectStore(ir,{keyPath:"targetId"}).createIndex(Zf,dT,{unique:!0}),r.createObjectStore(mn)}const Vt="IndexedDbPersistence",Ta=18e5,wa=5e3,va="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Zw="main";class Yc{constructor(e,t,n,s,i,o,c,u,h,f,g=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=o,this.document=c,this.Fi=h,this.Mi=f,this.xi=g,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=I=>Promise.resolve(),!Yc.v())throw new k(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Bw(this,s),this.qi=t+Zw,this.serializer=new tg(u),this.Ki=new qt(this.qi,this.xi,new Xw(this.serializer)),this.ci=new Cw,this.li=new Lw(this.referenceDelegate,this.serializer),this.remoteDocumentCache=pg(this.serializer),this.Pi=new Pw,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&de(Vt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new k(P.FAILED_PRECONDITION,va);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new xe(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.Ki&&this.Ki.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>gi(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(e)).next(t=>this.isPrimary&&!t?this.Hi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(Qt(e))return C(Vt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return C(Vt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return Qr(e).get(Fn).next(t=>v.resolve(this.Xi(t)))}Yi(e){return gi(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Ta)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=ye(t,ar);return n.J().next(s=>{const i=this.ns(s,Ta),o=s.filter(c=>i.indexOf(c)===-1);return v.forEach(o,c=>n.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?v.resolve(!0):Qr(e).get(Fn).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,wa)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new k(P.FAILED_PRECONDITION,va);return!1}}return!(!this.networkEnabled||!this.inForeground)||gi(e).J().next(n=>this.ns(n,wa).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&C(Vt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[Fs,ar],e=>{const t=new Wa(e,xe.ce);return this.Hi(t).next(()=>this.Yi(t))}),this.Ki.close(),this.ls()}ns(e,t){return e.filter(n=>this.ts(n.updateTimeMs,t)&&!this.ss(n.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>gi(e).J().next(t=>this.ns(t,Ta).map(n=>n.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return Ro.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Mw(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return bo.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){C(Vt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(u){return u===18?kT:u===17?op:u===16?VT:u===15?xc:u===14?ip:u===13?sp:u===12?CT:u===11?rp:void M(60245)}(this.xi);let o;return this.Ki.runTransaction(e,s,i,c=>(o=new Wa(c,this.ai?this.ai.next():xe.ce),t==="readwrite-primary"?this.ji(o).next(u=>!!u||this.Ji(o)).next(u=>{if(!u)throw de(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new k(P.FAILED_PRECONDITION,Hf);return n(o)}).next(u=>this.Zi(o).next(()=>u)):this.Ps(o).next(()=>n(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ps(e){return Qr(e).get(Fn).next(t=>{if(t!==null&&this.ts(t.leaseTimestampMs,wa)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new k(P.FAILED_PRECONDITION,va)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Qr(e).put(Fn,t)}static v(){return qt.v()}Hi(e){const t=Qr(e);return t.get(Fn).next(n=>this.Xi(n)?(C(Vt,"Releasing primary lease."),t.delete(Fn)):v.resolve())}ts(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(de(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.Oi=()=>{this._s();const t=/(?:Version|Mobile)\/1[456]/;Gd()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){var t;try{const n=((t=this.Ui)==null?void 0:t.getItem(this.rs(e)))!==null;return C(Vt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return de(Vt,"Failed to get zombied client id.",n),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){de("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Qr(r){return ye(r,Fs)}function gi(r){return ye(r,ar)}function mg(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class Xc{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Ts=n,this.Es=s}static Is(e,t){let n=G(),s=G();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Xc(e,t.fromCache,n,s)}}/**
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
 */class ev{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class _g{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return Gd()?8:Qf(_e())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.gs(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ps(e,t,s,n).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new ev;return this.ys(e,t,o).next(c=>{if(i.result=c,this.As)return this.ws(e,t,o,c.size)})}).next(()=>i.result)}ws(e,t,n,s){return n.documentReadCount<this.Vs?(zn()<=H.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",Kn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),v.resolve()):(zn()<=H.DEBUG&&C("QueryEngine","Query:",Kn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.ds*s?(zn()<=H.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",Kn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Be(t))):v.resolve())}gs(e,t){if(Ch(t))return v.resolve(null);let n=Be(t);return this.indexManager.getIndexType(e,n).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=tc(t,null,"F"),n=Be(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(i=>{const o=G(...i);return this.fs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,n).next(u=>{const h=this.Ss(t,c);return this.bs(t,h,o,u.readTime)?this.gs(e,tc(t,null,"F")):this.Ds(e,h,t,u)}))})))}ps(e,t,n,s){return Ch(t)||s.isEqual(U.min())?v.resolve(null):this.fs.getDocuments(e,n).next(i=>{const o=this.Ss(t,i);return this.bs(t,o,n,s)?v.resolve(null):(zn()<=H.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Kn(t)),this.Ds(e,o,t,Kf(s,rr)).next(c=>c))})}Ss(e,t){let n=new te(Cp(e));return t.forEach((s,i)=>{js(e,i)&&(n=n.add(i))}),n}bs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,n){return zn()<=H.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",Kn(t)),this.fs.getDocumentsMatchingQuery(e,t,qe.min(),n)}Ds(e,t,n,s){return this.fs.getDocumentsMatchingQuery(e,n,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */const Zc="LocalStore",tv=3e8;class nv{constructor(e,t,n,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new re(q),this.Fs=new It(i=>An(i),Us),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new gg(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function yg(r,e,t,n){return new nv(r,e,t,n)}async function Ig(r,e){const t=L(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(n))).next(i=>{const o=[],c=[];let u=G();for(const h of s){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next(h=>({Ns:h,removedBatchIds:o,addedBatchIds:c}))})})}function rv(r,e){const t=L(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return function(c,u,h,f){const g=h.batch,I=g.keys();let R=v.resolve();return I.forEach(V=>{R=R.next(()=>f.getEntry(u,V)).next(x=>{const N=h.docVersions.get(V);F(N!==null,48541),x.version.compareTo(N)<0&&(g.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),f.addEntry(x)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(u,g))}(t,n,e,i).next(()=>i.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let u=G();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(n,s))})}function Eg(r){const e=L(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function sv(r,e){const t=L(r),n=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const c=[];e.targetChanges.forEach((f,g)=>{const I=s.get(g);if(!I)return;c.push(t.li.removeMatchingKeys(i,f.removedDocuments,g).next(()=>t.li.addMatchingKeys(i,f.addedDocuments,g)));let R=I.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?R=R.withResumeToken(fe.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,n)),s=s.insert(g,R),function(x,N,z){return x.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=tv?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(I,R,f)&&c.push(t.li.updateTargetData(i,R))});let u=Ue(),h=G();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(iv(i,o,e.documentUpdates).next(f=>{u=f.Bs,h=f.Ls})),!n.isEqual(U.min())){const f=t.li.getLastRemoteSnapshotVersion(i).next(g=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,n));c.push(f)}return v.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(t.vs=s,i))}function iv(r,e,t){let n=G(),s=G();return t.forEach(i=>n=n.add(i)),e.getEntries(r,n).next(i=>{let o=Ue();return t.forEach((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(U.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):C(Zc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),{Bs:o,Ls:s}})}function ov(r,e){const t=L(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=gn),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function eo(r,e){const t=L(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return t.li.getTargetData(n,e).next(i=>i?(s=i,v.resolve(s)):t.li.allocateTargetId(n).next(o=>(s=new ft(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.li.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=t.vs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(n.targetId,n),t.Fs.set(e,n.targetId)),n})}async function gr(r,e,t){const n=L(r),s=n.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,o=>n.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Qt(o))throw o;C(Zc,`Failed to update sequence numbers for target ${e}: ${o}`)}n.vs=n.vs.remove(e),n.Fs.delete(s.target)}function uc(r,e,t){const n=L(r);let s=U.min(),i=G();return n.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,f){const g=L(u),I=g.Fs.get(f);return I!==void 0?v.resolve(g.vs.get(I)):g.li.getTargetData(h,f)}(n,o,Be(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.li.getMatchingKeysForTargetId(o,c.targetId).next(u=>{i=u})}).next(()=>n.Cs.getDocumentsMatchingQuery(o,e,t?s:U.min(),t?i:G())).next(c=>(vg(n,Pp(e),c),{documents:c,ks:i})))}function Tg(r,e){const t=L(r),n=L(t.li),s=t.vs.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",i=>n.At(i,e).next(o=>o?o.target:null))}function wg(r,e){const t=L(r),n=t.Ms.get(e)||U.min();return t.persistence.runTransaction("Get new document changes","readonly",s=>t.xs.getAllFromCollectionGroup(s,e,Kf(n,rr),Number.MAX_SAFE_INTEGER)).then(s=>(vg(t,e,s),s))}function vg(r,e,t){let n=r.Ms.get(e)||U.min();t.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.Ms.set(e,n)}/**
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
 */const Ag="firestore_clients";function od(r,e){return`${Ag}_${r}_${e}`}const Sg="firestore_mutations";function ad(r,e,t){let n=`${Sg}_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const bg="firestore_targets";function Aa(r,e){return`${bg}_${r}_${e}`}/**
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
 */const et="SharedClientState";class to{constructor(e,t,n,s){this.user=e,this.batchId=t,this.state=n,this.error=s}static $s(e,t,n){const s=JSON.parse(n);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new k(s.error.code,s.error.message))),o?new to(e,t,s.state,i):(de(et,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class fs{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static $s(e,t){const n=JSON.parse(t);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new k(n.error.code,n.error.message))),i?new fs(e,n.state,s):(de(et,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class no{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const n=JSON.parse(t);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=Uc();for(let o=0;s&&o<n.activeTargetIds.length;++o)s=Jf(n.activeTargetIds[o]),i=i.add(n.activeTargetIds[o]);return s?new no(e,i):(de(et,`Failed to parse client data for instance '${e}': ${t}`),null)}}class eu{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new eu(t.clientId,t.onlineState):(de(et,`Failed to parse online state: ${e}`),null)}}class lc{constructor(){this.activeTargetIds=Uc()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Sa{constructor(e,t,n,s,i){this.window=e,this.Ci=t,this.persistenceKey=n,this.zs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new re(q),this.started=!1,this.Zs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=od(this.persistenceKey,this.zs),this.Ys=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Hs=this.Hs.insert(this.zs,new lc),this.eo=new RegExp(`^${Ag}_${o}_([^_]*)$`),this.no=new RegExp(`^${Sg}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${bg}_${o}_(\\d+)$`),this.io=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.so=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const n of e){if(n===this.zs)continue;const s=this.getItem(od(this.persistenceKey,n));if(s){const i=no.$s(n,s);i&&(this.Hs=this.Hs.insert(i.clientId,i))}}this.oo();const t=this.storage.getItem(this.io);if(t){const n=this._o(t);n&&this.ao(n)}for(const n of this.Zs)this.Js(n);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach((n,s)=>{s.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,n){this.co(e,t,n),this.lo(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(Aa(this.persistenceKey,e));if(s){const i=fs.$s(e,s);i&&(n=i.state)}}return t&&this.ho.Qs(e),this.oo(),n}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Aa(this.persistenceKey,e))}updateQueryState(e,t,n){this.Po(e,t,n)}handleUserChange(e,t,n){t.forEach(s=>{this.lo(s)}),this.currentUser=e,n.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return C(et,"READ",e,t),t}setItem(e,t){C(et,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){C(et,"REMOVE",e),this.storage.removeItem(e)}Js(e){const t=e;if(t.storageArea===this.storage){if(C(et,"EVENT",t.key,t.newValue),t.key===this.Xs)return void de("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const n=this.Io(t.key);return this.Ro(n,null)}{const n=this.Ao(t.key,t.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.no.test(t.key)){if(t.newValue!==null){const n=this.Vo(t.key,t.newValue);if(n)return this.mo(n)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const n=this.fo(t.key,t.newValue);if(n)return this.po(n)}}else if(t.key===this.io){if(t.newValue!==null){const n=this._o(t.newValue);if(n)return this.ao(n)}}else if(t.key===this.Ys){const n=function(i){let o=xe.ce;if(i!=null)try{const c=JSON.parse(i);F(typeof c=="number",30636,{yo:i}),o=c}catch(c){de(et,"Failed to read sequence number from WebStorage",c)}return o}(t.newValue);n!==xe.ce&&this.sequenceNumberHandler(n)}else if(t.key===this.so){const n=this.wo(t.newValue);await Promise.all(n.map(s=>this.syncEngine.So(s)))}}}else this.Zs.push(t)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,n){const s=new to(this.currentUser,e,t,n),i=ad(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Ws())}lo(e){const t=ad(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,n){const s=Aa(this.persistenceKey,e),i=new fs(e,t,n);this.setItem(s,i.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const n=this.Io(e);return no.$s(n,t)}Vo(e,t){const n=this.no.exec(e),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return to.$s(new Se(i),s,t)}fo(e,t){const n=this.ro.exec(e),s=Number(n[1]);return fs.$s(s,t)}_o(e){return eu.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);C(et,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Hs.insert(e,t):this.Hs.remove(e),s=this.uo(this.Hs),i=this.uo(n),o=[],c=[];return i.forEach(u=>{s.has(u)||o.push(u)}),s.forEach(u=>{i.has(u)||c.push(u)}),this.syncEngine.Co(o,c).then(()=>{this.Hs=n})}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=Uc();return e.forEach((n,s)=>{t=t.unionWith(s.activeTargetIds)}),t}}class Rg{constructor(){this.vo=new lc,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new lc,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class av{Mo(e){}shutdown(){}}/**
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
 */const cd="ConnectivityMonitor";class ud{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){C(cd,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){C(cd,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let mi=null;function hc(){return mi===null?mi=function(){return 268435456+Math.round(2147483648*Math.random())}():mi++,"0x"+mi.toString(16)}/**
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
 */const ba="RestConnection",cv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class uv{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${n}/databases/${s}`,this.$o=this.databaseId.database===zi?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(e,t,n,s,i){const o=hc(),c=this.Qo(e,t.toUriEncodedString());C(ba,`Sending RPC '${e}' ${o}:`,c,n);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:h}=new URL(c),f=Ns(h);return this.zo(e,c,u,n,f).then(g=>(C(ba,`Received RPC '${e}' ${o}: `,g),g),g=>{throw tr(ba,`RPC '${e}' ${o} failed with error: `,g,"url: ",c,"request:",n),g})}jo(e,t,n,s,i,o){return this.Wo(e,t,n,s,i)}Go(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ar}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),n&&n.headers.forEach((s,i)=>e[i]=s)}Qo(e,t){const n=cv[e];let s=`${this.Ko}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class lv{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const Ae="WebChannelConnection",Jr=(r,e,t)=>{r.listen(e,n=>{try{t(n)}catch(s){setTimeout(()=>{throw s},0)}})};class Xn extends uv{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Xn.c_){const e=Uf();Jr(e,Ff.STAT_EVENT,t=>{t.stat===qa.PROXY?C(Ae,"STAT_EVENT: detected buffering proxy"):t.stat===qa.NOPROXY&&C(Ae,"STAT_EVENT: detected no buffering proxy")}),Xn.c_=!0}}zo(e,t,n,s,i){const o=hc();return new Promise((c,u)=>{const h=new Mf;h.setWithCredentials(!0),h.listenOnce(Lf.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Ti.NO_ERROR:const g=h.getResponseJson();C(Ae,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(g)),c(g);break;case Ti.TIMEOUT:C(Ae,`RPC '${e}' ${o} timed out`),u(new k(P.DEADLINE_EXCEEDED,"Request time out"));break;case Ti.HTTP_ERROR:const I=h.getStatus();if(C(Ae,`RPC '${e}' ${o} failed with status:`,I,"response text:",h.getResponseText()),I>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const V=R==null?void 0:R.error;if(V&&V.status&&V.message){const x=function(z){const $=z.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf($)>=0?$:P.UNKNOWN}(V.status);u(new k(x,V.message))}else u(new k(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new k(P.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{C(Ae,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(s);C(Ae,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,n,15)})}T_(e,t,n){const s=hc(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const h=i.join("");C(Ae,`Creating RPC '${e}' stream ${s}: ${h}`,c);const f=o.createWebChannel(h,c);this.E_(f);let g=!1,I=!1;const R=new lv({Jo:V=>{I?C(Ae,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(g||(C(Ae,`Opening RPC '${e}' stream ${s} transport.`),f.open(),g=!0),C(Ae,`RPC '${e}' stream ${s} sending:`,V),f.send(V))},Ho:()=>f.close()});return Jr(f,Zr.EventType.OPEN,()=>{I||(C(Ae,`RPC '${e}' stream ${s} transport opened.`),R.i_())}),Jr(f,Zr.EventType.CLOSE,()=>{I||(I=!0,C(Ae,`RPC '${e}' stream ${s} transport closed`),R.o_(),this.I_(f))}),Jr(f,Zr.EventType.ERROR,V=>{I||(I=!0,tr(Ae,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),R.o_(new k(P.UNAVAILABLE,"The operation could not be completed")))}),Jr(f,Zr.EventType.MESSAGE,V=>{var x;if(!I){const N=V.data[0];F(!!N,16349);const z=N,$=(z==null?void 0:z.error)||((x=z[0])==null?void 0:x.error);if($){C(Ae,`RPC '${e}' stream ${s} received error:`,$);const j=$.status;let se=function(E){const m=pe[E];if(m!==void 0)return qp(m)}(j),J=$.message;j==="NOT_FOUND"&&J.includes("database")&&J.includes("does not exist")&&J.includes(this.databaseId.database)&&tr(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),se===void 0&&(se=P.INTERNAL,J="Unknown error status: "+j+" with message "+$.message),I=!0,R.o_(new k(se,J)),f.close()}else C(Ae,`RPC '${e}' stream ${s} received:`,N),R.__(N)}}),Xn.u_(),setTimeout(()=>{R.s_()},0),R}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Bf()}}/**
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
 */function hv(r){return new Xn(r)}/**
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
 */function Pg(){return typeof window<"u"?window:null}function ki(){return typeof document<"u"?document:null}/**
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
 */function Co(r){return new mw(r,!0)}/**
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
 */Xn.c_=!1;class Cg{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&C("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const ld="PersistentStream";class Vg{constructor(e,t,n,s,i,o,c,u){this.Ci=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Cg(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(de(t.toString()),de("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.D_===t&&this.G_(n,s)},n=>{e(()=>{const s=new k(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)})})}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.Yo(()=>{n(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{n(()=>this.z_(s))}),this.stream.onMessage(s=>{n(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return C(ld,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(C(ld,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class dv extends Vg{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Iw(this.serializer,e),n=function(i){if(!("targetChange"in i))return U.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?U.min():o.readTime?De(o.readTime):U.min()}(e);return this.listener.H_(t,n)}Z_(e){const t={};t.database=sc(this.serializer),t.addTarget=function(i,o){let c;const u=o.target;if(c=Gi(u)?{documents:Qp(i,u)}:{query:Gc(i,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=zp(i,o.resumeToken);const h=nc(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(U.min())>0){c.readTime=pr(i,o.snapshotVersion.toTimestamp());const h=nc(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const n=ww(this.serializer,e);n&&(t.labels=n),this.q_(t)}X_(e){const t={};t.database=sc(this.serializer),t.removeTarget=e,this.q_(t)}}class fv extends Vg{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return F(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){F(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Ew(e.writeResults,e.commitTime),n=De(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=sc(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>Qi(this.serializer,n))};this.q_(t)}}/**
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
 */class pv{}class gv extends pv{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Wo(e,rc(t,n),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new k(P.UNKNOWN,i.toString())})}jo(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.jo(e,rc(t,n),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new k(P.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function mv(r,e,t,n){return new gv(r,e,t,n)}class _v{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(de(t),this.aa=!1):C("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Pn="RemoteStore";class yv{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(o=>{n.enqueueAndForget(async()=>{Nn(this)&&(C(Pn,"Restarting streams for network reachability change."),await async function(u){const h=L(u);h.Ia.add(4),await Ks(h),h.Va.set("Unknown"),h.Ia.delete(4),await Vo(h)}(this))})}),this.Va=new _v(n,s)}}async function Vo(r){if(Nn(r))for(const e of r.Ra)await e(!0)}async function Ks(r){for(const e of r.Ra)await e(!1)}function ko(r,e){const t=L(r);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),ru(t)?nu(t):Rr(t).O_()&&tu(t,e))}function mr(r,e){const t=L(r),n=Rr(t);t.Ea.delete(e),n.O_()&&kg(t,e),t.Ea.size===0&&(n.O_()?n.L_():Nn(t)&&t.Va.set("Unknown"))}function tu(r,e){if(r.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Rr(r).Z_(e)}function kg(r,e){r.da.$e(e),Rr(r).X_(e)}function nu(r){r.da=new dw({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ea.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),Rr(r).start(),r.Va.ua()}function ru(r){return Nn(r)&&!Rr(r).x_()&&r.Ea.size>0}function Nn(r){return L(r).Ia.size===0}function Dg(r){r.da=void 0}async function Iv(r){r.Va.set("Online")}async function Ev(r){r.Ea.forEach((e,t)=>{tu(r,e)})}async function Tv(r,e){Dg(r),ru(r)?(r.Va.ha(e),nu(r)):r.Va.set("Unknown")}async function wv(r,e,t){if(r.Va.set("Online"),e instanceof $p&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ea.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ea.delete(c),s.da.removeTarget(c))}(r,e)}catch(n){C(Pn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await ro(r,n)}else if(e instanceof Ci?r.da.Xe(e):e instanceof jp?r.da.st(e):r.da.tt(e),!t.isEqual(U.min()))try{const n=await Eg(r.localStore);t.compareTo(n)>=0&&await function(i,o){const c=i.da.Tt(o);return c.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ea.get(h);f&&i.Ea.set(h,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,h)=>{const f=i.Ea.get(u);if(!f)return;i.Ea.set(u,f.withResumeToken(fe.EMPTY_BYTE_STRING,f.snapshotVersion)),kg(i,u);const g=new ft(f.target,u,h,f.sequenceNumber);tu(i,g)}),i.remoteSyncer.applyRemoteEvent(c)}(r,t)}catch(n){C(Pn,"Failed to raise snapshot:",n),await ro(r,n)}}async function ro(r,e,t){if(!Qt(e))throw e;r.Ia.add(1),await Ks(r),r.Va.set("Offline"),t||(t=()=>Eg(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{C(Pn,"Retrying IndexedDB access"),await t(),r.Ia.delete(1),await Vo(r)})}function Ng(r,e){return e().catch(t=>ro(r,t,e))}async function br(r){const e=L(r),t=Kt(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:gn;for(;vv(e);)try{const s=await ov(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,Av(e,s)}catch(s){await ro(e,s)}xg(e)&&Og(e)}function vv(r){return Nn(r)&&r.Ta.length<10}function Av(r,e){r.Ta.push(e);const t=Kt(r);t.O_()&&t.Y_&&t.ea(e.mutations)}function xg(r){return Nn(r)&&!Kt(r).x_()&&r.Ta.length>0}function Og(r){Kt(r).start()}async function Sv(r){Kt(r).ra()}async function bv(r){const e=Kt(r);for(const t of r.Ta)e.ea(t.mutations)}async function Rv(r,e,t){const n=r.Ta.shift(),s=jc.from(n,e,t);await Ng(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await br(r)}async function Pv(r,e){e&&Kt(r).Y_&&await async function(n,s){if(function(o){return uw(o)&&o!==P.ABORTED}(s.code)){const i=n.Ta.shift();Kt(n).B_(),await Ng(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await br(n)}}(r,e),xg(r)&&Og(r)}async function hd(r,e){const t=L(r);t.asyncQueue.verifyOperationInProgress(),C(Pn,"RemoteStore received new credentials");const n=Nn(t);t.Ia.add(3),await Ks(t),n&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Vo(t)}async function dc(r,e){const t=L(r);e?(t.Ia.delete(2),await Vo(t)):e||(t.Ia.add(2),await Ks(t),t.Va.set("Unknown"))}function Rr(r){return r.ma||(r.ma=function(t,n,s){const i=L(t);return i.sa(),new dv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Zo:Iv.bind(null,r),Yo:Ev.bind(null,r),t_:Tv.bind(null,r),H_:wv.bind(null,r)}),r.Ra.push(async e=>{e?(r.ma.B_(),ru(r)?nu(r):r.Va.set("Unknown")):(await r.ma.stop(),Dg(r))})),r.ma}function Kt(r){return r.fa||(r.fa=function(t,n,s){const i=L(t);return i.sa(),new fv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Sv.bind(null,r),t_:Pv.bind(null,r),ta:bv.bind(null,r),na:Rv.bind(null,r)}),r.Ra.push(async e=>{e?(r.fa.B_(),await br(r)):(await r.fa.stop(),r.Ta.length>0&&(C(Pn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))})),r.fa}/**
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
 */class su{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new He,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,c=new su(e,t,o,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function iu(r,e){if(de("AsyncQueue",`${e}: ${r}`),Qt(r))return new k(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
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
 */class Zn{static emptySet(e){return new Zn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||O.comparator(t.key,n.key):(t,n)=>O.comparator(t.key,n.key),this.keyedMap=es(),this.sortedSet=new re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Zn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Zn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
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
 */class dd{constructor(){this.ga=new re(O.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):M(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class _r{constructor(e,t,n,s,i,o,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new _r(e,t,Zn.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&wo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class Cv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Vv{constructor(){this.queries=fd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=L(t),i=s.queries;s.queries=fd(),i.forEach((o,c)=>{for(const u of c.Sa)u.onError(n)})})(this,new k(P.ABORTED,"Firestore shutting down"))}}function fd(){return new It(r=>Rp(r),wo)}async function ou(r,e){const t=L(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(n=2):(i=new Cv,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=iu(o,`Initialization of query '${Kn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&cu(t)}async function au(r,e){const t=L(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function kv(r,e){const t=L(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(n=!0);o.wa=s}}n&&cu(t)}function Dv(r,e,t){const n=L(r),s=n.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);n.queries.delete(e)}function cu(r){r.Ca.forEach(e=>{e.next()})}var fc,pd;(pd=fc||(fc={})).Ma="default",pd.Cache="cache";class uu{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new _r(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=_r.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==fc.Cache}}/**
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
 */class Mg{constructor(e){this.key=e}}class Lg{constructor(e){this.key=e}}class Nv{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=G(),this.mutatedKeys=G(),this.eu=Cp(e),this.tu=new Zn(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new dd,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,g)=>{const I=s.get(f),R=js(this.query,g)?g:null,V=!!I&&this.mutatedKeys.has(I.key),x=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let N=!1;I&&R?I.data.isEqual(R.data)?V!==x&&(n.track({type:3,doc:R}),N=!0):this.su(I,R)||(n.track({type:2,doc:R}),N=!0,(u&&this.eu(R,u)>0||h&&this.eu(R,h)<0)&&(c=!0)):!I&&R?(n.track({type:0,doc:R}),N=!0):I&&!R&&(n.track({type:1,doc:I}),N=!0,(u||h)&&(c=!0)),N&&(R?(o=o.add(R),i=x?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:o,iu:n,bs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((f,g)=>function(R,V){const x=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:N})}};return x(R)-x(V)}(f.type,g.type)||this.eu(f.doc,g.doc)),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,h=u!==this.Xa;return this.Xa=u,o.length!==0||h?{snapshot:new _r(this.query,e.tu,i,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new dd,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=G(),this.tu.forEach(n=>{this.uu(n.key)&&(this.Ya=this.Ya.add(n.key))});const t=[];return e.forEach(n=>{this.Ya.has(n)||t.push(new Lg(n))}),this.Ya.forEach(n=>{e.has(n)||t.push(new Mg(n))}),t}cu(e){this.Za=e.ks,this.Ya=G();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return _r.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Pr="SyncEngine";class xv{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Ov{constructor(e){this.key=e,this.hu=!1}}class Mv{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new It(c=>Rp(c),wo),this.Eu=new Map,this.Iu=new Set,this.Ru=new re(O.comparator),this.Au=new Map,this.Vu=new Qc,this.du={},this.mu=new Map,this.fu=Rn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Lv(r,e,t=!0){const n=Do(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Fg(n,e,t,!0),s}async function Fv(r,e){const t=Do(r);await Fg(t,e,!0,!1)}async function Fg(r,e,t,n){const s=await eo(r.localStore,Be(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await lu(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&ko(r.remoteStore,s),c}async function lu(r,e,t,n,s){r.pu=(g,I,R)=>async function(x,N,z,$){let j=N.view.ru(z);j.bs&&(j=await uc(x.localStore,N.query,!1).then(({documents:E})=>N.view.ru(E,j)));const se=$&&$.targetChanges.get(N.targetId),J=$&&$.targetMismatches.get(N.targetId)!=null,Y=N.view.applyChanges(j,x.isPrimaryClient,se,J);return pc(x,N.targetId,Y.au),Y.snapshot}(r,g,I,R);const i=await uc(r.localStore,e,!0),o=new Nv(e,i.ks),c=o.ru(i.documents),u=zs.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(c,r.isPrimaryClient,u);pc(r,t,h.au);const f=new xv(e,t,o);return r.Tu.set(e,f),r.Eu.has(t)?r.Eu.get(t).push(e):r.Eu.set(t,[e]),h.snapshot}async function Uv(r,e,t){const n=L(r),s=n.Tu.get(e),i=n.Eu.get(s.targetId);if(i.length>1)return n.Eu.set(s.targetId,i.filter(o=>!wo(o,e))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await gr(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),t&&mr(n.remoteStore,s.targetId),yr(n,s.targetId)}).catch(Wt)):(yr(n,s.targetId),await gr(n.localStore,s.targetId,!0))}async function Bv(r,e){const t=L(r),n=t.Tu.get(e),s=t.Eu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),mr(t.remoteStore,n.targetId))}async function qv(r,e,t){const n=pu(r);try{const s=await function(o,c){const u=L(o),h=Z.now(),f=c.reduce((R,V)=>R.add(V.key),G());let g,I;return u.persistence.runTransaction("Locally write mutations","readwrite",R=>{let V=Ue(),x=G();return u.xs.getEntries(R,f).next(N=>{V=N,V.forEach((z,$)=>{$.isValidDocument()||(x=x.add(z))})}).next(()=>u.localDocuments.getOverlayedDocuments(R,V)).next(N=>{g=N;const z=[];for(const $ of c){const j=ow($,g.get($.key).overlayedDocument);j!=null&&z.push(new Et($.key,j,mp(j.value.mapValue),Re.exists(!0)))}return u.mutationQueue.addMutationBatch(R,h,z,c)}).next(N=>{I=N;const z=N.applyToLocalDocumentSet(g,x);return u.documentOverlayCache.saveOverlays(R,N.batchId,z)})}).then(()=>({batchId:I.batchId,changes:kp(g)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),function(o,c,u){let h=o.du[o.currentUser.toKey()];h||(h=new re(q)),h=h.insert(c,u),o.du[o.currentUser.toKey()]=h}(n,s.batchId,t),await Yt(n,s.changes),await br(n.remoteStore)}catch(s){const i=iu(s,"Failed to persist write");t.reject(i)}}async function Ug(r,e){const t=L(r);try{const n=await sv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Au.get(i);o&&(F(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?F(o.hu,14607):s.removedDocuments.size>0&&(F(o.hu,42227),o.hu=!1))}),await Yt(t,n,e)}catch(n){await Wt(n)}}function gd(r,e,t){const n=L(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const u=L(o);u.onlineState=c;let h=!1;u.queries.forEach((f,g)=>{for(const I of g.Sa)I.va(c)&&(h=!0)}),h&&cu(u)}(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function jv(r,e,t){const n=L(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let o=new re(O.comparator);o=o.insert(i,ue.newNoDocument(i,U.min()));const c=G().add(i),u=new $s(U.min(),new Map,new re(q),o,c);await Ug(n,u),n.Ru=n.Ru.remove(i),n.Au.delete(e),fu(n)}else await gr(n.localStore,e,!1).then(()=>yr(n,e,t)).catch(Wt)}async function $v(r,e){const t=L(r),n=e.batch.batchId;try{const s=await rv(t.localStore,e);du(t,n,null),hu(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Yt(t,s)}catch(s){await Wt(s)}}async function zv(r,e,t){const n=L(r);try{const s=await function(o,c){const u=L(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next(g=>(F(g!==null,37113),f=g.keys(),u.mutationQueue.removeMutationBatch(h,g))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(n.localStore,e);du(n,e,t),hu(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Yt(n,s)}catch(s){await Wt(s)}}function hu(r,e){(r.mu.get(e)||[]).forEach(t=>{t.resolve()}),r.mu.delete(e)}function du(r,e,t){const n=L(r);let s=n.du[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.du[n.currentUser.toKey()]=s}}function yr(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Eu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Eu.delete(e),r.isPrimaryClient&&r.Vu.Gr(e).forEach(n=>{r.Vu.containsKey(n)||Bg(r,n)})}function Bg(r,e){r.Iu.delete(e.path.canonicalString());const t=r.Ru.get(e);t!==null&&(mr(r.remoteStore,t),r.Ru=r.Ru.remove(e),r.Au.delete(t),fu(r))}function pc(r,e,t){for(const n of t)n instanceof Mg?(r.Vu.addReference(n.key,e),Kv(r,n)):n instanceof Lg?(C(Pr,"Document no longer in limbo: "+n.key),r.Vu.removeReference(n.key,e),r.Vu.containsKey(n.key)||Bg(r,n.key)):M(19791,{wu:n})}function Kv(r,e){const t=e.key,n=t.path.canonicalString();r.Ru.get(t)||r.Iu.has(n)||(C(Pr,"New document in limbo: "+t),r.Iu.add(n),fu(r))}function fu(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const e=r.Iu.values().next().value;r.Iu.delete(e);const t=new O(X.fromString(e)),n=r.fu.next();r.Au.set(n,new Ov(t)),r.Ru=r.Ru.insert(t,n),ko(r.remoteStore,new ft(Be(qs(t.path)),n,"TargetPurposeLimboResolution",xe.ce))}}async function Yt(r,e,t){const n=L(r),s=[],i=[],o=[];n.Tu.isEmpty()||(n.Tu.forEach((c,u)=>{o.push(n.pu(u,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){const g=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,g?"current":"not-current")}if(h){s.push(h);const g=Xc.Is(u.targetId,h);i.push(g)}}))}),await Promise.all(o),n.Pu.H_(s),await async function(u,h){const f=L(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>v.forEach(h,I=>v.forEach(I.Ts,R=>f.persistence.referenceDelegate.addReference(g,I.targetId,R)).next(()=>v.forEach(I.Es,R=>f.persistence.referenceDelegate.removeReference(g,I.targetId,R)))))}catch(g){if(!Qt(g))throw g;C(Zc,"Failed to update sequence numbers: "+g)}for(const g of h){const I=g.targetId;if(!g.fromCache){const R=f.vs.get(I),V=R.snapshotVersion,x=R.withLastLimboFreeSnapshotVersion(V);f.vs=f.vs.insert(I,x)}}}(n.localStore,i))}async function Gv(r,e){const t=L(r);if(!t.currentUser.isEqual(e)){C(Pr,"User change. New user:",e.toKey());const n=await Ig(t.localStore,e);t.currentUser=e,function(i,o){i.mu.forEach(c=>{c.forEach(u=>{u.reject(new k(P.CANCELLED,o))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Yt(t,n.Ns)}}function Hv(r,e){const t=L(r),n=t.Au.get(e);if(n&&n.hu)return G().add(n.key);{let s=G();const i=t.Eu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}async function Wv(r,e){const t=L(r),n=await uc(t.localStore,e.query,!0),s=e.view.cu(n);return t.isPrimaryClient&&pc(t,e.targetId,s.au),s}async function Qv(r,e){const t=L(r);return wg(t.localStore,e).then(n=>Yt(t,n))}async function Jv(r,e,t,n){const s=L(r),i=await function(c,u){const h=L(c),f=L(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",g=>f.Xn(g,u).next(I=>I?h.localDocuments.getDocuments(g,I):v.resolve(null)))}(s.localStore,e);i!==null?(t==="pending"?await br(s.remoteStore):t==="acknowledged"||t==="rejected"?(du(s,e,n||null),hu(s,e),function(c,u){L(L(c).mutationQueue).nr(u)}(s.localStore,e)):M(6720,"Unknown batchState",{Su:t}),await Yt(s,i)):C(Pr,"Cannot apply mutation batch with id: "+e)}async function Yv(r,e){const t=L(r);if(Do(t),pu(t),e===!0&&t.gu!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),s=await md(t,n.toArray());t.gu=!0,await dc(t.remoteStore,!0);for(const i of s)ko(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const n=[];let s=Promise.resolve();t.Eu.forEach((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):s=s.then(()=>(yr(t,o),gr(t.localStore,o,!0))),mr(t.remoteStore,o)}),await s,await md(t,n),function(o){const c=L(o);c.Au.forEach((u,h)=>{mr(c.remoteStore,h)}),c.Vu.zr(),c.Au=new Map,c.Ru=new re(O.comparator)}(t),t.gu=!1,await dc(t.remoteStore,!1)}}async function md(r,e,t){const n=L(r),s=[],i=[];for(const o of e){let c;const u=n.Eu.get(o);if(u&&u.length!==0){c=await eo(n.localStore,Be(u[0]));for(const h of u){const f=n.Tu.get(h),g=await Wv(n,f);g.snapshot&&i.push(g.snapshot)}}else{const h=await Tg(n.localStore,o);c=await eo(n.localStore,h),await lu(n,qg(h),o,!1,c.resumeToken)}s.push(c)}return n.Pu.H_(i),s}function qg(r){return Ap(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function Xv(r){return function(t){return L(L(t).persistence).hs()}(L(r).localStore)}async function Zv(r,e,t,n){const s=L(r);if(s.gu)return void C(Pr,"Ignoring unexpected query state notification.");const i=s.Eu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await wg(s.localStore,Pp(i[0])),c=$s.createSynthesizedRemoteEventForCurrentChange(e,t==="current",fe.EMPTY_BYTE_STRING);await Yt(s,o,c);break}case"rejected":await gr(s.localStore,e,!0),yr(s,e,n);break;default:M(64155,t)}}async function eA(r,e,t){const n=Do(r);if(n.gu){for(const s of e){if(n.Eu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){C(Pr,"Adding an already active target "+s);continue}const i=await Tg(n.localStore,s),o=await eo(n.localStore,i);await lu(n,qg(i),o.targetId,!1,o.resumeToken),ko(n.remoteStore,o)}for(const s of t)n.Eu.has(s)&&await gr(n.localStore,s,!1).then(()=>{mr(n.remoteStore,s),yr(n,s)}).catch(Wt)}}function Do(r){const e=L(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ug.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Hv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=jv.bind(null,e),e.Pu.H_=kv.bind(null,e.eventManager),e.Pu.yu=Dv.bind(null,e.eventManager),e}function pu(r){const e=L(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=$v.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=zv.bind(null,e),e}class Ps{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Co(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return yg(this.persistence,new _g,e.initialUser,this.serializer)}Cu(e){return new Jc(Po.Vi,this.serializer)}Du(e){return new Rg}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ps.provider={build:()=>new Ps};class tA extends Ps{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){F(this.persistence.referenceDelegate instanceof Zi,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new hg(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?be.withCacheSize(this.cacheSizeBytes):be.DEFAULT;return new Jc(n=>Zi.Vi(n,t),this.serializer)}}class jg extends Ps{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await pu(this.xu.syncEngine),await br(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return yg(this.persistence,new _g,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new hg(n,e.asyncQueue,t)}Mu(e,t){const n=new iT(t,this.persistence);return new sT(e.asyncQueue,n)}Cu(e){const t=mg(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?be.withCacheSize(this.cacheSizeBytes):be.DEFAULT;return new Yc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Pg(),ki(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new Rg}}class nA extends jg{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof Sa&&(this.sharedClientState.syncEngine={bo:Jv.bind(null,t),Do:Zv.bind(null,t),Co:eA.bind(null,t),hs:Xv.bind(null,t),So:Qv.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async n=>{await Yv(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Du(e){const t=Pg();if(!Sa.v(t))throw new k(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=mg(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Sa(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Cs{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>gd(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Gv.bind(null,this.syncEngine),await dc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Vv}()}createDatastore(e){const t=Co(e.databaseInfo.databaseId),n=hv(e.databaseInfo);return mv(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,s,i,o,c){return new yv(n,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>gd(this.syncEngine,t,0),function(){return ud.v()?new ud:new av}())}createSyncEngine(e,t){return function(s,i,o,c,u,h,f){const g=new Mv(s,i,o,c,u,h);return f&&(g.gu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=L(s);C(Pn,"RemoteStore shutting down."),i.Ia.add(5),await Ks(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Cs.provider={build:()=>new Cs};/**
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
 */class gu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):de("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Gt="FirestoreClient";class rA{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=Se.UNAUTHENTICATED,this.clientId=Pc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async o=>{C(Gt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(C(Gt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new He;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=iu(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Ra(r,e){r.asyncQueue.verifyOperationInProgress(),C(Gt,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await Ig(e.localStore,s),n=s)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function _d(r,e){r.asyncQueue.verifyOperationInProgress();const t=await sA(r);C(Gt,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>hd(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>hd(e.remoteStore,s)),r._onlineComponents=e}async function sA(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){C(Gt,"Using user provided OfflineComponentProvider");try{await Ra(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;tr("Error using user provided cache. Falling back to memory cache: "+t),await Ra(r,new Ps)}}else C(Gt,"Using default OfflineComponentProvider"),await Ra(r,new tA(void 0));return r._offlineComponents}async function mu(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(C(Gt,"Using user provided OnlineComponentProvider"),await _d(r,r._uninitializedComponentsProvider._online)):(C(Gt,"Using default OnlineComponentProvider"),await _d(r,new Cs))),r._onlineComponents}function iA(r){return mu(r).then(e=>e.syncEngine)}function oA(r){return mu(r).then(e=>e.datastore)}async function so(r){const e=await mu(r),t=e.eventManager;return t.onListen=Lv.bind(null,e.syncEngine),t.onUnlisten=Uv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Fv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Bv.bind(null,e.syncEngine),t}function aA(r,e,t,n){const s=new gu(n),i=new uu(e,s,t);return r.asyncQueue.enqueueAndForget(async()=>ou(await so(r),i)),()=>{s.Nu(),r.asyncQueue.enqueueAndForget(async()=>au(await so(r),i))}}function cA(r,e,t={}){const n=new He;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,h){const f=new gu({next:I=>{f.Nu(),o.enqueueAndForget(()=>au(i,g));const R=I.docs.has(c);!R&&I.fromCache?h.reject(new k(P.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&I.fromCache&&u&&u.source==="server"?h.reject(new k(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(I)},error:I=>h.reject(I)}),g=new uu(qs(c.path),f,{includeMetadataChanges:!0,qa:!0});return ou(i,g)}(await so(r),r.asyncQueue,e,t,n)),n.promise}function uA(r,e,t={}){const n=new He;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,h){const f=new gu({next:I=>{f.Nu(),o.enqueueAndForget(()=>au(i,g)),I.fromCache&&u.source==="server"?h.reject(new k(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(I)},error:I=>h.reject(I)}),g=new uu(c,f,{includeMetadataChanges:!0,qa:!0});return ou(i,g)}(await so(r),r.asyncQueue,e,t,n)),n.promise}function lA(r,e,t){const n=new He;return r.asyncQueue.enqueueAndForget(async()=>{try{const s=await oA(r);n.resolve(async function(o,c,u){var x;const h=L(o),{request:f,gt:g,parent:I}=Tw(h.serializer,HT(c),u);h.connection.qo||delete f.parent;const R=(await h.jo("RunAggregationQuery",h.serializer.databaseId,I,f,1)).filter(N=>!!N.result);F(R.length===1,64727);const V=(x=R[0].result)==null?void 0:x.aggregateFields;return Object.keys(V).reduce((N,z)=>(N[g[z]]=V[z],N),{})}(s,e,t))}catch(s){n.reject(s)}}),n.promise}function hA(r,e){const t=new He;return r.asyncQueue.enqueueAndForget(async()=>qv(await iA(r),e,t)),t.promise}/**
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
 */function $g(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
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
 */const dA="ComponentProvider",yd=new Map;function fA(r,e,t,n,s){return new xT(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,$g(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
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
 */const pA="firestore.googleapis.com",Id=!0;class Ed{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new k(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=pA,this.ssl=Id}else this.host=e.host,this.ssl=e.ssl??Id;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=og;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<lg)throw new k(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}tT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$g(e.experimentalLongPollingOptions??{}),function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class _u{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ed({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ed(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new GE;switch(n.type){case"firstParty":return new QE(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new k(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=yd.get(t);n&&(C(dA,"Removing Datastore"),yd.delete(t),n.terminate())}(this),Promise.resolve()}}/**
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
 */class xn{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new xn(this.firestore,e,this._query)}}class le{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new jt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new le(this.firestore,e,this._key)}toJSON(){return{type:le._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Ls(t,le._jsonSchema))return new le(e,n||null,new O(X.fromString(t.referencePath)))}}le._jsonSchemaVersion="firestore/documentReference/1.0",le._jsonSchema={type:ge("string",le._jsonSchemaVersion),referencePath:ge("string")};class jt extends xn{constructor(e,t,n){super(e,t,qs(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new le(this.firestore,null,new O(e))}withConverter(e){return new jt(this.firestore,e,this._path)}}function pb(r,e,...t){if(r=he(r),$f("collection","path",e),r instanceof _u){const n=X.fromString(e,...t);return lh(n),new jt(r,null,n)}{if(!(r instanceof le||r instanceof jt))throw new k(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return lh(n),new jt(r.firestore,null,n)}}function gA(r,e,...t){if(r=he(r),arguments.length===1&&(e=Pc.newId()),$f("doc","path",e),r instanceof _u){const n=X.fromString(e,...t);return uh(n),new le(r,null,new O(n))}{if(!(r instanceof le||r instanceof jt))throw new k(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return uh(n),new le(r.firestore,r instanceof jt?r.converter:null,new O(n))}}/**
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
 */const Td="AsyncQueue";class wd{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Cg(this,"async_queue_retry"),this._c=()=>{const n=ki();n&&C(Td,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=ki();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=ki();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new He;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Qt(e))throw e;C(Td,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(n=>{throw this.nc=n,this.rc=!1,de("INTERNAL UNHANDLED ERROR: ",vd(n)),n}).then(n=>(this.rc=!1,n))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=su.createAndSchedule(this,e,t,n,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:vd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{this.tc.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function vd(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class ct extends _u{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new wd,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new wd(e),this._firestoreClient=void 0,await e}}}function gb(r,e,t){t||(t=zi);const n=Er(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(En(i,e))return s;throw new k(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new k(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<lg)throw new k(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Ns(e.host)&&Qd(e.host),n.initialize({options:e,instanceIdentifier:t})}function Gs(r){if(r._terminated)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||mA(r),r._firestoreClient}function mA(r){var n,s,i,o;const e=r._freezeSettings(),t=fA(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,e);r._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new rA(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}}(r._componentsProvider))}/**
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
 */class je{constructor(e){this._byteString=e}static fromBase64String(e){try{return new je(fe.fromBase64String(e))}catch(t){throw new k(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new je(fe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:je._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ls(e,je._jsonSchema))return je.fromBase64String(e.bytes)}}je._jsonSchemaVersion="firestore/bytes/1.0",je._jsonSchema={type:ge("string",je._jsonSchemaVersion),bytes:ge("string")};/**
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
 */class No{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new k(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ae(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function mb(){return new No($a)}/**
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
 */class yu{constructor(e){this._methodName=e}}/**
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
 */class it{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new k(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new k(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return q(this._lat,e._lat)||q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:it._jsonSchemaVersion}}static fromJSON(e){if(Ls(e,it._jsonSchema))return new it(e.latitude,e.longitude)}}it._jsonSchemaVersion="firestore/geoPoint/1.0",it._jsonSchema={type:ge("string",it._jsonSchemaVersion),latitude:ge("number"),longitude:ge("number")};/**
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
 */class We{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:We._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ls(e,We._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new We(e.vectorValues);throw new k(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}We._jsonSchemaVersion="firestore/vectorValue/1.0",We._jsonSchema={type:ge("string",We._jsonSchemaVersion),vectorValues:ge("object")};/**
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
 */const _A=/^__.*__$/;class yA{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new Et(e,this.data,this.fieldMask,t,this.fieldTransforms):new Sr(e,this.data,t,this.fieldTransforms)}}class zg{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Et(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Kg(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:r})}}class Iu{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Iu({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.i({path:t,arrayElement:!1});return n.mc(e),n}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.i({path:t,arrayElement:!1});return n.Ac(),n}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return io(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(Kg(this.dataSource)&&_A.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class IA{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Co(e)}I(e,t,n,s=!1){return new Iu({dataSource:e,methodName:t,targetDoc:n,path:ae.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function xo(r){const e=r._freezeSettings(),t=Co(r._databaseId);return new IA(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Gg(r,e,t,n,s,i={}){const o=r.I(i.merge||i.mergeFields?2:0,e,t,s);Eu("Data must be an object, but it was:",o,n);const c=Hg(n,o);let u,h;if(i.merge)u=new Oe(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const g of i.mergeFields){const I=Ir(e,g,t);if(!o.contains(I))throw new k(P.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);Jg(f,I)||f.push(I)}u=new Oe(f),h=o.fieldTransforms.filter(g=>u.covers(g.field))}else u=null,h=o.fieldTransforms;return new yA(new we(c),u,h)}class Oo extends yu{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Oo}}function EA(r,e,t,n){const s=r.I(1,e,t);Eu("Data must be an object, but it was:",s,n);const i=[],o=we.empty();Jt(n,(u,h)=>{const f=Qg(e,u,t);h=he(h);const g=s.fc(f);if(h instanceof Oo)i.push(f);else{const I=Hs(h,g);I!=null&&(i.push(f),o.set(f,I))}});const c=new Oe(i);return new zg(o,c,s.fieldTransforms)}function TA(r,e,t,n,s,i){const o=r.I(1,e,t),c=[Ir(e,n,t)],u=[s];if(i.length%2!=0)throw new k(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<i.length;I+=2)c.push(Ir(e,i[I])),u.push(i[I+1]);const h=[],f=we.empty();for(let I=c.length-1;I>=0;--I)if(!Jg(h,c[I])){const R=c[I];let V=u[I];V=he(V);const x=o.fc(R);if(V instanceof Oo)h.push(R);else{const N=Hs(V,x);N!=null&&(h.push(R),f.set(R,N))}}const g=new Oe(h);return new zg(f,g,o.fieldTransforms)}function wA(r,e,t,n=!1){return Hs(t,r.I(n?4:3,e))}function Hs(r,e){if(Wg(r=he(r)))return Eu("Unsupported field value:",e,r),Hg(r,e);if(r instanceof yu)return function(n,s){if(!Kg(s.dataSource))throw s.yc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return function(n,s){const i=[];let o=0;for(const c of n){let u=Hs(c,s.gc(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(r,e)}return function(n,s){if((n=he(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return ZT(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Z.fromDate(n);return{timestampValue:pr(s.serializer,i)}}if(n instanceof Z){const i=new Z(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:pr(s.serializer,i)}}if(n instanceof it)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof je)return{bytesValue:zp(s.serializer,n._byteString)};if(n instanceof le){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.yc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Kc(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof We)return function(o,c){const u=o instanceof We?o.toArray():o;return{mapValue:{fields:{[Mc]:{stringValue:Lc},[cr]:{arrayValue:{values:u.map(f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return Bc(c.serializer,f)})}}}}}}(n,s);if(eg(n))return n._toProto(s.serializer);throw s.yc(`Unsupported field value: ${po(n)}`)}(r,e)}function Hg(r,e){const t={};return ap(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Jt(r,(n,s)=>{const i=Hs(s,e.dc(n));i!=null&&(t[n]=i)}),{mapValue:{fields:t}}}function Wg(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Z||r instanceof it||r instanceof je||r instanceof le||r instanceof yu||r instanceof We||eg(r))}function Eu(r,e,t){if(!Wg(t)||!zf(t)){const n=po(t);throw n==="an object"?e.yc(r+" a custom object"):e.yc(r+" "+n)}}function Ir(r,e,t){if((e=he(e))instanceof No)return e._internalPath;if(typeof e=="string")return Qg(r,e);throw io("Field path arguments must be of type string or ",r,!1,void 0,t)}const vA=new RegExp("[~\\*/\\[\\]]");function Qg(r,e,t){if(e.search(vA)>=0)throw io(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new No(...e.split("."))._internalPath}catch{throw io(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function io(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${n}`),o&&(u+=` in document ${s}`),u+=")"),new k(P.INVALID_ARGUMENT,c+r+u)}function Jg(r,e){return r.some(t=>t.isEqual(e))}/**
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
 */class AA{convertValue(e,t="none"){switch($t(e)){case 0:return null;case 1:return e.booleanValue;case 2:return oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(yt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Jt(e,(s,i)=>{n[s]=this.convertValue(i,t)}),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[cr].arrayValue)==null?void 0:s.values)==null?void 0:i.map(o=>oe(o.doubleValue));return new We(t)}convertGeoPoint(e){return new it(oe(e.latitude),oe(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Eo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ws(e));default:return null}}convertTimestamp(e){const t=_t(e);return new Z(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=X.fromString(e);F(Zp(n),9688,{name:e});const s=new vn(n.get(1),n.get(3)),i=new O(n.popFirst(5));return s.isEqual(t)||de(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */class Mo extends AA{constructor(e){super(),this.firestore=e}convertBytes(e){return new je(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new le(this.firestore,null,t)}}const Ad="@firebase/firestore",Sd="4.14.0";/**
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
 */function bd(r){return function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1}(r,["next","error","complete"])}/**
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
 */class SA{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class bA{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new we({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
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
 */class Yg{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new le(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new RA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Ir("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class RA extends Yg{data(){return super.data()}}/**
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
 */function Xg(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new k(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Tu{}class PA extends Tu{}function _b(r,e,...t){let n=[];e instanceof Tu&&n.push(e),n=n.concat(t),function(i){const o=i.filter(u=>u instanceof wu).length,c=i.filter(u=>u instanceof Lo).length;if(o>1||o>0&&c>0)throw new k(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class Lo extends PA{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Lo(e,t,n)}_apply(e){const t=this._parse(e);return Zg(e._query,t),new xn(e.firestore,e.converter,ec(e._query,t))}_parse(e){const t=xo(e.firestore);return function(i,o,c,u,h,f,g){let I;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new k(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Pd(g,f);const V=[];for(const x of g)V.push(Rd(u,i,x));I={arrayValue:{values:V}}}else I=Rd(u,i,g)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Pd(g,f),I=wA(c,o,g,f==="in"||f==="not-in");return W.create(h,f,I)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function yb(r,e,t){const n=e,s=Ir("where",r);return Lo._create(s,n,t)}class wu extends Tu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new wu(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:ee.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)Zg(o,u),o=ec(o,u)}(e._query,t),new xn(e.firestore,e.converter,ec(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Rd(r,e,t){if(typeof(t=he(t))=="string"){if(t==="")throw new k(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Sp(e)&&t.indexOf("/")!==-1)throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(X.fromString(t));if(!O.isDocumentKey(n))throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return As(r,new O(n))}if(t instanceof le)return As(r,t._key);throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${po(t)}.`)}function Pd(r,e){if(!Array.isArray(r)||r.length===0)throw new k(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Zg(r,e){const t=function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new k(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new k(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function em(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}function CA(){return new SA("count")}/**
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
 */function Ib(r){return VA(r,{count:CA()})}function VA(r,e){const t=Me(r.firestore,ct),n=Gs(t),s=DT(e,(i,o)=>new aw(o,i.aggregateType,i._internalFieldPath));return lA(n,r._query,s).then(i=>function(c,u,h){const f=new Mo(c);return new bA(u,f,h)}(t,r,i))}class kA{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=xA(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function Eb(r){return new kA(r)}class DA{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Cs.provider,this._offlineComponentProvider={build:t=>new jg(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class NA{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Cs.provider,this._offlineComponentProvider={build:t=>new nA(t,e==null?void 0:e.cacheSizeBytes)}}}function xA(r){return new DA(r==null?void 0:r.forceOwnership)}function Tb(){return new NA}class rs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class yn extends Yg{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Di(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Ir("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=yn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}yn._jsonSchemaVersion="firestore/documentSnapshot/1.0",yn._jsonSchema={type:ge("string",yn._jsonSchemaVersion),bundleSource:ge("string","DocumentSnapshot"),bundleName:ge("string"),bundle:ge("string")};class Di extends yn{data(e={}){return super.data(e)}}class In{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new rs(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Di(this._firestore,this._userDataWriter,n.key,n,new rs(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new k(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{const u=new Di(s._firestore,s._userDataWriter,c.doc.key,c.doc,new rs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Di(s._firestore,s._userDataWriter,c.doc.key,c.doc,new rs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:OA(c.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=In._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Pc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function OA(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
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
 */In._jsonSchemaVersion="firestore/querySnapshot/1.0",In._jsonSchema={type:ge("string",In._jsonSchemaVersion),bundleSource:ge("string","QuerySnapshot"),bundleName:ge("string"),bundle:ge("string")};/**
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
 */function wb(r){r=Me(r,le);const e=Me(r.firestore,ct),t=Gs(e);return cA(t,r._key).then(n=>tm(e,r,n))}function vb(r){r=Me(r,xn);const e=Me(r.firestore,ct),t=Gs(e),n=new Mo(e);return Xg(r._query),uA(t,r._query).then(s=>new In(e,n,r,s))}function Ab(r,e,t){r=Me(r,le);const n=Me(r.firestore,ct),s=em(r.converter,e,t),i=xo(n);return Fo(n,[Gg(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,Re.none())])}function Sb(r,e,t,...n){r=Me(r,le);const s=Me(r.firestore,ct),i=xo(s);let o;return o=typeof(e=he(e))=="string"||e instanceof No?TA(i,"updateDoc",r._key,e,t,n):EA(i,"updateDoc",r._key,e),Fo(s,[o.toMutation(r._key,Re.exists(!0))])}function bb(r){return Fo(Me(r.firestore,ct),[new So(r._key,Re.none())])}function Rb(r,e){const t=Me(r.firestore,ct),n=gA(r),s=em(r.converter,e),i=xo(r.firestore);return Fo(t,[Gg(i,"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,Re.exists(!1))]).then(()=>n)}function Pb(r,...e){var h,f,g;r=he(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||bd(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(bd(e[n])){const I=e[n];e[n]=(h=I.next)==null?void 0:h.bind(I),e[n+1]=(f=I.error)==null?void 0:f.bind(I),e[n+2]=(g=I.complete)==null?void 0:g.bind(I)}let i,o,c;if(r instanceof le)o=Me(r.firestore,ct),c=qs(r._key.path),i={next:I=>{e[n]&&e[n](tm(o,r,I))},error:e[n+1],complete:e[n+2]};else{const I=Me(r,xn);o=Me(I.firestore,ct),c=I._query;const R=new Mo(o);i={next:V=>{e[n]&&e[n](new In(o,R,I,V))},error:e[n+1],complete:e[n+2]},Xg(r._query)}const u=Gs(o);return aA(u,c,s,i)}function Fo(r,e){const t=Gs(r);return hA(t,e)}function tm(r,e,t){const n=t.docs.get(e._key),s=new Mo(r);return new yn(r,s,e._key,n,new rs(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){zE(Tr),ot(new Qe("firestore",(n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),c=new ct(new HE(n.getProvider("auth-internal")),new JE(o,n.getProvider("app-check-internal")),OT(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),$e(Ad,Sd,e),$e(Ad,Sd,"esm2020")})();var MA="firebase",LA="12.12.0";/**
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
 */$e(MA,LA,"app");const nm="@firebase/installations",vu="0.6.21";/**
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
 */const rm=1e4,sm=`w:${vu}`,im="FIS_v2",FA="https://firebaseinstallations.googleapis.com/v1",UA=60*60*1e3,BA="installations",qA="Installations";/**
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
 */const jA={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Cn=new kn(BA,qA,jA);function om(r){return r instanceof ut&&r.code.includes("request-failed")}/**
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
 */function am({projectId:r}){return`${FA}/projects/${r}/installations`}function cm(r){return{token:r.token,requestStatus:2,expiresIn:zA(r.expiresIn),creationTime:Date.now()}}async function um(r,e){const n=(await e.json()).error;return Cn.create("request-failed",{requestName:r,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function lm({apiKey:r}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":r})}function $A(r,{refreshToken:e}){const t=lm(r);return t.append("Authorization",KA(e)),t}async function hm(r){const e=await r();return e.status>=500&&e.status<600?r():e}function zA(r){return Number(r.replace("s","000"))}function KA(r){return`${im} ${r}`}/**
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
 */async function GA({appConfig:r,heartbeatServiceProvider:e},{fid:t}){const n=am(r),s=lm(r),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={fid:t,authVersion:im,appId:r.appId,sdkVersion:sm},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await hm(()=>fetch(n,c));if(u.ok){const h=await u.json();return{fid:h.fid||t,registrationStatus:2,refreshToken:h.refreshToken,authToken:cm(h.authToken)}}else throw await um("Create Installation",u)}/**
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
 */function dm(r){return new Promise(e=>{setTimeout(e,r)})}/**
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
 */function HA(r){return btoa(String.fromCharCode(...r)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const WA=/^[cdef][\w-]{21}$/,gc="";function QA(){try{const r=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(r),r[0]=112+r[0]%16;const t=JA(r);return WA.test(t)?t:gc}catch{return gc}}function JA(r){return HA(r).substr(0,22)}/**
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
 */function Uo(r){return`${r.appName}!${r.appId}`}/**
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
 */const fm=new Map;function pm(r,e){const t=Uo(r);gm(t,e),YA(t,e)}function gm(r,e){const t=fm.get(r);if(t)for(const n of t)n(e)}function YA(r,e){const t=XA();t&&t.postMessage({key:r,fid:e}),ZA()}let pn=null;function XA(){return!pn&&"BroadcastChannel"in self&&(pn=new BroadcastChannel("[Firebase] FID Change"),pn.onmessage=r=>{gm(r.data.key,r.data.fid)}),pn}function ZA(){fm.size===0&&pn&&(pn.close(),pn=null)}/**
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
 */const eS="firebase-installations-database",tS=1,Vn="firebase-installations-store";let Pa=null;function Au(){return Pa||(Pa=co(eS,tS,{upgrade:(r,e)=>{switch(e){case 0:r.createObjectStore(Vn)}}})),Pa}async function oo(r,e){const t=Uo(r),s=(await Au()).transaction(Vn,"readwrite"),i=s.objectStore(Vn),o=await i.get(t);return await i.put(e,t),await s.done,(!o||o.fid!==e.fid)&&pm(r,e.fid),e}async function mm(r){const e=Uo(r),n=(await Au()).transaction(Vn,"readwrite");await n.objectStore(Vn).delete(e),await n.done}async function Bo(r,e){const t=Uo(r),s=(await Au()).transaction(Vn,"readwrite"),i=s.objectStore(Vn),o=await i.get(t),c=e(o);return c===void 0?await i.delete(t):await i.put(c,t),await s.done,c&&(!o||o.fid!==c.fid)&&pm(r,c.fid),c}/**
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
 */async function Su(r){let e;const t=await Bo(r.appConfig,n=>{const s=nS(n),i=rS(r,s);return e=i.registrationPromise,i.installationEntry});return t.fid===gc?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function nS(r){const e=r||{fid:QA(),registrationStatus:0};return _m(e)}function rS(r,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Cn.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},n=sS(r,t);return{installationEntry:t,registrationPromise:n}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:iS(r)}:{installationEntry:e}}async function sS(r,e){try{const t=await GA(r,e);return oo(r.appConfig,t)}catch(t){throw om(t)&&t.customData.serverCode===409?await mm(r.appConfig):await oo(r.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function iS(r){let e=await Cd(r.appConfig);for(;e.registrationStatus===1;)await dm(100),e=await Cd(r.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:n}=await Su(r);return n||t}return e}function Cd(r){return Bo(r,e=>{if(!e)throw Cn.create("installation-not-found");return _m(e)})}function _m(r){return oS(r)?{fid:r.fid,registrationStatus:0}:r}function oS(r){return r.registrationStatus===1&&r.registrationTime+rm<Date.now()}/**
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
 */async function aS({appConfig:r,heartbeatServiceProvider:e},t){const n=cS(r,t),s=$A(r,t),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={installation:{sdkVersion:sm,appId:r.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await hm(()=>fetch(n,c));if(u.ok){const h=await u.json();return cm(h)}else throw await um("Generate Auth Token",u)}function cS(r,{fid:e}){return`${am(r)}/${e}/authTokens:generate`}/**
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
 */async function bu(r,e=!1){let t;const n=await Bo(r.appConfig,i=>{if(!ym(i))throw Cn.create("not-registered");const o=i.authToken;if(!e&&hS(o))return i;if(o.requestStatus===1)return t=uS(r,e),i;{if(!navigator.onLine)throw Cn.create("app-offline");const c=fS(i);return t=lS(r,c),c}});return t?await t:n.authToken}async function uS(r,e){let t=await Vd(r.appConfig);for(;t.authToken.requestStatus===1;)await dm(100),t=await Vd(r.appConfig);const n=t.authToken;return n.requestStatus===0?bu(r,e):n}function Vd(r){return Bo(r,e=>{if(!ym(e))throw Cn.create("not-registered");const t=e.authToken;return pS(t)?{...e,authToken:{requestStatus:0}}:e})}async function lS(r,e){try{const t=await aS(r,e),n={...e,authToken:t};return await oo(r.appConfig,n),t}catch(t){if(om(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await mm(r.appConfig);else{const n={...e,authToken:{requestStatus:0}};await oo(r.appConfig,n)}throw t}}function ym(r){return r!==void 0&&r.registrationStatus===2}function hS(r){return r.requestStatus===2&&!dS(r)}function dS(r){const e=Date.now();return e<r.creationTime||r.creationTime+r.expiresIn<e+UA}function fS(r){const e={requestStatus:1,requestTime:Date.now()};return{...r,authToken:e}}function pS(r){return r.requestStatus===1&&r.requestTime+rm<Date.now()}/**
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
 */async function gS(r){const e=r,{installationEntry:t,registrationPromise:n}=await Su(e);return n?n.catch(console.error):bu(e).catch(console.error),t.fid}/**
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
 */async function mS(r,e=!1){const t=r;return await _S(t),(await bu(t,e)).token}async function _S(r){const{registrationPromise:e}=await Su(r);e&&await e}/**
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
 */function yS(r){if(!r||!r.options)throw Ca("App Configuration");if(!r.name)throw Ca("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!r.options[t])throw Ca(t);return{appName:r.name,projectId:r.options.projectId,apiKey:r.options.apiKey,appId:r.options.appId}}function Ca(r){return Cn.create("missing-app-config-values",{valueName:r})}/**
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
 */const Im="installations",IS="installations-internal",ES=r=>{const e=r.getProvider("app").getImmediate(),t=yS(e),n=Er(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},TS=r=>{const e=r.getProvider("app").getImmediate(),t=Er(e,Im).getImmediate();return{getId:()=>gS(t),getToken:s=>mS(t,s)}};function wS(){ot(new Qe(Im,ES,"PUBLIC")),ot(new Qe(IS,TS,"PRIVATE"))}wS();$e(nm,vu);$e(nm,vu,"esm2020");/**
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
 */const vS="/firebase-messaging-sw.js",AS="/firebase-cloud-messaging-push-scope",Em="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",SS="https://fcmregistrations.googleapis.com/v1",Tm="google.c.a.c_id",bS="google.c.a.c_l",RS="google.c.a.ts",PS="google.c.a.e",kd=1e4;var Dd;(function(r){r[r.DATA_MESSAGE=1]="DATA_MESSAGE",r[r.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Dd||(Dd={}));/**
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
 */var Vs;(function(r){r.PUSH_RECEIVED="push-received",r.NOTIFICATION_CLICKED="notification-clicked"})(Vs||(Vs={}));/**
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
 */function lt(r){const e=new Uint8Array(r);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function CS(r){const e="=".repeat((4-r.length%4)%4),t=(r+e).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),s=new Uint8Array(n.length);for(let i=0;i<n.length;++i)s[i]=n.charCodeAt(i);return s}/**
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
 */const Va="fcm_token_details_db",VS=5,Nd="fcm_token_object_Store";async function kS(r){if("databases"in indexedDB&&!(await indexedDB.databases()).map(i=>i.name).includes(Va))return null;let e=null;return(await co(Va,VS,{upgrade:async(n,s,i,o)=>{if(s<2||!n.objectStoreNames.contains(Nd))return;const c=o.objectStore(Nd),u=await c.index("fcmSenderId").get(r);if(await c.clear(),!!u){if(s===2){const h=u;if(!h.auth||!h.p256dh||!h.endpoint)return;e={token:h.fcmToken,createTime:h.createTime??Date.now(),subscriptionOptions:{auth:h.auth,p256dh:h.p256dh,endpoint:h.endpoint,swScope:h.swScope,vapidKey:typeof h.vapidKey=="string"?h.vapidKey:lt(h.vapidKey)}}}else if(s===3){const h=u;e={token:h.fcmToken,createTime:h.createTime,subscriptionOptions:{auth:lt(h.auth),p256dh:lt(h.p256dh),endpoint:h.endpoint,swScope:h.swScope,vapidKey:lt(h.vapidKey)}}}else if(s===4){const h=u;e={token:h.fcmToken,createTime:h.createTime,subscriptionOptions:{auth:lt(h.auth),p256dh:lt(h.p256dh),endpoint:h.endpoint,swScope:h.swScope,vapidKey:lt(h.vapidKey)}}}}}})).close(),await pa(Va),await pa("fcm_vapid_details_db"),await pa("undefined"),DS(e)?e:null}function DS(r){if(!r||!r.subscriptionOptions)return!1;const{subscriptionOptions:e}=r;return typeof r.createTime=="number"&&r.createTime>0&&typeof r.token=="string"&&r.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const NS="firebase-messaging-database",xS=1,ks="firebase-messaging-store";let ka=null;function wm(){return ka||(ka=co(NS,xS,{upgrade:(r,e)=>{switch(e){case 0:r.createObjectStore(ks)}}})),ka}async function OS(r){const e=vm(r),n=await(await wm()).transaction(ks).objectStore(ks).get(e);if(n)return n;{const s=await kS(r.appConfig.senderId);if(s)return await Ru(r,s),s}}async function Ru(r,e){const t=vm(r),s=(await wm()).transaction(ks,"readwrite");return await s.objectStore(ks).put(e,t),await s.done,e}function vm({appConfig:r}){return r.appId}/**
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
 */const MS={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Ce=new kn("messaging","Messaging",MS);/**
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
 */async function LS(r,e){const t=await Cu(r),n=Am(e),s={method:"POST",headers:t,body:JSON.stringify(n)};let i;try{i=await(await fetch(Pu(r.appConfig),s)).json()}catch(o){throw Ce.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw Ce.create("token-subscribe-failed",{errorInfo:o})}if(!i.token)throw Ce.create("token-subscribe-no-token");return i.token}async function FS(r,e){const t=await Cu(r),n=Am(e.subscriptionOptions),s={method:"PATCH",headers:t,body:JSON.stringify(n)};let i;try{i=await(await fetch(`${Pu(r.appConfig)}/${e.token}`,s)).json()}catch(o){throw Ce.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw Ce.create("token-update-failed",{errorInfo:o})}if(!i.token)throw Ce.create("token-update-no-token");return i.token}async function US(r,e){const n={method:"DELETE",headers:await Cu(r)};try{const i=await(await fetch(`${Pu(r.appConfig)}/${e}`,n)).json();if(i.error){const o=i.error.message;throw Ce.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw Ce.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function Pu({projectId:r}){return`${SS}/projects/${r}/registrations`}async function Cu({appConfig:r,installations:e}){const t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":r.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function Am({p256dh:r,auth:e,endpoint:t,vapidKey:n}){const s={web:{endpoint:t,auth:e,p256dh:r}};return n!==Em&&(s.web.applicationPubKey=n),s}/**
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
 */const BS=7*24*60*60*1e3;async function qS(r){const e=await $S(r.swRegistration,r.vapidKey),t={vapidKey:r.vapidKey,swScope:r.swRegistration.scope,endpoint:e.endpoint,auth:lt(e.getKey("auth")),p256dh:lt(e.getKey("p256dh"))},n=await OS(r.firebaseDependencies);if(n){if(zS(n.subscriptionOptions,t))return Date.now()>=n.createTime+BS?jS(r,{token:n.token,createTime:Date.now(),subscriptionOptions:t}):n.token;try{await US(r.firebaseDependencies,n.token)}catch(s){console.warn(s)}return xd(r.firebaseDependencies,t)}else return xd(r.firebaseDependencies,t)}async function jS(r,e){try{const t=await FS(r.firebaseDependencies,e),n={...e,token:t,createTime:Date.now()};return await Ru(r.firebaseDependencies,n),t}catch(t){throw t}}async function xd(r,e){const n={token:await LS(r,e),createTime:Date.now(),subscriptionOptions:e};return await Ru(r,n),n.token}async function $S(r,e){const t=await r.pushManager.getSubscription();return t||r.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:CS(e)})}function zS(r,e){const t=e.vapidKey===r.vapidKey,n=e.endpoint===r.endpoint,s=e.auth===r.auth,i=e.p256dh===r.p256dh;return t&&n&&s&&i}/**
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
 */function Od(r){const e={from:r.from,collapseKey:r.collapse_key,messageId:r.fcmMessageId};return KS(e,r),GS(e,r),HS(e,r),e}function KS(r,e){if(!e.notification)return;r.notification={};const t=e.notification.title;t&&(r.notification.title=t);const n=e.notification.body;n&&(r.notification.body=n);const s=e.notification.image;s&&(r.notification.image=s);const i=e.notification.icon;i&&(r.notification.icon=i)}function GS(r,e){e.data&&(r.data=e.data)}function HS(r,e){var s,i,o,c;if(!e.fcmOptions&&!((s=e.notification)!=null&&s.click_action))return;r.fcmOptions={};const t=((i=e.fcmOptions)==null?void 0:i.link)??((o=e.notification)==null?void 0:o.click_action);t&&(r.fcmOptions.link=t);const n=(c=e.fcmOptions)==null?void 0:c.analytics_label;n&&(r.fcmOptions.analyticsLabel=n)}/**
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
 */function WS(r){return typeof r=="object"&&!!r&&Tm in r}/**
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
 */function QS(r){if(!r||!r.options)throw Da("App Configuration Object");if(!r.name)throw Da("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=r;for(const n of e)if(!t[n])throw Da(n);return{appName:r.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function Da(r){return Ce.create("missing-app-config-values",{valueName:r})}/**
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
 */class JS{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=QS(e);this.firebaseDependencies={app:e,appConfig:s,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}/**
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
 */async function YS(r){try{r.swRegistration=await navigator.serviceWorker.register(vS,{scope:AS}),r.swRegistration.update().catch(()=>{}),await XS(r.swRegistration)}catch(e){throw Ce.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}async function XS(r){return new Promise((e,t)=>{const n=setTimeout(()=>t(new Error(`Service worker not registered after ${kd} ms`)),kd),s=r.installing||r.waiting;r.active?(clearTimeout(n),e()):s?s.onstatechange=i=>{var o;((o=i.target)==null?void 0:o.state)==="activated"&&(s.onstatechange=null,clearTimeout(n),e())}:(clearTimeout(n),t(new Error("No incoming service worker found.")))})}/**
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
 */async function ZS(r,e){if(!e&&!r.swRegistration&&await YS(r),!(!e&&r.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Ce.create("invalid-sw-registration");r.swRegistration=e}}/**
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
 */async function eb(r,e){e?r.vapidKey=e:r.vapidKey||(r.vapidKey=Em)}/**
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
 */async function Sm(r,e){if(!navigator)throw Ce.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Ce.create("permission-blocked");return await eb(r,e==null?void 0:e.vapidKey),await ZS(r,e==null?void 0:e.serviceWorkerRegistration),qS(r)}/**
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
 */async function tb(r,e,t){const n=nb(e);(await r.firebaseDependencies.analyticsProvider.get()).logEvent(n,{message_id:t[Tm],message_name:t[bS],message_time:t[RS],message_device_time:Math.floor(Date.now()/1e3)})}function nb(r){switch(r){case Vs.NOTIFICATION_CLICKED:return"notification_open";case Vs.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function rb(r,e){const t=e.data;if(!t.isFirebaseMessaging)return;r.onMessageHandler&&t.messageType===Vs.PUSH_RECEIVED&&(typeof r.onMessageHandler=="function"?r.onMessageHandler(Od(t)):r.onMessageHandler.next(Od(t)));const n=t.data;WS(n)&&n[PS]==="1"&&await tb(r,t.messageType,n)}const Md="@firebase/messaging",Ld="0.12.25";/**
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
 */const sb=r=>{const e=new JS(r.getProvider("app").getImmediate(),r.getProvider("installations-internal").getImmediate(),r.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>rb(e,t)),e},ib=r=>{const e=r.getProvider("messaging").getImmediate();return{getToken:n=>Sm(e,n)}};function ob(){ot(new Qe("messaging",sb,"PUBLIC")),ot(new Qe("messaging-internal",ib,"PRIVATE")),$e(Md,Ld),$e(Md,Ld,"esm2020")}/**
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
 */async function ab(){try{await Wd()}catch{return!1}return typeof window<"u"&&mc()&&y_()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function cb(r,e){if(!navigator)throw Ce.create("only-available-in-window");return r.onMessageHandler=e,()=>{r.onMessageHandler=null}}/**
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
 */function Cb(r=Xd()){return ab().then(e=>{if(!e)throw Ce.create("unsupported-browser")},e=>{throw Ce.create("indexed-db-unsupported")}),Er(he(r),"messaging").getImmediate()}async function Vb(r,e){return r=he(r),Sm(r,e)}function kb(r,e){return r=he(r),cb(r,e)}ob();export{gb as a,ab as b,Cb as c,Tb as d,OI as e,wb as f,db as g,gA as h,vy as i,Vb as j,Ab as k,kb as l,pb as m,Pb as n,hb as o,Eb as p,_b as q,mb as r,lb as s,vb as t,bb as u,Ib as v,yb as w,Sb as x,Rb as y,ub as z};
