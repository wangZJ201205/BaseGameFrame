
/**
 * 消息定义
 */

let MessageName = {
    //游戏心跳
    PING : string = 'game_ping',
    PONG : string = 'game_pong',
    
    BUILD_CONNECTION : string = 'buildConnecting', //建立连接
    
    DISCONNECTION : string = 'disconnect', //断开连接

    LOGIN_CHECK_PLAYER: string = 'LOGIN_CHECK_PLAYER',//登陆验证角色
    
}

module.exports = MessageName;
