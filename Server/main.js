
//程序启动入口
global.wzj = global.wzj || {};

require('./net/WZJNetWork');
require('./dbagent/WZJDBagent');

//初始化
function init()
{
    wzj.NetWork.init();
    wzj.dbagent.init();
}

//运行
function start()
{
    wzj.NetWork.start();
    wzj.dbagent.start();
}

console.log('begin run server');

init();

start();

