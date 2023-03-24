
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GhostMgr extends ParentMgr {

    static Instance : GhostMgr;

    static getInstance()
    {
        return GhostMgr.Instance;
    }

    onLoad () 
    {
        super.onLoad();
        GhostMgr.Instance = this;
        console.info("load GhostMgr");
    }

    start () {
        console.info("start GhostMgr");
    }

    // update (dt) {}
}
