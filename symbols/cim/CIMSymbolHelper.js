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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","tslib","../../Color","../../core/Logger","../../core/mathUtils","../cim/CIMPlacements","./CIMSymbolDrawHelper","./packingUtils"],(function(e,r,a,t,i,o,s,n,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.OverrideHelper=r.SymbolHelper=r.CIMSymbolHelper=void 0;var c=Math.PI,m=c/2,f=i.getLogger("esri.symbols.cim.CIMSymbolHelper");function y(e,r){switch(r.type){case"CIMSymbolReference":var a={type:"point",x:0,y:0};e.drawSymbol(r.symbol,a);break;case"CIMPointSymbol":a={type:"point",x:0,y:0};e.drawSymbol(r,a);break;case"CIMTextSymbol":break;case"CIMVectorMarker":var t=new s.Placement;e.drawMarker(r,t)}return e.envelope()}var h=function(){function e(){}return e.getEnvelope=function(e){var r=new n.EnvDrawHelper;if(Array.isArray(e)){for(var a=void 0,t=0,i=e;t<i.length;t++){var o=i[t];a?a.union(y(r,o)):a=y(r,o)}return a}return y(r,e)},e.getTextureAnchor=function(e){var r=this.getEnvelope(e);if(!r||r.width<=0||r.height<=0)return[0,0,0];var a=(r.x+.5*r.width)*(96/72),t=-(r.y+.5*r.height)*(96/72),i=r.width*(96/72)+2,o=r.height*(96/72)+2;return[a/i,t/o,o]},e.rasterize=function(e,r,a,t){void 0===t&&(t=!0);var i=a||this.getEnvelope(r);if(!i||i.width<=0||i.height<=0)return[null,0,0,0,0];var o=(i.x+.5*i.width)*(96/72),l=(i.y+.5*i.height)*(96/72);e.width=i.width*(96/72),e.height=i.height*(96/72),a||(e.width+=2,e.height+=2);var c=e.getContext("2d"),m=n.Transformation.createScale(96/72,-96/72);m.translate(.5*e.width-o,.5*e.height+l);var f=new n.CanvasDrawHelper(c,m);switch(r.type){case"CIMPointSymbol":f.drawSymbol(r,{type:"point",x:0,y:0});break;case"CIMVectorMarker":var y=new s.Placement;f.drawMarker(r,y)}var h=c.getImageData(0,0,e.width,e.height),p=new Uint8Array(h.data);if(t)for(var v=void 0,S=0;S<p.length;S+=4)v=p[S+3]/255,p[S]=p[S]*v,p[S+1]=p[S+1]*v,p[S+2]=p[S+2]*v;return[p,e.width,e.height,-o/e.width,-l/e.height]},e.fromSimpleMarker=function(e){var r,a,t,i=e.style;if("circle"===i||"esriSMSCircle"===i){var o=Math.acos(.995),s=Math.ceil(c/o/4);0===s&&(s=1),o=m/s,s*=4;var n=[];n.push([50,0]);for(var l=1;l<s;l++)n.push([50*Math.cos(l*o),-50*Math.sin(l*o)]);n.push([50,0]),r={rings:[n]},a={xmin:-50,ymin:-50,xmax:50,ymax:50}}else if("cross"===i||"esriSMSCross"===i){r={rings:[[[f=0,50],[f,f],[50,f],[50,-f],[f,-f],[f,-50],[-f,-50],[-f,-f],[-50,-f],[-50,f],[-f,f],[-f,50],[f,50]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50}}else if("diamond"===i||"esriSMSDiamond"===i)r={rings:[[[-50,0],[0,50],[50,0],[0,-50],[-50,0]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50};else if("square"===i||"esriSMSSquare"===i)r={rings:[[[-50,-50],[-50,50],[50,50],[50,-50],[-50,-50]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50};else if("x"===i||"esriSMSX"===i){var f;r={rings:[[[0,f=0],[50-f,50],[50,50-f],[f,0],[50,f-50],[50-f,-50],[0,-f],[f-50,-50],[-50,f-50],[-f,0],[-50,50-f],[f-50,50],[0,f]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50}}else if("triangle"===i||"esriSMSTriangle"===i){var y=57.735026918962575,h=-y,p=2/3*100-100;r={rings:[[[h,p],[0,2/3*100],[y,p],[h,p]]]},a={xmin:h,ymin:p,xmax:y,ymax:2/3*100}}else"arrow"!==i&&"esriSMSArrow"!==i||(r={rings:[[[-50,50],[50,0],[-50,-50],[-33,-20],[-33,20],[-50,50]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50});if(r&&a){var v=[{type:"CIMSolidFill",enable:!0,color:e.color}];e.outline&&v.push({type:"CIMSolidStroke",enable:!0,width:e.outline.width,color:e.outline.color});var S={type:"CIMPolygonSymbol",symbolLayers:v};t={type:"CIMPointSymbol",symbolLayers:[{type:"CIMVectorMarker",enable:!0,rotation:e.angle,size:e.size,offsetX:e.xoffset,offsetY:e.yoffset,frame:a,markerGraphics:[{type:"CIMMarkerGraphic",geometry:r,symbol:S}]}]}}return t},e.fromCIMHatchFill=function(e){for(var r=void 0!==e.separation?e.separation:4,a=r/2,t=this._getLineSymbolPeriod(e.lineSymbol)||4;t<4;)t*=2;var i=t/2;return{type:"CIMVectorMarker",frame:{xmin:-i,xmax:i,ymin:-a,ymax:a},markerGraphics:[{type:"CIMMarkerGraphic",geometry:{paths:[[[-i,0],[i,0]]]},symbol:e.lineSymbol}],size:r}},e._getLineSymbolPeriod=function(e){if(e){var r=this._getEffectsRepeat(e.effects);if(r)return r;if(e.symbolLayers)for(var a=0,t=e.symbolLayers;a<t.length;a++){var i=t[a],o=this._getEffectsRepeat(i.effects);if(o)return o;if(i){var s=this._getPlacementRepeat(i.markerPlacement);if(s)return s}}}return 0},e._getEffectsRepeat=function(e){if(e)for(var r=0,a=e;r<a.length;r++){var t=a[r];if(t)switch(t.type){case"CIMGeometricEffectDashes":var i=t.dashTemplate;if(i&&i.length){for(var o=0,s=0,n=i;s<n.length;s++){o+=n[s]}return 1&i.length&&(o*=2),o}break;case"CIMGeometricEffectWave":return t.period;default:f.error("unsupported geometric effect type "+t.type)}}return 0},e._getPlacementRepeat=function(e){if(e)switch(e.type){case"CIMMarkerPlacementAlongLineSameSize":case"CIMMarkerPlacementAlongLineRandomSize":case"CIMMarkerPlacementAlongLineVariableSize":var r=e.placementTemplate;if(r&&r.length){for(var a=0,t=0,i=r;t<i.length;t++){a+=i[t]}return 1&r.length&&(a*=2),a}}return 0},e.fromCIMInsidePolygon=function(e){var r=e.markerPlacement,t=r.stepX/2,i=r.stepY/2,o={xmin:-t,xmax:t,ymin:-i,ymax:i},s=a.__assign({type:e.type},e);return s.markerPlacement=null,s.anchorPoint=null,{type:"CIMVectorMarker",frame:o,markerGraphics:[{type:"CIMMarkerGraphic",geometry:{x:0,y:0},symbol:{type:"CIMPointSymbol",symbolLayers:[s]}}],size:r.stepY}},e.getFillColor=function(r){if(!r)return null;switch(r.type){case"CIMPolygonSymbol":if(r.symbolLayers)for(var a=0,t=r.symbolLayers;a<t.length;a++){var i=t[a],o=e.getFillColor(i);if(null!=o)return o}break;case"CIMTextSymbol":return e.getFillColor(r.symbol);case"CIMSolidFill":return r.color}},e.getStrokeColor=function(r){if(r)switch(r.type){case"CIMPolygonSymbol":case"CIMLineSymbol":if(r.symbolLayers)for(var a=0,t=r.symbolLayers;a<t.length;a++){var i=t[a],o=e.getStrokeColor(i);if(void 0!==o)return o}break;case"CIMTextSymbol":return e.getStrokeColor(r.symbol);case"CIMSolidStroke":return r.color}},e.getStrokeWidth=function(r){if(r)switch(r.type){case"CIMPolygonSymbol":case"CIMLineSymbol":if(r.symbolLayers)for(var a=0,t=r.symbolLayers;a<t.length;a++){var i=t[a],o=e.getStrokeWidth(i);if(void 0!==o)return o}break;case"CIMTextSymbol":return e.getStrokeWidth(r.symbol);case"CIMSolidStroke":case"CIMGradientStroke":case"CIMPictureStroke":return r.width}},e.getSize=function(r){if(r)switch(r.type){case"CIMPointSymbol":case"CIMLineSymbol":case"CIMPolygonSymbol":var a=0;if(r.symbolLayers)for(var t=0,i=r.symbolLayers;t<i.length;t++){var o=i[t],s=e.getSize(o);s>a&&(a=s)}return a;case"CIMSolidStroke":case"CIMPictureStroke":case"CIMGradientStroke":return r.width;case"CIMCharacterMarker":case"CIMPictureMarker":case"CIMVectorMarker":return r.size}},e.getMarkerScaleRatio=function(e){if(e)switch(e.type){case"CIMVectorMarker":if(!1!==e.scaleSymbolsProportionally&&e.frame){var r=e.frame.ymax-e.frame.ymin;return e.size/r}}return 1},e}();r.CIMSymbolHelper=h;var p=function(){function e(){}return e.rasterizeSimpleFill=function(e,r,a){"solid"!==r&&"none"!==r&&"esriSFSSolid"!==r&&"esriSFSNull"!==r||console.error("Unexpected: style does not require rasterization");var t=o.nextPowerOfTwo(Math.ceil(a)),i=16*t,s=2*t;e.width=i,e.height=i;var n=e.getContext("2d");n.strokeStyle="#FFFFFF",n.lineWidth=t,n.beginPath(),"vertical"!==r&&"cross"!==r&&"esriSFSCross"!==r&&"esriSFSVertical"!==r||(n.moveTo(i/2,-s),n.lineTo(i/2,i+s)),"horizontal"!==r&&"cross"!==r&&"esriSFSCross"!==r&&"esriSFSHorizontal"!==r||(n.moveTo(-s,i/2),n.lineTo(i+s,i/2)),"forward-diagonal"!==r&&"diagonal-cross"!==r&&"esriSFSDiagonalCross"!==r&&"esriSFSForwardDiagonal"!==r||(n.moveTo(-s,-s),n.lineTo(i+s,i+s),n.moveTo(i-s,-s),n.lineTo(i+s,s),n.moveTo(-s,i-s),n.lineTo(s,i+s)),"backward-diagonal"!==r&&"diagonal-cross"!==r&&"esriSFSBackwardDiagonal"!==r&&"esriSFSDiagonalCross"!==r||(n.moveTo(i+s,-s),n.lineTo(-s,i+s),n.moveTo(s,-s),n.lineTo(-s,s),n.moveTo(i+s,i-s),n.lineTo(i-s,i+s)),n.stroke();for(var l,c=n.getImageData(0,0,e.width,e.height),m=new Uint8Array(c.data),f=0;f<m.length;f+=4)l=m[f+3]/255,m[f]=m[f]*l,m[f+1]=m[f+1]*l,m[f+2]=m[f+2]*l;return[m,e.width,e.height]},e.rasterizeSimpleLine=function(e,r){var a;switch(r){case"butt":a="Butt";break;case"square":a="Square";break;default:a="Round"}var t,i="Butt"===a;switch(e){case"dash":case"esriSLSDash":t=i?[4,3]:[3,4];break;case"dash-dot":case"esriSLSDashDot":t=i?[4,3,1,3]:[3,4,0,4];break;case"dot":case"esriSLSDot":t=i?[1,3]:[0,4];break;case"long-dash":case"esriSLSLongDash":t=i?[8,3]:[7,4];break;case"long-dash-dot":case"esriSLSLongDashDot":t=i?[8,3,1,3]:[7,4,0,4];break;case"long-dash-dot-dot":case"esriSLSDashDotDot":t=i?[8,3,1,3,1,3]:[7,4,0,4,0,4];break;case"short-dash":case"esriSLSShortDash":t=i?[4,1]:[3,2];break;case"short-dash-dot":case"esriSLSShortDashDot":t=i?[4,1,1,1]:[3,2,0,2];break;case"short-dash-dot-dot":case"esriSLSShortDashDotDot":t=i?[4,1,1,1,1,1]:[3,2,0,2,0,2];break;case"short-dot":case"esriSLSShortDot":t=i?[1,1]:[0,2];break;case"solid":case"esriSLSSolid":case"none":f.error("Unexpected: style does not require rasterization"),t=[0,0];break;default:f.error("Tried to rasterize SLS, but found an unexpected style: "+e+"!"),t=[0,0]}return this.rasterizeDash(t,a)},e.rasterizeDash=function(e,r){for(var a="Butt"===r,t="Square"===r,i=!a&&!t,o=0,s=0,n=e;s<n.length;s++){o+=n[s]}for(var c=15*o,m=31*c,f=new Float32Array(m),y=i?225:15,h=0;h<m;++h)f[h]=y;for(var p=0,v=0,S=!0,d=0,u=e;d<u.length;d++){p=v,v+=15*u[d];for(var M=p;M<v;){for(var g=0;g<31;){h=g*c+M;var b=i?(g-15)*(g-15):Math.abs(g-15);f[h]=S?a?Math.max(Math.max(p+7.5-M,b),Math.max(M-v+7.5,b)):b:i?Math.min((M-p)*(M-p)+b,(M-v)*(M-v)+b):t?Math.min(Math.max(M-p,b),Math.max(v-M,b)):Math.min(Math.max(M-p+7.5,b),Math.max(v+7.5-M,b)),g++}M++}S=!S}var C=f.length,k=new Uint8Array(4*C);for(h=0;h<C;++h){var I=(i?Math.sqrt(f[h]):f[h])/15;l.packFloatRGBA(I,k,4*h)}return[k,c,31]},e}();r.SymbolHelper=p;var v=function(){function e(){}return e.findApplicableOverrides=function(r,a,t){if(a){if(r.primitiveName){for(var i=!1,o=0,s=t;o<s.length;o++){if((c=s[o]).primitiveName===r.primitiveName){i=!0;break}}if(!i)for(var n=0,l=a;n<l.length;n++){var c;(c=l[n]).primitiveName===r.primitiveName&&t.push(c)}}switch(r.type){case"CIMPointSymbol":case"CIMLineSymbol":case"CIMPolygonSymbol":if(r.effects)for(var m=0,f=r.effects;m<f.length;m++){var y=f[m];e.findApplicableOverrides(y,a,t)}if(r.symbolLayers)for(var h=0,p=r.symbolLayers;h<p.length;h++){var v=p[h];e.findApplicableOverrides(v,a,t)}break;case"CIMTextSymbol":break;case"CIMSolidStroke":case"CIMPictureStroke":case"CIMGradientStroke":case"CIMSolidFill":case"CIMPictureFill":case"CIMHatchFill":case"CIMGradientFill":case"CIMVectorMarker":case"CIMCharacterMarker":case"CIMPictureMarker":if(r.effects)for(var S=0,d=r.effects;S<d.length;S++){y=d[S];e.findApplicableOverrides(y,a,t)}if(r.markerPlacement&&e.findApplicableOverrides(r.markerPlacement,a,t),"CIMVectorMarker"===r.type){if(r.markerGraphics)for(var u=0,M=r.markerGraphics;u<M.length;u++){var g=M[u];e.findApplicableOverrides(g,a,t),e.findApplicableOverrides(g.symbol,a,t)}}else"CIMCharacterMarker"===r.type?e.findApplicableOverrides(r.symbol,a,t):"CIMHatchFill"===r.type&&e.findApplicableOverrides(r.lineSymbol,a,t)}}},e.applyOverrides=function(r,a,t,i){if(a){var o;if(r.primitiveName)for(var s=0,n=a;s<n.length;s++){var l=n[s];if(l.primitiveName===r.primitiveName){var c=(o=l.propertyName)?o.charAt(0).toLowerCase()+o.substr(1):o;if(i&&i.push({cim:r,nocapPropertyName:c,value:r[c]}),l.expression&&(l.value=e.toValue(l.propertyName,l.expression)),t){for(var m=!1,f=0,y=t;f<y.length;f++){y[f].primitiveName===r.primitiveName&&(m=!0)}m||t.push(l)}r[c]=l.value}}switch(r.type){case"CIMPointSymbol":case"CIMLineSymbol":case"CIMPolygonSymbol":if(r.effects)for(var h=0,p=r.effects;h<p.length;h++){var v=p[h];e.applyOverrides(v,a,t,i)}if(r.symbolLayers)for(var S=0,d=r.symbolLayers;S<d.length;S++){var u=d[S];e.applyOverrides(u,a,t,i)}break;case"CIMTextSymbol":break;case"CIMSolidStroke":case"CIMSolidFill":case"CIMVectorMarker":if(r.effects)for(var M=0,g=r.effects;M<g.length;M++){v=g[M];e.applyOverrides(v,a,t,i)}if("CIMVectorMarker"===r.type&&r.markerGraphics)for(var b=0,C=r.markerGraphics;b<C.length;b++){var k=C[b];e.applyOverrides(k,a,t,i),e.applyOverrides(k.symbol,a,t,i)}}}},e.restoreOverrides=function(e){for(var r=0,a=e;r<a.length;r++){var t=a[r];t.cim[t.nocapPropertyName]=t.value}},e.buildOverrideKey=function(e){for(var r="",a=0,t=e;a<t.length;a++){var i=t[a];void 0!==i.value&&(r+=""+i.primitiveName+i.propertyName+JSON.stringify(i.value))}return r},e.toValue=function(e,r){if("DashTemplate"===e)return r.split(" ").map((function(e){return Number(e)}));if("Color"===e){var a=new t(r).toRgba();return a[3]*=255,a}return r},e}();r.OverrideHelper=v}));