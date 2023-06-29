/**
 * 人物的死亡状态
 */

import ClientDef from "../../../common/ClientDef";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerDie extends StateParent {

    start () 
    {
        
    }

    stop()
    {

    }

    update (dt) 
    {   
        var bloom = this.getHost().getClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM)
        if(bloom > 0)
        {
            super.update(dt);
        }
        
    }
}
