/**
 * 玩法中
 * 怪物组
 * 测试召唤怪物
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Hero from "../ghost/Hero";
import GhostMgr from "../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GPMonsterTestCallMonster {

    private delta: number = 0; //在测试模式下运行
    private count:number = 0;

    onLoad () 
    {

    }

    start () {
        this.delta = 1;
    }

    update () 
    {
        
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

        if( liveCnt >= GameData.Monster_Show_Amount )return;

        var monsters = []; //随机数组
        monsters.push(200002);
        monsters.push(200003);
        monsters.push(200004);

        var id = Math.random()*monsters.length ;
        id = monsters[ Math.floor(id) ];
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

}
