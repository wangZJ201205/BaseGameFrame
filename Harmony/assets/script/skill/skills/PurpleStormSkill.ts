/**
 * 紫色风暴 --技能
 */

import ClientDef from "../../common/ClientDef";
import SkillParent from "../SkillParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class PurpleStormSkill extends SkillParent {

    // _offsetY : number = 0;
    _angle : number = 0;
    start () 
    {
        super.start();
        // this._offsetY = -20 * (bulletCount) / 2;
        // this._curBulletIndex = 0;
    }

    //发射子弹
    shootBullet()
    {
        var startPos = this.getHost().position;
        
        // startPos.y += this._offsetY;

        this._angle += 20;
        this._angle = this._angle > 360 ? this._angle - 360 : this._angle;

        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = startPos;
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE,this._angle);
        bullet.restart();

        // this._offsetY += 40;
        // if(this._shootBulletCount >= bulletCount )
        // {
        //     this._offsetY = -40 * (bulletCount) / 2;
        // }

        // console.info(">>>>>>>cur bullets lenght : " + this._bullets.length);
    }

}
