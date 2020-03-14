const express = require("express");
const server = express();

const router = express.Router({ strict: true });

const { getUsers } = require("./bpdts");

router.get("/", (req, res) => {
  res.send("Ok");
});

router.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

server.use(router);

module.exports = server;
