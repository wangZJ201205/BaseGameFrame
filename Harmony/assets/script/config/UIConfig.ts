
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
        this.UIReg[UIName.LOGIN] = { path: this.PreGame + 'LoginPref'  ,index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.MSGBOX] = { path: this.PreGame + 'MsgBoxPref',index:ClientDef.UI_INDEX_TOP }; 
        this.UIReg[UIName.ROCKVIEW] = { path: this.PreGame + 'RockPref',index:ClientDef.UI_INDEX_COMMON }; 
        this.UIReg[UIName.TESTVIEW] = { path: this.PreGame + 'TestPref',index:ClientDef.UI_INDEX_COMMON }; 
        this.UIReg[UIName.VIEW_PLAYER_PGB] = { path: this.PreGame + 'HeroExpPref',index:ClientDef.UI_INDEX_COMMON }; 
        this.UIReg[UIName.VIEW_ADVERTISEMENT] = { path: this.PreGame + 'AdvertisePref',index:ClientDef.UI_INDEX_COMMON }; 
        this.UIReg[UIName.VIEW_SELECTSKILL] = { path: this.PreGame + 'SelectSkillPref',index:ClientDef.UI_INDEX_COMMON }; 
        this.UIReg[UIName.VIEW_START] = { path: this.PreGame + 'StartPref',index:ClientDef.UI_INDEX_COMMON }; 
        this.UIReg[UIName.VIEW_SET] = { path: this.PreGame + 'SetPref',index:ClientDef.UI_INDEX_COMMON }; 


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
