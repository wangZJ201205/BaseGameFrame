/**
 * 开始界面
 */

import ClientDef from "../../common/ClientDef";
import EventName from "../../common/EventName";
import UIName from "../../common/UIName";
import Hero from "../../ghost/Hero";
import EventMgr from "../../manager/EventMgr";
import LoadMgr from "../../manager/LoadMgr";
import SceneMgr from "../../manager/SceneMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartView extends UIParent {

    @property(cc.Button)
    startBtn: cc.Button = null;

    @property(cc.Sprite)
    backGround: cc.Sprite = null;

    onLoad () 
    {
        this.setUIName(UIName.VIEW_START);
        super.onLoad();
    }

    start () 
    {
        super.start();

        LoadMgr.Instance.LoadAsset("big/background_character",(asset)=>{
            this.backGround.spriteFrame = new cc.SpriteFrame(asset);
        });

    }

    register(): void 
    {
        this.startBtn.node.on(cc.Node.EventType.TOUCH_END,this.openGame,this); //添加监听
        super.register();
    }


    close()
    {
        super.close();
    }

    openGame(event,param)
    {
        SceneMgr.Instance.enterScene();
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + this.getUIName(),null);
    }

}
