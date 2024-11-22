const verifyLockerStatus = require("../../services/verifyLockerStatus");

async function verifyLockerStatusController(req, res) {
  const { idLocker } = req.body;
  console.log("Locker", idLocker);

  if (!idLocker) {
    return res.status(400).send({ error: "Id Locker is required" });
  }

  try {
    const lockerStatus = await verifyLockerStatus(idLocker);
    console.log(lockerStatus);

    if (lockerStatus) {
      return res.status(200).send({ status: lockerStatus });
    } else {
      return res
        .status(201)
        .send({ message: "Locker does not exist", value: false });
    }
  } catch (error) {
    console.error("Error in verifyLockerStatusController:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

module.exports = verifyLockerStatusController;
