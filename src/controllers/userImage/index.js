const saveUserImage = require("../../services/userImage/index");

async function saveUserImageController(req, res) {
  const { userId, base64Image } = req.body;

  try {
    const result = await saveUserImage(userId, base64Image);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving image", error: error.message });
  }
}

module.exports = {
  saveUserImageController,
};
