/**
 * 物品类
 */

import ClientDef from "../common/ClientDef";
import DictMgr from "../manager/DictMgr";
import ItemSkinComponent from "./Component/children/ItemSkinComponent";
import Entity from "./Entity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends Entity {

   private _skin :ItemSkinComponent;

    onLoad () 
    {
        this._client_prop_map = {};
        this._server_prop_map = {};

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
        this._skin.restart();
    }

    //获取对象配置信息
    getEntityDict()
    {
        var entityInfo = DictMgr.Instance.getDictByName('item_data');
        entityInfo = entityInfo[this.getClientProp(ClientDef.ENTITY_PROP_STATICID)];
        return entityInfo;
    }

}
