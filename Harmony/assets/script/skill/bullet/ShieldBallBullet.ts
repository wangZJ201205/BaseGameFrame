/**
 * 护盾
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import Entity from "../../ghost/Entity";
import { DamageSys } from "../../ghost/compSystem/DamageSys";
import BulletParent from "../BulletParent";

interface collEntity
{
    entity : Entity,
    delay : number;
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShieldBallBullet extends BulletParent {


    private _collEntities : collEntity[];
   
    restart()
    {   
        // this._delta = cc.director.getTotalTime();
        // this._node.opacity = 255;
        super.restart();
        this._node.scale = this._bulletInfo.datax
        this._collEntities = [];
    }

    update (dt) 
    {
        
        this._node.angle += 0.3;
        this._node.angle %= 360;
        var heroPosition = this._host.getHost().position;
        this._node.position = heroPosition;
    }

    //碰撞开始
    collisionEnter(other, self)
    {  
        var colle : collEntity = {entity:other.node,delay:cc.director.getTotalTime()};
        this._collEntities.push(colle);

        return true;
    }

    //碰撞中
    collisionStay(other, self)
    {

        for(var i = 0; i < this._collEntities.length; i++)
        {
            var collentity = this._collEntities[i];
            if(other.node == collentity.entity)
            {
                var delay = cc.director.getTotalTime() - collentity.delay;
                var damageTime = this._skillInfo['cooldown'] * GameData.Skill_Shoot_Accelerate; //是否全局加速
                damageTime *= (1-this._host.getHost().getCProp(ClientDef.ENTITY_PROP_ATTACK_SPEED) / 100); //增加攻速
                console.log(">>>>>>>>delay 1 : " + delay + " damageTime:" + damageTime );
                if( damageTime < delay ) //是否在攻击范围之内
                {
                    collentity.delay = cc.director.getTotalTime();
                    var damageValue = this.getDamageValue(other);
                    if(damageValue == 0)return;
                    DamageSys.addDamage(this._host.getHost(), other.node, damageValue );
                }
                return;
            }
        }
    }

    //碰撞结束
    collisionExit(other, self)
    {
        console.log(">>>>>>>>lenght 1 : " + this._collEntities.length);
        this._collEntities = this._collEntities.filter((collentity)=>
        {
            if(collentity.entity == other.node)
            {
                return false;
            }
            return true;
        });
        console.log(">>>>>>>>lenght 2 : " + this._collEntities.length);
    }
    
}
