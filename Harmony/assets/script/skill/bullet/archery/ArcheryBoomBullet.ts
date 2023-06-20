/**
 * 射箭爆炸
 */
import ClientDef from "../../../common/ClientDef";
import SkillMgr from "../../../manager/SkillMgr";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ArcheryBoomBullet extends BulletParent {

    private _delta:number = 0;

    onLoad (host) 
    {
        this._host = host;
        this._prop = {};

        this._node = new cc.Node();
        SkillMgr.Instance.getLayerLow().addChild(this._node);

        this.setProp(ClientDef.BULLET_PROP_STATE,ClientDef.BULLET_STATE_FREE);
    }

    restart()
    {   
        this._delta = cc.director.getTotalTime();
        super.restart();

        if(this.getNode().children[0])
        {
            var anim = this.getNode().children[0].getComponent(cc.Animation);
            let curClip = anim.getClips()[0];
            anim.resume(curClip.name);
            anim.play(curClip.name);
            // anim.on('finished',  this.onFinished,    this);
        }
    }

    // stop()
    // {
    //     super.stop();
    //     if(this.getNode().children[0])
    //     {
    //         var anim = this.getNode().children[0].getComponent(cc.Animation);
    //         anim.off('finished',  this.onFinished,    this);
    //     }
    // }

    // onFinished()
    // {
    //     this.stop();
    // }

    update (dt) 
    {
        super.update(dt);
        var delta = cc.director.getTotalTime() - this._delta;
        if( delta >= 700 )
        {
            this.stop();
        }
    }

}
