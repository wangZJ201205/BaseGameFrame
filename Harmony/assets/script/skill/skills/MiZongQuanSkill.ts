/**
 * 迷踪拳
 */

import ClientDef from "../../common/ClientDef";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class MiZongQuanSkill extends SkillParent {

    _angle : number = 0;


    //发射子弹
    shootBullet()
    {
        this._angle = Number(180 * this._shootBulletCount);
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().setPosition(this.getHost().position.x,this.getHost().position.y + 50);
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE,this._angle);
        bullet.restart();
    }

}
