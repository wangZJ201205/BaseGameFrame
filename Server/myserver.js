
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//在某个端口开始监听客户端连接
http.listen(6123,function(){
    console.log("server listen on 6123");
});

//监听有客户端连接
io.on('connection', function(socket){
    //发送消息
    //socket.emit('message','连接成功了');
    //监听客户端发来的消息
    console.info('有客戶端鏈接');
    socket.on('message',function(data){
        console.log("客户端发来消息" + data);
    });
});