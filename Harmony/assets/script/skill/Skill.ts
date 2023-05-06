/**
 * 技能
 */

import ClientDef from "../common/ClientDef";
import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import BulletParent from "./BulletParent";
import SkillParent from "./SkillParent";
import FireBallSkill from "./bullet/fireball/FireBallSkill";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Skill {

    _skills:SkillParent[];
    _host:Entity;
    onLoad (host) 
    {
        this._skills = [];
        this._host = host;
    }

    start () 
    {
        var entityStatic = this._host.getClientProp(ClientDef.ENTITY_PROP_STATICID);
        var skillid = DictMgr.Instance.getDictByName('entity_data')[entityStatic+""].skillid
        if(skillid != 0)
        {
            this.addSkill(skillid);
        }

    }

    update (dt) 
    {
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
        var type = Math.floor(skillid / 10000); //去整型
        var skill = this.spawnSkill(type);
        if(!skill)
        {
            console.info("没有这种类型的子弹对象 :" + type);
            return;
        }
        skill.onLoad(this._host);
        skill.setStaticId(skillid);
        skill.start();
        this._skills.push(skill);
    }

    spawnSkill(type)
    {
        var skill = null;
        switch(type)
        {
            case ClientDef.SKILL_TYPE_FIREBALL: //火球
            skill = new FireBallSkill();
            break;
        }
        return skill;
    }

}
