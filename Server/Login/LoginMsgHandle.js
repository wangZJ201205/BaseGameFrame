const MessageName = require("../Common/MessageDefine")

/**
 * 登陆消息
 */
const LoginMsgHandle = {

    register()
    {

        //监听玩家登陆消息
        server.event.On(MessageName.LOGIN_CHECK_PLAYER,(data)=>{
            
            server.Players.addPlayer(data.accountId,data.client_id);

        });



    },


}

module.exports = LoginMsgHandle