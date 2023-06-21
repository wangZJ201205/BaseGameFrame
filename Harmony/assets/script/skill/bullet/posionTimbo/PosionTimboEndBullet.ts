/**
 * 毒树藤 后期
 */
import ClientDef from "../../../common/ClientDef";
import SkillMgr from "../../../manager/SkillMgr";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionTimboEndBullet extends BulletParent {

    private _delta:number = 0;
    private _state:number = 0;
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
        this._state = 1
        if(this.getNode().children[0])
        {
            var anim = this.getNode().children[0].getComponent(cc.Animation);
            let curClip = anim.getClips()[0];
            anim.resume(curClip.name);
            anim.play(curClip.name);
        }
    }

    update (dt) 
    {
        super.update(dt);
        var delay = cc.director.getTotalTime() - this._delta;
        
        if(delay > this._bulletInfo["sustaintime"] && this._state == 1) //播放动画
        {
            this._state = 2;
            this._delta = cc.director.getTotalTime();
            var anim = this.getNode().children[0].getComponent(cc.Animation);
            let curClip = anim.getClips()[1];
            anim.resume(curClip.name);
            anim.play(curClip.name);
            delay = 0;
        }

        if(delay > 200 && this._state == 2)
        {
            this.stop();
        }

    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        if(this._state == 2)return;
        var damageValue = this.getDamageValue(other);
        other.node.setClientProp(ClientDef.ENTITY_PROP_POSION_TIME,cc.director.getTotalTime());
            if(damageValue == 0)return;
        other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );
    }

    //碰撞中
    collisionStay(other, self)
    {
        if(this._state == 2)return;
        var delay = cc.director.getTotalTime() - other.node.getClientProp(ClientDef.ENTITY_PROP_POSION_TIME);
        if(delay >= this._bulletInfo["delayDamage"])
        {
            var damageValue = this.getDamageValue(other);
            other.node.setClientProp(ClientDef.ENTITY_PROP_POSION_TIME,cc.director.getTotalTime());
            if(damageValue == 0)return;
            other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );
        }
    }

}
