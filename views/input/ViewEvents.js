// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/compilerUtils","../../core/mathUtils","../../core/screenUtils","./InputHandler","./InputManager"],(function(t,e,n,r,a,o,i,p){Object.defineProperty(e,"__esModule",{value:!0}),e.eventTypes=["click","double-click","immediate-click","immediate-double-click","hold","drag","key-down","key-up","pointer-down","pointer-move","pointer-up","pointer-drag","mouse-wheel","pointer-enter","pointer-leave","gamepad","focus","blur"];var u={};function c(t){return!!u[t]}e.eventTypes.forEach((function(t){u[t]=!0}));var s=function(){function t(t){this.handlers=new Map,this.counter=0,this.handlerCounts=new Map,this.view=t,this.inputManager=null}return t.prototype.connect=function(t){var e=this;t&&this.disconnect(),this.inputManager=t,this.handlers.forEach((function(t,n){var r=t.handler,a=t.priority;return e.inputManager.installHandlers(n,[r],a)}))},t.prototype.disconnect=function(){var t=this;this.inputManager&&this.handlers.forEach((function(e,n){return t.inputManager.uninstallHandlers(n)})),this.inputManager=null},t.prototype.destroy=function(){this.disconnect(),this.handlers.clear(),this.view=null},t.prototype.on=function(t,e,n,r){var a,o,i=this,u=Array.isArray(t)?t:t.split(",");if(!function(t){for(var e=0,n=t;e<n.length;e++){if(!c(n[e]))return!1}return!0}(u))return u.some(c)&&console.error("Error: registering input events and other events on the view at the same time is not supported."),null;Array.isArray(e)?o=e:(a=e,o=[]),"function"==typeof n?a=n:r=n,r=null!=r?r:p.ViewEventPriorities.DEFAULT;var s=this.createUniqueGroupName(),d=new l(this.view,u,o,a);this.handlers.set(s,{handler:d,priority:r});for(var v=0,f=u;v<f.length;v++){var m=f[v],g=this.handlerCounts.get(m)||0;this.handlerCounts.set(m,g+1)}return this.inputManager&&this.inputManager.installHandlers(s,[d],r),{remove:function(){return i.removeHandler(s,u)}}},t.prototype.hasHandler=function(t){return!!this.handlerCounts.get(t)},t.prototype.removeHandler=function(t,e){if(this.handlers.has(t)){this.handlers.delete(t);for(var n=0,r=e;n<r.length;n++){var a=r[n],o=this.handlerCounts.get(a);void 0===o?console.error("Trying to remove handler for event that has no handlers registered: ",a):1===o?this.handlerCounts.delete(a):this.handlerCounts.set(a,o-1)}}this.inputManager&&this.inputManager.uninstallHandlers(t)},t.prototype.createUniqueGroupName=function(){return this.counter+=1,"viewEvents_"+this.counter},t}();e.ViewEvents=s;var l=function(t){function e(e,n,a,o){var i=t.call(this,!0)||this;i.view=e;for(var p=0,u=n;p<u.length;p++){var c=u[p];switch(c){case"click":i.registerIncoming("click",a,(function(t){return o(i.wrapClick(t))}));break;case"double-click":i.registerIncoming("double-click",a,(function(t){return o(i.wrapDoubleClick(t))}));break;case"immediate-click":i.registerIncoming("immediate-click",a,(function(t){return o(i.wrapImmediateClick(t))}));break;case"immediate-double-click":i.registerIncoming("immediate-double-click",a,(function(t){return o(i.wrapImmediateDoubleClick(t))}));break;case"hold":i.registerIncoming("hold",a,(function(t){return o(i.wrapHold(t))}));break;case"drag":i.registerIncoming("drag",a,(function(t){var e=i.wrapDrag(t);e&&o(e)}));break;case"key-down":i.registerIncoming("key-down",a,(function(t){return o(i.wrapKeyDown(t))}));break;case"key-up":i.registerIncoming("key-up",a,(function(t){return o(i.wrapKeyUp(t))}));break;case"pointer-down":i.registerIncoming("pointer-down",a,(function(t){return o(i.wrapPointer(t,"pointer-down"))}));break;case"pointer-move":i.registerIncoming("pointer-move",a,(function(t){return o(i.wrapPointer(t,"pointer-move"))}));break;case"pointer-up":i.registerIncoming("pointer-up",a,(function(t){return o(i.wrapPointer(t,"pointer-up"))}));break;case"pointer-drag":i.registerIncoming("pointer-drag",a,(function(t){return o(i.wrapPointerDrag(t))}));break;case"mouse-wheel":i.registerIncoming("mouse-wheel",a,(function(t){return o(i.wrapMouseWheel(t))}));break;case"pointer-enter":i.registerIncoming("pointer-enter",a,(function(t){return o(i.wrapPointer(t,"pointer-enter"))}));break;case"pointer-leave":i.registerIncoming("pointer-leave",a,(function(t){return o(i.wrapPointer(t,"pointer-leave"))}));break;case"gamepad":i.registerIncoming("gamepad",a,(function(t){o(i.wrapGamepad(t))}));break;case"focus":i.registerIncoming("focus",a,(function(t){o(i.wrapFocus(t))}));break;case"blur":i.registerIncoming("blur",a,(function(t){o(i.wrapBlur(t))}));break;default:r.neverReached(c)}}return i}return n(e,t),e.prototype.wrapFocus=function(t){return{type:"focus",timestamp:t.timestamp,native:t.data.native,cancelable:t.cancelable,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapBlur=function(t){return{type:"blur",timestamp:t.timestamp,native:t.data.native,cancelable:t.cancelable,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapClick=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,i=e.x,p=e.y,u=e.native,c=e.eventId,s=t.cancelable;return{type:"click",pointerType:n,button:r,buttons:a,x:i,y:p,native:u,timestamp:t.timestamp,screenPoint:o.createScreenPoint(i,p),mapPoint:this.getMapPoint(i,p),eventId:c,cancelable:s,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapDoubleClick=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y,p=e.native,u=e.eventId,c=t.cancelable;return{type:"double-click",pointerType:n,button:r,buttons:a,x:o,y:i,native:p,timestamp:t.timestamp,mapPoint:this.getMapPoint(o,i),eventId:u,cancelable:c,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapImmediateClick=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y,p=e.native,u=e.eventId,c=p.pointerId,s=t.cancelable;return{type:"immediate-click",pointerId:c,pointerType:n,button:r,buttons:a,x:o,y:i,native:p,timestamp:t.timestamp,mapPoint:this.getMapPoint(o,i),eventId:u,cancelable:s,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapImmediateDoubleClick=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y,p=e.native,u=e.eventId,c=p.pointerId,s=t.cancelable;return{type:"immediate-double-click",pointerId:c,pointerType:n,button:r,buttons:a,x:o,y:i,native:p,timestamp:t.timestamp,mapPoint:this.getMapPoint(o,i),eventId:u,cancelable:s,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapHold=function(t){var e=t.data,n=e.pointerType,r=e.button,a=e.buttons,o=e.x,i=e.y,p=e.native,u=t.cancelable;return{type:"hold",pointerType:n,button:r,buttons:a,x:o,y:i,native:p,timestamp:t.timestamp,mapPoint:this.getMapPoint(o,i),cancelable:u,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.getMapPoint=function(t,e){return this.view.toMap(o.createScreenPoint(t,e),{exclude:[]})},e.prototype.wrapDrag=function(t){var e=t.data,n=e.center,r=n.x,o=n.y,i=e.action,p=e.pointerType,u=e.button;if("start"===i&&(this.latestDragStart=e),this.latestDragStart){var c=e.pointer.native,s=e.buttons,l=t.cancelable,d=t.timestamp,v={x:this.latestDragStart.center.x,y:this.latestDragStart.center.y};return"end"===i&&(this.latestDragStart=void 0),{type:"drag",action:i,x:r,y:o,origin:v,pointerType:p,button:u,buttons:s,radius:e.radius,angle:a.rad2deg(e.angle),native:c,timestamp:d,cancelable:l,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}}},e.prototype.wrapKeyDown=function(t){var e=t.data,n=e.key,r=e.repeat,a=e.native,o=t.cancelable;return{type:"key-down",key:n,repeat:r,native:a,timestamp:t.timestamp,cancelable:o,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapKeyUp=function(t){var e=t.data,n=e.key,r=e.native,a=t.cancelable;return{type:"key-up",key:n,native:r,timestamp:t.timestamp,cancelable:a,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapPointer=function(t,e){var n=t.data,r=n.x,a=n.y,o=n.button,i=n.buttons,p=n.native,u=n.eventId,c=p.pointerId,s=p.pointerType,l=t.cancelable;return{type:e,x:r,y:a,pointerId:c,pointerType:s,button:o,buttons:i,native:p,timestamp:t.timestamp,eventId:u,cancelable:l,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapPointerDrag=function(t){var e=t.data.currentEvent,n=e.x,r=e.y,a=e.buttons,o=e.native,i=e.eventId,p=t.data.startEvent.button,u=t.data.startEvent.native.pointerId,c=t.data.startEvent.native.pointerType,s=t.data.action,l={x:t.data.startEvent.x,y:t.data.startEvent.y},d=t.cancelable;return{type:"pointer-drag",x:n,y:r,pointerId:u,pointerType:c,button:p,buttons:a,action:s,origin:l,native:o,timestamp:t.timestamp,eventId:i,cancelable:d,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapMouseWheel=function(t){var e=t.cancelable,n=t.data,r=t.timestamp;return{type:"mouse-wheel",x:n.x,y:n.y,deltaY:n.deltaY,native:n.native,timestamp:r,cancelable:e,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e.prototype.wrapGamepad=function(t){var e=t.data,n=e.action,r=e.state,a=e.device,o=t.cancelable;return{type:"gamepad",device:a,timestamp:t.timestamp,action:n,buttons:r.buttons,axes:r.axes,cancelable:o,stopPropagation:function(){return t.stopPropagation()},preventDefault:function(){return t.preventDefault()}}},e}(i.InputHandler)}));