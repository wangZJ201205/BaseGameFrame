/**
 * 增加经验
 */

import ClientDef from "../../../common/ClientDef";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddEXPGene extends GeneParent {

    _addAttackSpeed:number;

    onLoad () 
    {
        this._rule = ClientDef.GENE_RULE_REPLACE;
    }
    
    start () 
    {
        super.start();
        this._host.addCProp(ClientDef.ENTITY_PROP_ADD_EXP, this._datax);
    }

    remove()
    {
        super.remove();
        this._host.addCProp(ClientDef.ENTITY_PROP_ADD_EXP, -this._datax);
    }

}
