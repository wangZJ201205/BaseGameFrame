const MessageName = require('../Common/MessageDefine');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    'transports': ['websocket', 'polling']
  });

const NetWork = {

  init : function()
  {

    console.log("network init");
    //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

  },

  start : function()
  {
    console.log("network start");
    // 在某个端口开始监听客户端连接
    http.listen(9000, function(){
      console.log('server listen on 9000');
    });

    // 添加html 
    /*
      使用getXMLHttpRequest发送消息
      let request = cc.loader.getXMLHttpRequest();
          request.open("GET","http://localhost:9000",true); //异步
          request.onreadystatechange = ()=>{
              //请求状态改变
              //请求结束后，获取信息
              if(request.readyState == 4 && request.status == 200)
              {
                  console.info("请求完成");
                  console.info(request.responseText);
              }
          };
          request.send();
    */

    app.get('/', function(req, res){
        console.info('有客戶端有消息请求');
        res.send('<html><body><h1>Hello World!</h1></body></html>');
        // res.on('message',function(data){
        //     console.log('客户端发来消息' + data);
        //   });
    });

    //监听有客户端连接
    io.on('connection', function(socket){
        //发送消息
        socket.emit( MessageName.BUILD_CONNECTION ,'连接成功了');

        //监听客户端发来的消息
        console.info('有客戶端鏈接');
    
        socket.on(MessageName.DISCONNECTION , function () {
          console.log('A user disconnected');
          
        });

        socket.on(MessageName.PING ,function(data){
          socket.emit(MessageName.PONG);
        });

        //发送消息
        socket.on(MessageName.CLIENT_TO_SERVER ,function(data){
          console.info('>>MessageName.CLIENT_TO_SERVER clientid:'+socket.id);
          data['client_id'] = socket.id;
          server.event.send(data.socketName,data);
        });


    });
  },

  /**
     * 发送消息
     * socketName 消息名
     * data 数据内容
     */
  emit(socketName,data)
  {
    var socket = io.sockets.connected[data.client_id];
    data.client_id = null;
    data.socketName = socketName;
    if(socket)
    {
      socket.emit(socketName,data);
    }
  },
};

server.NetWork = module.exports = NetWork;