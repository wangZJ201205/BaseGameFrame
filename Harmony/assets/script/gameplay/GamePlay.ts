import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import UIName from "../common/UIName";
import Hero from "../ghost/Hero";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";
import LoadMgr from "../manager/LoadMgr";
import SceneMgr from "../manager/SceneMgr";
import UIMgr from "../manager/UIMgr";
import GPMonster from "./GPMonster";

/**
 * 游戏玩法管理
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlay {

    public static readonly Instance : GamePlay = new GamePlay();
    private layer : cc.Node;

    private _timerID: number;

    private _heroPos:cc.Vec3;  //人物的之前的位置

    private _gpMonster : GPMonster;
    private _tmxList : cc.TiledMap[];
    private _tileWidth : number = 72;
    private _tileHeight : number = 36;
    onLoad () 
    {
        this._heroPos = cc.Vec3.ZERO;
    }

    start () 
    {
        this._tmxList = [];

        this.layer = new cc.Node();
        this.layer.zIndex = ClientDef.SCENE_INDEX_GAMEPLAY;
        this.layer.parent = SceneMgr.Instance.getLayer();

        UIMgr.Instance.openUI(UIName.ROCKVIEW);
        UIMgr.Instance.openUI(UIName.PLAYER_PGB_VIEW);
        if(GameData.IsDebug)
        {
            UIMgr.Instance.openUI(UIName.TESTVIEW);
        }
        
        var player = GhostMgr.Instance.spawnEntity(100001);
        player.restart();
        Hero.Instance.setEntity(player);
        Hero.Instance.start();

        this._gpMonster = new GPMonster();
        this._gpMonster.onLoad();
        this._gpMonster.start();

        this._timerID = setInterval(this.update.bind(this), 0);

        this.loadSceneSrc(GameData.Map_Current_Id);
    }
    
    update () 
    {
        this._gpMonster.update();
        this.refreshScenePos();
    }

    //实时检测人物的位置
    refreshScenePos()
    {
        var hero = Hero.Instance.getEntity();
        if(!hero)return;
        var heroPos = hero.position;
        if( heroPos.x != this._heroPos.x || heroPos.y != this._heroPos.y )
        {
            var offsetx = heroPos.x - this._heroPos.x;
            var offsety = heroPos.y - this._heroPos.y;
            SceneMgr.Instance.getLayer().setPosition(
                SceneMgr.Instance.getLayer().position.x - offsetx,
                SceneMgr.Instance.getLayer().position.y - offsety);
            this._heroPos.x = heroPos.x;
            this._heroPos.y = heroPos.y;
            this.adjustScenePos();
        }
        
    }

    adjustScenePos() {
        const heroPos = cc.Vec2.ZERO;
        heroPos.x = Hero.Instance.getEntity().position.x;
        heroPos.y = Hero.Instance.getEntity().position.y;
        let regionIndex = -1;
        let left = 0, right = 0, bottom = 0, top = 0;

        //判断所在的区域
        for (let i = 0; i < this._tmxList.length; i++) {
            const tileMap = this._tmxList[i];
            const { width: mapWidth, height: mapHeight } = tileMap.node.getContentSize();
            const { x: mapX, y: mapY } = tileMap.node.position;
            const tileSize = tileMap.getTileSize();
            const mapSize = tileMap.getMapSize();
    
            const region = cc.rect(mapX, mapY, mapWidth, mapHeight);
            if (region.contains(heroPos)) {
                regionIndex = i;
                left = Math.abs(heroPos.x - mapX);
                right = Math.abs(mapWidth);
                bottom = Math.abs(heroPos.y - mapY);
                top = Math.abs(mapHeight);
                break;
            }
        }
        
        //如果不在任何区域中，重置地块位置
        if (regionIndex == -1) {
            for (let index = 0; index < this._tmxList.length; index++) {
                var tilemap : cc.TiledMap = this._tmxList[index];
                var x = -(index%2)*tilemap.getMapSize().width * this._tileWidth + heroPos.x;
                var y = -Math.floor(index/2)*tilemap.getMapSize().height * this._tileHeight + heroPos.y;
                tilemap.node.setPosition(x,y);
            }
            return;
        }
    
        //移动地块
        //   3  | 4
        //-------------
        //   1  | 2
        const currReg = this._tmxList[regionIndex];
        let xDir = 0, yDir = 0;
        if (left <= right / 2 && bottom <= top / 2) {
            xDir = -1;
            yDir = -1;
        } else if (left <= right && bottom <= top / 2) {
            xDir = 1;
            yDir = -1;
        } else if (left <= right / 2 && bottom <= top) {
            xDir = -1;
            yDir = 1;
        } else if (left <= right && bottom <= top) {
            xDir = 1;
            yDir = 1;
        }

        const region = {
            x: currReg.node.width ,
            y: currReg.node.height ,
            xDir,
            yDir,
        };

        for (let index = 0; index < this._tmxList.length; index++) {
            const tiled = this._tmxList[index];
            if (index == regionIndex) continue;
            if (currReg.node.x == tiled.node.x) {
                tiled.node.y = currReg.node.y + region.y * region.yDir;
            } else if (currReg.node.y == tiled.node.y) {
                tiled.node.x = currReg.node.x + region.x * region.xDir;
            } else {
                tiled.node.y = currReg.node.y + region.y * region.yDir;
                tiled.node.x = currReg.node.x + region.x * region.xDir;
            }
        }
    }


    loadSceneSrc(sceneid)
    {

        //显示场景
        var sceneInfo = DictMgr.Instance.getDictByName("map_data");
        LoadMgr.Instance.LoadAsset(sceneInfo[sceneid].path,(asset)=>{
            for (let index = 0; index < 4; index++) {
                var node:cc.Node = new cc.Node();
                this.layer.addChild(node);
                var tilemap : cc.TiledMap = node.addComponent(cc.TiledMap);
                tilemap.tmxAsset = asset;
                tilemap.node.setAnchorPoint(0,0);
                var x = -(index%2)*tilemap.getMapSize().width * this._tileWidth;
                var y = -Math.floor(index/2)*tilemap.getMapSize().height * this._tileHeight;
                tilemap.node.setPosition(x,y);
                
                this._tmxList.push(tilemap);
            }
        });
    }

}
