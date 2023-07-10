/**
 * 玩法中
 * 怪物组
 */

import GameData from "../common/GameData";
import Hero from "../ghost/Hero";
import GameHelp from "../help/GameHelp";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GPMonster {

    _eventArray : any[];
    _startTime : number; //记录开始时间
    _curSceneRule : any;
    onLoad () 
    {
        this._eventArray = [];
    }

    start () 
    {
        this._startTime = cc.director.getTotalTime();
        var rules = DictMgr.Instance.getDictByName("map_rule_data")[GameData.Map_Current_Id];

        rules.forEach(rule => {
            var info:any = {};
            info.time = rule.time;
            info.monster = rule.monster;
            // info.group = rule.group;
            info.delay = rule.delay;
            info.createCount = rule.createCount;
            info.progress = 0; //进度
            info.delayStart = this._startTime;
            this._eventArray.push(info);
        });

    }

    update () 
    {
       

        var durTime : number = cc.director.getTotalTime() - this._startTime;
        const eventsToBeRemoved = [];

        for (let i = 0; i < this._eventArray.length; i++) 
        {
            var event = this._eventArray[i];
            if (durTime < event.time) {
                // 尚未到事件时间
                break;
            }

            const dtime = cc.director.getTotalTime() - event.delayStart;
            if (dtime < event.delay) {
                // 尚未到延迟时间
                continue;
            }
            //放怪
            this.callMonster(event.monster);

            event.delayStart = cc.director.getTotalTime();
            if(event.createCount > 0)
            {
                event.progress++;
            }

             // 事件已全部触发完毕
            if (event.progress >= event.createCount && event.createCount > 0) {
                eventsToBeRemoved.push(event);
            }
        }

         // 删除已触发完毕的事件
        for (const event of eventsToBeRemoved) {
            const index = this._eventArray.indexOf(event);
            if (index >= 0) {
                this._eventArray.splice(index, 1);
            }
        }

    }

    callMonster(monsterId)
    {
        var entity = GhostMgr.Instance.spawnEntity(monsterId); // 200001怪物id 怪物的释放规则还没有实现
        entity.restart();

        var direction = this.calculateRandomDirection();
        var position = this.calculateSpawnPosition(direction);

        entity.getEntityNode().setPosition(position.x, position.y);
        entity.getEntityNode().zIndex = GameData.App_Game_Heigth - position.y;
    }

    private calculateRandomDirection() 
    {
        var randX = Math.random() * 2 - 1;
        var randY = Math.random() * 2 - 1;
        return new cc.Vec2(randX, randY);
    }
    
    private calculateSpawnPosition(direction) 
    {
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
