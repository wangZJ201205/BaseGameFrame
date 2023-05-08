/**
 * label层
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

//输出字符类型
interface DictLabel {
    type: number;
    data:number;
    pos:cc.Vec2;
  }

@ccclass
export default class LabelMgr extends ParentMgr {

    public static readonly Instance : LabelMgr = new LabelMgr();

    private layer: cc.Node = null; //label显示层
    private _timerID: number;
    private _labelList:DictLabel[];

    // LIFE-CYCLE CALLBACKS:

    static getInstance()
    {
        return LabelMgr.Instance;
    }

    onLoad () 
    {
        super.onLoad();
        this._labelList = [];
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
        for (let index = 0; index < this._labelList.length; index++) {
            const element = this._labelList[index];
            this.createLabel(element);
        }
        this._labelList = [];
    }

    getLayer()
    {
        return this.layer;
    }

    addLabel(type:number,data:number,pos:cc.Vec2)
    {
        var newPos:cc.Vec2 = new cc.Vec2;
        newPos.x = pos.x;
        newPos.y = pos.y;
        var dl :DictLabel = {type:type,data:data,pos:newPos};
        this._labelList.push(dl);
    }

    private createLabel(info)
    {
        if(info.type == 1)
        {
            LoadMgr.Instance.LoadAssetWithType('fonts/bifen',cc.BitmapFont,(font)=>{
                var node = new cc.Node();
                var bloomLab = node.addComponent(cc.Label);
                bloomLab.font = font;
                bloomLab.string = info.data;
                node.setPosition(info.pos.x, info.pos.y);
                this.layer.addChild(node);


                cc.tween(node).by(0.2,{x:50*Math.random() ,y:50*Math.random()}).delay(1).call(function () {
                    node.active = false;
                    node.removeFromParent();
                }).start();
            })
        }
        else if(info.type == 2)
        {
            // var node = new cc.Node();
            // var bloomLab = node.addComponent(cc.Label);
            // // bloomLab.font = font;
            // bloomLab.string = info.data;
            // bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
            // var y = Math.random()* GameData.App_Game_Heigth ;
            // node.setPosition(info.pos.x, info.pos.y);
            // this.layer.addChild(node);

            // cc.tween(node).by(0.2,{y:50}).delay(1).call(function () {
            //     node.active = false;
            //     node.removeFromParent();
            // }).start();

            LoadMgr.Instance.LoadAssetWithType('fonts/baoji',cc.BitmapFont,(font)=>{
                var node = new cc.Node();
                var bloomLab = node.addComponent(cc.Label);
                bloomLab.font = font;
                bloomLab.string = info.data;
                // bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
                var y = Math.random()* GameData.App_Game_Heigth ;
                node.setPosition(info.pos.x, info.pos.y);
                this.layer.addChild(node);
                
                cc.tween(node).by(0.2,{x:50*Math.random() ,y:50*Math.random()}).delay(1).call(function () {
                    node.active = false;
                    node.removeFromParent();
                }).start();
            })
        }
        else if(info.type == 3)
        {
            LoadMgr.Instance.LoadAssetWithType('fonts/baoji',cc.BitmapFont,(font)=>{
                var node = new cc.Node();
                var bloomLab = node.addComponent(cc.Label);
                bloomLab.font = font;
                bloomLab.string = info.data;
                // bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
                var y = Math.random()* GameData.App_Game_Heigth ;
                node.setPosition(info.pos.x, info.pos.y);
                this.layer.addChild(node);
                
                cc.tween(node).by(0.2,{x:50*Math.random() ,y:50*Math.random()}).delay(1).call(function () {
                    node.active = false;
                    node.removeFromParent();
                }).start();
            })
        }
        else if(info.type == 4)
        {
            LoadMgr.Instance.LoadAssetWithType('fonts/blood_red',cc.BitmapFont,(font)=>{
                var node = new cc.Node();
                var bloomLab = node.addComponent(cc.Label);
                bloomLab.font = font;
                bloomLab.string = info.data;
                // bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
                node.setPosition(info.pos.x, info.pos.y);
                this.layer.addChild(node);
                
                cc.tween(node).by(0.2,{x:50*Math.random() ,y:50*Math.random()}).delay(1).call(function () {
                    node.active = false;
                    node.removeFromParent();
                }).start();
            })
        }
        else if(info.type == 5)
        {
            LoadMgr.Instance.LoadAssetWithType('fonts/duanzao',cc.BitmapFont,(font)=>{
                var node = new cc.Node();
                var bloomLab = node.addComponent(cc.Label);
                bloomLab.font = font;
                bloomLab.string = info.data;
                // bloomLab.cacheMode = cc.Label.CacheMode.CHAR;
                node.setPosition(info.pos.x, info.pos.y);
                this.layer.addChild(node);
                
                cc.tween(node).by(0.2,{x:50*Math.random() ,y:50*Math.random()}).delay(1).call(function () {
                    node.active = false;
                    node.removeFromParent();
                }).start();
            })
        }
    }

    

}
