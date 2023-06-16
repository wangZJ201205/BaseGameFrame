/**
 * 设置界面
 */

import ClientDef from "../../common/ClientDef";
import EventName from "../../common/EventName";
import GameData from "../../common/GameData";
import UIName from "../../common/UIName";
import EventMgr from "../../manager/EventMgr";
import SceneMgr from "../../manager/SceneMgr";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SetView extends UIParent {

    @property(cc.Button)
    exitBtn: cc.Button = null;

    @property(cc.Button)
    goonBtn: cc.Button = null;

    onLoad () 
    {
        this.setUIName(UIName.VIEW_SET);
        super.onLoad();
    }

    start () 
    {
        super.start();

        GameData.Game_Pause_FLAG |= ClientDef.GAME_PAUSE_SET;
    }

    register(): void 
    {
        this.exitBtn.node.on(cc.Node.EventType.TOUCH_END,this.exitGame,this); //添加监听
        this.goonBtn.node.on(cc.Node.EventType.TOUCH_END,this.goonGame,this); //添加监听
        super.register();
    }


    close()
    {
        super.close();
        GameData.Game_Pause_FLAG &= ~ClientDef.GAME_PAUSE_SET;
    }

    exitGame(event,param)
    {
        // SceneMgr.Instance.enterScene();
        SceneMgr.Instance.exitScene();
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + this.getUIName(),null);
        UIMgr.Instance.openUI(UIName.VIEW_START);
        UIMgr.Instance.openUI(UIName.VIEW_SEL_HERO);
    }

    goonGame(event,param)
    {
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + this.getUIName(),null);
    }
}
