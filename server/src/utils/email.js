const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
   }
});

const sendVerificationEmail = async (email, verificationToken) => {
   const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

   await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `Click <a href="${verificationLink}">here</a> to verify your account`
   });
};

module.exports = { sendVerificationEmail };