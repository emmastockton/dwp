beforeEach(() => {
  jest.resetModules();
});

test("API_URL config value can be overridden by an environment variable", () => {
  process.env.API_URL = "example.org";

  const { apiUrl } = require(".");

  expect(apiUrl).toEqual("example.org");
});

test("API_URL falls back to a default if none is given", () => {
  delete process.env.API_URL;

  const { apiUrl } = require(".");

  expect(apiUrl).toEqual("https://bpdts-test-app.herokuapp.com");
});
