/**
 * 场景
 */
import ItemMgr from "./ItemMgr";
import ClientDef from "../common/ClientDef";
import GamePlay from "../gameplay/GamePlay";
import Hero from "../ghost/Hero";
import GhostMgr from "./GhostMgr";
import LabelMgr from "./LabelMgr";
import ParentMgr from "./ParentMgr";
import SkillMgr from "./SkillMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneMgr extends ParentMgr {

    public static readonly Instance : SceneMgr = new SceneMgr();
    layer: cc.Node = null; //显示层
    
    skillLayer : cc.Node = null

    getLayer()
    {
        return this.layer;
    }

    onLoad () 
    {
        super.onLoad();
        console.info("load SceneMgr");
        
        
        GhostMgr.Instance.onLoad();
        LabelMgr.Instance.onLoad();
        GamePlay.Instance.onLoad();
        ItemMgr.Instance.onLoad();
        SkillMgr.Instance.onLoad();

    }

    start() {
        console.info("start SceneMgr");

        var canvas = cc.director.getScene().getChildByName('Canvas');
        this.layer = new cc.Node();
        this.layer.zIndex = ClientDef.GAME_INDEX_SCENE;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = canvas;

        GhostMgr.Instance.start();
        LabelMgr.Instance.start();
        ItemMgr.Instance.start();
        SkillMgr.Instance.start();
        
    }

    update () 
    {
        GamePlay.Instance.update();
        
    }

    enterScene()
    {
        GamePlay.Instance.start();

    }


}
