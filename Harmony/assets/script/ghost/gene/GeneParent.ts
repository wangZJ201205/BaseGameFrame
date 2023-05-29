/**
 * 基因父类
 */

import DictMgr from "../../manager/DictMgr";
import Entity from "../Entity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GeneParent  
{
    protected _host : Entity;
    protected _geneStaticId : number; //配置id
    protected _datax : number;
    protected _datay : number;
    protected _dataz : number;
    protected _datau : number;

    onLoad () 
    {
        this._geneStaticId = 0;
    }

    start () 
    {
        var geneInfo = DictMgr.Instance.getDictByName("gene_data")[this._geneStaticId];
        this._datax = geneInfo.datax;
        this._datay = geneInfo.datay;
        this._dataz = geneInfo.dataz;
        this._datau = geneInfo.datau;
    }

    remove()
    {

    }

    update (dt) 
    {
    }

    setStaticId(gid)
    {
        this._geneStaticId = gid;
    }

    getStaticId()
    {
        return this._geneStaticId;
    }

    setHost(host)
    {
        this._host = host;
    }

}
