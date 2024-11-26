const sequelize = require("../../config/db");
const { QueryTypes } = require("sequelize");

async function createHelp(telefone, email, assunto, mensagem, idUsuario) {
  try {
    const result = await sequelize.query(
      `INSERT INTO Ajudas (Telefone, Email, Assunto, Mensagem, IdUsuario)
       VALUES (:telefone, :email, :assunto, :mensagem, CASE WHEN :idUsuario IS NULL OR :idUsuario = '' THEN NULL ELSE :idUsuario END)`,
      {
        replacements: {
          telefone: telefone,
          email: email,
          assunto: assunto,
          mensagem: mensagem,
          idUsuario: idUsuario,
        },
        type: QueryTypes.INSERT,
      }
    );
    return { message: "Created Help" };
  } catch (error) {
    console.error("Error creating help:", error);
    throw error;
  }
}

module.exports = createHelp;
