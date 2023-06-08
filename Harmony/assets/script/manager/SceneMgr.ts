/**
 * 场景
 */
import ItemMgr from "./ItemMgr";
import ClientDef from "../common/ClientDef";
import GamePlay from "../gameplay/GamePlay";
import GhostMgr from "./GhostMgr";
import LabelMgr from "./LabelMgr";
import ParentMgr from "./ParentMgr";
import SkillMgr from "./SkillMgr";
import GameData from "../common/GameData";
import GameHelp from "../help/GameHelp";
import ParticleMgr from "./ParticleMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneMgr extends ParentMgr {

    public static readonly Instance : SceneMgr = new SceneMgr();
    layer: cc.Node = null; //显示层
    
    skillLayer : cc.Node = null

    getLayer()
    {
        return this.layer;
    }

    onLoad () 
    {
        super.onLoad();
        console.info("load SceneMgr");
        
        
        GhostMgr.Instance.onLoad();
        LabelMgr.Instance.onLoad();
        GamePlay.Instance.onLoad();
        ItemMgr.Instance.onLoad();
        SkillMgr.Instance.onLoad();

    }

    start() {
        console.info("start SceneMgr");

        var canvas = cc.director.getScene().getChildByName('Canvas');
        this.layer = new cc.Node();
        this.layer.zIndex = ClientDef.GAME_INDEX_SCENE;
        this.layer.width = cc.winSize.width;
        this.layer.height = cc.winSize.height;
        this.layer.parent = canvas;

        GhostMgr.Instance.start();
        LabelMgr.Instance.start();
        ItemMgr.Instance.start();
        SkillMgr.Instance.start();
        
        if( GameData.Game_Mode == ClientDef.GAME_MODE_TEST_FIGHT )
        {
            this.layer.on(cc.Node.EventType.TOUCH_END, this.onLayerTouchEnd, this);
        }
    }

    update () 
    {
        if(GameHelp.GetGamePauseState())
        {
            return;
        }
        GamePlay.Instance.update();
        
    }

    enterScene()
    {
        GamePlay.Instance.start();

    }

    exitScene()
    {
        GhostMgr.Instance.clear();
        LabelMgr.Instance.clear();
        ItemMgr.Instance.clear();
        SkillMgr.Instance.clear();
        GamePlay.Instance.clear();
        ParticleMgr.Instance.clear();
    }

    onLayerTouchEnd(event) {
        let touchPos = event.getLocation();
        var gpMonster = GamePlay.Instance.getMonsters();
        if(!gpMonster)
        {
            return;
        }
        gpMonster.addMonster(touchPos);
    }

}
