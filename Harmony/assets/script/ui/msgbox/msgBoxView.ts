/**
 * 公共文字提示类
 */

import EventName from "../../common/EventName";
import UIName from "../../common/UIName";
import DictMgr from "../../manager/DictMgr";
import EventMgr from "../../manager/EventMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends UIParent {

    @property(cc.RichText)
    richText: cc.RichText = null;

    startPos:cc.Vec3;

    activeTime:number;

    onLoad () 
    {
        this.setUIName(UIName.MSGBOX);
        super.onLoad();
    }

    start () 
    {
        this.startPos = new cc.Vec3();
        this.startPos.x = this.richText.node.getPosition().x;
        this.startPos.y = this.richText.node.getPosition().y;
        this.richText.node.active = false;
        this.activeTime = 0;
        super.start();
    }

    register(): void 
    {
        EventMgr.Instance.On(EventName.EVENT_MSGBOX_ERROR,this.showError,this);
        super.register();
    }


    close()
    {
        EventMgr.Instance.Off(EventName.EVENT_MSGBOX_ERROR,this.showError,this);
        super.close();
    }

    /**
     * 
     * @param data content
     */
    showError(data)
    {
        this.richText.node.setPosition(this.startPos);
        this.richText.string = DictMgr.Instance.getDictByName('language_data')[data.error];
        this.richText.node.active = true;
        this.activeTime = 3;

    }
    update (dt) {
        if(this.activeTime <= 0)
        {
            this.richText.node.active = false;
            return;
        }
        this.activeTime -= dt;
    }
}
