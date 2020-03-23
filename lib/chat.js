const baseURL = require("../config").baseURL;
const axios = require("axios");
const parser = require("./file_parser");
const path = require("path");

const { data, names, cities, leagues, years, sports } = parser.file_parse(
  path.resolve(__dirname, "../assets/sports-teams.dat")
);

const options = {
  headers: {
    "content-type": "application/json"
  }
};
/**
 * @description GET request to get new messages
 * @param {*} conversation_id
 * @returns Promise ([messages])
 */
function get_message(conversation_id) {
  return axios.get(
    baseURL + "/challenge-behaviour/" + conversation_id,
    options
  );
}
/**
 * @description POST request to send a reply
 * @param {*} conversation_id
 * @param {*} content
 * @returns Promise (correct: true|false)
 */
function send_message(conversation_id, content) {
  return axios.post(
    baseURL + "/challenge-behaviour/" + conversation_id,
    {
      content: content
    },
    options
  );
}
/**
 * @description Parse the message and figure out the reply
 * @param {*} message
 * @returns answer
 */
function parse_message(message) {
  if (message.includes("ready")) return "yes";
  else if (message.includes("sum")) {
    let parsed_message = message
      .split(": ")[1]
      .replace("?", "")
      .split(", ");
    return parsed_message
      .reduce((i, n) => parseInt(i) + parseInt(n))
      .toString();
  } else if (message.includes("largest")) {
    let parsed_message = message
      .split(": ")[1]
      .replace("?", "")
      .split(", ");
    return Math.max.apply(Math, parsed_message).toString();
  } else if (message.includes("repeat")) {
    let parsed_message = message
      .split(": ")[1]
      .replace(".", "")
      .split(", ");
    return parsed_message.filter(item => item.length % 2 == 0).toString();
  } else if (message.includes("alphabetize")) {
    let parsed_message = message
      .split(": ")[1]
      .replace(".", "")
      .split(", ");
    return parsed_message
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .toString();
  } else if (message.includes("following")) {
    let parameter_to_find = message
      .split(" team")[0]
      .split(" ")
      .pop();
    let field;
    if (sports.has(parameter_to_find)) field = "sport";
    else if (leagues.has(parameter_to_find)) field = "league";
    let parsed_message = message
      .split(": ")[1]
      .replace("?", "")
      .split(", ");
    let res = [];
    parsed_message.forEach(name => {
      let tmp = data.filter(
        item => item.name === name && item[field] === parameter_to_find
      );
      if (tmp.length) {
        res.push(tmp[0].name);
      }
    });
    return res.join();
  } else if (message.includes("established")) {
    let parameter_to_find = message
      .split(" ")
      .pop()
      .replace("?", "");
    let list = data.filter(item => item.year === parameter_to_find);
    let res = [];
    list.forEach(item => res.push(item.name));
    return res.join();
  } else {
    return "42";
  }
}

module.exports = {
  get_message,
  send_message,
  parse_message
};
