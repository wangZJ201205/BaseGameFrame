/**
 * 客户端定义的枚举
 */
export default class ClientDef{

    //游戏大容器深度
    public static readonly GAME_INDEX_SCENE :number = 1;
    public static readonly GAME_INDEX_UI : number = 2;

    //游戏运行模式
    public static readonly GAME_MODE_NORMAL : number = 0;
    public static readonly GAME_MODE_TEST_FIGHT : number = 1; //战斗测试模式
    
    //场景中的管理深度
    public static readonly SCENE_INDEX_GAMEPLAY : number = 1;
    public static readonly SCENE_INDEX_SKILL_LOW : number = 2;
    public static readonly SCENE_INDEX_ITEM : number = 3;
    public static readonly SCENE_INDEX_GHOST : number = 4;
    public static readonly SCENE_INDEX_PARTICLE : number = 5;
    public static readonly SCENE_INDEX_SKILL_HIGH : number = 6;
    public static readonly SCENE_INDEX_LABEL : number = 7;
    

    //界面深度
    public static readonly UI_INDEX_COMMON :number = 0;
    public static readonly UI_INDEX_MIDDLE :number = 500;
    public static readonly UI_INDEX_TOP : number = 999;

    //对象组件
    public static readonly ENTITY_COMP_CLOTH : number = 1; //对象组件 - 衣服
    public static readonly ENTITY_COMP_BLOOM : number = 2; //对象组件 - 血条
    public static readonly ENTITY_COMP_TITLE : number = 3; //对象组件 - 称号
    public static readonly ENTITY_COMP_COLL : number = 4; //对象组件 - 碰撞

    //对象组件运行状态
    public static readonly COMP_STATE_LOAD : number = 1; //组件状态--加载
    public static readonly COMP_STATE_START : number = 2; //组件状态--运行中
    public static readonly COMP_STATE_REMOVE : number = 3; //组件状态--移除

    //对象类型
    public static readonly ENTITY_TYPE_PLAYER : number = 1;     //对象id
    public static readonly ENTITY_TYPE_MONSTER : number = 2;    //怪物
    public static readonly ENTITY_TYPE_ITEM : number = 3;       //物品

    //对象状态
    public static readonly ENTITY_STATE_IDLE: number    = 0; //站立
    public static readonly ENTITY_STATE_WALK: number    = 1; //移动
    public static readonly ENTITY_STATE_DIE: number     = 2; //死亡

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
    public static readonly BULLET_PROP_PHASE : number = 11;// 阶段
    public static readonly BULLET_PROP_STRIKE : number = 12;// 穿透

    //子弹阶段
    public static readonly BULLET_PHASE_1 : number = 1;// 开始阶段
    public static readonly BULLET_PHASE_2 : number = 2;// 中间阶段
    public static readonly BULLET_PHASE_3 : number = 3;// 结束阶段

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

    //基因类型
    public static readonly GENE_TYPE_SPEED : number = 1; //速度

    //游戏暂停列表
    public static readonly GAME_PAUSE_UPGRADE : number  = 1 << 1; //升级界面
    public static readonly GAME_PAUSE_SET : number      = 1 << 2;     //设置界面

    //粒子状态
    public static readonly PARTICLE_STATE_LOADING : number  = 1;         //加载状态
    public static readonly PARTICLE_STATE_RUN : number      = 2;         //运行状态
    public static readonly PARTICLE_STATE_STOP : number     = 3;        //停止状态
    public static readonly PARTICLE_STATE_FREE : number     = 4;        //闲置状态

    

}