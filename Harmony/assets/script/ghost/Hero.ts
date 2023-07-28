
import ClientDef from "../common/ClientDef";
import { UIName } from "../common/UIName";
import DictMgr from "../manager/DictMgr";
import UIMgr from "../manager/UIMgr";
import Entity from "./Entity";

const {ccclass, property} = cc._decorator;

@ccclass
export class Hero{
    public static readonly Instance : Hero = new Hero();

    private _entity:Entity;

    onLoad () 
    {

    }

    start () {
        var info = this._entity.getEntityDict();
        this._entity.setCProp(ClientDef.ENTITY_PROP_PICKUP_RANGE,info.pickRange);
        this._entity.getGene().addGene(2003);
        this.setLevel(1);
    }

    clear()
    {
        this._entity = null;
    }

    setEntity(entity)
    {
        this._entity = entity;
    }
    
    getEntity()
    {
        return this._entity;
    }

    update (dt) 
    {
        
    }

    //增加经验
    addExp(exp)
    {
        var percent = this._entity.getCProp(ClientDef.ENTITY_PROP_ADD_EXP);
        exp *= (1 + percent / 100);
        
        var value = this._entity.getCProp(ClientDef.ENTITY_PROP_CUR_EXP);
        var max = this._entity.getCProp(ClientDef.ENTITY_PROP_MAX_EXP);
        value += exp;
        if( value >= max )
        {
            UIMgr.Instance.openUI(UIName.VIEW_SELECTSKILL);
            this.setLevel(this._entity.getCProp(ClientDef.ENTITY_PROP_LV) + 1);
            this._entity.setCProp(ClientDef.ENTITY_PROP_CUR_EXP, max - value);
        }
        else
        {
            this._entity.setCProp(ClientDef.ENTITY_PROP_CUR_EXP, value);
        }
    }

    //设置等级
    setLevel(lv)
    {
        var lvInfo = DictMgr.Instance.getDictByName("exp_data");
        this._entity.setCProp(ClientDef.ENTITY_PROP_LV, lv);
        this._entity.setCProp(ClientDef.ENTITY_PROP_MAX_EXP, lvInfo[lv].exp);
    }

    addSkill(skillid)
    {
        this._entity.getSkill().addSkill(skillid);
    }

}
