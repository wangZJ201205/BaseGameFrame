/**
 * 客户端定义的枚举
 */
export default class ClientDef{

    //游戏大容器深度
    public static readonly GAME_INDEX_SCENE :number = 1;
    public static readonly GAME_INDEX_UI : number = 2;

    //游戏运行模式
    public static readonly GAME_MODE_NORMAL : number = 0; //正常模式
    public static readonly GAME_MODE_TEST_FIGHT : number = 1; //战斗测试模式
    public static readonly GAME_MODE_TEST_CALL_MONSTER : number = 2; //战斗测试刷怪模式
    
    //场景中的管理深度
    public static readonly SCENE_INDEX_GAMEPLAY : number = 1;
    public static readonly SCENE_INDEX_SKILL_LOW : number = 2;
    public static readonly SCENE_INDEX_ITEM : number = 3;
    public static readonly SCENE_INDEX_GHOST : number = 4;
    public static readonly SCENE_INDEX_PARTICLE : number = 5;
    public static readonly SCENE_INDEX_SKILL_HIGH : number = 6;
    public static readonly SCENE_INDEX_LABEL : number = 7;
    public static readonly SCENE_INDEX_HEAD_EFFECT : number = 8;
    

    //界面深度
    public static readonly UI_INDEX_LOW :number = 0;
    public static readonly UI_INDEX_MIDDLE :number = 500;
    public static readonly UI_INDEX_TOP : number = 999;

    //对象组件
    public static readonly ENTITY_COMP_CLOTH : number = 1; //对象组件 - 衣服
    public static readonly ENTITY_COMP_BLOOM : number = 2; //对象组件 - 血条
    public static readonly ENTITY_COMP_TITLE : number = 3; //对象组件 - 称号
    public static readonly ENTITY_COMP_COLL : number = 4; //对象组件 - 碰撞
    public static readonly ENTITY_COMP_NAME : number = 5; //对象组件 - 名字
    public static readonly ENTITY_COMP_SHIELD : number = 6; //对象组件 - 护盾
    public static readonly ENTITY_COMP_THUNDERRAY : number = 7; //对象组件 - 护盾
    public static readonly ENTITY_COMP_FROZEN : number = 8; //对象组件 - 冰冻
    public static readonly ENTITY_COMP_POSION_FIRE : number = 9; //对象组件 - 毒火
    public static readonly ENTITY_COMP_FIRE_SHIELD : number = 10; //对象组件 - 火盾
    public static readonly ENTITY_COMP_ITEM_SKIN : number = 11; //物品组件
    public static readonly ENTITY_COMP_ITEM_STATE : number = 12; //物品组件

    //对象组件运行状态
    public static readonly COMP_STATE_LOAD : number = 1; //组件状态--加载
    public static readonly COMP_STATE_START : number = 2; //组件状态--运行中
    public static readonly COMP_STATE_REMOVE : number = 3; //组件状态--移除

    //对象类型
    public static readonly ENTITY_TYPE_PLAYER : number = 1;     //对象id
    public static readonly ENTITY_TYPE_MONSTER : number = 2;    //怪物
    public static readonly ENTITY_TYPE_ITEM : number = 3;       //物品
    public static readonly ENTITY_TYPE_EFFECT : number = 4;     //场景特效

    //对象状态
    public static readonly ENTITY_STATE_IDLE: number    = 0; //站立
    public static readonly ENTITY_STATE_WALK: number    = 1; //移动
    public static readonly ENTITY_STATE_DIE: number     = 2; //死亡
    public static readonly ENTITY_STATE_ATTACK: number     = 3; //攻击
    public static readonly ENTITY_STATE_SHAPESHIFT: number     = 4; //变身
    public static readonly ENTITY_STATE_SHAPESHIFT_WALK: number     = 5; //变身移动

    //对象运行状态
    public static readonly ENTITY_ACTIVE_STATE_INIT : number = 1;//初始化
    public static readonly ENTITY_ACTIVE_STATE_RUN : number = 2;//运行
    public static readonly ENTITY_ACTIVE_STATE_FREE : number = 3;//闲置

    //人物方向类型
    public static readonly ENTITY_DIRECTION_TYPE_1 : number = 1; //两个方向的类型
    public static readonly ENTITY_DIRECTION_TYPE_2 : number = 2; //两个方向的类型
    public static readonly ENTITY_DIRECTION_TYPE_4 : number = 4; //两个方向的类型
    public static readonly ENTITY_DIRECTION_TYPE_8 : number = 8; //两个方向的类型


    //控制玩家的类型
    public static readonly PLAYER_CONTROL_TYPE_ROCK:number = 1; //玩家控制类型-遥感

    //对象属性
    public static readonly ENTITY_PROP_ID : number = 1; //对象id
    public static readonly ENTITY_PROP_TYPE : number = 2; //对象类型
    public static readonly ENTITY_PROP_DIR : number = 3; //对象方向
    public static readonly ENTITY_PROP_CONTROL_STATE:number = 4; //对象控制类型
    public static readonly ENTITY_PROP_MOVE_X : number = 5; //移动x轴
    public static readonly ENTITY_PROP_MOVE_Y : number = 6; //移动y轴
    public static readonly ENTITY_PROP_ACTIVE_STATE : number = 7; //运行状态
    public static readonly ENTITY_PROP_STATICID : number = 8; //配置ID
    public static readonly ENTITY_PROP_WAIT_DESTROY_TIME : number = 9; //等待被销毁时间
    public static readonly ENTITY_PROP_PICKUP_RANGE : number = 10; //拾取范围
    public static readonly ENTITY_PROP_CUR_EXP : number = 11; //当前经验
    public static readonly ENTITY_PROP_MAX_EXP : number = 12; //最大经验
    public static readonly ENTITY_PROP_LV : number = 13; //等级
    public static readonly ENTITY_PROP_MOVE_SPEED : number = 14; //移动速度
    public static readonly ENTITY_PROP_POSION_TIME : number = 15; //毒的时间
    public static readonly ENTITY_PROP_DEGREE : number = 16; //当前角度
    public static readonly ENTITY_PROP_CUR_BLOOM : number = 17; //当前血量
    public static readonly ENTITY_PROP_MAX_BLOOM : number = 18; //当前血量
    public static readonly ENTITY_PROP_STATE : number = 19; //当前状态
    public static readonly ENTITY_PROP_STATE_SHAPESHIFT : number = 20; //变身状态
    public static readonly ENTITY_PROP_SHIELD_BLOOM : number = 21; //魔法盾血量
    public static readonly ENTITY_PROP_ATTACK_SPEED : number = 22 ; //攻击速度
    public static readonly ENTITY_PROP_ADD_DAMAGE : number = 23 ; //增加攻击力
    public static readonly ENTITY_PROP_ADD_ATKRANGE : number = 24 ; //增加攻击力范围
    public static readonly ENTITY_PROP_ADD_EXP : number = 25 ; //增加经验值
    public static readonly ENTITY_PROP_ADD_BULLET : number = 26 ; //增加飞行子弹数
    public static readonly ENTITY_PROP_ADD_SHIELD : number = 27 ; //减免护盾伤害
    public static readonly ENTITY_PROP_DEFENSE : number = 28; //防御
    public static readonly ENTITY_PROP_FROZEN : number = 29; //冰冻

    //技能类型
    public static readonly SKILL_TYPE_FIREBALL: number      = 101; //火球
    public static readonly SKILL_TYPE_ICEBALL: number       = 102; //冰球
    public static readonly SKILL_TYPE_THUNDER: number       = 103; //雷劈
    public static readonly SKILL_TYPE_REVOLUTION: number    = 104; //公转球
    public static readonly SKILL_TYPE_SWORD_AIR: number     = 105; //剑气
    public static readonly SKILL_TYPE_TAIJI: number         = 106; //太极
    public static readonly SKILL_TYPE_SHIELD: number        = 107; //护盾
    public static readonly SKILL_TYPE_POISON: number        = 108; //放毒
    public static readonly SKILL_TYPE_MIZONGQUAN: number    = 109; //迷踪拳
    public static readonly SKILL_TYPE_ARCHERY: number       = 110; //射箭
    public static readonly SKILL_TYPE_FIREHORSE: number     = 111; //烈火马
    public static readonly SKILL_TYPE_POSION_TIMBO: number  = 112; //毒树藤
    public static readonly SKILL_TYPE_FIREWALL: number      = 113; //火墙
    public static readonly SKILL_TYPE_TIMEBOMB : number     = 114; //定时炸弹
    public static readonly SKILL_TYPE_LASER : number        = 115; //激光
    public static readonly SKILL_TYPE_ICE_PITON : number    = 116; //冰锥
    public static readonly SKILL_TYPE_PROPLE_STROM : number = 117; //紫色风暴
    public static readonly SKILL_TYPE_THUNDER_RAY : number  = 118; //雷击
    public static readonly SKILL_TYPE_POSION_FIRE : number  = 119; //毒火

    public static readonly SKILL_TYPE_COMMON : number       = 200; //普通技能
    public static readonly SKILL_TYPE_SUICIDE : number      = 201; //自杀技能
    public static readonly SKILL_TYPE_FIRE_COLUMN : number  = 203; //火柱

    //子弹脚本ID
    public static readonly BULLET_SCRIPT_COMMON: number        = 1; //子弹父类
    public static readonly BULLET_SCRIPT_FIREBALL: number      = 2; //火球
    // public static readonly BULLET_SCRIPT_ICEBALL: number       = 3; //冰球
    public static readonly BULLET_SCRIPT_LEIPI: number         = 4; //雷劈
    public static readonly BULLET_SCRIPT_SWORD_AIR: number     = 5; //剑气
    public static readonly BULLET_SCRIPT_TAIJI: number         = 6; //太极
    public static readonly BULLET_SCRIPT_SHIELD: number        = 7; //护盾
    public static readonly BULLET_SCRIPT_POSION_START: number  = 8; //毒开始
    public static readonly BULLET_SCRIPT_POSION_END: number  = 9; //毒开始
    public static readonly BULLET_SCRIPT_MIZONGQUAN: number  = 10; //迷踪拳
    public static readonly BULLET_SCRIPT_ARCHERY: number  = 11; //射箭
    public static readonly BULLET_SCRIPT_ARCHERY_BOOM: number  = 12; //射箭
    public static readonly BULLET_SCRIPT_FIRE_HORSE: number  = 13; //烈火马
    public static readonly BULLET_SCRIPT_POSION_TIMBO1: number  = 14; //毒树藤1
    public static readonly BULLET_SCRIPT_POSION_TIMBO2: number  = 15; //毒树藤2
    public static readonly BULLET_SCRIPT_POSION_TIMBO3: number  = 16; //毒树藤3
    public static readonly BULLET_SCRIPT_FIREWALL1: number  = 17; //火墙1
    public static readonly BULLET_SCRIPT_FIREWALL2: number  = 18; //火墙2
    // public static readonly BULLET_SCRIPT_FIREWALL3: number  = 19; //火墙3
    public static readonly BULLET_SCRIPT_TIMEBOMB1: number  = 20; //定时炸弹1
    public static readonly BULLET_SCRIPT_TIMEBOMB2: number  = 21; //定时炸弹2
    // public static readonly BULLET_SCRIPT_TIMEBOMB3: number  = 22; //定时炸弹3
    public static readonly BULLET_SCRIPT_TIMEBOMB4: number  = 23; //定时炸弹4
    public static readonly BULLET_SCRIPT_TIMEBOMB5: number  = 24; //定时炸弹5
    public static readonly BULLET_SCRIPT_LOSER: number  = 25; //激光子弹
    public static readonly BULLET_SCRIPT_CTEATE_AND_PLAY_NEST: number  = 26; //创建就播放下一阶段
    public static readonly BULLET_SCRIPT_ANGLE_MOVE_NO_ANGLE: number  = 27; //根据angle运动但不选择
    public static readonly BULLET_SCRIPT_THUNDER_RAY: number  = 28; //s随机一个敌人攻击


    //子弹属性
    public static readonly BULLET_PROP_ID : number = 1;// id
    public static readonly BULLET_PROP_DIRECTION : number = 2; //方向
    public static readonly BULLET_PROP_STATE : number = 3; //状态
    public static readonly BULLET_PROP_STATICID : number = 4;// 配置id
    public static readonly BULLET_PROP_SPEED : number = 5;// 速度
    public static readonly BULLET_PROP_ANGLE : number = 6;// 角度
    public static readonly BULLET_PROP_ATK_MIN : number = 7;// 攻击力 小
    public static readonly BULLET_PROP_ATK_MAX : number = 8;// 攻击力 大
    public static readonly BULLET_PROP_CHANG_RANGE : number = 9;// 变化的范围
    public static readonly BULLET_PROP_CHANG_DIR : number = 10;// 变化的方向
    public static readonly BULLET_PROP_PHASEID : number = 11;// 阶段
    public static readonly BULLET_PROP_STRIKE : number = 12;// 穿透

    //子弹阶段
    // public static readonly BULLET_PHASE_1 : number = 1;// 开始阶段
    // public static readonly BULLET_PHASE_2 : number = 2;// 中间阶段
    // public static readonly BULLET_PHASE_3 : number = 3;// 结束阶段

    //技能属性
    public static readonly SKILL_PROP_COUNT : number = 1;// 技能中子弹的数量

    //子弹的状态
    public static readonly BULLET_STATE_FREE : number = 1; //休闲状态
    public static readonly BULLET_STATE_LOADSRC : number = 2; //加载资源中
    public static readonly BULLET_STATE_RUN : number = 3; //运行中

    //碰撞组分类
    public static readonly COLLISION_GROUP_PLAYER : string = 'player'; //玩家
    public static readonly COLLISION_GROUP_MONSTER : string = 'monster'; //怪物
    public static readonly COLLISION_GROUP_BULLET : string = 'bullet'; //子弹

    //基因规则 -- 相同类型相同组的基因叠加规则
    public static readonly GENE_RULE_NULL : number = 1; //没有规则
    public static readonly GENE_RULE_REPLACE : number = 2; //替换
    public static readonly GENE_RULE_CANNOT_REPLACE : number = 3; //不能替换
    public static readonly GENE_RULE_ADD_DURATION : number = 4; //延长持续时间

    //基因状态
    public static readonly GENE_STATE_RUN : number = 1; //运行
    public static readonly GENE_STATE_REMOVE : number = 2; //移除

    //基因类型
    public static readonly GENE_TYPE_SPEED : number         = 1; //速度
    public static readonly GENE_TYPE_POSION : number        = 2; //毒
    public static readonly GENE_TYPE_SHAPESHIFT : number    = 3; //变身
    public static readonly GENE_TYPE_SHIELD : number        = 4; //shield
    public static readonly GENE_TYPE_RENEW : number         = 5; //恢复
    public static readonly GENE_TYPE_THUNDER_RAY : number   = 6; //雷击麻痹
    public static readonly GENE_TYPE_ADD_ATKSPEED : number  = 7; //增加攻击速度
    public static readonly GENE_TYPE_ATTACK_DAMGE : number  = 8; //增加攻击力
    public static readonly GENE_TYPE_BLOOM : number         = 9; //血量基因
    public static readonly GENE_TYPE_MAGNET : number        = 10; //无影手基因
    public static readonly GENE_TYPE_RECV_BLOOM : number    = 11; //九花玉露丸基因
    public static readonly GENE_TYPE_ADD_ATKRANGE : number  = 12; //千里眼基因
    public static readonly GENE_TYPE_ADD_EXP : number       = 13; //吸心大法基因
    public static readonly GENE_TYPE_SUB_SHIELD : number    = 14; //降龙十八掌基因
    public static readonly GENE_TYPE_ADD_BULLET : number    = 15; //碧波基因
    public static readonly GENE_TYPE_ICE_FROZEN : number    = 16; //冰冻基因
    public static readonly GENE_TYPE_POSION_FIRE : number   = 17; //毒火基因
    public static readonly GENE_TYPE_FIRE_SHIELD : number   = 18; //fire shield

    //游戏暂停列表
    public static readonly GAME_PAUSE_UPGRADE : number      = 1 << 1; //升级界面
    public static readonly GAME_PAUSE_SET : number          = 1 << 2;     //设置界面
    public static readonly GAME_PAUSE_ADVERTISE : number    = 1 << 3;     //广告界面

    //粒子状态
    public static readonly PARTICLE_STATE_LOADING : number  = 1;         //加载状态
    public static readonly PARTICLE_STATE_RUN : number      = 2;         //运行状态
    public static readonly PARTICLE_STATE_STOP : number     = 3;        //停止状态
    public static readonly PARTICLE_STATE_FREE : number     = 4;        //闲置状态
    

}