/**
 * 落雷 - 以英雄为中心 画个正方形
 */

import GameData from "../../common/GameData";
import Hero from "../../ghost/Hero";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderBallSkill extends SkillParent {

    private readonly _rectPoses: cc.Vec3[] = [
        cc.v3( 200, 100,0),
        cc.v3(-200, 100,0),
        cc.v3(-200, -100,0),
        cc.v3( 200, -100,0),
      ];

    private _index : number = 0;

    //发射子弹
    shootBullet()
    {
        var heroPosition = Hero.Instance.getEntity().position;    
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = heroPosition.add(this._rectPoses[this._index]);
        bullet.restart();

        this._index = (this._index + 1) % 4;
    }


    
}
