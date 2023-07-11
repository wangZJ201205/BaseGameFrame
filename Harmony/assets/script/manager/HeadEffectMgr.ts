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
    path:string;
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
            if(element.data != 0 ){
                this.showDamageTips(element);
            }else{
                this.showBloomEffect(element);
            }
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
        var dl :DictEffect = {type:type,data:data,path:"",pos:newPos};
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
            
            cc.tween(node).by(0.2,{x:100 ,y:100}).delay(1).call(function () {
                node.active = false;
                node.removeFromParent();
            }).start();
        })
    }

    addBloomEffect(type:number,data:string,pos:cc.Vec2)
    {
        var newPos:cc.Vec2 = new cc.Vec2;
        newPos.x = pos.x;
        newPos.y = pos.y;
        var de :DictEffect = {type:type,data:0,path:data,pos:newPos};
        this._effectList.push(de);
    }

    showBloomEffect(info)
    {
        var loadPath = 'effect/BloomEffectPref'
        LoadMgr.Instance.LoadAssetWithType(loadPath, cc.Prefab ,(asset)=>
            {
               
                var aniPref = cc.instantiate(asset);
                aniPref.parent = this.layer;
                for (let index = 1; index <= aniPref.childrenCount; index++) {
                    const element = aniPref.getChildByName(index+"");
                    element.active = false;
                }
                var anim = aniPref.getComponent(cc.Animation);
                anim.pause();
                anim.resume(info.path);
                anim.play(info.path);
                aniPref.setPosition(info.pos.x, info.pos.y);

                cc.tween(aniPref).delay(1).call(function () {
                    aniPref.active = false;
                    aniPref.removeFromParent();
                }).start();
            });
    }

}
