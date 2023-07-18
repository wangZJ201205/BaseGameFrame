/**
 * 选择技能Item界面
 * 这个界面作为组件，不用继承UIParent
 * 销毁的时候随着主对象关闭即可
 */

import { EventName } from "../../common/EventName";
import { UIName } from "../../common/UIName";
import { Hero } from "../../ghost/Hero";
import DictMgr from "../../manager/DictMgr";
import EventMgr from "../../manager/EventMgr";
import LoadMgr from "../../manager/LoadMgr";

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
        EventMgr.Instance.Emit(EventName.UI_CLOSE_PANEL + UIName.VIEW_SELECTSKILL);
    }

    initItem(data)
    {
        if(data.type == 1)
        {
            this.pushSkill(data);
        }
        else if(data.type == 2)
        {
            this.pushGene(data);
        }
    }

    pushSkill(data)
    {
        this._skillId = data.id;
        const skillDict = DictMgr.Instance.getDictByName('skill_data')[this._skillId];
        this.skillDescRT.string = skillDict.name + " Lv." + (this._skillId%100) + "\n" + skillDict.desc;
        LoadMgr.Instance.LoadAssetWithType("ui/ui_img" ,cc.SpriteAtlas,(sp)=>{
            //检查人物状态
            let spriteFrame = sp.getSpriteFrame(skillDict.icon);
            this.skillIcon.spriteFrame = spriteFrame;
        })
    }

    pushGene(data)
    {
        this._skillId = data.id;
        const skillDict = DictMgr.Instance.getDictByName('gene_data')[this._skillId];
        this.skillDescRT.string = skillDict.name + " Lv." + (this._skillId%100) + "\n" + skillDict.desc;
        LoadMgr.Instance.LoadAssetWithType("ui/ui_img" ,cc.SpriteAtlas,(sp)=>{
            //检查人物状态
            let spriteFrame = sp.getSpriteFrame(skillDict.icon);
            this.skillIcon.spriteFrame = spriteFrame;
        })
    }
}
