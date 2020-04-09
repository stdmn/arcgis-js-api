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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","dojo/i18n!../nls/common","dojo/i18n!./Bookmarks/nls/Bookmarks","../core/events","../core/Handles","../core/watchUtils","../core/accessorSupport/decorators","../libs/sortablejs/Sortable","./Widget","./Bookmarks/BookmarksViewModel","./support/widget"],(function(t,o,e,r,s,i,a,d,n,k,l,u,c,m,h){var p="esri-bookmarks esri-widget--panel",_="esri-bookmarks__loader-container",b="esri-bookmarks__loader",f="esri-bookmarks__list",v="esri-bookmarks__list--sortable",B="esri-bookmarks__bookmark",y="esri-bookmarks__bookmark-button",g="esri-bookmarks__bookmark-image-container",x="esri-bookmarks__bookmark-edit-button",E="esri-bookmarks_bookmark-drag-handle",w="esri-bookmarks_bookmark-drag-handle-icon",A="esri-bookmarks__bookmark-icon",I="esri-bookmarks__image",S="esri-bookmarks__bookmark-name",N="esri-bookmarks__bookmark--active",U="esri-widget__content--empty",C="esri-bookmarks__no-bookmarks-heading",M="esri-widget__no-bookmark-icon",H="esri-bookmarks__no-bookmarks-description",R="esri-bookmarks__adding-bookmark",T="esri-bookmarks__add-bookmark",O="esri-bookmarks__add-bookmark-button",D="esri-bookmarks__add-bookmark-icon",L="esri-bookmarks__authoring-card",F="esri-bookmarks__authoring-form",j="esri-bookmarks__authoring-label",q="esri-bookmarks__authoring-actions",z="esri-bookmarks__authoring-input--invalid",K="esri-bookmarks__authoring-delete-button",P="esri-bookmarks__authoring-cancel-button",V="esri-widget",W="esri-widget--disabled",G="esri-button",J="esri-button--tertiary",Q="esri-input",X="esri-icon-handle-vertical",Y="esri-icon-plus",Z="esri-icon-edit",$="esri-icon-bookmark",tt="esri-widget__heading",ot="esri-icon-loading-indicator",et="esri-rotating",rt={addBookmark:!0,thumbnail:!0};return function(t){function o(o){var e=t.call(this,o)||this;return e._handles=new n,e._addInputNode=null,e._editInputNode=null,e._addBookmarkButtonNode=null,e._focusAddBookmarkButton=!1,e._focusEditInputBox=!1,e._focusAddInputBox=!1,e._addBookmark=!1,e._editBookmark=null,e._invalidEntry=!1,e._creatingBookmark=!1,e._sortable=null,e._sortableNode=null,e._focusSortUid=null,e._selectedSortUid=null,e._sortableSavedItems=null,e.bookmarkCreationOptions=null,e.bookmarks=null,e.disabled=!1,e.editingEnabled=!1,e.goToOverride=null,e.iconClass=$,e.label=a.widgetLabel,e.view=null,e.viewModel=new m,e.visibleElements=s({},rt),e}return e(o,t),o.prototype.postInitialize=function(){var t=this;this.own([k.init(this,"viewModel.bookmarks",(function(){return t._bookmarksInitialized()})),k.init(this,"editingEnabled",(function(){return t._toggleSorting()}))])},o.prototype.destroy=function(){this._destroySortable(),this._handles.destroy(),this._handles=null},o.prototype.castVisibleElements=function(t){return s({},rt,t)},o.prototype.endAddBookmark=function(){this._invalidEntry=!1,this._addBookmark=!1,this._creatingBookmark=!1,this.scheduleRender()},o.prototype.goTo=function(t){return this.viewModel.goTo(t)},o.prototype.render=function(){var t,o="loading"===this.viewModel.state?this._renderLoading():this._renderBookmarks();return h.tsx("div",{class:this.classes(p,V,(t={},t[W]=this.disabled,t))},o)},o.prototype.startAddBookmark=function(){this._editBookmark=null,this._addBookmark=!0,this._focusAddInputBox=!0,this.scheduleRender()},o.prototype._renderLoading=function(){return h.tsx("div",{class:_,key:"loader"},h.tsx("div",{class:b}))},o.prototype._renderNoBookmarksContainer=function(){return h.tsx("div",{class:U,key:"no-bookmarks"},h.tsx("span",{"aria-hidden":"true",class:this.classes(M,$)}),h.tsx("h1",{class:this.classes(tt,C)},a.noBookmarksHeading),h.tsx("p",{class:H},a.noBookmarksDescription))},o.prototype._renderAddBookmarkLoading=function(){return h.tsx("div",{key:"adding-bookmark",class:R},h.tsx("span",{"aria-hidden":"true",class:this.classes(ot,et)}),a.addingBookmark)},o.prototype._renderBookmarkItems=function(t){var o=this;return t?t.map((function(t){return o.editingEnabled&&o._editBookmark&&t&&o._editBookmark===t?o._renderEditingBookmark(t):o._renderBookmark(t)})).toArray():null},o.prototype._renderBookmarksContainer=function(t){var o,e=this.editingEnabled&&!this._addBookmark?this._renderAddBookmarkButton():null,r=this.editingEnabled?this._creatingBookmark?this._renderAddBookmarkLoading():this._addBookmark?this._renderAddingBookmark():null:null;return[h.tsx("ul",{key:"bookmark-list","aria-label":a.widgetLabel,class:this.classes(f,(o={},o[v]=this.editingEnabled,o)),afterCreate:this._sortNodeCreated,afterRemoved:this._destroySortable,"data-node-ref":"_sortableNode",bind:this},this._renderBookmarkItems(t)),e,r]},o.prototype._dragHandleBlur=function(){this._selectedSortUid=null,this.scheduleRender()},o.prototype._dragHandleKeydown=function(t){t.stopPropagation();var o=this._sortableSavedItems,e=d.eventKey(t);if(-1!==["ArrowDown","ArrowUp","Escape","Tab"," ","Enter"].indexOf(e)){var r=this._sortable,s=this._selectedSortUid,i=r.toArray(),a=t.target.getAttribute("data-bookmark-uid"),n=i.indexOf(a);if(" "===e||"Enter"===e){var k=s&&s===a;return this._selectedSortUid=k?null:a,this._sortableSavedItems=k?null:this._sortable.toArray(),void this.scheduleRender()}if("Tab"===e)return this._selectedSortUid=null,void this.scheduleRender();if("Escape"===e&&o)return this._selectedSortUid=null,this._updateSortItems(o,r,a),void this.scheduleRender();if(-1!==n&&s){var l,u,c,m="ArrowUp"===e?n-1:n+1;if(!(m>=i.length||m<=-1))u=n,c=m,(l=i).splice(c,0,l.splice(u,1)[0]),this._updateSortItems(i,r,a)}}},o.prototype._updateSortItems=function(t,o,e){o.sort(t),this._sortBookmarks(o),this._focusSortUid=e,this._selectedSortUid=e},o.prototype._focusDragHandle=function(t){var o=this._focusSortUid;t&&o&&(t.getAttribute("data-bookmark-uid")===o&&(t.focus(),this._focusSortUid=null))},o.prototype._toggleSorting=function(){var t=this,o=this._sortable,e=this._sortableNode,r=this.editingEnabled;if(e)if(o)o.option("disabled",!r);else{var s=u.create(e,{dataIdAttr:"data-bookmark-uid",handle:"."+E,group:"bookmarks",disabled:!r,onSort:function(){return t._sortBookmarks(s)}});this._sortable=s}},o.prototype._sortNodeCreated=function(t){this._sortableNode=t,this._toggleSorting()},o.prototype._sortBookmarks=function(t){var o=this.viewModel.bookmarks;if(o){var e=t.toArray();o.sort((function(t,o){var r=e.indexOf(t.uid),s=e.indexOf(o.uid);return r>s?1:r<s?-1:0}))}},o.prototype._renderAddBookmarkButton=function(){return this.visibleElements.addBookmark?h.tsx("div",{key:"add-bookmark-item",class:T},h.tsx("button",{class:this.classes(G,J,O),onclick:this.startAddBookmark,afterCreate:this._storeAddBookmarkButton,afterUpdate:this._storeAddBookmarkButton,"data-node-ref":"_addBookmarkButtonNode",bind:this},h.tsx("span",{"aria-hidden":"true",class:this.classes(D,Y)}),a.addBookmark)):null},o.prototype._renderBookmarks=function(){var t=this.viewModel.bookmarks,o=t&&t.filter(Boolean),e=o&&o.length,r=e||this.editingEnabled?this._renderBookmarksContainer(o):null;return[e?null:this._renderNoBookmarksContainer(),r]},o.prototype._renderBookmark=function(t){var o,e,r=this.viewModel.activeBookmark,a=t.name,d=t.thumbnail,n=a||i.untitled,k=((o={})[N]=r===t,o),l=d&&d.url||"",u=this.visibleElements.thumbnail&&l?h.tsx("img",{src:l,alt:"",class:I}):h.tsx("span",{"aria-hidden":"true",class:this.classes(A,$)}),c=h.tsx("div",{class:g},u),m=this.editingEnabled?h.tsx("div",{key:"edit-container"},h.tsx("button",{title:i.edit,"aria-label":i.edit,"data-bookmark":t,onclick:this._showEditBookmarkForm,bind:this,class:x},h.tsx("span",{"aria-hidden":"true",class:Z}))):null,p=((e={})["data-bookmark-uid"]=t.uid,e),_=this.editingEnabled?h.tsx("div",s({role:"button",tabIndex:0,key:"drag-handle",bind:this,class:E,onkeydown:this._dragHandleKeydown,afterCreate:this._focusDragHandle,afterUpdate:this._focusDragHandle,onblur:this._dragHandleBlur,"aria-pressed":this._selectedSortUid===t.uid?"true":"false","aria-label":i.dragHandleLabel,title:i.dragHandleTitle},p),h.tsx("span",{"aria-hidden":"true",class:this.classes(w,X)})):null;return h.tsx("li",s({key:t,class:this.classes(B,k)},p),_,h.tsx("button",{key:"bookmark-button",class:y,bind:this,"data-bookmark":t,onclick:this._goToBookmark},c,h.tsx("span",{class:S},n)),m)},o.prototype._renderEditingBookmark=function(t){var o,e=((o={})["data-bookmark-uid"]=t.uid,o);return h.tsx("li",s({key:"edit-bookmark-form",class:L},e),h.tsx("form",{class:F,onsubmit:this._editBookmarkSubmit,bind:this},h.tsx("label",{class:j},a.title,h.tsx("input",{required:!0,bind:this,class:this.classes(Q,this._invalidEntry?z:null),type:"text",value:t.name,afterCreate:this._storeEditInput,afterUpdate:this._focusEditInput,"data-bookmark":t,"data-node-ref":"_editInputNode",placeholder:a.addPlaceholder})),h.tsx("div",{class:q},h.tsx("input",{type:"button",value:i.delete,class:this.classes(G,J,K),"data-bookmark":t,onclick:this._deleteBookmark,bind:this}),h.tsx("input",{type:"button",value:i.cancel,class:this.classes(G,J),onclick:this._closeEditBookmarkForm,bind:this}),h.tsx("input",{class:G,type:"submit",value:i.save}))))},o.prototype._renderAddingBookmark=function(){return h.tsx("div",{key:"add-bookmark-form",class:L},h.tsx("form",{class:F,onsubmit:this._addBookmarkSubmit,bind:this},h.tsx("label",{class:j},a.title,h.tsx("input",{required:!0,bind:this,class:this.classes(Q,this._invalidEntry?z:null),type:"text",afterCreate:this._storeAddInput,afterUpdate:this._focusAddInput,"data-node-ref":"_addInputNode",value:"",placeholder:a.addPlaceholder})),h.tsx("div",{class:this.classes(q)},h.tsx("input",{type:"button",value:i.cancel,class:this.classes(G,J,P),onclick:this._endAddBookmark.bind(this),bind:this}),h.tsx("input",{class:G,type:"submit",value:i.add}))))},o.prototype._destroySortable=function(){var t=this._sortable;t&&t.destroy(),this._sortable=null},o.prototype._endAddBookmark=function(){this._focusAddBookmarkButton=!0,this.endAddBookmark()},o.prototype._bookmarksInitialized=function(){var t=this,o=this._handles;o.remove("bookmarks-init"),o.add(k.on(this,"viewModel.bookmarks","change",(function(){return t._bookmarksChanged()})),"bookmarks-init")},o.prototype._bookmarksChanged=function(){var t=this,o=this.viewModel.bookmarks,e=this._handles;e.remove("bookmarks-change");var r=o.map((function(o){return k.watch(o,["active","name","thumbnail.url"],(function(){return t.scheduleRender()}))}));e.add(r,"bookmarks-change"),this.scheduleRender()},o.prototype._showEditBookmarkForm=function(t){var o=t.currentTarget["data-bookmark"];this._addBookmark=!1,this._focusEditInputBox=!0,this._editBookmark=o,this.scheduleRender()},o.prototype._closeEditBookmarkForm=function(){this._invalidEntry=!1,this._editBookmark=null,this.scheduleRender()},o.prototype._addBookmarkSubmit=function(t){var o=this;t.preventDefault();var e=this._addInputNode,r=this.bookmarkCreationOptions,s=e&&e.value.trim();if(!s)return this._invalidEntry=!0,void this.scheduleRender();this._creatingBookmark=!0,this.scheduleRender(),this.viewModel.createBookmark(r).then((function(t){t.name=s,o.viewModel.bookmarks.add(t),o._endAddBookmark()}))},o.prototype._editBookmarkSubmit=function(t){t.preventDefault();var o=this._editInputNode,e=this._editBookmark,r=o&&o.value.trim();if(!r)return this._invalidEntry=!0,void this.scheduleRender();e.name=r,this._closeEditBookmarkForm()},o.prototype._storeAddBookmarkButton=function(t){this._addBookmarkButtonNode=t,this._focusAddBookmark()},o.prototype._storeEditInput=function(t){this._editInputNode=t,this._focusEditInput()},o.prototype._storeAddInput=function(t){this._addInputNode=t,this._focusAddInput()},o.prototype._focusAddInput=function(){this._addInputNode&&this._focusAddInputBox&&(this._focusAddInputBox=!1,this._addInputNode.focus())},o.prototype._focusAddBookmark=function(){this._addBookmarkButtonNode&&this._focusAddBookmarkButton&&(this._focusAddBookmarkButton=!1,this._addBookmarkButtonNode.focus())},o.prototype._focusEditInput=function(){this._editInputNode&&this._focusEditInputBox&&(this._focusEditInputBox=!1,this._editInputNode.focus())},o.prototype._deleteBookmark=function(t){var o=t.currentTarget["data-bookmark"];this.viewModel.bookmarks.remove(o)},o.prototype._goToBookmark=function(t){var o=t.currentTarget["data-bookmark"];this.endAddBookmark(),this._closeEditBookmarkForm(),this.viewModel.goTo(o)},r([l.property()],o.prototype,"bookmarkCreationOptions",void 0),r([l.aliasOf("viewModel.bookmarks")],o.prototype,"bookmarks",void 0),r([h.renderable(),l.property()],o.prototype,"disabled",void 0),r([h.renderable(),l.property()],o.prototype,"editingEnabled",void 0),r([l.aliasOf("viewModel.goToOverride")],o.prototype,"goToOverride",void 0),r([l.property()],o.prototype,"iconClass",void 0),r([l.property()],o.prototype,"label",void 0),r([l.aliasOf("viewModel.view")],o.prototype,"view",void 0),r([l.property({type:m}),h.renderable(["activeBookmark","state","bookmarks"]),h.vmEvent(["select-bookmark"])],o.prototype,"viewModel",void 0),r([l.property(),h.renderable()],o.prototype,"visibleElements",void 0),r([l.cast("visibleElements")],o.prototype,"castVisibleElements",null),r([l.property()],o.prototype,"endAddBookmark",null),r([l.property()],o.prototype,"startAddBookmark",null),o=r([l.subclass("esri.widgets.Bookmarks")],o)}(l.declared(c))}));