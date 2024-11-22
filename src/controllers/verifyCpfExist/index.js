const verifyCpfExistService = require("../../services/verifyCpfExist");

const verifyCpfExistController = async (req, res) => {
  try {
    const { cpf } = req.body;
    const response = await verifyCpfExistService(cpf);

    if (response) {
      return res.status(200).send({ response, value: true });
    } else {
      return res.status(201).send({ value: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

module.exports = verifyCpfExistController;
