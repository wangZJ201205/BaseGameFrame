/**
 * 碰撞组件
 * 注意：
 * 这个组件不会创建node
 * 只是用来监听碰撞事件
 */

import CollisionComponent from "../../../component/CollisionComponent";
import ClientDef from "../../../common/ClientDef";
import ComponentParent from "../ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CollComponent extends ComponentParent {

    
    onLoad (host) 
    {
        this._state = ClientDef.COMP_STATE_LOAD;
        this._host = host;
    }

    start () {
        super.start();

        var entityInfo = this._host.getEntityDict();
        //测试碰撞检测
        var rand = Math.random()*100;
        
        //之后做性能优化的时候关注这里
        if( entityInfo.collision == 1 )
        {
            var boxColl = this._host.addComponent(cc.CircleCollider);
            this._host.group = entityInfo.collGroup;
            var size:string = entityInfo.collRect;
            var collSize:string[] = size.split(",");
            boxColl.offset.x = Number(collSize[0]);
            boxColl.offset.y = Number(collSize[1]);
            boxColl.radius = Number(collSize[2]);

            var collCmp = this._host.addComponent(CollisionComponent);
            collCmp.setCollisioner(this);

            var physicsCircleCollider = this._host.addComponent(cc.PhysicsCircleCollider);
            physicsCircleCollider.offset.x = Number(collSize[0]);
            physicsCircleCollider.offset.y = Number(collSize[1]);
            physicsCircleCollider.radius = Number(collSize[2]);
        }
        else if(entityInfo.collision == 2)
        {
            var boxColl1 = this._host.addComponent(cc.BoxCollider);
            this._host.group = entityInfo.collGroup;
            var size:string = entityInfo.collRect;
            var collSize:string[] = size.split(",");
            boxColl1.offset.x = Number(collSize[0]);
            boxColl1.offset.y = Number(collSize[1]);
            boxColl1.size.width = Number(collSize[2]);
            boxColl1.size.height = Number(collSize[3]);

            var collCmp = this._host.addComponent(CollisionComponent);
            collCmp.setCollisioner(this);

            var physicsCircleCollider = this._host.addComponent(cc.PhysicsCircleCollider);
            physicsCircleCollider.offset.x = Number(collSize[0]);
            physicsCircleCollider.offset.y = Number(collSize[1]);
            physicsCircleCollider.radius = Number(collSize[2]);
        }
    }

    collisionEnter(other, self)
    {   
        
    }

    collisionStay(other, self)
    {   
        
    }

    collisionExit(other, self)
    {   

    }


}
