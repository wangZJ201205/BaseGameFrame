/**
 * 火墙 前期
 */

import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FireWallPrevBullet extends BulletParent {

    restart(){
        var anipref = this.getNode().children[0];
        if(anipref)
        {
            var anim = anipref.getComponent(cc.Animation); //添加自动播放对应的动画
            anim.resume(this._bulletInfo.src);
            anim.play(this._bulletInfo.src);
        }
        super.restart();
    }

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
