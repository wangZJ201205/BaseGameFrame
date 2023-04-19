
import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
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

    update () 
    {
        
        if( this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_X) == 0 &&
        this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_Y) == 0 )
        {
            super.update();
            return;
        }

        var dir:cc.Vec3 = cc.v3(this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_X),
                                this.getHost().getClientProp(ClientDef.ENTITY_PROP_MOVE_Y),
                                0);

        // 移动人物节点        
        var entityNode = this.getHost().getEntityNode();
        var velocity = dir.mul(GameData.PayerMoveSpeed);
        entityNode.setPosition(entityNode.position.add(velocity));

        super.update();
    }
}
