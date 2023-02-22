let express = require("express");
let socket = require("socket.io");

let app = express();

let server = app.listen(3000, () => {
  console.log("server listen at port 3000");
});

app.get("/", (res, req) => {
  req.sendFile(__dirname + "/public/index.html");
});
app.get("/style.css", (res, req) => {
  req.sendFile(__dirname + "/public/style.css");
});
let io = socket(server);
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.emit("chat", data);
  });
  socket.on("typing", (name) => {
    console.log(name);
    socket.broadcast.emit("typing", name);
  });
});
