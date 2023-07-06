/**
 * 动画播放开始后，自动播放下一个动画
 */

import ClientDef from "../../common/ClientDef";
import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class  AnimationFinishPlayNextBBullet extends BulletParent {

    

    onFinished()
    {
        //动画结束
        this.stop();
        
        var bullet = this.spawnNextBullet();
        if(!bullet)return;
        bullet.getNode().active = true;
        bullet.getNode().position = this.getNode().position;
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE,this.getProp(ClientDef.BULLET_PROP_ANGLE));
        bullet.restart();
    }


}
