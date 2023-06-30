/**
 * 激光
 */

import Hero from "../../ghost/Hero";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class LaserSkill extends SkillParent {

    
    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
        heroPosition.y += 100;
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        bullet.restart();
    }


    
}
