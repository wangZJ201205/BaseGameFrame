/**
 * 血量基因
 */

import ClientDef from "../../../common/ClientDef";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BloomGene extends GeneParent {

    _bloom:number;

    onLoad () 
    {
        this._rule = ClientDef.GENE_RULE_REPLACE;
    }
    
    start () 
    {
        super.start();
        var bloom = this._host.getCProp(ClientDef.ENTITY_PROP_MAX_BLOOM);
        this._bloom = Math.floor(bloom * (this._datax/100));
        this._host.addCProp(ClientDef.ENTITY_PROP_MAX_BLOOM,this._bloom);
        var curbloom = this._host.getCProp(ClientDef.ENTITY_PROP_CUR_BLOOM);
        curbloom += this._bloom;
        curbloom = curbloom > bloom + this._bloom ? bloom+this._bloom : curbloom;
        this._host.setCProp(ClientDef.ENTITY_PROP_CUR_BLOOM,curbloom);
    }

    remove()
    {
        super.remove();
        this._host.addCProp(ClientDef.ENTITY_PROP_MAX_BLOOM,-this._bloom);
    }

}
