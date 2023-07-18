/**
 * 激光
 */

import ClientDef from "../../common/ClientDef";
import { Hero } from "../../ghost/Hero";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class LaserSkill extends SkillParent {

    private _angle : number = 0;

    //发射子弹
    shootBullet()
    {
        
        var heroPosition = Hero.Instance.getEntity().position;
        heroPosition.y += 100;
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE,this._angle);
        bullet.restart();

        this._angle += 90;
        this._angle %= 360;
    }


    
}
