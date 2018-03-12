const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const cameras = {};

app.use(express.static(__dirname + '/../client'));

app.get('/camera/:camera', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/camera/index.html'));
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.emit('cameras', cameras);

  socket.on('new-data', data => {
  	cameras[data.camera] = data;
  	io.emit('update', data);
  });
});



http.listen(3001);
