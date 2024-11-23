const updateLockerStatus = require("../../services/updateLockerStatus");

async function updateLockerStatusController(req, res) {
  const { idLocker, status, busy, idUser } = req.body;

  if (!idLocker) {
    return res.status(400).send({ error: "Id Locker is required" });
  }

  try {
    const lockerStatus = await updateLockerStatus(req.body);
    console.log(lockerStatus);

    if (lockerStatus) {
      return res.status(200).send(lockerStatus);
    } else {
      return res
        .status(201)
        .send({ message: "Locker does not exist", value: false });
    }
  } catch (error) {
    console.error("Error in updateLockerStatusController:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

module.exports = updateLockerStatusController;
