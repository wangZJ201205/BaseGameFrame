/**
 * 选择技能Item界面
 * 这个界面作为组件，不用继承UIParent
 * 销毁的时候随着主对象关闭即可
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
export default class SelectSkillItem extends cc.Component {

    @property(cc.Sprite)
    skillIcon: cc.Sprite = null;

    @property(cc.RichText)
    skillDescRT: cc.RichText = null;

    _skillId:number;
    
    onLoad () 
    {
        this.start();
    }

    start () 
    {
        this.node.on(cc.Node.EventType.TOUCH_END, this.selectItemHandle, this);
    }

    selectItemHandle(event,param)
    {
        Hero.Instance.getEntity().getSkill().addSkill(this._skillId);
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + UIName.SELECTSKILL_VIEW,null);
    }

    initItem(id)
    {
        this._skillId = id;
        const skillDict = DictMgr.Instance.getDictByName('skill_data')[this._skillId];
        this.skillDescRT.string = skillDict.name + " Lv." + (id%100) + "\n" + skillDict.desc;
        LoadMgr.Instance.LoadAssetWithType("ui/ui_img" ,cc.SpriteAtlas,(sp)=>{
            //检查人物状态
            let spriteFrame = sp.getSpriteFrame(skillDict.icon);
            this.skillIcon.spriteFrame = spriteFrame;
        })
    }
}
