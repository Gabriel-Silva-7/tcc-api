const getLockerNotBusy = require("../../services/getLockerNotBusy");

const getLockerNotBusyController = async (req, res) => {
  try {
    const { tamanho, idCondominio } = req.body;
    const lockersNotBusy = await getLockerNotBusy(tamanho, idCondominio);

    res.status(201).send({
      message: "Locker not busy was done successfully",
      lockersNotBusy,
    });
  } catch (error) {
    res.status(error.status).send({
      message: "Error getting locker not busy",
      error: error.message,
    });
  }
};

module.exports = getLockerNotBusyController;
