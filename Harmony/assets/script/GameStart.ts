
//游戏入口

import { EventName } from "./common/EventName";
import GM from "./common/GM";
import GameData from "./common/GameData";
import { UIName } from "./common/UIName";
import DictConfig from "./config/DictConfig";
import UIConfig from "./config/UIConfig";
import { Hero } from "./ghost/Hero";
import EntityProxy from "./ghost/proxy/EntityProxy";
import HeroProxy from "./ghost/proxy/HeroProxy";
import ComponentSystem from "./ghost/system/ComponentSystem";
import AudioMgr from "./manager/AudioMgr";
import DictMgr from "./manager/DictMgr";
import EventMgr from "./manager/EventMgr";
import NetMgr from "./manager/NetMgr";
import ParticleMgr from "./manager/ParticleMgr";
import SceneMgr from "./manager/SceneMgr";
import UIMgr from "./manager/UIMgr";
import SocketRegister from "./socket/SocketRegister";
import LoginProxy from "./ui/login/LoginProxy";
import GameMath from "./utils/GameMath";

const {ccclass, property} = cc._decorator;


@ccclass
export default class GameStart extends cc.Component {

    @property({displayName:'服务器IP和端口:'})
    ipPort: string = '';

    @property({displayName:'测试模式:'})
    isDebug:boolean = false;

    @property({displayName:'游戏模式:'})
    gameMode:number = 0;
    
    onLoad () 
    {
        cc.director.getCollisionManager().enabled = true;//开启碰撞检测
        cc.director.getPhysicsManager().enabled = false;  //开启物理属性

        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
        if (this.isDebug) {
            cc.director.getCollisionManager().enabledDebugDraw = false;   //显示碰撞检测区域
        }

        GameData.Game_Mode = this.gameMode; //游戏模式
    }

    start () {
        console.info("Harmony GameStart");
        
        GameData.IpPort = this.ipPort;
        GameData.IsDebug = this.isDebug;

        
        //加载配置文件
        UIConfig.init();
        DictConfig.init();
        ComponentSystem.init();
        
        if(this.isDebug)
        {
            GM.init();
        }

        UIMgr.Instance.onLoad();
        SceneMgr.Instance.onLoad();
        DictMgr.Instance.onLoad();
        Hero.Instance.onLoad();
        AudioMgr.Instance.onLoad();
        ParticleMgr.Instance.onLoad();

        //加载管理类
        EventMgr.Instance.start();
        NetMgr.Instance.start();
        UIMgr.Instance.start();
        SceneMgr.Instance.start();
        DictMgr.Instance.start();
        AudioMgr.Instance.start();
        ParticleMgr.Instance.start();
        

        //注册所有的消息
        SocketRegister.start();

        GameMath.start();

        //注册消息
        LoginProxy.register();
        HeroProxy.register();
        EntityProxy.register();

        this.register();
    }

    register()
    {
        EventMgr.Instance.On(EventName.EVENT_LOADED_MODULE,this.onLoaded,this);

        cc.game.on(cc.game.EVENT_HIDE, () => {
            // 游戏进入后台时的处理逻辑
            GameData.Game_Show = false;
            console.log('游戏进入后台');
        });

        cc.game.on(cc.game.EVENT_SHOW, () => {
            // 游戏从后台返回前台时的处理逻辑
            GameData.Game_Show = true;
            console.log('游戏从后台返回前台');
        });
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
