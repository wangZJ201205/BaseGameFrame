/**
 * 毒树藤
 */

import ClientDef from "../../../common/ClientDef";
import Hero from "../../../ghost/Hero";
import SkillParent from "../../SkillParent";
import PosionEndBullet from "./PosionTimboEndBullet";
import PosionTimboMidBullet from "./PosionTimboMidBullet";
import PosionStartBallBullet from "./PosionTimboPrevBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionTimboSkill extends SkillParent {

    _angle : number = 0;

    start () 
    {
        super.start();
        this._startBulletClass = PosionStartBallBullet;
        this._midBulletClass = PosionTimboMidBullet;
        this._endBulletClass = PosionEndBullet;
    }

    //发射子弹
    shootBullet()
    {
        this._angle += 30;
        this._angle = this._angle > 360 ? this._angle - 360 : this._angle;
        var heroPosition = Hero.Instance.getEntity().position;
        var bullet = this.spawnBullet(ClientDef.BULLET_PHASE_1);
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE,this._angle);
        bullet.restart();
        
    }

}
