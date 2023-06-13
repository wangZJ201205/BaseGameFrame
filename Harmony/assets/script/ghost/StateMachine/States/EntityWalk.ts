
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../Hero";
import ClothComponent from "../../component/children/ClothComponent";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityWalk extends StateParent {

    speed:number;
    start () 
    {
        super.start();
        var moveSpeed = this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_SPEED);
        this.speed = (moveSpeed+GameData.MonsterMoveSpeed) ;
    }

    update (dt) 
    {

        var heroNode = Hero.Instance.getEntity().getEntityNode();
        var myNode = this.getHost().getEntityNode();
        var currentPosition = this.getHost().getEntityNode().position;
        var direction = heroNode.position.sub(currentPosition);
        direction = direction.normalize();

        // 沿着移动方向移动
        const velocity = direction.mul(this.speed * dt);
        currentPosition = currentPosition.add(velocity);
        myNode.position = currentPosition.add(velocity);
        myNode.zIndex = GameData.App_Game_Heigth -(GameData.App_Game_Heigth/2 + myNode.position.y);
        
        const distance = heroNode.position.sub(currentPosition).mag();
        //超出范围移除
        if (distance <= GameData.Monster_And_Hero_Min_Distance || distance >= GameData.Monster_And_Hero_Max_Distance)
        {
          // 到达目标节点
          this.getHost().getEntityNode().active = false;
          this.getHost().setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
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
        this.getHost().setClientProp(ClientDef.ENTITY_PROP_DEGREE,degree);
        var cloth:ClothComponent = this.getHost().getEntityComponent(ClientDef.ENTITY_COMP_CLOTH);
        if(cloth)
        {
            cloth.changeDir();
        }
    }
}
