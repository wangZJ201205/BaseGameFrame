/**
 * 火墙
 */

import GameData from "../../common/GameData";
import Hero from "../../ghost/Hero";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class FireWallSkill extends SkillParent {

    start () 
    {
        super.start();
    }

    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
        var x = Math.random() * GameData.App_Game_Width + heroPosition.x - GameData.App_Game_Width / 2;
        var y = Math.random() * GameData.App_Game_Heigth + heroPosition.y - GameData.App_Game_Heigth / 2;
        
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = cc.v3(x,y,0);
        bullet.restart();
        
    }

}
