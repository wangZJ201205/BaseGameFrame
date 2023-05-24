
import ClientDef from "../common/ClientDef";
import DictMgr from "../manager/DictMgr";
import Entity from "./Entity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hero{
    public static readonly Instance : Hero = new Hero();

    private _entity:Entity;

    onLoad () 
    {

    }

    start () {
        this._entity.getSkill().addSkill(10001);
        this._entity.getSkill().addSkill(20001);
        this._entity.getSkill().addSkill(30001);
        this._entity.getSkill().addSkill(40001);
        this._entity.getSkill().addSkill(50001);
        var info = this._entity.getEntityDict();
        this._entity.setClientProp(ClientDef.ENTITY_PROP_PICKUP_RANGE,info.pickRange);
        
        this.setLevel(1);
    }

    setEntity(entity)
    {
        this._entity = entity;
    }
    
    getEntity()
    {
        return this._entity;
    }

    // update (dt) {}

    //增加经验
    addExp(exp)
    {
        var value = this._entity.getClientProp(ClientDef.ENTITY_PROP_CUR_EXP);
        value += exp;
        if( value >= this._entity.getClientProp(ClientDef.ENTITY_PROP_MAX_EXP) )
        {
            this.setLevel(this._entity.getClientProp(ClientDef.ENTITY_PROP_LV) + 1);
            this._entity.setClientProp(ClientDef.ENTITY_PROP_CUR_EXP, value- this._entity.getClientProp(ClientDef.ENTITY_PROP_MAX_EXP));
        }
        else
        {
            this._entity.setClientProp(ClientDef.ENTITY_PROP_CUR_EXP, value);
        }
    }

    //设置等级
    setLevel(lv)
    {
        var lvInfo = DictMgr.Instance.getDictByName("exp_data");
        this._entity.setClientProp(ClientDef.ENTITY_PROP_LV, lv);
        this._entity.setClientProp(ClientDef.ENTITY_PROP_MAX_EXP, lvInfo[lv+""].exp);
    }

    addSkill(skillid)
    {
        this._entity.getSkill().addSkill(skillid);
    }

}
