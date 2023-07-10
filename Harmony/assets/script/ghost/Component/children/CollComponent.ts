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
        // const otherCollider = other; // 获取触发碰撞的另一个组件
        // const node1 = self.node; // 获取当前碰撞组件所在的节点
        // const node2 = otherCollider.node; // 获取另一个碰撞组件所在的节点

        // // 获取两个节点的位置和大小信息
        // const rect1 = node1.getBoundingBoxToWorld();
        // const rect2 = node2.getBoundingBoxToWorld();

        // // 如果两个节点重叠，则将其分离
        // if (rect1.intersects(rect2)) {
        //     // 根据两个节点的位置和大小信息计算出它们之间的重叠部分
        //     const overlap = cc.Intersection.rectRect(rect1, rect2); 
        //     if (overlap.width > overlap.height) { // 如果重叠部分在左右，则沿着 X 轴平移
        //         if (rect1.x < rect2.x) {
        //             node1.x -= overlap.width / 2;
        //             node2.x += overlap.width / 2;
        //         } else {
        //             node1.x += overlap.width / 2;
        //             node2.x -= overlap.width / 2;
        //         }
        //     } else { // 如果重叠部分在上下，则沿着 Y 轴平移
        //         if (rect1.y < rect2.y) {
        //             node1.y -= overlap.height / 2;
        //             node2.y += overlap.height / 2;
        //         } else {
        //             node1.y += overlap.height / 2;
        //             node2.y -= overlap.height / 2;
        //         }
        //     }
        // }
    }

    collisionStay(other, self)
    {   
        
    }

    collisionExit(other, self)
    {   

    }


}
