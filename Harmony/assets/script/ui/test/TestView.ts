/**
 * 工具辅助界面
 */

import GM from "../../common/GM";
import GameData from "../../common/GameData";
import Hero from "../../ghost/Hero";
import GhostMgr from "../../manager/GhostMgr";
import GameMath from "../../utils/GameMath";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestView extends cc.Component {

    @property(cc.Label)
    entityCountLab: cc.Label = null;

    @property(cc.Label)
    playerPosLab:cc.Label = null;

    @property(cc.EditBox)
    monsterTotalEB:cc.EditBox = null;

    @property(cc.EditBox)
    gmEditBox:cc.EditBox = null;

    @property(cc.Button)
    gmButton:cc.Button = null;

    @property(cc.Label)
    timeLabel:cc.Label = null;

    // onLoad () {}
    _runTime : number;

    start () 
    {
        this.monsterTotalEB.string = "" + GameData.Monster_Show_Amount;
        this._runTime = 0;
        this.register();
    }

    register()
    {
        this.monsterTotalEB.node.on('editing-return', this.onEditBoxEvent, this)
        this.gmButton.node.on(cc.Node.EventType.TOUCH_END,this.onGmOrderHandle,this); //添加监听
        this.schedule(this.updateTimer, 1.0); 
    }

    update (dt) 
    {
        this.entityCountLab.string = GhostMgr.Instance.entitys.length + "";

        var pos = Hero.Instance.getEntity().position;
        this.playerPosLab.string = Math.floor(pos.x) + "," + Math.floor(pos.y);
    }

    onEditBoxEvent(event)
    {
        var text = this.monsterTotalEB.string;
        GameData.Monster_Show_Amount = Number(text);
    }

    onGmOrderHandle(event,param)
    {
        var order : string = this.gmEditBox.string;
        var orders :string[] = order.split(" ");
        GM.useGm(orders);
    }

    updateTimer()
    {
        if(GameData.Game_Pause_State)
        {
            return;
        }
        this._runTime++;
        this.timeLabel.string = GameMath.convertToTimeFormat(this._runTime);
    }

}
