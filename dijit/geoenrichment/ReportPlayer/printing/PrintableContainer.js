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
// See http://js.arcgis.com/3.33/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/Deferred","esri/dijit/geoenrichment/when","dojo/dom-class","dojo/dom-construct","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/async/AsyncQueue","./_PrintSettingsSupport","../PlayerResizeModes","../PlayerViewModes","./VisualStateConverter","../core/supportClasses/DocumentOptions"],(function(e,t,n,i,o,r,a,l,s,u,c,d,g){return e(s,{domNode:null,_player:null,_viewModel:null,_initRollBackFunc:null,_pageSettingsRollBackFunc:null,_pageSettings:null,_pageFitParams:null,_headerFooterParams:null,_allowDataDrilling:!1,_allowFallbackMaps:!1,_splitPages:!1,_needAutoScale:!1,_commandId:null,constructor:function(e,t){this._player=e,this._viewModel=t,this.domNode=e.printableDiv},initialize:function(e){var t=this;return this._commandId=e.commandId,i(this._doInitialize(e),(function(){return i(t._checkPrintSettings(e),(function(e){return"cancel"===e?null:t}))}))},_doInitialize:function(e){var t=this;if(!this._player.isPlayerOnServer){var o,s,g,p={},_=this._player;_.playerToolbar&&_.playerToolbar.closePopup(),this._setAnimationSuspended(!0);var h=i(l.executeFunctions([function(){_.viewMode===c.PANELS_IN_STACK_ALL&&t.getAllReportContainers()[0].scrollToTop(),_.resizeMode===u.FIT_WINDOW?o=r.create("div",{innerHTML:_.domNode.innerHTML,class:"esriGEAbsoluteStretched esriGEReportPlayerPrintViewCopy"},_.printBackgroundView):(g=new n,e.onShowWaiting(g.promise))},function(){if(_.viewMode===c.PANELS_IN_STACK_ALL)t.getAllReportContainers()[0].setPrinted(!0);else if(_.viewMode!==c.FULL_PAGES){s=_.viewMode;var e=_.getVisualState();return _.viewMode=c.FULL_PAGES,i(_.refresh({waitUntilAllContentIsReady:!0}),(function(){return _.setVisualState(d.convertToFullPages(e,_.getReportData().templateJson))}))}},function(){return t._setPrintMode(!0),l.executeFunctions(t.getAllReportContainers().map((function(e,t){return function(){e.resetZoom&&e.resetZoom(),p[t]=e.getCurrentPageIndex&&e.getCurrentPageIndex(),e.showAllPages&&e.showAllPages(),e.collapseContent&&e.collapseContent()}})),0)},function(){a.hideNodeInBackground(t.domNode,"report-player-being-printed")}],0),(function(){return t._initRollBackFunc=m,_.getRenderPromise()}));return e.onShowWaiting(h),h}function m(){var n=l.executeFunctions([function(){o&&r.destroy(o),g&&g.resolve(),a.showNodeFromBackground(t.domNode)},function(){t.getAllReportContainers().forEach((function(e,t){e.showPageAt&&e.showPageAt(p[t])}))},function(){return _.viewMode===c.PANELS_IN_STACK_ALL&&t.getAllReportContainers()[0].setPrinted(!1),t._setPrintMode(!1),t._setAnimationSuspended(!1),_.resize()},function(){if(s)return _.viewMode=s,_.refresh({waitUntilAllContentIsReady:!1})}],0);return e.onShowWaiting(n),n}this._setPrintMode(!0)},_setPrintMode:function(e){o[e?"add":"remove"](this.domNode,"esriGEReportPlayerPrint esriGEReportPlayer "+(this._player.isPlayerOnServer?"isPlayerOnServer":"")),this._player.setPrintMode(e)},_animationAllowedMemo:void 0,_setAnimationSuspended:function(e){e?(this._animationAllowedMemo=this._viewModel.isAnimationAllowed(),this._viewModel.setAnimationAllowed(!1)):this._viewModel.setAnimationAllowed(this._animationAllowedMemo)},getViewMode:function(){return this._player.viewMode},getCurrentReportContainer:function(){return this._player.getCurrentReportContainer()},getAllReportContainers:function(){return this._player.getAllReportContainers()},getHeaderFooterParams:function(){return this._headerFooterParams},getDocumentOptions:function(){return t.mixin({},this.getCurrentReportContainer().documentOptions,this._pageSettings)},getFitParams:function(){return this._pageFitParams},setNewPageSize:function(e,t){this._pageSettings.pagesize=g.combineCustomSizeString(e,t,"px"),this._pageFitParams={w:e,h:t,hAlign:"center",vAlign:"top"}},getSelectedCommandId:function(){return this._commandId},allowDataDrilling:function(){return this._allowDataDrilling},allowFallbackMaps:function(){return this._allowFallbackMaps},splitPages:function(){return this._splitPages},needAutoScale:function(){return this._needAutoScale},getNumberOfPages:function(){return this.getCurrentReportContainer().getNumberOfPages()},stop:function(){if(!this._player.isPlayerOnServer){var e=this;return i(this._pageSettingsRollBackFunc&&this._pageSettingsRollBackFunc(),(function(){return i(e._initRollBackFunc&&e._initRollBackFunc())}))}}})}));