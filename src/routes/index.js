const createUser = require("../controllers/createUser/index");

async function routes(fastify) {
  fastify.post("/createuser", createUser);
}

module.exports = routes;
