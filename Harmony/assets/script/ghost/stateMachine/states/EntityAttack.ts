/**
 * 怪物技能攻击
 */

import ClientDef from "../../../common/ClientDef";
import GameData from "../../../common/GameData";
import DictMgr from "../../../manager/DictMgr";
import SkillParent from "../../../skill/SkillParent";
import Entity from "../../Entity";
import { Hero } from "../../Hero";
import StateParent from "../StateParent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityAttack extends StateParent {

    private _bulletInfo : any;
    private _skillReleaseState : boolean = false; //技能释放状态

    start () 
    {
        var entityInfo = this._host.getEntityDict();
        this._bulletInfo = DictMgr.Instance.getDictByName("skill_data")[entityInfo.skillid];

        this._host.on("animation_AttackFinish",this.onFinish, this);

        var cloth = this._host.getEntityComponent(ClientDef.ENTITY_COMP_CLOTH);
        cloth.runState(ClientDef.ENTITY_STATE_IDLE);
    }

    stop()
    {
        this._host.off("animation_AttackFinish",this.onFinish, this);
    }

    onFinish()
    {
        this._skillReleaseState = false;
    }

    update (dt) 
    {
        var hostInfo = this.getHost().getEntityDict();
        var heroNode = Hero.Instance.getEntity().getEntityNode();

        if(!heroNode.isLife())
        {
            return;
        }

        if(this._skillReleaseState) return;

        var myNode = this.getHost().getEntityNode();
        var currentPosition = this.getHost().getEntityNode().position;
        const distance = heroNode.position.sub(currentPosition).mag();
        
        var skill : SkillParent = this.findReleasableSkill();
        if(skill)
        {
            skill.releaseBullet();
            this._skillReleaseState = true;
            var cloth = this._host.getEntityComponent(ClientDef.ENTITY_COMP_CLOTH);
            cloth.runState(this._stateID,true);
        }
        else if (distance > hostInfo.mindistance ) //超出范围移除
        {
            this.getHost().getStateMachine().addState(ClientDef.ENTITY_STATE_WALK);
            this.getHost().getStateMachine().runNextState();
        }
    }

    //寻找可以释放的技能
    findReleasableSkill()
    {
        var skillmgr = (this._host as Entity).getSkill();
        if(!skillmgr){
            return null;
        }
        var skills = skillmgr.getSkills();
        for (let index = 0; index < skills.length; index++) {
            const skill = skills[index];
            if(skill && skill.releaseableSkill(Hero.Instance.getEntity()))
            {
                return skill;
            }
        }
        return null;
    }


    
}
