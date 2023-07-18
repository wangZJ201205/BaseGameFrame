/**
 * ui父类
 */

import { EventName } from "../common/EventName";
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
    }

    close()
    {
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
