/**
 * 基因管理器
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import DictMgr from "../../manager/DictMgr";
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
        for (const key in this._genes) {
            const gene = this._genes[key];
            gene.remove();
        }
        this._genes = [];
    }

    update (dt) 
    {
        
        this._genes = this._genes.filter((gene) => {
            if( gene.getState() == ClientDef.GENE_STATE_REMOVE )
            {
                return false;
            }
            gene.update(dt);
            return true;
        });

        // console.info(" >>> geneMgr lenght : " + this._genes.length);
    }

    remove()
    {
        for (const key in this._genes) {
            const gene = this._genes[key];
            gene.remove();
        }
        this._genes = [];
    }

    getGenes()
    {
        return this._genes;
    }

    addGene(geneid, host)
    {

        var geneInfo = DictMgr.Instance.getDictByName("gene_data")[geneid];
        if(!geneInfo)
        {
            //没有此条基因
            console.info(">>>>>>没有此条基因数据");
            return;
        }

        var geneType = geneInfo.type;
        for (let index = 0; index < this._genes.length; index++) {
            const gene = this._genes[index];
            var gInfo = DictMgr.Instance.getDictByName("gene_data")[ gene.getStaticId() ];
            var gType = gInfo.type;
            if(gType == geneType && gene.getState() == ClientDef.GENE_STATE_RUN)
            {
                var rule = gene.getRule();
                if(rule == ClientDef.GENE_RULE_NULL)
                {
                    return;
                }
                else if(rule == ClientDef.GENE_RULE_REPLACE)
                {
                    gene.remove();
                    break;
                }
                else if(rule == ClientDef.GENE_RULE_CANNOT_REPLACE)
                {
                    return;
                }
                else if(rule == ClientDef.GENE_RULE_ADD_DURATION)
                {
                    gene.addDuring(gInfo.time);
                }
            }
        }

        var gene = new (this._typeClass[geneType])();
        gene.onLoad();
        gene.setStaticId(geneid);
        gene.setHost(host);
        gene.start();
        this._genes.push(gene);
    }

}
