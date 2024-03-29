/**
 * 对象管理
 */
import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Entity from "../ghost/Entity";
import EntityParent from "../ghost/EntityParent";
import GameHelp from "../help/GameHelp";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GhostMgr extends ParentMgr {

    public static readonly Instance : GhostMgr = new GhostMgr();

    layer: cc.Node = null; //ui显示层
    entitys:Array<Entity>;
    spawnEntityId:number = 0; //用来生成对象id
    private _timerID: number;
    private _typeClass : {};

    onLoad () 
    {
        super.onLoad();
        this.entitys = [];
        this._typeClass = {};
        console.info("load GhostMgr");
    }

    start () {
        console.info("start GhostMgr");

        this.layer = new cc.Node();
        this.layer.zIndex = ClientDef.SCENE_INDEX_GHOST;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = SceneMgr.Instance.getLayer();

        this._timerID = setInterval(this.update.bind(this), 0);

        this._typeClass[ClientDef.ENTITY_TYPE_PLAYER ] = Entity;
        this._typeClass[ClientDef.ENTITY_TYPE_MONSTER ] = Entity;
    }

    clear(): void 
    {
        for (let index = 0; index < this.entitys.length; index++) {
            const entity = this.entitys[index];
            entity.restEntity();
        }    
        this.spawnEntityId = 0;
    }

    private update (dt) {
        
        if(GameHelp.GetGamePauseState())
        {
            return;
        }
        // Logger.start("ghostmgr > update");
        const delta = cc.director.getDeltaTime();

        this.entitys = this.entitys.filter((entity)=>
        {
            if( entity.getCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_RUN )
            {
                entity.update(delta);
            }
            else
            {
                var time = entity.getCProp(ClientDef.ENTITY_PROP_WAIT_DESTROY_TIME) || 0;
                entity.setCProp(ClientDef.ENTITY_PROP_WAIT_DESTROY_TIME, time + 1);
                if(time >= 100) //设定时间，10秒倒计时
                {
                    entity.remove();
                    return false;
                }
            }
            return true;
        });

        // Logger.end("ghostmgr > update");
    }

    /**
     * 生成对象
     * @param entityStaticID  对象配置ID
     * @returns entity对象
     */
    spawnEntity(entityStaticID)
    {
        var entity:Entity = null;
        var entityType = Math.floor(entityStaticID / 100000)
        //对象池中寻找闲置对象
        for (let index = 0; index < this.entitys.length; index++) {
            const element = this.entitys[index];
            if( element.getCProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_FREE  && 
                element.getCProp(ClientDef.ENTITY_PROP_STATICID) == entityStaticID) //判断状态和对象类型
            {
                entity = element;
                break;
            }
        }

        if (entity == null)
        {
            entity = new (this._typeClass[entityType])();
            entity.onLoad();
            entity.setCProp(ClientDef.ENTITY_PROP_TYPE,entityType);
            entity.setCProp(ClientDef.ENTITY_PROP_STATICID, entityStaticID);
            entity.start();
            this.layer.addChild(entity);
            this.addEntity(entity)
        }
        
        return entity;
    }

    /**
     * 放入对象池
     * @param entity 对象
     */
    private addEntity(entity)
    {
        this.spawnEntityId++;
        entity.name = "entity"+this.spawnEntityId;
        entity.setCProp(ClientDef.ENTITY_PROP_ID,this.spawnEntityId); //设置它的ID
        this.entitys.push(entity);
    }


    /**
     * 删除所有对象
     */
    deleteAllEntity()
    {
        for (let i = 0; i < this.entitys.length; i++) {
            const element = this.entitys[i];
            element.remove();
        }
        this.layer.removeAllChildren();
        this.entitys = [];
    }

    getLayer()
    {
        return this.layer;
    }

    foreach(callback)
    {
        for (let i = 0; i < this.entitys.length; i++) {
            const element = this.entitys[i];
            var notcontinue = callback(element);
            if(notcontinue)
            {
                break;
            }
        }
    }

    setEntityZOrder(node)
    {
        if(!node)return;
        node.zIndex = GameData.App_Game_Heigth -(GameData.App_Game_Heigth/2 + node.position.y);//更新对象的深度
    }
}
