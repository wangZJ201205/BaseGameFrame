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

    //对象类型
    public static readonly ENTITY_TYPE_PLAYER : number = 1; //对象id
    public static readonly ENTITY_TYPE_MONSTER : number = 2; //怪物

    //对象状态
    public static readonly ENTITY_STATE_IDLE: number = 1; //站立
    public static readonly ENTITY_STATE_WALK: number = 2; //移动

    //对象属性
    public static readonly ENTITY_PROP_ID : number = 1; //对象id
    public static readonly ENTITY_PROP_TYPE : number = 2; //对象类型
    public static readonly ENTITY_PROP_DIR : number = 3; //对象方向

}