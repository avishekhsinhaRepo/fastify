const fastify = require("fastify")({ logger: true });
const messagesRoutes = require("./routes/messages.routes");
const fastifyEnv = require("@fastify/env");
const dbschema = require("./schemas/db.schema");



const PORT = process.env.PORT || 3002;

fastify.register(require("./plugins/cache.plugin"));

fastify.register(fastifyEnv, {
  schema: dbschema,
  dotenv: true,
});

fastify.register(require("./plugins/mongodb.plugin"));

fastify.register(messagesRoutes, { prefix: "/api" });

fastify.register(require("./routes/items.routes"), { prefix: "/plugin" });



fastify.after((error) => {
  error ? console.log(error) : console.log("Previous Plugin are loaded");
});

fastify.ready((error) => {
  error ? console.log(error) : console.log("All Plugins registered  successfully");
});

fastify.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    console.log(error.validation);
    reply.code(500).send(error.validation);
  }
});

const start = () => {
  fastify.listen({ port: PORT }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  });
};
start();
