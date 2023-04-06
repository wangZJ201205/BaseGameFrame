const LoginMsgHandle = require('./Login/LoginMsgHandle');

//程序启动入口
global.server = global.server || {};

require('./Manager/NetWork');
require('./Manager/DBagent');
require('./Manager/Event');
require('./Manager/PlayerMgr');

//初始化
function init()
{
    server.NetWork.init();
    server.dbagent.init();
    server.Players.init();

    LoginMsgHandle.register();

}

//运行
function start()
{
    server.NetWork.start();
    server.dbagent.start();
    server.Players.start();
    
    
}

console.log('begin run server');

init();

start();

