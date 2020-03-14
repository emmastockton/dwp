/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutator: "javascript",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest",
  transpilers: [],
  coverageAnalysis: "off",
  mutate: ["src/**/*.js", "!src/**/__mocks__/*", "!src/**/*.test.js"],
};
