/**
 * 毒树藤 后期
 */

import BulletParent from "../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionTimboEndBullet extends BulletParent {

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

    }

}
