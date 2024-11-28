const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function savePackegeImage(IdHistorico, base64Image) {
  try {
    const result = await sequelize.query(
      "UPDATE LockerHistorico SET Imagem = :base64Image WHERE IdHistorico = :IdHistorico",
      {
        replacements: { IdHistorico: IdHistorico, base64Image: base64Image },
        type: QueryTypes.UPDATE,
      }
    );

    return { message: "Image saved successfully", result };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = savePackegeImage;
