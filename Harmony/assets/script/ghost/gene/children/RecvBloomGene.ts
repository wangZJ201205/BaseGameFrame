/**
 * 增加恢复血量
 */

import ClientDef from "../../../common/ClientDef";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecvBloomGene extends GeneParent {

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
            if(during >= this._datax)
            {
                host.addCProp(ClientDef.ENTITY_PROP_CUR_BLOOM,this._datay/10);
                this._delta = cc.director.getTotalTime();
            }
        }
    }

}
