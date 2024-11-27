const verifyUserAdmin = require("../../services/verifyUserAdmin");

const verifyUserAdminController = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await verifyUserAdmin(email);
    return res.status(200).send({ value: response });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

module.exports = verifyUserAdminController;
