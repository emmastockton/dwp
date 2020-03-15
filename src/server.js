const express = require("express");
const morgan = require("morgan");

const server = express();
const router = express.Router({ strict: true });

const { getUsers } = require("./bpdts");

function clientCache(req, res, next) {
  res.set("Cache-Control", "public, max-age=30");
  next();
}

server.use(morgan("tiny"));

// disable automatic caching in Express
server.disable("etag");

server.use(clientCache);

router.get("/", (req, res) => {
  res.send("Ok");
});

router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (e) {
    res
      .status(500)
      .send({ error: "unable to get users from upstream service" });
  }
});

server.use(router);

module.exports = server;
