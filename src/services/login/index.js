const sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

async function loginUser(loginData) {
  const { email, password } = loginData;

  try {
    const user = await sequelize.query(
      "SELECT * FROM Usuarios WHERE Email = :email",
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );
    const unidades = await sequelize.query(
      `SELECT u.*, c.NomeCondominio
       FROM Unidades u
       JOIN MoradoresUnidades mu ON mu.IdUnidade = u.IdUnidade
       JOIN Condominios c ON c.IdCondominio = u.IdCondominio
	   JOIN Moradores m ON m.IdMorador = mu.IdMorador
	   Join Usuarios us on us.CPF = m.CPF
	   where us.email = '${email}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].Senha);
    const token = jwt.sign(
      { email: email, unidades: unidades },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.status = 401;
      throw error;
    }

    return { message: "Login successful", token };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = loginUser;
