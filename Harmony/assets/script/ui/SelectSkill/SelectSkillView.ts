/**
 * 选择技能界面
 */

import ClientDef from "../../common/ClientDef";
import EventName from "../../common/EventName";
import GameData from "../../common/GameData";
import UIName from "../../common/UIName";
import Hero from "../../ghost/Hero";
import DictMgr from "../../manager/DictMgr";
import EventMgr from "../../manager/EventMgr";
import UIParent from "../UIParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectSkillView extends UIParent {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Prefab)
    skillItem: cc.Prefab = null;

    _learnList : any[]; //可学习列表

    onLoad () 
    {
        this.setUIName(UIName.SELECTSKILL_VIEW);
        super.onLoad();

        this._learnList = [];
        this._learnList.push(10101);
        this._learnList.push(10201);
        this._learnList.push(10301);
        this._learnList.push(10401);
        this._learnList.push(10501);
        this._learnList.push(10601);
        this._learnList.push(10701);
        this._learnList.push(10801);
    }

    start () 
    {
        super.start();
        GameData.Game_Pause_State = true;
        this.scrollView.content.height = 460; // get total content height
        this.prepareSkillInfo();

    }

    register(): void 
    {
        super.register();
    }

    close()
    {
        super.close();
        GameData.Game_Pause_State = false;
    }

    //准备数据
    prepareSkillInfo()
    {
        var canLearnSkill = [];
        var skills = Hero.Instance.getEntity().getSkill().getSkills();
        // var skillCount = skills.length;
        // if( skillCount == GameData.Player_Skill_Max )
        // {
        //     this.pushInfoIntoList(canLearnSkill);
        //     return;
        // }

        const skillDict = DictMgr.Instance.getDictByName('skill_data');
        
        this._learnList.forEach(skillId => { //踢出重复的元素
            var canLearn : boolean = true;
            for (let index = 0; index < skills.length; index++) {
                const skill = skills[index];
                const sid = skill.getStaticId();
                if ( Math.floor(sid / 100) == Math.floor(skillId/100) ) //如果人物技能列表中有且可以升级，就可以加入升级列表中
                {
                    if ( skillDict[sid + 1]) 
                    {
                        canLearnSkill.push(sid + 1);
                    }
                    canLearn = false;
                    break;
                }    
            }

            if(canLearn)
            {
                canLearnSkill.push(skillId);
            }
        });

        this.pushInfoIntoList(canLearnSkill);
    }

    //随机获取数组中的数值
    getRandomValues(arr: number[], count: number): number[] {
        const result = [];
        while (result.length < count) {
          const randomIndex = Math.floor(Math.random() * arr.length);
          const randomValue = arr[randomIndex];
          if (!result.includes(randomValue)) {
            result.push(randomValue);
          }
        }
        return result;
    }

    //数据填入list
    pushInfoIntoList(data) 
    {
        var len = data.length >= GameData.Player_Skill_UpLevel_Count ? GameData.Player_Skill_UpLevel_Count : data.length;
        const randomValues = this.getRandomValues(data,len);
       
    	for (let i = 0; i < randomValues.length; ++i) { // spawn items, we only need to do this once
    		let item = cc.instantiate(this.skillItem);
    		this.scrollView.content.addChild(item);
            item.getComponent('SelectSkillItem').initItem(randomValues[i]);
    		item.setPosition(0, -100 * (0.5 + i) - 10 * (i + 1));
    	}
    }

    

}
