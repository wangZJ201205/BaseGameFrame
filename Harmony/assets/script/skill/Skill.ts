/**
 * 技能
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import SkillParent from "./SkillParent";
import SkillSystem from "./system/SkillSystem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Skill {

    private _skills:SkillParent[];
    private _host:Entity;
    
    onLoad (host) 
    {
        this._skills = [];
        this._host = host;
    }

    start () 
    {
        var entityStatic = this._host.getCProp(ClientDef.ENTITY_PROP_STATICID);
        var skillid = DictMgr.Instance.getDictByName('entity_data')[entityStatic+""].skillid
        if(skillid != 0)
        {
            this.addSkill(skillid);
        }
    }

    update (dt) 
    {
        if(!this._host.isLife())return;
        
        for (let i = 0; i < this._skills.length; i++) {
            const element = this._skills[i];
            element.update(dt);
        }
    }

    remove()
    {
        for (let i = 0; i < this._skills.length; i++) {
            const element = this._skills[i];
            element.remove();
        }
    }

    addSkill(skillid)
    {

        if(GameData.Shield_Skill)
        {
            console.info("屏蔽技能!");
            return;
        }

        var type = Math.floor(skillid / 100); //去整型
        var classT = SkillSystem.getSkillClass(type);
        if( !classT )
        {
            console.info("没有这种类型的技能对象 :" + type);
            return;
        }

        var skill = this.findSkill(skillid,type);
        if( !skill )
        {
            skill = this.spawnSkill(type);
        }
        skill.setStaticId(skillid);
        skill.start();

        //技能按照优先级排序
        this._skills.sort((skill1:SkillParent,skill2:SkillParent):number=>
        {
            if (skill1.getPriority() < skill2.getPriority()) {
                return -1;
            } else if (skill1.getPriority() > skill2.getPriority()) {
                return 1;
            } else {
                return 0;
            }
        })
    }

    //原有的基础上升级
    findSkill(skillid,type)
    {
        //已经有了改技能就升级
        for (let index = 0; index < this._skills.length; index++) {
            const skill = this._skills[index];
            if(Math.floor(skill.getStaticId() / 100) == type)
            {
                return skill;
            }
        }
        return null;
    }

    //生成一个新技能
    spawnSkill(type)
    {
        var classT = SkillSystem.getSkillClass(type);
        var skill = new classT();
        skill.onLoad(this._host);
        this._skills.push(skill);
        return skill;
    }

    getSkills()
    {
        return this._skills;
    }

}
