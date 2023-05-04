import Entity from "../Entity";

/**
 * 人物组件父类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentParent{

    protected _host:Entity;
    protected _node:cc.Node;

    onLoad (host) 
    {
        this._host = host;
        this._node = new cc.Node();
        host.getEntityNode().addChild(this._node);
    }

    start () {

    }

    remove()
    {

    }

    getHost()
    {
        return this._host;
    }

    getNode()
    {
        return this._node;
    }

    update (dt) 
    {

    }
}
