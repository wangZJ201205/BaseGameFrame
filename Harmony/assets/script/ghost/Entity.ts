import ClientDef from "../common/ClientDef";
import ClothComponent from "./Component/ClothComponent";
import EntityStateMachine from "./StateMachine/EntityStateMachine";

/**
 * 对象类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class Entity extends cc.Component 
{

   
    _client_prop_map:{}; //对象客户端属性
    _server_prop_map:{}; //对象服务器属性

    _entity_components:{}; //对象组件
    _entityStateMachine:EntityStateMachine; //对象状态机

    onLoad () 
    {
        this._client_prop_map = {};
        this._server_prop_map = {};
        this._entity_components = {};
    }

    start () {

        // this.node.setPosition(640,360);
        this._entityStateMachine = new EntityStateMachine();
        this._entityStateMachine.onLoad(this);

        var cloth = new ClothComponent();
        cloth.onLoad(this);
        this.addEntityComponent(ClientDef.ENTITY_COMP_CLOTH,cloth); //添加衣服组件


        this._entityStateMachine.runNextState();

    }

    remove()
    {

    }

    getEntityNode(){
        return this.node;
    }

    setClientProp(type,value)
    {
        this._client_prop_map[type] = value;

        if(type == ClientDef.ENTITY_PROP_DIR)
        {
            var cloth:ClothComponent = this._entity_components[ClientDef.ENTITY_COMP_CLOTH];
            if(cloth)
            {
                cloth.changeDir(value);
            }
        }

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

    //获取组件
    getEntityComponent(type)
    {
        return this._entity_components[type] || null;
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

    getStateMachine()
    {
        return this._entityStateMachine;
    }

    // update (dt) {}
}
