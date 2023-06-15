/**
 * 玩法中
 * 怪物组
 * 测试战斗功能
 */

import GameData from "../common/GameData";
import GhostMgr from "../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GPMonsterTestFight {

    onLoad () 
    {

    }

    start () {
    }

    update () 
    {
        
    }

    addMonster(position)
    {
        var entity = GhostMgr.Instance.spawnEntity(200001); // 200001怪物id 怪物的释放规则还没有实现
        entity.restart();
        entity.getEntityNode().setPosition(position.x - 640, position.y - 360);
        entity.getEntityNode().zIndex = GameData.App_Game_Heigth - position.y;
    }
}
