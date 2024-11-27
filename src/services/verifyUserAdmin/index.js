const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function verifyUserAdmin(email) {
  try {
    const isUser = await sequelize.query(
      ` SELECT IsAdmin
        FROM Usuarios
        WHERE email = :email`,
      {
        replacements: { email: email },
        type: QueryTypes.SELECT,
      }
    );
    if (isUser[0]) {
      return isUser[0].IsAdmin;
    } else {
      const error = new Error("User does not exist");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.error("Error getting user details:", error);
    throw error;
  }
}

module.exports = verifyUserAdmin;
