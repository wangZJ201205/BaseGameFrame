
//游戏入口

import EventName from "./common/EventName";
import UIConfig from "./config/UIConfig";
import EventMgr from "./manager/EventMgr";
import NetMgr from "./manager/NetMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStart extends cc.Component {

    
    onLoad () {}

    start () {
        console.info("Harmony GameStart");
        

        //加载配置文件
        UIConfig.init();

        //加载管理类
        EventMgr.Instance.start();
        NetMgr.Instance.start();



        EventMgr.Instance.Emit(EventName.UI_OPEN_PANEL,{name:EventName.UI_LOGIN});

    }

    update (dt) 
    {
        NetMgr.Instance.update(dt);
    }
}
