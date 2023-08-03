import ClientDef from "../common/ClientDef";
import DictMgr from "../manager/DictMgr";
import Skill from "../skill/Skill";
import EntityParent from "./EntityParent";
import EntityComponentMgr from "./component/EntityComponentMgr ";
import GeneMgr from "./gene/GeneMgr";
import MonsterStateMachine from "./stateMachine/MonsterStateMachine";
import PlayerStateMachine from "./stateMachine/PlayerStateMachine";

/**
 * 对象
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class Entity extends EntityParent {

    private _skill:Skill; //技能
    private _gene:GeneMgr; //基因管理

    onLoad () 
    {
        super.onLoad();

        this._skill = new Skill();
        this._skill.onLoad(this);

        this._gene = new GeneMgr();
        this._gene.onLoad(this);
    }

    //可以用于延迟加载
    //初始化一次
    start () 
    {
        super.start();
        this._skill.start();
        this._gene.start();

        this._entityStateMachine = this.spawnStateMachine(); //此时才知道对象类型是什么
        this._entityStateMachine.onLoad(this);
        this._entityStateMachine.start();

        var entityInfo = this.getEntityDict();

        this.setCProp(ClientDef.ENTITY_PROP_MOVE_SPEED, entityInfo.moveSpeed);
        this.setCProp(ClientDef.ENTITY_PROP_DEFENSE, entityInfo.defense);
    }

    //反复初始化
    restart()
    {
        super.restart();
        this._gene.restart();
        this._entityStateMachine.restart();
    }

    remove()
    {
        if(this._skill)
        {
            this._skill.remove();
        }
        if(this._gene)
        {
            this._gene.remove();
        }
        super.remove();
    }

    getSkill()
    {
        return this._skill;
    }

    getGene()
    {
        return this._gene;
    }

    spawnComponentMgr()
    {
        return new EntityComponentMgr();
    }

    spawnStateMachine()
    {
        if(this._entityStateMachine)
        {
            return this._entityStateMachine;
        }

        var entityType = this._client_prop_map[ClientDef.ENTITY_PROP_TYPE];
        var machine = null;
        if(entityType == ClientDef.ENTITY_TYPE_PLAYER)
        {
            machine = new PlayerStateMachine();
        }
        else if(entityType == ClientDef.ENTITY_TYPE_MONSTER)
        {
            machine = new MonsterStateMachine();
        }
        return machine;
    }

    update (dt) 
    {
        super.update(dt);

        if(this._skill)
        {
            this._skill.update(dt);
        }
        if(this._gene)
        {
            this._gene.update(dt);
        }
    }

    //获取对象配置信息
    getEntityDict()
    {
        var entityInfo = DictMgr.Instance.getDictByName('entity_data');
        entityInfo = entityInfo[this.getCProp(ClientDef.ENTITY_PROP_STATICID)];
        return entityInfo;
    }

    isHero()
    {
        return this.getCProp(ClientDef.ENTITY_PROP_TYPE) == ClientDef.ENTITY_TYPE_PLAYER;
    }

    isMonster()
    {
        return this.getCProp(ClientDef.ENTITY_PROP_TYPE) == ClientDef.ENTITY_TYPE_MONSTER;
    }

    isBoss()
    {
        var entityInfo = DictMgr.Instance.getDictByName('entity_data');
        return entityInfo["boss"] == 1 ? true : false;
    }

    isLife()
    {
        return this.getCProp(ClientDef.ENTITY_PROP_CUR_BLOOM) > 0;
    }

}
