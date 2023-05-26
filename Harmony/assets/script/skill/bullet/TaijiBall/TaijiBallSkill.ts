/**
 * 像太极一样转动的s曲线
 */

import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../../ghost/Hero";
import SkillParent from "../../SkillParent";
import TaijiBallBullet from "./TaijiBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaijiBallSkill extends SkillParent {

    private _angle:number;
    private _delta : number;

    private _cosCache = {};
    private _sinCache = {};

    start () 
    {
        super.start();
        this._bulletClass = TaijiBallBullet;
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
        this._angle = 0;
        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        
        for (let index = 0; index < this._bullets.length; index++) //先停止所有的正在运行的子弹
        {
            const bullet = this._bullets[index];
            bullet.stop();
        }

        for (let index = 0; index < bulletCount; index++) {
            var bullet = this.spawnBullet();
            bullet.getNode().active = true;
            bullet.restart();
        }
    }

    update (dt) 
    {
        super.update(dt);

        this._delta++;
        if( this._delta < 6 ) //6是随便写的值没有意义，只是减缓心跳
        {
            return;
        }
        this._delta = 0;

        var speed = this._skillInfo["speed"] ; // 子弹的速度
        this._angle = (this._angle + speed) ; // 取模运算可以避免判断
        var bulletCount = this.getProp(ClientDef.SKILL_PROP_COUNT);
        var heroNode = this.getHost().getEntityNode();
        
        var offsetY = GameData.Player_Height; // 子弹的高度偏移
        for (let index = 0; index < this._bullets.length; index++) {
            const bullet = this._bullets[index];
            if(bullet.getProp(ClientDef.BULLET_PROP_STATE) == ClientDef.BULLET_STATE_FREE)
            {
                continue;
            }
            var angle = ((360 / bulletCount) * index + this._angle) % 360; // 直接使用角度公式计算子弹的角度
            var rang = (bullet as TaijiBallBullet).getRadius();
            var x = heroNode.position.x +            rang*this._cosCache[angle];
            var y = heroNode.position.y + offsetY +  rang*this._sinCache[angle];
            bullet.getNode().setPosition(x,y,0);
            if( this._angle >= 270 )
            {
                bullet.stop();
            }
        }
    }



    
}
