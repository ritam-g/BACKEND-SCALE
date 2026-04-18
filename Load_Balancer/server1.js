const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Server 1 🚀");
});

app.get("/api", (req, res) => {
  res.json({ server: "Server 1", port: 3001 });
});

app.listen(3001, () => {
  console.log("Server 1 running on port 3001");
});