const Express = require("express");
const server = Express();

const { getUsersByLocation } = require("./bpdts");

const location = "London";
const distance = 50;

server.get("/", (req, res) => {
  res.send("Ok");
});

server.get("/users", async (req, res) => {
  const users = await getUsersByLocation(location, distance);
  res.send(users);
});

module.exports = server;
