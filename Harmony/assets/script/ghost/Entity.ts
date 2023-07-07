import ClientDef from "../common/ClientDef";
import DictMgr from "../manager/DictMgr";
import Skill from "../skill/Skill";
import ClothComponent from "./component/children/ClothComponent";
import ComponentMgr from "./component/ComponentMgr";
import GeneMgr from "./gene/GeneMgr";
import EntityStateMachine from "./stateMachine/EntityStateMachine";
import MonsterStateMachine from "./stateMachine/MonsterStateMachine";
import PlayerStateMachine from "./stateMachine/PlayerStateMachine";

/**
 * 对象类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class Entity extends cc.Node
{

   
    protected _client_prop_map:{}; //对象客户端属性
    protected _server_prop_map:{}; //对象服务器属性

    private _entityStateMachine:EntityStateMachine; //对象状态机
    private _entityComponents:ComponentMgr;
    private _skill:Skill; //技能
    private _gene:GeneMgr; //基因管理

    onLoad () 
    {
        this._client_prop_map = {};
        this._server_prop_map = {};
        
        this._skill = new Skill();
        this._skill.onLoad(this);

        this._entityComponents = new ComponentMgr();
        this._entityComponents.onLoad(this);

        this._gene = new GeneMgr();
        this._gene.onLoad(this);

        this.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_INIT);
    }

    //可以用于延迟加载
    //初始化一次
    start () {
        
        this._skill.start();
        this._entityComponents.start();
        this._gene.start();

        this._entityStateMachine = this.spawnStateMachine(); //此时才知道对象类型是什么
        this._entityStateMachine.onLoad(this);
        this._entityStateMachine.start();

        var entityInfo = this.getEntityDict();

        this.setClientProp(ClientDef.ENTITY_PROP_MOVE_SPEED, entityInfo.moveSpeed);
    }

    //反复初始化
    restart()
    {
        this.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_RUN);
        this.setClientProp(ClientDef.ENTITY_PROP_WAIT_DESTROY_TIME, 0);
        this.setClientProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT, 0);

        this.active = true;
        this._entityComponents.restart();
        this._entityStateMachine.restart();
        this._gene.restart();
        
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
        if(this._gene)
        {
            this._gene.remove();
        }
        this.removeFromParent();
    }

    //进入休息状态，等待被召唤
    restEntity()
    {
        this.active = false;
        this.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
    }

    getSkill()
    {
        return this._skill;
    }

    getGene()
    {
        return this._gene;
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
    }

    addClientProp(type,value)
    {
        var curValue = this._client_prop_map[type];
        this.setClientProp(type,value + curValue)
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
        if(this._gene)
        {
            this._gene.update(dt);
        }
    }

    //获取对象配置信息
    getEntityDict()
    {
        var entityInfo = DictMgr.Instance.getDictByName('entity_data');
        entityInfo = entityInfo[this.getClientProp(ClientDef.ENTITY_PROP_STATICID)];
        return entityInfo;
    }

    //是否在运行
    isRun()
    {
        return this.getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_RUN;
    }

    isHero()
    {
        return this.getClientProp(ClientDef.ENTITY_PROP_TYPE) == ClientDef.ENTITY_TYPE_PLAYER;
    }

    isMonster()
    {
        return this.getClientProp(ClientDef.ENTITY_PROP_TYPE) == ClientDef.ENTITY_TYPE_MONSTER;
    }

    isLife()
    {
        return this.getClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM) > 0;
    }

    //更新下一个状态
    refreshEntityState()
    {
        if(this._entityStateMachine)
        {
            this._entityStateMachine.runNextState();
        }
    }
    //添加状态
    addEntityState(state)
    {
        if(this._entityStateMachine)
        {
            this._entityStateMachine.addState(state);
        }
    }

}
