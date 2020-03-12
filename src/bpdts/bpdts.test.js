const superagent = require("superagent");
const { getUsersByLocation } = require(".");

const fixtureCityLondonUsers = require("./fixtures/api/city-London-users.json");

jest.mock("superagent");

beforeEach(() => {
  superagent.get.mockResolvedValue({
    body: fixtureCityLondonUsers
  });
});

test("returns an array of users", async () => {
  const users = await getUsersByLocation("London");

  expect(Array.isArray(users)).toBe(true);
  users.forEach(user =>
    expect(user).toMatchObject({
      id: expect.any(Number),
      first_name: expect.any(String),
      last_name: expect.any(String),
      email: expect.any(String),
      ip_address: expect.any(String),
      latitude: expect.anything(),
      longitude: expect.anything()
    })
  );
});

test("calls the expected api endpoints", async () => {
  const users = await getUsersByLocation("London");
  expect(superagent.get).toHaveBeenCalledWith(
    "https://bpdts-test-app.herokuapp.com/city/London/users"
  );
});
