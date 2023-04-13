
//游戏入口

import EventName from "./common/EventName";
import GameData from "./common/GameData";
import UIName from "./common/UIName";
import DictConfig from "./config/DictConfig";
import UIConfig from "./config/UIConfig";
import Hero from "./ghost/Hero";
import DictMgr from "./manager/DictMgr";
import EventMgr from "./manager/EventMgr";
import GhostMgr from "./manager/GhostMgr";
import LoadMgr from "./manager/LoadMgr";
import NetMgr from "./manager/NetMgr";
import SceneMgr from "./manager/SceneMgr";
import UIMgr from "./manager/UIMgr";
import SocketRegister from "./socket/SocketRegister";

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
        DictConfig.init();

        UIMgr.Instance.onLoad();
        GhostMgr.Instance.onLoad();
        SceneMgr.Instance.onLoad();
        DictMgr.Instance.onLoad();
        Hero.Instance.onLoad();

        //加载管理类
        EventMgr.Instance.start();
        NetMgr.Instance.start();
        UIMgr.Instance.start();
        GhostMgr.Instance.start();
        SceneMgr.Instance.start();
        DictMgr.Instance.start();
        Hero.Instance.start();

        SocketRegister.start();

        // LoadMgr.Instance.loadResources(()=>{
            // EventMgr.Instance.Emit(EventName.UI_OPEN_PANEL,{name:EventName.UI_LOGIN});
            // UIMgr.Instance.openUI(EventName.UI_LOGIN);
        // });

        this.register();
    }

    register()
    {
        EventMgr.Instance.On(EventName.EVENT_LOADED_MODULE,this.onLoaded,this);
    }

    update (dt) 
    {
        NetMgr.Instance.update(dt);
    }

    onLoaded(data)
    {
        GameData.CurrLoadModules++;
        if(GameData.CurrLoadModules == GameData.NeedWaitModules)
        {
            UIMgr.Instance.openUI(UIName.MSGBOX);
            UIMgr.Instance.openUI(UIName.LOGIN);
        }
    }
}
