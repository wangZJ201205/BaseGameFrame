
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import GameMath from "../../../utils/GameMath";
import Hero from "../../Hero";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityWalk extends StateParent {

    speed:number;
    start () 
    {
        super.start();
        this.speed = Math.random() * 10 + GameData.MonsterMoveSpeed/2;
    }

    update (dt) 
    {

        var heroNode = Hero.Instance.getEntity().getEntityNode();
        var myNode = this.getHost().getEntityNode();
        var currentPosition = this.getHost().getEntityNode().position;
        var direction = heroNode.position.sub(currentPosition);
        direction = direction.normalize();
        
        const distance = heroNode.position.sub(currentPosition).mag();
        if (distance <= 50)
        {
          // 到达目标节点
          super.update(dt);
          this.getHost().getEntityNode().active = false;
          this.getHost().setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
        } else {
          // 沿着移动方向移动
          const velocity = direction.mul(this.speed * dt);
          currentPosition = currentPosition.add(velocity);
          myNode.position = currentPosition.add(velocity);
          myNode.zIndex = GameData.App_Game_Heigth -(GameData.App_Game_Heigth/2 + myNode.position.y);
        }

        this.changePlayerDirection(direction);
    }
    /**
     * 改变方向
     * @param direction 方向
     */
    changePlayerDirection(direction)
    {
        let angleRadian = Math.atan2(direction.y, direction.x);
        let degree = angleRadian * 180 / Math.PI; // 转换为角度制
        let dir = GameMath.degreeToEntityDirection(degree);
        this.getHost().setClientProp(ClientDef.ENTITY_PROP_DIR,dir);
    }
}
