/**
 * 游戏顶部
 */

import { UIName } from "../../common/UIName";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossComingView extends UIParent {

   
    _runTime : number;

    onLoad () 
    {
        this.setUIName(UIName.VIEW_BOSS_COMING);
        super.onLoad();

    }

    start () 
    {
        this._runTime = 0;
        super.start();
        this.schedule(this.updateTimer, 3.0); 
    }

    register(): void 
    {
        super.register();
    }

    close()
    {
        super.close();
        this.unschedule(this.updateTimer); 
    }

    updateTimer()
    {
        UIMgr.Instance.closeUI(UIName.VIEW_BOSS_COMING);
    }

}
