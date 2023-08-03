/**
 * 物品类
 */

import ClientDef from "../common/ClientDef";
import DictMgr from "../manager/DictMgr";
import EntityParent from "./EntityParent";
import ItemComponentMgr from "./component/ItemComponentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends EntityParent {

    onLoad () 
    {
        super.onLoad();
    }

    start () 
    {
        super.start();
    }

    restart()
    {
        super.restart();
    }

    //获取对象配置信息
    getEntityDict()
    {
        var entityInfo = DictMgr.Instance.getDictByName('item_data');
        entityInfo = entityInfo[this.getCProp(ClientDef.ENTITY_PROP_STATICID)];
        return entityInfo;
    }

    spawnComponentMgr()
    {
        return new ItemComponentMgr();
    }

    

    

}
