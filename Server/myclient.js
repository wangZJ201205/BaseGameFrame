// var app = require('express')();
// var http = require('http').Server(app);
// const io = require('socket.io')(http);

const socket = io();

// 发送消息
socket.emit('chat message', 'Hello, Socket.IO!');

// 监听服务器发送的消息
socket.on('chat message', (msg) => {
  console.log(msg);
});