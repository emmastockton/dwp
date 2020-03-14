const superagent = require("superagent");
const { getUsers } = require(".");

const fixtureCityLondonUsers = require("./fixtures/api/city-London-users.json");
const fixtureUsers = require("./fixtures/api/users.json");

jest.mock("superagent");

beforeEach(() => {
  superagent.get.mockImplementation(url => {
    if (url === "https://bpdts-test-app.herokuapp.com/city/London/users") {
      return {
        body: fixtureCityLondonUsers
      };
    } else if (url === "https://bpdts-test-app.herokuapp.com/users") {
      return {
        body: fixtureUsers
      };
    }
  });
});

test("returns an array of users", async () => {
  const users = await getUsers();

  expect(Array.isArray(users)).toBe(true);

  for (const user of users) {
    expect(user).toMatchObject({
      id: expect.any(Number),
      first_name: expect.any(String),
      last_name: expect.any(String),
      email: expect.any(String),
      ip_address: expect.any(String),
      latitude: expect.anything(),
      longitude: expect.anything()
    });
  }
});

test("return a unique list of users within a set distance of London", async () => {
  const expectedUsersInLondon = 8;
  const users = await getUsers();
  const uniqueUsers = new Set(users.map(({ id }) => id));

  expect(users.length).toEqual(expectedUsersInLondon);
  expect(uniqueUsers.size).toEqual(expectedUsersInLondon);
});

test("calls the expected api endpoints", async () => {
  const users = await getUsers();
  expect(superagent.get).toHaveBeenCalledWith(
    "https://bpdts-test-app.herokuapp.com/city/London/users"
  );
  expect(superagent.get).toHaveBeenCalledWith(
    "https://bpdts-test-app.herokuapp.com/users"
  );
  expect(superagent.get).toHaveBeenCalledTimes(2);
});
