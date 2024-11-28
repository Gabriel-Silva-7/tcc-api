const sendEmail = require("../../services/SendEmail");

const sendEmailController = async (req, res) => {
  const { to, subject, text } = req.body;
  console.log(req.body);

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    await sendEmail(to, subject, text);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = sendEmailController;
