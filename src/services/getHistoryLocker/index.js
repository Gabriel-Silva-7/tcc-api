const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getHistoryLocker(userEmail) {
  const { email } = userEmail;
  try {
    const getIdUser = await sequelize.query(
      `SELECT IdUsuario FROM Usuarios WHERE Email = :email`,
      {
        replacements: {
          email: email,
        },
        type: QueryTypes.SELECT,
      }
    );
    const getHistoryUser = await sequelize.query(
      `SELECT 
            IdLocker,
            DataHoraEntrega, 
            DataHoraRetirada 
        FROM 
            LockerHistorico
        WHERE
          IdUsuario = :IdUsuario`,
      {
        replacements: {
          IdUsuario: getIdUser[0].IdUsuario,
        },
        type: QueryTypes.SELECT,
      }
    );
    return getHistoryUser;
  } catch (error) {
    console.error("Error getting locker history:", error);
    throw error;
  }
}

module.exports = getHistoryLocker;
