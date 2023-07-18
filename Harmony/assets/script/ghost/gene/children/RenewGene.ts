/**
 * 恢复基因
 */

import ClientDef from "../../../common/ClientDef";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RenewGene extends GeneParent {

    private _delta : number;
    onLoad () 
    {
        this._delta = 0;
        this._rule = ClientDef.GENE_RULE_REPLACE;
    }
    
    update (dt) 
    {
        super.update(dt);
        var host = this._host;
        let curBloom = host.getCProp(ClientDef.ENTITY_PROP_CUR_BLOOM);
        var entityInfo = host.getEntityDict();
        let totBloom = entityInfo["bloom"];
        if( curBloom != totBloom )
        {
            var during = cc.director.getTotalTime() - this._delta;
            if(during >= this._datay)
            {
                host.addCProp(ClientDef.ENTITY_PROP_CUR_BLOOM,this._datax);
                this._delta = cc.director.getTotalTime();
            }
        }
    }

}
