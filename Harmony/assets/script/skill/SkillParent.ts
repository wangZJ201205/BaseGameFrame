/**
 * 子弹父类
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";
import SkillMgr from "../manager/SkillMgr";
import BulletParent from "./BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillParent {

    protected _host:Entity;
    protected _staticId:number;
    protected _skillInfo:{};
    protected _bullets:BulletParent[];
    protected _curDelay:number;
    protected _curShootTime: number; //当前cd倒计时
    protected _shootTime:number = 60; //设计时间
    protected _prop: { [key: string]: any } = {};

    protected _isShootBullet:boolean = false; //是否在发射状态中
    protected _shootDelayTime : number = 0;   //发射延迟时间
    protected _shootBulletCount : number = 0; //发射子弹数量
    onLoad (host) 
    {
        this._host = host;
        this._bullets = [];
        this._prop = {};
        this._curShootTime = 0;
    }

    start () 
    {
        this._skillInfo = DictMgr.Instance.getDictByName('skill_data')[this._staticId+""];
        this._curDelay = cc.director.getTotalTime();
        // console.info(">>>>>>>>>"+this._staticId)
        this._shootTime = this._skillInfo['cooldown'] || 0;
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

    getPriority()
    {
        return this._skillInfo["releaseAblePriority"] || 0;
    }

    releaseableSkill()
    {
        if(!this._isShootBullet)
        {
            return false;
        }
        return true;
    }

    update (dt) 
    {
        this.checkOldBullet();
        this.releaseShootBullet();
        this.checkAllBullet(dt);
        this.checkShootCD();
    }

    checkShootCD()
    {
        
        if( this._isShootBullet ) return ;//发射子弹状态中

        var delay = cc.director.getTotalTime() - this._curDelay;
        if(delay > 100)
        {
            this._curShootTime++;
            this._curDelay = cc.director.getTotalTime();
        }
        else
        {
            return;
        }

        var shootTime = this._shootTime / 100 * GameData.Skill_Shoot_Accelerate; //是否全局加速
        if( this._curShootTime >= shootTime )
        {
            this._curShootTime = 0;
            this.perpareShootBullet();
        }
    }

    checkAllBullet(dt)
    {
        this._bullets.forEach(bullet => {
            if (bullet.getProp(ClientDef.BULLET_PROP_STATE) === ClientDef.BULLET_STATE_RUN) {
              bullet.update(dt);
            }
        });
    }

    //发射子弹状态中
    releaseShootBullet()
    {
        if( !this._isShootBullet ) return ;
        
        var delat = cc.director.getTotalTime() - this._shootDelayTime;
        var delaytime = this._skillInfo["delaytime"] || 0;
        if(delat >= delaytime)
        {
            this._shootDelayTime = cc.director.getTotalTime();
            this._shootBulletCount ++;
            this.shootBullet();
        }
        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        if(this._shootBulletCount >= bulletCount)
        {
            this._isShootBullet = false;
            this._shootBulletCount = 0;
            this._curDelay = cc.director.getTotalTime();
        }
        
    }

    //将旧等级的子弹移除
    checkOldBullet()
    {
        this._bullets = this._bullets.filter(bullet => {
            const bid = bullet.getProp(ClientDef.BULLET_PROP_STATICID);
            if (bullet.getProp(ClientDef.BULLET_PROP_STATE) === ClientDef.BULLET_STATE_FREE && bid !== this._staticId) {
              bullet.remove();
              return false;
            }
            return true;
        });
    }

    //准备发射子弹
    perpareShootBullet()
    {   
        this._isShootBullet = true;
    }

    //发射子弹
    shootBullet()
    {   
    }

    // //寻找闲置的子弹
    spawnBullet(bulletId)
    {
        // console.info(`>>>>>>length ${this._bullets.length}`);
        for (let index = 0; index < this._bullets.length; index++) {
            const element = this._bullets[index];
            var skillid = element.getProp(ClientDef.BULLET_PROP_STATICID);
            var isFree : boolean = element.getProp(ClientDef.BULLET_PROP_STATE) == ClientDef.BULLET_STATE_FREE; //是否闲置状态
            var isSamePhase : boolean = element.getProp(ClientDef.BULLET_PROP_PHASEID) == bulletId; //是否相同阶段
            var isSameLevel : boolean = skillid == this._staticId; //是否相同等级
            if( isFree && isSameLevel && isSamePhase)
            {
                element.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);
                return element;
            }
        }
        return this.createBullet(bulletId);
    }

    // //创建一个新的子弹
    createBullet(bulletID)
    { 
        var bulletClass = SkillMgr.Instance.getBulletClass(bulletID);
        var bullet = new bulletClass();
        bullet.onLoad(this);
        bullet.setProp(ClientDef.BULLET_PROP_ID , this._bullets.length + 1);
        bullet.setProp(ClientDef.BULLET_PROP_STATICID , this.getStaticId());
        bullet.setProp(ClientDef.BULLET_PROP_PHASEID , bulletID);
        bullet.start();
        this._bullets.push(bullet);
        return bullet;
    }

    

}
