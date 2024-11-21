const verifyCpfExistService = require("../../services/verifyCpfExist");

const verifyCpfExistController = async (req, res) => {
  try {
    const { cpf } = req.body;
    console.log(cpf);
    const response = await verifyCpfExistService(cpf);
    console.log(response);

    if (response) {
      return res.status(200).send({ response });
    } else {
      return res.status(201).send({ response });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

module.exports = verifyCpfExistController;
