const nodeMailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async(options) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_PORT == 465,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch(error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;