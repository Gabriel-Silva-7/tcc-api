const verifyLockerStatus = require("../../services/verifyLockerStatus");

async function verifyLockerStatusController(req, res) {
  const { idLocker, fdcurso } = req.body;
  console.log("idLocker", idLocker);
  console.log("fdcurso", fdcurso);

  if (!idLocker) {
    return res.status(400).send({ error: "Id Locker is required" });
  }

  try {
    const objLocker = await verifyLockerStatus(idLocker);
    console.log(objLocker);

    if (objLocker) {
      return res.status(200).send({
        status: objLocker.status,
        busy: objLocker.busy,
      });
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
