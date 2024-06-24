async function itemsRoute(fastify, options) {
  fastify.decorate("utilityFunction", function () {
    return "This is utility function form Items Route Plugin";
  });

  fastify.decorateRequest("getRequestTime", function () {
    return {
      customHeader: (this.headers["custom"] = "custom request header"),
      requestTime: new Date().toISOString(),
    };
  });

  fastify.decorateReply("sendSuccess", function (payload) {
    this.type("application/json").code(200);
    this.send({ status: "custom", data: payload });
  });

  fastify.get("/plugin-endpoint", async (request, reply) => {
    const utilityResutlt = fastify.utilityFunction();
    const { requestTime, customHeader } = request.getRequestTime();
    reply.sendSuccess({ utilityResutlt, requestTime, customHeader });
  });
}

module.exports = itemsRoute;
