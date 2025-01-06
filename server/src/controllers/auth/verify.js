const Token = require('../../models/Token');
const User = require('../../models/User');

const verify = async (req, res) => {
   try {
      const { token } = req.params;

      const tokenDoc = await Token.findOne({ token });
      if (!tokenDoc) return res.status(404).json({ message: 'Invalid or expired verification token. Please sign up again.' });

      const user = new User({
         username: tokenDoc.username,
         email: tokenDoc.email,
         password: tokenDoc.password
      });

      await user.save();
      res.status(200).json({ message: 'Email verified successfully. You can now login.' });
      await Token.findByIdAndDelete(tokenDoc._id);

   } catch (error) {
      res.status(500).json({ error: 'An error occurred during verification.' });
   }
};

module.exports = { verify };