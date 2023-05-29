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
        // for (const key in this._genes) {
        //     const gene = this._genes[key];
        //     gene.update(dt);
        // }
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
        var delIndex = -1;
        for (let index = 0; index < this._genes.length; index++) {
            const gene = this._genes[index];
            var gInfo = DictMgr.Instance.getDictByName("gene_data")[ gene.getStaticId() ];
            var gType = gInfo.type;
            if(gType == geneType)
            {
                gene.remove();
                delIndex = index;
                break;
            }
        }

        this._genes.splice(delIndex,1); //删除同类型的基因

        var gene = new (this._typeClass[geneType])();
        gene.onLoad();
        gene.setStaticId(geneid);
        gene.setHost(host);
        gene.start();
        this._genes.push(gene);
    }

}
