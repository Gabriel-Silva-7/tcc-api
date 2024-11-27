const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");
async function createMorador(cpf, bloco, apartamento, email) {
  try {
    const verifyResidentExist = await sequelize.query(
      ` SELECT COUNT(*) as count 
          FROM 
              Moradores 
          WHERE 
              CPF = :cpf`,
      {
        replacements: { cpf: cpf },
        type: QueryTypes.SELECT,
      }
    );
    if (verifyResidentExist[0].count > 0) {
      const error = new Error("Resident is already registered");
      error.status = 409;
      throw error;
    }
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

    const getCondData = await sequelize.query(
      `SELECT
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
        JOIN
            Locker l ON l.IdCondominio = con.IdCondominio
        WHERE u.CPF = :cpf`,
      {
        replacements: {
          cpf: getCPFAdmin[0].CPF,
        },
        type: QueryTypes.SELECT,
        returning: true,
        raw: true,
      }
    );

    const insertUnidade = await sequelize.query(
      `INSERT INTO Unidades (IdCondominio, Bloco, Apartamento)
       VALUES (:idCondominio, :bloco, :apartamento)`,
      {
        replacements: {
          idCondominio: getCondData[0].IdCondominio,
          bloco: bloco,
          apartamento: apartamento,
        },
        type: QueryTypes.INSERT,
      }
    );

    const getLastIdUnid = await sequelize.query(
      ` SELECT TOP 1 IdUnidade
        FROM Unidades
        ORDER BY IdUnidade DESC;`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const insertMorador = await sequelize.query(
      `INSERT INTO Moradores (CPF)
         VALUES (:cpf)`,
      {
        replacements: {
          cpf: cpf,
        },
        type: QueryTypes.INSERT,
      }
    );

    const getLastIdMorador = await sequelize.query(
      ` SELECT TOP 1 IdMorador
          FROM Moradores
          ORDER BY IdMorador DESC;`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const insertMoradorUnidade = await sequelize.query(
      `INSERT INTO MoradoresUnidades (IdMorador, IdUnidade)
           VALUES (:IdMorador, :IdUnidade)`,
      {
        replacements: {
          IdMorador: getLastIdMorador[0].IdMorador,
          IdUnidade: getLastIdUnid[0].IdUnidade,
        },
        type: QueryTypes.INSERT,
      }
    );

    return { message: "Resident created successfully" };
  } catch (error) {
    console.error("Error registering resident:", error);
    throw error;
  }
}

module.exports = createMorador;
