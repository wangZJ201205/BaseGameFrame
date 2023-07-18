/**
 * 设置界面
 */

import ClientDef from "../../common/ClientDef";
import { EventName } from "../../common/EventName";
import GameData from "../../common/GameData";
import { UIName } from "../../common/UIName";
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

    @property(cc.Button)
    closeBtn: cc.Button = null;

    @property(cc.Toggle)
    bgMusicToggle: cc.Toggle = null;

    @property(cc.Toggle)
    audioToggle: cc.Toggle = null;

    onLoad () 
    {
        this.setUIName(UIName.VIEW_SET);
        super.onLoad();
    }

    start () 
    {
        super.start();

        GameData.Game_Pause_FLAG |= ClientDef.GAME_PAUSE_SET;

        this.bgMusicToggle.isChecked = GameData.Switch_BGM_Audio;
        this.audioToggle.isChecked =  GameData.Switch_Effect_Audio;
    }

    register(): void 
    {
        this.exitBtn.node.on(cc.Node.EventType.TOUCH_END,this.exitGame,this); //添加监听
        this.goonBtn.node.on(cc.Node.EventType.TOUCH_END,this.goonGame,this); //添加监听
        this.closeBtn.node.on(cc.Node.EventType.TOUCH_END,this.closeHandle,this); //添加监听
        this.bgMusicToggle.node.on(cc.Node.EventType.TOUCH_END,this.bgMusicToggleHandle,this); //添加监听
        this.audioToggle.node.on(cc.Node.EventType.TOUCH_END,this.audioToggleHandle,this); //添加监听
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
        UIMgr.Instance.closeUI(this.getUIName());
        UIMgr.Instance.openUI(UIName.VIEW_START);
    }

    goonGame(event,param)
    {
        UIMgr.Instance.closeUI(this.getUIName());
    }

    closeHandle(event,param)
    {
        UIMgr.Instance.closeUI(this.getUIName());
    }

    bgMusicToggleHandle(event,param)
    {
        var ischeck = !this.bgMusicToggle.isChecked;
        GameData.Switch_BGM_Audio = ischeck;
        cc.sys.localStorage.setItem('bgm_volume', ischeck?1:0);
            
    }

    audioToggleHandle(event,param)
    {
        var ischeck = !this.audioToggle.isChecked;
        GameData.Switch_Effect_Audio = ischeck;
        cc.sys.localStorage.setItem('effect_volume', ischeck?1:0);
    }

}
