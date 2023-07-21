/**
 * 选择技能Item界面
 */

import GameData from "../../common/GameData";
import DictMgr from "../../manager/DictMgr";
import LoadMgr from "../../manager/LoadMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectSceneItem extends cc.Component {

    @property(cc.Sprite)
    skillIcon: cc.Sprite = null;

    @property(cc.RichText)
    skillDescRT: cc.RichText = null;

    @property(cc.Sprite)
    selSprite: cc.Sprite = null;

    _sceneId:number;
    
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
        var parent = this.node.parent;
        for (let index = 0; index < parent.childrenCount; index++) {
            const child = parent.children[index];
            var script = child.getComponent("SelectSceneItem");
            if(script)
            {
                script.setSelectFrameVisible(false);
            }
        }

        GameData.Map_Current_Id = this._sceneId;
        this.selSprite.node.active = true;
    }

    setSelectFrameVisible(boo)
    {
        this.selSprite.node.active = boo;
    }

    initItem(data)
    {
        this.pushScene(data);
    }

    pushScene(data)
    {
        this._sceneId = data;
        const skillDict = DictMgr.Instance.getDictByName('map_data')[this._sceneId];
        this.skillDescRT.string = skillDict.desc;
        LoadMgr.Instance.LoadAssetWithType("ui/ui_img" ,cc.SpriteAtlas,(sp)=>{
            //检查人物状态
            let spriteFrame = sp.getSpriteFrame(skillDict.icon);
            this.skillIcon.spriteFrame = spriteFrame;
        })
    }

}
