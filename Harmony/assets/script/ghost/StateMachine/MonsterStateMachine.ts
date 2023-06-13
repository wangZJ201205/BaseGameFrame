/**
 * 玩家状态机
 */

import ClientDef from "../../common/ClientDef";
import EntityStateMachine from "./EntityStateMachine";
import EntityDie from "./states/EntityDie";
import EntityIdle from "./states/EntityIdle";
import EntityWalk from "./states/EntityWalk";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MonsterStateMachine extends EntityStateMachine {

   
    getNextState()
    {
        var bloom = this.getHost().getClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM)
        if(bloom <= 0)
        {
            return ClientDef.ENTITY_STATE_DIE;
        }
        return ClientDef.ENTITY_STATE_WALK;
    }

    //生成状态
    spawnState(state)
    {
        if(state == ClientDef.ENTITY_STATE_IDLE){return new EntityIdle(); }
        else if(state == ClientDef.ENTITY_STATE_WALK){return new EntityWalk(); }
        else if(state == ClientDef.ENTITY_STATE_DIE){return new EntityDie(); }
        return null;
    }
    
    
}
