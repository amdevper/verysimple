const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const socketio = require("socket.io");
app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "./views"),
  });
});
//res.send("<h1>Hello app</h1>")

const server = app.listen(PORT);

const io = socketio(server);
io.on("connection", (socket) => {
  console.log("a client is connect");
  socket.on("disconnect", () => {
    console.log("a client is disconnect");
  });
  socket.on("srvcli",(message)=>{
      console.log("Receive from client :",message)
  })
  
});



//io.socket.emit('data1','i send data 1')
setInterval(function () {
  var currentDate = new Date();

  io.sockets.emit("servcli1", { currentDate: currentDate });
  console.log('i send and emit every 1s.')
}, 1000);

setInterval(function () {
  var currentDate = new Date();

  io.sockets.emit("servcli2", { currentDate: currentDate });
  console.log('i send and emit every 5s.')
}, 5000);

setInterval(function () {
  var currentDate = new Date();

  io.sockets.emit("servcli3", { currentDate: currentDate });
  console.log('i send and emit every 10s.')
}, 10000);
