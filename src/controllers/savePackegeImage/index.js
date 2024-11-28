const savePackegeImage = require("../../services/savePackegeImage");

async function savePackegeImageController(req, res) {
  const { IdHistorico, base64Image } = req.body;

  try {
    const result = await saveUserImage(IdHistorico, base64Image);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving image", error: error.message });
  }
}

module.exports = {
  savePackegeImageController,
};
