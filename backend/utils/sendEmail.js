// const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // ✅ use service instead of host/port
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // APP PASSWORD
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"Carbon App 🌱" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//       attachments,
//     });

//     //console.log("📨 Email sent:", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("❌ Email error:", error.message);
//     throw new Error("Email could not be sent");
//   }
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Carbon App 🌱" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments, // ✅ now defined
    });

    return true;
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
