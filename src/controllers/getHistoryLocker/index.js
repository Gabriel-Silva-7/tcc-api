const getHistoryLocker = require("../../services/getHistoryLocker");

const getHistoryLockerController = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const response = await getHistoryLocker(body);

    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({
      message: "Error getting locker history",
      error: error.message,
    });
  }
};

module.exports = getHistoryLockerController;
