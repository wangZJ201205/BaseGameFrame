import ClientDef from "../common/ClientDef";
import DictMgr from "../manager/DictMgr";
import Skill from "../skill/Skill";
import ComponentMgr from "./Component/ComponentMgr";
import ClothComponent from "./Component/children/ClothComponent";
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

    _entityStateMachine:EntityStateMachine; //对象状态机
    _entityComponents:ComponentMgr;
    _skill:Skill; //技能

    onLoad () 
    {
        this._client_prop_map = {};
        this._server_prop_map = {};
        
        this._skill = new Skill();
        this._skill.onLoad(this);

        this._entityComponents = new ComponentMgr();
        this._entityComponents.onLoad(this);

        this.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_INIT);
    }

    //可以用于延迟加载
    start () {
        
        this._skill.start();
        this._entityComponents.start();

        this._entityStateMachine = this.spawnStateMachine(); //此时才知道对象类型是什么
        this._entityStateMachine.onLoad(this);
        this._entityStateMachine.start();

    }

    restart()
    {
        this.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_RUN);
        this.active = true;
        this._entityComponents.restart();
        this._entityStateMachine.restart();
    }


    remove()
    {
        if(this._entityComponents)
        {
            this._entityComponents.remove();
        }
        if(this._skill)
        {
            this._skill.remove();
        }
        this.removeFromParent();
    }

    getSkill()
    {
        return this._skill;
    }
    
    spawnStateMachine()
    {
        if(this._entityStateMachine)
        {
            return this._entityStateMachine;
        }

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
            var cloth:ClothComponent = this.getEntityComponent(ClientDef.ENTITY_COMP_CLOTH);
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
        if(this._entityComponents)
        {
            return this._entityComponents.getEntityComponent(type);
        }
        return null;
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
        if(this._skill)
        {
            this._skill.update(dt);
        }
        if(this._entityComponents)
        {
            this._entityComponents.update(dt);
        }
    }

    //获取对象配置信息
    getEntityDict()
    {
        var entityInfo = DictMgr.Instance.getDictByName('entity_data');
        entityInfo = entityInfo[this.getClientProp(ClientDef.ENTITY_PROP_STATICID)];
        return entityInfo;
    }


}
