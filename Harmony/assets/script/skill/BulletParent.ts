/**
 * 子弹父类
 */

import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletParent {

    // _node : cc.Node;
    _host:Entity;
    _staticId:number;
    _skillInfo:{};
    _curDelay:number;

    onLoad (host) 
    {
        this._host = host;
    }

    start () 
    {
        // this._node = new cc.Node();
        // GhostMgr.Instance.getLayer().addChild(this._node);
        this._skillInfo = DictMgr.Instance.getDictByName('skill_data')[this._staticId+""];
        this._curDelay = 0;
    }

    update (dt) 
    {

    }

    setStaticId(staticid)
    {
        this._staticId = staticid;
    }
}
