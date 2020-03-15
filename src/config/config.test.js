beforeEach(() => {
  jest.resetModules();
});

test("API_URL config value can be overridden by an environment variable", () => {
  process.env.API_URL = "example.org";
  process.env.API_CACHE_EXPIRES = "300";

  const { apiUrl, API_CACHE_EXPIRES } = require(".");

  expect(apiUrl).toEqual("example.org");
  expect(API_CACHE_EXPIRES).toEqual(300);
});

test("API_URL falls back to a default if none is given", () => {
  delete process.env.API_URL;
  delete process.env.API_CACHE_EXPIRES;

  const { apiUrl, API_CACHE_EXPIRES } = require(".");

  expect(apiUrl).toEqual("https://bpdts-test-app.herokuapp.com");
  expect(API_CACHE_EXPIRES).toEqual(30);
});
