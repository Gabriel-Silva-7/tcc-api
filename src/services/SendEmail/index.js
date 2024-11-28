const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "receba.locker.app@gmail.com",
    pass: "swrg fcwq dhft pcf",
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Receba!" <receba.locker.app@gmail.com>',
      to,
      subject,
      text,
      html: `<p>${text}</p>`,
    });

    console.log("Email enviado:", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  }
};

module.exports = sendEmail;
