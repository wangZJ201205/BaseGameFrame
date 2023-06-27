/**
 * 动画播放完成后停止子弹
 */

import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StopAfterAnimationFinishBullet extends BulletParent {


    onFinished()
    {
        //动画结束
        this.stop();
    }

}
