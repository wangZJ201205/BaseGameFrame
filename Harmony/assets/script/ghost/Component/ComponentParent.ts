import ClientDef from "../../common/ClientDef";
import Entity from "../Entity";

/**
 * 人物组件父类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentParent{

    protected _host:Entity;
    protected _node:cc.Node;
    protected _state :number;

    onLoad (host) 
    {
        this._state = ClientDef.COMP_STATE_LOAD;
        this._host = host;
        this._node = new cc.Node();
        host.getEntityNode().addChild(this._node);
    }

    start () {
        this._state = ClientDef.COMP_STATE_START;
    }

    restart () {
        this._state = ClientDef.COMP_STATE_START;
    }

    remove()
    {
        this._state = ClientDef.COMP_STATE_REMOVE;
    }

    getHost()
    {
        return this._host;
    }

    getNode()
    {
        return this._node;
    }

    getState()
    {
        return this._state;
    }

    update (dt) 
    {

    }
}
