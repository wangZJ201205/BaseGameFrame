/**
 * 冰锥
 */

import ClientDef from "../../common/ClientDef";
import Hero from "../../ghost/Hero";
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
            const degree = Hero.Instance.getEntity().getCProp(ClientDef.ENTITY_PROP_DEGREE);
            var dir = GameMath.degreeToEntityDirection2(degree);
            this._dir = dir == 2 ? -1 : 1;
        }

        var heroPosition = Hero.Instance.getEntity().position;
        heroPosition.x += this._shootBulletCount * 75 * this._dir;
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        // bullet.getNode().position.x += this._shootBulletCount * 100;
        
        bullet.restart();
        
    }

}
