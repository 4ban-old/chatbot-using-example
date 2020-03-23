const register = require("./lib/register");
const init_conversation = require("./lib/conversation_initialization");
const chat = require("./lib/chat");
/**
 * Main program cycle
 * Register the user, get the conversation id and start the chat with the bot
 */
async function start_chat() {
  let user_id;
  let conversation_id;
  // User registration
  try {
    const response = await register("Dmitry Kryukov", "remasik@gmail.com");
    user_id = response.data.user_id;
  } catch (err) {
    console.log("Can't get a user_id:", err);
  }
  // Init conversation
  try {
    const response = await init_conversation(user_id);
    conversation_id = response.data.conversation_id;
  } catch (err) {
    console.log("Can't get a conversation_id:", err);
  }

  // Start chat
  let message;
  let answer;
  while (true) {
    try {
      const response = await chat.get_message(conversation_id);
      message = response.data.messages[response.data.messages.length - 1];
      // parse message
      console.log("Message: ", message.text);
      if (message.text.includes("Thank you")) break;
      answer = chat.parse_message(message.text);
      console.log("Answer: ", answer);
    } catch (err) {
      console.log(
        "Can't get a message:",
        err.response.status,
        err.response.statusText
      );
      break;
    }
    // Reply
    try {
      let response = await chat.send_message(conversation_id, answer);
      console.log("API answer correctness:", response.data.correct);
      console.log("\n");
      // while (!response.data.correct) {
      // TODO: create another answer
      //   response = await chat.send_message(conversation_id, answer);
      // }
      if (!response.data.correct) break;
    } catch (err) {
      console.log("Can't reply:", err.response.status, err.response.statusText);
      break;
    }
  }
}
start_chat();
