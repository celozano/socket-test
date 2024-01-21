const WebSocketServer = require("ws").WebSocketServer;
const http = require("http");
const server = http.createServer();

const wss = new WebSocketServer({ server });
const port = 8000;

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

wss.on("connection", (socket) => {
  socket.send("message from server");
  console.log("connected to websocket");

  socket.on("message", function incoming(message) {
    console.log("received", message);
  });
});

wss.on("message", (message) => {
  console.log("message", message);
});
