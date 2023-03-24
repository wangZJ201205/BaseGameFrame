
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneMgr extends ParentMgr {

    static Instance : SceneMgr;

    static getInstance()
    {
        return SceneMgr.Instance;
    }

    onLoad () 
    {
        super.onLoad();
        SceneMgr.Instance = this;
        console.info("load SceneMgr");
    }

    start () {

    }

    // update (dt) {}
}
