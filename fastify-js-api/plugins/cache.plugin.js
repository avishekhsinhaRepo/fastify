const fastifyCachePlugin = require("fastify-plugin");
const NodeCache = require("node-cache");

const cache = async (fastify, options) => {
  const appCache = new NodeCache();

  fastify.addHook("onRequest", async (request, reply) => {
    if (request.method === "GET") {
      console.log("Serving from Cache", appCache.has(request.url));
      if (appCache.has(request.url)) {
        const response = appCache.get(request.url);
        reply.code(200).header("Content-Type", "application/json;charset=utf-8").send(response);
      }
    }
  });

  fastify.addHook("onSend", async (request, reply, payload) => {
    if (request.method === "GET") {
      if (!appCache.has(request.url)) {
        console.log("Setting in Cache");
        appCache.set(request.url, payload);
      }
      //reply.send(payload);
    }
  });
};

module.exports = fastifyCachePlugin(cache);
