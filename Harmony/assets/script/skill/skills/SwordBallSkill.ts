/**
 * 以一个原点为子弹
 */

import Hero from "../../ghost/Hero";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class SwordBallSkill extends SkillParent {


    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
        var x =  heroPosition.x;
        var y =  heroPosition.y;
    
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = cc.v3(x,y,0);
        bullet.restart();
    }
    
}
