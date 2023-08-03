import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import GameHelp from "../help/GameHelp";
import ComponentMgr from "./component/ComponentMgr";
import EntityStateMachine from "./stateMachine/EntityStateMachine";

/**
 * 对象类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityParent extends cc.Node
{

    protected _client_prop_map:{[key:number] : any}; //对象客户端属性
    protected _server_prop_map:{}; //对象服务器属性

    protected _entityStateMachine:EntityStateMachine; //对象状态机
    protected _entityComponents:ComponentMgr;
    
    onLoad () 
    {
        this._client_prop_map = {};
        this._server_prop_map = {};

        this._entityComponents = this.spawnComponentMgr();
        this._entityComponents.onLoad(this);
        
        this.setCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_INIT);
    }

    //可以用于延迟加载
    //初始化一次
    start () 
    {
        this._entityComponents.start();
    }

    //反复初始化
    restart()
    {
        this.setCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_RUN);
        this.setCProp(ClientDef.ENTITY_PROP_WAIT_DESTROY_TIME, 0);
        this.setCProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT, 0);

        this.active = true;
        this._entityComponents.restart();        
    }

    remove()
    {
        if(this._entityComponents)
        {
            this._entityComponents.remove();
        }
        this.removeFromParent();
    }

    //随机位置
    randomEntityPosition()
    {
        var direction = GameHelp.calculateRandomDirection();
        var position = GameHelp.calculateSpawnPosition(direction);
        this.setPosition(position.x, position.y);
        this.zIndex = GameData.App_Game_Heigth - position.y;
    }

    //进入休息状态，等待被召唤
    restEntity()
    {
        this.active = false;
        this.setCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
    }

    spawnComponentMgr()
    {
        return new ComponentMgr();
    }

    spawnStateMachine()
    {
        return null;
    }

    getEntityNode(){
        return this;
    }

    setCProp(type,value)
    {
        this._client_prop_map[type] = value;
    }

    addCProp(type,value)
    {
        var curValue = this._client_prop_map[type] || 0;
        curValue = curValue + value
        this.setCProp(type,curValue)
    }

    getCProp(type)
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
            return this._entityComponents.get(type);
        }
        return null;
    }

    addEntityComponent(type)
    {
        this._entityComponents?.add(type);
    }

    rmvEntityComponent(type)
    {
        this._entityComponents?.del(type);
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
       
        if(this._entityComponents)
        {
            this._entityComponents.update(dt);
        }
        
    }

    getEntityDict()
    {
        return null;
    }

    //是否在运行
    isRun()
    {
        return this.getCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_RUN;
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
