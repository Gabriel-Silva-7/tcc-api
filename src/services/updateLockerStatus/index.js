const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function updateLockerStatus(lockerData) {
  const { idLocker, status, busy, idUser } = lockerData;
  try {
    const existingUser = await sequelize.query(
      "SELECT COUNT(*) as count FROM Usuarios WHERE IdUsuario = :idUser",
      {
        replacements: { idUser: idUser },
        type: QueryTypes.SELECT,
      }
    );

    if (existingUser[0].count != 1) {
      const error = new Error("User does not exist");
      error.status = 409;
      throw error;
    }

    const result = await sequelize.query(
      "UPDATE Locker " +
        "SET " +
        "  Status     = :status" +
        ", Ocupado    = :busy" +
        ", IdUsuario  = :idUser " +
        "WHERE IdLocker = :idLocker",
      {
        replacements: {
          status: status,
          idLocker: idLocker,
          busy: busy,
          idUser: idUser,
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

module.exports = updateLockerStatus;
