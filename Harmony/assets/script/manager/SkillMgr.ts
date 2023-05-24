/**
 * 技能管理
 */
import ClientDef from "../common/ClientDef";
import Item from "../ghost/Item";
import GhostMgr from "./GhostMgr";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillMgr extends ParentMgr {

    public static readonly Instance : SkillMgr = new SkillMgr();

    private _layer: cc.Node = null; //引用的ghostMgr对象层级

    onLoad () 
    {
       
    }

    start () 
    {
        this._layer = new cc.Node();
        this._layer.zIndex = ClientDef.SCENE_INDEX_SKILL;
        this._layer.width = cc.winSize.width;
        this._layer.height = cc.winSize.height;
        this._layer.parent = SceneMgr.Instance.layer;
    }

    private update (dt) {
        
    }

    getLayer()
    {
        return this._layer;
    }



}
