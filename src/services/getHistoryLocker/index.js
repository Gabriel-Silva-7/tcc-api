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
    const response = await sequelize.query(
      `SELECT 
            IdLocker,
            IdHistorico,
            DataHoraEntrega, 
            DataHoraRetirada 
        FROM 
            LockerHistorico
        WHERE
          IdUsuario = :IdUsuario
        ORDER BY IdHistorico DESC`,
      {
        replacements: {
          IdUsuario: getIdUser[0].IdUsuario,
        },
        type: QueryTypes.SELECT,
      }
    );
    return response;
  } catch (error) {
    console.error("Error getting locker history:", error);
    throw error;
  }
}

module.exports = getHistoryLocker;
