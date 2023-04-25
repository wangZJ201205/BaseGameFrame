/**
 * 客户端定义的枚举
 */
export default class ClientDef{

    //游戏大容器深度
    public static readonly GAME_INDEX_SCENE :number = 1;
    public static readonly GAME_INDEX_GHOST : number = 2;
    public static readonly GAME_INDEX_UI : number = 3;

    //界面深度
    public static readonly UI_INDEX_COMMON :number = 0;
    public static readonly UI_INDEX_MIDDLE :number = 500;
    public static readonly UI_INDEX_TOP : number = 999;

    //对象组件
    public static readonly ENTITY_COMP_CLOTH : number = 1; //对象组件 - 衣服
    public static readonly ENTITY_COMP_BLOOM : number = 2; //对象组件 - 血条

    //对象类型
    public static readonly ENTITY_TYPE_PLAYER : number = 1; //对象id
    public static readonly ENTITY_TYPE_MONSTER : number = 2; //怪物

    //对象状态
    public static readonly ENTITY_STATE_IDLE: number = 1; //站立
    public static readonly ENTITY_STATE_WALK: number = 2; //移动

    //对象运行状态
    public static readonly ENTITY_ACTIVE_STATE_RUN : number = 1;//运行
    public static readonly ENTITY_ACTIVE_STATE_FREE : number = 2;//闲置


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


    //子弹属性
    public static readonly BULLET_TYPE_DIRECTION : number = 1; //方向
}