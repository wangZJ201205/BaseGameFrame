/**
 * 放毒
 */

import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../../ghost/Hero";
import SkillParent from "../../SkillParent";
import PosionEndBullet from "./PosionEndBullet";
import PosionStartBallBullet from "./PosionStartBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionBallSkill extends SkillParent {

    start () 
    {
        super.start();
        this._startBulletClass = PosionStartBallBullet;
        this._endBulletClass = PosionEndBullet;
    }

    //发射子弹
    shootBullet()
    {
        
        var heroPosition = Hero.Instance.getEntity().position;
        var bullet = this.spawnBullet(ClientDef.BULLET_PHASE_1);
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        bullet.restart();
        
    }
    
}
