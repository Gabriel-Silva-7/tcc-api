const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function updateHistoryLocker(history) {
  const { IdHistorico, IdLocker, IdUsuario } = history;
  try {
    const verifyExistHistory = await sequelize.query(
      `SELECT COUNT(*) as count 
        FROM LockerHistorico
        WHERE
          IdHistorico = :IdHistorico AND 
          IdLocker = :IdLocker AND 
          IdUsuario = :IdUsuario AND 
          Fase = 'Entrega'`,
      {
        replacements: {
          IdHistorico: IdHistorico,
          IdLocker: IdLocker,
          IdUsuario: IdUsuario,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (verifyExistHistory[0].count == 0) {
      const error = new Error("Locker history does not exist");
      error.status = 409;
      throw error;
    }

    const updateHistory = await sequelize.query(
      `UPDATE LockerHistorico
        SET
            Fase = 'Retirada'
        ,   DataHoraRetirada = GETDATE() 
        ,   Acao = 'Desbloqueio'
        WHERE 
            IdHistorico = :IdHistorico AND 
            IdLocker = :IdLocker AND 
            IdUsuario = :IdUsuario AND 
            Fase = 'Entrega'`,
      {
        replacements: {
          IdHistorico: IdHistorico,
          IdLocker: IdLocker,
          IdUsuario: IdUsuario,
        },
        type: QueryTypes.UPDATE,
      }
    );

    return { message: "Update locker history" };
  } catch (error) {
    console.error("Error updating locker history:", error);
    throw error;
  }
}

module.exports = updateHistoryLocker;
