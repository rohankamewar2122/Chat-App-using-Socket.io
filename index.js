const http = require('http');
const express = require('express');
const path = require('path');
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server)    //creating an instance of socket.io server

//socket.io requests
//this will send message received from frontend to all other users
io.on('connection', (socket) => {
    // console.log('A new user has connected', socket.id);
    socket.on('user-message', (message) => {
        io.emit('message', message);
    });
});

//For all the http requests --> express will handle
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log('Server started at Port: 9000'));