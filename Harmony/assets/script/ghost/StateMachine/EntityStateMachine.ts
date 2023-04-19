import ClientDef from "../../common/ClientDef";
import Entity from "../Entity";
import StateParent from "./StateParent";
import EntityIdle from "./States/EntityIdle";
import EntityWalk from "./States/EntityWalk";
import PlayerIdle from "./States/PlayerIdle";
import PlayerWalk from "./States/PlayerWalk";

/**
 * 对象状态机
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityStateMachine{

    _state_list:number[];//状态列表
    _curState : StateParent;
    _host:Entity;

    onLoad (host) 
    {
        this._host = host;
        this._state_list = [];
    }

    start () {

    }

    getHost()
    {
        return this._host
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
        var state = this._state_list[0];
        this._state_list.splice(0,1);
        return state;
    }

    //运行状态
    runNextState()
    {
        var state = this.getNextState();
        if(this._curState)
        {
            this._curState.stop();
            if(this._curState.getStateID() == state) //重新初始化
            {
                this._curState.start();
                return;
            }
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
        if(state == ClientDef.ENTITY_STATE_IDLE){return new EntityIdle(); }
        else if(state == ClientDef.ENTITY_STATE_WALK){return new EntityWalk(); }
        return null;
    }

    addState(state)
    {
        this._state_list.push(state);
    }

    update () 
    {
        if(this._curState)
        {
            this._curState.update();
        }
    }
}
