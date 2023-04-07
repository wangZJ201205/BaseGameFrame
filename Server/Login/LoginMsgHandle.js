const EventName = require("../Common/EventName");
const MessageName = require("../Common/MessageDefine")

/**
 * 登陆消息
 */
const LoginMsgHandle = {

    register()
    {

        //监听玩家登陆消息
        server.event.On(MessageName.LOGIN_CHECK_PLAYER,(data)=>{
            var msg = {}
            msg.accountId = data.accountId
            msg.password = data.password
            msg.client_id = data.client_id
            server.event.send(EventName.DB_LOGIN_CHECK_ACCOUNT_REQUEST,msg);
        });

        server.event.On(EventName.DB_LOGIN_CHECK_ACCOUNT_RESPONSE,(data)=>{
            
            server.Players.addPlayer(data.accountId,data.client_id);
        });


    },


}

module.exports = LoginMsgHandle