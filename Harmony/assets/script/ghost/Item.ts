/**
 * 物品类
 */

import ClientDef from "../common/ClientDef";
import EventName from "../common/EventName";
import GameData from "../common/GameData";
import DictMgr from "../manager/DictMgr";
import EventMgr from "../manager/EventMgr";
import ItemMgr from "../manager/ItemMgr";
import ItemSkinComponent from "./Component/children/ItemSkinComponent";
import Entity from "./Entity";
import Hero from "./Hero";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends Entity {

    private _skin :ItemSkinComponent;
    private _recycleTime : number;
    private _createTime :number;
    private _isMove = false;
    onLoad () 
    {
        this._client_prop_map = {};
        this._server_prop_map = {};
        this._recycleTime = GameData.Item_Recycle_Time;
        
        this.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_INIT);
    }

    start () {

        this._skin = new ItemSkinComponent();
        this._skin.onLoad(this);
        this._skin.start();
    }

    restart()
    {
        this.setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE,ClientDef.ENTITY_ACTIVE_STATE_RUN);
        this.active = true;
        this._isMove = false;
        this._createTime = cc.director.getTotalTime();
        this._skin.restart();
    }

    //获取对象配置信息
    getEntityDict()
    {
        var entityInfo = DictMgr.Instance.getDictByName('item_data');
        entityInfo = entityInfo[this.getClientProp(ClientDef.ENTITY_PROP_STATICID)];
        return entityInfo;
    }

    
    update (dt) 
    {   
        if(this._isMove)
        {
            return;
        }
        
        var delta = cc.director.getTotalTime() - this._createTime
        if(delta >= GameData.Item_Recycle_Time) //性能优化 超过回收时间，将其回收
        {
            this.restEntity();
        }

        var distance = this.calculateDistance(this,Hero.Instance.getEntity());
        var pickUpRange = Hero.Instance.getEntity().getClientProp(ClientDef.ENTITY_PROP_PICKUP_RANGE);
        if(distance <= pickUpRange ) //是否进入拾取范围
        {
            this.pickUp();
        }
        else if( distance > GameData.Item_Max_Range) //性能优化 超过人物最大距离，将其回收
        {
            this.restEntity();
        }

    }

    private pickUp()
    {
        this._isMove = true;
        var node : Entity = this;
        cc.tween(node).to(0.2,{x:Hero.Instance.getEntity().x, y:Hero.Instance.getEntity().y}).call(function () {
            node.restEntity();
            var itemInfo = node.getEntityDict();
            Hero.Instance.addExp(itemInfo.datax);
            EventMgr.Instance.Emit(EventName.EVENT_PLAYER_EXP_CHANGE,null);
        }).start();
    }

    calculateDistance(nodeA: cc.Node, nodeB: cc.Node): number {
        const positionA = nodeA.position;
        const positionB = nodeB.position;
        const vector = positionA.sub(positionB);
        return vector.mag();
    }

}
