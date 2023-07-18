/**
 * 火墙
 */

import GameMath from "../../utils/GameMath";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class FireWallSkill extends SkillParent {

    private static fire_rect1: number[] = [0,0,0,0,0,
                                           0,0,0,0,0,
                                           0,0,1,0,0,
                                           0,0,0,0,0,
                                           0,0,0,0,0 ];

    private static fire_rect2: number[] = [0,0,0,0,0,
                                           0,0,1,0,0,
                                           0,1,1,1,0,
                                           0,0,1,0,0,
                                           0,0,0,0,0 ];

    private static fire_rect3: number[] = [0,0,0,0,0,
                                           0,1,1,1,0,
                                           0,1,1,1,0,
                                           0,1,1,1,0,
                                           0,0,0,0,0 ];

    private static fire_rect4: number[] = [0,0,0,0,0,
                                           0,1,1,1,0,
                                           1,1,1,1,1,
                                           0,1,1,1,0,
                                           0,0,0,0,0 ];

    private static fire_rect5: number[] = [0,0,1,0,0,
                                           0,1,1,1,0,
                                           1,1,1,1,1,
                                           0,1,1,1,0,
                                           0,0,1,0,0 ];


    private _angle : number = 0;

    //发射子弹
    shootBullet()
    {
        var heroPosition = this._host.position;
        var centerx = heroPosition.x + this._skillInfo["range"] * GameMath.getCosCache(this._angle);
        var centery = heroPosition.y + this._skillInfo["range"] * GameMath.getSinCache(this._angle);

        var rect = FireWallSkill.fire_rect1;
        switch(this._skillInfo["subBulletCnt"])
        {
            case 2:
                rect = FireWallSkill.fire_rect2;
                break;
            case 3:
                rect = FireWallSkill.fire_rect3;
                break;
            case 4:
                rect = FireWallSkill.fire_rect4;
                break;
            case 5:
                rect = FireWallSkill.fire_rect5;
                break;
        }

        for (let index = 0; index < rect.length; index++) 
        {
            if( rect[index] == 0)
            {
                continue;
            }
            var x = Math.floor(index / 5) - 2;
            var y = Math.floor(index % 5) - 2;
            x = centerx + x * 75;
            y = centery + y * 50;

            var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
            bullet.getNode().active = true;
            bullet.getNode().position = cc.v3(x,y,0);
            bullet.restart();            
        }
        
        this._angle = (this._angle + 40) % 360;
    }

}
