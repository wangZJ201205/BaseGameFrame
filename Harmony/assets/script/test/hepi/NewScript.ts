// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    
    @property(cc.Node)
    parend1: cc.Node = null;

    @property(cc.Node)
    parend2: cc.Node = null;

    

    start () {

        this.parend1.parent.zIndex = 100;
        this.parend2.zIndex = -1;

        
    }

    // update (dt) {}
}
