const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function updateUser(nome, email, cel) {
  try {
    const result = await sequelize.query(
      `   UPDATE Usuarios
        SET
            Nome    = :nome,
            Celular  = :cel
        WHERE Email = :email`,
      {
        replacements: {
          nome: nome,
          cel: cel,
          email: email,
        },
        type: QueryTypes.SELECT,
      }
    );
    return { message: "Update user" };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

module.exports = updateUser;
