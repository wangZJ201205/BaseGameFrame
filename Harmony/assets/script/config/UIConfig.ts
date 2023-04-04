
/**
 * 界面配置文件
 */

import EventName from "../common/EventName";

export default class UIConfig{

    private static readonly PreGame : string = 'ui/mainUI/';


    private static UIReg : {}; //界面地址注册

    static init()
    {
        this.UIReg = {};

        //注册界面

        this.UIReg[EventName.UI_LOGIN] = { path: this.PreGame + 'LoginPref' }; 

    }

    static getUIPath(uiName)
    {
        if(!this.UIReg[uiName])
        {
            return null;
        }
        return this.UIReg[uiName];
    }

}
