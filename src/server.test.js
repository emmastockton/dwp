const request = require("supertest");

const server = require("./server");

const { getUsers } = require("./bpdts");

jest.mock("./bpdts");

test("server returns a 200 response", () => {
  return request(server)
    .get("/")
    .expect(200);
});

test("the /users endpoint returns an array of users", () => {
  getUsers.mockResolvedValue(Promise.resolve([{ foo: "bar" }]));

  return request(server)
    .get("/users")
    .then(res => {
      expect(getUsers).toHaveBeenCalledWith();
      expect(res.body).toEqual([{ foo: "bar" }]);
    });
});
