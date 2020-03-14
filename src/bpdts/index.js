const superagent = require("superagent");
const geolib = require("geolib");

const apiUrl = "https://bpdts-test-app.herokuapp.com";

const LONDON = {
  latitude: 51.509865,
  longitude: -0.118092,
};
const DISTANCE = 50;
const MILES_PER_METER = 1609.344;

function apiGet(path = "") {
  return superagent.get(`${apiUrl}${path}`);
}

function getDistanceFromLondon({ latitude, longitude }) {
  return geolib.getDistance({ latitude, longitude }, LONDON) / MILES_PER_METER;
}

function uniqueUser(user, pos, arr) {
  return arr.findIndex(({ id }) => user.id === id) === pos;
}

async function getUsersByResidency() {
  const res = await apiGet("/city/London/users");
  return res.body;
}

async function getUsersByDistance() {
  const res = await apiGet("/users");
  return res.body.filter(user => getDistanceFromLondon(user) <= DISTANCE);
}

async function getUsers() {
  return [
    ...(await getUsersByResidency()),
    ...(await getUsersByDistance()),
  ].filter(uniqueUser);
}

module.exports = {
  getUsers,
};
