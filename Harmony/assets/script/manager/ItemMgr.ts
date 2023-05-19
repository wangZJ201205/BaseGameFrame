/**
 * 对象管理
 */
import ClientDef from "../common/ClientDef";
import Item from "../ghost/Item";
import GhostMgr from "./GhostMgr";
import ParentMgr from "./ParentMgr";

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

        this._layer = GhostMgr.Instance.getLayer();

        this._timerID = setInterval(this.update.bind(this), 0);
    }

    private update (dt) {
        
        const delta = cc.director.getDeltaTime();
        var needRemoveItem = [];
        for (let index = 0; index < this._items.length; index++) {
            const element = this._items[index];
            if( element.getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_RUN )
            {
                element.update(delta);
            }
            else
            {
                needRemoveItem.push(element);
            }
        }

        for (let index = 0; index < needRemoveItem.length; index++) {
            const element = needRemoveItem[index];
            var findIndex = -1;
            for (let i = 0; i < this._items.length; i++) {
                const ele = this._items[i];
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
                this._items.splice(findIndex,1);
            }
        }
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

        if (item == null)
        {
            item = new Item();
            item.onLoad();
            item.setClientProp(ClientDef.ENTITY_PROP_TYPE,itemType);
            item.setClientProp(ClientDef.ENTITY_PROP_STATICID,"" + itemStaticID);
            item.start();
            this._layer.addChild(item);
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
