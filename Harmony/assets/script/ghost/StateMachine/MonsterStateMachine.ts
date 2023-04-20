/**
 * 玩家状态机
 */

import ClientDef from "../../common/ClientDef";
import Entity from "../Entity";
import EntityStateMachine from "./EntityStateMachine";
import StateParent from "./StateParent";
import EntityIdle from "./States/EntityIdle";
import EntityWalk from "./States/EntityWalk";
import PlayerIdle from "./States/PlayerIdle";
import PlayerWalk from "./States/PlayerWalk";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MonsterStateMachine extends EntityStateMachine {

    onLoad (host) 
    {
        super.onLoad(host);
    }

    start () 
    {
        super.start();
    }

    getNextState()
    {
        
        return ClientDef.ENTITY_STATE_WALK;
    }

    //生成状态
    spawnState(state)
    {
        if(state == ClientDef.ENTITY_STATE_IDLE){return new EntityIdle(); }
        else if(state == ClientDef.ENTITY_STATE_WALK){return new EntityWalk(); }
        return null;
    }

    
}
