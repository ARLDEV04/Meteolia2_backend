const {Server} = require('socket.io');
let io;

function initSocket(server){
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', socket => {
        console.log('Client Websocket connecté');
        socket.on('disconnect', () => {
            console.log('Client WebSocket déconnecté');
        });
    })

    return io;
}

function getIo(){
    if (!io) throw new Error('Socket.IO non initialisé !');
    return io;
}

module.exports = {initSocket, getIo};