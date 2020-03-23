const baseURL = require("../config").baseURL;
const axios = require("axios");

const options = {
  headers: {
    "content-type": "application/json"
  }
};

/**
 * @description POST request for registering the user
 * @param name Name of the user
 * @param email Email of the user
 * @returns Promise (user_id)
 */
module.exports = function register(name, email) {
  return axios.post(
    baseURL + "/challenge-register",
    {
      name: name,
      email: email
    },
    options
  );
};
