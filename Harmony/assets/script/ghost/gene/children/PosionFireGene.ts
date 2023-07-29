/**
 * 毒火基因
 */

import ClientDef from "../../../common/ClientDef";
import { DamageSys } from "../../compSystem/DamageSys";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PosionFireGene extends GeneParent {

    private _delta : number = 0;

    onLoad () 
    {
        this._rule = ClientDef.GENE_RULE_REPLACE;
    }
    
    start () 
    {
        super.start();
        this._host.addEntityComponent(ClientDef.ENTITY_COMP_POSION_FIRE);
    }

    remove()
    {
        super.remove();
        this._host.rmvEntityComponent(ClientDef.ENTITY_COMP_POSION_FIRE);
    }

    update (dt) 
    {
        super.update(dt);
        if( cc.director.getTotalTime() - this._delta >= this._datax )
        {
            this.addDamage();
            this._delta = cc.director.getTotalTime();
        }
    }

    addDamage()
    {
        DamageSys.addDamage(null, this._host, this._datay);
    }

}
