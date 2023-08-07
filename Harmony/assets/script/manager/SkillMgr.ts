/**
 * 技能管理
 */
import ClientDef from "../common/ClientDef";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillMgr extends ParentMgr {

    public static readonly Instance : SkillMgr = new SkillMgr();

    private _layerHigh: cc.Node = null; //引用的ghostMgr对象层级 高层
    private _layerLow: cc.Node = null; //引用的ghostMgr对象层级 底层

    onLoad () 
    {
        
    }

    start () 
    {
        this._layerHigh = new cc.Node();
        this._layerHigh.zIndex = ClientDef.SCENE_INDEX_SKILL_HIGH;
        this._layerHigh.width = cc.winSize.width;
        this._layerHigh.height = cc.winSize.height;
        this._layerHigh.parent = SceneMgr.Instance.layer;

        this._layerLow = new cc.Node();
        this._layerLow.zIndex = ClientDef.SCENE_INDEX_SKILL_LOW;
        this._layerLow.width = cc.winSize.width;
        this._layerLow.height = cc.winSize.height;
        this._layerLow.parent = SceneMgr.Instance.layer;

    }

    private update (dt) {
        
    }

    getLayer()
    {
        return this._layerHigh;
    }

    getLayerLow()
    {
        return this._layerLow;
    }

    

}
