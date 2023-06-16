/**
 * 烈火马
 */

import ClientDef from "../../../common/ClientDef";
import Hero from "../../../ghost/Hero";
import SkillParent from "../../SkillParent";
import FireHorseBullet from "./FireHorseBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireHorseSkill extends SkillParent {

    start () 
    {
        super.start();
        this._startBulletClass = FireHorseBullet;
    }

    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
        // var x = Math.random() * GameData.App_Game_Width + heroPosition.x - GameData.App_Game_Width / 2;
        // var y = Math.random() * GameData.App_Game_Heigth + heroPosition.y - GameData.App_Game_Heigth / 2;
    
        var bullet = this.spawnBullet(ClientDef.BULLET_PHASE_1);
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition;
        bullet.restart();
    }


    
}
