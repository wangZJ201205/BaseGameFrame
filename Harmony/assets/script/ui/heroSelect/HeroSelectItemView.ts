/**
 * 选择英雄界面 -- item
 */

import GameData from "../../common/GameData";
import LoadMgr from "../../manager/LoadMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroSelectItemView extends cc.Component {

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    @property(cc.Sprite)
    selectFrame: cc.Sprite = null;

    @property(cc.RichText)
    heroDesc: cc.RichText = null;

    _heroInfo : any;

    _selFrameState:boolean = false;
    // onLoad () {}

    start () 
    {
        this.selectFrame.node.active = this._selFrameState;
        this.node.on(cc.Node.EventType.TOUCH_END, this.selectItemHandle, this);
    }

    selectItemHandle(event,param)
    {
        var parent = this.node.parent;
        for (let index = 0; index < parent.childrenCount; index++) {
            const child = parent.children[index];
            var script = child.getComponent("HeroSelectItemView");
            if(script)
            {
                script.setSelectFrameVisible(false);
            }
        }
        this.selectFrame.node.active = true;
        this._selFrameState = true
        GameData.Hero_Current_ID = this._heroInfo.id;

        var rootParent = parent.parent.parent.parent.getComponent("HeroSelectView");
        rootParent.selectHero(this._heroInfo);
    }

    setSelectFrameVisible(boo)
    {
        this.selectFrame.node.active = boo;
        this._selFrameState = boo;
    }


    initItem(info)
    {
        this._heroInfo = info;

        this.heroDesc.string = info.desc;
        LoadMgr.Instance.LoadAssetWithType("ui/ui_img" ,cc.SpriteAtlas,(sp)=>{
            //检查人物状态
            let spriteFrame = sp.getSpriteFrame(info.headIcon);
            this.headIcon.spriteFrame = spriteFrame;
        })

    }
}
