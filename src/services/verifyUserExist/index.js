const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function verifyUserExist(email) {
  try {
    const result = await sequelize.query(
      "SELECT COUNT(*) as count FROM Usuarios WHERE email = :email",
      {
        replacements: { email: email },
        type: QueryTypes.SELECT,
      }
    );

    return result[0].count > 0;
  } catch (error) {
    console.error("Error verifying user existence:", error);
    throw error;
  }
}

module.exports = verifyUserExist;
