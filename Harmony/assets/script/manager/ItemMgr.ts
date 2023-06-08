/**
 * 对象管理
 */
import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Item from "../ghost/Item";
import GameHelp from "../help/GameHelp";
import GhostMgr from "./GhostMgr";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemMgr extends ParentMgr {

    public static readonly Instance : ItemMgr = new ItemMgr();

    private _layer: cc.Node = null; //引用的ghostMgr对象层级
    private _items:Item[];
    private spawnItemId:number = 0; //用来生成对象id
    private _timerID: number;

    onLoad () 
    {
        super.onLoad();
        this._items = [];
        console.info("load ItemMgr");
    }

    start () {
        console.info("start ItemMgr");

        this._layer = new cc.Node();
        this._layer.zIndex = ClientDef.SCENE_INDEX_ITEM;
        this._layer.width = cc.winSize.width;
        this._layer.height = cc.winSize.height;
        this._layer.parent = SceneMgr.Instance.getLayer();

        this._timerID = setInterval(this.update.bind(this), 1000);
    }

    clear()
    {
        for (let index = 0; index < this._items.length; index++) {
            const element = this._items[index];
            element.restEntity();
        }
        this.spawnItemId = 0;
    }

    private update (dt) {
        
        if(GameHelp.GetGamePauseState())
        {
            return;
        }

        const delta = cc.director.getDeltaTime();
        this._items = this._items.filter((element) => {
            if (element.getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) === ClientDef.ENTITY_ACTIVE_STATE_RUN) 
            {
              element.update(delta);
              return true;
            } else {
              var time = element.getClientProp(ClientDef.ENTITY_PROP_WAIT_DESTROY_TIME) || 0;
              element.setClientProp(ClientDef.ENTITY_PROP_WAIT_DESTROY_TIME, time + 1);
              if (time >= 10) { // 设定时间，10秒倒计时
                element.remove();
                return false;
              }
              return true;
            }
        });
        // console.info(">>>>>>>item count : " + this._items.length + "  >>time = " + cc.director.getTotalTime());
    }

    /**
     * 生成对象
     * @param itemStaticID  对象配置ID
     * @returns item
     */
    spawnItem(itemStaticID)
    {
        var item:Item = null;
        var itemType = ClientDef.ENTITY_TYPE_ITEM;
        
        //对象池中寻找闲置对象
        for (let index = 0; index < this._items.length; index++) {
            const element = this._items[index];
            if( element.getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_FREE) //判断状态和对象类型
            {
                item = element;
                break;
            }
        }

        if(this._items.length > GameData.Item_Max_Count ) //当达到最大物品数量时不在生成物品
        {
            return null;
        }

        if (item == null)
        {
            item = new Item();
            item.onLoad();
            item.setClientProp(ClientDef.ENTITY_PROP_TYPE,itemType);
            item.setClientProp(ClientDef.ENTITY_PROP_STATICID,"" + itemStaticID);
            item.start();
            this._layer.addChild(item);
            // GhostMgr.Instance.getLayer().addChild(item);
            this.addItem(item)
        }
        
        return item;
    }

    /**
     * 放入对象池
     * @param item 对象
     */
    private addItem(item)
    {
        this.spawnItemId++;
        item.name = "item"+this.spawnItemId;
        item.setClientProp(ClientDef.ENTITY_PROP_ID,this.spawnItemId); //设置它的ID
        this._items.push(item);
        // console.info(">>>>>>>item count : " + this._items.length + "  >>time = " + cc.director.getTotalTime());
    }


    /**
     * 删除所有对象
     */
    deleteAllEntity()
    {
        for (let i = 0; i < this._items.length; i++) {
            const element = this._items[i];
            element.remove();
        }
        this._items = [];
    }

    getLayer()
    {
        return this._layer;
    }

    foreachItem(callback)
    {
        for (let i = 0; i < this._items.length; i++) {
            const element = this._items[i];
            var notcontinue = callback(element);
            if(notcontinue)
            {
                break;
            }
        }
    }

    getItemLength()
    {
        return this._items.length;
    }



}
