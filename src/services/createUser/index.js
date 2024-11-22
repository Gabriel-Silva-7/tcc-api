const sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const { QueryTypes } = require("sequelize");

async function createUser(userData) {
  const { loginData, basicInfoData } = userData;

  const hashedPassword = await bcrypt.hash(loginData.password, 12);

  const transaction = await sequelize.transaction();

  try {
    const existingUser = await sequelize.query(
      "SELECT COUNT(*) as count FROM Usuarios WHERE CPF = :cpf",
      {
        replacements: { cpf: basicInfoData.cpf.replace(/\D/g, "") },
        type: QueryTypes.SELECT,
        transaction,
      }
    );

    if (existingUser[0].count > 0) {
      throw new Error("User already exists");
    }

    await sequelize.query(
      `INSERT INTO Usuarios (Nome, CPF, CNPJ, Email, Senha, Celular, AceiteTermos, DataCadastro)
       VALUES (:nome, :cpf, :cnpj, :email, :senha, :celular, :aceiteTermos, GETDATE())`,
      {
        replacements: {
          nome: basicInfoData.name,
          cpf: basicInfoData.cpf.replace(/\D/g, ""),
          cnpj: basicInfoData.isCnpj ? basicInfoData.cnpj : null,
          email: loginData.email,
          senha: hashedPassword,
          celular: basicInfoData.cellphone.replace(/\D/g, ""),
          aceiteTermos: basicInfoData.terms,
        },
        type: QueryTypes.INSERT,
      }
    );

    return { message: "User created successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = createUser;
