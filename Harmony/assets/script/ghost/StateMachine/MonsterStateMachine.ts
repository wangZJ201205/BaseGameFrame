/**
 * 玩家状态机
 */

import ClientDef from "../../common/ClientDef";
import EntityStateMachine from "./EntityStateMachine";
import EntityAttack from "./states/EntityAttack";
import EntityDie from "./states/EntityDie";
import EntityIdle from "./states/EntityIdle";
import EntityWalk from "./states/EntityWalk";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MonsterStateMachine extends EntityStateMachine {


    getNextState()
    {
        if(this._state_list.length == 0)
        {
            return ClientDef.ENTITY_STATE_IDLE;
        }
        var state = this._state_list[0];
        this._state_list.splice(0,1);
        return state;
    }

    //生成状态
    spawnState(state)
    {
        if(state == ClientDef.ENTITY_STATE_IDLE){return new EntityIdle(); }
        else if(state == ClientDef.ENTITY_STATE_WALK){return new EntityWalk(); }
        else if(state == ClientDef.ENTITY_STATE_DIE){return new EntityDie(); }
        else if(state == ClientDef.ENTITY_STATE_ATTACK){return new EntityAttack(); }
        return null;
    }
    
    
}
