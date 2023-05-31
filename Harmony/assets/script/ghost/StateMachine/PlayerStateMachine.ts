/**
 * 玩家状态机
 */

import ClientDef from "../../common/ClientDef";
import EntityStateMachine from "./EntityStateMachine";
import StateParent from "./StateParent";
import PlayerIdle from "./states/PlayerIdle";
import PlayerWalk from "./states/PlayerWalk";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerStateMachine extends EntityStateMachine {

    
    getNextState()
    {
        var controlType = this.getHost().getClientProp(ClientDef.ENTITY_PROP_CONTROL_STATE);
        var newState = 0;
        if(controlType == ClientDef.PLAYER_CONTROL_TYPE_ROCK)
        {
            newState = ClientDef.ENTITY_STATE_WALK;
        }
        else
        {
            newState = ClientDef.ENTITY_STATE_IDLE;
        }
        return newState;
    }

    //生成状态
    spawnState(state)
    {
        if(state == ClientDef.ENTITY_STATE_IDLE){return new PlayerIdle(); }
        else if(state == ClientDef.ENTITY_STATE_WALK){return new PlayerWalk(); }
        return null;
    }

    
}
