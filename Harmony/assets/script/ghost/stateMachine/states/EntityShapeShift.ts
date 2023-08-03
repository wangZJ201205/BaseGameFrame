/**
 * 变身 -- 变身
 */

import ClientDef from "../../../common/ClientDef";
import Entity from "../../Entity";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityShapeShift extends StateParent {

    start () 
    {
        super.start();
        var entityInfo = this._host.getEntityDict();
        let shapeShift = entityInfo["shapeshift"];
        (this._host as Entity).getGene().addGene(shapeShift);
        this._host.setCProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT,1);
        this._host.on("animation_finish",this.onFinish, this);
    }

    stop()
    {
        this._host.setCProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT,2);
        this._host.off("animation_finish",this.onFinish, this);
    }

    onFinish()
    {
        this.getHost().getStateMachine().addState(ClientDef.ENTITY_STATE_SHAPESHIFT_WALK);
        this.getHost().getStateMachine().runNextState();
    }

    update (dt) 
    {
    }

}
