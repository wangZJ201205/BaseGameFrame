/**
 * 放毒 后期
 */
import ClientDef from "../../../common/ClientDef";
import SkillMgr from "../../../manager/SkillMgr";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionEndBullet extends BulletParent {

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
    }

    update (dt) 
    {
        super.update(dt);
        var delay = cc.director.getTotalTime() - this._delta;
        
        if(delay > this._bulletInfo["sustaintime"])
        {
            this.stop();
        }
    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        var damageValue = this.getDamageValue();
        other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );
        other.node.setClientProp(ClientDef.ENTITY_PROP_POSION_TIME,cc.director.getTotalTime())
    }

    //碰撞中
    collisionStay(other, self)
    {
        var delay = cc.director.getTotalTime() - other.node.getClientProp(ClientDef.ENTITY_PROP_POSION_TIME);
        if(delay >= this._bulletInfo["delayDamage"])
        {
            var damageValue = this.getDamageValue();
            other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );
            other.node.setClientProp(ClientDef.ENTITY_PROP_POSION_TIME,cc.director.getTotalTime())
        }
    }

}
