import ClientDef from "../common/ClientDef";
import EventName from "../common/EventName";
import GameData from "../common/GameData";
import UIName from "../common/UIName";
import Hero from "../ghost/Hero";
import DictMgr from "../manager/DictMgr";
import EventMgr from "../manager/EventMgr";
import GhostMgr from "../manager/GhostMgr";
import LoadMgr from "../manager/LoadMgr";
import SceneMgr from "../manager/SceneMgr";
import UIMgr from "../manager/UIMgr";
import GPMonster from "./GPMonster";
import GPMonsterTestCallMonster from "./GPMonsterTestCallMonster";
import GPMonsterTestFight from "./GPMonsterTestFight";

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
    private _gpMonsterFight : GPMonsterTestFight;
    private _gpMonsterCallMonster : GPMonsterTestCallMonster;
    private _tmxList : cc.TiledMap[];
    private _tileWidth : number = 72;
    private _tileHeight : number = 36;
    private _curCamera : cc.Camera;
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
        
        const mainCameraNode = cc.find('Canvas/Main Camera');
        this._curCamera = mainCameraNode.getComponent(cc.Camera);
        

        this.openUI();
        this.createEntity();

        this._timerID = setInterval(this.update.bind(this), 0);

        this.loadSceneSrc(GameData.Map_Current_Id);
    }

    getMonstersFight()
    {
        return this._gpMonsterFight;
    }

    clear()
    {

        clearInterval(this._timerID);

        this.layer.removeFromParent();
        this.layer = null;

        Hero.Instance.clear();
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + UIName.ROCKVIEW,null);
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + UIName.VIEW_PLAYER_PGB,null);
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + UIName.VIEW_ADVERTISEMENT,null);
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + UIName.VIEW_SELECTSKILL,null);
        
        if(GameData.IsDebug)
        {
            EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + UIName.TESTVIEW,null);
        }
    }
    
    update () 
    {
        if(GameData.Game_Mode == ClientDef.GAME_MODE_NORMAL)
        {
            this._gpMonster.update();
        }
        else if(GameData.Game_Mode == ClientDef.GAME_MODE_TEST_FIGHT)
        {
            this._gpMonsterFight.update();
        }
        else if(GameData.Game_Mode == ClientDef.GAME_MODE_TEST_CALL_MONSTER)
        {
            this._gpMonsterCallMonster.update();
        }

        this.refreshScenePos();
    }

    //打开所有的界面
    openUI()
    {
        UIMgr.Instance.openUI(UIName.ROCKVIEW);
        UIMgr.Instance.openUI(UIName.VIEW_PLAYER_PGB);
        UIMgr.Instance.openUI(UIName.VIEW_ADVERTISEMENT);
        if(GameData.IsDebug)
        {
            UIMgr.Instance.openUI(UIName.TESTVIEW);
        }
    }

    //创建角色
    createEntity()
    {
        var player = GhostMgr.Instance.spawnEntity(GameData.Hero_Current_ID);
        player.restart();
        Hero.Instance.setEntity(player);
        Hero.Instance.start();

        this._gpMonster = new GPMonster();
        this._gpMonster.onLoad();
        this._gpMonster.start();

        this._gpMonsterFight = new GPMonsterTestFight();
        this._gpMonsterFight.onLoad();
        this._gpMonsterFight.start();

        this._gpMonsterCallMonster = new GPMonsterTestCallMonster();
        this._gpMonsterCallMonster.onLoad();
        this._gpMonsterCallMonster.start();
    }

    //实时检测人物的位置
    refreshScenePos()
    {
        var hero = Hero.Instance.getEntity();
        if(!hero)return;
        var heroPos = hero.position;
        if( heroPos.x != this._heroPos.x || heroPos.y != this._heroPos.y )
        {
            // var offsetx = heroPos.x - this._heroPos.x;
            // var offsety = heroPos.y - this._heroPos.y;
            // SceneMgr.Instance.getLayer().setPosition(
            //     SceneMgr.Instance.getLayer().position.x - offsetx,
            //     SceneMgr.Instance.getLayer().position.y - offsety);
            // var camerPos = this._curCamera.node.position; //移动相机和移动地图区别在于做粒子特效的时候回抖动
            this._curCamera.node.setPosition(heroPos);
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
