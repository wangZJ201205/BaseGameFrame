/**
 * 以一个原点为子弹
 */

import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../../ghost/Hero";
import SkillParent from "../../SkillParent";
import RevolutionBallBullet from "./RevolutionBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RevolutionBallSkill extends SkillParent {

    private _angle:number;
    private _delta : number;
    start () 
    {
        super.start();
        this._bulletClass = RevolutionBallBullet;
    }
    
    //发射子弹
    shootBullet()
    {

        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        var createCount = 0;
        if(this._bullets.length >= bulletCount)
        {
            for (let index = 0; index < this._bullets.length; index++) 
            {
                const element = this._bullets[index];
                if( element.getProp(ClientDef.BULLET_PROP_STATE) == ClientDef.BULLET_STATE_FREE )
                {
                    createCount++;
                }
            }
        }
        else
        {
            createCount = bulletCount;   
        }

        for (let index = 0; index < createCount; index++) {
            var i = index + 1;
            var angle = 360 / bulletCount;
            angle *= i;

            var bullet = this.spawnBullet();
            bullet.getNode().active = true;
            bullet.restart();
        }
    }

    update (dt) 
    {
        super.update(dt);

        this._delta++;
        if( this._delta < 4 )
        {
            return;
        }
        this._delta = 0;

        this._angle ++;
        this._angle = this._angle + 1 < 360 ? this._angle + 1 : 0; 
        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        for (let index = 0; index < this._bullets.length; index++) {
            const bullet = this._bullets[index];
            var i = index + 1;
            var angle = 360 / bulletCount;
            angle *= i;
            angle += this._angle;

            var heroNode = this.getHost().getEntityNode();
            var x = heroNode.position.x +      200 * Math.cos(angle / 180 * Math.PI);
            var y = heroNode.position.y + 40 + 200 * Math.sin(angle / 180 * Math.PI);
            
            bullet.getNode().setPosition(x,y);
        }
    }



    
}
