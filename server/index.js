const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();
const wsServer = new WebSocket.Server({ server });
const connectedSockets = [];

wsServer.on("connection", socket => {
  connectedSockets.push(socket);

  socket.on("message", message => {
    connectedSockets.forEach(socket => socket.send(message));
  });

  socket.on("close", () => {
    connectedSockets.splice(connectedSockets.indexOf(socket), 1);
  });
});

server.listen(9000);
