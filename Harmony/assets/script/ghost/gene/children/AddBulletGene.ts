/**
 * 增加攻击力
 */

import ClientDef from "../../../common/ClientDef";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddBulletGene extends GeneParent {

    _addAttackSpeed:number;

    onLoad () 
    {
        this._rule = ClientDef.GENE_RULE_REPLACE;
    }
    
    start () 
    {
        super.start();
        this._host.addCProp(ClientDef.ENTITY_PROP_ADD_BULLET, this._datax);
    }

    remove()
    {
        super.remove();
        this._host.addCProp(ClientDef.ENTITY_PROP_ADD_BULLET, -this._datax);
    }

}
