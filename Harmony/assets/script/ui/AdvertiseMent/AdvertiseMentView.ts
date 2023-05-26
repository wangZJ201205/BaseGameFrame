/**
 * 广告界面
 */

import ClientDef from "../../common/ClientDef";
import EventName from "../../common/EventName";
import UIName from "../../common/UIName";
import Hero from "../../ghost/Hero";
import EventMgr from "../../manager/EventMgr";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdvertiseMentView extends UIParent {

    @property(cc.Button)
    upLevelBtn: cc.Button = null;

    @property(cc.Button)
    openBoxBtn: cc.Button = null;


    onLoad () 
    {
        this.setUIName(UIName.ADVERTISEMENT_VIEW);
        super.onLoad();
    }

    start () 
    {
        super.start();
    }

    register(): void 
    {
        this.upLevelBtn.node.on(cc.Node.EventType.TOUCH_END,this.UpLevelHandle,this); //添加监听
        this.openBoxBtn.node.on(cc.Node.EventType.TOUCH_END,this.openBoxHandle,this); //添加监听
        super.register();
    }

    close()
    {
        super.close();
    }

    UpLevelHandle(event,param)
    {
        if(!UIMgr.Instance.getUI(UIName.SELECTSKILL_VIEW))
        {
            UIMgr.Instance.openUI(UIName.SELECTSKILL_VIEW);
        }
        else
        {
            EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + UIName.SELECTSKILL_VIEW,null);
        }
    }

    openBoxHandle(event,param)
    {
        
    }

}
