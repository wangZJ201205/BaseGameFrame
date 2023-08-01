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
    static addDamage(src:Entity,tgt:Entity, damageValue:number = 0)
    {
        if(tgt.getCProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT) == 1)
        {
            return;
        }

        if(tgt.getCProp(ClientDef.ENTITY_PROP_CUR_BLOOM) < 0)
        {
            return;
        }
        var oldDamage = damageValue;
        damageValue = DamageSys.addAttackDamage(src, tgt, damageValue);
        var oldDamage1 = damageValue;
        damageValue = DamageSys.addShieldDamage(src, tgt, damageValue); //添加护盾防御
        var oldDamage2 = damageValue;
        damageValue = DamageSys.subDefenseDamge(tgt, damageValue); //添加护盾防御

        if( damageValue <= 0)return;

        console.info(`>>>>>>>>>>damage : old & actual > ${oldDamage} & ${oldDamage1} & ${oldDamage2} & ${damageValue}` );
        
        DamageSys.addEndDamage(src, tgt, damageValue); //最后伤害
    }

    //去除护盾的防御
    private static subDefenseDamge(tgt:Entity , damageValue : number = 0)
    {
        var defenseValue = tgt.getCProp(ClientDef.ENTITY_PROP_DEFENSE) - tgt.getCProp(ClientDef.ENTITY_PROP_ADD_SHIELD);
        defenseValue = defenseValue < 0 ? 0 : defenseValue;
        damageValue = damageValue - defenseValue;
        return damageValue;
    }

    //附加攻击
    private static addAttackDamage(src:Entity, tgt:Entity, damageValue:number = 0)
    {
        if(src)
        {
            damageValue = damageValue * ( 1 + src.getCProp(ClientDef.ENTITY_PROP_ADD_DAMAGE) / 100 );
        }
        return damageValue;
    }

    //护盾
    private static addShieldDamage(src:Entity, tgt:Entity, damageValue:number = 0)
    {
        var curBloom = tgt.getCProp(ClientDef.ENTITY_PROP_SHIELD_BLOOM);
        if(curBloom > 0) //护盾防御
        {
            var showDamageValue = curBloom > damageValue ? damageValue : curBloom;
            HeadEffectMgr.Instance.addDamageTips(1,showDamageValue, tgt.getPosition());

            var entityInfo = tgt.getEntityDict();
            HeadEffectMgr.Instance.addBloomEffect(1, entityInfo["bloomEffect"], tgt.getPosition());

            tgt.addCProp(ClientDef.ENTITY_PROP_SHIELD_BLOOM, -damageValue);
            if(curBloom - damageValue > 0)
            {
                return 0;
            }
            damageValue = damageValue - curBloom;
        }
        return damageValue;
    }

    //添加血条伤害
    private static addEndDamage(src:Entity, tgt:Entity, damageValue:number = 0)
    {
        //伤害弹跳
        var curBloom = tgt.getCProp(ClientDef.ENTITY_PROP_CUR_BLOOM);
        var showDamageValue = curBloom > damageValue ? damageValue : curBloom;
        HeadEffectMgr.Instance.addDamageTips(1,showDamageValue, tgt.getPosition());

        var entityInfo = tgt.getEntityDict();
        HeadEffectMgr.Instance.addBloomEffect(1, entityInfo["bloomEffect"], tgt.getPosition());

        tgt.addCProp(ClientDef.ENTITY_PROP_CUR_BLOOM, -damageValue);

        //进入死亡状态
        if( curBloom-damageValue <= 0 )
        {
            DamageSys.checkShapeShift(tgt);
        }

        tgt.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).addDamage( damageValue );
    }

    //检测变身状态
    static checkShapeShift(tgt : Entity)
    {
        var entityInfo = tgt.getEntityDict();
        let shapeShift = entityInfo["shapeshift"];
        if(shapeShift > 0)
        {
            if(tgt.getCProp(ClientDef.ENTITY_PROP_STATE_SHAPESHIFT) == 2)
            {
                tgt.addEntityState(ClientDef.ENTITY_STATE_DIE);
                tgt.refreshEntityState();
                GameData.Kill_Monster_Count++;
            }
            else
            {
                tgt.getEntityComponent(ClientDef.ENTITY_COMP_BLOOM).restart();
                tgt.addEntityState(ClientDef.ENTITY_STATE_SHAPESHIFT);
                tgt.refreshEntityState();
            }
        }
        else
        {
            tgt.addEntityState(ClientDef.ENTITY_STATE_DIE);
            tgt.refreshEntityState();
            GameData.Kill_Monster_Count ++;
        }
    }

}
