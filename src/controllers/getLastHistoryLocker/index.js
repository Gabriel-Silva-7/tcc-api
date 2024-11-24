const getLastHistoryLocker = require("../../services/getLastHistoryLocker");

const getLastHistoryLockerController = async (req, res) => {
  try {
    const body = req.body;

    const getLastHistory = await getLastHistoryLocker(body);

    res.status(201).send({
      message: "Locker history was done successfully",
      getLastHistory,
    });
  } catch (error) {
    res.status(error.status).send({
      message: "Error getting locker history",
      error: error.message,
    });
  }
};

module.exports = getLastHistoryLockerController;
