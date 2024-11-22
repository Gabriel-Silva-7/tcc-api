const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function verifyLockerStatus(idLocker) {
  try {
    const result = await sequelize.query(
      "SELECT Status FROM Locker WHERE IdLocker = :idLocker",
      {
        replacements: { idLocker: idLocker },
        type: QueryTypes.SELECT,
      }
    );
    console.log(result[0]);
    return result[0].Status;
  } catch (error) {
    console.error("Error verifying locker:", error);
    throw error;
  }
}

module.exports = verifyLockerStatus;
