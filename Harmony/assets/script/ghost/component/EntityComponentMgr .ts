
import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import ComponentMgr from "./ComponentMgr";

/**
 * 对象--组件管理器
 */
const {ccclass, property} = cc._decorator;

// @ccclass
export default class EntityComponentMgr extends ComponentMgr{

    start () 
    {
        super.start();
        this.add(ClientDef.ENTITY_COMP_CLOTH);
        this.add(ClientDef.ENTITY_COMP_BLOOM);
        if(GameData.IsDebug)
        {
            this.add(ClientDef.ENTITY_COMP_NAME);
        }
        this.add(ClientDef.ENTITY_COMP_COLL);   
    }

    restart () 
    {
        super.restart();
        this.get(ClientDef.ENTITY_COMP_BLOOM).restart();
    }

}
