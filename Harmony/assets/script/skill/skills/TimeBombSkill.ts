/**
 * 定时炸弹
 */

import { Hero } from "../../ghost/Hero";
import BulletHelp from "../BulletHelp";
import SkillParent from "../SkillParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeBombSkill extends SkillParent {



    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
        var x = Math.random() * 400 - 200 + heroPosition.x;
        var y = Math.random() * 100 > 50 ? heroPosition.y + 100 : heroPosition.y - 100;
    
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = cc.v3(x,y,0);
        bullet.restart();
    }

    getAttackEntity(bullet)
    {
        return BulletHelp.FindEnemyByMinDistanceOfBullet(bullet);
    }
    
}
