const baseURL = require("../config").baseURL;
const axios = require("axios");

const options = {
  headers: {
    "content-type": "application/json"
  }
};

/**
 * @description POST request for initialization of the conversation
 * @param user_id
 * @returns Promise (conversation_id)
 */
module.exports = function init_conversation(user_id) {
  return axios.post(
    baseURL + "/challenge-conversation",
    {
      user_id: user_id
    },
    options
  );
};
