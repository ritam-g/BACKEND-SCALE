const express = require("express");
const app = express();

let counter = 0;

app.get("/", (req, res) => {
  counter++;

  console.log(
    `PID: ${process.pid} | Request #${counter} | Time: ${new Date().toLocaleTimeString()}`
  );

  res.send(
    `Handled by PID: ${process.pid} | Request #${counter}`
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});