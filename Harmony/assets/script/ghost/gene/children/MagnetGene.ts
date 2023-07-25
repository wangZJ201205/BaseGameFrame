/**
 * 吸铁石基因
 */

import ClientDef from "../../../common/ClientDef";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MagnetGene extends GeneParent {

    _add:number;

    onLoad () 
    {
        this._rule = ClientDef.GENE_RULE_REPLACE;
    }
    
    start () 
    {
        super.start();

        var range = this._host.getCProp(ClientDef.ENTITY_PROP_PICKUP_RANGE);
        this._add = Math.floor(range* this._datax / 100);
        this._host.addCProp(ClientDef.ENTITY_PROP_PICKUP_RANGE, this._add);

        console.info(">>range : " + range + " >>cur range : " + this._host.getCProp(ClientDef.ENTITY_PROP_PICKUP_RANGE));
    }

    remove()
    {
        super.remove();
        this._host.addCProp(ClientDef.ENTITY_PROP_PICKUP_RANGE, -this._add);
    }

}
