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
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;     //开启碰撞检测
        // if (this.isDebug) {
            manager.enabledDebugDraw = true;   //显示碰撞检测区域
        // }


    }

    onCollisionEnter(other, self){
        // 进入碰撞状态时调用的函数
        console.info(">>>>>>>>>>>>>11111");
    }

    // update (dt) {}
}
