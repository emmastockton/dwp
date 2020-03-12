const request = require("supertest");

const server = require("./server");

test("server returns a 200 response", () => {
  return request(server)
    .get("/")
    .expect(200);
});
