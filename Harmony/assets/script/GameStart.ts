
//游戏入口

import EventName from "./common/EventName";
import GM from "./common/GM";
import GameData from "./common/GameData";
import UIName from "./common/UIName";
import DictConfig from "./config/DictConfig";
import UIConfig from "./config/UIConfig";
import Hero from "./ghost/Hero";
import EntityProxy from "./ghost/Proxy/EntityProxy";
import HeroProxy from "./ghost/Proxy/HeroProxy";
import DictMgr from "./manager/DictMgr";
import EventMgr from "./manager/EventMgr";
import NetMgr from "./manager/NetMgr";
import SceneMgr from "./manager/SceneMgr";
import UIMgr from "./manager/UIMgr";
import SocketRegister from "./socket/SocketRegister";
import LoginProxy from "./ui/login/LoginProxy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStart extends cc.Component {

    @property({displayName:'服务器IP和端口:'})
    ipPort: string = '';

    @property({displayName:'测试模式:'})
    isDebug:boolean = false;
    
    onLoad () 
    {
        cc.director.getCollisionManager().enabled = true;//开启碰撞检测
        cc.director.getPhysicsManager().enabled = true;  //开启物理属性
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
        if (this.isDebug) {
            cc.director.getCollisionManager().enabledDebugDraw = true;   //显示碰撞检测区域
        }
    }

    start () {
        console.info("Harmony GameStart");
        
        GameData.IpPort = this.ipPort;
        GameData.IsDebug = this.isDebug;

        
        //加载配置文件
        UIConfig.init();
        DictConfig.init();

        if(this.isDebug)
        {
            GM.init();
        }

        UIMgr.Instance.onLoad();
        SceneMgr.Instance.onLoad();
        DictMgr.Instance.onLoad();
        Hero.Instance.onLoad();

        //加载管理类
        EventMgr.Instance.start();
        NetMgr.Instance.start();
        UIMgr.Instance.start();
        SceneMgr.Instance.start();
        DictMgr.Instance.start();

        //注册所有的消息
        SocketRegister.start();

        //注册消息
        LoginProxy.register();
        HeroProxy.register();
        EntityProxy.register();

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
