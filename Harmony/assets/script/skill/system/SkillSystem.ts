/**
 * 技能系统
 */

import ClientDef from "../../common/ClientDef";
import DictMgr from "../../manager/DictMgr";
import BulletParent from "../BulletParent";
import SkillParent from "../SkillParent";
import AngleMoveWithNoAngleBullet from "../bullet/AngleMoveWithNoAngleBullet";
import AnimationCreatePlayNextBBullet from "../bullet/AnimationCreatePlayNextBBullet ";
import AnimationFinishPlayNextBBullet from "../bullet/AnimationFinishPlayNextBBullet";
import ArcheryBullet from "../bullet/ArcheryBullet";
import FireHorseBullet from "../bullet/FireHorseBullet";
import FireWallMidBullet from "../bullet/FireWallMidBullet";
import LineMoveByAngleBullet from "../bullet/LineMoveByAngleBullet";
import LoserBullet from "../bullet/LoserBullet";
import PosionEndBullet from "../bullet/PosionEndBullet";
import PosionStartBallBullet from "../bullet/PosionStartBallBullet";
import PosionTimboMidBullet from "../bullet/PosionTimboMidBullet";
import PosionTimboPrevBullet from "../bullet/PosionTimboPrevBullet";
import ShieldBallBullet from "../bullet/ShieldBallBullet";
import StopAfterAnimationFinishBullet from "../bullet/StopAfterAnimationFinishBullet";
import SwordBallBullet from "../bullet/SwordBallBullet";
import TaijiBallBullet from "../bullet/TaijiBallBullet";
import ThunderBallBullet from "../bullet/ThunderBallBullet";
import ThunderRayBullet from "../bullet/ThunderRayBullet";
import TimeBombBox1Bullet from "../bullet/TimeBombBox1Bullet";
import TimeBombBoxesBullet from "../bullet/TimeBombBoxesBullet";
import TimeBombMidBullet from "../bullet/TimeBombMidBullet";
import TimeBombPrevBullet from "../bullet/TimeBombPrevBullet";
import ArcherySkill from "../skills/ArcherySkill";
import CommonSkill from "../skills/CommonSkill";
import FireBallSkill from "../skills/FireBallSkill";
import FireColumnSkill from "../skills/FireColumnSkill";
import FireHorseSkill from "../skills/FireHorseSkill";
import FireWallSkill from "../skills/FireWallSkill";
import IceBallSkill from "../skills/IceBallSkill";
import IcePitonSkill from "../skills/IcePitonSkill";
import LaserSkill from "../skills/LaserSkill";
import MiZongQuanSkill from "../skills/MiZongQuanSkill";
import PosionFireSkill from "../skills/PosionFireSkill";
import PosionTimboSkill from "../skills/PosionTimboSkill";
import PurpleStormSkill from "../skills/PurpleStormSkill";
import RevolutionBallSkill from "../skills/RevolutionBallSkill";
import ShieldBallSkill from "../skills/ShieldBallSkill";
import SuicideSkill from "../skills/SuicideSkill";
import SwordBallSkill from "../skills/SwordBallSkill";
import TaijiBallSkill from "../skills/TaijiBallSkill";
import ThunderBallSkill from "../skills/ThunderBallSkill";
import ThunderRaySkill from "../skills/ThunderRaySkill";
import TimeBombSkill from "../skills/TimeBombSkill";
import PosionBallSkill from "../skills/posionBallSkill";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillSystem {

    private static _typeSkillClass : {[key:number]:typeof SkillParent};
    private static _typeBulletClass : {[key:number]:typeof BulletParent};

    static init()
    {

        this._typeSkillClass = {};
        this._typeBulletClass = {};

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

    //获取技能模板对象
    static getSkillClass(skillType)
    {
        if(SkillSystem._typeSkillClass[skillType])
        {
            return SkillSystem._typeSkillClass[skillType];
        }
        return null;
    }

    //获取子弹脚本模板对象
    static getBulletClass(bulletID)
    {
        var bulletInfo = DictMgr.Instance.getDictByName("bullet_data");
        if(SkillSystem._typeBulletClass[ bulletInfo[bulletID].scriptID ])
        {
            return SkillSystem._typeBulletClass[ bulletInfo[bulletID].scriptID ];
        }
        return null;
    }

}
