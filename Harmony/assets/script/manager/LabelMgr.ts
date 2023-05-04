/**
 * label层
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LabelMgr extends ParentMgr {

    public static readonly Instance : LabelMgr = new LabelMgr();

    private layer: cc.Node = null; //label显示层
    private _timerID: number;
    // LIFE-CYCLE CALLBACKS:

    static getInstance()
    {
        return LabelMgr.Instance;
    }

    onLoad () 
    {
        super.onLoad();
        console.info("load GhostMgr");
    }

    start () {
        console.info("start GhostMgr");

        // var canvas = cc.director.getScene().getChildByName('Canvas');
        this.layer = new cc.Node();
        this.layer.zIndex = ClientDef.SCENE_INDEX_LABEL;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = SceneMgr.Instance.getLayer();

        this._timerID = setInterval(this.update.bind(this), 100);
    }

    private update (dt) 
    {
        // this.testLabel(1);
        // this.testLabel(2);
        // this.testLabel(3);
        // this.testLabel(4);
        // this.testLabel(5);
    }

    private testLabel(mode)
    {
        if(mode == 1)
        {
            LoadMgr.Instance.LoadAssetWithType('fonts/bifen',cc.BitmapFont,(font)=>{
                var node = new cc.Node();
                var bloomLab = node.addComponent(cc.Label);
                bloomLab.font = font;
                bloomLab.string = "120120";
                // bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
                var y = Math.random()* GameData.App_Game_Heigth ;
                node.setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2)
                this.layer.addChild(node);
                
            })
        }
        else if(mode == 2)
        {
            var node = new cc.Node();
            var bloomLab = node.addComponent(cc.Label);
            // bloomLab.font = font;
            bloomLab.string = "120120";
            bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
            var y = Math.random()* GameData.App_Game_Heigth ;
            node.setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2)
            this.layer.addChild(node);
        }
        else if(mode == 3)
        {
            LoadMgr.Instance.LoadAssetWithType('fonts/baoji',cc.BitmapFont,(font)=>{
                var node = new cc.Node();
                var bloomLab = node.addComponent(cc.Label);
                bloomLab.font = font;
                bloomLab.string = "120120";
                // bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
                var y = Math.random()* GameData.App_Game_Heigth ;
                node.setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2)
                this.layer.addChild(node);
                
            })
        }
        else if(mode == 4)
        {
            LoadMgr.Instance.LoadAssetWithType('fonts/blood_red',cc.BitmapFont,(font)=>{
                var node = new cc.Node();
                var bloomLab = node.addComponent(cc.Label);
                bloomLab.font = font;
                bloomLab.string = "120120";
                // bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
                var y = Math.random()* GameData.App_Game_Heigth ;
                node.setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2)
                this.layer.addChild(node);
                
            })
        }
        else if(mode == 5)
        {
            LoadMgr.Instance.LoadAssetWithType('fonts/duanzao',cc.BitmapFont,(font)=>{
                var node = new cc.Node();
                var bloomLab = node.addComponent(cc.Label);
                bloomLab.font = font;
                bloomLab.string = "120120";
                // bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
                var y = Math.random()* GameData.App_Game_Heigth ;
                node.setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2)
                this.layer.addChild(node);
                
            })
        }
    }

    getLayer()
    {
        return this.layer;
    }

}
