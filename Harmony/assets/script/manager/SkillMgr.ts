/**
 * 技能管理
 */
import ClientDef from "../common/ClientDef";
import BulletParent from "../skill/BulletParent";
import SkillParent from "../skill/SkillParent";
import AngleMoveWithNoAngleBullet from "../skill/bullet/AngleMoveWithNoAngleBullet";
import AnimationCreatePlayNextBBullet from "../skill/bullet/AnimationCreatePlayNextBBullet ";
import AnimationFinishPlayNextBBullet from "../skill/bullet/AnimationFinishPlayNextBBullet";
import ArcheryBullet from "../skill/bullet/ArcheryBullet";
import FireHorseBullet from "../skill/bullet/FireHorseBullet";
import FireWallMidBullet from "../skill/bullet/FireWallMidBullet";
import LineMoveByAngleBullet from "../skill/bullet/LineMoveByAngleBullet";
import LoserBullet from "../skill/bullet/LoserBullet";
import PosionEndBullet from "../skill/bullet/PosionEndBullet";
import PosionStartBallBullet from "../skill/bullet/PosionStartBallBullet";
import PosionTimboMidBullet from "../skill/bullet/PosionTimboMidBullet";
import PosionTimboPrevBullet from "../skill/bullet/PosionTimboPrevBullet";
import ShieldBallBullet from "../skill/bullet/ShieldBallBullet";
import StopAfterAnimationFinishBullet from "../skill/bullet/StopAfterAnimationFinishBullet";
import SwordBallBullet from "../skill/bullet/SwordBallBullet";
import TaijiBallBullet from "../skill/bullet/TaijiBallBullet";
import ThunderBallBullet from "../skill/bullet/ThunderBallBullet";
import ThunderRayBullet from "../skill/bullet/ThunderRayBullet";
import TimeBombBox1Bullet from "../skill/bullet/TimeBombBox1Bullet";
import TimeBombBoxesBullet from "../skill/bullet/TimeBombBoxesBullet";
import TimeBombMidBullet from "../skill/bullet/TimeBombMidBullet";
import TimeBombPrevBullet from "../skill/bullet/TimeBombPrevBullet";
import ArcherySkill from "../skill/skills/ArcherySkill";
import CommonSkill from "../skill/skills/CommonSkill";
import FireBallSkill from "../skill/skills/FireBallSkill";
import FireColumnSkill from "../skill/skills/FireColumnSkill";
import FireHorseSkill from "../skill/skills/FireHorseSkill";
import FireWallSkill from "../skill/skills/FireWallSkill";
import IceBallSkill from "../skill/skills/IceBallSkill";
import IcePitonSkill from "../skill/skills/IcePitonSkill";
import LaserSkill from "../skill/skills/LaserSkill";
import MiZongQuanSkill from "../skill/skills/MiZongQuanSkill";
import PosionFireSkill from "../skill/skills/PosionFireSkill";
import PosionTimboSkill from "../skill/skills/PosionTimboSkill";
import PurpleStormSkill from "../skill/skills/PurpleStormSkill";
import RevolutionBallSkill from "../skill/skills/RevolutionBallSkill";
import ShieldBallSkill from "../skill/skills/ShieldBallSkill";
import SuicideSkill from "../skill/skills/SuicideSkill";
import SwordBallSkill from "../skill/skills/SwordBallSkill";
import TaijiBallSkill from "../skill/skills/TaijiBallSkill";
import ThunderBallSkill from "../skill/skills/ThunderBallSkill";
import ThunderRaySkill from "../skill/skills/ThunderRaySkill";
import TimeBombSkill from "../skill/skills/TimeBombSkill";
import PosionBallSkill from "../skill/skills/posionBallSkill";
import DictMgr from "./DictMgr";
import ParentMgr from "./ParentMgr";
import SceneMgr from "./SceneMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillMgr extends ParentMgr {

    public static readonly Instance : SkillMgr = new SkillMgr();

    private _layerHigh: cc.Node = null; //引用的ghostMgr对象层级 高层
    private _layerLow: cc.Node = null; //引用的ghostMgr对象层级 底层

    private _typeSkillClass : {[key:number]:typeof SkillParent};
    private _typeBulletClass : {[key:number]:typeof BulletParent};

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
        this._typeSkillClass[ClientDef.SKILL_TYPE_LASER] = LaserSkill;             //定时炸弹
        this._typeSkillClass[ClientDef.SKILL_TYPE_ICE_PITON] = IcePitonSkill;             //冰锥
        this._typeSkillClass[ClientDef.SKILL_TYPE_PROPLE_STROM] = PurpleStormSkill;             //冰锥
        this._typeSkillClass[ClientDef.SKILL_TYPE_THUNDER_RAY] = ThunderRaySkill;             //冰锥
        this._typeSkillClass[ClientDef.SKILL_TYPE_POSION_FIRE] = PosionFireSkill;   //毒火

        this._typeSkillClass[ClientDef.SKILL_TYPE_COMMON] = CommonSkill;             //常用技能
        this._typeSkillClass[ClientDef.SKILL_TYPE_SUICIDE] = SuicideSkill;             //自杀技能
        this._typeSkillClass[ClientDef.SKILL_TYPE_FIRE_COLUMN] = FireColumnSkill;      //火柱技能


        this._typeBulletClass[ClientDef.BULLET_SCRIPT_COMMON]   = BulletParent;          //子弹父类
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_FIREBALL] = LineMoveByAngleBullet;         //通过角度来直线运动
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_LEIPI]   = ThunderBallBullet;       //落雷类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_SWORD_AIR]   = SwordBallBullet;       //落雷类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_TAIJI]   = TaijiBallBullet;       //太极类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_SHIELD]   = ShieldBallBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_START]   = PosionStartBallBullet;       //放毒类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_END]   = PosionEndBullet;       //放毒类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_ARCHERY]      = ArcheryBullet;       //射箭类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_FIRE_HORSE]   = FireHorseBullet;       //护盾类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_TIMBO1]   = PosionTimboPrevBullet;      //毒树藤类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_TIMBO2]   = PosionTimboMidBullet;       //毒树藤类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_POSION_TIMBO3]   = StopAfterAnimationFinishBullet;       //毒树藤类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_FIREWALL1]   = AnimationFinishPlayNextBBullet;       //火墙类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_FIREWALL2]   = FireWallMidBullet;        //火墙类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_TIMEBOMB1]   = TimeBombPrevBullet;       //定时炸弹类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_TIMEBOMB2]   = TimeBombMidBullet;        //定时炸弹类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_TIMEBOMB4]   = TimeBombBoxesBullet;        //定时炸弹类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_TIMEBOMB5]   = TimeBombBox1Bullet;        //定时炸弹类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_LOSER]   = LoserBullet;        //激光类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_CTEATE_AND_PLAY_NEST]   = AnimationCreatePlayNextBBullet;        //激光类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_ANGLE_MOVE_NO_ANGLE]   = AngleMoveWithNoAngleBullet;        //激光类型子弹
        this._typeBulletClass[ClientDef.BULLET_SCRIPT_THUNDER_RAY]   = ThunderRayBullet;        //激光类型子弹


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
