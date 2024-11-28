const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function createHistoryLocker(history) {
  const { idLocker, IdUsuario } = history;
  try {
    const verifyHistoryLocker = await sequelize.query(
      `SELECT COUNT(*) as count
        FROM LockerHistorico
        WHERE 
          IdLocker = :IdLocker AND
          IdUsuario = :IdUsuario AND
          Fase = 'Entrega'`,
      {
        replacements: {
          IdLocker: idLocker,
          IdUsuario: IdUsuario,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (verifyHistoryLocker[0].count > 0) {
      const error = new Error("The history for the locker already exists");
      error.status = 409;
      throw error;
    }
    const result = await sequelize.query(
      ` INSERT INTO LockerHistorico (IdLocker, IdUsuario, Fase, DataHoraEntrega, Acao)
        OUTPUT INSERTED.IdHistorico
        VALUES (:IdLocker, :IdUsuario, 'Entrega', GETDATE(), 'Desbloqueio');`,
      {
        replacements: {
          IdLocker: idLocker,
          IdUsuario: IdUsuario,
        },
        type: QueryTypes.INSERT,
      }
    );
    return result;
  } catch (error) {
    console.error("Error registering delivery:", error);
    throw error;
  }
}

module.exports = createHistoryLocker;
