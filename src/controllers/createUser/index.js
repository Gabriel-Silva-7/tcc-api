const createUserService = require("../../services/createUser");

const createUser = async (req, res) => {
  try {
    const body = req.body;

    const createUser = await createUserService(body);

    res.status(201).send({
      message: "User created successfully",
      body,
    });
  } catch (error) {
    res.status(error.status).send({
      message: "Error creating user",
      error: error.message,
    });
  }
};

module.exports = createUser;
