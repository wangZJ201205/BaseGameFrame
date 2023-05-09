/**
 * 以一个原点为子弹
 */

import ClientDef from "../../../common/ClientDef";
import GhostMgr from "../../../manager/GhostMgr";
import LoadMgr from "../../../manager/LoadMgr";
import GameMath from "../../../utils/GameMath";
import SkillParent from "../../SkillParent";
import IceBallBullet from "./IceBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class IceBallSkill extends SkillParent {

    _angle : number = 0;

    //发射子弹
    shootBullet()
    {
        this._angle += 10;
        this._angle = this._angle >= 360 ? 0 : this._angle;
        var bullet = this.spawnBullet();
        bullet.getNode().active = true;
        bullet.getNode().position = this.getHost().position;
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE,this._angle);
        bullet.restart();
    }

    spawnBullet()
    {
        var bullet = super.spawnBullet(); //寻找闲置的子弹
        if(bullet)
        {
            return bullet;
        }
        
        bullet = new IceBallBullet();
        bullet.onLoad(this);
        bullet.setProp(ClientDef.BULLET_PROP_STATICID , this.getStaticId());
        bullet.start();
        this._bullets.push(bullet);
        return bullet;
    }
    

    


}
