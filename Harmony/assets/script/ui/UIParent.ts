/**
 * ui父类
 */

import EventName from "../common/EventName";
import EventMgr from "../manager/EventMgr";
import UIMgr from "../manager/UIMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIParent extends cc.Component {

    _uiName:string;

    onLoad () 
    {
        this.register();
    }

    start () 
    {

    }

    register()
    {
        EventMgr.Instance.On(EventName.UI_CLOSE_PANEL + this._uiName, this.close, this); //关闭界面
    }

    close()
    {
        EventMgr.Instance.Off(EventName.UI_CLOSE_PANEL + this._uiName, this.close, this); //关闭界面
        UIMgr.Instance.closeUI(this._uiName);
    }

    setUIName(uiname)
    {
        this._uiName = uiname;
    }

    getUIName()
    {
        return this._uiName;
    }

    // update (dt) {}
}
