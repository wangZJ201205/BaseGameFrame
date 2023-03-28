
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
        console.info("load UIMgr222");
    }

    start () {
        console.info("start UIMgr222");
    }

    update (dt) 
    {

    }
}
