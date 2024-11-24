const createHistoryLocker = require("../../services/createHistoryLocker");

const createHistoryLockerController = async (req, res) => {
  try {
    const body = req.body;

    const createHistory = await createHistoryLocker(body);

    res.status(201).send({
      message: "Locker History created successfully",
      body,
    });
  } catch (error) {
    res.status(error.status).send({
      message: "Error creating locker history",
      error: error.message,
    });
  }
};

module.exports = createHistoryLockerController;
