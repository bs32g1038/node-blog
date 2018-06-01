module.exports = function registerSocket(ioserver) {
    const io = require('socket.io')(ioserver, {
        path: '/socket.io',
        serveClient: false,
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });
    // 当有用户连接进来时  
    io.on('connection', function (socket) {
        // 当有用户断开  
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        // 收到了客户端发来的消息  
        socket.on('sendMessage', function (message) {
            console.log(message);
            // 给客户端发送消息
            io.emit('receiveMessage', message);
        });
    });
};