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

define(["require","exports","tslib","../../../Graphic","../../../symbols","../../../core/Accessor","../../../core/Handles","../../../core/maybe","../../../core/accessorSupport/decorators","../../../core/accessorSupport/diffUtils","../../../core/libs/gl-matrix-2/vec3f64","../../../layers/graphics/dehydratedFeatures","./graphics/Graphics3DCore","./graphics/Graphics3DScaleVisibility","./i3s/I3SGeometryUtil","../support/LimitGraphicsMap"],(function(e,i,r,t,o,a,s,n,l,p,c,d,h,u,y,g){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var f=function(e){function i(i){var r=e.call(this,i)||this;return r.loadedGraphics=new g.LimitGraphicsMap(5e4),r.slicePlaneEnabled=!1,r._renderingInfo={symbol:new o.PointSymbol3D},r._handles=new s,r._graphicsByNode=new Map,r._scaleVisibility=null,r}return r.__extends(i,e),i.prototype.initialize=function(){var e=this;this._graphicsCore=new h.Graphics3DCore({owner:this,layer:this.layer,preferredUpdatePolicy:1,elevationFeatureExpressionEnabled:!1,graphicSymbolSupported:!1,getRenderingInfoWithoutRenderer:!0,hasZ:!0,hasM:!1});var i=this.view.basemapTerrain;this._scaleVisibility=new u({layerScaleEnabled:!1}),this._scaleVisibility.setup(this,this.layer,(function(i,r,t){return e._graphicsCore.spatialIndex.queryGraphicUIDsInExtent(i,r,t)}),this._graphicsCore,i);var r=this.view.labeler.addGraphicsOwner(this._graphicsCore,this._scaleVisibility,{emptySymbolLabelSupported:!0,elevationInfoOverride:{mode:"absolute-height",offset:0},disablePlacement:{logEntityDescription:"3D Object Scene Layer features"}}),t=this.view.deconflictor.addGraphicsOwner(this._graphicsCore);this._graphicsCore.setup({labeler:r,deconflictor:t,scaleVisibility:this._scaleVisibility}).then((function(){e._graphicsCore.startCreateGraphics()})).catch((function(){})),this._handles.add([this.layer.watch("labelingInfo",(function(i,r){p.diff(i,r)&&e._graphicsCore.updateLabelingInfo()}))])},i.prototype.destroy=function(){this._handles&&(this._handles.destroy(),this._handles=null),null!=this._scaleVisibility&&(this._scaleVisibility.destroy(),this._scaleVisibility=null),null!=this._graphicsCore&&(this._graphicsCore.destroy(),this._graphicsCore=null),this.loadedGraphics.destroy(),this.view=null},i.prototype.addNodeMeta=function(e,i){var r=this,o=0,a=e.filteredIds,s=e.featureIds.map((function(s,l){y.boundingBoxTop(l,r.collection,e.objectHandle,_);var p=d.makeDehydratedPoint(0,0,0,r.view.spatialReference);r.view.renderCoordsHelper.fromRenderCoords(_,p);var c=i(l,e),h=!1;return n.isNone(a)?h=!0:o<a.length&&s===a[o]&&(h=!0,o++),{objectId:s,uid:t.generateUID(),attributes:c,visible:h,geometry:p}}));this.loadedGraphics.addMany(s),this._graphicsByNode.set(e.node.index,s)},i.prototype.setNodeMetaAttributes=function(e,i){for(var r=this._graphicsByNode.get(e.node.index),t=new Array(r.length),o=0;o<r.length;o++){var a=r[o];a.attributes=i(o,e),t[o]=a.uid}this._graphicsCore.updateLabelingInfo(t)},i.prototype.applyFilterChange=function(e){var i=this._graphicsByNode.get(e.node.index);if(i)if(n.isNone(e.filteredIds))for(var r=0,t=i;r<t.length;r++){(l=t[r]).visible||(l.visible=!0,b.graphic=l,b.property="visible",b.oldValue=!1,b.newValue=!0,this._graphicsCore.graphicUpdateHandler(b))}else for(var o=0,a=0,s=i;a<s.length;a++){var l,p=(l=s[a]).visible;o<e.filteredIds.length&&l.objectId===e.filteredIds[o]?(l.visible=!0,o++):l.visible=!1,p!==l.visible&&(b.graphic=l,b.property="visible",b.oldValue=p,b.newValue=l.visible,this._graphicsCore.graphicUpdateHandler(b))}},i.prototype.removeNodeMeta=function(e){this.loadedGraphics.removeManyByObjectId(e.featureIds)},i.prototype.getRenderingInfo=function(){return this._renderingInfo},i.prototype.notifyGraphicUpdate=function(){},Object.defineProperty(i.prototype,"usedMemory",{get:function(){return this._graphicsCore.usedMemory},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"unloadedMemoryEstimate",{get:function(){return this._graphicsCore.unprocessedMemoryEstimate},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"test",{get:function(){return{graphicsCore:this._graphicsCore}},enumerable:!1,configurable:!0}),r.__decorate([l.property()],i.prototype,"view",void 0),r.__decorate([l.property()],i.prototype,"layer",void 0),r.__decorate([l.property()],i.prototype,"collection",void 0),r.__decorate([l.property()],i.prototype,"loadedGraphics",void 0),r.__decorate([l.property({aliasOf:"_graphicsCore.updating"})],i.prototype,"updating",void 0),r.__decorate([l.property()],i.prototype,"slicePlaneEnabled",void 0),r.__decorate([l.property()],i.prototype,"_graphicsCore",void 0),i=r.__decorate([l.subclass("esri.views.3d.layers.I3SMeshViewLabeler")],i)}(a),b={graphic:null,property:null,oldValue:null,newValue:null},_=c.vec3f64.create();i.default=f}));