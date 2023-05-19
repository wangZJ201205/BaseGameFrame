/**
 * 进度条界面
 */

import ClientDef from "../../common/ClientDef";
import EventName from "../../common/EventName";
import UIName from "../../common/UIName";
import Hero from "../../ghost/Hero";
import EventMgr from "../../manager/EventMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerExpView extends UIParent {

    @property(cc.ProgressBar)
    pgb: cc.ProgressBar = null;

    @property(cc.Label)
    lvLab: cc.Label = null;


    onLoad () 
    {
        this.setUIName(UIName.PLAYER_PGB_VIEW);
        super.onLoad();
    }

    start () 
    {
        super.start();
        this.pgb.progress = 0;
        this.lvLab.string = "LV.1";
    }

    register(): void 
    {
        EventMgr.Instance.On(EventName.EVENT_PLAYER_EXP_CHANGE,this.playerExpChange,this);
        super.register();
    }


    close()
    {
        EventMgr.Instance.Off(EventName.EVENT_PLAYER_EXP_CHANGE,this.playerExpChange,this);
        super.close();
    }

    playerExpChange(data)
    {
        var entity = Hero.Instance.getEntity();
        this.pgb.progress = entity.getClientProp(ClientDef.ENTITY_PROP_CUR_EXP) / entity.getClientProp(ClientDef.ENTITY_PROP_MAX_EXP);
        this.lvLab.string = "LV."+ entity.getClientProp(ClientDef.ENTITY_PROP_LV);
    }

}
