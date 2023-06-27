/**
 * 头顶特效
 */

import ClientDef from "../common/ClientDef";
import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

interface DictEffect {
    type: number;
    data:number;
    pos:cc.Vec2;
  }

@ccclass
export default class HeadEffectMgr extends ParentMgr {

    public static readonly Instance : HeadEffectMgr = new HeadEffectMgr();
    
    private layer: cc.Node = null; //label显示层
    private _effectList:DictEffect[];
    private _timerID: number;

    onLoad () 
    {
        super.onLoad();
        this._effectList = [];
        console.info("load HeadEffectMgr");
    }

    start () {
        console.info("start HeadEffectMgr");

        this.layer = new cc.Node();
        this.layer.zIndex = ClientDef.SCENE_INDEX_HEAD_EFFECT;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = SceneMgr.Instance.getLayer();

        this._timerID = setInterval(this.update.bind(this), 100);
    }

    clear()
    {
        this._effectList = [];
    }

    getLayer()
    {
        return this.layer;
    }

    private update (dt) 
    {
        for (let index = 0; index < this._effectList.length; index++) {
            const element = this._effectList[index];
            this.showDamageTips(element);
        }
        this._effectList = [];
    }

    addHeadEffect(effect:cc.Node)
    {
        this.layer.addChild(effect);
    }

    addDamageTips(type:number,data:number,pos:cc.Vec2)
    {
        var newPos:cc.Vec2 = new cc.Vec2;
        newPos.x = pos.x;
        newPos.y = pos.y;
        var dl :DictEffect = {type:type,data:data,pos:newPos};
        this._effectList.push(dl);
    }

    showDamageTips(info)
    {
        const loadPath = "headEffect/headEffect" ;
        LoadMgr.Instance.LoadAsset(loadPath,(asset)=>{
            var node = new cc.Node()
            let effect = node.addComponent(cc.Sprite);
            let spriteFrame = asset.getSpriteFrame("pop_000" + Math.floor(Math.random()*21));
            effect.spriteFrame = spriteFrame;
            this.layer.addChild(node);
            node.setPosition(info.pos.x, info.pos.y);
            
            cc.tween(node).by(0.2,{x:100*Math.random() ,y:100*Math.random()}).delay(1).call(function () {
                node.active = false;
                node.removeFromParent();
            }).start();
        })
    }

}
