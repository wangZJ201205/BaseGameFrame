/**
 * 护盾
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import Hero from "../../ghost/Hero";
import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ShieldBallBullet extends BulletParent {

    private _delta:number = 0;
    private _damagePlayers : number = 0;
    private _bufferTime :  number = 50;

   
    restart()
    {   
        this._delta = cc.director.getTotalTime();
        this._node.opacity = 125;
        super.restart();
    }

    update (dt) 
    {
        this._node.angle ++;
        this._node.angle %= 360;
        var heroPosition = Hero.Instance.getEntity().position;
        var x =  heroPosition.x;
        var y =  heroPosition.y + GameData.Player_Height;
        this._node.position = cc.v3(x,y,0);
    }

    //碰撞开始
    collisionEnter(other, self)
    {  
    }

    //碰撞中
    collisionStay(other, self)
    {
        var delay = cc.director.getTotalTime() - this._delta;
        var damageTime = this._skillInfo['delay'] * GameData.Skill_Shoot_Accelerate; //是否全局加速
        if( damageTime < delay ) //是否在攻击范围之内
        {
            this._damagePlayers++;
            if(this._damagePlayers > this._skillInfo["count"] || damageTime + this._bufferTime < delay) //如果大于伤害人数或超过伤害缓冲时间，就重置
            {
                this._delta = cc.director.getTotalTime();
                this._damagePlayers = 0;
                return;
            }
        }
        else
        {
            return;
        }
        var damageValue = this.getDamageValue(other);
        if(damageValue == 0)return;
        other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );
    }
    
}
