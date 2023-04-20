

import ClientDef from "../../../common/ClientDef";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityIdle extends StateParent {

    
    onLoad (id,host) 
    {
        super.onLoad(id,host);
    }

    start () 
    {
        super.start();
    }

    stop()
    {

    }

    update (dt) 
    {
        this.getHost().getStateMachine().runNextState();
    }
}
