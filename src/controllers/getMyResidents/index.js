const getMyResidents = require("../../services/getMyResidents");

const getMyResidentsController = async (req, res) => {
  try {
    const { email } = req.body;
    const getResidents = await getMyResidents(email);

    res.status(201).send({
      message: "Residents was done successfully",
      getResidents,
    });
  } catch (error) {
    res.status(error.status).send({
      message: "Error getting residents",
      error: error.message,
    });
  }
};

module.exports = getMyResidentsController;
