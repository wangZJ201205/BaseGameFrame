/**
 * 英雄选择界面
 */
import { EventName } from "../../common/EventName";
import GameData from "../../common/GameData";
import { UIName } from "../../common/UIName";
import DictConfig from "../../config/DictConfig";
import DictMgr from "../../manager/DictMgr";
import EventMgr from "../../manager/EventMgr";
import LoadMgr from "../../manager/LoadMgr";
import SceneMgr from "../../manager/SceneMgr";
import UIMgr from "../../manager/UIMgr";
import UIParent from "../UIParent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroSelectView extends UIParent {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Button)
    startBtn: cc.Button = null;

    @property(cc.Prefab)
    heroItem: cc.Prefab = null;

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    @property(cc.Sprite)
    closeBtn: cc.Sprite = null;

    @property(cc.RichText)
    heroDesc: cc.RichText = null;

 
    onLoad () 
    {
        this.setUIName(UIName.VIEW_SEL_HERO);
        super.onLoad();
    }

    start () 
    {
        super.start();
        
        this.initHeroList();
    }

    register(): void 
    {
        this.startBtn.node.on(cc.Node.EventType.TOUCH_END,this.openGame,this); //添加监听
        this.closeBtn.node.on(cc.Node.EventType.TOUCH_END,this.closeView,this); //添加监听
        super.register();
    }

    close()
    {
        super.close();
    }

    initHeroList()
    {
        var heroId = 100000;
        var isPushHero = true;
        var heroInfo = DictMgr.Instance.getDictByName("entity_data");
        var index = 0;
        while(isPushHero)
        {
            heroId++;
            if( !heroInfo[heroId] )
            {
                isPushHero = false;
                continue;
            }
            var info = heroInfo[heroId];
            let item = cc.instantiate(this.heroItem);
            this.scrollView.content.addChild(item);
            item.getComponent('HeroSelectItemView').initItem(info);
            item.setPosition(0, -110 * (0.5 + index) - 10 * (index + 1));

            if(index == 0)
            {
                GameData.Hero_Current_ID = heroId;
                item.getComponent('HeroSelectItemView').selectItemHandle(null,null);
            }

            index++;
        }
        this.scrollView.content.height = index * 120 ; // get total content height
    }

    openGame(event,param)
    {
        UIMgr.Instance.openUI(UIName.VIEW_SEL_SCENE);
        // SceneMgr.Instance.enterScene();
        UIMgr.Instance.closeUI(this.getUIName());
        // UIMgr.Instance.closeUI(UIName.VIEW_START);
    }

    closeView(event,param)
    {
        UIMgr.Instance.closeUI(this.getUIName());
    }
    
    selectHero(info)
    {
        this.heroDesc.string = info.desc;
        LoadMgr.Instance.LoadAssetWithType("ui/ui_img" ,cc.SpriteAtlas,(sp)=>{
            //检查人物状态
            let spriteFrame = sp.getSpriteFrame(info.headIcon);
            this.headIcon.spriteFrame = spriteFrame;
        })
    }

}
