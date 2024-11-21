const createUser = require("../controllers/createUser/index");
const verifyCpfExistController = require("../controllers/verifyCpfExist");
const verifyUserExistController = require("../controllers/verifyUserExist");

async function routes(fastify) {
  fastify.post("/createuser", createUser);
  fastify.post("/verifyuser", verifyUserExistController);
  fastify.post("/verifyCpf", verifyCpfExistController);
}

module.exports = routes;
