define("pages/segmentcontrol",["../config","../viewManager","../view","../segmentControl","../loading"],function(a){var b=(a("../config"),a("../viewManager"));$(function(){b.addView({name:"listView",isRoot:!0,head:{segmentControl:{items:[{text:"地图",target:"mapWrapper"},{text:"列表",target:"listWrapper",defaultShow:!0}],slide:!1}},content:['<div id="mapWrapper">','<div id="mapContainer"><div class="viewMsg">this is map container</div></div>',"</div>",'<div id="listWrapper">','<div id="listContainer"><div class="viewMsg">this is list container</div></div>',"</div>"].join("")})})}),define("config",[],function(){var a=$(window),b={screenWidth:a.width(),screenHeight:a.height(),clickEvent:"ontouchstart"in window?"tap":"click"};return b}),define("viewManager",["view","config","segmentControl","loading"],function(a){function b(){this.views=[],this.currentView=null}var c=a("view");return b.prototype.addView=function(a){var b=this;a.manager=b,a.index=b.views.length+1;var d=new c(a);return b.currentView=d,b.views.push(d),d},b.prototype.goBack=function(a){var b=this;b.currentView.pushout();var c,d=b.views.length;if(c=a?b._getViewIndexByName(a):d-2,!(c>=0))throw"can not find the view";var e=b.views.slice(c+1,d);b.views=b.views.slice(0,c+1),e.forEach(function(a){a.pushout()}),b.currentView=b.views[b.views.length-1]},b.prototype._getViewIndexByName=function(a){var b=this,c=-1;return b.views.forEach(function(b,d){b._options.name==a&&(c=d)}),c},new b}),define("view",["config","segmentControl","loading"],function(a){function b(a){var b=this,c={name:"view",isRoot:!1,index:1,head:{title:null,showBackButton:!0,backButtonText:"返回",segmentControl:null,height:44,content:null},showLoading:!1,content:null};c=$.extend(!0,c,a),b.$card=null,b.$head=null,b.$body=null,b.$loading=null,c.isRoot&&(c.head.showBackButton=!1),b._options=c,b._x=0,b._y=0,b._left=0,b.init.apply(b,arguments)}var c=a("config"),d=c.screenWidth,e=c.screenHeight,f=a("segmentControl"),g=a("loading");return b.prototype.pushout=function(){var a=this;return a.$card.animate({left:"100%"},300,"ease-in",function(){a.$card.remove()}),a},b.prototype.init=function(){var a=this,b=a._options,h=b.isRoot,i=$(".pageView");i.data("inited")||(i.css({height:e,width:d,overflow:"hidden"}),i.data("inited",!0));var j=$('<div class="cardView '+b.name+'" style="z-index:'+b.index+'"></div>').appendTo(i),k=$('<div class="contentView"></div>').appendTo(j);if(k.css("height",b.head?e-b.head.height:"100%"),b.content&&k.append(b.content),b.showLoading&&(a.$loading=$(g).appendTo(k)),b.head){var l=$('<div class="navigationBar"></div>').prependTo(j);if(b.head.showBackButton){var m=$('<a class="goBack" href="javascript:void(0);">'+b.head.backButtonText+"</a>").prependTo(l);m.on(c.clickEvent,function(){b.manager.goBack()})}if(b.head.segmentControl){var n=b.head.segmentControl;n.container=l,l.$segmentControl=new f(n)}else b.head.title?l.append('<div class="title">'+b.head.title+"</div>"):b.head.content&&l.html(b.head.content);a.$head=l}h?j.show():(j.css("left","100%").animate({left:0},300,"ease-out"),j.on("touchstart",function(b){a._x=b.pageX,a._y=b.pageY}),j.on("touchmove",function(b){var c=b.pageX,d=b.pageY,e=c-a._x,f=Math.abs(d-a._y);e>0&&15>f&&(j.css("left",e),a._left=e)}),j.on("touchend",function(){a._left>80?(a._x=0,a._y=0,a._left=0,b.manager.goBack()):(j.animate({left:0},200),a._x=0,a._y=0,a._left=0)})),a.$card=j,a.$body=k;var o=b.initialize;return o&&"function"==typeof o&&o(a),a},b}),define("segmentControl",["config"],function(a){var b=a("config");return function(a){var c=this;a.items.length,c.init=function(){var c=a.container,d=$('<div class="segmentControl"></div>').appendTo(c);a.items.forEach(function(a,b){var c=$('<a class="segment-item" href="javascript:void(0);">'+a.text+"</a>").appendTo(d),e=a.target;c.data("target",e);var f=$("#"+e);0==b?c.addClass("active"):f.hide()}),c.on(b.clickEvent,".segment-item",function(){var b=$(this);if(!b.hasClass("active")){var c=b.siblings(".active");c.removeClass("active"),b.addClass("active");var d=$("#"+b.data("target"));if($currentView=$("#"+c.data("target")),a.slide){var e=c.index(),f=b.index();f>e?(d.css("left","100%").show().animate({left:0},"fast"),$currentView.animate({left:"-100%"},"fast")):(d.css("left","-100%").show().animate({left:0},"fast"),$currentView.animate({left:"100%"},"fast"))}else $currentView.hide(),d.show()}})},c.init()}}),define("loading",[],function(){return['<div class="loading">','<div class="x-loading">','<div class="x-loading-spinner">','<span class="x-loading-top"></span>','<span class="x-loading-right"></span>','<span class="x-loading-bottom"></span>','<span class="x-loading-left"></span>',"</div>","</div>","</div>"].join("")});