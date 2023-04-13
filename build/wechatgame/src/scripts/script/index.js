window.__require=function t(e,o,n){function r(i,a){if(!o[i]){if(!e[i]){var s=i.split("/");if(s=s[s.length-1],!e[s]){var p="function"==typeof __require&&__require;if(!a&&p)return p(s,!0);if(c)return c(s,!0);throw new Error("Cannot find module '"+i+"'")}i=s}var f=o[i]={exports:{}};e[i][0].call(f.exports,function(t){return r(e[i][1][t]||t)},f,f.exports,t,e,o,n)}return o[i].exports}for(var c="function"==typeof __require&&__require,i=0;i<n.length;i++)r(n[i]);return r}({Definition:[function(t,e){"use strict";cc._RF.push(e,"7834aL9kQpK1afH3++uIHwz","Definition"),cc._RF.pop()},{}],EventMgr:[function(t,e,o){"use strict";cc._RF.push(e,"2c36d98qrtBTraBoth19DJf","EventMgr");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=t("./ParentMgr"),a=cc._decorator,s=a.ccclass,p=(a.property,function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._event_target=new cc.EventTarget,e}var o;return r(e,t),o=e,e.prototype.start=function(){},e.prototype.On=function(t,e,o){this._event_target&&this._event_target.on(t,e,o)},e.prototype.Off=function(t,e,o){t&&e&&o||cc.error("XFEvnet method off error. check your params..."),this._event_target&&this._event_target.off(t,e,o)},e.prototype.OffByType=function(t){this._event_target&&this._event_target.off(t)},e.prototype.OffByTarget=function(t){this._event_target&&this._event_target.targetOff(t)},e.prototype.Once=function(t,e,o){this._event_target&&this._event_target.once(t,e,o)},e.prototype.Emit=function(t,e){this._event_target&&this._event_target.emit(t,e)},e.prototype.EmitEvent=function(t,e){var o=new cc.Event.EventCustom(t,!1);o.setUserData(e),this._event_target&&this._event_target.dispatchEvent(o)},e.prototype.hasEventListener=function(t){return this._event_target.hasEventListener(t)},e.Instance=new o,c([s],e)}(i.default));o.default=p,cc._RF.pop()},{"./ParentMgr":"ParentMgr"}],EventName:[function(t,e,o){"use strict";cc._RF.push(e,"c698ekoLdVKF7g22YC6vvKG","EventName"),Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function t(){}return t.UI_OPEN_PANEL="UI_OPEN_PANEL",t.UI_LOGIN="UI_LOGIN",t}();o.default=n,cc._RF.pop()},{}],GameStart:[function(t,e,o){"use strict";cc._RF.push(e,"fca0ar+eWJAsp7CA1wMGH0k","GameStart");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=t("./common/EventName"),a=t("./config/UIConfig"),s=t("./manager/EventMgr"),p=t("./manager/NetMgr"),f=cc._decorator,u=f.ccclass,l=(f.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.onLoad=function(){},e.prototype.start=function(){console.info("Harmony GameStart"),a.default.init(),s.default.Instance.start(),p.default.Instance.start(),s.default.Instance.Emit(i.default.UI_OPEN_PANEL,{name:i.default.UI_LOGIN})},e.prototype.update=function(t){p.default.Instance.update(t)},c([u],e)}(cc.Component));o.default=l,cc._RF.pop()},{"./common/EventName":"EventName","./config/UIConfig":"UIConfig","./manager/EventMgr":"EventMgr","./manager/NetMgr":"NetMgr"}],GhostMgr:[function(t,e,o){"use strict";cc._RF.push(e,"ca939Xg8otDsp1LYVLLl+cR","GhostMgr");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=t("./ParentMgr"),a=cc._decorator,s=a.ccclass,p=(a.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}var o;return r(e,t),o=e,e.getInstance=function(){return o.Instance},e.prototype.onLoad=function(){t.prototype.onLoad.call(this),o.Instance=this,console.info("load GhostMgr")},e.prototype.start=function(){console.info("start GhostMgr")},o=c([s],e)}(i.default));o.default=p,cc._RF.pop()},{"./ParentMgr":"ParentMgr"}],LoadMgr:[function(t,e,o){"use strict";cc._RF.push(e,"863c5vBRzVEharQcJryxHVK","LoadMgr");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=t("./ParentMgr"),a=cc._decorator,s=a.ccclass,p=(a.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}var o;return r(e,t),o=e,e.prototype.LoadAsset=function(t,e){cc.assetManager.loadBundle(t,function(o,n){o?cc.error("LoadAsset failed ... and path = "+t):n.load(t,function(o,n){o?cc.error("LoadAsset failed ... and path = "+t):e&&e(n)})})},e.Instance=new o,c([s],e)}(i.default));o.default=p,cc._RF.pop()},{"./ParentMgr":"ParentMgr"}],LoginView:[function(t,e,o){"use strict";cc._RF.push(e,"e3ef4eC1WxNK425E8+UMOMK","LoginView");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,s=i.property,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.accountEB=null,e.passwordEB=null,e.startButton=null,e}return r(e,t),e.prototype.start=function(){},c([s(cc.EditBox)],e.prototype,"accountEB",void 0),c([s(cc.EditBox)],e.prototype,"passwordEB",void 0),c([s(cc.Button)],e.prototype,"startButton",void 0),c([a],e)}(cc.Component);o.default=p,cc._RF.pop()},{}],MessageDefine:[function(t,e,o){"use strict";cc._RF.push(e,"a7f62XYcZhF7aGIECyKoonv","MessageDefine"),Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function t(){}return t.PING="game_ping",t.PONG="game_pong",t.BUILD_CONNECTION="buildConnecting",t.DISCONNECTION="disconnect",t}();o.default=n,cc._RF.pop()},{}],NetMgr:[function(t,e,o){"use strict";cc._RF.push(e,"563c4GGVrRKtKC/KsqXUVRj","NetMgr");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=t("../common/MessageDefine"),a=t("./ParentMgr"),s=cc._decorator,p=s.ccclass,f=(s.property,function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.socket=null,e.connectState=!1,e.isPinging=!1,e.lastRecieveTime=0,e.delayMS=0,e.lastSendTime=0,e.delayTime=0,e}var o;return r(e,t),o=e,e.prototype.start=function(){var t=this;this.delayTime=0,this.socket=io.connect("http://localhost:9000",{reconnection:!1,"force new connection":!0,transports:["websocket","polling"]}),this.socket.on(i.default.BUILD_CONNECTION,function(e){console.info(e),t.connectState=!0,t.startHearBeat()}),this.socket.on(i.default.DISCONNECTION,function(){console.log("disconnect"),t.connectState=!1})},e.prototype.startHearBeat=function(){var t=this;this.socket.on(i.default.PONG,function(){t.lastRecieveTime=Date.now(),t.delayMS=t.lastRecieveTime-t.lastSendTime}),this.lastRecieveTime=Date.now(),this.isPinging||(this.isPinging=!0,cc.game.on(cc.game.EVENT_HIDE,function(){t.ping()}),setInterval(function(){t.socket&&t.ping()},2e3),setInterval(function(){t.socket&&Date.now()-t.lastRecieveTime>1e4&&t.close()},500))},e.prototype.ping=function(){this.socket&&(this.lastSendTime=Date.now(),this.socket.emit(i.default.PING,{}))},e.prototype.close=function(){console.log("close"),this.delayMS=0,this.socket&&this.connectState&&(this.connectState=!1,this.socket.disconnect()),this.socket=null},e.prototype.update=function(t){this.connectState||(this.delayTime+=t),!this.connectState&&this.delayTime>5&&this.start()},e.prototype.send=function(t,e){this.socket&&this.socket.emit(t,e)},e.Instance=new o,c([p],e)}(a.default));o.default=f,cc._RF.pop()},{"../common/MessageDefine":"MessageDefine","./ParentMgr":"ParentMgr"}],ParentMgr:[function(t,e,o){"use strict";cc._RF.push(e,"f81c62OcHBAZ6cgZnyj2mc3","ParentMgr");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,s=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.onLoad=function(){this.register()},e.prototype.start=function(){},e.prototype.register=function(){},c([a],e)}(cc.Component));o.default=s,cc._RF.pop()},{}],SceneMgr:[function(t,e,o){"use strict";cc._RF.push(e,"b54f9XTkiBLuYnEAgt7Ns7H","SceneMgr");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=t("./ParentMgr"),a=cc._decorator,s=a.ccclass,p=(a.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}var o;return r(e,t),o=e,e.getInstance=function(){return o.Instance},e.prototype.onLoad=function(){t.prototype.onLoad.call(this),o.Instance=this,console.info("load SceneMgr")},e.prototype.start=function(){console.info("start SceneMgr")},o=c([s],e)}(i.default));o.default=p,cc._RF.pop()},{"./ParentMgr":"ParentMgr"}],Test:[function(t,e,o){"use strict";cc._RF.push(e,"9890eH0gvxI9bCdUNBUtNqT","Test");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,a=i.ccclass,s=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.start=function(){var t=this;cc.resources.load("test/123",cc.SpriteFrame,function(e,o){t.getComponent(cc.Sprite).spriteFrame=o})},c([a],e)}(cc.Component));o.default=s,cc._RF.pop()},{}],UIConfig:[function(t,e,o){"use strict";cc._RF.push(e,"61dcdd1PTtL2YtQl5tAq+7m","UIConfig"),Object.defineProperty(o,"__esModule",{value:!0});var n=t("../common/EventName"),r=function(){function t(){}return t.init=function(){this.UIReg={},this.UIReg[n.default.UI_LOGIN]={path:this.PreGame+"LoginPref"}},t.getUIPath=function(t){return this.UIReg[t]?this.UIReg[t]:null},t.PreGame="ui/mainUI/",t}();o.default=r,cc._RF.pop()},{"../common/EventName":"EventName"}],UIMgr:[function(t,e,o){"use strict";cc._RF.push(e,"69675OWmKdOU6cLhAi5XCvN","UIMgr");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),c=this&&this.__decorate||function(t,e,o,n){var r,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,o,n);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(i=(c<3?r(i):c>3?r(e,o,i):r(e,o))||i);return c>3&&i&&Object.defineProperty(e,o,i),i};Object.defineProperty(o,"__esModule",{value:!0});var i=t("../common/EventName"),a=t("../config/UIConfig"),s=t("./EventMgr"),p=t("./LoadMgr"),f=t("./ParentMgr"),u=cc._decorator,l=u.ccclass,_=u.property,y=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.uiCamera=null,e.uiLayer=null,e}return r(e,t),e.prototype.onLoad=function(){t.prototype.onLoad.call(this),console.info("load UIMgr222")},e.prototype.start=function(){console.info("start UIMgr222")},e.prototype.update=function(){},e.prototype.register=function(){s.default.Instance.On(i.default.UI_OPEN_PANEL,this.openUI,this)},e.prototype.openUI=function(t){var e=this,o=t.name,n=a.default.getUIPath(o);n?(console.info(">>>>>>open uiname:"+o+" | uipath:"+n.path),p.default.Instance.LoadAsset(n.path,function(t){console.info("\u8d44\u6e90\u52a0\u8f7d\u5b8c\u6210\uff01"+o),cc.instantiate(t).parent=e.uiLayer})):console.error("\u6ca1\u6709\u6ce8\u518c\u6b64\u754c\u9762\u8d44\u6e90\u8def\u5f84"+o+",\u5148\u6ce8\u518c\u6b64\u754c\u9762\u8def\u5f84\uff01")},c([_(cc.Camera)],e.prototype,"uiCamera",void 0),c([_(cc.Node)],e.prototype,"uiLayer",void 0),c([l],e)}(f.default);o.default=y,cc._RF.pop()},{"../common/EventName":"EventName","../config/UIConfig":"UIConfig","./EventMgr":"EventMgr","./LoadMgr":"LoadMgr","./ParentMgr":"ParentMgr"}]},{},["GameStart","Definition","EventName","MessageDefine","UIConfig","EventMgr","GhostMgr","LoadMgr","NetMgr","ParentMgr","SceneMgr","UIMgr","Test","LoginView"]);