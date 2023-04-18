/**
 * 游戏内的数据
 */
export default class GameData{

    //游戏基础配置
    public static IpPort : string  = ''; //游戏端口
    public static IsDebug: boolean = false; //是否是测试模式

    public static NeedWaitModules : number = 0; //需要加载等待的模块数
    public static CurrLoadModules : number = 0; //当前已经加载的模块数


}