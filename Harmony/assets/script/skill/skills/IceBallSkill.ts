/**
 * 以一个原点为子弹
 */

import ClientDef from "../../common/ClientDef";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class IceBallSkill extends SkillParent {

    _angle : number = 0;


    //发射子弹
    shootBullet()
    {
        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        // this._angle += 360/bulletCount;
        this._angle += 5;
        this._angle = this._angle > 360 ? this._angle - 360 : this._angle;
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = this.getHost().position;
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE,this._angle);
        bullet.restart();
        
    }

}
