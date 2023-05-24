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

    protected _host:Entity;
    protected _staticId:number;
    protected _skillInfo:{};
    protected _curDelay:number;
    protected _bullets:BulletParent[];
    protected _shootTime:number = 60;
    protected _prop: { [key: string]: any } = {};
    protected _bulletClass : typeof BulletParent ; //类型赋值

    onLoad (host) 
    {
        this._host = host;
        this._bullets = [];
        this._prop = {};
    }

    start () 
    {
        this._skillInfo = DictMgr.Instance.getDictByName('skill_data')[this._staticId+""];
        this._curDelay = cc.director.getTotalTime();
        this._shootTime = this._skillInfo['delay'];
        this.setProp(ClientDef.SKILL_PROP_COUNT, this._skillInfo['count']);
    }

    remove()
    {
        for (let index = 0; index < this._bullets.length; index++) {
            const element = this._bullets[index];
            element.remove();
        }
    }

    getStaticId()
    {
        return this._staticId;
    }

    getHost()
    {
        return this._host;
    }

    setStaticId(staticid)
    {
        this._staticId = staticid;
    }

    getBullets()
    {
        return this._bullets;
    }

    setProp(type,value)
    {
        this._prop[type] = value;
    }

    getProp(type)
    {
        return this._prop[type] || 0;
    }

    update (dt) 
    {
        var delay = cc.director.getTotalTime() - this._curDelay;
        if( delay >= this._shootTime )
        {
            this._curDelay = cc.director.getTotalTime();
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
        return this.createBullet();
    }

    //创建一个新的子弹
    createBullet()
    { 
        var bullet = new (this._bulletClass)();
        bullet.onLoad(this);
        bullet.setProp(ClientDef.BULLET_PROP_ID , this._bullets.length + 1);
        bullet.setProp(ClientDef.BULLET_PROP_STATICID , this.getStaticId());
        bullet.start();
        this._bullets.push(bullet);
        return bullet;
    }

    

}
