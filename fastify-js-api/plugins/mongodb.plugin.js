const fastifyPlugin = require('fastify-plugin');

const dbConnector = async (fastify, options) => {  
    fastify.register(require("@fastify/mongodb"), {
        forceClose: true,
        url: process.env.MONGO_DATABASE_URL,
      });

}

module.exports = fastifyPlugin(dbConnector);