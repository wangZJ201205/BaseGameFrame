/**
 * 雷击麻痹基因
 */

import ClientDef from "../../../common/ClientDef";
import { DamageSys } from "../../compSystem/DamageSys";
import GeneParent from "../GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderRayGene extends GeneParent {

    private _delta : number = 0;
    onLoad () 
    {
        this._delta = cc.director.getTotalTime();
        this._rule = ClientDef.GENE_RULE_CANNOT_REPLACE;
    }

    start () 
    {
        super.start();
        this._host.addEntityComponent(ClientDef.ENTITY_COMP_THUNDERRAY);
        this.addDamage();
    }

    remove()
    {
        super.remove();
        this._host.rmvEntityComponent(ClientDef.ENTITY_COMP_THUNDERRAY);
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
