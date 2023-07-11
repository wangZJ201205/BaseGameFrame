/**
 * 进入死亡状态
 */

import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import GhostMgr from "../../../manager/GhostMgr";
import ItemMgr from "../../../manager/ItemMgr";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityDie extends StateParent {

    private _delay : number;
    start () 
    {
        this._delay = cc.director.getTotalTime();
        super.start();
        this._host.getGene().removeGeneAfterDead();
    }

    update (dt) 
    {
        var durTime = cc.director.getTotalTime() - this._delay;
        if(durTime >= GameData.Entity_Dead_Time)
        {
            this.dropItem();
            this.getHost().stopAllActions();
            this.getHost().active = false;
            this.getHost().setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
        }
    }

    //掉落物品
    dropItem()
    {
        var entityInfo = this.getHost().getEntityDict();
        var dropItem = entityInfo['dropItem'];
        if( dropItem == null )
        {
            return;
        }

        var item = ItemMgr.Instance.spawnItem(Number(dropItem));
        // var item = GhostMgr.Instance.spawnItem(Number(dropItem));
        if(item)
        {
            item.restart();
            item.getEntityNode().setPosition(this.getHost().getEntityNode().position);
            GhostMgr.Instance.setEntityZOrder(item.getEntityNode());
        }
    }

    
    
}
