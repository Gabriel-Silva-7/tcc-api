const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getApartmentPerBlock(idCondominio, block) {
  try {
    const getBlock = await sequelize.query(
      `SELECT 
            Apartamento
        FROM 
            Unidades
        WHERE
          IdCondominio = :idCondominio AND
          Bloco = :block`,
      {
        replacements: {
          idCondominio: idCondominio,
          block: block,
        },
        type: QueryTypes.SELECT,
      }
    );
    return getBlock;
  } catch (error) {
    console.error("Error getting apartment per block:", error);
    throw error;
  }
}

module.exports = getApartmentPerBlock;
