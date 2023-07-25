/**
 * 常用技能怪物 -- 冲撞
 */

import { DamageSys } from "../../ghost/compSystem/DamageSys";
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
        DamageSys.addDamage(this.getHost(), tgt, damage );
    }

}
