/**
 * 以一个原点为子弹
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import GameMath from "../../utils/GameMath";
import SkillParent from "../SkillParent";



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
        this._angle = 0;

        // 缓存常用计算式
        for (var i = 0; i <= 360; i++) {
            var radian = i / 180 * Math.PI;
            this._cosCache[i] = Number((Math.cos(radian)).toFixed(2));
            this._sinCache[i] = Number((Math.sin(radian)).toFixed(2));
        }
    }

    //准备发射子弹
    perpareShootBullet()
    {   
        this._angle = 0;
        super.perpareShootBullet();
        for (let index = 0; index < this._bullets.length; index++) //先停止所有的正在运行的子弹
        {
            const bullet = this._bullets[index];
            bullet.stop();
        }


        //创建需要的子弹
        // var createCount = 0;
        // const sameTypeCount = this._bullets.filter(bullet => bullet.getProp(ClientDef.BULLET_PROP_STATICID) === this._staticId).length;

        // if(sameTypeCount >= bulletCount)
        // {
        //     createCount = this._bullets.filter(bullet => bullet.getProp(ClientDef.BULLET_PROP_STATE) == ClientDef.BULLET_STATE_FREE && 
        //     bullet.getProp(ClientDef.BULLET_PROP_STATICID) === this._staticId).length;
        // }
        // else
        // {
        //     createCount = bulletCount;   
        // }
    }
    
    //发射子弹
    shootBullet()
    {
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.restart();
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
            
            var x = heroNode.position.x +           radius * GameMath.getCosCache(angle);
            var y = heroNode.position.y + offsetY + radius * GameMath.getSinCache(angle);
            
            bullet.getNode().setPosition(x,y,0);
        }

    }



    
}
