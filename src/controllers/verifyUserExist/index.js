const verifyUserExist = require("../../services/verifyUserExist");

async function verifyUserExistController(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    const userExists = await verifyUserExist(email);

    if (userExists) {
      return res.status(200).send({ message: "User exists", value: true });
    } else {
      return res
        .status(201)
        .send({ message: "User does not exist", value: false });
    }
  } catch (error) {
    console.error("Error in verifyUserExistController:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

module.exports = verifyUserExistController;
