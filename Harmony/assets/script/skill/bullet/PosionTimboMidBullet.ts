/**
 * 毒树藤 后期
 */

import ClientDef from "../../common/ClientDef";
import { DamageSys } from "../../ghost/compSystem/DamageSys";
import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionTimboMidBullet extends BulletParent {

    private _delta:number = 0;
    private _runTime:number = 0;

    restart()
    {   
        this._node.zIndex = 10;
        this._delta = cc.director.getTotalTime();
        this._runTime = 0;
        super.restart();
    }

    update (dt) 
    {
        // super.update(dt);
        var delay = cc.director.getTotalTime() - this._delta;
        if(delay > 100)
        {
            this._runTime++;
            this._delta = cc.director.getTotalTime();
        }
        else
        {
            return;
        }
        
        if( this._runTime*100 > this._bulletInfo["sustaintime"] )
        {
            this.stop();

            var bullet = this.spawnNextBullet();
            bullet.getNode().active = true;
            bullet.getNode().position = this.getNode().position;
            bullet.restart();
            this._runTime = 0;
        }

    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        var damageValue = this.getDamageValue(other);
        other.node.setCProp(ClientDef.ENTITY_PROP_POSION_TIME,cc.director.getTotalTime());
        if(damageValue == 0)return;
        DamageSys.addDamage(other, damageValue );
        return true;
    }

    //碰撞中
    collisionStay(other, self)
    {
        var delay = cc.director.getTotalTime() - other.node.getCProp(ClientDef.ENTITY_PROP_POSION_TIME);
        if(delay >= this._bulletInfo["delayDamage"])
        {
            var damageValue = this.getDamageValue(other);
            other.node.setCProp(ClientDef.ENTITY_PROP_POSION_TIME,cc.director.getTotalTime());
            if(damageValue == 0)return;
            DamageSys.addDamage(other, damageValue );
        }
    }

}
