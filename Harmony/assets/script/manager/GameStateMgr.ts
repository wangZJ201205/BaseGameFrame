//游戏运行状态

import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

//游戏运行状态
enum GameState
{
    loadConfig, //加载配置
}

@ccclass
export default class GameStateMgr extends ParentMgr {

    static Instance : GameStateMgr;

    gameState:GameState;

    static getInstance()
    {   
        let mgr : GameStateMgr = GameStateMgr.Instance;
        if( !GameStateMgr.Instance )
        {
            mgr = new GameStateMgr();
        }
        console.info("getInstance GameStateMgr");
        return mgr;
    }


    onLoad () 
    {
        super.onLoad();
        GameStateMgr.Instance = this;
        this.gameState = GameState.loadConfig;
        console.info("load GameStateMgr");
    }

    start () {

    }

    //获取游戏状态
    getGameState()
    {
        return this.gameState;
    }

    // update (dt) {}
}
