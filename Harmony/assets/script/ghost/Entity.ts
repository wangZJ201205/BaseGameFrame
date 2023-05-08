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

    //可能是重载
    start () {
        
        this.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_RUN);

        this._skill.start();
        this._entityComponents.start();

        this._entityStateMachine = this.spawnStateMachine(); //此时才知道对象类型是什么
        this._entityStateMachine.onLoad(this);
        this._entityStateMachine.start();

        this.active = true;

        

        //测试碰撞检测
        var boxColl = this.addComponent(cc.BoxCollider);

        var entityType = this._client_prop_map[ClientDef.ENTITY_PROP_TYPE];
        if(entityType == ClientDef.ENTITY_TYPE_PLAYER)
        {
            this.group = ClientDef.COLLISION_GROUP_PLAYER;
            boxColl.size.width = 48;
            boxColl.size.height = 111;
            boxColl.offset.x = -2;
            boxColl.offset.y = 60;
            this._skill.addSkill(20001);
        }
        else if(entityType == ClientDef.ENTITY_TYPE_MONSTER)
        {
            this.group = ClientDef.COLLISION_GROUP_MONSTER;
            boxColl.size.width = 50;
            boxColl.size.height = 50;
            // boxColl.offset.x = -2;
            boxColl.offset.y = 25;
        }
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
