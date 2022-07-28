const {Message} = require('../models/mongo');

const createMessage = async (params) => {
  const msg = {};
  try {
      msg = await Message.create({
          content: params.content,
          sender: params.sender,
          receiver: params.receiver,
      });
  } catch (error) {
      console.log(error);
  }
  return msg;
}

module.exports = {
  createMessage
}