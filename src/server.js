const Express = require("express");
const server = Express();

const { getUsers } = require("./bpdts");

server.get("/", (req, res) => {
  res.send("Ok");
});

server.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

module.exports = server;
