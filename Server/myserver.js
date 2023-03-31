var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http,{
    'transports': ['websocket', 'polling']
  });

// var cors = require('cors');
// app.use(cors());

app.get('/', function(req, res){
    console.info('有客戶端有消息请求');
    res.send('<html><body><h1>Hello World!</h1></body></html>');
    res.on('message',function(data){
        console.log('客户端发来消息' + data);
      });
});

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

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


//监听有客户端连接
io.on('connection', function(socket){
  //发送消息
  //socket.emit('message','连接成功了');
  //监听客户端发来的消息
  console.info('有客戶端鏈接');
  socket.on('message',function(data){
    console.log('客户端发来消息' + data);
  });
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
  socket.on('login', function (obj) {
    console.log('obj.username');
  });
});
