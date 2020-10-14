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

define(["require","exports","tslib","../../../../core/compilerUtils","../../../../core/promiseUtils","../../../../core/string","../../../../core/urlUtils","../../../../core/urlUtils","../../../../core/Version","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/quat","../../../../core/libs/gl-matrix-2/quatf64","./BinaryStreamReader","./fillDefaults","./pathUtils","../../support/buffer/BufferView","../../support/buffer/utils"],(function(e,t,r,n,o,s,i,a,u,c,f,p,d,l,h,b,m,y){"use strict";var w;Object.defineProperty(t,"__esModule",{value:!0}),t.Resource=void 0;var x=1179937895,v=1313821514,T=5130562,O=function(){function e(e,t,r,n,o){this.context=e,this.errorContext=t,this.uri=r,this.json=n,this.glbBuffer=o,this.bufferCache=new Map,this.textureCache=new Map,this.materialCache=new Map,this.nodeParentMap=new Map,this.nodeTransformCache=new Map,this.baseUri=b.splitURI(this.uri).dirPart,this.checkVersionSupported(),this.checkRequiredExtensionsSupported(),t.errorUnsupportedIf(null==n.scenes,"Scenes must be defined."),t.errorUnsupportedIf(null==n.meshes,"Meshes must be defined"),t.errorUnsupportedIf(null==n.nodes,"Nodes must be defined."),this.computeNodeParents()}return e.load=function(t,n,o,i){return r.__awaiter(this,void 0,void 0,(function(){var u,c,f,p,d,l;return r.__generator(this,(function(r){switch(r.label){case 0:if(a.isDataProtocol(o)){if("model/gltf-binary"!==(u=a.dataComponents(o)).mediaType)try{return c=JSON.parse(u.isBase64?atob(u.data):u.data),[2,new e(t,n,o,c)]}catch(e){}if(f=a.dataToArrayBuffer(o),e.isGLBData(f))return[2,this.fromGLBData(t,n,o,f)]}return s.endsWith(o,".gltf")?[4,t.loadJSON(o,i)]:[3,2];case 1:return p=r.sent(),[2,new e(t,n,o,p)];case 2:return[4,t.loadBinary(o,i)];case 3:return d=r.sent(),e.isGLBData(d)?[2,this.fromGLBData(t,n,o,d)]:[4,t.loadJSON(o,i)];case 4:return l=r.sent(),[2,new e(t,n,o,l)]}}))}))},e.isGLBData=function(e){var t=new l.BinaryStreamReader(e);return t.remainingBytes()>=4&&t.readUint32()===x},e.fromGLBData=function(t,n,o,s){return r.__awaiter(this,void 0,void 0,(function(){var i;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,e.parseGLBData(n,s)];case 1:return i=r.sent(),[2,new e(t,n,o,i.json,i.binaryData)]}}))}))},e.parseGLBData=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o,s,i,a,u,c,f,p;return r.__generator(this,(function(r){switch(r.label){case 0:n=new l.BinaryStreamReader(t),e.assert(n.remainingBytes()>=12,"GLB binary data is insufficiently large."),o=n.readUint32(),s=n.readUint32(),i=n.readUint32(),e.assert(o===x,"Magic first 4 bytes do not fit to expected GLB value."),e.assert(t.byteLength>=i,"GLB binary data is smaller than header specifies."),e.errorUnsupportedIf(2!==s,"An unsupported GLB container version was detected. Only version 2 is supported."),a=0,r.label=1;case 1:return n.remainingBytes()>=8?(f=n.readUint32(),p=n.readUint32(),0!==a?[3,3]:(e.assert(p===v,"First GLB chunk must be JSON."),e.assert(f>=0,"No JSON data found."),[4,A(n.readUint8Array(f))])):[3,5];case 2:return u=r.sent(),[3,4];case 3:1===a?(e.errorUnsupportedIf(p!==T,"Second GLB chunk expected to be BIN."),c=n.readUint8Array(f)):e.warnUnsupported("More than 2 GLB chunks detected. Skipping."),r.label=4;case 4:return a+=1,[3,1];case 5:return u||e.error("No GLB JSON chunk detected."),[2,{json:u,binaryData:c}]}}))}))},e.prototype.getBuffer=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o,s,i;return r.__generator(this,(function(r){switch(r.label){case 0:return n=this.json.buffers[e],o=this.errorContext,null==n.uri?(o.assert(null!=this.glbBuffer,"GLB buffer not present"),[2,this.glbBuffer]):(s=this.bufferCache.get(e))?[3,2]:[4,this.context.loadBinary(this.resolveUri(n.uri),t)];case 1:i=r.sent(),s=new Uint8Array(i),this.bufferCache.set(e,s),o.assert(s.byteLength===n.byteLength,"Buffer byte lengths should match."),r.label=2;case 2:return[2,s]}}))}))},e.prototype.getAccessor=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o,s,i,a,u,c,f;return r.__generator(this,(function(r){switch(r.label){case 0:return n=this.json.accessors[e],(o=this.errorContext).errorUnsupportedIf(null==n.bufferView,"Some accessor does not specify a bufferView."),o.errorUnsupportedIf(n.type in["MAT2","MAT3","MAT4"],"AttributeType "+n.type+" is not supported"),s=this.json.bufferViews[n.bufferView],[4,this.getBuffer(s.buffer,t)];case 1:return i=r.sent(),a=U[n.type],u=B[n.componentType],c=a*u,f=s.byteStride||c,[2,{raw:i.buffer,byteStride:f,byteOffset:i.byteOffset+(s.byteOffset||0)+(n.byteOffset||0),entryCount:n.count,isDenselyPacked:f===c,componentCount:a,componentByteSize:u,componentType:n.componentType,min:n.min,max:n.max,normalized:!!n.normalized}]}}))}))},e.prototype.getIndexData=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n;return r.__generator(this,(function(r){switch(r.label){case 0:return null==e.indices?[2,null]:[4,this.getAccessor(e.indices,t)];case 1:if((n=r.sent()).isDenselyPacked)switch(n.componentType){case 5121:return[2,new Uint8Array(n.raw,n.byteOffset,n.entryCount)];case 5123:return[2,new Uint16Array(n.raw,n.byteOffset,n.entryCount)];case 5125:return[2,new Uint32Array(n.raw,n.byteOffset,n.entryCount)]}else switch(n.componentType){case 5121:return[2,y.scalar.makeDense(this.wrapAccessor(m.BufferViewUint8,n))];case 5123:return[2,y.scalar.makeDense(this.wrapAccessor(m.BufferViewUint16,n))];case 5125:return[2,y.scalar.makeDense(this.wrapAccessor(m.BufferViewUint32,n))]}return[2,void 0]}}))}))},e.prototype.getPositionData=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o;return r.__generator(this,(function(r){switch(r.label){case 0:return(n=this.errorContext).errorUnsupportedIf(null==e.attributes.POSITION,"No POSITION vertex data found."),[4,this.getAccessor(e.attributes.POSITION,t)];case 1:return o=r.sent(),n.errorUnsupportedIf(5126!==o.componentType,"Expected type FLOAT for POSITION vertex attribute, but found "+R[o.componentType]),n.errorUnsupportedIf(3!==o.componentCount,"POSITION vertex attribute must have 3 components, but found "+o.componentCount.toFixed()),[2,this.wrapAccessor(m.BufferViewVec3f,o)]}}))}))},e.prototype.getNormalData=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o;return r.__generator(this,(function(r){switch(r.label){case 0:return(n=this.errorContext).assert(null!=e.attributes.NORMAL,"No NORMAL vertex data found."),[4,this.getAccessor(e.attributes.NORMAL,t)];case 1:return o=r.sent(),n.errorUnsupportedIf(5126!==o.componentType,"Expected type FLOAT for NORMAL vertex attribute, but found "+R[o.componentType]),n.errorUnsupportedIf(3!==o.componentCount,"NORMAL vertex attribute must have 3 components, but found "+o.componentCount.toFixed()),[2,this.wrapAccessor(m.BufferViewVec3f,o)]}}))}))},e.prototype.getTangentData=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o;return r.__generator(this,(function(r){switch(r.label){case 0:return(n=this.errorContext).assert(null!=e.attributes.TANGENT,"No TANGENT vertex data found."),[4,this.getAccessor(e.attributes.TANGENT,t)];case 1:return o=r.sent(),n.errorUnsupportedIf(5126!==o.componentType,"Expected type FLOAT for TANGENT vertex attribute, but found "+R[o.componentType]),n.errorUnsupportedIf(4!==o.componentCount,"TANGENT vertex attribute must have 4 components, but found "+o.componentCount.toFixed()),[2,new m.BufferViewVec4f(o.raw,o.byteOffset,o.byteStride,o.byteOffset+o.byteStride*o.entryCount)]}}))}))},e.prototype.getTextureCoordinates=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o;return r.__generator(this,(function(r){switch(r.label){case 0:return(n=this.errorContext).assert(null!=e.attributes.TEXCOORD_0,"No TEXCOORD_0 vertex data found."),[4,this.getAccessor(e.attributes.TEXCOORD_0,t)];case 1:return o=r.sent(),n.errorUnsupportedIf(2!==o.componentCount,"TEXCOORD_0 vertex attribute must have 2 components, but found "+o.componentCount.toFixed()),5126===o.componentType?[2,this.wrapAccessor(m.BufferViewVec2f,o)]:(n.errorUnsupportedIf(!o.normalized,"Integer component types are only supported for a normalized accessor for TEXCOORD_0."),[2,S(o)])}}))}))},e.prototype.getVertexColors=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o;return r.__generator(this,(function(r){switch(r.label){case 0:return(n=this.errorContext).assert(null!=e.attributes.COLOR_0,"No COLOR_0 vertex data found."),[4,this.getAccessor(e.attributes.COLOR_0,t)];case 1:if(o=r.sent(),n.errorUnsupportedIf(4!==o.componentCount&&3!==o.componentCount,"COLOR_0 attribute must have 3 or 4 components, but found "+o.componentCount.toFixed()),4===o.componentCount){if(5126===o.componentType)return[2,this.wrapAccessor(m.BufferViewVec4f,o)];if(5121===o.componentType)return[2,this.wrapAccessor(m.BufferViewVec4u8,o)];if(5123===o.componentType)return[2,this.wrapAccessor(m.BufferViewVec4u16,o)]}else if(3===o.componentCount){if(5126===o.componentType)return[2,this.wrapAccessor(m.BufferViewVec3f,o)];if(5121===o.componentType)return[2,this.wrapAccessor(m.BufferViewVec3u8,o)];if(5123===o.componentType)return[2,this.wrapAccessor(m.BufferViewVec3u16,o)]}return n.errorUnsupported("Unsupported component type for COLOR_0 attribute: "+R[o.componentType]),[2,void 0]}}))}))},e.prototype.hasPositions=function(e){return void 0!==e.attributes.POSITION},e.prototype.hasNormals=function(e){return void 0!==e.attributes.NORMAL},e.prototype.hasVertexColors=function(e){return void 0!==e.attributes.COLOR_0},e.prototype.hasTextureCoordinates=function(e){return void 0!==e.attributes.TEXCOORD_0},e.prototype.hasTangents=function(e){return void 0!==e.attributes.TANGENT},e.prototype.getMaterial=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o,s,i,a,u,c,f,p,d,l;return r.__generator(this,(function(r){switch(r.label){case 0:return n=this.errorContext,(o=this.materialCache.get(e.material))?[3,15]:(s=null!=e.material?h.material(this.json.materials[e.material]):h.material(),i=s.pbrMetallicRoughness,a=this.hasVertexColors(e),u=void 0,i.baseColorTexture?(n.errorUnsupportedIf(0!==(i.baseColorTexture.texCoord||0),"Only TEXCOORD with index 0 is supported."),[4,this.getTexture(i.baseColorTexture.index,t)]):[3,2]);case 1:u=r.sent(),r.label=2;case 2:return c=void 0,s.normalTexture?0===(s.normalTexture.texCoord||0)?[3,3]:(n.warnUnsupported("Only TEXCOORD with index 0 is supported for the normal map texture."),[3,5]):[3,5];case 3:return[4,this.getTexture(s.normalTexture.index,t)];case 4:c=r.sent(),r.label=5;case 5:return f=void 0,s.occlusionTexture?0===(s.occlusionTexture.texCoord||0)?[3,6]:(n.warnUnsupported("Only TEXCOORD with index 0 is supported for the occlusion texture."),[3,8]):[3,8];case 6:return[4,this.getTexture(s.occlusionTexture.index,t)];case 7:f=r.sent(),r.label=8;case 8:return p=void 0,s.emissiveTexture?0===(s.emissiveTexture.texCoord||0)?[3,9]:(n.warnUnsupported("Only TEXCOORD with index 0 is supported for the emissive texture."),[3,11]):[3,11];case 9:return[4,this.getTexture(s.emissiveTexture.index,t)];case 10:p=r.sent(),r.label=11;case 11:return d=void 0,i.metallicRoughnessTexture?0===(i.metallicRoughnessTexture.texCoord||0)?[3,12]:(n.warnUnsupported("Only TEXCOORD with index 0 is supported for the metallicRoughness texture."),[3,14]):[3,14];case 12:return[4,this.getTexture(i.metallicRoughnessTexture.index,t)];case 13:d=r.sent(),r.label=14;case 14:l=null!=e.material?e.material:-1,o={alphaMode:s.alphaMode,alphaCutoff:s.alphaCutoff,color:i.baseColorFactor,doubleSided:!!s.doubleSided,colorTexture:u,normalTexture:c,name:s.name,id:l,occlusionTexture:f,emissiveTexture:p,emissiveFactor:s.emissiveFactor,metallicFactor:i.metallicFactor,roughnessFactor:i.roughnessFactor,metallicRoughnessTexture:d,vertexColors:a,ESRI_externalColorMixMode:s.extras.ESRI_externalColorMixMode},r.label=15;case 15:return[2,o]}}))}))},e.prototype.getTexture=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,o,s,i,a,u,c,f;return r.__generator(this,(function(r){switch(r.label){case 0:return n=this.errorContext,o=this.json.textures[e],s=h.textureSampler(null!=o.sampler?this.json.samplers[o.sampler]:{}),n.errorUnsupportedIf(null==o.source,"Source is expected to be defined for a texture."),i=this.json.images[o.source],(a=this.textureCache.get(e))?[3,6]:(u=void 0,i.uri?[4,this.context.loadImage(this.resolveUri(i.uri),t)]:[3,2]);case 1:return u=r.sent(),[3,5];case 2:return n.errorUnsupportedIf(null==i.bufferView,"Image bufferView must be defined."),n.errorUnsupportedIf(null==i.mimeType,"Image mimeType must be defined."),c=this.json.bufferViews[i.bufferView],[4,this.getBuffer(c.buffer,t)];case 3:return f=r.sent(),n.errorUnsupportedIf(null!=c.byteStride,"byteStride not supported for image buffer"),[4,N(new Uint8Array(f.buffer,f.byteOffset+(c.byteOffset||0),c.byteLength),i.mimeType)];case 4:u=r.sent(),r.label=5;case 5:a={data:u,wrapS:s.wrapS,wrapT:s.wrapT,minFilter:s.minFilter,name:i.name,id:e},this.textureCache.set(e,a),r.label=6;case 6:return[2,a]}}))}))},e.prototype.getNodeTransform=function(e){if(void 0===e)return C;var t=this.nodeTransformCache.get(e);if(!t){var r=this.getNodeTransform(this.getNodeParent(e)),n=this.json.nodes[e];n.matrix?t=c.mat4.multiply(f.mat4f64.create(),r,n.matrix):n.translation||n.rotation||n.scale?(t=f.mat4f64.clone(r),n.translation&&c.mat4.translate(t,t,n.translation),n.rotation&&(_[3]=p.quat.getAxisAngle(_,n.rotation),c.mat4.rotate(t,t,_[3],_)),n.scale&&c.mat4.scale(t,t,n.scale)):t=r,this.nodeTransformCache.set(e,t)}return t},e.prototype.wrapAccessor=function(e,t){return new e(t.raw,t.byteOffset,t.byteStride,t.byteOffset+t.byteStride*(t.entryCount-1)+t.componentByteSize*t.componentCount)},e.prototype.resolveUri=function(e){return i.makeAbsolute(e,this.baseUri)},e.prototype.getNodeParent=function(e){return this.nodeParentMap.get(e)},e.prototype.checkVersionSupported=function(){var e=u.Version.parse(this.json.asset.version,"glTF");g.validate(e)},e.prototype.checkRequiredExtensionsSupported=function(){var e=this.json,t=this.errorContext;e.extensionsRequired&&0!==e.extensionsRequired.length&&t.errorUnsupported("gltf loader was not able to load unsupported feature. Required extensions: "+e.extensionsRequired.join(", "))},e.prototype.computeNodeParents=function(){var e=this;this.json.nodes.forEach((function(t,r){t.children&&t.children.forEach((function(t){e.nodeParentMap.set(t,r)}))}))},e}();t.Resource=O;var g=new u.Version(2,0,"glTF"),C=c.mat4.fromXRotation(f.mat4f64.create(),Math.PI/2),_=d.quatf64.create(),U={SCALAR:1,VEC2:2,VEC3:3,VEC4:4},B=((w={})[5120]=1,w[5121]=1,w[5122]=2,w[5123]=2,w[5126]=4,w[5125]=4,w);function S(e){switch(e.componentType){case 5120:return new m.BufferViewVec2i8(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5121:return new m.BufferViewVec2u8(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5122:return new m.BufferViewVec2i16(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5123:return new m.BufferViewVec2u16(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5125:return new m.BufferViewVec2u32(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);case 5126:return new m.BufferViewVec2f(e.raw,e.byteOffset,e.byteStride,e.byteOffset+e.byteStride*e.entryCount);default:return void n.neverReached(e.componentType)}}function A(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){return[2,o.create((function(t,r){var n=new Blob([e]),o=new FileReader;o.onload=function(){var e=o.result;t(JSON.parse(e))},o.onerror=function(e){r(e)},o.readAsText(n)}))]}))}))}function N(e,t){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){return[2,o.create((function(r,n){var o=new Blob([e],{type:t}),s=URL.createObjectURL(o),i=new Image;i.addEventListener("load",(function(){URL.revokeObjectURL(s),"decode"in i?i.decode().then((function(){return r(i)}),(function(){return r(i)})):r(i)})),i.addEventListener("error",(function(e){URL.revokeObjectURL(s),n(e)})),i.src=s}))]}))}))}var R={5120:"BYTE",5121:"UNSIGNED_BYTE",5122:"SHORT",5123:"UNSIGNED_SHORT",5125:"UNSIGNED_INT",5126:"FLOAT"}}));