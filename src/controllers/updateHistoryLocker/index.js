const updateHistoryLocker = require("../../services/updateHistoryLocker");

const updateHistoryLockerController = async (req, res) => {
  try {
    const body = req.body;

    const updateHistory = await updateHistoryLocker(body);

    res.status(201).send({
      message: "Locker history updated successfully",
      body,
    });
  } catch (error) {
    res.status(error.status).send({
      message: "Error updating locker history",
      error: error.message,
    });
  }
};

module.exports = updateHistoryLockerController;
