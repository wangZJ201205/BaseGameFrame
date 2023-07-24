/**
 * 落雷 - 以英雄为中心 画个正方形
 */

import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderRaySkill extends SkillParent {

    //发射子弹
    shootBullet()
    {
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.restart();

        
    }

}
