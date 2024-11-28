const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getFaseLocker(IdHistorico) {
  try {
    const response = await sequelize.query(
      `SELECT 
            Fase 
        FROM 
            LockerHistorico
        WHERE
          IdHistorico = :IdHistorico`,
      {
        replacements: {
          IdHistorico: IdHistorico,
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

module.exports = getFaseLocker;
