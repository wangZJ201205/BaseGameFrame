// 飞机大战
// wzj
// 2023.2.23
// 游戏入口

import GameStateMgr from "./script/manager/GameStateMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {



    onLoad () 
    {
        console.info("load game base info");
        GameStateMgr.getInstance().onLoad();

    }

    start () {
        console.info("start game");
        GameStateMgr.getInstance().start();
    }

    


    // update (dt) {}
}
