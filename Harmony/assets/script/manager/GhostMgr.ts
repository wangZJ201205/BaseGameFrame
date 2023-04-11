/**
 * 对象管理
 */
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GhostMgr extends ParentMgr {

    public static readonly Instance : GhostMgr = new GhostMgr();

    layer: cc.Node = null; //ui显示层
    entitys:[];

    static getInstance()
    {
        return GhostMgr.Instance;
    }

    onLoad () 
    {
        super.onLoad();
        this.entitys = [];
        console.info("load GhostMgr");
    }

    start () {
        console.info("start GhostMgr");

        var canvas = cc.director.getScene().getChildByName('Canvas');
        this.layer = new cc.Node();
        this.layer.zIndex = 300;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = canvas;

        this.layer.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(this.update, this))));
    }

    update (dt) {

    }





}
