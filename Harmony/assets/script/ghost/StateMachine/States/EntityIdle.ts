

import ClientDef from "../../../common/ClientDef";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityIdle extends StateParent {

    update (dt) 
    {
        if(this._host.getCProp(ClientDef.ENTITY_PROP_FROZEN) == 1)//冰冻效果
        {
            //不做任何处理
        }
        else
        {
            this.getHost().getStateMachine().addState(ClientDef.ENTITY_STATE_WALK);
            this.getHost().getStateMachine().runNextState();
        }
    }


    
}
