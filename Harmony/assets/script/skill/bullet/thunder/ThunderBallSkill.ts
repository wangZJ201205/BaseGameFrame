/**
 * 以一个原点为子弹
 */

import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../../ghost/Hero";
import GhostMgr from "../../../manager/GhostMgr";
import LoadMgr from "../../../manager/LoadMgr";
import GameMath from "../../../utils/GameMath";
import SkillParent from "../../SkillParent";
import ThunderBallBullet from "./ThunderBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderBallSkill extends SkillParent {

    // _angle : number = 0;

    start () 
    {
        super.start();
        this._shootTime = 10;
    }

    //发射子弹
    shootBullet()
    {
        // this._angle += 10;
        // this._angle = this._angle >= 360 ? 0 : this._angle;
        var heroPosition = Hero.Instance.getEntity().position;
        var x = Math.random() * GameData.App_Game_Width + heroPosition.x - GameData.App_Game_Width / 2;
        var y = Math.random() * GameData.App_Game_Heigth + heroPosition.y - GameData.App_Game_Heigth / 2;
    
        var bullet = this.spawnBullet();
        bullet.getNode().active = true;
        bullet.getNode().position = cc.v3(x,y,0);
        // bullet.setProp(ClientDef.BULLET_PROP_ANGLE,this._angle);
        bullet.restart();
    }

    spawnBullet()
    {
        var bullet = super.spawnBullet(); //寻找闲置的子弹
        if(bullet)
        {
            return bullet;
        }
        
        bullet = new ThunderBallBullet();
        bullet.onLoad(this);
        bullet.setProp(ClientDef.BULLET_PROP_STATICID , this.getStaticId());
        bullet.start();
        this._bullets.push(bullet);
        return bullet;
    }
    

    


}
