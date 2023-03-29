// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let self = this;
        cc.resources.load("test/123",cc.SpriteFrame,(err,sp)=>{
            self.getComponent(cc.Sprite).spriteFrame = sp;
        })
    }

    // update (dt) {}
}
