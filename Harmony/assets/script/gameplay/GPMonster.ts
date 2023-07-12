/**
 * 玩法中
 * 怪物组
 */

import GameData from "../common/GameData";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GPMonster {

    _eventArray : any[];
    _deltaTime : number; //记录开始时间
    _duringTime:number; //运行时间
    _curSceneRule : any;
    onLoad () 
    {
        this._eventArray = [];
    }

    start () 
    {
        this._duringTime = 0;
        this._deltaTime = cc.director.getTotalTime();
        var rules = DictMgr.Instance.getDictByName("map_rule_data")[GameData.Map_Current_Id];

        rules.forEach(rule => {
            var info:any = {};
            info.time = rule.time;
            info.monster = rule.monster;
            // info.group = rule.group;
            info.delay = rule.delay;
            info.createCount = rule.createCount;
            info.progress = 0; //进度
            info.delayStart = this._deltaTime;
            this._eventArray.push(info);
        });

    }

    update () 
    {
       
        var durTime : number = cc.director.getTotalTime() - this._deltaTime;
        if(durTime > 100)
        {
            this._duringTime ++;
            this._deltaTime = cc.director.getTotalTime();
        }
        else
        {
            return;
        }
        
        const eventsToBeRemoved = [];

        for (let i = 0; i < this._eventArray.length; i++) 
        {
            var event = this._eventArray[i];
            if (this._duringTime < event.time) {
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
        var entity = GhostMgr.Instance.spawnEntity(monsterId); 
        entity.restart();
        entity.randomEntityPosition();
    }

    
    
}
