/**
 * 玩家对象
 */
class Entity {
    
    // _prop_map:{};
    // _account_id:String; //账号id
    // _client_id:String; //与客户端通信的socketId
    
    constructor(accountId,clientId) {
        this._account_id = accountId;
        this._client_id = clientId;
        this._prop_map = {};
    }

    getAccountId()
    {
        return this._account_id;
    } 

    getPlayerId()
    {
        return this._prop_map[ENTITY_PROP.PID];
    }

     getClientId()
    {
        return this._client_id;
    }

     setClientId(client_id)
    {
        this._client_id = client_id;
    }

    //给客户端发送消息
     sendMessageToClient(socketName,data)
    {
        data['client_id'] = this._client_id;
        server.NetWork.emit(socketName,data)
    }

     setProp(key,value)
    {
        this._prop_map[key] = value;
    }

    addProp(key)
    {
        var value = this._prop_map[key] || 0;
        value += 1;
        this._prop_map[key] = value;
    }
    
}

module.exports = Entity;
