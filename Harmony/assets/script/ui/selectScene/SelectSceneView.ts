/**
 * 选择场景界面
 */

import { UIName } from "../../common/UIName";
import SceneMgr from "../../manager/SceneMgr";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectSceneView extends UIParent {

    @property(cc.Button)
    confirmBtn: cc.Button = null;

    @property(cc.Button)
    cancelBtn: cc.Button = null;

    onLoad () 
    {
        this.setUIName(UIName.VIEW_SEL_SCENE);
        super.onLoad();
    }

    register(): void 
    {
        this.confirmBtn.node.on(cc.Node.EventType.TOUCH_END,this.confirmHandle,this); //添加监听
        this.cancelBtn.node.on(cc.Node.EventType.TOUCH_END,this.cancelHandle,this); //添加监听
        super.register();
    }

    confirmHandle(event,param)
    {
        SceneMgr.Instance.enterScene();
        UIMgr.Instance.closeUI(this.getUIName());
        UIMgr.Instance.closeUI(UIName.VIEW_START);
    }

    cancelHandle(event,param)
    {
        UIMgr.Instance.closeUI(UIName.VIEW_SEL_SCENE);
    }
    
}
