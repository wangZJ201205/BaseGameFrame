/**
 * 放毒
 */

import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionBallSkill extends SkillParent {


    //发射子弹
    shootBullet()
    {
        
        var heroPosition = this._host.position;
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        bullet.restart();
        
    }
    
}
