
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerWalk extends StateParent {

    
    onLoad (id,host) 
    {
        super.onLoad(id,host);
    }

    start () 
    {
        console.info(">>>>>>>>>>PlayerWalk:start");
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
