const getApartmentPerBlock = require("../../services/getApartmentPerBlock");

const getApartmentPerBlockController = async (req, res) => {
  try {
    const { idCondominio, block } = req.body;
    const response = await getApartmentPerBlock(idCondominio, block);

    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({
      message: "Error getting apartment per block",
      error: error.message,
    });
  }
};

module.exports = getApartmentPerBlockController;
