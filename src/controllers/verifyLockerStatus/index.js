const verifyLockerStatus = require("../../services/verifyLockerStatus");
const updateLockerFdCurso = require("../../services/updateLockerFdCurso");
const moment = require("moment");

async function verifyLockerStatusController(req, res) {
  const { idLocker, fdCurso } = req.body;
  console.log("idLocker", idLocker);
  console.log("fdcurso", fdCurso);
  let timeOpen;

  if (!idLocker) {
    return res.status(400).send({ error: "Id Locker is required" });
  }

  try {
    const objLocker = await verifyLockerStatus(idLocker);
    if (objLocker.fdCurso != fdCurso) {
      const upLocker = await updateLockerFdCurso(req.body);
    }
    if (fdCurso == 1) {
      now = moment();
      const dataFimDeCurso = moment(objLocker.DatafdCurso);
      const diferencaMinutos = now.diff(dataFimDeCurso, "minutes");
      console.log(diferencaMinutos, "df");
      console.log(diferencaMinutos > 2);
      if (diferencaMinutos > 2) {
        timeOpen = 1;
      }
    } else {
      timeOpen = 0;
    }

    if (objLocker) {
      return res.status(200).send({
        status: objLocker.status,
        busy: objLocker.busy,
        timeOpen: timeOpen,
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
