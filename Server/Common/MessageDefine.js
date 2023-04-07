
/**
 * 消息定义
 * 客户端和服务器之间的通信
 */

let MessageName = {
    //游戏心跳
    PING : string = 'game_ping',
    PONG : string = 'game_pong',
    
    BUILD_CONNECTION : string = 'buildConnecting', //建立连接
    
    DISCONNECTION : string = 'disconnect', //断开连接

    CLIENT_TO_SERVER:string = 'CLIENT_TO_SERVER', //给服务器发送消息
    LOGIN_CHECK_PLAYER: string          = 'LOGIN_CHECK_PLAYER',//登陆验证角色
    LOGIN_CHECK_PLAYER_RESPONSE: string = 'LOGIN_CHECK_PLAYER_RESPONSE',//登陆验证角色
    
}

module.exports = MessageName;
