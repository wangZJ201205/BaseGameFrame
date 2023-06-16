import Definition from "../../common/Definition";
import EventName from "../../common/EventName";
import GameData from "../../common/GameData";
import MessageName from "../../common/MessageDefine";
import UIName from "../../common/UIName";
import AudioMgr from "../../manager/AudioMgr";
import EventMgr from "../../manager/EventMgr";
import NetMgr from "../../manager/NetMgr";
import SceneMgr from "../../manager/SceneMgr";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroSelectView extends UIParent {

   
 
    onLoad () 
    {
        this.setUIName(UIName.VIEW_SEL_HERO);
        super.onLoad();
    }

    start () 
    {
       super.start();

    }

    register(): void 
    {
        super.register();
    }

   

    close()
    {
        super.close();
    }

    

}
