const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

/* cors configuration. */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 8080;

let users = {};
let socketRoom = {};
const MAXIMUM = 2;

io.on("connection", (socket) => {
  console.log(socket.id, "connection");
  socket.on("join_room", (data) => {

    if (users[data.room]) {
      const currentRoomLength = users[data.room].length;

      if (currentRoomLength === MAXIMUM) {
        socket.to(socket.id).emit("room_full");
        return;
      }
      users[data.room] = [...users[data.room], { id: socket.id }];

    } else {
      users[data.room] = [{ id: socket.id }];
    }
    socketRoom[socket.id] = data.room;
    socket.join(data.room);

    const others = users[data.room].filter((user) => user.id !== socket.id);
    if (others.length) {
      io.sockets.to(socket.id).emit("all_users", others);
    }
  });

  socket.on("offer", (sdp, roomName) => {
    socket.to(roomName).emit("getOffer", sdp);
  });

  socket.on("answer", (sdp, roomName) => {
    socket.to(roomName).emit("getAnswer", sdp);
  });

  socket.on("candidate", (candidate, roomName) => {
    socket.to(roomName).emit("getCandidate", candidate);
  });

  socket.on("disconnect", () => {
    const roomID = socketRoom[socket.id];

    if (users[roomID]) {
      users[roomID] = users[roomID].filter((user) => user.id !== socket.id);
      if (users[roomID].length === 0) {
        delete users[roomID];
        return;
      }
    }
    delete socketRoom[socket.id];
    socket.broadcast.to(users[roomID]).emit("user_exit", { id: socket.id });
  });
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});