/**
 * 开始界面
 */

import UIName from "../../common/UIName";
import LoadMgr from "../../manager/LoadMgr";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartView extends UIParent {

    @property(cc.Button)
    startBtn: cc.Button = null;

    @property(cc.Sprite)
    backGround: cc.Sprite = null;

    onLoad () 
    {
        this.setUIName(UIName.VIEW_START);
        super.onLoad();
    }

    start () 
    {
        super.start();

        LoadMgr.Instance.LoadAsset("big/background_character",(asset)=>{
            this.backGround.spriteFrame = new cc.SpriteFrame(asset);
        });

    }

    register(): void 
    {
        this.startBtn.node.on(cc.Node.EventType.TOUCH_END,this.openGame,this); //添加监听
        super.register();
    }


    close()
    {
        super.close();
    }

    openGame(event,param)
    {
        UIMgr.Instance.openUI(UIName.VIEW_SEL_HERO);

    }

}
