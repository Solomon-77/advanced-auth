const argon2 = require('argon2');
const ResetToken = require('../../models/ResetToken');
const User = require('../../models/User');

const resetPassword = async (req, res) => {
   try {
      const { token } = req.params;
      const { newPassword } = req.body;

      const resetToken = await ResetToken.findOne({ token });
      if (!resetToken) return res.status(400).json({ error: 'Invalid or expired reset token. Please request a new password reset.' });

      const user = await User.findOne({ email: resetToken.email });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Update password
      const hashedPassword = await argon2.hash(newPassword);
      user.password = hashedPassword;
      await user.save();

      // Delete the used reset token
      await ResetToken.findByIdAndDelete(resetToken._id);

      res.status(200).json({ message: 'Password has been reset successfully.' });
   } catch (error) {
      res.status(500).json({ error: 'An error occurred during password reset.' });
   }
};

module.exports = { resetPassword };