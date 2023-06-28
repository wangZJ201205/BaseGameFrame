/**
 * 落雷
 */

import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderBallBullet extends BulletParent {

    restart()
    {   
        super.restart();
        var bullet = this.spawnNextBullet();
        if(!bullet)return;
        bullet.getNode().active = true;
        bullet.getNode().position = this.getNode().position;
        bullet.restart();
    }
    
    onFinished()
    {
        //动画结束
        this.stop();
    }

}
