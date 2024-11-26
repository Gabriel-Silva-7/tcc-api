const getUserPerAddress = require("../../services/getUserPerAddress");

const getUserPerAddressController = async (req, res) => {
  try {
    const { idCondominio, block, idApartment } = req.body;
    const response = await getUserPerAddress(idCondominio, block, idApartment);

    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({
      message: "Error getting user per address",
      error: error.message,
    });
  }
};

module.exports = getUserPerAddressController;
