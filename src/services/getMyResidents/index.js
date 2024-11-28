const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getMyResidents(email) {
  try {
    const getCPFAdmin = await sequelize.query(
      ` SELECT 
              CPF 
          FROM 
              Usuarios 
          WHERE 
              Email = :email`,
      {
        replacements: { email: email },
        type: QueryTypes.SELECT,
      }
    );

    const getIdCondominiumAdmin = await sequelize.query(
      `   SELECT TOP 1
            con.IdCondominio
        FROM 
            Usuarios u
        JOIN 
            Moradores m ON u.CPF = m.CPF
        JOIN 
            MoradoresUnidades mu ON mu.IdMorador = m.IdMorador
        JOIN 
            Unidades unid ON unid.IdUnidade = mu.IdUnidade
        JOIN 
            Condominios con ON con.IdCondominio = unid.IdCondominio
        WHERE u.CPF = :cpf`,
      {
        replacements: { cpf: getCPFAdmin[0].CPF },
        type: QueryTypes.SELECT,
      }
    );

    const getResidents = await sequelize.query(
      `   SELECT
            m.CPF,
            m.IdMorador,
            unid.Bloco,
            unid.Apartamento,
            unid.IdUnidade
        FROM
            Moradores m
        JOIN
            MoradoresUnidades mu on  mu.IdMorador = m.IdMorador
        JOIN
            Unidades unid on  unid.IdUnidade = mu.IdUnidade
        WHERE
            unid.IdCondominio = :idcondominio`,
      {
        replacements: {
          idcondominio: getIdCondominiumAdmin[0].IdCondominio,
        },
        type: QueryTypes.SELECT,
      }
    );

    return getResidents;
  } catch (error) {
    console.error("Error updating locker history:", error);
    throw error;
  }
}

module.exports = getMyResidents;
