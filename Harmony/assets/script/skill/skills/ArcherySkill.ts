/**
 * 射箭 --技能
 */

import ClientDef from "../../common/ClientDef";
import GameMath from "../../utils/GameMath";
import SkillParent from "../SkillParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ArcherySkill extends SkillParent {

    

    //发射子弹
    shootBullet()
    {   
        const degree = this._host.getCProp(ClientDef.ENTITY_PROP_DEGREE);
        var dir = GameMath.degreeToEntityDirection2(degree);
        var angle = dir == 2 ? 180 : 360;

        angle -= Math.floor(this._skillInfo["count"] / 2) * 10;
        angle += (this._shootBulletCount - 1) * 10;

        var startPos = this.getHost().position;
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = startPos;
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE,angle);
        bullet.restart();
    }

}
