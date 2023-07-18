/**
 * 怪物技能攻击
 */

import ClientDef from "../../../common/ClientDef";
import DictMgr from "../../../manager/DictMgr";
import SkillParent from "../../../skill/SkillParent";
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
        
        var heroNode = Hero.Instance.getEntity().getEntityNode();

        if(!heroNode.isLife())
        {
            return;
        }

        var myNode = this.getHost().getEntityNode();
        var currentPosition = this.getHost().getEntityNode().position;

        const distance = heroNode.position.sub(currentPosition).mag();

        //超出范围移除
        if (distance > this._bulletInfo.distanceOfEnemy )
        {
            this.getHost().getStateMachine().addState(ClientDef.ENTITY_STATE_WALK);
            this.getHost().getStateMachine().runNextState();
        }

        if(this._skillReleaseState) return;
        var skill : SkillParent = this.findReleasableSkill();
        if(skill)
        {
            skill.releaseShootBullet();
            this._skillReleaseState = true;
            var cloth = this._host.getEntityComponent(ClientDef.ENTITY_COMP_CLOTH);
            cloth.runState(this._stateID,true);
        }
    }

    //寻找可以释放的技能
    findReleasableSkill()
    {
        var skillmgr = this._host.getSkill();
        if(!skillmgr){
            return null;
        }
        var skills = skillmgr.getSkills();
        for (let index = 0; index < skills.length; index++) {
            const skill = skills[index];
            if(skill && skill.releaseableSkill())
            {
                return skill;
            }
        }
        return null;
    }


    
}
