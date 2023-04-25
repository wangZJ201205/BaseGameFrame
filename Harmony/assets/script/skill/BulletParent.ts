/**
 * 子弹父类
 */

import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";
import SkillParent from "./SkillParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletParent {

    // _node : cc.Node;
    _host:SkillParent;
    _staticId:number;
    _prop:{};

    onLoad (host) 
    {
        this._host = host;
        this._prop = {};
    }

    start () 
    {
    }

    update (dt) 
    {

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
