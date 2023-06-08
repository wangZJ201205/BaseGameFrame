/**
 * 子弹父类
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
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
    protected _shootTime:number = 60; //设计时间
    protected _prop: { [key: string]: any } = {};
    protected _startBulletClass : typeof BulletParent ; //开始阶段
    protected _midBulletClass : typeof BulletParent ;   //中间阶段
    protected _endBulletClass : typeof BulletParent ;   //结束阶段

    protected _isShootBullet:boolean = false; //是否在发射状态中
    protected _shootDelayTime : number = 0;   //发射延迟时间
    protected _shootBulletCount : number = 0; //发射子弹数量
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
        this._shootTime = this._skillInfo['cooldown'];
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
        this.checkOldBullet();
        this.checkShootBullet();
        this.checkAllBullet(dt);
        this.checkShootCD();
    }

    checkShootCD()
    {
        var delay = cc.director.getTotalTime() - this._curDelay;
        var shootTime = this._shootTime * GameData.Skill_Shoot_Accelerate; //是否全局加速
        if( delay >= shootTime )
        {
            this._curDelay = cc.director.getTotalTime();
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
    checkShootBullet()
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
        this._shootBulletCount = 0;
        this._shootDelayTime = cc.director.getTotalTime();
    }

    //发射子弹
    shootBullet()
    {   
    }

    //寻找闲置的子弹
    spawnBullet(phase)
    {
        // console.info(`>>>>>>length ${this._bullets.length}`);
        for (let index = 0; index < this._bullets.length; index++) {
            const element = this._bullets[index];
            var bulletId = element.getProp(ClientDef.BULLET_PROP_STATICID);
            var isFree : boolean = element.getProp(ClientDef.BULLET_PROP_STATE) == ClientDef.BULLET_STATE_FREE; //是否闲置状态
            var isSamePhase : boolean = element.getProp(ClientDef.BULLET_PROP_PHASE) == phase; //是否相同阶段
            var isSameLevel : boolean = bulletId == this._staticId; //是否相同等级
            if( isFree && isSameLevel && isSamePhase)
            {
                element.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_RUN);
                return element;
            }
        }
        return this.createBullet(phase);
    }

    //创建一个新的子弹
    createBullet(phase)
    { 
        var bullet = null;
        if(phase == ClientDef.BULLET_PHASE_1) bullet = new (this._startBulletClass)();
        else if(phase == ClientDef.BULLET_PHASE_2)bullet = new (this._midBulletClass)();
        else if(phase == ClientDef.BULLET_PHASE_3)bullet = new (this._endBulletClass)();
        bullet.onLoad(this);
        bullet.setProp(ClientDef.BULLET_PROP_ID , this._bullets.length + 1);
        bullet.setProp(ClientDef.BULLET_PROP_STATICID , this.getStaticId());
        bullet.setProp(ClientDef.BULLET_PROP_PHASE , phase);
        bullet.start();
        this._bullets.push(bullet);
        return bullet;
    }

    

}
