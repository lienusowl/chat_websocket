const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const index = fs.readFileSync("./index.html", "utf8");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(index);
});

server.listen(3000, () => {
  console.log("слушаем порт 3000");
});

const ws = new WebSocket.Server({ server });

ws.on("connection", (connection, req) => {
  const ip = req.socket.remoteAddress;

  console.log(`подключились к ${ip}`);

  connection.on("message", (message) => {
    console.log("доставлено сообщение: " + message);

    for (const client of ws.clients) {
      if (client.readyState !== WebSocket.OPEN) continue;
      if (client === connection) continue;

      client.send(message, { binary: false });
    }
  });
  
  connection.on("close", () => {
    console.log(`отключились от ${ip}`);
  });
});
