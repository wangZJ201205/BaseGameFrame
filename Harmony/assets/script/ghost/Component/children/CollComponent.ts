/**
 * 碰撞组件
 * 注意：
 * 这个组件不会创建node
 * 只是用来监听碰撞事件
 */

import CollisionComponent from "../../../Component/CollisionComponent";
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
        if( entityInfo.collision == 1 )
        {
            var boxColl = this._host.addComponent(cc.BoxCollider);
            this._host.group = entityInfo.collGroup;
            var size:string = entityInfo.collRect;
            var collSize:string[] = size.split(",");
            boxColl.offset.x = Number(collSize[0]);
            boxColl.offset.y = Number(collSize[1]);
            boxColl.size.width = Number(collSize[2]);
            boxColl.size.height = Number(collSize[3]);

            var collCmp = this._host.addComponent(CollisionComponent);
            collCmp.setCollisioner(this);
        }
    }

    collisionEnter(other, self)
    {   
        // console.info(">>>>>>>>>>11111111111");
    }

    collisionStay(other, self)
    {   
        
    }

    collisionExit(other, self)
    {   

    }


}
