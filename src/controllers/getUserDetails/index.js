const getUserDetails = require("../../services/getUserDetails");

const getUserDetailsController = async (req, res) => {
  try {
    const { email } = req.body;
    const userDetails = await getUserDetails(email);

    res.status(201).send({
      message: "User details was done successfully",
      userDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).send({
      message: "Error getting user details",
      error: error.message,
    });
  }
};

module.exports = getUserDetailsController;
