const createHelp = require("../../services/createHelp");

const createHelpController = async (req, res) => {
  try {
    const { telefone, email, assunto, mensagem, idUsuario } = req.body;

    await createHelp(telefone, email, assunto, mensagem, idUsuario);

    res.status(201).send({
      message: "help created successfully",
    });
  } catch (error) {
    res.status(error.status).send({
      message: "Error creating help",
      error: error.message,
    });
  }
};

module.exports = createHelpController;
