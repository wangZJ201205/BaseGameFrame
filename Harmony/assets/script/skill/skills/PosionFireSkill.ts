/**
 * 毒火技能
 */

import ClientDef from "../../common/ClientDef";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionFireSkill extends SkillParent {

 
    //发射子弹
    shootBullet()
    {
        var angle = Math.random()*360;
        var bullet = this.spawnBullet( this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = this.getHost().position;
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE, angle);
        bullet.restart();
    }

    


}
