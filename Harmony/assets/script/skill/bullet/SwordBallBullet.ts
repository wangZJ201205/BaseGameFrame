/**
 * 落雷技能
 */

import ClientDef from "../../common/ClientDef";
import { DamageSys } from "../../ghost/compSystem/DamageSys";
import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SwordBallBullet extends BulletParent {

    private _delta:number = 0;

    restart()
    {   
        this._delta = 50;
        var aniNode= this._node.children[0];
        if(aniNode)
        {
            aniNode.getComponent(cc.Animation).play();
        }
        super.restart();
    }

    update (dt) 
    {
        this._delta--;
        if(this._delta <= 0)
        {
            this.stop();
        }
        super.update(dt);
    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        var damageValue = this.getDamageValue(other);
        if(damageValue == 0)return;
        DamageSys.addDamage(other, damageValue );
        return true;
    }
    
}
