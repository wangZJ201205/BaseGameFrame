/**
 * 烈火马
 */

import Hero from "../../ghost/Hero";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class FireHorseSkill extends SkillParent {

    
    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
    
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        bullet.restart();
    }


    
}
