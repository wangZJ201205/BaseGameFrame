
/**
 * 界面配置文件
 */
import ClientDef from "../common/ClientDef";
import { UIName } from "../common/UIName";

export interface UIConfigItem {
    /** 远程包名 */
    path?: string;
    /** 窗口层级 */
    index: number;
}

export default class UIConfig{

    private static readonly PreGame : string = '/ui/mainUI/';


    private static UIReg : {[key:string]:UIConfigItem} = {}; //界面地址注册

    static init()
    {
        this.UIReg = {};

        //注册界面
        this.UIReg[UIName.LOGIN] = { path: this.PreGame + 'LoginPref'  ,index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.MSGBOX] = { path: this.PreGame + 'MsgBoxPref',index:ClientDef.UI_INDEX_TOP }; 
        this.UIReg[UIName.ROCKVIEW] = { path: this.PreGame + 'RockPref',index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.TESTVIEW] = { path: this.PreGame + 'TestPref',index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.VIEW_PLAYER_PGB] = { path: this.PreGame + 'HeroExpPref',index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.VIEW_ADVERTISEMENT] = { path: this.PreGame + 'AdvertisePref',index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.VIEW_SELECTSKILL] = { path: this.PreGame + 'SelectSkillPref',index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.VIEW_START] = { path: this.PreGame + 'StartPref',index:ClientDef.UI_INDEX_LOW }; 
        this.UIReg[UIName.VIEW_SET] = { path: this.PreGame + 'SetPref',index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.VIEW_SEL_HERO] = { path: this.PreGame + 'SelectHeroPref',index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.VIEW_PLAY_ADVERTISE] = { path: this.PreGame + 'PlayAdvertisePref',index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.VIEW_PLAY_GAMING_TOP] = { path: this.PreGame + 'GamIngTopPref',index:ClientDef.UI_INDEX_MIDDLE }; 
        this.UIReg[UIName.VIEW_SEL_SCENE] = { path: this.PreGame + 'SelectScenePref',index:ClientDef.UI_INDEX_MIDDLE }; 

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
