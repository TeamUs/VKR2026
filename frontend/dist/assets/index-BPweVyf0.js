function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)}).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var t={exports:{}},n={},r={exports:{}},a={},o=Symbol.for("react.element"),i=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),d=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),m=Symbol.iterator;var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},x=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||b}function w(){}function k(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||b}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},w.prototype=y.prototype;var S=k.prototype=new w;S.constructor=k,x(S,y.prototype),S.isPureReactComponent=!0;var F=Array.isArray,C=Object.prototype.hasOwnProperty,j={current:null},z={key:!0,ref:!0,__self:!0,__source:!0};function E(e,t,n){var r,a={},i=null,l=null;if(null!=t)for(r in void 0!==t.ref&&(l=t.ref),void 0!==t.key&&(i=""+t.key),t)C.call(t,r)&&!z.hasOwnProperty(r)&&(a[r]=t[r]);var s=arguments.length-2;if(1===s)a.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];a.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps)void 0===a[r]&&(a[r]=s[r]);return{$$typeof:o,type:e,key:i,ref:l,props:a,_owner:j.current}}function N(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var _=/\/+/g;function T(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(e){return t[e]})}(""+e.key):t.toString(36)}function P(e,t,n,r,a){var l=typeof e;"undefined"!==l&&"boolean"!==l||(e=null);var s=!1;if(null===e)s=!0;else switch(l){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case o:case i:s=!0}}if(s)return a=a(s=e),e=""===r?"."+T(s,0):r,F(a)?(n="",null!=e&&(n=e.replace(_,"$&/")+"/"),P(a,t,n,"",function(e){return e})):null!=a&&(N(a)&&(a=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(a,n+(!a.key||s&&s.key===a.key?"":(""+a.key).replace(_,"$&/")+"/")+e)),t.push(a)),1;if(s=0,r=""===r?".":r+":",F(e))for(var u=0;u<e.length;u++){var c=r+T(l=e[u],u);s+=P(l,t,n,c,a)}else if(c=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=m&&e[m]||e["@@iterator"])?e:null}(e),"function"==typeof c)for(e=c.call(e),u=0;!(l=e.next()).done;)s+=P(l=l.value,t,n,c=r+T(l,u++),a);else if("object"===l)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function D(e,t,n){if(null==e)return e;var r=[],a=0;return P(e,r,"","",function(e){return t.call(n,e,a++)}),r}function A(e){if(-1===e._status){var t=e._result;(t=t()).then(function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)},function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var L={current:null},R={transition:null},$={ReactCurrentDispatcher:L,ReactCurrentBatchConfig:R,ReactCurrentOwner:j};function I(){throw Error("act(...) is not supported in production builds of React.")}a.Children={map:D,forEach:function(e,t,n){D(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return D(e,function(){t++}),t},toArray:function(e){return D(e,function(e){return e})||[]},only:function(e){if(!N(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},a.Component=y,a.Fragment=l,a.Profiler=u,a.PureComponent=k,a.StrictMode=s,a.Suspense=f,a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,a.act=I,a.cloneElement=function(e,t,n){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=x({},e.props),a=e.key,i=e.ref,l=e._owner;if(null!=t){if(void 0!==t.ref&&(i=t.ref,l=j.current),void 0!==t.key&&(a=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in t)C.call(t,u)&&!z.hasOwnProperty(u)&&(r[u]=void 0===t[u]&&void 0!==s?s[u]:t[u])}var u=arguments.length-2;if(1===u)r.children=n;else if(1<u){s=Array(u);for(var c=0;c<u;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:o,type:e.type,key:a,ref:i,props:r,_owner:l}},a.createContext=function(e){return(e={$$typeof:d,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:c,_context:e},e.Consumer=e},a.createElement=E,a.createFactory=function(e){var t=E.bind(null,e);return t.type=e,t},a.createRef=function(){return{current:null}},a.forwardRef=function(e){return{$$typeof:p,render:e}},a.isValidElement=N,a.lazy=function(e){return{$$typeof:h,_payload:{_status:-1,_result:e},_init:A}},a.memo=function(e,t){return{$$typeof:g,type:e,compare:void 0===t?null:t}},a.startTransition=function(e){var t=R.transition;R.transition={};try{e()}finally{R.transition=t}},a.unstable_act=I,a.useCallback=function(e,t){return L.current.useCallback(e,t)},a.useContext=function(e){return L.current.useContext(e)},a.useDebugValue=function(){},a.useDeferredValue=function(e){return L.current.useDeferredValue(e)},a.useEffect=function(e,t){return L.current.useEffect(e,t)},a.useId=function(){return L.current.useId()},a.useImperativeHandle=function(e,t,n){return L.current.useImperativeHandle(e,t,n)},a.useInsertionEffect=function(e,t){return L.current.useInsertionEffect(e,t)},a.useLayoutEffect=function(e,t){return L.current.useLayoutEffect(e,t)},a.useMemo=function(e,t){return L.current.useMemo(e,t)},a.useReducer=function(e,t,n){return L.current.useReducer(e,t,n)},a.useRef=function(e){return L.current.useRef(e)},a.useState=function(e){return L.current.useState(e)},a.useSyncExternalStore=function(e,t,n){return L.current.useSyncExternalStore(e,t,n)},a.useTransition=function(){return L.current.useTransition()},a.version="18.3.1",r.exports=a;var O=r.exports;const M=e(O);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B=O,W=Symbol.for("react.element"),U=Symbol.for("react.fragment"),Q=Object.prototype.hasOwnProperty,Y=B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,H={key:!0,ref:!0,__self:!0,__source:!0};function V(e,t,n){var r,a={},o=null,i=null;for(r in void 0!==n&&(o=""+n),void 0!==t.key&&(o=""+t.key),void 0!==t.ref&&(i=t.ref),t)Q.call(t,r)&&!H.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===a[r]&&(a[r]=t[r]);return{$$typeof:W,type:e,key:o,ref:i,props:a,_owner:Y.current}}n.Fragment=U,n.jsx=V,n.jsxs=V,t.exports=n;var G=t.exports,q={},X={exports:{}},K={},Z={exports:{}},J={};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!function(e){function t(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(!(0<a(o,t)))break e;e[r]=t,e[n]=o,n=r}}function n(e){return 0===e.length?null:e[0]}function r(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,i=o>>>1;r<i;){var l=2*(r+1)-1,s=e[l],u=l+1,c=e[u];if(0>a(s,n))u<o&&0>a(c,s)?(e[r]=c,e[u]=n,r=u):(e[r]=s,e[l]=n,r=l);else{if(!(u<o&&0>a(c,n)))break e;e[r]=c,e[u]=n,r=u}}}return t}function a(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("object"==typeof performance&&"function"==typeof performance.now){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var s=[],u=[],c=1,d=null,p=3,f=!1,g=!1,h=!1,m="function"==typeof setTimeout?setTimeout:null,b="function"==typeof clearTimeout?clearTimeout:null,x="undefined"!=typeof setImmediate?setImmediate:null;function v(e){for(var a=n(u);null!==a;){if(null===a.callback)r(u);else{if(!(a.startTime<=e))break;r(u),a.sortIndex=a.expirationTime,t(s,a)}a=n(u)}}function y(e){if(h=!1,v(e),!g)if(null!==n(s))g=!0,P(w);else{var t=n(u);null!==t&&D(y,t.startTime-e)}}function w(t,a){g=!1,h&&(h=!1,b(C),C=-1),f=!0;var o=p;try{for(v(a),d=n(s);null!==d&&(!(d.expirationTime>a)||t&&!E());){var i=d.callback;if("function"==typeof i){d.callback=null,p=d.priorityLevel;var l=i(d.expirationTime<=a);a=e.unstable_now(),"function"==typeof l?d.callback=l:d===n(s)&&r(s),v(a)}else r(s);d=n(s)}if(null!==d)var c=!0;else{var m=n(u);null!==m&&D(y,m.startTime-a),c=!1}return c}finally{d=null,p=o,f=!1}}"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var k,S=!1,F=null,C=-1,j=5,z=-1;function E(){return!(e.unstable_now()-z<j)}function N(){if(null!==F){var t=e.unstable_now();z=t;var n=!0;try{n=F(!0,t)}finally{n?k():(S=!1,F=null)}}else S=!1}if("function"==typeof x)k=function(){x(N)};else if("undefined"!=typeof MessageChannel){var _=new MessageChannel,T=_.port2;_.port1.onmessage=N,k=function(){T.postMessage(null)}}else k=function(){m(N,0)};function P(e){F=e,S||(S=!0,k())}function D(t,n){C=m(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_continueExecution=function(){g||f||(g=!0,P(w))},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(s)},e.unstable_next=function(e){switch(p){case 1:case 2:case 3:var t=3;break;default:t=p}var n=p;p=t;try{return e()}finally{p=n}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=p;p=e;try{return t()}finally{p=n}},e.unstable_scheduleCallback=function(r,a,o){var i=e.unstable_now();switch("object"==typeof o&&null!==o?o="number"==typeof(o=o.delay)&&0<o?i+o:i:o=i,r){case 1:var l=-1;break;case 2:l=250;break;case 5:l=1073741823;break;case 4:l=1e4;break;default:l=5e3}return r={id:c++,callback:a,priorityLevel:r,startTime:o,expirationTime:l=o+l,sortIndex:-1},o>i?(r.sortIndex=o,t(u,r),null===n(s)&&r===n(u)&&(h?(b(C),C=-1):h=!0,D(y,o-i))):(r.sortIndex=l,t(s,r),g||f||(g=!0,P(w))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=p;return function(){var n=p;p=t;try{return e.apply(this,arguments)}finally{p=n}}}}(J),Z.exports=J;var ee=Z.exports,te=O,ne=ee;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function re(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ae=new Set,oe={};function ie(e,t){le(e,t),le(e+"Capture",t)}function le(e,t){for(oe[e]=t,e=0;e<t.length;e++)ae.add(t[e])}var se=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),ue=Object.prototype.hasOwnProperty,ce=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,de={},pe={};function fe(e,t,n,r,a,o,i){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var ge={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ge[e]=new fe(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ge[t]=new fe(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){ge[e]=new fe(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ge[e]=new fe(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ge[e]=new fe(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){ge[e]=new fe(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){ge[e]=new fe(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){ge[e]=new fe(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){ge[e]=new fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var he=/[\-:]([a-z])/g;function me(e){return e[1].toUpperCase()}function be(e,t,n,r){var a=ge.hasOwnProperty(t)?ge[t]:null;(null!==a?0!==a.type:r||!(2<t.length)||"o"!==t[0]&&"O"!==t[0]||"n"!==t[1]&&"N"!==t[1])&&(function(e,t,n,r){if(null==t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,a,r)&&(n=null),r||null===a?function(e){return!!ue.call(pe,e)||!ue.call(de,e)&&(ce.test(e)?pe[e]=!0:(de[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=null===n?3!==a.type&&"":n:(t=a.attributeName,r=a.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(a=a.type)||4===a&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(he,me);ge[t]=new fe(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(he,me);ge[t]=new fe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(he,me);ge[t]=new fe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){ge[e]=new fe(e,1,!1,e.toLowerCase(),null,!1,!1)}),ge.xlinkHref=new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){ge[e]=new fe(e,1,!1,e.toLowerCase(),null,!0,!0)});var xe=te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ve=Symbol.for("react.element"),ye=Symbol.for("react.portal"),we=Symbol.for("react.fragment"),ke=Symbol.for("react.strict_mode"),Se=Symbol.for("react.profiler"),Fe=Symbol.for("react.provider"),Ce=Symbol.for("react.context"),je=Symbol.for("react.forward_ref"),ze=Symbol.for("react.suspense"),Ee=Symbol.for("react.suspense_list"),Ne=Symbol.for("react.memo"),_e=Symbol.for("react.lazy"),Te=Symbol.for("react.offscreen"),Pe=Symbol.iterator;function De(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=Pe&&e[Pe]||e["@@iterator"])?e:null}var Ae,Le=Object.assign;function Re(e){if(void 0===Ae)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ae=t&&t[1]||""}return"\n"+Ae+e}var $e=!1;function Ie(e,t){if(!e||$e)return"";$e=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&"string"==typeof u.stack){for(var a=u.stack.split("\n"),o=r.stack.split("\n"),i=a.length-1,l=o.length-1;1<=i&&0<=l&&a[i]!==o[l];)l--;for(;1<=i&&0<=l;i--,l--)if(a[i]!==o[l]){if(1!==i||1!==l)do{if(i--,0>--l||a[i]!==o[l]){var s="\n"+a[i].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}}while(1<=i&&0<=l);break}}}finally{$e=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Re(e):""}function Oe(e){switch(e.tag){case 5:return Re(e.type);case 16:return Re("Lazy");case 13:return Re("Suspense");case 19:return Re("SuspenseList");case 0:case 2:case 15:return e=Ie(e.type,!1);case 11:return e=Ie(e.type.render,!1);case 1:return e=Ie(e.type,!0);default:return""}}function Me(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case we:return"Fragment";case ye:return"Portal";case Se:return"Profiler";case ke:return"StrictMode";case ze:return"Suspense";case Ee:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case Ce:return(e.displayName||"Context")+".Consumer";case Fe:return(e._context.displayName||"Context")+".Provider";case je:var t=e.render;return(e=e.displayName)||(e=""!==(e=t.displayName||t.name||"")?"ForwardRef("+e+")":"ForwardRef"),e;case Ne:return null!==(t=e.displayName||null)?t:Me(e.type)||"Memo";case _e:t=e._payload,e=e._init;try{return Me(e(t))}catch(n){}}return null}function Be(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=(e=t.render).displayName||e.name||"",t.displayName||(""!==e?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Me(t);case 8:return t===ke?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"==typeof t)return t.displayName||t.name||null;if("string"==typeof t)return t}return null}function We(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":case"object":return e;default:return""}}function Ue(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function Qe(e){e._valueTracker||(e._valueTracker=function(e){var t=Ue(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function Ye(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Ue(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function He(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function Ve(e,t){var n=t.checked;return Le({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function Ge(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=We(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function qe(e,t){null!=(t=t.checked)&&be(e,"checked",t,!1)}function Xe(e,t){qe(e,t);var n=We(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?Ze(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ze(e,t.type,We(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function Ke(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function Ze(e,t,n){"number"===t&&He(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Je=Array.isArray;function et(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+We(n),t=null,a=0;a<e.length;a++){if(e[a].value===n)return e[a].selected=!0,void(r&&(e[a].defaultSelected=!0));null!==t||e[a].disabled||(t=e[a])}null!==t&&(t.selected=!0)}}function tt(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(re(91));return Le({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function nt(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(re(92));if(Je(n)){if(1<n.length)throw Error(re(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:We(n)}}function rt(e,t){var n=We(t.value),r=We(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function at(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}function ot(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function it(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?ot(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var lt,st,ut=(st=function(e,t){if("http://www.w3.org/2000/svg"!==e.namespaceURI||"innerHTML"in e)e.innerHTML=t;else{for((lt=lt||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=lt.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction(function(){return st(e,t)})}:st);function ct(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var dt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},pt=["Webkit","ms","Moz","O"];function ft(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||dt.hasOwnProperty(e)&&dt[e]?(""+t).trim():t+"px"}function gt(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),a=ft(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}Object.keys(dt).forEach(function(e){pt.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),dt[t]=dt[e]})});var ht=Le({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mt(e,t){if(t){if(ht[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(re(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(re(60));if("object"!=typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(re(61))}if(null!=t.style&&"object"!=typeof t.style)throw Error(re(62))}}function bt(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xt=null;function vt(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var yt=null,wt=null,kt=null;function St(e){if(e=xo(e)){if("function"!=typeof yt)throw Error(re(280));var t=e.stateNode;t&&(t=yo(t),yt(e.stateNode,e.type,t))}}function Ft(e){wt?kt?kt.push(e):kt=[e]:wt=e}function Ct(){if(wt){var e=wt,t=kt;if(kt=wt=null,St(e),t)for(e=0;e<t.length;e++)St(t[e])}}function jt(e,t){return e(t)}function zt(){}var Et=!1;function Nt(e,t,n){if(Et)return e(t,n);Et=!0;try{return jt(e,t,n)}finally{Et=!1,(null!==wt||null!==kt)&&(zt(),Ct())}}function _t(e,t){var n=e.stateNode;if(null===n)return null;var r=yo(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!=typeof n)throw Error(re(231,t,typeof n));return n}var Tt=!1;if(se)try{var Pt={};Object.defineProperty(Pt,"passive",{get:function(){Tt=!0}}),window.addEventListener("test",Pt,Pt),window.removeEventListener("test",Pt,Pt)}catch(st){Tt=!1}function Dt(e,t,n,r,a,o,i,l,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(c){this.onError(c)}}var At=!1,Lt=null,Rt=!1,$t=null,It={onError:function(e){At=!0,Lt=e}};function Ot(e,t,n,r,a,o,i,l,s){At=!1,Lt=null,Dt.apply(It,arguments)}function Mt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{!!(4098&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function Bt(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function Wt(e){if(Mt(e)!==e)throw Error(re(188))}function Ut(e){return null!==(e=function(e){var t=e.alternate;if(!t){if(null===(t=Mt(e)))throw Error(re(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(null===a)break;var o=a.alternate;if(null===o){if(null!==(r=a.return)){n=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return Wt(a),e;if(o===r)return Wt(a),t;o=o.sibling}throw Error(re(188))}if(n.return!==r.return)n=a,r=o;else{for(var i=!1,l=a.child;l;){if(l===n){i=!0,n=a,r=o;break}if(l===r){i=!0,r=a,n=o;break}l=l.sibling}if(!i){for(l=o.child;l;){if(l===n){i=!0,n=o,r=a;break}if(l===r){i=!0,r=o,n=a;break}l=l.sibling}if(!i)throw Error(re(189))}}if(n.alternate!==r)throw Error(re(190))}if(3!==n.tag)throw Error(re(188));return n.stateNode.current===n?e:t}(e))?Qt(e):null}function Qt(e){if(5===e.tag||6===e.tag)return e;for(e=e.child;null!==e;){var t=Qt(e);if(null!==t)return t;e=e.sibling}return null}var Yt=ne.unstable_scheduleCallback,Ht=ne.unstable_cancelCallback,Vt=ne.unstable_shouldYield,Gt=ne.unstable_requestPaint,qt=ne.unstable_now,Xt=ne.unstable_getCurrentPriorityLevel,Kt=ne.unstable_ImmediatePriority,Zt=ne.unstable_UserBlockingPriority,Jt=ne.unstable_NormalPriority,en=ne.unstable_LowPriority,tn=ne.unstable_IdlePriority,nn=null,rn=null;var an=Math.clz32?Math.clz32:function(e){return e>>>=0,0===e?32:31-(on(e)/ln|0)|0},on=Math.log,ln=Math.LN2;var sn=64,un=4194304;function cn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return 4194240&e;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function dn(e,t){var n=e.pendingLanes;if(0===n)return 0;var r=0,a=e.suspendedLanes,o=e.pingedLanes,i=268435455&n;if(0!==i){var l=i&~a;0!==l?r=cn(l):0!==(o&=i)&&(r=cn(o))}else 0!==(i=n&~a)?r=cn(i):0!==o&&(r=cn(o));if(0===r)return 0;if(0!==t&&t!==r&&0===(t&a)&&((a=r&-r)>=(o=t&-t)||16===a&&4194240&o))return t;if(4&r&&(r|=16&n),0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)a=1<<(n=31-an(t)),r|=e[n],t&=~a;return r}function pn(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;default:return-1}}function fn(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function gn(){var e=sn;return!(4194240&(sn<<=1))&&(sn=64),e}function hn(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function mn(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),(e=e.eventTimes)[t=31-an(t)]=n}function bn(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-an(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var xn=0;function vn(e){return 1<(e&=-e)?4<e?268435455&e?16:536870912:4:1}var yn,wn,kn,Sn,Fn,Cn=!1,jn=[],zn=null,En=null,Nn=null,_n=new Map,Tn=new Map,Pn=[],Dn="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function An(e,t){switch(e){case"focusin":case"focusout":zn=null;break;case"dragenter":case"dragleave":En=null;break;case"mouseover":case"mouseout":Nn=null;break;case"pointerover":case"pointerout":_n.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Tn.delete(t.pointerId)}}function Ln(e,t,n,r,a,o){return null===e||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[a]},null!==t&&(null!==(t=xo(t))&&wn(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==a&&-1===t.indexOf(a)&&t.push(a),e)}function Rn(e){var t=bo(e.target);if(null!==t){var n=Mt(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=Bt(n)))return e.blockedOn=t,void Fn(e.priority,function(){kn(n)})}else if(3===t&&n.stateNode.current.memoizedState.isDehydrated)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function $n(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=Gn(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=xo(n))&&wn(t),e.blockedOn=n,!1;var r=new(n=e.nativeEvent).constructor(n.type,n);xt=r,n.target.dispatchEvent(r),xt=null,t.shift()}return!0}function In(e,t,n){$n(e)&&n.delete(t)}function On(){Cn=!1,null!==zn&&$n(zn)&&(zn=null),null!==En&&$n(En)&&(En=null),null!==Nn&&$n(Nn)&&(Nn=null),_n.forEach(In),Tn.forEach(In)}function Mn(e,t){e.blockedOn===t&&(e.blockedOn=null,Cn||(Cn=!0,ne.unstable_scheduleCallback(ne.unstable_NormalPriority,On)))}function Bn(e){function t(t){return Mn(t,e)}if(0<jn.length){Mn(jn[0],e);for(var n=1;n<jn.length;n++){var r=jn[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==zn&&Mn(zn,e),null!==En&&Mn(En,e),null!==Nn&&Mn(Nn,e),_n.forEach(t),Tn.forEach(t),n=0;n<Pn.length;n++)(r=Pn[n]).blockedOn===e&&(r.blockedOn=null);for(;0<Pn.length&&null===(n=Pn[0]).blockedOn;)Rn(n),null===n.blockedOn&&Pn.shift()}var Wn=xe.ReactCurrentBatchConfig,Un=!0;function Qn(e,t,n,r){var a=xn,o=Wn.transition;Wn.transition=null;try{xn=1,Hn(e,t,n,r)}finally{xn=a,Wn.transition=o}}function Yn(e,t,n,r){var a=xn,o=Wn.transition;Wn.transition=null;try{xn=4,Hn(e,t,n,r)}finally{xn=a,Wn.transition=o}}function Hn(e,t,n,r){if(Un){var a=Gn(e,t,n,r);if(null===a)Wa(e,t,r,Vn,n),An(e,r);else if(function(e,t,n,r,a){switch(t){case"focusin":return zn=Ln(zn,e,t,n,r,a),!0;case"dragenter":return En=Ln(En,e,t,n,r,a),!0;case"mouseover":return Nn=Ln(Nn,e,t,n,r,a),!0;case"pointerover":var o=a.pointerId;return _n.set(o,Ln(_n.get(o)||null,e,t,n,r,a)),!0;case"gotpointercapture":return o=a.pointerId,Tn.set(o,Ln(Tn.get(o)||null,e,t,n,r,a)),!0}return!1}(a,e,t,n,r))r.stopPropagation();else if(An(e,r),4&t&&-1<Dn.indexOf(e)){for(;null!==a;){var o=xo(a);if(null!==o&&yn(o),null===(o=Gn(e,t,n,r))&&Wa(e,t,r,Vn,n),o===a)break;a=o}null!==a&&r.stopPropagation()}else Wa(e,t,r,null,n)}}var Vn=null;function Gn(e,t,n,r){if(Vn=null,null!==(e=bo(e=vt(r))))if(null===(t=Mt(e)))e=null;else if(13===(n=t.tag)){if(null!==(e=Bt(t)))return e;e=null}else if(3===n){if(t.stateNode.current.memoizedState.isDehydrated)return 3===t.tag?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Vn=e,null}function qn(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Xt()){case Kt:return 1;case Zt:return 4;case Jt:case en:return 16;case tn:return 536870912;default:return 16}default:return 16}}var Xn=null,Kn=null,Zn=null;function Jn(){if(Zn)return Zn;var e,t,n=Kn,r=n.length,a="value"in Xn?Xn.value:Xn.textContent,o=a.length;for(e=0;e<r&&n[e]===a[e];e++);var i=r-e;for(t=1;t<=i&&n[r-t]===a[o-t];t++);return Zn=a.slice(e,1<t?1-t:void 0)}function er(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function tr(){return!0}function nr(){return!1}function rr(e){function t(t,n,r,a,o){for(var i in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=a,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(i)&&(t=e[i],this[i]=t?t(a):a[i]);return this.isDefaultPrevented=(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?tr:nr,this.isPropagationStopped=nr,this}return Le(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=tr)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=tr)},persist:function(){},isPersistent:tr}),t}var ar,or,ir,lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},sr=rr(lr),ur=Le({},lr,{view:0,detail:0}),cr=rr(ur),dr=Le({},ur,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Sr,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ir&&(ir&&"mousemove"===e.type?(ar=e.screenX-ir.screenX,or=e.screenY-ir.screenY):or=ar=0,ir=e),ar)},movementY:function(e){return"movementY"in e?e.movementY:or}}),pr=rr(dr),fr=rr(Le({},dr,{dataTransfer:0})),gr=rr(Le({},ur,{relatedTarget:0})),hr=rr(Le({},lr,{animationName:0,elapsedTime:0,pseudoElement:0})),mr=Le({},lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),br=rr(mr),xr=rr(Le({},lr,{data:0})),vr={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},yr={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},wr={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=wr[e])&&!!t[e]}function Sr(){return kr}var Fr=Le({},ur,{key:function(e){if(e.key){var t=vr[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=er(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?yr[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Sr,charCode:function(e){return"keypress"===e.type?er(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?er(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),Cr=rr(Fr),jr=rr(Le({},dr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),zr=rr(Le({},ur,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Sr})),Er=rr(Le({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0})),Nr=Le({},dr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),_r=rr(Nr),Tr=[9,13,27,32],Pr=se&&"CompositionEvent"in window,Dr=null;se&&"documentMode"in document&&(Dr=document.documentMode);var Ar=se&&"TextEvent"in window&&!Dr,Lr=se&&(!Pr||Dr&&8<Dr&&11>=Dr),Rr=String.fromCharCode(32),$r=!1;function Ir(e,t){switch(e){case"keyup":return-1!==Tr.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Or(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var Mr=!1;var Br={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!Br[e.type]:"textarea"===t}function Ur(e,t,n,r){Ft(r),0<(t=Qa(t,"onChange")).length&&(n=new sr("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Qr=null,Yr=null;function Hr(e){Ra(e,0)}function Vr(e){if(Ye(vo(e)))return e}function Gr(e,t){if("change"===e)return t}var qr=!1;if(se){var Xr;if(se){var Kr="oninput"in document;if(!Kr){var Zr=document.createElement("div");Zr.setAttribute("oninput","return;"),Kr="function"==typeof Zr.oninput}Xr=Kr}else Xr=!1;qr=Xr&&(!document.documentMode||9<document.documentMode)}function Jr(){Qr&&(Qr.detachEvent("onpropertychange",ea),Yr=Qr=null)}function ea(e){if("value"===e.propertyName&&Vr(Yr)){var t=[];Ur(t,Yr,e,vt(e)),Nt(Hr,t)}}function ta(e,t,n){"focusin"===e?(Jr(),Yr=n,(Qr=t).attachEvent("onpropertychange",ea)):"focusout"===e&&Jr()}function na(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return Vr(Yr)}function ra(e,t){if("click"===e)return Vr(t)}function aa(e,t){if("input"===e||"change"===e)return Vr(t)}var oa="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t};function ia(e,t){if(oa(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!ue.call(t,a)||!oa(e[a],t[a]))return!1}return!0}function la(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function sa(e,t){var n,r=la(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=la(r)}}function ua(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?ua(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function ca(){for(var e=window,t=He();t instanceof e.HTMLIFrameElement;){try{var n="string"==typeof t.contentWindow.location.href}catch(r){n=!1}if(!n)break;t=He((e=t.contentWindow).document)}return t}function da(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}function pa(e){var t=ca(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ua(n.ownerDocument.documentElement,n)){if(null!==r&&da(n))if(t=r.start,void 0===(e=r.end)&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if((e=(t=n.ownerDocument||document)&&t.defaultView||window).getSelection){e=e.getSelection();var a=n.textContent.length,o=Math.min(r.start,a);r=void 0===r.end?o:Math.min(r.end,a),!e.extend&&o>r&&(a=r,r=o,o=a),a=sa(n,o);var i=sa(n,r);a&&i&&(1!==e.rangeCount||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&((t=t.createRange()).setStart(a.node,a.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}for(t=[],e=n;e=e.parentNode;)1===e.nodeType&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for("function"==typeof n.focus&&n.focus(),n=0;n<t.length;n++)(e=t[n]).element.scrollLeft=e.left,e.element.scrollTop=e.top}}var fa=se&&"documentMode"in document&&11>=document.documentMode,ga=null,ha=null,ma=null,ba=!1;function xa(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;ba||null==ga||ga!==He(r)||("selectionStart"in(r=ga)&&da(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},ma&&ia(ma,r)||(ma=r,0<(r=Qa(ha,"onSelect")).length&&(t=new sr("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=ga)))}function va(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ya={animationend:va("Animation","AnimationEnd"),animationiteration:va("Animation","AnimationIteration"),animationstart:va("Animation","AnimationStart"),transitionend:va("Transition","TransitionEnd")},wa={},ka={};function Sa(e){if(wa[e])return wa[e];if(!ya[e])return e;var t,n=ya[e];for(t in n)if(n.hasOwnProperty(t)&&t in ka)return wa[e]=n[t];return e}se&&(ka=document.createElement("div").style,"AnimationEvent"in window||(delete ya.animationend.animation,delete ya.animationiteration.animation,delete ya.animationstart.animation),"TransitionEvent"in window||delete ya.transitionend.transition);var Fa=Sa("animationend"),Ca=Sa("animationiteration"),ja=Sa("animationstart"),za=Sa("transitionend"),Ea=new Map,Na="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _a(e,t){Ea.set(e,t),ie(t,[e])}for(var Ta=0;Ta<Na.length;Ta++){var Pa=Na[Ta];_a(Pa.toLowerCase(),"on"+(Pa[0].toUpperCase()+Pa.slice(1)))}_a(Fa,"onAnimationEnd"),_a(Ca,"onAnimationIteration"),_a(ja,"onAnimationStart"),_a("dblclick","onDoubleClick"),_a("focusin","onFocus"),_a("focusout","onBlur"),_a(za,"onTransitionEnd"),le("onMouseEnter",["mouseout","mouseover"]),le("onMouseLeave",["mouseout","mouseover"]),le("onPointerEnter",["pointerout","pointerover"]),le("onPointerLeave",["pointerout","pointerover"]),ie("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ie("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ie("onBeforeInput",["compositionend","keypress","textInput","paste"]),ie("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ie("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ie("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Da="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Aa=new Set("cancel close invalid load scroll toggle".split(" ").concat(Da));function La(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,a,o,i,l,s){if(Ot.apply(this,arguments),At){if(!At)throw Error(re(198));var u=Lt;At=!1,Lt=null,Rt||(Rt=!0,$t=u)}}(r,t,void 0,e),e.currentTarget=null}function Ra(e,t){t=!!(4&t);for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var l=r[i],s=l.instance,u=l.currentTarget;if(l=l.listener,s!==o&&a.isPropagationStopped())break e;La(a,l,u),o=s}else for(i=0;i<r.length;i++){if(s=(l=r[i]).instance,u=l.currentTarget,l=l.listener,s!==o&&a.isPropagationStopped())break e;La(a,l,u),o=s}}}if(Rt)throw e=$t,Rt=!1,$t=null,e}function $a(e,t){var n=t[go];void 0===n&&(n=t[go]=new Set);var r=e+"__bubble";n.has(r)||(Ba(t,e,2,!1),n.add(r))}function Ia(e,t,n){var r=0;t&&(r|=4),Ba(n,e,r,t)}var Oa="_reactListening"+Math.random().toString(36).slice(2);function Ma(e){if(!e[Oa]){e[Oa]=!0,ae.forEach(function(t){"selectionchange"!==t&&(Aa.has(t)||Ia(t,!1,e),Ia(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[Oa]||(t[Oa]=!0,Ia("selectionchange",!1,t))}}function Ba(e,t,n,r){switch(qn(t)){case 1:var a=Qn;break;case 4:a=Yn;break;default:a=Hn}n=a.bind(null,t,n,e),a=void 0,!Tt||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(a=!0),r?void 0!==a?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):void 0!==a?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Wa(e,t,n,r,a){var o=r;if(!(1&t||2&t||null===r))e:for(;;){if(null===r)return;var i=r.tag;if(3===i||4===i){var l=r.stateNode.containerInfo;if(l===a||8===l.nodeType&&l.parentNode===a)break;if(4===i)for(i=r.return;null!==i;){var s=i.tag;if((3===s||4===s)&&((s=i.stateNode.containerInfo)===a||8===s.nodeType&&s.parentNode===a))return;i=i.return}for(;null!==l;){if(null===(i=bo(l)))return;if(5===(s=i.tag)||6===s){r=o=i;continue e}l=l.parentNode}}r=r.return}Nt(function(){var r=o,a=vt(n),i=[];e:{var l=Ea.get(e);if(void 0!==l){var s=sr,u=e;switch(e){case"keypress":if(0===er(n))break e;case"keydown":case"keyup":s=Cr;break;case"focusin":u="focus",s=gr;break;case"focusout":u="blur",s=gr;break;case"beforeblur":case"afterblur":s=gr;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":s=pr;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":s=fr;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":s=zr;break;case Fa:case Ca:case ja:s=hr;break;case za:s=Er;break;case"scroll":s=cr;break;case"wheel":s=_r;break;case"copy":case"cut":case"paste":s=br;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":s=jr}var c=!!(4&t),d=!c&&"scroll"===e,p=c?null!==l?l+"Capture":null:l;c=[];for(var f,g=r;null!==g;){var h=(f=g).stateNode;if(5===f.tag&&null!==h&&(f=h,null!==p&&(null!=(h=_t(g,p))&&c.push(Ua(g,h,f)))),d)break;g=g.return}0<c.length&&(l=new s(l,u,null,n,a),i.push({event:l,listeners:c}))}}if(!(7&t)){if(s="mouseout"===e||"pointerout"===e,(!(l="mouseover"===e||"pointerover"===e)||n===xt||!(u=n.relatedTarget||n.fromElement)||!bo(u)&&!u[fo])&&(s||l)&&(l=a.window===a?a:(l=a.ownerDocument)?l.defaultView||l.parentWindow:window,s?(s=r,null!==(u=(u=n.relatedTarget||n.toElement)?bo(u):null)&&(u!==(d=Mt(u))||5!==u.tag&&6!==u.tag)&&(u=null)):(s=null,u=r),s!==u)){if(c=pr,h="onMouseLeave",p="onMouseEnter",g="mouse","pointerout"!==e&&"pointerover"!==e||(c=jr,h="onPointerLeave",p="onPointerEnter",g="pointer"),d=null==s?l:vo(s),f=null==u?l:vo(u),(l=new c(h,g+"leave",s,n,a)).target=d,l.relatedTarget=f,h=null,bo(a)===r&&((c=new c(p,g+"enter",u,n,a)).target=f,c.relatedTarget=d,h=c),d=h,s&&u)e:{for(p=u,g=0,f=c=s;f;f=Ya(f))g++;for(f=0,h=p;h;h=Ya(h))f++;for(;0<g-f;)c=Ya(c),g--;for(;0<f-g;)p=Ya(p),f--;for(;g--;){if(c===p||null!==p&&c===p.alternate)break e;c=Ya(c),p=Ya(p)}c=null}else c=null;null!==s&&Ha(i,l,s,c,!1),null!==u&&null!==d&&Ha(i,d,u,c,!0)}if("select"===(s=(l=r?vo(r):window).nodeName&&l.nodeName.toLowerCase())||"input"===s&&"file"===l.type)var m=Gr;else if(Wr(l))if(qr)m=aa;else{m=na;var b=ta}else(s=l.nodeName)&&"input"===s.toLowerCase()&&("checkbox"===l.type||"radio"===l.type)&&(m=ra);switch(m&&(m=m(e,r))?Ur(i,m,n,a):(b&&b(e,l,r),"focusout"===e&&(b=l._wrapperState)&&b.controlled&&"number"===l.type&&Ze(l,"number",l.value)),b=r?vo(r):window,e){case"focusin":(Wr(b)||"true"===b.contentEditable)&&(ga=b,ha=r,ma=null);break;case"focusout":ma=ha=ga=null;break;case"mousedown":ba=!0;break;case"contextmenu":case"mouseup":case"dragend":ba=!1,xa(i,n,a);break;case"selectionchange":if(fa)break;case"keydown":case"keyup":xa(i,n,a)}var x;if(Pr)e:{switch(e){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Mr?Ir(e,n)&&(v="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(v="onCompositionStart");v&&(Lr&&"ko"!==n.locale&&(Mr||"onCompositionStart"!==v?"onCompositionEnd"===v&&Mr&&(x=Jn()):(Kn="value"in(Xn=a)?Xn.value:Xn.textContent,Mr=!0)),0<(b=Qa(r,v)).length&&(v=new xr(v,e,null,n,a),i.push({event:v,listeners:b}),x?v.data=x:null!==(x=Or(n))&&(v.data=x))),(x=Ar?function(e,t){switch(e){case"compositionend":return Or(t);case"keypress":return 32!==t.which?null:($r=!0,Rr);case"textInput":return(e=t.data)===Rr&&$r?null:e;default:return null}}(e,n):function(e,t){if(Mr)return"compositionend"===e||!Pr&&Ir(e,t)?(e=Jn(),Zn=Kn=Xn=null,Mr=!1,e):null;switch(e){case"paste":default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Lr&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=Qa(r,"onBeforeInput")).length&&(a=new xr("onBeforeInput","beforeinput",null,n,a),i.push({event:a,listeners:r}),a.data=x))}Ra(i,t)})}function Ua(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Qa(e,t){for(var n=t+"Capture",r=[];null!==e;){var a=e,o=a.stateNode;5===a.tag&&null!==o&&(a=o,null!=(o=_t(e,n))&&r.unshift(Ua(e,o,a)),null!=(o=_t(e,t))&&r.push(Ua(e,o,a))),e=e.return}return r}function Ya(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Ha(e,t,n,r,a){for(var o=t._reactName,i=[];null!==n&&n!==r;){var l=n,s=l.alternate,u=l.stateNode;if(null!==s&&s===r)break;5===l.tag&&null!==u&&(l=u,a?null!=(s=_t(n,o))&&i.unshift(Ua(n,s,l)):a||null!=(s=_t(n,o))&&i.push(Ua(n,s,l))),n=n.return}0!==i.length&&e.push({event:t,listeners:i})}var Va=/\r\n?/g,Ga=/\u0000|\uFFFD/g;function qa(e){return("string"==typeof e?e:""+e).replace(Va,"\n").replace(Ga,"")}function Xa(e,t,n){if(t=qa(t),qa(e)!==t&&n)throw Error(re(425))}function Ka(){}var Za=null,Ja=null;function eo(e,t){return"textarea"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var to="function"==typeof setTimeout?setTimeout:void 0,no="function"==typeof clearTimeout?clearTimeout:void 0,ro="function"==typeof Promise?Promise:void 0,ao="function"==typeof queueMicrotask?queueMicrotask:void 0!==ro?function(e){return ro.resolve(null).then(e).catch(oo)}:to;function oo(e){setTimeout(function(){throw e})}function io(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&8===a.nodeType)if("/$"===(n=a.data)){if(0===r)return e.removeChild(a),void Bn(t);r--}else"$"!==n&&"$?"!==n&&"$!"!==n||r++;n=a}while(n);Bn(t)}function lo(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){if("$"===(t=e.data)||"$!"===t||"$?"===t)break;if("/$"===t)return null}}return e}function so(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var uo=Math.random().toString(36).slice(2),co="__reactFiber$"+uo,po="__reactProps$"+uo,fo="__reactContainer$"+uo,go="__reactEvents$"+uo,ho="__reactListeners$"+uo,mo="__reactHandles$"+uo;function bo(e){var t=e[co];if(t)return t;for(var n=e.parentNode;n;){if(t=n[fo]||n[co]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=so(e);null!==e;){if(n=e[co])return n;e=so(e)}return t}n=(e=n).parentNode}return null}function xo(e){return!(e=e[co]||e[fo])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function vo(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(re(33))}function yo(e){return e[po]||null}var wo=[],ko=-1;function So(e){return{current:e}}function Fo(e){0>ko||(e.current=wo[ko],wo[ko]=null,ko--)}function Co(e,t){ko++,wo[ko]=e.current,e.current=t}var jo={},zo=So(jo),Eo=So(!1),No=jo;function _o(e,t){var n=e.type.contextTypes;if(!n)return jo;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a,o={};for(a in n)o[a]=t[a];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function To(e){return null!=(e=e.childContextTypes)}function Po(){Fo(Eo),Fo(zo)}function Do(e,t,n){if(zo.current!==jo)throw Error(re(168));Co(zo,t),Co(Eo,n)}function Ao(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,"function"!=typeof r.getChildContext)return n;for(var a in r=r.getChildContext())if(!(a in t))throw Error(re(108,Be(e)||"Unknown",a));return Le({},n,r)}function Lo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||jo,No=zo.current,Co(zo,e),Co(Eo,Eo.current),!0}function Ro(e,t,n){var r=e.stateNode;if(!r)throw Error(re(169));n?(e=Ao(e,t,No),r.__reactInternalMemoizedMergedChildContext=e,Fo(Eo),Fo(zo),Co(zo,e)):Fo(Eo),Co(Eo,n)}var $o=null,Io=!1,Oo=!1;function Mo(e){null===$o?$o=[e]:$o.push(e)}function Bo(){if(!Oo&&null!==$o){Oo=!0;var e=0,t=xn;try{var n=$o;for(xn=1;e<n.length;e++){var r=n[e];do{r=r(!0)}while(null!==r)}$o=null,Io=!1}catch(a){throw null!==$o&&($o=$o.slice(e+1)),Yt(Kt,Bo),a}finally{xn=t,Oo=!1}}return null}var Wo=[],Uo=0,Qo=null,Yo=0,Ho=[],Vo=0,Go=null,qo=1,Xo="";function Ko(e,t){Wo[Uo++]=Yo,Wo[Uo++]=Qo,Qo=e,Yo=t}function Zo(e,t,n){Ho[Vo++]=qo,Ho[Vo++]=Xo,Ho[Vo++]=Go,Go=e;var r=qo;e=Xo;var a=32-an(r)-1;r&=~(1<<a),n+=1;var o=32-an(t)+a;if(30<o){var i=a-a%5;o=(r&(1<<i)-1).toString(32),r>>=i,a-=i,qo=1<<32-an(t)+a|n<<a|r,Xo=o+e}else qo=1<<o|n<<a|r,Xo=e}function Jo(e){null!==e.return&&(Ko(e,1),Zo(e,1,0))}function ei(e){for(;e===Qo;)Qo=Wo[--Uo],Wo[Uo]=null,Yo=Wo[--Uo],Wo[Uo]=null;for(;e===Go;)Go=Ho[--Vo],Ho[Vo]=null,Xo=Ho[--Vo],Ho[Vo]=null,qo=Ho[--Vo],Ho[Vo]=null}var ti=null,ni=null,ri=!1,ai=null;function oi(e,t){var n=Nc(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,null===(t=e.deletions)?(e.deletions=[n],e.flags|=16):t.push(n)}function ii(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,ti=e,ni=lo(t.firstChild),!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,ti=e,ni=null,!0);case 13:return null!==(t=8!==t.nodeType?null:t)&&(n=null!==Go?{id:qo,overflow:Xo}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},(n=Nc(18,null,null,0)).stateNode=t,n.return=e,e.child=n,ti=e,ni=null,!0);default:return!1}}function li(e){return!(!(1&e.mode)||128&e.flags)}function si(e){if(ri){var t=ni;if(t){var n=t;if(!ii(e,t)){if(li(e))throw Error(re(418));t=lo(n.nextSibling);var r=ti;t&&ii(e,t)?oi(r,n):(e.flags=-4097&e.flags|2,ri=!1,ti=e)}}else{if(li(e))throw Error(re(418));e.flags=-4097&e.flags|2,ri=!1,ti=e}}}function ui(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;ti=e}function ci(e){if(e!==ti)return!1;if(!ri)return ui(e),ri=!0,!1;var t;if((t=3!==e.tag)&&!(t=5!==e.tag)&&(t="head"!==(t=e.type)&&"body"!==t&&!eo(e.type,e.memoizedProps)),t&&(t=ni)){if(li(e))throw di(),Error(re(418));for(;t;)oi(e,t),t=lo(t.nextSibling)}if(ui(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(re(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){ni=lo(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}ni=null}}else ni=ti?lo(e.stateNode.nextSibling):null;return!0}function di(){for(var e=ni;e;)e=lo(e.nextSibling)}function pi(){ni=ti=null,ri=!1}function fi(e){null===ai?ai=[e]:ai.push(e)}var gi=xe.ReactCurrentBatchConfig;function hi(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(re(309));var r=n.stateNode}if(!r)throw Error(re(147,e));var a=r,o=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===o?t.ref:((t=function(e){var t=a.refs;null===e?delete t[o]:t[o]=e})._stringRef=o,t)}if("string"!=typeof e)throw Error(re(284));if(!n._owner)throw Error(re(290,e))}return e}function mi(e,t){throw e=Object.prototype.toString.call(t),Error(re(31,"[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function bi(e){return(0,e._init)(e._payload)}function xi(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function a(e,t){return(e=Tc(e,t)).index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags|=2,n):r:(t.flags|=2,n):(t.flags|=1048576,n)}function i(t){return e&&null===t.alternate&&(t.flags|=2),t}function l(e,t,n,r){return null===t||6!==t.tag?((t=Lc(n,e.mode,r)).return=e,t):((t=a(t,n)).return=e,t)}function s(e,t,n,r){var o=n.type;return o===we?c(e,t,n.props.children,r,n.key):null!==t&&(t.elementType===o||"object"==typeof o&&null!==o&&o.$$typeof===_e&&bi(o)===t.type)?((r=a(t,n.props)).ref=hi(e,t,n),r.return=e,r):((r=Pc(n.type,n.key,n.props,null,e.mode,r)).ref=hi(e,t,n),r.return=e,r)}function u(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=Rc(n,e.mode,r)).return=e,t):((t=a(t,n.children||[])).return=e,t)}function c(e,t,n,r,o){return null===t||7!==t.tag?((t=Dc(n,e.mode,r,o)).return=e,t):((t=a(t,n)).return=e,t)}function d(e,t,n){if("string"==typeof t&&""!==t||"number"==typeof t)return(t=Lc(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case ve:return(n=Pc(t.type,t.key,t.props,null,e.mode,n)).ref=hi(e,null,t),n.return=e,n;case ye:return(t=Rc(t,e.mode,n)).return=e,t;case _e:return d(e,(0,t._init)(t._payload),n)}if(Je(t)||De(t))return(t=Dc(t,e.mode,n,null)).return=e,t;mi(e,t)}return null}function p(e,t,n,r){var a=null!==t?t.key:null;if("string"==typeof n&&""!==n||"number"==typeof n)return null!==a?null:l(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case ve:return n.key===a?s(e,t,n,r):null;case ye:return n.key===a?u(e,t,n,r):null;case _e:return p(e,t,(a=n._init)(n._payload),r)}if(Je(n)||De(n))return null!==a?null:c(e,t,n,r,null);mi(e,n)}return null}function f(e,t,n,r,a){if("string"==typeof r&&""!==r||"number"==typeof r)return l(t,e=e.get(n)||null,""+r,a);if("object"==typeof r&&null!==r){switch(r.$$typeof){case ve:return s(t,e=e.get(null===r.key?n:r.key)||null,r,a);case ye:return u(t,e=e.get(null===r.key?n:r.key)||null,r,a);case _e:return f(e,t,n,(0,r._init)(r._payload),a)}if(Je(r)||De(r))return c(t,e=e.get(n)||null,r,a,null);mi(t,r)}return null}return function l(s,u,c,g){if("object"==typeof c&&null!==c&&c.type===we&&null===c.key&&(c=c.props.children),"object"==typeof c&&null!==c){switch(c.$$typeof){case ve:e:{for(var h=c.key,m=u;null!==m;){if(m.key===h){if((h=c.type)===we){if(7===m.tag){n(s,m.sibling),(u=a(m,c.props.children)).return=s,s=u;break e}}else if(m.elementType===h||"object"==typeof h&&null!==h&&h.$$typeof===_e&&bi(h)===m.type){n(s,m.sibling),(u=a(m,c.props)).ref=hi(s,m,c),u.return=s,s=u;break e}n(s,m);break}t(s,m),m=m.sibling}c.type===we?((u=Dc(c.props.children,s.mode,g,c.key)).return=s,s=u):((g=Pc(c.type,c.key,c.props,null,s.mode,g)).ref=hi(s,u,c),g.return=s,s=g)}return i(s);case ye:e:{for(m=c.key;null!==u;){if(u.key===m){if(4===u.tag&&u.stateNode.containerInfo===c.containerInfo&&u.stateNode.implementation===c.implementation){n(s,u.sibling),(u=a(u,c.children||[])).return=s,s=u;break e}n(s,u);break}t(s,u),u=u.sibling}(u=Rc(c,s.mode,g)).return=s,s=u}return i(s);case _e:return l(s,u,(m=c._init)(c._payload),g)}if(Je(c))return function(a,i,l,s){for(var u=null,c=null,g=i,h=i=0,m=null;null!==g&&h<l.length;h++){g.index>h?(m=g,g=null):m=g.sibling;var b=p(a,g,l[h],s);if(null===b){null===g&&(g=m);break}e&&g&&null===b.alternate&&t(a,g),i=o(b,i,h),null===c?u=b:c.sibling=b,c=b,g=m}if(h===l.length)return n(a,g),ri&&Ko(a,h),u;if(null===g){for(;h<l.length;h++)null!==(g=d(a,l[h],s))&&(i=o(g,i,h),null===c?u=g:c.sibling=g,c=g);return ri&&Ko(a,h),u}for(g=r(a,g);h<l.length;h++)null!==(m=f(g,a,h,l[h],s))&&(e&&null!==m.alternate&&g.delete(null===m.key?h:m.key),i=o(m,i,h),null===c?u=m:c.sibling=m,c=m);return e&&g.forEach(function(e){return t(a,e)}),ri&&Ko(a,h),u}(s,u,c,g);if(De(c))return function(a,i,l,s){var u=De(l);if("function"!=typeof u)throw Error(re(150));if(null==(l=u.call(l)))throw Error(re(151));for(var c=u=null,g=i,h=i=0,m=null,b=l.next();null!==g&&!b.done;h++,b=l.next()){g.index>h?(m=g,g=null):m=g.sibling;var x=p(a,g,b.value,s);if(null===x){null===g&&(g=m);break}e&&g&&null===x.alternate&&t(a,g),i=o(x,i,h),null===c?u=x:c.sibling=x,c=x,g=m}if(b.done)return n(a,g),ri&&Ko(a,h),u;if(null===g){for(;!b.done;h++,b=l.next())null!==(b=d(a,b.value,s))&&(i=o(b,i,h),null===c?u=b:c.sibling=b,c=b);return ri&&Ko(a,h),u}for(g=r(a,g);!b.done;h++,b=l.next())null!==(b=f(g,a,h,b.value,s))&&(e&&null!==b.alternate&&g.delete(null===b.key?h:b.key),i=o(b,i,h),null===c?u=b:c.sibling=b,c=b);return e&&g.forEach(function(e){return t(a,e)}),ri&&Ko(a,h),u}(s,u,c,g);mi(s,c)}return"string"==typeof c&&""!==c||"number"==typeof c?(c=""+c,null!==u&&6===u.tag?(n(s,u.sibling),(u=a(u,c)).return=s,s=u):(n(s,u),(u=Lc(c,s.mode,g)).return=s,s=u),i(s)):n(s,u)}}var vi=xi(!0),yi=xi(!1),wi=So(null),ki=null,Si=null,Fi=null;function Ci(){Fi=Si=ki=null}function ji(e){var t=wi.current;Fo(wi),e._currentValue=t}function zi(e,t,n){for(;null!==e;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,null!==r&&(r.childLanes|=t)):null!==r&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Ei(e,t){ki=e,Fi=Si=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!==(e.lanes&t)&&(bs=!0),e.firstContext=null)}function Ni(e){var t=e._currentValue;if(Fi!==e)if(e={context:e,memoizedValue:t,next:null},null===Si){if(null===ki)throw Error(re(308));Si=e,ki.dependencies={lanes:0,firstContext:e}}else Si=Si.next=e;return t}var _i=null;function Ti(e){null===_i?_i=[e]:_i.push(e)}function Pi(e,t,n,r){var a=t.interleaved;return null===a?(n.next=n,Ti(t)):(n.next=a.next,a.next=n),t.interleaved=n,Di(e,r)}function Di(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}var Ai=!1;function Li(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ri(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function $i(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Ii(e,t,n){var r=e.updateQueue;if(null===r)return null;if(r=r.shared,2&ju){var a=r.pending;return null===a?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Di(e,n)}return null===(a=r.interleaved)?(t.next=t,Ti(r)):(t.next=a.next,a.next=t),r.interleaved=t,Di(e,n)}function Oi(e,t,n){if(null!==(t=t.updateQueue)&&(t=t.shared,4194240&n)){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,bn(e,n)}}function Mi(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var a=null,o=null;if(null!==(n=n.firstBaseUpdate)){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===o?a=o=i:o=o.next=i,n=n.next}while(null!==n);null===o?a=o=t:o=o.next=t}else a=o=t;return n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Bi(e,t,n,r){var a=e.updateQueue;Ai=!1;var o=a.firstBaseUpdate,i=a.lastBaseUpdate,l=a.shared.pending;if(null!==l){a.shared.pending=null;var s=l,u=s.next;s.next=null,null===i?o=u:i.next=u,i=s;var c=e.alternate;null!==c&&((l=(c=c.updateQueue).lastBaseUpdate)!==i&&(null===l?c.firstBaseUpdate=u:l.next=u,c.lastBaseUpdate=s))}if(null!==o){var d=a.baseState;for(i=0,c=u=s=null,l=o;;){var p=l.lane,f=l.eventTime;if((r&p)===p){null!==c&&(c=c.next={eventTime:f,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var g=e,h=l;switch(p=t,f=n,h.tag){case 1:if("function"==typeof(g=h.payload)){d=g.call(f,d,p);break e}d=g;break e;case 3:g.flags=-65537&g.flags|128;case 0:if(null==(p="function"==typeof(g=h.payload)?g.call(f,d,p):g))break e;d=Le({},d,p);break e;case 2:Ai=!0}}null!==l.callback&&0!==l.lane&&(e.flags|=64,null===(p=a.effects)?a.effects=[l]:p.push(l))}else f={eventTime:f,lane:p,tag:l.tag,payload:l.payload,callback:l.callback,next:null},null===c?(u=c=f,s=d):c=c.next=f,i|=p;if(null===(l=l.next)){if(null===(l=a.shared.pending))break;l=(p=l).next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}if(null===c&&(s=d),a.baseState=s,a.firstBaseUpdate=u,a.lastBaseUpdate=c,null!==(t=a.shared.interleaved)){a=t;do{i|=a.lane,a=a.next}while(a!==t)}else null===o&&(a.shared.lanes=0);Au|=i,e.lanes=i,e.memoizedState=d}}function Wi(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(null!==a){if(r.callback=null,r=n,"function"!=typeof a)throw Error(re(191,a));a.call(r)}}}var Ui={},Qi=So(Ui),Yi=So(Ui),Hi=So(Ui);function Vi(e){if(e===Ui)throw Error(re(174));return e}function Gi(e,t){switch(Co(Hi,t),Co(Yi,e),Co(Qi,Ui),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:it(null,"");break;default:t=it(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}Fo(Qi),Co(Qi,t)}function qi(){Fo(Qi),Fo(Yi),Fo(Hi)}function Xi(e){Vi(Hi.current);var t=Vi(Qi.current),n=it(t,e.type);t!==n&&(Co(Yi,e),Co(Qi,n))}function Ki(e){Yi.current===e&&(Fo(Qi),Fo(Yi))}var Zi=So(0);function Ji(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(128&t.flags)return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var el=[];function tl(){for(var e=0;e<el.length;e++)el[e]._workInProgressVersionPrimary=null;el.length=0}var nl=xe.ReactCurrentDispatcher,rl=xe.ReactCurrentBatchConfig,al=0,ol=null,il=null,ll=null,sl=!1,ul=!1,cl=0,dl=0;function pl(){throw Error(re(321))}function fl(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!oa(e[n],t[n]))return!1;return!0}function gl(e,t,n,r,a,o){if(al=o,ol=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,nl.current=null===e||null===e.memoizedState?Kl:Zl,e=n(r,a),ul){o=0;do{if(ul=!1,cl=0,25<=o)throw Error(re(301));o+=1,ll=il=null,t.updateQueue=null,nl.current=Jl,e=n(r,a)}while(ul)}if(nl.current=Xl,t=null!==il&&null!==il.next,al=0,ll=il=ol=null,sl=!1,t)throw Error(re(300));return e}function hl(){var e=0!==cl;return cl=0,e}function ml(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ll?ol.memoizedState=ll=e:ll=ll.next=e,ll}function bl(){if(null===il){var e=ol.alternate;e=null!==e?e.memoizedState:null}else e=il.next;var t=null===ll?ol.memoizedState:ll.next;if(null!==t)ll=t,il=e;else{if(null===e)throw Error(re(310));e={memoizedState:(il=e).memoizedState,baseState:il.baseState,baseQueue:il.baseQueue,queue:il.queue,next:null},null===ll?ol.memoizedState=ll=e:ll=ll.next=e}return ll}function xl(e,t){return"function"==typeof t?t(e):t}function vl(e){var t=bl(),n=t.queue;if(null===n)throw Error(re(311));n.lastRenderedReducer=e;var r=il,a=r.baseQueue,o=n.pending;if(null!==o){if(null!==a){var i=a.next;a.next=o.next,o.next=i}r.baseQueue=a=o,n.pending=null}if(null!==a){o=a.next,r=r.baseState;var l=i=null,s=null,u=o;do{var c=u.lane;if((al&c)===c)null!==s&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var d={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};null===s?(l=s=d,i=r):s=s.next=d,ol.lanes|=c,Au|=c}u=u.next}while(null!==u&&u!==o);null===s?i=r:s.next=l,oa(r,t.memoizedState)||(bs=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=s,n.lastRenderedState=r}if(null!==(e=n.interleaved)){a=e;do{o=a.lane,ol.lanes|=o,Au|=o,a=a.next}while(a!==e)}else null===a&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function yl(e){var t=bl(),n=t.queue;if(null===n)throw Error(re(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(null!==a){n.pending=null;var i=a=a.next;do{o=e(o,i.action),i=i.next}while(i!==a);oa(o,t.memoizedState)||(bs=!0),t.memoizedState=o,null===t.baseQueue&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function wl(){}function kl(e,t){var n=ol,r=bl(),a=t(),o=!oa(r.memoizedState,a);if(o&&(r.memoizedState=a,bs=!0),r=r.queue,Al(Cl.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||null!==ll&&1&ll.memoizedState.tag){if(n.flags|=2048,Nl(9,Fl.bind(null,n,r,a,t),void 0,null),null===zu)throw Error(re(349));30&al||Sl(n,t,a)}return a}function Sl(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},null===(t=ol.updateQueue)?(t={lastEffect:null,stores:null},ol.updateQueue=t,t.stores=[e]):null===(n=t.stores)?t.stores=[e]:n.push(e)}function Fl(e,t,n,r){t.value=n,t.getSnapshot=r,jl(t)&&zl(e)}function Cl(e,t,n){return n(function(){jl(t)&&zl(e)})}function jl(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!oa(e,n)}catch(r){return!0}}function zl(e){var t=Di(e,1);null!==t&&ec(t,e,1,-1)}function El(e){var t=ml();return"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xl,lastRenderedState:e},t.queue=e,e=e.dispatch=Hl.bind(null,ol,e),[t.memoizedState,e]}function Nl(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=ol.updateQueue)?(t={lastEffect:null,stores:null},ol.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function _l(){return bl().memoizedState}function Tl(e,t,n,r){var a=ml();ol.flags|=e,a.memoizedState=Nl(1|t,n,void 0,void 0===r?null:r)}function Pl(e,t,n,r){var a=bl();r=void 0===r?null:r;var o=void 0;if(null!==il){var i=il.memoizedState;if(o=i.destroy,null!==r&&fl(r,i.deps))return void(a.memoizedState=Nl(t,n,o,r))}ol.flags|=e,a.memoizedState=Nl(1|t,n,o,r)}function Dl(e,t){return Tl(8390656,8,e,t)}function Al(e,t){return Pl(2048,8,e,t)}function Ll(e,t){return Pl(4,2,e,t)}function Rl(e,t){return Pl(4,4,e,t)}function $l(e,t){return"function"==typeof t?(e=e(),t(e),function(){t(null)}):null!=t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Il(e,t,n){return n=null!=n?n.concat([e]):null,Pl(4,4,$l.bind(null,t,e),n)}function Ol(){}function Ml(e,t){var n=bl();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&fl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Bl(e,t){var n=bl();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&fl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Wl(e,t,n){return 21&al?(oa(n,t)||(n=gn(),ol.lanes|=n,Au|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,bs=!0),e.memoizedState=n)}function Ul(e,t){var n=xn;xn=0!==n&&4>n?n:4,e(!0);var r=rl.transition;rl.transition={};try{e(!1),t()}finally{xn=n,rl.transition=r}}function Ql(){return bl().memoizedState}function Yl(e,t,n){var r=Ju(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Vl(e))Gl(t,n);else if(null!==(n=Pi(e,t,n,r))){ec(n,e,r,Zu()),ql(n,t,r)}}function Hl(e,t,n){var r=Ju(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Vl(e))Gl(t,a);else{var o=e.alternate;if(0===e.lanes&&(null===o||0===o.lanes)&&null!==(o=t.lastRenderedReducer))try{var i=t.lastRenderedState,l=o(i,n);if(a.hasEagerState=!0,a.eagerState=l,oa(l,i)){var s=t.interleaved;return null===s?(a.next=a,Ti(t)):(a.next=s.next,s.next=a),void(t.interleaved=a)}}catch(u){}null!==(n=Pi(e,t,a,r))&&(ec(n,e,r,a=Zu()),ql(n,t,r))}}function Vl(e){var t=e.alternate;return e===ol||null!==t&&t===ol}function Gl(e,t){ul=sl=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ql(e,t,n){if(4194240&n){var r=t.lanes;n|=r&=e.pendingLanes,t.lanes=n,bn(e,n)}}var Xl={readContext:Ni,useCallback:pl,useContext:pl,useEffect:pl,useImperativeHandle:pl,useInsertionEffect:pl,useLayoutEffect:pl,useMemo:pl,useReducer:pl,useRef:pl,useState:pl,useDebugValue:pl,useDeferredValue:pl,useTransition:pl,useMutableSource:pl,useSyncExternalStore:pl,useId:pl,unstable_isNewReconciler:!1},Kl={readContext:Ni,useCallback:function(e,t){return ml().memoizedState=[e,void 0===t?null:t],e},useContext:Ni,useEffect:Dl,useImperativeHandle:function(e,t,n){return n=null!=n?n.concat([e]):null,Tl(4194308,4,$l.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Tl(4194308,4,e,t)},useInsertionEffect:function(e,t){return Tl(4,2,e,t)},useMemo:function(e,t){var n=ml();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ml();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Yl.bind(null,ol,e),[r.memoizedState,e]},useRef:function(e){return e={current:e},ml().memoizedState=e},useState:El,useDebugValue:Ol,useDeferredValue:function(e){return ml().memoizedState=e},useTransition:function(){var e=El(!1),t=e[0];return e=Ul.bind(null,e[1]),ml().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ol,a=ml();if(ri){if(void 0===n)throw Error(re(407));n=n()}else{if(n=t(),null===zu)throw Error(re(349));30&al||Sl(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Dl(Cl.bind(null,r,o,e),[e]),r.flags|=2048,Nl(9,Fl.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=ml(),t=zu.identifierPrefix;if(ri){var n=Xo;t=":"+t+"R"+(n=(qo&~(1<<32-an(qo)-1)).toString(32)+n),0<(n=cl++)&&(t+="H"+n.toString(32)),t+=":"}else t=":"+t+"r"+(n=dl++).toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Zl={readContext:Ni,useCallback:Ml,useContext:Ni,useEffect:Al,useImperativeHandle:Il,useInsertionEffect:Ll,useLayoutEffect:Rl,useMemo:Bl,useReducer:vl,useRef:_l,useState:function(){return vl(xl)},useDebugValue:Ol,useDeferredValue:function(e){return Wl(bl(),il.memoizedState,e)},useTransition:function(){return[vl(xl)[0],bl().memoizedState]},useMutableSource:wl,useSyncExternalStore:kl,useId:Ql,unstable_isNewReconciler:!1},Jl={readContext:Ni,useCallback:Ml,useContext:Ni,useEffect:Al,useImperativeHandle:Il,useInsertionEffect:Ll,useLayoutEffect:Rl,useMemo:Bl,useReducer:yl,useRef:_l,useState:function(){return yl(xl)},useDebugValue:Ol,useDeferredValue:function(e){var t=bl();return null===il?t.memoizedState=e:Wl(t,il.memoizedState,e)},useTransition:function(){return[yl(xl)[0],bl().memoizedState]},useMutableSource:wl,useSyncExternalStore:kl,useId:Ql,unstable_isNewReconciler:!1};function es(e,t){if(e&&e.defaultProps){for(var n in t=Le({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}function ts(e,t,n,r){n=null==(n=n(r,t=e.memoizedState))?t:Le({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var ns={isMounted:function(e){return!!(e=e._reactInternals)&&Mt(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Zu(),a=Ju(e),o=$i(r,a);o.payload=t,null!=n&&(o.callback=n),null!==(t=Ii(e,o,a))&&(ec(t,e,a,r),Oi(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Zu(),a=Ju(e),o=$i(r,a);o.tag=1,o.payload=t,null!=n&&(o.callback=n),null!==(t=Ii(e,o,a))&&(ec(t,e,a,r),Oi(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Zu(),r=Ju(e),a=$i(n,r);a.tag=2,null!=t&&(a.callback=t),null!==(t=Ii(e,a,r))&&(ec(t,e,r,n),Oi(t,e,r))}};function rs(e,t,n,r,a,o,i){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,i):!t.prototype||!t.prototype.isPureReactComponent||(!ia(n,r)||!ia(a,o))}function as(e,t,n){var r=!1,a=jo,o=t.contextType;return"object"==typeof o&&null!==o?o=Ni(o):(a=To(t)?No:zo.current,o=(r=null!=(r=t.contextTypes))?_o(e,a):jo),t=new t(n,o),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=ns,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),t}function os(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ns.enqueueReplaceState(t,t.state,null)}function is(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Li(e);var o=t.contextType;"object"==typeof o&&null!==o?a.context=Ni(o):(o=To(t)?No:zo.current,a.context=_o(e,o)),a.state=e.memoizedState,"function"==typeof(o=t.getDerivedStateFromProps)&&(ts(e,t,o,n),a.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof a.getSnapshotBeforeUpdate||"function"!=typeof a.UNSAFE_componentWillMount&&"function"!=typeof a.componentWillMount||(t=a.state,"function"==typeof a.componentWillMount&&a.componentWillMount(),"function"==typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount(),t!==a.state&&ns.enqueueReplaceState(a,a.state,null),Bi(e,n,a,r),a.state=e.memoizedState),"function"==typeof a.componentDidMount&&(e.flags|=4194308)}function ls(e,t){try{var n="",r=t;do{n+=Oe(r),r=r.return}while(r);var a=n}catch(o){a="\nError generating stack: "+o.message+"\n"+o.stack}return{value:e,source:t,stack:a,digest:null}}function ss(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function us(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var cs="function"==typeof WeakMap?WeakMap:Map;function ds(e,t,n){(n=$i(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Wu||(Wu=!0,Uu=r),us(0,t)},n}function ps(e,t,n){(n=$i(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"==typeof r){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){us(0,t)}}var o=e.stateNode;return null!==o&&"function"==typeof o.componentDidCatch&&(n.callback=function(){us(0,t),"function"!=typeof r&&(null===Qu?Qu=new Set([this]):Qu.add(this));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}function fs(e,t,n){var r=e.pingCache;if(null===r){r=e.pingCache=new cs;var a=new Set;r.set(t,a)}else void 0===(a=r.get(t))&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=Sc.bind(null,e,t,n),t.then(e,e))}function gs(e){do{var t;if((t=13===e.tag)&&(t=null===(t=e.memoizedState)||null!==t.dehydrated),t)return e;e=e.return}while(null!==e);return null}function hs(e,t,n,r,a){return 1&e.mode?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,1===n.tag&&(null===n.alternate?n.tag=17:((t=$i(-1,1)).tag=2,Ii(n,t,1))),n.lanes|=1),e)}var ms=xe.ReactCurrentOwner,bs=!1;function xs(e,t,n,r){t.child=null===e?yi(t,null,n,r):vi(t,e.child,n,r)}function vs(e,t,n,r,a){n=n.render;var o=t.ref;return Ei(t,a),r=gl(e,t,n,r,o,a),n=hl(),null===e||bs?(ri&&n&&Jo(t),t.flags|=1,xs(e,t,r,a),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Ws(e,t,a))}function ys(e,t,n,r,a){if(null===e){var o=n.type;return"function"!=typeof o||_c(o)||void 0!==o.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=Pc(n.type,null,r,t,t.mode,a)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=o,ws(e,t,o,r,a))}if(o=e.child,0===(e.lanes&a)){var i=o.memoizedProps;if((n=null!==(n=n.compare)?n:ia)(i,r)&&e.ref===t.ref)return Ws(e,t,a)}return t.flags|=1,(e=Tc(o,r)).ref=t.ref,e.return=t,t.child=e}function ws(e,t,n,r,a){if(null!==e){var o=e.memoizedProps;if(ia(o,r)&&e.ref===t.ref){if(bs=!1,t.pendingProps=r=o,0===(e.lanes&a))return t.lanes=e.lanes,Ws(e,t,a);131072&e.flags&&(bs=!0)}}return Fs(e,t,n,r,a)}function ks(e,t,n){var r=t.pendingProps,a=r.children,o=null!==e?e.memoizedState:null;if("hidden"===r.mode)if(1&t.mode){if(!(1073741824&n))return e=null!==o?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Co(Tu,_u),_u|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=null!==o?o.baseLanes:n,Co(Tu,_u),_u|=r}else t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Co(Tu,_u),_u|=n;else null!==o?(r=o.baseLanes|n,t.memoizedState=null):r=n,Co(Tu,_u),_u|=r;return xs(e,t,a,n),t.child}function Ss(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Fs(e,t,n,r,a){var o=To(n)?No:zo.current;return o=_o(t,o),Ei(t,a),n=gl(e,t,n,r,o,a),r=hl(),null===e||bs?(ri&&r&&Jo(t),t.flags|=1,xs(e,t,n,a),t.child):(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Ws(e,t,a))}function Cs(e,t,n,r,a){if(To(n)){var o=!0;Lo(t)}else o=!1;if(Ei(t,a),null===t.stateNode)Bs(e,t),as(t,n,r),is(t,n,r,a),r=!0;else if(null===e){var i=t.stateNode,l=t.memoizedProps;i.props=l;var s=i.context,u=n.contextType;"object"==typeof u&&null!==u?u=Ni(u):u=_o(t,u=To(n)?No:zo.current);var c=n.getDerivedStateFromProps,d="function"==typeof c||"function"==typeof i.getSnapshotBeforeUpdate;d||"function"!=typeof i.UNSAFE_componentWillReceiveProps&&"function"!=typeof i.componentWillReceiveProps||(l!==r||s!==u)&&os(t,i,r,u),Ai=!1;var p=t.memoizedState;i.state=p,Bi(t,r,i,a),s=t.memoizedState,l!==r||p!==s||Eo.current||Ai?("function"==typeof c&&(ts(t,n,c,r),s=t.memoizedState),(l=Ai||rs(t,n,l,r,p,s,u))?(d||"function"!=typeof i.UNSAFE_componentWillMount&&"function"!=typeof i.componentWillMount||("function"==typeof i.componentWillMount&&i.componentWillMount(),"function"==typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount()),"function"==typeof i.componentDidMount&&(t.flags|=4194308)):("function"==typeof i.componentDidMount&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),i.props=r,i.state=s,i.context=u,r=l):("function"==typeof i.componentDidMount&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,Ri(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:es(t.type,l),i.props=u,d=t.pendingProps,p=i.context,"object"==typeof(s=n.contextType)&&null!==s?s=Ni(s):s=_o(t,s=To(n)?No:zo.current);var f=n.getDerivedStateFromProps;(c="function"==typeof f||"function"==typeof i.getSnapshotBeforeUpdate)||"function"!=typeof i.UNSAFE_componentWillReceiveProps&&"function"!=typeof i.componentWillReceiveProps||(l!==d||p!==s)&&os(t,i,r,s),Ai=!1,p=t.memoizedState,i.state=p,Bi(t,r,i,a);var g=t.memoizedState;l!==d||p!==g||Eo.current||Ai?("function"==typeof f&&(ts(t,n,f,r),g=t.memoizedState),(u=Ai||rs(t,n,u,r,p,g,s)||!1)?(c||"function"!=typeof i.UNSAFE_componentWillUpdate&&"function"!=typeof i.componentWillUpdate||("function"==typeof i.componentWillUpdate&&i.componentWillUpdate(r,g,s),"function"==typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(r,g,s)),"function"==typeof i.componentDidUpdate&&(t.flags|=4),"function"==typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"!=typeof i.componentDidUpdate||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!=typeof i.getSnapshotBeforeUpdate||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=g),i.props=r,i.state=g,i.context=s,r=u):("function"!=typeof i.componentDidUpdate||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),"function"!=typeof i.getSnapshotBeforeUpdate||l===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return js(e,t,n,r,o,a)}function js(e,t,n,r,a,o){Ss(e,t);var i=!!(128&t.flags);if(!r&&!i)return a&&Ro(t,n,!1),Ws(e,t,o);r=t.stateNode,ms.current=t;var l=i&&"function"!=typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&i?(t.child=vi(t,e.child,null,o),t.child=vi(t,null,l,o)):xs(e,t,l,o),t.memoizedState=r.state,a&&Ro(t,n,!0),t.child}function zs(e){var t=e.stateNode;t.pendingContext?Do(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Do(0,t.context,!1),Gi(e,t.containerInfo)}function Es(e,t,n,r,a){return pi(),fi(a),t.flags|=256,xs(e,t,n,r),t.child}var Ns,_s,Ts,Ps,Ds={dehydrated:null,treeContext:null,retryLane:0};function As(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ls(e,t,n){var r,a=t.pendingProps,o=Zi.current,i=!1,l=!!(128&t.flags);if((r=l)||(r=(null===e||null!==e.memoizedState)&&!!(2&o)),r?(i=!0,t.flags&=-129):null!==e&&null===e.memoizedState||(o|=1),Co(Zi,1&o),null===e)return si(t),null!==(e=t.memoizedState)&&null!==(e=e.dehydrated)?(1&t.mode?"$!"===e.data?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=a.children,e=a.fallback,i?(a=t.mode,i=t.child,l={mode:"hidden",children:l},1&a||null===i?i=Ac(l,a,0,null):(i.childLanes=0,i.pendingProps=l),e=Dc(e,a,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=As(n),t.memoizedState=Ds,e):Rs(t,l));if(null!==(o=e.memoizedState)&&null!==(r=o.dehydrated))return function(e,t,n,r,a,o,i){if(n)return 256&t.flags?(t.flags&=-257,$s(e,t,i,r=ss(Error(re(422))))):null!==t.memoizedState?(t.child=e.child,t.flags|=128,null):(o=r.fallback,a=t.mode,r=Ac({mode:"visible",children:r.children},a,0,null),(o=Dc(o,a,i,null)).flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,1&t.mode&&vi(t,e.child,null,i),t.child.memoizedState=As(i),t.memoizedState=Ds,o);if(!(1&t.mode))return $s(e,t,i,null);if("$!"===a.data){if(r=a.nextSibling&&a.nextSibling.dataset)var l=r.dgst;return r=l,$s(e,t,i,r=ss(o=Error(re(419)),r,void 0))}if(l=0!==(i&e.childLanes),bs||l){if(null!==(r=zu)){switch(i&-i){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}0!==(a=0!==(a&(r.suspendedLanes|i))?0:a)&&a!==o.retryLane&&(o.retryLane=a,Di(e,a),ec(r,e,a,-1))}return fc(),$s(e,t,i,r=ss(Error(re(421))))}return"$?"===a.data?(t.flags|=128,t.child=e.child,t=Cc.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,ni=lo(a.nextSibling),ti=t,ri=!0,ai=null,null!==e&&(Ho[Vo++]=qo,Ho[Vo++]=Xo,Ho[Vo++]=Go,qo=e.id,Xo=e.overflow,Go=t),t=Rs(t,r.children),t.flags|=4096,t)}(e,t,l,a,r,o,n);if(i){i=a.fallback,l=t.mode,r=(o=e.child).sibling;var s={mode:"hidden",children:a.children};return 1&l||t.child===o?(a=Tc(o,s)).subtreeFlags=14680064&o.subtreeFlags:((a=t.child).childLanes=0,a.pendingProps=s,t.deletions=null),null!==r?i=Tc(r,i):(i=Dc(i,l,n,null)).flags|=2,i.return=t,a.return=t,a.sibling=i,t.child=a,a=i,i=t.child,l=null===(l=e.child.memoizedState)?As(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~n,t.memoizedState=Ds,a}return e=(i=e.child).sibling,a=Tc(i,{mode:"visible",children:a.children}),!(1&t.mode)&&(a.lanes=n),a.return=t,a.sibling=null,null!==e&&(null===(n=t.deletions)?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function Rs(e,t){return(t=Ac({mode:"visible",children:t},e.mode,0,null)).return=e,e.child=t}function $s(e,t,n,r){return null!==r&&fi(r),vi(t,e.child,null,n),(e=Rs(t,t.pendingProps.children)).flags|=2,t.memoizedState=null,e}function Is(e,t,n){e.lanes|=t;var r=e.alternate;null!==r&&(r.lanes|=t),zi(e.return,t,n)}function Os(e,t,n,r,a){var o=e.memoizedState;null===o?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=a)}function Ms(e,t,n){var r=t.pendingProps,a=r.revealOrder,o=r.tail;if(xs(e,t,r.children,n),2&(r=Zi.current))r=1&r|2,t.flags|=128;else{if(null!==e&&128&e.flags)e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&Is(e,n,t);else if(19===e.tag)Is(e,n,t);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Co(Zi,r),1&t.mode)switch(a){case"forwards":for(n=t.child,a=null;null!==n;)null!==(e=n.alternate)&&null===Ji(e)&&(a=n),n=n.sibling;null===(n=a)?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Os(t,!1,a,n,o);break;case"backwards":for(n=null,a=t.child,t.child=null;null!==a;){if(null!==(e=a.alternate)&&null===Ji(e)){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Os(t,!0,n,null,o);break;case"together":Os(t,!1,null,null,void 0);break;default:t.memoizedState=null}else t.memoizedState=null;return t.child}function Bs(e,t){!(1&t.mode)&&null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ws(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Au|=t.lanes,0===(n&t.childLanes))return null;if(null!==e&&t.child!==e.child)throw Error(re(153));if(null!==t.child){for(n=Tc(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=Tc(e,e.pendingProps)).return=t;n.sibling=null}return t.child}function Us(e,t){if(!ri)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Qs(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=14680064&a.subtreeFlags,r|=14680064&a.flags,a.return=e,a=a.sibling;else for(a=e.child;null!==a;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ys(e,t,n){var r=t.pendingProps;switch(ei(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qs(t),null;case 1:case 17:return To(t.type)&&Po(),Qs(t),null;case 3:return r=t.stateNode,qi(),Fo(Eo),Fo(zo),tl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(ci(t)?t.flags|=4:null===e||e.memoizedState.isDehydrated&&!(256&t.flags)||(t.flags|=1024,null!==ai&&(ac(ai),ai=null))),_s(e,t),Qs(t),null;case 5:Ki(t);var a=Vi(Hi.current);if(n=t.type,null!==e&&null!=t.stateNode)Ts(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(null===t.stateNode)throw Error(re(166));return Qs(t),null}if(e=Vi(Qi.current),ci(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[co]=t,r[po]=o,e=!!(1&t.mode),n){case"dialog":$a("cancel",r),$a("close",r);break;case"iframe":case"object":case"embed":$a("load",r);break;case"video":case"audio":for(a=0;a<Da.length;a++)$a(Da[a],r);break;case"source":$a("error",r);break;case"img":case"image":case"link":$a("error",r),$a("load",r);break;case"details":$a("toggle",r);break;case"input":Ge(r,o),$a("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},$a("invalid",r);break;case"textarea":nt(r,o),$a("invalid",r)}for(var i in mt(n,o),a=null,o)if(o.hasOwnProperty(i)){var l=o[i];"children"===i?"string"==typeof l?r.textContent!==l&&(!0!==o.suppressHydrationWarning&&Xa(r.textContent,l,e),a=["children",l]):"number"==typeof l&&r.textContent!==""+l&&(!0!==o.suppressHydrationWarning&&Xa(r.textContent,l,e),a=["children",""+l]):oe.hasOwnProperty(i)&&null!=l&&"onScroll"===i&&$a("scroll",r)}switch(n){case"input":Qe(r),Ke(r,o,!0);break;case"textarea":Qe(r),at(r);break;case"select":case"option":break;default:"function"==typeof o.onClick&&(r.onclick=Ka)}r=a,t.updateQueue=r,null!==r&&(t.flags|=4)}else{i=9===a.nodeType?a:a.ownerDocument,"http://www.w3.org/1999/xhtml"===e&&(e=ot(n)),"http://www.w3.org/1999/xhtml"===e?"script"===n?((e=i.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"==typeof r.is?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),"select"===n&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[co]=t,e[po]=r,Ns(e,t,!1,!1),t.stateNode=e;e:{switch(i=bt(n,r),n){case"dialog":$a("cancel",e),$a("close",e),a=r;break;case"iframe":case"object":case"embed":$a("load",e),a=r;break;case"video":case"audio":for(a=0;a<Da.length;a++)$a(Da[a],e);a=r;break;case"source":$a("error",e),a=r;break;case"img":case"image":case"link":$a("error",e),$a("load",e),a=r;break;case"details":$a("toggle",e),a=r;break;case"input":Ge(e,r),a=Ve(e,r),$a("invalid",e);break;case"option":default:a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=Le({},r,{value:void 0}),$a("invalid",e);break;case"textarea":nt(e,r),a=tt(e,r),$a("invalid",e)}for(o in mt(n,a),l=a)if(l.hasOwnProperty(o)){var s=l[o];"style"===o?gt(e,s):"dangerouslySetInnerHTML"===o?null!=(s=s?s.__html:void 0)&&ut(e,s):"children"===o?"string"==typeof s?("textarea"!==n||""!==s)&&ct(e,s):"number"==typeof s&&ct(e,""+s):"suppressContentEditableWarning"!==o&&"suppressHydrationWarning"!==o&&"autoFocus"!==o&&(oe.hasOwnProperty(o)?null!=s&&"onScroll"===o&&$a("scroll",e):null!=s&&be(e,o,s,i))}switch(n){case"input":Qe(e),Ke(e,r,!1);break;case"textarea":Qe(e),at(e);break;case"option":null!=r.value&&e.setAttribute("value",""+We(r.value));break;case"select":e.multiple=!!r.multiple,null!=(o=r.value)?et(e,!!r.multiple,o,!1):null!=r.defaultValue&&et(e,!!r.multiple,r.defaultValue,!0);break;default:"function"==typeof a.onClick&&(e.onclick=Ka)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}null!==t.ref&&(t.flags|=512,t.flags|=2097152)}return Qs(t),null;case 6:if(e&&null!=t.stateNode)Ps(e,t,e.memoizedProps,r);else{if("string"!=typeof r&&null===t.stateNode)throw Error(re(166));if(n=Vi(Hi.current),Vi(Qi.current),ci(t)){if(r=t.stateNode,n=t.memoizedProps,r[co]=t,(o=r.nodeValue!==n)&&null!==(e=ti))switch(e.tag){case 3:Xa(r.nodeValue,n,!!(1&e.mode));break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Xa(r.nodeValue,n,!!(1&e.mode))}o&&(t.flags|=4)}else(r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[co]=t,t.stateNode=r}return Qs(t),null;case 13:if(Fo(Zi),r=t.memoizedState,null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated){if(ri&&null!==ni&&1&t.mode&&!(128&t.flags))di(),pi(),t.flags|=98560,o=!1;else if(o=ci(t),null!==r&&null!==r.dehydrated){if(null===e){if(!o)throw Error(re(318));if(!(o=null!==(o=t.memoizedState)?o.dehydrated:null))throw Error(re(317));o[co]=t}else pi(),!(128&t.flags)&&(t.memoizedState=null),t.flags|=4;Qs(t),o=!1}else null!==ai&&(ac(ai),ai=null),o=!0;if(!o)return 65536&t.flags?t:null}return 128&t.flags?(t.lanes=n,t):((r=null!==r)!==(null!==e&&null!==e.memoizedState)&&r&&(t.child.flags|=8192,1&t.mode&&(null===e||1&Zi.current?0===Pu&&(Pu=3):fc())),null!==t.updateQueue&&(t.flags|=4),Qs(t),null);case 4:return qi(),_s(e,t),null===e&&Ma(t.stateNode.containerInfo),Qs(t),null;case 10:return ji(t.type._context),Qs(t),null;case 19:if(Fo(Zi),null===(o=t.memoizedState))return Qs(t),null;if(r=!!(128&t.flags),null===(i=o.rendering))if(r)Us(o,!1);else{if(0!==Pu||null!==e&&128&e.flags)for(e=t.child;null!==e;){if(null!==(i=Ji(e))){for(t.flags|=128,Us(o,!1),null!==(r=i.updateQueue)&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;null!==n;)e=r,(o=n).flags&=14680066,null===(i=o.alternate)?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Co(Zi,1&Zi.current|2),t.child}e=e.sibling}null!==o.tail&&qt()>Mu&&(t.flags|=128,r=!0,Us(o,!1),t.lanes=4194304)}else{if(!r)if(null!==(e=Ji(i))){if(t.flags|=128,r=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),Us(o,!0),null===o.tail&&"hidden"===o.tailMode&&!i.alternate&&!ri)return Qs(t),null}else 2*qt()-o.renderingStartTime>Mu&&1073741824!==n&&(t.flags|=128,r=!0,Us(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(null!==(n=o.last)?n.sibling=i:t.child=i,o.last=i)}return null!==o.tail?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=qt(),t.sibling=null,n=Zi.current,Co(Zi,r?1&n|2:1&n),t):(Qs(t),null);case 22:case 23:return uc(),r=null!==t.memoizedState,null!==e&&null!==e.memoizedState!==r&&(t.flags|=8192),r&&1&t.mode?!!(1073741824&_u)&&(Qs(t),6&t.subtreeFlags&&(t.flags|=8192)):Qs(t),null;case 24:case 25:return null}throw Error(re(156,t.tag))}function Hs(e,t){switch(ei(t),t.tag){case 1:return To(t.type)&&Po(),65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 3:return qi(),Fo(Eo),Fo(zo),tl(),65536&(e=t.flags)&&!(128&e)?(t.flags=-65537&e|128,t):null;case 5:return Ki(t),null;case 13:if(Fo(Zi),null!==(e=t.memoizedState)&&null!==e.dehydrated){if(null===t.alternate)throw Error(re(340));pi()}return 65536&(e=t.flags)?(t.flags=-65537&e|128,t):null;case 19:return Fo(Zi),null;case 4:return qi(),null;case 10:return ji(t.type._context),null;case 22:case 23:return uc(),null;default:return null}}Ns=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},_s=function(){},Ts=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,Vi(Qi.current);var o,i=null;switch(n){case"input":a=Ve(e,a),r=Ve(e,r),i=[];break;case"select":a=Le({},a,{value:void 0}),r=Le({},r,{value:void 0}),i=[];break;case"textarea":a=tt(e,a),r=tt(e,r),i=[];break;default:"function"!=typeof a.onClick&&"function"==typeof r.onClick&&(e.onclick=Ka)}for(u in mt(n,r),n=null,a)if(!r.hasOwnProperty(u)&&a.hasOwnProperty(u)&&null!=a[u])if("style"===u){var l=a[u];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else"dangerouslySetInnerHTML"!==u&&"children"!==u&&"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&"autoFocus"!==u&&(oe.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var s=r[u];if(l=null!=a?a[u]:void 0,r.hasOwnProperty(u)&&s!==l&&(null!=s||null!=l))if("style"===u)if(l){for(o in l)!l.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&l[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(i||(i=[]),i.push(u,n)),n=s;else"dangerouslySetInnerHTML"===u?(s=s?s.__html:void 0,l=l?l.__html:void 0,null!=s&&l!==s&&(i=i||[]).push(u,s)):"children"===u?"string"!=typeof s&&"number"!=typeof s||(i=i||[]).push(u,""+s):"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&(oe.hasOwnProperty(u)?(null!=s&&"onScroll"===u&&$a("scroll",e),i||l===s||(i=[])):(i=i||[]).push(u,s))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}},Ps=function(e,t,n,r){n!==r&&(t.flags|=4)};var Vs=!1,Gs=!1,qs="function"==typeof WeakSet?WeakSet:Set,Xs=null;function Ks(e,t){var n=e.ref;if(null!==n)if("function"==typeof n)try{n(null)}catch(r){kc(e,t,r)}else n.current=null}function Zs(e,t,n){try{n()}catch(r){kc(e,t,r)}}var Js=!1;function eu(e,t,n){var r=t.updateQueue;if(null!==(r=null!==r?r.lastEffect:null)){var a=r=r.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,void 0!==o&&Zs(t,n,o)}a=a.next}while(a!==r)}}function tu(e,t){if(null!==(t=null!==(t=t.updateQueue)?t.lastEffect:null)){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function nu(e){var t=e.ref;if(null!==t){var n=e.stateNode;e.tag,e=n,"function"==typeof t?t(e):t.current=e}}function ru(e){var t=e.alternate;null!==t&&(e.alternate=null,ru(t)),e.child=null,e.deletions=null,e.sibling=null,5===e.tag&&(null!==(t=e.stateNode)&&(delete t[co],delete t[po],delete t[go],delete t[ho],delete t[mo])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function au(e){return 5===e.tag||3===e.tag||4===e.tag}function ou(e){e:for(;;){for(;null===e.sibling;){if(null===e.return||au(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;5!==e.tag&&6!==e.tag&&18!==e.tag;){if(2&e.flags)continue e;if(null===e.child||4===e.tag)continue e;e.child.return=e,e=e.child}if(!(2&e.flags))return e.stateNode}}function iu(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!=(n=n._reactRootContainer)||null!==t.onclick||(t.onclick=Ka));else if(4!==r&&null!==(e=e.child))for(iu(e,t,n),e=e.sibling;null!==e;)iu(e,t,n),e=e.sibling}function lu(e,t,n){var r=e.tag;if(5===r||6===r)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(lu(e,t,n),e=e.sibling;null!==e;)lu(e,t,n),e=e.sibling}var su=null,uu=!1;function cu(e,t,n){for(n=n.child;null!==n;)du(e,t,n),n=n.sibling}function du(e,t,n){if(rn&&"function"==typeof rn.onCommitFiberUnmount)try{rn.onCommitFiberUnmount(nn,n)}catch(l){}switch(n.tag){case 5:Gs||Ks(n,t);case 6:var r=su,a=uu;su=null,cu(e,t,n),uu=a,null!==(su=r)&&(uu?(e=su,n=n.stateNode,8===e.nodeType?e.parentNode.removeChild(n):e.removeChild(n)):su.removeChild(n.stateNode));break;case 18:null!==su&&(uu?(e=su,n=n.stateNode,8===e.nodeType?io(e.parentNode,n):1===e.nodeType&&io(e,n),Bn(e)):io(su,n.stateNode));break;case 4:r=su,a=uu,su=n.stateNode.containerInfo,uu=!0,cu(e,t,n),su=r,uu=a;break;case 0:case 11:case 14:case 15:if(!Gs&&(null!==(r=n.updateQueue)&&null!==(r=r.lastEffect))){a=r=r.next;do{var o=a,i=o.destroy;o=o.tag,void 0!==i&&(2&o||4&o)&&Zs(n,t,i),a=a.next}while(a!==r)}cu(e,t,n);break;case 1:if(!Gs&&(Ks(n,t),"function"==typeof(r=n.stateNode).componentWillUnmount))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){kc(n,t,l)}cu(e,t,n);break;case 21:cu(e,t,n);break;case 22:1&n.mode?(Gs=(r=Gs)||null!==n.memoizedState,cu(e,t,n),Gs=r):cu(e,t,n);break;default:cu(e,t,n)}}function pu(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new qs),t.forEach(function(t){var r=jc.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}}function fu(e,t){var n=t.deletions;if(null!==n)for(var r=0;r<n.length;r++){var a=n[r];try{var o=e,i=t,l=i;e:for(;null!==l;){switch(l.tag){case 5:su=l.stateNode,uu=!1;break e;case 3:case 4:su=l.stateNode.containerInfo,uu=!0;break e}l=l.return}if(null===su)throw Error(re(160));du(o,i,a),su=null,uu=!1;var s=a.alternate;null!==s&&(s.return=null),a.return=null}catch(u){kc(a,t,u)}}if(12854&t.subtreeFlags)for(t=t.child;null!==t;)gu(t,e),t=t.sibling}function gu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(fu(t,e),hu(e),4&r){try{eu(3,e,e.return),tu(3,e)}catch(h){kc(e,e.return,h)}try{eu(5,e,e.return)}catch(h){kc(e,e.return,h)}}break;case 1:fu(t,e),hu(e),512&r&&null!==n&&Ks(n,n.return);break;case 5:if(fu(t,e),hu(e),512&r&&null!==n&&Ks(n,n.return),32&e.flags){var a=e.stateNode;try{ct(a,"")}catch(h){kc(e,e.return,h)}}if(4&r&&null!=(a=e.stateNode)){var o=e.memoizedProps,i=null!==n?n.memoizedProps:o,l=e.type,s=e.updateQueue;if(e.updateQueue=null,null!==s)try{"input"===l&&"radio"===o.type&&null!=o.name&&qe(a,o),bt(l,i);var u=bt(l,o);for(i=0;i<s.length;i+=2){var c=s[i],d=s[i+1];"style"===c?gt(a,d):"dangerouslySetInnerHTML"===c?ut(a,d):"children"===c?ct(a,d):be(a,c,d,u)}switch(l){case"input":Xe(a,o);break;case"textarea":rt(a,o);break;case"select":var p=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var f=o.value;null!=f?et(a,!!o.multiple,f,!1):p!==!!o.multiple&&(null!=o.defaultValue?et(a,!!o.multiple,o.defaultValue,!0):et(a,!!o.multiple,o.multiple?[]:"",!1))}a[po]=o}catch(h){kc(e,e.return,h)}}break;case 6:if(fu(t,e),hu(e),4&r){if(null===e.stateNode)throw Error(re(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(h){kc(e,e.return,h)}}break;case 3:if(fu(t,e),hu(e),4&r&&null!==n&&n.memoizedState.isDehydrated)try{Bn(t.containerInfo)}catch(h){kc(e,e.return,h)}break;case 4:default:fu(t,e),hu(e);break;case 13:fu(t,e),hu(e),8192&(a=e.child).flags&&(o=null!==a.memoizedState,a.stateNode.isHidden=o,!o||null!==a.alternate&&null!==a.alternate.memoizedState||(Ou=qt())),4&r&&pu(e);break;case 22:if(c=null!==n&&null!==n.memoizedState,1&e.mode?(Gs=(u=Gs)||c,fu(t,e),Gs=u):fu(t,e),hu(e),8192&r){if(u=null!==e.memoizedState,(e.stateNode.isHidden=u)&&!c&&1&e.mode)for(Xs=e,c=e.child;null!==c;){for(d=Xs=c;null!==Xs;){switch(f=(p=Xs).child,p.tag){case 0:case 11:case 14:case 15:eu(4,p,p.return);break;case 1:Ks(p,p.return);var g=p.stateNode;if("function"==typeof g.componentWillUnmount){r=p,n=p.return;try{t=r,g.props=t.memoizedProps,g.state=t.memoizedState,g.componentWillUnmount()}catch(h){kc(r,n,h)}}break;case 5:Ks(p,p.return);break;case 22:if(null!==p.memoizedState){vu(d);continue}}null!==f?(f.return=p,Xs=f):vu(d)}c=c.sibling}e:for(c=null,d=e;;){if(5===d.tag){if(null===c){c=d;try{a=d.stateNode,u?"function"==typeof(o=a.style).setProperty?o.setProperty("display","none","important"):o.display="none":(l=d.stateNode,i=null!=(s=d.memoizedProps.style)&&s.hasOwnProperty("display")?s.display:null,l.style.display=ft("display",i))}catch(h){kc(e,e.return,h)}}}else if(6===d.tag){if(null===c)try{d.stateNode.nodeValue=u?"":d.memoizedProps}catch(h){kc(e,e.return,h)}}else if((22!==d.tag&&23!==d.tag||null===d.memoizedState||d===e)&&null!==d.child){d.child.return=d,d=d.child;continue}if(d===e)break e;for(;null===d.sibling;){if(null===d.return||d.return===e)break e;c===d&&(c=null),d=d.return}c===d&&(c=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:fu(t,e),hu(e),4&r&&pu(e);case 21:}}function hu(e){var t=e.flags;if(2&t){try{e:{for(var n=e.return;null!==n;){if(au(n)){var r=n;break e}n=n.return}throw Error(re(160))}switch(r.tag){case 5:var a=r.stateNode;32&r.flags&&(ct(a,""),r.flags&=-33),lu(e,ou(e),a);break;case 3:case 4:var o=r.stateNode.containerInfo;iu(e,ou(e),o);break;default:throw Error(re(161))}}catch(i){kc(e,e.return,i)}e.flags&=-3}4096&t&&(e.flags&=-4097)}function mu(e,t,n){Xs=e,bu(e)}function bu(e,t,n){for(var r=!!(1&e.mode);null!==Xs;){var a=Xs,o=a.child;if(22===a.tag&&r){var i=null!==a.memoizedState||Vs;if(!i){var l=a.alternate,s=null!==l&&null!==l.memoizedState||Gs;l=Vs;var u=Gs;if(Vs=i,(Gs=s)&&!u)for(Xs=a;null!==Xs;)s=(i=Xs).child,22===i.tag&&null!==i.memoizedState?yu(a):null!==s?(s.return=i,Xs=s):yu(a);for(;null!==o;)Xs=o,bu(o),o=o.sibling;Xs=a,Vs=l,Gs=u}xu(e)}else 8772&a.subtreeFlags&&null!==o?(o.return=a,Xs=o):xu(e)}}function xu(e){for(;null!==Xs;){var t=Xs;if(8772&t.flags){var n=t.alternate;try{if(8772&t.flags)switch(t.tag){case 0:case 11:case 15:Gs||tu(5,t);break;case 1:var r=t.stateNode;if(4&t.flags&&!Gs)if(null===n)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:es(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;null!==o&&Wi(t,o,r);break;case 3:var i=t.updateQueue;if(null!==i){if(n=null,null!==t.child)switch(t.child.tag){case 5:case 1:n=t.child.stateNode}Wi(t,i,n)}break;case 5:var l=t.stateNode;if(null===n&&4&t.flags){n=l;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:case 4:case 12:case 19:case 17:case 21:case 22:case 23:case 25:break;case 13:if(null===t.memoizedState){var u=t.alternate;if(null!==u){var c=u.memoizedState;if(null!==c){var d=c.dehydrated;null!==d&&Bn(d)}}}break;default:throw Error(re(163))}Gs||512&t.flags&&nu(t)}catch(p){kc(t,t.return,p)}}if(t===e){Xs=null;break}if(null!==(n=t.sibling)){n.return=t.return,Xs=n;break}Xs=t.return}}function vu(e){for(;null!==Xs;){var t=Xs;if(t===e){Xs=null;break}var n=t.sibling;if(null!==n){n.return=t.return,Xs=n;break}Xs=t.return}}function yu(e){for(;null!==Xs;){var t=Xs;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{tu(4,t)}catch(s){kc(t,n,s)}break;case 1:var r=t.stateNode;if("function"==typeof r.componentDidMount){var a=t.return;try{r.componentDidMount()}catch(s){kc(t,a,s)}}var o=t.return;try{nu(t)}catch(s){kc(t,o,s)}break;case 5:var i=t.return;try{nu(t)}catch(s){kc(t,i,s)}}}catch(s){kc(t,t.return,s)}if(t===e){Xs=null;break}var l=t.sibling;if(null!==l){l.return=t.return,Xs=l;break}Xs=t.return}}var wu,ku=Math.ceil,Su=xe.ReactCurrentDispatcher,Fu=xe.ReactCurrentOwner,Cu=xe.ReactCurrentBatchConfig,ju=0,zu=null,Eu=null,Nu=0,_u=0,Tu=So(0),Pu=0,Du=null,Au=0,Lu=0,Ru=0,$u=null,Iu=null,Ou=0,Mu=1/0,Bu=null,Wu=!1,Uu=null,Qu=null,Yu=!1,Hu=null,Vu=0,Gu=0,qu=null,Xu=-1,Ku=0;function Zu(){return 6&ju?qt():-1!==Xu?Xu:Xu=qt()}function Ju(e){return 1&e.mode?2&ju&&0!==Nu?Nu&-Nu:null!==gi.transition?(0===Ku&&(Ku=gn()),Ku):0!==(e=xn)?e:e=void 0===(e=window.event)?16:qn(e.type):1}function ec(e,t,n,r){if(50<Gu)throw Gu=0,qu=null,Error(re(185));mn(e,n,r),2&ju&&e===zu||(e===zu&&(!(2&ju)&&(Lu|=n),4===Pu&&oc(e,Nu)),tc(e,r),1===n&&0===ju&&!(1&t.mode)&&(Mu=qt()+500,Io&&Bo()))}function tc(e,t){var n=e.callbackNode;!function(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-an(o),l=1<<i,s=a[i];-1===s?0!==(l&n)&&0===(l&r)||(a[i]=pn(l,t)):s<=t&&(e.expiredLanes|=l),o&=~l}}(e,t);var r=dn(e,e===zu?Nu:0);if(0===r)null!==n&&Ht(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(null!=n&&Ht(n),1===t)0===e.tag?function(e){Io=!0,Mo(e)}(ic.bind(null,e)):Mo(ic.bind(null,e)),ao(function(){!(6&ju)&&Bo()}),n=null;else{switch(vn(r)){case 1:n=Kt;break;case 4:n=Zt;break;case 16:default:n=Jt;break;case 536870912:n=tn}n=zc(n,nc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function nc(e,t){if(Xu=-1,Ku=0,6&ju)throw Error(re(327));var n=e.callbackNode;if(yc()&&e.callbackNode!==n)return null;var r=dn(e,e===zu?Nu:0);if(0===r)return null;if(30&r||0!==(r&e.expiredLanes)||t)t=gc(e,r);else{t=r;var a=ju;ju|=2;var o=pc();for(zu===e&&Nu===t||(Bu=null,Mu=qt()+500,cc(e,t));;)try{mc();break}catch(l){dc(e,l)}Ci(),Su.current=o,ju=a,null!==Eu?t=0:(zu=null,Nu=0,t=Pu)}if(0!==t){if(2===t&&(0!==(a=fn(e))&&(r=a,t=rc(e,a))),1===t)throw n=Du,cc(e,0),oc(e,r),tc(e,qt()),n;if(6===t)oc(e,r);else{if(a=e.current.alternate,!(30&r||function(e){for(var t=e;;){if(16384&t.flags){var n=t.updateQueue;if(null!==n&&null!==(n=n.stores))for(var r=0;r<n.length;r++){var a=n[r],o=a.getSnapshot;a=a.value;try{if(!oa(o(),a))return!1}catch(i){return!1}}}if(n=t.child,16384&t.subtreeFlags&&null!==n)n.return=t,t=n;else{if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}(a)||(t=gc(e,r),2===t&&(o=fn(e),0!==o&&(r=o,t=rc(e,o))),1!==t)))throw n=Du,cc(e,0),oc(e,r),tc(e,qt()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(re(345));case 2:case 5:vc(e,Iu,Bu);break;case 3:if(oc(e,r),(130023424&r)===r&&10<(t=Ou+500-qt())){if(0!==dn(e,0))break;if(((a=e.suspendedLanes)&r)!==r){Zu(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=to(vc.bind(null,e,Iu,Bu),t);break}vc(e,Iu,Bu);break;case 4:if(oc(e,r),(4194240&r)===r)break;for(t=e.eventTimes,a=-1;0<r;){var i=31-an(r);o=1<<i,(i=t[i])>a&&(a=i),r&=~o}if(r=a,10<(r=(120>(r=qt()-r)?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ku(r/1960))-r)){e.timeoutHandle=to(vc.bind(null,e,Iu,Bu),r);break}vc(e,Iu,Bu);break;default:throw Error(re(329))}}}return tc(e,qt()),e.callbackNode===n?nc.bind(null,e):null}function rc(e,t){var n=$u;return e.current.memoizedState.isDehydrated&&(cc(e,t).flags|=256),2!==(e=gc(e,t))&&(t=Iu,Iu=n,null!==t&&ac(t)),e}function ac(e){null===Iu?Iu=e:Iu.push.apply(Iu,e)}function oc(e,t){for(t&=~Ru,t&=~Lu,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-an(t),r=1<<n;e[n]=-1,t&=~r}}function ic(e){if(6&ju)throw Error(re(327));yc();var t=dn(e,0);if(!(1&t))return tc(e,qt()),null;var n=gc(e,t);if(0!==e.tag&&2===n){var r=fn(e);0!==r&&(t=r,n=rc(e,r))}if(1===n)throw n=Du,cc(e,0),oc(e,t),tc(e,qt()),n;if(6===n)throw Error(re(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,vc(e,Iu,Bu),tc(e,qt()),null}function lc(e,t){var n=ju;ju|=1;try{return e(t)}finally{0===(ju=n)&&(Mu=qt()+500,Io&&Bo())}}function sc(e){null!==Hu&&0===Hu.tag&&!(6&ju)&&yc();var t=ju;ju|=1;var n=Cu.transition,r=xn;try{if(Cu.transition=null,xn=1,e)return e()}finally{xn=r,Cu.transition=n,!(6&(ju=t))&&Bo()}}function uc(){_u=Tu.current,Fo(Tu)}function cc(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,no(n)),null!==Eu)for(n=Eu.return;null!==n;){var r=n;switch(ei(r),r.tag){case 1:null!=(r=r.type.childContextTypes)&&Po();break;case 3:qi(),Fo(Eo),Fo(zo),tl();break;case 5:Ki(r);break;case 4:qi();break;case 13:case 19:Fo(Zi);break;case 10:ji(r.type._context);break;case 22:case 23:uc()}n=n.return}if(zu=e,Eu=e=Tc(e.current,null),Nu=_u=t,Pu=0,Du=null,Ru=Lu=Au=0,Iu=$u=null,null!==_i){for(t=0;t<_i.length;t++)if(null!==(r=(n=_i[t]).interleaved)){n.interleaved=null;var a=r.next,o=n.pending;if(null!==o){var i=o.next;o.next=a,r.next=i}n.pending=r}_i=null}return e}function dc(e,t){for(;;){var n=Eu;try{if(Ci(),nl.current=Xl,sl){for(var r=ol.memoizedState;null!==r;){var a=r.queue;null!==a&&(a.pending=null),r=r.next}sl=!1}if(al=0,ll=il=ol=null,ul=!1,cl=0,Fu.current=null,null===n||null===n.return){Pu=1,Du=t,Eu=null;break}e:{var o=e,i=n.return,l=n,s=t;if(t=Nu,l.flags|=32768,null!==s&&"object"==typeof s&&"function"==typeof s.then){var u=s,c=l,d=c.tag;if(!(1&c.mode||0!==d&&11!==d&&15!==d)){var p=c.alternate;p?(c.updateQueue=p.updateQueue,c.memoizedState=p.memoizedState,c.lanes=p.lanes):(c.updateQueue=null,c.memoizedState=null)}var f=gs(i);if(null!==f){f.flags&=-257,hs(f,i,l,0,t),1&f.mode&&fs(o,u,t),s=u;var g=(t=f).updateQueue;if(null===g){var h=new Set;h.add(s),t.updateQueue=h}else g.add(s);break e}if(!(1&t)){fs(o,u,t),fc();break e}s=Error(re(426))}else if(ri&&1&l.mode){var m=gs(i);if(null!==m){!(65536&m.flags)&&(m.flags|=256),hs(m,i,l,0,t),fi(ls(s,l));break e}}o=s=ls(s,l),4!==Pu&&(Pu=2),null===$u?$u=[o]:$u.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t,Mi(o,ds(0,s,t));break e;case 1:l=s;var b=o.type,x=o.stateNode;if(!(128&o.flags||"function"!=typeof b.getDerivedStateFromError&&(null===x||"function"!=typeof x.componentDidCatch||null!==Qu&&Qu.has(x)))){o.flags|=65536,t&=-t,o.lanes|=t,Mi(o,ps(o,l,t));break e}}o=o.return}while(null!==o)}xc(n)}catch(v){t=v,Eu===n&&null!==n&&(Eu=n=n.return);continue}break}}function pc(){var e=Su.current;return Su.current=Xl,null===e?Xl:e}function fc(){0!==Pu&&3!==Pu&&2!==Pu||(Pu=4),null===zu||!(268435455&Au)&&!(268435455&Lu)||oc(zu,Nu)}function gc(e,t){var n=ju;ju|=2;var r=pc();for(zu===e&&Nu===t||(Bu=null,cc(e,t));;)try{hc();break}catch(a){dc(e,a)}if(Ci(),ju=n,Su.current=r,null!==Eu)throw Error(re(261));return zu=null,Nu=0,Pu}function hc(){for(;null!==Eu;)bc(Eu)}function mc(){for(;null!==Eu&&!Vt();)bc(Eu)}function bc(e){var t=wu(e.alternate,e,_u);e.memoizedProps=e.pendingProps,null===t?xc(e):Eu=t,Fu.current=null}function xc(e){var t=e;do{var n=t.alternate;if(e=t.return,32768&t.flags){if(null!==(n=Hs(n,t)))return n.flags&=32767,void(Eu=n);if(null===e)return Pu=6,void(Eu=null);e.flags|=32768,e.subtreeFlags=0,e.deletions=null}else if(null!==(n=Ys(n,t,_u)))return void(Eu=n);if(null!==(t=t.sibling))return void(Eu=t);Eu=t=e}while(null!==t);0===Pu&&(Pu=5)}function vc(e,t,n){var r=xn,a=Cu.transition;try{Cu.transition=null,xn=1,function(e,t,n,r){do{yc()}while(null!==Hu);if(6&ju)throw Error(re(327));n=e.finishedWork;var a=e.finishedLanes;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(re(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(function(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-an(n),o=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~o}}(e,o),e===zu&&(Eu=zu=null,Nu=0),!(2064&n.subtreeFlags)&&!(2064&n.flags)||Yu||(Yu=!0,zc(Jt,function(){return yc(),null})),o=!!(15990&n.flags),!!(15990&n.subtreeFlags)||o){o=Cu.transition,Cu.transition=null;var i=xn;xn=1;var l=ju;ju|=4,Fu.current=null,function(e,t){if(Za=Un,da(e=ca())){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{var r=(n=(n=e.ownerDocument)&&n.defaultView||window).getSelection&&n.getSelection();if(r&&0!==r.rangeCount){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch(y){n=null;break e}var i=0,l=-1,s=-1,u=0,c=0,d=e,p=null;t:for(;;){for(var f;d!==n||0!==a&&3!==d.nodeType||(l=i+a),d!==o||0!==r&&3!==d.nodeType||(s=i+r),3===d.nodeType&&(i+=d.nodeValue.length),null!==(f=d.firstChild);)p=d,d=f;for(;;){if(d===e)break t;if(p===n&&++u===a&&(l=i),p===o&&++c===r&&(s=i),null!==(f=d.nextSibling))break;p=(d=p).parentNode}d=f}n=-1===l||-1===s?null:{start:l,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ja={focusedElem:e,selectionRange:n},Un=!1,Xs=t;null!==Xs;)if(e=(t=Xs).child,1028&t.subtreeFlags&&null!==e)e.return=t,Xs=e;else for(;null!==Xs;){t=Xs;try{var g=t.alternate;if(1024&t.flags)switch(t.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==g){var h=g.memoizedProps,m=g.memoizedState,b=t.stateNode,x=b.getSnapshotBeforeUpdate(t.elementType===t.type?h:es(t.type,h),m);b.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var v=t.stateNode.containerInfo;1===v.nodeType?v.textContent="":9===v.nodeType&&v.documentElement&&v.removeChild(v.documentElement);break;default:throw Error(re(163))}}catch(y){kc(t,t.return,y)}if(null!==(e=t.sibling)){e.return=t.return,Xs=e;break}Xs=t.return}g=Js,Js=!1}(e,n),gu(n,e),pa(Ja),Un=!!Za,Ja=Za=null,e.current=n,mu(n),Gt(),ju=l,xn=i,Cu.transition=o}else e.current=n;if(Yu&&(Yu=!1,Hu=e,Vu=a),o=e.pendingLanes,0===o&&(Qu=null),function(e){if(rn&&"function"==typeof rn.onCommitFiberRoot)try{rn.onCommitFiberRoot(nn,e,void 0,!(128&~e.current.flags))}catch(t){}}(n.stateNode),tc(e,qt()),null!==t)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(Wu)throw Wu=!1,e=Uu,Uu=null,e;!!(1&Vu)&&0!==e.tag&&yc(),o=e.pendingLanes,1&o?e===qu?Gu++:(Gu=0,qu=e):Gu=0,Bo()}(e,t,n,r)}finally{Cu.transition=a,xn=r}return null}function yc(){if(null!==Hu){var e=vn(Vu),t=Cu.transition,n=xn;try{if(Cu.transition=null,xn=16>e?16:e,null===Hu)var r=!1;else{if(e=Hu,Hu=null,Vu=0,6&ju)throw Error(re(331));var a=ju;for(ju|=4,Xs=e.current;null!==Xs;){var o=Xs,i=o.child;if(16&Xs.flags){var l=o.deletions;if(null!==l){for(var s=0;s<l.length;s++){var u=l[s];for(Xs=u;null!==Xs;){var c=Xs;switch(c.tag){case 0:case 11:case 15:eu(8,c,o)}var d=c.child;if(null!==d)d.return=c,Xs=d;else for(;null!==Xs;){var p=(c=Xs).sibling,f=c.return;if(ru(c),c===u){Xs=null;break}if(null!==p){p.return=f,Xs=p;break}Xs=f}}}var g=o.alternate;if(null!==g){var h=g.child;if(null!==h){g.child=null;do{var m=h.sibling;h.sibling=null,h=m}while(null!==h)}}Xs=o}}if(2064&o.subtreeFlags&&null!==i)i.return=o,Xs=i;else e:for(;null!==Xs;){if(2048&(o=Xs).flags)switch(o.tag){case 0:case 11:case 15:eu(9,o,o.return)}var b=o.sibling;if(null!==b){b.return=o.return,Xs=b;break e}Xs=o.return}}var x=e.current;for(Xs=x;null!==Xs;){var v=(i=Xs).child;if(2064&i.subtreeFlags&&null!==v)v.return=i,Xs=v;else e:for(i=x;null!==Xs;){if(2048&(l=Xs).flags)try{switch(l.tag){case 0:case 11:case 15:tu(9,l)}}catch(w){kc(l,l.return,w)}if(l===i){Xs=null;break e}var y=l.sibling;if(null!==y){y.return=l.return,Xs=y;break e}Xs=l.return}}if(ju=a,Bo(),rn&&"function"==typeof rn.onPostCommitFiberRoot)try{rn.onPostCommitFiberRoot(nn,e)}catch(w){}r=!0}return r}finally{xn=n,Cu.transition=t}}return!1}function wc(e,t,n){e=Ii(e,t=ds(0,t=ls(n,t),1),1),t=Zu(),null!==e&&(mn(e,1,t),tc(e,t))}function kc(e,t,n){if(3===e.tag)wc(e,e,n);else for(;null!==t;){if(3===t.tag){wc(t,e,n);break}if(1===t.tag){var r=t.stateNode;if("function"==typeof t.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===Qu||!Qu.has(r))){t=Ii(t,e=ps(t,e=ls(n,e),1),1),e=Zu(),null!==t&&(mn(t,1,e),tc(t,e));break}}t=t.return}}function Sc(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=Zu(),e.pingedLanes|=e.suspendedLanes&n,zu===e&&(Nu&n)===n&&(4===Pu||3===Pu&&(130023424&Nu)===Nu&&500>qt()-Ou?cc(e,0):Ru|=n),tc(e,t)}function Fc(e,t){0===t&&(1&e.mode?(t=un,!(130023424&(un<<=1))&&(un=4194304)):t=1);var n=Zu();null!==(e=Di(e,t))&&(mn(e,t,n),tc(e,n))}function Cc(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),Fc(e,n)}function jc(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;null!==a&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(re(314))}null!==r&&r.delete(t),Fc(e,n)}function zc(e,t){return Yt(e,t)}function Ec(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nc(e,t,n,r){return new Ec(e,t,n,r)}function _c(e){return!(!(e=e.prototype)||!e.isReactComponent)}function Tc(e,t){var n=e.alternate;return null===n?((n=Nc(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=14680064&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Pc(e,t,n,r,a,o){var i=2;if(r=e,"function"==typeof e)_c(e)&&(i=1);else if("string"==typeof e)i=5;else e:switch(e){case we:return Dc(n.children,a,o,t);case ke:i=8,a|=8;break;case Se:return(e=Nc(12,n,t,2|a)).elementType=Se,e.lanes=o,e;case ze:return(e=Nc(13,n,t,a)).elementType=ze,e.lanes=o,e;case Ee:return(e=Nc(19,n,t,a)).elementType=Ee,e.lanes=o,e;case Te:return Ac(n,a,o,t);default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case Fe:i=10;break e;case Ce:i=9;break e;case je:i=11;break e;case Ne:i=14;break e;case _e:i=16,r=null;break e}throw Error(re(130,null==e?e:typeof e,""))}return(t=Nc(i,n,t,a)).elementType=e,t.type=r,t.lanes=o,t}function Dc(e,t,n,r){return(e=Nc(7,e,r,t)).lanes=n,e}function Ac(e,t,n,r){return(e=Nc(22,e,r,t)).elementType=Te,e.lanes=n,e.stateNode={isHidden:!1},e}function Lc(e,t,n){return(e=Nc(6,e,null,t)).lanes=n,e}function Rc(e,t,n){return(t=Nc(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function $c(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=hn(0),this.expirationTimes=hn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=hn(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Ic(e,t,n,r,a,o,i,l,s){return e=new $c(e,t,n,l,s),1===t?(t=1,!0===o&&(t|=8)):t=0,o=Nc(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Li(o),e}function Oc(e){if(!e)return jo;e:{if(Mt(e=e._reactInternals)!==e||1!==e.tag)throw Error(re(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(To(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(null!==t);throw Error(re(171))}if(1===e.tag){var n=e.type;if(To(n))return Ao(e,n,t)}return t}function Mc(e,t,n,r,a,o,i,l,s){return(e=Ic(n,r,!0,e,0,o,0,l,s)).context=Oc(null),n=e.current,(o=$i(r=Zu(),a=Ju(n))).callback=null!=t?t:null,Ii(n,o,a),e.current.lanes=a,mn(e,a,r),tc(e,r),e}function Bc(e,t,n,r){var a=t.current,o=Zu(),i=Ju(a);return n=Oc(n),null===t.context?t.context=n:t.pendingContext=n,(t=$i(o,i)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),null!==(e=Ii(a,t,i))&&(ec(e,a,i,o),Oi(e,a,i)),i}function Wc(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function Uc(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function Qc(e,t){Uc(e,t),(e=e.alternate)&&Uc(e,t)}wu=function(e,t,n){if(null!==e)if(e.memoizedProps!==t.pendingProps||Eo.current)bs=!0;else{if(0===(e.lanes&n)&&!(128&t.flags))return bs=!1,function(e,t,n){switch(t.tag){case 3:zs(t),pi();break;case 5:Xi(t);break;case 1:To(t.type)&&Lo(t);break;case 4:Gi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;Co(wi,r._currentValue),r._currentValue=a;break;case 13:if(null!==(r=t.memoizedState))return null!==r.dehydrated?(Co(Zi,1&Zi.current),t.flags|=128,null):0!==(n&t.child.childLanes)?Ls(e,t,n):(Co(Zi,1&Zi.current),null!==(e=Ws(e,t,n))?e.sibling:null);Co(Zi,1&Zi.current);break;case 19:if(r=0!==(n&t.childLanes),128&e.flags){if(r)return Ms(e,t,n);t.flags|=128}if(null!==(a=t.memoizedState)&&(a.rendering=null,a.tail=null,a.lastEffect=null),Co(Zi,Zi.current),r)break;return null;case 22:case 23:return t.lanes=0,ks(e,t,n)}return Ws(e,t,n)}(e,t,n);bs=!!(131072&e.flags)}else bs=!1,ri&&1048576&t.flags&&Zo(t,Yo,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Bs(e,t),e=t.pendingProps;var a=_o(t,zo.current);Ei(t,n),a=gl(null,t,r,e,a,n);var o=hl();return t.flags|=1,"object"==typeof a&&null!==a&&"function"==typeof a.render&&void 0===a.$$typeof?(t.tag=1,t.memoizedState=null,t.updateQueue=null,To(r)?(o=!0,Lo(t)):o=!1,t.memoizedState=null!==a.state&&void 0!==a.state?a.state:null,Li(t),a.updater=ns,t.stateNode=a,a._reactInternals=t,is(t,r,e,n),t=js(null,t,r,!0,o,n)):(t.tag=0,ri&&o&&Jo(t),xs(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Bs(e,t),e=t.pendingProps,r=(a=r._init)(r._payload),t.type=r,a=t.tag=function(e){if("function"==typeof e)return _c(e)?1:0;if(null!=e){if((e=e.$$typeof)===je)return 11;if(e===Ne)return 14}return 2}(r),e=es(r,e),a){case 0:t=Fs(null,t,r,e,n);break e;case 1:t=Cs(null,t,r,e,n);break e;case 11:t=vs(null,t,r,e,n);break e;case 14:t=ys(null,t,r,es(r.type,e),n);break e}throw Error(re(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,Fs(e,t,r,a=t.elementType===r?a:es(r,a),n);case 1:return r=t.type,a=t.pendingProps,Cs(e,t,r,a=t.elementType===r?a:es(r,a),n);case 3:e:{if(zs(t),null===e)throw Error(re(387));r=t.pendingProps,a=(o=t.memoizedState).element,Ri(e,t),Bi(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,256&t.flags){t=Es(e,t,r,n,a=ls(Error(re(423)),t));break e}if(r!==a){t=Es(e,t,r,n,a=ls(Error(re(424)),t));break e}for(ni=lo(t.stateNode.containerInfo.firstChild),ti=t,ri=!0,ai=null,n=yi(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|4096,n=n.sibling}else{if(pi(),r===a){t=Ws(e,t,n);break e}xs(e,t,r,n)}t=t.child}return t;case 5:return Xi(t),null===e&&si(t),r=t.type,a=t.pendingProps,o=null!==e?e.memoizedProps:null,i=a.children,eo(r,a)?i=null:null!==o&&eo(r,o)&&(t.flags|=32),Ss(e,t),xs(e,t,i,n),t.child;case 6:return null===e&&si(t),null;case 13:return Ls(e,t,n);case 4:return Gi(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=vi(t,null,r,n):xs(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,vs(e,t,r,a=t.elementType===r?a:es(r,a),n);case 7:return xs(e,t,t.pendingProps,n),t.child;case 8:case 12:return xs(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,o=t.memoizedProps,i=a.value,Co(wi,r._currentValue),r._currentValue=i,null!==o)if(oa(o.value,i)){if(o.children===a.children&&!Eo.current){t=Ws(e,t,n);break e}}else for(null!==(o=t.child)&&(o.return=t);null!==o;){var l=o.dependencies;if(null!==l){i=o.child;for(var s=l.firstContext;null!==s;){if(s.context===r){if(1===o.tag){(s=$i(-1,n&-n)).tag=2;var u=o.updateQueue;if(null!==u){var c=(u=u.shared).pending;null===c?s.next=s:(s.next=c.next,c.next=s),u.pending=s}}o.lanes|=n,null!==(s=o.alternate)&&(s.lanes|=n),zi(o.return,n,t),l.lanes|=n;break}s=s.next}}else if(10===o.tag)i=o.type===t.type?null:o.child;else if(18===o.tag){if(null===(i=o.return))throw Error(re(341));i.lanes|=n,null!==(l=i.alternate)&&(l.lanes|=n),zi(i,n,t),i=o.sibling}else i=o.child;if(null!==i)i.return=o;else for(i=o;null!==i;){if(i===t){i=null;break}if(null!==(o=i.sibling)){o.return=i.return,i=o;break}i=i.return}o=i}xs(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,Ei(t,n),r=r(a=Ni(a)),t.flags|=1,xs(e,t,r,n),t.child;case 14:return a=es(r=t.type,t.pendingProps),ys(e,t,r,a=es(r.type,a),n);case 15:return ws(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:es(r,a),Bs(e,t),t.tag=1,To(r)?(e=!0,Lo(t)):e=!1,Ei(t,n),as(t,r,a),is(t,r,a,n),js(null,t,r,!0,e,n);case 19:return Ms(e,t,n);case 22:return ks(e,t,n)}throw Error(re(156,t.tag))};var Yc="function"==typeof reportError?reportError:function(e){console.error(e)};function Hc(e){this._internalRoot=e}function Vc(e){this._internalRoot=e}function Gc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType)}function qc(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function Xc(){}function Kc(e,t,n,r,a){var o=n._reactRootContainer;if(o){var i=o;if("function"==typeof a){var l=a;a=function(){var e=Wc(i);l.call(e)}}Bc(t,i,e,a)}else i=function(e,t,n,r,a){if(a){if("function"==typeof r){var o=r;r=function(){var e=Wc(i);o.call(e)}}var i=Mc(t,r,e,0,null,!1,0,"",Xc);return e._reactRootContainer=i,e[fo]=i.current,Ma(8===e.nodeType?e.parentNode:e),sc(),i}for(;a=e.lastChild;)e.removeChild(a);if("function"==typeof r){var l=r;r=function(){var e=Wc(s);l.call(e)}}var s=Ic(e,0,!1,null,0,!1,0,"",Xc);return e._reactRootContainer=s,e[fo]=s.current,Ma(8===e.nodeType?e.parentNode:e),sc(function(){Bc(t,s,n,r)}),s}(n,t,e,a,r);return Wc(i)}Vc.prototype.render=Hc.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error(re(409));Bc(e,t,null,null)},Vc.prototype.unmount=Hc.prototype.unmount=function(){var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;sc(function(){Bc(null,e,null,null)}),t[fo]=null}},Vc.prototype.unstable_scheduleHydration=function(e){if(e){var t=Sn();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Pn.length&&0!==t&&t<Pn[n].priority;n++);Pn.splice(n,0,e),0===n&&Rn(e)}},yn=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=cn(t.pendingLanes);0!==n&&(bn(t,1|n),tc(t,qt()),!(6&ju)&&(Mu=qt()+500,Bo()))}break;case 13:sc(function(){var t=Di(e,1);if(null!==t){var n=Zu();ec(t,e,1,n)}}),Qc(e,1)}},wn=function(e){if(13===e.tag){var t=Di(e,134217728);if(null!==t)ec(t,e,134217728,Zu());Qc(e,134217728)}},kn=function(e){if(13===e.tag){var t=Ju(e),n=Di(e,t);if(null!==n)ec(n,e,t,Zu());Qc(e,t)}},Sn=function(){return xn},Fn=function(e,t){var n=xn;try{return xn=e,t()}finally{xn=n}},yt=function(e,t,n){switch(t){case"input":if(Xe(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=yo(r);if(!a)throw Error(re(90));Ye(r),Xe(r,a)}}}break;case"textarea":rt(e,n);break;case"select":null!=(t=n.value)&&et(e,!!n.multiple,t,!1)}},jt=lc,zt=sc;var Zc={usingClientEntryPoint:!1,Events:[xo,vo,yo,Ft,Ct,lc]},Jc={findFiberByHostInstance:bo,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ed={bundleType:Jc.bundleType,version:Jc.version,rendererPackageName:Jc.rendererPackageName,rendererConfig:Jc.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xe.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=Ut(e))?null:e.stateNode},findFiberByHostInstance:Jc.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var td=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!td.isDisabled&&td.supportsFiber)try{nn=td.inject(ed),rn=td}catch(st){}}K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Zc,K.createPortal=function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Gc(t))throw Error(re(200));return function(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:ye,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}(e,t,null,n)},K.createRoot=function(e,t){if(!Gc(e))throw Error(re(299));var n=!1,r="",a=Yc;return null!=t&&(!0===t.unstable_strictMode&&(n=!0),void 0!==t.identifierPrefix&&(r=t.identifierPrefix),void 0!==t.onRecoverableError&&(a=t.onRecoverableError)),t=Ic(e,1,!1,null,0,n,0,r,a),e[fo]=t.current,Ma(8===e.nodeType?e.parentNode:e),new Hc(t)},K.findDOMNode=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"==typeof e.render)throw Error(re(188));throw e=Object.keys(e).join(","),Error(re(268,e))}return e=null===(e=Ut(t))?null:e.stateNode},K.flushSync=function(e){return sc(e)},K.hydrate=function(e,t,n){if(!qc(t))throw Error(re(200));return Kc(null,e,t,!0,n)},K.hydrateRoot=function(e,t,n){if(!Gc(e))throw Error(re(405));var r=null!=n&&n.hydratedSources||null,a=!1,o="",i=Yc;if(null!=n&&(!0===n.unstable_strictMode&&(a=!0),void 0!==n.identifierPrefix&&(o=n.identifierPrefix),void 0!==n.onRecoverableError&&(i=n.onRecoverableError)),t=Mc(t,null,e,1,null!=n?n:null,a,0,o,i),e[fo]=t.current,Ma(e),r)for(e=0;e<r.length;e++)a=(a=(n=r[e])._getVersion)(n._source),null==t.mutableSourceEagerHydrationData?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Vc(t)},K.render=function(e,t,n){if(!qc(t))throw Error(re(200));return Kc(null,e,t,!1,n)},K.unmountComponentAtNode=function(e){if(!qc(e))throw Error(re(40));return!!e._reactRootContainer&&(sc(function(){Kc(null,null,e,!1,function(){e._reactRootContainer=null,e[fo]=null})}),!0)},K.unstable_batchedUpdates=lc,K.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!qc(n))throw Error(re(200));if(null==e||void 0===e._reactInternals)throw Error(re(38));return Kc(e,t,n,!1,r)},K.version="18.3.1-next-f1338f8080-20240426",function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}(),X.exports=K;var nd=X.exports;q.createRoot=nd.createRoot,q.hydrateRoot=nd.hydrateRoot;var rd=function(){return rd=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},rd.apply(this,arguments)};function ad(e,t,n){if(n||2===arguments.length)for(var r,a=0,o=t.length;a<o;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError;var od="-ms-",id="-moz-",ld="-webkit-",sd="comm",ud="rule",cd="decl",dd="@keyframes",pd=Math.abs,fd=String.fromCharCode,gd=Object.assign;function hd(e){return e.trim()}function md(e,t){return(e=t.exec(e))?e[0]:e}function bd(e,t,n){return e.replace(t,n)}function xd(e,t,n){return e.indexOf(t,n)}function vd(e,t){return 0|e.charCodeAt(t)}function yd(e,t,n){return e.slice(t,n)}function wd(e){return e.length}function kd(e){return e.length}function Sd(e,t){return t.push(e),e}function Fd(e,t){return e.filter(function(e){return!md(e,t)})}var Cd=1,jd=1,zd=0,Ed=0,Nd=0,_d="";function Td(e,t,n,r,a,o,i,l){return{value:e,root:t,parent:n,type:r,props:a,children:o,line:Cd,column:jd,length:i,return:"",siblings:l}}function Pd(e,t){return gd(Td("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Dd(e){for(;e.root;)e=Pd(e.root,{children:[e]});Sd(e,e.siblings)}function Ad(){return Nd=Ed>0?vd(_d,--Ed):0,jd--,10===Nd&&(jd=1,Cd--),Nd}function Ld(){return Nd=Ed<zd?vd(_d,Ed++):0,jd++,10===Nd&&(jd=1,Cd++),Nd}function Rd(){return vd(_d,Ed)}function $d(){return Ed}function Id(e,t){return yd(_d,e,t)}function Od(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Md(e){return hd(Id(Ed-1,Ud(91===e?e+2:40===e?e+1:e)))}function Bd(e){for(;(Nd=Rd())&&Nd<33;)Ld();return Od(e)>2||Od(Nd)>3?"":" "}function Wd(e,t){for(;--t&&Ld()&&!(Nd<48||Nd>102||Nd>57&&Nd<65||Nd>70&&Nd<97););return Id(e,$d()+(t<6&&32==Rd()&&32==Ld()))}function Ud(e){for(;Ld();)switch(Nd){case e:return Ed;case 34:case 39:34!==e&&39!==e&&Ud(Nd);break;case 40:41===e&&Ud(e);break;case 92:Ld()}return Ed}function Qd(e,t){for(;Ld()&&e+Nd!==57&&(e+Nd!==84||47!==Rd()););return"/*"+Id(t,Ed-1)+"*"+fd(47===e?e:Ld())}function Yd(e){for(;!Od(Rd());)Ld();return Id(e,Ed)}function Hd(e){return function(e){return _d="",e}(Vd("",null,null,null,[""],e=function(e){return Cd=jd=1,zd=wd(_d=e),Ed=0,[]}(e),0,[0],e))}function Vd(e,t,n,r,a,o,i,l,s){for(var u=0,c=0,d=i,p=0,f=0,g=0,h=1,m=1,b=1,x=0,v="",y=a,w=o,k=r,S=v;m;)switch(g=x,x=Ld()){case 40:if(108!=g&&58==vd(S,d-1)){-1!=xd(S+=bd(Md(x),"&","&\f"),"&\f",pd(u?l[u-1]:0))&&(b=-1);break}case 34:case 39:case 91:S+=Md(x);break;case 9:case 10:case 13:case 32:S+=Bd(g);break;case 92:S+=Wd($d()-1,7);continue;case 47:switch(Rd()){case 42:case 47:Sd(qd(Qd(Ld(),$d()),t,n,s),s);break;default:S+="/"}break;case 123*h:l[u++]=wd(S)*b;case 125*h:case 59:case 0:switch(x){case 0:case 125:m=0;case 59+c:-1==b&&(S=bd(S,/\f/g,"")),f>0&&wd(S)-d&&Sd(f>32?Xd(S+";",r,n,d-1,s):Xd(bd(S," ","")+";",r,n,d-2,s),s);break;case 59:S+=";";default:if(Sd(k=Gd(S,t,n,u,c,a,l,v,y=[],w=[],d,o),o),123===x)if(0===c)Vd(S,t,k,k,y,o,d,l,w);else switch(99===p&&110===vd(S,3)?100:p){case 100:case 108:case 109:case 115:Vd(e,k,k,r&&Sd(Gd(e,k,k,0,0,a,l,v,a,y=[],d,w),w),a,w,d,l,r?y:w);break;default:Vd(S,k,k,k,[""],w,0,l,w)}}u=c=f=0,h=b=1,v=S="",d=i;break;case 58:d=1+wd(S),f=g;default:if(h<1)if(123==x)--h;else if(125==x&&0==h++&&125==Ad())continue;switch(S+=fd(x),x*h){case 38:b=c>0?1:(S+="\f",-1);break;case 44:l[u++]=(wd(S)-1)*b,b=1;break;case 64:45===Rd()&&(S+=Md(Ld())),p=Rd(),c=d=wd(v=S+=Yd($d())),x++;break;case 45:45===g&&2==wd(S)&&(h=0)}}return o}function Gd(e,t,n,r,a,o,i,l,s,u,c,d){for(var p=a-1,f=0===a?o:[""],g=kd(f),h=0,m=0,b=0;h<r;++h)for(var x=0,v=yd(e,p+1,p=pd(m=i[h])),y=e;x<g;++x)(y=hd(m>0?f[x]+" "+v:bd(v,/&\f/g,f[x])))&&(s[b++]=y);return Td(e,t,n,0===a?ud:l,s,u,c,d)}function qd(e,t,n,r){return Td(e,t,n,sd,fd(Nd),yd(e,2,-2),0,r)}function Xd(e,t,n,r,a){return Td(e,t,n,cd,yd(e,0,r),yd(e,r+1,-1),r,a)}function Kd(e,t,n){switch(function(e,t){return 45^vd(e,0)?(((t<<2^vd(e,0))<<2^vd(e,1))<<2^vd(e,2))<<2^vd(e,3):0}(e,t)){case 5103:return ld+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return ld+e+e;case 4789:return id+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return ld+e+id+e+od+e+e;case 5936:switch(vd(e,t+11)){case 114:return ld+e+od+bd(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return ld+e+od+bd(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return ld+e+od+bd(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return ld+e+od+e+e;case 6165:return ld+e+od+"flex-"+e+e;case 5187:return ld+e+bd(e,/(\w+).+(:[^]+)/,ld+"box-$1$2"+od+"flex-$1$2")+e;case 5443:return ld+e+od+"flex-item-"+bd(e,/flex-|-self/g,"")+(md(e,/flex-|baseline/)?"":od+"grid-row-"+bd(e,/flex-|-self/g,""))+e;case 4675:return ld+e+od+"flex-line-pack"+bd(e,/align-content|flex-|-self/g,"")+e;case 5548:return ld+e+od+bd(e,"shrink","negative")+e;case 5292:return ld+e+od+bd(e,"basis","preferred-size")+e;case 6060:return ld+"box-"+bd(e,"-grow","")+ld+e+od+bd(e,"grow","positive")+e;case 4554:return ld+bd(e,/([^-])(transform)/g,"$1"+ld+"$2")+e;case 6187:return bd(bd(bd(e,/(zoom-|grab)/,ld+"$1"),/(image-set)/,ld+"$1"),e,"")+e;case 5495:case 3959:return bd(e,/(image-set\([^]*)/,ld+"$1$`$1");case 4968:return bd(bd(e,/(.+:)(flex-)?(.*)/,ld+"box-pack:$3"+od+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+ld+e+e;case 4200:if(!md(e,/flex-|baseline/))return od+"grid-column-align"+yd(e,t)+e;break;case 2592:case 3360:return od+bd(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,md(e.props,/grid-\w+-end/)})?~xd(e+(n=n[t].value),"span",0)?e:od+bd(e,"-start","")+e+od+"grid-row-span:"+(~xd(n,"span",0)?md(n,/\d+/):+md(n,/\d+/)-+md(e,/\d+/))+";":od+bd(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(e){return md(e.props,/grid-\w+-start/)})?e:od+bd(bd(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return bd(e,/(.+)-inline(.+)/,ld+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(wd(e)-1-t>6)switch(vd(e,t+1)){case 109:if(45!==vd(e,t+4))break;case 102:return bd(e,/(.+:)(.+)-([^]+)/,"$1"+ld+"$2-$3$1"+id+(108==vd(e,t+3)?"$3":"$2-$3"))+e;case 115:return~xd(e,"stretch",0)?Kd(bd(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return bd(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,a,o,i,l){return od+n+":"+r+l+(a?od+n+"-span:"+(o?i:+i-+r)+l:"")+e});case 4949:if(121===vd(e,t+6))return bd(e,":",":"+ld)+e;break;case 6444:switch(vd(e,45===vd(e,14)?18:11)){case 120:return bd(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+ld+(45===vd(e,14)?"inline-":"")+"box$3$1"+ld+"$2$3$1"+od+"$2box$3")+e;case 100:return bd(e,":",":"+od)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return bd(e,"scroll-","scroll-snap-")+e}return e}function Zd(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function Jd(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case cd:return e.return=e.return||e.value;case sd:return"";case dd:return e.return=e.value+"{"+Zd(e.children,r)+"}";case ud:if(!wd(e.value=e.props.join(",")))return""}return wd(n=Zd(e.children,r))?e.return=e.value+"{"+n+"}":""}function ep(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case cd:return void(e.return=Kd(e.value,e.length,n));case dd:return Zd([Pd(e,{value:bd(e.value,"@","@"+ld)})],r);case ud:if(e.length)return function(e,t){return e.map(t).join("")}(n=e.props,function(t){switch(md(t,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Dd(Pd(e,{props:[bd(t,/:(read-\w+)/,":-moz-$1")]})),Dd(Pd(e,{props:[t]})),gd(e,{props:Fd(n,r)});break;case"::placeholder":Dd(Pd(e,{props:[bd(t,/:(plac\w+)/,":"+ld+"input-$1")]})),Dd(Pd(e,{props:[bd(t,/:(plac\w+)/,":-moz-$1")]})),Dd(Pd(e,{props:[bd(t,/:(plac\w+)/,od+"input-$1")]})),Dd(Pd(e,{props:[t]})),gd(e,{props:Fd(n,r)})}return""})}}var tp={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},np={},rp="undefined"!=typeof process&&void 0!==np&&(np.REACT_APP_SC_ATTR||np.SC_ATTR)||"data-styled",ap="active",op="data-styled-version",ip="6.1.19",lp="/*!sc*/\n",sp="undefined"!=typeof window&&"undefined"!=typeof document,up=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==np&&void 0!==np.REACT_APP_SC_DISABLE_SPEEDY&&""!==np.REACT_APP_SC_DISABLE_SPEEDY?"false"!==np.REACT_APP_SC_DISABLE_SPEEDY&&np.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==np&&void 0!==np.SC_DISABLE_SPEEDY&&""!==np.SC_DISABLE_SPEEDY&&("false"!==np.SC_DISABLE_SPEEDY&&np.SC_DISABLE_SPEEDY)),cp={},dp=Object.freeze([]),pp=Object.freeze({});function fp(e,t,n){return void 0===n&&(n=pp),e.theme!==n.theme&&e.theme||t||n.theme}var gp=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),hp=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,mp=/(^-|-$)/g;function bp(e){return e.replace(hp,"-").replace(mp,"")}var xp=/(a)(d)/gi,vp=function(e){return String.fromCharCode(e+(e>25?39:97))};function yp(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=vp(t%52)+n;return(vp(t%52)+n).replace(xp,"$1-$2")}var wp,kp=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Sp=function(e){return kp(5381,e)};function Fp(e){return yp(Sp(e)>>>0)}function Cp(e){return"string"==typeof e&&!0}var jp="function"==typeof Symbol&&Symbol.for,zp=jp?Symbol.for("react.memo"):60115,Ep=jp?Symbol.for("react.forward_ref"):60112,Np={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},_p={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Tp={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Pp=((wp={})[Ep]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},wp[zp]=Tp,wp);function Dp(e){return("type"in(t=e)&&t.type.$$typeof)===zp?Tp:"$$typeof"in e?Pp[e.$$typeof]:Np;var t}var Ap=Object.defineProperty,Lp=Object.getOwnPropertyNames,Rp=Object.getOwnPropertySymbols,$p=Object.getOwnPropertyDescriptor,Ip=Object.getPrototypeOf,Op=Object.prototype;function Mp(e,t,n){if("string"!=typeof t){if(Op){var r=Ip(t);r&&r!==Op&&Mp(e,r,n)}var a=Lp(t);Rp&&(a=a.concat(Rp(t)));for(var o=Dp(e),i=Dp(t),l=0;l<a.length;++l){var s=a[l];if(!(s in _p||n&&n[s]||i&&s in i||o&&s in o)){var u=$p(t,s);try{Ap(e,s,u)}catch(c){}}}}return e}function Bp(e){return"function"==typeof e}function Wp(e){return"object"==typeof e&&"styledComponentId"in e}function Up(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Qp(e,t){if(0===e.length)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function Yp(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Hp(e,t,n){if(void 0===n&&(n=!1),!n&&!Yp(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Hp(e[r],t[r]);else if(Yp(t))for(var r in t)e[r]=Hp(e[r],t[r]);return e}function Vp(e,t){Object.defineProperty(e,"toString",{value:t})}function Gp(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var qp=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,a=r;e>=a;)if((a<<=1)<0)throw Gp(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var o=r;o<a;o++)this.groupSizes[o]=0}for(var i=this.indexOfGroup(e+1),l=(o=0,t.length);o<l;o++)this.tag.insertRule(i,t[o])&&(this.groupSizes[e]++,i++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var a=n;a<r;a++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),a=r+n,o=r;o<a;o++)t+="".concat(this.tag.getRule(o)).concat(lp);return t},e}(),Xp=new Map,Kp=new Map,Zp=1,Jp=function(e){if(Xp.has(e))return Xp.get(e);for(;Kp.has(Zp);)Zp++;var t=Zp++;return Xp.set(e,t),Kp.set(t,e),t},ef=function(e,t){Zp=t+1,Xp.set(e,t),Kp.set(t,e)},tf="style[".concat(rp,"][").concat(op,'="').concat(ip,'"]'),nf=new RegExp("^".concat(rp,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),rf=function(e,t,n){for(var r,a=n.split(","),o=0,i=a.length;o<i;o++)(r=a[o])&&e.registerName(t,r)},af=function(e,t){for(var n,r=(null!==(n=t.textContent)&&void 0!==n?n:"").split(lp),a=[],o=0,i=r.length;o<i;o++){var l=r[o].trim();if(l){var s=l.match(nf);if(s){var u=0|parseInt(s[1],10),c=s[2];0!==u&&(ef(c,u),rf(e,c,s[3]),e.getTag().insertRules(u,a)),a.length=0}else a.push(l)}}},of=function(e){for(var t=document.querySelectorAll(tf),n=0,r=t.length;n<r;n++){var a=t[n];a&&a.getAttribute(rp)!==ap&&(af(e,a),a.parentNode&&a.parentNode.removeChild(a))}};var lf=function(e){var t,n,r=document.head,a=e||r,o=document.createElement("style"),i=(t=a,(n=Array.from(t.querySelectorAll("style[".concat(rp,"]"))))[n.length-1]),l=void 0!==i?i.nextSibling:null;o.setAttribute(rp,ap),o.setAttribute(op,ip);var s="undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null;return s&&o.setAttribute("nonce",s),a.insertBefore(o,l),o},sf=function(){function e(e){this.element=lf(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var a=t[n];if(a.ownerNode===e)return a}throw Gp(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(n){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),uf=function(){function e(e){this.element=lf(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),cf=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),df=sp,pf={isServer:!sp,useCSSOMInjection:!up},ff=function(){function e(e,t,n){void 0===e&&(e=pp),void 0===t&&(t={});var r=this;this.options=rd(rd({},pf),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&sp&&df&&(df=!1,of(this)),Vp(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r="",a=function(n){var a,o=(a=n,Kp.get(a));if(void 0===o)return"continue";var i=e.names.get(o),l=t.getGroup(n);if(void 0===i||!i.size||0===l.length)return"continue";var s="".concat(rp,".g").concat(n,'[id="').concat(o,'"]'),u="";void 0!==i&&i.forEach(function(e){e.length>0&&(u+="".concat(e,","))}),r+="".concat(l).concat(s,'{content:"').concat(u,'"}').concat(lp)},o=0;o<n;o++)a(o);return r}(r)})}return e.registerId=function(e){return Jp(e)},e.prototype.rehydrate=function(){!this.server&&sp&&of(this)},e.prototype.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(rd(rd({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=this.options,t=e.useCSSOMInjection,n=e.target,r=e.isServer?new cf(n):t?new sf(n):new uf(n),new qp(r)));var e,t,n,r},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(Jp(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(Jp(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(Jp(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),gf=/&/g,hf=/^\s*\/\/.*$/gm;function mf(e,t){return e.map(function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return"".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=mf(e.children,t)),e})}var bf=new ff,xf=function(){var e,t,n,r=pp,a=r.options,o=void 0===a?pp:a,i=r.plugins,l=void 0===i?dp:i,s=function(n,r,a){return a.startsWith(t)&&a.endsWith(t)&&a.replaceAll(t,"").length>0?".".concat(e):n},u=l.slice();u.push(function(e){e.type===ud&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(gf,t).replace(n,s))}),o.prefix&&u.push(ep),u.push(Jd);var c=function(r,a,i,l){void 0===a&&(a=""),void 0===i&&(i=""),void 0===l&&(l="&"),e=l,t=a,n=new RegExp("\\".concat(t,"\\b"),"g");var s=r.replace(hf,""),c=Hd(i||a?"".concat(i," ").concat(a," { ").concat(s," }"):s);o.namespace&&(c=mf(c,o.namespace));var d,p,f,g=[];return Zd(c,(d=u.concat((f=function(e){return g.push(e)},function(e){e.root||(e=e.return)&&f(e)})),p=kd(d),function(e,t,n,r){for(var a="",o=0;o<p;o++)a+=d[o](e,t,n,r)||"";return a})),g};return c.hash=l.length?l.reduce(function(e,t){return t.name||Gp(15),kp(e,t.name)},5381).toString():"",c}(),vf=M.createContext({shouldForwardProp:void 0,styleSheet:bf,stylis:xf});function yf(){return O.useContext(vf)}vf.Consumer,M.createContext(void 0);var wf=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=xf);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,Vp(this,function(){throw Gp(12,String(n.name))})}return e.prototype.getName=function(e){return void 0===e&&(e=xf),this.name+e.hash},e}(),kf=function(e){return e>="A"&&e<="Z"};function Sf(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;kf(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var Ff=function(e){return null==e||!1===e||""===e},Cf=function(e){var t,n,r=[];for(var a in e){var o=e[a];e.hasOwnProperty(a)&&!Ff(o)&&(Array.isArray(o)&&o.isCss||Bp(o)?r.push("".concat(Sf(a),":"),o,";"):Yp(o)?r.push.apply(r,ad(ad(["".concat(a," {")],Cf(o),!1),["}"],!1)):r.push("".concat(Sf(a),": ").concat((t=a,null==(n=o)||"boolean"==typeof n||""===n?"":"number"!=typeof n||0===n||t in tp||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function jf(e,t,n,r){return Ff(e)?[]:Wp(e)?[".".concat(e.styledComponentId)]:Bp(e)?!Bp(a=e)||a.prototype&&a.prototype.isReactComponent||!t?[e]:jf(e(t),t,n,r):e instanceof wf?n?(e.inject(n,r),[e.getName(r)]):[e]:Yp(e)?Cf(e):Array.isArray(e)?Array.prototype.concat.apply(dp,e.map(function(e){return jf(e,t,n,r)})):[e.toString()];var a}function zf(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Bp(n)&&!Wp(n))return!1}return!0}var Ef=Sp(ip),Nf=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===n||n.isStatic)&&zf(e),this.componentId=t,this.baseHash=kp(Ef,t),this.baseStyle=n,ff.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=Up(r,this.staticRulesId);else{var a=Qp(jf(this.rules,e,t,n)),o=yp(kp(this.baseHash,a)>>>0);if(!t.hasNameForId(this.componentId,o)){var i=n(a,".".concat(o),void 0,this.componentId);t.insertRules(this.componentId,o,i)}r=Up(r,o),this.staticRulesId=o}else{for(var l=kp(this.baseHash,n.hash),s="",u=0;u<this.rules.length;u++){var c=this.rules[u];if("string"==typeof c)s+=c;else if(c){var d=Qp(jf(c,e,t,n));l=kp(l,d+u),s+=d}}if(s){var p=yp(l>>>0);t.hasNameForId(this.componentId,p)||t.insertRules(this.componentId,p,n(s,".".concat(p),void 0,this.componentId)),r=Up(r,p)}}return r},e}(),_f=M.createContext(void 0);_f.Consumer;var Tf={};function Pf(e,t,n){var r,a=Wp(e),o=e,i=!Cp(e),l=t.attrs,s=void 0===l?dp:l,u=t.componentId,c=void 0===u?function(e,t){var n="string"!=typeof e?"sc":bp(e);Tf[n]=(Tf[n]||0)+1;var r="".concat(n,"-").concat(Fp(ip+n+Tf[n]));return t?"".concat(t,"-").concat(r):r}(t.displayName,t.parentComponentId):u,d=t.displayName,p=void 0===d?Cp(r=e)?"styled.".concat(r):"Styled(".concat(function(e){return e.displayName||e.name||"Component"}(r),")"):d,f=t.displayName&&t.componentId?"".concat(bp(t.displayName),"-").concat(t.componentId):t.componentId||c,g=a&&o.attrs?o.attrs.concat(s).filter(Boolean):s,h=t.shouldForwardProp;if(a&&o.shouldForwardProp){var m=o.shouldForwardProp;if(t.shouldForwardProp){var b=t.shouldForwardProp;h=function(e,t){return m(e,t)&&b(e,t)}}else h=m}var x=new Nf(n,f,a?o.componentStyle:void 0);function v(e,t){return function(e,t,n){var r=e.attrs,a=e.componentStyle,o=e.defaultProps,i=e.foldedComponentIds,l=e.styledComponentId,s=e.target,u=M.useContext(_f),c=yf(),d=e.shouldForwardProp||c.shouldForwardProp,p=fp(t,u,o)||pp,f=function(e,t,n){for(var r,a=rd(rd({},t),{className:void 0,theme:n}),o=0;o<e.length;o+=1){var i=Bp(r=e[o])?r(a):r;for(var l in i)a[l]="className"===l?Up(a[l],i[l]):"style"===l?rd(rd({},a[l]),i[l]):i[l]}return t.className&&(a.className=Up(a.className,t.className)),a}(r,t,p),g=f.as||s,h={};for(var m in f)void 0===f[m]||"$"===m[0]||"as"===m||"theme"===m&&f.theme===p||("forwardedAs"===m?h.as=f.forwardedAs:d&&!d(m,g)||(h[m]=f[m]));var b,x,v,y=(b=a,x=f,v=yf(),b.generateAndInjectStyles(x,v.styleSheet,v.stylis)),w=Up(i,l);return y&&(w+=" "+y),f.className&&(w+=" "+f.className),h[Cp(g)&&!gp.has(g)?"class":"className"]=w,n&&(h.ref=n),O.createElement(g,h)}(y,e,t)}v.displayName=p;var y=M.forwardRef(v);return y.attrs=g,y.componentStyle=x,y.displayName=p,y.shouldForwardProp=h,y.foldedComponentIds=a?Up(o.foldedComponentIds,o.styledComponentId):"",y.styledComponentId=f,y.target=a?o.target:e,Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=a?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,a=t;r<a.length;r++)Hp(e,a[r],!0);return e}({},o.defaultProps,e):e}}),Vp(y,function(){return".".concat(y.styledComponentId)}),i&&Mp(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),y}function Df(e,t){for(var n=[e[0]],r=0,a=t.length;r<a;r+=1)n.push(t[r],e[r+1]);return n}var Af=function(e){return Object.assign(e,{isCss:!0})};function Lf(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Bp(e)||Yp(e))return Af(jf(Df(dp,ad([e],t,!0))));var r=e;return 0===t.length&&1===r.length&&"string"==typeof r[0]?jf(r):Af(jf(Df(r,t)))}function Rf(e,t,n){if(void 0===n&&(n=pp),!t)throw Gp(1,t);var r=function(r){for(var a=[],o=1;o<arguments.length;o++)a[o-1]=arguments[o];return e(t,n,Lf.apply(void 0,ad([r],a,!1)))};return r.attrs=function(r){return Rf(e,t,rd(rd({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return Rf(e,t,rd(rd({},n),r))},r}var $f=function(e){return Rf(Pf,e)},If=$f;gp.forEach(function(e){If[e]=$f(e)});var Of=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=zf(e),ff.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var a=r(Qp(jf(this.rules,t,n,r)),""),o=this.componentId+e;n.insertRules(o,o,a)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&ff.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function Mf(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=Qp(Lf.apply(void 0,ad([e],t,!1))),a=Fp(r);return new wf(a,r)}const Bf=Mf`
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`,Wf=Mf`
  0%, 100% { 
    box-shadow: 0 0 8px rgba(139, 69, 19, 0.15);
  }
  50% { 
    box-shadow: 0 0 12px rgba(139, 69, 19, 0.25);
  }
`,Uf=If.div`
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
  animation: ${Bf} 0.8s ease-out forwards;
  transition: all 0.5s ease;
`,Qf=If.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding-top: 80px;
`,Yf=If.div`
  margin-bottom: 60px;
  position: relative;
`,Hf=If.div`
  width: 140px;
  height: 120px;
  margin: 0 auto 40px auto;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120"><defs><linearGradient id="imperialDragon" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23DC143C"/><stop offset="30%" stop-color="%23FFD700"/><stop offset="70%" stop-color="%2300BFFF"/><stop offset="100%" stop-color="%239370DB"/></linearGradient><radialGradient id="dragonEyes" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23FFD700"/><stop offset="70%" stop-color="%23FF8F00"/><stop offset="100%" stop-color="%23FF4500"/></radialGradient><filter id="dragonGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g><path d="M30 60 C45 40 65 35 85 40 C105 35 125 40 130 60 C125 80 105 85 85 80 C65 85 45 80 30 60 Z" fill="url(%23imperialDragon)" filter="url(%23dragonGlow)"/><circle cx="60" cy="55" r="6" fill="url(%23dragonEyes)" filter="url(%23dragonGlow)"/><circle cx="80" cy="55" r="6" fill="url(%23dragonEyes)" filter="url(%23dragonGlow)"/><path d="M50 35 C55 30 60 35 55 40 C60 45 55 50 50 45 C45 50 40 45 45 40 C40 35 45 30 50 35 Z" fill="url(%23imperialDragon)"/><path d="M85 35 C90 30 95 35 90 40 C95 45 90 50 85 45 C80 50 75 45 80 40 C75 35 80 30 85 35 Z" fill="url(%23imperialDragon)"/><path d="M25 55 C30 50 35 55 30 60 C35 65 30 70 25 65 C20 70 15 65 20 60 C15 55 20 50 25 55 Z" fill="url(%23imperialDragon)"/><path d="M110 55 C115 50 120 55 115 60 C120 65 115 70 110 65 C105 70 100 65 105 60 C100 55 105 50 110 55 Z" fill="url(%23imperialDragon)"/></g></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${Wf} 3s ease-in-out infinite;
  filter: drop-shadow(0 0 40px var(--glow-red));
`;Mf`
  0% { 
    text-shadow: 0 0 30px var(--glow-gold);
    filter: brightness(1);
  }
  100% { 
    text-shadow: 0 0 50px var(--glow-gold), 0 0 70px var(--glow-red);
    filter: brightness(1.2);
  }
`;const Vf=If.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 20px;
  letter-spacing: -0.02em;
  text-shadow: 0 0 30px var(--glow-gold);
  background: linear-gradient(45deg, var(--imperial-red), var(--dragon-gold), var(--jade-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGlow 3s ease-in-out infinite alternate;
`,Gf=If.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1.2rem;
  color: var(--text-accent);
  margin-bottom: 80px;
  opacity: 0.9;
  font-weight: 500;
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 0 15px var(--glow-gold);
`,qf=If.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 800px;
  margin: 0 auto;
`,Xf=If.button`
  position: relative;
  padding: 40px 28px;
  border: 2px solid transparent;
  border-radius: 24px;
  background: ${e=>"primary"===e.variant?"linear-gradient(145deg, rgba(220, 20, 60, 0.9) 0%, rgba(178, 34, 34, 0.8) 100%)":"var(--bg-card)"};
  color: var(--text-primary);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 32px ${e=>"primary"===e.variant?"var(--shadow-dragon)":"var(--shadow-mystic)"},
    0 0 0 1px rgba(255, 215, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  letter-spacing: 0.02em;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${e=>"primary"===e.variant?"linear-gradient(45deg, var(--imperial-red), var(--dragon-gold), var(--tech-blue))":"linear-gradient(45deg, var(--tech-blue), var(--mystic-purple), var(--jade-green))"};
    border-radius: 24px;
    padding: 2px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 
      0 20px 60px ${e=>"primary"===e.variant?"var(--shadow-dragon)":"var(--shadow-mystic)"},
      0 0 40px ${e=>"primary"===e.variant?"var(--glow-gold)":"var(--glow-tech)"},
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    background: ${e=>"primary"===e.variant?"linear-gradient(145deg, rgba(255, 69, 0, 0.9) 0%, rgba(220, 20, 60, 0.8) 100%)":"var(--bg-secondary)"};
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:active {
    transform: translateY(-4px) scale(1.02);
  }
`,Kf=If.span`
  display: block;
  font-size: 2.2rem;
  margin-bottom: 16px;
  color: inherit;
  opacity: 0.9;
  text-shadow: 0 0 10px currentColor;
`,Zf=If.span`
  display: block;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-shadow: 0 0 8px currentColor;
`,Jf=If.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-family: 'Noto Sans SC', serif;
  font-size: 1.4rem;
  opacity: 0.3;
  color: var(--text-accent);
  font-weight: 700;
  text-shadow: 0 0 10px var(--glow-gold);
`,eg=({onNavigate:e})=>{const t=t=>{var n,r;(null==(r=null==(n=window.Telegram)?void 0:n.WebApp)?void 0:r.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.impactOccurred("medium"),e(t)};return G.jsxs(Uf,{children:[G.jsx("div",{className:"dragon-watermark"}),G.jsx("div",{className:"mystic-seal",style:{top:"8%",left:"3%"}}),G.jsx("div",{className:"mystic-seal",style:{bottom:"12%",right:"5%"}}),G.jsx("div",{className:"mystic-seal",style:{top:"50%",left:"2%",transform:"rotate(45deg) scale(0.7)"}}),G.jsx("div",{className:"mystic-seal",style:{top:"30%",right:"2%",transform:"rotate(-45deg) scale(0.8)"}}),G.jsxs(Qf,{children:[G.jsxs(Yf,{children:[G.jsx(Hf,{}),G.jsx(Vf,{children:"Poizonic"})]}),G.jsx(Gf,{children:"Доставляем оригинальные товары из Китая с гарантией качества и прозрачными ценами"}),G.jsxs(qf,{children:[G.jsxs(Xf,{variant:"primary",onClick:()=>t("order"),children:[G.jsx(Kf,{children:"🏮"}),G.jsx(Zf,{children:"Сделать заказ"}),G.jsx(Jf,{children:"福"})]}),G.jsxs(Xf,{onClick:()=>t("calculator"),children:[G.jsx(Kf,{children:"💰"}),G.jsx(Zf,{children:"Расчет стоимости"}),G.jsx(Jf,{children:"財"})]}),G.jsxs(Xf,{onClick:()=>t("referral"),children:[G.jsx(Kf,{children:"🔗"}),G.jsx(Zf,{children:"Реферальная система"}),G.jsx(Jf,{children:"運"})]}),G.jsxs(Xf,{onClick:()=>t("faq"),children:[G.jsx(Kf,{children:"❓"}),G.jsx(Zf,{children:"FAQ"}),G.jsx(Jf,{children:"智"})]}),G.jsxs(Xf,{onClick:()=>t("instructions"),children:[G.jsx(Kf,{children:"📖"}),G.jsx(Zf,{children:"Инструкции"}),G.jsx(Jf,{children:"學"})]}),G.jsxs(Xf,{onClick:()=>t("exchange-rate"),children:[G.jsx(Kf,{children:"📊"}),G.jsx(Zf,{children:"Курс юаня"}),G.jsx(Jf,{children:"匯"})]}),G.jsxs(Xf,{onClick:()=>t("about"),children:[G.jsx(Kf,{children:"🐉"}),G.jsx(Zf,{children:"О нас"}),G.jsx(Jf,{children:"德"})]}),G.jsxs(Xf,{onClick:()=>t("reviews"),children:[G.jsx(Kf,{children:"⭐"}),G.jsx(Zf,{children:"Отзывы"}),G.jsx(Jf,{children:"譽"})]})]})]})]})},tg=Mf`
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(1deg) scale(1.02); }
  50% { transform: translateY(-20px) rotate(0deg) scale(1.05); }
  75% { transform: translateY(-10px) rotate(-1deg) scale(1.02); }
`,ng=Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4);
  }
`;Mf`
  0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
`,Mf`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;const rg=Mf`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;Mf`
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(5deg); }
`;const ag=Mf`
  0%, 100% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4); }
`;Mf`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;const og=Mf`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,ig=If.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 25%, #1a1a1a 50%, #2d1b1b 75%, #1a1a1a 100%);
  background-size: 400% 400%;
  animation: ${og} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(139, 69, 19, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dragon-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 10 Q35 5 45 10 Q40 20 35 25 Q30 30 25 25 Q20 20 15 25 Q10 20 5 10 Q15 5 25 10" fill="%23FF0000" opacity="0.05"/><circle cx="25" cy="25" r="2" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dragon-pattern)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
    z-index: -1;
    animation: ${tg} 20s ease-in-out infinite;
  }
`,lg=If.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #FF0000, #FFD700, #8B4513);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: ${tg} 3s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(255, 0, 0, 0.5),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  border: 3px solid rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.7));
`,sg=If.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
`,ug=If.button`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #FFD700 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(139, 69, 19, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 
      0 12px 35px rgba(139, 69, 19, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${ng} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,cg=If.h1`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.5);
  position: relative;
  z-index: 2;
  background: linear-gradient(45deg, #FFD700, #FF0000, #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${ng} 3s ease-in-out infinite;
`,dg=If.form`
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(255, 215, 0, 0.1) 50%, rgba(139, 69, 19, 0.1) 100%);
  border-radius: 25px;
  padding: 35px;
  backdrop-filter: blur(15px);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${rg} 0.6s ease-out;
  position: relative;
  z-index: 2;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FF0000, #FFD700, #8B4513, #FF0000);
    border-radius: 27px;
    z-index: -1;
    opacity: 0.7;
    animation: ${ng} 3s ease-in-out infinite;
  }
  
  &:hover::before {
    opacity: 1;
  }
`,pg=If.div`
  margin-bottom: 25px;
  animation: ${rg} 0.8s ease-out;
`,fg=If.label`
  display: block;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  color: #FFFFFF;
  margin-bottom: 8px;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`,gg=If.input`
  width: 100%;
  padding: 15px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`,hg=If.select`
  width: 100%;
  padding: 15px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #1a1a1a;
    color: #FFFFFF;
  }
`,mg=If.div`
  color: #FF6B6B;
  font-size: 0.9rem;
  margin-top: 5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`,bg=If.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`,xg=If.button`
  flex: 1;
  padding: 15px 25px;
  border: none;
  border-radius: 15px;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
  pointer-events: auto;
  
  ${e=>"primary"===e.variant?Lf`
      background: linear-gradient(135deg, #FF0000 0%, #C8102E 100%);
      color: #FFFFFF;
      box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
      animation: ${ag} 2s ease-in-out infinite;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5);
      }
    `:Lf`
      background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
      color: #FFFFFF;
      box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(139, 69, 19, 0.5);
      }
    `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`,vg=If.div`
  margin-bottom: 25px;
  text-align: center;
`,yg=If.button`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.5);
  }
`,wg=If.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`,kg=({onNavigate:e})=>{console.log("OrderForm component rendered");const[t,n]=O.useState({productLink:"",productCategory:"",productSize:"",fullName:"",phoneNumber:"",pickupPoint:"",pickupPointAddress:""}),[r,a]=O.useState({}),[o,i]=O.useState(!1),l=e=>{const{name:t,value:o}=e.target;n(e=>({...e,[t]:o})),r[t]&&a(e=>({...e,[t]:""}))};return G.jsxs(ig,{children:[G.jsx(lg,{children:"🐉"}),G.jsxs(sg,{children:[G.jsx(ug,{onClick:()=>e("main"),children:"←"}),G.jsx(cg,{children:"🏮 Оформление заказа"})]}),G.jsxs(dg,{onSubmit:async n=>{var r,o,l,s,u,c,d,p,f,g,h,m,b,x,v,y,w;if(n.preventDefault(),(()=>{const e={};return t.productLink?t.productLink.includes("poizon.com")||t.productLink.includes("dewu.com")||(e.productLink="Ссылка должна быть с сайта Poizon или Dewu"):e.productLink="Введите ссылку на товар",t.productCategory||(e.productCategory="Выберите категорию товара"),t.productSize||(e.productSize="Введите размер товара"),t.fullName||(e.fullName="Введите ФИО получателя"),t.phoneNumber?/^\+?[1-9]\d{1,14}$/.test(t.phoneNumber.replace(/\s/g,""))||(e.phoneNumber="Введите корректный номер телефона"):e.phoneNumber="Введите номер телефона",t.pickupPoint||(e.pickupPoint="Выберите пункт выдачи"),t.pickupPointAddress||(e.pickupPointAddress="Введите адрес пункта выдачи"),a(e),0===Object.keys(e).length})()){i(!0);try{const n=null==(l=null==(o=null==(r=window.Telegram)?void 0:r.WebApp)?void 0:o.initDataUnsafe)?void 0:l.user;try{const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({telegramId:(null==n?void 0:n.id)||0,username:(null==n?void 0:n.username)||"",productLink:t.productLink,productSize:t.productSize,fullName:t.fullName,phoneNumber:t.phoneNumber,pickupPoint:t.pickupPoint,pickupPointAddress:t.pickupPointAddress})});if(r.ok){await r.json();return(null==(u=null==(s=window.Telegram)?void 0:s.WebApp)?void 0:u.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"),(null==(d=null==(c=window.Telegram)?void 0:c.WebApp)?void 0:d.showAlert)&&window.Telegram.WebApp.showAlert("Заказ успешно оформлен! Скоро с вами свяжется менеджер."),void e("main")}}catch(k){console.log("API недоступен, отправляем через Telegram")}const a=`🛍️ Новый заказ от пользователя:\n\n👤 Пользователь: @${(null==n?void 0:n.username)||"неизвестно"} (ID: ${(null==n?void 0:n.id)||"неизвестно"})\n🔗 Ссылка на товар: ${t.productLink}\n📏 Размер: ${t.productSize}\n👤 ФИО получателя: ${t.fullName}\n📞 Телефон: ${t.phoneNumber}\n📍 Пункт выдачи: ${t.pickupPoint}\n🏠 Адрес: ${t.pickupPointAddress}\n\n⏰ Время: ${(new Date).toLocaleString("ru-RU")}`;(null==(f=null==(p=window.Telegram)?void 0:p.WebApp)?void 0:f.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink(`https://t.me/poizonic_manager?text=${encodeURIComponent(a)}`),(null==(h=null==(g=window.Telegram)?void 0:g.WebApp)?void 0:h.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"),(null==(b=null==(m=window.Telegram)?void 0:m.WebApp)?void 0:b.showAlert)&&window.Telegram.WebApp.showAlert("Заказ отправлен менеджеру! Скоро с вами свяжется менеджер для оплаты."),e("main")}catch(S){console.error("Error submitting order:",S),(null==(v=null==(x=window.Telegram)?void 0:x.WebApp)?void 0:v.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("error"),(null==(w=null==(y=window.Telegram)?void 0:y.WebApp)?void 0:w.showAlert)&&window.Telegram.WebApp.showAlert("Ошибка при оформлении заказа. Попробуйте еще раз.")}finally{i(!1)}}},children:[G.jsxs(vg,{children:[G.jsx(yg,{type:"button",onClick:()=>{var e,t;if(null==(t=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:t.openLink)window.Telegram.WebApp.openLink("/images/tutorial.MOV");else{const e=document.createElement("video");e.src="/images/tutorial.MOV",e.controls=!0,e.style.width="100%",e.style.maxWidth="500px",e.style.margin="20px auto",e.style.display="block";const t=document.createElement("div");t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.backgroundColor="rgba(0, 0, 0, 0.8)",t.style.zIndex="9999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="20px";const n=document.createElement("button");n.innerHTML="✕",n.style.position="absolute",n.style.top="20px",n.style.right="20px",n.style.background="red",n.style.color="white",n.style.border="none",n.style.borderRadius="50%",n.style.width="40px",n.style.height="40px",n.style.fontSize="20px",n.style.cursor="pointer",n.onclick=()=>{document.body.removeChild(t)},t.appendChild(e),t.appendChild(n),document.body.appendChild(t)}},children:"📹 Видео инструкция"}),G.jsx(wg,{children:"Пример: https://poizon.com/product/12345"})]}),G.jsxs(pg,{children:[G.jsx(fg,{children:"Ссылка на товар *"}),G.jsx(gg,{type:"url",name:"productLink",value:t.productLink,onChange:l,placeholder:"Вставьте ссылку на товар"}),r.productLink&&G.jsx(mg,{children:r.productLink})]}),G.jsxs(pg,{children:[G.jsx(fg,{children:"Категория товара *"}),G.jsxs(hg,{name:"productCategory",value:t.productCategory,onChange:l,children:[G.jsx("option",{value:"",children:"Выберите категорию"}),[{value:"tshirts_shorts",label:"Футболки и шорты (1.0 кг)"},{value:"hoodies_pants",label:"Толстовки и брюки (1.5 кг)"},{value:"shoes_clothing",label:"Обувь и одежда (2.0 кг)"},{value:"backpacks_bags",label:"Рюкзаки и сумки (1.0 кг)"},{value:"underwear_socks",label:"Нижнее белье и носки (0.5 кг)"},{value:"accessories_perfume",label:"Аксессуары и парфюмерия (0.5 кг)"}].map(e=>G.jsx("option",{value:e.value,children:e.label},e.value))]}),r.productCategory&&G.jsx(mg,{children:r.productCategory})]}),G.jsxs(pg,{children:[G.jsx(fg,{children:"Размер товара *"}),G.jsx(gg,{type:"text",name:"productSize",value:t.productSize,onChange:l,placeholder:"Укажите размер (например: 45, M, L, XL, 42.5, S)"}),r.productSize&&G.jsx(mg,{children:r.productSize})]}),G.jsxs(pg,{children:[G.jsx(fg,{children:"ФИО получателя *"}),G.jsx(gg,{type:"text",name:"fullName",value:t.fullName,onChange:l,placeholder:"Введите полное имя получателя"}),r.fullName&&G.jsx(mg,{children:r.fullName})]}),G.jsxs(pg,{children:[G.jsx(fg,{children:"Номер телефона *"}),G.jsx(gg,{type:"tel",name:"phoneNumber",value:t.phoneNumber,onChange:l,placeholder:"+7 (900) 123-45-67"}),r.phoneNumber&&G.jsx(mg,{children:r.phoneNumber})]}),G.jsxs(pg,{children:[G.jsx(fg,{children:"Пункт выдачи *"}),G.jsxs(hg,{name:"pickupPoint",value:t.pickupPoint,onChange:l,children:[G.jsx("option",{value:"",children:"Выберите пункт выдачи"}),[{value:"cdek",label:"СДЭК"},{value:"boxberry",label:"Боксберри"},{value:"russian_post",label:"Почта России"}].map(e=>G.jsx("option",{value:e.value,children:e.label},e.value))]}),r.pickupPoint&&G.jsx(mg,{children:r.pickupPoint})]}),G.jsxs(pg,{children:[G.jsx(fg,{children:"Адрес пункта выдачи *"}),G.jsx(gg,{type:"text",name:"pickupPointAddress",value:t.pickupPointAddress,onChange:l,placeholder:"Укажите адрес пункта выдачи заказа"}),r.pickupPointAddress&&G.jsx(mg,{children:r.pickupPointAddress})]}),G.jsxs(bg,{children:[G.jsx(xg,{type:"button",variant:"secondary",onClick:()=>e("main"),children:"← Назад"}),G.jsx(xg,{type:"submit",variant:"primary",disabled:o,children:o?"Оформляем...":"Оформить заказ"})]})]})]})},Sg=Mf`
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(1deg) scale(1.02); }
  50% { transform: translateY(-20px) rotate(0deg) scale(1.05); }
  75% { transform: translateY(-10px) rotate(-1deg) scale(1.02); }
`,Fg=Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4);
  }
`;Mf`
  0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
`,Mf`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`,Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.5);
  }
`;const Cg=Mf`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`,jg=Mf`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,zg=If.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 25%, #1a1a1a 50%, #2d1b1b 75%, #1a1a1a 100%);
  background-size: 400% 400%;
  animation: ${jg} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(139, 69, 19, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dragon-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 10 Q35 5 45 10 Q40 20 35 25 Q30 30 25 25 Q20 20 15 25 Q10 20 5 10 Q15 5 25 10" fill="%23FF0000" opacity="0.05"/><circle cx="25" cy="25" r="2" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dragon-pattern)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
    z-index: -1;
    animation: ${Sg} 20s ease-in-out infinite;
  }
`,Eg=If.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #FF0000, #FFD700, #8B4513);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: ${Sg} 3s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(255, 0, 0, 0.5),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  border: 3px solid rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.7));
`,Ng=If.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
`,_g=If.button`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #FFD700 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(139, 69, 19, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 
      0 12px 35px rgba(139, 69, 19, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${Fg} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,Tg=If.h1`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.5);
  background: linear-gradient(45deg, #FFD700, #FF0000, #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${Fg} 3s ease-in-out infinite;
`,Pg=If.div`
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(255, 215, 0, 0.1) 50%, rgba(139, 69, 19, 0.1) 100%);
  border-radius: 25px;
  padding: 35px;
  backdrop-filter: blur(15px);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FF0000, #FFD700, #8B4513, #FF0000);
    border-radius: 27px;
    z-index: -1;
    opacity: 0.7;
    animation: ${Fg} 3s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${Cg} 3s ease-in-out infinite;
  }
`,Dg=If.div`
  margin-bottom: 25px;
`,Ag=If.label`
  display: block;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  color: #FFFFFF;
  margin-bottom: 8px;
  font-weight: 600;
`,Lg=If.select`
  width: 100%;
  padding: 15px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
  
  option {
    background: #1a1a1a;
    color: #FFFFFF;
  }
`,Rg=If.input`
  width: 100%;
  padding: 15px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`,$g=If.button`
  width: 100%;
  padding: 15px 25px;
  border: none;
  border-radius: 15px;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
  
  ${e=>"primary"===e.variant?"\n      background: linear-gradient(135deg, #FF0000 0%, #C8102E 100%);\n      color: #FFFFFF;\n      box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);\n      \n      &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5);\n      }\n    ":"\n      background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);\n      color: #FFFFFF;\n      box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);\n      \n      &:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 8px 25px rgba(139, 69, 19, 0.5);\n      }\n    "}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`,Ig=If.div`
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`,Og=If.h3`
  font-family: Arial, sans-serif;
  color: #FFD700;
  margin-bottom: 15px;
  font-size: 1.2rem;
`,Mg=If.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #FFFFFF;
  font-size: 1rem;
`,Bg=If.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFD700;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 215, 0, 0.3);
`,Wg=If.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 215, 0, 0.3);
`,Ug=If.h3`
  font-family: Arial, sans-serif;
  color: #FFD700;
  margin-bottom: 15px;
  font-size: 1.2rem;
`,Qg=If.button`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  }
`,Yg=If.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 215, 0, 0.3);
  text-align: center;
`,Hg=If.p`
  color: #FFFFFF;
  margin-bottom: 15px;
  line-height: 1.5;
`,Vg=If.button`
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
  }
`,Gg=({onNavigate:e})=>{const[t,n]=O.useState(""),[r,a]=O.useState(""),[o,i]=O.useState(null),[l,s]=O.useState(!1),u=[{value:"tshirts_shorts",label:"Футболки и шорты",weight:1},{value:"hoodies_pants",label:"Толстовки и брюки",weight:1.5},{value:"shoes_clothing",label:"Обувь и одежда",weight:2},{value:"backpacks_bags",label:"Рюкзаки и сумки",weight:1},{value:"underwear_socks",label:"Нижнее белье и носки",weight:.5},{value:"accessories_perfume",label:"Аксессуары и парфюмерия",weight:.5}],c=e=>{var t,n;(null==(n=null==(t=window.Telegram)?void 0:t.WebApp)?void 0:n.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager")};return G.jsxs(zg,{children:[G.jsx(Eg,{children:"🐉"}),G.jsxs(Ng,{children:[G.jsx(_g,{onClick:()=>e("main"),children:"←"}),G.jsx(Tg,{children:"💰 Расчет стоимости"})]}),G.jsxs(Pg,{children:[G.jsxs(Dg,{children:[G.jsx(Ag,{children:"Категория товара"}),G.jsxs(Lg,{value:t,onChange:e=>n(e.target.value),children:[G.jsx("option",{value:"",children:"Выберите категорию"}),u.map(e=>G.jsxs("option",{value:e.value,children:[e.label," (",e.weight," кг)"]},e.value))]})]}),G.jsxs(Dg,{children:[G.jsx(Ag,{children:"Сумма в юанях"}),G.jsx(Rg,{type:"number",value:r,onChange:e=>a(e.target.value),placeholder:"Введите сумму в юанях",min:"0",step:"0.01"})]}),G.jsx($g,{variant:"primary",onClick:async()=>{var e,n,a,o,l,c,d,p,f,g,h;if(t&&r){s(!0);try{const e=u.find(e=>e.value===t),n=null==(l=null==(o=null==(a=window.Telegram)?void 0:a.WebApp)?void 0:o.initDataUnsafe)?void 0:l.user,s=await fetch("/api/calculate-price",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({yuanAmount:parseFloat(r),itemWeight:(null==e?void 0:e.weight)||.5,telegramId:(null==n?void 0:n.id)||0})}),p=await s.json();if(!s.ok)throw new Error(p.error||"Ошибка при расчете стоимости");i(p),(null==(d=null==(c=window.Telegram)?void 0:c.WebApp)?void 0:d.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")}catch(m){console.error("Error calculating price:",m),(null==(f=null==(p=window.Telegram)?void 0:p.WebApp)?void 0:f.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("error"),(null==(h=null==(g=window.Telegram)?void 0:g.WebApp)?void 0:h.showAlert)&&window.Telegram.WebApp.showAlert("Ошибка при расчете стоимости. Попробуйте еще раз.")}finally{s(!1)}}else(null==(n=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:n.showAlert)&&window.Telegram.WebApp.showAlert("Пожалуйста, выберите категорию и введите сумму в юанях")},disabled:l,children:l?"Рассчитываем...":"Рассчитать стоимость"}),o&&G.jsxs(Ig,{children:[G.jsx(Og,{children:"Результат расчета"}),G.jsxs(Mg,{children:[G.jsx("span",{children:"Стоимость товара:"}),G.jsxs("span",{children:[o.itemCostRub," ₽"]})]}),G.jsxs(Mg,{children:[G.jsx("span",{children:"Доставка:"}),G.jsxs("span",{children:[o.deliveryCost," ₽"]})]}),G.jsxs(Mg,{children:[G.jsxs("span",{children:["Комиссия (",(100*o.commission).toFixed(1),"%):"]}),G.jsxs("span",{children:[(o.itemCostRub*o.commission).toFixed(2)," ₽"]})]}),G.jsxs(Mg,{children:[G.jsx("span",{children:"Курс юаня:"}),G.jsxs("span",{children:[o.exchangeRate," ₽"]})]}),G.jsxs(Bg,{children:["Итого: ",o.totalCost," ₽"]})]}),G.jsxs(Wg,{children:[G.jsx(Ug,{children:"❓ Специальные случаи:"}),G.jsx(Qg,{onClick:()=>c(),children:"У меня товар со знаком ≈"}),G.jsx(Qg,{onClick:()=>c(),children:"Здесь нет моей категории"})]}),G.jsxs(Yg,{children:[G.jsxs(Hg,{children:["❓ Нужна помощь с расчетом?",G.jsx("br",{}),"Если у вас есть товар с примерной ценой или нужна консультация, свяжитесь с нашим менеджером для точного расчета"]}),G.jsx(Vg,{onClick:()=>{var e,t;(null==(t=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:t.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager")},children:"📞 Связаться с менеджером"})]})]})]})},qg=Mf`
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(1deg) scale(1.02); }
  50% { transform: translateY(-20px) rotate(0deg) scale(1.05); }
  75% { transform: translateY(-10px) rotate(-1deg) scale(1.02); }
`,Xg=Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4);
  }
`,Kg=Mf`
  0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
`,Zg=Mf`
  0%, 100% { 
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 0, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.7), 0 0 50px rgba(255, 0, 0, 0.4);
  }
`,Jg=Mf`
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`,eh=Mf`
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(5deg) scale(1.05); }
`;Mf`
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
`,Mf`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;const th=Mf`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,nh=If.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 25%, #1a1a1a 50%, #2d1b1b 75%, #1a1a1a 100%);
  background-size: 400% 400%;
  animation: ${th} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(139, 69, 19, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dragon-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 10 Q35 5 45 10 Q40 20 35 25 Q30 30 25 25 Q20 20 15 25 Q10 20 5 10 Q15 5 25 10" fill="%23FF0000" opacity="0.05"/><circle cx="25" cy="25" r="2" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dragon-pattern)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
    z-index: -1;
    animation: ${qg} 20s ease-in-out infinite;
  }
`,rh=If.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #FF0000, #FFD700, #8B4513);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: ${qg} 3s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(255, 0, 0, 0.5),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  border: 3px solid rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.7));
`,ah=If.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
`,oh=If.button`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #FFD700 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(139, 69, 19, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 
      0 12px 35px rgba(139, 69, 19, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${Xg} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,ih=If.h1`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.5);
  background: linear-gradient(45deg, #FFD700, #FF0000, #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${Xg} 3s ease-in-out infinite;
`,lh=If.div`
  max-width: 600px;
  margin: 0 auto;
`,sh=If.div`
  background: linear-gradient(135deg, 
    rgba(139, 69, 19, 0.95) 0%, 
    rgba(160, 82, 45, 0.95) 50%, 
    rgba(255, 215, 0, 0.1) 100%);
  border-radius: 20px;
  margin-bottom: 25px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 215, 0, 0.3);
  background-clip: padding-box;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 15px 40px rgba(255, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(255, 0, 0, 0.1) 0%, 
      transparent 50%, 
      rgba(255, 215, 0, 0.1) 100%);
    border-radius: 20px;
    animation: ${Xg} 4s ease-in-out infinite;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s;
  }
  
  &:hover::after {
    left: 100%;
  }
`,uh=If.button`
  width: 100%;
  padding: 25px;
  background: linear-gradient(135deg, 
    rgba(139, 69, 19, 0.9) 0%, 
    rgba(160, 82, 45, 0.9) 100%);
  border: none;
  color: #FFD700;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(160, 82, 45, 0.95) 0%, 
      rgba(139, 69, 19, 0.95) 100%);
    animation: ${Zg} 2s ease-in-out infinite;
  }
`,ch=If.span`
  flex: 1;
  margin-right: 15px;
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  text-shadow: 
    1px 1px 2px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(255, 215, 0, 0.3);
  line-height: 1.4;
  animation: ${Kg} 3s ease-in-out infinite;
`,dh=If.span`
  font-size: 1.8rem;
  color: #FFD700;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${e=>e.$isOpen?"rotate(180deg) scale(1.2)":"rotate(0deg) scale(1)"};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
  animation: ${e=>e.$isOpen?eh:"none"} 2s ease-in-out infinite;
`,ph=If.div`
  max-height: ${e=>e.$isOpen?"300px":"0"};
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, 
    rgba(160, 82, 45, 0.95) 0%, 
    rgba(139, 69, 19, 0.95) 100%);
  position: relative;
  z-index: 1;
  
  ${e=>e.$isOpen&&Lf`
    animation: ${Jg} 0.6s ease-out;
  `}
`,fh=If.div`
  padding: 25px;
  color: #FFD700;
  line-height: 1.7;
  font-family: 'Roboto', Arial, sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  animation: ${Kg} 3s ease-in-out infinite;
`,gh=If.div`
  background: linear-gradient(135deg, 
    rgba(139, 69, 19, 0.95) 0%, 
    rgba(160, 82, 45, 0.95) 50%, 
    rgba(255, 215, 0, 0.1) 100%);
  border-radius: 25px;
  padding: 30px;
  margin-top: 30px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 215, 0, 0.3);
  background-clip: padding-box;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 20px 50px rgba(255, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(255, 0, 0, 0.1) 0%, 
      transparent 50%, 
      rgba(255, 215, 0, 0.1) 100%);
    border-radius: 25px;
    animation: ${Xg} 4s ease-in-out infinite;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.8s;
  }
  
  &:hover::after {
    left: 100%;
  }
`,hh=If.h3`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  color: #FFD700;
  margin-bottom: 20px;
  font-size: 1.4rem;
  font-weight: 700;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 15px rgba(255, 215, 0, 0.5);
  animation: ${Kg} 3s ease-in-out infinite;
`,mh=If.p`
  color: #FFD700;
  line-height: 1.7;
  margin-bottom: 25px;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  animation: ${Kg} 3s ease-in-out infinite;
`,bh=If.button`
  background: linear-gradient(135deg, #FF0000 0%, #8B4513 50%, #FFD700 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  padding: 18px 35px;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 
    0 8px 25px rgba(255, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 15px 35px rgba(255, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${Xg} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,xh=({onNavigate:e})=>{const[t,n]=O.useState([]);return G.jsxs(nh,{children:[G.jsx(rh,{children:"🐉"}),G.jsxs(ah,{children:[G.jsx(oh,{onClick:()=>e("main"),children:"←"}),G.jsx(ih,{children:"🏮 FAQ"})]}),G.jsxs(lh,{children:[[{question:"Как сделать заказ?",answer:"1. Найдите товар на Poizon или Dewu\n2. Скопируйте ссылку на товар\n3. Выберите категорию и размер\n4. Заполните данные получателя\n5. Выберите пункт выдачи\n6. Нажмите 'Оформить заказ'\n7. Дождитесь связи с менеджером для оплаты"},{question:"Сколько стоит доставка?",answer:"Стоимость доставки рассчитывается по весу товара: 800 рублей за 1 кг. Например, футболка (0.3 кг) = 240 рублей, обувь (1 кг) = 800 рублей."},{question:"Какова комиссия сервиса?",answer:"Базовая комиссия составляет 5% от стоимости товара в рублях. При переходе по реферальной ссылке комиссия снижается до 4% на 7 дней."},{question:"Сколько времени занимает доставка?",answer:"Средний срок доставки составляет 15-25 дней. Это включает время на заказ товара, проверку качества, упаковку и доставку до пункта выдачи."},{question:"Как проверить подлинность товара?",answer:"Все товары проходят строгую проверку на подлинность. Мы работаем только с официальными поставщиками и проверяем каждый товар перед отправкой."},{question:"Что делать, если товар не подошел?",answer:"К сожалению, возврат товаров невозможен, так как мы работаем с китайскими поставщиками. Рекомендуем внимательно выбирать размер и изучать описание товара перед заказом."},{question:"Как оплатить заказ?",answer:"После оформления заказа с вами свяжется менеджер для уточнения деталей и предоставления реквизитов для оплаты. Оплата производится в рублях."},{question:"Что означает символ ≈ на товаре?",answer:"Символ ≈ означает примерную цену товара. В этом случае точная стоимость будет рассчитана после получения товара на складе. Свяжитесь с менеджером для уточнения."},{question:"Как работает реферальная программа?",answer:"Приглашайте друзей по своей реферальной ссылке. Когда друг сделает первый заказ, вы оба получите скидку на комиссию (4% вместо 5%) на 7 дней."},{question:"Можно ли заказать товар, которого нет в категориях?",answer:"Да, если вы не нашли подходящую категорию, свяжитесь с менеджером. Мы поможем рассчитать стоимость и оформить заказ для любого товара с Poizon или Dewu."}].map((e,r)=>G.jsxs(sh,{children:[G.jsxs(uh,{onClick:()=>(e=>{n(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(r),children:[G.jsx(ch,{children:e.question}),G.jsx(dh,{$isOpen:t.includes(r),children:"▼"})]}),G.jsx(ph,{$isOpen:t.includes(r),children:G.jsx(fh,{children:e.answer.split("\n").map((t,n)=>G.jsx("div",{style:{marginBottom:n<e.answer.split("\n").length-1?"8px":"0"},children:t},n))})})]},r)),G.jsxs(gh,{children:[G.jsx(hh,{children:"🏮 Не нашли ответ на свой вопрос?"}),G.jsx(mh,{children:"Если у вас остались вопросы, свяжитесь с нашим менеджером. Мы всегда готовы помочь!"}),G.jsx(bh,{onClick:()=>{var e,t;(null==(t=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:t.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager")},children:"🐉 Связаться с менеджером"})]})]})]})},vh=Mf`
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(1deg) scale(1.02); }
  50% { transform: translateY(-20px) rotate(0deg) scale(1.05); }
  75% { transform: translateY(-10px) rotate(-1deg) scale(1.02); }
`,yh=Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4);
  }
`,wh=Mf`
  0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
`;Mf`
  0%, 100% { 
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 0, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.7), 0 0 50px rgba(255, 0, 0, 0.4);
  }
`,Mf`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;const kh=Mf`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,Sh=If.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 25%, #1a1a1a 50%, #2d1b1b 75%, #1a1a1a 100%);
  background-size: 400% 400%;
  animation: ${kh} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(139, 69, 19, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dragon-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 10 Q35 5 45 10 Q40 20 35 25 Q30 30 25 25 Q20 20 15 25 Q10 20 5 10 Q15 5 25 10" fill="%23FF0000" opacity="0.05"/><circle cx="25" cy="25" r="2" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dragon-pattern)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
    z-index: -1;
    animation: ${vh} 20s ease-in-out infinite;
  }
`,Fh=If.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #FF0000, #FFD700, #8B4513);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: ${vh} 3s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(255, 0, 0, 0.5),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  border: 3px solid rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.7));
`,Ch=If.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
`,jh=If.button`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #FFD700 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(139, 69, 19, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 
      0 12px 35px rgba(139, 69, 19, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${yh} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,zh=If.h1`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.5);
  background: linear-gradient(45deg, #FFD700, #FF0000, #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${yh} 3s ease-in-out infinite;
`,Eh=If.div`
  max-width: 600px;
  margin: 0 auto;
`,Nh=If.div`
  background: linear-gradient(135deg, 
    rgba(139, 69, 19, 0.95) 0%, 
    rgba(160, 82, 45, 0.95) 50%, 
    rgba(255, 215, 0, 0.1) 100%);
  border-radius: 25px;
  padding: 30px;
  margin-bottom: 25px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 215, 0, 0.3);
  background-clip: padding-box;
  box-shadow: 
    0 10px 35px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 15px 45px rgba(255, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(255, 0, 0, 0.1) 0%, 
      transparent 50%, 
      rgba(255, 215, 0, 0.1) 100%);
    border-radius: 25px;
    animation: ${yh} 4s ease-in-out infinite;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.8s;
  }
  
  &:hover::after {
    left: 100%;
  }
`,_h=If.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`,Th=If.div`
  background: linear-gradient(135deg, #FF0000 0%, #8B4513 50%, #FFD700 100%);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.4rem;
  margin-right: 20px;
  flex-shrink: 0;
  box-shadow: 
    0 8px 25px rgba(255, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 215, 0, 0.3);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  animation: ${wh} 3s ease-in-out infinite;
`,Ph=If.h3`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  color: #FFD700;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 
    1px 1px 2px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(255, 215, 0, 0.3);
  animation: ${wh} 3s ease-in-out infinite;
`,Dh=If.p`
  color: #FFD700;
  line-height: 1.7;
  margin-bottom: 20px;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  animation: ${wh} 3s ease-in-out infinite;
`,Ah=If.ul`
  color: #FFD700;
  line-height: 1.7;
  padding-left: 25px;
  margin-bottom: 20px;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`,Lh=If.li`
  margin-bottom: 10px;
  animation: ${wh} 3s ease-in-out infinite;
`,Rh=If.div`
  margin-top: 25px;
  position: relative;
  z-index: 2;
`,$h=If.h4`
  color: #FFD700;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  font-weight: 700;
  text-shadow: 
    1px 1px 2px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(255, 215, 0, 0.3);
  animation: ${wh} 3s ease-in-out infinite;
`,Ih=If.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`,Oh=If.button`
  flex: 1;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 50%, #2E7D32 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  padding: 15px 20px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 
    0 8px 25px rgba(76, 175, 80, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 15px 35px rgba(76, 175, 80, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${yh} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,Mh=If.button`
  width: 100%;
  background: linear-gradient(135deg, #FF0000 0%, #8B4513 50%, #FFD700 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  padding: 18px 30px;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 25px;
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 
    0 8px 25px rgba(255, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 15px 35px rgba(255, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${yh} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,Bh=If.div`
  margin-top: 25px;
  text-align: center;
  position: relative;
  z-index: 2;
`,Wh=If.button`
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 50%, #0D47A1 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  padding: 15px 25px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 
    0 8px 25px rgba(33, 150, 243, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 15px 35px rgba(33, 150, 243, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${yh} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,Uh=({onNavigate:e})=>{const t=e=>{"android"===e?window.open("https://www.dewu.com/","_blank"):window.open("https://apps.apple.com/ru/app/得物-得到美好事物/id1012871328","_blank")};return G.jsxs(Sh,{children:[G.jsx(Fh,{children:"🐉"}),G.jsxs(Ch,{children:[G.jsx(jh,{onClick:()=>e("main"),children:"←"}),G.jsx(zh,{children:"🏮 Полная инструкция заказа"})]}),G.jsxs(Eh,{children:[G.jsxs(Nh,{children:[G.jsxs(_h,{children:[G.jsx(Th,{children:"1"}),G.jsx(Ph,{children:"Скачайте приложение Poizon"})]}),G.jsx(Dh,{children:"Для поиска и выбора товаров вам понадобится приложение Poizon:"}),G.jsxs(Rh,{children:[G.jsx($h,{children:"Скачать приложение:"}),G.jsxs(Ih,{children:[G.jsx(Oh,{onClick:()=>t("android"),children:"📱 Android"}),G.jsx(Oh,{onClick:()=>t("ios"),children:"🍎 iOS"})]})]})]}),G.jsxs(Nh,{children:[G.jsxs(_h,{children:[G.jsx(Th,{children:"2"}),G.jsx(Ph,{children:"Найдите нужный товар"})]}),G.jsx(Dh,{children:"В приложении Poizon найдите интересующий вас товар:"}),G.jsxs(Ah,{children:[G.jsx(Lh,{children:"Используйте поиск по названию бренда или модели"}),G.jsx(Lh,{children:"Выберите нужный размер и цвет"}),G.jsx(Lh,{children:"Проверьте наличие товара"}),G.jsx(Lh,{children:"Скопируйте ссылку на товар"})]})]}),G.jsxs(Nh,{children:[G.jsxs(_h,{children:[G.jsx(Th,{children:"3"}),G.jsx(Ph,{children:"Рассчитайте стоимость"})]}),G.jsx(Dh,{children:"Используйте наш калькулятор для предварительного расчета:"}),G.jsxs(Ah,{children:[G.jsx(Lh,{children:"Выберите категорию товара"}),G.jsx(Lh,{children:"Введите цену в юанях"}),G.jsx(Lh,{children:"Получите итоговую стоимость в рублях"})]})]}),G.jsxs(Nh,{children:[G.jsxs(_h,{children:[G.jsx(Th,{children:"4"}),G.jsx(Ph,{children:"Оформите заказ"})]}),G.jsx(Dh,{children:"Заполните форму заказа с указанием всех необходимых данных:"}),G.jsxs(Ah,{children:[G.jsx(Lh,{children:"Вставьте ссылку на товар"}),G.jsx(Lh,{children:"Выберите категорию и размер"}),G.jsx(Lh,{children:"Укажите данные получателя"}),G.jsx(Lh,{children:"Выберите пункт выдачи"})]}),G.jsx(Mh,{onClick:()=>{e("order")},children:"🏮 Сделать заказ"})]}),G.jsxs(Nh,{children:[G.jsxs(_h,{children:[G.jsx(Th,{children:"5"}),G.jsx(Ph,{children:"Оплата и доставка"})]}),G.jsx(Dh,{children:"После оформления заказа:"}),G.jsxs(Ah,{children:[G.jsx(Lh,{children:"С вами свяжется менеджер для уточнения деталей"}),G.jsx(Lh,{children:"Вы получите реквизиты для оплаты"}),G.jsx(Lh,{children:"После оплаты товар будет заказан"}),G.jsx(Lh,{children:"Вы получите уведомление о готовности к отправке"}),G.jsx(Lh,{children:"Товар будет доставлен в выбранный пункт выдачи"})]})]}),G.jsxs(Nh,{children:[G.jsxs(_h,{children:[G.jsx(Th,{children:"6"}),G.jsx(Ph,{children:"Видео-инструкция"})]}),G.jsx(Dh,{children:"Если у вас остались вопросы, посмотрите нашу видео-инструкцию:"}),G.jsx(Bh,{children:G.jsx(Wh,{onClick:()=>{var e,t;if(null==(t=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:t.openTelegramLink)window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager");else{const e=document.createElement("video");e.src="/images/tutorial.MOV",e.controls=!0,e.style.width="100%",e.style.maxWidth="500px",e.style.margin="20px auto",e.style.display="block";const t=document.createElement("div");t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.backgroundColor="rgba(0, 0, 0, 0.8)",t.style.zIndex="9999",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.padding="20px";const n=document.createElement("button");n.innerHTML="✕",n.style.position="absolute",n.style.top="20px",n.style.right="20px",n.style.background="red",n.style.color="white",n.style.border="none",n.style.borderRadius="50%",n.style.width="40px",n.style.height="40px",n.style.fontSize="20px",n.style.cursor="pointer",n.onclick=()=>{document.body.removeChild(t)},t.appendChild(e),t.appendChild(n),document.body.appendChild(t)}},children:"🐉 Смотреть видео-инструкцию"})})]})]})]})},Qh=Mf`
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(1deg) scale(1.02); }
  50% { transform: translateY(-20px) rotate(0deg) scale(1.05); }
  75% { transform: translateY(-10px) rotate(-1deg) scale(1.02); }
`,Yh=Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4);
  }
`,Hh=Mf`
  0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
`;Mf`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;const Vh=Mf`
  0%, 100% { 
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 0, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.7), 0 0 50px rgba(255, 0, 0, 0.4);
  }
`,Gh=Mf`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`,qh=Mf`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,Xh=If.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 25%, #1a1a1a 50%, #2d1b1b 75%, #1a1a1a 100%);
  background-size: 400% 400%;
  animation: ${qh} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(139, 69, 19, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dragon-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 10 Q35 5 45 10 Q40 20 35 25 Q30 30 25 25 Q20 20 15 25 Q10 20 5 10 Q15 5 25 10" fill="%23FF0000" opacity="0.05"/><circle cx="25" cy="25" r="2" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dragon-pattern)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
    z-index: -1;
    animation: ${Qh} 20s ease-in-out infinite;
  }
`,Kh=If.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #FF0000, #FFD700, #8B4513);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: ${Qh} 3s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(255, 0, 0, 0.5),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  border: 3px solid rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.7));
`,Zh=If.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
`,Jh=If.button`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #FFD700 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(139, 69, 19, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 
      0 12px 35px rgba(139, 69, 19, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${Yh} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,em=If.h1`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.5);
  background: linear-gradient(45deg, #FFD700, #FF0000, #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${Yh} 3s ease-in-out infinite;
`,tm=If.div`
  max-width: 600px;
  margin: 0 auto;
`,nm=If.div`
  background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(255, 215, 0, 0.1) 50%, rgba(139, 69, 19, 0.1) 100%);
  border-radius: 25px;
  padding: 30px;
  margin-bottom: 25px;
  backdrop-filter: blur(15px);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FF0000, #FFD700, #8B4513, #FF0000);
    border-radius: 27px;
    z-index: -1;
    opacity: 0.7;
    animation: ${Yh} 3s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${Gh} 3s ease-in-out infinite;
  }
`,rm=If.h2`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  color: #FFD700;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 
    1px 1px 2px rgba(0, 0, 0, 0.5),
    0 0 15px rgba(255, 215, 0, 0.3);
  animation: ${Hh} 4s ease-in-out infinite;
  display: flex;
  align-items: center;
  gap: 10px;
`,am=If.div`
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 0, 0, 0.1) 100%);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 8px 25px rgba(255, 215, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 0, 0, 0.2) 100%);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 15px 35px rgba(255, 215, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    animation: ${Vh} 2s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,om=If.div`
  font-family: monospace;
  color: #FFFFFF;
  font-size: 0.9rem;
  word-break: break-all;
  margin-bottom: 15px;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 8px;
`,im=If.button`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  }
`,lm=If.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
`,sm=If.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
`,um=If.div`
  font-size: 2rem;
  font-weight: bold;
  color: #FFD700;
  margin-bottom: 5px;
`,cm=If.div`
  color: #FFFFFF;
  font-size: 0.9rem;
`,dm=If.div`
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
`,pm=If.div`
  color: #4CAF50;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
`,fm=If.div`
  color: #FFFFFF;
  font-size: 0.9rem;
`,gm=If.div`
  color: #FFFFFF;
  line-height: 1.6;
  margin-bottom: 20px;
`,hm=If.div`
  margin-top: 20px;
`,mm=If.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  color: #FFFFFF;
`,bm=If.div`
  background: linear-gradient(135deg, #FF0000 0%, #C8102E 100%);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
`,xm=If.div`
  flex: 1;
  line-height: 1.5;
`,vm=({onNavigate:e})=>{const[t,n]=O.useState(null),[r,a]=O.useState(!0);O.useEffect(()=>{o()},[]);const o=async()=>{var e,t,r;try{const a=null==(r=null==(t=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:t.initDataUnsafe)?void 0:r.user;if(null==a?void 0:a.id){const e=await fetch(`/api/user/${a.id}`),t=await e.json();e.ok?n(t):n({telegramId:a.id,commission:.05,hasDiscount:!1,discountExpiresAt:null,referralUrl:`https://t.me/poizonic_bot?start=ref_${a.id}`,referralClicks:0})}else n({telegramId:0,commission:.05,hasDiscount:!1,discountExpiresAt:null,referralUrl:"https://t.me/poizonic_bot",referralClicks:0})}catch(o){console.error("Error loading referral data:",o),n({telegramId:0,commission:.05,hasDiscount:!1,discountExpiresAt:null,referralUrl:"https://t.me/poizonic_bot",referralClicks:0})}finally{a(!1)}};return r?G.jsxs(Xh,{children:[G.jsx(Kh,{children:"🐉"}),G.jsxs(Zh,{children:[G.jsx(Jh,{onClick:()=>e("main"),children:"←"}),G.jsx(em,{children:"🔗 Реферальная система"})]}),G.jsx(tm,{children:G.jsx(nm,{children:G.jsx("div",{style:{textAlign:"center",color:"#FFFFFF"},children:"Загрузка..."})})})]}):G.jsxs(Xh,{children:[G.jsx(Kh,{children:"🐉"}),G.jsxs(Zh,{children:[G.jsx(Jh,{onClick:()=>e("main"),children:"←"}),G.jsx(em,{children:"🔗 Реферальная система"})]}),G.jsxs(tm,{children:[G.jsxs(nm,{children:[G.jsx(rm,{children:"🔗 Ваша реферальная ссылка"}),G.jsxs(am,{children:[G.jsx(om,{children:(null==t?void 0:t.referralUrl)||"https://t.me/poizonic_bot"}),G.jsx(im,{onClick:async()=>{var e,n,r,a,o,i;if(null==t?void 0:t.referralUrl)try{await navigator.clipboard.writeText(t.referralUrl),(null==(n=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:n.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"),(null==(a=null==(r=window.Telegram)?void 0:r.WebApp)?void 0:a.showAlert)&&window.Telegram.WebApp.showAlert("Реферальная ссылка скопирована!")}catch(l){console.error("Error copying link:",l),(null==(i=null==(o=window.Telegram)?void 0:o.WebApp)?void 0:i.showAlert)&&window.Telegram.WebApp.showAlert("Не удалось скопировать ссылку")}},children:"📋 Скопировать ссылку"})]})]}),G.jsxs(nm,{children:[G.jsx(rm,{children:"📊 Ваша статистика"}),G.jsxs(lm,{children:[G.jsxs(sm,{children:[G.jsxs(um,{children:[(100*(null==t?void 0:t.commission)).toFixed(1),"%"]}),G.jsx(cm,{children:"Текущая комиссия"})]}),G.jsxs(sm,{children:[G.jsx(um,{children:(null==t?void 0:t.referralClicks)||0}),G.jsx(cm,{children:"Приглашенных друзей"})]})]}),(null==t?void 0:t.hasDiscount)&&G.jsxs(dm,{children:[G.jsx(pm,{children:"🎉 У вас действует скидка! Комиссия снижена до 4%"}),t.discountExpiresAt&&G.jsx(fm,{children:(e=>{if(!e)return null;const t=new Date,n=new Date(e).getTime()-t.getTime();if(n<=0)return"Скидка истекла";const r=Math.floor(n/864e5),a=Math.floor(n%864e5/36e5);return r>0?`Осталось: ${r} дн. ${a} ч.`:`Осталось: ${a} ч.`})(t.discountExpiresAt)})]})]}),G.jsxs(nm,{children:[G.jsx(rm,{children:"💰 Как это работает"}),G.jsx(gm,{children:"Приглашайте друзей и получайте скидки на комиссию! Каждый приглашенный друг снижает вашу комиссию с 5% до 4% на неделю."}),G.jsxs(hm,{children:[G.jsxs(mm,{children:[G.jsx(bm,{children:"1"}),G.jsx(xm,{children:"Поделитесь своей реферальной ссылкой с друзьями"})]}),G.jsxs(mm,{children:[G.jsx(bm,{children:"2"}),G.jsx(xm,{children:"Друг переходит по ссылке и делает первый заказ"})]}),G.jsxs(mm,{children:[G.jsx(bm,{children:"3"}),G.jsx(xm,{children:"Вы получаете скидку на комиссию на 7 дней"})]}),G.jsxs(mm,{children:[G.jsx(bm,{children:"4"}),G.jsx(xm,{children:"Ваш друг тоже получает скидку на первую неделю"})]})]})]})]})]})},ym=Mf`
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(1deg) scale(1.02); }
  50% { transform: translateY(-20px) rotate(0deg) scale(1.05); }
  75% { transform: translateY(-10px) rotate(-1deg) scale(1.02); }
`,wm=Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4);
  }
`;Mf`
  0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
`;const km=Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.5);
  }
`,Sm=Mf`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;Mf`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;const Fm=Mf`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,Cm=If.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 25%, #1a1a1a 50%, #2d1b1b 75%, #1a1a1a 100%);
  background-size: 400% 400%;
  animation: ${Fm} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(139, 69, 19, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dragon-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 10 Q35 5 45 10 Q40 20 35 25 Q30 30 25 25 Q20 20 15 25 Q10 20 5 10 Q15 5 25 10" fill="%23FF0000" opacity="0.05"/><circle cx="25" cy="25" r="2" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dragon-pattern)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
    z-index: -1;
    animation: ${ym} 20s ease-in-out infinite;
  }
`,jm=If.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #FF0000, #FFD700, #8B4513);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: ${ym} 3s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(255, 0, 0, 0.5),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  border: 3px solid rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.7));
`,zm=If.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
`,Em=If.button`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #FFD700 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(139, 69, 19, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 
      0 12px 35px rgba(139, 69, 19, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${wm} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,Nm=If.h1`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.5);
  background: linear-gradient(45deg, #FFD700, #FF0000, #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${wm} 3s ease-in-out infinite;
  position: relative;
  z-index: 2;
`,_m=If.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`,Tm=If.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  text-align: center;
  margin-bottom: 20px;
  animation: ${km} 3s ease-in-out infinite;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.05) 50%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`,Pm=If.h2`
  font-family: Arial, sans-serif;
  color: #FFD700;
  margin-bottom: 20px;
  font-size: 1.3rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`,Dm=If.div`
  font-size: 3rem;
  font-weight: bold;
  color: #FFD700;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`,Am=If.div`
  color: #FFFFFF;
  font-size: 1rem;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`,Lm=If.button`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.5);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`,Rm=If.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #FFFFFF;
  animation: ${Sm} 1s ease-in-out infinite;
  margin-right: 10px;
`,$m=If.div`
  color: #FF6B6B;
  font-size: 1rem;
  margin-top: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`,Im=If.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-top: 15px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`,Om=If.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.05) 50%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`,Mm=If.h3`
  font-family: Arial, sans-serif;
  color: #FFD700;
  margin-bottom: 15px;
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`,Bm=If.div`
  color: #FFFFFF;
  line-height: 1.6;
  margin-bottom: 15px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`,Wm=If.div`
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
  text-align: center;
`,Um=If.div`
  color: #4CAF50;
  font-size: 0.9rem;
  font-weight: 600;
`,Qm=({onNavigate:e})=>{const[t,n]=O.useState(null),[r,a]=O.useState(!0),[o,i]=O.useState(null),[l,s]=O.useState(null);O.useEffect(()=>{u()},[]);const u=async()=>{console.log("Loading exchange rate..."),a(!0),i(null);try{console.log("Fetching from /api/exchange-rate");const e=await fetch("/api/exchange-rate");console.log("Response status:",e.status);const t=await e.json();if(console.log("Response data:",t),!e.ok)throw new Error(t.error||"Ошибка получения курса");n(t.rate),s(new Date),console.log("Exchange rate updated:",t.rate)}catch(e){console.error("Error loading exchange rate:",e),i("Ошибка соединения с сервером"),n(12.5)}finally{a(!1)}};return G.jsxs(Cm,{children:[G.jsx(jm,{children:"🐉"}),G.jsxs(zm,{children:[G.jsx(Em,{onClick:()=>e("main"),children:"←"}),G.jsx(Nm,{children:"📊 Курс юаня к рублю"})]}),G.jsxs(_m,{children:[G.jsxs(Tm,{children:[G.jsx(Pm,{children:"Текущий курс"}),r?G.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[G.jsx(Rm,{}),G.jsx("span",{style:{color:"#FFFFFF"},children:"Загрузка..."})]}):G.jsxs(G.Fragment,{children:[G.jsx(Dm,{children:t?`${t.toFixed(2)} ₽`:"—"}),G.jsx(Am,{children:"за 1 китайский юань"}),o&&G.jsx($m,{children:o}),l&&G.jsxs(Im,{children:["Обновлено: ",l.toLocaleTimeString("ru-RU")]})]}),G.jsx(Lm,{onClick:()=>{console.log("Refresh button clicked"),u()},disabled:r,children:r?G.jsxs(G.Fragment,{children:[G.jsx(Rm,{}),"Обновляем..."]}):"🔄 Обновить курс"})]}),G.jsxs(Om,{children:[G.jsx(Mm,{children:"ℹ️ О курсе"}),G.jsx(Bm,{children:"Курс юаня к рублю обновляется автоматически и включает наценку для покрытия комиссий и рисков."}),G.jsx(Bm,{children:"При расчете стоимости товара учитываются:"}),G.jsxs("ul",{style:{color:"#FFFFFF",lineHeight:"1.6",paddingLeft:"20px",textShadow:"1px 1px 2px rgba(0, 0, 0, 0.3)"},children:[G.jsx("li",{children:"Стоимость товара в юанях × текущий курс"}),G.jsx("li",{children:"Стоимость доставки (800 ₽ за кг)"}),G.jsx("li",{children:"Комиссия сервиса (4-5% от стоимости товара)"})]}),G.jsx(Wm,{children:G.jsx(Um,{children:"📈 Курс обновляется каждые 30 минут с сайта RBC"})})]})]})]})},Ym=Mf`
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(1deg) scale(1.02); }
  50% { transform: translateY(-20px) rotate(0deg) scale(1.05); }
  75% { transform: translateY(-10px) rotate(-1deg) scale(1.02); }
`,Hm=Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4);
  }
`;Mf`
  0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
`,Mf`
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
`,Mf`
  0%, 100% { 
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 0, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.7), 0 0 50px rgba(255, 0, 0, 0.4);
  }
`;const Vm=Mf`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`,Gm=Mf`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,qm=If.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 25%, #1a1a1a 50%, #2d1b1b 75%, #1a1a1a 100%);
  background-size: 400% 400%;
  animation: ${Gm} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(139, 69, 19, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dragon-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 10 Q35 5 45 10 Q40 20 35 25 Q30 30 25 25 Q20 20 15 25 Q10 20 5 10 Q15 5 25 10" fill="%23FF0000" opacity="0.05"/><circle cx="25" cy="25" r="2" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dragon-pattern)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
    z-index: -1;
    animation: ${Ym} 20s ease-in-out infinite;
  }
`,Xm=If.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #FF0000, #FFD700, #8B4513);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: ${Ym} 3s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(255, 0, 0, 0.5),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  border: 3px solid rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.7));
`,Km=If.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
`,Zm=If.button`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #FFD700 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(139, 69, 19, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 
      0 12px 35px rgba(139, 69, 19, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${Hm} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`,Jm=If.h1`
  font-family: 'Noto Serif SC', 'Roboto', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.5);
  background: linear-gradient(45deg, #FFD700, #FF0000, #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${Hm} 3s ease-in-out infinite;
`,eb=If.div`
  max-width: 600px;
  margin: 0 auto;
`,tb=If.div`
  background: linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(255, 215, 0, 0.1) 50%, rgba(139, 69, 19, 0.1) 100%);
  border-radius: 25px;
  padding: 30px;
  margin-bottom: 25px;
  backdrop-filter: blur(15px);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FF0000, #FFD700, #8B4513, #FF0000);
    border-radius: 27px;
    z-index: -1;
    opacity: 0.7;
    animation: ${Hm} 3s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${Vm} 3s ease-in-out infinite;
  }
`,nb=If.h2`
  font-family: Arial, sans-serif;
  color: #FFD700;
  margin-bottom: 15px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
`,rb=If.p`
  color: #FFFFFF;
  line-height: 1.6;
  margin-bottom: 20px;
`,ab=If.ul`
  color: #FFFFFF;
  line-height: 1.6;
  padding-left: 20px;
`,ob=If.li`
  margin-bottom: 12px;
  font-size: 1rem;
`,ib=If.div`
  text-align: center;
  margin-top: 20px;
`,lb=If.button`
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  border: none;
  border-radius: 15px;
  padding: 15px 25px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(33, 150, 243, 0.5);
  }
`,sb=If.div`
  color: #FFFFFF;
  margin-bottom: 15px;
  font-size: 1rem;
`,ub=({onNavigate:e})=>G.jsxs(qm,{children:[G.jsx(Xm,{children:"🐉"}),G.jsxs(Km,{children:[G.jsx(Zm,{onClick:()=>e("main"),children:"←"}),G.jsx(Jm,{children:"🏮 О нас"})]}),G.jsxs(eb,{children:[G.jsxs(tb,{children:[G.jsx(nb,{children:"🐉 Poizonic"}),G.jsx(rb,{children:"Добро пожаловать в мир качественных оригинальных товаров с Poizon! Мы — ваш надежный посредник для заказа товаров с китайского маркетплейса Poizon, специализирующийся на оригинальных брендовых товарах."})]}),G.jsxs(tb,{children:[G.jsx(nb,{children:"⭐ Наши преимущества"}),G.jsx(ab,{children:["🚀 Быстрая доставка: средний срок доставки — около 15 дней","💰 Низкие цены: мы предлагаем конкурентные цены на товары, ниже, чем многие другие посредники","🔒 Гарантия качества: все оригинальные товары проходят строгую проверку перед отправкой!","🔝 Прозрачность: вы всегда знаете, что и за сколько покупаете. Совершенство в каждой детали!","👥 Поддержка на каждом этапе: от оформления заказа и до получения товара — мы всегда на связи!","📦 Функциональность: Мы также выкупаем товары со значком '≈' и поможем рассчитать их стоимость"].map((e,t)=>G.jsx(ob,{children:e},t))})]}),G.jsxs(tb,{children:[G.jsx(nb,{children:"📞 Контакты"}),G.jsx(sb,{children:"Telegram: @poizonic_manager"}),G.jsx(ib,{children:G.jsx(lb,{onClick:()=>{var e,t;(null==(t=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:t.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_manager")},children:"💬 Связаться с менеджером"})})]})]})]}),cb=Mf`
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(1deg) scale(1.02); }
  50% { transform: translateY(-20px) rotate(0deg) scale(1.05); }
  75% { transform: translateY(-10px) rotate(-1deg) scale(1.02); }
`;Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4);
  }
`,Mf`
  0% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 0.8; }
`,Mf`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.5);
  }
`;const db=Mf`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;Mf`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;const pb=Mf`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,fb=If.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 25%, #1a1a1a 50%, #2d1b1b 75%, #1a1a1a 100%);
  background-size: 400% 400%;
  animation: ${pb} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(139, 69, 19, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dragon-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M25 10 Q35 5 45 10 Q40 20 35 25 Q30 30 25 25 Q20 20 15 25 Q10 20 5 10 Q15 5 25 10" fill="%23FF0000" opacity="0.05"/><circle cx="25" cy="25" r="2" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dragon-pattern)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
    z-index: -1;
    animation: ${cb} 20s ease-in-out infinite;
  }
`,gb=If.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #FF0000, #FFD700, #8B4513);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: ${cb} 3s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(255, 0, 0, 0.5),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  border: 3px solid rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.7));
`,hb=If.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
`,mb=If.button`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 0, 0, 0.4);
  }
`,bb=If.h1`
  font-family: Arial, sans-serif;
  font-size: 1.8rem;
  color: #FFD700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 2;
`,xb=If.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`,vb=If.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  animation: ${db} 0.6s ease-out;
  position: relative;
  overflow: hidden;
`,yb=If.h2`
  font-family: Arial, sans-serif;
  color: #FFD700;
  margin-bottom: 15px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`,wb=If.p`
  color: #FFFFFF;
  line-height: 1.6;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`,kb=If.button`
  width: 100%;
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  border: none;
  border-radius: 15px;
  padding: 15px 25px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(33, 150, 243, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`,Sb=If.div`
  margin-top: 20px;
`,Fb=If.textarea`
  width: 100%;
  min-height: 100px;
  padding: 15px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  font-size: 1rem;
  font-family: Arial, sans-serif;
  resize: vertical;
  transition: all 0.3s ease;
  margin-bottom: 15px;
  backdrop-filter: blur(5px);
  
  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`,Cb=If.button`
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.5);
  }
`;If.div`
  margin-top: 20px;
`;const jb=If.h3`
  font-family: Arial, sans-serif;
  color: #FFD700;
  margin-bottom: 15px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`,zb=If.ul`
  color: #FFFFFF;
  line-height: 1.6;
  padding-left: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`,Eb=If.li`
  margin-bottom: 8px;
  position: relative;
  
  &::before {
    content: '⭐';
    position: absolute;
    left: -20px;
    top: 0;
  }
`,Nb=({onNavigate:e})=>{const[t,n]=O.useState("");return G.jsxs(fb,{children:[G.jsx(gb,{children:"🐉"}),G.jsxs(hb,{children:[G.jsx(mb,{onClick:()=>e("main"),children:"←"}),G.jsx(bb,{children:"⭐ Отзывы"})]}),G.jsxs(xb,{children:[G.jsxs(vb,{children:[G.jsx(yb,{children:"⭐ Наши отзывы"}),G.jsx(wb,{children:"Мы гордимся тем, что наши клиенты довольны качеством наших услуг. Каждый отзыв помогает нам становиться лучше и улучшать сервис для вас."}),G.jsx(kb,{onClick:()=>{var e,t;(null==(t=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:t.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink("https://t.me/poizonic_feedback")},children:"📝 Посмотреть отзывы"})]}),G.jsxs(vb,{children:[G.jsx(yb,{children:"✍️ Оставить отзыв"}),G.jsx(wb,{children:"Поделитесь своим опытом работы с нами! Ваш отзыв поможет другим пользователям сделать правильный выбор и поможет нам улучшить сервис."}),G.jsxs(Sb,{children:[G.jsx(Fb,{value:t,onChange:e=>n(e.target.value),placeholder:"Напишите ваш отзыв здесь..."}),G.jsx(Cb,{onClick:async()=>{var e,r,a,o,i,l,s,u,c,d,p,f,g,h,m,b,x,v,y;if(t.trim())try{const e=null==(i=null==(o=null==(a=window.Telegram)?void 0:a.WebApp)?void 0:o.initDataUnsafe)?void 0:i.user;try{const r=await fetch("/api/submit-review",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({telegramId:(null==e?void 0:e.id)||0,username:(null==e?void 0:e.username)||"",reviewText:t.trim()})});if(r.ok){await r.json();return(null==(s=null==(l=window.Telegram)?void 0:l.WebApp)?void 0:s.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"),(null==(c=null==(u=window.Telegram)?void 0:u.WebApp)?void 0:c.showAlert)&&window.Telegram.WebApp.showAlert("Спасибо за ваш отзыв! Мы ценим ваше мнение."),void n("")}}catch(w){console.log("API недоступен, отправляем через Telegram")}try{if(!(await fetch("/api/submit-review-direct",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({telegramId:(null==e?void 0:e.id)||0,username:(null==e?void 0:e.username)||"",reviewText:t.trim(),timestamp:(new Date).toISOString()})})).ok)throw new Error("Ошибка сохранения отзыва");console.log("Отзыв сохранен в базу данных")}catch(k){console.log("База данных недоступна, отправляем через Telegram");const n=`📝 Новый отзыв от пользователя:\n\n👤 Пользователь: @${(null==e?void 0:e.username)||"неизвестно"} (ID: ${(null==e?void 0:e.id)||"неизвестно"})\n📝 Отзыв: ${t.trim()}\n\n⏰ Время: ${(new Date).toLocaleString("ru-RU")}`;(null==(p=null==(d=window.Telegram)?void 0:d.WebApp)?void 0:p.openTelegramLink)&&window.Telegram.WebApp.openTelegramLink(`https://t.me/poizonic_manager?text=${encodeURIComponent(n)}`)}(null==(g=null==(f=window.Telegram)?void 0:f.WebApp)?void 0:g.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"),(null==(m=null==(h=window.Telegram)?void 0:h.WebApp)?void 0:m.showAlert)&&window.Telegram.WebApp.showAlert("Отзыв отправлен менеджеру! Спасибо за ваше мнение."),n("")}catch(S){console.error("Error submitting review:",S),(null==(x=null==(b=window.Telegram)?void 0:b.WebApp)?void 0:x.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("error"),(null==(y=null==(v=window.Telegram)?void 0:v.WebApp)?void 0:y.showAlert)&&window.Telegram.WebApp.showAlert("Ошибка при отправке отзыва. Попробуйте еще раз.")}else(null==(r=null==(e=window.Telegram)?void 0:e.WebApp)?void 0:r.showAlert)&&window.Telegram.WebApp.showAlert("Пожалуйста, введите текст отзыва")},children:"✍️ Написать отзыв"})]})]}),G.jsxs(vb,{children:[G.jsx(jb,{children:"⭐ Почему клиенты выбирают нас?"}),G.jsxs(zb,{children:[G.jsx(Eb,{children:"Быстрая и надежная доставка"}),G.jsx(Eb,{children:"Оригинальные товары с проверкой подлинности"}),G.jsx(Eb,{children:"Прозрачные цены без скрытых комиссий"}),G.jsx(Eb,{children:"Отличная поддержка клиентов"}),G.jsx(Eb,{children:"Реферальная программа со скидками"})]})]})]})]})},_b=Mf`
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`,Tb=Mf`
  0%, 100% { 
    box-shadow: 0 0 10px rgba(220, 20, 20, 0.2);
  }
  50% { 
    box-shadow: 0 0 15px rgba(220, 20, 20, 0.3);
  }
`,Pb=(function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=Lf.apply(void 0,ad([e],t,!1)),a="sc-global-".concat(Fp(JSON.stringify(r))),o=new Of(r,a),i=function(e){var t=yf(),n=M.useContext(_f),r=M.useRef(t.styleSheet.allocateGSInstance(a)).current;return t.styleSheet.server&&l(r,e,t.styleSheet,n,t.stylis),M.useLayoutEffect(function(){if(!t.styleSheet.server)return l(r,e,t.styleSheet,n,t.stylis),function(){return o.removeStyles(r,t.styleSheet)}},[r,e,t.styleSheet,n,t.stylis]),null};function l(e,t,n,r,a){if(o.isStatic)o.renderStyles(e,cp,n,a);else{var l=rd(rd({},t),{theme:fp(t,r,i.defaultProps)});o.renderStyles(e,l,n,a)}}return M.memo(i)})`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700;900&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
  
  :root {
    /* Светлая тема - Дневная китайская деревня */
    --bg-primary: #F5F5DC;
    --bg-secondary: #FFF8DC;
    --bg-card: rgba(255, 248, 220, 0.9);
    --text-primary: #2C1810;
    --text-secondary: #5D4E37;
    --text-accent: #8B4513;
    --imperial-red: #DC143C;
    --dragon-gold: #B8860B;
    --jade-green: #228B22;
    --bamboo-green: #9ACD32;
    --lotus-pink: #CD853F;
    --mystic-purple: #8B4513;
    --shadow-dragon: rgba(220, 20, 60, 0.2);
    --shadow-gold: rgba(184, 134, 11, 0.15);
    --shadow-mystic: rgba(139, 69, 19, 0.2);
    --glow-red: rgba(220, 20, 60, 0.4);
    --glow-gold: rgba(184, 134, 11, 0.3);
    --glow-tech: rgba(34, 139, 34, 0.2);
    --hieroglyph-color: rgba(139, 69, 19, 0.08);
    --hieroglyph-glow: rgba(184, 134, 11, 0.1);
  }

  [data-theme="dark"] {
    /* Темная тема - Ночная китайская деревня */
    --bg-primary: #0F0F23;
    --bg-secondary: #1A1A2E;
    --bg-card: rgba(26, 26, 46, 0.9);
    --text-primary: #FFF8DC;
    --text-secondary: #E6D3B3;
    --text-accent: #FFD700;
    --imperial-red: #FF4500;
    --dragon-gold: #FFD700;
    --jade-green: #00FF7F;
    --bamboo-green: #87CEEB;
    --lotus-pink: #FF69B4;
    --mystic-purple: #9370DB;
    --shadow-dragon: rgba(255, 69, 0, 0.4);
    --shadow-gold: rgba(255, 215, 0, 0.3);
    --shadow-mystic: rgba(147, 112, 219, 0.35);
    --glow-red: rgba(255, 69, 0, 0.6);
    --glow-gold: rgba(255, 215, 0, 0.5);
    --glow-tech: rgba(0, 255, 127, 0.4);
    --hieroglyph-color: rgba(255, 215, 0, 0.08);
    --hieroglyph-glow: rgba(255, 69, 0, 0.1);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', 'Noto Sans SC', Arial, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    overflow-x: hidden;
    position: relative;
    line-height: 1.6;
    font-weight: 400;
    min-height: 100vh;
    transition: all 0.5s ease;
  }

  /* Плавающие иероглифы */
  .floating-hieroglyphs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  }

  .hieroglyph {
    position: absolute;
    font-family: 'Noto Sans SC', serif;
    color: var(--hieroglyph-color);
    text-shadow: 0 0 10px var(--hieroglyph-glow);
    animation: floatUpDown 15s ease-in-out infinite;
    opacity: 0.6;
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
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    text-shadow: 0 0 20px var(--glow-gold);
  }

  /* Потрясающие технологичные стили в китайском стиле */
  .mystic-card {
    background: var(--bg-card);
    border: 2px solid transparent;
    border-radius: 24px;
    backdrop-filter: blur(20px);
    box-shadow: 
      0 8px 32px var(--shadow-dragon),
      0 0 0 1px rgba(255, 215, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 60px var(--shadow-dragon),
      0 0 40px var(--glow-gold),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .mystic-card:hover::before {
    opacity: 1;
  }

  /* Технологичные кнопки */
  .dragon-button {
    background: linear-gradient(135deg, var(--imperial-red) 0%, #B22222 50%, var(--imperial-red) 100%);
    border: none;
    border-radius: 20px;
    color: var(--text-primary);
    font-weight: 600;
    font-family: 'Noto Sans SC', 'Inter', sans-serif;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 20px var(--shadow-dragon),
      0 0 20px var(--glow-red),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
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
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 8px 30px var(--shadow-dragon),
      0 0 40px var(--glow-red),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    background: linear-gradient(135deg, #FF1744 0%, var(--imperial-red) 50%, #B22222 100%);
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
`,Db=If.div`
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
  animation: ${_b} 0.8s ease-out forwards;
  transition: all 0.5s ease;
`,Ab=If.button`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 
    0 4px 20px var(--shadow-dragon),
    0 0 20px var(--glow-gold),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 
      0 8px 30px var(--shadow-dragon),
      0 0 40px var(--glow-gold),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`,Lb=If.div`
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
  animation: ${_b} 0.8s ease-out forwards;
  transition: all 0.5s ease;
`,Rb=If.div`
  width: 120px;
  height: 100px;
  margin: 0 auto 40px auto;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><defs><linearGradient id="imperialDragon" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23DC143C"/><stop offset="30%" stop-color="%23FFD700"/><stop offset="70%" stop-color="%2300BFFF"/><stop offset="100%" stop-color="%239370DB"/></linearGradient><radialGradient id="dragonEyes" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23FFD700"/><stop offset="70%" stop-color="%23FF8F00"/><stop offset="100%" stop-color="%23FF4500"/></radialGradient><filter id="dragonGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g><path d="M25 50 C35 35 50 30 65 35 C80 30 95 35 100 50 C95 65 80 70 65 65 C50 70 35 65 25 50 Z" fill="url(%23imperialDragon)" filter="url(%23dragonGlow)"/><circle cx="50" cy="45" r="5" fill="url(%23dragonEyes)" filter="url(%23dragonGlow)"/><circle cx="70" cy="45" r="5" fill="url(%23dragonEyes)" filter="url(%23dragonGlow)"/><path d="M40 30 C45 25 50 30 45 35 C50 40 45 45 40 40 C35 45 30 40 35 35 C30 30 35 25 40 30 Z" fill="url(%23imperialDragon)"/><path d="M75 30 C80 25 85 30 80 35 C85 40 80 45 75 40 C70 45 65 40 70 35 C65 30 70 25 75 30 Z" fill="url(%23imperialDragon)"/><path d="M20 45 C25 40 30 45 25 50 C30 55 25 60 20 55 C15 60 10 55 15 50 C10 45 15 40 20 45 Z" fill="url(%23imperialDragon)"/><path d="M95 45 C100 40 105 45 100 50 C105 55 100 60 95 55 C90 60 85 55 90 50 C85 45 90 40 95 45 Z" fill="url(%23imperialDragon)"/></g></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${Tb} 3s ease-in-out infinite;
  filter: drop-shadow(0 0 30px var(--glow-red));
`;Mf`
  0% { text-shadow: 0 0 20px var(--glow-gold); }
  100% { text-shadow: 0 0 30px var(--glow-gold), 0 0 40px var(--glow-red); }
`;const $b=If.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 20px;
  letter-spacing: -0.02em;
  text-shadow: 0 0 20px var(--glow-gold);
  animation: textGlow 2s ease-in-out infinite alternate;
`,Ib=If.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  color: var(--text-accent);
  margin-top: 12px;
  opacity: 0.9;
  font-weight: 500;
  text-shadow: 0 0 10px var(--glow-gold);
`,Ob=()=>{const[e,t]=O.useState("main"),[n,r]=O.useState(null),[a,o]=O.useState(!0),[i,l]=O.useState(!1);O.useEffect(()=>{var n,a;const i=localStorage.getItem("theme");if(i&&(l("dark"===i),document.documentElement.setAttribute("data-theme",i)),null==(n=window.Telegram)?void 0:n.WebApp){const n=window.Telegram.WebApp;n.ready(),n.expand();const o=null==(a=n.initDataUnsafe)?void 0:a.user;o&&(r(o),console.log("Telegram user:",o)),n.MainButton.text="🐉 Главное меню",n.MainButton.onClick(()=>{t("main"),n.MainButton.hide()}),n.BackButton.onClick(()=>{"main"!==e&&(t("main"),n.BackButton.hide(),n.MainButton.hide())});const i=new URLSearchParams(window.location.search).get("start");if(i&&i.startsWith("ref_")){const e=i.replace("ref_","");u(e)}}setTimeout(()=>{o(!1)},1e3)},[]),O.useEffect(()=>{var t;if(null==(t=window.Telegram)?void 0:t.WebApp){const t=window.Telegram.WebApp;"main"===e?(t.MainButton.hide(),t.BackButton.hide()):(t.BackButton.show(),t.MainButton.show())}},[e]);const s=()=>{const e=!i;l(e);const t=e?"dark":"light";document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)},u=async e=>{var t,r;try{(await fetch("/api/referral",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({telegramId:(null==n?void 0:n.id)||0,referredBy:parseInt(e)})})).ok&&(console.log("Referral processed successfully"),(null==(r=null==(t=window.Telegram)?void 0:t.WebApp)?void 0:r.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success"))}catch(a){console.error("Error processing referral:",a)}},c=e=>{var n,r;t(e),(null==(r=null==(n=window.Telegram)?void 0:n.WebApp)?void 0:r.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.impactOccurred("light")};return a?G.jsxs(G.Fragment,{children:[G.jsx(Pb,{}),G.jsxs(Lb,{children:[G.jsx(Ab,{onClick:s,children:i?"🌙":"☀️"}),G.jsxs("div",{className:"floating-hieroglyphs",children:[G.jsx("div",{className:"hieroglyph",children:"龍"}),G.jsx("div",{className:"hieroglyph",children:"福"}),G.jsx("div",{className:"hieroglyph",children:"壽"}),G.jsx("div",{className:"hieroglyph",children:"喜"}),G.jsx("div",{className:"hieroglyph",children:"財"}),G.jsx("div",{className:"hieroglyph",children:"吉"}),G.jsx("div",{className:"hieroglyph",children:"祥"}),G.jsx("div",{className:"hieroglyph",children:"安"}),G.jsx("div",{className:"hieroglyph",children:"康"}),G.jsx("div",{className:"hieroglyph",children:"樂"}),G.jsx("div",{className:"hieroglyph",children:"智"}),G.jsx("div",{className:"hieroglyph",children:"德"}),G.jsx("div",{className:"hieroglyph",children:"義"}),G.jsx("div",{className:"hieroglyph",children:"和"}),G.jsx("div",{className:"hieroglyph",children:"信"}),G.jsx("div",{className:"hieroglyph",children:"禮"}),G.jsx("div",{className:"hieroglyph",children:"仁"}),G.jsx("div",{className:"hieroglyph",children:"勇"})]}),G.jsx(Rb,{}),G.jsx($b,{children:"Poizonic"}),G.jsx(Ib,{children:"Сервис доставки оригинальных товаров из Китая"})]})]}):G.jsxs(G.Fragment,{children:[G.jsx(Pb,{}),G.jsxs(Db,{children:[G.jsx(Ab,{onClick:s,children:i?"🌙":"☀️"}),G.jsxs("div",{className:"floating-hieroglyphs",children:[G.jsx("div",{className:"hieroglyph",children:"龍"}),G.jsx("div",{className:"hieroglyph",children:"福"}),G.jsx("div",{className:"hieroglyph",children:"壽"}),G.jsx("div",{className:"hieroglyph",children:"喜"}),G.jsx("div",{className:"hieroglyph",children:"財"}),G.jsx("div",{className:"hieroglyph",children:"吉"}),G.jsx("div",{className:"hieroglyph",children:"祥"}),G.jsx("div",{className:"hieroglyph",children:"安"}),G.jsx("div",{className:"hieroglyph",children:"康"}),G.jsx("div",{className:"hieroglyph",children:"樂"}),G.jsx("div",{className:"hieroglyph",children:"智"}),G.jsx("div",{className:"hieroglyph",children:"德"}),G.jsx("div",{className:"hieroglyph",children:"義"}),G.jsx("div",{className:"hieroglyph",children:"和"}),G.jsx("div",{className:"hieroglyph",children:"信"}),G.jsx("div",{className:"hieroglyph",children:"禮"}),G.jsx("div",{className:"hieroglyph",children:"仁"}),G.jsx("div",{className:"hieroglyph",children:"勇"})]}),"main"===e&&G.jsx(eg,{onNavigate:c}),"order"===e&&G.jsx(kg,{onNavigate:c}),"calculator"===e&&G.jsx(Gg,{onNavigate:c}),"faq"===e&&G.jsx(xh,{onNavigate:c}),"instructions"===e&&G.jsx(Uh,{onNavigate:c}),"referral"===e&&G.jsx(vm,{onNavigate:c}),"exchange-rate"===e&&G.jsx(Qm,{onNavigate:c}),"about"===e&&G.jsx(ub,{onNavigate:c}),"reviews"===e&&G.jsx(Nb,{onNavigate:c})]})]})};q.createRoot(document.getElementById("root")).render(G.jsx(M.StrictMode,{children:G.jsx(Ob,{})}));
