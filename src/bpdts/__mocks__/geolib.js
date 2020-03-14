const geolib = jest.requireActual("geolib");

module.exports = {
  ...geolib,
  // allow spying on geolib.getDistance
  getDistance: jest.fn((...args) => geolib.getDistance(...args)),
};
