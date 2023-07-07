/**
 * 基因父类
 */

import ClientDef from "../../common/ClientDef";
import DictMgr from "../../manager/DictMgr";
import Entity from "../Entity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GeneParent  
{
    protected _host : Entity;
    protected _rule : number;
    protected _geneStaticId : number; //配置id
    protected _datax : number;
    protected _datay : number;
    protected _dataz : number;
    protected _datau : number;
    protected _during : number;
    protected _state : number;
    protected _noCd : boolean;

    onLoad () 
    {
    }

    start () 
    {
        var geneInfo = DictMgr.Instance.getDictByName("gene_data")[this._geneStaticId];
        this._datax = geneInfo.datax;
        this._datay = geneInfo.datay;
        this._dataz = geneInfo.dataz;
        this._datau = geneInfo.datau;

        this._during = cc.director.getTotalTime() + geneInfo.time;
        this._noCd = geneInfo.time < 0 ? true : false;
        this._state = ClientDef.GENE_STATE_RUN;
    }

    remove()
    {
        this._state = ClientDef.GENE_STATE_REMOVE;
    }

    update (dt) 
    {
        if(this._noCd)
        {
            return;
        }
        
        let delta = cc.director.getTotalTime() - this._during;
        if(delta >= 0)
        {
            this.remove();
        }
    }

    setStaticId(gid)
    {
        this._geneStaticId = gid;
    }

    getStaticId()
    {
        return this._geneStaticId;
    }

    getRule()
    {
        return this._rule;
    }

    setHost(host)
    {
        this._host = host;
    }

    addDuring(time)
    {
        this._during += time;
    }

    getState()
    {
        return this._state;
    }

}
