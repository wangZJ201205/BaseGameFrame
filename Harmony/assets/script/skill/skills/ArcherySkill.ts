/**
 * 射箭 --技能
 */

import ClientDef from "../../common/ClientDef";
import SkillParent from "../SkillParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ArcherySkill extends SkillParent {

    _offsetY : number = 0;
    _curBulletIndex : number = 0;
    start () 
    {
        super.start();
        
        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        this._offsetY = -20 * (bulletCount) / 2;
        this._curBulletIndex = 0;
    }

    //发射子弹
    shootBullet()
    {
        var startPos = this.getHost().position;
        
        startPos.y += this._offsetY;
        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = startPos;
        bullet.restart();

        this._curBulletIndex++
        this._offsetY += 20;
        if(this._curBulletIndex >= bulletCount )
        {
            this._offsetY = -20 * (bulletCount) / 2;
            this._curBulletIndex = 0;
        }

        // console.info(">>>>>>>cur bullets lenght : " + this._bullets.length);
    }

}
