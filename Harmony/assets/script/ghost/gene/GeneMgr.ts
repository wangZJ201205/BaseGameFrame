/**
 * 基因管理器
 */

import ClientDef from "../../common/ClientDef";
import DictMgr from "../../manager/DictMgr";
import Entity from "../Entity";
import GeneParent from "./GeneParent";
import AddAttackGene from "./children/AddAttackGene";
import AddBulletGene from "./children/AddBulletGene";
import AddEXPGene from "./children/AddEXPGene";
import AddRangeGene from "./children/AddRangeGene";
import AttackSpeedGene from "./children/AttackSpeedGene";
import BloomGene from "./children/BloomGene";
import FireShieldGene from "./children/FireShieldGene";
import IceFrozenGene from "./children/IceFrozenGene";
import MagnetGene from "./children/MagnetGene";
import PosionFireGene from "./children/PosionFireGene";
import RecvBloomGene from "./children/RecvBloomGene";
import RenewGene from "./children/RenewGene";
import ShieldGene from "./children/ShieldGene";
import SpeedGene from "./children/SpeedGene";
import SubShieldGene from "./children/SubShieldGene";
import ThunderRayGene from "./children/ThunderRayGene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GeneMgr 
{
    _host:Entity;
    private _genes : GeneParent[];
    private _typeClass : Map<number,GeneParent>;

    onLoad (host) 
    {
        this._host = host;
        this._genes = [];
        
        this._typeClass = new Map<number,GeneParent>();
        this._typeClass[ClientDef.GENE_TYPE_SPEED] = SpeedGene;
        this._typeClass[ClientDef.GENE_TYPE_SHAPESHIFT] = SpeedGene;
        this._typeClass[ClientDef.GENE_TYPE_RENEW] = RenewGene;
        this._typeClass[ClientDef.GENE_TYPE_SHIELD] = ShieldGene;
        this._typeClass[ClientDef.GENE_TYPE_THUNDER_RAY] = ThunderRayGene;
        this._typeClass[ClientDef.GENE_TYPE_ADD_ATKSPEED] = AttackSpeedGene;
        this._typeClass[ClientDef.GENE_TYPE_ATTACK_DAMGE] = AddAttackGene;
        this._typeClass[ClientDef.GENE_TYPE_BLOOM] = BloomGene;
        this._typeClass[ClientDef.GENE_TYPE_MAGNET] = MagnetGene;
        this._typeClass[ClientDef.GENE_TYPE_RECV_BLOOM] = RecvBloomGene;
        this._typeClass[ClientDef.GENE_TYPE_ADD_ATKRANGE] = AddRangeGene;
        this._typeClass[ClientDef.GENE_TYPE_ADD_EXP] = AddEXPGene;
        this._typeClass[ClientDef.GENE_TYPE_SUB_SHIELD] = SubShieldGene;
        this._typeClass[ClientDef.GENE_TYPE_ADD_BULLET] = AddBulletGene;
        this._typeClass[ClientDef.GENE_TYPE_ICE_FROZEN] = IceFrozenGene;
        this._typeClass[ClientDef.GENE_TYPE_POSION_FIRE] = PosionFireGene;
        this._typeClass[ClientDef.GENE_TYPE_FIRE_SHIELD] = FireShieldGene;
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

        var gene = new (this._typeClass[geneType])();
        gene.onLoad();
        gene.setStaticId(geneid);
        gene.setHost(this._host);
        gene.start();
        this._genes.push(gene);
    }

}
