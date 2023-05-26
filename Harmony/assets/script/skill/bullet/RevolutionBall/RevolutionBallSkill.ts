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

    private _cosCache = {};
    private _sinCache = {};

    start () 
    {
        super.start();
        this._bulletClass = RevolutionBallBullet;
        this._angle = 0;

        // 缓存常用计算式
        for (var i = 0; i <= 360; i++) {
            var radian = i / 180 * Math.PI;
            this._cosCache[i] = Number((Math.cos(radian)).toFixed(2));
            this._sinCache[i] = Number((Math.sin(radian)).toFixed(2));
        }
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
            var bullet = this.spawnBullet();
            bullet.getNode().active = true;
            bullet.restart();
        }
    }

    update (dt) 
    {
        super.update(dt);

        this._delta++;
        if( this._delta < 6 )
        {
            return;
        }
        this._delta = 0;

        this._angle = (this._angle + 3) % 360; // 取模运算可以避免判断
        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        var heroNode = this.getHost().getEntityNode();
        
        var offsetY = GameData.Player_Height; // 子弹的高度偏移
        var radius:number = this._skillInfo["range"]; // 子弹的半径
        for (let index = 0; index < this._bullets.length; index++) {
            const bullet = this._bullets[index];
            if(bullet.getProp(ClientDef.BULLET_PROP_STATE) == ClientDef.BULLET_STATE_FREE)
            {
                continue;
            }
            var angle = ((360 / bulletCount) * index + this._angle)%360; // 直接使用角度公式计算子弹的角度
            
            var x = heroNode.position.x +           radius * this._cosCache[angle];
            var y = heroNode.position.y + offsetY + radius * this._sinCache[angle];
            
            bullet.getNode().setPosition(x,y,0);
        }

    }



    
}
