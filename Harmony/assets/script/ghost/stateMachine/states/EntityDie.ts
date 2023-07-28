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

        this.dropItem();
    }

    update (dt) 
    {
        var durTime = cc.director.getTotalTime() - this._delay;
        if(durTime >= GameData.Entity_Dead_Time)
        {
            this.getHost().stopAllActions();
            this.getHost().active = false;
            this.getHost().setCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
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

        var dropItems = dropItem.split(",");
        for (let index = 0; index < Number(dropItems[1]); index++) 
        {
            var item = ItemMgr.Instance.spawnItem(Number(dropItems[0]));
            if(item)
            {
                item.restart();
                var position = this.getHost().getEntityNode().position;
                position.x += Math.floor(index / 4) * 30;
                position.y += Math.floor(index % 4) * 30;
                item.getEntityNode().setPosition(position);
                GhostMgr.Instance.setEntityZOrder(item.getEntityNode());
            }
        }
        
    }

    
    
}
