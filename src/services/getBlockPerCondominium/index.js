const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getBlockPerCondominium(idCondominio) {
  try {
    const getBlock = await sequelize.query(
      `SELECT 
            Bloco
        FROM 
            Unidades
        WHERE
          IdCondominio = :idCondominio
        GROUP BY 
            Bloco`,
      {
        replacements: {
          idCondominio: idCondominio,
        },
        type: QueryTypes.SELECT,
      }
    );
    return getBlock;
  } catch (error) {
    console.error("Error getting block per condominium:", error);
    throw error;
  }
}

module.exports = getBlockPerCondominium;
