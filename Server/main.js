
//程序启动入口
global.wzj = global.wzj || {};

require('./Common/WZJNetWork');
require('./Common/WZJDBagent');
require('./Common/WZJEvent');

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

