/**
 * 选择技能界面
 */

import ClientDef from "../../common/ClientDef";
import { EventName } from "../../common/EventName";
import GameData from "../../common/GameData";
import { UIName } from "../../common/UIName";
import { Hero } from "../../ghost/Hero";
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
    _learnGeneList : any[]; //可学习基因列表

    onLoad () 
    {
        this.setUIName(UIName.VIEW_SELECTSKILL);
        super.onLoad();

        this._learnList = [];
        this._learnList.push(10101);
        this._learnList.push(10201);
        this._learnList.push(10301);
        this._learnList.push(10401);
        this._learnList.push(10501);
        this._learnList.push(10601);
        this._learnList.push(10701);
        // this._learnList.push(10801);
        // this._learnList.push(10901);
        this._learnList.push(11001);
        // this._learnList.push(11101);
        this._learnList.push(11201);
        this._learnList.push(11301);
        this._learnList.push(11401);
        this._learnList.push(11501);
        this._learnList.push(11601);
        this._learnList.push(11701);
        this._learnList.push(11801);
        this._learnList.push(11901);

        this._learnGeneList = [];
        this._learnGeneList.push(10001);
        this._learnGeneList.push(10101);
        this._learnGeneList.push(10201);
        this._learnGeneList.push(10301);
        this._learnGeneList.push(10401);
        this._learnGeneList.push(10501);
        this._learnGeneList.push(10601);
        this._learnGeneList.push(10701);
        this._learnGeneList.push(10801);
        this._learnGeneList.push(10901);
    }

    start () 
    {
        super.start();
        GameData.Game_Pause_FLAG |= ClientDef.GAME_PAUSE_UPGRADE;

        this.scrollView.content.height = 460; // get total content height
        this.prepareSkillInfo();

    }

    register(): void 
    {
        super.register();
        EventMgr.Instance.On(EventName.EVENT_PLAYER_RAND_SKILL,this.onRandSkill,this);
    }

    close()
    {
        super.close();
        EventMgr.Instance.Off(EventName.EVENT_PLAYER_RAND_SKILL,this.onRandSkill,this);
        GameData.Game_Pause_FLAG &= ~ClientDef.GAME_PAUSE_UPGRADE;
    }

    onRandSkill(data)
    {
        this.prepareSkillInfo();
    }

    //准备数据
    prepareSkillInfo()
    {
        var canLearnSkill = [];
        var skills = Hero.Instance.getEntity().getSkill().getSkills();
        var skillCount = skills.length;

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
                        canLearnSkill.push({ id:sid + 1, type:1 });
                    }
                    canLearn = false;
                    break;
                }    
            }

            if(canLearn && skillCount != GameData.Player_Skill_Max)
            {
                canLearnSkill.push({id:skillId,type:1});
            }
        });

        this.prepareGeneInfo(canLearnSkill);
    }

    //准备基因数据
    prepareGeneInfo(canLearnSkill)
    {
        var genes = Hero.Instance.getEntity().getGene().getGenes();
        var geneCnt = 0;
        for (let index = 0; index < genes.length; index++) {
            const gene = genes[index];
            const gid = gene.getStaticId();
            if( Math.floor(gid / 10000) == 1 )
            {
                geneCnt++;
            }
        }
        const geneDict = DictMgr.Instance.getDictByName('gene_data');
        
        this._learnGeneList.forEach(geneId => { //踢出重复的元素
            var canLearn : boolean = true;
            for (let index = 0; index < genes.length; index++) {
                const gene = genes[index];
                const gid = gene.getStaticId();
                if ( Math.floor(gid / 100) == Math.floor(geneId/100) ) //如果人物技能列表中有且可以升级，就可以加入升级列表中
                {
                    if ( geneDict[gid + 1]) 
                    {
                        canLearnSkill.push({id:gid + 1,type:2});
                    }
                    canLearn = false;
                    break;
                }    
            }

            if(canLearn && geneCnt != GameData.Player_Gene_Max)
            {
                canLearnSkill.push({id:geneId,type:2});
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
        this.scrollView.content.height = GameData.Player_Skill_UpLevel_Count * 100 + 50; // get total content height
        this.scrollView.content.removeAllChildren();
    	for (let i = 0; i < randomValues.length; ++i) { // spawn items, we only need to do this once
    		let item = cc.instantiate(this.skillItem);
    		this.scrollView.content.addChild(item);
            item.getComponent('SelectSkillItem').initItem(randomValues[i]);
    		item.setPosition(0, -100 * (0.5 + i) - 10 * (i + 1));
    	}
    }

    

}
