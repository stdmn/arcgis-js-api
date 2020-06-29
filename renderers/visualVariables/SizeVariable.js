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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/assignHelper","../../core/Error","../../core/jsonMap","../../core/Logger","../../core/screenUtils","../../core/accessorSupport/decorators","./VisualVariable","./support/SizeStop","./support/SizeVariableLegendOptions","./support/sizeVariableUtils","./support/visualVariableUtils"],(function(e,t,i,r,n,a,o,s,p,l,u,y,c,d,m){var h=s.getLogger("esri.renderers.visualVariables.SizeVariable"),f=new o.default({width:"width",depth:"depth",height:"height",widthAndDepth:"width-and-depth",all:"all"}),S=new o.default({unknown:"unknown",inch:"inches",foot:"feet",yard:"yards",mile:"miles","nautical-mile":"nautical-miles",millimeter:"millimeters",centimeter:"centimeters",decimeter:"decimeters",meter:"meters",kilometer:"kilometers","decimal-degree":"decimal-degrees"});function x(e){if(null!=e)return"string"==typeof e||"number"==typeof e?p.toPt(e):"size"===e.type?d.isSizeVariable(e)?e:(delete(e=n({},e)).type,new z(e)):void 0}function v(e,t,i){if("object"!=typeof e)return e;var r=new z;return r.read(e,i),r}var z=function(e){function t(t){var i=e.call(this,t)||this;return i.axis=null,i.legendOptions=null,i.normalizationField=null,i.scaleBy=null,i.target=null,i.type="size",i.useSymbolValue=null,i.valueExpression=null,i.valueRepresentation=null,i.valueUnit=null,i}var n;return i(t,e),n=t,Object.defineProperty(t.prototype,"cache",{get:function(){return{ipData:this._interpolateData(),hasExpression:!!this.valueExpression,compiledFunc:null,isScaleDriven:m.viewScaleRE.test(this.valueExpression)}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"expression",{set:function(e){h.warn("'expression' is deprecated since version 4.2. Use 'valueExpression' instead. The only supported expression is 'view.scale'."),"view.scale"===e?(this.valueExpression="$view.scale",this._set("expression",e)):this._set("expression",null)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"index",{set:function(e){d.isSizeVariable(this.maxSize)&&(this.maxSize.index="visualVariables["+e+"].maxSize"),d.isSizeVariable(this.minSize)&&(this.minSize.index="visualVariables["+e+"].minSize"),this._set("index",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inputValueType",{get:function(){return d.getInputValueType(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxDataValue",{set:function(e){e&&this.stops&&(h.warn("cannot set maxDataValue when stops is not null."),e=null),this._set("maxDataValue",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxSize",{set:function(e){e&&this.stops&&(h.warn("cannot set maxSize when stops is not null."),e=null),this._set("maxSize",e)},enumerable:!0,configurable:!0}),t.prototype.castMaxSize=function(e){return x(e)},t.prototype.readMaxSize=function(e,t,i){return v(e,0,i)},Object.defineProperty(t.prototype,"minDataValue",{set:function(e){e&&this.stops&&(h.warn("cannot set minDataValue when stops is not null."),e=null),this._set("minDataValue",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"minSize",{set:function(e){e&&this.stops&&(h.warn("cannot set minSize when stops is not null."),e=null),this._set("minSize",e)},enumerable:!0,configurable:!0}),t.prototype.castMinSize=function(e){return x(e)},t.prototype.readMinSize=function(e,t,i){return v(e,0,i)},Object.defineProperty(t.prototype,"arcadeRequired",{get:function(){return!!this.valueExpression||(this.minSize&&"object"==typeof this.minSize&&this.minSize.arcadeRequired||this.maxSize&&"object"==typeof this.maxSize&&this.maxSize.arcadeRequired)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"stops",{set:function(e){null==this.minDataValue&&null==this.maxDataValue&&null==this.minSize&&null==this.maxSize?e&&Array.isArray(e)&&(e=e.filter((function(e){return!!e}))).sort((function(e,t){return e.value-t.value})):e&&(h.warn("cannot set stops when one of minDataValue, maxDataValue, minSize or maxSize is not null."),e=null),this._set("stops",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"transformationType",{get:function(){return d.getTransformationType(this,this.inputValueType)},enumerable:!0,configurable:!0}),t.prototype.readValueExpression=function(e,t){return e||t.expression&&"$view.scale"},t.prototype.writeValueExpressionWebScene=function(e,t,i,r){if("$view.scale"===e){if(r&&r.messages){var n=this.index,o="string"==typeof n?n:"visualVariables["+n+"]";r.messages.push(new a("property:unsupported",this.type+"VisualVariable.valueExpression = '$view.scale' is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:o+".valueExpression",context:r}))}}else t[i]=e},t.prototype.readValueUnit=function(e){return e?S.read(e):null},t.prototype.clone=function(){return new n({axis:this.axis,field:this.field,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,maxDataValue:this.maxDataValue,maxSize:d.isSizeVariable(this.maxSize)?this.maxSize.clone():this.maxSize,minDataValue:this.minDataValue,minSize:d.isSizeVariable(this.minSize)?this.minSize.clone():this.minSize,normalizationField:this.normalizationField,stops:this.stops&&this.stops.map((function(e){return e.clone()})),target:this.target,useSymbolValue:this.useSymbolValue,valueRepresentation:this.valueRepresentation,valueUnit:this.valueUnit,legendOptions:this.legendOptions&&this.legendOptions.clone()})},t.prototype.flipSizes=function(){if("clamped-linear"===this.transformationType){var e=this.minSize,t=this.maxSize;return this.minSize=t,this.maxSize=e,this}if("stops"===this.transformationType){for(var i=this.stops,r=i.map((function(e){return e.size})).reverse(),n=i.length,a=0;a<n;a++)i[a].size=r[a];return this}return this},t.prototype.getAttributeHash=function(){return this.inherited(arguments)+"-"+this.target+"-"+this.normalizationField},t.prototype._interpolateData=function(){return this.stops&&this.stops.map((function(e){return e.value||0}))},r([l.property({readOnly:!0,dependsOn:["valueExpression","stops"]})],t.prototype,"cache",null),r([l.property({type:f.apiValues,json:{type:f.jsonValues,origins:{"web-map":{read:!1}},read:f.read,write:f.write}})],t.prototype,"axis",void 0),r([l.property({type:String,value:null,json:{read:!1}})],t.prototype,"expression",null),r([l.property()],t.prototype,"index",null),r([l.property({type:String,readOnly:!0,dependsOn:["field","valueExpression"]})],t.prototype,"inputValueType",null),r([l.property({type:c,json:{write:!0}})],t.prototype,"legendOptions",void 0),r([l.property({type:Number,value:null,json:{write:!0}})],t.prototype,"maxDataValue",null),r([l.property({type:Number,value:null,json:{write:!0}})],t.prototype,"maxSize",null),r([l.cast("maxSize")],t.prototype,"castMaxSize",null),r([l.reader("maxSize")],t.prototype,"readMaxSize",null),r([l.property({type:Number,value:null,json:{write:!0}})],t.prototype,"minDataValue",null),r([l.property({type:Number,value:null,json:{write:!0}})],t.prototype,"minSize",null),r([l.cast("minSize")],t.prototype,"castMinSize",null),r([l.reader("minSize")],t.prototype,"readMinSize",null),r([l.property({type:String,json:{write:!0}})],t.prototype,"normalizationField",void 0),r([l.property({readOnly:!0,dependsOn:["valueExpression","minSize.arcadeRequired","maxSize.arcadeRequired"]})],t.prototype,"arcadeRequired",null),r([l.property({type:String})],t.prototype,"scaleBy",void 0),r([l.property({type:[y],value:null,json:{write:!0}})],t.prototype,"stops",null),r([l.property({type:["outline"],json:{write:!0}})],t.prototype,"target",void 0),r([l.property({type:String,readOnly:!0,dependsOn:["minDataValue","maxDataValue","minSize","maxSize","valueUnit","inputValueType","stops"]})],t.prototype,"transformationType",null),r([l.property({type:["size"],json:{type:["sizeInfo"]}})],t.prototype,"type",void 0),r([l.property({type:Boolean,json:{write:!0,origins:{"web-map":{read:!1}}}})],t.prototype,"useSymbolValue",void 0),r([l.property({type:String,json:{write:!0}})],t.prototype,"valueExpression",void 0),r([l.reader("valueExpression",["valueExpression","expression"])],t.prototype,"readValueExpression",null),r([l.writer("web-scene","valueExpression")],t.prototype,"writeValueExpressionWebScene",null),r([l.property({type:["radius","diameter","area","width","distance"],json:{write:!0}})],t.prototype,"valueRepresentation",void 0),r([l.property({type:S.apiValues,json:{write:S.write,origins:{"web-map":{read:!1},"web-scene":{write:!0}}}})],t.prototype,"valueUnit",void 0),r([l.reader("valueUnit")],t.prototype,"readValueUnit",null),t=n=r([l.subclass("esri.renderers.visualVariables.SizeVariable")],t)}(l.declared(u));return z}));