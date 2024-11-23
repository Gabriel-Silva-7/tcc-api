const loginUserService = require("../../services/login");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token } = await loginUserService({ email, password });

    res.status(200).send({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: "Error logging in",
      error: error.message,
    });
  }
};

module.exports = loginUser;
