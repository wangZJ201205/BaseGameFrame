/**
 * 以一个原点为子弹
 */

import ClientDef from "../../../common/ClientDef";
import SkillParent from "../../SkillParent";
import ArcheryBullet from "./ArcheryBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ArcherySkill extends SkillParent {

    _angle : number = 0;

    start () 
    {
        super.start();
        this._startBulletClass = ArcheryBullet;
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
