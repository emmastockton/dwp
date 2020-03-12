const server = require("./src/server");

const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

server.listen(port, () =>
  console.log(`Server running at http://${hostname}:${port}/`)
);
