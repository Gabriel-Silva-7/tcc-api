const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function updateResident(registerData) {
  const { moradorCPF, IdMorador, IdUnidade, Apartamento, Bloco } = registerData;
  try {
    const verifyExistResident = await sequelize.query(
      `SELECT COUNT(*) as count 
        FROM Moradores
        WHERE
          CPF = :cpf`,
      {
        replacements: {
          cpf: moradorCPF,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (verifyExistResident[0].count == 0) {
      const error = new Error("Resident does not exist");
      error.status = 409;
      throw error;
    }

    const update = await sequelize.query(
      ` UPDATE u
        SET
            u.Apartamento = :Apartamento,
            u.Bloco = :Bloco
        FROM
            Unidades u
        JOIN
            MoradoresUnidades mu on mu.IdUnidade = u.IdUnidade
        WHERE
            u.IdUnidade = :IdUnidade AND
            mu.IdMorador = :IdMorador`,
      {
        replacements: {
          IdUnidade: IdUnidade,
          IdMorador: IdMorador,
          Apartamento: Apartamento,
          Bloco: Bloco,
        },
        type: QueryTypes.UPDATE,
      }
    );

    return { message: "Update resident" };
  } catch (error) {
    console.error("Error updating resident:", error);
    throw error;
  }
}

module.exports = updateResident;
