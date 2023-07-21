/**
 * 选择场景界面
 */

import { UIName } from "../../common/UIName";
import DictMgr from "../../manager/DictMgr";
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

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Prefab)
    sceneItem: cc.Prefab = null;

    onLoad () 
    {
        this.setUIName(UIName.VIEW_SEL_SCENE);
        super.onLoad();
    }

    start () 
    {
        super.start();
        this.initList();
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

    initList()
    {
        var dict = DictMgr.Instance.getDictByName("map_data");
        var maps = Object.keys(dict);
        this.scrollView.content.height = maps.length * 195 + 50; // get total content height
        maps.forEach((value:string,index:number)=>
        {
            var info = dict[value];
            let item = cc.instantiate(this.sceneItem);
    		this.scrollView.content.addChild(item);
            item.getComponent('SelectSceneItem').initItem(info.id);
    		item.setPosition(0, -195 * (0.5 + index) );
            if(index == 0)
            {
                item.getComponent('SelectSceneItem').selectItemHandle(null,null);
            }
        })

    }
    
}
