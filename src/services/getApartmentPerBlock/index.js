const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getApartmentPerBlock(idCondominio, block) {
  try {
    const getApartment = await sequelize.query(
      ` SELECT
            unid.Apartamento  
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
        WHERE 
          con.IdCondominio = :idCondominio AND
          unid.Bloco = :block`,
      {
        replacements: {
          idCondominio: idCondominio,
          block: block,
        },
        type: QueryTypes.SELECT,
      }
    );
    return getApartment;
  } catch (error) {
    console.error("Error getting apartment per block:", error);
    throw error;
  }
}

module.exports = getApartmentPerBlock;
