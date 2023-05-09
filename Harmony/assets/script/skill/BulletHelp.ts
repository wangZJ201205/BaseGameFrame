import ClientDef from "../common/ClientDef";
import GhostMgr from "../manager/GhostMgr";

/**
 * 子弹常用类
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletHelp{

   
    //寻找最近的敌人
    static FindEnemyByMinDistance(srcEntity)
    {
        var minDistance = 99999999;
        var minEnemy = null;
        GhostMgr.Instance.foreachEntity((element)=>{
            var tgtType = element.getClientProp(ClientDef.ENTITY_PROP_TYPE);
            var myType = srcEntity.getClientProp(ClientDef.ENTITY_PROP_TYPE);
            if(tgtType == myType)
            {
                return false;
            }
            if(element.getClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE) == ClientDef.ENTITY_ACTIVE_STATE_FREE)
            {
                return false;
            }

            var distance = element.position.sub(srcEntity.position).mag(); //计算两个对象之间的距离
            if(distance < minDistance)
            {
                minDistance = distance;
                minEnemy = element;
            }
            return false;
        })   
        // var direction = minEnemy.position.sub(srcEntity.position);
        return minEnemy;
    }

    //周围循环攻击
    static AngleConvertDirection(angle)
    {   
        
        var direction = new cc.Vec2();
        var ag = angle * (Math.PI / 180); // 将角度转换为弧度
        direction.x = Math.cos(ag);
        direction.y = Math.sin(ag);
        return direction;
    }



}
