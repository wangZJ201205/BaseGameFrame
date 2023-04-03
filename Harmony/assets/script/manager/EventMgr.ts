//消息中心

import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EventMgr extends ParentMgr {

    public static readonly Instance : EventMgr = new EventMgr();

    private _event_target : cc.EventTarget = new cc.EventTarget();

    start () {

    }

    On(event_type, event_callback, event_target) {
        this._event_target && this._event_target.on(event_type, event_callback, event_target);
    }

    /*====================================================================================================
    /
    /====================================================================================================*/
    Off(event_type, event_callback, event_target) {
        if (!event_type || !event_callback || !event_target) {
            cc.error("XFEvnet method off error. check your params...");
        }
        this._event_target && this._event_target.off(event_type, event_callback, event_target);
    }

    /*====================================================================================================
    /
    /====================================================================================================*/
    OffByType(event_type) {
        this._event_target && this._event_target.off(event_type);
    }

    /*====================================================================================================
    /
    /====================================================================================================*/
    OffByTarget(event_target) {
        this._event_target && this._event_target.targetOff(event_target);
    }

    /*====================================================================================================
    /
    /====================================================================================================*/
    Once(event_type, event_callback, event_target) {
        this._event_target && this._event_target.once(event_type, event_callback, event_target);
    }

    /*====================================================================================================
    /*(p1, p2, p3, p4, p5) => { }
    /====================================================================================================*/
    Emit(event_type, p1) {
        this._event_target && this._event_target.emit(event_type, p1);
    }

    /*====================================================================================================
    /*(event) => { }
    /====================================================================================================*/    
    EmitEvent(event_type, user_obj) {
        let event = new cc.Event.EventCustom(event_type,false);
        event.setUserData(user_obj)
        this._event_target && this._event_target.dispatchEvent(event)
    }

    /*====================================================================================================
    /*_event_target 检查事件目标对象是否有为特定类型的事件注册的回调。
    /====================================================================================================*/
    hasEventListener(event_type)
    {
        return this._event_target.hasEventListener(event_type);
    }


    // update (dt) {}
}
