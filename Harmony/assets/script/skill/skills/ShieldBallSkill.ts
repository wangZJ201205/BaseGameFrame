/**
 * 护盾
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import SkillParent from "../SkillParent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class ShieldBallSkill extends SkillParent {

    start () 
    {
        super.start();

        //暂停所有已经存在的护盾
        for (let index = 0; index < this._bullets.length; index++) {
            const bullet = this._bullets[index];
            bullet.stop();
        }

        this.shootBullet();
    }

    //对update重写
    update (dt) 
    {
        for (let index = 0; index < this._bullets.length; index++) {
            const element = this._bullets[index];
            if( element.getProp(ClientDef.BULLET_PROP_STATE) == ClientDef.BULLET_STATE_RUN )
            {
                element.update(dt);
            }
        }
        this.checkOldBullet();
    }

    //发射子弹
    shootBullet()
    {
        var heroPosition = this._host.position;
        var x =  heroPosition.x;
        var y =  heroPosition.y + GameData.Player_Height;
    
        var bullet = this.spawnBullet(this._skillInfo["spawnBullet"] );
        bullet.getNode().active = true;
        bullet.getNode().position = cc.v3(x,y,0);
        bullet.restart();
    }
    
}
