/**
 * 玩家状态机
 */

import ClientDef from "../../common/ClientDef";
import EntityStateMachine from "./EntityStateMachine";
import EntityIdle from "./states/EntityIdle";
import EntityWalk from "./states/EntityWalk";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MonsterStateMachine extends EntityStateMachine {

   
    getNextState()
    {
        return ClientDef.ENTITY_STATE_WALK;
        // return ClientDef.ENTITY_STATE_IDLE;
    }

    //生成状态
    spawnState(state)
    {
        if(state == ClientDef.ENTITY_STATE_IDLE){return new EntityIdle(); }
        else if(state == ClientDef.ENTITY_STATE_WALK){return new EntityWalk(); }
        return null;
    }

    
}
