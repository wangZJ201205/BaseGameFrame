

import ClientDef from "../../../common/ClientDef";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityIdle extends StateParent {

    update (dt) 
    {
        this.getHost().getStateMachine().addState(ClientDef.ENTITY_STATE_WALK);
        this.getHost().getStateMachine().runNextState();
    }


    
}
