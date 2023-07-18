/**
 * 人物的死亡状态
 */

import ClientDef from "../../../common/ClientDef";
import { UIName } from "../../../common/UIName";
import UIMgr from "../../../manager/UIMgr";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerDie extends StateParent {

    start () 
    {
        UIMgr.Instance.openUI(UIName.VIEW_PLAY_ADVERTISE);
        this._host.getGene().removeGeneAfterDead();
    }

    stop()
    {

    }

    update (dt) 
    {   
        var bloom = this.getHost().getCProp(ClientDef.ENTITY_PROP_CUR_BLOOM)
        if(bloom > 0)
        {
            super.update(dt);
        }
        
    }
}
