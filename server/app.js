const express = require("express")
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send("hello world")
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // ketika ada orang yang terkoneksi socket yang diserver
  // saya akan ngbuat event emitter untuk client
  socket.emit('visited', "Hi kamu berhasik konek ke server kami");

  socket.on("sendMessage", function (messageDariClient) {
    socket.broadcast.emit('new-message', messageDariClient);
    // io.emit("new-message", messageDariClient)
  })
  // app.set("io", {
  //   io: io,
  //   socket: socket
  // })
});


// req.app.socket
// req.app.io
http.listen(3000, () => {
  console.log('listening on *:3000');
});

