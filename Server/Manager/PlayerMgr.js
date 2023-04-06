/**
 * 玩家的管理中心
 */

const Entity = require("../Entity/Entity");


const PlayerMgr = {

    _players:[],

    init()
    {
    },

    start()
    {
    },

    addPlayer(accountId,clientId)
    {
        var findEntity = this.getPlayerByAccountId(accountId);
        if(findEntity)
        {
            findEntity.setClientId(clientId);
            return;
        }

        var entity = new Entity(accountId,clientId);
        this._players.push(entity);
    },

    getPlayerByAccountId(accountId)
    {
        for (let i = 0; i < this._players.length; i++) {
            var element = this._players[i];
            if(element.getAccountId() == accountId)
            {
                return element;
            }
        }
        return null;
    },

    getPlayerByPid(pid)
    {
        for (let i = 0; i < this._players.length; i++) {
            var element = this._players[i];
            if(element.getPlayerByPid() == pid)
            {
                return element;
            }
        }
        return null;
    },


};

server.Players = module.exports = PlayerMgr;