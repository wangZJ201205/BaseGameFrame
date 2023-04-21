
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;


@ccclass
export default class PlayerWalk extends StateParent {

    
    onLoad (id,host) 
    {
        super.onLoad(id,host);
    }

    start () 
    {
        super.start();
    }

    stop()
    {

    }

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
        var velocity = dir.mul(GameData.PayerMoveSpeed*dt);
        entityNode.setPosition(entityNode.position.add(velocity));
        entityNode.zIndex = GameData.App_Game_Heigth -(GameData.App_Game_Heigth/2 + entityNode.getPosition().y);
        console.info(entityNode.zIndex);

        this.getHost().setClientProp(ClientDef.ENTITY_PROP_MOVE_X,0);
        this.getHost().setClientProp(ClientDef.ENTITY_PROP_MOVE_Y,0);
        
        super.update(dt);
    }
}
