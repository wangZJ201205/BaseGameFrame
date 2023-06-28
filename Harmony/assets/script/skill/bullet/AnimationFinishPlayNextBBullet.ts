/**
 * 动画播放完毕后，自动播放下一个动画
 */

import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimationFinishPlayNextBBullet extends BulletParent {



    onFinished()
    {
        //动画结束
        this.stop();
        
        var bullet = this.spawnNextBullet();
        if(!bullet)return;
        bullet.getNode().active = true;
        bullet.getNode().position = this.getNode().position;
        bullet.restart();
    }


}
