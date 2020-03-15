const config = {
  apiUrl: process.env.API_URL || "https://bpdts-test-app.herokuapp.com",
  API_CACHE_EXPIRES: parseInt(process.env.API_CACHE_EXPIRES || 30, 10),
};

module.exports = config;
