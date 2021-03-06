const superagent = require("superagent");
const geolib = require("geolib");

const { getUsers } = require(".");
const fixtureCityLondonUsers = require("./fixtures/api/city-London-users.json");
const fixtureUsers = require("./fixtures/api/users.json");

const baseUrl = "https://bpdts-test-app.herokuapp.com";

jest.mock("superagent");
jest.mock("superagent-cache");
jest.mock("geolib");

beforeEach(() => {
  const apiMocks = {
    "https://bpdts-test-app.herokuapp.com/city/London/users": fixtureCityLondonUsers,
    "https://bpdts-test-app.herokuapp.com/users": fixtureUsers,
  };

  superagent.get.mockImplementation(url => {
    if (!apiMocks[url]) {
      throw new Error(`no mock found for ${url}`);
    }
    return {
      body: apiMocks[url],
    };
  });
});

test("requests to upstream API are cached with an expiry", () => {
  jest.resetModules();
  const superagentCache = require("superagent-cache");
  require(".");

  expect(superagentCache).toHaveBeenCalledWith(expect.any(Function), {
    defaultExpiration: 30,
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
      longitude: expect.anything(),
    });
  }
});

test("return a unique list of users within a set distance of London", async () => {
  const validUsers = [4, 5, 999, 135, 396, 520, 658, 688, 794];
  const users = await getUsers();
  const userIds = users.map(({ id }) => id);
  const uniqueUsers = new Set(userIds);

  expect(users.length).toEqual(validUsers.length);
  expect(uniqueUsers.size).toEqual(validUsers.length);
  expect(userIds.sort()).toEqual(validUsers.sort());
});

test("uses the expected lat/long of London when looking up distance", async () => {
  await getUsers();

  expect(geolib.getDistance).toHaveBeenCalledWith(expect.any(Object), {
    latitude: 51.509865,
    longitude: -0.118092,
  });
});

test("calls the expected api endpoints", async () => {
  await getUsers();
  expect(superagent.get).toHaveBeenCalledWith(`${baseUrl}/city/London/users`);
  expect(superagent.get).toHaveBeenCalledWith(`${baseUrl}/users`);
  expect(superagent.get).toHaveBeenCalledTimes(2);
});
