/**
 * 基因管理器
 */

import ClientDef from "../../common/ClientDef";
import DictMgr from "../../manager/DictMgr";
import EntityParent from "../EntityParent";
import GeneSystem from "../system/GeneSystem";
import GeneParent from "./GeneParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GeneMgr 
{
    _host:EntityParent;
    private _genes : GeneParent[];
    

    onLoad (host) 
    {
        this._host = host;
        this._genes = [];
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

    removeGeneAfterDead()
    {
        var genedata = DictMgr.Instance.getDictByName("gene_data");
        this._genes = this._genes.filter((gene) => {
            let info = genedata[ gene.getStaticId() ];
            if(info.removeAfterDead == 1)
            {
                gene.remove();
                return false;
            }
            return true;
        });
    }

    getGenes()
    {
        return this._genes;
    }

    addGene(geneid)
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

        var typeclass = GeneSystem.get(geneType);
        var gene = new (typeclass)();
        gene.onLoad();
        gene.setStaticId(geneid);
        gene.setHost(this._host);
        gene.start();
        this._genes.push(gene);
    }

}
