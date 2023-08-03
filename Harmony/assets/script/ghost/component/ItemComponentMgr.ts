
import ClientDef from "../../common/ClientDef";
import ComponentMgr from "./ComponentMgr";

/**
 * 对象--组件管理器
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemComponentMgr extends ComponentMgr{

    start () 
    {
        super.start();
        this.add(ClientDef.ENTITY_COMP_ITEM_SKIN);
        this.add(ClientDef.ENTITY_COMP_ITEM_STATE);
    }

    restart () 
    {
        super.restart();
        this.get(ClientDef.ENTITY_COMP_ITEM_SKIN).restart();
        this.get(ClientDef.ENTITY_COMP_ITEM_STATE).restart();
    }

}
