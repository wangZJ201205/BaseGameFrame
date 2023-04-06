
export default class MessageName{

    //游戏心跳
    public static readonly PING : string = 'game_ping';
    public static readonly PONG : string = 'game_pong';
    
    public static readonly BUILD_CONNECTION : string = 'buildConnecting'; //建立连接
    
    public static readonly DISCONNECTION : string = 'disconnect'; //断开连接

    public static readonly CLIENT_TO_SERVER : string = 'CLIENT_TO_SERVER'; //给服务器发送消息
    public static readonly LOGIN_CHECK_PLAYER : string = 'LOGIN_CHECK_PLAYER'; //登陆验证角色



}