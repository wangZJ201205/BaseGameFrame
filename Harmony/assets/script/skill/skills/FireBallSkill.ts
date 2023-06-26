/**
 * 以一个原点为子弹
 */

import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallSkill extends SkillParent {

    _index : number = 0;

    start () 
    {
        super.start();
    }

    //发射子弹
    shootBullet()
    {
        var bullet = this.spawnBullet( this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = this.getHost().position;
        bullet.restart();
    }

    


}
