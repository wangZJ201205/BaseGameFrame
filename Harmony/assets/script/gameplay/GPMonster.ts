/**
 * 玩法中
 * 怪物组
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Hero from "../ghost/Hero";
import GhostMgr from "../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GPMonster {

    private delta: number = 0;
    private count:number = 0;

    onLoad () 
    {

    }

    start () {
        this.delta = 1;
    }

    update () 
    {

        if(GameData.Game_Mode == ClientDef.GAME_MODE_TEST_FIGHT)
        {
            return;
        }

        this.delta -= 1;
        if(this.delta <= 0)
        {
            this.delta = GameData.Game_Play_Monster_Time_Delay;
        }
        else
        {
            return;
        }
        
        this.checkMonsterCount();
    }

    private checkMonsterCount()
    {
        var count = GhostMgr.Instance.entitys.length;
        var liveCnt = 0;
        for (let index = 0; index < count; index++) {
            const element = GhostMgr.Instance.entitys[index];
            if( element.isRun() && element.isMonster())
            {
                liveCnt++;
            }
        }

        if( liveCnt > GameData.Monster_Show_Amount )return;

        var rand = Math.random()*100;
        var id = rand > 50 ? 200003 : 200002;

        var entity = GhostMgr.Instance.spawnEntity(id); // 200001怪物id 怪物的释放规则还没有实现
        entity.restart();

        var direction = this.calculateRandomDirection();
        var position = this.calculateSpawnPosition(direction);

        entity.getEntityNode().setPosition(position.x, position.y);
        entity.getEntityNode().zIndex = GameData.App_Game_Heigth - position.y;
    }

    private calculateRandomDirection() {
        var randX = Math.random() * 2 - 1;
        var randY = Math.random() * 2 - 1;
        return new cc.Vec2(randX, randY);
    }
    
    private calculateSpawnPosition(direction) {
        var heroPosition = Hero.Instance.getEntity().position;
        var x = 0;
        var y = 0;
    
        if (direction.x < 0) {
            x = Math.random() * GameData.App_Game_Width + heroPosition.x - GameData.App_Game_Width / 2;
            y = direction.y < 0 ? -360 : 360;
            y += heroPosition.y;
        } else {
            y = Math.random() * GameData.App_Game_Heigth + heroPosition.y - GameData.App_Game_Heigth / 2;
            x = direction.y < 0 ? -640 : 640;
            x += heroPosition.x;
        }
    
        return new cc.Vec2(x, y);
    }

    addMonster(position)
    {
        var entity = GhostMgr.Instance.spawnEntity(200001); // 200001怪物id 怪物的释放规则还没有实现
        entity.restart();
        entity.getEntityNode().setPosition(position.x - 640, position.y - 360);
        entity.getEntityNode().zIndex = GameData.App_Game_Heigth - position.y;
    }
}
