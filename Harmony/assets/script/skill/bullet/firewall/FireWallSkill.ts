/**
 * 火墙
 */

import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../../ghost/Hero";
import SkillParent from "../../SkillParent";
import FireWallEndBullet from "./FireWallEndBullet";
import FireWallMidBullet from "./FireWallMidBullet";
import FireWallPrevBullet from "./FireWallPrevBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireWallSkill extends SkillParent {

    start () 
    {
        super.start();
        this._startBulletClass = FireWallPrevBullet;
        this._midBulletClass = FireWallMidBullet
        this._endBulletClass = FireWallEndBullet;
    }

    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
        var x = Math.random() * GameData.App_Game_Width + heroPosition.x - GameData.App_Game_Width / 2;
        var y = Math.random() * GameData.App_Game_Heigth + heroPosition.y - GameData.App_Game_Heigth / 2;
        
        var bullet = this.spawnBullet(ClientDef.BULLET_PHASE_1);
        bullet.getNode().active = true;
        bullet.getNode().position = cc.v3(x,y,0);
        bullet.restart();
        
    }

}
