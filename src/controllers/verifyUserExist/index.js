const verifyUserExist = require("../../services/verifyUserExist");

async function verifyUserExistController(request, reply) {
  const { email } = request.body;
  console.log("email", email);

  if (!email) {
    return reply.status(400).send({ error: "Email is required" });
  }

  try {
    const userExists = await verifyUserExist(email);
    console.log(userExists);

    if (userExists) {
      return reply.status(200).send({ message: "User exists", value: true });
    } else {
      return reply
        .status(201)
        .send({ message: "User does not exist", value: false });
    }
  } catch (error) {
    console.error("Error in verifyUserExistController:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

module.exports = verifyUserExistController;
