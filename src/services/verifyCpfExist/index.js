const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function verifyCpfExist(cpf) {
  try {
    const result = await sequelize.query(
      "SELECT * FROM Moradores WHERE cpf = :cpf",
      {
        replacements: { cpf },
        type: QueryTypes.SELECT,
      }
    );
    console.log(result);

    if (result.length > 0) {
      const response = await sequelize.query(
        "SELECT * FROM Unidades WHERE IdUnidade = :IdUnidade",
        {
          replacements: { IdUnidade: result[0].IdUnidade },
          type: QueryTypes.SELECT,
        }
      );

      return response[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
}

module.exports = verifyCpfExist;
