const superagent = require("superagent");
const superagentCache = require("superagent-cache");
const geolib = require("geolib");

const { apiUrl, API_CACHE_EXPIRES } = require("../config");

superagentCache(superagent, {
  defaultExpiration: API_CACHE_EXPIRES,
});

const LONDON = {
  latitude: 51.509865,
  longitude: -0.118092,
};
const MAX_DISTANCE = 50;
const MILES_PER_METER = 1609.344;
const DISTANCE_ACCURACY = 1;

function apiGet(path) {
  return superagent.get(`${apiUrl}${path}`);
}

function getDistanceFromLondon({ latitude, longitude }) {
  return geolib.getDistance({ latitude, longitude }, LONDON) / MILES_PER_METER;
}

function uniqueUser(userA, actualIndex, allUsers) {
  const foundIndex = allUsers.findIndex(userB => userA.id === userB.id);

  return foundIndex === actualIndex;
}

async function getUsersByResidency() {
  const res = await apiGet("/city/London/users");
  return res.body;
}

async function getUsersByDistance() {
  const res = await apiGet("/users");
  return res.body.filter(user => {
    const dist = getDistanceFromLondon(user).toFixed(DISTANCE_ACCURACY);
    return dist <= MAX_DISTANCE;
  });
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
