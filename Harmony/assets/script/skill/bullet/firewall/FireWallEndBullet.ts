/**
 * 火墙 后期
 */
import ClientDef from "../../../common/ClientDef";
import SkillMgr from "../../../manager/SkillMgr";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireWallEndBullet extends BulletParent {
    
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