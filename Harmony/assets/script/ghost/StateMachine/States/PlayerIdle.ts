

import ClientDef from "../../../common/ClientDef";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerIdle extends StateParent {


    update (dt) 
    {
        this.getHost().getStateMachine().runNextState();
    }
}
