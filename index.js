const express = require("express");
const app = express();
const port = 3000;
const WebSocket = require("ws");

app.get("/connect", (req, res) => {
  const ws = new WebSocket("ws://localhost:8000");

  ws.on("open", () => {
    res.status(200).send("open");
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
