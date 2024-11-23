const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function updateLockerFdCurso(lockerData) {
  const { idLocker, fdCurso } = lockerData;
  try {
    const result = await sequelize.query(
      "UPDATE Locker " +
        "SET " +
        "FimDeCurso = :fdCurso " +
        "WHERE IdLocker = :idLocker",
      {
        replacements: {
          idLocker: idLocker,
          fdCurso: fdCurso,
        },
        type: QueryTypes.SELECT,
      }
    );
    return { message: "Update status locker" };
  } catch (error) {
    console.error("Error updating locker:", error);
    throw error;
  }
}

module.exports = updateLockerFdCurso;
