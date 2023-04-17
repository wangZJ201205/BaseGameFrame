import ClientDef from "../../common/ClientDef";
import Entity from "../Entity";
import StateParent from "./StateParent";
import PlayerIdle from "./States/PlayerIdle";
import PlayerWalk from "./States/PlayerWalk";

/**
 * 对象状态机
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityStateMachine{

    _state_list:[];//状态列表
    _curState : StateParent;
    _host:Entity;

    onLoad (host) 
    {
        this._host = host;
        this._state_list = [];
    }

    start () {

    }

    //获取状态id
    getStateID()
    {
        return this._curState.getStateID();
    }

    //获取下一个状态
    getNextState()
    {
        if(this._state_list.length == 0)
        {
            return ClientDef.ENTITY_STATE_IDLE;
        }

    }

    //运行状态
    runNextState()
    {
        var state = this.getNextState();
        if(this._curState)
        {
            this._curState.destory();
            this._curState = null;
        }
        this._curState = this.spawnState(state);
        if(this._curState)
        {
            this._curState.onLoad(state,this._host);
            this._curState.start();
        }
    }

    //生成状态
    spawnState(state)
    {
        if(this._host.getClientProp(ClientDef.ENTITY_PROP_TYPE) == ClientDef.ENTITY_TYPE_PLAYER)
        {
            if(state == ClientDef.ENTITY_STATE_IDLE){return new PlayerIdle(); }
            else if(state == ClientDef.ENTITY_STATE_WALK){return new PlayerWalk(); }
        }
        return null;
    }

    // update (dt) {}
}