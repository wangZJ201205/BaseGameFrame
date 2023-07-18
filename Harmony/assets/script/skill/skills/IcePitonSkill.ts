/**
 * 冰锥
 */

import ClientDef from "../../common/ClientDef";
import GameMath from "../../utils/GameMath";
import SkillParent from "../SkillParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class IcePitonSkill extends SkillParent {

    private _dir : number = 1;

    //发射子弹
    shootBullet()
    {

        if(this._shootBulletCount == 1)
        {
            const degree = this._host.getCProp(ClientDef.ENTITY_PROP_DEGREE);
            var dir = GameMath.degreeToEntityDirection2(degree);
            this._dir = dir == 2 ? -1 : 1;
        }

        var heroPosition = this._host.position;
        heroPosition.x += this._shootBulletCount * 75 * this._dir;
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        // bullet.getNode().position.x += this._shootBulletCount * 100;
        
        bullet.restart();
        
    }

}
