const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getLastHistoryLocker(userEmail) {
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
    console.log(getIdUser);
    const getHistoryUser = await sequelize.query(
      `SELECT TOP 3
	    IdLocker,
        DataHoraEntrega, 
        DataHoraRetirada 
        FROM LockerHistorico
        WHERE IdUsuario = :IdUsuario
        ORDER BY IdHistorico DESC`,
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

module.exports = getLastHistoryLocker;
