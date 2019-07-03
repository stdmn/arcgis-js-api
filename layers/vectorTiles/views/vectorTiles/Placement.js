// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.29/esri/copyright.txt for details.

define(["require","exports","../2d/engine/webgl/Geometry","./Conflict","./GeometryUtils"],function(t,e,n,i,o){Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,n,i,o){void 0===n&&(n=0),void 0===i&&(i=-1),void 0===o&&(o=s),this.x=t,this.y=e,this.angle=n,this.segment=i,this.minzoom=o}return t}();e.Anchor=r;var a=function(){function t(t,e,n,i,r,a,l){void 0===r&&(r=!1),void 0===a&&(a=s),void 0===l&&(l=o.C_INFINITY),this.anchor=t,this.labelAngle=e,this.glyphAngle=n,this.page=i,this.upsideDown=r,this.minzoom=a,this.maxzoom=l}return t}(),l=function(){function t(t,e,n,i,o,r,a,l,h,s){this.tl=t,this.tr=e,this.bl=n,this.br=i,this.mosaicRect=o,this.labelAngle=r,this.anchor=a,this.minzoom=l,this.maxzoom=h,this.page=s}return t}();e.PlacedSymbol=l;var h=function(){function t(t,e){this.footprint=t,this.shapes=e}return t}();e.Placement=h;var s=.5,c=function(){function t(){this.mapAngle=0,this._conflictEngine=new i.ConflictEngine}return t.prototype.reset=function(){this._conflictEngine.reset()},t.prototype.setAngle=function(t){this.mapAngle=t,this._conflictEngine.setAngle(t)},t.prototype.getIconPlacement=function(t,e,r,a,c,g,p){var m=r.width/r.pixelRatio,f=r.height/r.pixelRatio,u=g.offset[0]-m/2,I=g.offset[1]-f/2,d=u+m,_=I+f,w=r.rect,x=r.sdf?17:2,y=x,v=u-y,N=I-y,P=v+w.width/r.pixelRatio,A=N+w.height/r.pixelRatio,E=new n.Point(v,N),T=new n.Point(P,A),b=new n.Point(v,A),C=new n.Point(P,N),M=g.rotate*o.C_DEG_TO_RAD,z=1===g.rotationAlignment;if(t.segment>=0&&!z&&(M+=t.angle),0!==M){var F=Math.cos(M),Y=Math.sin(M);E.rotate(F,Y),T.rotate(F,Y),b.rotate(F,Y),C.rotate(F,Y)}var B=8*g.padding,G=new n.Point(t.x,t.y),O=new i.Footprint(this.mapAngle,B,z);O.addBox(G,new i.Box(u,I,d,_),a,M,e,s,o.C_INFINITY);var R=new l(E,C,b,T,w,0,G,s,o.C_INFINITY,0),D=new h(O,[R]),q=s;return g.allowOverlap||(q=this._conflictEngine.getMinZoom(D.footprint,q,p,z)),O.minzoom=q,D},t.prototype.getTextPlacement=function(t,e,r,c,g,p,m,f){for(var u,I=new n.Point(t.x,t.y),d=m.rotate*o.C_DEG_TO_RAD,_=0===m.rotationAlignment,w=m.keepUpright,x=s,y=!_,v=y?0:t.angle,N=t.segment>=0&&_,P=8*m.padding,A=new i.Footprint(this.mapAngle,P,y),E=[],T=!N,b=Number.POSITIVE_INFINITY,C=Number.NEGATIVE_INFINITY,M=b,z=C,F=N?w:_&&w,Y=0,B=c;Y<B.length;Y++){var G=B[Y],O=G.glyphMosaicItem;if(O&&!O.rect.isEmpty){var R=O.rect,D=O.metrics,q=O.page;T&&(u&&u!==G.y&&(A.addBox(I,new i.Box(b,M,C,z),g,d,e,s,o.C_INFINITY),b=Number.POSITIVE_INFINITY,C=Number.NEGATIVE_INFINITY,M=b,z=C),u=G.y);var V=[];if(N){var S=.5*O.metrics.width,k=(r.x+G.x+D.left-4+S)*g;if(x=this._placeGlyph(t,x,k,p,t.segment,1,q,V),w&&(x=this._placeGlyph(t,x,k,p,t.segment,-1,q,V)),x>=2)break}else V.push(new a(I,v,v,q)),_&&w&&V.push(new a(I,v+o.C_PI,v+o.C_PI,q,!0));for(var U=G.x+r.x+D.left,Z=G.y+r.y-D.top,j=U+D.width,H=Z+D.height,J=new n.Point(U-4,Z-4),K=new n.Point(J.x+R.width,J.y+R.height),L=new n.Point(J.x,K.y),Q=new n.Point(K.x,J.y),W=0,X=V;W<X.length;W++){var $=X[W],tt=J.clone(),et=L.clone(),nt=Q.clone(),it=K.clone(),ot=Z,rt=H,at=$.glyphAngle+d;if(0!==at){var lt=Math.cos(at),ht=Math.sin(at);tt.rotate(lt,ht),it.rotate(lt,ht),et.rotate(lt,ht),nt.rotate(lt,ht)}E.push(new l(tt,nt,et,it,R,$.labelAngle,$.anchor,$.minzoom,$.maxzoom,$.page)),F&&!this._legible($.labelAngle)||(T?(U<b&&(b=U),ot<M&&(M=ot),j>C&&(C=j),rt>z&&(z=rt)):$.minzoom<2&&A.addBox($.anchor,new i.Box(U,ot,j,rt),g,at,e,$.minzoom,$.maxzoom))}}}if(x>=2)return null;T&&A.addBox(I,new i.Box(b,M,C,z),g,d,e,s,o.C_INFINITY);var st=new h(A,E);return m.allowOverlap||(x=this._conflictEngine.getMinZoom(st.footprint,x,f,y)),A.minzoom=x,st},t.prototype.add=function(t){this._conflictEngine.add(t.footprint)},t.prototype._legible=function(t){var e=o.radToByte(t);return e<65||e>=193},t.prototype._placeGlyph=function(t,e,i,r,l,h,s,c){var g=h,p=g<0?o.positiveMod(t.angle+o.C_PI,o.C_2PI):t.angle,m=this._legible(p),f=0;i<0&&(g*=-1,i*=-1,f=o.C_PI),g>0&&++l;var u=new n.Point(t.x,t.y),I=r[l],d=o.C_INFINITY;if(r.length<=l)return d;for(;;){var _=I.x-u.x,w=I.y-u.y,x=Math.sqrt(_*_+w*w),y=Math.max(i/x,e),v=_/x,N=w/x,P=o.positiveMod(Math.atan2(N,v)+f,o.C_2PI);if(c.push(new a(u,p,P,s,m,y,d)),y<=e)return y;u=I.clone();do{if(l+=g,r.length<=l||l<0)return y;I=r[l]}while(u.isEqual(I));var A=I.x-u.x,E=I.y-u.y,T=Math.sqrt(A*A+E*E);A*=x/T,E*=x/T,u.x-=A,u.y-=E,d=y}},t}();e.PlacementEngine=c});