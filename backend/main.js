const express = require('express');
const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

app.get('/', (req, res) => {
    res.json({"ok":"ok"})
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(5000, () => {
  console.log('listening on *:3000');
});