const updateUser = require("../../services/updateUser");

async function updateUserController(req, res) {
  const { nome, email, cel } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    const upUser = await updateUser(nome, email, cel);
    if (upUser) {
      return res.status(200).send(upUser);
    } else {
      return res
        .status(201)
        .send({ message: "User does not exist", value: false });
    }
  } catch (error) {
    console.error("Error in updateUserController:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

module.exports = updateUserController;
