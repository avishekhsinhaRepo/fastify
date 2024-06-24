const { getMessages, createMessages } = require("../schemas/schema");

async function messageRoutes(fastify, options) {
  fastify.decorate("messageLogger", (message) => {
    console.log(`Message is: ${message}`);
  });

  fastify.decorateRequest("getUserAgent", function () {
    return this.headers["user-agent"];
  });

  fastify.decorateReply("sendSuccess", function (payload) {
    this.type("application/json").code(200);
    this.send({ status: "success", data: payload });
  });

  const collection = fastify.mongo.client.db().collection("messages");

  fastify.get("/messages", async (request, reply) => {
    const messages = await collection.find().toArray();
    messages.forEach((message) => {
      fastify.messageLogger(message.message);
    });

    const response = {
      messages,
      userAgent: request.getUserAgent(),
    };
    reply.sendSuccess(response);

    // return {
    //   messages,
    //   userAgent: request.getUserAgent(),
    // };
  });

  fastify.get("/messages/:id", { schema: getMessages }, async (request, reply) => {
    const { id } = request.params;
    return {
      id,
      message: "Hello World!",
      type: "greetings",
    };
  });

  fastify.post("/messages", { schema: createMessages, attachValidation: true }, async (request, reply) => {
    if (request.validationError) {
      console.log(request.validationError);
      return reply.send(request.validationError.message);
    }
    const { message } = request.body;
    collection.insertOne({ message: message });
    return {
      message,
    };
  });
}

module.exports = messageRoutes;
