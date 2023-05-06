/**
 * 火球
 */

import ClientDef from "../../../common/ClientDef";
import GhostMgr from "../../../manager/GhostMgr";
import LoadMgr from "../../../manager/LoadMgr";
import GameMath from "../../../utils/GameMath";
import SkillParent from "../../SkillParent";
import FireBallBullet from "./FireBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallSkill extends SkillParent {

    //发射子弹
    shootBullet()
    {
        var enemy = this.findEnemy();
        if(enemy)
        {
            var direction = enemy.position.sub(this.getHost().position);
            var bullet = this.spawnBullet();
            bullet.getNode().active = true;
            bullet.getNode().position = this.getHost().position;
            bullet.getNode().angle = GameMath.directionToAngle(direction);
            bullet.setProp(ClientDef.BULLET_PROP_DIRECTION , direction);
        }
    }

    spawnBullet()
    {
        var bullet = super.spawnBullet(); //寻找闲置的子弹
        if(bullet)
        {
            return bullet;
        }
        
        bullet = new FireBallBullet();
        bullet.onLoad(this);
        bullet.start();
        this._bullets.push(bullet);
        return bullet;
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
