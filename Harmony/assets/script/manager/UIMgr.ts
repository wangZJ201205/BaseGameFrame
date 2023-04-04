/**
 * 界面管理类
 */
import EventName from "../common/EventName";
import UIConfig from "../config/UIConfig";
import EventMgr from "./EventMgr";
import LoadMgr from "./LoadMgr";
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMgr extends ParentMgr {

    @property(cc.Camera)
    uiCamera: cc.Camera = null;

    @property(cc.Node)
    uiLayer: cc.Node = null;

    onLoad () 
    {
        super.onLoad();
        console.info("load UIMgr222");
    }

    start () {
        console.info("start UIMgr222");
    }

    update (dt) 
    {

    }

    register()
    {
        EventMgr.Instance.On(EventName.UI_OPEN_PANEL,this.openUI,this);//打开界面
    }

    openUI(data)
    {   
        var uiname = data.name;
        var uipath = UIConfig.getUIPath(uiname);

        if(!uipath)
        {
            console.error('没有注册此界面资源路径' + uiname + ',先注册此界面路径！');
            return;
        }

        console.info(">>>>>>open uiname:" + uiname+" | uipath:"+uipath.path);
        
        LoadMgr.Instance.LoadAsset(uipath.path,(prefab)=>{
            console.info("资源加载完成！" + uiname);
            //周四过来研究一下camera怎么用的
            var uiPref = cc.instantiate(prefab);
            uiPref.parent = this.uiLayer;
            // this.uiCamera.getp.addChild(uiPref);
            // var node = new cc.Node();
            // node.parent = this.uiLayer;
        });



    }

}
