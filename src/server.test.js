const request = require("supertest");

const server = require("./server");

const { getUsersByLocation } = require("./bpdts");

jest.mock("./bpdts");

test("server returns a 200 response", () => {
  return request(server)
    .get("/")
    .expect(200);
});

test("the /users endpoint returns an array of users", () => {
  getUsersByLocation.mockResolvedValue(Promise.resolve([{ foo: "bar" }]));

  return request(server)
    .get("/users")
    .then(res => {
      expect(getUsersByLocation).toHaveBeenCalledWith("London", 50);
      expect(res.body).toEqual([{ foo: "bar" }]);
    });
});
