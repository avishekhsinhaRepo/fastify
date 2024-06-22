const getMessages = {
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        message: { type: "string" },
      },
    },
  },
};

const createMessages = {
  body: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },
};

module.exports = { getMessages, createMessages };
