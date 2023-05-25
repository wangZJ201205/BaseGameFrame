/**
 * 选择技能界面
 */

import ClientDef from "../../common/ClientDef";
import EventName from "../../common/EventName";
import GameData from "../../common/GameData";
import UIName from "../../common/UIName";
import Hero from "../../ghost/Hero";
import DictMgr from "../../manager/DictMgr";
import EventMgr from "../../manager/EventMgr";
import LoadMgr from "../../manager/LoadMgr";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectSkillItem extends UIParent {

    @property(cc.Sprite)
    skillIcon: cc.Sprite = null;

    @property(cc.RichText)
    skillDescRT: cc.RichText = null;

    _skillId:number;
    onLoad () 
    {
        this.setUIName(UIName.SELECTSKILL_VIEW);
        super.onLoad();
    }

    start () 
    {
        super.start();
    }

    register(): void 
    {
        super.register();
        this.node.on(cc.Node.EventType.TOUCH_END, this.selectItemHandle, this);
    }

    close()
    {
        super.close();
    }

    selectItemHandle(event,param)
    {
        console.info(">>>>>>>"+this._skillId);
        Hero.Instance.getEntity().getSkill().addSkill(this._skillId);
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + UIName.SELECTSKILL_VIEW,null);
    }

    initItem(id)
    {
        this._skillId = id;
        const skillDict = DictMgr.Instance.getDictByName('skill_data');
        this.skillDescRT.string = skillDict[this._skillId+""].name;
        LoadMgr.Instance.LoadAssetWithType("ui/ui_img" ,cc.SpriteAtlas,(sp)=>{
            //检查人物状态
            let spriteFrame = sp.getSpriteFrame(skillDict[this._skillId+""].icon);
            this.skillIcon.spriteFrame = spriteFrame;
        })
        
    }
}
