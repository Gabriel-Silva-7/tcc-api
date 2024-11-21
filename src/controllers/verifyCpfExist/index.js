const verifyCpfExistService = require("../../services/verifyCpfExist");

const verifyCpfExistController = async (request, reply) => {
  try {
    const { cpf } = request.body;
    console.log(cpf);
    const response = await verifyCpfExistService(cpf);
    console.log(response);

    if (response) {
      return reply.status(200).send({ response });
    } else {
      return reply.status(201).send({ response });
    }
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

module.exports = verifyCpfExistController;
