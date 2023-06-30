/**
 * 播放广告
 */

import ClientDef from "../../common/ClientDef";
import EventName from "../../common/EventName";
import GameData from "../../common/GameData";
import UIName from "../../common/UIName";
import Hero from "../../ghost/Hero";
import EventMgr from "../../manager/EventMgr";
import SceneMgr from "../../manager/SceneMgr";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayAdvertiseView extends UIParent {

    @property(cc.Button)
    exitBtn: cc.Button = null;

    @property(cc.Button)
    reLiveBtn: cc.Button = null;

    onLoad () 
    {
        this.setUIName(UIName.VIEW_PLAY_ADVERTISE);
        super.onLoad();
    }
    
    start () 
    {
        super.start();
        GameData.Game_Pause_FLAG |= ClientDef.GAME_PAUSE_ADVERTISE;
    }

    register(): void 
    {
        this.exitBtn.node.on(cc.Node.EventType.TOUCH_END,this.exitBtnHandle,this); //添加监听
        this.reLiveBtn.node.on(cc.Node.EventType.TOUCH_END,this.reliveHandle,this); //添加监听
        super.register();
    }

    close()
    {
        super.close();
        GameData.Game_Pause_FLAG &= ~ClientDef.GAME_PAUSE_ADVERTISE;
    }

    exitBtnHandle(event,param)
    {
        SceneMgr.Instance.exitScene();
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + this.getUIName(),null);
        UIMgr.Instance.openUI(UIName.VIEW_START);
    }

    reliveHandle(event,param)
    {
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + this.getUIName(),null);
        var entityInfo = Hero.Instance.getEntity().getEntityDict();
        Hero.Instance.getEntity().setClientProp(ClientDef.ENTITY_PROP_CUR_BLOOM, entityInfo["bloom"]);
    }


}
