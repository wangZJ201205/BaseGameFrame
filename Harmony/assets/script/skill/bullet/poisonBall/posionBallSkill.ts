/**
 * 放毒
 */

import GameData from "../../../common/GameData";
import Hero from "../../../ghost/Hero";
import SkillParent from "../../SkillParent";
import posionBallBullet from "./posionBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class posionBallSkill extends SkillParent {

    start () 
    {
        super.start();
        this._bulletClass = posionBallBullet;

        
    }

    //发射子弹
    shootBullet()
    {
        for (let index = 0; index < 4; index++) {
            var heroPosition = Hero.Instance.getEntity().position;
            // var x = Math.random() * GameData.App_Game_Width + heroPosition.x - GameData.App_Game_Width / 2;
            // var y = Math.random() * GameData.App_Game_Heigth + heroPosition.y - GameData.App_Game_Heigth / 2;
        
            var bullet = this.spawnBullet();
            bullet.getNode().active = true;
            bullet.getNode().position = heroPosition;
            bullet.restart();
        }
        
    }
    
}
