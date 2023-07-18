/**
 * 伤害系统
 */

import ClientDef from "../../common/ClientDef";
import GameData from "../../common/GameData";
import HeadEffectMgr from "../../manager/HeadEffectMgr";
import Entity from "../Entity";

const {ccclass, property} = cc._decorator;

@ccclass
export class DamageSys {

    //添加伤害
    static addDamage(entity:Entity, damageValue:number = 0)
    {
        if(entity.getCProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT) == 1)
        {
            return;
        }

        //伤害弹跳
        var curBloom = entity.getCProp(ClientDef.ENTITY_PROP_CUR_BLOOM);
        var showDamageValue = curBloom > damageValue ? damageValue : curBloom;
        HeadEffectMgr.Instance.addDamageTips(1,showDamageValue, entity.getPosition());

        var entityInfo = entity.getEntityDict();
        HeadEffectMgr.Instance.addBloomEffect(1, entityInfo["bloomEffect"], entity.getPosition());
        // var type = 1;
        // LabelMgr.Instance.addLabel(type,showDamageValue,this._host.getPosition());

        entity.addCProp(ClientDef.ENTITY_PROP_CUR_BLOOM, -damageValue);

        //进入死亡状态
        if( curBloom-damageValue <= 0 )
        {
            DamageSys.checkShapeShift(entity);
        }

        entity.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );

    }

    //检测变身状态
    static checkShapeShift(entity : Entity)
    {
        var entityInfo = entity.getEntityDict();
        let shapeShift = entityInfo["shapeshift"];
        if(shapeShift > 0)
        {
            if(entity.getCProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT) == 2)
            {
                entity.addEntityState(ClientDef.ENTITY_STATE_DIE);
                entity.refreshEntityState();
                GameData.Kill_Monster_Count++;
            }
            else
            {
                entity.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).restart();
                entity.addEntityState(ClientDef.ENTITY_STATE_SHAPESHIFT);
                entity.refreshEntityState();
            }
        }
        else
        {
            entity.addEntityState(ClientDef.ENTITY_STATE_DIE);
            entity.refreshEntityState();
            GameData.Kill_Monster_Count ++;
        }
    }

}
