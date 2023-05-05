/**
 * 火球
 */

import ClientDef from "../../../common/ClientDef";
import GhostMgr from "../../../manager/GhostMgr";
import SkillParent from "../../SkillParent";
import FireBallBullet from "./FireBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallSkill extends SkillParent {

    // enemy:Entity;
    // direction:cc.Vec2;
    _bullets:FireBallBullet[];
    onLoad (host) 
    {
        this._bullets = [];
        super.onLoad(host);
    }

    start () 
    {
        super.start();
        // this.direction = null;
        // this.enemy = this.findEnemy();
    }

    update (dt) 
    {
        super.update(dt);
        this._curDelay ++;

        

        if( this._curDelay >= 500 )
        {
            this._curDelay = 0;
            //可以释放技能
            console.info(">>>>>>>释放技能！");

            // if(!this.direction )
            // {
            var enemy = this.findEnemy();
            var direction = enemy.position.sub(this.getHost().position);
            var bullet = new FireBallBullet()
            bullet.onLoad(this);
            bullet.setProp(ClientDef.BULLET_TYPE_DIRECTION , direction);
            bullet.start();
            this._bullets.push(bullet);
            // }
        }
        // console.info(">>>>>>>bullet num:"+ this._bullets.length);
        for (let index = 0; index < this._bullets.length; index++) {
            const element = this._bullets[index];
            element.update(dt);
        }
    }

    //寻找最近的敌人
    findEnemy()
    {
        var minDistance = 99999999;
        var minEnemy = null;
        GhostMgr.Instance.foreachEntity((element)=>{
            var tgtType = element.getClientProp(ClientDef.ENTITY_PROP_TYPE);
            var myType = this.getHost().getClientProp(ClientDef.ENTITY_PROP_TYPE);
            if(tgtType == myType)
            {
                return false;
            }
            if(element.getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_FREE)
            {
                return false;
            }

            var distance = element.position.sub(this.getHost().position).mag(); //计算两个对象之间的距离
            if(distance < minDistance)
            {
                minDistance = distance;
                minEnemy = element;
            }
            return false;
        })   

        return minEnemy;
    }


}
