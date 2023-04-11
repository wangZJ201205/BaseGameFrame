/**
 * 场景
 */
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneMgr extends ParentMgr {

    public static readonly Instance : SceneMgr = new SceneMgr();
    layer: cc.Node = null; //显示层

    static getInstance()
    {
        return SceneMgr.Instance;
    }

    onLoad () 
    {
        super.onLoad();
        console.info("load SceneMgr");
    }

    start() {
        console.info("start SceneMgr");

        var canvas = cc.director.getScene().getChildByName('Canvas');
        this.layer = new cc.Node();
        this.layer.zIndex = 1;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = canvas;

        this.layer.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(this.update, this))));

        
    }

    update (dt) {

    }


}
