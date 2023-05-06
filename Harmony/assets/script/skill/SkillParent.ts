/**
 * 子弹父类
 */

import ClientDef from "../common/ClientDef";
import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";
import BulletParent from "./BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillParent {

    _host:Entity;
    _staticId:number;
    _skillInfo:{};
    _curDelay:number;
    _bullets:BulletParent[];

    onLoad (host) 
    {
        this._host = host;
        this._bullets = [];
    }

    start () 
    {
        this._skillInfo = DictMgr.Instance.getDictByName('skill_data')[this._staticId+""];
        this._curDelay = 0;
    }

    remove()
    {
        for (let index = 0; index < this._bullets.length; index++) {
            const element = this._bullets[index];
            element.remove();
        }
    }

    update (dt) 
    {
        this._curDelay ++;

        if( this._curDelay >= 30 )
        {
            this._curDelay = 0;
            this.shootBullet();
        }

        for (let index = 0; index < this._bullets.length; index++) {
            const element = this._bullets[index];
            if( element.getProp(ClientDef.BULLET_PROP_STATE) == ClientDef.BULLET_STATE_RUN )
            {
                element.update(dt);
            }
        }
    }

    getHost()
    {
        return this._host;
    }

    setStaticId(staticid)
    {
        this._staticId = staticid;
    }

    shootBullet()
    {
    }

    //寻找闲置的子弹
    spawnBullet()
    {
        for (let index = 0; index < this._bullets.length; index++) {
            const element = this._bullets[index];
            if( element.getProp(ClientDef.BULLET_PROP_STATE) == ClientDef.BULLET_STATE_FREE )
            {
                element.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);
                return element;
            }
        }
        return null;
    }

}
