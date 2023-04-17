/**
 * 场景
 */
import ClientDef from "../common/ClientDef";
import UIName from "../common/UIName";
import Hero from "../ghost/Hero";
import DictMgr from "./DictMgr";
import GhostMgr from "./GhostMgr";
import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";
import UIMgr from "./UIMgr";

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
        this.layer.zIndex = ClientDef.GAME_INDEX_SCENE;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = canvas;

        this.layer.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1),cc.callFunc(this.update, this))));


    }

    update (dt) {

    }

    enterScene(sceneid)
    {
        console.info(">>>>>>进入场景："+ sceneid);
        this.loadSceneSrc(sceneid);

        UIMgr.Instance.openUI(UIName.ROCKVIEW);

        var player = GhostMgr.Instance.spawnEntity(ClientDef.ENTITY_TYPE_PLAYER);
        Hero.Instance.setEntity(player);

    }

    loadSceneSrc(sceneid)
    {

        //显示场景
        var sceneInfo = DictMgr.Instance.getDictByName("map_data");
        LoadMgr.Instance.LoadAsset(sceneInfo[sceneid].path,(asset)=>{
            var tilemap : cc.TiledMap = this.layer.addComponent(cc.TiledMap);
            tilemap.tmxAsset = asset;
        });

    }


}
