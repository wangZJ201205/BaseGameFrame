/**
 * 常用技能怪物 -- 冲撞
 */

import { DamageSystem } from "../../ghost/system/DamageSystem";
import SkillParent from "../SkillParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class CommonSkill extends SkillParent {

    
    update (dt) 
    {
        this.checkOldBullet();
        this.checkAllBullet(dt);
        this.checkShootCD();
    }

    //发射子弹
    shootBullet()
    {   
        var tgt = this._host;
        var damage = this._skillInfo["attackValue"];
        DamageSystem.addDamage(this.getHost(), tgt, damage );
    }

}
