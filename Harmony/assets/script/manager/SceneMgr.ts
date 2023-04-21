/**
 * 场景
 */
import ClientDef from "../common/ClientDef";
import UIName from "../common/UIName";
import CommonGamePlay from "../gameplay/CommonGamePlay";
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
    gameplay : CommonGamePlay;
    _timerID: number;

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

        this._timerID = setInterval(this.update.bind(this), 0);
    }

    update () 
    {
        const delta = cc.director.getDeltaTime();
        if(this.gameplay)
        {
            this.gameplay.update(delta);
        }
    }

    enterScene(sceneid)
    {
        console.info(">>>>>>进入场景："+ sceneid);
        this.loadSceneSrc(sceneid);

        UIMgr.Instance.openUI(UIName.ROCKVIEW);
        UIMgr.Instance.openUI(UIName.TESTVIEW);

        var player = GhostMgr.Instance.spawnEntity(ClientDef.ENTITY_TYPE_PLAYER);
        player.setClientProp(ClientDef.ENTITY_PROP_STATICID,"100001");
        player.start();
        Hero.Instance.setEntity(player);
        

        this.gameplay = new CommonGamePlay();
        this.gameplay.onLoad();
        this.gameplay.start();
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
