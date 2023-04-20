/**
 * 对象管理
 */
import ClientDef from "../common/ClientDef";
import Entity from "../ghost/Entity";
import Player from "../ghost/Hero";
import ParentMgr from "./ParentMgr";

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

        var canvas = cc.director.getScene().getChildByName('Canvas');
        this.layer = new cc.Node();
        this.layer.zIndex = ClientDef.GAME_INDEX_GHOST;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = canvas;

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
            var findIndex = 0;
            for (let i = 0; i < this.entitys.length; i++) {
                const ele = this.entitys[i];
                if( ele == element )
                {
                    ele.remove();
                    findIndex = i;
                    break;
                }
            }
            this.entitys.splice(findIndex,1);
        }
        
    }

    /**
     * 生成对象
     * @param entityType  对象类型
     * @returns entity对象
     */
    spawnEntity(entityType)
    {
        var entity:Entity = new Entity();
        entity.onLoad();
        entity.setClientProp(ClientDef.ENTITY_PROP_TYPE,entityType);

        this.layer.addChild(entity);
        this.addEntity(entity)
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


}
