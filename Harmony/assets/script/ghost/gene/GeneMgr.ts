/**
 * 基因管理器
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import GeneParent from "./GeneParent";
import SpeedGene from "./children/SpeedGene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GeneMgr 
{

    private _genes : GeneParent[];
    private _typeClass : {};

    onLoad (host) 
    {
        this._genes = [];
        
        this._typeClass = {};
        this._typeClass[ClientDef.GENE_TYPE_SPEED] = SpeedGene;

        
    }

    start () 
    {

    }

    restart () 
    {
    }

    update (dt) 
    {
        for (const key in this._genes) {
            const gene = this._genes[key];
            gene.update(dt);
        }
    }

    remove()
    {

    }

    addGene(geneid)
    {

    }

}
