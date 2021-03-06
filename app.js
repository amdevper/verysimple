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
app.get("/details",(req,res)=>{
  res.sendFile("details.html",{
    root: path.join(__dirname, "./views"),
  })
})
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
  socket.on('lastmsg',(msg)=>{
    console.log('Received',msg)
    io.sockets.emit('lastmsg',msg)
    
  })
  
  io.sockets.emit("servcli1cont","on")
});


var count = 0

//io.socket.emit('data1','i send data 1')
setInterval(function () {
  var currentDate = new Date();
  //var count = 0
  count ++
  //console.log(count)
  io.sockets.emit("servcli1", { currentDate: currentDate });
  //console.log('i send and emit every 1s.')
  if (count == 2){
    count = 0
  }
  
  
  if(count%2 == 0){
    io.sockets.emit("servcli1cont","on")
    //count = 0
  }
  if(count%2 != 0){
    io.sockets.emit("servcli1cont","off")
    //count = 1
  }
}, 1000);

setInterval(function () {
  var currentDate = new Date();

  io.sockets.emit("servcli2", { currentDate: currentDate });
  //console.log('i send and emit every 5s.')
}, 5000);

setInterval(function () {
  var currentDate = new Date();

  io.sockets.emit("servcli3", { currentDate: currentDate });
  //console.log('i send and emit every 10s .')
}, 10000);
