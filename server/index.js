const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./helpers/users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return error;
        
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text:`${user.name}, has joined!` });
        
        socket.join(user.room);

    });

    socket.on('sendMessage', (message) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

    });

    socket.on('disconnect', () => {
        console.log('User had left!!!');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));