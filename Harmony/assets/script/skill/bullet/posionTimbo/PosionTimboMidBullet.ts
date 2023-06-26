/**
 * 毒树藤 后期
 */
import ClientDef from "../../../common/ClientDef";
import BulletParent from "../../BulletParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionTimboMidBullet extends BulletParent {

    private _delta:number = 0;
    private _runTime:number = 0;

    restart()
    {   
        this._delta = cc.director.getTotalTime();
        this._runTime = 0;
        super.restart();
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
        super.update(dt);
        var delay = cc.director.getTotalTime() - this._delta;
        if(delay > 100)
        {
            this._runTime++;
            this._delta = cc.director.getTotalTime();
        }
        else
        {
            return;
        }
        
        if( this._runTime*100 > this._bulletInfo["sustaintime"] )
        {
            this.stop();

            var bullet = this._host.spawnBullet(ClientDef.BULLET_PHASE_3);
            bullet.getNode().active = true;
            bullet.getNode().position = this.getNode().position;
            bullet.restart();
            this._runTime = 0;
        }

    }

    //碰撞开始
    collisionEnter(other, self)
    {   
        var damageValue = this.getDamageValue(other);
        other.node.setClientProp(ClientDef.ENTITY_PROP_POSION_TIME,cc.director.getTotalTime());
            if(damageValue == 0)return;
        other.node.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );
    }

    //碰撞中
    collisionStay(other, self)
    {
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
