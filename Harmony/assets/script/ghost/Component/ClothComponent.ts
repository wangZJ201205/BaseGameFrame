/**
 * 衣服类组件
 */

import ComponentParent from "./ComponentParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClothComponent extends ComponentParent {

    


    onLoad (parent) {
        
        this.node = parent.addComponent(cc.Sprite);
        super.onLoad(parent);
    }

    start () {
        //测试代码
        var self = this;
        cc.resources.load("test/123",cc.SpriteFrame,(err,sp)=>{
            self.node.getComponent(cc.Sprite).spriteFrame = sp;
        })
        super.start();
    }

    remove(): void {
        super.remove();
    }

    // update (dt) {}
}
