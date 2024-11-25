const getBlockPerCondominium = require("../../services/getBlockPerCondominium");

const getBlockPerCondominiumController = async (req, res) => {
  try {
    const { idCondominio } = req.body;
    const response = await getBlockPerCondominium(idCondominio);

    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({
      message: "Error getting block per condominium",
      error: error.message,
    });
  }
};

module.exports = getBlockPerCondominiumController;
