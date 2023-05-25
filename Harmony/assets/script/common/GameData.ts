/**
 * 游戏内的数据
 */
export default class GameData{

    //游戏基础配置
    public static IpPort : string  = ''; //游戏端口
    public static IsDebug: boolean = false; //是否是测试模式
    public static Shield_Skill : boolean = false; //释放屏蔽技能
    public static Game_Pause_State : boolean = false; //游戏是否停止状态

    public static NeedWaitModules : number = 0; //需要加载等待的模块数
    public static CurrLoadModules : number = 0; //当前已经加载的模块数

    public static PayerMoveSpeed : number = 200; //人物移动速度
    public static MonsterMoveSpeed : number = 5; //怪物移动速度

    public static App_Game_Width : number = 1280; //游戏宽度
    public static App_Game_Heigth : number = 720; //游戏高度

    public static Monster_Show_Amount : number = 1; //游戏中展示的怪物数量

    public static Map_Current_Id : number = 10002; //当前地图id

    public static Monster_And_Hero_Min_Distance : number = 50; //怪物和人物之间最短距离
    public static Monster_And_Hero_Max_Distance : number = GameData.App_Game_Width / 2 + 200; //怪物和人物之间最短距离

    public static Game_Play_Monster_Time_Delay : number = 3; //游戏玩法中怪物的时间间隔

    public static Item_Recycle_Time : number = 60000; //物品回收倒计时
    public static Item_Max_Range : number = 1280; //最大范围后移除对象

    public static Skill_Shoot_Accelerate : number = 0.2; //所有技能射击加速  > 1减速 | <1 加速

    public static Player_PickItem_Range : number = 1; //玩家拾取范围
    public static Player_Height : number = 40;  //人物的高度
}