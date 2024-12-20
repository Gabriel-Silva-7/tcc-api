const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function verifyLockerStatus(idLocker) {
  try {
    const result = await sequelize.query(
      "SELECT Status, Ocupado, FimDeCurso, DataFimDeCurso FROM Locker WHERE IdLocker = :idLocker",
      {
        replacements: { idLocker: idLocker },
        type: QueryTypes.SELECT,
      }
    );
    console.log(result[0]);
    const objLocker = {
      status: result[0].Status,
      busy: result[0].Ocupado,
      fdCurso: result[0].FimDeCurso,
      DatafdCurso: result[0].DataFimDeCurso,
    };
    return objLocker;
  } catch (error) {
    console.error("Error verifying locker:", error);
    throw error;
  }
}

module.exports = verifyLockerStatus;
