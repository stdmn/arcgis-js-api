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

define(["require","exports","tslib","../../../Graphic","../../../core/Error","../../../core/Logger","../../../core/maybe","../../../core/promiseUtils","../../../core/SetUtils","../../../core/accessorSupport/decorators","../../../core/sql/WhereClause","../../../layers/buildingSublayers/BuildingComponentSublayer","../../../layers/support/fieldUtils","../../../tasks/support/Query","./BuildingSublayerView3D","./I3SMeshView3D","./i3s/BuildingFilterUtil","./i3s/I3SGeometryUtil","./i3s/I3SQueryEngine","./i3s/I3SQueryFeatureAdapter","./i3s/I3SQueryFeatureStore","./i3s/I3SUtil","./support/DefinitionExpressionSceneLayerView","../../layers/BuildingComponentSublayerView","../../layers/support/popupUtils","../../support/Scheduler"],(function(e,r,t,i,s,n,o,a,u,l,p,d,y,c,f,h,b,g,F,_,v,E,x,S,w,m){"use strict";var Q=n.getLogger("esri.views.3d.layers.BuildingComponentSublayerView3D");return function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.layerView=null,r._elevationContext="scene",r._isIntegratedMesh=!1,r._supportsLabeling=!1,r.lodFactor=1,r.progressiveLoadFactor=1,r._queryEngine=null,r}return t.__extends(r,e),Object.defineProperty(r.prototype,"layerUid",{get:function(){return this.sublayer.layer.uid},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"sublayerUid",{get:function(){return this.sublayer.uid},enumerable:!1,configurable:!0}),r.prototype.initialize=function(){var e=this;this.updatingHandles.add(this,"sublayer.renderer,definitionExpressionFields,filterExpressionFields",(function(){return e._updateRequiredFields()})),this.updatingHandles.add(this.sublayer,"renderer",(function(r){return e._rendererChange(r)}),2),this.updatingHandles.add(this,"parsedDefinitionExpression",(function(){return e._filterChange()})),this.updatingHandles.add(this,"parsedFilterExpressions",(function(){return e._updateSymbologyOverride()}),2),this.addResolvingPromise(this._updateRequiredFields())},Object.defineProperty(r.prototype,"parsedFilterExpressions",{get:function(){var e=this;return"Overview"===this.sublayer.modelName?[]:this.layerView.filterExpressions.map((function(r){var t,i=r[0],s=r[1];try{t=p.WhereClause.create(i,e.sublayer.fieldsIndex)}catch(e){return Q.error("Failed to parse filterExpression: "+e),null}if(!t.isStandardized)return Q.error("filterExpression is using non standard function"),null;var n=[],o=t.fieldNames;return E.findFieldsCaseInsensitive(o,e.sublayer.fields,{missingFields:n}),n.length>0?(Q.error("filterExpression references unknown fields: "+n.join(", ")),null):[t,s]})).filter((function(e){return null!=e}))},enumerable:!1,configurable:!0}),r.prototype._updateSymbologyOverride=function(){var e=this,r=this.parsedFilterExpressions;r.length>0?this._setSymbologyOverride((function(t,i){for(var s=0,n=r;s<n.length;s++){var o=n[s],a=o[0],u=o[1];try{if(a.testFeature(t))return b.applyFilterMode(i,u)}catch(r){e.logError(r)}}return b.applyFilterMode(i,null)}),this.filterExpressionFields):this._setSymbologyOverride(null,null)},Object.defineProperty(r.prototype,"filterExpressionFields",{get:function(){return y.fixFields(this.sublayer.fields,this.parsedFilterExpressions.reduce((function(e,r){var t=r[0];return e.concat(t.fieldNames)}),[]))},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"availableFields",{get:function(){var e=this.sublayer,r=e.fields,i=this.requiredFields;if(e.outFields||e.layer.outFields){var s=t.__spreadArrays(e.outFields||[],e.layer.outFields||[]);i=t.__spreadArrays(y.unpackFieldNames(r,s),i)}return y.fixFields(r,i)},enumerable:!1,configurable:!0}),r.prototype._createLayerGraphic=function(e){var r=new i(null,null,e);return r.layer=this.sublayer.layer,r.sourceLayer=this.sublayer,r},r.prototype.canResume=function(){return e.prototype.canResume.call(this)&&(!this._controller||this._controller.rootNodeVisible)},r.prototype.fetchPopupFeatures=function(e,r){return t.__awaiter(this,void 0,void 0,(function(){var e,i,s,n,l,p,d,c,f,h;return t.__generator(this,(function(t){switch(t.label){case 0:return(e=this._validateFetchPopupFeatures(r))?[2,a.reject(e)]:o.isSome(r)&&r.clientGraphics&&0!==r.clientGraphics.length?(i=[],s=[],l=y.unpackFieldNames,p=[this.sublayer.fields],[4,w.getRequiredFields(this.sublayer,w.getFetchPopupTemplate(this.sublayer,r))]):[2,[]];case 1:for(n=l.apply(void 0,p.concat([t.sent()])),d=new Set,c=0,f=r.clientGraphics;c<f.length;c++)h=f[c],y.populateMissingFields(n,h,d)?s.push(h):i.push(h);return 0===s.length?[2,a.resolve(i)]:o.isSome(this.sublayer.associatedLayer)?[4,this.sublayer.associatedLayer.load().catch((function(){return Q.warn("Failed to load associated feature layer. Displaying popup attributes from cached attributes.")}))]:[3,3];case 2:t.sent(),t.label=3;case 3:return[2,this.whenGraphicAttributes(s,u.valuesOfSet(d)).catch((function(){return s})).then((function(e){return i.concat(e)}))]}}))}))},r.prototype._updateRequiredFields=function(){return t.__awaiter(this,void 0,void 0,(function(){var e,r,i,s;return t.__generator(this,(function(n){switch(n.label){case 0:return r=y.fixFields,i=[this.sublayer.fields],this.sublayer.renderer?[4,this.sublayer.renderer.getRequiredFields(this.sublayer.fields)]:[3,2];case 1:return s=n.sent(),[3,3];case 2:s=[],n.label=3;case 3:return e=r.apply(void 0,i.concat([t.__spreadArrays.apply(void 0,[s,this.definitionExpressionFields||[],this.filterExpressionFields||[]])])),this._set("requiredFields",e),[2]}}))}))},r.prototype._validateFetchPopupFeatures=function(e){var r=this.sublayer;return r.popupEnabled?w.getFetchPopupTemplate(r,e)?void 0:new s("buildingscenelayerview3d:fetchPopupFeatures","Layer does not define a popup template",{sublayer:r}):new s("buildingscenelayerview3d:fetchPopupFeatures","Popups are disabled",{sublayer:r})},r.prototype.getFilters=function(){var r=e.prototype.getFilters.call(this);return this.addSqlFilter(r,this.parsedDefinitionExpression,this.definitionExpressionFields,this.logError),r},r.prototype.createQuery=function(){return new c({outFields:["*"],returnGeometry:!1,outSpatialReference:this.view.spatialReference})},r.prototype.queryExtent=function(e){return this._ensureQueryEngine().executeQueryForExtent(this._ensureQuery(e))},r.prototype.queryFeatureCount=function(e){return this._ensureQueryEngine().executeQueryForCount(this._ensureQuery(e))},r.prototype.queryFeatures=function(e){var r=this;return this._ensureQueryEngine().executeQuery(this._ensureQuery(e)).then((function(e){if(!(null==e?void 0:e.features))return e;for(var t=r.sublayer,i=t.layer,s=0,n=e.features;s<n.length;s++){var o=n[s];o.layer=i,o.sourceLayer=t}return e}))},r.prototype.queryObjectIds=function(e){return this._ensureQueryEngine().executeQueryForIds(this._ensureQuery(e))},r.prototype._ensureQueryEngine=function(){return o.isNone(this._queryEngine)&&(this._queryEngine=this._createQueryEngine()),this._queryEngine},r.prototype._createQueryEngine=function(){var e=this,r=g.createGetFeatureExtent(this.view.spatialReference,this.view.renderSpatialReference,this._collection);return new F.default({layerView:this,task:m.Task.FEATURE_QUERY_ENGINE,spatialIndex:new v.default({featureAdapter:new _.I3SQueryFeatureAdapter({objectIdField:this.sublayer.objectIdField,attributeStorageInfo:this.sublayer.attributeStorageInfo,getFeatureExtent:r}),forAllFeatures:function(r,t){return e._forAllFeatures((function(e,t,i){return r({id:e,index:t,meta:i})}),t,2)},getFeatureExtent:r,sourceSpatialReference:E.getIndexCrs(this.sublayer),viewSpatialReference:this.view.spatialReference})})},r.prototype._ensureQuery=function(e){return this._addDefinitionExpressionToQuery(o.isNone(e)?this.createQuery():c.from(e))},t.__decorate([l.property({aliasOf:"sublayer"})],r.prototype,"i3slayer",void 0),t.__decorate([l.property()],r.prototype,"layerView",void 0),t.__decorate([l.property({dependsOn:["_controller.rootNodeVisible"]})],r.prototype,"suspended",void 0),t.__decorate([l.property({readOnly:!0,aliasOf:"view.qualitySettings.sceneService.3dObject.lodFactor"})],r.prototype,"lodFactor",void 0),t.__decorate([l.property({readOnly:!0,dependsOn:["layerView.filterExpressions","sublayer.fieldsIndex"]})],r.prototype,"parsedFilterExpressions",null),t.__decorate([l.property({type:[String],readOnly:!0,dependsOn:["parsedFilterExpressions"]})],r.prototype,"filterExpressionFields",null),t.__decorate([l.property({type:[String],readOnly:!0})],r.prototype,"requiredFields",void 0),t.__decorate([l.property({type:[String],readOnly:!0,dependsOn:["sublayer.outFields","sublayer.layer.outFields","requiredFields"]})],r.prototype,"availableFields",null),r=t.__decorate([l.subclass("esri.views.3d.layers.BuildingComponentSublayerView3D")],r)}(x.DefinitionExpressionSceneLayerView(h.I3SMeshView3D(f.BuildingSublayerView3DMixin(S,d))))}));