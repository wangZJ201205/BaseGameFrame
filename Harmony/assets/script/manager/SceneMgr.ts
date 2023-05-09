/**
 * 场景
 */
import ClientDef from "../common/ClientDef";
import UIName from "../common/UIName";
import CommonGamePlay from "../gameplay/CommonGamePlay";
import Hero from "../ghost/Hero";
import DictMgr from "./DictMgr";
import GhostMgr from "./GhostMgr";
import LabelMgr from "./LabelMgr";
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

    _posx:number;
    _posy:number;

    static getInstance()
    {
        return SceneMgr.Instance;
    }

    onLoad () 
    {
        super.onLoad();
        console.info("load SceneMgr");
        
        GhostMgr.Instance.onLoad();
        LabelMgr.Instance.onLoad();

        this._posx = 0;
        this._posy = 0;
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

        this._timerID = setInterval(this.update.bind(this), 0);
    }

    update () 
    {
        const delta = cc.director.getDeltaTime();
        if(this.gameplay)
        {
            this.gameplay.update(delta);
        }

        var hero = Hero.Instance.getEntity();
        if(!hero)return;
        var heroPos = hero.position;
        if( heroPos.x != this._posx || heroPos.y != this._posy )
        {
            var offsetx = heroPos.x - this._posx;
            var offsety = heroPos.y - this._posy;
            this.layer.setPosition(this.layer.position.x - offsetx,
                this.layer.position.y - offsety);
                this._posx = heroPos.x;
                this._posy = heroPos.y;
        }

    }

    enterScene(sceneid)
    {
        console.info(">>>>>>进入场景："+ sceneid);
        this.loadSceneSrc(sceneid);

        UIMgr.Instance.openUI(UIName.ROCKVIEW);
        UIMgr.Instance.openUI(UIName.TESTVIEW);

        var player = GhostMgr.Instance.spawnEntity(100001);
        player.restart();
        Hero.Instance.setEntity(player);
        Hero.Instance.start();

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
            var ground = tilemap.getLayer("ground");
            let tileGid = 1;
            let x = 7, y = 7;
            ground.addTileByGid(tileGid, cc.v2(x, y));
        });

    }

    getLayer()
    {
        return this.layer;
    }

    

}
