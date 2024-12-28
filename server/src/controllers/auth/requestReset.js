const crypto = require('crypto');
const User = require('../../models/User');
const ResetToken = require('../../models/ResetToken');
const { sendPasswordResetEmail } = require('../../utils/email');

const requestReset = async (req, res) => {
   try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "Email not found" });

      const existingToken = await ResetToken.findOne({ email });
      if (existingToken) return res.status(400).json({ error: "Password reset email already sent. Please check your inbox." });

      const resetToken = crypto.randomBytes(32).toString('hex');
      await ResetToken.create({
         email,
         token: resetToken
      });

      await sendPasswordResetEmail(email, resetToken);

      res.status(200).json({ message: 'Password reset instructions have been sent to your email.' });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = { requestReset };