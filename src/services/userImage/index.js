const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function saveUserImage(userId, base64Image) {
  try {
    const result = await sequelize.query(
      "UPDATE Usuarios SET Imagem = :base64Image WHERE IdUsuario = :userId",
      {
        replacements: { base64Image, userId },
        type: QueryTypes.UPDATE,
      }
    );

    return { message: "Image saved successfully", result };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = saveUserImage;
