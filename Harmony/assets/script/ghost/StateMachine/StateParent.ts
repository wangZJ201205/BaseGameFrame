import ClientDef from "../../common/ClientDef";
import EntityParent from "../EntityParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class StateParent {

    _stateID:number;
    _host:EntityParent;

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

    update (dt) 
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
