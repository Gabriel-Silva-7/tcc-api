const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getLockerPerCondominio(email) {
  try {
    const getCPF = await sequelize.query(
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
    const result = await sequelize.query(
      `SELECT
            l.IdLocker,
            l.Status,
            l.Ocupado,
            l.Tamanho
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
        JOIN
            Locker l ON l.IdCondominio = con.IdCondominio
        WHERE u.CPF = :cpf`,
      {
        replacements: {
          cpf: getCPF[0].CPF,
        },
        type: QueryTypes.SELECT,
      }
    );

    return result;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw error;
  }
}

module.exports = getLockerPerCondominio;
