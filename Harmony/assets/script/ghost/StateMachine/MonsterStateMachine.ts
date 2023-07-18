/**
 * 玩家状态机
 */

import ClientDef from "../../common/ClientDef";
import EntityStateMachine from "./EntityStateMachine";
import EntityAttack from "./states/EntityAttack";
import EntityDie from "./states/EntityDie";
import EntityIdle from "./states/EntityIdle";
import EntityShapeShift from "./states/EntityShapeShift";
import EntityWalk from "./states/EntityWalk";
const {ccclass, property} = cc._decorator;

@ccclass
export default class MonsterStateMachine extends EntityStateMachine {

    onLoad (host) 
    {
        super.onLoad(host);
        this._stateModule[ClientDef.ENTITY_STATE_IDLE] = EntityIdle;
        this._stateModule[ClientDef.ENTITY_STATE_WALK] = EntityWalk;
        this._stateModule[ClientDef.ENTITY_STATE_DIE] = EntityDie;
        this._stateModule[ClientDef.ENTITY_STATE_ATTACK] = EntityAttack;
        this._stateModule[ClientDef.ENTITY_STATE_SHAPESHIFT] = EntityShapeShift;
        this._stateModule[ClientDef.ENTITY_STATE_SHAPESHIFT_WALK] = EntityWalk;
    }

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
    
}
