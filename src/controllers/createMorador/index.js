const createMorador = require("../../services/createMorador");

const createMoradorController = async (req, res) => {
  try {
    const { cpf, bloco, apartamento, email } = req.body;

    const createResident = await createMorador(cpf, bloco, apartamento, email);

    res.status(201).send({
      message: "Resident created successfully",
    });
  } catch (error) {
    res.status(error.status).send({
      message: "Error creating resident",
      error: error.message,
    });
  }
};

module.exports = createMoradorController;
