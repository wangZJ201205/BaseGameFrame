/**
 * 常用技能怪物 -- 冲撞
 */

import ClientDef from "../../common/ClientDef";
import { DamageSys } from "../../ghost/compSystem/DamageSys";
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
        var tgt = this._host;
        var damage = this._skillInfo["attackValue"];
        DamageSys.addDamage(tgt, damage );

        this.getHost().getEntityNode().active = false;
        this.getHost().setCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);

        //抖动
        GameHelp.shakeBody(tgt);
    }

}
