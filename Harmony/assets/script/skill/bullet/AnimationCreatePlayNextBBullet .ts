/**
 * 动画播放完毕后，自动播放下一个动画
 */

import ClientDef from "../../common/ClientDef";
import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimationCreatePlayNextBBullet extends BulletParent {

    restart()
    {
        var bullet = this.spawnNextBullet();
        if(!bullet)return;
        bullet.getNode().active = true;
        bullet.getNode().position = this.getNode().position;
        bullet.setProp(ClientDef.BULLET_PROP_ANGLE,this.getProp(ClientDef.BULLET_PROP_ANGLE));
        bullet.restart();

        super.restart();
    }


    onFinished()
    {
        //动画结束
        this.stop();
        
        
    }


}
