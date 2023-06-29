/**
 * 常用技能怪物 -- 冲撞
 */

import ClientDef from "../../common/ClientDef";
import Hero from "../../ghost/Hero";
import DictMgr from "../../manager/DictMgr";
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
        var tgt = Hero.Instance.getEntity();
        var damage = this._skillInfo["attackValue"];
        tgt.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damage );
    }

}
