const getFaseLocker = require("../../services/getFaseLocker");

const getFaseLockerController = async (req, res) => {
  try {
    const { IdHistorico } = req.body;

    const response = await getFaseLocker(IdHistorico);

    res.status(201).send(response[0]);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({
      message: "Error getting locker fase",
      error: error.message,
    });
  }
};

module.exports = getFaseLockerController;
