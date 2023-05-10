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

    private _hero_old_posx:number;  //人物的之前的位置
    private _hero_old_posy:number;

    private _gpMonster : GPMonster;
    private _tmxList : cc.TiledMap[];
    onLoad () 
    {
        this._hero_old_posx = 0;
        this._hero_old_posy = 0;
    }

    start () 
    {
        this._tmxList = [];

        this.layer = new cc.Node();
        this.layer.zIndex = ClientDef.SCENE_INDEX_GAMEPLAY;
        this.layer.parent = SceneMgr.Instance.getLayer();

        UIMgr.Instance.openUI(UIName.ROCKVIEW);
        UIMgr.Instance.openUI(UIName.TESTVIEW);

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
        this.adjustScenePos();
        this._gpMonster.update();
    }

    //实时检测人物的位置
    refreshScenePos()
    {
        // var hero = Hero.Instance.getEntity();
        // if(!hero)return;
        // var heroPos = hero.position;
        // if( heroPos.x != this._hero_old_posx || heroPos.y != this._hero_old_posy )
        // {
        //     var offsetx = heroPos.x - this._hero_old_posx;
        //     var offsety = heroPos.y - this._hero_old_posy;
        //     SceneMgr.Instance.getLayer().setPosition(SceneMgr.Instance.getLayer().position.x - offsetx,
        //         SceneMgr.Instance.getLayer().position.y - offsety);
        //         this._hero_old_posx = heroPos.x;
        //         this._hero_old_posy = heroPos.y;
        // }
        this.adjustScenePos();
    }

    adjustScenePos() {
        // 获取人物的位置
        const heroPos = cc.Vec2.ZERO;
        heroPos.x = Hero.Instance.getEntity().position.x;
        heroPos.y = Hero.Instance.getEntity().position.y;
        // 计算人物所在的区域和距离
        let regionIndex = -1;
        let left = 0, right = 0, bottom = 0, top = 0;
        for (let i = 0; i < this._tmxList.length; i++) {
            const tileMap = this._tmxList[i];
            const tileSize = tileMap.getTileSize();
            const mapSize = tileMap.getMapSize();
            const layerSize = tileMap.node.getContentSize();

            const region = cc.rect(
                tileMap.node.position.x,
                tileMap.node.position.y,
                layerSize.width,
                layerSize.height
            );
            if (region.contains(heroPos)) {
                regionIndex = i;
                left = heroPos.x - region.x;
                right = region.x + layerSize.width - heroPos.x;
                bottom = heroPos.y - region.y;
                top = region.y + layerSize.height - heroPos.y;
                break;
            }
        }

        // 如果人物不在任何一个区域，直接返回
        if (regionIndex == -1) {
            return;
        }

        // 计算地图需要滚动的距离
        const offset = cc.Vec2.ZERO;
        if (left < 100) {
            offset.x = -(100 - left);
        }
        else if (right < 100) {
            offset.x = (100 - right);
        }
        if (bottom < 100) {
            offset.y = -(100 - bottom);
        }
        else if (top < 100) {
            offset.y = (100 - top);
        }

        // 调整地图位置
        for (let i = 0; i < this._tmxList.length; i++) {
            const tileMap = this._tmxList[i];

            // 如果不是当前区域，直接跳过
            if (i != regionIndex) {
                continue;
            }

            // 向左滚动地图
            if (offset.x < 0 && tileMap.node.x < 0) {
                const dx = Math.max(offset.x, tileMap.node.x);
                tileMap.node.x += dx;
                offset.x -= dx;
            }

            // 向右滚动地图
            if (offset.x > 0 && tileMap.node.x > -(tileMap.node.width - 1280)) {
                const dx = Math.min(offset.x, tileMap.node.x + tileMap.node.width - 1280);
                tileMap.node.x -= dx;
                offset.x -= dx;
            }

            // 向下滚动地图
            if (offset.y < 0 && tileMap.node.y < 0) {
                const dy = Math.max(offset.y, tileMap.node.y);
                tileMap.node.y += dy;
                offset.y -= dy;
            }

            // 向上滚动地图
            if (offset.y > 0 && tileMap.node.y > -(tileMap.node.height - 640)) {
                const dy = Math.min(offset.y, tileMap.node.y + tileMap.node.height - 640);
                tileMap.node.y -= dy;
                offset.y -= dy;
            }
        }
    }



    loadSceneSrc(sceneid)
    {

        //显示场景
        var sceneInfo = DictMgr.Instance.getDictByName("map_data");
        LoadMgr.Instance.LoadAsset(sceneInfo[sceneid].path,(asset)=>{
            for (let index = 0; index < 4; index++) {
                var tilemap : cc.TiledMap = this.layer.addComponent(cc.TiledMap);
                tilemap.tmxAsset = asset;
                tilemap.node.setAnchorPoint(0,0);
                this._tmxList.push(tilemap);
            }
        });
    }

}
