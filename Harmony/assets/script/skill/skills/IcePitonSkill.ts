/**
 * 冰锥
 */

import ClientDef from "../../common/ClientDef";
import Hero from "../../ghost/Hero";
import SkillParent from "../SkillParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class IcePitonSkill extends SkillParent {



    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
        heroPosition.x += this._shootBulletCount * 75;
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        // bullet.getNode().position.x += this._shootBulletCount * 100;
        
        bullet.restart();
        
    }

}
