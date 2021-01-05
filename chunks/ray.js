/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../core/maybe","../core/screenUtils","./vec3f64","./vec3","../core/ObjectStack","./vec2","../views/3d/support/stack"],(function(e,r,n,t,o,c,i,s){"use strict";function d(e){return e?{origin:t.clone(e.origin),direction:t.clone(e.direction)}:{origin:t.create(),direction:t.create()}}function u(e,r){const n=A.get();return n.origin=e,n.direction=r,n}function a(e,r=d()){return g(e.origin,e.direction,r)}function f(e,r,n=d()){return o.copy(n.origin,e),o.subtract(n.direction,r,e),n}function g(e,r,n=d()){return o.copy(n.origin,e),o.copy(n.direction,r),n}function l(e,r,t=d()){return p(e,e.screenToRender(r,n.castRenderScreenPointArray3(s.sv3d.get())),t)}function p(e,t,c=d()){const u=n.castRenderScreenPointArray3(i.copy(s.sv3d.get(),t));if(u[2]=0,!e.unprojectFromRenderScreen(u,c.origin))return null;const a=n.castRenderScreenPointArray3(i.copy(s.sv3d.get(),t));a[2]=1;const f=e.unprojectFromRenderScreen(a,s.sv3d.get());return r.isNone(f)?null:(o.subtract(c.direction,f,c.origin),c)}function y(e,r,t=d()){return m(e,e.screenToRender(r,n.castRenderScreenPointArray3(s.sv3d.get())),t)}function m(e,n,t=d()){o.copy(t.origin,e.eye);const c=o.set(s.sv3d.get(),n[0],n[1],1),i=e.unprojectFromRenderScreen(c,s.sv3d.get());return r.isNone(i)?null:(o.subtract(t.direction,i,t.origin),t)}function v(e,r){const n=o.cross(s.sv3d.get(),o.normalize(s.sv3d.get(),e.direction),o.subtract(s.sv3d.get(),r,e.origin));return o.dot(n,n)}function R(e,r){return Math.sqrt(v(e,r))}function S(e,r,n){const t=o.dot(e.direction,o.subtract(n,r,e.origin));return o.add(n,e.origin,o.scale(n,e.direction,t)),n}function b(){return{origin:null,direction:null}}const A=new c.ObjectStack(b);var P=Object.freeze({__proto__:null,create:d,wrap:u,copy:a,fromPoints:f,fromValues:g,fromScreen:l,fromRender:p,fromScreenAtEye:y,fromRenderAtEye:m,distance2:v,distance:R,closestPoint:S,createWrapper:b});e.closestPoint=S,e.copy=a,e.create=d,e.createWrapper=b,e.distance=R,e.distance2=v,e.fromPoints=f,e.fromRender=p,e.fromRenderAtEye=m,e.fromScreen=l,e.fromScreenAtEye=y,e.fromValues=g,e.rayModule=P,e.wrap=u}));