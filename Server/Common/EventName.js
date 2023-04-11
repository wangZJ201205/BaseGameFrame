/**
 * 消息定义
 * 服务器和服务器之间的通信
 */

let EventName = {
    
    //登陆 验证账号和登陆账号
    DB_LOGIN_CHECK_ACCOUNT_REQUEST : string = 'DB_LOGIN_CHECK_ACCOUNT_REQUEST', // 请求
    DB_LOGIN_CHECK_ACCOUNT_RESPONSE : string = 'DB_LOGIN_CHECK_ACCOUNT_RESPONSE', // 返回

    //加载玩家信息
    DB_LOAD_PLAYER_INFO_REQUEST : string = 'DB_LOAD_PLAYER_INFO_REQUEST',  
    DB_LOAD_PLAYER_INFO_RESPONSE : string = 'DB_LOAD_PLAYER_INFO_RESPONSE',
    
}

module.exports = EventName;
