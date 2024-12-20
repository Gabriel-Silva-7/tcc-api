const { get } = require("http");
const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getlockerNotBusy(tamanho, idCondominio) {
  try {
    const getlockerNotBusy = await sequelize.query(
      ` SELECT 
            IdLocker
        FROM 
            Locker 
        WHERE 
            Ocupado = 0 AND 
            Tamanho = :tamanho AND
            IdCondominio = :idCondominio`,
      {
        replacements: {
          tamanho: tamanho,
          idCondominio: idCondominio,
        },
        type: QueryTypes.SELECT,
      }
    );
    if (getlockerNotBusy.length < 0) {
      const error = new Error("There is no locker available");
      error.status = 409;
      throw error;
    }
    return getlockerNotBusy;
  } catch (error) {
    console.error("Error getting locker:", error);
    throw error;
  }
}

module.exports = getlockerNotBusy;
