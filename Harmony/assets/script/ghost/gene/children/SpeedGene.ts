/**
 * 速度基因
 */

import ClientDef from "../../../common/ClientDef";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpeedGene extends GeneParent {

    
    start () 
    {
        super.start();
        this._host.addClientProp(ClientDef.ENTITY_PROP_MOVE_SPEED,this._datax);
    }

    remove()
    {
        super.remove();

        this._host.addClientProp(ClientDef.ENTITY_PROP_MOVE_SPEED, -this._datax);
    }
}
