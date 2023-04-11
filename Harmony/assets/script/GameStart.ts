
//游戏入口

import EventName from "./common/EventName";
import GameData from "./common/GameData";
import UIConfig from "./config/UIConfig";
import EventMgr from "./manager/EventMgr";
import GhostMgr from "./manager/GhostMgr";
import LoadMgr from "./manager/LoadMgr";
import NetMgr from "./manager/NetMgr";
import SceneMgr from "./manager/SceneMgr";
import UIMgr from "./manager/UIMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStart extends cc.Component {

    @property({displayName:'服务器IP和端口:'})
    ipPort: string = '';

    @property({displayName:'测试模式:'})
    isDebug:boolean = false;
    
    onLoad () {}

    start () {
        console.info("Harmony GameStart");
        
        GameData.IpPort = this.ipPort;
        GameData.IsDebug = this.isDebug;

        //加载配置文件
        UIConfig.init();

        UIMgr.Instance.onLoad();
        GhostMgr.Instance.onLoad();
        SceneMgr.Instance.onLoad();

        //加载管理类
        EventMgr.Instance.start();
        NetMgr.Instance.start();
        UIMgr.Instance.start();
        GhostMgr.Instance.start();
        SceneMgr.Instance.start();

        // LoadMgr.Instance.loadResources(()=>{
            // EventMgr.Instance.Emit(EventName.UI_OPEN_PANEL,{name:EventName.UI_LOGIN});
            UIMgr.Instance.openUI(EventName.UI_LOGIN);
        // });

    }

    update (dt) 
    {
        NetMgr.Instance.update(dt);
    }
}
