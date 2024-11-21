const db = require("../../config/db");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = { name, email, password };

    console.log(name, email, password);

    res.status(201).send({
      message: "User created successfully",

      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",

      error: error.message,
    });
  }
};

module.exports = createUser;
