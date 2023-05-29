
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;


@ccclass
export default class PlayerWalk extends StateParent {

    update (dt) 
    {

        if( this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_X) == 0 &&
        this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_Y) == 0 )
        {
            super.update(dt);
            return;
        }

        var dir:cc.Vec3 = cc.v3(this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_X),
                                this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_Y),
                                0);

        // 移动人物节点        
        var entityNode = this.getHost().getEntityNode();
        var playerMoveSpeed = this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_SPEED);
        var velocity = dir.mul( ( playerMoveSpeed+GameData.PayerMoveSpeed ) * dt );
        entityNode.setPosition(entityNode.position.add(velocity));
        entityNode.zIndex = GameData.App_Game_Heigth -(GameData.App_Game_Heigth/2 + entityNode.getPosition().y);
        // console.info(entityNode.zIndex);

        this.getHost().setClientProp(ClientDef.ENTITY_PROP_MOVE_X,0);
        this.getHost().setClientProp(ClientDef.ENTITY_PROP_MOVE_Y,0);
        
        super.update(dt);
    }
}
