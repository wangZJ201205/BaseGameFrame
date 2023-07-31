/**
 * 冰球
 */

import ClientDef from "../../common/ClientDef";
import { Logger } from "../../common/log/Logger";
import Entity from "../../ghost/Entity";
import GhostMgr from "../../manager/GhostMgr";
import BulletParent from "../BulletParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderRayBullet extends BulletParent {

    private tgtEntity : Entity = null;

    restart()
    {
        super.restart();

        var length = GhostMgr.Instance.entitys.length;
        var rand = Math.floor(Math.random()*length);
        var entity = GhostMgr.Instance.entitys[rand];
        if( entity == this._host.getHost() )
        {
            //动画结束
            this.stop();
            return;
        }
        else if( !entity.isLife() )
        {
            this.stop();
            return;
        }

        this.tgtEntity = entity;
        this.getNode().position = entity.position;
    }

    onFinished()
    {
        //动画结束
        this.stop();
        if(!this.tgtEntity.isLife())
        {
            return false;
        }
        if(this.tgtEntity.getCProp(ClientDef.ENTITY_PROP_STATE) == ClientDef.ENTITY_STATE_DIE) //死亡状态不触发响应
        {
            return false;
        }

        this.tgtEntity.getGene().addGene(this._bulletInfo.gene);
        
    }

}
