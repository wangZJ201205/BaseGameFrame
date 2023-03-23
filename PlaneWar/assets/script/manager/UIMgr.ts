
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMgr extends ParentMgr {

    static Instance : UIMgr;

    

    static getInstance()
    {
        return UIMgr.Instance;
    }

    onLoad () 
    {
        super.onLoad();
        UIMgr.Instance = this;
        console.info("load UIMgr");
    }

    start () {
        console.info("start UIMgr");
    }

    update (dt) 
    {

    }
}
