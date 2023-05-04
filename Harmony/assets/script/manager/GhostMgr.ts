/**
 * 对象管理
 */
import ClientDef from "../common/ClientDef";
import Entity from "../ghost/Entity";
import Player from "../ghost/Hero";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GhostMgr extends ParentMgr {

    public static readonly Instance : GhostMgr = new GhostMgr();

    layer: cc.Node = null; //ui显示层
    entitys:Entity[];
    spawnEntityId:number = 0; //用来生成对象id
    private _timerID: number;

    static getInstance()
    {
        return GhostMgr.Instance;
    }

    onLoad () 
    {
        super.onLoad();
        this.entitys = [];
        console.info("load GhostMgr");
    }

    start () {
        console.info("start GhostMgr");

        // var canvas = cc.director.getScene().getChildByName('Canvas');
        this.layer = new cc.Node();
        this.layer.zIndex = ClientDef.SCENE_INDEX_GHOST;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = SceneMgr.Instance.getLayer();

        this._timerID = setInterval(this.update.bind(this), 0);
    }

    private update (dt) {
        
        const delta = cc.director.getDeltaTime();
        var needRemoveEntity = [];
        for (let index = 0; index < this.entitys.length; index++) {
            const element = this.entitys[index];
            if( element.getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_RUN )
            {
                element.update(delta);
            }
            else
            {
                needRemoveEntity.push(element);
            }
        }

        for (let index = 0; index < needRemoveEntity.length; index++) {
            const element = needRemoveEntity[index];
            var findIndex = -1;
            for (let i = 0; i < this.entitys.length; i++) {
                const ele = this.entitys[i];
                if( ele == element )
                {
                    var time = ele.getClientProp(ClientDef.ENTITY_PROP_WAIT_DESTROY_TIME) || 0;
                    ele.setClientProp(ClientDef.ENTITY_PROP_WAIT_DESTROY_TIME, time + 1);
                    if(time >= 100) //设定时间，10秒倒计时
                    {
                        ele.remove();
                        findIndex = i;
                    }
                    break;
                }
            }
            if(findIndex >= 0)
            {
                this.entitys.splice(findIndex,1);
            }
        }
        
    }

    /**
     * 生成对象
     * @param entityType  对象类型
     * @returns entity对象
     */
    spawnEntity(entityType)
    {
        var entity:Entity = null;
        
        //对象池中寻找闲置对象
        for (let index = 0; index < this.entitys.length; index++) {
            const element = this.entitys[index];
            if( element.getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_FREE  && 
                element.getClientProp(ClientDef.ENTITY_PROP_TYPE) == entityType) //判断状态和对象类型
            {
                entity = element;
                break;
            }
        }

        if (entity == null)
        {
            entity = new Entity();
            entity.onLoad();
            entity.setClientProp(ClientDef.ENTITY_PROP_TYPE,entityType);
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
        entity.setClientProp(ClientDef.ENTITY_PROP_ID,this.spawnEntityId); //设置它的ID
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

    foreachEntity(callback)
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

}
