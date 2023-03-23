//消息中心

import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NotifyMgr extends ParentMgr {

    static Instance : NotifyMgr;

    static getInstance()
    {   
        let mgr : NotifyMgr = NotifyMgr.Instance;
        if( !NotifyMgr.Instance )
        {
            mgr = new NotifyMgr();
        }
        console.info("getInstance NotifyMgr");
        return mgr;
    }

    start () {

    }

    // update (dt) {}
}
