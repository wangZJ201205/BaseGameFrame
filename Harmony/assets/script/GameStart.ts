
//游戏入口

import NetMgr from "./manager/NetMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStart extends cc.Component {

   
    onLoad () {}

    start () {
        console.info("Harmony GameStart");

        NetMgr.getInstance().start();
    }

    // update (dt) {}
}
