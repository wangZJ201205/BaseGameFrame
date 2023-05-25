/**
 * 技能
 */

import ClientDef from "../common/ClientDef";
import GameData from "../common/GameData";
import Entity from "../ghost/Entity";
import DictMgr from "../manager/DictMgr";
import BulletParent from "./BulletParent";
import SkillParent from "./SkillParent";
import FireBallSkill from "./bullet/FireBall/FireBallSkill";
import IceBallSkill from "./bullet/IceBall/IceBallSkill";
import RevolutionBallSkill from "./bullet/RevolutionBall/RevolutionBallSkill";
import SwordBallBullet from "./bullet/SwordBall/SwordBallBullet";
import SwordBallSkill from "./bullet/SwordBall/SwordBallSkill";
import TaijiBallSkill from "./bullet/TaijiBall/TaijiBallSkill";
import ThunderBallSkill from "./bullet/thunder/ThunderBallSkill";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Skill {

    private _skills:SkillParent[];
    private _host:Entity;
    private _typeClass : {};
    onLoad (host) 
    {
        this._skills = [];
        this._typeClass = {};
        this._host = host;
        
        this._typeClass[ClientDef.SKILL_TYPE_FIREBALL] = FireBallSkill;     //注册火球术
        this._typeClass[ClientDef.SKILL_TYPE_ICEBALL] = IceBallSkill;       //冰弹
        this._typeClass[ClientDef.SKILL_TYPE_THUNDER] = ThunderBallSkill;   //雷劈
        this._typeClass[ClientDef.SKILL_TYPE_REVOLUTION] = RevolutionBallSkill;   //雷劈
        this._typeClass[ClientDef.SKILL_TYPE_SWORD_AIR] = SwordBallSkill; //剑气
        this._typeClass[ClientDef.SKILL_TYPE_TAIJI] = TaijiBallSkill; //太极
    }

    start () 
    {
        var entityStatic = this._host.getClientProp(ClientDef.ENTITY_PROP_STATICID);
        var skillid = DictMgr.Instance.getDictByName('entity_data')[entityStatic+""].skillid
        if(skillid != 0)
        {
            // this.addSkill(skillid);
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

        if(GameData.Shield_Skill)
        {
            console.info("屏蔽技能!");
            return;
        }

        var type = Math.floor(skillid / 100); //去整型

        if( !this._typeClass[type ] )
        {
            console.info("没有这种类型的子弹对象 :" + type);
            return;
        }

        var skill = this.findSkill(skillid,type);
        if( !skill )
        {
            skill = this.spawnSkill(type);
        }
        skill.setStaticId(skillid);
        skill.start();
    }

    //原有的基础上升级
    findSkill(skillid,type)
    {
        //已经有了改技能就升级
        for (let index = 0; index < this._skills.length; index++) {
            const skill = this._skills[index];
            if(Math.floor(skill.getStaticId() / 100) == type)
            {
                skill.setStaticId(skillid);
                skill.start();
                return skill;
            }
        }
        return null;
    }

    //生成一个新技能
    spawnSkill(type)
    {
        var skill = new (this._typeClass[type])();
        skill.onLoad(this._host);
        this._skills.push(skill);
        return skill;
    }

    getSkills()
    {
        return this._skills;
    }

}
