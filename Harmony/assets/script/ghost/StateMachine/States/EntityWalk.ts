
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import Hero from "../../Hero";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityWalk extends StateParent {

     // 当前对象的位置信息
    protected currentPosition: cc.Vec3;

    // 移动方向
    protected direction: cc.Vec3;

    onLoad (id,host) 
    {
        super.onLoad(id,host);
    }

    start () 
    {
        console.info(">>>>>>>>>>EntityWalk:start");
        super.start();
        var y = Math.random()* GameData.App_Game_Heigth ;
        this.getHost().getEntityNode().setPosition(Math.random()*GameData.App_Game_Width  - GameData.App_Game_Width/2, y- GameData.App_Game_Heigth/2);
        this.currentPosition = this.getHost().getEntityNode().position;

        var heroNode = Hero.Instance.getEntity().getEntityNode();
        this.direction = heroNode.position.sub(this.currentPosition);
        this.direction.normalize();
    }

    stop()
    {

    }

    update (dt) 
    {

        var heroNode = Hero.Instance.getEntity().getEntityNode();
        var myNode = this.getHost().getEntityNode();
        // var currentPosition:cc.Vec3 = cc.v3(myNode.position.x,
        //                                     myNode.position.y,0);

        // var direction = heroNode.position.sub(currentPosition);
        // direction.normalize();
        // entityNode.zIndex = GameData.App_Game_Heigth -(GameData.App_Game_Heigth/2 + entityNode.getPosition().y);

        

        const distance = heroNode.position.sub(this.currentPosition).mag();
        console.info(">>>"+distance)
        if (distance <= 50) {
            // 到达目标节点
            this.getHost().getEntityNode().active = false;
            this.getHost().setClientProp(ClientDef.ENTITY_PROP_ACTIVE_STATE, ClientDef.ENTITY_ACTIVE_STATE_FREE);
          } else {
            // 沿着移动方向移动
            const velocity = this.direction.mul(0.05 * dt);
            console.info(velocity.x,velocity.y,GameData.PayerMoveSpeed * 0.0005 * dt);
            this.currentPosition = this.currentPosition.add(velocity);
            myNode.position = this.currentPosition.add(velocity);
          }

        // super.update(dt);
    }
}
