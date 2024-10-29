const db = require("../../config/db");

const createUser = async (req, reply) => {
  try {
    const { name, email, password } = req.body;

    const user = { name, email, password };

    console.log(name, email, password);

    reply.status(201).send({
      message: "User created successfully",

      user,
    });
  } catch (error) {
    reply.status(500).send({
      message: "Error creating user",

      error: error.message,
    });
  }
};

module.exports = createUser;
