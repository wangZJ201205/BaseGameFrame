
/**
 * 界面配置文件
 */
import ClientDef from "../common/ClientDef";
import EventName from "../common/EventName";
import UIName from "../common/UIName";

export default class UIConfig{

    private static readonly PreGame : string = '/ui/mainUI/';


    private static UIReg : {}; //界面地址注册

    static init()
    {
        this.UIReg = {};

        //注册界面
        this.UIReg[UIName.LOGIN] = { path: this.PreGame + 'LoginPref'  ,index:ClientDef.UI_INDEX_COMMON }; 
        this.UIReg[UIName.MSGBOX] = { path: this.PreGame + 'MsgBoxPref',index:ClientDef.UI_INDEX_TOP }; 



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
