/**
 * 火柱
 */

import { Hero } from "../../ghost/Hero";
import SkillMgr from "../../manager/SkillMgr";
import BulletHelp from "../BulletHelp";
import SkillParent, { SkillReleaseType } from "../SkillParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FireColumnSkill extends SkillParent {

    onLoad(host: any): void {
        super.onLoad(host);
        this._releaseType = SkillReleaseType.manual;
    }

    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
        // heroPosition.x += 200;
        // heroPosition.y += 200;
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        bullet.restart();
    }

    
}
