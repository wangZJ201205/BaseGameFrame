import ClientDef from "../../common/ClientDef";
import Entity from "../Entity";
import StateParent from "./StateParent";
/**
 * 对象状态机
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityStateMachine{

    _state_list:number[];//状态列表
    _curState : StateParent;
    _host:Entity;
    _stateModule:Map<number,StateParent>;

    onLoad (host) 
    {
        this._host = host;
        this._state_list = [];
        this._stateModule = new Map<number,StateParent>();
    }

    start () 
    {    
    }

    restart()
    {
        this.runNextState();
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
        return null;
    }

    //运行状态
    runNextState()
    {
        var state = this.getNextState();
        
        if(state == null)
        {
            return; //没有状态
        }

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
        this._host.setCProp(ClientDef.ENTITY_PROP_STATE,state); //对象状态
        
        if(this._curState)
        {
            this._curState.onLoad(state,this._host);
            this._curState.start();
        }
    }

    //生成状态
    spawnState(state)
    {
        var stateClass = this._stateModule[state];
        if(stateClass)
        {
            return new stateClass();
        }
        return null;
    }

    addState(state)
    {
        this._state_list.push(state);
    }

    update (dt) 
    {
        if(this._curState)
        {
            this._curState.update(dt);
        }
    }
}
