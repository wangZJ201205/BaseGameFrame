/**
 * 衣服类组件
 */

import ClientDef from "../../common/ClientDef";
import ComponentParent from "./ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClothComponent extends ComponentParent {

    _curState : number;


    onLoad (host,parent) 
    {    
        this._node = parent.addComponent(cc.Sprite);
        super.onLoad(host,parent);
    }

    start () {
        this._curState = 0;
        super.start();
    }

    remove(): void {
        super.remove();
    }

    update (dt) 
    {
    }

    //运行状态
    runState(state)
    {
        if(state == this._curState)
        {
            return;
        }

        if( state == ClientDef.ENTITY_STATE_IDLE )
        {
            var self = this;
            cc.resources.load("test/123",cc.SpriteFrame,(err,sp)=>{
                self.node.getComponent(cc.Sprite).spriteFrame = sp;
            })
        }

        
    }

}
