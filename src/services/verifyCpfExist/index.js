const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function verifyCpfExist(cpf) {
  try {
    const moradores = await sequelize.query(
      "SELECT * FROM Moradores WHERE cpf = :cpf",
      {
        replacements: { cpf },
        type: QueryTypes.SELECT,
      }
    );

    if (moradores.length > 0) {
      const idMorador = moradores[0].IdMorador;

      const unidades = await sequelize.query(
        `SELECT u.*, c.NomeCondominio
         FROM Unidades u
         JOIN MoradoresUnidades mu ON mu.IdUnidade = u.IdUnidade
         JOIN Condominios c ON c.IdCondominio = u.IdCondominio
         WHERE mu.IdMorador = :idMorador`,
        {
          replacements: { idMorador },
          type: QueryTypes.SELECT,
        }
      );

      return unidades;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
}

module.exports = verifyCpfExist;
