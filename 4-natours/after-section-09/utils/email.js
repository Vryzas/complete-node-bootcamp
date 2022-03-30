const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1 create transporterver
  const transporter = nodemailer.createTransport({
    // service: 'Gmail' => example service
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  // 2 define email options
  const mailOptions = {
    from: 'Toni Ramos <hello@jonas.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html...
  };
  // 3 send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
