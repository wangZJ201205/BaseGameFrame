/**
 * 客户端定义的枚举
 */
export default class ClientDef{

    //游戏大容器深度
    public static readonly GAME_INDEX_SCENE :number = 1;
    public static readonly GAME_INDEX_UI : number = 2;
    public static readonly SCENE_INDEX_GHOST : number = 1;
    public static readonly SCENE_INDEX_LABEL : number = 2;
    

    //界面深度
    public static readonly UI_INDEX_COMMON :number = 0;
    public static readonly UI_INDEX_MIDDLE :number = 500;
    public static readonly UI_INDEX_TOP : number = 999;

    //对象组件
    public static readonly ENTITY_COMP_CLOTH : number = 1; //对象组件 - 衣服
    public static readonly ENTITY_COMP_BLOOM : number = 2; //对象组件 - 血条
    public static readonly ENTITY_COMP_TITLE : number = 3; //对象组件 - 称号

    //对象组件运行状态
    public static readonly COMP_STATE_LOAD : number = 1; //组件状态--加载
    public static readonly COMP_STATE_START : number = 2; //组件状态--运行中
    public static readonly COMP_STATE_REMOVE : number = 3; //组件状态--移除

    //对象类型
    public static readonly ENTITY_TYPE_PLAYER : number = 1; //对象id
    public static readonly ENTITY_TYPE_MONSTER : number = 2; //怪物

    //对象状态
    public static readonly ENTITY_STATE_IDLE: number = 1; //站立
    public static readonly ENTITY_STATE_WALK: number = 2; //移动

    //对象运行状态
    public static readonly ENTITY_ACTIVE_STATE_INIT : number = 1;//初始化
    public static readonly ENTITY_ACTIVE_STATE_RUN : number = 2;//运行
    public static readonly ENTITY_ACTIVE_STATE_FREE : number = 3;//闲置


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


    //技能类型
    public static readonly SKILL_TYPE_FIREBALL: number = 1; //火球
    public static readonly SKILL_TYPE_ICEBALL: number = 2; //冰球


    //子弹属性
    public static readonly BULLET_PROP_ID : number = 1;// id
    public static readonly BULLET_PROP_DIRECTION : number = 2; //方向
    public static readonly BULLET_PROP_STATE : number = 3; //状态
    public static readonly BULLET_PROP_STATICID : number = 4;// 配置id
    public static readonly BULLET_PROP_SPEED : number = 5;// 速度
    public static readonly BULLET_PROP_ANGLE : number = 6;// 角度
    


    //子弹的状态
    public static readonly BULLET_STATE_FREE : number = 1; //休闲状态
    public static readonly BULLET_STATE_LOADSRC : number = 2; //加载资源中
    public static readonly BULLET_STATE_RUN : number = 3; //运行中

    //碰撞组分类
    public static readonly COLLISION_GROUP_PLAYER : string = 'player'; //玩家
    public static readonly COLLISION_GROUP_MONSTER : string = 'monster'; //怪物
    public static readonly COLLISION_GROUP_BULLET : string = 'bullet'; //子弹
}