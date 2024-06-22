const dbschema = {
  type: "object",
  properties: {
    MONGO_DATABASE_URL: { type: "string" },
  },
  required: ["MONGO_DATABASE_URL"],
};
module.exports = dbschema;