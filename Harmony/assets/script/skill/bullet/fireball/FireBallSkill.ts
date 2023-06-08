/**
 * 以一个原点为子弹
 */

import ClientDef from "../../../common/ClientDef";
import SkillParent from "../../SkillParent";
import FireBallBullet from "./FireBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallSkill extends SkillParent {

    _index : number = 0;

    start () 
    {
        super.start();
        this._startBulletClass = FireBallBullet;
    }

    //发射子弹
    shootBullet()
    {
        var bullet = this.spawnBullet(ClientDef.BULLET_PHASE_1);
        bullet.getNode().active = true;
        bullet.getNode().position = this.getHost().position;
        bullet.restart();
    }

    


}
