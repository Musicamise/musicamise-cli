/*!
 * Jasny Bootstrap v3.1.3 (http://jasny.github.io/bootstrap)
 * Copyright 2012-2014 Arnold Daniels
 * Licensed under Apache-2.0 (https://github.com/jasny/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Jasny Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}void 0===a.support.transition&&(a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()}))}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.state=null,this.placement=null,this.options.recalc&&(this.calcClone(),a(window).on("resize",a.proxy(this.recalc,this))),this.options.autohide&&a(document).on("click",a.proxy(this.autohide,this)),this.options.toggle&&this.toggle(),this.options.disablescrolling&&(this.options.disableScrolling=this.options.disablescrolling,delete this.options.disablescrolling)};b.DEFAULTS={toggle:!0,placement:"auto",autohide:!0,recalc:!0,disableScrolling:!0},b.prototype.offset=function(){switch(this.placement){case"left":case"right":return this.$element.outerWidth();case"top":case"bottom":return this.$element.outerHeight()}},b.prototype.calcPlacement=function(){function b(a,b){if("auto"===e.css(b))return a;if("auto"===e.css(a))return b;var c=parseInt(e.css(a),10),d=parseInt(e.css(b),10);return c>d?b:a}if("auto"!==this.options.placement)return void(this.placement=this.options.placement);this.$element.hasClass("in")||this.$element.css("visiblity","hidden !important").addClass("in");var c=a(window).width()/this.$element.width(),d=a(window).height()/this.$element.height(),e=this.$element;this.placement=c>=d?b("left","right"):b("top","bottom"),"hidden !important"===this.$element.css("visibility")&&this.$element.removeClass("in").css("visiblity","")},b.prototype.opposite=function(a){switch(a){case"top":return"bottom";case"left":return"right";case"bottom":return"top";case"right":return"left"}},b.prototype.getCanvasElements=function(){var b=this.options.canvas?a(this.options.canvas):this.$element,c=b.find("*").filter(function(){return"fixed"===a(this).css("position")}).not(this.options.exclude);return b.add(c)},b.prototype.slide=function(b,c,d){if(!a.support.transition){var e={};return e[this.placement]="+="+c,b.animate(e,350,d)}var f=this.placement,g=this.opposite(f);b.each(function(){"auto"!==a(this).css(f)&&a(this).css(f,(parseInt(a(this).css(f),10)||0)+c),"auto"!==a(this).css(g)&&a(this).css(g,(parseInt(a(this).css(g),10)||0)-c)}),this.$element.one(a.support.transition.end,d).emulateTransitionEnd(350)},b.prototype.disableScrolling=function(){var b=a("body").width(),c="padding-"+this.opposite(this.placement);if(void 0===a("body").data("offcanvas-style")&&a("body").data("offcanvas-style",a("body").attr("style")||""),a("body").css("overflow","hidden"),a("body").width()>b){var d=parseInt(a("body").css(c),10)+a("body").width()-b;setTimeout(function(){a("body").css(c,d)},1)}},b.prototype.show=function(){if(!this.state){var b=a.Event("show.bs.offcanvas");if(this.$element.trigger(b),!b.isDefaultPrevented()){this.state="slide-in",this.calcPlacement();var c=this.getCanvasElements(),d=this.placement,e=this.opposite(d),f=this.offset();-1!==c.index(this.$element)&&(a(this.$element).data("offcanvas-style",a(this.$element).attr("style")||""),this.$element.css(d,-1*f),this.$element.css(d)),c.addClass("canvas-sliding").each(function(){void 0===a(this).data("offcanvas-style")&&a(this).data("offcanvas-style",a(this).attr("style")||""),"static"===a(this).css("position")&&a(this).css("position","relative"),"auto"!==a(this).css(d)&&"0px"!==a(this).css(d)||"auto"!==a(this).css(e)&&"0px"!==a(this).css(e)||a(this).css(d,0)}),this.options.disableScrolling&&this.disableScrolling();var g=function(){"slide-in"==this.state&&(this.state="slid",c.removeClass("canvas-sliding").addClass("canvas-slid"),this.$element.trigger("shown.bs.offcanvas"))};setTimeout(a.proxy(function(){this.$element.addClass("in"),this.slide(c,f,a.proxy(g,this))},this),1)}}},b.prototype.hide=function(){if("slid"===this.state){var b=a.Event("hide.bs.offcanvas");if(this.$element.trigger(b),!b.isDefaultPrevented()){this.state="slide-out";var c=a(".canvas-slid"),d=(this.placement,-1*this.offset()),e=function(){"slide-out"==this.state&&(this.state=null,this.placement=null,this.$element.removeClass("in"),c.removeClass("canvas-sliding"),c.add(this.$element).add("body").each(function(){a(this).attr("style",a(this).data("offcanvas-style")).removeData("offcanvas-style")}),this.$element.trigger("hidden.bs.offcanvas"))};c.removeClass("canvas-slid").addClass("canvas-sliding"),setTimeout(a.proxy(function(){this.slide(c,d,a.proxy(e,this))},this),1)}}},b.prototype.toggle=function(){"slide-in"!==this.state&&"slide-out"!==this.state&&this["slid"===this.state?"hide":"show"]()},b.prototype.calcClone=function(){this.$calcClone=this.$element.clone().html("").addClass("offcanvas-clone").removeClass("in").appendTo(a("body"))},b.prototype.recalc=function(){if("none"!==this.$calcClone.css("display")&&("slid"===this.state||"slide-in"===this.state)){this.state=null,this.placement=null;var b=this.getCanvasElements();this.$element.removeClass("in"),b.removeClass("canvas-slid"),b.add(this.$element).add("body").each(function(){a(this).attr("style",a(this).data("offcanvas-style")).removeData("offcanvas-style")})}},b.prototype.autohide=function(b){0===a(b.target).closest(this.$element).length&&this.hide()};var c=a.fn.offcanvas;a.fn.offcanvas=function(c){return this.each(function(){var d=a(this),e=d.data("bs.offcanvas"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.offcanvas",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.offcanvas.Constructor=b,a.fn.offcanvas.noConflict=function(){return a.fn.offcanvas=c,this},a(document).on("click.bs.offcanvas.data-api","[data-toggle=offcanvas]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.offcanvas"),h=g?"toggle":d.data();b.stopPropagation(),g?g.toggle():f.offcanvas(h)})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.$element.on("click.bs.rowlink","td:not(.rowlink-skip)",a.proxy(this.click,this))};b.DEFAULTS={target:"a"},b.prototype.click=function(b){var c=a(b.currentTarget).closest("tr").find(this.options.target)[0];if(a(b.target)[0]!==c)if(b.preventDefault(),c.click)c.click();else if(document.createEvent){var d=document.createEvent("MouseEvents");d.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),c.dispatchEvent(d)}};var c=a.fn.rowlink;a.fn.rowlink=function(c){return this.each(function(){var d=a(this),e=d.data("bs.rowlink");e||d.data("bs.rowlink",e=new b(this,c))})},a.fn.rowlink.Constructor=b,a.fn.rowlink.noConflict=function(){return a.fn.rowlink=c,this},a(document).on("click.bs.rowlink.data-api",'[data-link="row"]',function(b){if(0===a(b.target).closest(".rowlink-skip").length){var c=a(this);c.data("bs.rowlink")||(c.rowlink(c.data()),a(b.target).trigger("click.bs.rowlink"))}})}(window.jQuery),+function(a){"use strict";var b=void 0!==window.orientation,c=navigator.userAgent.toLowerCase().indexOf("android")>-1,d="Microsoft Internet Explorer"==window.navigator.appName,e=function(b,d){c||(this.$element=a(b),this.options=a.extend({},e.DEFAULTS,d),this.mask=String(this.options.mask),this.init(),this.listen(),this.checkVal())};e.DEFAULTS={mask:"",placeholder:"_",definitions:{9:"[0-9]",a:"[A-Za-z]",w:"[A-Za-z0-9]","*":"."}},e.prototype.init=function(){var b=this.options.definitions,c=this.mask.length;this.tests=[],this.partialPosition=this.mask.length,this.firstNonMaskPos=null,a.each(this.mask.split(""),a.proxy(function(a,d){"?"==d?(c--,this.partialPosition=a):b[d]?(this.tests.push(new RegExp(b[d])),null===this.firstNonMaskPos&&(this.firstNonMaskPos=this.tests.length-1)):this.tests.push(null)},this)),this.buffer=a.map(this.mask.split(""),a.proxy(function(a){return"?"!=a?b[a]?this.options.placeholder:a:void 0},this)),this.focusText=this.$element.val(),this.$element.data("rawMaskFn",a.proxy(function(){return a.map(this.buffer,function(a,b){return this.tests[b]&&a!=this.options.placeholder?a:null}).join("")},this))},e.prototype.listen=function(){if(!this.$element.attr("readonly")){var b=(d?"paste":"input")+".mask";this.$element.on("unmask.bs.inputmask",a.proxy(this.unmask,this)).on("focus.bs.inputmask",a.proxy(this.focusEvent,this)).on("blur.bs.inputmask",a.proxy(this.blurEvent,this)).on("keydown.bs.inputmask",a.proxy(this.keydownEvent,this)).on("keypress.bs.inputmask",a.proxy(this.keypressEvent,this)).on(b,a.proxy(this.pasteEvent,this))}},e.prototype.caret=function(a,b){if(0!==this.$element.length){if("number"==typeof a)return b="number"==typeof b?b:a,this.$element.each(function(){if(this.setSelectionRange)this.setSelectionRange(a,b);else if(this.createTextRange){var c=this.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select()}});if(this.$element[0].setSelectionRange)a=this.$element[0].selectionStart,b=this.$element[0].selectionEnd;else if(document.selection&&document.selection.createRange){var c=document.selection.createRange();a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length}return{begin:a,end:b}}},e.prototype.seekNext=function(a){for(var b=this.mask.length;++a<=b&&!this.tests[a];);return a},e.prototype.seekPrev=function(a){for(;--a>=0&&!this.tests[a];);return a},e.prototype.shiftL=function(a,b){var c=this.mask.length;if(!(0>a)){for(var d=a,e=this.seekNext(b);c>d;d++)if(this.tests[d]){if(!(c>e&&this.tests[d].test(this.buffer[e])))break;this.buffer[d]=this.buffer[e],this.buffer[e]=this.options.placeholder,e=this.seekNext(e)}this.writeBuffer(),this.caret(Math.max(this.firstNonMaskPos,a))}},e.prototype.shiftR=function(a){for(var b=this.mask.length,c=a,d=this.options.placeholder;b>c;c++)if(this.tests[c]){var e=this.seekNext(c),f=this.buffer[c];if(this.buffer[c]=d,!(b>e&&this.tests[e].test(f)))break;d=f}},e.prototype.unmask=function(){this.$element.unbind(".mask").removeData("inputmask")},e.prototype.focusEvent=function(){this.focusText=this.$element.val();var a=this.mask.length,b=this.checkVal();this.writeBuffer();var c=this,d=function(){b==a?c.caret(0,b):c.caret(b)};d(),setTimeout(d,50)},e.prototype.blurEvent=function(){this.checkVal(),this.$element.val()!==this.focusText&&this.$element.trigger("change")},e.prototype.keydownEvent=function(a){var c=a.which;if(8==c||46==c||b&&127==c){var d=this.caret(),e=d.begin,f=d.end;return f-e===0&&(e=46!=c?this.seekPrev(e):f=this.seekNext(e-1),f=46==c?this.seekNext(f):f),this.clearBuffer(e,f),this.shiftL(e,f-1),!1}return 27==c?(this.$element.val(this.focusText),this.caret(0,this.checkVal()),!1):void 0},e.prototype.keypressEvent=function(a){var b=this.mask.length,c=a.which,d=this.caret();if(a.ctrlKey||a.altKey||a.metaKey||32>c)return!0;if(c){d.end-d.begin!==0&&(this.clearBuffer(d.begin,d.end),this.shiftL(d.begin,d.end-1));var e=this.seekNext(d.begin-1);if(b>e){var f=String.fromCharCode(c);if(this.tests[e].test(f)){this.shiftR(e),this.buffer[e]=f,this.writeBuffer();var g=this.seekNext(e);this.caret(g)}}return!1}},e.prototype.pasteEvent=function(){var a=this;setTimeout(function(){a.caret(a.checkVal(!0))},0)},e.prototype.clearBuffer=function(a,b){for(var c=this.mask.length,d=a;b>d&&c>d;d++)this.tests[d]&&(this.buffer[d]=this.options.placeholder)},e.prototype.writeBuffer=function(){return this.$element.val(this.buffer.join("")).val()},e.prototype.checkVal=function(a){for(var b=this.mask.length,c=this.$element.val(),d=-1,e=0,f=0;b>e;e++)if(this.tests[e]){for(this.buffer[e]=this.options.placeholder;f++<c.length;){var g=c.charAt(f-1);if(this.tests[e].test(g)){this.buffer[e]=g,d=e;break}}if(f>c.length)break}else this.buffer[e]==c.charAt(f)&&e!=this.partialPosition&&(f++,d=e);return!a&&d+1<this.partialPosition?(this.$element.val(""),this.clearBuffer(0,b)):(a||d+1>=this.partialPosition)&&(this.writeBuffer(),a||this.$element.val(this.$element.val().substring(0,d+1))),this.partialPosition?e:this.firstNonMaskPos};var f=a.fn.inputmask;a.fn.inputmask=function(b){return this.each(function(){var c=a(this),d=c.data("bs.inputmask");d||c.data("bs.inputmask",d=new e(this,b))})},a.fn.inputmask.Constructor=e,a.fn.inputmask.noConflict=function(){return a.fn.inputmask=f,this},a(document).on("focus.bs.inputmask.data-api","[data-mask]",function(){var b=a(this);b.data("bs.inputmask")||b.inputmask(b.data())})}(window.jQuery),+function(a){"use strict";var b="Microsoft Internet Explorer"==window.navigator.appName,c=function(b,c){if(this.$element=a(b),this.$input=this.$element.find(":file"),0!==this.$input.length){this.name=this.$input.attr("name")||c.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),0===this.$hidden.length&&(this.$hidden=a('<input type="hidden">').insertBefore(this.$input)),this.$preview=this.$element.find(".fileinput-preview");var d=this.$preview.css("height");"inline"!==this.$preview.css("display")&&"0px"!==d&&"none"!==d&&this.$preview.css("line-height",d),this.original={exists:this.$element.hasClass("fileinput-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.listen()}};c.prototype.listen=function(){this.$input.on("change.bs.fileinput",a.proxy(this.change,this)),a(this.$input[0].form).on("reset.bs.fileinput",a.proxy(this.reset,this)),this.$element.find('[data-trigger="fileinput"]').on("click.bs.fileinput",a.proxy(this.trigger,this)),this.$element.find('[data-dismiss="fileinput"]').on("click.bs.fileinput",a.proxy(this.clear,this))},c.prototype.change=function(b){var c=void 0===b.target.files?b.target&&b.target.value?[{name:b.target.value.replace(/^.+\\/,"")}]:[]:b.target.files;if(b.stopPropagation(),0===c.length)return void this.clear();this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);var d=c[0];if(this.$preview.length>0&&("undefined"!=typeof d.type?d.type.match(/^image\/(gif|png|jpeg)$/):d.name.match(/\.(gif|png|jpe?g)$/i))&&"undefined"!=typeof FileReader){var e=new FileReader,f=this.$preview,g=this.$element;e.onload=function(b){var e=a("<img>");e[0].src=b.target.result,c[0].result=b.target.result,g.find(".fileinput-filename").text(d.name),"none"!=f.css("max-height")&&e.css("max-height",parseInt(f.css("max-height"),10)-parseInt(f.css("padding-top"),10)-parseInt(f.css("padding-bottom"),10)-parseInt(f.css("border-top"),10)-parseInt(f.css("border-bottom"),10)),f.html(e),g.addClass("fileinput-exists").removeClass("fileinput-new"),g.trigger("change.bs.fileinput",c)},e.readAsDataURL(d)}else this.$element.find(".fileinput-filename").text(d.name),this.$preview.text(d.name),this.$element.addClass("fileinput-exists").removeClass("fileinput-new"),this.$element.trigger("change.bs.fileinput")},c.prototype.clear=function(a){if(a&&a.preventDefault(),this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name",""),b){var c=this.$input.clone(!0);this.$input.after(c),this.$input.remove(),this.$input=c}else this.$input.val("");this.$preview.html(""),this.$element.find(".fileinput-filename").text(""),this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),void 0!==a&&(this.$input.trigger("change"),this.$element.trigger("clear.bs.fileinput"))},c.prototype.reset=function(){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.$element.find(".fileinput-filename").text(""),this.original.exists?this.$element.addClass("fileinput-exists").removeClass("fileinput-new"):this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),this.$element.trigger("reset.bs.fileinput")},c.prototype.trigger=function(a){this.$input.trigger("click"),a.preventDefault()};var d=a.fn.fileinput;a.fn.fileinput=function(b){return this.each(function(){var d=a(this),e=d.data("bs.fileinput");e||d.data("bs.fileinput",e=new c(this,b)),"string"==typeof b&&e[b]()})},a.fn.fileinput.Constructor=c,a.fn.fileinput.noConflict=function(){return a.fn.fileinput=d,this},a(document).on("click.fileinput.data-api",'[data-provides="fileinput"]',function(b){var c=a(this);if(!c.data("bs.fileinput")){c.fileinput(c.data());var d=a(b.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]');d.length>0&&(b.preventDefault(),d.trigger("click.bs.fileinput"))}})}(window.jQuery);
(function(){function checkCompatibility(){if(typeof window.postMessage=="undefined"||typeof Element=="undefined"){return false;}return true;}if(!checkCompatibility()){window.PagSeguroLightbox=function(){return false;};return false;}function onDocumentReady(callback){var eventName=document.addEventListener?"DOMContentLoaded":"onreadystatechange";if(document.readyState==="complete"||(document.readyState!=="loading"&&!document.attachEvent)){callback();return;}document[document.addEventListener?"addEventListener":"attachEvent"](eventName,function(){if(eventName=="DOMContentLoaded"||document.readyState==="complete"){callback();document[document.removeEventListener?"removeEventListener":"detachEvent"](eventName,arguments.callee,false);}},false);}var lightbox=document.createElement("iframe"),styleNode=document.createElement("style"),styleSheets=[".uolPSMediator {position:fixed; left:0px; top:0px; width:100%; height:100%; background-color:transparent; border:0px none transparent; overflow:hidden; display:none; z-index:9999;}"].join(""),PagSeguro=PagSeguro||{};lightbox.setAttribute("src","https://pagseguro.uol.com.br/checkout/embedded/i-ck.html");lightbox.setAttribute("width","100%");lightbox.setAttribute("height","100%");lightbox.setAttribute("id","uolPSMediator");lightbox.setAttribute("class","uolPSMediator");lightbox.setAttribute("allowtransparency","true");lightbox.setAttribute("frameborder","0");document.getElementsByTagName("head")[0].appendChild(styleNode);if(styleNode.styleSheet){styleNode.styleSheet.cssText=styleSheets;}else{styleNode.appendChild(document.createTextNode(styleSheets));}PagSeguro.Lightbox=function(){this.token;this.lastSentToken="";this.transactionCode;this.callback;this.recoveryCode="";this.lightbox=lightbox;this.isMobile=false;this.ready=false;this.mediator=new PagSeguro.APIMediator({lightbox:this.lightbox});this.listenChannels();};PagSeguro.Lightbox.prototype={constructor:PagSeguro.Lightbox,checkout:function(){var _that=this;if(!this.ready){setTimeout(function(){_that.checkout();},150);return;}if(!this.isMobile){this.showLightbox();}this.sendToken();},showLightbox:function(){this.lightbox.style.display="block";},hideLightbox:function(){this.lightbox.style.display="none";},execCallback:function(){if(this.transactionCode!="ABORTED"&&this.transactionCode!=""){if(this.callback["success"]){this.callback["success"](this.transactionCode);}}else{this.callback["abort"](this.recoveryCode);}},syntonize:function(){this.publish({command:"syntonize",value:window.location.protocol+"//"+window.location.host},"lightbox");},setToken:function(token){this.token=(typeof(token)==="string")?"code="+token:(token instanceof HTMLFormElement?this.serializeForm(token):this.serialize(token));},sendToken:function(){var tokenToSent=this.token;if(tokenToSent===this.lastSentToken&&this.recoveryCode!=""){tokenToSent=this.serialize({recoveryCode:this.recoveryCode});}else{this.recoveryCode="";}this.publish({command:"setToken",value:tokenToSent},"lightbox");this.lastSentToken=this.token;},catchCommunicationException:function(){if(window.location.toString().indexOf("file:///")!=-1){this.publish({command:"error",type:"1"},"lightbox");}},publish:function(message,channel){this.mediator.postMessage(message,channel);},subscribe:function(channel,callback){this.mediator.acceptMessage(channel,callback);},serialize:function(obj){var str="",i;for(i in obj){str+=i+"="+obj[i]+"&";}return str.replace(/\&$/,"");},serializeForm:function(htmlForm){var obj={},elements=htmlForm.elements,i,l;for(i=0,l=elements.length;i<l;i++){if(elements[i].type!="submit"&&elements[i].name&&!obj[elements[i].name]&&typeof elements[i].value!="undefined"){obj[elements[i].name]=elements[i].value;}}return this.serialize(obj);},listenChannels:function(){var _that=this;this.subscribe("lightbox",function(data){switch(data.command){case"setTransactionCode":_that.transactionCode=data.value;_that.recoveryCode="";break;case"setRecoveryCode":_that.recoveryCode=data.value;break;case"hide":_that.hideLightbox();_that.execCallback();break;case"ready":_that.ready=data.value;_that.isMobile=data.isMobile;}});}};PagSeguro.APIMediator=function(core){var channels={lightbox:{context:core.lightbox.contentWindow,url:"https://pagseguro.uol.com.br",callbacks:[]}};this.postMessage=function(message,channel){if(channels[channel]){channels[channel].context.postMessage(JSON.stringify(message),channels[channel].url);}};this.acceptMessage=function(channel,callback){var _that=this,callbacks=channels[channel].callbacks;callbacks[callbacks.length]=function(event){if(!channels[channel]){return;}if(event.origin==channels[channel].url){var data=JSON.parse(event.data);callback(data);}};window[window.addEventListener?"addEventListener":"attachEvent"]((window.addEventListener?"message":"onmessage"),callbacks[callbacks.length-1],false);};this.ignoreMessage=function(channel){var _that=this,i=channels[channel].callbacks.length;if(channels[channel]){while(i--){window[window.removeEventListener?"removeEventListener":"detachEvent"]((window.removeEventListener?"message":"onmessage"),channels[channel].callbacks[i],false);}}};};function _logErrors(e,method){var i=new Image();i.src="https://pagseguro.uol.com.br/checkout/fe-logger.jhtml?log="+e.toString()+" at(l:"+e.lineNumber+", c:"+e.columnNumber+")"+"&jsMethod="+method+"&jsOrigin=pagseguro.lightbox.js";}window.PagSeguroLightbox=(function(){var ltb;onDocumentReady(function(){document.getElementsByTagName("body")[0].appendChild(lightbox);function _onload(){try{ltb=new PagSeguro.Lightbox();ltb.syntonize();}catch(e){_logErrors(e,"_onload");throw e;}}if(!window.addEventListener){lightbox.attachEvent("onload",_onload);}else{lightbox.addEventListener("load",_onload,false);}});function initLightbox(token,callback){if(ltb===undefined){setTimeout(function(){initLightbox(token,callback);},100);return;}ltb.setToken(token);ltb.transactionCode="ABORTED";ltb.callback=callback||{abort:function(){}};ltb.checkout();}return function(token,callback){try{initLightbox(token,callback);return true;}catch(e){_logErrors(e,"initLightbox");throw e;}};})();})();
/*
 * Title: jQuery Etalage plugin
 * Author: Berend de Jong, Frique
 * Author URI: http://www.frique.me/
 * Version: 1.3.4 (20130622.1)
 */

(function(a){a.fn.etalage=function(b){var c=a.extend({align:"left",thumb_image_width:300,thumb_image_height:400,source_image_width:900,source_image_height:1200,zoom_area_width:600,zoom_area_height:"justify",zoom_area_distance:10,zoom_easing:true,click_to_zoom:false,zoom_element:"auto",show_descriptions:true,description_location:"bottom",description_opacity:0.7,small_thumbs:3,smallthumb_inactive_opacity:0.4,smallthumb_hide_single:true,smallthumb_select_on_hover:false,smallthumbs_position:"bottom",show_begin_end_smallthumb:true,magnifier_opacity:0.5,magnifier_invert:true,show_icon:true,icon_offset:20,hide_cursor:false,show_hint:false,hint_offset:15,speed:600,autoplay:true,autoplay_interval:6000,keyboard:true,right_to_left:false,click_callback:function(){return true
},change_callback:function(){return true}},b);a.each(this,function(){var aG=a(this);if(aG.is("ul")&&aG.children("li").length&&aG.find("img.etalage_source_image").length){var ad,ab,Q,I,aq,t,f,aS,aL,aw,aR=aG.attr("id"),aZ=Math.floor(c.speed*0.7),aC=Math.round(c.speed/100),ai=false,z=0,e=false,ao=true,A=false,x=0,al=0,ak=0,Y=0,X=0,aF="hori";if(typeof aR==="undefined"||!aR){aR="[no id]"}if(c.smallthumbs_position==="left"||c.smallthumbs_position==="right"){aF="vert"}if(typeof a.browser==="object"&&a.browser.msie){if(a.browser.version<9){ao=false;
if(a.browser.version<7){e=true}}}aG.addClass("etalage").show();var w=aG.children("li").addClass("etalage_thumb");w.first().show().addClass("etalage_thumb_active");var q=w.length,aJ=c.autoplay;if(q<2){aJ=false}if(c.align==="right"){aG.addClass("etalage_right")}a.each(w,function(a1){a1+=1;var a4=a(this),j=a4.find(".etalage_thumb_image").removeAttr("alt").show(),a3=a4.find(".etalage_source_image"),a2=a4.find("a");a4.data("id",a1).addClass("thumb_"+a1);if(!j.length&&a3.length){a4.prepend('<img class="etalage_thumb_image" src="'+a3.attr("src")+'" />')
}else{if(!j.length&&!a3.length){a4.remove()}}if(a2.length){a4.find(".etalage_thumb_image").data("anchor",a2.attr("href"))}});var av=w.find(".etalage_thumb_image").css({width:c.thumb_image_width,height:c.thumb_image_height}).show();a.each(av,function(){a(this).data("src",this.src)});var aO=a('<li class="etalage_magnifier"><div><img /></div></li>').appendTo(aG),aa=aO.children("div"),h=aa.children("img");var E=a('<li class="etalage_icon">&nbsp;</li>').appendTo(aG);if(c.show_icon){E.show()}var r;if(c.show_hint){r=a('<li class="etalage_hint">&nbsp;</li>').appendTo(aG).show()
}var K,s=c.zoom_element;if(s!=="auto"&&s&&a(s).length){K=a(s).addClass("etalage_zoom_area").html('<div><img class="etalage_zoom_img" /></div>')}else{s="auto";K=a('<li class="etalage_zoom_area"><div><img class="etalage_zoom_img" /></div></li>').appendTo(aG)}var W=K.children("div"),an;if(ao){an=a('<img class="etalage_zoom_preview" />').css({width:c.source_image_width,height:c.source_image_height,opacity:0.3}).prependTo(W).show()}var aB=W.children(".etalage_zoom_img").css({width:c.source_image_width,height:c.source_image_height});
var az;if(c.show_descriptions){az=a('<div class="etalage_description'+((c.right_to_left)?" rtl":"")+'"></div>').prependTo(K)}var aQ,l,aV,u,y,aj=c.small_thumbs;if(q>1||!c.smallthumb_hide_single){aQ=a('<li class="etalage_small_thumbs"><ul></ul></li>').appendTo(aG);l=aQ.children("ul");a.each(av,function(){var i=a(this);Q=i.data("src");I=i.parents(".etalage_thumb").data("id");a('<li><img class="etalage_small_thumb" src="'+Q+'" /></li>').data("thumb_id",I).appendTo(l)});aV=l.children("li").css({opacity:c.smallthumb_inactive_opacity});
if(aj<3){aj=3}if(q>aj){if(c.show_begin_end_smallthumb){Q=av.eq(q-1).data("src");I=w.eq(q-1).data("id");a('<li class="etalage_smallthumb_first etalage_smallthumb_navtoend"><img class="etalage_small_thumb" src="'+Q+'" /></li>').data("src",Q).data("thumb_id",I).css({opacity:c.smallthumb_inactive_opacity}).prependTo(l);Q=av.eq(0).data("src");I=w.eq(0).data("id");a('<li class="etalage_smallthumb_navtostart"><img class="etalage_small_thumb" src="'+Q+'" /></li>').data("src",Q).data("thumb_id",I).css({opacity:c.smallthumb_inactive_opacity}).appendTo(l);
aV=l.children("li");aV.eq(1).addClass("etalage_smallthumb_active").css({opacity:1})}else{aV.eq(0).addClass("etalage_smallthumb_first etalage_smallthumb_active").css({opacity:1})}aV.eq(aj-1).addClass("etalage_smallthumb_last")}else{aV.eq(0).addClass("etalage_smallthumb_active").css({opacity:1})}a.each(aV,function(j){a(this).data("id",(j+1))});u=aV.children("img");y=aV.length;if(aF==="vert"){aV.addClass("vertical")}}if(c.magnifier_invert){aq=1}else{aq=c.magnifier_opacity}var aN=parseInt(w.css("borderLeftWidth"),10)+parseInt(w.css("borderRightWidth"),10)+parseInt(av.css("borderLeftWidth"),10)+parseInt(av.css("borderRightWidth"),10),Z=parseInt(w.css("marginLeft"),10)+parseInt(w.css("marginRight"),10),B=parseInt(w.css("paddingLeft"),10)+parseInt(w.css("paddingRight"),10)+parseInt(av.css("marginLeft"),10)+parseInt(av.css("marginRight"),10)+parseInt(av.css("paddingLeft"),10)+parseInt(av.css("paddingRight"),10),N=c.thumb_image_width+aN+Z+B,O=c.thumb_image_height+aN+Z+B,aE=0,P=0,ax=0,ag=0,aD=0,o=0,aH=0;
if(q>1||!c.smallthumb_hide_single){aE=parseInt(aV.css("borderLeftWidth"),10)+parseInt(aV.css("borderRightWidth"),10)+parseInt(u.css("borderLeftWidth"),10)+parseInt(u.css("borderRightWidth"),10);P=parseInt(aV.css("marginTop"),10);ax=parseInt(aV.css("paddingLeft"),10)+parseInt(aV.css("paddingRight"),10)+parseInt(u.css("marginLeft"),10)+parseInt(u.css("marginRight"),10)+parseInt(u.css("paddingLeft"),10)+parseInt(u.css("paddingRight"),10);if(aF==="vert"){aD=Math.round((O-((aj-1)*P))/aj)-(aE+ax);ag=Math.round((c.thumb_image_width*aD)/c.thumb_image_height);
o=ag+aE+ax;aH=aD+aE+ax}else{ag=Math.round((N-((aj-1)*P))/aj)-(aE+ax);aD=Math.round((c.thumb_image_height*ag)/c.thumb_image_width);o=ag+aE+ax;aH=aD+aE+ax}}var d=parseInt(K.css("borderTopWidth"),10),aA=parseInt(c.zoom_area_distance,10),J=parseInt(K.css("paddingTop"),10),T,a0;if((c.zoom_area_width-(d*2)-(J*2))>c.source_image_width){T=c.source_image_width}else{T=c.zoom_area_width-(d*2)-(J*2)}if(c.zoom_area_height==="justify"){a0=(O+P+aH)-(d*2)-(J*2)}else{a0=c.zoom_area_height-(d*2)-(J*2)}if(a0>c.source_image_height){a0=c.source_image_height
}var aX,at,v,ar;if(c.show_descriptions){aX=parseInt(az.css("borderLeftWidth"),10)+parseInt(az.css("borderRightWidth"),10);at=parseInt(az.css("marginLeft"),10)+parseInt(az.css("marginRight"),10);v=parseInt(az.css("paddingLeft"),10)+parseInt(az.css("paddingRight"),10);ar=T-aX-at-v}var aM;if(e){aM=a('<iframe marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="javascript:\'<html></html>\'"></iframe>').css({position:"absolute",zIndex:1}).prependTo(K)}var S=parseInt(aO.css("borderTopWidth"),10),aK=parseInt(w.css("borderTopWidth"),10)+parseInt(w.css("marginTop"),10)+parseInt(w.css("paddingTop"),10)+parseInt(av.css("borderTopWidth"),10)+parseInt(av.css("marginTop"),10)-S,am=av.offset().left-aG.offset().left-S;
if(c.smallthumbs_position==="left"){am=am+o+P}else{if(c.smallthumbs_position==="top"){aK=aK+aH+P}}var V=Math.round(T*(c.thumb_image_width/c.source_image_width)),R=Math.round(a0*(c.thumb_image_height/c.source_image_height)),M=aK+c.thumb_image_height-R,p=am+c.thumb_image_width-V,af=Math.round(V/2),ae=Math.round(R/2),H,C;if(c.show_hint){H=parseInt(c.hint_offset,10)+parseInt(r.css("marginTop"),10);C=parseInt(c.hint_offset,10)+parseInt(r.css("marginRight"),10);if(c.smallthumbs_position==="right"){C=C-o-P
}}if(aF==="vert"){aS=N+P+o;aG.css({width:aS,height:O})}else{aS=N;aG.css({width:aS,height:O+P+aH})}if(c.show_icon){aw={top:O-E.outerHeight(true)-parseInt(c.icon_offset,10),left:parseInt(c.icon_offset,10)};if(c.smallthumbs_position==="left"){aw.left=o+P+parseInt(c.icon_offset,10)}else{if(c.smallthumbs_position==="top"){aw.top+=aH+P}}E.css(aw)}if(c.show_hint){r.css({margin:0,top:-H,right:-C})}h.css({margin:0,padding:0,width:c.thumb_image_width,height:c.thumb_image_height});aa.css({margin:0,padding:0,width:V,height:R});
aw={margin:0,padding:0,left:(p-am)/2,top:(M-aK)/2};if(c.smallthumbs_position==="left"){aw.left="+="+o+P}else{if(c.smallthumbs_position==="top"){aw.top="+="+aH+P}}aO.css(aw).hide();W.css({width:T,height:a0});aw={margin:0,opacity:0};if(c.align==="right"&&s==="auto"){aw.left=-(T+(d*2)+(J*2)+aA)}else{if(s==="auto"){aw.left=aS+aA}}K.css(aw).hide();if(c.show_descriptions){aw={width:ar,bottom:J,left:J,opacity:c.description_opacity};if(c.description_location==="top"){aw.top=J;aw.bottom="auto"}az.css(aw).hide()
}if(q>1||!c.smallthumb_hide_single){if(aF==="vert"){aw={top:0,height:O};if(c.smallthumbs_position==="left"){w.css({left:o+P})}else{aw.marginLeft=N+P}aQ.css(aw);l.css({height:(aH*y)+(y*P)+100});u.css({width:ag,height:aD}).attr("height",aD);aV.css({margin:0,marginBottom:P})}else{aw={width:N};if(c.smallthumbs_position==="top"){w.css({top:aH+P})}else{aw.top=O+P}aQ.css(aw);l.css({width:(o*y)+(y*P)+100});u.css({width:ag,height:aD}).attr("width",ag);aV.css({margin:0,marginRight:P})}if(aF==="vert"){aL=((aH*aj)+((aj-1)*P))-O
}else{aL=((o*aj)+((aj-1)*P))-N}if(aL>0){for(ad=1;ad<=(y-1);ad=ad+(aj-1)){ab=1;for(ab;ab<=aL;ab+=1){if(aF==="vert"){aV.eq(ad+ab-1).css({marginBottom:(P-1)})}else{aV.eq(ad+ab-1).css({marginRight:(P-1)})}}}}else{if(aL<0){for(ad=1;ad<=(y-1);ad=ad+(aj-1)){ab=1;for(ab;ab<=(-aL);ab+=1){if(aF==="vert"){aV.eq(ad+ab-1).css({marginBottom:(P+1)});l.css({height:parseInt(l.css("height"),10)+1})}else{aV.eq(ad+ab-1).css({marginRight:(P+1)});l.css({width:parseInt(l.css("width"),10)+1})}}}}}}if(c.show_icon&&!c.magnifier_invert){aO.css({background:aO.css("background-color")+" "+E.css("background-image")+" center no-repeat"})
}if(c.hide_cursor){aO.add(E).css({cursor:"none"})}if(e){aM.css({width:W.css("width"),height:W.css("height")})}var ay=w.first().find(".etalage_thumb_image"),ap=w.first().find(".etalage_source_image");if(c.magnifier_invert){h.attr("src",ay.data("src")).show()}if(ao){an.attr("src",ay.data("src"))}aB.attr("src",ap.attr("src"));if(c.show_descriptions){f=ap.attr("title");if(f){az.html(f).show()}}var D=function(){if(t){clearInterval(t);t=false}};var k=function(){if(t){D()}t=setInterval(function(){au()},c.autoplay_interval)
};var U=function(){aO.stop().fadeTo(aZ,aq);E.stop().animate({opacity:0},aZ);K.stop().show().animate({opacity:1},aZ);if(c.magnifier_invert){ay.stop().animate({opacity:c.magnifier_opacity},aZ)}if(aJ){D()}};var aW=function(){aO.stop().fadeOut(c.speed);E.stop().animate({opacity:1},c.speed);K.stop().animate({opacity:0},c.speed,function(){a(this).hide()});if(c.magnifier_invert){ay.stop().animate({opacity:1},c.speed,function(){if(c.click_to_zoom){A=false}})}clearTimeout(x);if(aJ){k()}};var g=function(a3,a1){var j,a2,i=aG.find(".etalage_smallthumb_active").removeClass("etalage_smallthumb_active");
a3.addClass("etalage_smallthumb_active");aO.stop().hide();K.stop().hide();if(!a1){ai=true;i.stop(true,true).animate({opacity:c.smallthumb_inactive_opacity},aZ);a3.stop(true,true).animate({opacity:1},aZ,function(){ai=false})}aG.find(".etalage_thumb_active").removeClass("etalage_thumb_active").stop().animate({opacity:0},c.speed,function(){a(this).hide()});j=w.filter(".thumb_"+a3.data("thumb_id")).addClass("etalage_thumb_active").show().stop().css({opacity:0}).animate({opacity:1},c.speed);ay=j.find(".etalage_thumb_image");
ap=j.find(".etalage_source_image");if(c.magnifier_invert){h.attr("src",ay.data("src"))}if(ao){an.attr("src",ay.data("src"))}aB.attr("src",ap.attr("src"));if(c.show_descriptions){f=ap.attr("title");if(f){az.html(f).show()}else{az.hide()}}if(aJ){D();k()}a2=a3.data("id");if(q>=aj){a2--}ah(a2)};var G=function(a2,j,i,a1){a.each(aV,function(){var a4=a(this),a3={opacity:c.smallthumb_inactive_opacity};if(a4.data("id")===a1.data("id")){a3.opacity=1}if(aF==="vert"){a3.top="-="+a2}else{a3.left="-="+a2}a4.animate(a3,aZ,"swing",function(){if(ai){a1.addClass("etalage_smallthumb_active");
ai=false}})});g(a1,true)};var aY=function(){var a2=Y-al,a1=X-ak,j=-a2/aC,i=-a1/aC;al=al-j;ak=ak-i;if(a2<1&&a2>-1){al=Y}if(a1<1&&a1>-1){ak=X}aB.css({left:al,top:ak});if(ao){an.css({left:al,top:ak})}if(a2>1||a1>1||a2<1||a1<1){x=setTimeout(function(){aY()},25)}};var L=function(){var i;if(c.magnifier_invert){aG.find(".etalage_thumb_active").mouseleave()}if(!c.right_to_left){i=aG.find(".etalage_smallthumb_active").prev();if(!i.length){if(q>aj){F()}else{aV.last().trigger("click")}return true}}else{i=aG.find(".etalage_smallthumb_active").next();
if(!i.length){if(q>aj){ac()}else{aV.first().trigger("click")}return true}}i.trigger("click")};var au=function(){var i;if(c.magnifier_invert){aG.find(".etalage_thumb_active").mouseleave()}if(!c.right_to_left){i=aG.find(".etalage_smallthumb_active").next();if(!i.length){if(q>aj){ac()}else{aV.first().trigger("click")}return true}}else{i=aG.find(".etalage_smallthumb_active").prev();if(!i.length){if(q>aj){F()}else{aV.last().trigger("click")}return true}}i.trigger("click")};var n=function(a2){if(q<=aj||!c.show_begin_end_smallthumb){a2=a2-1
}var a6=aV.eq(a2);if(a6.length&&!ai){var a5=aG.find(".etalage_smallthumb_active"),a1=a5.data("id")-1,j;if(a1>a2){z=a1-a2;var a3=aG.find(".etalage_smallthumb_first"),a7=a3.data("id");if(a2<a7){j=a1-a7;z=z-j;a3.trigger("click")}else{g(a6,false)}}else{if(a1<a2){z=a2-a1;var a4=aG.find(".etalage_smallthumb_last"),i=a4.data("id")-1;if(a2>=i){j=i-a1-1;z=z-j;a4.trigger("click")}else{g(a6,false)}}}}};window[aR+"_previous"]=function(){L()};window[aR+"_next"]=function(){au()};window[aR+"_show"]=function(i){n(i)
};var aI=function(i){if(!c.click_callback(i,aR)){return false}if(typeof etalage_click_callback==="function"){etalage_click_callback(i,aR);return false}return true};var ah=function(i){if(c.change_callback(i,aR)){if(typeof etalage_change_callback==="function"){etalage_change_callback(i,aR)}}};w.add(aO).add(E).mouseenter(function(){if(c.show_hint){r.hide()}if(!c.click_to_zoom||A){U()}}).mouseleave(function(){aW()});var aU=-(c.source_image_width-T),aT=-(c.source_image_height-a0);w.add(aO).add(E).mousemove(function(a5){var j=Math.round(a5.pageX-ay.offset().left+am),i=Math.round(a5.pageY-ay.offset().top+aK);
var a4=(j-af),a3=(i-ae);if(a4<am){a4=am}if(a4>p){a4=p}if(a3<aK){a3=aK}if(a3>M){a3=M}aO.css({left:a4,top:a3});if(c.magnifier_invert){var a2=a4-am,a1=a3-aK;h.css({left:-a2,top:-a1})}Y=-((a4-am)*(1/(c.thumb_image_width/c.source_image_width)));X=-((a3-aK)*(1/(c.thumb_image_height/c.source_image_height)));if(Y<aU){Y=aU}if(X<aT){X=aT}if(c.zoom_easing){clearTimeout(x);aY()}else{if(ao){an.css({left:Y,top:X})}aB.css({left:Y,top:X})}});function aP(a2){z=(z)?z-1:0;ai=true;var a1=aG.find(".etalage_smallthumb_first").removeClass("etalage_smallthumb_first");
var i=aG.find(".etalage_smallthumb_last").removeClass("etalage_smallthumb_last");var a3,j,a5,a4;if(a2==="left"){a3=a1.prev().addClass("etalage_smallthumb_first");j=i.prev().addClass("etalage_smallthumb_last");a5=a1}else{a3=a1.next().addClass("etalage_smallthumb_first");j=i.next().addClass("etalage_smallthumb_last");a5=i}if(z){if(a2==="left"){a3.trigger("click")}else{j.trigger("click")}}else{a4=(aF==="vert")?a3.position().top:a3.position().left;G(a4,a3,j,a5)}}function m(a5){ai=true;var a1=aG.find(".etalage_smallthumb_first").removeClass("etalage_smallthumb_first");
var i=aG.find(".etalage_smallthumb_last").removeClass("etalage_smallthumb_last");var a2,j,a4;if(a5==="end"){a2=aV.eq(y-aj).addClass("etalage_smallthumb_first");j=aV.eq(y-1).addClass("etalage_smallthumb_last");a4=j;if(j.hasClass("etalage_smallthumb_navtostart")){a4=j.prev()}}else{a2=aV.eq(0).addClass("etalage_smallthumb_first");j=aV.eq(aj-1).addClass("etalage_smallthumb_last");a4=a2;if(a2.hasClass("etalage_smallthumb_navtoend")){a4=a2.next()}}var a3=(aF==="vert")?a2.position().top:a2.position().left;
G(a3,a2,j,a4)}function ac(){m("start")}function F(){m("end")}if(q>1||!c.smallthumb_hide_single){aV.click(function(){var a7=a(this),a3,j=0,a5=false,a2,a8,a4,a6,a1;if(!a7.hasClass("etalage_smallthumb_active")&&(!ai||z)){if(a7.hasClass("etalage_smallthumb_first")&&a7.prev().length){aP("left")}else{if(a7.hasClass("etalage_smallthumb_navtoend")){F()}else{if(a7.hasClass("etalage_smallthumb_last")&&a7.next().length){aP("right")}else{if(a7.hasClass("etalage_smallthumb_navtostart")){ac()}else{if(z&&!a(this).next().length){F();
return true}else{if(z&&!a(this).prev().length){ac();return true}}g(a7,false)}}}}}});if(c.smallthumb_select_on_hover){aV.mouseenter(function(){a(this).trigger("click")})}}if(c.click_to_zoom){w.click(function(){A=true;U()})}else{aO.click(function(){var i=ay.data("anchor");if(i){if(aI(i)){window.location=i}}})}if(q>1&&c.keyboard){a(document).keydown(function(i){if(i.keyCode===39||i.keyCode==="39"){if(!c.right_to_left){au()}else{L()}}if(i.keyCode===37||i.keyCode==="37"){if(!c.right_to_left){L()}else{au()
}}})}a(window).bind("load",function(){w.css({"background-image":"none"});K.css({"background-image":"none"});if(ao){ao=false;an.remove()}});if(aJ){k()}}});return this}})(jQuery);
/*!
 * jQuery twitter bootstrap wizard plugin
 * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
 * version 1.0
 * Requires jQuery v1.3.2 or later
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
 */
(function(e){var k=function(d,g){d=e(d);var b=this,a=e.extend({},e.fn.bootstrapWizard.defaults,g),f=null,c=null;this.fixNavigationButtons=function(){f.length||(c.find("a:first").tab("show"),f=c.find("li:first"));e(a.previousSelector,d).toggleClass("disabled",b.firstIndex()>=b.currentIndex());e(a.nextSelector,d).toggleClass("disabled",b.currentIndex()>=b.navigationLength());e(a.nextSelector,d).unbind("click",b.next);e(a.previousSelector,d).unbind("click",b.previous);e(a.lastSelector,d).unbind("click",
b.last);e(a.firstSelector,d).unbind("click",b.first);e(a.nextSelector,d).one("click",b.next);e(a.previousSelector,d).one("click",b.previous);e(a.lastSelector,d).one("click",b.last);e(a.firstSelector,d).one("click",b.first);if(a.onTabShow&&"function"===typeof a.onTabShow&&!1===a.onTabShow(f,c,b.currentIndex()))return!1};this.next=function(h){if(d.hasClass("last")||a.onNext&&"function"===typeof a.onNext&&!1===a.onNext(f,c,b.nextIndex()))return!1;$index=b.nextIndex();$index>b.navigationLength()||c.find("li:eq("+
$index+") a").tab("show")};this.previous=function(h){if(d.hasClass("first")||a.onPrevious&&"function"===typeof a.onPrevious&&!1===a.onPrevious(f,c,b.previousIndex()))return!1;$index=b.previousIndex();0>$index||c.find("li:eq("+$index+") a").tab("show")};this.first=function(h){if(a.onFirst&&"function"===typeof a.onFirst&&!1===a.onFirst(f,c,b.firstIndex())||d.hasClass("disabled"))return!1;c.find("li:eq(0) a").tab("show")};this.last=function(h){if(a.onLast&&"function"===typeof a.onLast&&!1===a.onLast(f,
c,b.lastIndex())||d.hasClass("disabled"))return!1;c.find("li:eq("+b.navigationLength()+") a").tab("show")};this.currentIndex=function(){return c.find("li").index(f)};this.firstIndex=function(){return 0};this.lastIndex=function(){return b.navigationLength()};this.getIndex=function(a){return c.find("li").index(a)};this.nextIndex=function(){return c.find("li").index(f)+1};this.previousIndex=function(){return c.find("li").index(f)-1};this.navigationLength=function(){return c.find("li").length-1};this.activeTab=
function(){return f};this.nextTab=function(){return c.find("li:eq("+(b.currentIndex()+1)+")").length?c.find("li:eq("+(b.currentIndex()+1)+")"):null};this.previousTab=function(){return 0>=b.currentIndex()?null:c.find("li:eq("+parseInt(b.currentIndex()-1)+")")};this.show=function(a){return d.find("li:eq("+a+") a").tab("show")};this.disable=function(a){c.find("li:eq("+a+")").addClass("disabled")};this.enable=function(a){c.find("li:eq("+a+")").removeClass("disabled")};this.hide=function(a){c.find("li:eq("+
a+")").hide()};this.display=function(a){c.find("li:eq("+a+")").show()};this.remove=function(a){var b="undefined"!=typeof a[1]?a[1]:!1;a=c.find("li:eq("+a[0]+")");b&&(b=a.find("a").attr("href"),e(b).remove());a.remove()};c=d.find("ul:first",d);f=c.find("li.active",d);c.hasClass(a.tabClass)||c.addClass(a.tabClass);if(a.onInit&&"function"===typeof a.onInit)a.onInit(f,c,0);if(a.onShow&&"function"===typeof a.onShow)a.onShow(f,c,b.nextIndex());b.fixNavigationButtons();e('a[data-toggle="tab"]',c).on("click",
function(d){d=c.find("li").index(e(d.currentTarget).parent("li"));if(a.onTabClick&&"function"===typeof a.onTabClick&&!1===a.onTabClick(f,c,b.currentIndex(),d))return!1});e('a[data-toggle="tab"]',c).on("shown",function(d){$element=e(d.target).parent();d=c.find("li").index($element);if($element.hasClass("disabled")||a.onTabChange&&"function"===typeof a.onTabChange&&!1===a.onTabChange(f,c,b.currentIndex(),d))return!1;f=$element;b.fixNavigationButtons()})};e.fn.bootstrapWizard=function(d){if("string"==
typeof d){var g=Array.prototype.slice.call(arguments,1);1===g.length&&g.toString();return this.data("bootstrapWizard")[d](g)}return this.each(function(b){b=e(this);if(!b.data("bootstrapWizard")){var a=new k(b,d);b.data("bootstrapWizard",a)}})};e.fn.bootstrapWizard.defaults={tabClass:"nav nav-pills",nextSelector:".wizard li.next",previousSelector:".wizard li.previous",firstSelector:".wizard li.first",lastSelector:".wizard li.last",onShow:null,onInit:null,onNext:null,onPrevious:null,onLast:null,onFirst:null,
onTabChange:null,onTabClick:null,onTabShow:null}})(jQuery);

var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function(){function L(a){function m(a){var f=a.charCodeAt(0);if(f!==92)return f;var b=a.charAt(1);return(f=r[b])?f:"0"<=b&&b<="7"?parseInt(a.substring(1),8):b==="u"||b==="x"?parseInt(a.substring(2),16):a.charCodeAt(1)}function e(a){if(a<32)return(a<16?"\\x0":"\\x")+a.toString(16);a=String.fromCharCode(a);if(a==="\\"||a==="-"||a==="["||a==="]")a="\\"+a;return a}function h(a){for(var f=a.substring(1,a.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),a=
[],b=[],o=f[0]==="^",c=o?1:0,i=f.length;c<i;++c){var j=f[c];if(/\\[bdsw]/i.test(j))a.push(j);else{var j=m(j),d;c+2<i&&"-"===f[c+1]?(d=m(f[c+2]),c+=2):d=j;b.push([j,d]);d<65||j>122||(d<65||j>90||b.push([Math.max(65,j)|32,Math.min(d,90)|32]),d<97||j>122||b.push([Math.max(97,j)&-33,Math.min(d,122)&-33]))}}b.sort(function(a,f){return a[0]-f[0]||f[1]-a[1]});f=[];j=[NaN,NaN];for(c=0;c<b.length;++c)i=b[c],i[0]<=j[1]+1?j[1]=Math.max(j[1],i[1]):f.push(j=i);b=["["];o&&b.push("^");b.push.apply(b,a);for(c=0;c<
f.length;++c)i=f[c],b.push(e(i[0])),i[1]>i[0]&&(i[1]+1>i[0]&&b.push("-"),b.push(e(i[1])));b.push("]");return b.join("")}function y(a){for(var f=a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),b=f.length,d=[],c=0,i=0;c<b;++c){var j=f[c];j==="("?++i:"\\"===j.charAt(0)&&(j=+j.substring(1))&&j<=i&&(d[j]=-1)}for(c=1;c<d.length;++c)-1===d[c]&&(d[c]=++t);for(i=c=0;c<b;++c)j=f[c],j==="("?(++i,d[i]===void 0&&(f[c]="(?:")):"\\"===j.charAt(0)&&
(j=+j.substring(1))&&j<=i&&(f[c]="\\"+d[i]);for(i=c=0;c<b;++c)"^"===f[c]&&"^"!==f[c+1]&&(f[c]="");if(a.ignoreCase&&s)for(c=0;c<b;++c)j=f[c],a=j.charAt(0),j.length>=2&&a==="["?f[c]=h(j):a!=="\\"&&(f[c]=j.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return f.join("")}for(var t=0,s=!1,l=!1,p=0,d=a.length;p<d;++p){var g=a[p];if(g.ignoreCase)l=!0;else if(/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){s=!0;l=!1;break}}for(var r=
{b:8,t:9,n:10,v:11,f:12,r:13},n=[],p=0,d=a.length;p<d;++p){g=a[p];if(g.global||g.multiline)throw Error(""+g);n.push("(?:"+y(g)+")")}return RegExp(n.join("|"),l?"gi":"g")}function M(a){function m(a){switch(a.nodeType){case 1:if(e.test(a.className))break;for(var g=a.firstChild;g;g=g.nextSibling)m(g);g=a.nodeName;if("BR"===g||"LI"===g)h[s]="\n",t[s<<1]=y++,t[s++<<1|1]=a;break;case 3:case 4:g=a.nodeValue,g.length&&(g=p?g.replace(/\r\n?/g,"\n"):g.replace(/[\t\n\r ]+/g," "),h[s]=g,t[s<<1]=y,y+=g.length,
t[s++<<1|1]=a)}}var e=/(?:^|\s)nocode(?:\s|$)/,h=[],y=0,t=[],s=0,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=document.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);m(a);return{a:h.join("").replace(/\n$/,""),c:t}}function B(a,m,e,h){m&&(a={a:m,d:a},e(a),h.push.apply(h,a.e))}function x(a,m){function e(a){for(var l=a.d,p=[l,"pln"],d=0,g=a.a.match(y)||[],r={},n=0,z=g.length;n<z;++n){var f=g[n],b=r[f],o=void 0,c;if(typeof b===
"string")c=!1;else{var i=h[f.charAt(0)];if(i)o=f.match(i[1]),b=i[0];else{for(c=0;c<t;++c)if(i=m[c],o=f.match(i[1])){b=i[0];break}o||(b="pln")}if((c=b.length>=5&&"lang-"===b.substring(0,5))&&!(o&&typeof o[1]==="string"))c=!1,b="src";c||(r[f]=b)}i=d;d+=f.length;if(c){c=o[1];var j=f.indexOf(c),k=j+c.length;o[2]&&(k=f.length-o[2].length,j=k-c.length);b=b.substring(5);B(l+i,f.substring(0,j),e,p);B(l+i+j,c,C(b,c),p);B(l+i+k,f.substring(k),e,p)}else p.push(l+i,b)}a.e=p}var h={},y;(function(){for(var e=a.concat(m),
l=[],p={},d=0,g=e.length;d<g;++d){var r=e[d],n=r[3];if(n)for(var k=n.length;--k>=0;)h[n.charAt(k)]=r;r=r[1];n=""+r;p.hasOwnProperty(n)||(l.push(r),p[n]=q)}l.push(/[\S\s]/);y=L(l)})();var t=m.length;return e}function u(a){var m=[],e=[];a.tripleQuotedStrings?m.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):a.multiLineStrings?m.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
q,"'\"`"]):m.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);a.verbatimStrings&&e.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var h=a.hashComments;h&&(a.cStyleComments?(h>1?m.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):m.push(["com",/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),e.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,q])):m.push(["com",/^#[^\n\r]*/,
q,"#"]));a.cStyleComments&&(e.push(["com",/^\/\/[^\n\r]*/,q]),e.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));a.regexLiterals&&e.push(["lang-regex",/^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);(h=a.types)&&e.push(["typ",h]);a=(""+a.keywords).replace(/^ | $/g,
"");a.length&&e.push(["kwd",RegExp("^(?:"+a.replace(/[\s,]+/g,"|")+")\\b"),q]);m.push(["pln",/^\s+/,q," \r\n\t\xa0"]);e.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,q],["pun",/^.[^\s\w"-$'./@\\`]*/,q]);return x(m,e)}function D(a,m){function e(a){switch(a.nodeType){case 1:if(k.test(a.className))break;if("BR"===a.nodeName)h(a),
a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)e(a);break;case 3:case 4:if(p){var b=a.nodeValue,d=b.match(t);if(d){var c=b.substring(0,d.index);a.nodeValue=c;(b=b.substring(d.index+d[0].length))&&a.parentNode.insertBefore(s.createTextNode(b),a.nextSibling);h(a);c||a.parentNode.removeChild(a)}}}}function h(a){function b(a,d){var e=d?a.cloneNode(!1):a,f=a.parentNode;if(f){var f=b(f,1),g=a.nextSibling;f.appendChild(e);for(var h=g;h;h=g)g=h.nextSibling,f.appendChild(h)}return e}
for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),e;(e=a.parentNode)&&e.nodeType===1;)a=e;d.push(a)}var k=/(?:^|\s)nocode(?:\s|$)/,t=/\r\n?|\n/,s=a.ownerDocument,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=s.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);for(l=s.createElement("LI");a.firstChild;)l.appendChild(a.firstChild);for(var d=[l],g=0;g<d.length;++g)e(d[g]);m===(m|0)&&d[0].setAttribute("value",
m);var r=s.createElement("OL");r.className="linenums";for(var n=Math.max(0,m-1|0)||0,g=0,z=d.length;g<z;++g)l=d[g],l.className="L"+(g+n)%10,l.firstChild||l.appendChild(s.createTextNode("\xa0")),r.appendChild(l);a.appendChild(r)}function k(a,m){for(var e=m.length;--e>=0;){var h=m[e];A.hasOwnProperty(h)?window.console&&console.warn("cannot override language handler %s",h):A[h]=a}}function C(a,m){if(!a||!A.hasOwnProperty(a))a=/^\s*</.test(m)?"default-markup":"default-code";return A[a]}function E(a){var m=
a.g;try{var e=M(a.h),h=e.a;a.a=h;a.c=e.c;a.d=0;C(m,h)(a);var k=/\bMSIE\b/.test(navigator.userAgent),m=/\n/g,t=a.a,s=t.length,e=0,l=a.c,p=l.length,h=0,d=a.e,g=d.length,a=0;d[g]=s;var r,n;for(n=r=0;n<g;)d[n]!==d[n+2]?(d[r++]=d[n++],d[r++]=d[n++]):n+=2;g=r;for(n=r=0;n<g;){for(var z=d[n],f=d[n+1],b=n+2;b+2<=g&&d[b+1]===f;)b+=2;d[r++]=z;d[r++]=f;n=b}for(d.length=r;h<p;){var o=l[h+2]||s,c=d[a+2]||s,b=Math.min(o,c),i=l[h+1],j;if(i.nodeType!==1&&(j=t.substring(e,b))){k&&(j=j.replace(m,"\r"));i.nodeValue=
j;var u=i.ownerDocument,v=u.createElement("SPAN");v.className=d[a+1];var x=i.parentNode;x.replaceChild(v,i);v.appendChild(i);e<o&&(l[h+1]=i=u.createTextNode(t.substring(b,o)),x.insertBefore(i,v.nextSibling))}e=b;e>=o&&(h+=2);e>=c&&(a+=2)}}catch(w){"console"in window&&console.log(w&&w.stack?w.stack:w)}}var v=["break,continue,do,else,for,if,return,while"],w=[[v,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],F=[w,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],G=[w,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
H=[G,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],w=[w,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],I=[v,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
J=[v,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],v=[v,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],K=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,N=/\S/,O=u({keywords:[F,H,w,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END"+
I,J,v],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),A={};k(O,["default-code"]);k(x([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),
["default-markup","htm","html","mxml","xhtml","xml","xsl"]);k(x([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",
/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);k(x([],[["atv",/^[\S\s]+/]]),["uq.val"]);k(u({keywords:F,hashComments:!0,cStyleComments:!0,types:K}),["c","cc","cpp","cxx","cyc","m"]);k(u({keywords:"null,true,false"}),["json"]);k(u({keywords:H,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:K}),["cs"]);k(u({keywords:G,cStyleComments:!0}),["java"]);k(u({keywords:v,hashComments:!0,multiLineStrings:!0}),["bsh","csh","sh"]);k(u({keywords:I,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),
["cv","py"]);k(u({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]);k(u({keywords:J,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb"]);k(u({keywords:w,cStyleComments:!0,regexLiterals:!0}),["js"]);k(u({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);k(x([],[["str",/^[\S\s]+/]]),["regex"]);window.prettyPrintOne=function(a,m,e){var h=document.createElement("PRE");h.innerHTML=a;e&&D(h,e);E({g:m,i:e,h:h});return h.innerHTML};window.prettyPrint=function(a){function m(){for(var e=window.PR_SHOULD_USE_CONTINUATION?l.now()+250:Infinity;p<h.length&&l.now()<e;p++){var n=h[p],k=n.className;if(k.indexOf("prettyprint")>=0){var k=k.match(g),f,b;if(b=
!k){b=n;for(var o=void 0,c=b.firstChild;c;c=c.nextSibling)var i=c.nodeType,o=i===1?o?b:c:i===3?N.test(c.nodeValue)?b:o:o;b=(f=o===b?void 0:o)&&"CODE"===f.tagName}b&&(k=f.className.match(g));k&&(k=k[1]);b=!1;for(o=n.parentNode;o;o=o.parentNode)if((o.tagName==="pre"||o.tagName==="code"||o.tagName==="xmp")&&o.className&&o.className.indexOf("prettyprint")>=0){b=!0;break}b||((b=(b=n.className.match(/\blinenums\b(?::(\d+))?/))?b[1]&&b[1].length?+b[1]:!0:!1)&&D(n,b),d={g:k,h:n,i:b},E(d))}}p<h.length?setTimeout(m,
250):a&&a()}for(var e=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],h=[],k=0;k<e.length;++k)for(var t=0,s=e[k].length;t<s;++t)h.push(e[k][t]);var e=q,l=Date;l.now||(l={now:function(){return+new Date}});var p=0,d,g=/\blang(?:uage)?-([\w.]+)(?!\S)/;m()};window.PR={createSimpleLexer:x,registerLangHandler:k,sourceDecorator:u,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",
PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ"}})();
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
(e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
[this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
!1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
(a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
!0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
!1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
"function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
!1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
(c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
[d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
"px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);
/*
 * FancyBox Plus - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://igorlino.github.io/fancybox-plus/
 *
 * Version: 1.3.5 (20.06.2015)
 * Requires: jQuery v1.3+
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

;
(function ($) {
    var tmp, loading, overlay, wrap, outer, content, close, title, nav_left, nav_right,

        selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [],

        ajaxLoader = null, imgPreloader = new Image(), imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i,

        loadingTimer, loadingFrame = 1,

        titleHeight = 0, titleStr = '', start_pos, final_pos, busy = false, fx = $.extend($('<div/>')[0], {prop: 0}),

        isIE6 = navigator.userAgent.match(/msie [6]/i) && !window.XMLHttpRequest,

    /*
     * Private methods
     */

        _abort = function () {
            loading.hide();

            imgPreloader.onerror = imgPreloader.onload = null;

            if (ajaxLoader) {
                ajaxLoader.abort();
            }

            tmp.empty();
        },

        _error = function () {
            if (false === selectedOpts.onError(selectedArray, selectedIndex, selectedOpts)) {
                loading.hide();
                busy = false;
                return;
            }

            selectedOpts.titleShow = false;

            selectedOpts.width = 'auto';
            selectedOpts.height = 'auto';

            tmp.html('<p id="fbplus-error">The requested content cannot be loaded.<br />Please try again later.</p>');

            _process_inline();
        },

        _start = function () {
            var obj = selectedArray[selectedIndex],
                href,
                type,
                title,
                str,
                emb,
                ret;

            _abort();

            selectedOpts = $.extend({}, $.fn.fancyboxPlus.defaults, (typeof $(obj).data('fancyboxPlus') == 'undefined' ? selectedOpts : $(obj).data('fancyboxPlus')));

            ret = selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts);

            if (ret === false) {
                busy = false;
                return;
            } else if (typeof ret == 'object') {
                selectedOpts = $.extend(selectedOpts, ret);
            }

            title = selectedOpts.title || (obj.nodeName ? $(obj).attr('title') : obj.title) || '';

            if (obj.nodeName && !selectedOpts.orig) {
                selectedOpts.orig = $(obj).children("img:first").length ? $(obj).children("img:first") : $(obj);
            }

            if (title === '' && selectedOpts.orig && selectedOpts.titleFromAlt) {
                title = selectedOpts.orig.attr('alt');
            }

            href = selectedOpts.href || (obj.nodeName ? $(obj).attr('href') : obj.href) || null;

            if ((/^(?:javascript)/i).test(href) || href == '#') {
                href = null;
            }

            if (selectedOpts.type) {
                type = selectedOpts.type;

                if (!href) {
                    href = selectedOpts.content;
                }

            } else if (selectedOpts.content) {
                type = 'html';

            } else if (href) {
                if (href.match(imgRegExp)) {
                    type = 'image';

                } else if (href.match(swfRegExp)) {
                    type = 'swf';

                } else if ($(obj).hasClass("iframe")) {
                    type = 'iframe';

                } else if (href.indexOf("#") === 0) {
                    type = 'inline';

                } else {
                    type = 'ajax';
                }
            }

            if (!type) {
                _error();
                return;
            }

            if (type == 'inline') {
                obj = href.substr(href.indexOf("#"));
                type = $(obj).length > 0 ? 'inline' : 'ajax';
            }

            selectedOpts.type = type;
            selectedOpts.href = href;
            selectedOpts.title = title;

            if (selectedOpts.autoDimensions) {
                if (selectedOpts.type == 'html' || selectedOpts.type == 'inline' || selectedOpts.type == 'ajax') {
                    selectedOpts.width = 'auto';
                    selectedOpts.height = 'auto';
                } else {
                    selectedOpts.autoDimensions = false;
                }
            }

            if (selectedOpts.modal) {
                selectedOpts.overlayShow = true;
                selectedOpts.hideOnOverlayClick = false;
                selectedOpts.hideOnContentClick = false;
                selectedOpts.enableEscapeButton = false;
                selectedOpts.showCloseButton = false;
            }

            selectedOpts.padding = parseInt(selectedOpts.padding, 10);
            selectedOpts.margin = parseInt(selectedOpts.margin, 10);

            tmp.css('padding', (selectedOpts.padding + selectedOpts.margin));

            $('.fbplus-inline-tmp').unbind('fbplus-cancel').bind('fbplus-change', function () {
                $(this).replaceWith(content.children());
            });

            switch (type) {
                case 'html' :
                    tmp.html(selectedOpts.content);
                    _process_inline();
                    break;

                case 'inline' :
                    if ($(obj).parent().is('#fbplus-content') === true) {
                        busy = false;
                        return;
                    }

                    $('<div class="fbplus-inline-tmp" />')
                        .hide()
                        .insertBefore($(obj))
                        .bind('fbplus-cleanup', function () {
                            $(this).replaceWith(content.children());
                        }).bind('fbplus-cancel', function () {
                        $(this).replaceWith(tmp.children());
                    });

                    $(obj).appendTo(tmp);

                    _process_inline();
                    break;

                case 'image':
                    busy = false;

                    $.fancyboxPlus.showActivity();

                    imgPreloader = new Image();

                    imgPreloader.onerror = function () {
                        _error();
                    };

                    imgPreloader.onload = function () {
                        busy = true;

                        imgPreloader.onerror = imgPreloader.onload = null;

                        _process_image();
                    };

                    imgPreloader.src = href;
                    break;

                case 'swf':
                    selectedOpts.scrolling = 'no';

                    str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
                    emb = '';

                    $.each(selectedOpts.swf, function (name, val) {
                        str += '<param name="' + name + '" value="' + val + '"></param>';
                        emb += ' ' + name + '="' + val + '"';
                    });

                    str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

                    tmp.html(str);

                    _process_inline();
                    break;

                case 'ajax':
                    busy = false;

                    $.fancyboxPlus.showActivity();

                    selectedOpts.ajax.win = selectedOpts.ajax.success;

                    ajaxLoader = $.ajax($.extend({}, selectedOpts.ajax, {
                        url: href,
                        data: selectedOpts.ajax.data || {},
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            if (XMLHttpRequest.status > 0) {
                                _error();
                            }
                        },
                        success: function (data, textStatus, XMLHttpRequest) {
                            var o = typeof XMLHttpRequest == 'object' ? XMLHttpRequest : ajaxLoader;
                            if (o.status == 200) {
                                if (typeof selectedOpts.ajax.win == 'function') {
                                    ret = selectedOpts.ajax.win(href, data, textStatus, XMLHttpRequest);

                                    if (ret === false) {
                                        loading.hide();
                                        return;
                                    } else if (typeof ret == 'string' || typeof ret == 'object') {
                                        data = ret;
                                    }
                                }

                                tmp.html(data);
                                _process_inline();
                            }
                        }
                    }));

                    break;

                case 'iframe':
                    _show();
                    break;
            }
        },

        _process_inline = function () {
            var
                w = selectedOpts.width,
                h = selectedOpts.height;

            if (w.toString().indexOf('%') > -1) {
                w = parseInt(($(window).width() - (selectedOpts.margin * 2)) * parseFloat(w) / 100, 10) + 'px';

            } else {
                w = w == 'auto' ? 'auto' : w + 'px';
            }

            if (h.toString().indexOf('%') > -1) {
                h = parseInt(($(window).height() - (selectedOpts.margin * 2)) * parseFloat(h) / 100, 10) + 'px';

            } else {
                h = h == 'auto' ? 'auto' : h + 'px';
            }

            tmp.wrapInner('<div style="width:' + w + ';height:' + h + ';overflow: ' + (selectedOpts.scrolling == 'auto' ? 'auto' : (selectedOpts.scrolling == 'yes' ? 'scroll' : 'hidden')) + ';position:relative;"></div>');

            selectedOpts.width = tmp.width();
            selectedOpts.height = tmp.height();

            _show();
        },

        _process_image = function () {
            selectedOpts.width = imgPreloader.width;
            selectedOpts.height = imgPreloader.height;

            $("<img />").attr({
                'id': 'fbplus-img',
                'src': imgPreloader.src,
                'alt': selectedOpts.title
            }).appendTo(tmp);

            _show();
        },

        _show = function () {
            var pos, equal;

            loading.hide();

            if (wrap.is(":visible") && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
                $.event.trigger('fbplus-cancel');

                busy = false;
                return;
            }

            busy = true;

            $(content.add(overlay)).unbind();

            $(window).unbind("resize.fb scroll.fb");
            $(document).unbind('keydown.fb');

            if (wrap.is(":visible") && currentOpts.titlePosition !== 'outside') {
                wrap.css('height', wrap.height());
            }

            currentArray = selectedArray;
            currentIndex = selectedIndex;
            currentOpts = selectedOpts;

            if (currentOpts.overlayShow) {
                overlay.css({
                    'background-color': currentOpts.overlayColor,
                    'opacity': currentOpts.overlayOpacity,
                    'cursor': currentOpts.hideOnOverlayClick ? 'pointer' : 'auto',
                    'height': $(document).height()
                });

                if (!overlay.is(':visible')) {
                    if (isIE6) {
                        $('select:not(#fbplus-tmp select)').filter(function () {
                            return this.style.visibility !== 'hidden';
                        }).css({'visibility': 'hidden'}).one('fbplus-cleanup', function () {
                            this.style.visibility = 'inherit';
                        });
                    }

                    overlay.show();
                }
            } else {
                overlay.hide();
            }

            final_pos = _get_zoom_to();

            _process_title();

            if (wrap.is(":visible")) {
                $(close.add(nav_left).add(nav_right)).hide();

                pos = wrap.position(),

                    start_pos = {
                        top: pos.top,
                        left: pos.left,
                        width: wrap.width(),
                        height: wrap.height()
                    };

                equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

                content.fadeTo(currentOpts.changeFade, 0.3, function () {
                    var finish_resizing = function () {
                        content.html(tmp.contents()).fadeTo(currentOpts.changeFade, 1, _finish);
                    };

                    $.event.trigger('fbplus-change');

                    content
                        .empty()
                        .removeAttr('filter')
                        .css({
                            'border-width': currentOpts.padding,
                            'width': final_pos.width - currentOpts.padding * 2,
                            'height': selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
                        });

                    if (equal) {
                        finish_resizing();

                    } else {
                        fx.prop = 0;

                        $(fx).animate({prop: 1}, {
                            duration: currentOpts.changeSpeed,
                            easing: currentOpts.easingChange,
                            step: _draw,
                            complete: finish_resizing
                        });
                    }
                });

                return;
            }

            wrap.removeAttr("style");

            content.css('border-width', currentOpts.padding);

            if (currentOpts.transitionIn == 'elastic') {
                start_pos = _get_zoom_from();

                content.html(tmp.contents());

                wrap.show();

                if (currentOpts.opacity) {
                    final_pos.opacity = 0;
                }

                fx.prop = 0;

                $(fx).animate({prop: 1}, {
                    duration: currentOpts.speedIn,
                    easing: currentOpts.easingIn,
                    step: _draw,
                    complete: _finish
                });

                return;
            }

            if (currentOpts.titlePosition == 'inside' && titleHeight > 0) {
                title.show();
            }

            content
                .css({
                    'width': final_pos.width - currentOpts.padding * 2,
                    'height': selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
                })
                .html(tmp.contents());

            wrap
                .css(final_pos)
                .fadeIn(currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish);
        },

        _format_title = function (title) {
            if (title && title.length) {
                if (currentOpts.titlePosition == 'float') {
                    return '<table id="fbplus-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fbplus-title-float-left"></td><td id="fbplus-title-float-main">' + title + '</td><td id="fbplus-title-float-right"></td></tr></table>';
                }

                return '<div id="fbplus-title-' + currentOpts.titlePosition + '">' + title + '</div>';
            }

            return false;
        },

        _process_title = function () {
            titleStr = currentOpts.title || '';
            titleHeight = 0;

            title
                .empty()
                .removeAttr('style')
                .removeClass();

            if (currentOpts.titleShow === false) {
                title.hide();
                return;
            }

            titleStr = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(titleStr, currentArray, currentIndex, currentOpts) : _format_title(titleStr);

            if (!titleStr || titleStr === '') {
                title.hide();
                return;
            }

            title
                .addClass('fbplus-title-' + currentOpts.titlePosition)
                .html(titleStr)
                .appendTo('body')
                .show();

            switch (currentOpts.titlePosition) {
                case 'inside':
                    title
                        .css({
                            'width': final_pos.width - (currentOpts.padding * 2),
                            'marginLeft': currentOpts.padding,
                            'marginRight': currentOpts.padding
                        });

                    titleHeight = title.outerHeight(true);

                    title.appendTo(outer);

                    final_pos.height += titleHeight;
                    break;

                case 'over':
                    title
                        .css({
                            'marginLeft': currentOpts.padding,
                            'width': final_pos.width - (currentOpts.padding * 2),
                            'bottom': currentOpts.padding
                        })
                        .appendTo(outer);
                    break;

                case 'float':
                    title
                        .css('left', parseInt((title.width() - final_pos.width - 40) / 2, 10) * -1)
                        .appendTo(wrap);
                    break;

                default:
                    title
                        .css({
                            'width': final_pos.width - (currentOpts.padding * 2),
                            'paddingLeft': currentOpts.padding,
                            'paddingRight': currentOpts.padding
                        })
                        .appendTo(wrap);
                    break;
            }

            title.hide();
        },

        _set_navigation = function () {
            if (currentOpts.enableEscapeButton || currentOpts.enableKeyboardNav) {
                $(document).bind('keydown.fb', function (e) {
                    if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
                        e.preventDefault();
                        $.fancyboxPlus.close();

                    } else if ((e.keyCode == 37 || e.keyCode == 39) && currentOpts.enableKeyboardNav && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
                        e.preventDefault();
                        $.fancyboxPlus[e.keyCode == 37 ? 'prev' : 'next']();
                    }
                });
            }

            if (!currentOpts.showNavArrows) {
                nav_left.hide();
                nav_right.hide();
                return;
            }

            if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex !== 0) {
                nav_left.show();
            }

            if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length - 1)) {
                nav_right.show();
            }
        },

        _finish = function () {
            if (!$.support.opacity) {
                $('#fancybox-content').css('filter', 0);
                $('#fancybox-wrap').css('filter', 0);
            }

            if (selectedOpts.autoDimensions) {
                content.css('height', 'auto');
            }

            wrap.css('height', 'auto');

            if (titleStr && titleStr.length) {
                title.show();
            }

            if (currentOpts.showCloseButton) {
                close.show();
            }

            _set_navigation();

            if (currentOpts.hideOnContentClick) {
                content.bind('click', $.fancyboxPlus.close);
            }

            if (currentOpts.hideOnOverlayClick) {
                overlay.bind('click', $.fancyboxPlus.close);
            }

            $(window).bind("resize.fb", $.fancyboxPlus.resize);

            if (currentOpts.centerOnScroll) {
                $(window).bind("scroll.fb", $.fancyboxPlus.center);
            }

            if (currentOpts.type == 'iframe') {
                $('<iframe id="fbplus-frame" name="fbplus-frame' + new Date().getTime() + '" frameborder="0" hspace="0" ' +
                    (navigator.userAgent.match(/msie [6]/i) ? 'allowtransparency="true""' : '') + ' scrolling="' + selectedOpts.scrolling + '" src="' + currentOpts.href + '"></iframe>').appendTo(content);
            }

            wrap.show();

            busy = false;

            $.fancyboxPlus.center();

            currentOpts.onComplete(currentArray, currentIndex, currentOpts);

            _preload_images();
        },

        _preload_images = function () {
            var href,
                objNext;

            if ((currentArray.length - 1) > currentIndex) {
                href = currentArray[currentIndex + 1].href;

                if (typeof href !== 'undefined' && href.match(imgRegExp)) {
                    objNext = new Image();
                    objNext.src = href;
                }
            }

            if (currentIndex > 0) {
                href = currentArray[currentIndex - 1].href;

                if (typeof href !== 'undefined' && href.match(imgRegExp)) {
                    objNext = new Image();
                    objNext.src = href;
                }
            }
        },

        _draw = function (pos) {
            var dim = {
                width: parseInt(start_pos.width + (final_pos.width - start_pos.width) * pos, 10),
                height: parseInt(start_pos.height + (final_pos.height - start_pos.height) * pos, 10),

                top: parseInt(start_pos.top + (final_pos.top - start_pos.top) * pos, 10),
                left: parseInt(start_pos.left + (final_pos.left - start_pos.left) * pos, 10)
            };

            if (typeof final_pos.opacity !== 'undefined') {
                dim.opacity = pos < 0.5 ? 0.5 : pos;
            }

            wrap.css(dim);

            content.css({
                'width': dim.width - currentOpts.padding * 2,
                'height': dim.height - (titleHeight * pos) - currentOpts.padding * 2
            });
        },

        _get_viewport = function () {
            return [
                $(window).width() - (currentOpts.margin * 2),
                $(window).height() - (currentOpts.margin * 2),
                $(document).scrollLeft() + currentOpts.margin,
                $(document).scrollTop() + currentOpts.margin
            ];
        },

        _get_zoom_to = function () {
            var view = _get_viewport(),
                to = {},
                resize = currentOpts.autoScale,
                double_padding = currentOpts.padding * 2,
                ratio;

            if (currentOpts.width.toString().indexOf('%') > -1) {
                to.width = parseInt((view[0] * parseFloat(currentOpts.width)) / 100, 10);
            } else {
                to.width = currentOpts.width + double_padding;
            }

            if (currentOpts.height.toString().indexOf('%') > -1) {
                to.height = parseInt((view[1] * parseFloat(currentOpts.height)) / 100, 10);
            } else {
                to.height = currentOpts.height + double_padding;
            }

            if (resize && (to.width > view[0] || to.height > view[1])) {
                if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
                    ratio = (currentOpts.width ) / (currentOpts.height );

                    if ((to.width ) > view[0]) {
                        to.width = view[0];
                        to.height = parseInt(((to.width - double_padding) / ratio) + double_padding, 10);
                    }

                    if ((to.height) > view[1]) {
                        to.height = view[1];
                        to.width = parseInt(((to.height - double_padding) * ratio) + double_padding, 10);
                    }

                } else {
                    to.width = Math.min(to.width, view[0]);
                    to.height = Math.min(to.height, view[1]);
                }
            }

            to.top = parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - to.height - 40) * 0.5)), 10);
            to.left = parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - to.width - 40) * 0.5)), 10);

            return to;
        },

        _get_obj_pos = function (obj) {
            var pos = obj.offset();

            pos.top += parseInt(obj.css('paddingTop'), 10) || 0;
            pos.left += parseInt(obj.css('paddingLeft'), 10) || 0;

            pos.top += parseInt(obj.css('border-top-width'), 10) || 0;
            pos.left += parseInt(obj.css('border-left-width'), 10) || 0;

            pos.width = obj.width();
            pos.height = obj.height();

            return pos;
        },

        _get_zoom_from = function () {
            var orig = selectedOpts.orig ? $(selectedOpts.orig) : false,
                from = {},
                pos,
                view;

            if (orig && orig.length) {
                pos = _get_obj_pos(orig);

                from = {
                    width: pos.width + (currentOpts.padding * 2),
                    height: pos.height + (currentOpts.padding * 2),
                    top: pos.top - currentOpts.padding - 20,
                    left: pos.left - currentOpts.padding - 20
                };

            } else {
                view = _get_viewport();

                from = {
                    width: currentOpts.padding * 2,
                    height: currentOpts.padding * 2,
                    top: parseInt(view[3] + view[1] * 0.5, 10),
                    left: parseInt(view[2] + view[0] * 0.5, 10)
                };
            }

            return from;
        },

        _animate_loading = function () {
            if (!loading.is(':visible')) {
                clearInterval(loadingTimer);
                return;
            }

            $('div', loading).css('top', (loadingFrame * -40) + 'px');

            loadingFrame = (loadingFrame + 1) % 12;
        };

    /*
     * Public methods
     */

    $.fn.fancyboxPlus = function (options) {
        if (!$(this).length) {
            return this;
        }

        $(this)
            .data('fancyboxPlus', $.extend({}, options, ($.metadata ? $(this).metadata() : {})))
            .unbind('click.fb')
            .bind('click.fb', function (e) {
                e.preventDefault();

                if (busy) {
                    return;
                }

                busy = true;

                $(this).blur();

                selectedArray = [];
                selectedIndex = 0;

                var rel = $(this).attr('rel') || '';

                if (!rel || rel == '' || rel === 'nofollow') {
                    selectedArray.push(this);

                } else {
                    selectedArray = $("a[rel=" + rel + "], area[rel=" + rel + "]");
                    selectedIndex = selectedArray.index(this);
                }

                _start();

                return;
            });

        return this;
    };

    $.fancyboxPlus = function (obj) {
        var opts;

        if (busy) {
            return;
        }

        busy = true;
        opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};

        selectedArray = [];
        selectedIndex = parseInt(opts.index, 10) || 0;

        if ($.isArray(obj)) {
            for (var i = 0, j = obj.length; i < j; i++) {
                if (typeof obj[i] == 'object') {
                    $(obj[i]).data('fancyboxPlus', $.extend({}, opts, obj[i]));
                } else {
                    obj[i] = $({}).data('fancyboxPlus', $.extend({content: obj[i]}, opts));
                }
            }

            selectedArray = jQuery.merge(selectedArray, obj);

        } else {
            if (typeof obj == 'object') {
                $(obj).data('fancyboxPlus', $.extend({}, opts, obj));
            } else {
                obj = $({}).data('fancyboxPlus', $.extend({content: obj}, opts));
            }

            selectedArray.push(obj);
        }

        if (selectedIndex > selectedArray.length || selectedIndex < 0) {
            selectedIndex = 0;
        }

        _start();
    };

    $.fancyboxPlus.showActivity = function () {
        clearInterval(loadingTimer);

        loading.show();
        loadingTimer = setInterval(_animate_loading, 66);
    };

    $.fancyboxPlus.hideActivity = function () {
        loading.hide();
    };

    $.fancyboxPlus.next = function () {
        return $.fancyboxPlus.pos(currentIndex + 1);
    };

    $.fancyboxPlus.prev = function () {
        return $.fancyboxPlus.pos(currentIndex - 1);
    };

    $.fancyboxPlus.pos = function (pos) {
        if (busy) {
            return;
        }

        pos = parseInt(pos);

        selectedArray = currentArray;

        if (pos > -1 && pos < currentArray.length) {
            selectedIndex = pos;
            _start();

        } else if (currentOpts.cyclic && currentArray.length > 1) {
            selectedIndex = pos >= currentArray.length ? 0 : currentArray.length - 1;
            _start();
        }

        return;
    };

    $.fancyboxPlus.cancel = function () {
        if (busy) {
            return;
        }

        busy = true;

        $.event.trigger('fbplus-cancel');

        _abort();

        selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);

        busy = false;
    };

    // Note: within an iframe use - parent.$.fancyboxPlus.close();
    $.fancyboxPlus.close = function () {
        if (busy || wrap.is(':hidden')) {
            return;
        }

        busy = true;

        if (currentOpts && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
            busy = false;
            return;
        }

        _abort();

        $(close.add(nav_left).add(nav_right)).hide();

        $(content.add(overlay)).unbind();

        $(window).unbind("resize.fb scroll.fb");
        $(document).unbind('keydown.fb');

        content.find('iframe').attr('src', isIE6 && /^https/i.test(window.location.href || '') ? 'javascript:void(false)' : 'about:blank');

        if (currentOpts.titlePosition !== 'inside') {
            title.empty();
        }

        wrap.stop();

        function _cleanup() {
            overlay.fadeOut('fast');

            title.empty().hide();
            wrap.hide();

            $.event.trigger('fbplus-cleanup');

            content.empty();

            currentOpts.onClosed(currentArray, currentIndex, currentOpts);

            currentArray = selectedOpts = [];
            currentIndex = selectedIndex = 0;
            currentOpts = selectedOpts = {};

            busy = false;
        }

        if (currentOpts.transitionOut == 'elastic') {
            start_pos = _get_zoom_from();

            var pos = wrap.position();

            final_pos = {
                top: pos.top,
                left: pos.left,
                width: wrap.width(),
                height: wrap.height()
            };

            if (currentOpts.opacity) {
                final_pos.opacity = 1;
            }

            title.empty().hide();

            fx.prop = 1;

            $(fx).animate({prop: 0}, {
                duration: currentOpts.speedOut,
                easing: currentOpts.easingOut,
                step: _draw,
                complete: _cleanup
            });

        } else {
            wrap.fadeOut(currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
        }
    };

    $.fancyboxPlus.resize = function () {
        if (overlay.is(':visible')) {
            overlay.css('height', $(document).height());
        }

        $.fancyboxPlus.center(true);
    };

    $.fancyboxPlus.center = function () {
        var view, align;

        if (busy) {
            return;
        }

        align = arguments[0] === true ? 1 : 0;
        view = _get_viewport();

        if (!align && (wrap.width() > view[0] || wrap.height() > view[1])) {
            return;
        }

        wrap
            .stop()
            .animate({
                'top': parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - content.height() - 40) * 0.5) - currentOpts.padding)),
                'left': parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - content.width() - 40) * 0.5) - currentOpts.padding))
            }, typeof arguments[0] == 'number' ? arguments[0] : 200);
    };

    $.fancyboxPlus.init = function () {
        if ($("#fbplus-wrap").length) {
            return;
        }

        $('body').append(
            tmp = $('<div id="fbplus-tmp"></div>'),
            loading = $('<div id="fbplus-loading"><div></div></div>'),
            overlay = $('<div id="fbplus-overlay"></div>'),
            wrap = $('<div id="fbplus-wrap"></div>')
        );

        outer = $('<div id="fbplus-outer"></div>')
            .append('<div class="fbplus-bg" id="fbplus-bg-n"></div><div class="fbplus-bg" id="fbplus-bg-ne"></div><div class="fbplus-bg" id="fbplus-bg-e"></div><div class="fbplus-bg" id="fbplus-bg-se"></div><div class="fbplus-bg" id="fbplus-bg-s"></div><div class="fbplus-bg" id="fbplus-bg-sw"></div><div class="fbplus-bg" id="fbplus-bg-w"></div><div class="fbplus-bg" id="fbplus-bg-nw"></div>')
            .appendTo(wrap);

        outer.append(
            content = $('<div id="fbplus-content"></div>'),
            close = $('<a id="fbplus-close"></a>'),
            title = $('<div id="fbplus-title"></div>'),

            nav_left = $('<a href="javascript:;" id="fbplus-left"><span class="fancy-ico" id="fbplus-left-ico"></span></a>'),
            nav_right = $('<a href="javascript:;" id="fbplus-right"><span class="fancy-ico" id="fbplus-right-ico"></span></a>')
        );

        close.click($.fancyboxPlus.close);
        loading.click($.fancyboxPlus.cancel);

        nav_left.click(function (e) {
            e.preventDefault();
            $.fancyboxPlus.prev();
        });

        nav_right.click(function (e) {
            e.preventDefault();
            $.fancyboxPlus.next();
        });

        if ($.fn.mousewheel) {
            wrap.bind('mousewheel.fb', function (e, delta) {
                if (busy) {
                    e.preventDefault();

                } else if ($(e.target).get(0).clientHeight == 0 || $(e.target).get(0).scrollHeight === $(e.target).get(0).clientHeight) {
                    e.preventDefault();
                    $.fancyboxPlus[delta > 0 ? 'prev' : 'next']();
                }
            });
        }

        if (!$.support.opacity) {
            wrap.addClass('fbplus-ie');
        }

        if (isIE6) {
            loading.addClass('fbplus-ie6');
            wrap.addClass('fbplus-ie6');

            $('<iframe id="fbplus-hide-sel-frame" src="' + (/^https/i.test(window.location.href || '') ? 'javascript:void(false)' : 'about:blank' ) + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(outer);
        }
    };

    $.fn.fancyboxPlus.defaults = {
        padding: 10,
        margin: 40,
        opacity: false,
        modal: false,
        cyclic: false,
        scrolling: 'auto',	// 'auto', 'yes' or 'no'

        width: 560,
        height: 340,

        autoScale: true,
        autoDimensions: true,
        centerOnScroll: false,

        ajax: {},
        swf: {wmode: 'transparent'},

        hideOnOverlayClick: true,
        hideOnContentClick: false,

        overlayShow: true,
        overlayOpacity: 0.7,
        overlayColor: '#777',

        titleShow: true,
        titlePosition: 'float', // 'float', 'outside', 'inside' or 'over'
        titleFormat: null,
        titleFromAlt: false,

        transitionIn: 'fade', // 'elastic', 'fade' or 'none'
        transitionOut: 'fade', // 'elastic', 'fade' or 'none'

        speedIn: 300,
        speedOut: 300,

        changeSpeed: 300,
        changeFade: 'fast',

        easingIn: 'swing',
        easingOut: 'swing',

        showCloseButton: true,
        showNavArrows: true,
        enableEscapeButton: true,
        enableKeyboardNav: true,

        onStart: function () {
        },
        onCancel: function () {
        },
        onComplete: function () {
        },
        onCleanup: function () {
        },
        onClosed: function () {
        },
        onError: function () {
        }
    };

    $(document).ready(function () {
        $.fancyboxPlus.init();
    });

})(jQuery);

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'musicamise-cli';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate', 'ngTouch', 
							'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils','ngMask',
							'blockUI','fancyboxplus'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('checkout');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('localStore');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('products');

'use strict';

//Setting up route
angular.module('checkout').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('checkorder', {
			url: '/checkorder',
			templateUrl: 'modules/checkout/views/checkorder/check_order.client.view.html'
		}).state('cart', {
			url: '/cart',
			templateUrl: 'modules/checkout/views/checkoutprocess/cart.client.view.html'
		}).state('shipping', {
			url: '/shipping',
			templateUrl: 'modules/checkout/views/checkoutprocess/shipping.client.view.html'
		}).state('checkout', {
			url: '/checkout',
			templateUrl: 'modules/checkout/views/checkoutprocess/checkout.client.view.html'
		}).state('review', {
			url: '/review',
			templateUrl: 'modules/checkout/views/checkoutprocess/review.client.view.html'
		}).state('thankyou', {
			url: '/thank-you',
			templateUrl: 'modules/checkout/views/checkoutprocess/thankyou.client.view.html'
		});
		
	}
]);

'use strict';

angular.module('checkout').controller('CheckOrderController', ['$rootScope','$window','$scope','$location','$timeout','$stateParams','OrderCheckout','Authentication','blockUI',
	function($rootScope,$window,$scope,$location,$timeout,$stateParams,OrderCheckout,Authentication,blockUI) {
		// checkout controller logic
		// ...
	    window.scrollTo(0, 0);
		
		$scope.order = {};

		$scope.orderId = function(){
			if(!$location.search().id){$location.path('/');}
			
			OrderCheckout.checkorder($location.search()).$promise.then(function(response,error,progressback){
				$scope.order = response.order;
			},function(){
				$location.path('/404');
			});
		};

	}
]);
'use strict';

angular.module('checkout').controller('CheckoutController', ['$rootScope','$window','$scope','$location','$timeout','$stateParams','OrderCheckout','Authentication','UserCheckout','Cep','blockUI', 
	function($rootScope,$window,$scope,$location,$timeout,$stateParams,OrderCheckout,Authentication,UserCheckout,Cep,blockUI) {
		// checkout controller logic
		// ...
	    window.scrollTo(0, 0);

		$scope.Authentication = Authentication;
		$scope.cartInit = function(){

			$scope.orderCall = OrderCheckout.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				// console.log(p);
				if(!jQuery.isEmptyObject(response.order)){
					$rootScope.order = response.order;
				}
			});
		};
		$scope.shipping = function(){
			$scope.address = {};
			$scope.user = ($scope.Authentication.user)? $scope.Authentication.user : {};
			
			$scope.address.blockAll = true;
			if($location.search().edit&&
				$rootScope.order&&
				$rootScope.order.shippingAddress&&
				$rootScope.order.user){
				$scope.address = $rootScope.order.shippingAddress;
				$scope.user = $rootScope.order.user;
			}

			$scope.orderCall = OrderCheckout.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				// console.log(p);
				if(response.order.products.length>0){
					$rootScope.order = response.order;
				}else{
					$location.path('/products');
				}
			});

		};

		$scope.isEmpty = function (obj) {
		    for (var i in obj) if (obj.hasOwnProperty(i)) return false;
		    return true;
		};

		$scope.selectDeliveryAddress = function(selectedSavedAddress){
			// $scope.address = 

			$scope.address = $scope.user.address.filter(
										function(e){
												return e._id+''===selectedSavedAddress	;
										}
				);
			if($scope.address.length>0){
				this.address = $scope.address[0];
				this.address.openAddressForm = undefined;
			}

		};
		$scope.submitShipping = function(address,userModel){
			if(address&&userModel){
				//save or update address for user!
				if(address.saveaddress||address.openAddressForm&&address._id!==undefined){
					$scope.shippingCall = UserCheckout.updateAddress({address:address});
					$scope.shippingCall.$promise.then(function(response,error,progressback){
						if(response){
							console.log(response); 
							$scope.user = response;
							Authentication.user= response;
						}
					},function(reason){
						alert(reason.data.message);
						console.log('Save user\'s address Failed: ' + reason.data.message);
					});
				}

				// add address on order
				var deliveryAddress = {address:address,user:userModel};
				if($rootScope.order.address===undefined){
					$scope.orderCall = OrderCheckout.addDeliveryAddress(deliveryAddress);
					$scope.orderCall.$promise.then(function(response,error,progressback){
						if(!jQuery.isEmptyObject(response.order)){
							$rootScope.order = response.order;
						}
						$location.search({});
						$location.path('/review');

					}, function(reason) {
					  	alert('Um erro aconteceu por favor tente novamente');
						$location.path('/shipping');
					});
				}

			}else{
				$location.path('/shipping');
			}

		};

		$scope.checkout = function(){
			$scope.Authentication = Authentication;

			$scope.orderCall = OrderCheckout.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				// console.log(p);
				if(response.order.products.length>0){
					$rootScope.order = response.order;
					if($scope.Authentication.user){
						$location.path('/shipping');
					}else{
						$location.path('/checkout');
					}
				}else{
					$location.path('/products');
				}
			});
		}; 

		$scope.getAddress = function(cep){
			Cep.get({cep:cep}).$promise.then(function(response,error,progressback){
				$scope.address.bairro = response.bairro;
				$scope.address.address = response.logradouro;
				$scope.address.city  = response.localidade;
				$scope.address.state = response.uf;
			},function(reason){
				$scope.address.blockAll = false;
			});
		};

		$scope.reviewOrder = function(){
			$scope.Authentication = Authentication;

			$scope.orderCall = OrderCheckout.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				if(response.order.products.length>0){
					$rootScope.order = response.order;

					if($rootScope.order.user&&$rootScope.order.shippingAddress){
						$location.path('/review');
					}else{
						$location.path('/checkout');
					}
				}else{
					$location.path('/products');
				}
			});
		}; 

		$scope.submitOrder = function(){
			$scope.Authentication = Authentication;

			$scope.orderCall = OrderCheckout.pagseguro();
			blockUI.start();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				 if(response.url){

				  	$scope.isOpenLightbox = new PagSeguroLightbox({
			            code: response.code,
			        	},{
			            success : function(transactionCode) {
			                        alert('obrigado pela compra');
			                        $location.path('/thank-you');
			                      },
			            abort : function() {
			                    alert('Continue comprando.');
			            }
			        });
					if (!$scope.isOpenLightbox){
					 	$window.location = response.url;
					}
				 }else{
					 console.log(response);
					 alert(response);
				 }
				 blockUI.stop();
			}, function(reason) {
				blockUI.stop();
			  	console.log('Failed: ' + reason.data.message);
			  	alert('Aconteceu um erro inesperado, por favor tenta novamente.');
				$location.path('/shipping');
			});
		}; 
		
		$scope.cartRemoveItem = function(id){
			if(id){	
				blockUI.start();
				$scope.orderCall = OrderCheckout.removeItem({id:id});
				$scope.orderCall.$promise.then(function(response,error,progressback){
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
					blockUI.stop();
				},function(reason){
					console.log(reason);
					blockUI.stop();
				});
			}
			$location.path('/cart');
			$scope.cartInit();	
		};
		$scope.updateQuantity = function(id,quantity){
			if(id){	
				if(quantity<5){
					blockUI.start();
					$scope.orderCall = OrderCheckout.addItem({id:id,quantity:quantity});
					$scope.orderCall.$promise.then(function(response,error,progressback){
						if(!jQuery.isEmptyObject(response.order)){
							$rootScope.order = response.order;
						}
						blockUI.stop();
					},function(reason){
						console.log(reason);
						blockUI.stop();
					});
				} 
			}
			$location.path('/cart');
		};
		$scope.applyDiscount = function(discountCode){
			if(discountCode||discountCode!==''){	
				blockUI.start();
				$scope.orderCall = OrderCheckout.addDiscountCode({discountCode:discountCode});
				$scope.orderCall.$promise.then(function(response,error,progressback){
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
					blockUI.stop();
				},function(reason){
					console.log(reason);
					blockUI.stop();
				});
			}
			$location.path('/cart');
		};

		$scope.applyShippingAddress = function(cep){
			if(cep||cep!==''){	
				blockUI.start();
				var address = {};
				address.cep = cep;
				var deliveryAddress = {address:address};
				deliveryAddress.checkPriceForDelivery = true;
				$scope.orderCall = OrderCheckout.addDeliveryAddress(deliveryAddress);
				$scope.orderCall.$promise.then(function(response,error,progressback){
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
					blockUI.stop();
				},function(reason){
					console.log(reason);
					blockUI.stop();
				});
			}
			$location.path('/cart');
		};
		
		$scope.thankyou = function(){
			if(!$location.search().id){
				$location.path('/');	
			} 

			OrderCheckout.clean().$promise.then(function(response,error,progressback){
				 //if(!response.order.pagSeguroInfo){
				// 	$location.url($location.path('/'));
				// }
				OrderCheckout.get().$promise.then(function(response,error,progressback){
					// console.log(p);
					if(!jQuery.isEmptyObject(response.order)){
						$rootScope.order = response.order;
					}
				});
			});
		};
	}	
]);

 
'use strict';


angular.module('checkout').factory('OrderCheckout', ['$resource',
	function($resource) {
		return $resource('api/order/:action', {
			action: '@action'
			},{'checkorder': {
						method: 'GET', 
						isArray: false,
						params:{action:'check'}
						
         		},'removeItem': {
						method: 'POST', 
						isArray: false,
						params:{action:'removeItem'}
						
         		},'addItem': {
						method: 'POST', 
						isArray: false,
						params:{action:'updateOrderOrAddItem'}
         		},'addDiscountCode': {
						method: 'POST', 
						isArray: false,
						params:{action:'updateOrderOrAddItem'}
         		},'pagseguro': {
						method: 'GET', 
						isArray: false,
						params:{action:'pagseguro'}
         		},'addDeliveryAddress': {
						method: 'POST', 
						isArray: false,
						params:{action:'addDeliveryAddress'},
						// interceptor: {
			   //              response: function (data) {
			   //                  console.log('response in interceptor', data);
			   //              },
			   //              responseError: function (data) {
			   //                  console.log('error in interceptor', data);
			   //              }
			   //          }
         		},'clean': {
						method: 'GET', 
						isArray: false,
						params:{action:'clean'},
				}
     		}
 		);
	}
]);

angular.module('checkout').factory('Cep', ['$resource',
	function($resource) {
		return $resource('/api/address?cep=:cep', {
			cep:'@cep',
			},{'get': {
					method: 'GET', 
					isArray: false
         		}
     		}
 		);
	}
]);

angular.module('checkout').factory('UserCheckout', ['$resource',
	function($resource) {
		return $resource(':auth/:action/:token', {
			auth:'@auth',
			action: '@action',
			token: '@token',
			},{'signin': {
						method: 'POST', 
						isArray: false,
						params:{action:'signin',auth:'auth'}
						
         		},'signout': {
						method: 'GET', 
						isArray: false,
						params:{action:'signout',auth:'auth'}
         		},'signup': {
						method: 'POST', 
						isArray: false,
						params:{action:'signup',auth:'auth'}
         		},'updateAddress':{
         				method: 'PUT', 
						isArray: false,
						params:{action:'updateAddress',auth:'users'}
         		}
     		}
 		);
	}
]);
'use strict';

// Setting up route
angular.module('core',['users']).config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).state('contact', {
			url: '/contact',
			templateUrl: 'modules/core/views/static/contact.client.view.html'
		}).state('faq', {
			url: '/faq',
			templateUrl: 'modules/core/views/static/faq.client.view.html'
		}).state('politicas', {
			url: '/politicas',
			templateUrl: 'modules/core/views/static/politicas.client.view.html'
		}).state('quemsomos', {
			url: '/quemsomos',
			templateUrl: 'modules/core/views/static/quemsomos.client.view.html'
		}).state('comocomprar', {
			url: '/comocomprar',
			templateUrl: 'modules/core/views/static/comocomprar.client.view.html'
		}).state('centrodeajuda', {
			url: '/centrodeajuda',
			templateUrl: 'modules/core/views/static/centrodeajuda.client.view.html'
		}).state('trabalheconosco', {
			url: '/trabalheconosco',
			templateUrl: 'modules/core/views/static/trabalhe_conosco.client.view.html'
		}).state('missao', {
			url: '/missao',
			templateUrl: 'modules/core/views/static/missa_visao_e_valores.client.view.html'
		});
	}
]);

angular.module('core').config(["blockUIConfig", function(blockUIConfig) {

  // Change the default overlay message
  blockUIConfig.message = 'Carregando!';

  // Change the default delay to 100ms before the blocking is visible
  blockUIConfig.delay = 100;

}]);


angular.module('core').run(['$rootScope', '$window', 'User','Authentication',
  function($rootScope, $window, User,Authentication) {

  	// $rootScope.user = {};
	// $rootScope.FB = {};
  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded
    var facebookAppId = facebookAppId;
    FB.init({ 

      appId: facebookAppId, 
      cookie: true, 
      status: true,
      xfbml: true
    });

    //User.watchAuthenticationStatusChange();
   //  FB.getLoginStatus(function(response) {
	  //   //statusChangeCallback(response);
   //  	console.log(response);
  	// });


	// FB.Event.subscribe('auth.authResponseChange', function(res) {

	// 	if (res.status === 'connected') {
	// 		if(!Authentication.user){
	// 		  	FB.api('/me?fields=name,gender,email,birthday', function(res) {
	// 		  		console.dir(res);
	// 		  	});
	// 		}

	// 	} 
	// 	else {
	// 		$window.location = '/auth/signout/';
	// 	}

	// });

  };

    // Load the SDK asynchronously

   (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/all.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

	

}]);
'use strict';

angular.module('core').controller('HeaderController', ['$window','$rootScope','$scope','$location', 'Authentication',
 'MainMenu','Order','User','blockUI','fancyboxService',
	function($window,$rootScope,$scope,$location, Authentication, MainMenu,Order,User,blockUI,fancyboxService) {
		$scope.authentication = Authentication;
	    window.scrollTo(0, 0);
	    $scope.redirect = $location.search().redirect;
	    
		// $scope.isCollapsed = false;
		$scope.user = Authentication.user;
		$scope.search = {};
		$scope.menu = {};
		
		$scope.$watch(function(){ return $location.search().q; }, function(params){
			$scope.search.query = $location.search().q;
		});
		$scope.fbclick = function(){
			ga('send', 'event', 'button', 'click', 'facebookconnect');
		};
		$scope.numberformat =  function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
        $scope.isEmpty = function (obj) {
		    for (var i in obj) if (obj.hasOwnProperty(i)) return false;
		    return true;
		};
		$scope.headerLoginAndCart = function(){
			$scope.authentication = Authentication;
			$rootScope.order = {};
			$scope.orderCall = Order.get();
			$scope.orderCall.$promise.then(function(response,error,progressback){
				// console.log(p);
				if(!jQuery.isEmptyObject(response.order)){
					$rootScope.order = response.order;
				}
			});
			MainMenu.query().$promise.then(function(response,error,progressback){
				$scope.loja = response.loja;
				$scope.localStores = response.localStores;
				$scope.discount = response.discount;
			});

		};


		
		$scope.bindMenuEvent = function () {
			var menu = $('#menu-expanded');
			$scope.menu.show = false;
			menu.mouseup(function() { 
			    return false;
			});
			$('body').mouseup(function(menu) {
			    if(($(menu.target).parent('#menu-expanded').length <= 0)&&
			    	$(menu.target).parent('#mainmenu a').length<=0) {
			        $scope.menu.show = false;
			        $scope.$apply();
			    }
			});
    	};

		$scope.clickIconMenu = function(iconName){
			$scope.menu.show = ($scope.menu.name===iconName)?!$scope.menu.show:true;
			$scope.menu.name = iconName;
		};

		$scope.clickLinkMenu = function(){
			$scope.menu.show = false;
			var boxUser = $('#userBox');
			boxUser.hide();
			var boxLogin = $('#loginBox');
			boxLogin.hide();

		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			if($scope.user){
				return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
			}else{
				return $scope.authentication.user.provider === provider || ($scope.authentication.user.additionalProvidersData && $scope.authentication.user.additionalProvidersData[provider]);
			}
		};

		$scope.login = function(user){
			User.signin(user).$promise.then(function(userResponse,error,progressback){
				// console.log(p);
				if(error){
					console.log(error);
				}else if(!jQuery.isEmptyObject(userResponse)){
					console.log(userResponse);
					$scope.authentication.user = userResponse;
				}

				if($location.search().redirect){
					// var url = window.location.href; 
					// $window.location.href = url;
					$location.path($location.search().redirect);
					$location.search({});
				}else{
			 		$window.location.reload();
				}
			 	// $route.reload();
			},function(err){
				$scope.login_error = err.data.message;
				console.log(err);
			});
		};

		$scope.search = function(query){
			$location.search({q:query});
			$location.path('/search');
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			if(!jQuery.isEmptyObject($rootScope.order)){
				Order.get().$promise.then(function(response,error,progressback){
				 	$rootScope.order = response.order;
				});
			}
			 // $scope.isCollapsed = false;
		});

	 	$scope.bindLoginEvent = function () {
			var button = $('#loginButton');
			var box = $('#loginBox');
			var form = $('#loginForm');
			button.removeAttr('href');
			button.mouseup(function(login) {
			    box.toggle();
			    button.toggleClass('active');
			});
			form.mouseup(function() { 
			    return false;
			});
			$('body').mouseup(function(login) {
			    if(($(login.target).parent('#loginButton').length <= 0)) {
			        button.removeClass('active');
			        box.hide();
			    }
			});
    	};
    	$scope.bindUserEvent = function () {
			var button = $('.userButton');
			var box = $('#userBox');
			var form = $('#userForm');
			button.removeAttr('href');
			button.mouseup(function(click) {
			    box.toggle();
			    button.toggleClass('active');
			});
			form.mouseup(function() { 
			    return false;
			});
			$('body').mouseup(function(click) {
			    if(!$(click.target).hasClass('userButton')&&
			    	$(click.target).parent('.userButton').length <= 0) {
			        button.removeClass('active');
			        box.hide();
			    }
			});
    	};


	}

]);

// angular.module('core', []).filter('digits', function() {
// 	return function(input) {
// 	   if (input < 10) { 
// 	          input = '0' + input;
// 	      }

// 	      return input;
// 	    }
// });
'use strict';


angular.module('core').controller('HomeController', ['$rootScope','$scope','$timeout', 'Authentication','MainPage','blockUI','fancyboxService','SendContact',
	function($rootScope,$scope,$timeout, Authentication,MainPage,blockUI,fancyboxService,SendContact) {
		// This provides Authentication context.
	    window.scrollTo(0, 0);
		$scope.authentication = Authentication;
		$scope.clickGAdestaque = function(slug){
			ga('send', 'event', 'destaque', 'click', slug);
		};
		$scope.clickGAbanner = function(slug){
			if(slug)
				ga('send', 'event', 'banner', 'click', slug);
		};
		$scope.clickGAgender = function(slug){
			if(slug)
				ga('send', 'event', 'button', 'click', slug);
		};
		$scope.inicialCall = function() {
			$scope.mainContent = {};
			$scope.imagePromotion = [];
			$scope.destaque = {};
			blockUI.start();
			MainPage.get().$promise.then(function(response,error,progressback){
			 	$scope.mainContent = angular.copy(response.content);
			 	$scope.mainContent.images = [];
			 	$scope.imagePromotion = [];
		 	 	response.content.images.forEach(function(image){
					if(image.redirectUrl&&(image.redirectUrl.indexOf('http://')<0||image.redirectUrl.indexOf('https://')<0)){
						image.redirectUrl = 'http://'+image.redirectUrl;
					}
					if(image.promotion){
						$scope.imagePromotion.push(image);
					}else{
						$scope.mainContent.images.push(image);
					}
				});	
				if($scope.imagePromotion.length>0&&!$rootScope.promotionImageAlreadyShow){
					$scope.initPromotionBanner();
				}
			 	$scope.destaque = response.destaque;
			 	$scope.frontCollections = response.collections;
			 	$scope.localStores = response.localStores;
			 	blockUI.stop();
			});
		};
	 	$scope.isEmpty = function (obj) {
		    for (var i in obj) if (obj.hasOwnProperty(i)) return false;
		    return true;
		};

		$scope.initPromotionBanner = function(){
		 	$timeout(function() {
			 	$scope.openPromotionScreen();
		 	}, 14000);
		 	$rootScope.promotionImageAlreadyShow = true;
		};

		$scope.promotionImage = {
            'padding'		: 0,
           	'href'			: 'http://farm9.staticflickr.com/8568/16388772452_f4d77a92c7_b.jpg',
            'title'   		: 'Lorem ipsum dolor sit amet',
            'transitionIn'	: 'elastic',
            'transitionOut'	: 'elastic',
            'scrolling'		: 'auto',
            'centerOnScroll' : 'true',
            'titlePosition'	 : 'inside',
            'titleFormat' 	: null
        };
        
        $scope.openPromotionScreen = function(){
        	$scope.promotionImage.href = $scope.imagePromotion[0].url;
        	$scope.promotionImage.title = $scope.imagePromotion[0].subtitle;
        	// $scope.manual1.content = '<a href = ''+$scope.imagePromotion[0].redirectUrl+''>Link<a>'
            fancyboxService.fancyboxPlus()($scope.promotionImage);
        };
		
		$scope.initCarousel = function(id){
			$('#'+id).owlCarousel({
				navigation : false,
				slideSpeed : 300,
				paginationSpeed : 400,
				singleItem : true,
				navigationText: false,
				responsive: true,
				autoPlay:true,
				rewindNav:true,
				// 'singleItem:true' is a shortcut for:
				// items : 1, 
				// itemsDesktop : false,
				// itemsDesktopSmall : false,
				// itemsTablet: false,
				// itemsMobile : false

	      		});
		};
		$scope.initProductsCarousel = function(id){
			$('#'+id).owlCarousel({

				loop:true,
			    margin:10,
			    responsiveClass:true,
			   	navigation : true,
				rewindNav:true,
				navigationText: [
			      '<i class="icon-chevron-left icon-white"><</i>',
			      '<i class="icon-chevron-right icon-white">></i>'
			      ],
			    responsive:{
			        0:{
			            items:1,
			            loop:true

			        },
			        600:{
			            items:3,
			            loop:true

			        },
			        1000:{
			            items:5,
			            loop:true
			        }
			    }

      		});
		};
		
		$scope.stopPromotionBannerBlocker = function(){
			var myBlockUI = blockUI.instances.get('myBlockUI');

		  	$('body').mouseup(function(promotion) {
			    if(($(promotion.target).parent('#promotionBlock').length <= 0)) {
		  			myBlockUI.stop();
			    }
			});
	  	};

  		$scope.contact = function() {
  			$scope.userContact = {};
	  	};
	  	
  		$scope.sendContact = function() {
  			if(!$scope.userContact)
				$scope.error = 'Preencha o cadastro!';
			else if(!$scope.userContact.email)
				$scope.error = 'Preencha o Email!';
			else if(!$scope.userContact.subject)
				$scope.error = 'Preencha o Assunto!';
			else if(!$scope.userContact.content)
				$scope.error = 'Preencha a mensagem!';

			if(!$scope.error){
				SendContact.send({userContact:$scope.userContact}).$promise.then(function(response,error,progressback){
  					$scope.success = response.message;
	  			},function(reason){
	  				$scope.error = reason.data.message;
	  			});
			}
	  	};
	  	
	}

]);

angular.module(ApplicationConfiguration.applicationModuleName).directive('placehold', function() {
	var loadingDefault = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAASAAAATgAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTEA/9sAQwAEAgMDAwIEAwMDBAQEBAUJBgUFBQULCAgGCQ0LDQ0NCwwMDhAUEQ4PEw8MDBIYEhMVFhcXFw4RGRsZFhoUFhcW/9sAQwEEBAQFBQUKBgYKFg8MDxYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYW/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+ggKcBQBRQAUAZpQKUUAFOAxRSgUAIBThQBTqAAClAoApwFACU4CilAoAQCnYoxTsUAJilpcUtACYpaXFLQAmKXFLiloAbilxTsUuKAG0YNOowaAExS4FLilxQA2inYooAbRg07BpcGgBmDRg0/FGKAGYNFPxSYNADaKdg0UANxSYp+BSYoAbikwafikoAbikxT6TFADMUYp2KMUAR4oxT8UmKAGYpMU/FJigCPFJin4pMUAMpCKfSEUAMIppFSEU2gBhFIRTyKaRQAykIp9NoAaRmm08ikNADaQilooAbiilxRQAtKBSAZpwoABTqKUCgAApwFAFKKAACnAUU4CgBAKUClApQKAClApaUCgBMU7FGKdigBMUuKUClxQAmKXFLiloATFLS4paAG4NLinYpcUANpcUtLigBuKXAp2KKAG0YNOooATFGKWigBMUYpaKAExRilooATBpMGnUUANowKdRigBmKTBp+KMUAMxSYp9JigBlGKdijFADMUmKdiigBmKTFPxSYoAjxSYp+KTFADKQin00igBpFNxTyKQigCMikIp5FIRQAwim08ikNAEZGKQin00jFADTTaeRSEUANooooAdTqAMUoFAABTgKAKUUAAFOopwoAAKUCgCnAUAAFLQBTqADGKUClApQKAEApwFFOAoATFLRinAUAJilpcUuKAExS0uKWgBMUuKKKACijBpcUAJRTqMGgBMGjFOxRigBuKXAp2BRigBuBRgU6igBuBSYp9GBQAzFGKfgUmKAGYNFPxSYoAbRTsUmKAEpMUtFADcUYp1GKAI8UYp+KTFAEeKMU7FJigBmKQin0hFADKaRipCKaaAGEUhFPIpCKAI6aRUlNNADCKQjNPIppFADCKbUhFNNAEZGKQinn0ptADaKXFFACgU4CgU4UAAp1ApwFAAKUChRTgKAAClAzQBmnAUAFOFAFOAoAQClApQKWgApQKUClAoAQCnYop2KAExS0UUAFFLiloATFLS4paAExS4pcUuKAG0uKXBpcUANxS4FOxRigBtFOowaAG0U7BowaAG0U7BowaAG4oxTqMCgBmKTBp+KMUAMpMU+kxQAzBoxTsUYoAZikp+KSgBtGKXFJQA0ikxT6QigBlNIqTFNIoAaRTaeRSUARkUhFPIpCKAGEZptPIpCKAIzSEU+mmgBjCmkU8jFIwoAYRmmmnsKawoAZRTqKAHAUqihRTgKABR3pyikApwoAUClAoFOoAKcBQKcBQAAYpQKAKWgApwFFOAxQAgFOAoApaACiilAoAAKWgCnUAJilxS4paAExS4pcUuKAExS0uKWgBuDS4p2KMUAJgUU6igBuDS4pcGlwaAG4oxTsUYoAbijBp2KTBoAbg0U7BooAbgUmKfikxQAzFGKdg0YoAZikxT8UlADMUmKfikoAZikxTyKQigCOinUhFACYzTadRQAwimkU8jFIRQAymkYp5FJQAwimkU8jFIRQAwjNNNPYU0igBh9KaakIppoAjPFNIqQ02gBmKKWigBwp1ApVoAUU4UiinKKAFHFOApFFOUUACinAUgFOoAKdQBTgMUAAGKUCgCloAKKAM07FAAKUClAxSgUAJinUAU7FACYpaXFLQAYoxTsUUAJilpcUtADcGlxTsUYoATFGDTqMGgBMGjFOxRigBuKMU7FGKAG4oxTsUYoAZg0U/FJg0ANxSYp+KTFADKKdg0YoAZikp+KSgBmKSn4pKAIyKQin4pCKAGU0ipKaRigBhFJTyKQigBtNIxTqKAGEU0inkYpCKAGU008ikoAjIxSMKeaaaAGMKawp5ppFADGFNanmmmgBtFLiigBRThQKcKAAU4UCnCgAFOFApwoAKcBSKKcooAAKcooApaACgDNFOHpQAU4UClAoAAKcBQBSgZoAAKcBRinAUAIBS0YzTsUAJilpcUtACYpaXFLigBMUuKXFLigBuKXFLg0uKAG4pcCnYoxQA3AowKdRQA3ApMU+jAoAZijBp2KMUAMpMU/FGKAI8UYp+KTFADMUmKfikxQBHiinYpMUAMxSEU+kIoAYRTSKkIptADCKaRTzSEUAMIzTaeRSEUANppp1FAEZFIwp9NNADSKaacaRhQAw0009qa1ADDTTT29aa1ADKKdiigBVpy0lOoAVactIKcKAFWlFFOFAAKcKBThQAUUUq0AKKcBikUU5RQAAU4ChRSgZoAUClAoAp1ABSgUAUoFAAKcBRTgKAEApaUCloATFLilxS4oATFLS4pcUAJijFOxS4oAbiinUYNADaKdg0YNADaKdg0YNADcCkxT8UmKAGYNGKfikoAZikp+KSgBmKTFPxSEUAR4pCKeRSEUAMptSEZptADCKQinEYpCKAGEU01IRTaAIyKRhT6aaAGMKSnGmmgANNNOpGoAYabT2prUAMNNNPamtQAw0009qa1ADKKdRQAq05aSnCgBVpy0gp1ACrTlpKcKAFWloooAVaUUU4UAApwoFOFAAKcPSgU4CgApQKFFKBQAoFKKBTgKAClApQKUCgAApaAKdQAmKXFLilxQAYoxTsUYoATFLilxS0ANwaXBpaKAExRilooATFJg06igBtGKdRigBmKSn4pKAGYpKfikoAZikxT8UhFAEZFIRTzTSKAGEUhp5FNIoAZTSMVIaaaAGEUhFOpGFADDTTT2pretADDTae1NagBlFK1JQA00009qa1ADKaae1IaAIzTTUjUxqAGUU6igBVpy0gp1ACrTlpKcKAFWnLSU6gApVpKdQAq05aQU4UAKtOX1pBThQAq0o5opwoABTqBThQAU4CkApwFAABTgKAKUDNAABTqKcBQAgFLilApaADFFFFABRS4paAG4NLinYNGKAG4oxTsUYoAbijBp2KMUAMop2DRigBtFLikoATFJTqKAGEU0inkUhFADCKaakIzTaAGEU0inkU0jFADGFIRTiKRhQAwim09qa3rQAw001IaaaAIzTTUhppoAjNNNSNTWoAbTTTqRqAGU2ntTWoAYaaae1NagBlFOxRQALT1pq09elAAKetNWnrQAq0tA6UUAKtOWkFOFACrTlpBThQA5actNFOoAVactJTqAFWnLSU4UAKopQKKdQACnUCnCgAFKBQBS0AFFFOAoAQClxSgUuKAExS4p2KMUAJijFOxS4FADcCjAp1FADcCkxT6MUAMxSU/FJQAzFJT8UlADCKSnEUhFACUhFLRQAwikIp5FNYUAMNNp7CmtQAymmntSNQBGaaakamtQBHSNTmpDQAxqYakNNNAEZppp7U1qAGUUrUlADTTTT2prUAMpppx60jUAMooPWigB1Opq9acOtADqcKRactAC0L1opVoActOWkXpTh0oAVactIKcKAFWnLSU4UAKtOWkpwoAVactIKcKAFWnLSCnCgBVpyikFOoAKKKcKACnAUAUoFAABS4pQKWgAxRinYoxQAmKWnYooAbRg07BpcGgBlGKdg0UAMxSU/FJQAzFJTyKQigCMikIp9NIxQAwikp7CmsKAEppp1BoAjNNNSGmmgCM001IaaaAIzTTUhpjUAMNNp7U1qAGNTTT2prUAMNNp7U1qAGGm09qYetAA3SmNT6bQAxqa1PNNoAbRRRQAq05aRelOXpQAq09elNHSnUAFOFNFOHWgB1OHWkWnLQAq9aetNWnLQAq9aetNWnLQA5actIOlOFACrTlpBThQA5acKaKcKAHCiiigBVpy0gpwoAVRTgKQU4UAAFOFApwoAAKMUoFKBQAYowadijBoATFGKdijFADcGkp+KTFADMUlPxSUAMIpCKeRTWFADCKbTyKQigCM001IaaaAIzRTjTaAEamtT6aaAGNTGqQ0xqAGGmmntTWoAZTTT2pjdaAG00049aa3WgBpprdKcetNNADGprU8009KAG0jdaWkagBh602ntTW60AMNFK1FAC04U2nUAOp1NHWnUAKvWnLTVpy0AOWnr0pq9KcKAHDpTqbTqAHCnU0dacvWgBwpy9aRactADlpy01aevSgBVpy0gp1ABSrSU6gBVp600U4UAOFOFNFOWgBwrUt9GlkgSUTIN6hgCDxkVlrXU27FNHjdeqwAj/vmgDN/sOX/nun5Gl/sSX/AJ7p+RqMaxdntH/3zS/2vd+kf/fNAEn9iy/89k/I0f2LL/z2T8jTP7WuvSP/AL5pf7Vu/SP/AL5oAf8A2NJ/z2X8jR/Y0n/PZPyNN/tW6/6Z/wDfNH9qXXon/fNADv7Fl/57L+RpP7Gl/wCeyfkab/at1/0z/wC+aT+1br0j/wC+aAHf2LL/AM9k/I0f2JL/AM90/I03+1rv0j/75pP7Xu/SP/vmgB39hzf890/I1W1LTXs4BK0isGbbgD2P+FWrPVLmW7jjYR7WYA4WrHij/kHp/wBdR/I0Ac81Nan000AMamtTzTTQBG1NNPamtQAlNbrTqRqAGGmmntTWoAYaaelOPWmmgBrdKY1Ppp6UAMamtTm6UjdKAGNTW605qa1ADD1ptPamHrQA2hulFBoAY1Nant0pjUAJRRRQAU5etNHWnr1oActLSLS0AKtPXpTV6U4UAOp1Npw60AOXrTh1pFpy9aAHL1py01actADlp69KavSnDpQA4dKdTacOtADh1p1IvWloAB1p69aatOWgBy05aatPHSgBVp602nUAOFdNH/yBF/69x/6DXMjrXTR/8gVf+vcf+g0Ac6KcKRaUUAOjQuwVQST0ArVs9LULvuT/AMBB/mafpsEdna/aZ/vEZ+g9PrVK9vJbliM7U7KP60AaIn0+3O1TGp/2Rn9RThf2bceYPxU1i4ooA2pLOzuEyqrz/ElZeoWElv8AMPnj/vDt9aZBLJC++Jip7jsa2bG5S7hOQNw4dTQBzp4pGq9q1p9nmyg/dv8Ad9vaqVAEmm/8hCH/AK6D+danij/kHp/11H8jWZpv/IQh/wCug/nWn4o/5B6/9dR/I0AYDU1qe3SmNQAw9aaae1NagBlNPSnN1ppoAbQelFFADW6UxqeelNbpQAxqa3WnNTWoAYetNp7daYetADT0ptOptADW6Uxqeaa3SgBjU1qc1NagBjdaKVqSgBtNbpTjTT0oAbRRRQAL1p60xetPWgBy0tItLQA5elOpq9KdQA6nL1ptOXrQA9actNWnLQA5actNWnLQA9elOpq9KdQA6nL1ptOXrQA9aWkWloAVactNWnLQA9elOpq9KdQA6nL1po609aAHLXSx/wDIFX/r3H/oNc0tdLH/AMgVf+vcf+g0Ac8tWdLi868RD0zk/QVXXpV/w7/x/H/cP9KAJNdnLXAhB+VOv1qkKddktdSE/wB8/wA6bQA4CiilJoAawqSymMF0smeM4b6VG1NagDd1OITWTrjJA3L9RXOnrXT253W6HPVR/Kuak4kIHrQA/Tv+QhD/AL4rU8Tf8eCf9dR/I1maf/yEIf8AfH860/E3/Hgn/XUfyNAGAaa3SnGmnpQAxqa1OamtQA1qY3WntTG60ANooooAbTW6U401ulADGprU5qa1ADWpjdae1MbrQA2m06m0ANprdKdTW6UAMamtTmprUANakpWpKAG02nU2gBtFFFAAvWnrTKcvWgB60tItLQA5elOpi9KeOlADqcvWm04daAHrTlpq9aVetAD1py01actAD16U6mLTx0oAdTl602nCgB60tNXrTqAFWnLTV605aAHr0pwpi09elADqcOtNHSnUAPWulj/5Aq/9e4/9BrmRXTR/8gVf+vcf+g0Ac8tXdEkEeoLno2VqiKepKsGBwQcg0AWdSj8u+kX1bI/HmolNX7oC+s1uY/8AWRjDrWeDQA8GjNNzRmgBSaaaM0sal2wOB1J9BQBILi4S38tZWCt29qrU+ZgW+Xp0A9qYaAJdO/5CEP8AvitTxN/x4J/11H8jWVpv/IQh/wCug/nWp4o/5B6f9dR/I0AYJprdKVqa1ADWprU5qa3WgBrUw9acetNoAbRRRQA2mt0px6UxqAGtTWpzU1qAGtTG605utNNADabTqbQA2mt0px6U1ulADGprU5qa1ADWpKG60UANptONNbpQA2iiigApw602nUAPXrS00dadQAq09elMWnLQA8dKdTV6U4dKAHDrThTadQA5etPWmU4daAHrTlpq9actAD16U4UxactAD6dTV6U4UAFOHWm04UAPWnLTBTqAHrTlplOFAD1rp4/+QGv/AF7j/wBBrlxXURc6IuP+fcf+g0Ac4tOBo8qX/nm//fJpfLl/55v/AN8mgCWzuJLaXfGfqD0NXGjtr354HEMp6o3Q/SqAjk/55t/3zR5cn/PNv++aAJ5rW5iOGhb6gZH6UwRyngRsf+AmnRyXkYwjTADtzStPfN1eb9aAD7M6jdOwiX/a+9+VMmlXb5cQ2p3z1b60xklJyUc/gaTy5P8Anm3/AHzQA2mk08xy/wDPNv8AvmkMcv8Azzf/AL5NAEmm/wDIRh/66D+danij/kHp/wBdR/I1mabHINQhJjYfOO1afir/AJB6f9dR/I0Ac+aaacaa1ADTTaVqa1ACGmnpStTWoAShulFI1ADWprU5qYetACNTG60402gBpptOPSmt0oAaelNPSlamt0oARulManNTWoAa1NbrTm60w9aAGnrRRQelADT0prdKc3SmNQAlFFFAAKcOlMXpTloAfTqavSnDpQAL1p60ynCgB605aYOtPWgB69KcOlMWnLQA8dKcKYtOWgB9OFMWnigBw609aYKcKAHrTlplOoAdSrSUUAPWnLTKcKAHrTlNMFOBoAeproLPVLOOzijaRtyxqD8p6gVzwNKDQB0v9rWP/PVv++DS/wBrWX/PRv8Avk1zQNOzQB0f9q2X/PRv++TR/atl/wA9G/75Nc7mlzQB0X9qWf8Az0b/AL5NH9qWf/PRv++TXO5NGTQB0X9qWf8Az0b/AL5NJ/atl/z0b/vk1z1GaAOh/tWy/wCejf8AfJpP7Wsf+ejf98mudzQTQB0X9rWP/PRv++DVHXr+2ubNY4XJYSAnKkcYP+NZOaaTQAE000pNNY0AIaaaVjTWoAQ02lakoAKaac1MagBKaaVqa1ACHpTGpzU1qAGtTWpW6000AI1Nalpp60AI3WmHrTqaaAG00049Ka3SgBtI3SlpGoAa1NanN1ph60AFFNbrRQAq05aYOtOoAetOWmDrT1oAWnDpTaVaAHinCmLTloAeKcvWminCgB1OHWm04UAOWnrTBThQA9actMFOoAetOWmU6gB60tNp1ACqaUGm0qmgB4NOpgNKDQBIDSg0ynA0APBpc0zNLmgB+aXNMzRmgB+aM03IozQA7NJmkyKTNAC5ozTc0ZoACaQmkzSE0ABNITQTTaAAmmmgmmk0AFFFIxoAQ000rU1qAENNNK1NagBDTTStTWoAQ009KVqa1ACU09KVqa1ACN0pjU5qY1ACNTWpTTaACmnrTqaaAGmm049KaaAG0UUUAAp1MWnLQA8U4UxactAD6KRaWgBw605aaKcKAHrTlpgpwoAetOWmU6gB605aYKcKAHrTlpgpwNAD1py0wU4GgB4NKDTAacpoAfRSA0tACg04GmUoNAD807NRg07NAD80uaZmlzQA7Jpc0zNLmgB2aM03NGaAHZozTc0ZNAC5pM0maTNAC5pCaTNJmgBSaaTRmmk0AKTSUUUABppNFNJoAKbQTSMaAEptKxprGgBDTTStTWoASm0rU1qAENNpWprUAIaaaVqa1ACHpTaVqSgBGprUrdaaaAEamtS009aAEJopKKAAU4U1acKAHU4U0U5aAHCnU0U4UAKtOWmU4UAPWnLTBThQA9actMFOFADhThTRSrQA8U4GmKacpoAeDTgaYppQaAJAacDUYNOoAeDTgaYDSg0APopoNOzQAZp2abRQA7NLmmZpc0APoyabmjJoAfmjNMyaMmgB+TSZNNyaM0AOzSZpM0maAFzSZpKKACiikJoAXNNoJppNAATSE0E00mgAY0hNBNNoACaaTRTSaAA000GmmgApppWprUAIabStTWoAQ02lamtQAlFFI1ACGmt0pWprUAIaaaVqa1ACUUhNFACLT1pgpwoAetKKaKdQA4U9aYKcKAHUq0gooAetOU0wU4GgBwNOFMU05TQA8U6mKacpoAeKcDUdOoAeDTlNMBpQaAJAaUGmA0oNAEgNKDTKXNAD807NR5p2aAH5paZmlzQA6im5NLmgBaKMiigAzRmiigAooooAKKMikzQAtGabmkzQAuaTNJmkzQAtNJopCaAAmkJoJptABTSaCaQmgAJprGgmkJoARjSGimmgANNNBNNNAAaaaCaRjQAhptK1JQAU00rU1qAENNpWprUAJTaVqa1ACUUmaKABactMFOFAD1py0wU4UAOFOFNFKtADwadTFpymgBacKbSqaAH04VGDTgaAJAacDUYNOoAeppQaaDSg0APpwNRg04GgB4NKDTQaUGgB9KDTM07NADs07NR5p2aAH5pc1HmlzQA/NLmmZpc0APzRmmZpcigB2aM+9NyKMigB2aMim5FJmgB2aM03NJk0AOpM0maTNAC5pM0maTNAC0hNJSE0AKTTaCaaTQApNNJoJpCaAAmm0UhNACE0jGhjTSaABjTWNKTTSaAEY0hNBNNoAKDRTSaAA000GmmgAptK1NagBKaaVqa1ACUUmaKAEFOFMWnLQA8U4UxactADxTqYppymgB4pwqMGnA0ASA0U0U6gBVNOU0ynA0APBpQaYDTgaAHg04GowadQA8GlpoNKDQA8GlBplLmgB+admo807NADs07NR5pc0APzS5pmaXNAD80ZNNzRmgB+aM03JozQA7NGabmjNADs0ZpuaM0AOzSZpuTRmgB2aTNNzRmgBc0maTNJmgBc0maTNJmgBc03NGabmgBSaSjNNzQAE0hNBNNJoACaQmgmm0ABNNJoJpGNACE0UUhNAAxprGlJppNACMaQ0U0mgANNNBppoADTTQaaaACikJooASnCmKacpoAfTqYppQaAJBTgajBpwNAEgNKpplOoAeDSg0xTTgaAH0U0GnUAOBpQaZTgaAHA06mA0oNAEgNKDTAaXNAD807NR5p2aAHUuabmlzQA7NLmmUuaAH0uaZmjJoAkzRTM0uRQA7JpcmmZoyaAH5ozTMmjJoAfmkyabk0ZNADs0ZpuaMigBc0mTSZpM0AOzSZpM0maAFpM0lJmgBaTNJmkzQAuaaTRmm5oAUmkJpCaQmgAJppNBNITQAE0lFBNAATTSaKaTQAE02gmkY0ADGmsaUmmk0AIxprUpNNNACMaRqKaaACim0UAANOBqMGnCgCQGlU0wU4GgB6mnKaYDTgaAHA04GmA05TQA+lBpgNOoAeDSg0wGnA0APopoNOoAUGlBptANAEmaUGmUoNAD807NR5p2aAH5pc1HmnZoAdmlzTM0uaAH0ZNNzRk0APzRmm5pcigB2aM03NFADs0ZptFADs0ZptFADsikzSZpM0AOzSUmaTJoAdSZpM0maAFzSZpKTNAC5pM0lJmgBc00mjNITQAE0hNBNNoACaKKQmgBSabQTTSaAAmkJoJpCaAAmmk0U2gAppNBNITQAhNNJpWNNY0ADGmsaGNITQAmaKSigBFNOU0wGlBoAeDTgaYppwNAD6cKjBpwNAEgNKpplOBoAeDSg0wGnA0APpQaYDTqAHA06mA0oNAEgNFNBpc0ALS5pKKAHZp2ajzTs0AOzS5pmaXNAD80uaZS5oAfmjJpuaM0APzRmm5NGaAH5FGaZmlyKAHZozTcijIoAdmjNNyKM0AOyKTNNzRmgB2TSU3JozQA7NJmm5pM0AOzSZpM0maAFzSZpKTNAC5pM0lFABRRmmk0AKTSE0hNITQAE00mikJoAUmm0E02gAJppNBNITQAE01jQTSE0ABNNJoppNABTaCaaTQAUUmaKAEpwpimlFAEgNKDTKcDQA9TTgaYDSg0APBp1MBpQaAJAaUGmA0oNADwacDTAaXNAEgNGabmlBoAeDSg0ylBoAfmlzTM0uaAH0U3NLmgBaXNJRQA7NLmmUZNAD80uaZmlyKAHZNLk0zNGTQA/NGabmjNADs0ZpuaM0AOzRmm5ozQA7NGTTcmkyaAHUZpuaM0ALmkzSZpKAHZpM0lFABRRSZoAWkzSZpM0ALmm5ozTc0AKTSUZppNACk0hNITSE0AFNJoJpCaAAmmk0E0hNAATTaKaTQAE0hNDGmk0ADGmsaUmm0AFFNzRQAA0qmmU4GgBwNOpgNKDQBIDTgajpwNADwaUGmA04GgB+acDUYNOBoAeDS5pgNKDQBIDSg0zNLmgB+aXNMzS5oAfS5pmadmgB1LmmUuaAH5pc0zNLmgB+aKZmlzQA6ikyaM0ALRRkUZoAMmlyaSigBc0ZpKKAFzSZNFFABk0UUZoAKKTNGaAFopuTRmgBc0mTSZpM0AOzSZpM0maAFzSZpKTNAC0maSkzQAuabmjNNzQApNITSZpM0ABNITSE0hNACk02gmmk0ABNITQTTSaAAmkJoJptABTSaUmmsaADNFJRQAUUimloAcDSg0ynA0AOBp2aYDS0ASA0oNMBpQaAH5pwNRg06gB4NLmmA0oNAEmaXNMzS5oAfmlzTM0uaAH5p2ajzS5oAfmlzTM0uaAH0ZNNzS5oAdmlzTM0tADsmlzTKXJoAdmlyKZmjNAD80ZpuRRkUAOzRmm5ozQA7NGabmjIoAdmjIpuRSZoAdmjJpuaTJoAdmjNNozQAuaSkzSZNADs0maTNJmgBaTNJSZoAWkzSZpM0ALmm5ozTc0AKTSUZpuaAFJppNBNITQAU0mimk0AKTSE0hNJQAUhNITSE0ABNJRRQAUU2igAWlWiigBaKKKAHUq0UUALTqKKAFWloooAdSrRRQAtOFFFABTqKKACnUUUAFOFFFABRk0UUAOooooAM0uaKKAFooooAKKKKACiiigAooooAKKKKAA03JoooAKKKKAEJpKKKACkJoooASkaiigBKRqKKAEpGNFFACU2iigBGpKKKAG0jUUUAJTTRRQAjUlFFABTaKKAEJooooA//2Q==';
    var missingDefault = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAASAAAATgAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTEA/9sAQwAEAgMDAwIEAwMDBAQEBAUJBgUFBQULCAgGCQ0LDQ0NCwwMDhAUEQ4PEw8MDBIYEhMVFhcXFw4RGRsZFhoUFhcW/9sAQwEEBAQFBQUKBgYKFg8MDxYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYW/8AAEQgB9AH0AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+ggKcBQBRQAUAZpQKUUAFOAxRSgUAIBThQBTqAAClAoApwFACU4CilAoAQCnYoxTsUAJilpcUtACYpaXFLQAmKXFLiloAbilxTsUuKAG0YNOowaAExS4FLilxQA2inYooAbRg07BpcGgBmDRg0/FGKAGYNFPxSYNADaKdg0UANxSYp+BSYoAbikwafikoAbikxT6TFADMUYp2KMUAR4oxT8UmKAGYpMU/FJigCPFJin4pMUAMpCKfSEUAMIppFSEU2gBhFIRTyKaRQAykIp9NoAaRmm08ikNADaQilooAbiilxRQAtKBSAZpwoABTqKUCgAApwFAFKKAACnAUU4CgBAKUClApQKAClApaUCgBMU7FGKdigBMUuKUClxQAmKXFLiloATFLS4paAG4NLinYpcUANpcUtLigBuKXAp2KKAG0YNOooATFGKWigBMUYpaKAExRilooATBpMGnUUANowKdRigBmKTBp+KMUAMxSYp9JigBlGKdijFADMUmKdiigBmKTFPxSYoAjxSYp+KTFADKQin00igBpFNxTyKQigCMikIp5FIRQAwim08ikNAEZGKQin00jFADTTaeRSEUANooooAdTqAMUoFAABTgKAKUUAAFOopwoAAKUCgCnAUAAFLQBTqADGKUClApQKAEApwFFOAoATFLRinAUAJilpcUuKAExS0uKWgBMUuKKKACijBpcUAJRTqMGgBMGjFOxRigBuKXAp2BRigBuBRgU6igBuBSYp9GBQAzFGKfgUmKAGYNFPxSYoAbRTsUmKAEpMUtFADcUYp1GKAI8UYp+KTFAEeKMU7FJigBmKQin0hFADKaRipCKaaAGEUhFPIpCKAI6aRUlNNADCKQjNPIppFADCKbUhFNNAEZGKQinn0ptADaKXFFACgU4CgU4UAAp1ApwFAAKUChRTgKAAClAzQBmnAUAFOFAFOAoAQClApQKWgApQKUClAoAQCnYop2KAExS0UUAFFLiloATFLS4paAExS4pcUuKAG0uKXBpcUANxS4FOxRigBtFOowaAG0U7BowaAG0U7BowaAG4oxTqMCgBmKTBp+KMUAMpMU+kxQAzBoxTsUYoAZikp+KSgBtGKXFJQA0ikxT6QigBlNIqTFNIoAaRTaeRSUARkUhFPIpCKAGEZptPIpCKAIzSEU+mmgBjCmkU8jFIwoAYRmmmnsKawoAZRTqKAHAUqihRTgKABR3pyikApwoAUClAoFOoAKcBQKcBQAAYpQKAKWgApwFFOAxQAgFOAoApaACiilAoAAKWgCnUAJilxS4paAExS4pcUuKAExS0uKWgBuDS4p2KMUAJgUU6igBuDS4pcGlwaAG4oxTsUYoAbijBp2KTBoAbg0U7BooAbgUmKfikxQAzFGKdg0YoAZikxT8UlADMUmKfikoAZikxTyKQigCOinUhFACYzTadRQAwimkU8jFIRQAymkYp5FJQAwimkU8jFIRQAwjNNNPYU0igBh9KaakIppoAjPFNIqQ02gBmKKWigBwp1ApVoAUU4UiinKKAFHFOApFFOUUACinAUgFOoAKdQBTgMUAAGKUCgCloAKKAM07FAAKUClAxSgUAJinUAU7FACYpaXFLQAYoxTsUUAJilpcUtADcGlxTsUYoATFGDTqMGgBMGjFOxRigBuKMU7FGKAG4oxTsUYoAZg0U/FJg0ANxSYp+KTFADKKdg0YoAZikp+KSgBmKSn4pKAIyKQin4pCKAGU0ipKaRigBhFJTyKQigBtNIxTqKAGEU0inkYpCKAGU008ikoAjIxSMKeaaaAGMKawp5ppFADGFNanmmmgBtFLiigBRThQKcKAAU4UCnCgAFOFApwoAKcBSKKcooAAKcooApaACgDNFOHpQAU4UClAoAAKcBQBSgZoAAKcBRinAUAIBS0YzTsUAJilpcUtACYpaXFLigBMUuKXFLigBuKXFLg0uKAG4pcCnYoxQA3AowKdRQA3ApMU+jAoAZijBp2KMUAMpMU/FGKAI8UYp+KTFADMUmKfikxQBHiinYpMUAMxSEU+kIoAYRTSKkIptADCKaRTzSEUAMIzTaeRSEUANppp1FAEZFIwp9NNADSKaacaRhQAw0009qa1ADDTTT29aa1ADKKdiigBVpy0lOoAVactIKcKAFWlFFOFAAKcKBThQAUUUq0AKKcBikUU5RQAAU4ChRSgZoAUClAoAp1ABSgUAUoFAAKcBRTgKAEApaUCloATFLilxS4oATFLS4pcUAJijFOxS4oAbiinUYNADaKdg0YNADaKdg0YNADcCkxT8UmKAGYNGKfikoAZikp+KSgBmKTFPxSEUAR4pCKeRSEUAMptSEZptADCKQinEYpCKAGEU01IRTaAIyKRhT6aaAGMKSnGmmgANNNOpGoAYabT2prUAMNNNPamtQAw0009qa1ADKKdRQAq05aSnCgBVpy0gp1ACrTlpKcKAFWloooAVaUUU4UAApwoFOFAAKcPSgU4CgApQKFFKBQAoFKKBTgKAClApQKUCgAApaAKdQAmKXFLilxQAYoxTsUYoATFLilxS0ANwaXBpaKAExRilooATFJg06igBtGKdRigBmKSn4pKAGYpKfikoAZikxT8UhFAEZFIRTzTSKAGEUhp5FNIoAZTSMVIaaaAGEUhFOpGFADDTTT2pretADDTae1NagBlFK1JQA00009qa1ADKaae1IaAIzTTUjUxqAGUU6igBVpy0gp1ACrTlpKcKAFWnLSU6gApVpKdQAq05aQU4UAKtOX1pBThQAq0o5opwoABTqBThQAU4CkApwFAABTgKAKUDNAABTqKcBQAgFLilApaADFFFFABRS4paAG4NLinYNGKAG4oxTsUYoAbijBp2KMUAMop2DRigBtFLikoATFJTqKAGEU0inkUhFADCKaakIzTaAGEU0inkU0jFADGFIRTiKRhQAwim09qa3rQAw001IaaaAIzTTUhppoAjNNNSNTWoAbTTTqRqAGU2ntTWoAYaaae1NagBlFOxRQALT1pq09elAAKetNWnrQAq0tA6UUAKtOWkFOFACrTlpBThQA5actNFOoAVactJTqAFWnLSU4UAKopQKKdQACnUCnCgAFKBQBS0AFFFOAoAQClxSgUuKAExS4p2KMUAJijFOxS4FADcCjAp1FADcCkxT6MUAMxSU/FJQAzFJT8UlADCKSnEUhFACUhFLRQAwikIp5FNYUAMNNp7CmtQAymmntSNQBGaaakamtQBHSNTmpDQAxqYakNNNAEZppp7U1qAGUUrUlADTTTT2prUAMpppx60jUAMooPWigB1Opq9acOtADqcKRactAC0L1opVoActOWkXpTh0oAVactIKcKAFWnLSU4UAKtOWkpwoAVactIKcKAFWnLSCnCgBVpyikFOoAKKKcKACnAUAUoFAABS4pQKWgAxRinYoxQAmKWnYooAbRg07BpcGgBlGKdg0UAMxSU/FJQAzFJTyKQigCMikIp9NIxQAwikp7CmsKAEppp1BoAjNNNSGmmgCM001IaaaAIzTTUhpjUAMNNp7U1qAGNTTT2prUAMNNp7U1qAGGm09qYetAA3SmNT6bQAxqa1PNNoAbRRRQAq05aRelOXpQAq09elNHSnUAFOFNFOHWgB1OHWkWnLQAq9aetNWnLQAq9aetNWnLQA5actIOlOFACrTlpBThQA5acKaKcKAHCiiigBVpy0gpwoAVRTgKQU4UAAFOFApwoAAKMUoFKBQAYowadijBoATFGKdijFADcGkp+KTFADMUlPxSUAMIpCKeRTWFADCKbTyKQigCM001IaaaAIzRTjTaAEamtT6aaAGNTGqQ0xqAGGmmntTWoAZTTT2pjdaAG00049aa3WgBpprdKcetNNADGprU8009KAG0jdaWkagBh602ntTW60AMNFK1FAC04U2nUAOp1NHWnUAKvWnLTVpy0AOWnr0pq9KcKAHDpTqbTqAHCnU0dacvWgBwpy9aRactADlpy01aevSgBVpy0gp1ABSrSU6gBVp600U4UAOFOFNFOWgBwrUt9GlkgSUTIN6hgCDxkVlrXU27FNHjdeqwAj/vmgDN/sOX/nun5Gl/sSX/AJ7p+RqMaxdntH/3zS/2vd+kf/fNAEn9iy/89k/I0f2LL/z2T8jTP7WuvSP/AL5pf7Vu/SP/AL5oAf8A2NJ/z2X8jR/Y0n/PZPyNN/tW6/6Z/wDfNH9q3X/TP/vmgB39iy/89l/I0n9jS/8APZPyNN/tW6/6Z/8AfNJ/at16R/8AfNADv7Fl/wCeyfkaP7El/wCe6fkab/a136R/980n9r3fpH/3zQA7+w5v+e6fkaralpr2cAlaRWDNtwB7H/CrVnqlzLdxxsI9rMAcLVjxR/yD0/66j+RoA55qa1PppoAY1NanmmmgCNqaae1NagBKa3WnUjUAMNNNPamtQAw009KcetNNADW6UxqfTT0oAY1NanN0pG6UAMamt1pzU1qAGHrTae1MPWgBtDdKKDQAxqa1PbpTGoASiiigApy9aaOtPXrQA5aWkWloAVaevSmr0pwoAdTqbTh1oAcvWnDrSLTl60AOXrTlpq05aAHLT16U1elOHSgBw6U6m04daAHDrTqRetLQADrT1601actADlpy01aeOlACrT1ptOoAcK6aP/kCL/17j/0GuZHWumj/AOQKv/XuP/QaAOdFOFItKKAFAp2DU+mQ+feIhHyg5b6Crus2fW4iH++B/OgDLxS4FOxRQAzFLDG0syxKOWOBSkVPpTqmoRlvUj8xQBqWun20SAGNZG7swz+lQ6lpkUkTPAmyQDOB0b2xWhSOwRCzHAUZJoA5rTf+QhD/ANdB/OtTxR/yD0/66j+RrNsTnU4jjrIP51peKP8AkHr/ANdR/I0AYDU1qe3SmNQAw9aaae1NagBlNPSnN1ppoAbQelFFADW6UxqeelNbpQAxqa3WnNTWoAYetNp7daYetADT0ptOptADW6Uxqeaa3SgBjU1qc1NagBjdaKVqSgBtNbpTjTT0oAbRRRQAL1p60xetPWgBy0tItLQA5elOpq9KdQA6nL1ptOXrQA9actNWnLQA5actNWnLQA9elOpq9KdQA6nL1ptOXrQA9aWkWloAVactNWnLQA9elOpq9KdQA6nL1po609aAHLXSx/8AIFX/AK9x/wCg1zS10sf/ACBV/wCvcf8AoNAHPLTlpF6U6MFmCgZJOBQBr+HodsLTEcscD6Vo9eDTLaMQ26RD+EYp9AGPqVp5Em9B+7Y8e3tVWuglRZIyjjIPWsW8haCUoeR/CfUUAQMKa1Oanx280kLSIhKqMk0ATW+qTRKFdRIB0J61FfX81yuw4VPRe/1qu1MbrQBLp3/IQh/3xWp4m/48E/66j+RrM0//AJCEP++P51p+Jv8AjwT/AK6j+RoAwDTW6U4009KAGNTWpzU1qAGtTG609qY3WgBtFFFADaa3SnGmt0oAY1NanNTWoAa1MbrT2pjdaAG02nU2gBtNbpTqa3SgBjU1qc1NagBrUlK1JQA2m06m0ANooooAF609aZTl60APWlpFpaAHL0p1MXpTx0oAdTl602nDrQA9actNXrSr1oAetOWmrTloAevSnUxaeOlADqcvWm04UAPWlpq9adQAq05aavWnLQA9elOFMWnr0oAdTh1po6U6gB610sf/ACBV/wCvcf8AoNcyK6aP/kCr/wBe4/8AQaAOeWr+gw+ZebyPljGfx7f59qzxW/oMPlWIcj5pDn8O3+fegC7RRRQAVFeQLcQlG6/wn0NS0UAZlnpzFt1xwAeFB61pKoVdqgADoBS0UAYesWvkXG5R+7fp7H0qjXTXcK3Fu0T9+h9D61zdxG0MrRuMMpwaAH6d/wAhCH/fFanib/jwT/rqP5GsrTf+QhD/ANdB/OtTxR/yD0/66j+RoAwTTW6UrU1qAGtTWpzU1utADWph6049abQA2iiigBtNbpTj0pjUANamtTmprUANamN1pzdaaaAG02nU2gBtNbpTj0prdKAGNTWpzU1qAGtSUN1ooAbTacaa3SgBtFFFABTh1ptOoAevWlpo606gBVp69KYtOWgB46U6mr0pw6UAOHWnCm06gBy9aetMpw60APWnLTV605aAHr0pwpi05aAH06mr0pwoAKcOtNpwoAetOWmCnUAPWnLTKcKAHrXTx/8AIDX/AK9x/wCg1y4rqIudEXH/AD7j/wBBoAwLOMz3CRD+I4rqFUKoVRgKMAVy0IuI33xrIrDoQDU/2i//AOek/wCtAHR0VzouL7/npN+tL599/wA9Jv1oA6Giue8++/56TfrR59//AM9Jv1oA6Giue8++/wCek360faL7/npN+tAHQ1n69aebD56D54xz7is37Rf/APPSb9aabi//AOek/wCtADdN/wCQjD/10H861PFH/IPT/rqP5GszTo5BqEJMbf6wZ+WtPxV/yD0/66j+RoA58000401qAGmm0rU1qAENNPSlamtQAlDdKKRqAGtTWpzUw9aAEamN1pxptADTTacelNbpQA09KaelK1NbpQAjdKY1OamtQA1qa3WnN1ph60ANPWiig9KAGnpTW6U5ulMagBKKKKAAU4dKYvSnLQA+nU1elOHSgAXrT1plOFAD1py0wdaetAD16U4dKYtOWgB46U4UxactAD6cKYtPFADh1p60wU4UAPWnLTKdQA6lWkooAetOWmU4UAPWnKaYKcDQA9TXQWeqWcdnFG0jbljUH5T1ArngaUGgDpf7Wsf+erf98Gl/tay/56N/3ya5oGnZoA6P+1bL/no3/fJo/tWy/wCejf8AfJrnc0uaAOi/tSz/AOejf98mj+1LP/no3/fJrncmjJoA6L+1LP8A56N/3yaT+1bL/no3/fJrnqM0AdD/AGrZf89G/wC+TSf2tY/89G/75Nc7mgmgDov7Wsf+ejf98GqOvX9tc2axwuSwkBOVI4wf8ayc00mgAJpppSaaxoAQ000rGmtQAhptK1JQAU005qY1ACU00rU1qAEPSmNTmprUANamtSt1ppoARqa1LTT1oARutMPWnU00ANpppx6U1ulADaRulLSNQA1qa1ObrTD1oAKKa3WigBVpy0wdadQA9actMHWnrQAtOHSm0q0APFOFMWnLQA8U5etNFOFADqcOtNpwoActPWmCnCgB605aYKdQA9actMp1AD1pabTqAFU0oNNpVNADwadTAaUGgCQGlBplOBoAeDS5pmaXNAD80uaZmjNAD80ZpuRRmgB2aTNJkUmaAFzRmm5ozQAE0hNJmkJoACaQmgmm0ABNNNBNNJoAKKKRjQAhpppWprUAIaaaVqa1ACGmmlamtQAhpp6UrU1qAEpp6UrU1qAEbpTGpzUxqAEamtSmm0AFNPWnU00ANNNpx6U00ANooooABTqYtOWgB4pwpi05aAH0Ui0tADh1py00U4UAPWnLTBThQA9actMp1AD1py0wU4UAPWnLTBTgaAHrTlpgpwNADwaUGmA05TQA+ikBpaAFBpwNMpQaAH5p2ajBp2aAH5pc0zNLmgB2TS5pmaXNADs0ZpuaM0AOzRmm5oyaAFzSZpM0maAFzSE0maTNACk00mjNNJoAUmkoooADTSaKaTQAU2gmkY0AJTaVjTWNACGmmlamtQAlNpWprUAIabStTWoAQ000rU1qAEPSm0rUlACNTWpW6000AI1Nalpp60AITRSUUAApwpq04UAOpwpopy0AOFOpopwoAVactMpwoAetOWmCnCgB605aYKcKAHCnCmilWgB4pwNMU05TQA8GnA0xTSg0ASA04GowadQA8GnA0wGlBoAfRTQadmgAzTs02igB2aXNMzS5oAfRk03NGTQA/NGaZk0ZNAD8mkyabk0ZoAdmkzSZpM0ALmkzSUUAFFFITQAuabQTTSaAAmkJoJppNAAxpCaCabQAE00mimk0ABppoNNNABTTStTWoAQ02lamtQAhptK1NagBKKKRqAENNbpStTWoAQ000rU1qAEopCaKAEWnrTBThQA9aUU0U6gBwp60wU4UAOpVpBRQA9acppgpwNADgacKYppymgB4p1MU05TQA8U4Go6dQA8GnKaYDSg0ASA0oNMBpQaAJAaUGmUuaAH5p2ajzTs0APzS0zNLmgB1FNyaXNAC0UZFFABmjNFFABRRRQAUUZFJmgBaM03NJmgBc0maTNJmgBaaTRSE0ABNITQTTaACmk0E0hNAATTWNBNITQAjGkNFNNAAaaaCaaaAA000E0jGgBDTaVqSgApppWprUAIabStTWoASm0rU1qAEopM0UAC05aYKcKAHrTlpgpwoAcKcKaKVaAHg06mLTlNAC04U2lU0APpwqMGnA0ASA04GowadQA9TSg00GlBoAfTgajBpwNADwaUGmg0oNAD6UGmZp2aAHZp2ajzTs0APzS5qPNLmgB+aXNMzS5oAfmjNMzS5FADs0Z96bkUZFADs0ZFNyKTNADs0ZpuaTJoAdSZpM0maAFzSZpM0maAFpCaSkJoAUmm0E00mgBSaaTQTSE0ABNNopCaAEJpGNDGmk0ADGmsaUmmk0AIxpCaCabQAUGimk0ABppoNNNABTaVqa1ACU00rU1qAEopM0UAIKcKYtOWgB4pwpi05aAHinUxTTlNADxThUYNOBoAkBopop1ACqacpplOBoAeDSg0wGnA0APBpwNRg06gB4NLTQaUGgB4NKDTKXNAD807NR5p2aAHZp2ajzS5oAfmlzTM0uaAH5oyabmjNAD80ZpuTRmgB2aM03NGaAHZozTc0ZoAdmkzTcmjNADs0mabmjNAC5pM0maTNAC5pM0maTNAC5puaM03NACk0lGabmgAJpCaCaaTQAE0hNBNNoACaaTQTSMaAEJoopCaABjTWNKTTSaAEY0hoppNAAaaaDTTQAGmmg000AFFITRQAlOFMU05TQA+nUxTSg0ASCnA1GDTgaAJAaVTTKdQA8GlBpimnA0APopoNOoAcDSg0ynA0AOBp1MBpQaAJAaUGmA0uaAH5p2ajzTs0AOpc03NLmgB2aXNMpc0APpc0zNGTQBJmimZpcigB2TS5NMzRk0APzRmmZNGTQA/NJk03JoyaAHZozTc0ZFAC5pMmkzSZoAdmkzSZpM0ALSZpKTNAC0maTNJmgBc00mjNNzQApNITSE0hNAATTSaCaQmgAJpKKCaAAmmk0U0mgAJptBNIxoAGNNY0pNNJoARjTWpSaaaAEY0jUU00AFFNooAAacDUYNOFAEgNKppgpwNAD1NOU0wGnA0AOBpwNMBpymgB9KDTAadQA8GlBpgNOBoAfRTQadQAoNKDTaAaAJM0oNMpQaAH5p2ajzTs0APzS5qPNOzQA7NLmmZpc0APoyabmjJoAfmjNNzS5FADs0ZpuaKAHZozTaKAHZozTaKAHZFJmkzSZoAdmkpM0mTQA6kzSZpM0ALmkzSUmaAFzSZpKTNAC5ppNGaQmgAJpCaCabQAE0UUhNACk02gmmk0ABNITQTSE0ABNNJoptABTSaCaQmgBCaaTSsaaxoAGNNY0MaQmgBM0UlFACKacppgNKDQA8GnA0xTTgaAH04VGDTgaAJAaVTTKcDQA8GlBpgNOBoAfSg0wGnUAOBp1MBpQaAJAaKaDS5oAWlzSUUAOzTs1HmnZoAdmlzTM0uaAH5pc0ylzQA/NGTTc0ZoAfmjNNyaM0APyKM0zNLkUAOzRmm5FGRQA7NGabkUZoAdkUmabmjNADsmkpuTRmgB2aTNNzSZoAdmkzSZpM0ALmkzSUmaAFzSZpKKACijNNJoAUmkJpCaQmgAJppNFITQApNNoJptAATTSaCaQmgAJprGgmkJoACaaTRTSaACm0E00mgAopM0UAJThTFNKKAJAaUGmU4GgB6mnA0wGlBoAeDTqYDSg0ASA0oNMBpQaAHg04GmA0uaAJAaM03NKDQA8GlBplKDQA/NLmmZpc0APopuaXNAC0uaSigB2aXNMoyaAH5pc0zNLkUAOyaXJpmaMmgB+aM03NGaAHZozTc0ZoAdmjNNzRmgB2aMmm5NJk0AOozTc0ZoAXNJmkzSUAOzSZpKKACiikzQAtJmkzSZoAXNNzRmm5oAUmkozTSaAFJpCaQmkJoAKaTQTSE0ABNNJoJpCaAAmm0U0mgAJpCaGNNJoAGNNY0pNNoAKKbmigABpVNMpwNADgadTAaUGgCQGnA1HTgaAHg0oNMBpwNAD804GowacDQA8GlzTAaUGgCQGlBpmaXNAD80uaZmlzQA+lzTM07NADqXNMpc0APzS5pmaXNAD80UzNLmgB1FJk0ZoAWijIozQAZNLk0lFAC5ozSUUALmkyaKKADJooozQAUUmaM0ALRTcmjNAC5pMmkzSZoAdmkzSZpM0ALmkzSUmaAFpM0lJmgBc03NGabmgBSaQmkzSZoACaQmkJpCaAFJptBNNJoACaQmgmmk0ABNITQTTaACmk0pNNY0AGaKSigAopFNLQA4GlBplOBoAcDTs0wGloAkBpQaYDSg0APzTgajBp1ADwaXNMBpQaAJM0uaZmlzQA/NLmmZpc0APzTs1HmlzQA/NLmmZpc0APoyabmlzQA7NLmmZpaAHZNLmmUuTQA7NLkUzNGaAH5ozTcijIoAdmjNNzRmgB2aM03NGRQA7NGRTcikzQA7NGTTc0mTQA7NGabRmgBc0lJmkyaAHZpM0maTNAC0maSkzQAtJmkzSZoAXNNzRmm5oAUmkozTc0AKTTSaCaQmgAppNFNJoAUmkJpCaSgApCaQmkJoACaSiigAoptFAAtKtFFAC0UUUAOpVoooAWnUUUAKtLRRQA6lWiigBacKKKACnUUUAFOoooAKcKKKACjJoooAdRRRQAZpc0UUALRRRQAUUUUAFFFFABRRRQAUUUUABpuTRRQAUUUUAITSUUUAFITRRQAlI1FFACUjUUUAJSMaKKAEptFFACNSUUUANpGoooASmmiigBGpKKKACm0UUAITRRRQB//Z';
	return {
		restrict: 'A',
		scope: { placehold: '@',placeholdLoading: '@',placeholdHolder: '@' },
		link: function(scope, element, attrs) {
		  	element.attr('src', scope.placeholdLoading||loadingDefault);
	  	 	var img = new Image();
            img.src = scope.placehold;
	      	img.onload = function() {
	        	element.attr('src', scope.placehold);
	      	};
			img.onerror = function(){
	      		element.attr('src',scope.placeholdHolder||missingDefault); 
	      	};
		}
	};
});
'use strict';


// angular.module('core', []).filter('numberFixedLen', function () {
//         return function (n, len) {
//             var num = parseInt(n, 10);
//             len = parseInt(len, 10);
//             if (isNaN(num) || isNaN(len)) {
//                 return n;
//             }
//             num = ''+num;
//             while (num.length < len) {
//                 num = '0'+num;
//             }
//             return num;
//         };
//     });
'use strict';

angular.module('core').factory('MainPage', ['$resource',
	function($resource) {
		return $resource('api/mainpage', {
		}, {
			get: {
				method: 'GET',
				isArray: false
			}
		});
	}
]);
angular.module('core').factory('SendContact', ['$resource',
	function($resource) {
		return $resource('api/sendcontact', {
		}, {
			send: {
				method: 'POST',
				isArray: false
			}
		});
	}
]);
'use strict';

angular.module('core').factory('MainMenu',['$resource',
	function($resource) {
		return $resource('api/mainmenu/', {
			},{'query': {
					method: 'GET', 
					isArray: false,
         		} 
     		}
 		);
	}
]);
angular.module('users').factory('User', ['$resource',
	function($resource) {
		return $resource(':auth/:action/:token', {
			action: '@action',
			token: '@token',
			},{'signin': {
						method: 'POST', 
						isArray: false,
						params:{action:'signin',auth:'auth'}
						
         		},'signout': {
						method: 'GET', 
						isArray: false,
						params:{action:'signout',auth:'auth'}
         		},'signup': {
						method: 'POST', 
						isArray: false,
						params:{action:'signup',auth:'auth'}
         		},'forgot': {
						method: 'POST', 
						isArray: false,
						params:{action:'forgot',auth:'auth'}
         		},'changePassword': {
						method: 'POST', 
						isArray: false,
						params:{action:'password',auth:'users'}
         		},'updateUser':{
         				method: 'PUT', 
						isArray: false,
						params:{auth:'users'}
         		},'updateAddress':{
         				method: 'PUT', 
						isArray: false,
						params:{action:'updateAddress',auth:'users'}
         		},'removeAddress':{
         				method: 'POST', 
						isArray: false,
						params:{action:'removeAddress',auth:'users'}
         		},'updateProfile':{
         				method: 'PUT', 
						isArray: false,
						params:{action:'updateAddress',auth:'users'}
         		},'updatePassword':{
         				method: 'PUT', 
						isArray: false,
						params:{action:'updateAddress',auth:'users'}
         		},'orderHistory':{
         				method: 'GET', 
						isArray: false,
						params:{action:'orderHistory',auth:'users'}
         		},'addWishList':{
         				method: 'POST', 
						isArray: false,
						params:{action:'addWishList',auth:'users'}
         		},'removeWishList':{
         				method: 'POST', 
						isArray: false,
						params:{action:'removeWishList',auth:'users'}
         		},'getFavoritos':{
         				method: 'GET', 
						isArray: false,
						params:{action:'favoritos',auth:'users'}
         		}
     		}
 		);
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		// $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
		// 	function($q, $location, Authentication) {
		// 		return {
		// 			responseError: function(rejection) {
		// 				switch (rejection.status) {
		// 					case 401:
		// 						// Deauthenticate the global user
		// 						Authentication.user = null;

		// 						// Redirect to signin page
		// 						$location.path('signin');
		// 						break;
		// 					case 403:
		// 						// Add unauthorized behaviour 
		// 						break;
		// 				}

		// 				return $q.reject(rejection);
		// 			}
		// 		};
		// 	}
		// ]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/user/profile',
			templateUrl: 'modules/coreUsers/views/settings/profile.client.view.html'
		}).
		state('orderHistory', {
			url: '/user/orders',
			templateUrl: 'modules/coreUsers/views/settings/order_history.client.view.html'
		}).
		state('favoritos', {
			url: '/user/favoritos',
			templateUrl: 'modules/coreUsers/views/settings/favoritos.client.view.html'
		}).
		state('loginAndRegister', {
			url: '/login',
			templateUrl: 'modules/coreUsers/views/authentication/login_register.client.view.html'
		}).
		state('forgotpassword', {
			url: '/user/esquecisenha',
			templateUrl: 'modules/coreUsers/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/coreUsers/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/coreUsers/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/coreUsers/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$rootScope','$scope', '$http', '$location', 'Authentication','blockUI','User','$window',
	function($rootScope,$scope, $http, $location, Authentication,blockUI,User,$window) {
		$scope.authentication = Authentication;
	    $scope.redirect = $location.search().redirect;
	    window.scrollTo(0, 0);
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');
		//$scope.$watch('user', function() { $scope.error = null; }, true);
		$scope.fbclick = function(){
			ga('send', 'event', 'button', 'click', 'facebookconnect');
		};
		$scope.signup = function() {
			if(!$scope.user){
				$scope.error = 'Preencha o cadastro!';
			}else 
			if($scope.user.repeatPassword.length<7) {
				$scope.error = 'A deve ter mais de 7 caracteres';
			}else if($scope.user.password!==$scope.user.repeatPassword){
				$scope.error = 'As senhas devem ser iguais';
			}else{

				$http.post('/auth/signup', $scope.user).success(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;

					if($location.search().redirect){
						$location.path($location.search().redirect);
						$location.search({});
					}else{
						$location.path('/');
					}
					// And redirect to the index page

				}).error(function(response) {
					$scope.error = response.message;
				});
			}

		};
		
		$scope.login = function(user){
			User.signin(user).$promise.then(function(userResponse,error,progressback){
				// console.log(p);
				if(error){
					console.log(error);
				}else if(!jQuery.isEmptyObject(userResponse)){
					console.log(userResponse);
					$scope.authentication.user = userResponse;
				}

				if($location.search().redirect){
					// var url = window.location.href; 
					// $window.location.href = url;
					$location.path($location.search().redirect);
					$location.search({});
				}else{
			 		$window.location.reload();
				}
			 	// $route.reload();
			},function(err){
				$scope.login_error = err.data.message;
				console.log(err);
			});
		};


		// $scope.signin = function() {
		// 	$http.post('/auth/signin', $scope.credentials).success(function(response) {
		// 		// If successful we assign the response to the global user model
		// 		$scope.authentication.user = response;

		// 		// And redirect to the index page
		// 		$location.path('/');
		// 	}).error(function(response) {
		// 		$scope.error = response.message;
		// 	});
		// };
	}
]);

'use strict';

angular.module('users').controller('PasswordController', ['$rootScope','$scope', '$stateParams', '$http', '$location', 'Authentication','blockUI',
	function($rootScope,$scope, $stateParams, $http, $location, Authentication,blockUI) {
	    window.scrollTo(0, 0);
		$scope.authentication = Authentication;
		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		$scope.resetpassword = function(){
			$http.get('/auth/reset/'+$stateParams.token, {}).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.valid;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.valid;
				$location.path('/password/reset/invalid');

			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$rootScope','$scope', '$http', '$location', 'User', 'Authentication','Cep','blockUI',
	function($rootScope,$scope, $http, $location, User, Authentication,Cep,blockUI) {
	    window.scrollTo(0, 0);
		$scope.user = Authentication.user;
		$scope.notStared = '<i class="fa fa-star-o"></i> Gostei!';
		$scope.stared = '<i class="fa fa-star"></i> Remover!';
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		$scope.profile =function(){
			$scope.user = Authentication.user;
		};
		
		$scope.orderHistory = function(){
			$scope.newOrders = [];
			$scope.oldOrders = [];
			User.orderHistory().$promise.then(function(response,error,progressback){
				$scope.newOrders = response.newOrders;
				$scope.oldOrders = response.oldOrders;
			},function(reason){
				$location.path('/');
			});
		};
		$scope.getAddress = function(cep){
			Cep.get({cep:cep}).$promise.then(function(response,error,progressback){
				$scope.address.bairro = response.bairro;
				$scope.address.address = response.logradouro;
				$scope.address.city  = response.localidade;
				$scope.address.state = response.uf;
			},function(reason){
				$scope.address.blockAll = false;
			});
		};

		$scope.favoritos = function(){
			$scope.favoritosProducts = [];
			User.getFavoritos().$promise.then(function(response,error,progressback){
				$scope.favoritosProducts = response.products;
			},function(reason){

			});
		};

		$scope.like = function(productSlug){
			User.addWishList({productSlug:productSlug}).$promise.then(function(response){
				$scope.user = response;
				Authentication.user = response;
			},function(reason){
				console.log(reason);
			});
		};
		$scope.dislike = function(productSlug){
			User.removeWishList({productSlug:productSlug}).$promise.then(function(response){
				$scope.user = response;
				Authentication.user = response;
			},function(reason){
				console.log(reason);
			});
		};
		
		$scope.alreadyLiked = function(productSlug){
			if($scope.user){
				return $scope.user.wishList.indexOf(productSlug)>=0;
			}else{
				return false;
			} 
		};
		
		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new User($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};
		$scope.changePassword = function(passwordDetails){
			if(passwordDetails&&Authentication.user){
				//save or update address for user!
				$scope.userCall = User.changePassword(passwordDetails);
				$scope.userCall.$promise.then(function(response,error,progressback){
					$scope.successPassword = response.message;
				},function(reason){
					$scope.errorPassword = reason.data.message;
				});
				$scope.passwordDetails={};

			}else{
				$location.path('/profile');
			}
		};
		$scope.editUser = function(user){
			if(user&&Authentication.user){
				//save or update address for user!
				$scope.userCall = User.updateUser(user);
				$scope.userCall.$promise.then(function(response,error,progressback){
					$scope.successUser = 'Salvo com sucesso!';
					$scope.user = response;
					Authentication.user = response;
					// $scope.profile();
				},function(reason){
					$scope.errorUser = 'Erro ao salvar!';
				});

			}else{
				$location.path('/profile');
			}
		};
		$scope.addOrEditAddress = function(address){
			if(address&&Authentication.user){
				//save or update address for user!
				$scope.userCall = User.updateAddress({address:address});
				$scope.userCall.$promise.then(function(response,error,progressback){
					$scope.successAddress = 'Salvo com sucesso!';
					$scope.user = response;
					Authentication.user = response;
					// $scope.profile();
				},function(reason){
					if(reason&&reason.data)
						$scope.errorAddress = reason.data.message||'Erro ao salvar!';
					else
						$scope.errorAddress = 'Erro ao salvar!';
						
				});

			}else{
				$location.path('/profile');
			}
		};
		$scope.removeAddress = function(address){
			if(address&&Authentication.user){
				//save or update address for user!
				$scope.userCall = User.removeAddress({address:address});
				$scope.userCall.$promise.then(function(response,error,progressback){
					$scope.successAddress = 'Removido com sucesso!';
					$scope.user = response;
					Authentication.user = response;
					// $scope.profile();
				},function(reason){
					$scope.errorAddress = 'Erro ao salvar!';
				});

			}else{
				$location.path('/profile');
			}
		};
		$scope.bindAddress = function(address){
			$scope.successAddress = '';
			$scope.errorAddress = '';

			$scope.address = address;
		};
		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]).directive('myBar', function() {
	var statusOrderEnum = {
		'PAGO':3,
		'DISPONIVEL':4,
		'DEVOLVIDA':6,
		'CANCELADO':7
	};
	var statusEntregaEnum = {
	 	'SEMSTATUS':0,
		'PRODUCAO':1,
		'EMBALAGEM':2,
		'EMTRANSITO':3,
		'ENTREGUE':4
	};
	return {
    	restrict: 'E',
    	scope: {
    		order: '=order'
	    },
	    link: function(scope, element, attrs, tabsCtrl) {
	    	scope.$watch('order' ,function(newValue,oldValue) {
		    	var order = newValue;
		    	if(order.lastStatus&&statusOrderEnum[order.lastStatus]===3){
					var wizardDiv = $(element).find('.wizard');
					wizardDiv.show();
					wizardDiv.bootstrapWizard({onTabShow: function(tab, navigation, index) {
						var $total = navigation.find('li').length;
						var $current = statusEntregaEnum[order.statusEntrega];
						var $percent = ($current/$total) * 100;
						navigation.find('li').attr('class','disabled');
					 	navigation.find('li:lt('+$current+')').attr('class','active');
						navigation.parent().find('.bar').css({width:$percent+'%'});
					},
					'tabClass': 'nav nav-pills',
					onTabClick: function(tab, navigation, index) {
							return false;
						}
					});
				}else{
					$(element).find('.wizard').hide();
				}
		 	});
	    },
    	templateUrl: 'modules/coreUsers/views/settings/order_status_bar.client.view.html'
  	};
});
'use strict';



'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);

angular.module('users').directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck.replace('.','-');
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    };
  }]);


'use strict';

//Setting up route
angular.module('localStore').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('allLocalStores', {
			url: '/lojasparceiras/',
			templateUrl: 'modules/localStore/views/allLocalStore.client.view.html'
		}).state('localStoreWithSlug', {
			url: '/lojasparceiras/:localStoreSlug',
			templateUrl: 'modules/localStore/views/localStore.client.view.html'
		});
		
	}
]);

'use strict';

angular.module('localStore').controller('LocalStoreController', ['$rootScope','$window','$scope','$location','$timeout','$stateParams','LocalStore','Authentication','blockUI',
	function($rootScope,$window,$scope,$location,$timeout,$stateParams,LocalStore,Authentication,blockUI) {
		// checkout controller logic
		// ...
	    window.scrollTo(0, 0);
		$scope.Authentication = Authentication;
		$scope.localStore = {};
		$scope.localStore.products = [];
		$scope.findLocalStore = function(){
			blockUI.start();
			if($stateParams.localStoreSlug){
				LocalStore.get({locaStoreSlug:$stateParams.localStoreSlug})
					.$promise.then(function(response,error,progressback){
						if(response.localStore)
							$scope.localStore = response.localStore;
						if(response.products)
							$scope.localStore.products = response.products;
						blockUI.stop();
				},function(reason){
					console.log(reason);
					$location.path('/');
					blockUI.stop();
				});
			}else{
				$location.path('/');
				blockUI.stop();
			}
		};
		$scope.findAllLocalStores = function(){
			blockUI.start();
			LocalStore.getAll()
				.$promise.then(function(response,error,progressback){
					$scope.localStores = response;
					$scope.localStores.forEach(function(localStore,index){
						var hasFrontImage = false;
						var frontImage = {};
						localStore.images.forEach(function(image){
							if(image.frontImage){
								hasFrontImage = true;
								frontImage = image;
							}
						});
						if(hasFrontImage){
							$scope.localStores[index].frontImage = frontImage;
						}else{
							$scope.localStores[index].frontImage = $scope.localStores[index].images[0];
						}
					});
					blockUI.stop();
			},function(reason){
				console.log(reason);
				$location.path('/');
				blockUI.stop();
			});
		};

		$scope.initCarousel = function(){
			$('#owl-demo').owlCarousel({

				navigation : false,
				slideSpeed : 300,
				paginationSpeed : 400,
				singleItem : true,
				navigationText: false,
				responsive: true,
				autoPlay:false,
				rewindNav:true,
				// 'singleItem:true' is a shortcut for:
				// items : 1, 
				// itemsDesktop : false,
				// itemsDesktopSmall : false,
				// itemsTablet: false,
				// itemsMobile : false

	      		});
		};
	}	
]);

 
'use strict';

angular.module('localStore').factory('LocalStore',['$resource',
	function($resource) {
		return $resource('api/localstore/:locaStoreSlug', {
			locaStoreSlug: '@locaStoreSlug'
			},{'get': {
					method: 'GET', 
					isArray: false,
         		},
         		'getAll': {
					method: 'GET', 
					isArray: true,
         		}  
     		}
 		);
	}
]);
'use strict';

//Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('productsSearch', {
			url: '/search',
			templateUrl: 'modules/products/views/search.client.view.html'
		}).
		state('products', {
			url: '/products',
			templateUrl: 'modules/products/views/products.client.view.html'
		}).
		state('productsEsgotados', {
			url: '/products/esgotados',
			templateUrl: 'modules/products/views/products-esgotados.client.view.html'
		}).
		state('productWithSlug', {
			url: '/product/:productSlug',
			templateUrl: 'modules/products/views/view-product.client.view.html'
		}).
		state('productWithGender', {
			url: '/products/gender/:genderSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithCollection', {
			url: '/products/collection/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithCollectionSlugAndGender', {
			url: '/products/collection/:genderSlug/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithModel', {
			url: '/:model',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithModelAndGender', {
			url: '/:model/:genderSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithModelAndCollection', {
			url: '/:model/collection/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		}).
		state('productWithModelAndCollectionAndGender', {
			url: '/:model/:genderSlug/:collectionSlug',
			templateUrl: 'modules/products/views/products.client.view.html',
		 	reloadOnSearch: false
		});
		
	}
]);
'use strict';

angular.module('products').controller('ProductsController', ['$rootScope','$scope','$location','$timeout','$stateParams','Product',
	'ProductRelated','Collection','Size','Price','Color','Model','Order','ProductSearch','blockUI','Authentication','User',
	function($rootScope,$scope,$location,$timeout,$stateParams,Product,ProductRelated,Collection,Size,Price,Color,Model,Order,ProductSearch,blockUI,Authentication,User) {
		// Products controller logic
		//in controller that doesn't reload
	    window.scrollTo(0, 0);
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		$scope.$on('$locationChangeSuccess',function(){
		  //update your scope based on new $routeParams

		  	if($location.path()===$scope.path)
		  		$scope.find();
		});
		$scope.productQuery = {};

		$scope.direction = {};
		$scope.direction.asc='▲';
		$scope.direction.desc='▼';
		$scope.direction.none='▼▲';

		$scope.find = function() {
			
			var queryObject = jQuery.extend(true, {}, $location.search());

			if($stateParams.genderSlug){
				queryObject.gender = $stateParams.genderSlug;
			}
			if($stateParams.model){
				queryObject.model = $stateParams.model;
			}
			if($stateParams.collectionSlug){
				queryObject.collection = $stateParams.collectionSlug;
			} 	
			$scope.products = [];
			$scope.productsServer = Product.query(queryObject);
			$scope.productsServer.$promise.then(function(p,error,progressback){
				if(p.products)
					$scope.products = p.products;

			},function(reason){
				console.log(reason);
			});

			$scope.updateSelectOptions();
			ga('send', {
			  'hitType': 'pageview',
			  'page': $location.path(),
			});


		};
		$scope.findEsgotados = function() {
			Product.query({
				productSlug: 'esgotados'
			}).$promise.then(function(response,error,progressback){
				if(response.products)
					$scope.products = response.products;
			},function(reason){
				console.log(reason);
			});
			$scope.productQuery.page = 1;

			ga('send', {
			  'hitType': 'pageview',
			  'page': $location.path(),
			});

		};
		$scope.findNextPageEsgotados = function(){
			if ($scope.products<10||$scope.productQuery.findNextPageStopCalling) return;
   			if ($scope.productQuery.page) 
   				$scope.productQuery.page=$scope.productQuery.page+1; 

			var queryObject = jQuery.extend(true, {}, $location.search());
			queryObject.productSlug = 'esgotados';
			
			if ($scope.productQuery.page) 
				queryObject.page = $scope.productQuery.page;

			Product.query(queryObject).$promise.then(function(response,error,progressback){
				if(response.products)
					$scope.products = $scope.products.concat(response.products);
				if(response.products.length===0)
					$scope.productQuery.findNextPageStopCalling = true;
			},function(reason){
				console.log(reason);
			});
		};
		$scope.findNextPage = function(){
			if ($scope.products<10||$scope.productQuery.busy||$scope.productQuery.findNextPageStopCalling) return;
   			if ($scope.productQuery.page) 
   				$scope.productQuery.page=$scope.productQuery.page+1; 

   			$scope.productQuery.busy = true;

			var queryObject = jQuery.extend(true, {}, $location.search());

			if($stateParams.genderSlug){
				queryObject.gender = $stateParams.genderSlug;
			}
			if($stateParams.model){
				queryObject.model = $stateParams.model;
			}
			if($stateParams.collectionSlug){
				queryObject.collection = $stateParams.collectionSlug;
			} 	
			if ($scope.productQuery.page) 
				queryObject.page = $scope.productQuery.page;

			$scope.productsServer = Product.query(queryObject);
			$scope.productsServer.$promise.then(function(p,error,progressback){
				if(p.products)
					$scope.products = $scope.products.concat(p.products);
				if(p.products.length===0)
					$scope.productQuery.findNextPageStopCalling = true;
				$scope.productQuery.busy = false;
			},function(reason){
				console.log(reason);
			});

		};

		$scope.updateSelectOptions = function(){
			$scope.productQuery.busy = false;
			$scope.productQuery.page = 1;
			$scope.productQuery.findNextPageStopCalling = false;
			if(!$scope.models){
				$scope.models = Model.query();
				$scope.models.$promise.then(function(allCollections){
					if($stateParams.model){
				  		var notModel = true;
						if(allCollections){
							allCollections.forEach(function(model){
								if(model===$stateParams.model){
									notModel = false;							
								}
							});
						}
						if(notModel){
							$location.path('/');
						}
					}	
				});
				$scope.allCollections = Collection.query();
				$scope.collectionsGender = [];
				$scope.collections = [];
				$scope.allCollections.$promise.then(function(allCollections){
					allCollections.forEach(function(collection){
						if(collection.gender){
							if($scope.collectionsGender.filter(function(o){return o.slug===collection.slug;}).length===0)
								$scope.collectionsGender.push(collection);
						}else{
							if($scope.collections.filter(function(o){return o.slug===collection.slug;}).length===0)
								$scope.collections.push(collection);
						}
					});
				});

				$scope.sizes = Size.query();
				$scope.prices = Price.query();
				$scope.colors = Color.query();
			}


			$scope.updateVariables();
		};

		$scope.updateVariables = function(){
			$scope.path = $location.path();

			if($location.search().size){
				$scope.sizeMarked = $location.search().size;
			}else{
				$scope.sizeMarked = '';
				$scope.sizeMarkedStyle = {display:'none'};
			}

			if($location.search().price){
				$scope.priceMarked = parseFloat($location.search().price);
			}else{
				$scope.priceMarked = '';
				$scope.priceMarkedStyle = {display:'none'};

			}

			if($location.search().color){
				$scope.colorMarked = $location.search().color;
			}else{
				$scope.colorMarked = '';
				$scope.colorMarkedStyle = {display:'none'};
			}

			if($location.search().sort){
				$scope.sortMarked = $location.search().sort;
			}else{
				$scope.sortMarked = '';
			}

			if($location.search().order){
				$scope.orderMarked = $location.search().order;
			}else{
				$scope.orderMarked = 'none';
			}

			if($stateParams.collectionSlug){
				$scope.collectionMarked = $stateParams.collectionSlug;
			}else{
				$scope.collectionMarked = '';
				$scope.collectionMarkedStyle = {display:'none'};
			}

			if($stateParams.genderSlug){
				$scope.genderMarked = $stateParams.genderSlug;
			}else{
				$scope.genderMarked =  '';
			}

			if($stateParams.model){
				$scope.modeloCamisaMarked = $stateParams.model;
			}else{
				$scope.modeloCamisaMarked =  '';
				$scope.modeloCamisaMarkedStyle = {display:'none'};
			}


			if($scope.colorMarked||$scope.priceMarked||$scope.sizeMarked||$scope.modeloCamisaMarked||$scope.genderMarked||$scope.collectionMarked){
				$scope.hasFilter = true;
			}else{
				$scope.hasFilter = false;
			}
		};
		
		$scope.updateGender = function(gender){
			if(gender){
				$location.path($scope.linkGender(gender));
				ga('send', 'event', 'button', 'click', 'gender');
			}
		};


		$scope.linkGender = function(gender){
			var queryString = '';
			// $location.absUrl().split('?')[1];
			// queryString = (queryString)?'?'+queryString:'';
			if($scope.collectionMarked&&$stateParams.model)
				return $stateParams.model+'/'+gender +'/'+$scope.collectionMarked+queryString;
			else if($scope.collectionMarked) 
				return 'products/collection'+'/'+gender+'/'+ $scope.collectionMarked+queryString;
			else if($stateParams.model)
				return $stateParams.model+'/'+gender+queryString;
			else
				return 'products/gender/'+gender+queryString;
		};

		$scope.updateModel = function(model){
			if(model){
				$location.path($scope.linkModel(model));
				ga('send', 'event', 'button', 'click', 'model');

			}
		};

		$scope.linkModel = function(model){
			var queryString = '';
			// $location.absUrl().split('?')[1];
			// queryString = (queryString)?'?'+queryString:'';
			if($scope.collectionMarked&&$stateParams.genderSlug)
				return model+'/'+$stateParams.genderSlug+'/'+$scope.collectionMarked+queryString;
			else if($scope.collectionMarked)
				return model+'/'+$scope.collectionMarked+queryString;
			else if($stateParams.genderSlug)
				return model+'/'+$stateParams.genderSlug+queryString;
			else 
				return model+queryString;
		};

		$scope.updateCollection = function(collection){
			if(collection){
				$location.path($scope.linkCollection(collection));
				ga('send', 'event', 'button', 'click', 'collection');

			}
		};

		$scope.linkCollection = function(collection){
			var queryString = '';
			// $location.absUrl().split('?')[1];
			// queryString = (queryString)?'?'+queryString:'';
			if($scope.modeloCamisaMarked&&$stateParams.genderSlug)
				return $scope.modeloCamisaMarked+'/'+$stateParams.genderSlug+'/'+collection+queryString;
			else if ($scope.modeloCamisaMarked)
				return $scope.modeloCamisaMarked+'/collection/'+collection+queryString;
			else if($stateParams.genderSlug)
				return 'products/collection/'+$stateParams.genderSlug+'/'+collection+queryString;
			else
				return 'products/collection/'+collection+queryString;
		};

		$scope.updateSize = function(size){
			if(size){
				$scope.sizesMarked = size;
				$scope.sizeMarkedStyle = {display:'block'};
				var object = $location.search();
				object.size = $scope.sizesMarked;
				$location.search(object);
				ga('send', 'event', 'button', 'click', 'size');
			    // $timeout(function(){
			    // 	$scope.updateVariables();
		    	// },100);

			}
			$scope.updateVariables();
		};

		$scope.updatePrice = function(priceValue){
			if(priceValue){
				$scope.priceMarked = priceValue;
				$scope.priceMarkedStyle = {display:'block'};
				var object = $location.search();
				object.price = $scope.priceMarked+'';
				$location.search(object);		
				ga('send', 'event', 'button', 'click', 'price');
			    // $scope.updateSelectOptions();
			}
			$scope.updateVariables();
			
		};
		$scope.updateColor = function(colorValue){
			if(colorValue){
				$scope.colorMarked = colorValue;
				$scope.colorMarkedStyle = {display:'block'};
				var object = $location.search();
				object.color = $scope.colorMarked+'';
				$location.search(object);		
				ga('send', 'event', 'button', 'click', 'color');
				// $scope.updateVariables();
			}
			$scope.updateVariables();
			
		};

		
		$scope.clickOrder = function(order){
			
			if($scope.sortMarked===order){
				if($scope.orderMarked===''||$scope.orderMarked==='desc')
					$scope.orderMarked = 'asc';
				else
					$scope.orderMarked = 'desc';
			}else{
				$scope.orderMarked = 'asc';
			}

			$scope.sortMarked = order;
			var object = $location.search();
			object.sort = $scope.sortMarked;
			object.order = $scope.orderMarked;
			$location.search(object);

		};
		
		$scope.clickSize = function(value){
			$scope.sizesMarked = value;
			$scope.sizeMarkedStyle = {display:'block'};
			var object = $location.search();
			object.size = $scope.sizesMarked;
			$location.search(object);
		};
		$scope.removeSize = function(){
			$scope.sizeMarkedStyle = {display:'none'};

			var object = $location.search();
			delete object.size;
			$location.search(object);

		};


		$scope.clickColor = function(value){
			$scope.colorMarked = value;
			$scope.colorMarkedStyle = {display:'block'};

			var object = $location.search();
			object.color = $scope.colorMarked;
			$location.search(object);
		};
		$scope.removeColor = function(){
			$scope.colorMarkedStyle = {display:'none'};

			var object = $location.search();
			delete object.color;
			$location.search(object);

		};

		$scope.clickPrice = function(value){
			$scope.priceMarked = value;
			$scope.priceMarkedStyle = {display:'block'};

			var object = $location.search();
			object.price = $scope.priceMarked;
			$location.search(object);
		};
		$scope.removePrice = function(){
			$scope.priceMarkedStyle = {display:'none'};

			var object = $location.search();
			delete object.price;
			$location.search(object);

		};
		$scope.clickCollection = function(value){
			$scope.collectionMarked = value;
			$scope.collectionMarkedStyle = {display:'block'};
			// var object = $location.search();
			// object.collection = $scope.collectionMarked;
			// $location.search(object);
		};
		$scope.removeCollection = function(){
			$scope.collectionMarkedStyle = {display:'none'};
			var path = $location.path();
			if($stateParams.genderSlug&&$stateParams.model){
				path = path.replace('/'+$stateParams.collectionSlug,'');
			}else if($stateParams.genderSlug){
				path = path.replace('collection','gender');
				path = path.replace('/'+$stateParams.collectionSlug,'');
			}else if($stateParams.model){
				path = path.replace('/collection','');
				path = path.replace('/'+$stateParams.collectionSlug,'');
			}else{
				path = path.replace('/collection','');
				path = path.replace('/'+$stateParams.collectionSlug,'');
			}
			$scope.collectionMarked = '';

			$location.path(path);

		};
		$scope.removeModel = function(){
			$scope.modeloCamisaMarkedStyle = {display:'none'};
			var path = $location.path();
			if($stateParams.genderSlug&&$stateParams.collectionSlug){
				path = path.replace('/'+$stateParams.model,'/products/collection');
			}else if($stateParams.collectionSlug){
				path = path.replace('/'+$stateParams.model,'/products');
			}else if($stateParams.genderSlug){
				path = path.replace('/'+$stateParams.model,'/products/gender');
			}else{
				path = path.replace('/'+$stateParams.model,'/products');
			}
			$scope.modeloCamisaMarked =  '';	

			$location.path(path);

		};
		$scope.clearFilter = function(){
			$location.search({});
		};

	}
]);
angular.module('products').directive('scrolly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            $(document).bind('scroll', function (event) {
                if (event.target.scrollingElement.scrollTop > raw.scrollHeight) {
                    scope.$apply(attrs.scrolly);
                }
            });
        }
    };
});


'use strict';

angular.module('products').controller('ProductsSearchController', ['$rootScope','$scope','$location','$timeout','$stateParams','ProductSearch',
	function($rootScope,$scope,$location,$timeout,$stateParams,ProductSearch) {
	    window.scrollTo(0, 0);
		$scope.$watch(function(){ return $location.search(); }, function(params){
		    console.log(params);
		    $scope.search();
		});

	 	$scope.search = function() {
			 	
			$scope.productsServer = ProductSearch.query($location.search());
			$scope.productsServer.$promise.then(function(response,error,progressback){

					if(response.productsOutOfStock){
						$scope.productsOutOfStock = response.productsOutOfStock;
					}
					if(response.productsForHome){
						$scope.productsForHome = response.productsForHome;
					}
					if(response.prodcutsAccessories){
						$scope.prodcutsAccessories = response.prodcutsAccessories;
					}
					if(response.productsInStock){
						$scope.productsInStock = response.productsInStock;
					}
			});

		};
		$scope.initProductsCarousel = function(id){
			$('#'+id).owlCarousel({

				loop:true,
			    margin:10,
			    responsiveClass:true,
			   	navigation : true,
				rewindNav:true,
				navigationText: [
			      '<i class="icon-chevron-left icon-white"><</i>',
			      '<i class="icon-chevron-right icon-white">></i>'
			      ],
			    responsive:{
			        0:{
			            items:1,
			            loop:true

			        },
			        600:{
			            items:3,
			            loop:true

			        },
			        1000:{
			            items:5,
			            loop:true
			        }
			    }

      		});
		};
	}
]);
'use strict';

angular.module('products').controller('ProductSingleController', ['$rootScope','$scope','$location','$timeout','$stateParams','Product',
	'ProductRelated','Collection','Size','Price','Color','Model','Order','ProductSearch','blockUI','Authentication','User','SendContact',
	function($rootScope,$scope,$location,$timeout,$stateParams,Product,ProductRelated,Collection,Size,Price,Color,Model,Order,ProductSearch,blockUI,Authentication,User,SendContact) {
		// Products controller logic
		//in controller that doesn't reload
	    window.scrollTo(0, 0);
		$scope.fullUrl = $location.absUrl();
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		// $scope.facebookAppId = facebookAppId;
		$scope.$on('$locationChangeSuccess',function(){
		  //update your scope based on new $routeParams

		  	if($location.path()===$scope.path)
		  		$scope.find();
		});
		$scope.product = {};
		$scope.productQuery = {};
		$scope.notStared = '<i class="fa fa-star-o"></i> Gostei!';
		$scope.stared = '<i class="fa fa-star"></i> Remover!';
		
		$scope.clickGArelacionados = function(slug){
			ga('send', 'event', 'relacionado', 'click', slug);
		};
		$scope.findOne = function() {

			$scope.product = Product.query({
				productSlug: $stateParams.productSlug
			});
		    //get 5 related items
		    $scope.relatedProducts = [];
		    $scope.product.$promise.then(function(product){
		    	if(product){
		  			ga('send', 'pageview', {
					  'page': product.slug,
					  'title': product.title
					});
					var queryObject = {};
					queryObject.quantity = 4;
					queryObject.productSlug = product.slug;
					ProductRelated.get(queryObject,function(data) {
	                	if(data.products){
	                		$scope.relatedProducts = data.products;
	                	}
	            	});
					
					$scope.inventories = {};
					if(product.inventories){
						if(product.inventories.length===1&&
							// product.inventories[0].genderSlug.toLowerCase()==='unisex'&&
							product.inventories[0].size.toLowerCase()==='unico'){
							$scope.unico=true;
							$scope.inventoryChecked.id = product.inventories[0]._id;
						}
						product.inventories.forEach(function(inventory){
							if(inventory!==null&&inventory!==undefined&&inventory._id!==undefined){
								if($.inArray(inventory.genderSlug,Object.keys($scope.inventories))<0){
									$scope.inventories[inventory.genderSlug+'-'+inventory.type] = [];
									$scope.inventories[inventory.genderSlug+'-'+inventory.type].push(inventory);
								}else{
									$scope.inventories[inventory.genderSlug+'-'+inventory.type].push(inventory);
								}
							}

						});
					}
		    	}

			},function(error){
				console.log('error '+ error);
				$location.path('/404');
			},function(progressback){
				console.log('progressback '+ progressback);
			});

		   	$scope.updateVariablesInSingleProductView();
			
		};

		$scope.like = function(productSlug){
			User.addWishList({productSlug:productSlug}).$promise.then(function(response){
				$scope.user = response;
				Authentication.user = response;
			},function(reason){
				console.log(reason);
			});
		};
		$scope.dislike = function(productSlug){
			User.removeWishList({productSlug:productSlug}).$promise.then(function(response){
				$scope.user = response;
				Authentication.user = response;
			},function(reason){
				console.log(reason);
			});
		};
		
		$scope.alreadyLiked = function(productSlug){
			if($scope.user&&$scope.user.wishList){
				return $scope.user.wishList.indexOf(productSlug)>=0;
			}else{
				return false;
			} 
		};
		$scope.loadEtalage = function(){
		 	$('#etalage').etalage({
				thumb_image_width: 300,
				thumb_image_height: 400,
				source_image_width: 900,
				source_image_height: 1200,
				show_hint: true,
				click_callback: function(image_anchor, instance_id){
					alert('Callback example:\nYou clicked on an image with the anchor: "'+image_anchor+'"\n(in Etalage instance: "'+instance_id+'")');
				}
			});
		};
		$scope.updateVariablesInSingleProductView = function(){
			$scope.inventoryChecked = {
		        id: ''
		      };
			$timeout(function(){
			 	$scope.loadEtalage();
			},1000);
		};

		$scope.initProductsCarousel = function(id){
			$('#'+id).owlCarousel({

				loop:true,
			    margin:10,
			    responsiveClass:true,
			   	navigation : true,
				rewindNav:true,
				navigationText: [
			      '<i class="icon-chevron-left icon-white"><</i>',
			      '<i class="icon-chevron-right icon-white">></i>'
			      ],
			    responsive:{
			        0:{
			            items:1,
			            loop:true

			        },
			        600:{
			            items:3,
			            loop:true

			        },
			        1000:{
			            items:5,
			            loop:true
			        }
			    }

      		});
		};

		$scope.cartAddItem = function(id){
			if(id){
				$scope.orderCall = Order.addItem({id:id});
				$scope.orderCall.$promise.then(function(response,error,progressback){
					// console.log(p);
					ga('send', 'event', 'button', 'click', id);

					if(response.order){
						$rootScope.order = response.order;
						$location.path('/cart');		
					}else if(error){
						$location.path('/products');		
					}


				});
			}
		};
		
		$scope.clickOrder = function(order){
			
			if($scope.sortMarked===order){
				if($scope.orderMarked===''||$scope.orderMarked==='desc')
					$scope.orderMarked = 'asc';
				else
					$scope.orderMarked = 'desc';
			}else{
				$scope.orderMarked = 'asc';
			}

			$scope.sortMarked = order;
			var object = $location.search();
			object.sort = $scope.sortMarked;
			object.order = $scope.orderMarked;
			$location.search(object);

		};

		$scope.sendPedido = function(email) {
  			if(!email)
				$scope.error = 'Preencha o Email!';
			var userContact = {};
			userContact.name = $scope.user.displayName||email;
			userContact.email = email;
			userContact.phone = '';
			userContact.subject = 'Pedido de camisa '+$scope.product.title;
			userContact.content = 'Pedido de reprint feito pelo email: '+email+'\n com produto '+$scope.product.title;
			if(!$scope.error){
				SendContact.send({userContact:userContact}).$promise.then(function(response,error,progressback){
  					$scope.success = response.message;
	  			},function(reason){
	  				$scope.error = reason.data.message;
	  			});
			}
	  	};
	}
]);
'use strict';

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('products').factory('Product', ['$resource',
	function($resource) {
		return $resource('api/products/:productSlug', {
			productSlug: '@productSlug'
			},{'query': {
						method: 'GET', 
						isArray: false,
						// interceptor: {
			   //              response: function (data) {
			   //                  console.log('response in interceptor', data);
			   //              },
			   //              responseError: function (data) {
			   //                  console.log('error in interceptor', data);
			   //              }
			   //          }
         		}
     		}
 		);
	}
]);
angular.module('products').factory('ProductSearch', ['$resource',
	function($resource) {
		return $resource('api/search/products/',{},{'query': {
						method: 'GET', 
						isArray: false}});
	}
]);
angular.module('products').factory('ProductRelated', ['$resource',
	function($resource) {
		return $resource('api/products/related/:productSlug', {
			productSlug: '@productSlug'
		});
	}
]);

angular.module('products').factory('Collection', ['$resource',
	function($resource) {
		return $resource('api/collections', {
		});
	}
]);

angular.module('products').factory('Order', ['$resource',
	function($resource) {
		return $resource('api/order/:action', {
			action: '@action'
			},{'removeItem': {
						method: 'POST', 
						isArray: false,
						params:{action:'removeItem'}
						
         		},'addItem': {
						method: 'POST', 
						isArray: false,
						params:{action:'updateOrderOrAddItem'}
         		}
     		}
 		);
	}
]);

angular.module('products').factory('Size', ['$resource',
	function($resource) {
		return $resource('api/products/availableSize/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);

// angular.module('products').factory('Inventory', ['$resource',
// 	function($resource) {
// 		return $resource('api/products/availableInventory/:productSlug', {
// 			productSlug: '@productSlug'
// 		});
// 	}
// ]);

angular.module('products').factory('Price', ['$resource',
	function($resource) {
		return $resource('api/products/availablePrice/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);
angular.module('products').factory('Color', ['$resource',
	function($resource) {
		return $resource('api/products/availableColor/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);
angular.module('products').factory('Model', ['$resource',
	function($resource) {
		return $resource('api/products/availableModel/:collectionSlug', {
			collectionSlug: '@collectionSlug'
		});
	}
]);