/**
 * 常用技能怪物 -- 冲撞
 */

import ClientDef from "../../common/ClientDef";
import { Hero } from "../../ghost/Hero";
import { DamageSystem } from "../../ghost/system/DamageSystem";
import GameHelp from "../../help/GameHelp";
import SkillParent from "../SkillParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SuicideSkill extends SkillParent {

    
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
        var damage = this._skillInfo["attackValue"].split("-");
        var min = Number(damage[0]);
        var max = Number(damage[1]);
        var value = Math.floor(min + Math.random() * (max-min));
        DamageSystem.addDamage(this.getHost() ,tgt, value );

        this.getHost().getEntityNode().active = false;
        this.getHost().setCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);

        //抖动
        GameHelp.shakeBody(tgt);
    }

}
