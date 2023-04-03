
import EventName from "../common/EventName";
import EventMgr from "./EventMgr";
import ParentMgr from "./ParentMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIMgr extends ParentMgr {

    @property(cc.Camera)
    uiCamera: cc.Camera = null;

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
        console.info(">>>>>>open ui" + uiname);

        

    }

}
