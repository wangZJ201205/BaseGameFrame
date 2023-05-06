/**
 * 子弹父类
 */

import ClientDef from "../common/ClientDef";
import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";
import SkillParent from "./SkillParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletParent {

    private _node : cc.Node;
    protected _host:SkillParent;
    private _staticId:number;
    private _prop:{};

    onLoad (host) 
    {
        this._host = host;
        this._prop = {};

        this._node = new cc.Node();
        GhostMgr.Instance.getLayer().addChild(this._node);
        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
    }

    start () 
    {
    }

    remove()
    {
        if(this._node)
        {
            this._node.removeFromParent();
        }
    }

    update (dt) 
    {

    }

    getNode()
    {
        return this._node;
    }

    getHost()
    {
        return this._host;
    }

    setProp(type,value)
    {
        this._prop[type] = value;
    }

    getProp(type)
    {
        return this._prop[type] || 0;
    }
}
