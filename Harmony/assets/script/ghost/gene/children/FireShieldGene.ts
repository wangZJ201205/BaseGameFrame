/**
 * 魔法盾基因
 */

import ClientDef from "../../../common/ClientDef";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FireShieldGene extends GeneParent {

    private _delta : number;
    onLoad () 
    {
        this._delta = 0;
        this._rule = ClientDef.GENE_RULE_REPLACE;
    }
    
    start () 
    {
        super.start();
        var bloom = this._host.getCProp(ClientDef.ENTITY_PROP_MAX_BLOOM);
        this._host.addCProp(ClientDef.ENTITY_PROP_SHIELD_BLOOM , bloom*(this._datax-1));
        this._host.addEntityComponent(ClientDef.ENTITY_COMP_FIRE_SHIELD);
    }

    remove()
    {
        super.remove();
        this._host.rmvEntityComponent(ClientDef.ENTITY_COMP_FIRE_SHIELD);
    }

    update (dt) 
    {
        super.update(dt);
        var shieldBloom = this._host.getCProp(ClientDef.ENTITY_PROP_SHIELD_BLOOM);
        if(shieldBloom <= 0)
        {
            this.remove();
        }
    }

}
