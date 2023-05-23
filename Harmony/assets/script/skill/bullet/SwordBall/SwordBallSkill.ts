/**
 * 以一个原点为子弹
 */

import GameData from "../../../common/GameData";
import Hero from "../../../ghost/Hero";
import SkillParent from "../../SkillParent";
import SwordBallBullet from "./SwordBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SwordBallSkill extends SkillParent {

    start () 
    {
        super.start();
        this._bulletClass = SwordBallBullet;
    }

    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;
        var x =  heroPosition.x;
        var y =  heroPosition.y;
    
        var bullet = this.spawnBullet();
        bullet.getNode().active = true;
        bullet.getNode().position = cc.v3(x,y,0);
        bullet.restart();
    }
    
}
