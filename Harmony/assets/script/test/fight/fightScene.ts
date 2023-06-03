/**
 * 战斗技能测试场景
 */

import GM from "../../common/GM";
import GameData from "../../common/GameData";
import DictConfig from "../../config/DictConfig";
import UIConfig from "../../config/UIConfig";
import Hero from "../../ghost/Hero";
import DictMgr from "../../manager/DictMgr";
import EventMgr from "../../manager/EventMgr";
import SceneMgr from "../../manager/SceneMgr";
import Skill from "../../skill/Skill";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   
    private _skill : Skill; //技能

    onLoad () 
    {
        cc.director.getCollisionManager().enabled = true;//开启碰撞检测
        cc.director.getPhysicsManager().enabled = true;  //开启物理属性

        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
        cc.director.getCollisionManager().enabledDebugDraw = true;   //显示碰撞检测区域
        
        GameData.IsDebug = true;

        //加载配置文件
        UIConfig.init();
        DictConfig.init();

        GM.init();

        // UIMgr.Instance.onLoad();
        SceneMgr.Instance.onLoad();
        DictMgr.Instance.onLoad();
        Hero.Instance.onLoad();

        //加载管理类
        EventMgr.Instance.start();
        SceneMgr.Instance.start();
        DictMgr.Instance.start();

        
        this._skill = new Skill();
        this._skill.onLoad(this);
    }

    start () 
    {
        


    }

    update (dt) 
    {

    }
}
