const { getMessages, createMessages } = require("../schemas/schema");

async function messageRoutes(fastify, options) {
  const collection = fastify.mongo.client.db().collection("users");

  fastify.get("/messages", async (request, reply) => {
    const messages = await collection.find().toArray();
    return {
      messages,
    };
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
