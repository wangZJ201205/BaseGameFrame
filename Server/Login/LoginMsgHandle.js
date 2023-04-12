const Definition = require("../Common/Definition");
const EventName = require("../Common/EventName");
const MessageName = require("../Common/MessageDefine");
const NetWork = require("../Manager/NetWork");
const PlayerMgr = require("../Manager/PlayerMgr");
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

        //登陆账号
        server.event.On(EventName.DB_LOGIN_CHECK_ACCOUNT_RESPONSE,(data)=>{
            server.Players.addPlayer(data.accountId,data.client_id);
            var msg = {}
            msg.accountId = data.accountId
            server.event.send(EventName.DB_LOAD_PLAYER_INFO_REQUEST,msg);
        });

        //获取玩家信息
        server.event.On(EventName.DB_LOAD_PLAYER_INFO_RESPONSE,(data)=>{
            var player = server.Players.getPlayerByAccountId(data.accountId);
            if (!player)
            {
                console.info("没有此玩家:" + data.accountId);
                return;
            }
            player.setProp(Definition.ENTITY_PROP_PID, data.pid);
            for (let i = 0; i < data.playerex.length; i++) {
                const element = data.playerex[i];
                player.setProp(element.ctype,element.data);
            }
            var msg = {};
            msg.error = Definition.ERROR_CODE_SUCCESS;
            msg.client_id = player.getClientId()
            server.NetWork.emit(MessageName.LOGIN_CHECK_PLAYER_RESPONSE,msg);
        });



    },


}

module.exports = LoginMsgHandle