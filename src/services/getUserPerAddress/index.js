const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function getUserPerAddress(idCondominio, block, idApartment) {
  try {
    const getUser = await sequelize.query(
      `   SELECT 
	        u.IdUsuario
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
            unid.Bloco = :block AND
            unid.Apartamento = :idApartment`,
      {
        replacements: {
          idCondominio: idCondominio,
          block: block,
          idApartment: idApartment,
        },
        type: QueryTypes.SELECT,
      }
    );
    return getUser;
  } catch (error) {
    console.error("Error getting user per address:", error);
    throw error;
  }
}

module.exports = getUserPerAddress;
