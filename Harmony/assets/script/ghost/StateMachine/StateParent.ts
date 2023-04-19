import ClientDef from "../../common/ClientDef";
import Entity from "../Entity";


const {ccclass, property} = cc._decorator;

@ccclass
export default class StateParent {

    _stateID:number;
    _host:Entity;

    onLoad (id,host) 
    {
        this._host = host;
        this._stateID = id;
    }

    start () 
    {
        var cloth = this._host.getEntityComponent(ClientDef.ENTITY_COMP_CLOTH);
        cloth.runState(this._stateID);
    }

    stop()
    {

    }

    update () 
    {
        this.getHost().getStateMachine().runNextState();
    }

    getStateID()
    {
        return this._stateID;
    }

    getHost()
    {
        return this._host;
    }
}
