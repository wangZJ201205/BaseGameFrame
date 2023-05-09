/**
 * 以一个原点为子弹
 */

import ClientDef from "../../../common/ClientDef";
import GhostMgr from "../../../manager/GhostMgr";
import LoadMgr from "../../../manager/LoadMgr";
import GameMath from "../../../utils/GameMath";
import SkillParent from "../../SkillParent";
import FireBallBullet from "./FireBallBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBallSkill extends SkillParent {

    _index : number = 0;

    //发射子弹
    shootBullet()
    {
        var bullet = this.spawnBullet();
        bullet.getNode().active = true;
        bullet.getNode().position = this.getHost().position;
        bullet.restart();
    }

    spawnBullet()
    {
        var bullet = super.spawnBullet(); //寻找闲置的子弹
        if(bullet)
        {
            return bullet;
        }
        
        bullet = new FireBallBullet();
        bullet.onLoad(this);
        bullet.setProp(ClientDef.BULLET_PROP_STATICID , this.getStaticId());
        bullet.setProp(ClientDef.BULLET_PROP_ID , this._bullets.length);
        bullet.start();
        this._bullets.push(bullet);
        return bullet;
    }
    

    


}
