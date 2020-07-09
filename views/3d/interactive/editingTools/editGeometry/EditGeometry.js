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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","../../../../../geometry","../../../../../core/arrayUtils","../coordinateHelper"],(function(e,t,n,r,i){Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e){this.left=null,this.right=null,this.type="vertex",this.index=null,this.component=e}return Object.defineProperty(e.prototype,"pos",{get:function(){return this._pos},set:function(e){this._pos=e,this.component.unnormalizeVertexPositions()},enumerable:!0,configurable:!0}),e}();t.Vertex=o;var s=function(e,t,n){this.type="edge",this.component=e,this.left=t,this.right=n,t.right=this,n.left=this};t.Edge=s;var c=function(){function e(e){this.vertices=[],this.edges=[],this.data=e}return e.prototype.unnormalizeVertexPositions=function(){this.vertices.length<=1||this.data.coordinateHelper.unnormalize(this.vertices)},e.prototype.updateVertexIndex=function(e,t){if(0!==this.vertices.length){var n=this.vertices[0],r=null,i=e,o=t;do{(r=i).index=o++,i=r.right?r.right.right:null}while(null!=i&&i!==n);r.left&&r!==this.vertices[this.vertices.length-1]&&this.swapVertices(this.vertices.indexOf(r),this.vertices.length-1)}},e.prototype.findEndVertex=function(){return 0===this.vertices.length?null:this.vertices[this.vertices.length-1]},e.prototype.swapVertices=function(e,t){var n=this.vertices[e];this.vertices[e]=this.vertices[t],this.vertices[t]=n},e}();t.Component=c;var h=function(){function e(e){this.coordinateHelper=e,this.undoStack=[],this.redoStack=[],this.components=[]}return e.prototype.apply=function(e){e.apply(),this.undoStack.push(e),this.redoStack=[]},e.prototype.undo=function(){if(this.undoStack.length>0){var e=this.undoStack.pop();e.undo(),this.redoStack.push(e)}},Object.defineProperty(e.prototype,"canUndo",{get:function(){return this.undoStack.length>0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"lastOperation",{get:function(){return this.undoStack.length>0?this.undoStack[this.undoStack.length-1]:null},enumerable:!0,configurable:!0}),e.prototype.redo=function(){if(this.redoStack.length>0){var e=this.redoStack.pop();e.apply(),this.undoStack.push(e)}},Object.defineProperty(e.prototype,"canRedo",{get:function(){return this.redoStack.length>0},enumerable:!0,configurable:!0}),e.prototype.toPoint=function(){return 0===this.components.length?null:0===this.components[0].vertices.length?null:this.coordinateHelper.createPoint(this.components[0].vertices[0].pos)},e.prototype.toPolyline=function(){var e=[],t=this.coordinateHelper.toArray;return this.components.forEach((function(n,i){var o=[],s=r.find(n.vertices,(function(e){return null==e.left})),c=s;do{o.push(t(s.pos)),s=s.right?s.right.right:null}while(s&&s!==c);e.push(o)})),new n.Polyline({paths:e,spatialReference:this.coordinateHelper.spatialReference})},e.prototype.toPolygon=function(){var e=[],t=this.coordinateHelper.toArray;return this.components.forEach((function(n,r){var i=[],o=n.vertices[0],s=o,c=s;do{i.push(t(s.pos)),s=s.right.right}while(s&&s!==c);i.push(t(o.pos)),e.push(i)})),new n.Polygon({rings:e,spatialReference:this.coordinateHelper.spatialReference})},e.fromGeometry=function(t,n){var r=i.createCoordinateHelper(t.hasZ,t.hasM,t.spatialReference,n),h=new e(r);switch(t.type){case"polygon":for(var p=t.rings,a=0;a<p.length;++a){for(var l=p[a],u=new c(h),f=l.length-1,d=0;d<f;++d){var v=r.fromArray(l[d]),g=new o(u);u.vertices.push(g),g.pos=v,g.index=d}for(var y=u.vertices.length-1,m=0;m<y;++m){var k=u.vertices[m],w=u.vertices[m+1],S=new s(u,k,w);u.edges.push(S)}var b=new s(u,u.vertices[u.vertices.length-1],u.vertices[0]);u.edges.push(b),h.components.push(u)}break;case"polyline":for(var x=t.paths,P=0;P<x.length;++P){var H=x[P];for(u=new c(h),f=H.length,d=0;d<f;++d){v=r.fromArray(H[d]),g=new o(u);u.vertices.push(g),g.pos=v,g.index=d}for(y=u.vertices.length-1,m=0;m<y;++m){k=u.vertices[m],w=u.vertices[m+1],S=new s(u,k,w);u.edges.push(S)}h.components.push(u)}}return h},e}();t.EditGeometry=h}));