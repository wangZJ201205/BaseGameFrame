/**
 * 游戏顶部
 */

import { EventName } from "../../common/EventName";
import GameData from "../../common/GameData";
import { UIName } from "../../common/UIName";
import GameHelp from "../../help/GameHelp";
import EventMgr from "../../manager/EventMgr";
import GhostMgr from "../../manager/GhostMgr";
import UIMgr from "../../manager/UIMgr";
import GameMath from "../../utils/GameMath";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamingTopView extends UIParent {

    @property(cc.Button)
    setBoxBtn: cc.Button = null;

    @property(cc.Label)
    time: cc.Label = null;

    @property(cc.Label)
    monsterLab: cc.Label = null;

    @property(cc.Label)
    killMonstersLab: cc.Label = null;

    _runTime : number;

    onLoad () 
    {
        this.setUIName(UIName.VIEW_PLAY_GAMING_TOP);
        super.onLoad();

        if(!GameData.IsDebug)
        {
            this.monsterLab.node.active = false;
        }
    }

    start () 
    {
        this._runTime = 0;
        super.start();
        this.schedule(this.updateTimer, 1.0); 
    }

    register(): void 
    {
        this.setBoxBtn.node.on(cc.Node.EventType.TOUCH_END,this.openSetHandle,this); //添加监听
        super.register();
    }

    close()
    {
        super.close();
        this.unschedule(this.updateTimer); 
    }

    updateTimer()
    {
        if(GameHelp.GetGamePauseState())
        {
            return;
        }
        this.monsterLab.string = "怪物数量:" + GhostMgr.Instance.entitys.length;
        this.killMonstersLab.string = "杀死数量:" + GameData.Kill_Monster_Count;
        this._runTime++;
        this.time.string = GameMath.convertToTimeFormat(this._runTime);
    }

    openSetHandle(event,param)
    {
        if(!UIMgr.Instance.getUI(UIName.VIEW_SET))
        {
            UIMgr.Instance.openUI(UIName.VIEW_SET);
        }
        else
        {
            UIMgr.Instance.closeUI(UIName.VIEW_SET);
        }
    }


}
