const getLockerPerCondominium = require("../../services/getLockerPerCondominium");

const getLockerPerCondominiumController = async (req, res) => {
  try {
    const { email } = req.body;
    const getLocker = await getLockerPerCondominium(email);

    res.status(200).send({
      message: "Lockers was done successfully",
      getLocker,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).send({
      message: "Error getting Lockers",
      error: error.message,
    });
  }
};

module.exports = getLockerPerCondominiumController;
