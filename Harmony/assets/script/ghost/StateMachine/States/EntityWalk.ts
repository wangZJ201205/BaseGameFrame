
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../Hero";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityWalk extends StateParent {


    onLoad (id,host) 
    {
        super.onLoad(id,host);
    }

    start () 
    {
        console.info(">>>>>>>>>>EntityWalk:start");
        super.start();

    }

    stop()
    {

    }

    update (dt) 
    {

        var heroNode = Hero.Instance.getEntity().getEntityNode();
        var myNode = this.getHost().getEntityNode();
        var currentPosition:cc.Vec3 = cc.v3(myNode.position.x,
                                            myNode.position.y,0);

        var direction = heroNode.position.sub(currentPosition);
        direction.normalize();
        // entityNode.zIndex = GameData.App_Game_Heigth -(GameData.App_Game_Heigth/2 + entityNode.getPosition().y);

        

        const distance = heroNode.position.sub(currentPosition).mag();
        console.info(">>>"+distance)
        if (distance <= 50) {
            // 到达目标节点
            this.getHost().getEntityNode().active = false;
            this.getHost().setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
          } else {
            // 沿着移动方向移动
            const velocity = direction.mul(0.5 * dt);
            // console.info(velocity.x,velocity.y,direction.x,direction.y,GameData.PayerMoveSpeed * 0.0005 * dt);
            myNode.position = currentPosition.add(velocity);
          }

        super.update(dt);
    }
}
