/**
 * 玩法中
 * 怪物组
 */

import GameData from "../common/GameData";
import { Logger } from "../common/log/Logger";
import DictMgr from "../manager/DictMgr";
import GhostMgr from "../manager/GhostMgr";

const {ccclass, property} = cc._decorator;

interface MapEventInfo {
    time ?:number;
    monster ?:number;
    delay ?:number;
    callmode ?:number;
    progress ?:number;
    delayStart ?:number;
}

@ccclass
export default class GPMonster {

    _eventArray : MapEventInfo[];
    _deltaTime : number; //记录开始时间
    _duringTime:number; //运行时间
    _curSceneRule : any;

    _totalPercent : number = 0;
    _deltaCallMonsterTime : number = 0; //放怪时间
    _duringCallMonsterTime : number = 0;
    _callMonsterCD : number = 0;
    _callMonsterArray : MapEventInfo[];
    onLoad () 
    {
        this._eventArray = [];
        this._callMonsterArray = [];
    }

    start () 
    {
        this._duringTime = 0;
        this._deltaTime = cc.director.getTotalTime();
        this._deltaCallMonsterTime = cc.director.getTotalTime();
        var rules = DictMgr.Instance.getDictByName("map_rule_data")[GameData.Map_Current_Id];

        rules.forEach(rule => {
            var info:MapEventInfo = { 
            time : rule.time,
            monster : rule.monster,
            delay : rule.delay,
            callmode : rule.callmode,
            progress : rule.percent, //进度
            delayStart : this._deltaTime,
            }
            this._eventArray.push(info);
        });

    }

    update () 
    {
        this.checkEventTime();
        this.checkCallMonster();   
    }

    checkCallMonster()
    {
        var durTime : number = cc.director.getTotalTime() - this._deltaCallMonsterTime;
        if(durTime > 100)
        {
            this._duringCallMonsterTime ++;
            this._deltaCallMonsterTime = cc.director.getTotalTime();
        }
        else
        {
            return;
        }

        //放怪
        if(this._duringCallMonsterTime*100 >= this._callMonsterCD)
        {
            var rand = Math.random()*this._totalPercent;
            var curpge = 0;
            var maxpge = 0;
            var callMonsterId = 0;
            for (let index = 0; index < this._callMonsterArray.length; index++) {
                const element = this._callMonsterArray[index];
                maxpge += element.progress;
                if( curpge <= rand && rand <= maxpge)
                {
                    callMonsterId = element.monster;
                    break;
                }
            }

            this.callMonster(callMonsterId);
            this._duringCallMonsterTime = 0;

            Logger.trace(">>this._callMonsterCD: "+this._callMonsterCD+" monsterId:" + callMonsterId + ">>_totalPercent:" + this._totalPercent);
        }
    }

    checkEventTime()
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

        for (let i = 0; i < this._eventArray.length; i++) 
        {
            var event = this._eventArray[i];
            if (this._duringTime < event.time) {
                // 尚未到事件时间
                break;
            }

            this._totalPercent += event.progress;
            this._callMonsterCD = event.delay;
            if(event.callmode == 1) //以概率方式召唤怪物
            {
                this._callMonsterArray.push(event);
            }
            else if(event.callmode  == 2) //必定出现怪物
            {
                this.callMonster(event.monster);
            }
            this._eventArray.splice(i,1);
            break;
        }
    }

    callMonster(monsterId)
    {
        if(monsterId == 0)return;
        var entity = GhostMgr.Instance.spawnEntity(monsterId); 
        entity.restart();
        entity.randomEntityPosition();
    }

    
    
}
