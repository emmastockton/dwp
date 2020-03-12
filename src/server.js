const Express = require("express");
const server = Express();

server.get("/", (req, res) => {
  res.send("Ok");
});

module.exports = server;
