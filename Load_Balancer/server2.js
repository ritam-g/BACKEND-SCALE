const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Server 2 ⚡");
});

app.get("/api", (req, res) => {
  res.json({ server: "Server 2", port: 3002 });
});

app.listen(3002, () => {
  console.log("Server 2 running on port 3002");
});