function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();var r={exports:{}},t={},n={exports:{}},a={},o=Symbol.for("react.element"),i=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),p=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),m=Symbol.iterator;var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,v={};function y(e,r,t){this.props=e,this.context=r,this.refs=v,this.updater=t||g}function w(){}function k(e,r,t){this.props=e,this.context=r,this.refs=v,this.updater=t||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,r){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,r,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},w.prototype=y.prototype;var j=k.prototype=new w;j.constructor=k,b(j,y.prototype),j.isPureReactComponent=!0;var S=Array.isArray,z=Object.prototype.hasOwnProperty,$={current:null},C={key:!0,ref:!0,__self:!0,__source:!0};function E(e,r,t){var n,a={},i=null,l=null;if(null!=r)for(n in void 0!==r.ref&&(l=r.ref),void 0!==r.key&&(i=""+r.key),r)z.call(r,n)&&!C.hasOwnProperty(n)&&(a[n]=r[n]);var s=arguments.length-2;if(1===s)a.children=t;else if(1<s){for(var d=Array(s),c=0;c<s;c++)d[c]=arguments[c+2];a.children=d}if(e&&e.defaultProps)for(n in s=e.defaultProps)void 0===a[n]&&(a[n]=s[n]);return{$$typeof:o,type:e,key:i,ref:l,props:a,_owner:$.current}}function _(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var D=/\/+/g;function T(e,r){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return r[e]})}(""+e.key):r.toString(36)}function N(e,r,t,n,a){var l=typeof e;"undefined"!==l&&"boolean"!==l||(e=null);var s=!1;if(null===e)s=!0;else switch(l){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case o:case i:s=!0}}if(s)return a=a(s=e),e=""===n?"."+T(s,0):n,S(a)?(t="",null!=e&&(t=e.replace(D,"$&/")+"/"),N(a,r,t,"",function(e){return e})):null!=a&&(_(a)&&(a=function(e,r){return{$$typeof:o,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}(a,t+(!a.key||s&&s.key===a.key?"":(""+a.key).replace(D,"$&/")+"/")+e)),r.push(a)),1;if(s=0,n=""===n?".":n+":",S(e))for(var d=0;d<e.length;d++){var c=n+T(l=e[d],d);s+=N(l,r,t,c,a)}else if(c=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=m&&e[m]||e["@@iterator"])?e:null}(e),"function"==typeof c)for(e=c.call(e),d=0;!(l=e.next()).done;)s+=N(l=l.value,r,t,c=n+T(l,d++),a);else if("object"===l)throw r=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===r?"object with keys {"+Object.keys(e).join(", ")+"}":r)+"). If you meant to render a collection of children, use an array instead.");return s}function P(e,r,t){if(null==e)return e;var n=[],a=0;return N(e,n,"","",function(e){return r.call(t,e,a++)}),n}function I(e){if(-1===e._status){var r=e._result;(r=r()).then(function(r){0!==e._status&&-1!==e._status||(e._status=1,e._result=r)},function(r){0!==e._status&&-1!==e._status||(e._status=2,e._result=r)}),-1===e._status&&(e._status=0,e._result=r)}if(1===e._status)return e._result.default;throw e._result}var A={current:null},F={transition:null},L={ReactCurrentDispatcher:A,ReactCurrentBatchConfig:F,ReactCurrentOwner:$};function R(){throw Error("act(...) is not supported in production builds of React.")}a.Children={map:P,forEach:function(e,r,t){P(e,function(){r.apply(this,arguments)},t)},count:function(e){var r=0;return P(e,function(){r++}),r},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!_(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},a.Component=y,a.Fragment=l,a.Profiler=d,a.PureComponent=k,a.StrictMode=s,a.Suspense=f,a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L,a.act=R,a.cloneElement=function(e,r,t){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=b({},e.props),a=e.key,i=e.ref,l=e._owner;if(null!=r){if(void 0!==r.ref&&(i=r.ref,l=$.current),void 0!==r.key&&(a=""+r.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(d in r)z.call(r,d)&&!C.hasOwnProperty(d)&&(n[d]=void 0===r[d]&&void 0!==s?s[d]:r[d])}var d=arguments.length-2;if(1===d)n.children=t;else if(1<d){s=Array(d);for(var c=0;c<d;c++)s[c]=arguments[c+2];n.children=s}return{$$typeof:o,type:e.type,key:a,ref:i,props:n,_owner:l}},a.createContext=function(e){return(e={$$typeof:p,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},a.createElement=E,a.createFactory=function(e){var r=E.bind(null,e);return r.type=e,r},a.createRef=function(){return{current:null}},a.forwardRef=function(e){return{$$typeof:u,render:e}},a.isValidElement=_,a.lazy=function(e){return{$$typeof:h,_payload:{_status:-1,_result:e},_init:I}},a.memo=function(e,r){return{$$typeof:x,type:e,compare:void 0===r?null:r}},a.startTransition=function(e){var r=F.transition;F.transition={};try{e()}finally{F.transition=r}},a.unstable_act=R,a.useCallback=function(e,r){return A.current.useCallback(e,r)},a.useContext=function(e){return A.current.useContext(e)},a.useDebugValue=function(){},a.useDeferredValue=function(e){return A.current.useDeferredValue(e)},a.useEffect=function(e,r){return A.current.useEffect(e,r)},a.useId=function(){return A.current.useId()},a.useImperativeHandle=function(e,r,t){return A.current.useImperativeHandle(e,r,t)},a.useInsertionEffect=function(e,r){return A.current.useInsertionEffect(e,r)},a.useLayoutEffect=function(e,r){return A.current.useLayoutEffect(e,r)},a.useMemo=function(e,r){return A.current.useMemo(e,r)},a.useReducer=function(e,r,t){return A.current.useReducer(e,r,t)},a.useRef=function(e){return A.current.useRef(e)},a.useState=function(e){return A.current.useState(e)},a.useSyncExternalStore=function(e,r,t){return A.current.useSyncExternalStore(e,r,t)},a.useTransition=function(){return A.current.useTransition()},a.version="18.3.1",n.exports=a;var O=n.exports;const M=e(O);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Y=O,B=Symbol.for("react.element"),W=Symbol.for("react.fragment"),U=Object.prototype.hasOwnProperty,H=Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,q={key:!0,ref:!0,__self:!0,__source:!0};function V(e,r,t){var n,a={},o=null,i=null;for(n in void 0!==t&&(o=""+t),void 0!==r.key&&(o=""+r.key),void 0!==r.ref&&(i=r.ref),r)U.call(r,n)&&!q.hasOwnProperty(n)&&(a[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===a[n]&&(a[n]=r[n]);return{$$typeof:B,type:e,key:o,ref:i,props:a,_owner:H.current}}t.Fragment=W,t.jsx=V,t.jsxs=V,r.exports=t;var Q=r.exports,X={},G={exports:{}},K={},J={exports:{}},Z={};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!function(e){function r(e,r){var t=e.length;e.push(r);e:for(;0<t;){var n=t-1>>>1,o=e[n];if(!(0<a(o,r)))break e;e[n]=r,e[t]=o,t=n}}function t(e){return 0===e.length?null:e[0]}function n(e){if(0===e.length)return null;var r=e[0],t=e.pop();if(t!==r){e[0]=t;e:for(var n=0,o=e.length,i=o>>>1;n<i;){var l=2*(n+1)-1,s=e[l],d=l+1,c=e[d];if(0>a(s,t))d<o&&0>a(c,s)?(e[n]=c,e[d]=t,n=d):(e[n]=s,e[l]=t,n=l);else{if(!(d<o&&0>a(c,t)))break e;e[n]=c,e[d]=t,n=d}}}return r}function a(e,r){var t=e.sortIndex-r.sortIndex;return 0!==t?t:e.id-r.id}if("object"==typeof performance&&"function"==typeof performance.now){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var s=[],d=[],c=1,p=null,u=3,f=!1,x=!1,h=!1,m="function"==typeof setTimeout?setTimeout:null,g="function"==typeof clearTimeout?clearTimeout:null,b="undefined"!=typeof setImmediate?setImmediate:null;function v(e){for(var a=t(d);null!==a;){if(null===a.callback)n(d);else{if(!(a.startTime<=e))break;n(d),a.sortIndex=a.expirationTime,r(s,a)}a=t(d)}}function y(e){if(h=!1,v(e),!x)if(null!==t(s))x=!0,N(w);else{var r=t(d);null!==r&&P(y,r.startTime-e)}}function w(r,a){x=!1,h&&(h=!1,g(z),z=-1),f=!0;var o=u;try{for(v(a),p=t(s);null!==p&&(!(p.expirationTime>a)||r&&!E());){var i=p.callback;if("function"==typeof i){p.callback=null,u=p.priorityLevel;var l=i(p.expirationTime<=a);a=e.unstable_now(),"function"==typeof l?p.callback=l:p===t(s)&&n(s),v(a)}else n(s);p=t(s)}if(null!==p)var c=!0;else{var m=t(d);null!==m&&P(y,m.startTime-a),c=!1}return c}finally{p=null,u=o,f=!1}}"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var k,j=!1,S=null,z=-1,$=5,C=-1;function E(){return!(e.unstable_now()-C<$)}function _(){if(null!==S){var r=e.unstable_now();C=r;var t=!0;try{t=S(!0,r)}finally{t?k():(j=!1,S=null)}}else j=!1}if("function"==typeof b)k=function(){b(_)};else if("undefined"!=typeof MessageChannel){var D=new MessageChannel,T=D.port2;D.port1.onmessage=_,k=function(){T.postMessage(null)}}else k=function(){m(_,0)};function N(e){S=e,j||(j=!0,k())}function P(r,t){z=m(function(){r(e.unstable_now())},t)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_continueExecution=function(){x||f||(x=!0,N(w))},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return t(s)},e.unstable_next=function(e){switch(u){case 1:case 2:case 3:var r=3;break;default:r=u}var t=u;u=r;try{return e()}finally{u=t}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(e,r){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var t=u;u=e;try{return r()}finally{u=t}},e.unstable_scheduleCallback=function(n,a,o){var i=e.unstable_now();switch("object"==typeof o&&null!==o?o="number"==typeof(o=o.delay)&&0<o?i+o:i:o=i,n){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return n={id:c++,callback:a,priorityLevel:n,startTime:o,expirationTime:l=o+l,sortIndex:-1},o>i?(n.sortIndex=o,r(d,n),null===t(s)&&n===t(d)&&(h?(g(z),z=-1):h=!0,P(y,o-i))):(n.sortIndex=l,r(s,n),x||f||(x=!0,N(w))),n},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var r=u;return function(){var t=u;u=r;try{return e.apply(this,arguments)}finally{u=t}}}}(Z),J.exports=Z;var ee=J.exports,re=O,te=ee;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function ne(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ae=new Set,oe={};function ie(e,r){le(e,r),le(e+"Capture",r)}function le(e,r){for(oe[e]=r,e=0;e<r.length;e++)ae.add(r[e])}var se=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),de=Object.prototype.hasOwnProperty,ce=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,pe={},ue={};function fe(e,r,t,n,a,o,i){this.acceptsBooleans=2===r||3===r||4===r,this.attributeName=n,this.attributeNamespace=a,this.mustUseProperty=t,this.propertyName=e,this.type=r,this.sanitizeURL=o,this.removeEmptyString=i}var xe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){xe[e]=new fe(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var r=e[0];xe[r]=new fe(r,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){xe[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){xe[e]=new fe(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){xe[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){xe[e]=new fe(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){xe[e]=new fe(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){xe[e]=new fe(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){xe[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var he=/[\-:]([a-z])/g;function me(e){return e[1].toUpperCase()}function ge(e,r,t,n){var a=xe.hasOwnProperty(r)?xe[r]:null;(null!==a?0!==a.type:n||!(2<r.length)||"o"!==r[0]&&"O"!==r[0]||"n"!==r[1]&&"N"!==r[1])&&(function(e,r,t,n){if(null==r||function(e,r,t,n){if(null!==t&&0===t.type)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return!n&&(null!==t?!t.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,r,t,n))return!0;if(n)return!1;if(null!==t)switch(t.type){case 3:return!r;case 4:return!1===r;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}(r,t,a,n)&&(t=null),n||null===a?function(e){return!!de.call(ue,e)||!de.call(pe,e)&&(ce.test(e)?ue[e]=!0:(pe[e]=!0,!1))}(r)&&(null===t?e.removeAttribute(r):e.setAttribute(r,""+t)):a.mustUseProperty?e[a.propertyName]=null===t?3!==a.type&&"":t:(r=a.attributeName,n=a.attributeNamespace,null===t?e.removeAttribute(r):(t=3===(a=a.type)||4===a&&!0===t?"":""+t,n?e.setAttributeNS(n,r,t):e.setAttribute(r,t))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var r=e.replace(he,me);xe[r]=new fe(r,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var r=e.replace(he,me);xe[r]=new fe(r,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var r=e.replace(he,me);xe[r]=new fe(r,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){xe[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)}),xe.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){xe[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});var be=re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ve=Symbol.for("react.element"),ye=Symbol.for("react.portal"),we=Symbol.for("react.fragment"),ke=Symbol.for("react.strict_mode"),je=Symbol.for("react.profiler"),Se=Symbol.for("react.provider"),ze=Symbol.for("react.context"),$e=Symbol.for("react.forward_ref"),Ce=Symbol.for("react.suspense"),Ee=Symbol.for("react.suspense_list"),_e=Symbol.for("react.memo"),De=Symbol.for("react.lazy"),Te=Symbol.for("react.offscreen"),Ne=Symbol.iterator;function Pe(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=Ne&&e[Ne]||e["@@iterator"])?e:null}var Ie,Ae=Object.assign;function Fe(e){if(void 0===Ie)try{throw Error()}catch(t){var r=t.stack.trim().match(/\n( *(at )?)/);Ie=r&&r[1]||""}return"\n"+Ie+e}var Le=!1;function Re(e,r){if(!e||Le)return"";Le=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(r,[])}catch(d){var n=d}Reflect.construct(e,[],r)}else{try{r.call()}catch(d){n=d}e.call(r.prototype)}else{try{throw Error()}catch(d){n=d}e()}}catch(d){if(d&&n&&"string"==typeof d.stack){for(var a=d.stack.split("\n"),o=n.stack.split("\n"),i=a.length-1,l=o.length-1;1<=i&&0<=l&&a[i]!==o[l];)l--;for(;1<=i&&0<=l;i--,l--)if(a[i]!==o[l]){if(1!==i||1!==l)do{if(i--,0>--l||a[i]!==o[l]){var s="\n"+a[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}}while(1<=i&&0<=l);break}}}finally{Le=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Fe(e):""}function Oe(e){switch(e.tag){case 5:return Fe(e.type);case 16:return Fe("Lazy");case 13:return Fe("Suspense");case 19:return Fe("SuspenseList");case 0:case 2:case 15:return e=Re(e.type,!1);case 11:return e=Re(e.type.render,!1);case 1:return e=Re(e.type,!0);default:return""}}function Me(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case we:return"Fragment";case ye:return"Portal";case je:return"Profiler";case ke:return"StrictMode";case Ce:return"Suspense";case Ee:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case ze:return(e.displayName||"Context")+".Consumer";case Se:return(e._context.displayName||"Context")+".Provider";case $e:var r=e.render;return(e=e.displayName)||(e=""!==(e=r.displayName||r.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case _e:return null!==(r=e.displayName||null)?r:Me(e.type)||"Memo";case De:r=e._payload,e=e._init;try{return Me(e(r))}catch(t){}}return null}function Ye(e){var r=e.type;switch(e.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=(e=r.render).displayName||e.name||"",r.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Me(r);case 8:return r===ke?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"==typeof r)return r.displayName||r.name||null;if("string"==typeof r)return r}return null}function Be(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function We(e){var r=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===r||"radio"===r)}function Ue(e){e._valueTracker||(e._valueTracker=function(e){var r=We(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,r),n=""+e[r];if(!e.hasOwnProperty(r)&&void 0!==t&&"function"==typeof t.get&&"function"==typeof t.set){var a=t.get,o=t.set;return Object.defineProperty(e,r,{configurable:!0,get:function(){return a.call(this)},set:function(e){n=""+e,o.call(this,e)}}),Object.defineProperty(e,r,{enumerable:t.enumerable}),{getValue:function(){return n},setValue:function(e){n=""+e},stopTracking:function(){e._valueTracker=null,delete e[r]}}}}(e))}function He(e){if(!e)return!1;var r=e._valueTracker;if(!r)return!0;var t=r.getValue(),n="";return e&&(n=We(e)?e.checked?"true":"false":e.value),(e=n)!==t&&(r.setValue(e),!0)}function qe(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(r){return e.body}}function Ve(e,r){var t=r.checked;return Ae({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=t?t:e._wrapperState.initialChecked})}function Qe(e,r){var t=null==r.defaultValue?"":r.defaultValue,n=null!=r.checked?r.checked:r.defaultChecked;t=Be(null!=r.value?r.value:t),e._wrapperState={initialChecked:n,initialValue:t,controlled:"checkbox"===r.type||"radio"===r.type?null!=r.checked:null!=r.value}}function Xe(e,r){null!=(r=r.checked)&&ge(e,"checked",r,!1)}function Ge(e,r){Xe(e,r);var t=Be(r.value),n=r.type;if(null!=t)"number"===n?(0===t&&""===e.value||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if("submit"===n||"reset"===n)return void e.removeAttribute("value");r.hasOwnProperty("value")?Je(e,r.type,t):r.hasOwnProperty("defaultValue")&&Je(e,r.type,Be(r.defaultValue)),null==r.checked&&null!=r.defaultChecked&&(e.defaultChecked=!!r.defaultChecked)}function Ke(e,r,t){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var n=r.type;if(!("submit"!==n&&"reset"!==n||void 0!==r.value&&null!==r.value))return;r=""+e._wrapperState.initialValue,t||r===e.value||(e.value=r),e.defaultValue=r}""!==(t=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==t&&(e.name=t)}function Je(e,r,t){"number"===r&&qe(e.ownerDocument)===e||(null==t?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Ze=Array.isArray;function er(e,r,t,n){if(e=e.options,r){r={};for(var a=0;a<t.length;a++)r["$"+t[a]]=!0;for(t=0;t<e.length;t++)a=r.hasOwnProperty("$"+e[t].value),e[t].selected!==a&&(e[t].selected=a),a&&n&&(e[t].defaultSelected=!0)}else{for(t=""+Be(t),r=null,a=0;a<e.length;a++){if(e[a].value===t)return e[a].selected=!0,void(n&&(e[a].defaultSelected=!0));null!==r||e[a].disabled||(r=e[a])}null!==r&&(r.selected=!0)}}function rr(e,r){if(null!=r.dangerouslySetInnerHTML)throw Error(ne(91));return Ae({},r,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function tr(e,r){var t=r.value;if(null==t){if(t=r.children,r=r.defaultValue,null!=t){if(null!=r)throw Error(ne(92));if(Ze(t)){if(1<t.length)throw Error(ne(93));t=t[0]}r=t}null==r&&(r=""),t=r}e._wrapperState={initialValue:Be(t)}}function nr(e,r){var t=Be(r.value),n=Be(r.defaultValue);null!=t&&((t=""+t)!==e.value&&(e.value=t),null==r.defaultValue&&e.defaultValue!==t&&(e.defaultValue=t)),null!=n&&(e.defaultValue=""+n)}function ar(e){var r=e.textContent;r===e._wrapperState.initialValue&&""!==r&&null!==r&&(e.value=r)}function or(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ir(e,r){return null==e||"http://www.w3.org/1999/xhtml"===e?or(r):"http://www.w3.org/2000/svg"===e&&"foreignObject"===r?"http://www.w3.org/1999/xhtml":e}var lr,sr,dr=(sr=function(e,r){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=r;else{for((lr=lr||document.createElement("div")).innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=lr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;r.firstChild;)e.appendChild(r.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,r,t,n){MSApp.execUnsafeLocalFunction(function(){return sr(e,r)})}:sr);function cr(e,r){if(r){var t=e.firstChild;if(t&&t===e.lastChild&&3===t.nodeType)return void(t.nodeValue=r)}e.textContent=r}var pr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ur=["Webkit","ms","Moz","O"];function fr(e,r,t){return null==r||"boolean"==typeof r||""===r?"":t||"number"!=typeof r||0===r||pr.hasOwnProperty(e)&&pr[e]?(""+r).trim():r+"px"}function xr(e,r){for(var t in e=e.style,r)if(r.hasOwnProperty(t)){var n=0===t.indexOf("--"),a=fr(t,r[t],n);"float"===t&&(t="cssFloat"),n?e.setProperty(t,a):e[t]=a}}Object.keys(pr).forEach(function(e){ur.forEach(function(r){r=r+e.charAt(0).toUpperCase()+e.substring(1),pr[r]=pr[e]})});var hr=Ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mr(e,r){if(r){if(hr[e]&&(null!=r.children||null!=r.dangerouslySetInnerHTML))throw Error(ne(137,e));if(null!=r.dangerouslySetInnerHTML){if(null!=r.children)throw Error(ne(60));if("object"!=typeof r.dangerouslySetInnerHTML||!("__html"in r.dangerouslySetInnerHTML))throw Error(ne(61))}if(null!=r.style&&"object"!=typeof r.style)throw Error(ne(62))}}function gr(e,r){if(-1===e.indexOf("-"))return"string"==typeof r.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var br=null;function vr(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var yr=null,wr=null,kr=null;function jr(e){if(e=bo(e)){if("function"!=typeof yr)throw Error(ne(280));var r=e.stateNode;r&&(r=yo(r),yr(e.stateNode,e.type,r))}}function Sr(e){wr?kr?kr.push(e):kr=[e]:wr=e}function zr(){if(wr){var e=wr,r=kr;if(kr=wr=null,jr(e),r)for(e=0;e<r.length;e++)jr(r[e])}}function $r(e,r){return e(r)}function Cr(){}var Er=!1;function _r(e,r,t){if(Er)return e(r,t);Er=!0;try{return $r(e,r,t)}finally{Er=!1,(null!==wr||null!==kr)&&(Cr(),zr())}}function Dr(e,r){var t=e.stateNode;if(null===t)return null;var n=yo(t);if(null===n)return null;t=n[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(n=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!n;break e;default:e=!1}if(e)return null;if(t&&"function"!=typeof t)throw Error(ne(231,r,typeof t));return t}var Tr=!1;if(se)try{var Nr={};Object.defineProperty(Nr,"passive",{get:function(){Tr=!0}}),window.addEventListener("test",Nr,Nr),window.removeEventListener("test",Nr,Nr)}catch(sr){Tr=!1}function Pr(e,r,t,n,a,o,i,l,s){var d=Array.prototype.slice.call(arguments,3);try{r.apply(t,d)}catch(c){this.onError(c)}}var Ir=!1,Ar=null,Fr=!1,Lr=null,Rr={onError:function(e){Ir=!0,Ar=e}};function Or(e,r,t,n,a,o,i,l,s){Ir=!1,Ar=null,Pr.apply(Rr,arguments)}function Mr(e){var r=e,t=e;if(e.alternate)for(;r.return;)r=r.return;else{e=r;do{!!(4098&(r=e).flags)&&(t=r.return),e=r.return}while(e)}return 3===r.tag?t:null}function Yr(e){if(13===e.tag){var r=e.memoizedState;if(null===r&&(null!==(e=e.alternate)&&(r=e.memoizedState)),null!==r)return r.dehydrated}return null}function Br(e){if(Mr(e)!==e)throw Error(ne(188))}function Wr(e){return null!==(e=function(e){var r=e.alternate;if(!r){if(null===(r=Mr(e)))throw Error(ne(188));return r!==e?null:e}for(var t=e,n=r;;){var a=t.return;if(null===a)break;var o=a.alternate;if(null===o){if(null!==(n=a.return)){t=n;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===t)return Br(a),e;if(o===n)return Br(a),r;o=o.sibling}throw Error(ne(188))}if(t.return!==n.return)t=a,n=o;else{for(var i=!1,l=a.child;l;){if(l===t){i=!0,t=a,n=o;break}if(l===n){i=!0,n=a,t=o;break}l=l.sibling}if(!i){for(l=o.child;l;){if(l===t){i=!0,t=o,n=a;break}if(l===n){i=!0,n=o,t=a;break}l=l.sibling}if(!i)throw Error(ne(189))}}if(t.alternate!==n)throw Error(ne(190))}if(3!==t.tag)throw Error(ne(188));return t.stateNode.current===t?e:r}(e))?Ur(e):null}function Ur(e){if(5===e.tag||6===e.tag)return e;for(e=e.child;null!==e;){var r=Ur(e);if(null!==r)return r;e=e.sibling}return null}var Hr=te.unstable_scheduleCallback,qr=te.unstable_cancelCallback,Vr=te.unstable_shouldYield,Qr=te.unstable_requestPaint,Xr=te.unstable_now,Gr=te.unstable_getCurrentPriorityLevel,Kr=te.unstable_ImmediatePriority,Jr=te.unstable_UserBlockingPriority,Zr=te.unstable_NormalPriority,et=te.unstable_LowPriority,rt=te.unstable_IdlePriority,tt=null,nt=null;var at=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(ot(e)/it|0)|0},ot=Math.log,it=Math.LN2;var lt=64,st=4194304;function dt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&e;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ct(e,r){var t=e.pendingLanes;if(0===t)return 0;var n=0,a=e.suspendedLanes,o=e.pingedLanes,i=268435455&t;if(0!==i){var l=i&~a;0!==l?n=dt(l):0!==(o&=i)&&(n=dt(o))}else 0!==(i=t&~a)?n=dt(i):0!==o&&(n=dt(o));if(0===n)return 0;if(0!==r&&r!==n&&0===(r&a)&&((a=n&-n)>=(o=r&-r)||16===a&&4194240&o))return r;if(4&n&&(n|=16&t),0!==(r=e.entangledLanes))for(e=e.entanglements,r&=n;0<r;)a=1<<(t=31-at(r)),n|=e[t],r&=~a;return n}function pt(e,r){switch(e){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;default:return-1}}function ut(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function ft(){var e=lt;return!(4194240&(lt<<=1))&&(lt=64),e}function xt(e){for(var r=[],t=0;31>t;t++)r.push(e);return r}function ht(e,r,t){e.pendingLanes|=r,536870912!==r&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[r=31-at(r)]=t}function mt(e,r){var t=e.entangledLanes|=r;for(e=e.entanglements;t;){var n=31-at(t),a=1<<n;a&r|e[n]&r&&(e[n]|=r),t&=~a}}var gt=0;function bt(e){return 1<(e&=-e)?4<e?268435455&e?16:536870912:4:1}var vt,yt,wt,kt,jt,St=!1,zt=[],$t=null,Ct=null,Et=null,_t=new Map,Dt=new Map,Tt=[],Nt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Pt(e,r){switch(e){case"focusin":case"focusout":$t=null;break;case"dragenter":case"dragleave":Ct=null;break;case"mouseover":case"mouseout":Et=null;break;case"pointerover":case"pointerout":_t.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":Dt.delete(r.pointerId)}}function It(e,r,t,n,a,o){return null===e||e.nativeEvent!==o?(e={blockedOn:r,domEventName:t,eventSystemFlags:n,nativeEvent:o,targetContainers:[a]},null!==r&&(null!==(r=bo(r))&&yt(r)),e):(e.eventSystemFlags|=n,r=e.targetContainers,null!==a&&-1===r.indexOf(a)&&r.push(a),e)}function At(e){var r=go(e.target);if(null!==r){var t=Mr(r);if(null!==t)if(13===(r=t.tag)){if(null!==(r=Yr(t)))return e.blockedOn=r,void jt(e.priority,function(){wt(t)})}else if(3===r&&t.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===t.tag?t.stateNode.containerInfo:null)}e.blockedOn=null}function Ft(e){if(null!==e.blockedOn)return!1;for(var r=e.targetContainers;0<r.length;){var t=Vt(e.domEventName,e.eventSystemFlags,r[0],e.nativeEvent);if(null!==t)return null!==(r=bo(t))&&yt(r),e.blockedOn=t,!1;var n=new(t=e.nativeEvent).constructor(t.type,t);br=n,t.target.dispatchEvent(n),br=null,r.shift()}return!0}function Lt(e,r,t){Ft(e)&&t.delete(r)}function Rt(){St=!1,null!==$t&&Ft($t)&&($t=null),null!==Ct&&Ft(Ct)&&(Ct=null),null!==Et&&Ft(Et)&&(Et=null),_t.forEach(Lt),Dt.forEach(Lt)}function Ot(e,r){e.blockedOn===r&&(e.blockedOn=null,St||(St=!0,te.unstable_scheduleCallback(te.unstable_NormalPriority,Rt)))}function Mt(e){function r(r){return Ot(r,e)}if(0<zt.length){Ot(zt[0],e);for(var t=1;t<zt.length;t++){var n=zt[t];n.blockedOn===e&&(n.blockedOn=null)}}for(null!==$t&&Ot($t,e),null!==Ct&&Ot(Ct,e),null!==Et&&Ot(Et,e),_t.forEach(r),Dt.forEach(r),t=0;t<Tt.length;t++)(n=Tt[t]).blockedOn===e&&(n.blockedOn=null);for(;0<Tt.length&&null===(t=Tt[0]).blockedOn;)At(t),null===t.blockedOn&&Tt.shift()}var Yt=be.ReactCurrentBatchConfig,Bt=!0;function Wt(e,r,t,n){var a=gt,o=Yt.transition;Yt.transition=null;try{gt=1,Ht(e,r,t,n)}finally{gt=a,Yt.transition=o}}function Ut(e,r,t,n){var a=gt,o=Yt.transition;Yt.transition=null;try{gt=4,Ht(e,r,t,n)}finally{gt=a,Yt.transition=o}}function Ht(e,r,t,n){if(Bt){var a=Vt(e,r,t,n);if(null===a)Ba(e,r,n,qt,t),Pt(e,n);else if(function(e,r,t,n,a){switch(r){case"focusin":return $t=It($t,e,r,t,n,a),!0;case"dragenter":return Ct=It(Ct,e,r,t,n,a),!0;case"mouseover":return Et=It(Et,e,r,t,n,a),!0;case"pointerover":var o=a.pointerId;return _t.set(o,It(_t.get(o)||null,e,r,t,n,a)),!0;case"gotpointercapture":return o=a.pointerId,Dt.set(o,It(Dt.get(o)||null,e,r,t,n,a)),!0}return!1}(a,e,r,t,n))n.stopPropagation();else if(Pt(e,n),4&r&&-1<Nt.indexOf(e)){for(;null!==a;){var o=bo(a);if(null!==o&&vt(o),null===(o=Vt(e,r,t,n))&&Ba(e,r,n,qt,t),o===a)break;a=o}null!==a&&n.stopPropagation()}else Ba(e,r,n,null,t)}}var qt=null;function Vt(e,r,t,n){if(qt=null,null!==(e=go(e=vr(n))))if(null===(r=Mr(e)))e=null;else if(13===(t=r.tag)){if(null!==(e=Yr(r)))return e;e=null}else if(3===t){if(r.stateNode.current.memoizedState.isDehydrated)return 3===r.tag?r.stateNode.containerInfo:null;e=null}else r!==e&&(e=null);return qt=e,null}function Qt(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Gr()){case Kr:return 1;case Jr:return 4;case Zr:case et:return 16;case rt:return 536870912;default:return 16}default:return 16}}var Xt=null,Gt=null,Kt=null;function Jt(){if(Kt)return Kt;var e,r,t=Gt,n=t.length,a="value"in Xt?Xt.value:Xt.textContent,o=a.length;for(e=0;e<n&&t[e]===a[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===a[o-r];r++);return Kt=a.slice(e,1<r?1-r:void 0)}function Zt(e){var r=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===r&&(e=13):e=r,10===e&&(e=13),32<=e||13===e?e:0}function en(){return!0}function rn(){return!1}function tn(e){function r(r,t,n,a,o){for(var i in this._reactName=r,this._targetInst=n,this.type=t,this.nativeEvent=a,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(i)&&(r=e[i],this[i]=r?r(a):a[i]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?en:rn,this.isPropagationStopped=rn,this}return Ae(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=en)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=en)},persist:function(){},isPersistent:en}),r}var nn,an,on,ln={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},sn=tn(ln),dn=Ae({},ln,{view:0,detail:0}),cn=tn(dn),pn=Ae({},dn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:jn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==on&&(on&&"mousemove"===e.type?(nn=e.screenX-on.screenX,an=e.screenY-on.screenY):an=nn=0,on=e),nn)},movementY:function(e){return"movementY"in e?e.movementY:an}}),un=tn(pn),fn=tn(Ae({},pn,{dataTransfer:0})),xn=tn(Ae({},dn,{relatedTarget:0})),hn=tn(Ae({},ln,{animationName:0,elapsedTime:0,pseudoElement:0})),mn=Ae({},ln,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),gn=tn(mn),bn=tn(Ae({},ln,{data:0})),vn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},yn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},wn={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kn(e){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(e):!!(e=wn[e])&&!!r[e]}function jn(){return kn}var Sn=Ae({},dn,{key:function(e){if(e.key){var r=vn[e.key]||e.key;if("Unidentified"!==r)return r}return"keypress"===e.type?13===(e=Zt(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?yn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:jn,charCode:function(e){return"keypress"===e.type?Zt(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?Zt(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),zn=tn(Sn),$n=tn(Ae({},pn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Cn=tn(Ae({},dn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:jn})),En=tn(Ae({},ln,{propertyName:0,elapsedTime:0,pseudoElement:0})),_n=Ae({},pn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dn=tn(_n),Tn=[9,13,27,32],Nn=se&&"CompositionEvent"in window,Pn=null;se&&"documentMode"in document&&(Pn=document.documentMode);var In=se&&"TextEvent"in window&&!Pn,An=se&&(!Nn||Pn&&8<Pn&&11>=Pn),Fn=String.fromCharCode(32),Ln=!1;function Rn(e,r){switch(e){case"keyup":return-1!==Tn.indexOf(r.keyCode);case"keydown":return 229!==r.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function On(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var Mn=!1;var Yn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bn(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===r?!!Yn[e.type]:"textarea"===r}function Wn(e,r,t,n){Sr(n),0<(r=Ua(r,"onChange")).length&&(t=new sn("onChange","change",null,t,n),e.push({event:t,listeners:r}))}var Un=null,Hn=null;function qn(e){Fa(e,0)}function Vn(e){if(He(vo(e)))return e}function Qn(e,r){if("change"===e)return r}var Xn=!1;if(se){var Gn;if(se){var Kn="oninput"in document;if(!Kn){var Jn=document.createElement("div");Jn.setAttribute("oninput","return;"),Kn="function"==typeof Jn.oninput}Gn=Kn}else Gn=!1;Xn=Gn&&(!document.documentMode||9<document.documentMode)}function Zn(){Un&&(Un.detachEvent("onpropertychange",ea),Hn=Un=null)}function ea(e){if("value"===e.propertyName&&Vn(Hn)){var r=[];Wn(r,Hn,e,vr(e)),_r(qn,r)}}function ra(e,r,t){"focusin"===e?(Zn(),Hn=t,(Un=r).attachEvent("onpropertychange",ea)):"focusout"===e&&Zn()}function ta(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Vn(Hn)}function na(e,r){if("click"===e)return Vn(r)}function aa(e,r){if("input"===e||"change"===e)return Vn(r)}var oa="function"==typeof Object.is?Object.is:function(e,r){return e===r&&(0!==e||1/e==1/r)||e!=e&&r!=r};function ia(e,r){if(oa(e,r))return!0;if("object"!=typeof e||null===e||"object"!=typeof r||null===r)return!1;var t=Object.keys(e),n=Object.keys(r);if(t.length!==n.length)return!1;for(n=0;n<t.length;n++){var a=t[n];if(!de.call(r,a)||!oa(e[a],r[a]))return!1}return!0}function la(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function sa(e,r){var t,n=la(e);for(e=0;n;){if(3===n.nodeType){if(t=e+n.textContent.length,e<=r&&t>=r)return{node:n,offset:r-e};e=t}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=la(n)}}function da(e,r){return!(!e||!r)&&(e===r||(!e||3!==e.nodeType)&&(r&&3===r.nodeType?da(e,r.parentNode):"contains"in e?e.contains(r):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(r))))}function ca(){for(var e=window,r=qe();r instanceof e.HTMLIFrameElement;){try{var t="string"==typeof r.contentWindow.location.href}catch(n){t=!1}if(!t)break;r=qe((e=r.contentWindow).document)}return r}function pa(e){var r=e&&e.nodeName&&e.nodeName.toLowerCase();return r&&("input"===r&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===r||"true"===e.contentEditable)}function ua(e){var r=ca(),t=e.focusedElem,n=e.selectionRange;if(r!==t&&t&&t.ownerDocument&&da(t.ownerDocument.documentElement,t)){if(null!==n&&pa(t))if(r=n.start,void 0===(e=n.end)&&(e=r),"selectionStart"in t)t.selectionStart=r,t.selectionEnd=Math.min(e,t.value.length);else if((e=(r=t.ownerDocument||document)&&r.defaultView||window).getSelection){e=e.getSelection();var a=t.textContent.length,o=Math.min(n.start,a);n=void 0===n.end?o:Math.min(n.end,a),!e.extend&&o>n&&(a=n,n=o,o=a),a=sa(t,o);var i=sa(t,n);a&&i&&(1!==e.rangeCount||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&((r=r.createRange()).setStart(a.node,a.offset),e.removeAllRanges(),o>n?(e.addRange(r),e.extend(i.node,i.offset)):(r.setEnd(i.node,i.offset),e.addRange(r)))}for(r=[],e=t;e=e.parentNode;)1===e.nodeType&&r.push({element:e,left:e.scrollLeft,top:e.scrollTop});for("function"==typeof t.focus&&t.focus(),t=0;t<r.length;t++)(e=r[t]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}var fa=se&&"documentMode"in document&&11>=document.documentMode,xa=null,ha=null,ma=null,ga=!1;function ba(e,r,t){var n=t.window===t?t.document:9===t.nodeType?t:t.ownerDocument;ga||null==xa||xa!==qe(n)||("selectionStart"in(n=xa)&&pa(n)?n={start:n.selectionStart,end:n.selectionEnd}:n={anchorNode:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset},ma&&ia(ma,n)||(ma=n,0<(n=Ua(ha,"onSelect")).length&&(r=new sn("onSelect","select",null,r,t),e.push({event:r,listeners:n}),r.target=xa)))}function va(e,r){var t={};return t[e.toLowerCase()]=r.toLowerCase(),t["Webkit"+e]="webkit"+r,t["Moz"+e]="moz"+r,t}var ya={animationend:va("Animation","AnimationEnd"),animationiteration:va("Animation","AnimationIteration"),animationstart:va("Animation","AnimationStart"),transitionend:va("Transition","TransitionEnd")},wa={},ka={};function ja(e){if(wa[e])return wa[e];if(!ya[e])return e;var r,t=ya[e];for(r in t)if(t.hasOwnProperty(r)&&r in ka)return wa[e]=t[r];return e}se&&(ka=document.createElement("div").style,"AnimationEvent"in window||(delete ya.animationend.animation,delete ya.animationiteration.animation,delete ya.animationstart.animation),"TransitionEvent"in window||delete ya.transitionend.transition);var Sa=ja("animationend"),za=ja("animationiteration"),$a=ja("animationstart"),Ca=ja("transitionend"),Ea=new Map,_a="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Da(e,r){Ea.set(e,r),ie(r,[e])}for(var Ta=0;Ta<_a.length;Ta++){var Na=_a[Ta];Da(Na.toLowerCase(),"on"+(Na[0].toUpperCase()+Na.slice(1)))}Da(Sa,"onAnimationEnd"),Da(za,"onAnimationIteration"),Da($a,"onAnimationStart"),Da("dblclick","onDoubleClick"),Da("focusin","onFocus"),Da("focusout","onBlur"),Da(Ca,"onTransitionEnd"),le("onMouseEnter",["mouseout","mouseover"]),le("onMouseLeave",["mouseout","mouseover"]),le("onPointerEnter",["pointerout","pointerover"]),le("onPointerLeave",["pointerout","pointerover"]),ie("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ie("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ie("onBeforeInput",["compositionend","keypress","textInput","paste"]),ie("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ie("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ie("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Pa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ia=new Set("cancel close invalid load scroll toggle".split(" ").concat(Pa));function Aa(e,r,t){var n=e.type||"unknown-event";e.currentTarget=t,function(e,r,t,n,a,o,i,l,s){if(Or.apply(this,arguments),Ir){if(!Ir)throw Error(ne(198));var d=Ar;Ir=!1,Ar=null,Fr||(Fr=!0,Lr=d)}}(n,r,void 0,e),e.currentTarget=null}function Fa(e,r){r=!!(4&r);for(var t=0;t<e.length;t++){var n=e[t],a=n.event;n=n.listeners;e:{var o=void 0;if(r)for(var i=n.length-1;0<=i;i--){var l=n[i],s=l.instance,d=l.currentTarget;if(l=l.listener,s!==o&&a.isPropagationStopped())break e;Aa(a,l,d),o=s}else for(i=0;i<n.length;i++){if(s=(l=n[i]).instance,d=l.currentTarget,l=l.listener,s!==o&&a.isPropagationStopped())break e;Aa(a,l,d),o=s}}}if(Fr)throw e=Lr,Fr=!1,Lr=null,e}function La(e,r){var t=r[xo];void 0===t&&(t=r[xo]=new Set);var n=e+"__bubble";t.has(n)||(Ya(r,e,2,!1),t.add(n))}function Ra(e,r,t){var n=0;r&&(n|=4),Ya(t,e,n,r)}var Oa="_reactListening"+Math.random().toString(36).slice(2);function Ma(e){if(!e[Oa]){e[Oa]=!0,ae.forEach(function(r){"selectionchange"!==r&&(Ia.has(r)||Ra(r,!1,e),Ra(r,!0,e))});var r=9===e.nodeType?e:e.ownerDocument;null===r||r[Oa]||(r[Oa]=!0,Ra("selectionchange",!1,r))}}function Ya(e,r,t,n){switch(Qt(r)){case 1:var a=Wt;break;case 4:a=Ut;break;default:a=Ht}t=a.bind(null,r,t,e),a=void 0,!Tr||"touchstart"!==r&&"touchmove"!==r&&"wheel"!==r||(a=!0),n?void 0!==a?e.addEventListener(r,t,{capture:!0,passive:a}):e.addEventListener(r,t,!0):void 0!==a?e.addEventListener(r,t,{passive:a}):e.addEventListener(r,t,!1)}function Ba(e,r,t,n,a){var o=n;if(!(1&r||2&r||null===n))e:for(;;){if(null===n)return;var i=n.tag;if(3===i||4===i){var l=n.stateNode.containerInfo;if(l===a||8===l.nodeType&&l.parentNode===a)break;if(4===i)for(i=n.return;null!==i;){var s=i.tag;if((3===s||4===s)&&((s=i.stateNode.containerInfo)===a||8===s.nodeType&&s.parentNode===a))return;i=i.return}for(;null!==l;){if(null===(i=go(l)))return;if(5===(s=i.tag)||6===s){n=o=i;continue e}l=l.parentNode}}n=n.return}_r(function(){var n=o,a=vr(t),i=[];e:{var l=Ea.get(e);if(void 0!==l){var s=sn,d=e;switch(e){case"keypress":if(0===Zt(t))break e;case"keydown":case"keyup":s=zn;break;case"focusin":d="focus",s=xn;break;case"focusout":d="blur",s=xn;break;case"beforeblur":case"afterblur":s=xn;break;case"click":if(2===t.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":s=un;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":s=fn;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":s=Cn;break;case Sa:case za:case $a:s=hn;break;case Ca:s=En;break;case"scroll":s=cn;break;case"wheel":s=Dn;break;case"copy":case"cut":case"paste":s=gn;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":s=$n}var c=!!(4&r),p=!c&&"scroll"===e,u=c?null!==l?l+"Capture":null:l;c=[];for(var f,x=n;null!==x;){var h=(f=x).stateNode;if(5===f.tag&&null!==h&&(f=h,null!==u&&(null!=(h=Dr(x,u))&&c.push(Wa(x,h,f)))),p)break;x=x.return}0<c.length&&(l=new s(l,d,null,t,a),i.push({event:l,listeners:c}))}}if(!(7&r)){if(s="mouseout"===e||"pointerout"===e,(!(l="mouseover"===e||"pointerover"===e)||t===br||!(d=t.relatedTarget||t.fromElement)||!go(d)&&!d[fo])&&(s||l)&&(l=a.window===a?a:(l=a.ownerDocument)?l.defaultView||l.parentWindow:window,s?(s=n,null!==(d=(d=t.relatedTarget||t.toElement)?go(d):null)&&(d!==(p=Mr(d))||5!==d.tag&&6!==d.tag)&&(d=null)):(s=null,d=n),s!==d)){if(c=un,h="onMouseLeave",u="onMouseEnter",x="mouse","pointerout"!==e&&"pointerover"!==e||(c=$n,h="onPointerLeave",u="onPointerEnter",x="pointer"),p=null==s?l:vo(s),f=null==d?l:vo(d),(l=new c(h,x+"leave",s,t,a)).target=p,l.relatedTarget=f,h=null,go(a)===n&&((c=new c(u,x+"enter",d,t,a)).target=f,c.relatedTarget=p,h=c),p=h,s&&d)e:{for(u=d,x=0,f=c=s;f;f=Ha(f))x++;for(f=0,h=u;h;h=Ha(h))f++;for(;0<x-f;)c=Ha(c),x--;for(;0<f-x;)u=Ha(u),f--;for(;x--;){if(c===u||null!==u&&c===u.alternate)break e;c=Ha(c),u=Ha(u)}c=null}else c=null;null!==s&&qa(i,l,s,c,!1),null!==d&&null!==p&&qa(i,p,d,c,!0)}if("select"===(s=(l=n?vo(n):window).nodeName&&l.nodeName.toLowerCase())||"input"===s&&"file"===l.type)var m=Qn;else if(Bn(l))if(Xn)m=aa;else{m=ta;var g=ra}else(s=l.nodeName)&&"input"===s.toLowerCase()&&("checkbox"===l.type||"radio"===l.type)&&(m=na);switch(m&&(m=m(e,n))?Wn(i,m,t,a):(g&&g(e,l,n),"focusout"===e&&(g=l._wrapperState)&&g.controlled&&"number"===l.type&&Je(l,"number",l.value)),g=n?vo(n):window,e){case"focusin":(Bn(g)||"true"===g.contentEditable)&&(xa=g,ha=n,ma=null);break;case"focusout":ma=ha=xa=null;break;case"mousedown":ga=!0;break;case"contextmenu":case"mouseup":case"dragend":ga=!1,ba(i,t,a);break;case"selectionchange":if(fa)break;case"keydown":case"keyup":ba(i,t,a)}var b;if(Nn)e:{switch(e){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Mn?Rn(e,t)&&(v="onCompositionEnd"):"keydown"===e&&229===t.keyCode&&(v="onCompositionStart");v&&(An&&"ko"!==t.locale&&(Mn||"onCompositionStart"!==v?"onCompositionEnd"===v&&Mn&&(b=Jt()):(Gt="value"in(Xt=a)?Xt.value:Xt.textContent,Mn=!0)),0<(g=Ua(n,v)).length&&(v=new bn(v,e,null,t,a),i.push({event:v,listeners:g}),b?v.data=b:null!==(b=On(t))&&(v.data=b))),(b=In?function(e,r){switch(e){case"compositionend":return On(r);case"keypress":return 32!==r.which?null:(Ln=!0,Fn);case"textInput":return(e=r.data)===Fn&&Ln?null:e;default:return null}}(e,t):function(e,r){if(Mn)return"compositionend"===e||!Nn&&Rn(e,r)?(e=Jt(),Kt=Gt=Xt=null,Mn=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return An&&"ko"!==r.locale?null:r.data}}(e,t))&&(0<(n=Ua(n,"onBeforeInput")).length&&(a=new bn("onBeforeInput","beforeinput",null,t,a),i.push({event:a,listeners:n}),a.data=b))}Fa(i,r)})}function Wa(e,r,t){return{instance:e,listener:r,currentTarget:t}}function Ua(e,r){for(var t=r+"Capture",n=[];null!==e;){var a=e,o=a.stateNode;5===a.tag&&null!==o&&(a=o,null!=(o=Dr(e,t))&&n.unshift(Wa(e,o,a)),null!=(o=Dr(e,r))&&n.push(Wa(e,o,a))),e=e.return}return n}function Ha(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function qa(e,r,t,n,a){for(var o=r._reactName,i=[];null!==t&&t!==n;){var l=t,s=l.alternate,d=l.stateNode;if(null!==s&&s===n)break;5===l.tag&&null!==d&&(l=d,a?null!=(s=Dr(t,o))&&i.unshift(Wa(t,s,l)):a||null!=(s=Dr(t,o))&&i.push(Wa(t,s,l))),t=t.return}0!==i.length&&e.push({event:r,listeners:i})}var Va=/\r\n?/g,Qa=/\u0000|\uFFFD/g;function Xa(e){return("string"==typeof e?e:""+e).replace(Va,"\n").replace(Qa,"")}function Ga(e,r,t){if(r=Xa(r),Xa(e)!==r&&t)throw Error(ne(425))}function Ka(){}var Ja=null,Za=null;function eo(e,r){return"textarea"===e||"noscript"===e||"string"==typeof r.children||"number"==typeof r.children||"object"==typeof r.dangerouslySetInnerHTML&&null!==r.dangerouslySetInnerHTML&&null!=r.dangerouslySetInnerHTML.__html}var ro="function"==typeof setTimeout?setTimeout:void 0,to="function"==typeof clearTimeout?clearTimeout:void 0,no="function"==typeof Promise?Promise:void 0,ao="function"==typeof queueMicrotask?queueMicrotask:void 0!==no?function(e){return no.resolve(null).then(e).catch(oo)}:ro;function oo(e){setTimeout(function(){throw e})}function io(e,r){var t=r,n=0;do{var a=t.nextSibling;if(e.removeChild(t),a&&8===a.nodeType)if("/$"===(t=a.data)){if(0===n)return e.removeChild(a),void Mt(r);n--}else"$"!==t&&"$?"!==t&&"$!"!==t||n++;t=a}while(t);Mt(r)}function lo(e){for(;null!=e;e=e.nextSibling){var r=e.nodeType;if(1===r||3===r)break;if(8===r){if("$"===(r=e.data)||"$!"===r||"$?"===r)break;if("/$"===r)return null}}return e}function so(e){e=e.previousSibling;for(var r=0;e;){if(8===e.nodeType){var t=e.data;if("$"===t||"$!"===t||"$?"===t){if(0===r)return e;r--}else"/$"===t&&r++}e=e.previousSibling}return null}var co=Math.random().toString(36).slice(2),po="__reactFiber$"+co,uo="__reactProps$"+co,fo="__reactContainer$"+co,xo="__reactEvents$"+co,ho="__reactListeners$"+co,mo="__reactHandles$"+co;function go(e){var r=e[po];if(r)return r;for(var t=e.parentNode;t;){if(r=t[fo]||t[po]){if(t=r.alternate,null!==r.child||null!==t&&null!==t.child)for(e=so(e);null!==e;){if(t=e[po])return t;e=so(e)}return r}t=(e=t).parentNode}return null}function bo(e){return!(e=e[po]||e[fo])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function vo(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(ne(33))}function yo(e){return e[uo]||null}var wo=[],ko=-1;function jo(e){return{current:e}}function So(e){0>ko||(e.current=wo[ko],wo[ko]=null,ko--)}function zo(e,r){ko++,wo[ko]=e.current,e.current=r}var $o={},Co=jo($o),Eo=jo(!1),_o=$o;function Do(e,r){var t=e.type.contextTypes;if(!t)return $o;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===r)return n.__reactInternalMemoizedMaskedChildContext;var a,o={};for(a in t)o[a]=r[a];return n&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=o),o}function To(e){return null!=(e=e.childContextTypes)}function No(){So(Eo),So(Co)}function Po(e,r,t){if(Co.current!==$o)throw Error(ne(168));zo(Co,r),zo(Eo,t)}function Io(e,r,t){var n=e.stateNode;if(r=r.childContextTypes,"function"!=typeof n.getChildContext)return t;for(var a in n=n.getChildContext())if(!(a in r))throw Error(ne(108,Ye(e)||"Unknown",a));return Ae({},t,n)}function Ao(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||$o,_o=Co.current,zo(Co,e),zo(Eo,Eo.current),!0}function Fo(e,r,t){var n=e.stateNode;if(!n)throw Error(ne(169));t?(e=Io(e,r,_o),n.__reactInternalMemoizedMergedChildContext=e,So(Eo),So(Co),zo(Co,e)):So(Eo),zo(Eo,t)}var Lo=null,Ro=!1,Oo=!1;function Mo(e){null===Lo?Lo=[e]:Lo.push(e)}function Yo(){if(!Oo&&null!==Lo){Oo=!0;var e=0,r=gt;try{var t=Lo;for(gt=1;e<t.length;e++){var n=t[e];do{n=n(!0)}while(null!==n)}Lo=null,Ro=!1}catch(a){throw null!==Lo&&(Lo=Lo.slice(e+1)),Hr(Kr,Yo),a}finally{gt=r,Oo=!1}}return null}var Bo=[],Wo=0,Uo=null,Ho=0,qo=[],Vo=0,Qo=null,Xo=1,Go="";function Ko(e,r){Bo[Wo++]=Ho,Bo[Wo++]=Uo,Uo=e,Ho=r}function Jo(e,r,t){qo[Vo++]=Xo,qo[Vo++]=Go,qo[Vo++]=Qo,Qo=e;var n=Xo;e=Go;var a=32-at(n)-1;n&=~(1<<a),t+=1;var o=32-at(r)+a;if(30<o){var i=a-a%5;o=(n&(1<<i)-1).toString(32),n>>=i,a-=i,Xo=1<<32-at(r)+a|t<<a|n,Go=o+e}else Xo=1<<o|t<<a|n,Go=e}function Zo(e){null!==e.return&&(Ko(e,1),Jo(e,1,0))}function ei(e){for(;e===Uo;)Uo=Bo[--Wo],Bo[Wo]=null,Ho=Bo[--Wo],Bo[Wo]=null;for(;e===Qo;)Qo=qo[--Vo],qo[Vo]=null,Go=qo[--Vo],qo[Vo]=null,Xo=qo[--Vo],qo[Vo]=null}var ri=null,ti=null,ni=!1,ai=null;function oi(e,r){var t=_c(5,null,null,0);t.elementType="DELETED",t.stateNode=r,t.return=e,null===(r=e.deletions)?(e.deletions=[t],e.flags|=16):r.push(t)}function ii(e,r){switch(e.tag){case 5:var t=e.type;return null!==(r=1!==r.nodeType||t.toLowerCase()!==r.nodeName.toLowerCase()?null:r)&&(e.stateNode=r,ri=e,ti=lo(r.firstChild),!0);case 6:return null!==(r=""===e.pendingProps||3!==r.nodeType?null:r)&&(e.stateNode=r,ri=e,ti=null,!0);case 13:return null!==(r=8!==r.nodeType?null:r)&&(t=null!==Qo?{id:Xo,overflow:Go}:null,e.memoizedState={dehydrated:r,treeContext:t,retryLane:1073741824},(t=_c(18,null,null,0)).stateNode=r,t.return=e,e.child=t,ri=e,ti=null,!0);default:return!1}}function li(e){return!(!(1&e.mode)||128&e.flags)}function si(e){if(ni){var r=ti;if(r){var t=r;if(!ii(e,r)){if(li(e))throw Error(ne(418));r=lo(t.nextSibling);var n=ri;r&&ii(e,r)?oi(n,t):(e.flags=-4097&e.flags|2,ni=!1,ri=e)}}else{if(li(e))throw Error(ne(418));e.flags=-4097&e.flags|2,ni=!1,ri=e}}}function di(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;ri=e}function ci(e){if(e!==ri)return!1;if(!ni)return di(e),ni=!0,!1;var r;if((r=3!==e.tag)&&!(r=5!==e.tag)&&(r="head"!==(r=e.type)&&"body"!==r&&!eo(e.type,e.memoizedProps)),r&&(r=ti)){if(li(e))throw pi(),Error(ne(418));for(;r;)oi(e,r),r=lo(r.nextSibling)}if(di(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(ne(317));e:{for(e=e.nextSibling,r=0;e;){if(8===e.nodeType){var t=e.data;if("/$"===t){if(0===r){ti=lo(e.nextSibling);break e}r--}else"$"!==t&&"$!"!==t&&"$?"!==t||r++}e=e.nextSibling}ti=null}}else ti=ri?lo(e.stateNode.nextSibling):null;return!0}function pi(){for(var e=ti;e;)e=lo(e.nextSibling)}function ui(){ti=ri=null,ni=!1}function fi(e){null===ai?ai=[e]:ai.push(e)}var xi=be.ReactCurrentBatchConfig;function hi(e,r,t){if(null!==(e=t.ref)&&"function"!=typeof e&&"object"!=typeof e){if(t._owner){if(t=t._owner){if(1!==t.tag)throw Error(ne(309));var n=t.stateNode}if(!n)throw Error(ne(147,e));var a=n,o=""+e;return null!==r&&null!==r.ref&&"function"==typeof r.ref&&r.ref._stringRef===o?r.ref:((r=function(e){var r=a.refs;null===e?delete r[o]:r[o]=e})._stringRef=o,r)}if("string"!=typeof e)throw Error(ne(284));if(!t._owner)throw Error(ne(290,e))}return e}function mi(e,r){throw e=Object.prototype.toString.call(r),Error(ne(31,"[object Object]"===e?"object with keys {"+Object.keys(r).join(", ")+"}":e))}function gi(e){return(0,e._init)(e._payload)}function bi(e){function r(r,t){if(e){var n=r.deletions;null===n?(r.deletions=[t],r.flags|=16):n.push(t)}}function t(t,n){if(!e)return null;for(;null!==n;)r(t,n),n=n.sibling;return null}function n(e,r){for(e=new Map;null!==r;)null!==r.key?e.set(r.key,r):e.set(r.index,r),r=r.sibling;return e}function a(e,r){return(e=Tc(e,r)).index=0,e.sibling=null,e}function o(r,t,n){return r.index=n,e?null!==(n=r.alternate)?(n=n.index)<t?(r.flags|=2,t):n:(r.flags|=2,t):(r.flags|=1048576,t)}function i(r){return e&&null===r.alternate&&(r.flags|=2),r}function l(e,r,t,n){return null===r||6!==r.tag?((r=Ac(t,e.mode,n)).return=e,r):((r=a(r,t)).return=e,r)}function s(e,r,t,n){var o=t.type;return o===we?c(e,r,t.props.children,n,t.key):null!==r&&(r.elementType===o||"object"==typeof o&&null!==o&&o.$$typeof===De&&gi(o)===r.type)?((n=a(r,t.props)).ref=hi(e,r,t),n.return=e,n):((n=Nc(t.type,t.key,t.props,null,e.mode,n)).ref=hi(e,r,t),n.return=e,n)}function d(e,r,t,n){return null===r||4!==r.tag||r.stateNode.containerInfo!==t.containerInfo||r.stateNode.implementation!==t.implementation?((r=Fc(t,e.mode,n)).return=e,r):((r=a(r,t.children||[])).return=e,r)}function c(e,r,t,n,o){return null===r||7!==r.tag?((r=Pc(t,e.mode,n,o)).return=e,r):((r=a(r,t)).return=e,r)}function p(e,r,t){if("string"==typeof r&&""!==r||"number"==typeof r)return(r=Ac(""+r,e.mode,t)).return=e,r;if("object"==typeof r&&null!==r){switch(r.$$typeof){case ve:return(t=Nc(r.type,r.key,r.props,null,e.mode,t)).ref=hi(e,null,r),t.return=e,t;case ye:return(r=Fc(r,e.mode,t)).return=e,r;case De:return p(e,(0,r._init)(r._payload),t)}if(Ze(r)||Pe(r))return(r=Pc(r,e.mode,t,null)).return=e,r;mi(e,r)}return null}function u(e,r,t,n){var a=null!==r?r.key:null;if("string"==typeof t&&""!==t||"number"==typeof t)return null!==a?null:l(e,r,""+t,n);if("object"==typeof t&&null!==t){switch(t.$$typeof){case ve:return t.key===a?s(e,r,t,n):null;case ye:return t.key===a?d(e,r,t,n):null;case De:return u(e,r,(a=t._init)(t._payload),n)}if(Ze(t)||Pe(t))return null!==a?null:c(e,r,t,n,null);mi(e,t)}return null}function f(e,r,t,n,a){if("string"==typeof n&&""!==n||"number"==typeof n)return l(r,e=e.get(t)||null,""+n,a);if("object"==typeof n&&null!==n){switch(n.$$typeof){case ve:return s(r,e=e.get(null===n.key?t:n.key)||null,n,a);case ye:return d(r,e=e.get(null===n.key?t:n.key)||null,n,a);case De:return f(e,r,t,(0,n._init)(n._payload),a)}if(Ze(n)||Pe(n))return c(r,e=e.get(t)||null,n,a,null);mi(r,n)}return null}return function l(s,d,c,x){if("object"==typeof c&&null!==c&&c.type===we&&null===c.key&&(c=c.props.children),"object"==typeof c&&null!==c){switch(c.$$typeof){case ve:e:{for(var h=c.key,m=d;null!==m;){if(m.key===h){if((h=c.type)===we){if(7===m.tag){t(s,m.sibling),(d=a(m,c.props.children)).return=s,s=d;break e}}else if(m.elementType===h||"object"==typeof h&&null!==h&&h.$$typeof===De&&gi(h)===m.type){t(s,m.sibling),(d=a(m,c.props)).ref=hi(s,m,c),d.return=s,s=d;break e}t(s,m);break}r(s,m),m=m.sibling}c.type===we?((d=Pc(c.props.children,s.mode,x,c.key)).return=s,s=d):((x=Nc(c.type,c.key,c.props,null,s.mode,x)).ref=hi(s,d,c),x.return=s,s=x)}return i(s);case ye:e:{for(m=c.key;null!==d;){if(d.key===m){if(4===d.tag&&d.stateNode.containerInfo===c.containerInfo&&d.stateNode.implementation===c.implementation){t(s,d.sibling),(d=a(d,c.children||[])).return=s,s=d;break e}t(s,d);break}r(s,d),d=d.sibling}(d=Fc(c,s.mode,x)).return=s,s=d}return i(s);case De:return l(s,d,(m=c._init)(c._payload),x)}if(Ze(c))return function(a,i,l,s){for(var d=null,c=null,x=i,h=i=0,m=null;null!==x&&h<l.length;h++){x.index>h?(m=x,x=null):m=x.sibling;var g=u(a,x,l[h],s);if(null===g){null===x&&(x=m);break}e&&x&&null===g.alternate&&r(a,x),i=o(g,i,h),null===c?d=g:c.sibling=g,c=g,x=m}if(h===l.length)return t(a,x),ni&&Ko(a,h),d;if(null===x){for(;h<l.length;h++)null!==(x=p(a,l[h],s))&&(i=o(x,i,h),null===c?d=x:c.sibling=x,c=x);return ni&&Ko(a,h),d}for(x=n(a,x);h<l.length;h++)null!==(m=f(x,a,h,l[h],s))&&(e&&null!==m.alternate&&x.delete(null===m.key?h:m.key),i=o(m,i,h),null===c?d=m:c.sibling=m,c=m);return e&&x.forEach(function(e){return r(a,e)}),ni&&Ko(a,h),d}(s,d,c,x);if(Pe(c))return function(a,i,l,s){var d=Pe(l);if("function"!=typeof d)throw Error(ne(150));if(null==(l=d.call(l)))throw Error(ne(151));for(var c=d=null,x=i,h=i=0,m=null,g=l.next();null!==x&&!g.done;h++,g=l.next()){x.index>h?(m=x,x=null):m=x.sibling;var b=u(a,x,g.value,s);if(null===b){null===x&&(x=m);break}e&&x&&null===b.alternate&&r(a,x),i=o(b,i,h),null===c?d=b:c.sibling=b,c=b,x=m}if(g.done)return t(a,x),ni&&Ko(a,h),d;if(null===x){for(;!g.done;h++,g=l.next())null!==(g=p(a,g.value,s))&&(i=o(g,i,h),null===c?d=g:c.sibling=g,c=g);return ni&&Ko(a,h),d}for(x=n(a,x);!g.done;h++,g=l.next())null!==(g=f(x,a,h,g.value,s))&&(e&&null!==g.alternate&&x.delete(null===g.key?h:g.key),i=o(g,i,h),null===c?d=g:c.sibling=g,c=g);return e&&x.forEach(function(e){return r(a,e)}),ni&&Ko(a,h),d}(s,d,c,x);mi(s,c)}return"string"==typeof c&&""!==c||"number"==typeof c?(c=""+c,null!==d&&6===d.tag?(t(s,d.sibling),(d=a(d,c)).return=s,s=d):(t(s,d),(d=Ac(c,s.mode,x)).return=s,s=d),i(s)):t(s,d)}}var vi=bi(!0),yi=bi(!1),wi=jo(null),ki=null,ji=null,Si=null;function zi(){Si=ji=ki=null}function $i(e){var r=wi.current;So(wi),e._currentValue=r}function Ci(e,r,t){for(;null!==e;){var n=e.alternate;if((e.childLanes&r)!==r?(e.childLanes|=r,null!==n&&(n.childLanes|=r)):null!==n&&(n.childLanes&r)!==r&&(n.childLanes|=r),e===t)break;e=e.return}}function Ei(e,r){ki=e,Si=ji=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&r)&&(gs=!0),e.firstContext=null)}function _i(e){var r=e._currentValue;if(Si!==e)if(e={context:e,memoizedValue:r,next:null},null===ji){if(null===ki)throw Error(ne(308));ji=e,ki.dependencies={lanes:0,firstContext:e}}else ji=ji.next=e;return r}var Di=null;function Ti(e){null===Di?Di=[e]:Di.push(e)}function Ni(e,r,t,n){var a=r.interleaved;return null===a?(t.next=t,Ti(r)):(t.next=a.next,a.next=t),r.interleaved=t,Pi(e,n)}function Pi(e,r){e.lanes|=r;var t=e.alternate;for(null!==t&&(t.lanes|=r),t=e,e=e.return;null!==e;)e.childLanes|=r,null!==(t=e.alternate)&&(t.childLanes|=r),t=e,e=e.return;return 3===t.tag?t.stateNode:null}var Ii=!1;function Ai(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fi(e,r){e=e.updateQueue,r.updateQueue===e&&(r.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Li(e,r){return{eventTime:e,lane:r,tag:0,payload:null,callback:null,next:null}}function Ri(e,r,t){var n=e.updateQueue;if(null===n)return null;if(n=n.shared,2&$d){var a=n.pending;return null===a?r.next=r:(r.next=a.next,a.next=r),n.pending=r,Pi(e,t)}return null===(a=n.interleaved)?(r.next=r,Ti(n)):(r.next=a.next,a.next=r),n.interleaved=r,Pi(e,t)}function Oi(e,r,t){if(null!==(r=r.updateQueue)&&(r=r.shared,4194240&t)){var n=r.lanes;t|=n&=e.pendingLanes,r.lanes=t,mt(e,t)}}function Mi(e,r){var t=e.updateQueue,n=e.alternate;if(null!==n&&t===(n=n.updateQueue)){var a=null,o=null;if(null!==(t=t.firstBaseUpdate)){do{var i={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};null===o?a=o=i:o=o.next=i,t=t.next}while(null!==t);null===o?a=o=r:o=o.next=r}else a=o=r;return t={baseState:n.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:n.shared,effects:n.effects},void(e.updateQueue=t)}null===(e=t.lastBaseUpdate)?t.firstBaseUpdate=r:e.next=r,t.lastBaseUpdate=r}function Yi(e,r,t,n){var a=e.updateQueue;Ii=!1;var o=a.firstBaseUpdate,i=a.lastBaseUpdate,l=a.shared.pending;if(null!==l){a.shared.pending=null;var s=l,d=s.next;s.next=null,null===i?o=d:i.next=d,i=s;var c=e.alternate;null!==c&&((l=(c=c.updateQueue).lastBaseUpdate)!==i&&(null===l?c.firstBaseUpdate=d:l.next=d,c.lastBaseUpdate=s))}if(null!==o){var p=a.baseState;for(i=0,c=d=s=null,l=o;;){var u=l.lane,f=l.eventTime;if((n&u)===u){null!==c&&(c=c.next={eventTime:f,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var x=e,h=l;switch(u=r,f=t,h.tag){case 1:if("function"==typeof(x=h.payload)){p=x.call(f,p,u);break e}p=x;break e;case 3:x.flags=-65537&x.flags|128;case 0:if(null==(u="function"==typeof(x=h.payload)?x.call(f,p,u):x))break e;p=Ae({},p,u);break e;case 2:Ii=!0}}null!==l.callback&&0!==l.lane&&(e.flags|=64,null===(u=a.effects)?a.effects=[l]:u.push(l))}else f={eventTime:f,lane:u,tag:l.tag,payload:l.payload,callback:l.callback,next:null},null===c?(d=c=f,s=p):c=c.next=f,i|=u;if(null===(l=l.next)){if(null===(l=a.shared.pending))break;l=(u=l).next,u.next=null,a.lastBaseUpdate=u,a.shared.pending=null}}if(null===c&&(s=p),a.baseState=s,a.firstBaseUpdate=d,a.lastBaseUpdate=c,null!==(r=a.shared.interleaved)){a=r;do{i|=a.lane,a=a.next}while(a!==r)}else null===o&&(a.shared.lanes=0);Id|=i,e.lanes=i,e.memoizedState=p}}function Bi(e,r,t){if(e=r.effects,r.effects=null,null!==e)for(r=0;r<e.length;r++){var n=e[r],a=n.callback;if(null!==a){if(n.callback=null,n=t,"function"!=typeof a)throw Error(ne(191,a));a.call(n)}}}var Wi={},Ui=jo(Wi),Hi=jo(Wi),qi=jo(Wi);function Vi(e){if(e===Wi)throw Error(ne(174));return e}function Qi(e,r){switch(zo(qi,r),zo(Hi,e),zo(Ui,Wi),e=r.nodeType){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:ir(null,"");break;default:r=ir(r=(e=8===e?r.parentNode:r).namespaceURI||null,e=e.tagName)}So(Ui),zo(Ui,r)}function Xi(){So(Ui),So(Hi),So(qi)}function Gi(e){Vi(qi.current);var r=Vi(Ui.current),t=ir(r,e.type);r!==t&&(zo(Hi,e),zo(Ui,t))}function Ki(e){Hi.current===e&&(So(Ui),So(Hi))}var Ji=jo(0);function Zi(e){for(var r=e;null!==r;){if(13===r.tag){var t=r.memoizedState;if(null!==t&&(null===(t=t.dehydrated)||"$?"===t.data||"$!"===t.data))return r}else if(19===r.tag&&void 0!==r.memoizedProps.revealOrder){if(128&r.flags)return r}else if(null!==r.child){r.child.return=r,r=r.child;continue}if(r===e)break;for(;null===r.sibling;){if(null===r.return||r.return===e)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var el=[];function rl(){for(var e=0;e<el.length;e++)el[e]._workInProgressVersionPrimary=null;el.length=0}var tl=be.ReactCurrentDispatcher,nl=be.ReactCurrentBatchConfig,al=0,ol=null,il=null,ll=null,sl=!1,dl=!1,cl=0,pl=0;function ul(){throw Error(ne(321))}function fl(e,r){if(null===r)return!1;for(var t=0;t<r.length&&t<e.length;t++)if(!oa(e[t],r[t]))return!1;return!0}function xl(e,r,t,n,a,o){if(al=o,ol=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,tl.current=null===e||null===e.memoizedState?Kl:Jl,e=t(n,a),dl){o=0;do{if(dl=!1,cl=0,25<=o)throw Error(ne(301));o+=1,ll=il=null,r.updateQueue=null,tl.current=Zl,e=t(n,a)}while(dl)}if(tl.current=Gl,r=null!==il&&null!==il.next,al=0,ll=il=ol=null,sl=!1,r)throw Error(ne(300));return e}function hl(){var e=0!==cl;return cl=0,e}function ml(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ll?ol.memoizedState=ll=e:ll=ll.next=e,ll}function gl(){if(null===il){var e=ol.alternate;e=null!==e?e.memoizedState:null}else e=il.next;var r=null===ll?ol.memoizedState:ll.next;if(null!==r)ll=r,il=e;else{if(null===e)throw Error(ne(310));e={memoizedState:(il=e).memoizedState,baseState:il.baseState,baseQueue:il.baseQueue,queue:il.queue,next:null},null===ll?ol.memoizedState=ll=e:ll=ll.next=e}return ll}function bl(e,r){return"function"==typeof r?r(e):r}function vl(e){var r=gl(),t=r.queue;if(null===t)throw Error(ne(311));t.lastRenderedReducer=e;var n=il,a=n.baseQueue,o=t.pending;if(null!==o){if(null!==a){var i=a.next;a.next=o.next,o.next=i}n.baseQueue=a=o,t.pending=null}if(null!==a){o=a.next,n=n.baseState;var l=i=null,s=null,d=o;do{var c=d.lane;if((al&c)===c)null!==s&&(s=s.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),n=d.hasEagerState?d.eagerState:e(n,d.action);else{var p={lane:c,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};null===s?(l=s=p,i=n):s=s.next=p,ol.lanes|=c,Id|=c}d=d.next}while(null!==d&&d!==o);null===s?i=n:s.next=l,oa(n,r.memoizedState)||(gs=!0),r.memoizedState=n,r.baseState=i,r.baseQueue=s,t.lastRenderedState=n}if(null!==(e=t.interleaved)){a=e;do{o=a.lane,ol.lanes|=o,Id|=o,a=a.next}while(a!==e)}else null===a&&(t.lanes=0);return[r.memoizedState,t.dispatch]}function yl(e){var r=gl(),t=r.queue;if(null===t)throw Error(ne(311));t.lastRenderedReducer=e;var n=t.dispatch,a=t.pending,o=r.memoizedState;if(null!==a){t.pending=null;var i=a=a.next;do{o=e(o,i.action),i=i.next}while(i!==a);oa(o,r.memoizedState)||(gs=!0),r.memoizedState=o,null===r.baseQueue&&(r.baseState=o),t.lastRenderedState=o}return[o,n]}function wl(){}function kl(e,r){var t=ol,n=gl(),a=r(),o=!oa(n.memoizedState,a);if(o&&(n.memoizedState=a,gs=!0),n=n.queue,Il(zl.bind(null,t,n,e),[e]),n.getSnapshot!==r||o||null!==ll&&1&ll.memoizedState.tag){if(t.flags|=2048,_l(9,Sl.bind(null,t,n,a,r),void 0,null),null===Cd)throw Error(ne(349));30&al||jl(t,r,a)}return a}function jl(e,r,t){e.flags|=16384,e={getSnapshot:r,value:t},null===(r=ol.updateQueue)?(r={lastEffect:null,stores:null},ol.updateQueue=r,r.stores=[e]):null===(t=r.stores)?r.stores=[e]:t.push(e)}function Sl(e,r,t,n){r.value=t,r.getSnapshot=n,$l(r)&&Cl(e)}function zl(e,r,t){return t(function(){$l(r)&&Cl(e)})}function $l(e){var r=e.getSnapshot;e=e.value;try{var t=r();return!oa(e,t)}catch(n){return!0}}function Cl(e){var r=Pi(e,1);null!==r&&ec(r,e,1,-1)}function El(e){var r=ml();return"function"==typeof e&&(e=e()),r.memoizedState=r.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:bl,lastRenderedState:e},r.queue=e,e=e.dispatch=ql.bind(null,ol,e),[r.memoizedState,e]}function _l(e,r,t,n){return e={tag:e,create:r,destroy:t,deps:n,next:null},null===(r=ol.updateQueue)?(r={lastEffect:null,stores:null},ol.updateQueue=r,r.lastEffect=e.next=e):null===(t=r.lastEffect)?r.lastEffect=e.next=e:(n=t.next,t.next=e,e.next=n,r.lastEffect=e),e}function Dl(){return gl().memoizedState}function Tl(e,r,t,n){var a=ml();ol.flags|=e,a.memoizedState=_l(1|r,t,void 0,void 0===n?null:n)}function Nl(e,r,t,n){var a=gl();n=void 0===n?null:n;var o=void 0;if(null!==il){var i=il.memoizedState;if(o=i.destroy,null!==n&&fl(n,i.deps))return void(a.memoizedState=_l(r,t,o,n))}ol.flags|=e,a.memoizedState=_l(1|r,t,o,n)}function Pl(e,r){return Tl(8390656,8,e,r)}function Il(e,r){return Nl(2048,8,e,r)}function Al(e,r){return Nl(4,2,e,r)}function Fl(e,r){return Nl(4,4,e,r)}function Ll(e,r){return"function"==typeof r?(e=e(),r(e),function(){r(null)}):null!=r?(e=e(),r.current=e,function(){r.current=null}):void 0}function Rl(e,r,t){return t=null!=t?t.concat([e]):null,Nl(4,4,Ll.bind(null,r,e),t)}function Ol(){}function Ml(e,r){var t=gl();r=void 0===r?null:r;var n=t.memoizedState;return null!==n&&null!==r&&fl(r,n[1])?n[0]:(t.memoizedState=[e,r],e)}function Yl(e,r){var t=gl();r=void 0===r?null:r;var n=t.memoizedState;return null!==n&&null!==r&&fl(r,n[1])?n[0]:(e=e(),t.memoizedState=[e,r],e)}function Bl(e,r,t){return 21&al?(oa(t,r)||(t=ft(),ol.lanes|=t,Id|=t,e.baseState=!0),r):(e.baseState&&(e.baseState=!1,gs=!0),e.memoizedState=t)}function Wl(e,r){var t=gt;gt=0!==t&&4>t?t:4,e(!0);var n=nl.transition;nl.transition={};try{e(!1),r()}finally{gt=t,nl.transition=n}}function Ul(){return gl().memoizedState}function Hl(e,r,t){var n=Zd(e);if(t={lane:n,action:t,hasEagerState:!1,eagerState:null,next:null},Vl(e))Ql(r,t);else if(null!==(t=Ni(e,r,t,n))){ec(t,e,n,Jd()),Xl(t,r,n)}}function ql(e,r,t){var n=Zd(e),a={lane:n,action:t,hasEagerState:!1,eagerState:null,next:null};if(Vl(e))Ql(r,a);else{var o=e.alternate;if(0===e.lanes&&(null===o||0===o.lanes)&&null!==(o=r.lastRenderedReducer))try{var i=r.lastRenderedState,l=o(i,t);if(a.hasEagerState=!0,a.eagerState=l,oa(l,i)){var s=r.interleaved;return null===s?(a.next=a,Ti(r)):(a.next=s.next,s.next=a),void(r.interleaved=a)}}catch(d){}null!==(t=Ni(e,r,a,n))&&(ec(t,e,n,a=Jd()),Xl(t,r,n))}}function Vl(e){var r=e.alternate;return e===ol||null!==r&&r===ol}function Ql(e,r){dl=sl=!0;var t=e.pending;null===t?r.next=r:(r.next=t.next,t.next=r),e.pending=r}function Xl(e,r,t){if(4194240&t){var n=r.lanes;t|=n&=e.pendingLanes,r.lanes=t,mt(e,t)}}var Gl={readContext:_i,useCallback:ul,useContext:ul,useEffect:ul,useImperativeHandle:ul,useInsertionEffect:ul,useLayoutEffect:ul,useMemo:ul,useReducer:ul,useRef:ul,useState:ul,useDebugValue:ul,useDeferredValue:ul,useTransition:ul,useMutableSource:ul,useSyncExternalStore:ul,useId:ul,unstable_isNewReconciler:!1},Kl={readContext:_i,useCallback:function(e,r){return ml().memoizedState=[e,void 0===r?null:r],e},useContext:_i,useEffect:Pl,useImperativeHandle:function(e,r,t){return t=null!=t?t.concat([e]):null,Tl(4194308,4,Ll.bind(null,r,e),t)},useLayoutEffect:function(e,r){return Tl(4194308,4,e,r)},useInsertionEffect:function(e,r){return Tl(4,2,e,r)},useMemo:function(e,r){var t=ml();return r=void 0===r?null:r,e=e(),t.memoizedState=[e,r],e},useReducer:function(e,r,t){var n=ml();return r=void 0!==t?t(r):r,n.memoizedState=n.baseState=r,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},n.queue=e,e=e.dispatch=Hl.bind(null,ol,e),[n.memoizedState,e]},useRef:function(e){return e={current:e},ml().memoizedState=e},useState:El,useDebugValue:Ol,useDeferredValue:function(e){return ml().memoizedState=e},useTransition:function(){var e=El(!1),r=e[0];return e=Wl.bind(null,e[1]),ml().memoizedState=e,[r,e]},useMutableSource:function(){},useSyncExternalStore:function(e,r,t){var n=ol,a=ml();if(ni){if(void 0===t)throw Error(ne(407));t=t()}else{if(t=r(),null===Cd)throw Error(ne(349));30&al||jl(n,r,t)}a.memoizedState=t;var o={value:t,getSnapshot:r};return a.queue=o,Pl(zl.bind(null,n,o,e),[e]),n.flags|=2048,_l(9,Sl.bind(null,n,o,t,r),void 0,null),t},useId:function(){var e=ml(),r=Cd.identifierPrefix;if(ni){var t=Go;r=":"+r+"R"+(t=(Xo&~(1<<32-at(Xo)-1)).toString(32)+t),0<(t=cl++)&&(r+="H"+t.toString(32)),r+=":"}else r=":"+r+"r"+(t=pl++).toString(32)+":";return e.memoizedState=r},unstable_isNewReconciler:!1},Jl={readContext:_i,useCallback:Ml,useContext:_i,useEffect:Il,useImperativeHandle:Rl,useInsertionEffect:Al,useLayoutEffect:Fl,useMemo:Yl,useReducer:vl,useRef:Dl,useState:function(){return vl(bl)},useDebugValue:Ol,useDeferredValue:function(e){return Bl(gl(),il.memoizedState,e)},useTransition:function(){return[vl(bl)[0],gl().memoizedState]},useMutableSource:wl,useSyncExternalStore:kl,useId:Ul,unstable_isNewReconciler:!1},Zl={readContext:_i,useCallback:Ml,useContext:_i,useEffect:Il,useImperativeHandle:Rl,useInsertionEffect:Al,useLayoutEffect:Fl,useMemo:Yl,useReducer:yl,useRef:Dl,useState:function(){return yl(bl)},useDebugValue:Ol,useDeferredValue:function(e){var r=gl();return null===il?r.memoizedState=e:Bl(r,il.memoizedState,e)},useTransition:function(){return[yl(bl)[0],gl().memoizedState]},useMutableSource:wl,useSyncExternalStore:kl,useId:Ul,unstable_isNewReconciler:!1};function es(e,r){if(e&&e.defaultProps){for(var t in r=Ae({},r),e=e.defaultProps)void 0===r[t]&&(r[t]=e[t]);return r}return r}function rs(e,r,t,n){t=null==(t=t(n,r=e.memoizedState))?r:Ae({},r,t),e.memoizedState=t,0===e.lanes&&(e.updateQueue.baseState=t)}var ts={isMounted:function(e){return!!(e=e._reactInternals)&&Mr(e)===e},enqueueSetState:function(e,r,t){e=e._reactInternals;var n=Jd(),a=Zd(e),o=Li(n,a);o.payload=r,null!=t&&(o.callback=t),null!==(r=Ri(e,o,a))&&(ec(r,e,a,n),Oi(r,e,a))},enqueueReplaceState:function(e,r,t){e=e._reactInternals;var n=Jd(),a=Zd(e),o=Li(n,a);o.tag=1,o.payload=r,null!=t&&(o.callback=t),null!==(r=Ri(e,o,a))&&(ec(r,e,a,n),Oi(r,e,a))},enqueueForceUpdate:function(e,r){e=e._reactInternals;var t=Jd(),n=Zd(e),a=Li(t,n);a.tag=2,null!=r&&(a.callback=r),null!==(r=Ri(e,a,n))&&(ec(r,e,n,t),Oi(r,e,n))}};function ns(e,r,t,n,a,o,i){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(n,o,i):!r.prototype||!r.prototype.isPureReactComponent||(!ia(t,n)||!ia(a,o))}function as(e,r,t){var n=!1,a=$o,o=r.contextType;return"object"==typeof o&&null!==o?o=_i(o):(a=To(r)?_o:Co.current,o=(n=null!=(n=r.contextTypes))?Do(e,a):$o),r=new r(t,o),e.memoizedState=null!==r.state&&void 0!==r.state?r.state:null,r.updater=ts,e.stateNode=r,r._reactInternals=e,n&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),r}function os(e,r,t,n){e=r.state,"function"==typeof r.componentWillReceiveProps&&r.componentWillReceiveProps(t,n),"function"==typeof r.UNSAFE_componentWillReceiveProps&&r.UNSAFE_componentWillReceiveProps(t,n),r.state!==e&&ts.enqueueReplaceState(r,r.state,null)}function is(e,r,t,n){var a=e.stateNode;a.props=t,a.state=e.memoizedState,a.refs={},Ai(e);var o=r.contextType;"object"==typeof o&&null!==o?a.context=_i(o):(o=To(r)?_o:Co.current,a.context=Do(e,o)),a.state=e.memoizedState,"function"==typeof(o=r.getDerivedStateFromProps)&&(rs(e,r,o,t),a.state=e.memoizedState),"function"==typeof r.getDerivedStateFromProps||"function"==typeof a.getSnapshotBeforeUpdate||"function"!=typeof a.UNSAFE_componentWillMount&&"function"!=typeof a.componentWillMount||(r=a.state,"function"==typeof a.componentWillMount&&a.componentWillMount(),"function"==typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount(),r!==a.state&&ts.enqueueReplaceState(a,a.state,null),Yi(e,t,a,n),a.state=e.memoizedState),"function"==typeof a.componentDidMount&&(e.flags|=4194308)}function ls(e,r){try{var t="",n=r;do{t+=Oe(n),n=n.return}while(n);var a=t}catch(o){a="\nError generating stack: "+o.message+"\n"+o.stack}return{value:e,source:r,stack:a,digest:null}}function ss(e,r,t){return{value:e,source:null,stack:null!=t?t:null,digest:null!=r?r:null}}function ds(e,r){try{console.error(r.value)}catch(t){setTimeout(function(){throw t})}}var cs="function"==typeof WeakMap?WeakMap:Map;function ps(e,r,t){(t=Li(-1,t)).tag=3,t.payload={element:null};var n=r.value;return t.callback=function(){Bd||(Bd=!0,Wd=n),ds(0,r)},t}function us(e,r,t){(t=Li(-1,t)).tag=3;var n=e.type.getDerivedStateFromError;if("function"==typeof n){var a=r.value;t.payload=function(){return n(a)},t.callback=function(){ds(0,r)}}var o=e.stateNode;return null!==o&&"function"==typeof o.componentDidCatch&&(t.callback=function(){ds(0,r),"function"!=typeof n&&(null===Ud?Ud=new Set([this]):Ud.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:null!==e?e:""})}),t}function fs(e,r,t){var n=e.pingCache;if(null===n){n=e.pingCache=new cs;var a=new Set;n.set(r,a)}else void 0===(a=n.get(r))&&(a=new Set,n.set(r,a));a.has(t)||(a.add(t),e=jc.bind(null,e,r,t),r.then(e,e))}function xs(e){do{var r;if((r=13===e.tag)&&(r=null===(r=e.memoizedState)||null!==r.dehydrated),r)return e;e=e.return}while(null!==e);return null}function hs(e,r,t,n,a){return 1&e.mode?(e.flags|=65536,e.lanes=a,e):(e===r?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,1===t.tag&&(null===t.alternate?t.tag=17:((r=Li(-1,1)).tag=2,Ri(t,r,1))),t.lanes|=1),e)}var ms=be.ReactCurrentOwner,gs=!1;function bs(e,r,t,n){r.child=null===e?yi(r,null,t,n):vi(r,e.child,t,n)}function vs(e,r,t,n,a){t=t.render;var o=r.ref;return Ei(r,a),n=xl(e,r,t,n,o,a),t=hl(),null===e||gs?(ni&&t&&Zo(r),r.flags|=1,bs(e,r,n,a),r.child):(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~a,Bs(e,r,a))}function ys(e,r,t,n,a){if(null===e){var o=t.type;return"function"!=typeof o||Dc(o)||void 0!==o.defaultProps||null!==t.compare||void 0!==t.defaultProps?((e=Nc(t.type,null,n,r,r.mode,a)).ref=r.ref,e.return=r,r.child=e):(r.tag=15,r.type=o,ws(e,r,o,n,a))}if(o=e.child,0===(e.lanes&a)){var i=o.memoizedProps;if((t=null!==(t=t.compare)?t:ia)(i,n)&&e.ref===r.ref)return Bs(e,r,a)}return r.flags|=1,(e=Tc(o,n)).ref=r.ref,e.return=r,r.child=e}function ws(e,r,t,n,a){if(null!==e){var o=e.memoizedProps;if(ia(o,n)&&e.ref===r.ref){if(gs=!1,r.pendingProps=n=o,0===(e.lanes&a))return r.lanes=e.lanes,Bs(e,r,a);131072&e.flags&&(gs=!0)}}return Ss(e,r,t,n,a)}function ks(e,r,t){var n=r.pendingProps,a=n.children,o=null!==e?e.memoizedState:null;if("hidden"===n.mode)if(1&r.mode){if(!(1073741824&t))return e=null!==o?o.baseLanes|t:t,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:e,cachePool:null,transitions:null},r.updateQueue=null,zo(Td,Dd),Dd|=e,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=null!==o?o.baseLanes:t,zo(Td,Dd),Dd|=n}else r.memoizedState={baseLanes:0,cachePool:null,transitions:null},zo(Td,Dd),Dd|=t;else null!==o?(n=o.baseLanes|t,r.memoizedState=null):n=t,zo(Td,Dd),Dd|=n;return bs(e,r,a,t),r.child}function js(e,r){var t=r.ref;(null===e&&null!==t||null!==e&&e.ref!==t)&&(r.flags|=512,r.flags|=2097152)}function Ss(e,r,t,n,a){var o=To(t)?_o:Co.current;return o=Do(r,o),Ei(r,a),t=xl(e,r,t,n,o,a),n=hl(),null===e||gs?(ni&&n&&Zo(r),r.flags|=1,bs(e,r,t,a),r.child):(r.updateQueue=e.updateQueue,r.flags&=-2053,e.lanes&=~a,Bs(e,r,a))}function zs(e,r,t,n,a){if(To(t)){var o=!0;Ao(r)}else o=!1;if(Ei(r,a),null===r.stateNode)Ys(e,r),as(r,t,n),is(r,t,n,a),n=!0;else if(null===e){var i=r.stateNode,l=r.memoizedProps;i.props=l;var s=i.context,d=t.contextType;"object"==typeof d&&null!==d?d=_i(d):d=Do(r,d=To(t)?_o:Co.current);var c=t.getDerivedStateFromProps,p="function"==typeof c||"function"==typeof i.getSnapshotBeforeUpdate;p||"function"!=typeof i.UNSAFE_componentWillReceiveProps&&"function"!=typeof i.componentWillReceiveProps||(l!==n||s!==d)&&os(r,i,n,d),Ii=!1;var u=r.memoizedState;i.state=u,Yi(r,n,i,a),s=r.memoizedState,l!==n||u!==s||Eo.current||Ii?("function"==typeof c&&(rs(r,t,c,n),s=r.memoizedState),(l=Ii||ns(r,t,l,n,u,s,d))?(p||"function"!=typeof i.UNSAFE_componentWillMount&&"function"!=typeof i.componentWillMount||("function"==typeof i.componentWillMount&&i.componentWillMount(),"function"==typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"==typeof i.componentDidMount&&(r.flags|=4194308)):("function"==typeof i.componentDidMount&&(r.flags|=4194308),r.memoizedProps=n,r.memoizedState=s),i.props=n,i.state=s,i.context=d,n=l):("function"==typeof i.componentDidMount&&(r.flags|=4194308),n=!1)}else{i=r.stateNode,Fi(e,r),l=r.memoizedProps,d=r.type===r.elementType?l:es(r.type,l),i.props=d,p=r.pendingProps,u=i.context,"object"==typeof(s=t.contextType)&&null!==s?s=_i(s):s=Do(r,s=To(t)?_o:Co.current);var f=t.getDerivedStateFromProps;(c="function"==typeof f||"function"==typeof i.getSnapshotBeforeUpdate)||"function"!=typeof i.UNSAFE_componentWillReceiveProps&&"function"!=typeof i.componentWillReceiveProps||(l!==p||u!==s)&&os(r,i,n,s),Ii=!1,u=r.memoizedState,i.state=u,Yi(r,n,i,a);var x=r.memoizedState;l!==p||u!==x||Eo.current||Ii?("function"==typeof f&&(rs(r,t,f,n),x=r.memoizedState),(d=Ii||ns(r,t,d,n,u,x,s)||!1)?(c||"function"!=typeof i.UNSAFE_componentWillUpdate&&"function"!=typeof i.componentWillUpdate||("function"==typeof i.componentWillUpdate&&i.componentWillUpdate(n,x,s),"function"==typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(n,x,s)),"function"==typeof i.componentDidUpdate&&(r.flags|=4),"function"==typeof i.getSnapshotBeforeUpdate&&(r.flags|=1024)):("function"!=typeof i.componentDidUpdate||l===e.memoizedProps&&u===e.memoizedState||(r.flags|=4),"function"!=typeof i.getSnapshotBeforeUpdate||l===e.memoizedProps&&u===e.memoizedState||(r.flags|=1024),r.memoizedProps=n,r.memoizedState=x),i.props=n,i.state=x,i.context=s,n=d):("function"!=typeof i.componentDidUpdate||l===e.memoizedProps&&u===e.memoizedState||(r.flags|=4),"function"!=typeof i.getSnapshotBeforeUpdate||l===e.memoizedProps&&u===e.memoizedState||(r.flags|=1024),n=!1)}return $s(e,r,t,n,o,a)}function $s(e,r,t,n,a,o){js(e,r);var i=!!(128&r.flags);if(!n&&!i)return a&&Fo(r,t,!1),Bs(e,r,o);n=r.stateNode,ms.current=r;var l=i&&"function"!=typeof t.getDerivedStateFromError?null:n.render();return r.flags|=1,null!==e&&i?(r.child=vi(r,e.child,null,o),r.child=vi(r,null,l,o)):bs(e,r,l,o),r.memoizedState=n.state,a&&Fo(r,t,!0),r.child}function Cs(e){var r=e.stateNode;r.pendingContext?Po(0,r.pendingContext,r.pendingContext!==r.context):r.context&&Po(0,r.context,!1),Qi(e,r.containerInfo)}function Es(e,r,t,n,a){return ui(),fi(a),r.flags|=256,bs(e,r,t,n),r.child}var _s,Ds,Ts,Ns,Ps={dehydrated:null,treeContext:null,retryLane:0};function Is(e){return{baseLanes:e,cachePool:null,transitions:null}}function As(e,r,t){var n,a=r.pendingProps,o=Ji.current,i=!1,l=!!(128&r.flags);if((n=l)||(n=(null===e||null!==e.memoizedState)&&!!(2&o)),n?(i=!0,r.flags&=-129):null!==e&&null===e.memoizedState||(o|=1),zo(Ji,1&o),null===e)return si(r),null!==(e=r.memoizedState)&&null!==(e=e.dehydrated)?(1&r.mode?"$!"===e.data?r.lanes=8:r.lanes=1073741824:r.lanes=1,null):(l=a.children,e=a.fallback,i?(a=r.mode,i=r.child,l={mode:"hidden",children:l},1&a||null===i?i=Ic(l,a,0,null):(i.childLanes=0,i.pendingProps=l),e=Pc(e,a,t,null),i.return=r,e.return=r,i.sibling=e,r.child=i,r.child.memoizedState=Is(t),r.memoizedState=Ps,e):Fs(r,l));if(null!==(o=e.memoizedState)&&null!==(n=o.dehydrated))return function(e,r,t,n,a,o,i){if(t)return 256&r.flags?(r.flags&=-257,Ls(e,r,i,n=ss(Error(ne(422))))):null!==r.memoizedState?(r.child=e.child,r.flags|=128,null):(o=n.fallback,a=r.mode,n=Ic({mode:"visible",children:n.children},a,0,null),(o=Pc(o,a,i,null)).flags|=2,n.return=r,o.return=r,n.sibling=o,r.child=n,1&r.mode&&vi(r,e.child,null,i),r.child.memoizedState=Is(i),r.memoizedState=Ps,o);if(!(1&r.mode))return Ls(e,r,i,null);if("$!"===a.data){if(n=a.nextSibling&&a.nextSibling.dataset)var l=n.dgst;return n=l,Ls(e,r,i,n=ss(o=Error(ne(419)),n,void 0))}if(l=0!==(i&e.childLanes),gs||l){if(null!==(n=Cd)){switch(i&-i){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}0!==(a=0!==(a&(n.suspendedLanes|i))?0:a)&&a!==o.retryLane&&(o.retryLane=a,Pi(e,a),ec(n,e,a,-1))}return fc(),Ls(e,r,i,n=ss(Error(ne(421))))}return"$?"===a.data?(r.flags|=128,r.child=e.child,r=zc.bind(null,e),a._reactRetry=r,null):(e=o.treeContext,ti=lo(a.nextSibling),ri=r,ni=!0,ai=null,null!==e&&(qo[Vo++]=Xo,qo[Vo++]=Go,qo[Vo++]=Qo,Xo=e.id,Go=e.overflow,Qo=r),r=Fs(r,n.children),r.flags|=4096,r)}(e,r,l,a,n,o,t);if(i){i=a.fallback,l=r.mode,n=(o=e.child).sibling;var s={mode:"hidden",children:a.children};return 1&l||r.child===o?(a=Tc(o,s)).subtreeFlags=14680064&o.subtreeFlags:((a=r.child).childLanes=0,a.pendingProps=s,r.deletions=null),null!==n?i=Tc(n,i):(i=Pc(i,l,t,null)).flags|=2,i.return=r,a.return=r,a.sibling=i,r.child=a,a=i,i=r.child,l=null===(l=e.child.memoizedState)?Is(t):{baseLanes:l.baseLanes|t,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~t,r.memoizedState=Ps,a}return e=(i=e.child).sibling,a=Tc(i,{mode:"visible",children:a.children}),!(1&r.mode)&&(a.lanes=t),a.return=r,a.sibling=null,null!==e&&(null===(t=r.deletions)?(r.deletions=[e],r.flags|=16):t.push(e)),r.child=a,r.memoizedState=null,a}function Fs(e,r){return(r=Ic({mode:"visible",children:r},e.mode,0,null)).return=e,e.child=r}function Ls(e,r,t,n){return null!==n&&fi(n),vi(r,e.child,null,t),(e=Fs(r,r.pendingProps.children)).flags|=2,r.memoizedState=null,e}function Rs(e,r,t){e.lanes|=r;var n=e.alternate;null!==n&&(n.lanes|=r),Ci(e.return,r,t)}function Os(e,r,t,n,a){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:n,tail:t,tailMode:a}:(o.isBackwards=r,o.rendering=null,o.renderingStartTime=0,o.last=n,o.tail=t,o.tailMode=a)}function Ms(e,r,t){var n=r.pendingProps,a=n.revealOrder,o=n.tail;if(bs(e,r,n.children,t),2&(n=Ji.current))n=1&n|2,r.flags|=128;else{if(null!==e&&128&e.flags)e:for(e=r.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Rs(e,t,r);else if(19===e.tag)Rs(e,t,r);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===r)break e;for(;null===e.sibling;){if(null===e.return||e.return===r)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(zo(Ji,n),1&r.mode)switch(a){case"forwards":for(t=r.child,a=null;null!==t;)null!==(e=t.alternate)&&null===Zi(e)&&(a=t),t=t.sibling;null===(t=a)?(a=r.child,r.child=null):(a=t.sibling,t.sibling=null),Os(r,!1,a,t,o);break;case"backwards":for(t=null,a=r.child,r.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Zi(e)){r.child=a;break}e=a.sibling,a.sibling=t,t=a,a=e}Os(r,!0,t,null,o);break;case"together":Os(r,!1,null,null,void 0);break;default:r.memoizedState=null}else r.memoizedState=null;return r.child}function Ys(e,r){!(1&r.mode)&&null!==e&&(e.alternate=null,r.alternate=null,r.flags|=2)}function Bs(e,r,t){if(null!==e&&(r.dependencies=e.dependencies),Id|=r.lanes,0===(t&r.childLanes))return null;if(null!==e&&r.child!==e.child)throw Error(ne(153));if(null!==r.child){for(t=Tc(e=r.child,e.pendingProps),r.child=t,t.return=r;null!==e.sibling;)e=e.sibling,(t=t.sibling=Tc(e,e.pendingProps)).return=r;t.sibling=null}return r.child}function Ws(e,r){if(!ni)switch(e.tailMode){case"hidden":r=e.tail;for(var t=null;null!==r;)null!==r.alternate&&(t=r),r=r.sibling;null===t?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?r||null===e.tail?e.tail=null:e.tail.sibling=null:n.sibling=null}}function Us(e){var r=null!==e.alternate&&e.alternate.child===e.child,t=0,n=0;if(r)for(var a=e.child;null!==a;)t|=a.lanes|a.childLanes,n|=14680064&a.subtreeFlags,n|=14680064&a.flags,a.return=e,a=a.sibling;else for(a=e.child;null!==a;)t|=a.lanes|a.childLanes,n|=a.subtreeFlags,n|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=n,e.childLanes=t,r}function Hs(e,r,t){var n=r.pendingProps;switch(ei(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Us(r),null;case 1:case 17:return To(r.type)&&No(),Us(r),null;case 3:return n=r.stateNode,Xi(),So(Eo),So(Co),rl(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),null!==e&&null!==e.child||(ci(r)?r.flags|=4:null===e||e.memoizedState.isDehydrated&&!(256&r.flags)||(r.flags|=1024,null!==ai&&(ac(ai),ai=null))),Ds(e,r),Us(r),null;case 5:Ki(r);var a=Vi(qi.current);if(t=r.type,null!==e&&null!=r.stateNode)Ts(e,r,t,n,a),e.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!n){if(null===r.stateNode)throw Error(ne(166));return Us(r),null}if(e=Vi(Ui.current),ci(r)){n=r.stateNode,t=r.type;var o=r.memoizedProps;switch(n[po]=r,n[uo]=o,e=!!(1&r.mode),t){case"dialog":La("cancel",n),La("close",n);break;case"iframe":case"object":case"embed":La("load",n);break;case"video":case"audio":for(a=0;a<Pa.length;a++)La(Pa[a],n);break;case"source":La("error",n);break;case"img":case"image":case"link":La("error",n),La("load",n);break;case"details":La("toggle",n);break;case"input":Qe(n,o),La("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!o.multiple},La("invalid",n);break;case"textarea":tr(n,o),La("invalid",n)}for(var i in mr(t,o),a=null,o)if(o.hasOwnProperty(i)){var l=o[i];"children"===i?"string"==typeof l?n.textContent!==l&&(!0!==o.suppressHydrationWarning&&Ga(n.textContent,l,e),a=["children",l]):"number"==typeof l&&n.textContent!==""+l&&(!0!==o.suppressHydrationWarning&&Ga(n.textContent,l,e),a=["children",""+l]):oe.hasOwnProperty(i)&&null!=l&&"onScroll"===i&&La("scroll",n)}switch(t){case"input":Ue(n),Ke(n,o,!0);break;case"textarea":Ue(n),ar(n);break;case"select":case"option":break;default:"function"==typeof o.onClick&&(n.onclick=Ka)}n=a,r.updateQueue=n,null!==n&&(r.flags|=4)}else{i=9===a.nodeType?a:a.ownerDocument,"http://www.w3.org/1999/xhtml"===e&&(e=or(t)),"http://www.w3.org/1999/xhtml"===e?"script"===t?((e=i.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"==typeof n.is?e=i.createElement(t,{is:n.is}):(e=i.createElement(t),"select"===t&&(i=e,n.multiple?i.multiple=!0:n.size&&(i.size=n.size))):e=i.createElementNS(e,t),e[po]=r,e[uo]=n,_s(e,r,!1,!1),r.stateNode=e;e:{switch(i=gr(t,n),t){case"dialog":La("cancel",e),La("close",e),a=n;break;case"iframe":case"object":case"embed":La("load",e),a=n;break;case"video":case"audio":for(a=0;a<Pa.length;a++)La(Pa[a],e);a=n;break;case"source":La("error",e),a=n;break;case"img":case"image":case"link":La("error",e),La("load",e),a=n;break;case"details":La("toggle",e),a=n;break;case"input":Qe(e,n),a=Ve(e,n),La("invalid",e);break;case"option":default:a=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},a=Ae({},n,{value:void 0}),La("invalid",e);break;case"textarea":tr(e,n),a=rr(e,n),La("invalid",e)}for(o in mr(t,a),l=a)if(l.hasOwnProperty(o)){var s=l[o];"style"===o?xr(e,s):"dangerouslySetInnerHTML"===o?null!=(s=s?s.__html:void 0)&&dr(e,s):"children"===o?"string"==typeof s?("textarea"!==t||""!==s)&&cr(e,s):"number"==typeof s&&cr(e,""+s):"suppressContentEditableWarning"!==o&&"suppressHydrationWarning"!==o&&"autoFocus"!==o&&(oe.hasOwnProperty(o)?null!=s&&"onScroll"===o&&La("scroll",e):null!=s&&ge(e,o,s,i))}switch(t){case"input":Ue(e),Ke(e,n,!1);break;case"textarea":Ue(e),ar(e);break;case"option":null!=n.value&&e.setAttribute("value",""+Be(n.value));break;case"select":e.multiple=!!n.multiple,null!=(o=n.value)?er(e,!!n.multiple,o,!1):null!=n.defaultValue&&er(e,!!n.multiple,n.defaultValue,!0);break;default:"function"==typeof a.onClick&&(e.onclick=Ka)}switch(t){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(r.flags|=4)}null!==r.ref&&(r.flags|=512,r.flags|=2097152)}return Us(r),null;case 6:if(e&&null!=r.stateNode)Ns(e,r,e.memoizedProps,n);else{if("string"!=typeof n&&null===r.stateNode)throw Error(ne(166));if(t=Vi(qi.current),Vi(Ui.current),ci(r)){if(n=r.stateNode,t=r.memoizedProps,n[po]=r,(o=n.nodeValue!==t)&&null!==(e=ri))switch(e.tag){case 3:Ga(n.nodeValue,t,!!(1&e.mode));break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Ga(n.nodeValue,t,!!(1&e.mode))}o&&(r.flags|=4)}else(n=(9===t.nodeType?t:t.ownerDocument).createTextNode(n))[po]=r,r.stateNode=n}return Us(r),null;case 13:if(So(Ji),n=r.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(ni&&null!==ti&&1&r.mode&&!(128&r.flags))pi(),ui(),r.flags|=98560,o=!1;else if(o=ci(r),null!==n&&null!==n.dehydrated){if(null===e){if(!o)throw Error(ne(318));if(!(o=null!==(o=r.memoizedState)?o.dehydrated:null))throw Error(ne(317));o[po]=r}else ui(),!(128&r.flags)&&(r.memoizedState=null),r.flags|=4;Us(r),o=!1}else null!==ai&&(ac(ai),ai=null),o=!0;if(!o)return 65536&r.flags?r:null}return 128&r.flags?(r.lanes=t,r):((n=null!==n)!==(null!==e&&null!==e.memoizedState)&&n&&(r.child.flags|=8192,1&r.mode&&(null===e||1&Ji.current?0===Nd&&(Nd=3):fc())),null!==r.updateQueue&&(r.flags|=4),Us(r),null);case 4:return Xi(),Ds(e,r),null===e&&Ma(r.stateNode.containerInfo),Us(r),null;case 10:return $i(r.type._context),Us(r),null;case 19:if(So(Ji),null===(o=r.memoizedState))return Us(r),null;if(n=!!(128&r.flags),null===(i=o.rendering))if(n)Ws(o,!1);else{if(0!==Nd||null!==e&&128&e.flags)for(e=r.child;null!==e;){if(null!==(i=Zi(e))){for(r.flags|=128,Ws(o,!1),null!==(n=i.updateQueue)&&(r.updateQueue=n,r.flags|=4),r.subtreeFlags=0,n=t,t=r.child;null!==t;)e=n,(o=t).flags&=14680066,null===(i=o.alternate)?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return zo(Ji,1&Ji.current|2),r.child}e=e.sibling}null!==o.tail&&Xr()>Md&&(r.flags|=128,n=!0,Ws(o,!1),r.lanes=4194304)}else{if(!n)if(null!==(e=Zi(i))){if(r.flags|=128,n=!0,null!==(t=e.updateQueue)&&(r.updateQueue=t,r.flags|=4),Ws(o,!0),null===o.tail&&"hidden"===o.tailMode&&!i.alternate&&!ni)return Us(r),null}else 2*Xr()-o.renderingStartTime>Md&&1073741824!==t&&(r.flags|=128,n=!0,Ws(o,!1),r.lanes=4194304);o.isBackwards?(i.sibling=r.child,r.child=i):(null!==(t=o.last)?t.sibling=i:r.child=i,o.last=i)}return null!==o.tail?(r=o.tail,o.rendering=r,o.tail=r.sibling,o.renderingStartTime=Xr(),r.sibling=null,t=Ji.current,zo(Ji,n?1&t|2:1&t),r):(Us(r),null);case 22:case 23:return dc(),n=null!==r.memoizedState,null!==e&&null!==e.memoizedState!==n&&(r.flags|=8192),n&&1&r.mode?!!(1073741824&Dd)&&(Us(r),6&r.subtreeFlags&&(r.flags|=8192)):Us(r),null;case 24:case 25:return null}throw Error(ne(156,r.tag))}function qs(e,r){switch(ei(r),r.tag){case 1:return To(r.type)&&No(),65536&(e=r.flags)?(r.flags=-65537&e|128,r):null;case 3:return Xi(),So(Eo),So(Co),rl(),65536&(e=r.flags)&&!(128&e)?(r.flags=-65537&e|128,r):null;case 5:return Ki(r),null;case 13:if(So(Ji),null!==(e=r.memoizedState)&&null!==e.dehydrated){if(null===r.alternate)throw Error(ne(340));ui()}return 65536&(e=r.flags)?(r.flags=-65537&e|128,r):null;case 19:return So(Ji),null;case 4:return Xi(),null;case 10:return $i(r.type._context),null;case 22:case 23:return dc(),null;default:return null}}_s=function(e,r){for(var t=r.child;null!==t;){if(5===t.tag||6===t.tag)e.appendChild(t.stateNode);else if(4!==t.tag&&null!==t.child){t.child.return=t,t=t.child;continue}if(t===r)break;for(;null===t.sibling;){if(null===t.return||t.return===r)return;t=t.return}t.sibling.return=t.return,t=t.sibling}},Ds=function(){},Ts=function(e,r,t,n){var a=e.memoizedProps;if(a!==n){e=r.stateNode,Vi(Ui.current);var o,i=null;switch(t){case"input":a=Ve(e,a),n=Ve(e,n),i=[];break;case"select":a=Ae({},a,{value:void 0}),n=Ae({},n,{value:void 0}),i=[];break;case"textarea":a=rr(e,a),n=rr(e,n),i=[];break;default:"function"!=typeof a.onClick&&"function"==typeof n.onClick&&(e.onclick=Ka)}for(d in mr(t,n),t=null,a)if(!n.hasOwnProperty(d)&&a.hasOwnProperty(d)&&null!=a[d])if("style"===d){var l=a[d];for(o in l)l.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else"dangerouslySetInnerHTML"!==d&&"children"!==d&&"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&"autoFocus"!==d&&(oe.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in n){var s=n[d];if(l=null!=a?a[d]:void 0,n.hasOwnProperty(d)&&s!==l&&(null!=s||null!=l))if("style"===d)if(l){for(o in l)!l.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in s)s.hasOwnProperty(o)&&l[o]!==s[o]&&(t||(t={}),t[o]=s[o])}else t||(i||(i=[]),i.push(d,t)),t=s;else"dangerouslySetInnerHTML"===d?(s=s?s.__html:void 0,l=l?l.__html:void 0,null!=s&&l!==s&&(i=i||[]).push(d,s)):"children"===d?"string"!=typeof s&&"number"!=typeof s||(i=i||[]).push(d,""+s):"suppressContentEditableWarning"!==d&&"suppressHydrationWarning"!==d&&(oe.hasOwnProperty(d)?(null!=s&&"onScroll"===d&&La("scroll",e),i||l===s||(i=[])):(i=i||[]).push(d,s))}t&&(i=i||[]).push("style",t);var d=i;(r.updateQueue=d)&&(r.flags|=4)}},Ns=function(e,r,t,n){t!==n&&(r.flags|=4)};var Vs=!1,Qs=!1,Xs="function"==typeof WeakSet?WeakSet:Set,Gs=null;function Ks(e,r){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(n){kc(e,r,n)}else t.current=null}function Js(e,r,t){try{t()}catch(n){kc(e,r,n)}}var Zs=!1;function ed(e,r,t){var n=r.updateQueue;if(null!==(n=null!==n?n.lastEffect:null)){var a=n=n.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,void 0!==o&&Js(r,t,o)}a=a.next}while(a!==n)}}function rd(e,r){if(null!==(r=null!==(r=r.updateQueue)?r.lastEffect:null)){var t=r=r.next;do{if((t.tag&e)===e){var n=t.create;t.destroy=n()}t=t.next}while(t!==r)}}function td(e){var r=e.ref;if(null!==r){var t=e.stateNode;e.tag,e=t,"function"==typeof r?r(e):r.current=e}}function nd(e){var r=e.alternate;null!==r&&(e.alternate=null,nd(r)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(r=e.stateNode)&&(delete r[po],delete r[uo],delete r[xo],delete r[ho],delete r[mo])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ad(e){return 5===e.tag||3===e.tag||4===e.tag}function od(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||ad(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function id(e,r,t){var n=e.tag;if(5===n||6===n)e=e.stateNode,r?8===t.nodeType?t.parentNode.insertBefore(e,r):t.insertBefore(e,r):(8===t.nodeType?(r=t.parentNode).insertBefore(e,t):(r=t).appendChild(e),null!=(t=t._reactRootContainer)||null!==r.onclick||(r.onclick=Ka));else if(4!==n&&null!==(e=e.child))for(id(e,r,t),e=e.sibling;null!==e;)id(e,r,t),e=e.sibling}function ld(e,r,t){var n=e.tag;if(5===n||6===n)e=e.stateNode,r?t.insertBefore(e,r):t.appendChild(e);else if(4!==n&&null!==(e=e.child))for(ld(e,r,t),e=e.sibling;null!==e;)ld(e,r,t),e=e.sibling}var sd=null,dd=!1;function cd(e,r,t){for(t=t.child;null!==t;)pd(e,r,t),t=t.sibling}function pd(e,r,t){if(nt&&"function"==typeof nt.onCommitFiberUnmount)try{nt.onCommitFiberUnmount(tt,t)}catch(l){}switch(t.tag){case 5:Qs||Ks(t,r);case 6:var n=sd,a=dd;sd=null,cd(e,r,t),dd=a,null!==(sd=n)&&(dd?(e=sd,t=t.stateNode,8===e.nodeType?e.parentNode.removeChild(t):e.removeChild(t)):sd.removeChild(t.stateNode));break;case 18:null!==sd&&(dd?(e=sd,t=t.stateNode,8===e.nodeType?io(e.parentNode,t):1===e.nodeType&&io(e,t),Mt(e)):io(sd,t.stateNode));break;case 4:n=sd,a=dd,sd=t.stateNode.containerInfo,dd=!0,cd(e,r,t),sd=n,dd=a;break;case 0:case 11:case 14:case 15:if(!Qs&&(null!==(n=t.updateQueue)&&null!==(n=n.lastEffect))){a=n=n.next;do{var o=a,i=o.destroy;o=o.tag,void 0!==i&&(2&o||4&o)&&Js(t,r,i),a=a.next}while(a!==n)}cd(e,r,t);break;case 1:if(!Qs&&(Ks(t,r),"function"==typeof(n=t.stateNode).componentWillUnmount))try{n.props=t.memoizedProps,n.state=t.memoizedState,n.componentWillUnmount()}catch(l){kc(t,r,l)}cd(e,r,t);break;case 21:cd(e,r,t);break;case 22:1&t.mode?(Qs=(n=Qs)||null!==t.memoizedState,cd(e,r,t),Qs=n):cd(e,r,t);break;default:cd(e,r,t)}}function ud(e){var r=e.updateQueue;if(null!==r){e.updateQueue=null;var t=e.stateNode;null===t&&(t=e.stateNode=new Xs),r.forEach(function(r){var n=$c.bind(null,e,r);t.has(r)||(t.add(r),r.then(n,n))})}}function fd(e,r){var t=r.deletions;if(null!==t)for(var n=0;n<t.length;n++){var a=t[n];try{var o=e,i=r,l=i;e:for(;null!==l;){switch(l.tag){case 5:sd=l.stateNode,dd=!1;break e;case 3:case 4:sd=l.stateNode.containerInfo,dd=!0;break e}l=l.return}if(null===sd)throw Error(ne(160));pd(o,i,a),sd=null,dd=!1;var s=a.alternate;null!==s&&(s.return=null),a.return=null}catch(d){kc(a,r,d)}}if(12854&r.subtreeFlags)for(r=r.child;null!==r;)xd(r,e),r=r.sibling}function xd(e,r){var t=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(fd(r,e),hd(e),4&n){try{ed(3,e,e.return),rd(3,e)}catch(h){kc(e,e.return,h)}try{ed(5,e,e.return)}catch(h){kc(e,e.return,h)}}break;case 1:fd(r,e),hd(e),512&n&&null!==t&&Ks(t,t.return);break;case 5:if(fd(r,e),hd(e),512&n&&null!==t&&Ks(t,t.return),32&e.flags){var a=e.stateNode;try{cr(a,"")}catch(h){kc(e,e.return,h)}}if(4&n&&null!=(a=e.stateNode)){var o=e.memoizedProps,i=null!==t?t.memoizedProps:o,l=e.type,s=e.updateQueue;if(e.updateQueue=null,null!==s)try{"input"===l&&"radio"===o.type&&null!=o.name&&Xe(a,o),gr(l,i);var d=gr(l,o);for(i=0;i<s.length;i+=2){var c=s[i],p=s[i+1];"style"===c?xr(a,p):"dangerouslySetInnerHTML"===c?dr(a,p):"children"===c?cr(a,p):ge(a,c,p,d)}switch(l){case"input":Ge(a,o);break;case"textarea":nr(a,o);break;case"select":var u=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var f=o.value;null!=f?er(a,!!o.multiple,f,!1):u!==!!o.multiple&&(null!=o.defaultValue?er(a,!!o.multiple,o.defaultValue,!0):er(a,!!o.multiple,o.multiple?[]:"",!1))}a[uo]=o}catch(h){kc(e,e.return,h)}}break;case 6:if(fd(r,e),hd(e),4&n){if(null===e.stateNode)throw Error(ne(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(h){kc(e,e.return,h)}}break;case 3:if(fd(r,e),hd(e),4&n&&null!==t&&t.memoizedState.isDehydrated)try{Mt(r.containerInfo)}catch(h){kc(e,e.return,h)}break;case 4:default:fd(r,e),hd(e);break;case 13:fd(r,e),hd(e),8192&(a=e.child).flags&&(o=null!==a.memoizedState,a.stateNode.isHidden=o,!o||null!==a.alternate&&null!==a.alternate.memoizedState||(Od=Xr())),4&n&&ud(e);break;case 22:if(c=null!==t&&null!==t.memoizedState,1&e.mode?(Qs=(d=Qs)||c,fd(r,e),Qs=d):fd(r,e),hd(e),8192&n){if(d=null!==e.memoizedState,(e.stateNode.isHidden=d)&&!c&&1&e.mode)for(Gs=e,c=e.child;null!==c;){for(p=Gs=c;null!==Gs;){switch(f=(u=Gs).child,u.tag){case 0:case 11:case 14:case 15:ed(4,u,u.return);break;case 1:Ks(u,u.return);var x=u.stateNode;if("function"==typeof x.componentWillUnmount){n=u,t=u.return;try{r=n,x.props=r.memoizedProps,x.state=r.memoizedState,x.componentWillUnmount()}catch(h){kc(n,t,h)}}break;case 5:Ks(u,u.return);break;case 22:if(null!==u.memoizedState){vd(p);continue}}null!==f?(f.return=u,Gs=f):vd(p)}c=c.sibling}e:for(c=null,p=e;;){if(5===p.tag){if(null===c){c=p;try{a=p.stateNode,d?"function"==typeof(o=a.style).setProperty?o.setProperty("display","none","important"):o.display="none":(l=p.stateNode,i=null!=(s=p.memoizedProps.style)&&s.hasOwnProperty("display")?s.display:null,l.style.display=fr("display",i))}catch(h){kc(e,e.return,h)}}}else if(6===p.tag){if(null===c)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(h){kc(e,e.return,h)}}else if((22!==p.tag&&23!==p.tag||null===p.memoizedState||p===e)&&null!==p.child){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;null===p.sibling;){if(null===p.return||p.return===e)break e;c===p&&(c=null),p=p.return}c===p&&(c=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:fd(r,e),hd(e),4&n&&ud(e);case 21:}}function hd(e){var r=e.flags;if(2&r){try{e:{for(var t=e.return;null!==t;){if(ad(t)){var n=t;break e}t=t.return}throw Error(ne(160))}switch(n.tag){case 5:var a=n.stateNode;32&n.flags&&(cr(a,""),n.flags&=-33),ld(e,od(e),a);break;case 3:case 4:var o=n.stateNode.containerInfo;id(e,od(e),o);break;default:throw Error(ne(161))}}catch(i){kc(e,e.return,i)}e.flags&=-3}4096&r&&(e.flags&=-4097)}function md(e,r,t){Gs=e,gd(e)}function gd(e,r,t){for(var n=!!(1&e.mode);null!==Gs;){var a=Gs,o=a.child;if(22===a.tag&&n){var i=null!==a.memoizedState||Vs;if(!i){var l=a.alternate,s=null!==l&&null!==l.memoizedState||Qs;l=Vs;var d=Qs;if(Vs=i,(Qs=s)&&!d)for(Gs=a;null!==Gs;)s=(i=Gs).child,22===i.tag&&null!==i.memoizedState?yd(a):null!==s?(s.return=i,Gs=s):yd(a);for(;null!==o;)Gs=o,gd(o),o=o.sibling;Gs=a,Vs=l,Qs=d}bd(e)}else 8772&a.subtreeFlags&&null!==o?(o.return=a,Gs=o):bd(e)}}function bd(e){for(;null!==Gs;){var r=Gs;if(8772&r.flags){var t=r.alternate;try{if(8772&r.flags)switch(r.tag){case 0:case 11:case 15:Qs||rd(5,r);break;case 1:var n=r.stateNode;if(4&r.flags&&!Qs)if(null===t)n.componentDidMount();else{var a=r.elementType===r.type?t.memoizedProps:es(r.type,t.memoizedProps);n.componentDidUpdate(a,t.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var o=r.updateQueue;null!==o&&Bi(r,o,n);break;case 3:var i=r.updateQueue;if(null!==i){if(t=null,null!==r.child)switch(r.child.tag){case 5:case 1:t=r.child.stateNode}Bi(r,i,t)}break;case 5:var l=r.stateNode;if(null===t&&4&r.flags){t=l;var s=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&t.focus();break;case"img":s.src&&(t.src=s.src)}}break;case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break;case 13:if(null===r.memoizedState){var d=r.alternate;if(null!==d){var c=d.memoizedState;if(null!==c){var p=c.dehydrated;null!==p&&Mt(p)}}}break;default:throw Error(ne(163))}Qs||512&r.flags&&td(r)}catch(u){kc(r,r.return,u)}}if(r===e){Gs=null;break}if(null!==(t=r.sibling)){t.return=r.return,Gs=t;break}Gs=r.return}}function vd(e){for(;null!==Gs;){var r=Gs;if(r===e){Gs=null;break}var t=r.sibling;if(null!==t){t.return=r.return,Gs=t;break}Gs=r.return}}function yd(e){for(;null!==Gs;){var r=Gs;try{switch(r.tag){case 0:case 11:case 15:var t=r.return;try{rd(4,r)}catch(s){kc(r,t,s)}break;case 1:var n=r.stateNode;if("function"==typeof n.componentDidMount){var a=r.return;try{n.componentDidMount()}catch(s){kc(r,a,s)}}var o=r.return;try{td(r)}catch(s){kc(r,o,s)}break;case 5:var i=r.return;try{td(r)}catch(s){kc(r,i,s)}}}catch(s){kc(r,r.return,s)}if(r===e){Gs=null;break}var l=r.sibling;if(null!==l){l.return=r.return,Gs=l;break}Gs=r.return}}var wd,kd=Math.ceil,jd=be.ReactCurrentDispatcher,Sd=be.ReactCurrentOwner,zd=be.ReactCurrentBatchConfig,$d=0,Cd=null,Ed=null,_d=0,Dd=0,Td=jo(0),Nd=0,Pd=null,Id=0,Ad=0,Fd=0,Ld=null,Rd=null,Od=0,Md=1/0,Yd=null,Bd=!1,Wd=null,Ud=null,Hd=!1,qd=null,Vd=0,Qd=0,Xd=null,Gd=-1,Kd=0;function Jd(){return 6&$d?Xr():-1!==Gd?Gd:Gd=Xr()}function Zd(e){return 1&e.mode?2&$d&&0!==_d?_d&-_d:null!==xi.transition?(0===Kd&&(Kd=ft()),Kd):0!==(e=gt)?e:e=void 0===(e=window.event)?16:Qt(e.type):1}function ec(e,r,t,n){if(50<Qd)throw Qd=0,Xd=null,Error(ne(185));ht(e,t,n),2&$d&&e===Cd||(e===Cd&&(!(2&$d)&&(Ad|=t),4===Nd&&oc(e,_d)),rc(e,n),1===t&&0===$d&&!(1&r.mode)&&(Md=Xr()+500,Ro&&Yo()))}function rc(e,r){var t=e.callbackNode;!function(e,r){for(var t=e.suspendedLanes,n=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-at(o),l=1<<i,s=a[i];-1===s?0!==(l&t)&&0===(l&n)||(a[i]=pt(l,r)):s<=r&&(e.expiredLanes|=l),o&=~l}}(e,r);var n=ct(e,e===Cd?_d:0);if(0===n)null!==t&&qr(t),e.callbackNode=null,e.callbackPriority=0;else if(r=n&-n,e.callbackPriority!==r){if(null!=t&&qr(t),1===r)0===e.tag?function(e){Ro=!0,Mo(e)}(ic.bind(null,e)):Mo(ic.bind(null,e)),ao(function(){!(6&$d)&&Yo()}),t=null;else{switch(bt(n)){case 1:t=Kr;break;case 4:t=Jr;break;case 16:default:t=Zr;break;case 536870912:t=rt}t=Cc(t,tc.bind(null,e))}e.callbackPriority=r,e.callbackNode=t}}function tc(e,r){if(Gd=-1,Kd=0,6&$d)throw Error(ne(327));var t=e.callbackNode;if(yc()&&e.callbackNode!==t)return null;var n=ct(e,e===Cd?_d:0);if(0===n)return null;if(30&n||0!==(n&e.expiredLanes)||r)r=xc(e,n);else{r=n;var a=$d;$d|=2;var o=uc();for(Cd===e&&_d===r||(Yd=null,Md=Xr()+500,cc(e,r));;)try{mc();break}catch(l){pc(e,l)}zi(),jd.current=o,$d=a,null!==Ed?r=0:(Cd=null,_d=0,r=Nd)}if(0!==r){if(2===r&&(0!==(a=ut(e))&&(n=a,r=nc(e,a))),1===r)throw t=Pd,cc(e,0),oc(e,n),rc(e,Xr()),t;if(6===r)oc(e,n);else{if(a=e.current.alternate,!(30&n||function(e){for(var r=e;;){if(16384&r.flags){var t=r.updateQueue;if(null!==t&&null!==(t=t.stores))for(var n=0;n<t.length;n++){var a=t[n],o=a.getSnapshot;a=a.value;try{if(!oa(o(),a))return!1}catch(i){return!1}}}if(t=r.child,16384&r.subtreeFlags&&null!==t)t.return=r,r=t;else{if(r===e)break;for(;null===r.sibling;){if(null===r.return||r.return===e)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}(a)||(r=xc(e,n),2===r&&(o=ut(e),0!==o&&(n=o,r=nc(e,o))),1!==r)))throw t=Pd,cc(e,0),oc(e,n),rc(e,Xr()),t;switch(e.finishedWork=a,e.finishedLanes=n,r){case 0:case 1:throw Error(ne(345));case 2:case 5:vc(e,Rd,Yd);break;case 3:if(oc(e,n),(130023424&n)===n&&10<(r=Od+500-Xr())){if(0!==ct(e,0))break;if(((a=e.suspendedLanes)&n)!==n){Jd(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=ro(vc.bind(null,e,Rd,Yd),r);break}vc(e,Rd,Yd);break;case 4:if(oc(e,n),(4194240&n)===n)break;for(r=e.eventTimes,a=-1;0<n;){var i=31-at(n);o=1<<i,(i=r[i])>a&&(a=i),n&=~o}if(n=a,10<(n=(120>(n=Xr()-n)?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*kd(n/1960))-n)){e.timeoutHandle=ro(vc.bind(null,e,Rd,Yd),n);break}vc(e,Rd,Yd);break;default:throw Error(ne(329))}}}return rc(e,Xr()),e.callbackNode===t?tc.bind(null,e):null}function nc(e,r){var t=Ld;return e.current.memoizedState.isDehydrated&&(cc(e,r).flags|=256),2!==(e=xc(e,r))&&(r=Rd,Rd=t,null!==r&&ac(r)),e}function ac(e){null===Rd?Rd=e:Rd.push.apply(Rd,e)}function oc(e,r){for(r&=~Fd,r&=~Ad,e.suspendedLanes|=r,e.pingedLanes&=~r,e=e.expirationTimes;0<r;){var t=31-at(r),n=1<<t;e[t]=-1,r&=~n}}function ic(e){if(6&$d)throw Error(ne(327));yc();var r=ct(e,0);if(!(1&r))return rc(e,Xr()),null;var t=xc(e,r);if(0!==e.tag&&2===t){var n=ut(e);0!==n&&(r=n,t=nc(e,n))}if(1===t)throw t=Pd,cc(e,0),oc(e,r),rc(e,Xr()),t;if(6===t)throw Error(ne(345));return e.finishedWork=e.current.alternate,e.finishedLanes=r,vc(e,Rd,Yd),rc(e,Xr()),null}function lc(e,r){var t=$d;$d|=1;try{return e(r)}finally{0===($d=t)&&(Md=Xr()+500,Ro&&Yo())}}function sc(e){null!==qd&&0===qd.tag&&!(6&$d)&&yc();var r=$d;$d|=1;var t=zd.transition,n=gt;try{if(zd.transition=null,gt=1,e)return e()}finally{gt=n,zd.transition=t,!(6&($d=r))&&Yo()}}function dc(){Dd=Td.current,So(Td)}function cc(e,r){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(-1!==t&&(e.timeoutHandle=-1,to(t)),null!==Ed)for(t=Ed.return;null!==t;){var n=t;switch(ei(n),n.tag){case 1:null!=(n=n.type.childContextTypes)&&No();break;case 3:Xi(),So(Eo),So(Co),rl();break;case 5:Ki(n);break;case 4:Xi();break;case 13:case 19:So(Ji);break;case 10:$i(n.type._context);break;case 22:case 23:dc()}t=t.return}if(Cd=e,Ed=e=Tc(e.current,null),_d=Dd=r,Nd=0,Pd=null,Fd=Ad=Id=0,Rd=Ld=null,null!==Di){for(r=0;r<Di.length;r++)if(null!==(n=(t=Di[r]).interleaved)){t.interleaved=null;var a=n.next,o=t.pending;if(null!==o){var i=o.next;o.next=a,n.next=i}t.pending=n}Di=null}return e}function pc(e,r){for(;;){var t=Ed;try{if(zi(),tl.current=Gl,sl){for(var n=ol.memoizedState;null!==n;){var a=n.queue;null!==a&&(a.pending=null),n=n.next}sl=!1}if(al=0,ll=il=ol=null,dl=!1,cl=0,Sd.current=null,null===t||null===t.return){Nd=1,Pd=r,Ed=null;break}e:{var o=e,i=t.return,l=t,s=r;if(r=_d,l.flags|=32768,null!==s&&"object"==typeof s&&"function"==typeof s.then){var d=s,c=l,p=c.tag;if(!(1&c.mode||0!==p&&11!==p&&15!==p)){var u=c.alternate;u?(c.updateQueue=u.updateQueue,c.memoizedState=u.memoizedState,c.lanes=u.lanes):(c.updateQueue=null,c.memoizedState=null)}var f=xs(i);if(null!==f){f.flags&=-257,hs(f,i,l,0,r),1&f.mode&&fs(o,d,r),s=d;var x=(r=f).updateQueue;if(null===x){var h=new Set;h.add(s),r.updateQueue=h}else x.add(s);break e}if(!(1&r)){fs(o,d,r),fc();break e}s=Error(ne(426))}else if(ni&&1&l.mode){var m=xs(i);if(null!==m){!(65536&m.flags)&&(m.flags|=256),hs(m,i,l,0,r),fi(ls(s,l));break e}}o=s=ls(s,l),4!==Nd&&(Nd=2),null===Ld?Ld=[o]:Ld.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,r&=-r,o.lanes|=r,Mi(o,ps(0,s,r));break e;case 1:l=s;var g=o.type,b=o.stateNode;if(!(128&o.flags||"function"!=typeof g.getDerivedStateFromError&&(null===b||"function"!=typeof b.componentDidCatch||null!==Ud&&Ud.has(b)))){o.flags|=65536,r&=-r,o.lanes|=r,Mi(o,us(o,l,r));break e}}o=o.return}while(null!==o)}bc(t)}catch(v){r=v,Ed===t&&null!==t&&(Ed=t=t.return);continue}break}}function uc(){var e=jd.current;return jd.current=Gl,null===e?Gl:e}function fc(){0!==Nd&&3!==Nd&&2!==Nd||(Nd=4),null===Cd||!(268435455&Id)&&!(268435455&Ad)||oc(Cd,_d)}function xc(e,r){var t=$d;$d|=2;var n=uc();for(Cd===e&&_d===r||(Yd=null,cc(e,r));;)try{hc();break}catch(a){pc(e,a)}if(zi(),$d=t,jd.current=n,null!==Ed)throw Error(ne(261));return Cd=null,_d=0,Nd}function hc(){for(;null!==Ed;)gc(Ed)}function mc(){for(;null!==Ed&&!Vr();)gc(Ed)}function gc(e){var r=wd(e.alternate,e,Dd);e.memoizedProps=e.pendingProps,null===r?bc(e):Ed=r,Sd.current=null}function bc(e){var r=e;do{var t=r.alternate;if(e=r.return,32768&r.flags){if(null!==(t=qs(t,r)))return t.flags&=32767,void(Ed=t);if(null===e)return Nd=6,void(Ed=null);e.flags|=32768,e.subtreeFlags=0,e.deletions=null}else if(null!==(t=Hs(t,r,Dd)))return void(Ed=t);if(null!==(r=r.sibling))return void(Ed=r);Ed=r=e}while(null!==r);0===Nd&&(Nd=5)}function vc(e,r,t){var n=gt,a=zd.transition;try{zd.transition=null,gt=1,function(e,r,t,n){do{yc()}while(null!==qd);if(6&$d)throw Error(ne(327));t=e.finishedWork;var a=e.finishedLanes;if(null===t)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(ne(177));e.callbackNode=null,e.callbackPriority=0;var o=t.lanes|t.childLanes;if(function(e,r){var t=e.pendingLanes&~r;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=r,e.mutableReadLanes&=r,e.entangledLanes&=r,r=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<t;){var a=31-at(t),o=1<<a;r[a]=0,n[a]=-1,e[a]=-1,t&=~o}}(e,o),e===Cd&&(Ed=Cd=null,_d=0),!(2064&t.subtreeFlags)&&!(2064&t.flags)||Hd||(Hd=!0,Cc(Zr,function(){return yc(),null})),o=!!(15990&t.flags),!!(15990&t.subtreeFlags)||o){o=zd.transition,zd.transition=null;var i=gt;gt=1;var l=$d;$d|=4,Sd.current=null,function(e,r){if(Ja=Bt,pa(e=ca())){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{var n=(t=(t=e.ownerDocument)&&t.defaultView||window).getSelection&&t.getSelection();if(n&&0!==n.rangeCount){t=n.anchorNode;var a=n.anchorOffset,o=n.focusNode;n=n.focusOffset;try{t.nodeType,o.nodeType}catch(y){t=null;break e}var i=0,l=-1,s=-1,d=0,c=0,p=e,u=null;r:for(;;){for(var f;p!==t||0!==a&&3!==p.nodeType||(l=i+a),p!==o||0!==n&&3!==p.nodeType||(s=i+n),3===p.nodeType&&(i+=p.nodeValue.length),null!==(f=p.firstChild);)u=p,p=f;for(;;){if(p===e)break r;if(u===t&&++d===a&&(l=i),u===o&&++c===n&&(s=i),null!==(f=p.nextSibling))break;u=(p=u).parentNode}p=f}t=-1===l||-1===s?null:{start:l,end:s}}else t=null}t=t||{start:0,end:0}}else t=null;for(Za={focusedElem:e,selectionRange:t},Bt=!1,Gs=r;null!==Gs;)if(e=(r=Gs).child,1028&r.subtreeFlags&&null!==e)e.return=r,Gs=e;else for(;null!==Gs;){r=Gs;try{var x=r.alternate;if(1024&r.flags)switch(r.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==x){var h=x.memoizedProps,m=x.memoizedState,g=r.stateNode,b=g.getSnapshotBeforeUpdate(r.elementType===r.type?h:es(r.type,h),m);g.__reactInternalSnapshotBeforeUpdate=b}break;case 3:var v=r.stateNode.containerInfo;1===v.nodeType?v.textContent="":9===v.nodeType&&v.documentElement&&v.removeChild(v.documentElement);break;default:throw Error(ne(163))}}catch(y){kc(r,r.return,y)}if(null!==(e=r.sibling)){e.return=r.return,Gs=e;break}Gs=r.return}x=Zs,Zs=!1}(e,t),xd(t,e),ua(Za),Bt=!!Ja,Za=Ja=null,e.current=t,md(t),Qr(),$d=l,gt=i,zd.transition=o}else e.current=t;if(Hd&&(Hd=!1,qd=e,Vd=a),o=e.pendingLanes,0===o&&(Ud=null),function(e){if(nt&&"function"==typeof nt.onCommitFiberRoot)try{nt.onCommitFiberRoot(tt,e,void 0,!(128&~e.current.flags))}catch(r){}}(t.stateNode),rc(e,Xr()),null!==r)for(n=e.onRecoverableError,t=0;t<r.length;t++)a=r[t],n(a.value,{componentStack:a.stack,digest:a.digest});if(Bd)throw Bd=!1,e=Wd,Wd=null,e;!!(1&Vd)&&0!==e.tag&&yc(),o=e.pendingLanes,1&o?e===Xd?Qd++:(Qd=0,Xd=e):Qd=0,Yo()}(e,r,t,n)}finally{zd.transition=a,gt=n}return null}function yc(){if(null!==qd){var e=bt(Vd),r=zd.transition,t=gt;try{if(zd.transition=null,gt=16>e?16:e,null===qd)var n=!1;else{if(e=qd,qd=null,Vd=0,6&$d)throw Error(ne(331));var a=$d;for($d|=4,Gs=e.current;null!==Gs;){var o=Gs,i=o.child;if(16&Gs.flags){var l=o.deletions;if(null!==l){for(var s=0;s<l.length;s++){var d=l[s];for(Gs=d;null!==Gs;){var c=Gs;switch(c.tag){case 0:case 11:case 15:ed(8,c,o)}var p=c.child;if(null!==p)p.return=c,Gs=p;else for(;null!==Gs;){var u=(c=Gs).sibling,f=c.return;if(nd(c),c===d){Gs=null;break}if(null!==u){u.return=f,Gs=u;break}Gs=f}}}var x=o.alternate;if(null!==x){var h=x.child;if(null!==h){x.child=null;do{var m=h.sibling;h.sibling=null,h=m}while(null!==h)}}Gs=o}}if(2064&o.subtreeFlags&&null!==i)i.return=o,Gs=i;else e:for(;null!==Gs;){if(2048&(o=Gs).flags)switch(o.tag){case 0:case 11:case 15:ed(9,o,o.return)}var g=o.sibling;if(null!==g){g.return=o.return,Gs=g;break e}Gs=o.return}}var b=e.current;for(Gs=b;null!==Gs;){var v=(i=Gs).child;if(2064&i.subtreeFlags&&null!==v)v.return=i,Gs=v;else e:for(i=b;null!==Gs;){if(2048&(l=Gs).flags)try{switch(l.tag){case 0:case 11:case 15:rd(9,l)}}catch(w){kc(l,l.return,w)}if(l===i){Gs=null;break e}var y=l.sibling;if(null!==y){y.return=l.return,Gs=y;break e}Gs=l.return}}if($d=a,Yo(),nt&&"function"==typeof nt.onPostCommitFiberRoot)try{nt.onPostCommitFiberRoot(tt,e)}catch(w){}n=!0}return n}finally{gt=t,zd.transition=r}}return!1}function wc(e,r,t){e=Ri(e,r=ps(0,r=ls(t,r),1),1),r=Jd(),null!==e&&(ht(e,1,r),rc(e,r))}function kc(e,r,t){if(3===e.tag)wc(e,e,t);else for(;null!==r;){if(3===r.tag){wc(r,e,t);break}if(1===r.tag){var n=r.stateNode;if("function"==typeof r.type.getDerivedStateFromError||"function"==typeof n.componentDidCatch&&(null===Ud||!Ud.has(n))){r=Ri(r,e=us(r,e=ls(t,e),1),1),e=Jd(),null!==r&&(ht(r,1,e),rc(r,e));break}}r=r.return}}function jc(e,r,t){var n=e.pingCache;null!==n&&n.delete(r),r=Jd(),e.pingedLanes|=e.suspendedLanes&t,Cd===e&&(_d&t)===t&&(4===Nd||3===Nd&&(130023424&_d)===_d&&500>Xr()-Od?cc(e,0):Fd|=t),rc(e,r)}function Sc(e,r){0===r&&(1&e.mode?(r=st,!(130023424&(st<<=1))&&(st=4194304)):r=1);var t=Jd();null!==(e=Pi(e,r))&&(ht(e,r,t),rc(e,t))}function zc(e){var r=e.memoizedState,t=0;null!==r&&(t=r.retryLane),Sc(e,t)}function $c(e,r){var t=0;switch(e.tag){case 13:var n=e.stateNode,a=e.memoizedState;null!==a&&(t=a.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(ne(314))}null!==n&&n.delete(r),Sc(e,t)}function Cc(e,r){return Hr(e,r)}function Ec(e,r,t,n){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function _c(e,r,t,n){return new Ec(e,r,t,n)}function Dc(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Tc(e,r){var t=e.alternate;return null===t?((t=_c(e.tag,r,e.key,e.mode)).elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=r,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=14680064&e.flags,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,r=e.dependencies,t.dependencies=null===r?null:{lanes:r.lanes,firstContext:r.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Nc(e,r,t,n,a,o){var i=2;if(n=e,"function"==typeof e)Dc(e)&&(i=1);else if("string"==typeof e)i=5;else e:switch(e){case we:return Pc(t.children,a,o,r);case ke:i=8,a|=8;break;case je:return(e=_c(12,t,r,2|a)).elementType=je,e.lanes=o,e;case Ce:return(e=_c(13,t,r,a)).elementType=Ce,e.lanes=o,e;case Ee:return(e=_c(19,t,r,a)).elementType=Ee,e.lanes=o,e;case Te:return Ic(t,a,o,r);default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case Se:i=10;break e;case ze:i=9;break e;case $e:i=11;break e;case _e:i=14;break e;case De:i=16,n=null;break e}throw Error(ne(130,null==e?e:typeof e,""))}return(r=_c(i,t,r,a)).elementType=e,r.type=n,r.lanes=o,r}function Pc(e,r,t,n){return(e=_c(7,e,n,r)).lanes=t,e}function Ic(e,r,t,n){return(e=_c(22,e,n,r)).elementType=Te,e.lanes=t,e.stateNode={isHidden:!1},e}function Ac(e,r,t){return(e=_c(6,e,null,r)).lanes=t,e}function Fc(e,r,t){return(r=_c(4,null!==e.children?e.children:[],e.key,r)).lanes=t,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},r}function Lc(e,r,t,n,a){this.tag=r,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=xt(0),this.expirationTimes=xt(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xt(0),this.identifierPrefix=n,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Rc(e,r,t,n,a,o,i,l,s){return e=new Lc(e,r,t,l,s),1===r?(r=1,!0===o&&(r|=8)):r=0,o=_c(3,null,null,r),e.current=o,o.stateNode=e,o.memoizedState={element:n,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ai(o),e}function Oc(e){if(!e)return $o;e:{if(Mr(e=e._reactInternals)!==e||1!==e.tag)throw Error(ne(170));var r=e;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(To(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(null!==r);throw Error(ne(171))}if(1===e.tag){var t=e.type;if(To(t))return Io(e,t,r)}return r}function Mc(e,r,t,n,a,o,i,l,s){return(e=Rc(t,n,!0,e,0,o,0,l,s)).context=Oc(null),t=e.current,(o=Li(n=Jd(),a=Zd(t))).callback=null!=r?r:null,Ri(t,o,a),e.current.lanes=a,ht(e,a,n),rc(e,n),e}function Yc(e,r,t,n){var a=r.current,o=Jd(),i=Zd(a);return t=Oc(t),null===r.context?r.context=t:r.pendingContext=t,(r=Li(o,i)).payload={element:e},null!==(n=void 0===n?null:n)&&(r.callback=n),null!==(e=Ri(a,r,i))&&(ec(e,a,i,o),Oi(e,a,i)),i}function Bc(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function Wc(e,r){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var t=e.retryLane;e.retryLane=0!==t&&t<r?t:r}}function Uc(e,r){Wc(e,r),(e=e.alternate)&&Wc(e,r)}wd=function(e,r,t){if(null!==e)if(e.memoizedProps!==r.pendingProps||Eo.current)gs=!0;else{if(0===(e.lanes&t)&&!(128&r.flags))return gs=!1,function(e,r,t){switch(r.tag){case 3:Cs(r),ui();break;case 5:Gi(r);break;case 1:To(r.type)&&Ao(r);break;case 4:Qi(r,r.stateNode.containerInfo);break;case 10:var n=r.type._context,a=r.memoizedProps.value;zo(wi,n._currentValue),n._currentValue=a;break;case 13:if(null!==(n=r.memoizedState))return null!==n.dehydrated?(zo(Ji,1&Ji.current),r.flags|=128,null):0!==(t&r.child.childLanes)?As(e,r,t):(zo(Ji,1&Ji.current),null!==(e=Bs(e,r,t))?e.sibling:null);zo(Ji,1&Ji.current);break;case 19:if(n=0!==(t&r.childLanes),128&e.flags){if(n)return Ms(e,r,t);r.flags|=128}if(null!==(a=r.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),zo(Ji,Ji.current),n)break;return null;case 22:case 23:return r.lanes=0,ks(e,r,t)}return Bs(e,r,t)}(e,r,t);gs=!!(131072&e.flags)}else gs=!1,ni&&1048576&r.flags&&Jo(r,Ho,r.index);switch(r.lanes=0,r.tag){case 2:var n=r.type;Ys(e,r),e=r.pendingProps;var a=Do(r,Co.current);Ei(r,t),a=xl(null,r,n,e,a,t);var o=hl();return r.flags|=1,"object"==typeof a&&null!==a&&"function"==typeof a.render&&void 0===a.$$typeof?(r.tag=1,r.memoizedState=null,r.updateQueue=null,To(n)?(o=!0,Ao(r)):o=!1,r.memoizedState=null!==a.state&&void 0!==a.state?a.state:null,Ai(r),a.updater=ts,r.stateNode=a,a._reactInternals=r,is(r,n,e,t),r=$s(null,r,n,!0,o,t)):(r.tag=0,ni&&o&&Zo(r),bs(null,r,a,t),r=r.child),r;case 16:n=r.elementType;e:{switch(Ys(e,r),e=r.pendingProps,n=(a=n._init)(n._payload),r.type=n,a=r.tag=function(e){if("function"==typeof e)return Dc(e)?1:0;if(null!=e){if((e=e.$$typeof)===$e)return 11;if(e===_e)return 14}return 2}(n),e=es(n,e),a){case 0:r=Ss(null,r,n,e,t);break e;case 1:r=zs(null,r,n,e,t);break e;case 11:r=vs(null,r,n,e,t);break e;case 14:r=ys(null,r,n,es(n.type,e),t);break e}throw Error(ne(306,n,""))}return r;case 0:return n=r.type,a=r.pendingProps,Ss(e,r,n,a=r.elementType===n?a:es(n,a),t);case 1:return n=r.type,a=r.pendingProps,zs(e,r,n,a=r.elementType===n?a:es(n,a),t);case 3:e:{if(Cs(r),null===e)throw Error(ne(387));n=r.pendingProps,a=(o=r.memoizedState).element,Fi(e,r),Yi(r,n,null,t);var i=r.memoizedState;if(n=i.element,o.isDehydrated){if(o={element:n,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},r.updateQueue.baseState=o,r.memoizedState=o,256&r.flags){r=Es(e,r,n,t,a=ls(Error(ne(423)),r));break e}if(n!==a){r=Es(e,r,n,t,a=ls(Error(ne(424)),r));break e}for(ti=lo(r.stateNode.containerInfo.firstChild),ri=r,ni=!0,ai=null,t=yi(r,null,n,t),r.child=t;t;)t.flags=-3&t.flags|4096,t=t.sibling}else{if(ui(),n===a){r=Bs(e,r,t);break e}bs(e,r,n,t)}r=r.child}return r;case 5:return Gi(r),null===e&&si(r),n=r.type,a=r.pendingProps,o=null!==e?e.memoizedProps:null,i=a.children,eo(n,a)?i=null:null!==o&&eo(n,o)&&(r.flags|=32),js(e,r),bs(e,r,i,t),r.child;case 6:return null===e&&si(r),null;case 13:return As(e,r,t);case 4:return Qi(r,r.stateNode.containerInfo),n=r.pendingProps,null===e?r.child=vi(r,null,n,t):bs(e,r,n,t),r.child;case 11:return n=r.type,a=r.pendingProps,vs(e,r,n,a=r.elementType===n?a:es(n,a),t);case 7:return bs(e,r,r.pendingProps,t),r.child;case 8:case 12:return bs(e,r,r.pendingProps.children,t),r.child;case 10:e:{if(n=r.type._context,a=r.pendingProps,o=r.memoizedProps,i=a.value,zo(wi,n._currentValue),n._currentValue=i,null!==o)if(oa(o.value,i)){if(o.children===a.children&&!Eo.current){r=Bs(e,r,t);break e}}else for(null!==(o=r.child)&&(o.return=r);null!==o;){var l=o.dependencies;if(null!==l){i=o.child;for(var s=l.firstContext;null!==s;){if(s.context===n){if(1===o.tag){(s=Li(-1,t&-t)).tag=2;var d=o.updateQueue;if(null!==d){var c=(d=d.shared).pending;null===c?s.next=s:(s.next=c.next,c.next=s),d.pending=s}}o.lanes|=t,null!==(s=o.alternate)&&(s.lanes|=t),Ci(o.return,t,r),l.lanes|=t;break}s=s.next}}else if(10===o.tag)i=o.type===r.type?null:o.child;else if(18===o.tag){if(null===(i=o.return))throw Error(ne(341));i.lanes|=t,null!==(l=i.alternate)&&(l.lanes|=t),Ci(i,t,r),i=o.sibling}else i=o.child;if(null!==i)i.return=o;else for(i=o;null!==i;){if(i===r){i=null;break}if(null!==(o=i.sibling)){o.return=i.return,i=o;break}i=i.return}o=i}bs(e,r,a.children,t),r=r.child}return r;case 9:return a=r.type,n=r.pendingProps.children,Ei(r,t),n=n(a=_i(a)),r.flags|=1,bs(e,r,n,t),r.child;case 14:return a=es(n=r.type,r.pendingProps),ys(e,r,n,a=es(n.type,a),t);case 15:return ws(e,r,r.type,r.pendingProps,t);case 17:return n=r.type,a=r.pendingProps,a=r.elementType===n?a:es(n,a),Ys(e,r),r.tag=1,To(n)?(e=!0,Ao(r)):e=!1,Ei(r,t),as(r,n,a),is(r,n,a,t),$s(null,r,n,!0,e,t);case 19:return Ms(e,r,t);case 22:return ks(e,r,t)}throw Error(ne(156,r.tag))};var Hc="function"==typeof reportError?reportError:function(e){console.error(e)};function qc(e){this._internalRoot=e}function Vc(e){this._internalRoot=e}function Qc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function Xc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function Gc(){}function Kc(e,r,t,n,a){var o=t._reactRootContainer;if(o){var i=o;if("function"==typeof a){var l=a;a=function(){var e=Bc(i);l.call(e)}}Yc(r,i,e,a)}else i=function(e,r,t,n,a){if(a){if("function"==typeof n){var o=n;n=function(){var e=Bc(i);o.call(e)}}var i=Mc(r,n,e,0,null,!1,0,"",Gc);return e._reactRootContainer=i,e[fo]=i.current,Ma(8===e.nodeType?e.parentNode:e),sc(),i}for(;a=e.lastChild;)e.removeChild(a);if("function"==typeof n){var l=n;n=function(){var e=Bc(s);l.call(e)}}var s=Rc(e,0,!1,null,0,!1,0,"",Gc);return e._reactRootContainer=s,e[fo]=s.current,Ma(8===e.nodeType?e.parentNode:e),sc(function(){Yc(r,s,t,n)}),s}(t,r,e,a,n);return Bc(i)}Vc.prototype.render=qc.prototype.render=function(e){var r=this._internalRoot;if(null===r)throw Error(ne(409));Yc(e,r,null,null)},Vc.prototype.unmount=qc.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var r=e.containerInfo;sc(function(){Yc(null,e,null,null)}),r[fo]=null}},Vc.prototype.unstable_scheduleHydration=function(e){if(e){var r=kt();e={blockedOn:null,target:e,priority:r};for(var t=0;t<Tt.length&&0!==r&&r<Tt[t].priority;t++);Tt.splice(t,0,e),0===t&&At(e)}},vt=function(e){switch(e.tag){case 3:var r=e.stateNode;if(r.current.memoizedState.isDehydrated){var t=dt(r.pendingLanes);0!==t&&(mt(r,1|t),rc(r,Xr()),!(6&$d)&&(Md=Xr()+500,Yo()))}break;case 13:sc(function(){var r=Pi(e,1);if(null!==r){var t=Jd();ec(r,e,1,t)}}),Uc(e,1)}},yt=function(e){if(13===e.tag){var r=Pi(e,134217728);if(null!==r)ec(r,e,134217728,Jd());Uc(e,134217728)}},wt=function(e){if(13===e.tag){var r=Zd(e),t=Pi(e,r);if(null!==t)ec(t,e,r,Jd());Uc(e,r)}},kt=function(){return gt},jt=function(e,r){var t=gt;try{return gt=e,r()}finally{gt=t}},yr=function(e,r,t){switch(r){case"input":if(Ge(e,t),r=t.name,"radio"===t.type&&null!=r){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<t.length;r++){var n=t[r];if(n!==e&&n.form===e.form){var a=yo(n);if(!a)throw Error(ne(90));He(n),Ge(n,a)}}}break;case"textarea":nr(e,t);break;case"select":null!=(r=t.value)&&er(e,!!t.multiple,r,!1)}},$r=lc,Cr=sc;var Jc={usingClientEntryPoint:!1,Events:[bo,vo,yo,Sr,zr,lc]},Zc={findFiberByHostInstance:go,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ep={bundleType:Zc.bundleType,version:Zc.version,rendererPackageName:Zc.rendererPackageName,rendererConfig:Zc.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:be.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Wr(e))?null:e.stateNode},findFiberByHostInstance:Zc.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var rp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!rp.isDisabled&&rp.supportsFiber)try{tt=rp.inject(ep),nt=rp}catch(sr){}}K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Jc,K.createPortal=function(e,r){var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Qc(r))throw Error(ne(200));return function(e,r,t){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:ye,key:null==n?null:""+n,children:e,containerInfo:r,implementation:t}}(e,r,null,t)},K.createRoot=function(e,r){if(!Qc(e))throw Error(ne(299));var t=!1,n="",a=Hc;return null!=r&&(!0===r.unstable_strictMode&&(t=!0),void 0!==r.identifierPrefix&&(n=r.identifierPrefix),void 0!==r.onRecoverableError&&(a=r.onRecoverableError)),r=Rc(e,1,!1,null,0,t,0,n,a),e[fo]=r.current,Ma(8===e.nodeType?e.parentNode:e),new qc(r)},K.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var r=e._reactInternals;if(void 0===r){if("function"==typeof e.render)throw Error(ne(188));throw e=Object.keys(e).join(","),Error(ne(268,e))}return e=null===(e=Wr(r))?null:e.stateNode},K.flushSync=function(e){return sc(e)},K.hydrate=function(e,r,t){if(!Xc(r))throw Error(ne(200));return Kc(null,e,r,!0,t)},K.hydrateRoot=function(e,r,t){if(!Qc(e))throw Error(ne(405));var n=null!=t&&t.hydratedSources||null,a=!1,o="",i=Hc;if(null!=t&&(!0===t.unstable_strictMode&&(a=!0),void 0!==t.identifierPrefix&&(o=t.identifierPrefix),void 0!==t.onRecoverableError&&(i=t.onRecoverableError)),r=Mc(r,null,e,1,null!=t?t:null,a,0,o,i),e[fo]=r.current,Ma(e),n)for(e=0;e<n.length;e++)a=(a=(t=n[e])._getVersion)(t._source),null==r.mutableSourceEagerHydrationData?r.mutableSourceEagerHydrationData=[t,a]:r.mutableSourceEagerHydrationData.push(t,a);return new Vc(r)},K.render=function(e,r,t){if(!Xc(r))throw Error(ne(200));return Kc(null,e,r,!1,t)},K.unmountComponentAtNode=function(e){if(!Xc(e))throw Error(ne(40));return!!e._reactRootContainer&&(sc(function(){Kc(null,null,e,!1,function(){e._reactRootContainer=null,e[fo]=null})}),!0)},K.unstable_batchedUpdates=lc,K.unstable_renderSubtreeIntoContainer=function(e,r,t,n){if(!Xc(t))throw Error(ne(200));if(null==e||void 0===e._reactInternals)throw Error(ne(38));return Kc(e,r,t,!1,n)},K.version="18.3.1-next-f1338f8080-20240426",function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(r){console.error(r)}}(),G.exports=K;var tp=G.exports;X.createRoot=tp.createRoot,X.hydrateRoot=tp.hydrateRoot;const np={},ap=function(e,r,t){let n=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),t=(null==e?void 0:e.nonce)||(null==e?void 0:e.getAttribute("nonce"));n=Promise.allSettled(r.map(e=>{if((e=function(e){return"/"+e}(e))in np)return;np[e]=!0;const r=e.endsWith(".css"),n=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const a=document.createElement("link");return a.rel=r?"stylesheet":"modulepreload",r||(a.as="script"),a.crossOrigin="",a.href=e,t&&a.setAttribute("nonce",t),document.head.appendChild(a),r?new Promise((r,t)=>{a.addEventListener("load",r),a.addEventListener("error",()=>t(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}function a(e){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e}return n.then(r=>{for(const e of r||[])"rejected"===e.status&&a(e.reason);return e().catch(a)})};var op=function(){return op=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var a in r=arguments[t])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e},op.apply(this,arguments)};function ip(e,r,t){if(t||2===arguments.length)for(var n,a=0,o=r.length;a<o;a++)!n&&a in r||(n||(n=Array.prototype.slice.call(r,0,a)),n[a]=r[a]);return e.concat(n||Array.prototype.slice.call(r))}"function"==typeof SuppressedError&&SuppressedError;var lp="-ms-",sp="-moz-",dp="-webkit-",cp="comm",pp="rule",up="decl",fp="@keyframes",xp=Math.abs,hp=String.fromCharCode,mp=Object.assign;function gp(e){return e.trim()}function bp(e,r){return(e=r.exec(e))?e[0]:e}function vp(e,r,t){return e.replace(r,t)}function yp(e,r,t){return e.indexOf(r,t)}function wp(e,r){return 0|e.charCodeAt(r)}function kp(e,r,t){return e.slice(r,t)}function jp(e){return e.length}function Sp(e){return e.length}function zp(e,r){return r.push(e),e}function $p(e,r){return e.filter(function(e){return!bp(e,r)})}var Cp=1,Ep=1,_p=0,Dp=0,Tp=0,Np="";function Pp(e,r,t,n,a,o,i,l){return{value:e,root:r,parent:t,type:n,props:a,children:o,line:Cp,column:Ep,length:i,return:"",siblings:l}}function Ip(e,r){return mp(Pp("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},r)}function Ap(e){for(;e.root;)e=Ip(e.root,{children:[e]});zp(e,e.siblings)}function Fp(){return Tp=Dp>0?wp(Np,--Dp):0,Ep--,10===Tp&&(Ep=1,Cp--),Tp}function Lp(){return Tp=Dp<_p?wp(Np,Dp++):0,Ep++,10===Tp&&(Ep=1,Cp++),Tp}function Rp(){return wp(Np,Dp)}function Op(){return Dp}function Mp(e,r){return kp(Np,e,r)}function Yp(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Bp(e){return gp(Mp(Dp-1,Hp(91===e?e+2:40===e?e+1:e)))}function Wp(e){for(;(Tp=Rp())&&Tp<33;)Lp();return Yp(e)>2||Yp(Tp)>3?"":" "}function Up(e,r){for(;--r&&Lp()&&!(Tp<48||Tp>102||Tp>57&&Tp<65||Tp>70&&Tp<97););return Mp(e,Op()+(r<6&&32==Rp()&&32==Lp()))}function Hp(e){for(;Lp();)switch(Tp){case e:return Dp;case 34:case 39:34!==e&&39!==e&&Hp(Tp);break;case 40:41===e&&Hp(e);break;case 92:Lp()}return Dp}function qp(e,r){for(;Lp()&&e+Tp!==57&&(e+Tp!==84||47!==Rp()););return"/*"+Mp(r,Dp-1)+"*"+hp(47===e?e:Lp())}function Vp(e){for(;!Yp(Rp());)Lp();return Mp(e,Dp)}function Qp(e){return function(e){return Np="",e}(Xp("",null,null,null,[""],e=function(e){return Cp=Ep=1,_p=jp(Np=e),Dp=0,[]}(e),0,[0],e))}function Xp(e,r,t,n,a,o,i,l,s){for(var d=0,c=0,p=i,u=0,f=0,x=0,h=1,m=1,g=1,b=0,v="",y=a,w=o,k=n,j=v;m;)switch(x=b,b=Lp()){case 40:if(108!=x&&58==wp(j,p-1)){-1!=yp(j+=vp(Bp(b),"&","&\f"),"&\f",xp(d?l[d-1]:0))&&(g=-1);break}case 34:case 39:case 91:j+=Bp(b);break;case 9:case 10:case 13:case 32:j+=Wp(x);break;case 92:j+=Up(Op()-1,7);continue;case 47:switch(Rp()){case 42:case 47:zp(Kp(qp(Lp(),Op()),r,t,s),s);break;default:j+="/"}break;case 123*h:l[d++]=jp(j)*g;case 125*h:case 59:case 0:switch(b){case 0:case 125:m=0;case 59+c:-1==g&&(j=vp(j,/\f/g,"")),f>0&&jp(j)-p&&zp(f>32?Jp(j+";",n,t,p-1,s):Jp(vp(j," ","")+";",n,t,p-2,s),s);break;case 59:j+=";";default:if(zp(k=Gp(j,r,t,d,c,a,l,v,y=[],w=[],p,o),o),123===b)if(0===c)Xp(j,r,k,k,y,o,p,l,w);else switch(99===u&&110===wp(j,3)?100:u){case 100:case 108:case 109:case 115:Xp(e,k,k,n&&zp(Gp(e,k,k,0,0,a,l,v,a,y=[],p,w),w),a,w,p,l,n?y:w);break;default:Xp(j,k,k,k,[""],w,0,l,w)}}d=c=f=0,h=g=1,v=j="",p=i;break;case 58:p=1+jp(j),f=x;default:if(h<1)if(123==b)--h;else if(125==b&&0==h++&&125==Fp())continue;switch(j+=hp(b),b*h){case 38:g=c>0?1:(j+="\f",-1);break;case 44:l[d++]=(jp(j)-1)*g,g=1;break;case 64:45===Rp()&&(j+=Bp(Lp())),u=Rp(),c=p=jp(v=j+=Vp(Op())),b++;break;case 45:45===x&&2==jp(j)&&(h=0)}}return o}function Gp(e,r,t,n,a,o,i,l,s,d,c,p){for(var u=a-1,f=0===a?o:[""],x=Sp(f),h=0,m=0,g=0;h<n;++h)for(var b=0,v=kp(e,u+1,u=xp(m=i[h])),y=e;b<x;++b)(y=gp(m>0?f[b]+" "+v:vp(v,/&\f/g,f[b])))&&(s[g++]=y);return Pp(e,r,t,0===a?pp:l,s,d,c,p)}function Kp(e,r,t,n){return Pp(e,r,t,cp,hp(Tp),kp(e,2,-2),0,n)}function Jp(e,r,t,n,a){return Pp(e,r,t,up,kp(e,0,n),kp(e,n+1,-1),n,a)}function Zp(e,r,t){switch(function(e,r){return 45^wp(e,0)?(((r<<2^wp(e,0))<<2^wp(e,1))<<2^wp(e,2))<<2^wp(e,3):0}(e,r)){case 5103:return dp+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return dp+e+e;case 4789:return sp+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return dp+e+sp+e+lp+e+e;case 5936:switch(wp(e,r+11)){case 114:return dp+e+lp+vp(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return dp+e+lp+vp(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return dp+e+lp+vp(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return dp+e+lp+e+e;case 6165:return dp+e+lp+"flex-"+e+e;case 5187:return dp+e+vp(e,/(\w+).+(:[^]+)/,dp+"box-$1$2"+lp+"flex-$1$2")+e;case 5443:return dp+e+lp+"flex-item-"+vp(e,/flex-|-self/g,"")+(bp(e,/flex-|baseline/)?"":lp+"grid-row-"+vp(e,/flex-|-self/g,""))+e;case 4675:return dp+e+lp+"flex-line-pack"+vp(e,/align-content|flex-|-self/g,"")+e;case 5548:return dp+e+lp+vp(e,"shrink","negative")+e;case 5292:return dp+e+lp+vp(e,"basis","preferred-size")+e;case 6060:return dp+"box-"+vp(e,"-grow","")+dp+e+lp+vp(e,"grow","positive")+e;case 4554:return dp+vp(e,/([^-])(transform)/g,"$1"+dp+"$2")+e;case 6187:return vp(vp(vp(e,/(zoom-|grab)/,dp+"$1"),/(image-set)/,dp+"$1"),e,"")+e;case 5495:case 3959:return vp(e,/(image-set\([^]*)/,dp+"$1$`$1");case 4968:return vp(vp(e,/(.+:)(flex-)?(.*)/,dp+"box-pack:$3"+lp+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+dp+e+e;case 4200:if(!bp(e,/flex-|baseline/))return lp+"grid-column-align"+kp(e,r)+e;break;case 2592:case 3360:return lp+vp(e,"template-","")+e;case 4384:case 3616:return t&&t.some(function(e,t){return r=t,bp(e.props,/grid-\w+-end/)})?~yp(e+(t=t[r].value),"span",0)?e:lp+vp(e,"-start","")+e+lp+"grid-row-span:"+(~yp(t,"span",0)?bp(t,/\d+/):+bp(t,/\d+/)-+bp(e,/\d+/))+";":lp+vp(e,"-start","")+e;case 4896:case 4128:return t&&t.some(function(e){return bp(e.props,/grid-\w+-start/)})?e:lp+vp(vp(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return vp(e,/(.+)-inline(.+)/,dp+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(jp(e)-1-r>6)switch(wp(e,r+1)){case 109:if(45!==wp(e,r+4))break;case 102:return vp(e,/(.+:)(.+)-([^]+)/,"$1"+dp+"$2-$3$1"+sp+(108==wp(e,r+3)?"$3":"$2-$3"))+e;case 115:return~yp(e,"stretch",0)?Zp(vp(e,"stretch","fill-available"),r,t)+e:e}break;case 5152:case 5920:return vp(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,t,n,a,o,i,l){return lp+t+":"+n+l+(a?lp+t+"-span:"+(o?i:+i-+n)+l:"")+e});case 4949:if(121===wp(e,r+6))return vp(e,":",":"+dp)+e;break;case 6444:switch(wp(e,45===wp(e,14)?18:11)){case 120:return vp(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+dp+(45===wp(e,14)?"inline-":"")+"box$3$1"+dp+"$2$3$1"+lp+"$2box$3")+e;case 100:return vp(e,":",":"+lp)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return vp(e,"scroll-","scroll-snap-")+e}return e}function eu(e,r){for(var t="",n=0;n<e.length;n++)t+=r(e[n],n,e,r)||"";return t}function ru(e,r,t,n){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case up:return e.return=e.return||e.value;case cp:return"";case fp:return e.return=e.value+"{"+eu(e.children,n)+"}";case pp:if(!jp(e.value=e.props.join(",")))return""}return jp(t=eu(e.children,n))?e.return=e.value+"{"+t+"}":""}function tu(e,r,t,n){if(e.length>-1&&!e.return)switch(e.type){case up:return void(e.return=Zp(e.value,e.length,t));case fp:return eu([Ip(e,{value:vp(e.value,"@","@"+dp)})],n);case pp:if(e.length)return function(e,r){return e.map(r).join("")}(t=e.props,function(r){switch(bp(r,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ap(Ip(e,{props:[vp(r,/:(read-\w+)/,":-moz-$1")]})),Ap(Ip(e,{props:[r]})),mp(e,{props:$p(t,n)});break;case"::placeholder":Ap(Ip(e,{props:[vp(r,/:(plac\w+)/,":"+dp+"input-$1")]})),Ap(Ip(e,{props:[vp(r,/:(plac\w+)/,":-moz-$1")]})),Ap(Ip(e,{props:[vp(r,/:(plac\w+)/,lp+"input-$1")]})),Ap(Ip(e,{props:[r]})),mp(e,{props:$p(t,n)})}return""})}}var nu={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},au={},ou="undefined"!=typeof process&&void 0!==au&&(au.REACT_APP_SC_ATTR||au.SC_ATTR)||"data-styled",iu="active",lu="data-styled-version",su="6.1.19",du="/*!sc*/\n",cu="undefined"!=typeof window&&"undefined"!=typeof document,pu=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==au&&void 0!==au.REACT_APP_SC_DISABLE_SPEEDY&&""!==au.REACT_APP_SC_DISABLE_SPEEDY?"false"!==au.REACT_APP_SC_DISABLE_SPEEDY&&au.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==au&&void 0!==au.SC_DISABLE_SPEEDY&&""!==au.SC_DISABLE_SPEEDY&&("false"!==au.SC_DISABLE_SPEEDY&&au.SC_DISABLE_SPEEDY)),uu={},fu=Object.freeze([]),xu=Object.freeze({});function hu(e,r,t){return void 0===t&&(t=xu),e.theme!==t.theme&&e.theme||r||t.theme}var mu=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),gu=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,bu=/(^-|-$)/g;function vu(e){return e.replace(gu,"-").replace(bu,"")}var yu=/(a)(d)/gi,wu=function(e){return String.fromCharCode(e+(e>25?39:97))};function ku(e){var r,t="";for(r=Math.abs(e);r>52;r=r/52|0)t=wu(r%52)+t;return(wu(r%52)+t).replace(yu,"$1-$2")}var ju,Su=function(e,r){for(var t=r.length;t;)e=33*e^r.charCodeAt(--t);return e},zu=function(e){return Su(5381,e)};function $u(e){return ku(zu(e)>>>0)}function Cu(e){return"string"==typeof e&&!0}var Eu="function"==typeof Symbol&&Symbol.for,_u=Eu?Symbol.for("react.memo"):60115,Du=Eu?Symbol.for("react.forward_ref"):60112,Tu={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Nu={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Pu={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Iu=((ju={})[Du]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ju[_u]=Pu,ju);function Au(e){return("type"in(r=e)&&r.type.$$typeof)===_u?Pu:"$$typeof"in e?Iu[e.$$typeof]:Tu;var r}var Fu=Object.defineProperty,Lu=Object.getOwnPropertyNames,Ru=Object.getOwnPropertySymbols,Ou=Object.getOwnPropertyDescriptor,Mu=Object.getPrototypeOf,Yu=Object.prototype;function Bu(e,r,t){if("string"!=typeof r){if(Yu){var n=Mu(r);n&&n!==Yu&&Bu(e,n,t)}var a=Lu(r);Ru&&(a=a.concat(Ru(r)));for(var o=Au(e),i=Au(r),l=0;l<a.length;++l){var s=a[l];if(!(s in Nu||t&&t[s]||i&&s in i||o&&s in o)){var d=Ou(r,s);try{Fu(e,s,d)}catch(c){}}}}return e}function Wu(e){return"function"==typeof e}function Uu(e){return"object"==typeof e&&"styledComponentId"in e}function Hu(e,r){return e&&r?"".concat(e," ").concat(r):e||r||""}function qu(e,r){if(0===e.length)return"";for(var t=e[0],n=1;n<e.length;n++)t+=e[n];return t}function Vu(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Qu(e,r,t){if(void 0===t&&(t=!1),!t&&!Vu(e)&&!Array.isArray(e))return r;if(Array.isArray(r))for(var n=0;n<r.length;n++)e[n]=Qu(e[n],r[n]);else if(Vu(r))for(var n in r)e[n]=Qu(e[n],r[n]);return e}function Xu(e,r){Object.defineProperty(e,"toString",{value:r})}function Gu(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(r.length>0?" Args: ".concat(r.join(", ")):""))}var Ku=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var r=0,t=0;t<e;t++)r+=this.groupSizes[t];return r},e.prototype.insertRules=function(e,r){if(e>=this.groupSizes.length){for(var t=this.groupSizes,n=t.length,a=n;e>=a;)if((a<<=1)<0)throw Gu(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(t),this.length=a;for(var o=n;o<a;o++)this.groupSizes[o]=0}for(var i=this.indexOfGroup(e+1),l=(o=0,r.length);o<l;o++)this.tag.insertRule(i,r[o])&&(this.groupSizes[e]++,i++)},e.prototype.clearGroup=function(e){if(e<this.length){var r=this.groupSizes[e],t=this.indexOfGroup(e),n=t+r;this.groupSizes[e]=0;for(var a=t;a<n;a++)this.tag.deleteRule(t)}},e.prototype.getGroup=function(e){var r="";if(e>=this.length||0===this.groupSizes[e])return r;for(var t=this.groupSizes[e],n=this.indexOfGroup(e),a=n+t,o=n;o<a;o++)r+="".concat(this.tag.getRule(o)).concat(du);return r},e}(),Ju=new Map,Zu=new Map,ef=1,rf=function(e){if(Ju.has(e))return Ju.get(e);for(;Zu.has(ef);)ef++;var r=ef++;return Ju.set(e,r),Zu.set(r,e),r},tf=function(e,r){ef=r+1,Ju.set(e,r),Zu.set(r,e)},nf="style[".concat(ou,"][").concat(lu,'="').concat(su,'"]'),af=new RegExp("^".concat(ou,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),of=function(e,r,t){for(var n,a=t.split(","),o=0,i=a.length;o<i;o++)(n=a[o])&&e.registerName(r,n)},lf=function(e,r){for(var t,n=(null!==(t=r.textContent)&&void 0!==t?t:"").split(du),a=[],o=0,i=n.length;o<i;o++){var l=n[o].trim();if(l){var s=l.match(af);if(s){var d=0|parseInt(s[1],10),c=s[2];0!==d&&(tf(c,d),of(e,c,s[3]),e.getTag().insertRules(d,a)),a.length=0}else a.push(l)}}},sf=function(e){for(var r=document.querySelectorAll(nf),t=0,n=r.length;t<n;t++){var a=r[t];a&&a.getAttribute(ou)!==iu&&(lf(e,a),a.parentNode&&a.parentNode.removeChild(a))}};var df=function(e){var r,t,n=document.head,a=e||n,o=document.createElement("style"),i=(r=a,(t=Array.from(r.querySelectorAll("style[".concat(ou,"]"))))[t.length-1]),l=void 0!==i?i.nextSibling:null;o.setAttribute(ou,iu),o.setAttribute(lu,su);var s="undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null;return s&&o.setAttribute("nonce",s),a.insertBefore(o,l),o},cf=function(){function e(e){this.element=df(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var r=document.styleSheets,t=0,n=r.length;t<n;t++){var a=r[t];if(a.ownerNode===e)return a}throw Gu(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,r){try{return this.sheet.insertRule(r,e),this.length++,!0}catch(t){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var r=this.sheet.cssRules[e];return r&&r.cssText?r.cssText:""},e}(),pf=function(){function e(e){this.element=df(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,r){if(e<=this.length&&e>=0){var t=document.createTextNode(r);return this.element.insertBefore(t,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),uf=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,r){return e<=this.length&&(this.rules.splice(e,0,r),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),ff=cu,xf={isServer:!cu,useCSSOMInjection:!pu},hf=function(){function e(e,r,t){void 0===e&&(e=xu),void 0===r&&(r={});var n=this;this.options=op(op({},xf),e),this.gs=r,this.names=new Map(t),this.server=!!e.isServer,!this.server&&cu&&ff&&(ff=!1,sf(this)),Xu(this,function(){return function(e){for(var r=e.getTag(),t=r.length,n="",a=function(t){var a,o=(a=t,Zu.get(a));if(void 0===o)return"continue";var i=e.names.get(o),l=r.getGroup(t);if(void 0===i||!i.size||0===l.length)return"continue";var s="".concat(ou,".g").concat(t,'[id="').concat(o,'"]'),d="";void 0!==i&&i.forEach(function(e){e.length>0&&(d+="".concat(e,","))}),n+="".concat(l).concat(s,'{content:"').concat(d,'"}').concat(du)},o=0;o<t;o++)a(o);return n}(n)})}return e.registerId=function(e){return rf(e)},e.prototype.rehydrate=function(){!this.server&&cu&&sf(this)},e.prototype.reconstructWithOptions=function(r,t){return void 0===t&&(t=!0),new e(op(op({},this.options),r),this.gs,t&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=this.options,r=e.useCSSOMInjection,t=e.target,n=e.isServer?new uf(t):r?new cf(t):new pf(t),new Ku(n)));var e,r,t,n},e.prototype.hasNameForId=function(e,r){return this.names.has(e)&&this.names.get(e).has(r)},e.prototype.registerName=function(e,r){if(rf(e),this.names.has(e))this.names.get(e).add(r);else{var t=new Set;t.add(r),this.names.set(e,t)}},e.prototype.insertRules=function(e,r,t){this.registerName(e,r),this.getTag().insertRules(rf(e),t)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(rf(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),mf=/&/g,gf=/^\s*\/\/.*$/gm;function bf(e,r){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(r," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(r," ")),e.props=e.props.map(function(e){return"".concat(r," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=bf(e.children,r)),e})}var vf=new hf,yf=function(){var e,r,t,n=xu,a=n.options,o=void 0===a?xu:a,i=n.plugins,l=void 0===i?fu:i,s=function(t,n,a){return a.startsWith(r)&&a.endsWith(r)&&a.replaceAll(r,"").length>0?".".concat(e):t},d=l.slice();d.push(function(e){e.type===pp&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(mf,r).replace(t,s))}),o.prefix&&d.push(tu),d.push(ru);var c=function(n,a,i,l){void 0===a&&(a=""),void 0===i&&(i=""),void 0===l&&(l="&"),e=l,r=a,t=new RegExp("\\".concat(r,"\\b"),"g");var s=n.replace(gf,""),c=Qp(i||a?"".concat(i," ").concat(a," { ").concat(s," }"):s);o.namespace&&(c=bf(c,o.namespace));var p,u,f,x=[];return eu(c,(p=d.concat((f=function(e){return x.push(e)},function(e){e.root||(e=e.return)&&f(e)})),u=Sp(p),function(e,r,t,n){for(var a="",o=0;o<u;o++)a+=p[o](e,r,t,n)||"";return a})),x};return c.hash=l.length?l.reduce(function(e,r){return r.name||Gu(15),Su(e,r.name)},5381).toString():"",c}(),wf=M.createContext({shouldForwardProp:void 0,styleSheet:vf,stylis:yf});function kf(){return O.useContext(wf)}wf.Consumer,M.createContext(void 0);var jf=function(){function e(e,r){var t=this;this.inject=function(e,r){void 0===r&&(r=yf);var n=t.name+r.hash;e.hasNameForId(t.id,n)||e.insertRules(t.id,n,r(t.rules,n,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=r,Xu(this,function(){throw Gu(12,String(t.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=yf),this.name+e.hash},e}(),Sf=function(e){return e>="A"&&e<="Z"};function zf(e){for(var r="",t=0;t<e.length;t++){var n=e[t];if(1===t&&"-"===n&&"-"===e[0])return e;Sf(n)?r+="-"+n.toLowerCase():r+=n}return r.startsWith("ms-")?"-"+r:r}var $f=function(e){return null==e||!1===e||""===e},Cf=function(e){var r,t,n=[];for(var a in e){var o=e[a];e.hasOwnProperty(a)&&!$f(o)&&(Array.isArray(o)&&o.isCss||Wu(o)?n.push("".concat(zf(a),":"),o,";"):Vu(o)?n.push.apply(n,ip(ip(["".concat(a," {")],Cf(o),!1),["}"],!1)):n.push("".concat(zf(a),": ").concat((r=a,null==(t=o)||"boolean"==typeof t||""===t?"":"number"!=typeof t||0===t||r in nu||r.startsWith("--")?String(t).trim():"".concat(t,"px")),";")))}return n};function Ef(e,r,t,n){return $f(e)?[]:Uu(e)?[".".concat(e.styledComponentId)]:Wu(e)?!Wu(a=e)||a.prototype&&a.prototype.isReactComponent||!r?[e]:Ef(e(r),r,t,n):e instanceof jf?t?(e.inject(t,n),[e.getName(n)]):[e]:Vu(e)?Cf(e):Array.isArray(e)?Array.prototype.concat.apply(fu,e.map(function(e){return Ef(e,r,t,n)})):[e.toString()];var a}function _f(e){for(var r=0;r<e.length;r+=1){var t=e[r];if(Wu(t)&&!Uu(t))return!1}return!0}var Df=zu(su),Tf=function(){function e(e,r,t){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===t||t.isStatic)&&_f(e),this.componentId=r,this.baseHash=Su(Df,r),this.baseStyle=t,hf.registerId(r)}return e.prototype.generateAndInjectStyles=function(e,r,t){var n=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,r,t):"";if(this.isStatic&&!t.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))n=Hu(n,this.staticRulesId);else{var a=qu(Ef(this.rules,e,r,t)),o=ku(Su(this.baseHash,a)>>>0);if(!r.hasNameForId(this.componentId,o)){var i=t(a,".".concat(o),void 0,this.componentId);r.insertRules(this.componentId,o,i)}n=Hu(n,o),this.staticRulesId=o}else{for(var l=Su(this.baseHash,t.hash),s="",d=0;d<this.rules.length;d++){var c=this.rules[d];if("string"==typeof c)s+=c;else if(c){var p=qu(Ef(c,e,r,t));l=Su(l,p+d),s+=p}}if(s){var u=ku(l>>>0);r.hasNameForId(this.componentId,u)||r.insertRules(this.componentId,u,t(s,".".concat(u),void 0,this.componentId)),n=Hu(n,u)}}return n},e}(),Nf=M.createContext(void 0);Nf.Consumer;var Pf={};function If(e,r,t){var n,a=Uu(e),o=e,i=!Cu(e),l=r.attrs,s=void 0===l?fu:l,d=r.componentId,c=void 0===d?function(e,r){var t="string"!=typeof e?"sc":vu(e);Pf[t]=(Pf[t]||0)+1;var n="".concat(t,"-").concat($u(su+t+Pf[t]));return r?"".concat(r,"-").concat(n):n}(r.displayName,r.parentComponentId):d,p=r.displayName,u=void 0===p?Cu(n=e)?"styled.".concat(n):"Styled(".concat(function(e){return e.displayName||e.name||"Component"}(n),")"):p,f=r.displayName&&r.componentId?"".concat(vu(r.displayName),"-").concat(r.componentId):r.componentId||c,x=a&&o.attrs?o.attrs.concat(s).filter(Boolean):s,h=r.shouldForwardProp;if(a&&o.shouldForwardProp){var m=o.shouldForwardProp;if(r.shouldForwardProp){var g=r.shouldForwardProp;h=function(e,r){return m(e,r)&&g(e,r)}}else h=m}var b=new Tf(t,f,a?o.componentStyle:void 0);function v(e,r){return function(e,r,t){var n=e.attrs,a=e.componentStyle,o=e.defaultProps,i=e.foldedComponentIds,l=e.styledComponentId,s=e.target,d=M.useContext(Nf),c=kf(),p=e.shouldForwardProp||c.shouldForwardProp,u=hu(r,d,o)||xu,f=function(e,r,t){for(var n,a=op(op({},r),{className:void 0,theme:t}),o=0;o<e.length;o+=1){var i=Wu(n=e[o])?n(a):n;for(var l in i)a[l]="className"===l?Hu(a[l],i[l]):"style"===l?op(op({},a[l]),i[l]):i[l]}return r.className&&(a.className=Hu(a.className,r.className)),a}(n,r,u),x=f.as||s,h={};for(var m in f)void 0===f[m]||"$"===m[0]||"as"===m||"theme"===m&&f.theme===u||("forwardedAs"===m?h.as=f.forwardedAs:p&&!p(m,x)||(h[m]=f[m]));var g,b,v,y=(g=a,b=f,v=kf(),g.generateAndInjectStyles(b,v.styleSheet,v.stylis)),w=Hu(i,l);return y&&(w+=" "+y),f.className&&(w+=" "+f.className),h[Cu(x)&&!mu.has(x)?"class":"className"]=w,t&&(h.ref=t),O.createElement(x,h)}(y,e,r)}v.displayName=u;var y=M.forwardRef(v);return y.attrs=x,y.componentStyle=b,y.displayName=u,y.shouldForwardProp=h,y.foldedComponentIds=a?Hu(o.foldedComponentIds,o.styledComponentId):"",y.styledComponentId=f,y.target=a?o.target:e,Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?function(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];for(var n=0,a=r;n<a.length;n++)Qu(e,a[n],!0);return e}({},o.defaultProps,e):e}}),Xu(y,function(){return".".concat(y.styledComponentId)}),i&&Bu(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),y}function Af(e,r){for(var t=[e[0]],n=0,a=r.length;n<a;n+=1)t.push(r[n],e[n+1]);return t}var Ff=function(e){return Object.assign(e,{isCss:!0})};function Lf(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];if(Wu(e)||Vu(e))return Ff(Ef(Af(fu,ip([e],r,!0))));var n=e;return 0===r.length&&1===n.length&&"string"==typeof n[0]?Ef(n):Ff(Ef(Af(n,r)))}function Rf(e,r,t){if(void 0===t&&(t=xu),!r)throw Gu(1,r);var n=function(n){for(var a=[],o=1;o<arguments.length;o++)a[o-1]=arguments[o];return e(r,t,Lf.apply(void 0,ip([n],a,!1)))};return n.attrs=function(n){return Rf(e,r,op(op({},t),{attrs:Array.prototype.concat(t.attrs,n).filter(Boolean)}))},n.withConfig=function(n){return Rf(e,r,op(op({},t),n))},n}var Of=function(e){return Rf(If,e)},Mf=Of;mu.forEach(function(e){Mf[e]=Of(e)});var Yf=function(){function e(e,r){this.rules=e,this.componentId=r,this.isStatic=_f(e),hf.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,r,t,n){var a=n(qu(Ef(this.rules,r,t,n)),""),o=this.componentId+e;t.insertRules(o,o,a)},e.prototype.removeStyles=function(e,r){r.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,r,t,n){e>2&&hf.registerId(this.componentId+e),this.removeStyles(e,t),this.createStyles(e,r,t,n)},e}();function Bf(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];var n=qu(Lf.apply(void 0,ip([e],r,!1))),a=$u(n);return new jf(a,n)}const Wf=Bf`
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;Bf`
  0%, 100% { 
    box-shadow: 0 0 8px rgba(139, 69, 19, 0.15);
  }
  50% { 
    box-shadow: 0 0 12px rgba(139, 69, 19, 0.25);
  }
`,Bf`
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 8px rgba(255, 107, 53, 0.4));
  }
  50% {
    transform: scale(1.02);
    filter: drop-shadow(0 0 12px rgba(255, 107, 53, 0.6));
  }
`,Bf`
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(255, 107, 53, 0.8)) drop-shadow(0 0 6px rgba(255, 107, 53, 0.4));
  }
  25% {
    filter: drop-shadow(0 0 8px rgba(255, 107, 53, 1)) drop-shadow(0 0 15px rgba(255, 107, 53, 0.7)) drop-shadow(0 0 25px rgba(255, 107, 53, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 5px rgba(255, 107, 53, 0.9)) drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
  }
  75% {
    filter: drop-shadow(0 0 7px rgba(255, 107, 53, 1)) drop-shadow(0 0 12px rgba(255, 107, 53, 0.6)) drop-shadow(0 0 20px rgba(255, 107, 53, 0.2));
  }
`,Bf`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  75% {
    transform: rotate(-1deg);
  }
`;const Uf=Mf.div`
  min-height: 100vh;
  max-height: 100vh;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 0px;
  animation: ${Wf} 0.8s ease-out forwards;
  transition: all 0.5s ease;
  overflow: hidden;
  
  @media (max-width: 480px) {
    padding: 0px;
  }
`,Hf=Mf.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 450px;
  margin: 0 auto;
  padding-top: 0px;
  margin-top: 0px;
  
  @media (max-width: 480px) {
    max-width: 400px;
    padding-top: 0px;
    margin-top: 0px;
  }
`,qf=Mf.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 10px;
  position: relative;
  
  @media (max-width: 480px) {
    margin-bottom: 3px;
    margin-top: 10px;
  }
`;Mf.img`
  width: 120px;
  height: auto;
  margin-left: 20px;
  filter: drop-shadow(0 0 8px rgba(255, 107, 53, 0.4));
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 12px rgba(255, 107, 53, 0.6));
  }
  
  @media (max-width: 480px) {
    width: 90px;
    margin-left: 15px;
  }
`;const Vf=Mf.h1`
  position: relative;
  z-index: 2;
  font-family: 'Music Warrior', 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
  font-size: 4.2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
  text-shadow: 0 0 20px rgba(162, 59, 59, 0.4);
  background: linear-gradient(90deg, 
    var(--matte-red) 0%, 
    var(--terracotta) 50%, 
    var(--dark-beige) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  margin-top: 20px;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 3.2rem;
    margin-top: 20px;
  }
`;Bf`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,Mf.p`
  position: relative;
  z-index: 2;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 40px;
  opacity: 1;
  font-weight: 500;
  line-height: 1.5;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 0 15px var(--glow-gold);
  padding: 0 20px;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 30px;
    max-width: 280px;
    line-height: 1.4;
  }
`;const Qf=Mf.button`
  position: fixed;
  top: 5px;
  left: 20px;
  padding: 6px 16px;
  border: 2px solid ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 25px;
  background: ${e=>e.$isDark?"rgba(162, 59, 59, 0.1)":"rgba(139, 69, 19, 0.08)"};
  color: var(--text-primary);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  letter-spacing: 0.03em;
  z-index: 1000;
  min-width: 80px;
  box-shadow: ${e=>e.$isDark?"0 0 20px rgba(162, 59, 59, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1)":"0 0 15px rgba(139, 69, 19, 0.15), 0 4px 12px rgba(0, 0, 0, 0.05)"};
  position: relative;
  overflow: hidden;
  
  @media (max-width: 480px) {
    padding: 5px 12px;
    font-size: 0.9rem;
    top: 5px;
    left: 16px;
    min-width: 60px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${e=>e.$isDark?"linear-gradient(90deg, transparent, rgba(162, 59, 59, 0.2), transparent)":"linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.2), transparent)"};
    transition: left 0.6s ease;
  }
  
  &:hover {
    background: ${e=>e.$isDark?"rgba(162, 59, 59, 0.15)":"rgba(139, 69, 19, 0.12)"};
    border-color: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
    color: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${e=>e.$isDark?"0 0 25px rgba(162, 59, 59, 0.3), 0 8px 20px rgba(0, 0, 0, 0.15)":"0 0 20px rgba(139, 69, 19, 0.2), 0 8px 20px rgba(0, 0, 0, 0.08)"};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.01);
    background: ${e=>e.$isDark?"rgba(162, 59, 59, 0.2)":"rgba(139, 69, 19, 0.15)"};
    box-shadow: ${e=>e.$isDark?"0 0 15px rgba(162, 59, 59, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1)":"0 0 12px rgba(139, 69, 19, 0.18), 0 4px 12px rgba(0, 0, 0, 0.06)"};
  }
`,Xf=Mf.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 360px;
  margin: 0 auto;
  padding: 20px 20px 0 20px;
  justify-items: center;
  
  @media (max-width: 480px) {
    gap: 16px;
    max-width: 320px;
    padding: 20px 15px 0 15px;
  }
`,Gf=Mf.button`
  position: relative;
  z-index: 2;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: ${e=>"primary"===e.$variant?"var(--matte-red)":e.$isDark?"rgba(42, 42, 42, 0.8)":"rgba(230, 211, 179, 0.8)"};
  color: ${e=>"primary"===e.$variant?"var(--bg-primary)":"var(--text-primary)"};
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  backdrop-filter: blur(10px);
  letter-spacing: 0.02em;
  overflow: hidden;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    width: 130px;
    height: 130px;
    padding: 18px;
    font-size: 0.95rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${e=>"primary"===e.$variant?"linear-gradient(45deg, var(--matte-red), var(--terracotta), var(--dark-beige))":"transparent"};
    border-radius: 16px;
    padding: 1px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: ${e=>(e.$variant,0)};
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 
      0 12px 40px var(--shadow-card),
      0 6px 20px var(--shadow-soft);
    background: ${e=>"primary"===e.$variant?"var(--terracotta)":"rgba(164, 151, 132, 0.3)"};
    border-color: ${e=>"primary"===e.$variant?"var(--matte-red)":"var(--border-color)"};
    color: ${e=>"primary"===e.$variant?"var(--bg-primary)":"var(--text-primary)"};
  }
  
  &:hover::before {
    opacity: ${e=>"primary"===e.$variant?1:0};
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 8px 30px var(--shadow-card),
      0 4px 15px var(--shadow-soft);
  }
  
  &:focus {
    outline: none;
    transform: translateY(0) scale(1);
    box-shadow: 
      0 4px 20px var(--shadow-card),
      0 2px 8px var(--shadow-soft);
  }
  
  &:not(:hover):not(:focus):not(:active) {
    transform: translateY(0) scale(1);
    background: ${e=>"primary"===e.$variant?"var(--matte-red)":e.$isDark?"rgba(42, 42, 42, 0.8)":"rgba(230, 211, 179, 0.8)"};
    box-shadow: 
      0 4px 20px var(--shadow-card),
      0 2px 8px var(--shadow-soft);
  }
`,Kf=Mf.span`
  display: block;
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: inherit;
  opacity: 0.9;
  text-shadow: 0 0 10px currentColor;
  transition: all 0.3s ease;
  filter: ${e=>e.$isDark?"brightness(2.5) contrast(1.5) saturate(1.2)":"none"};
  
  @media (max-width: 480px) {
    font-size: 2.3rem;
    margin-bottom: 8px;
  }
  
  ${Gf}:hover & {
    transform: scale(1.1);
    opacity: 1;
    text-shadow: 0 0 15px currentColor;
  }
`,Jf=Mf.span`
  display: block;
  font-size: 1.05rem;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.2;
  }
  
  ${Gf}:hover & {
    transform: translateY(-2px);
    color: var(--text-primary);
  }
`,Zf=Mf.div`
  position: absolute;
  top: 11px;
  right: 11px;
  font-family: 'Noto Sans SC', serif;
  font-size: 1.25rem;
  opacity: 0.8;
  color: var(--text-primary);
  font-weight: 700;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    top: 9px;
    right: 9px;
    font-size: 1.15rem;
  }
  
  ${Gf}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }
`,ex=Mf.div`
  position: fixed;
  top: 5px;
  right: 20px;
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  z-index: 1000;

  &:hover {
    box-shadow:
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,rx=Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
`,tx=Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,nx=Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,ax=({onNavigate:e,toggleTheme:r,isDarkTheme:t})=>{M.useEffect(()=>(window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0,document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.width="100%",document.body.style.top="0",()=>{document.body.style.overflow="auto",document.body.style.position="",document.body.style.width="",document.body.style.top=""}),[]);const n=r=>{var t,n;(null==(n=null==(t=window.Telegram)?void 0:t.WebApp)?void 0:n.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.impactOccurred("medium"),e(r)};return Q.jsxs(Uf,{className:"main-container",children:[Q.jsx("div",{className:"mystic-seal",style:{top:"8%",left:"3%"}}),Q.jsx("div",{className:"mystic-seal",style:{bottom:"12%",right:"5%"}}),Q.jsx("div",{className:"mystic-seal",style:{top:"50%",left:"2%",transform:"rotate(45deg) scale(0.7)"}}),Q.jsx("div",{className:"mystic-seal",style:{top:"30%",right:"2%",transform:"rotate(-45deg) scale(0.8)"}}),Q.jsx(Qf,{$isDark:t,onClick:()=>n("about"),children:"О нас"}),Q.jsxs(ex,{onClick:r,children:[Q.jsx(tx,{$isDark:t,children:"🌙"}),Q.jsx(nx,{$isDark:t,children:"☀️"}),Q.jsx(rx,{$isDark:t})]}),Q.jsxs(Hf,{children:[Q.jsx(qf,{children:Q.jsx(Vf,{children:"poizonic"})}),Q.jsxs(Xf,{children:[Q.jsxs(Gf,{$variant:"primary",$isDark:t,onClick:()=>n("order"),children:[Q.jsx(Kf,{children:"🏮"}),Q.jsx(Jf,{children:"Сделать заказ"}),Q.jsx(Zf,{children:"福"})]}),Q.jsxs(Gf,{$variant:"secondary",$isDark:t,onClick:()=>n("calculator"),style:{transform:"translateY(0) scale(1)",boxShadow:"0 4px 20px var(--shadow-card), 0 2px 8px var(--shadow-soft)",background:t?"rgba(42, 42, 42, 0.8)":"rgba(230, 211, 179, 0.8)",borderColor:"var(--border-color)",color:"var(--text-primary)"},children:[Q.jsx(Kf,{children:"💰"}),Q.jsx(Jf,{children:"Расчет стоимости"}),Q.jsx(Zf,{children:"財"})]}),Q.jsxs(Gf,{$isDark:t,onClick:()=>n("tracking"),children:[Q.jsx(Kf,{children:"📦"}),Q.jsx(Jf,{children:"Отследить заказ"}),Q.jsx(Zf,{children:"追"})]}),Q.jsxs(Gf,{$isDark:t,onClick:()=>n("referral"),children:[Q.jsx(Kf,{children:"🔗"}),Q.jsx(Jf,{children:"Реферальная система"}),Q.jsx(Zf,{children:"運"})]}),Q.jsxs(Gf,{$isDark:t,onClick:()=>n("faq"),children:[Q.jsx(Kf,{children:"❓"}),Q.jsx(Jf,{children:"FAQ"}),Q.jsx(Zf,{children:"智"})]}),Q.jsxs(Gf,{$isDark:t,onClick:()=>n("instructions"),children:[Q.jsx(Kf,{children:"📖"}),Q.jsx(Jf,{children:"Инструкции"}),Q.jsx(Zf,{children:"學"})]}),Q.jsxs(Gf,{$isDark:t,onClick:()=>n("exchange-rate"),children:[Q.jsx(Kf,{children:"📊"}),Q.jsx(Jf,{children:"Курс юаня"}),Q.jsx(Zf,{children:"匯"})]}),Q.jsxs(Gf,{$isDark:t,onClick:()=>n("reviews"),children:[Q.jsx(Kf,{children:"⭐"}),Q.jsx(Jf,{children:"Отзывы"}),Q.jsx(Zf,{children:"譽"})]})]})]})]})},ox=()=>{var e,r,t;try{return(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.HapticFeedback)&&(null==(t=window.Telegram.WebApp)?void 0:t.version)&&parseFloat(window.Telegram.WebApp.version)>=6.1}catch{return!1}},ix=()=>{var e,r,t;try{return(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.BackButton)&&(null==(t=window.Telegram.WebApp)?void 0:t.version)&&parseFloat(window.Telegram.WebApp.version)>=6.1}catch{return!1}},lx={success:()=>{if(ox())try{window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")}catch(e){console.log("HapticFeedback not available")}},error:()=>{if(ox())try{window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy")}catch(e){console.log("HapticFeedback not available")}},light:()=>{if(ox())try{window.Telegram.WebApp.HapticFeedback.impactOccurred("light")}catch(e){console.log("HapticFeedback not available")}},medium:()=>{if(ox())try{window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")}catch(e){console.log("HapticFeedback not available")}},heavy:()=>{if(ox())try{window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy")}catch(e){console.log("HapticFeedback not available")}},notification:()=>{if(ox())try{window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")}catch(e){console.log("HapticFeedback not available")}},warning:()=>{if(ox())try{window.Telegram.WebApp.HapticFeedback.notificationOccurred("warning")}catch(e){console.log("HapticFeedback not available")}},errorNotification:()=>{if(ox())try{window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")}catch(e){console.log("HapticFeedback not available")}},selection:()=>{if(ox())try{window.Telegram.WebApp.HapticFeedback.selectionChanged()}catch(e){console.log("HapticFeedback not available")}}},sx=Bf`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;Bf`
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`,Bf`
  0% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
  50% { 
    text-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta); 
  }
  100% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
`;const dx=Mf.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 0px;
  }
`,cx=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
  padding: 0 16px;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`,px=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;
  
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
  }
`,ux=Mf.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }

  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,fx=Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--bg-primary);
`,xx=Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,hx=Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,mx=Mf.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`,gx=Mf.div`
  position: relative;
  z-index: 2;
  margin-bottom: 30px;
  background: var(--bg-card);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  margin: 0 16px 30px 16px;
`,bx=Mf.div`
  width: 100%;
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
`,vx=Mf.div`
  height: 100%;
  background: linear-gradient(90deg, var(--matte-red), var(--terracotta));
  border-radius: 4px;
  width: ${e=>e.$progress}%;
  transition: width 0.5s ease;
  box-shadow: 0 0 10px var(--glow-red);
`,yx=Mf.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
`,wx=Mf.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: start;
  margin-top: 15px;
  gap: 12px;
  padding: 0 8px;
  
  @media (max-width: 480px) {
    gap: 8px;
    padding: 0 4px;
  }
`,kx=Mf.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 0 4px;
  justify-self: center;
  
  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 6px;
    transition: all 0.3s ease;
    flex-shrink: 0;
    
    ${e=>e.$completed?Lf`
      background: var(--matte-red);
      color: var(--bg-primary);
      box-shadow: 0 0 10px var(--glow-red);
    `:e.$active?Lf`
      background: var(--terracotta);
      color: var(--bg-primary);
      box-shadow: 0 0 8px var(--glow-terracotta);
    `:Lf`
      background: var(--bg-secondary);
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
    `}
  }
  
  .step-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-align: center;
    font-weight: 500;
    line-height: 1.2;
    white-space: normal;
    word-break: keep-all;
    overflow: visible;
    max-width: 110px;
    min-height: 1.2em;
    
    ${e=>(e.$active||e.$completed)&&Lf`
      color: var(--text-primary);
      font-weight: 600;
    `}
    
    @media (max-width: 480px) {
      font-size: 0.7rem;
      line-height: 1.1;
    }
  }
`,jx=Mf.form`
  position: relative;
  z-index: 2;
  background: var(--bg-card);
  border-radius: 16px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  margin: 0 16px;
  animation: ${sx} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`,Sx=Mf.div`
  display: ${e=>e.$active?"block":"none"};
  animation: ${sx} 0.4s ease-out;
`,zx=Mf.label`
  display: block;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-weight: 600;
`,$x=Mf.div`
  margin-bottom: 16px;
`,Cx=Mf.input`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background: var(--bg-card);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`,Ex=Mf.select`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  font-family: 'Inter', Arial, sans-serif;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a23b3b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 20px;
  padding-right: 50px;
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background-color: var(--bg-card);
  }
  
  &:hover {
    border-color: var(--matte-red);
    background-color: var(--bg-card);
  }
  
  option {
    background: var(--bg-primary);
    color: var(--text-primary);
    padding: 10px;
    font-family: 'Inter', Arial, sans-serif;
    border: none;
    font-size: 1rem;
  }
  
  option:first-child {
    color: var(--text-secondary);
  }
  
  option:checked {
    background: var(--matte-red);
    color: var(--bg-primary);
  }
`,_x=Mf.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 100px;
  resize: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  font-family: 'Inter', Arial, sans-serif;
  overflow: hidden;
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background: var(--bg-card);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`,Dx=Mf.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 5px;
`,Tx=Mf.button`
  flex: 1;
  padding: 16px 20px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  min-height: 48px;
  
  @media (max-width: 480px) {
    padding: 14px 18px;
    font-size: 0.95rem;
    min-height: 44px;
  }
  
  ${e=>"primary"===e.$variant?Lf`
      background: var(--matte-red);
      color: var(--bg-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card);
      
      &:hover {
        transform: translateY(-3px);
        background: var(--terracotta);
        box-shadow: 
          0 8px 20px var(--shadow-card),
          0 4px 12px var(--shadow-soft);
        border-color: var(--matte-red);
      }
      
      &:focus {
        outline: none;
        background: var(--matte-red);
        color: var(--bg-primary);
        box-shadow: 
          0 4px 12px var(--shadow-soft),
          0 2px 6px var(--shadow-card);
        border-color: var(--border-color);
        transform: none;
      }
    `:Lf`
      background: var(--bg-card);
      color: var(--text-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card);
      
      &:hover {
        transform: translateY(-3px);
        background: var(--sand);
        box-shadow: 
          0 8px 20px var(--shadow-card),
          0 4px 12px var(--shadow-soft);
        border-color: var(--matte-red);
      }
      
      &:focus {
        outline: none;
        background: var(--bg-card);
        color: var(--text-primary);
        box-shadow: 
          0 4px 12px var(--shadow-soft),
          0 2px 6px var(--shadow-card);
        border-color: var(--border-color);
        transform: none;
      }
    `}
  
  &:active {
    transform: scale(0.98) !important;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`,Nx=Mf.div`
  display: flex;
  gap: 12px;
  margin-top: 25px;
  
  @media (max-width: 480px) {
    gap: 10px;
    margin-top: 5px;
  }
`,Px=Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  animation: ${sx} 0.3s ease-out;
  padding: 80px 0 0 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`,Ix=Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 90%;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${e=>e.$modalPosition.top};
  left: 50%;
  transform: ${e=>e.$modalPosition.transform} translateX(-50%);
  
  /* Плавная анимация появления */
  animation: successModalSlideIn 0.4s ease-out;
  
  @keyframes successModalSlideIn {
    from {
      opacity: 0;
      transform: ${e=>e.$modalPosition.transform} translateX(-50%) scale(0.97);
    }
    to {
      opacity: 1;
      transform: ${e=>e.$modalPosition.transform} translateX(-50%) scale(1);
    }
  }
`,Ax=Mf.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`,Fx=Mf.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`,Lx=Mf.div`
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${sx} 0.6s ease-out 0.2s both;
`,Rx=Mf.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
  background: linear-gradient(135deg, var(--matte-red), var(--terracotta));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`,Ox=Mf.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 25px;
`,Mx=Mf.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-card);
  }
`,Yx=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px 20px;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  
  &:hover {
    background: var(--sand);
    border-color: var(--matte-red);
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    background: var(--sand);
    border-color: var(--matte-red);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`,Bx=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px 20px;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  
  &:hover {
    background: var(--sand);
    border-color: var(--matte-red);
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    background: var(--sand);
    border-color: var(--matte-red);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`,Wx=Mf.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 15px;
`,Ux=Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  animation: ${sx} 0.3s ease-out;
  padding: 12px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`,Hx=Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 94vw;
  max-height: calc(100vh - 48px);
  width: 94vw;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateY(var(--scroll-position, 0px)) translateX(-50%);
  display: flex;
  flex-direction: column;
  
  /* Плавная анимация появления */
  animation: modalSlideIn 0.4s ease-out;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(1);
    }
  }
`,qx=Mf.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,Vx=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`,Qx=Mf.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 24px 28px 24px;
`,Xx=Mf.video`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin: 0 auto;
  margin-top: 20px;
  display: block;
`,Gx=Mf.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin-top: 16px;
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-card);
  }
`,Kx=Mf.button`
  background: ${e=>e.$isDark?"var(--bg-secondary)":"transparent"};
  border: 1px solid var(--matte-red);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  color: var(--matte-red);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-sizing: border-box;
  
  &:hover {
    background: var(--matte-red);
    color: white;
  }
`,Jx=Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 95vw;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateY(var(--scroll-position, 0px)) translateX(-50%);
  display: flex;
  flex-direction: column;
  
  /* Плавная анимация появления */
  animation: linkHelpModalSlideIn 0.4s ease-out;
  
  @keyframes linkHelpModalSlideIn {
    from {
      opacity: 0;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(1);
    }
  }
`,Zx=Mf.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,eh=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`,rh=Mf.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`,th=Mf.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
`,nh=Mf.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  counter-reset: link-step;
`,ah=Mf.li`
  counter-increment: link-step;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 14px 16px;
  border-radius: 14px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);

  &::before {
    content: counter(link-step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--matte-red);
    color: var(--bg-primary);
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }
`,oh=Mf.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
  }
`,ih=Mf.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin: 0 auto;
  display: block;
`,lh=Mf.div`
  background: var(--bg-card);
  border: 2px solid ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: ${e=>e.$isDark?"0 0 15px rgba(162, 59, 59, 0.4), 0 2px 8px var(--shadow-soft)":"0 0 12px rgba(139, 69, 19, 0.3), 0 2px 8px var(--shadow-soft)"};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${e=>e.$isDark?"0 0 20px rgba(162, 59, 59, 0.6), 0 4px 12px var(--shadow-card)":"0 0 18px rgba(139, 69, 19, 0.5), 0 4px 12px var(--shadow-card)"};
    transform: translateY(-2px);
  }
`,sh=Mf.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,dh=Mf.h4`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`,ch=Mf.button`
  background: var(--matte-red);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: ${e=>e.$isDark?"#000000":"#FFFFFF"};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--terracotta);
    transform: scale(1.1);
  }
`,ph=Mf.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`,uh=Mf.button`
  background: var(--bg-card);
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  padding: 20px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 8px;
  outline: none;
  
  &:hover {
    border-color: var(--matte-red);
    background: var(--sand);
    color: var(--matte-red);
  }
  
  &:active {
    transform: scale(0.98);
    border-color: var(--matte-red);
    background: var(--sand);
    color: var(--matte-red);
  }
  
  /* Полностью убираем фокус */
  &:focus {
    outline: none;
    border-color: var(--border-color);
    background: var(--bg-card);
    color: var(--text-primary);
    box-shadow: none;
    transform: none;
  }
`,fh=Mf.div`
  display: flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 8px;
  width: 100%;
  box-shadow: 0 2px 8px var(--shadow-soft);
  backdrop-filter: blur(10px);
`,xh=Mf.button`
  background: var(--matte-red);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: ${e=>e.$isDark?"#000000":"#FFFFFF"};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:hover {
    background: var(--terracotta);
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
    background: var(--matte-red);
    color: white;
    transform: none;
  }
  
  &:active {
    transform: scale(0.95);
    background: var(--terracotta);
  }
`,hh=Mf.div`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  padding: 0 16px;
`,mh=Mf.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
`;Mf.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 0 22px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`,Mf.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.73rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(218, 162, 148, 0.16);
  color: var(--matte-red);
  padding: 4px 10px;
  border-radius: 999px;
  width: fit-content;
  font-weight: 600;
  opacity: 0.85;
`,Mf.h4`
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.45;
`,Mf.p`
  font-size: 0.94rem;
  color: rgba(255, 255, 255, 0.72);
  margin: 0;
  line-height: 1.6;
`,Mf.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);

  &::before {
    content: '💡';
    font-size: 1.15rem;
  }

  strong {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
  }
`,Mf.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.78);
`,Mf.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.96rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);

  &::before {
    content: '📹';
    font-size: 1.15rem;
  }
`,Mf.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  counter-reset: video-step;
`,Mf.li`
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 10px;
  align-items: flex-start;
  counter-increment: video-step;
  line-height: 1.5;

  &::before {
    content: counter(video-step);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(218, 162, 148, 0.2);
    color: var(--matte-red);
    font-weight: 600;
    font-size: 0.85rem;
  }
`,Mf.div`
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.78);

  strong {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
  }
`,Mf.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
`,Mf.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
`,Mf.span`
  font-family: 'Inter', Arial, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(118, 61, 62, 0.16);
  color: var(--matte-red);
  padding: 5px 12px;
  border-radius: 999px;
  font-weight: 600;
  width: fit-content;
`,Mf.h4`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.45;
`,Mf.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.93rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.55;
`;const gh=Mf.div`
  margin-top: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed var(--border-color);
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }
`,bh=Mf.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: left;
`;Mf.h5`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;const vh=Mf.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  counter-reset: video-guide-step;
`,yh=Mf.li`
  counter-increment: video-guide-step;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 14px 16px;
  border-radius: 14px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);

  &::before {
    content: counter(video-guide-step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--matte-red);
    color: var(--bg-primary);
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }
`,wh=Mf.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
  }
`,kh=Mf.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`,jh=Mf.button`
  background: var(--matte-red);
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);

  &:hover {
    background: var(--terracotta);
    transform: translateY(-1px);
  }
`,Sh=({onNavigate:e,toggleTheme:r,isDarkTheme:t,onModalStateChange:n})=>{const[a,o]=O.useState(1),[i,l]=O.useState({items:[{productLink:"",productSize:"",quantity:1}],name:"",phone:"",address:"",pickupPoint:"",comments:"",trackingNumber:""}),[s,d]=O.useState({}),[c,p]=O.useState(!1),[u,f]=O.useState(!1),[x,h]=O.useState(!1),[m,g]=O.useState(!1),[b,v]=O.useState({top:"50%",transform:"translateY(-50%)"}),[y,w]=O.useState({top:"50%",transform:"translateY(-50%)"}),[k,j]=O.useState({top:"50%",transform:"translateY(-50%)"}),[S,z]=O.useState(!1),$=()=>{l(e=>({...e,items:[...e.items,{productLink:"",productSize:"",quantity:1}]})),setTimeout(()=>{document.body.click()},50)},C=(e,r,t)=>{l(n=>({...n,items:n.items.map((n,a)=>a===e?{...n,[r]:t}:n)})),setTimeout(()=>{document.body.click()},50)},E=[{number:1,label:"Товары",title:"Товары в заказе"},{number:2,label:"Контактные данные",title:"Контактные данные"},{number:3,label:"Доставка",title:"Адрес доставки"},{number:4,label:"Подтверждение",title:"Подтверждение заказа"}],_=a/E.length*100;O.useEffect(()=>{4===a&&(f(!1),document.body.style.overflow="")},[a]);const D=e=>{const r={};switch(e){case 1:i.items.forEach((e,t)=>{e.productLink.trim()?e.productLink.includes("poizon.com")||e.productLink.includes("dewu.com")||(r[`item_${t}_link`]="Ссылка должна быть с Poizon или Dewu"):r[`item_${t}_link`]="Введите ссылку на товар",e.productSize.trim()||(r[`item_${t}_size`]="Введите размер товара"),e.quantity<=0?r[`item_${t}_quantity`]="Количество должно быть больше 0":e.quantity>999999999&&(r[`item_${t}_quantity`]="Слишком большое количество")});break;case 2:if(i.name.trim()||(r.name="Введите ваше имя"),i.phone.trim()){const e=i.phone.replace(/\D/g,"");11===e.length&&e.startsWith("7")||(r.phone="Введите корректный номер телефона")}else r.phone="Введите номер телефона";break;case 3:i.address.trim()||(r.address="Введите адрес доставки"),i.pickupPoint.trim()||(r.pickupPoint="Выберите пункт выдачи")}return d(r),0===Object.keys(r).length},T=(e,r)=>{l(t=>({...t,[e]:r})),s[e]&&d(r=>({...r,[e]:""}))},N=()=>{lx.selection(),h(!1),null==n||n(!1),document.body.style.overflow=""},P=()=>{lx.selection(),g(!1),null==n||n(!1),document.body.style.overflow=""};return Q.jsxs(dx,{children:[Q.jsxs(cx,{children:[Q.jsx(px,{onClick:()=>e("main"),children:"‹"}),Q.jsx(mx,{children:"Сделать заказ"}),Q.jsxs(ux,{onClick:r,children:[Q.jsx(xx,{$isDark:t,children:"🌙"}),Q.jsx(hx,{$isDark:t,children:"☀️"}),Q.jsx(fx,{$isDark:t})]})]}),Q.jsxs(gx,{children:[Q.jsx(bx,{children:Q.jsx(vx,{$progress:_})}),Q.jsxs(yx,{children:["Шаг ",a," из ",E.length,": ",E[a-1].title]}),Q.jsx(wx,{children:E.map(e=>Q.jsxs(kx,{$active:a===e.number,$completed:a>e.number,children:[Q.jsx("div",{className:"step-number",children:a>e.number?"✓":e.number}),Q.jsx("div",{className:"step-label",children:e.label})]},e.number))})]}),Q.jsxs(jx,{children:[Q.jsxs(Sx,{$active:1===a,children:[Q.jsx(zx,{children:"Товары в заказе*"}),i.items.map((e,r)=>Q.jsxs(lh,{$isDark:t,children:[Q.jsxs(sh,{children:[Q.jsxs(dh,{children:["Товар ",r+1]}),i.items.length>1&&Q.jsx(ch,{$isDark:t,type:"button",onClick:()=>(e=>{i.items.length>1&&l(r=>({...r,items:r.items.filter((r,t)=>t!==e)}))})(r),children:"✕"})]}),Q.jsxs($x,{children:[Q.jsx(zx,{htmlFor:`item_${r}_link`,children:"Ссылка на товар*"}),Q.jsx(Cx,{type:"url",id:`item_${r}_link`,value:e.productLink,onChange:e=>C(r,"productLink",e.target.value),placeholder:"https://poizon.com/...",required:!0}),s[`item_${r}_link`]&&Q.jsx(Dx,{children:s[`item_${r}_link`]})]}),Q.jsxs(ph,{children:[Q.jsxs($x,{children:[Q.jsx(zx,{htmlFor:`item_${r}_size`,children:"Размер*"}),Q.jsx(Cx,{type:"text",id:`item_${r}_size`,value:e.productSize,onChange:e=>C(r,"productSize",e.target.value),placeholder:"L, M, S, 42, 43, 44..."}),s[`item_${r}_size`]&&Q.jsx(Dx,{children:s[`item_${r}_size`]})]}),Q.jsxs($x,{children:[Q.jsx(zx,{htmlFor:`item_${r}_quantity`,children:"Количество*"}),Q.jsxs(fh,{children:[Q.jsx(xh,{type:"button",onMouseDown:()=>C(r,"quantity",Math.max(1,e.quantity-1)),$isDark:t,children:"−"}),Q.jsx(hh,{children:e.quantity}),Q.jsx(xh,{type:"button",onMouseDown:()=>C(r,"quantity",Math.min(999,e.quantity+1)),$isDark:t,children:"+"})]}),s[`item_${r}_quantity`]&&Q.jsx(Dx,{children:s[`item_${r}_quantity`]})]})]})]},r)),Q.jsx(uh,{type:"button",onMouseDown:$,onTouchStart:$,children:"+ Добавить товар"}),Q.jsxs(Wx,{children:[Q.jsx(Yx,{type:"button",onClick:()=>{lx.selection(),z(!1),v({top:"50%",transform:"translateY(-50%)"}),h(!0),null==n||n(!0),document.body.style.overflow="hidden"},children:"Видео-инструкция 📹"}),Q.jsx(Bx,{type:"button",onClick:()=>{lx.selection(),w({top:"50%",transform:"translateY(-50%)"}),g(!0),null==n||n(!0),document.body.style.overflow="hidden"},children:"Где найти ссылку 🔗"})]}),Q.jsx("div",{style:{marginTop:"24px"}})]}),Q.jsxs(Sx,{$active:2===a,children:[Q.jsx(zx,{htmlFor:"name",children:"ФИО*"}),Q.jsx(Cx,{type:"text",id:"name",value:i.name,onChange:e=>T("name",e.target.value),placeholder:"Иванов Иван Иванович",required:!0}),s.name&&Q.jsx(Dx,{children:s.name}),Q.jsxs("div",{style:{marginTop:"16px"},children:[Q.jsx(zx,{htmlFor:"phone",children:"Номер телефона*"}),Q.jsx(Cx,{type:"tel",id:"phone",value:i.phone,onChange:e=>{const r=(e=>{let r=e.replace(/[^\d+]/g,"");if(0===r.length)return"";if(r.startsWith("+")){const e=r.slice(1);if(e.startsWith("7")||e.startsWith("8")){let r=e.startsWith("8")?"7"+e.slice(1):e;return r=r.slice(0,11),0===r.length||1===r.length?"+7":r.length<=4?`+7 (${r.slice(1)}`:r.length<=7?`+7 (${r.slice(1,4)}) ${r.slice(4)}`:r.length<=9?`+7 (${r.slice(1,4)}) ${r.slice(4,7)}-${r.slice(7)}`:`+7 (${r.slice(1,4)}) ${r.slice(4,7)}-${r.slice(7,9)}-${r.slice(9,11)}`}return r}if(r.startsWith("7")||r.startsWith("8")){let e=r.startsWith("8")?"7"+r.slice(1):r;return e=e.slice(0,11),0===e.length?"":1===e.length?"+7":e.length<=4?`+7 (${e.slice(1)}`:e.length<=7?`+7 (${e.slice(1,4)}) ${e.slice(4)}`:e.length<=9?`+7 (${e.slice(1,4)}) ${e.slice(4,7)}-${e.slice(7)}`:`+7 (${e.slice(1,4)}) ${e.slice(4,7)}-${e.slice(7,9)}-${e.slice(9,11)}`}let t=r.slice(0,10);return 0===t.length?"":t.length<=3?`+7 (${t}`:t.length<=6?`+7 (${t.slice(0,3)}) ${t.slice(3)}`:t.length<=8?`+7 (${t.slice(0,3)}) ${t.slice(3,6)}-${t.slice(6)}`:`+7 (${t.slice(0,3)}) ${t.slice(3,6)}-${t.slice(6,8)}-${t.slice(8,10)}`})(e.target.value);T("phone",r)},placeholder:"+7 ( ___ ) ___ - __ - __",required:!0}),s.phone&&Q.jsx(Dx,{children:s.phone})]}),Q.jsx("div",{style:{marginTop:"24px"}})]}),Q.jsxs(Sx,{$active:3===a,children:[Q.jsx(zx,{htmlFor:"address",children:"Адрес доставки*"}),Q.jsx(Cx,{type:"text",id:"address",value:i.address,onChange:e=>T("address",e.target.value),placeholder:"Введите полный адрес доставки",required:!0}),s.address&&Q.jsx(Dx,{children:s.address}),Q.jsxs("div",{style:{marginTop:"16px"},children:[Q.jsx(zx,{htmlFor:"pickupPoint",children:"Пункт выдачи*"}),Q.jsxs(Ex,{id:"pickupPoint",value:i.pickupPoint,onChange:e=>T("pickupPoint",e.target.value),required:!0,children:[Q.jsx("option",{value:"",children:"Выберите пункт выдачи"}),Q.jsx("option",{value:"СДЭК",children:"СДЭК"}),Q.jsx("option",{value:"Яндекс доставка",children:"Яндекс доставка"}),Q.jsx("option",{value:"Почта России",children:"Почта России"})]}),s.pickupPoint&&Q.jsx(Dx,{children:s.pickupPoint})]}),Q.jsxs("div",{style:{marginTop:"16px"},children:[Q.jsx(zx,{htmlFor:"comments",children:"Комментарии к заказу"}),Q.jsx(_x,{id:"comments",value:i.comments,onChange:e=>{T("comments",e.target.value),e.target.style.height="auto",e.target.style.height=e.target.scrollHeight+"px"},placeholder:"Дополнительная информация, пожелания по доставке...",rows:3})]}),Q.jsx("div",{style:{marginTop:"24px"}})]}),Q.jsx(Sx,{$active:4===a,children:Q.jsxs("div",{style:{marginBottom:"20px"},children:[Q.jsx("h3",{style:{color:"var(--text-primary)",marginBottom:"15px"},children:"Проверьте данные заказа:"}),Q.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"20px",borderRadius:"16px",marginBottom:"16px",border:"1px solid var(--border-color)",boxShadow:"0 4px 12px var(--shadow-soft)"},children:[Q.jsxs("div",{style:{color:"var(--text-primary)",fontSize:"1.1rem",fontWeight:"600",marginBottom:"15px",paddingBottom:"8px",borderBottom:"1px solid var(--border-color)"},children:["Товары (",i.items.length,"):"]}),i.items.map((e,r)=>Q.jsxs("div",{style:{marginTop:"12px",padding:"15px",background:t?"var(--bg-card)":"#FFFFFF",borderRadius:"12px",border:"2px solid "+(t?"var(--matte-red)":"var(--terracotta)"),boxShadow:t?"0 0 15px rgba(162, 59, 59, 0.3), 0 2px 8px var(--shadow-soft)":"0 0 12px rgba(139, 69, 19, 0.2), 0 2px 8px var(--shadow-soft)"},children:[Q.jsxs("div",{style:{marginBottom:"8px"},children:[Q.jsxs("strong",{children:["Товар ",r+1,":"]})," ",e.productLink]}),e.productSize&&Q.jsxs("div",{style:{marginBottom:"8px"},children:[Q.jsx("strong",{children:"Размер:"})," ",e.productSize]}),Q.jsxs("div",{children:[Q.jsx("strong",{children:"Количество:"})," ",e.quantity]})]},r))]}),Q.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"20px",borderRadius:"16px",marginBottom:"16px",border:"1px solid var(--border-color)",boxShadow:"0 4px 12px var(--shadow-soft)"},children:[Q.jsx("div",{style:{color:"var(--text-primary)",fontSize:"1.1rem",fontWeight:"600",marginBottom:"15px",paddingBottom:"8px",borderBottom:"1px solid var(--border-color)"},children:"Контактные данные:"}),Q.jsxs("div",{style:{lineHeight:"1.6"},children:[Q.jsxs("div",{style:{marginBottom:"8px"},children:[Q.jsx("strong",{children:"Имя:"})," ",i.name]}),Q.jsxs("div",{children:[Q.jsx("strong",{children:"Телефон:"})," ",i.phone]})]})]}),Q.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"20px",borderRadius:"16px",marginBottom:"16px",border:"1px solid var(--border-color)",boxShadow:"0 4px 12px var(--shadow-soft)"},children:[Q.jsx("div",{style:{color:"var(--text-primary)",fontSize:"1.1rem",fontWeight:"600",marginBottom:"15px",paddingBottom:"8px",borderBottom:"1px solid var(--border-color)"},children:"Доставка:"}),Q.jsxs("div",{style:{lineHeight:"1.6"},children:[Q.jsxs("div",{style:{marginBottom:"8px"},children:[Q.jsx("strong",{children:"Адрес:"})," ",i.address]}),Q.jsxs("div",{children:[Q.jsx("strong",{children:"Пункт выдачи:"})," ",i.pickupPoint]})]})]}),i.comments&&Q.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"20px",borderRadius:"16px",marginBottom:"16px",border:"1px solid var(--border-color)",boxShadow:"0 4px 12px var(--shadow-soft)"},children:[Q.jsx("div",{style:{color:"var(--text-primary)",fontSize:"1.1rem",fontWeight:"600",marginBottom:"15px",paddingBottom:"8px",borderBottom:"1px solid var(--border-color)"},children:"Комментарии:"}),Q.jsx("div",{style:{lineHeight:"1.6"},children:i.comments})]})]})}),Q.jsxs(Nx,{children:[a>1&&Q.jsx(Tx,{type:"button",onMouseDown:()=>{lx.light(),o(e=>Math.max(e-1,1)),f(!1),setTimeout(()=>{document.body.click()},50)},$variant:"secondary",children:"Назад"}),a<E.length?Q.jsx(Tx,{type:"button",onMouseDown:()=>{if(D(a)){lx.light();const e=Math.min(a+1,E.length);o(e),f(!1)}else lx.error();setTimeout(()=>{document.body.click()},50)},$variant:"primary",children:"Далее"}):Q.jsx(Tx,{type:"button",onMouseDown:async()=>{var e,r,t;if(D(a)){p(!0),lx.medium(),document.activeElement instanceof HTMLElement&&document.activeElement.blur();try{const a=null==(e=window.Telegram)?void 0:e.WebApp,o=null==(r=null==a?void 0:a.initDataUnsafe)?void 0:r.user,s={telegramId:(null==(t=null==o?void 0:o.id)?void 0:t.toString())||"unknown",username:(null==o?void 0:o.username)||"unknown",items:i.items,fullName:i.name,phoneNumber:i.phone,pickupPoint:i.pickupPoint,pickupPointAddress:i.address,comments:i.comments},d=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!d.ok)throw new Error("Ошибка при отправке заказа");{lx.success();const e=await d.json();e.trackingNumber&&l(r=>({...r,trackingNumber:e.trackingNumber}));const r=window.pageYOffset||document.documentElement.scrollTop,t=window.innerHeight;j({top:`${r+t/2}px`,transform:"translateY(-50%)"}),f(!0),null==n||n(!0),document.body.style.overflow="hidden"}}catch(o){lx.error(),alert("Произошла ошибка при оформлении заказа. Попробуйте еще раз.")}finally{p(!1)}}else lx.error()},$variant:"primary",disabled:c,children:c?"Отправка...":"Оформить заказ"})]})]}),u&&4===a&&!c&&Q.jsx(Px,{$modalPosition:k,onClick:()=>{f(!1),null==n||n(!1),document.body.style.overflow=""},children:Q.jsxs(Ix,{$modalPosition:k,onClick:e=>e.stopPropagation(),style:{"--scroll-position":`${window.pageYOffset||document.documentElement.scrollTop}px`},children:[Q.jsx(Ax,{children:Q.jsx(Rx,{children:"Заказ оформлен!"})}),Q.jsxs(Fx,{children:[Q.jsx(Lx,{children:"🎉"}),Q.jsx(Ox,{children:"Ваш заказ успешно создан! Менеджер свяжется с вами в ближайшее время для подтверждения и оплаты."}),i.trackingNumber&&Q.jsxs("div",{style:{margin:"20px 0",padding:"16px",background:"linear-gradient(135deg, rgba(162, 59, 59, 0.1), rgba(157, 78, 61, 0.05))",borderRadius:"12px",border:"2px solid var(--matte-red)",textAlign:"center"},children:[Q.jsx("div",{style:{fontSize:"1rem",color:"var(--text-secondary)",marginBottom:"8px",fontWeight:"500"},children:"🔍 Номер отслеживания:"}),Q.jsx("div",{onClick:async()=>{try{await navigator.clipboard.writeText(i.trackingNumber),lx.success()}catch(e){console.error("Failed to copy tracking number:",e),lx.error()}},style:{fontSize:"1.4rem",fontWeight:"bold",color:"var(--matte-red)",fontFamily:"JetBrains Mono, monospace",letterSpacing:"2px",cursor:"pointer",padding:"8px 12px",borderRadius:"8px",transition:"all 0.3s ease",backgroundColor:"transparent",border:"1px solid transparent"},onMouseEnter:e=>{e.currentTarget.style.backgroundColor="var(--bg-card)",e.currentTarget.style.borderColor="var(--matte-red)"},onMouseLeave:e=>{e.currentTarget.style.backgroundColor="transparent",e.currentTarget.style.borderColor="transparent"},children:i.trackingNumber}),Q.jsx("div",{style:{fontSize:"0.9rem",color:"var(--text-secondary)",marginTop:"8px"},children:"Сохраните этот номер для отслеживания заказа"}),Q.jsx("div",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",marginTop:"4px",fontStyle:"italic"},children:"💡 Нажмите на номер для копирования"})]}),Q.jsx(Mx,{onClick:()=>{lx.light(),f(!1),null==n||n(!1),e("main"),document.body.style.overflow=""},children:"Супер!"})]})]})}),x&&Q.jsx(Ux,{$modalPosition:b,onClick:N,children:Q.jsxs(Hx,{$modalPosition:b,style:{"--scroll-position":`${window.pageYOffset||document.documentElement.scrollTop}px`},onClick:e=>e.stopPropagation(),children:[Q.jsxs(qx,{children:[Q.jsx(Vx,{children:"Видео-инструкция"}),Q.jsx(Kx,{onClick:N,$isDark:t,children:"×"})]}),Q.jsxs(Qx,{children:[Q.jsx(mh,{children:"Смотрите пошаговую инструкцию по оформлению заказа"}),!S&&Q.jsxs(gh,{children:["Если видео не загружается, нажмите ",Q.jsx("strong",{children:"«Показать текстовую инструкцию»"})]}),S?Q.jsxs(bh,{children:[Q.jsxs(vh,{children:[Q.jsx(yh,{children:Q.jsxs(wh,{children:["Выберите интересующий товар в ",Q.jsx("strong",{children:"Poizon / Dewu"})," и откройте карточку."]})}),Q.jsx(yh,{children:Q.jsx(wh,{children:"Скопируйте ссылку на товар из приложения."})}),Q.jsx(yh,{children:Q.jsx(wh,{children:"Выберите подходящий размер и количество позиций."})}),Q.jsx(yh,{children:Q.jsx(wh,{children:"Заполните контактные данные, чтобы менеджер смог связаться с вами."})}),Q.jsx(yh,{children:Q.jsx(wh,{children:"Укажите адрес доставки или пункт выдачи и подтвердите заказ."})})]}),Q.jsxs(gh,{children:["📞 Нужна помощь? Свяжитесь с нашим менеджером в Telegram.",Q.jsx(kh,{children:Q.jsx(jh,{onClick:()=>{var e,r;lx.selection(),(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.openTelegramLink)?window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager"):window.open("https://t.me/poizonic_manager","_blank")},children:"Связаться"})})]})]}):Q.jsxs(Xx,{controls:!0,preload:"metadata",onError:e=>{console.log("Видео не загрузилось, показываем текстовую инструкцию"),z(!0)},onLoadStart:()=>{console.log("Начинаем загрузку видео...")},onCanPlay:()=>{console.log("Видео готово к воспроизведению")},children:[Q.jsx("source",{src:"/images/tutorial.mp4",type:"video/mp4"}),Q.jsx("source",{src:"/images/tutorial.MOV",type:"video/quicktime"}),"Ваш браузер не поддерживает воспроизведение видео."]}),!S&&Q.jsx(Gx,{onClick:()=>{lx.light(),z(!0)},style:{background:"var(--sand)",color:"var(--text-primary)",marginRight:"10px"},children:"Показать текстовую инструкцию"}),!S&&Q.jsxs(gh,{style:{marginTop:"24px"},children:["📞 Нужна помощь? Свяжитесь с нашим менеджером в Telegram.",Q.jsx(kh,{children:Q.jsx(jh,{onClick:()=>{var e,r;lx.selection(),(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.openTelegramLink)?window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager"):window.open("https://t.me/poizonic_manager","_blank")},children:"Связаться"})})]})]})]})}),m&&Q.jsx(Ux,{$modalPosition:y,onClick:P,children:Q.jsxs(Jx,{$modalPosition:y,style:{"--scroll-position":`${window.pageYOffset||document.documentElement.scrollTop}px`},onClick:e=>e.stopPropagation(),children:[Q.jsxs(Zx,{children:[Q.jsx(eh,{children:"Где найти ссылку"}),Q.jsx(Kx,{onClick:P,$isDark:t,children:"×"})]}),Q.jsxs(rh,{children:[Q.jsx(th,{children:Q.jsxs(nh,{children:[Q.jsx(ah,{children:Q.jsxs(oh,{children:["Нажмите на кнопку ",Q.jsx("strong",{children:"справа сверху"})," (она отмечена на фото)"]})}),Q.jsx(ah,{children:Q.jsxs(oh,{children:["Выберите ",Q.jsx("strong",{children:"вторую слева кнопку"})," со значком скрепки — ссылка автоматически скопируется в буфер обмена"]})})]})}),Q.jsx(ih,{src:"/images/HelpImage.JPEG",alt:"Инструкция по поиску ссылки",onError:e=>{console.log("Изображение не загрузилось"),e.currentTarget.style.display="none"}})]})]})})]})},zh=Bf`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`,$h=Bf`
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`;Bf`
  0% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
  50% { 
    text-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta); 
  }
  100% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
`;const Ch=Mf.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 16px 100px 16px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

`,Eh=Mf.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
  background: var(--bg-card);
  border-radius: 16px;
  padding: 35px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${zh} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`,_h=Mf.label`
  display: block;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-weight: 600;
`,Dh=Mf.input`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background: var(--bg-card);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`,Th=Mf.select`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  font-family: 'Inter', Arial, sans-serif;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a23b3b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 20px;
  padding-right: 50px;
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background-color: var(--bg-card);
  }
  
  &:hover {
    border-color: var(--matte-red);
    background-color: var(--bg-card);
  }
  
  option {
    background: var(--bg-primary);
    color: var(--text-primary);
  }
`,Nh=Mf.button`
  width: 100%;
  padding: 15px 25px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: none;
  position: relative;
  z-index: 10;
  pointer-events: auto;
  margin-top: 20px;
  
  ${e=>"primary"===e.$variant?Lf`
      background: var(--matte-red) !important;
      color: var(--bg-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card) !important;
      transform: translateY(0) !important;
    `:Lf`
      background: var(--bg-card) !important;
      color: var(--text-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card) !important;
      transform: translateY(0) !important;
    `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: translateY(0) !important;
  }
  
  &:active {
    transform: translateY(1px) !important;
    box-shadow: 
      0 1px 3px var(--shadow-soft),
      0 1px 2px var(--shadow-card) !important;
    background: var(--terracotta) !important;
  }
  
  &:focus {
    outline: none;
    transform: translateY(0) !important;
    box-shadow: 
      0 4px 12px var(--shadow-soft),
      0 2px 6px var(--shadow-card) !important;
    background: var(--matte-red) !important;
  }
`,Ph=Mf.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 25px;
  margin-top: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${zh} 0.6s ease-out;
`,Ih=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
  text-align: center;
`,Ah=Mf.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--matte-red);
    margin-top: 10px;
    padding-top: 15px;
    border-top: 2px solid var(--matte-red);
  }
`,Fh=Mf.span`
  color: var(--text-secondary);
  font-weight: 500;
`,Lh=Mf.span`
  color: var(--text-primary);
  font-weight: 600;
`,Rh=Mf.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background: var(--bg-card);
  border: 2px solid var(--matte-red);
  border-radius: 16px;
  box-shadow: 
    0 8px 25px var(--shadow-card),
    0 4px 12px var(--shadow-soft);
  position: relative;
  overflow: hidden;
  text-align: center;
`,Oh=Mf.span`
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.3rem;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
`,Mh=Mf.span`
  color: var(--matte-red);
  font-weight: 900;
  font-size: 1.5rem;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
  margin-top: 8px;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`,Yh=Mf.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  gap: 20px;
`,Bh=Mf.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`,Wh=Mf.span`
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 4px;
  opacity: 0.8;
`,Uh=Mf.span`
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.7;
`,Hh=Mf.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 5px;
  text-shadow: 0 0 8px var(--glow-red);
`;Mf.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: var(--text-secondary);
`;const qh=Mf.div`
  background: transparent;
  border: 2px solid ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 25px;
  backdrop-filter: blur(5px);
  box-shadow: ${e=>e.$isDark?"0 0 15px rgba(162, 59, 59, 0.3), 0 2px 8px var(--shadow-soft)":"0 0 12px rgba(139, 69, 19, 0.2), 0 2px 8px var(--shadow-soft)"};
`,Vh=Mf.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`,Qh=Mf.div`
  display: flex;
  gap: 15px;
  margin: 25px 0;
  flex-wrap: wrap;
`,Xh=Mf.button`
  flex: 1;
  min-width: 200px;
  padding: 15px 20px;
  border: ${e=>"secondary"===e.$variant?"2px solid var(--matte-red)":"1px solid var(--border-color)"};
  border-radius: 16px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  background: ${e=>"secondary"===e.$variant?"transparent":"var(--bg-card)"};
  color: var(--text-primary);
  box-shadow: ${e=>"secondary"===e.$variant?e.$isDark?"0 0 10px rgba(162, 59, 59, 0.2), 0 2px 6px var(--shadow-card)":"0 0 8px rgba(139, 69, 19, 0.15), 0 2px 6px var(--shadow-card)":"0 4px 12px var(--shadow-soft), 0 2px 6px var(--shadow-card)"};
  
  &:hover {
    transform: translateY(-3px);
    background: ${e=>"secondary"===e.$variant?e.$isDark?"rgba(162, 59, 59, 0.1)":"rgba(139, 69, 19, 0.08)":"var(--sand)"};
    box-shadow: ${e=>"secondary"===e.$variant?e.$isDark?"0 0 15px rgba(162, 59, 59, 0.3), 0 4px 12px var(--shadow-card)":"0 0 12px rgba(139, 69, 19, 0.2), 0 4px 12px var(--shadow-card)":"0 8px 20px var(--shadow-card), 0 4px 12px var(--shadow-soft)"};
    border-color: var(--matte-red);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`,Gh=Mf.button`
  width: 100%;
  background: transparent;
  border: 2px solid var(--matte-red);
  border-radius: 12px;
  padding: 8px 16px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: ${e=>e.$isDark?"0 0 8px rgba(162, 59, 59, 0.2), 0 2px 6px var(--shadow-card)":"0 0 6px rgba(139, 69, 19, 0.15), 0 2px 6px var(--shadow-card)"};
  
  &:hover {
    background: ${e=>e.$isDark?"rgba(162, 59, 59, 0.1)":"rgba(139, 69, 19, 0.08)"};
    border-color: var(--matte-red);
    color: var(--text-primary);
    transform: translateY(-1px);
    box-shadow: ${e=>e.$isDark?"0 0 12px rgba(162, 59, 59, 0.3), 0 4px 12px var(--shadow-card)":"0 0 10px rgba(139, 69, 19, 0.2), 0 4px 12px var(--shadow-card)"};
  }
`;Mf.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  font-family: 'Inter', Arial, sans-serif;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background: var(--bg-card);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`,Mf.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 15px;
  margin-top: 15px;
  backdrop-filter: blur(5px);
`,Mf.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 0.95rem;
`,Mf.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  word-break: break-all;
  opacity: 0.8;
`,Mf.div`
  display: inline-block;
  background: var(--matte-red);
  color: var(--bg-primary);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 8px;
`,Mf.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-top: 15px;
  backdrop-filter: blur(5px);
`,Mf.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 10px;
  margin-top: 15px;
`,Mf.button`
  padding: 10px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: ${e=>e.$selected?"var(--matte-red)":"var(--bg-card)"};
  color: ${e=>e.$selected?"var(--bg-primary)":"var(--text-primary)"};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50px;
  justify-content: center;
  
  &:hover {
    background: ${e=>e.$selected?"var(--terracotta)":"var(--sand)"};
    border-color: var(--matte-red);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,Mf.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 1rem;
`,Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${zh} 0.3s ease-out;
`,Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 20px;
  max-width: 80vw;
  max-height: 80vh;
  width: 80%;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  animation: ${$h} 0.4s ease-out;
  overflow-y: auto;
`,Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
`,Mf.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin: 0 auto;
  display: block;
`,Mf.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
`,Mf.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin-top: 16px;
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-card);
  }
`;const Kh=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`,Jh=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;
  
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
  }
`,Zh=Mf.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`,em=Mf.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }

  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,rm=Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--bg-primary);
`,tm=Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,nm=Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,am=Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  animation: ${zh} 0.3s ease-out;
  padding: 20px;
  padding-top: 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`,om=Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 95vw;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateY(var(--scroll-position, 0px)) translateX(-50%);
  display: flex;
  flex-direction: column;
  
  /* Плавная анимация появления */
  animation: linkHelpModalSlideIn 0.4s ease-out;
  
  @keyframes linkHelpModalSlideIn {
    from {
      opacity: 0;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(1);
    }
  }
`,im=Mf.button`
  background: ${e=>e.$isDark?"var(--bg-secondary)":"transparent"};
  border: 1px solid var(--matte-red);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  color: var(--matte-red);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: var(--matte-red);
    color: white;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`,lm=Mf.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,sm=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`,dm=Mf.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`,cm=Mf.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
`,pm=Mf.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  counter-reset: help-step;
`,um=Mf.li`
  counter-increment: help-step;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 14px 16px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);

  &::before {
    content: counter(help-step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--matte-red);
    color: var(--bg-primary);
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }
`,fm=Mf.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
  }
`,xm=Mf.div`
  margin-top: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed var(--border-color);
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
`,hm=Mf.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin: 0 auto;
  display: block;
`,mm=({onNavigate:e,toggleTheme:r,isDarkTheme:t,onModalStateChange:n})=>{const[a,o]=O.useState(""),[i,l]=O.useState(""),[s,d]=O.useState(null),[c,p]=O.useState(!1),[u,f]=O.useState(""),[x,h]=O.useState(""),[m,g]=O.useState(!1),[b,v]=O.useState({top:"50%",transform:"translateY(-50%)"}),y=[{value:"shoes_clothing",label:"👟 Обувь и верхняя одежда",weight:2.5},{value:"backpacks_bags",label:"🎒 Рюкзаки и сумки",weight:1.875},{value:"hoodies_pants",label:"👕 Толстовки и штаны",weight:1.875},{value:"tshirts_shorts",label:"🩳 Футболки и шорты",weight:1.25},{value:"underwear_socks",label:"🧦 Нижнее белье, носки и головные уборы",weight:1},{value:"accessories_perfume",label:"👜 Аксессуары и духи",weight:1}],w=()=>{const e=document.querySelector('button[type="button"]');e&&(e.blur(),e.style.transform="translateY(0)",e.style.boxShadow="0 4px 12px var(--shadow-soft), 0 2px 6px var(--shadow-card)",e.style.background="var(--matte-red)",e.offsetHeight)},k=async()=>{f(""),h("");let e=!1;if(a){const r=parseFloat(a);(isNaN(r)||r<=0)&&(f("Пожалуйста, введите корректную цену"),e=!0)}else f("Пожалуйста, введите цену товара"),e=!0;if(i||(h("Пожалуйста, выберите категорию товара"),e=!0),e)return void lx.error();const r=y.find(e=>e.value===i);if(!r)return h("Пожалуйста, выберите категорию товара"),void lx.error();const t=parseFloat(a);p(!0),lx.medium();try{const e=await fetch("/api/calculate-price",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({price:t,weight:r.weight,category:r.value})});if(!e.ok){const r=await e.json();throw new Error(r.message||"Ошибка при расчете стоимости")}{const r=await e.json();d(r),lx.success()}}catch(n){lx.error(),f("Произошла ошибка при расчете стоимости. Попробуйте еще раз.")}finally{p(!1)}},j=(e,r)=>{"price"===e&&(o(r),u&&f("")),"category"===e&&(l(r),x&&h(""))},S=e=>{var r,t;lx.medium();const n="brand"===e?"🏷️ У меня товар со знаком ≈ - нужна помощь с расчетом стоимости":"❓ Нет моей категории - нужна помощь с выбором категории";if(null==(t=null==(r=window.Telegram)?void 0:r.WebApp)?void 0:t.openTelegramLink){const e=`https://t.me/poizonic_manager?text=${encodeURIComponent(n)}`;window.Telegram.WebApp.openTelegramLink(e)}else window.open(`https://t.me/poizonic_manager?text=${encodeURIComponent(n)}`,"_blank")};return Q.jsxs(Ch,{children:[Q.jsxs(Kh,{children:[Q.jsx(Jh,{onClick:()=>e("main"),children:"‹"}),Q.jsx(Zh,{children:"Расчет стоимости"}),Q.jsxs(em,{onClick:r,children:[Q.jsx(tm,{$isDark:t,children:"🌙"}),Q.jsx(nm,{$isDark:t,children:"☀️"}),Q.jsx(rm,{$isDark:t})]})]}),Q.jsxs(Eh,{children:[Q.jsx(_h,{htmlFor:"price",children:"Цена товара в юанях*"}),Q.jsx(Dh,{type:"number",id:"price",value:a,onChange:e=>j("price",e.target.value),placeholder:"1000¥",min:"0",step:"0.01"}),u&&Q.jsx(Hh,{children:u}),Q.jsx(Gh,{onClick:()=>{lx.selection(),g(!0),null==n||n(!0),document.body.style.overflow="hidden"},$isDark:t,children:"Где найти цену в юанях ❓"}),Q.jsx(_h,{htmlFor:"category",children:"Категория товара*"}),Q.jsxs(Th,{id:"category",value:i,onChange:e=>j("category",e.target.value),children:[Q.jsx("option",{value:"",disabled:!0,children:"Выберите категорию товара"}),y.map(e=>Q.jsx("option",{value:e.value,children:e.label},e.value))]}),x&&Q.jsx(Hh,{children:x}),Q.jsx(Nh,{onClick:async()=>{await k(),setTimeout(()=>{w()},10)},onMouseUp:w,onTouchStart:e=>{e.currentTarget.style.transform="translateY(1px)",e.currentTarget.style.boxShadow="0 1px 3px var(--shadow-soft), 0 1px 2px var(--shadow-card)",e.currentTarget.style.background="var(--terracotta)"},onTouchEnd:w,onTouchCancel:w,$variant:"primary",disabled:c,children:c?"Расчет...":"Рассчитать стоимость"}),s&&Q.jsxs(Ph,{children:[Q.jsx(Ih,{children:"Результат расчета"}),Q.jsxs(Ah,{children:[Q.jsx(Fh,{children:"Цена в рублях:"}),Q.jsxs(Lh,{children:[s.priceInRubles," ₽"]})]}),Q.jsxs(Ah,{children:[Q.jsx(Fh,{children:"Доставка:"}),Q.jsxs(Lh,{children:[s.deliveryCost," ₽"]})]}),Q.jsxs(Ah,{children:[Q.jsx(Fh,{children:"Комиссия:"}),Q.jsxs(Lh,{children:[s.commission," ₽"]})]}),Q.jsxs(Rh,{children:[Q.jsx(Oh,{children:"Итого к оплате:"}),Q.jsxs(Mh,{children:[s.totalCost," ₽"]})]}),Q.jsxs(Yh,{children:[Q.jsxs(Bh,{children:[Q.jsx(Wh,{children:"Цена товара:"}),Q.jsxs(Uh,{children:[s.originalPrice," ¥"]})]}),Q.jsxs(Bh,{children:[Q.jsx(Wh,{children:"Курс юаня:"}),Q.jsxs(Uh,{children:[s.exchangeRate," ₽"]})]})]})]}),Q.jsxs(Qh,{children:[Q.jsx(Xh,{onClick:()=>S("brand"),$variant:"secondary",$isDark:t,children:"🏷️ У меня товар со знаком ≈"}),Q.jsx(Xh,{onClick:()=>S("category"),$variant:"secondary",$isDark:t,children:"❓ Нет моей категории"})]})]}),Q.jsx(qh,{$isDark:t,children:Q.jsxs(Vh,{children:["💡 ",Q.jsx("strong",{children:"Как рассчитывается стоимость:"}),Q.jsx("br",{}),"• Цена товара переводится в рубли по текущему курсу",Q.jsx("br",{}),"• Добавляется стоимость доставки",Q.jsx("br",{}),"• Включается комиссия сервиса (1000₽ за товар)"]})}),m&&Q.jsx(am,{$modalPosition:b,onClick:()=>{lx.selection(),g(!1),null==n||n(!1),document.body.style.overflow=""},children:Q.jsxs(om,{$modalPosition:b,style:{"--scroll-position":`${window.pageYOffset||document.documentElement.scrollTop}px`},onClick:e=>e.stopPropagation(),children:[Q.jsxs(lm,{children:[Q.jsx(sm,{children:"Где найти цену в юанях?"}),Q.jsx(im,{onClick:()=>{lx.selection(),g(!1),null==n||n(!1),document.body.style.overflow=""},$isDark:t,children:"×"})]}),Q.jsxs(dm,{children:[Q.jsxs(cm,{children:[Q.jsxs(pm,{children:[Q.jsx(um,{children:Q.jsxs(fm,{children:["Выберите нужный товар на ",Q.jsx("strong",{children:"Poizon"})," и откройте его карточку."]})}),Q.jsx(um,{children:Q.jsxs(fm,{children:["Нажмите на ",Q.jsx("strong",{children:"голубую кнопку"})," под фотографией товара, чтобы открыть список размеров."]})}),Q.jsx(um,{children:Q.jsx(fm,{children:"Выберите подходящий размер — после выбора итоговая цена в юанях обновится прямо на голубой кнопке."})})]}),Q.jsxs(xm,{children:["У каждого размера своя стоимость, ориентируйтесь на цену на ",Q.jsx("strong",{children:"голубой кнопке"}),"."]})]}),Q.jsx(hm,{src:"/images/HelpImageCalculator.JPEG",alt:"Пример страницы товара с ценой в юанях",onError:e=>{console.log("Изображение не загрузилось"),e.currentTarget.style.display="none"}})]})]})})]})};Bf`
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  25% { transform: translateY(-8px) translateX(4px) rotate(1deg); }
  50% { transform: translateY(-15px) translateX(-2px) rotate(-1deg); }
  75% { transform: translateY(-5px) translateX(6px) rotate(0.5deg); }
`,Bf`
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;const gm=Bf`
  from { max-height: 0; opacity: 0; }
  to { max-height: 300px; opacity: 1; }
`;Bf`
  0% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
  50% { 
    text-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta); 
  }
  100% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
`;const bm=Mf.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
`,vm=Mf.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`,ym=Mf.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  margin: 0 16px 16px 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border-color: var(--matte-terracotta);
  }
`,wm=Mf.button`
  width: 100%;
  padding: 20px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    background: var(--bg-hover);
  }
`,km=Mf.span`
  flex: 1;
  margin-right: 15px;
  line-height: 1.5;
`,jm=Mf.span`
  font-size: 1.2rem;
  color: var(--matte-terracotta);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${e=>e.$isOpen?"rotate(180deg)":"rotate(0deg)"};
`,Sm=Mf.div`
  max-height: ${e=>e.$isOpen?"300px":"0"};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-hover);
  
  ${e=>e.$isOpen&&Lf`
    animation: ${gm} 0.4s ease-out;
  `}
`,zm=Mf.div`
  padding: 20px;
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  white-space: pre-line;
`,$m=Mf.div`
  background: transparent;
  border: 2px solid var(--matte-red);
  border-radius: 16px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 15px rgba(162, 59, 59, 0.3), 0 2px 8px var(--shadow-soft);
  margin: 10px 16px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(162, 59, 59, 0.4), 0 4px 16px var(--shadow-card);
    border-color: var(--matte-red);
  }
`,Cm=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
`,Em=Mf.p`
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 12px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
`,_m=Mf.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 10px 20px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    background: var(--terracotta);
    box-shadow: 
      0 8px 20px var(--shadow-card),
      0 4px 12px var(--shadow-soft);
    border-color: var(--matte-red);
  }
`,Dm=Mf.div`
  margin-bottom: 25px;
  position: relative;
  margin: 0 16px 25px 16px;
`,Tm=Mf.input`
  width: 100%;
  padding: 15px 20px 15px 50px;
  border: 2px solid var(--border-color);
  border-radius: 16px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1rem;
  font-family: 'Inter', Arial, sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px var(--shadow-soft);
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 
      0 4px 12px var(--shadow-soft),
      0 0 0 3px rgba(162, 59, 59, 0.1);
  }
`,Nm=Mf.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 1.2rem;
  pointer-events: none;
`;Mf.div`
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`,Mf.button`
  padding: 6px 12px;
  border: 1px solid var(--border-color);
  border-radius: 15px;
  background: ${e=>e.$active?"var(--matte-red)":"var(--bg-card)"};
  color: ${e=>e.$active?"var(--bg-primary)":"var(--text-primary)"};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', Arial, sans-serif;
  box-shadow: 0 1px 4px var(--shadow-soft);
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-1px);
    background: ${e=>e.$active?"var(--terracotta)":"var(--sand)"};
    border-color: var(--matte-red);
    box-shadow: 0 2px 8px var(--shadow-card);
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.75rem;
  }
`;const Pm=Mf.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  font-size: 1.1rem;
  font-family: 'Inter', Arial, sans-serif;
  margin: 0 16px;
`,Im=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
  padding: 0 16px;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`,Am=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;
  
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
  }
`,Fm=Mf.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  flex: 1;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`,Lm=Mf.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }

  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,Rm=Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--bg-primary);
`,Om=Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,Mm=Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,Ym=({onNavigate:e,toggleTheme:r,isDarkTheme:t})=>{const[n,a]=O.useState([]),[o,i]=O.useState(""),[l,s]=O.useState("Все"),d=[{question:"Что такое Poizon?",answer:"Poizon (он же Dewu) — это китайский маркетплейс, специализирующийся на брендовой одежде, обуви, аксессуарах и товарах. Каждый товар проходит ручную проверку на оригинальность экспертами в Китае. Цены в 4-6 раз ниже, чем в России. Работает только через мобильное приложение и доставляет товары только внутри Китая.",category:"Общее"},{question:"Чем Poizon отличается от других маркетплейсов?",answer:"Poizon фокусируется строго на оригинальных товарах и имеет огромный ассортимент с гарантированной аутентификацией. Товары проверяются перед отправкой, что исключает риск подделок. Компания работает с 2015 года и имеет миллионы пользователей в Китае.",category:"Общее"},{question:"Безопасно ли покупать на Poizon?",answer:"Да, Poizon — легитимный маркетплейс с отличной репутацией. Все товары проходят многоуровневую проверку на оригинальность, и платформа использует защищенные платежи. Однако для доставки в Россию нужен посредник, как наш сервис.",category:"Общее"},{question:"Что такое 95?",answer:"95 — это китайский маркетплейс, аналогичный Poizon, специализирующийся на обуви, одежде, аксессуарах и товаров, которые были в использовании. Товары проходят проверку на оригинальность, цены ниже рыночных, даже ниже, чем на Poizon. Доставка только внутри Китая, работает через приложение.",category:"Общее"},{question:"Чем 95 отличается от Poizon?",answer:"95 ориентирован на товары, которые были в использовании, но с обязательной проверкой оригинальности. Как и Poizon, имеет строгую аутентификацию, но ассортимент постоянно меняется, так как товары изначально выставляют обычные люди. Цены конкурентные, несколько этапов проверки товаров перед отправкой самой площадкой.",category:"Общее"},{question:"Как искать товары на Poizon?",answer:"1. Откройте приложение Poizon.\n2. Введите название модели на английском (например, 'Nike Air Jordan 1') или используйте поиск по фото.\n3. Выберите размер (европейская система).\n4. Сохраните ссылку на товар для заказа.",category:"Поиск"},{question:"Как найти нужный размер на Poizon?",answer:"Размеры в Poizon указаны в европейской системе. Используйте таблицу размеров бренда в приложении или конвертер. Рекомендуем проверить перед заказом, так как обмен невозможен.",category:"Поиск"},{question:"Можно ли искать товары по фото на Poizon?",answer:"Да, в приложении есть функция поиска по фото. Загрузите изображение, и система найдет похожие товары.",category:"Поиск"},{question:"Что делать, если не могу найти товар на Poizon?",answer:"Свяжитесь с менеджером, отправьте фото или описание. Мы поможем найти модель или аналоги на Poizon.",category:"Поиск"},{question:"Как проверить наличие товара на Poizon?",answer:"В приложении отображается актуальное наличие. Если товар доступен, он показан с ценой и размерами.",category:"Поиск"},{question:"Как искать товары на 95?",answer:"1. Откройте приложение 95.\n2. Введите название модели на английском или используйте поиск по фото.\n3. Выберите размер (европейская система).\n4. Сохраните ссылку для заказа.",category:"Поиск"},{question:"Как найти нужный размер на 95?",answer:"Размеры в 95 — европейские. Используйте таблицу размеров в приложении. Проверьте перед заказом, обмен невозможен.",category:"Поиск"},{question:"Можно ли искать товары по фото на 95?",answer:"Да, приложение поддерживает поиск по фото для нахождения похожих товаров.",category:"Поиск"},{question:"Что делать, если не могу найти товар на 95?",answer:"Обратитесь к менеджеру с фото или описанием. Мы найдем товар или аналоги на 95.",category:"Поиск"},{question:"Как проверить наличие товара на 95?",answer:"Наличие показано в приложении с ценой и размерами для доступных товаров.",category:"Поиск"},{question:"Оригинальный ли товар на Poizon?",answer:"Да, Poizon гарантирует оригинальность: товары проходят AI-проверку и ручную экспертизу перед отправкой. С каждым товаром идет сертификат с QR-кодом.",category:"Качество"},{question:"Как Poizon проверяет оригинальность?",answer:"Многоуровневая проверка: AI-анализ, сравнение с оригиналами, экспертиза материалов, штрих-кодов. Минимум 2 эксперта проверяют каждый товар.",category:"Качество"},{question:"Что такое сертификат подлинности на Poizon?",answer:"Документ с QR-кодом для проверки оригинальности на сайте Poizon, содержащий детали товара и результаты экспертизы.",category:"Качество"},{question:"Оригинальный ли товар на 95?",answer:"Да, 95 проверяет товары на оригинальность с помощью экспертов и AI, аналогично Poizon.",category:"Качество"},{question:"Как 95 проверяет оригинальность?",answer:"Проверка включает анализ материалов, штрих-кодов и сравнение с оригиналами перед отправкой.",category:"Качество"},{question:"Что такое сертификат подлинности на 95?",answer:"Документ с QR-кодом для верификации оригинальности на платформе 95.",category:"Качество"},{question:"Каковы условия доставки?",answer:"Доставка из Китая: 800 руб/кг (включена в стоимость). Доставка по России отдельно в пункте выдачи. Срок: 20-25 дней.",category:"Доставка"},{question:"Сколько стоит доставка?",answer:"Из Китая: 800 руб/кг (включено в цену товара). По России: в зависимости от региона и выбранной транспортной компании.",category:"Доставка"},{question:"Как долго идет доставка?",answer:"Общий срок: 20-25 дней. Зависит от складов и логистики.",category:"Доставка"},{question:"Как отследить посылку?",answer:"После отправки предоставим трек-номер для отслеживания.",category:"Доставка"},{question:"В какие города доставляете?",answer:"Во все города России. В отдаленные регионы доставка может занимать больше времени.",category:"Доставка"},{question:"В каких случаях возможен возврат?",answer:"Возврат возможен только в день оформления заказа.",category:"Возврат"},{question:"Что если товар не подошел?",answer:"Возврат по 'не подошел' невозможен. Выбирайте размер внимательно.",category:"Возврат"},{question:"Как оформить заказ?",answer:"1. Нажмите 'Сделать заказ'.\n2. Отправьте ссылку на товар.\n3. Укажите размер и данные.\n4. Оплатите по реквизитам менеджера.\n5. Получите товар.",category:"Заказ"},{question:"Какие данные нужны для заказа?",answer:"Ссылка на товар, размер, ФИО, адрес, телефон. Данные должны быть точными.",category:"Заказ"},{question:"Можно ли заказать несколько товаров?",answer:"Да, в одном заказе — экономия на доставке.",category:"Заказ"},{question:"Можно ли отменить заказ?",answer:"Да, до оплаты. После оплаты отмена невозможна.",category:"Заказ"},{question:"Можно ли заказать товар не из категорий?",answer:"Да, менеджер рассчитает стоимость для любого товара с Poizon или 95.",category:"Заказ"},{question:"Нужно ли регистрироваться для заказа?",answer:"Нет, просто сделайте заказ в приложении и менеджер свяжется с вами.",category:"Заказ"},{question:"Как происходит оплата?",answer:"100% предоплата после оформления. В стоимость входит товар, комиссия, доставка из Китая.",category:"Оплата"},{question:"Какие способы оплаты доступны?",answer:"Банковский перевод, Crypto.",category:"Оплата"},{question:"Когда нужно оплачивать?",answer:"Сразу после подтверждения заказа менеджером.",category:"Оплата"},{question:"Что входит в стоимость?",answer:"Цена товара, комиссия, доставка из Китая. По России — отдельно.",category:"Оплата"},{question:"Есть ли скрытые платежи?",answer:"Нет, менеджер сообщит полную стоимость заранее.",category:"Оплата"},{question:"Что означает символ ≈ на товаре?",answer:"Таким знаком обозначаться товар, который находится не в Китае и доставляется по другим тарифам. Точная стоимость рассчитывается менеджером. Товары с таким знаком выходят дороже обычных, но мы также можем их доставить.",category:"Цены"},{question:"Как рассчитывается стоимость?",answer:"Цена товара + комиссия + доставка из Китая (800 руб/кг). После этого отдельным платежом происходит оплата доставки внутри РФ.",category:"Цены"},{question:"Влияет ли курс валют на цену?",answer:"Да, используем курс на момент заказа.",category:"Цены"},{question:"Есть ли скидки?",answer:"Да, получайте достижения, повышайте свой уровень и заказывайте выгоднее. Также вы можете приводить друзей по своей реферальной ссылке и получать скидку на комиссию.",category:"Цены"},{question:"Как работает реферальная программа?",answer:"Пригласите друга по ссылке и вы оба получите скидку с 1000₽ до 400₽ на 7 и 14 дней.",category:"Рефералы"},{question:"Как получить реферальную ссылку?",answer:"Ссылка генерируется в разделе 'Реферальная программа'. Поделитесь ей с друзьями.",category:"Рефералы"},{question:"Сколько можно сэкономить на рефералах?",answer:"За каждого друга — скидка с 1000₽ до 400₽ на 7 дней. Больше друзей — больше дней с пониженной комиссией.",category:"Рефералы"},{question:"Когда начисляется скидка?",answer:"Сразу после перехода друга по вашей ссылке. Действует 7 дней за одного друга.",category:"Рефералы"},{question:"Можно ли использовать скидку несколько раз?",answer:"Да, на все заказы в течение 7 дней.",category:"Рефералы"},{question:"Почему не работает приложение?",answer:"Перезагрузите или обновите приложение. Если проблема остается, обратитесь за помощью к менеджеру.",category:"Техническое"},{question:"Как связаться с поддержкой?",answer:"Через Telegram: @poizonic_manager.",category:"Техническое"},{question:"Работает ли сервис в выходные?",answer:"Да, менеджер всегда на связи, пишите!.",category:"Техническое"},{question:"Можно ли заказать товар ночью?",answer:"Да, оформите заказ в любое время. Менеджер обработает в рабочее время.",category:"Техническое"},{question:"Можно ли заказать товар в подарок?",answer:"Да, укажите данные получателя — доставим по адресу.",category:"Специальное"},{question:"Можно ли заказать товар для бизнеса?",answer:"Да, работаем с оптом. Обсудите условия и скидки с менеджером.",category:"Специальное"},{question:"Есть ли ограничения по весу?",answer:"Нет ограничений. Доставка — 800 руб/кг из Китая.",category:"Специальное"}],c=O.useMemo(()=>d.filter(e=>{const r=e.question.toLowerCase().includes(o.toLowerCase())||e.answer.toLowerCase().includes(o.toLowerCase()),t="Все"===l||e.category===l;return r&&t}),[o,l]);return Q.jsxs(bm,{children:[Q.jsxs(Im,{children:[Q.jsx(Am,{onClick:()=>e("main"),children:"‹"}),Q.jsx(Fm,{children:"Часто задаваемые вопросы"}),Q.jsxs(Lm,{onClick:r,children:[Q.jsx(Om,{$isDark:t,children:"🌙"}),Q.jsx(Mm,{$isDark:t,children:"☀️"}),Q.jsx(Rm,{$isDark:t})]})]}),Q.jsxs(vm,{children:[Q.jsxs(Dm,{children:[Q.jsx(Nm,{children:"🔍"}),Q.jsx(Tm,{type:"text",placeholder:"Поиск по вопросам и ответам...",value:o,onChange:e=>i(e.target.value)})]}),Q.jsxs($m,{$isDark:t,children:[Q.jsx(Cm,{children:"Не нашли ответ на свой вопрос?"}),Q.jsx(Em,{children:"Свяжитесь с нашим менеджером - мы всегда готовы помочь!"}),Q.jsx(_m,{onClick:()=>{var e,r;(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager")},children:"Связаться с менеджером"})]}),c.length>0?c.map((e,r)=>Q.jsxs(ym,{children:[Q.jsxs(wm,{onClick:()=>(e=>{a(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e])})(r),children:[Q.jsx(km,{children:e.question}),Q.jsx(jm,{$isOpen:n.includes(r),children:"▼"})]}),Q.jsx(Sm,{$isOpen:n.includes(r),children:Q.jsx(zm,{children:e.answer})})]},r)):Q.jsx(Pm,{children:"По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос или выберите другую категорию."})]})]})},Bm=Bf`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;Bf`
  from { 
    transform: translateY(-50%) translateX(-50%) scale(0.9); 
    opacity: 0; 
  }
  to { 
    transform: translateY(-50%) translateX(-50%) scale(1); 
    opacity: 1; 
  }
`;const Wm=Mf.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 480px) {
    padding: 0px;
  }
`,Um=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
  padding: 0 16px;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`,Hm=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;

  @media (max-width: 480px) {
    margin-left: 0px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--bg-secondary);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`,qm=Mf.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  flex: 1;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`,Vm=Mf.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }
  
  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,Qm=Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
`,Xm=Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
    position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,Gm=Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
    position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`;Mf.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border-color: var(--matte-terracotta);
  }

  @media (max-width: 480px) {
    padding: 15px;
    margin-bottom: 15px;
  }
`,Mf.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
`,Mf.div`
  background: var(--matte-red);
  color: var(--bg-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 15px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    margin-right: 12px;
  }
`,Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`,Mf.p`
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`,Mf.ul`
  color: var(--text-secondary);
  line-height: 1.5;
  padding-left: 0;
  margin-bottom: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  counter-reset: step-counter;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`,Mf.li`
  margin-bottom: 8px;
  position: relative;
  padding: 10px 14px 10px 24px;
  background: var(--bg-card);
  border-radius: 6px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  font-size: 0.9rem;
  line-height: 1.4;

  &:hover {
    border-color: var(--matte-red);
    box-shadow: 0 2px 6px var(--shadow-soft);
    transform: translateX(2px);
  }

  &::before {
    content: counter(step-counter);
    counter-increment: step-counter;
    color: var(--matte-red);
    font-weight: bold;
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--bg-primary);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    border: 1px solid var(--matte-red);
  }

  @media (max-width: 480px) {
    margin-bottom: 6px;
    padding: 8px 12px 8px 20px;
    font-size: 0.85rem;
    
    &::before {
      left: 4px;
      width: 14px;
      height: 14px;
      font-size: 0.65rem;
    }
  }
`;const Km=Mf.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  margin-bottom: 25px;
  overflow: hidden;
  margin: 0 16px 25px 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border-color: var(--matte-terracotta);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`,Jm=Mf.button`
  width: 100%;
  padding: 20px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    background: transparent;
  }
`,Zm=Mf.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 15px;
`,eg=Mf.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--matte-red);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg-primary);
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 16px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px var(--shadow-soft);
`,rg=Mf.div`
  flex: 1;
`,tg=Mf.h4`
  margin: 0 0 4px 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.5;
`,ng=Mf.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
`,ag=Mf.span`
  font-size: 1.2rem;
  color: var(--matte-terracotta);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${e=>e.$isExpanded?"rotate(180deg)":"rotate(0deg)"};
`,og=Mf.div`
  max-height: ${e=>e.$isExpanded?"500px":"0"};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`,ig=Mf.div`
  padding: 20px;
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  background: transparent;
`,lg=Mf.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 12px;
  background: ${e=>e.$isDark?"rgba(255, 255, 255, 0.12)":"rgba(255, 255, 255, 0.9)"};
  border-radius: 0 12px 12px 0;
  border: 1px solid ${e=>e.$isDark?"rgba(255, 255, 255, 0.2)":"rgba(0, 0, 0, 0.1)"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:hover {
    background: ${e=>e.$isDark?"rgba(255, 255, 255, 0.18)":"rgba(255, 255, 255, 0.95)"};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: var(--matte-red);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--matte-red);
    border-radius: 0 2px 2px 0;
  }
`,sg=Mf.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--matte-red);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${e=>e.$isDark?"#000000":"#FFFFFF"};
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(162, 59, 59, 0.3);
  border: 2px solid ${e=>e.$isDark?"rgba(0, 0, 0, 0.1)":"rgba(255, 255, 255, 0.2)"};
`,dg=Mf.span`
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.5;
  font-weight: 500;
  flex: 1;
`,cg=Mf.button`
  width: calc(100% - 32px);
  background: var(--matte-red);
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 12px 16px 25px 16px;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
  
  &:active {
    transform: translateY(0);
  }
`;Mf.div`
  margin-top: 20px;
  position: relative;
  z-index: 2;
`,Mf.h4`
  color: var(--text-primary);
  margin-bottom: 15px;
  font-size: 1rem;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 12px;
  }
`,Mf.div`
  display: flex;
  gap: 12px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 12px;
  }
`,Mf.button`
  flex: 1;
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 0.85rem;
  }
`,Mf.button`
  width: 100%;
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 15px 20px;
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 20px;
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 12px 18px;
    font-size: 0.95rem;
    margin-top: 15px;
  }
`,Mf.div`
  margin-top: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
`,Mf.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 12px 20px;
  color: var(--bg-primary);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
`;const pg=Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  animation: ${Bm} 0.3s ease-out;
  padding: 12px 20px 12px 20px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`,ug=Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: calc(100vh - 40px);
  width: 95vw;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateY(var(--scroll-position, 0px)) translateX(-50%);
  display: flex;
  flex-direction: column;
  
  /* Плавная анимация появления */
  animation: modalSlideIn 0.4s ease-out;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(1);
    }
  }
`,fg=Mf.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,xg=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`,hg=Mf.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
`,mg=Mf.button`
  background: var(--bg-secondary);
  border: 1px solid var(--matte-red);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  color: var(--matte-red);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: var(--matte-red);
    color: white;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`,gg=Mf.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
`,bg=Mf.video`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin: 20px auto 0;
  display: block;
`,vg=Mf.div`
  margin-top: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed var(--border-color);
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }
`,yg=Mf.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`,wg=Mf.button`
  background: var(--matte-red);
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);

  &:hover {
    background: var(--terracotta);
    transform: translateY(-1px);
  }
`;Mf.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: left;
`,Mf.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  counter-reset: video-guide-step;
`,Mf.li`
  counter-increment: video-guide-step;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 14px 16px;
  border-radius: 14px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);

  &::before {
    content: counter(video-guide-step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--matte-red);
    color: var(--bg-primary);
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }
`,Mf.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
  }
`,Mf.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin-top: 16px;
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-card);
  }
`;const kg=Mf.div`
  background: transparent;
  border: 2px solid var(--matte-red);
  border-radius: 16px;
  padding: 10px;
  margin: 20px 20px 0 20px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 15px rgba(162, 59, 59, 0.3), 0 2px 8px var(--shadow-soft);
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(162, 59, 59, 0.4), 0 4px 16px var(--shadow-card);
    border-color: var(--matte-red);
  }

  @media (max-width: 480px) {
    margin: 20px 15px 0 15px;
  }
`,jg=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
`,Sg=Mf.p`
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 12px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
`,zg=Mf.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 10px 20px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`,$g=({onNavigate:e,toggleTheme:r,isDarkTheme:t,onModalStateChange:n})=>{const a=e=>{lx.selection(),"android"===e?window.open("https://www.dewu.com/","_blank"):window.open("https://apps.apple.com/ru/app/得物-得到美好事物/id1012871328","_blank")},[o,i]=O.useState(!1),[l,s]=O.useState(!1),[d,c]=O.useState({top:"50%",transform:"translateY(-50%)"}),[p,u]=O.useState({}),f=e=>{lx.light(),u(r=>({...r,[e]:!r[e]}))};return Q.jsxs(Wm,{children:[Q.jsxs(Um,{children:[Q.jsx(Hm,{onClick:()=>{lx.selection(),e("main")},children:"‹"}),Q.jsx(qm,{children:"Инструкции"}),Q.jsxs(Vm,{onClick:r,children:[Q.jsx(Xm,{$isDark:t,children:"🌙"}),Q.jsx(Gm,{$isDark:t,children:"☀️"}),Q.jsx(Qm,{$isDark:t})]})]}),Q.jsxs(Km,{children:[Q.jsxs(Jm,{onClick:()=>f(1),children:[Q.jsxs(Zm,{children:[Q.jsx(eg,{children:"1"}),Q.jsxs(rg,{children:[Q.jsx(tg,{children:"Скачайте приложение Poizon"}),Q.jsx(ng,{children:"Установите официальное приложение для поиска товаров"})]})]}),Q.jsx(ag,{$isExpanded:p[1],children:"▼"})]}),Q.jsx(og,{$isExpanded:p[1],children:Q.jsxs(ig,{children:[Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"📱"}),Q.jsx(dg,{$isDark:t,children:"Скачайте приложение для Android или iOS"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"🔍"}),Q.jsx(dg,{$isDark:t,children:"Используйте для поиска товаров"})]}),Q.jsx(cg,{onClick:()=>a("android"),children:"Скачать для Android"}),Q.jsx(cg,{onClick:()=>a("ios"),children:"Скачать для iOS"})]})})]}),Q.jsxs(Km,{children:[Q.jsxs(Jm,{onClick:()=>f(2),children:[Q.jsxs(Zm,{children:[Q.jsx(eg,{children:"2"}),Q.jsxs(rg,{children:[Q.jsx(tg,{children:"Найдите нужный товар"}),Q.jsx(ng,{children:"Поиск и выбор товара в приложении Poizon"})]})]}),Q.jsx(ag,{$isExpanded:p[2],children:"▼"})]}),Q.jsx(og,{$isExpanded:p[2],children:Q.jsxs(ig,{children:[Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"1"}),Q.jsx(dg,{$isDark:t,children:"Откройте приложение Poizon"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"2"}),Q.jsx(dg,{$isDark:t,children:"Введите то, что ищите, или воспользуйтесь поиском по картинке"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"3"}),Q.jsx(dg,{$isDark:t,children:"Выберите нужный товар"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"4"}),Q.jsx(dg,{$isDark:t,children:"Выберите размер и цвет товара"})]})]})})]}),Q.jsxs(Km,{children:[Q.jsxs(Jm,{onClick:()=>f(3),children:[Q.jsxs(Zm,{children:[Q.jsx(eg,{children:"3"}),Q.jsxs(rg,{children:[Q.jsx(tg,{children:"Рассчитайте стоимость"}),Q.jsx(ng,{children:"Узнайте стоимость вашего заказа"})]})]}),Q.jsx(ag,{$isExpanded:p[3],children:"▼"})]}),Q.jsx(og,{$isExpanded:p[3],children:Q.jsxs(ig,{children:[Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"1"}),Q.jsx(dg,{$isDark:t,children:'Откройте раздел "Расчет стоимости"'})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"2"}),Q.jsx(dg,{$isDark:t,children:"Выберите категорию товара"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"3"}),Q.jsx(dg,{$isDark:t,children:"Введите цену в юанях"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"4"}),Q.jsx(dg,{$isDark:t,children:"Получите итоговую стоимость без учета доставки внутри РФ"})]}),Q.jsx(cg,{onClick:()=>e("calculator"),children:"Открыть калькулятор"})]})})]}),Q.jsxs(Km,{children:[Q.jsxs(Jm,{onClick:()=>f(4),children:[Q.jsxs(Zm,{children:[Q.jsx(eg,{children:"4"}),Q.jsxs(rg,{children:[Q.jsx(tg,{children:"Оформите заказ"}),Q.jsx(ng,{children:"Заполните форму заказа с данными товара"})]})]}),Q.jsx(ag,{$isExpanded:p[4],children:"▼"})]}),Q.jsx(og,{$isExpanded:p[4],children:Q.jsxs(ig,{children:[Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"1"}),Q.jsx(dg,{$isDark:t,children:'Откройте раздел "Сделать заказ"'})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"2"}),Q.jsx(dg,{$isDark:t,children:"Вставьте ссылку на товар"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"3"}),Q.jsx(dg,{$isDark:t,children:"Укажите размер и количество"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"4"}),Q.jsx(dg,{$isDark:t,children:"Укажите данные получателя"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"5"}),Q.jsx(dg,{$isDark:t,children:"Выберите пункт выдачи"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"6"}),Q.jsx(dg,{$isDark:t,children:"Проверьте данные и оформите заказ"})]}),Q.jsx(cg,{onClick:()=>{lx.selection(),e("order")},children:"Сделать заказ"})]})})]}),Q.jsxs(Km,{children:[Q.jsxs(Jm,{onClick:()=>f(5),children:[Q.jsxs(Zm,{children:[Q.jsx(eg,{children:"5"}),Q.jsxs(rg,{children:[Q.jsx(tg,{children:"Оплата и доставка"}),Q.jsx(ng,{children:"Что происходит после оформления заказа"})]})]}),Q.jsx(ag,{$isExpanded:p[5],children:"▼"})]}),Q.jsx(og,{$isExpanded:p[5],children:Q.jsxs(ig,{children:[Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"📞"}),Q.jsx(dg,{$isDark:t,children:"Дождитесь сообщения от менеджера"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"💳"}),Q.jsx(dg,{$isDark:t,children:"Менеджер отправит вам реквизиты для оплаты"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"💰"}),Q.jsx(dg,{$isDark:t,children:"Оплатите заказ"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"🛍️"}),Q.jsx(dg,{$isDark:t,children:"Мы выкупаем ваш заказ"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"📦"}),Q.jsx(dg,{$isDark:t,children:"Мы будем оповещать вас обо всех движениях вашего заказа"})]}),Q.jsxs(lg,{$isDark:t,children:[Q.jsx(sg,{$isDark:t,children:"🚚"}),Q.jsx(dg,{$isDark:t,children:"Ваш товар доставляется в указанный пункт выдачи"})]})]})})]}),Q.jsx(cg,{onClick:()=>{lx.selection(),s(!1),c({top:"50%",transform:"translateY(-50%)"}),i(!0),null==n||n(!0),document.body.style.overflow="hidden"},children:"🎥 Видео-инструкция по оформлению заказа"}),Q.jsxs(kg,{$isDark:t,children:[Q.jsx(jg,{children:"Не нашли ответ на свой вопрос?"}),Q.jsx(Sg,{children:"Свяжитесь с нашим менеджером - мы всегда готовы помочь!"}),Q.jsx(zg,{onClick:()=>{var e,r;lx.selection(),(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager")},children:"Связаться с менеджером"})]}),o&&Q.jsx(pg,{$modalPosition:d,onClick:()=>{lx.light(),i(!1),null==n||n(!1),document.body.style.overflow=""},children:Q.jsxs(ug,{$modalPosition:d,style:{"--scroll-position":`${window.pageYOffset||document.documentElement.scrollTop}px`},onClick:e=>e.stopPropagation(),children:[Q.jsxs(fg,{children:[Q.jsx(xg,{children:"Видео-инструкция"}),Q.jsx(mg,{onClick:()=>{lx.light(),i(!1),null==n||n(!1),document.body.style.overflow=""},children:"×"})]}),Q.jsxs(hg,{children:[Q.jsx(gg,{children:"Смотрите пошаговую инструкцию по оформлению заказа"}),Q.jsxs(bg,{controls:!0,preload:"metadata",onError:()=>{console.log("Видео не загрузилось")},onLoadStart:()=>{console.log("Начинаем загрузку видео...")},onCanPlay:()=>{console.log("Видео готово к воспроизведению")},children:[Q.jsx("source",{src:"/images/tutorial.mp4",type:"video/mp4"}),Q.jsx("source",{src:"/images/tutorial.MOV",type:"video/quicktime"}),"Ваш браузер не поддерживает воспроизведение видео."]}),Q.jsxs(vg,{style:{marginTop:"24px"},children:["📞 Нужна помощь? Свяжитесь с нашим менеджером в Telegram.",Q.jsx(yg,{children:Q.jsx(wg,{onClick:()=>{var e,r;lx.selection(),(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.openTelegramLink)?window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager"):window.open("https://t.me/poizonic_manager","_blank")},children:"Связаться"})})]})]})]})})]})},Cg=Bf`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`,Eg=Bf`
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`;Bf`
  0% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
  50% { 
    text-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta); 
  }
  100% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
`;const _g=Mf.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 0px;
  }
`;Mf.div`
  position: relative;
  z-index: 2;
  max-width: 500px;
  margin: 0 auto;
  background: var(--bg-card);
  border-radius: 16px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${Cg} 0.6s ease-out;
  
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 20px;
    margin: 0 10px;
  }
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;const Dg=Mf.div`
  background: transparent;
  border: 2px solid var(--matte-red);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  margin: 0 16px 25px 16px;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 15px rgba(162, 59, 59, 0.3), 0 2px 8px var(--shadow-soft);
`,Tg=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`,Ng=Mf.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 10px 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Pg=Mf.div`
  background: ${e=>e.$isDark?"var(--bg-secondary)":"var(--bg-card)"};
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 25px;
  margin: 0 16px 25px 16px;
  backdrop-filter: blur(5px);
  text-align: center;
  
  @media (max-width: 480px) {
    padding: 15px;
    margin-bottom: 25px;
  }
`,Ig=Mf.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--matte-red);
  background: ${e=>e.$isDark?"var(--bg-card)":"#FFFFFF"};
  border: 2px solid var(--matte-red);
  border-radius: 8px;
  padding: 12px;
  margin: 10px 0;
  letter-spacing: 0.5px;
  text-shadow: 0 0 8px var(--glow-red);
  word-break: break-all;
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 1.4;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 10px;
    letter-spacing: 0.3px;
  }
`,Ag=Mf.button`
  width: 100%;
  padding: 15px 25px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  margin-top: 15px;
  
  ${e=>"primary"===e.$variant?Lf`
      background: var(--matte-red);
      color: var(--bg-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card);
      
      &:hover {
        transform: translateY(-3px);
        background: var(--terracotta);
        box-shadow: 
          0 8px 20px var(--shadow-card),
          0 4px 12px var(--shadow-soft);
        border-color: var(--matte-red);
      }
    `:Lf`
      background: ${e.$isDark?"var(--bg-card)":"#FFFFFF"};
      color: var(--text-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card);
      
      &:hover {
        transform: translateY(-3px);
        background: var(--sand);
        box-shadow: 
          0 8px 20px var(--shadow-card),
          0 4px 12px var(--shadow-soft);
        border-color: var(--matte-red);
      }
    `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`,Fg=Mf.div`
  background: ${e=>e.$isDark?"var(--bg-secondary)":"var(--bg-card)"};
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  margin: 0 16px 25px 16px;
  backdrop-filter: blur(5px);
`,Lg=Mf.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin-top: 15px;
  width: 100%;
  
  @media (max-width: 480px) {
    gap: 8px;
    margin-top: 12px;
  }
`,Rg=Mf.div`
  text-align: center;
  padding: 16px 12px;
  background: ${e=>e.$isDark?"var(--bg-card)":"#FFFFFF"};
  border-radius: 8px;
  border: 1px solid var(--border-color);
  min-width: 0;
  width: 100%;
  
  @media (max-width: 480px) {
    padding: 14px 10px;
  }
`,Og=Mf.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--matte-red);
  margin-bottom: 4px;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 3px;
  }
`,Mg=Mf.div`
  font-size: 0.8rem;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    line-height: 1.15;
  }
`,Yg=Mf.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 5px;
  text-shadow: 0 0 8px var(--glow-red);
`,Bg=Mf.div`
  color: var(--terracotta);
  font-size: 0.9rem;
  margin-top: 5px;
  text-shadow: 0 0 8px var(--glow-terracotta);
`,Wg=Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  animation: ${Cg} 0.3s ease-out;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`,Ug=Mf.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   top: -16vh;
 
   @media (max-width: 480px) {
     top: -14vh;
   }
`,Hg=Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 20px;
  max-width: 80vw;
  max-height: 70vh;
  width: 80%;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  animation: ${Eg} 0.4s ease-out;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 90%;
    max-width: 90vw;
    padding: 18px;
    max-height: 75vh;
  }
`,qg=Mf.div`
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${Cg} 0.6s ease-out 0.2s both;
`,Vg=Mf.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
`,Qg=Mf.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 25px;
`,Xg=Mf.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-card);
  }
`,Gg=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
  padding: 0 16px;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`,Kg=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;
  
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
  }
`,Jg=Mf.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`,Zg=Mf.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }

  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,eb=Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--bg-primary);
`,rb=Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,tb=Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,nb=()=>{document.body.style.overflow="",document.documentElement.style.overflow=""},ab=({onNavigate:e,toggleTheme:r,isDarkTheme:t,onModalStateChange:n})=>{const[a,o]=O.useState(""),[i,l]=O.useState(""),[s,d]=O.useState({currentCommission:1e3,discountActive:!1,discountExpiresAt:null,totalReferrals:0,totalClicks:0}),[c,p]=O.useState(!1),[u,f]=O.useState(""),[x,h]=O.useState(""),[m,g]=O.useState(!1);O.useEffect(()=>{(()=>{var e,r,t,n;const a=(null==(n=null==(t=null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.initDataUnsafe)?void 0:t.user)?void 0:n.id)||"user",i=`https://t.me/poizonic_bot?start=${a}`;o(a.toString()),l(i)})(),b()},[]);const b=async()=>{var e,r,t,n,a;try{const o=null==(n=null==(t=null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.initDataUnsafe)?void 0:t.user)?void 0:n.id;if(console.log("🔍 Telegram ID:",o),console.log("🔍 Telegram WebApp:",null==(a=window.Telegram)?void 0:a.WebApp),!o)return void console.log("⚠️ Telegram ID не найден - используем значения по умолчанию");console.log("📡 Отправляем запрос к API с Telegram ID:",o);const i=await fetch("/api/referral-stats",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({telegramId:o})});if(i.ok){const e=await i.json();console.log("📊 Получены данные статистики:",e),e.success&&d(e.data)}else console.log("❌ Ошибка API:",i.status,i.statusText)}catch(o){console.error("❌ Ошибка загрузки статистики:",o)}},v=async()=>{try{await navigator.clipboard.writeText(i),g(!0),f(""),lx.success(),document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",null==n||n(!0)}catch(e){f("Не удалось скопировать ссылку"),lx.error()}},y=()=>{g(!1),nb(),null==n||n(!1)};O.useEffect(()=>()=>{nb(),null==n||n(!1)},[]);return Q.jsxs(_g,{children:[Q.jsxs(Gg,{children:[Q.jsx(Kg,{onClick:()=>e("main"),children:"‹"}),Q.jsx(Jg,{children:"Реферальная система"}),Q.jsxs(Zg,{onClick:r,children:[Q.jsx(rb,{$isDark:t,children:"🌙"}),Q.jsx(tb,{$isDark:t,children:"☀️"}),Q.jsx(eb,{$isDark:t})]})]}),Q.jsxs(Pg,{$isDark:t,children:[Q.jsx(Tg,{children:"Ваша реферальная ссылка"}),Q.jsx(Ig,{$isDark:t,children:i}),Q.jsx(Ag,{onClick:v,$variant:"primary",$isDark:t,children:"📋 Скопировать ссылку"}),Q.jsx(Ag,{onClick:()=>{var e,r;lx.medium();const t="⬆️ Переходи по ссылке выше!\n\n🎁 Привет! Я использую сервис Poizonic для заказа товаров из Китая.\n✨ Присоединяйся и получи скидку на комиссию!\n💡 Скидка применяется автоматически при переходе по ссылке!";if(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.openTelegramLink){const e=`https://t.me/share/url?url=${encodeURIComponent(i)}&text=${encodeURIComponent(t)}`;window.Telegram.WebApp.openTelegramLink(e)}else navigator.share?navigator.share({title:"Реферальная ссылка Poizonic",text:t,url:i}):v()},$variant:"secondary",$isDark:t,children:"📤 Поделиться с друзьями"})]}),Q.jsxs(Fg,{$isDark:t,children:[Q.jsx(Tg,{children:"Ваша статистика"}),Q.jsxs(Lg,{children:[Q.jsxs(Rg,{$isDark:t,children:[Q.jsxs(Og,{children:[s.currentCommission," ₽"]}),Q.jsx(Mg,{children:"Текущая комиссия"})]}),Q.jsxs(Rg,{$isDark:t,children:[Q.jsx(Og,{children:1e3===s.currentCommission?"Ꝏ":s.discountActive&&s.discountExpiresAt?new Date(s.discountExpiresAt).toLocaleDateString("ru-RU"):"Истекла"}),Q.jsx(Mg,{children:"Срок действия"})]}),Q.jsxs(Rg,{$isDark:t,children:[Q.jsx(Og,{children:s.totalReferrals}),Q.jsx(Mg,{children:"Приглашенных пользователей"})]})]})]}),u&&Q.jsx(Yg,{children:u}),x&&Q.jsx(Bg,{children:x}),Q.jsxs(Dg,{$isDark:t,children:[Q.jsx(Tg,{children:"Условия программы"}),Q.jsx(Ng,{children:"• Новый пользователь получает скидку на 2 недели"}),Q.jsx(Ng,{children:"• Пригласивший получает скидку на 1 неделю"}),Q.jsx(Ng,{children:"• Комиссия снижается с 1000₽ до 400₽ для обеих сторон"}),Q.jsx(Ng,{children:"• Скидки можно накапливать при приглашении новых пользователей"}),Q.jsx(Ng,{children:"• Скидка применяется автоматически при переходе по ссылке"})]}),m&&Q.jsx(Wg,{onClick:y,children:Q.jsx(Ug,{children:Q.jsxs(Hg,{onClick:e=>e.stopPropagation(),children:[Q.jsx(qg,{children:"✅"}),Q.jsx(Vg,{children:"Ссылка скопирована!"}),Q.jsx(Qg,{children:"Реферальная ссылка успешно скопирована в буфер обмена. Делитесь этой ссылкой с друзьями и получайте скидку на комиссию!"}),Q.jsx(Xg,{onClick:y,children:"Закрыть"})]})})})]})},ob=Bf`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`,ib=Mf.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 480px) {
    padding: 0px;
  }
`,lb=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
  padding: 0 16px;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`,sb=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;
  
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
  }
`,db=Mf.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  flex: 1;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`,cb=Mf.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }

  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,pb=Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`,ub=Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
`,fb=Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
`,xb=Mf.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 30px;
  margin: 0 16px 25px 16px;
  backdrop-filter: blur(15px);
  text-align: center;
  position: relative;
  z-index: 2;
  max-width: 500px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 6px 20px rgba(0, 0, 0, 0.08);
  }
  
  @media (max-width: 480px) {
    padding: 25px;
  }
`,hb=Mf.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  opacity: 0.9;
`,mb=Mf.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--matte-red);
  margin-bottom: 15px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.02em;
  
  @media (max-width: 480px) {
    font-size: 3rem;
  }
`,gb=Mf.div`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 25px;
  opacity: 0.8;
  font-weight: 500;
`,bb=Mf.div`
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 20px;
  opacity: 0.7;
  font-style: italic;
`,vb=Mf.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 16px;
  padding: 14px 24px;
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`,yb=Mf.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--matte-red);
  animation: ${ob} 1s ease-in-out infinite;
  margin-right: 12px;
`,wb=Mf.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  min-height: 60px;
`,kb=Mf.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  z-index: 10;
`,jb=Mf.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 5px;
`,Sb=Mf.div`
  background: transparent;
  border: 2px solid var(--matte-red);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: none;
  position: relative;
  z-index: 2;
  max-width: 500px;
  margin: 0 16px;
  box-shadow: 0 0 20px rgba(162, 59, 59, 0.3), 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 25px rgba(162, 59, 59, 0.4), 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 480px) {
    padding: 25px;
  }
`,zb=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: var(--matte-red);
    border-radius: 2px;
  }
`,$b=Mf.div`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
`,Cb=Mf.div`
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  margin-top: 20px;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--matte-red), transparent);
  }
`,Eb=Mf.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
  padding: 15px 0;
  font-style: italic;
  opacity: 0.8;
  
  &::before {
    content: '⏰ ';
    margin-right: 8px;
    opacity: 0.7;
  }
`,_b=({onNavigate:e,isDarkTheme:r,toggleTheme:t})=>{const[n,a]=O.useState(null),[o,i]=O.useState(!0),[l,s]=O.useState(null),[d,c]=O.useState(null);O.useEffect(()=>{p()},[]);const p=async()=>{console.log("Loading exchange rate..."),i(!0),s(null);try{console.log("Fetching from /api/exchange-rate");const e=await fetch("/api/exchange-rate");console.log("Response status:",e.status);const r=await e.json();if(console.log("Response data:",r),!e.ok)throw new Error(r.error||"Ошибка получения курса");a(r.rate),c(new Date),console.log("Exchange rate updated:",r.rate)}catch(e){console.error("Error loading exchange rate:",e),s("Ошибка соединения с сервером"),a(12.5)}finally{i(!1)}};return Q.jsxs(ib,{children:[Q.jsxs(lb,{children:[Q.jsx(sb,{onClick:()=>e("main"),children:"‹"}),Q.jsx(db,{children:"Курс юаня"}),Q.jsxs(cb,{onClick:t,children:[Q.jsx(ub,{$isDark:r,children:"🌙"}),Q.jsx(fb,{$isDark:r,children:"☀️"}),Q.jsx(pb,{$isDark:r})]})]}),Q.jsxs(xb,{children:[Q.jsx(hb,{children:"Текущий курс"}),Q.jsx(mb,{children:n?`${n.toFixed(2)} ₽`:"—"}),Q.jsx(gb,{children:"за 1 китайский юань"}),l&&Q.jsx(jb,{children:l}),d&&Q.jsxs(bb,{children:["Обновлено: ",d.toLocaleTimeString("ru-RU")]}),Q.jsx(vb,{onClick:()=>{console.log("Refresh button clicked"),lx.medium(),p()},disabled:o,children:"Обновить курс"}),o&&Q.jsx(kb,{children:Q.jsxs(wb,{children:[Q.jsx(yb,{}),Q.jsx("span",{children:"Обновляем курс..."})]})})]}),Q.jsxs(Sb,{$isDark:r,children:[Q.jsx(zb,{children:"О курсе"}),Q.jsx($b,{children:"Курс юаня к рублю рассчитывается специально для покупки валюты и расчета стоимости."}),Q.jsx($b,{children:"Курс берется напрямую с ЦБРФ и обновляется в режиме реального времени."}),Q.jsx(Cb,{$isDark:r,children:Q.jsx(Eb,{children:"Курс автоматически обновляется каждые 30 минут с сайта ЦБРФ"})})]})]})},Db=Bf`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`,Tb=Mf.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${Db} 0.8s ease-out forwards;
  
  @media (max-width: 480px) {
    padding: 0px;
  }
`,Nb=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
  padding: 0 16px;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`,Pb=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;
  
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
  }
`,Ib=Mf.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  flex: 1;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`,Ab=Mf.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 480px) {
    max-width: 400px;
    padding: 0 16px;
  }
`,Fb=Mf.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${Db} 0.6s ease-out forwards;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 30px var(--shadow-card),
      0 4px 12px var(--shadow-soft);
    border-color: var(--matte-red);
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 12px;
  }
`,Lb=Mf.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 12px;
  }
`,Rb=Mf.p`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 1.1rem;
  text-align: justify;
  text-justify: inter-word;
  max-width: 100%;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 16px;
    text-align: left;
  }
`,Ob=Mf.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
`,Mb=Mf.span`
  font-size: 1.8rem;
  flex-shrink: 0;
  margin-top: 4px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, 
    rgba(162, 59, 59, 0.1), 
    rgba(157, 78, 61, 0.05)
  );
  border-radius: 50%;
  border: 2px solid rgba(162, 59, 59, 0.2);
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
  }
`,Yb=Mf.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05), 
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(162, 59, 59, 0.2);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      var(--matte-red), 
      var(--terracotta), 
      var(--matte-red)
    );
    opacity: 0;
    transition: all 0.4s ease;
    border-radius: 20px 20px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(162, 59, 59, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    transform: translateY(-50%);
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: var(--matte-red);
    box-shadow: 
      0 12px 40px rgba(162, 59, 59, 0.2),
      0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      opacity: 1;
      height: 4px;
    }
    
    &::after {
      opacity: 1;
    }
    
    ${Mb} {
      transform: scale(1.1) rotate(5deg);
      background: linear-gradient(135deg, 
        rgba(162, 59, 59, 0.2), 
        rgba(157, 78, 61, 0.1)
      );
      border-color: var(--matte-red);
    }
  }
  
  @media (max-width: 480px) {
    padding: 16px 20px;
    gap: 12px;
    border-radius: 16px;
  }
`,Bb=Mf.div`
  flex: 1;
  color: var(--text-primary);
  font-size: 1.05rem;
  line-height: 1.6;
  font-weight: 500;
  
  strong {
    color: var(--matte-red);
    font-weight: 700;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    
    strong {
      font-size: 1rem;
    }
  }
`;Mf.div`
  text-align: center;
  margin-top: 20px;
`;const Wb=Mf.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 10px 18px;
  color: ${e=>e.$isDark?"black":"white"};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  margin-left: 16px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
    background: var(--terracotta);
    border-color: var(--terracotta);
  }
  
  @media (max-width: 480px) {
    padding: 8px 14px;
    font-size: 0.8rem;
    margin-left: 12px;
  }
`,Ub=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border: 2px solid var(--matte-red);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 0 10px rgba(162, 59, 59, 0.3),
    0 0 20px rgba(162, 59, 59, 0.1),
    inset 0 0 10px rgba(162, 59, 59, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    background: var(--bg-card);
    border-color: var(--matte-red);
    box-shadow: 
      0 0 15px rgba(162, 59, 59, 0.5),
      0 0 30px rgba(162, 59, 59, 0.2),
      0 4px 16px var(--shadow-card),
      0 2px 8px var(--shadow-soft),
      inset 0 0 15px rgba(162, 59, 59, 0.2);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px;
    margin-bottom: 16px;
  }
`,Hb=Mf.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
`,qb=Mf.div`
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`,Vb=Mf.div`
  color: var(--text-secondary);
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`,Qb=Mf.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }

  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,Xb=Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--bg-primary);
`,Gb=Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,Kb=Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,Jb=({onNavigate:e,isDark:r=!0,onToggleTheme:t})=>Q.jsxs(Tb,{children:[Q.jsxs(Nb,{children:[Q.jsx(Pb,{onClick:()=>e("main"),children:"‹"}),Q.jsx(Ib,{children:"О нас"}),Q.jsxs(Qb,{onClick:t,children:[Q.jsx(Gb,{$isDark:r,children:"🌙"}),Q.jsx(Kb,{$isDark:r,children:"☀️"}),Q.jsx(Xb,{$isDark:r})]})]}),Q.jsxs(Ab,{children:[Q.jsxs(Fb,{children:[Q.jsx(Lb,{children:"Poizonic"}),Q.jsx(Rb,{children:"Добро пожаловать в мир качественных оригинальных товаров с Poizonic! Мы — ваш надежный посредник для заказа товаров с китайских маркетплейсов Poizon и 95, специализирующихся на оригинальных брендовых товарах."})]}),Q.jsxs(Fb,{children:[Q.jsx(Lb,{children:"Наши преимущества"}),Q.jsx(Ob,{children:[{icon:"🚀",title:"Быстрая доставка",description:"средний срок доставки — около 20 дней"},{icon:"💰",title:"Низкие цены",description:"мы предлагаем конкурентные цены на товары, ниже, чем многие другие посредники"},{icon:"🔒",title:"Гарантия качества",description:"все оригинальные товары проходят строгую проверку перед отправкой!"},{icon:"🔝",title:"Прозрачность",description:"вы всегда знаете, что и за сколько покупаете. Совершенство в каждой детали!"},{icon:"👥",title:"Поддержка на каждом этапе",description:"от оформления заказа и до получения товара — мы всегда на связи!"},{icon:"📦",title:"Функциональность",description:"Мы также выкупаем товары со значком '≈' и поможем рассчитать их стоимость"}].map((e,r)=>Q.jsxs(Yb,{children:[Q.jsx(Mb,{children:e.icon}),Q.jsxs(Bb,{children:[Q.jsxs("strong",{children:[e.title,":"]})," ",e.description]})]},r))})]}),Q.jsxs(Fb,{children:[Q.jsx(Lb,{children:"Контакты"}),Q.jsxs(Ub,{children:[Q.jsxs(Hb,{children:[Q.jsx(qb,{children:"Менеджер"}),Q.jsx(Vb,{children:"Telegram: @poizonic_manager"})]}),Q.jsx(Wb,{$isDark:r,onClick:()=>{var e,r;(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager")},children:"Связаться"})]}),Q.jsxs(Ub,{children:[Q.jsxs(Hb,{children:[Q.jsx(qb,{children:"Менеджер по рекламе"}),Q.jsx(Vb,{children:"Telegram: @Egor_Bardin"})]}),Q.jsx(Wb,{$isDark:r,onClick:()=>{var e,r;(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink("https://t.me/Egor_Bardin")},children:"Связаться"})]})]})]})]}),Zb=Bf`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;Bf`
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`;const ev=Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${Zb} 0.3s ease-out;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
  overflow: auto;
  
  /* Адаптивность для маленьких экранов */
  @media (max-height: 700px) {
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  @media (max-height: 500px) {
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    align-items: flex-start;
    padding-top: 20px;
  }
`,rv=Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  position: relative;
  margin: auto;
  transform: translateY(var(--scroll-position, 0px));
  
  /* Плавная анимация появления */
  animation: modalFadeIn 0.4s ease-out;
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(var(--scroll-position, 0px)) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(var(--scroll-position, 0px)) scale(1);
    }
  }
  
  /* Динамическое позиционирование */
  @media (max-height: 700px) {
    max-height: calc(100vh - 40px);
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  @media (max-height: 500px) {
    max-height: calc(100vh - 20px);
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    margin: 10px;
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 20px);
  }
  
  @media (max-width: 360px) {
    padding: 15px;
    margin: 5px;
    max-width: calc(100vw - 10px);
    max-height: calc(100vh - 10px);
  }
`,tv=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
`,nv=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`,av=Mf.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--terracotta);
    transform: scale(1.1);
  }
`,ov=Mf.div`
  margin-bottom: 20px;
`,iv=Mf.label`
  display: block;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-weight: 600;
`;Mf.input`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background: var(--bg-card);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;const lv=Mf.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  min-height: 120px;
  resize: none;
  font-family: 'Inter', Arial, sans-serif;
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background: var(--bg-card);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`,sv=Mf.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`,dv=Mf.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${e=>e.$filled?"var(--matte-red)":"var(--text-secondary)"};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
  
  &:hover {
    transform: scale(1.1);
  }
`,cv=Mf.div`
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-secondary);
  
  &:hover {
    border-color: var(--matte-red);
    background: var(--bg-card);
  }
`,pv=Mf.input`
  display: none;
`,uv=Mf.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  margin-bottom: 12px;
`,fv=Mf.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--border-color);
  background: var(--bg-secondary);
`,xv=Mf.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`,hv=Mf.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`,mv=Mf.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(220, 53, 69, 1);
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,gv=Mf.button`
  background: ${e=>e.$disabled?"var(--text-secondary)":"var(--matte-red)"};
  border: none;
  border-radius: 12px;
  padding: 15px 25px;
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover:not(:disabled) {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`,bv=Mf.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--matte-red);
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,vv=Mf.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`,yv=Mf.div`
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 15px;
  text-align: center;
  color: #4CAF50;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 
    0 4px 12px rgba(76, 175, 80, 0.15),
    0 2px 6px rgba(76, 175, 80, 0.1);
  backdrop-filter: blur(10px);
  animation: ${Zb} 0.5s ease-out;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;Mf.div`
  color: var(--text-primary);
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
`;const wv=({isOpen:e,onClose:r,onSuccess:t,scrollPosition:n})=>{const[a,o]=O.useState(0),[i,l]=O.useState(""),[s,d]=O.useState([]),[c,p]=O.useState([]),[u,f]=O.useState([]),[x,h]=O.useState(!1),[m,g]=O.useState(null),[b,v]=O.useState(null),[y,w]=O.useState(null),k=O.useRef(null),j=()=>{x||(o(0),l(""),d([]),p([]),f([]),g(null),v(null),w(null),r())};return M.useEffect(()=>(e&&lx.light?(lx.light(),document.body.style.overflow="hidden"):e||(o(0),l(""),d([]),p([]),f([]),g(null),v(null),w(null),document.body.style.overflow=""),()=>{document.body.style.overflow=""}),[e]),e?Q.jsx(Q.Fragment,{children:Q.jsx(ev,{onClick:j,children:Q.jsxs(rv,{$scrollPosition:n,onClick:e=>e.stopPropagation(),style:{"--scroll-position":`${n}px`},children:[Q.jsxs(tv,{children:[Q.jsx(nv,{children:"Написать отзыв"}),Q.jsx(av,{onClick:j,disabled:x,children:"×"})]}),Q.jsxs(ov,{children:[Q.jsx(iv,{children:"Оценка *"}),Q.jsx(sv,{children:[1,2,3,4,5].map(e=>Q.jsx(dv,{$filled:e<=a,onClick:()=>o(e),disabled:x,children:"★"},e))})]}),Q.jsxs(ov,{children:[Q.jsx(iv,{children:"Отзыв *"}),Q.jsx(lv,{value:i,onChange:e=>{l(e.target.value),e.target.style.height="auto",e.target.style.height=e.target.scrollHeight+"px"},placeholder:"Поделитесь своим опытом...",disabled:x})]}),Q.jsxs(ov,{children:[Q.jsx(iv,{children:"Фото/Видео (необязательно, до 10 файлов)"}),c.length>0&&Q.jsx(uv,{children:c.map((e,r)=>Q.jsxs(fv,{children:["video"===u[r]?Q.jsx(hv,{src:e,controls:!1,muted:!0,playsInline:!0}):Q.jsx(xv,{src:e,alt:`Предпросмотр ${r+1}`}),Q.jsx(mv,{type:"button",onClick:()=>(e=>{d(s.filter((r,t)=>t!==e)),p(c.filter((r,t)=>t!==e)),f(u.filter((r,t)=>t!==e))})(r),disabled:x,title:"Удалить файл",children:"×"})]},r))}),s.length<10&&Q.jsxs(cv,{onClick:()=>{var e;return null==(e=k.current)?void 0:e.click()},style:{borderColor:s.length>0?"var(--border-color)":void 0},children:[Q.jsx(pv,{ref:k,type:"file",accept:"image/*,video/*",multiple:!0,onChange:e=>{const r=e.target.files;if(!r||0===r.length)return;const t=Array.from(r),n=[];if(s.length+t.length>10)return void g("Можно загрузить максимум 10 фото");const a=[];for(const l of t){if(l.size>10485760)return void g("Размер каждого файла не должен превышать 10MB");if(!l.type.startsWith("image/")&&!l.type.startsWith("video/"))return void g("Разрешены только изображения и видео");n.push(l),a.push(l.type.startsWith("video/")?"video":"image")}const o=[...s,...n];d(o),f(e=>[...e,...a]);const i=n.map(e=>new Promise((r,t)=>{const n=new FileReader;n.onload=e=>{var n;(null==(n=e.target)?void 0:n.result)?r(e.target.result):t(new Error("Failed to read file"))},n.onerror=()=>t(new Error("Failed to read file")),n.readAsDataURL(e)}));Promise.all(i).then(e=>{p(r=>[...r,...e])}).catch(e=>{console.error("Ошибка создания превью:",e),g("Ошибка обработки файлов")}),g(null),k.current&&(k.current.value="")},disabled:x}),Q.jsxs("div",{children:[Q.jsx("div",{style:{fontSize:"2rem",marginBottom:"10px"},children:"📷"}),Q.jsx("div",{children:"Нажмите, чтобы добавить фото/видео"}),Q.jsxs("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",marginTop:"5px"},children:["До ",10-s.length," файлов, каждый до 10MB ",c.length>0&&`(${c.length} ${c.length,"загружено"})`]})]})]})]}),m&&Q.jsx(vv,{children:m}),b&&Q.jsx(yv,{children:b}),y&&Q.jsx(yv,{children:y}),Q.jsx(gv,{onClick:async()=>{var e,n,c;if(0!==a)if(i.trim()){h(!0),g(null);try{const u=null==(e=window.Telegram)?void 0:e.WebApp,x=null==(n=null==u?void 0:u.initDataUnsafe)?void 0:n.user,h=(null==(c=null==x?void 0:x.id)?void 0:c.toString())||"123456789",m=(null==x?void 0:x.username)||"test_user",b=(null==x?void 0:x.first_name)||"Test User",y=(null==x?void 0:x.photo_url)||null;console.log("Отправляемые данные:",{telegram_id:h,username:m,full_name:b,rating:a,review_text:i});const k=new FormData;k.append("telegram_id",h),k.append("username",m),k.append("full_name",b),k.append("rating",a.toString()),k.append("review_text",i),y&&k.append("avatar_url",y),s.forEach(e=>{k.append("photos",e)});const j=await fetch("/api/reviews",{method:"POST",body:k});if(j.ok)w("Спасибо за ваш отзыв!"),o(0),l(""),d([]),p([]),f([]),g(null),v(null),setTimeout(()=>{t(),r()},2e3);else{const e=await j.json();console.error("Ошибка сервера:",e),g(e.error||"Ошибка отправки отзыва")}}catch(u){console.error("Ошибка отправки отзыва:",u),g("Ошибка отправки отзыва")}finally{h(!1)}}else g("Пожалуйста, напишите отзыв");else g("Пожалуйста, поставьте оценку")},$disabled:x||0===a||!i.trim(),children:x?Q.jsxs(Q.Fragment,{children:[Q.jsx(bv,{}),"Отправка..."]}):"Отправить отзыв"})]})})}):null},kv=Bf`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;Bf`
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`;const jv=Mf.div`
  position: relative;
  z-index: 2;
  background: ${e=>e.$isDark?"rgba(30, 30, 30, 0.7)":"rgba(255, 255, 255, 0.7)"};
  margin: 0 16px 20px 16px;
  padding: 25px 25px 15px 25px;
  border-radius: 16px;
  backdrop-filter: blur(15px);
  border: 2px solid var(--matte-red);
  box-shadow: 
    0 4px 20px rgba(162, 59, 59, 0.2),
    0 2px 8px rgba(162, 59, 59, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${kv} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 25px rgba(162, 59, 59, 0.3),
      0 3px 12px rgba(162, 59, 59, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
  
  @media (max-width: 480px) {
    padding: 20px 20px 12px 20px;
    margin: 0 16px 15px 16px;
  }
`,Sv=Mf.div`
  text-align: center;
  margin-bottom: 15px;
`,zv=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`,$v=Mf.p`
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  text-align: center;
`,Cv=Mf.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 15px 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`,Ev=Mf.div`
  position: fixed;
  top: ${e=>e.$top}px;
  left: ${e=>e.$left}px;
  width: ${e=>e.$width}px;
  height: ${e=>e.$height}px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${kv} 0.3s ease-out;
  box-sizing: border-box;
  overflow: auto;
`,_v=Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 15px;
  max-width: 98vw;
  width: 100%;
  max-height: 95vh;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
  animation: modalFadeIn 0.4s ease-out;
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`,Dv=Mf.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding: 0 10px 15px 10px;
  border-bottom: 1px solid var(--border-color);
`,Tv=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`,Nv=Mf.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--terracotta);
    transform: scale(1.1);
  }
`,Pv=Mf.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  flex: 1;
  overflow-y: auto;
  padding: 10px 5px 5px 0;
  max-height: calc(85vh - 80px);
  min-height: 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(162, 59, 59, 0.4);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(162, 59, 59, 0.6);
  }
`,Iv=Mf.div`
  width: 100%;
  height: 250px;
  background: ${e=>e.$color};
  border-radius: 12px;
  cursor: pointer;
  transition: none;
  border: 2px solid transparent;
  pointer-events: auto;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Inter', Arial, sans-serif;
  text-align: center;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    height: 220px;
  }
  
  @media (max-width: 480px) {
    height: 180px;
    padding: 15px;
  }
  
  &:hover {
    transform: scale(1);
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`,Av=Mf.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`,Fv=Mf.div`
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`,Lv=Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 20px;
  animation: ${kv} 0.3s ease-out;
  margin: 0;
  width: 100vw;
  height: 100vh;
`,Rv=Mf.img`
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;Mf.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
`;const Ov=({isDarkTheme:e,onModalStateChange:r})=>{const[t,n]=O.useState(!1),[a,o]=O.useState(null),[i,l]=O.useState([]),[s,d]=O.useState({top:0,left:0,width:0,height:0});M.useEffect(()=>{(async()=>{try{console.log("Загружаем изображения выкупов...");const e="3001"===window.location.port?"3000":window.location.port,r=`${window.location.protocol}//${window.location.hostname}:${e}`,t=await fetch(`${r}/api/purchases/images`);if(!t.ok)throw new Error("Ошибка получения списка изображений");const n=await t.json()||[];console.log(`Загружено ${n.length} изображений выкупов`),l(n)}catch(e){console.error("Ошибка загрузки изображений выкупов:",e),l([])}})()},[]);const c=()=>{lx.light&&lx.light(),document.body.style.overflow="auto",document.body.style.position="",document.body.style.width="",document.body.style.top="",window.scrollTo(s.left,s.top),null==r||r(!1),n(!1)},p=e=>{lx.light&&lx.light(),console.log("Opening full item:",e),o(e)};return Q.jsxs(Q.Fragment,{children:[Q.jsx(jv,{$isDark:e,children:Q.jsxs(Sv,{children:[Q.jsx(zv,{children:"Наши выкупы"}),Q.jsx($v,{children:"Посмотрите, что мы уже доставили нашим клиентам"}),Q.jsx(Cv,{onClick:()=>{lx.light&&lx.light();const e={top:window.scrollY||window.pageYOffset||0,left:window.scrollX||window.pageXOffset||0,width:window.innerWidth,height:window.innerHeight};d(e),document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.width="100%",document.body.style.top=`-${e.top}px`,null==r||r(!0),n(!0)},children:"Посмотреть выкупы"})]})}),t&&Q.jsx(Ev,{$top:s.top,$left:s.left,$width:s.width,$height:s.height,onClick:c,children:Q.jsxs(_v,{onClick:e=>e.stopPropagation(),children:[Q.jsxs(Dv,{children:[Q.jsx(Tv,{children:"Наши выкупы"}),Q.jsx(Nv,{onClick:c,children:"×"})]}),Q.jsx(Pv,{children:i.length>0?i.map((e,r)=>Q.jsx("img",{src:e,alt:`Выкуп ${r+1}`,style:{width:"100%",height:"200px",objectFit:"cover",backgroundColor:"var(--bg-secondary)",borderRadius:"12px",cursor:"pointer",transition:"all 0.3s ease",border:"2px solid transparent",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.2)"},onClick:r=>{r.preventDefault(),r.stopPropagation(),console.log("Image clicked:",e),p(e)},onError:e=>{e.currentTarget.style.display="none"},onMouseEnter:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.borderColor="transparent",e.currentTarget.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"},onMouseLeave:e=>{e.currentTarget.style.transform="scale(1)",e.currentTarget.style.borderColor="transparent",e.currentTarget.style.boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"}},r)):[{id:1,name:"Кроссовки Nike",details:"Размер: 42",color:"#4CAF50"},{id:2,name:"Рюкзак Adidas",details:"Черный",color:"#2196F3"},{id:3,name:"Худи Supreme",details:"Размер: L",color:"#FF9800"},{id:4,name:"Джинсы Levis",details:"Размер: 32",color:"#9C27B0"},{id:5,name:"Кепка New Era",details:"Красная",color:"#F44336"},{id:6,name:"Сумка Gucci",details:"Коричневая",color:"#795548"},{id:7,name:"Часы Rolex",details:"Золотые",color:"#FFD700"}].map((e,r)=>Q.jsxs(Iv,{$color:e.color,onClick:r=>{r.preventDefault(),r.stopPropagation(),console.log("Item clicked:",e),p(e)},children:[Q.jsx(Av,{children:e.name}),Q.jsx(Fv,{children:e.details})]},e.id))})]})}),a&&Q.jsx(Lv,{onClick:()=>{lx.light&&lx.light(),o(null)},children:"string"==typeof a?Q.jsx(Rv,{src:a,alt:"Выкуп",onClick:e=>e.stopPropagation(),onError:e=>{console.error("Error loading full image:",a),e.currentTarget.style.display="none"},onLoad:()=>{console.log("Full image loaded successfully:",a)}}):Q.jsxs("div",{style:{width:"min(90vw, 500px)",height:"min(90vh, 400px)",background:a.color,borderRadius:"20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"white",fontFamily:"Inter, Arial, sans-serif",textAlign:"center",padding:"40px",boxShadow:"0 10px 30px rgba(0, 0, 0, 0.5)",position:"relative",zIndex:10001,margin:"auto",maxWidth:"90vw",maxHeight:"90vh"},onClick:e=>e.stopPropagation(),children:[Q.jsx("div",{style:{fontSize:"3rem",fontWeight:"700",marginBottom:"20px",textShadow:"0 2px 4px rgba(0, 0, 0, 0.3)"},children:a.name}),Q.jsx("div",{style:{fontSize:"1.5rem",fontWeight:"400",opacity:"0.9",textShadow:"0 2px 4px rgba(0, 0, 0, 0.3)"},children:a.details})]})})]})},Mv=Bf`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;Bf`
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`,Bf`
  0% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
  50% { 
    text-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta); 
  }
  100% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
`,Bf`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;const Yv=Mf.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 0px 0px 100px 0px;
  }
`,Bv=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
  padding: 0 16px;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`,Wv=Mf.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;
  
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
  }
`,Uv=Mf.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }
  
  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,Hv=Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--bg-primary);
`,qv=Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,Vv=Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,Qv=Mf.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  flex: 1;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`,Xv=Mf.div`
  position: relative;
  z-index: 2;
  background: var(--bg-card);
  margin: 0 16px 20px 16px;
  padding: 25px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${Mv} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 20px;
    margin: 0 16px 15px 16px;
  }
`,Gv=Mf.div`
  position: relative;
  z-index: 2;
  background: var(--bg-card);
  margin: 0 16px 20px 16px;
  padding: 25px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${Mv} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 20px;
    margin: 0 16px 15px 16px;
  }
`,Kv=Mf.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;Mf.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0;
  margin-top: 0;
  text-align: center;
`;const Jv=Mf.div`
  min-width: 100%;
  padding: 20px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  margin-right: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`,Zv=Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`,ey=Mf.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,ry=Mf.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${e=>e.$hasImage?"transparent":"var(--matte-red)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg-primary);
  font-weight: 600;
  font-size: 1.1rem;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`,ty=Mf.div`
  display: flex;
  flex-direction: column;
`,ny=Mf.div`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
`,ay=Mf.div`
  color: var(--text-secondary);
  font-size: 0.85rem;
`,oy=Mf.div`
  display: flex;
  gap: 2px;
`,iy=Mf.span`
  color: ${e=>e.$filled?"var(--matte-red)":"var(--text-secondary)"};
  font-size: 1.2rem;
`;Mf.span`
  color: ${e=>e.$filled?"var(--matte-red)":"var(--text-secondary)"};
  font-size: 2.5rem;
`;const ly=Mf.span`
  position: relative;
  font-size: 2.5rem;
  color: var(--text-secondary);
  
  &::before {
    content: '★';
    position: absolute;
    top: 0;
    left: 0;
    width: ${e=>e.$fillPercentage}%;
    overflow: hidden;
    color: var(--matte-red);
  }
`,sy=Mf.div`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 0.95rem;
`,dy=Mf.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;
`,cy=Mf.img`
  max-width: 100%;
  max-height: 250px;
  width: auto;
  height: auto;
  border-radius: 12px;
  object-fit: contain;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid var(--border-color);
  background: var(--bg-secondary);
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-color: var(--matte-red);
  }
`,py=Mf.video`
  max-width: 100%;
  max-height: 250px;
  width: auto;
  height: auto;
  border-radius: 12px;
  object-fit: contain;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid var(--border-color);
  background: var(--bg-secondary);
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    border-color: var(--matte-red);
  }
`,uy=Mf.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
`,fy=Mf.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`,xy=Mf.div`
  width: 100%;
  min-width: 0;
`,hy=Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`,my=Mf.p`
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  text-align: center;
`;Mf.div`
  margin-top: 20px;
`;const gy=Mf.button`
  background: var(--matte-red);
  border: none;
  border-radius: 12px;
  padding: 15px 25px;
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`,by=Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${Mv} 0.3s ease-out;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  min-height: 100vh;
  
  /* Динамическое позиционирование */
  @media (max-height: 700px) {
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  @media (max-height: 500px) {
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    align-items: flex-start;
    padding-top: 20px;
  }
`,vy=Mf.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  position: relative;
  margin: auto;
  transform: translateY(var(--scroll-position, 0px));
  
  /* Плавная анимация появления */
  animation: modalSlideIn 0.4s ease-out;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(var(--scroll-position, 0px)) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(var(--scroll-position, 0px)) scale(1);
    }
  }
  
  /* Динамическое позиционирование */
  @media (max-height: 700px) {
    max-height: calc(100vh - 40px);
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  @media (max-height: 500px) {
    max-height: calc(100vh - 20px);
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    margin: 10px;
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 20px);
  }
  
  @media (max-width: 360px) {
    padding: 15px;
    margin: 5px;
    max-width: calc(100vw - 10px);
    max-height: calc(100vh - 10px);
  }
`;Mf.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
`,Mf.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: 0.5px;
`;const yy=Mf.button`
  background: var(--bg-card);
  color: var(--matte-red);
  border: 2px solid var(--matte-red);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--matte-red);
    color: var(--bg-primary);
    transform: scale(1.1);
  }
`,wy=Mf.div`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 20px;
`,ky=Mf.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 25px 0;
  padding: 0 20px;
  flex-wrap: wrap;
`,jy=Mf.button`
  background: transparent;
  color: ${e=>e.$active?"var(--matte-red)":"var(--text-primary)"};
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 16px;
  font-weight: ${e=>e.$active?"600":"500"};
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  transition: all 0.2s ease;
  opacity: ${e=>e.$disabled?.3:1};
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: var(--bg-hover);
    color: var(--matte-red);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`,Sy=Mf.div`
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
`,zy=Mf.div`
  margin: 20px auto 12px auto;
  text-align: center;
  max-width: 600px;
  padding: 0 20px;
  animation: ${Mv} 0.6s ease-out;
`,$y=Mf.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
`,Cy=Mf.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
`,Ey=Mf.div`
  font-size: 1.8rem;
  color: var(--text-primary);
  font-weight: 600;
`;Mf.img`
  width: 100%;
  max-width: 300px;
  max-height: 200px;
  border-radius: 16px;
  margin-top: 15px;
  object-fit: cover;
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;const _y=Mf.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px auto;
  max-width: 600px;
  padding: 0 20px;
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`,Dy=Mf.div`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`,Ty=Mf.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--matte-red);
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,Ny=Mf.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`,Py=({onNavigate:e,toggleTheme:r,isDarkTheme:t,hideNavigation:n=!1,onModalStateChange:a})=>{const[o,i]=O.useState([]),[l,s]=O.useState(!0),[d,c]=O.useState(null),[p,u]=O.useState(!1),[f,x]=O.useState(null),[h,m]=O.useState(1),[g,b]=O.useState(1),[v,y]=O.useState(0),[w,k]=O.useState(0),[j,S]=O.useState(!1),z=e=>{if(e.startsWith("http"))return e;const r="3001"===window.location.port?"3000":window.location.port;return`${window.location.protocol}//${window.location.hostname}:${r}${e}`},$=e=>{const r=e.toLowerCase();return[".mp4",".webm",".ogg",".mov",".avi",".mkv",".flv",".wmv"].some(e=>r.endsWith(e))},C=e=>{e>=1&&e<=g&&_(e)},E=()=>{x(null),null==a||a(!1),document.body.style.overflow=""},_=async(e=1)=>{var r;try{s(!0);const t=await fetch(`http://localhost:3000/api/reviews?page=${e}&limit=5`);if(t.ok){const n=await t.json();i(n.reviews||[]);let a=n.totalPages;a&&0!==a||(a=Math.ceil((n.total||(null==(r=n.reviews)?void 0:r.length)||0)/5)),b(a),m(e),(e>1||1===e&&j)&&setTimeout(()=>{const e=document.getElementById("reviews-section");e&&e.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})},300),1===e&&S(!0)}else c("Ошибка загрузки отзывов")}catch(t){console.error("Ошибка загрузки отзывов:",t),c("Ошибка загрузки отзывов")}finally{s(!1)}};O.useEffect(()=>(document.documentElement.style.scrollBehavior="smooth",_(),(async()=>{try{const e=await fetch("http://localhost:3000/api/reviews/average-rating");if(e.ok){const r=await e.json();y(r.averageRating||0)}}catch(e){console.error("Ошибка получения средней оценки:",e)}})(),()=>{document.documentElement.style.scrollBehavior="auto",document.body.style.overflow=""}),[]);const D=e=>Array.from({length:5},(r,t)=>Q.jsx(iy,{$filled:t<e,children:"★"},t)),T=(e,r)=>{const t=e||r||"Аноним";if("string"!=typeof t||""===t.trim())return"А";const n=t.replace("@","").trim()||"Аноним";if(0===n.length)return"А";const a=n.split(" ").filter(e=>e.length>0);return 0===a.length?"А":a.length>1?a.map(e=>e[0]||"").join("").substring(0,2).toUpperCase()||"А":(n[0]||"А").toUpperCase()};return Q.jsxs(Yv,{children:[Q.jsxs(Bv,{children:[Q.jsx(Wv,{onClick:()=>{lx.light&&lx.light(),e("main")},children:"‹"}),Q.jsx(Qv,{children:"Отзывы"}),Q.jsxs(Uv,{onClick:r,children:[Q.jsx(qv,{$isDark:t,children:"🌙"}),Q.jsx(Vv,{$isDark:t,children:"☀️"}),Q.jsx(Hv,{$isDark:t})]})]}),Q.jsx(Xv,{children:Q.jsxs(Kv,{children:[Q.jsx(hy,{children:"Поделитесь своим опытом"}),Q.jsx(my,{children:"Расскажите о вашем опыте покупок и помогите другим клиентам"}),Q.jsx(gy,{onClick:()=>{lx.medium&&lx.medium();const e=window.scrollY||window.pageYOffset||0;k(e),u(!0),null==a||a(!0)},children:"Написать отзыв"})]})}),Q.jsx(Ov,{isDarkTheme:t,onModalStateChange:a}),v>0&&Q.jsxs(zy,{children:[Q.jsx($y,{children:"Общая оценка"}),Q.jsx("div",{style:{width:"100px",height:"2px",background:"var(--matte-red)",margin:"0 auto 15px auto",borderRadius:"1px"}}),Q.jsx(Cy,{children:Array.from({length:5},(e,r)=>{const t=Math.max(0,Math.min(100,100*(v-r)));return Q.jsx(ly,{$fillPercentage:t,children:"★"},r)})}),Q.jsx(Ey,{children:v.toFixed(1)})]}),o.length>0&&Q.jsxs("div",{style:{textAlign:"center",margin:"20px auto",maxWidth:"600px",padding:"0 20px"},children:[Q.jsx("div",{style:{fontFamily:"Noto Sans SC, Inter, Arial, sans-serif",fontSize:"1.2rem",fontWeight:"600",color:"var(--text-primary)",marginBottom:"10px"},children:"Отзывы наших клиентов"}),Q.jsx("div",{style:{width:"100px",height:"2px",background:"var(--matte-red)",margin:"0 auto",borderRadius:"1px"}})]}),o.length>0&&Q.jsxs(Q.Fragment,{children:[l?Q.jsx(Gv,{children:Q.jsxs("div",{style:{textAlign:"center",padding:"40px"},children:[Q.jsx(Ty,{}),Q.jsx("div",{style:{marginTop:"15px",color:"var(--text-secondary)"},children:"Загрузка отзывов..."})]})}):d?Q.jsx(Gv,{children:Q.jsx(Ny,{children:d})}):Q.jsx(_y,{id:"reviews-section",children:o.map(e=>Q.jsx(Dy,{onClick:()=>(e=>{lx.light&&lx.light();const r=window.scrollY||window.pageYOffset||0;k(r),x(e),null==a||a(!0),document.body.style.overflow="hidden"})(e),children:Q.jsxs(Jv,{children:[Q.jsxs(Zv,{children:[Q.jsxs(ey,{children:[Q.jsx(ry,{$hasImage:!!e.avatar_url,children:e.avatar_url?Q.jsx("img",{src:e.avatar_url,alt:e.full_name||e.username||"Аватар",onError:r=>{r.currentTarget.style.display="none";const t=r.currentTarget.parentElement;t&&(t.textContent=T(e.username,e.full_name))}}):T(e.username,e.full_name)}),Q.jsxs(ty,{children:[Q.jsx(ny,{children:e.full_name||e.username||"Аноним"}),Q.jsx(ay,{children:new Date(e.created_at).toLocaleDateString("ru-RU")})]})]}),Q.jsx(oy,{children:D(e.rating)})]}),Q.jsxs(fy,{children:[Q.jsx(xy,{children:Q.jsx(sy,{children:e.review_text})}),(()=>{const r=e.photos&&e.photos.length>0?e.photos:e.photo_url?[e.photo_url]:[];if(r.length>0){const e=r[0],t=r.length-1;return Q.jsxs(dy,{children:[$(e)?Q.jsx(py,{src:z(e),controls:!0,muted:!0,playsInline:!0,onError:r=>{console.error("Ошибка загрузки видео в списке:",e),r.currentTarget.style.display="none"}}):Q.jsx(cy,{src:z(e),alt:"Фото отзыва 1",onError:r=>{console.error("Ошибка загрузки изображения в списке:",e),r.currentTarget.style.display="none"},onLoad:()=>{console.log("Изображение в списке загружено:",e)}}),t>0&&Q.jsxs(uy,{children:["+",t]})]})}return null})()]})]})},e.review_id))}),!l&&!d&&g>0&&Q.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px"},children:[Q.jsxs(ky,{children:[Q.jsx(jy,{onClick:()=>C(h-1),disabled:1===h,$disabled:1===h,children:"‹"}),Array.from({length:Math.min(5,g)},(e,r)=>{let t;return t=g<=5||h<=3?r+1:h>=g-2?g-4+r:h-2+r,Q.jsx(jy,{onClick:()=>C(t),$active:h===t,children:t},t)}),Q.jsx(jy,{onClick:()=>C(h+1),disabled:h===g,$disabled:h===g,children:"›"})]}),Q.jsxs(Sy,{children:[h," из ",g]})]})]}),Q.jsx(wv,{isOpen:p,onClose:()=>{u(!1),null==a||a(!1)},onSuccess:()=>{_(h)},scrollPosition:w}),f&&Q.jsx(by,{onClick:E,children:Q.jsxs(vy,{$scrollPosition:w,onClick:e=>e.stopPropagation(),style:{"--scroll-position":`${w}px`},children:[Q.jsx(yy,{onClick:E,style:{position:"absolute",top:"15px",right:"15px",zIndex:10},children:"×"}),Q.jsxs("div",{style:{marginBottom:"20px"},children:[Q.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px",marginBottom:"15px"},children:[Q.jsx(ry,{$hasImage:!!f.avatar_url,style:{width:"50px",height:"50px"},children:f.avatar_url?Q.jsx("img",{src:f.avatar_url,alt:f.full_name||f.username||"Аватар",onError:e=>{e.currentTarget.style.display="none";const r=e.currentTarget.parentElement;r&&(r.textContent=T(f.username,f.full_name))}}):T(f.username,f.full_name)}),Q.jsxs("div",{children:[Q.jsx(ny,{style:{fontSize:"1.1rem",marginBottom:"5px"},children:f.full_name||f.username||"Аноним"}),Q.jsx(ay,{style:{fontSize:"0.9rem"},children:new Date(f.created_at).toLocaleDateString("ru-RU")})]})]}),Q.jsx("div",{style:{marginBottom:"15px"},children:D(f.rating)})]}),Q.jsx(wy,{children:f.review_text}),(f.photos&&f.photos.length>0?f.photos:f.photo_url?[f.photo_url]:[]).map((e,r)=>Q.jsx("div",{style:{marginTop:"15px",textAlign:"center"},children:$(e)?Q.jsx("video",{src:z(e),controls:!0,style:{width:"100%",maxWidth:"300px",maxHeight:"400px",borderRadius:"12px",objectFit:"contain",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)",display:"block",margin:"0 auto"},onError:r=>{console.error("Ошибка загрузки видео:",e),r.currentTarget.style.display="none"}}):Q.jsx("img",{src:z(e),alt:`Фото отзыва ${r+1}`,style:{width:"100%",maxWidth:"300px",borderRadius:"12px",objectFit:"cover",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)",display:"block",margin:"0 auto"},onError:r=>{console.error("Ошибка загрузки изображения:",e),r.currentTarget.style.display="none"},onLoad:()=>{console.log("Изображение загружено успешно:",e)}})},r))]})})]})},Iy=Mf.div`
  position: fixed;
  bottom: -1px;
  left: 0;
  right: 0;
  width: 100%;
  background: ${e=>e.$isDark?"rgba(40, 40, 45, 0.4)":"rgba(255, 252, 248, 0.4)"};
  border-top: 1px solid ${e=>e.$isDark?"rgba(196, 77, 77, 0.3)":"rgba(162, 59, 59, 0.2)"};
  backdrop-filter: blur(25px) saturate(1.3) brightness(1.1);
  z-index: 9999;
  padding: 4px 0 6px 0;
  display: ${e=>e.$hideNavigation?"none":"block"};
  margin: 0;
`,Ay=Mf.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`,Fy=Mf.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 12px;
  width: 60px;
  height: 50px;
  position: relative;
  flex: 1;
  
  ${e=>e.$active&&`\n    background: ${e.$isDark?"rgba(196, 77, 77, 0.15)":"rgba(162, 59, 59, 0.1)"};\n  `}
  
  &:hover {
    background: ${e=>e.$isDark?"rgba(196, 77, 77, 0.08)":"rgba(162, 59, 59, 0.05)"};
  }
`,Ly=Mf.div`
  font-size: 22px;
  margin-bottom: 3px;
  position: relative;
  z-index: 2;
  color: ${e=>e.$isDark?"white":"black"};
`,Ry=Mf.span`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 12px;
  font-weight: ${e=>e.$active?"700":"500"};
  color: ${e=>e.$active?"var(--matte-red)":"var(--text-secondary)"};
  text-align: center;
  line-height: 1.2;
  position: relative;
  z-index: 2;
`,Oy=({activeTab:e,onTabChange:r,isDarkTheme:t,hideNavigation:n=!1})=>Q.jsx(Iy,{$isDark:t,$hideNavigation:n,children:Q.jsx(Ay,{children:[{id:"yuan",label:"Купить юань",icon:"¥"},{id:"main",label:"Главное меню",icon:"🏠"},{id:"profile",label:"Профиль",icon:"👤"}].map(n=>Q.jsxs(Fy,{$active:e===n.id,$isDark:t,onClick:()=>{return e=n.id,lx.impactOccurred&&lx.impactOccurred("medium"),void r(e);var e},children:[Q.jsx(Ly,{$active:e===n.id,$isDark:t,children:n.icon}),Q.jsx(Ry,{$active:e===n.id,children:n.label})]},n.id))})}),My=M.lazy(()=>ap(()=>import("./Profile-BrvqujTW.js"),[])),Yy=M.lazy(()=>ap(()=>import("./YuanPurchase-Cuo6wAqL.js"),[])),By=M.lazy(()=>ap(()=>import("./AdminPanel-BkZOsSeY.js"),[])),Wy=M.lazy(()=>ap(()=>import("./TrackingForm-tSTGRWtl.js"),[])),Uy=Bf`
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;Bf`
  0%, 100% { 
    box-shadow: 0 0 10px rgba(220, 20, 20, 0.2);
  }
  50% { 
    box-shadow: 0 0 15px rgba(220, 20, 20, 0.3);
  }
`;const Hy=(function(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];var n=Lf.apply(void 0,ip([e],r,!1)),a="sc-global-".concat($u(JSON.stringify(n))),o=new Yf(n,a),i=function(e){var r=kf(),t=M.useContext(Nf),n=M.useRef(r.styleSheet.allocateGSInstance(a)).current;return r.styleSheet.server&&l(n,e,r.styleSheet,t,r.stylis),M.useLayoutEffect(function(){if(!r.styleSheet.server)return l(n,e,r.styleSheet,t,r.stylis),function(){return o.removeStyles(n,r.styleSheet)}},[n,e,r.styleSheet,t,r.stylis]),null};function l(e,r,t,n,a){if(o.isStatic)o.renderStyles(e,uu,t,a);else{var l=op(op({},r),{theme:hu(r,n,i.defaultProps)});o.renderStyles(e,l,t,a)}}return M.memo(i)})`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700;900&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
  
  :root {
    /* Светлая тема - Дневная китайская деревня (вдохновлено референсом) */
    --bg-primary: #F5F2E8;
    --bg-secondary: #F9F6ED;
    --bg-card: rgba(230, 211, 179, 0.85);
    --text-primary: #2A2A2A;
    --text-secondary: #5D4E37;
    --text-accent: #A49784;
    --matte-red: #A23B3B;
    --terracotta: #B86B4B;
    --sand: #E6D3B3;
    --dark-beige: #A49784;
    --ink-black: #2A2A2A;
    --shadow-soft: rgba(162, 59, 59, 0.15);
    --shadow-card: rgba(164, 151, 132, 0.2);
    --glow-red: rgba(162, 59, 59, 0.3);
    --glow-terracotta: rgba(184, 107, 75, 0.5);
    --pattern-color: rgba(139, 69, 19, 0.8);
    --border-color: rgba(162, 59, 59, 0.2);
  }

  [data-theme="dark"] {
    /* Темная тема - Ночная китайская деревня */
    --bg-primary: #1A1A1A;
    --bg-secondary: #2A2A2A;
    --bg-card: rgba(42, 42, 42, 0.9);
    --text-primary: #E6D3B3;
    --text-secondary: #A49784;
    --text-accent: #B86B4B;
    --matte-red: #C44D4D;
    --terracotta: #D18A6B;
    --sand: #8B7D6B;
    --dark-beige: #6B5B47;
    --ink-black: #E6D3B3;
    --shadow-soft: rgba(196, 77, 77, 0.25);
    --shadow-card: rgba(107, 91, 71, 0.3);
    --glow-red: rgba(196, 77, 77, 0.4);
    --glow-terracotta: rgba(209, 138, 107, 0.6);
    --pattern-color: rgba(209, 138, 107, 0.5);
    --border-color: rgba(196, 77, 77, 0.3);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  body {
    font-family: 'Inter', 'Noto Sans SC', Arial, sans-serif;
    background: var(--bg-primary);
    background-image: 
      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="paper-texture" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse"><rect width="400" height="400" fill="%23F5F2E8"/><g opacity="0.03"><circle cx="50" cy="50" r="1" fill="%23A49784"/><circle cx="150" cy="100" r="0.5" fill="%23B86B4B"/><circle cx="300" cy="200" r="1.5" fill="%23A23B3B"/><circle cx="100" cy="300" r="0.8" fill="%23A49784"/><circle cx="350" cy="350" r="1.2" fill="%23B86B4B"/></g><g opacity="0.02"><path d="M20,20 Q50,10 80,20 T140,20" stroke="%23A49784" stroke-width="0.5" fill="none"/><path d="M200,50 Q230,40 260,50 T320,50" stroke="%23B86B4B" stroke-width="0.3" fill="none"/><path d="M50,200 Q80,190 110,200 T170,200" stroke="%23A23B3B" stroke-width="0.4" fill="none"/></g></pattern></defs><rect width="400" height="400" fill="url(%23paper-texture)"/></svg>'),
      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><pattern id="chinese-clouds" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse"><g opacity="0.04"><path d="M20,40 Q30,20 50,30 Q70,10 90,25 Q110,5 130,20 Q150,0 170,15 Q190,5 200,25 L200,40 Z" fill="%23A49784"/><path d="M0,80 Q20,60 40,75 Q60,55 80,70 Q100,50 120,65 Q140,45 160,60 Q180,40 200,55 L200,80 Z" fill="%23B86B4B"/><path d="M10,120 Q30,100 50,115 Q70,95 90,110 Q110,90 130,105 Q150,85 170,100 Q190,80 200,95 L200,120 Z" fill="%23A23B3B"/></g></pattern></defs><rect width="200" height="200" fill="url(%23chinese-clouds)"/></svg>');
    color: var(--text-primary);
    overflow-x: hidden;
    position: relative;
    line-height: 1.6;
    font-weight: 400;
    min-height: 100vh;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Плавающие иероглифы */
  .floating-hieroglyphs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .hieroglyph {
    position: absolute;
    font-family: 'Noto Sans SC', serif;
    color: var(--pattern-color);
    text-shadow: 
      0 0 6px var(--glow-terracotta),
      0 0 12px var(--glow-terracotta);
    animation: floatChaotic 25s ease-in-out infinite;
    opacity: 0.15;
    font-weight: 500;
    font-size: 1.4rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
    filter: none;
  }

  .hieroglyph:nth-child(1) { top: 10%; left: 5%; font-size: 2rem; animation-delay: 0s; }
  .hieroglyph:nth-child(2) { top: 20%; left: 15%; font-size: 1.5rem; animation-delay: 2s; }
  .hieroglyph:nth-child(3) { top: 30%; left: 8%; font-size: 1.8rem; animation-delay: 4s; }


  .hieroglyph:nth-child(4) { top: 15%; left: 25%; font-size: 1.2rem; animation-delay: 6s; }

  .hieroglyph:nth-child(5) { top: 25%; left: 35%; font-size: 1.6rem; animation-delay: 8s; }
  .hieroglyph:nth-child(6) { top: 40%; left: 12%; font-size: 1.4rem; animation-delay: 10s; }
  .hieroglyph:nth-child(7) { top: 50%; left: 28%; font-size: 1.7rem; animation-delay: 12s; }
  .hieroglyph:nth-child(8) { top: 60%; left: 18%; font-size: 1.3rem; animation-delay: 14s; }
  .hieroglyph:nth-child(9) { top: 70%; left: 32%; font-size: 1.5rem; animation-delay: 16s; }
  .hieroglyph:nth-child(10) { top: 80%; left: 22%; font-size: 1.1rem; animation-delay: 18s; }
  .hieroglyph:nth-child(11) { top: 5%; right: 10%; font-size: 1.8rem; animation-delay: 3s; }
  .hieroglyph:nth-child(12) { top: 18%; right: 20%; font-size: 1.4rem; animation-delay: 5s; }
  .hieroglyph:nth-child(13) { top: 35%; right: 15%; font-size: 1.6rem; animation-delay: 7s; }
  .hieroglyph:nth-child(14) { top: 45%; right: 25%; font-size: 1.2rem; animation-delay: 9s; }
  .hieroglyph:nth-child(15) { top: 55%; right: 12%; font-size: 1.7rem; animation-delay: 11s; }
  .hieroglyph:nth-child(16) { top: 65%; right: 22%; font-size: 1.3rem; animation-delay: 13s; }
  .hieroglyph:nth-child(17) { top: 75%; right: 18%; font-size: 1.5rem; animation-delay: 15s; }
  .hieroglyph:nth-child(18) { top: 85%; right: 28%; font-size: 1.1rem; animation-delay: 17s; }

  @keyframes floatUpDown {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes floatChaotic {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    25% { transform: translate(10px, -5px) rotate(1deg); }
    50% { transform: translate(-5px, -10px) rotate(-1deg); }
    75% { transform: translate(-8px, 5px) rotate(0.5deg); }
    100% { transform: translate(0px, 0px) rotate(0deg); }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    text-shadow: 0 0 20px var(--glow-gold);
  }

  /* Минималистичные стили в китайском стиле */
  .mystic-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    box-shadow: 
      0 4px 20px var(--shadow-card),
      0 2px 8px var(--shadow-soft);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .mystic-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--imperial-red), var(--dragon-gold), var(--tech-blue), var(--mystic-purple));
    border-radius: 24px;
    padding: 2px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .mystic-card:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 30px var(--shadow-card),
      0 4px 12px var(--shadow-soft),
      0 0 0 1px var(--border-color);
  }

  .mystic-card:hover::before {
    opacity: 1;
  }

  /* Минималистичные кнопки в китайском стиле */
  .dragon-button {
    background: var(--matte-red);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    color: var(--bg-primary);
    font-weight: 600;
    font-family: 'Noto Sans SC', 'Inter', sans-serif;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 12px var(--shadow-soft),
      0 2px 6px var(--shadow-card);
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
  }

  .dragon-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }

  .dragon-button:hover {
    transform: translateY(-5px);
    background: var(--terracotta);
    box-shadow: 
      0 12px 35px var(--shadow-soft),
      0 6px 16px var(--shadow-card);
    border-color: var(--dark-beige);
    color: var(--bg-primary);
  }

  .dragon-button:hover::before {
    left: 100%;
  }

  .dragon-button:active {
    transform: translateY(0) scale(1.02);
  }

  .tech-button {
    background: linear-gradient(135deg, var(--tech-blue) 0%, #0099CC 50%, var(--tech-blue) 100%);
    border: 1px solid rgba(0, 191, 255, 0.3);
    color: var(--silk-white);
    box-shadow: 
      0 4px 20px var(--shadow-mystic),
      0 0 20px var(--glow-tech),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .tech-button:hover {
    background: linear-gradient(135deg, #00CCFF 0%, var(--tech-blue) 50%, #0099CC 100%);
    box-shadow: 
      0 8px 30px var(--shadow-mystic),
      0 0 40px var(--glow-tech),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  /* Акцентные элементы */
  .imperial-accent {
    color: var(--imperial-red);
    font-family: 'Noto Sans SC', serif;
    font-weight: 700;
    text-shadow: 0 0 10px var(--glow-red);
  }

  .gold-accent {
    color: var(--dragon-gold);
    font-family: 'Noto Sans SC', serif;
    font-weight: 600;
    text-shadow: 0 0 8px var(--glow-gold);
  }

  /* Декоративные элементы */
  .mystic-seal {
    position: absolute;
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, var(--imperial-red), var(--dragon-gold));
    border-radius: 12px;
    opacity: 0.1;
    transform: rotate(45deg);
    box-shadow: 0 0 20px var(--glow-gold);
  }

  .dragon-watermark {
    position: fixed;
    top: 15%;
    right: 5%;
    width: 300px;
    height: 200px;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><defs><linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23DC143C"/><stop offset="50%" stop-color="%23FFD700"/><stop offset="100%" stop-color="%2300BFFF"/></linearGradient><filter id="dragonGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g><path d="M30 100 C50 80 80 70 120 80 C160 70 200 80 220 100 C200 120 160 130 120 120 C80 130 50 120 30 100 Z" fill="url(%23dragonGrad)" filter="url(%23dragonGlow)" opacity="0.15"/><circle cx="100" cy="90" r="4" fill="%23FFD700" filter="url(%23dragonGlow)"/><circle cx="140" cy="90" r="4" fill="%23FFD700" filter="url(%23dragonGlow)"/></g></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: -1;
    animation: dragonFloat 6s ease-in-out infinite;
  }

  @keyframes dragonFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
  
  /* Технологичный скроллбар */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(26, 26, 46, 0.3);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--imperial-red), var(--dragon-gold));
    border-radius: 4px;
    box-shadow: 0 0 10px var(--glow-red);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, var(--dragon-gold), var(--tech-blue));
    box-shadow: 0 0 15px var(--glow-gold);
  }

  /* Унифицированные стили для модальных окон помощи */
  .help-modal {
    background: var(--bg-card);
    border-radius: 20px;
    padding: 20px;
    max-width: 80vw;
    max-height: 80vh;
    width: 80%;
    text-align: center;
    border: 1px solid var(--border-color);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 10px 20px var(--shadow-card);
    overflow-y: auto;
  }

  .help-modal-title {
    font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 16px 0;
  }

  .help-modal-text {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 20px 0;
  }

  .help-modal-image {
    width: 100%;
    max-width: 350px;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--shadow-soft);
    margin: 0 auto;
    display: block;
  }

  .help-modal-video {
    width: 100%;
    max-width: 350px;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--shadow-soft);
    margin: 0 auto;
    display: block;
  }
`,qy=Mf.div`
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  animation: ${Uy} 0.8s ease-out forwards;
  transition: all 0.5s ease;
`;Mf.div`
  position: fixed;
  top: 40px;
  right: 20px;
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,Mf.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--bg-primary);
`,Mf.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,Mf.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`;const Vy=Mf.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${Uy} 0.8s ease-out forwards;
  transition: all 0.5s ease;
`;Bf`
  0%, 100% { 
    transform: scale(1);
    opacity: 0.8;
  }
  50% { 
    transform: scale(1.2);
    opacity: 1;
  }
`;const Qy=Bf`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;Bf`
  0%, 100% { 
    box-shadow: 0 0 20px var(--glow-red);
  }
  50% { 
    box-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta);
  }
`,Bf`
  0%, 100% { 
    transform: translateY(0px);
  }
  50% { 
    transform: translateY(-10px);
  }
`;const Xy=Bf`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.8;
  }
  25% { 
    transform: translateY(-8px) rotate(2deg) scale(1.05);
    opacity: 1;
  }
  50% { 
    transform: translateY(-12px) rotate(0deg) scale(1.1);
    opacity: 0.9;
  }
  75% { 
    transform: translateY(-6px) rotate(-1deg) scale(1.05);
    opacity: 1;
  }
`;Bf`
  0%, 100% { 
    box-shadow: 0 0 20px var(--glow-red), 0 0 30px var(--glow-terracotta);
  }
  50% { 
    box-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta), 0 0 50px var(--glow-red);
  }
`;const Gy=Bf`
  0% { 
    transform: scale(0.8) rotate(0deg);
    opacity: 0.7;
  }
  50% { 
    transform: scale(1.1) rotate(180deg);
    opacity: 1;
  }
  100% { 
    transform: scale(0.9) rotate(360deg);
    opacity: 0.8;
  }
`,Ky=Mf.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 50px auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${Xy} 3s ease-in-out infinite;
`,Jy=Mf.div`
  width: 80px;
  height: 80px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--matte-red);
  border-radius: 50%;
  animation: ${Qy} 1.5s linear infinite;
  position: relative;
  box-shadow: 0 0 20px var(--glow-red);
`,Zy=Mf.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid var(--glow-terracotta);
  border-radius: 50%;
  animation: ${Qy} 2s linear infinite reverse;
  opacity: 0.7;
  box-shadow: 0 0 15px var(--glow-terracotta);
`,ew=Mf.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, var(--matte-red) 0%, var(--terracotta) 50%, transparent 70%);
  border-radius: 50%;
  animation: ${Gy} 2.5s ease-in-out infinite;
  opacity: 0.8;
  box-shadow: 0 0 25px var(--glow-red);
`,rw=Mf.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: conic-gradient(
    var(--matte-red) 0deg,
    var(--terracotta) 60deg,
    var(--matte-red) 120deg,
    var(--terracotta) 180deg,
    var(--matte-red) 240deg,
    var(--terracotta) 300deg,
    var(--matte-red) 360deg
  );
  border-radius: 50%;
  animation: ${Qy} 3s linear infinite;
  opacity: 0.6;
  filter: blur(1px);
`;Bf`
  0% { text-shadow: 0 0 15px var(--glow-terracotta); }
  100% { text-shadow: 0 0 25px var(--glow-red), 0 0 35px var(--glow-terracotta); }
`;const tw=Mf.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.02em;
  text-shadow: 0 0 15px var(--glow-terracotta);
  animation: textGlow 3s ease-in-out infinite alternate;
  text-align: center;
`,nw=Mf.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-top: 20px;
  opacity: 0.95;
  font-weight: 550;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 1.4;
`,aw=["Из Поднебесной — прямо к тебе.","Восточный ветер несёт удачу.","Путь вещей короток с нами.","Быстро. Выгодно. Для тебя.","Легенды Китая — в твоих руках.","Восток ближе, чем кажется.","Доставляем, пока кипит чай.","Твои вещи уже в пути.","Где выгода — там и ты.","Сокровища Востока — твои сегодня.","Пойзон ведёт — вещь идёт.","Удача на крыльях доставки.","Китай ближе, чем ты думаешь.","Вещь ждёт только тебя.","Гармония покупок начинается здесь.","Быстрая дорога — верный выбор.","Твой заказ уже шагает.","Из Китая с любовью.","Вещь обретает хозяина мгновенно.","Ветер Поднебесной приносит тебе.","Каждый клик — к выгоде.","Пусть вещь найдёт тебя.","Восточная выгода в каждом заказе.","Время летит — и вещи тоже.","Всё нужное приходит вовремя.","Твой заказ идёт, как дракон.","Быстро. Чисто. По-пойзоновски.","Китайские цены — русская скорость.","Настоящая выгода всегда рядом.","Заказал — значит уже твоё.","Твой путь к стилю начат.","Восток рождает новые находки.","Вещи к тебе, как по шелку.","Выгода течёт, как река.","Доставка быстрее ветра.","Каждая вещь — как талисман.","С Поднебесной — в карман.","Твоё лучшее уже близко.","Вещи путешествуют, выгода остаётся.","От Великой стены — прямо тебе.","Китайские сокровища не ждут.","Твой заказ шагает уверенно.","Стиль приходит быстрее ветра.","Вещи летят к достойному.","Восток раскрывается в деталях.","Твоя находка уже в пути.","Легко заказать — легко получить.","Китай вдохновляет. Мы доставляем.","Всё лучшее из Поднебесной — тебе.","Быстрее ветра, выгоднее всех."],ow=()=>{var e,r;const[t,n]=O.useState("main"),[a,o]=O.useState("main"),[i,l]=O.useState(null),[s,d]=O.useState(!0),[c,p]=O.useState(!1),[u,f]=O.useState(""),[x,h]=O.useState(!1),[m,g]=O.useState(!1);O.useEffect(()=>{var e,r;const a=Math.floor(Math.random()*aw.length);f(aw[a]);const o=localStorage.getItem("theme");if(o&&(p("dark"===o),document.documentElement.setAttribute("data-theme",o)),null==(e=window.Telegram)?void 0:e.WebApp){const e=window.Telegram.WebApp;e.ready(),e.expand();const a=null==(r=e.initDataUnsafe)?void 0:r.user;if(a){l(a),console.log("Telegram user:",a),(async e=>{try{(await fetch("/api/user/init",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({telegramId:e.id,username:e.username||null,fullName:e.first_name||null})})).ok?console.log("User initialized successfully"):console.error("Failed to initialize user")}catch(r){console.error("Error initializing user:",r)}})(a);const e=setInterval(async()=>{try{await fetch("http://localhost:3001/api/user/heartbeat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({telegramId:a.id})})}catch(e){console.error("Heartbeat error:",e)}},1e4);return()=>clearInterval(e)}e.MainButton.text="🐉 Главное меню",e.MainButton.onClick(()=>{n("main"),e.MainButton.hide()}),e.BackButton.onClick(()=>{"main"!==t&&(n("main"),e.BackButton.hide(),e.MainButton.hide())});const o=new URLSearchParams(window.location.search).get("start");if(o&&o.startsWith("ref_")){const e=o.replace("ref_","");v(e)}}setTimeout(()=>{d(!1)},1e3)},[]),O.useEffect(()=>{var e;if(null==(e=window.Telegram)?void 0:e.WebApp){const e=window.Telegram.WebApp;"main"===t?(e.MainButton.hide(),ix()&&e.BackButton.hide()):(ix()&&e.BackButton.show(),e.MainButton.show())}},[t]);const b=()=>{lx.selection();const e=!c;p(e);const r=e?"dark":"light";document.documentElement.setAttribute("data-theme",r),localStorage.setItem("theme",r)},v=async e=>{var r,t;try{(await fetch("/api/referral",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({telegramId:(null==i?void 0:i.id)||0,referredBy:parseInt(e)})})).ok&&(console.log("Referral processed successfully"),(null==(t=null==(r=window.Telegram)?void 0:r.WebApp)?void 0:t.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"))}catch(n){console.error("Error processing referral:",n)}},y=e=>{var r,t;n(e),"main"===e&&(window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0),"admin"===e?o("admin"):"profile"===e&&o("profile"),(null==(t=null==(r=window.Telegram)?void 0:r.WebApp)?void 0:t.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.impactOccurred("light")};return s?Q.jsxs(Q.Fragment,{children:[Q.jsx(Hy,{}),Q.jsxs(Vy,{children:[Q.jsxs("div",{className:"floating-hieroglyphs",children:[Q.jsx("div",{className:"hieroglyph",children:"龍"}),Q.jsx("div",{className:"hieroglyph",children:"福"}),Q.jsx("div",{className:"hieroglyph",children:"壽"}),Q.jsx("div",{className:"hieroglyph",children:"喜"}),Q.jsx("div",{className:"hieroglyph",children:"財"}),Q.jsx("div",{className:"hieroglyph",children:"吉"}),Q.jsx("div",{className:"hieroglyph",children:"祥"}),Q.jsx("div",{className:"hieroglyph",children:"安"}),Q.jsx("div",{className:"hieroglyph",children:"康"}),Q.jsx("div",{className:"hieroglyph",children:"樂"}),Q.jsx("div",{className:"hieroglyph",children:"智"}),Q.jsx("div",{className:"hieroglyph",children:"德"}),Q.jsx("div",{className:"hieroglyph",children:"義"}),Q.jsx("div",{className:"hieroglyph",children:"和"}),Q.jsx("div",{className:"hieroglyph",children:"信"}),Q.jsx("div",{className:"hieroglyph",children:"禮"}),Q.jsx("div",{className:"hieroglyph",children:"仁"}),Q.jsx("div",{className:"hieroglyph",children:"勇"})]}),Q.jsxs(Ky,{children:[Q.jsx(rw,{}),Q.jsx(Zy,{}),Q.jsx(Jy,{}),Q.jsx(ew,{})]}),Q.jsx(tw,{children:"poizonic"}),Q.jsx(nw,{children:u})]})]}):Q.jsxs(Q.Fragment,{children:[Q.jsx(Hy,{}),Q.jsxs(qy,{className:"app-container",style:{paddingBottom:"80px",paddingTop:"20px"},children:["main"===a&&Q.jsxs(Q.Fragment,{children:["main"===t&&Q.jsx(ax,{onNavigate:y,toggleTheme:b,isDarkTheme:c}),Q.jsxs("div",{className:"floating-hieroglyphs",children:[Q.jsx("div",{className:"hieroglyph",children:"龍"}),Q.jsx("div",{className:"hieroglyph",children:"福"}),Q.jsx("div",{className:"hieroglyph",children:"壽"}),Q.jsx("div",{className:"hieroglyph",children:"喜"}),Q.jsx("div",{className:"hieroglyph",children:"財"}),Q.jsx("div",{className:"hieroglyph",children:"吉"}),Q.jsx("div",{className:"hieroglyph",children:"祥"}),Q.jsx("div",{className:"hieroglyph",children:"安"}),Q.jsx("div",{className:"hieroglyph",children:"康"}),Q.jsx("div",{className:"hieroglyph",children:"樂"}),Q.jsx("div",{className:"hieroglyph",children:"智"}),Q.jsx("div",{className:"hieroglyph",children:"德"}),Q.jsx("div",{className:"hieroglyph",children:"義"}),Q.jsx("div",{className:"hieroglyph",children:"和"}),Q.jsx("div",{className:"hieroglyph",children:"信"}),Q.jsx("div",{className:"hieroglyph",children:"禮"}),Q.jsx("div",{className:"hieroglyph",children:"仁"}),Q.jsx("div",{className:"hieroglyph",children:"勇"})]}),"order"===t&&Q.jsx(Sh,{onNavigate:y,toggleTheme:b,isDarkTheme:c,onModalStateChange:g}),"calculator"===t&&Q.jsx(mm,{onNavigate:y,toggleTheme:b,isDarkTheme:c,onModalStateChange:g}),"tracking"===t&&Q.jsx(O.Suspense,{fallback:Q.jsx("div",{style:{textAlign:"center",padding:"40px"},children:"⏳ Загрузка..."}),children:Q.jsx(Wy,{isDark:c,onNavigate:y,toggleTheme:b})}),"faq"===t&&Q.jsx(Ym,{onNavigate:y,toggleTheme:b,isDarkTheme:c}),"instructions"===t&&Q.jsx($g,{onNavigate:y,toggleTheme:b,isDarkTheme:c,onModalStateChange:g}),"referral"===t&&Q.jsx(ab,{onNavigate:y,toggleTheme:b,isDarkTheme:c,onModalStateChange:g}),"exchange-rate"===t&&Q.jsx(_b,{onNavigate:y,isDarkTheme:c,toggleTheme:b}),"about"===t&&Q.jsx(Jb,{onNavigate:y,onToggleTheme:b,isDark:c}),"reviews"===t&&Q.jsx(Py,{onNavigate:y,toggleTheme:b,isDarkTheme:c,hideNavigation:x,onModalStateChange:h})]}),"profile"===a&&Q.jsx(O.Suspense,{fallback:Q.jsx("div",{style:{padding:"20px",textAlign:"center"},children:"Загрузка профиля..."}),children:Q.jsx(My,{telegramId:(null==(e=null==i?void 0:i.id)?void 0:e.toString())||"demo",isDarkTheme:c,toggleTheme:b,onNavigate:y,onModalStateChange:g})}),"admin"===a&&Q.jsx(O.Suspense,{fallback:Q.jsx("div",{style:{padding:"20px",textAlign:"center"},children:"Загрузка админки..."}),children:Q.jsx(By,{onNavigate:y,toggleTheme:b,isDarkTheme:c})}),"yuan"===a&&Q.jsx(O.Suspense,{fallback:Q.jsx("div",{style:{padding:"20px",textAlign:"center"},children:"Загрузка..."}),children:Q.jsx(Yy,{telegramId:(null==(r=null==i?void 0:i.id)?void 0:r.toString())||"demo",isDarkTheme:c,toggleTheme:b,onModalStateChange:g})})]}),Q.jsx(Oy,{activeTab:a,onTabChange:e=>{var r,t;const a=e;o(a),(null==(t=null==(r=window.Telegram)?void 0:r.WebApp)?void 0:t.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.impactOccurred("medium"),"main"===a&&(n("main"),window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0)},isDarkTheme:c,hideNavigation:m||x})]})};X.createRoot(document.getElementById("root")).render(Q.jsx(M.StrictMode,{children:Q.jsx(ow,{})}));export{lx as H,M as R,Mf as d,Q as j,Bf as m,O as r};
