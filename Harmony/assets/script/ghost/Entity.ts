import ClientDef from "../common/ClientDef";
import ClothComponent from "./Component/ClothComponent";
import EntityStateMachine from "./StateMachine/EntityStateMachine";
import MonsterStateMachine from "./StateMachine/MonsterStateMachine";
import PlayerStateMachine from "./StateMachine/PlayerStateMachine";

/**
 * 对象类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class Entity extends cc.Node
{

   
    _client_prop_map:{}; //对象客户端属性
    _server_prop_map:{}; //对象服务器属性

    _entity_components:{}; //对象组件
    _entityStateMachine:EntityStateMachine; //对象状态机

    _timerID:number;

    onLoad () 
    {
        this._client_prop_map = {};
        this._server_prop_map = {};
        this._entity_components = {};

        
    }

    start () {
        
        this.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_RUN);
        this._entityStateMachine = this.spawnStateMachine();
        this._entityStateMachine.onLoad(this);

        var cloth = new ClothComponent();
        cloth.onLoad(this);
        this.addEntityComponent(ClientDef.ENTITY_COMP_CLOTH,cloth); //添加衣服组件

        this._entityStateMachine.start();

    }

    remove()
    {
        this.removeFromParent();
    }
    
    spawnStateMachine()
    {
        var entityType = this._client_prop_map[ClientDef.ENTITY_PROP_TYPE];
        var machine = null;
        if(entityType == ClientDef.ENTITY_TYPE_PLAYER)
        {
            machine = new PlayerStateMachine();
        }
        else if(entityType == ClientDef.ENTITY_TYPE_MONSTER)
        {
            machine = new MonsterStateMachine();
        }
        return machine;
    }

    getEntityNode(){
        return this;
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

    update (dt) 
    {
        if(this._entityStateMachine)
        {
            this._entityStateMachine.update(dt);
        }
    }
}
