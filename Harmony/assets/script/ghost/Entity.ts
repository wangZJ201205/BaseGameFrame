import ClientDef from "../common/ClientDef";
import ClothComponent from "./Component/ClothComponent";

/**
 * 对象类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class Entity extends cc.Component {

   
    _client_prop_map:{}; //对象客户端属性
    _server_prop_map:{}; //对象服务器属性

    _entity_components:{}; //对象组件

    onLoad () 
    {
        this._client_prop_map = {};
        this._server_prop_map = {};
        this._entity_components = {};
    }

    start () {

        
        this.addEntityComponent(ClientDef.ENTITY_COMP_CLOTH,(new ClothComponent()).onLoad(this.node)); //添加衣服组件
    
    }

    remove()
    {

    }

    setClientProp(type,value)
    {
        this._client_prop_map[type] = value;
    }

    getClientProp(type)
    {
        return this._client_prop_map[type] || null;
    }

    setServerProp(type,value)
    {
        this._server_prop_map[type] = value;
    }

    getServerProp(type)
    {
        return this._server_prop_map[type] || null;
    }

    addEntityComponent(type,component)
    {
        this._entity_components[type] = component;
    }

    delEntityComponent(type)
    {
        if(!this._entity_components[type])
        {
            return;
        }
        var component = this._entity_components[type];
        component.remove();
        component.parent = null;
        delete this._entity_components[type];
    }

    // update (dt) {}
}