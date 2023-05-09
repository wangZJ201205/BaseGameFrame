/**
 * 游戏内的数据
 */
export default class GameData{

    //游戏基础配置
    public static IpPort : string  = ''; //游戏端口
    public static IsDebug: boolean = false; //是否是测试模式
    public static Shield_Skill : boolean = true; //释放屏蔽技能

    public static NeedWaitModules : number = 0; //需要加载等待的模块数
    public static CurrLoadModules : number = 0; //当前已经加载的模块数

    public static PayerMoveSpeed : number = 100; //人物移动速度
    public static MonsterMoveSpeed : number = 5; //怪物移动速度

    public static App_Game_Width : number = 1280; //游戏宽度
    public static App_Game_Heigth : number = 720; //游戏高度

    public static Monster_Show_Amount : number = 2; //游戏中展示的怪物数量

    public static Map_Current_Id : number = 10002; //当前地图id
}