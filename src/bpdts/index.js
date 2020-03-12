const superagent = require("superagent");

async function getUsersByLocation(location) {
  const url = `https://bpdts-test-app.herokuapp.com/city/${location}/users`;
  const res = await superagent.get(url);
  return res.body;
}

module.exports = {
  getUsersByLocation
};
