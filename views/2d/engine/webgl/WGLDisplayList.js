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

define(["require","exports","../../../../core/tsSupport/generatorHelper","../../../../core/Logger","./enums"],(function(e,t,r,n,o){var i=n.getLogger("esri.views.2d.engine.webgl.WGLDisplayList");function l(e,t,r){for(var n=[],o=3;o<arguments.length;o++)n[o-3]=arguments[o];t<e.length?e.splice.apply(e,[t,r].concat(n)):e.push.apply(e,n)}var y=new Map;y.set(o.WGLDrawPhase.MAP,[o.WGLGeometryType.FILL,o.WGLGeometryType.LINE,o.WGLGeometryType.MARKER,o.WGLGeometryType.TEXT]),y.set(o.WGLDrawPhase.LABEL,[o.WGLGeometryType.LABEL]),y.set(o.WGLDrawPhase.LABEL_ALPHA,[o.WGLGeometryType.LABEL]);var s=function(){function e(e){void 0===e&&(e=!1),this.symbolLevels=[],this.unified=e}return e.prototype.replay=function(e,t,r){if(this.unified)for(var n=0,o=this.symbolLevels;n<o.length;n++)for(var i=0,l=o[n].zLevels;i<l.length;i++){var y=l[i].geometryDPInfo;for(var s in y)if(y[s])for(var m=0,u=y[s];m<u.length;m++){var a=u[m],f=e.painter.getGeometryBrush(a.geometryType),p=t.getGeometry(a.geometryType);f.prepareState(e,t),f.drawGeometry(e,t,a,p,r)}}},Object.defineProperty(e.prototype,"empty",{get:function(){return!this.symbolLevels||0===this.symbolLevels.length},enumerable:!0,configurable:!0}),e.prototype.clear=function(){this.symbolLevels.length=0},e.prototype.addToList=function(e,t){if(Array.isArray(e))for(var r=0,n=e;r<n.length;r++){var o=n[r];this._addToList(o,t)}else this._addToList(e,t)},e.prototype.removeFromList=function(e){Array.isArray(e)||(e=[e]);for(var t=null,r=0,n=e;r<n.length;r++){var o=n[r];t=this._removeFromList(o)}return t},e.prototype.byType=function(e,t){for(var r=0,n=this.symbolLevels;r<n.length;r++)for(var o=0,i=n[r].zLevels;o<i.length;o++){var l=i[o].geometryDPInfo,y=this.getDPInfoType(e);if(l[y])for(var s=0,m=l[y];s<m.length;s++){t(m[s])}}},e.prototype.clone=function(){for(var t=new e(this.unified),r=0,n=this.symbolLevels;r<n.length;r++){var o=n[r];t.symbolLevels.push(o.clone())}return t},e.prototype.splitAfter=function(e){for(var t=this._getDisplayList(e.symbolLevel,e.zOrder,e.geometryType),r=t.length,n=e.indexFrom+e.indexCount,o=0;o<r;++o){var i=t[o];if(i.geometryType===e.geometryType&&n>i.indexFrom&&n<=i.indexFrom+i.indexCount){if(n<i.indexFrom+i.indexCount){var l=new m;l.geometryType=i.geometryType,l.materialKey=i.materialKey,l.indexFrom=n,l.indexCount=i.indexFrom+i.indexCount-n,t.splice(o+1,0,l),i.indexCount=n-i.indexFrom}return o}}},e.prototype._addToList=function(e,t){var r=e.symbolLevel,n=e.zOrder,o=this._getDisplayList(r,n,e.geometryType),i=null!=t?t:o.length-1,y=i>=0&&i<o.length?o[i]:null;if(null===y||y.materialKey!==e.materialKey||y.indexFrom+y.indexCount!==e.indexFrom||this.unified&&y.geometryType!==e.geometryType){var s=new m;s.indexFrom=e.indexFrom,s.indexCount=e.indexCount,s.materialKey=e.materialKey,s.geometryType=e.geometryType,l(o,i+1,0,s)}else y.indexCount+=e.indexCount},e.prototype._removeFromList=function(e){for(var t=e.symbolLevel,r=e.zOrder,n=this._getDisplayList(t,r,e.geometryType),o=n.length,i=void 0,y=0;y<o;++y){var s=n[y];if(e.indexFrom+e.indexCount>s.indexFrom&&e.indexFrom<s.indexFrom+s.indexCount&&(!this.unified||s.geometryType===e.geometryType)){i=y;break}}if(void 0!==i){s=n[i];if(e.indexFrom===s.indexFrom)return s.indexCount-=e.indexCount,s.indexFrom+=e.indexCount,0===s.indexCount&&l(n,i,1),i-1;if(e.indexFrom+e.indexCount===s.indexFrom+s.indexCount)return s.indexCount-=e.indexCount,0===s.indexCount?(l(n,i,1),i-1):i;var u=s.indexFrom,a=e.indexFrom-s.indexFrom,f=e.indexCount,p=s.indexFrom+s.indexCount-(e.indexFrom+e.indexCount);s.indexCount=a;var d=new m;return d.geometryType=s.geometryType,d.materialKey=s.materialKey,d.indexFrom=u+a+f,d.indexCount=p,l(n,i+1,0,d),i}return null},e.prototype._getDisplayList=function(e,t,r){for(var n,i,l=this.symbolLevels.length,y=0;y<l;y++)if(this.symbolLevels[y].symbolLevel===e){n=this.symbolLevels[y];break}n||((n=new f).symbolLevel=e,this.symbolLevels.push(n));for(var s,m=n.zLevels.length,p=0;p<m;p++)if(n.zLevels[p].zLevel===t){i=n.zLevels[p];break}if(i||((i=new a).geometryDPInfo=new u,i.zLevel=t,n.zLevels.push(i)),this.unified)i.geometryDPInfo.unified||(i.geometryDPInfo.unified=[]),s=i.geometryDPInfo.unified;else switch(r){case o.WGLGeometryType.FILL:i.geometryDPInfo.fill||(i.geometryDPInfo.fill=[]),s=i.geometryDPInfo.fill;break;case o.WGLGeometryType.LINE:i.geometryDPInfo.line||(i.geometryDPInfo.line=[]),s=i.geometryDPInfo.line;break;case o.WGLGeometryType.MARKER:i.geometryDPInfo.marker||(i.geometryDPInfo.marker=[]),s=i.geometryDPInfo.marker;break;case o.WGLGeometryType.TEXT:i.geometryDPInfo.text||(i.geometryDPInfo.text=[]),s=i.geometryDPInfo.text;break;case o.WGLGeometryType.LABEL:i.geometryDPInfo.label||(i.geometryDPInfo.label=[]),s=i.geometryDPInfo.label;break;default:console.error("Trying to add a record with geometry type '"+r+"'.")}return s},e.prototype.getDPInfoType=function(e){if(this.unified)return"unified";switch(e){case o.WGLGeometryType.FILL:return"fill";case o.WGLGeometryType.LINE:return"line";case o.WGLGeometryType.MARKER:return"marker";case o.WGLGeometryType.TEXT:return"text";case o.WGLGeometryType.LABEL:return"label";default:return void i.error("DisplayList: Tried to convert unknown geometryType: "+e)}},e}(),m=function(){function e(){this.materialKey=null,this.indexFrom=0,this.indexCount=0}return e.prototype.clone=function(){var t=new e;return t.geometryType=this.geometryType,t.materialKey=this.materialKey,t.indexFrom=this.indexFrom,t.indexCount=this.indexCount,t},e}(),u=function(){function e(){this.fill=null,this.line=null,this.marker=null,this.text=null,this.label=null,this.unified=null}return e.prototype.clone=function(){var t=new e;return t.fill=this.fill&&this.fill.map((function(e){return e.clone()})),t.line=this.line&&this.line.map((function(e){return e.clone()})),t.marker=this.marker&&this.marker.map((function(e){return e.clone()})),t.text=this.text&&this.text.map((function(e){return e.clone()})),t.label=this.label&&this.label.map((function(e){return e.clone()})),t.unified=this.unified&&this.unified.map((function(e){return e.clone()})),t},e}(),a=function(){function e(){this.geometryDPInfo=new u}return e.prototype.clone=function(){var t=new e;return t.zLevel=this.zLevel,t.geometryDPInfo=this.geometryDPInfo.clone(),t},e}(),f=function(){function e(){this.zLevels=[]}return e.prototype.clone=function(){var t=new e;t.symbolLevel=this.symbolLevel;for(var r=0,n=this.zLevels;r<n.length;r++){var o=n[r];t.zLevels.push(o.clone())}return t},e}();return s}));