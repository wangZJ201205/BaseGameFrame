/**
 * 技能
 */

import ClientDef from "../common/ClientDef";
import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import BulletParent from "./BulletParent";
import FireBallBullet from "./bullet/FireBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Skill {

    _bullets:BulletParent[];
    _host:Entity;
    onLoad (host) 
    {
        this._bullets = [];
        this._host = host;
    }

    start () 
    {
        var entityStatic = this._host.getClientProp(ClientDef.ENTITY_PROP_STATICID);
        var skillid = DictMgr.Instance.getDictByName('entity_data')[entityStatic+""].skillid
        if(skillid != 0)
        {
            this.addBullet(skillid);
        }

    }

    update (dt) 
    {
        for (let i = 0; i < this._bullets.length; i++) {
            const element = this._bullets[i];
            element.update(dt);
        }
    }

    addBullet(skillid)
    {
        var type = Math.floor(skillid / 10000); //去整型
        var bullet = this.spawnBullet(type);
        if(!bullet)
        {
            console.info("没有这种类型的子弹对象 :" + type);
            return;
        }
        bullet.onLoad(this._host);
        bullet.setStaticId(skillid);
        bullet.start();
        this._bullets.push(bullet);
    }

    spawnBullet(type)
    {
        var bullet = null;
        switch(type)
        {
            case ClientDef.BULLET_TYPE_FIREBALL: //火球
                bullet = new FireBallBullet();
            break;
        }
        return bullet;
    }

}
