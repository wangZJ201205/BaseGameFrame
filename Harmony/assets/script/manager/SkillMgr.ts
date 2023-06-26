/**
 * 技能管理
 */
import ClientDef from "../common/ClientDef";
import Item from "../ghost/Item";
import BulletParent from "../skill/BulletParent";
import ArcheryBoomBullet from "../skill/bullet/ArcheryBoomBullet";
import ArcheryBullet from "../skill/bullet/ArcheryBullet";
import FireBallBullet from "../skill/bullet/FireBallBullet";
import FireHorseBullet from "../skill/bullet/FireHorseBullet";
import FireWallEndBullet from "../skill/bullet/FireWallEndBullet";
import FireWallMidBullet from "../skill/bullet/FireWallMidBullet";
import FireWallPrevBullet from "../skill/bullet/FireWallPrevBullet";
import IceBallBullet from "../skill/bullet/IceBallBullet";
import MiZongQuanBullet from "../skill/bullet/MiZongQuanBullet";
import PosionEndBullet from "../skill/bullet/PosionEndBullet";
import PosionStartBallBullet from "../skill/bullet/PosionStartBallBullet";
import PosionTimboEndBullet from "../skill/bullet/PosionTimboEndBullet";
import PosionTimboMidBullet from "../skill/bullet/PosionTimboMidBullet";
import PosionTimboPrevBullet from "../skill/bullet/PosionTimboPrevBullet";
import ShieldBallBullet from "../skill/bullet/ShieldBallBullet";
import SwordBallBullet from "../skill/bullet/SwordBallBullet";
import TaijiBallBullet from "../skill/bullet/TaijiBallBullet";
import ThunderBallBullet from "../skill/bullet/ThunderBallBullet";
import TimeBombEndBullet from "../skill/bullet/TimeBombEndBullet";
import TimeBombMidBullet from "../skill/bullet/TimeBombMidBullet";
import TimeBombPrevBullet from "../skill/bullet/TimeBombPrevBullet";
import ArcherySkill from "../skill/skills/ArcherySkill";
import FireBallSkill from "../skill/skills/FireBallSkill";
import FireHorseSkill from "../skill/skills/FireHorseSkill";
import FireWallSkill from "../skill/skills/FireWallSkill";
import IceBallSkill from "../skill/skills/IceBallSkill";
import MiZongQuanSkill from "../skill/skills/MiZongQuanSkill";
import PosionTimboSkill from "../skill/skills/PosionTimboSkill";
import RevolutionBallSkill from "../skill/skills/RevolutionBallSkill";
import ShieldBallSkill from "../skill/skills/ShieldBallSkill";
import SwordBallSkill from "../skill/skills/SwordBallSkill";
import TaijiBallSkill from "../skill/skills/TaijiBallSkill";
import ThunderBallSkill from "../skill/skills/ThunderBallSkill";
import TimeBombSkill from "../skill/skills/TimeBombSkill";
import PosionBallSkill from "../skill/skills/posionBallSkill";
import DictMgr from "./DictMgr";
import GhostMgr from "./GhostMgr";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillMgr extends ParentMgr {

    public static readonly Instance : SkillMgr = new SkillMgr();

    private _layerHigh: cc.Node = null; //引用的ghostMgr对象层级 高层
    private _layerLow: cc.Node = null; //引用的ghostMgr对象层级 底层

    private _typeSkillClass : {};
    private _typeBulletClass : {};

    onLoad () 
    {
        this._typeSkillClass = {};
        this._typeBulletClass = {};
    }

    start () 
    {
        this._layerHigh = new cc.Node();
        this._layerHigh.zIndex = ClientDef.SCENE_INDEX_SKILL_HIGH;
        this._layerHigh.width = cc.winSize.width;
        this._layerHigh.height = cc.winSize.height;
        this._layerHigh.parent = SceneMgr.Instance.layer;

        this._layerLow = new cc.Node();
        this._layerLow.zIndex = ClientDef.SCENE_INDEX_SKILL_LOW;
        this._layerLow.width = cc.winSize.width;
        this._layerLow.height = cc.winSize.height;
        this._layerLow.parent = SceneMgr.Instance.layer;

        this._typeSkillClass[ClientDef.SKILL_TYPE_FIREBALL] = FireBallSkill;             //注册火球术
        this._typeSkillClass[ClientDef.SKILL_TYPE_ICEBALL] = IceBallSkill;               //冰弹
        this._typeSkillClass[ClientDef.SKILL_TYPE_THUNDER] = ThunderBallSkill;           //雷劈
        this._typeSkillClass[ClientDef.SKILL_TYPE_REVOLUTION] = RevolutionBallSkill;     //公转球
        this._typeSkillClass[ClientDef.SKILL_TYPE_SWORD_AIR] = SwordBallSkill;           //剑气
        this._typeSkillClass[ClientDef.SKILL_TYPE_TAIJI] = TaijiBallSkill;               //太极
        this._typeSkillClass[ClientDef.SKILL_TYPE_SHIELD] = ShieldBallSkill;             //护盾
        this._typeSkillClass[ClientDef.SKILL_TYPE_POISON] = PosionBallSkill;             //放毒
        this._typeSkillClass[ClientDef.SKILL_TYPE_MIZONGQUAN] = MiZongQuanSkill;         //迷踪拳
        this._typeSkillClass[ClientDef.SKILL_TYPE_ARCHERY] = ArcherySkill;               //射箭
        this._typeSkillClass[ClientDef.SKILL_TYPE_FIREHORSE] = FireHorseSkill;           //烈火马
        this._typeSkillClass[ClientDef.SKILL_TYPE_POSION_TIMBO] = PosionTimboSkill;      //毒树藤
        this._typeSkillClass[ClientDef.SKILL_TYPE_FIREWALL] = FireWallSkill;             //火墙
        this._typeSkillClass[ClientDef.SKILL_TYPE_TIMEBOMB] = TimeBombSkill;             //定时炸弹



        this._typeBulletClass[ClientDef.BULLET_SCRIPT_COMMON]   = BulletParent;          //子弹父类
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_FIREBALL] = FireBallBullet;         //火球类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_ICEBALL] = IceBallBullet;           //冰球类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_LEIPI]   = ThunderBallBullet;       //落雷类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_SWORD_AIR]   = SwordBallBullet;       //落雷类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_TAIJI]   = TaijiBallBullet;       //太极类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_SHIELD]   = ShieldBallBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_START]   = PosionStartBallBullet;       //放毒类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_END]   = PosionEndBullet;       //放毒类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_MIZONGQUAN]   = MiZongQuanBullet;       //迷踪拳类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_ARCHERY]      = ArcheryBullet;       //射箭类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_ARCHERY_BOOM]   = ArcheryBoomBullet;       //射箭类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_FIRE_HORSE]   = FireHorseBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_TIMBO1]   = PosionTimboPrevBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_TIMBO2]   = PosionTimboMidBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_TIMBO3]   = PosionTimboEndBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_FIREWALL1]   = FireWallPrevBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_FIREWALL2]   = FireWallMidBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_FIREWALL3]   = FireWallEndBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_TIMEBOMB1]   = TimeBombPrevBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_TIMEBOMB2]   = TimeBombMidBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_TIMEBOMB3]   = TimeBombEndBullet;       //护盾类型子弹


    }

    private update (dt) {
        
    }

    getLayer()
    {
        return this._layerHigh;
    }

    getLayerLow()
    {
        return this._layerLow;
    }

    //获取技能模板对象
    getSkillClass(skillType)
    {
        if(this._typeSkillClass[skillType])
        {
            return this._typeSkillClass[skillType];
        }
        return null;
    }

    //获取子弹脚本模板对象
    getBulletClass(bulletID)
    {
        var bulletInfo = DictMgr.Instance.getDictByName("bullet_data");
        if(this._typeBulletClass[ bulletInfo[bulletID].scriptID ])
        {
            return this._typeBulletClass[ bulletInfo[bulletID].scriptID ];
        }
        return null;
    }

}
