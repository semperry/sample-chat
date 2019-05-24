const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});



users = [];
io.on("connection", socket => {
  // console.log('User connected: ' + socket.id)
  socket.on("setUsername", data => {
    if (users.indexOf(data) > -1) {
      socket.emit(
        "userExists",
        data + " username is already taken bruh... Try again"
      );
    } else {
      users.push(data);
      socket.emit("userSet", { username: data });
      console.log("User: " + data + " connected");
    }
  });
  
  // On disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

http.listen(port, () => {
  console.log("Listening on port: " + port);
});
