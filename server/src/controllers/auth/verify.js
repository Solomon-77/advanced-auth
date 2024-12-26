const Token = require('../../models/Token');
const User = require('../../models/User');

const verify = async (req, res) => {
   try {
      const { token } = req.params;

      const tokenDoc = await Token.findOne({ token });
      if (!tokenDoc) return res.status(400).json({ message: 'Invalid or expired verification token. Please sign up again.' });

      const user = new User({
         username: tokenDoc.username,
         email: tokenDoc.email,
         password: tokenDoc.password
      });

      await user.save();
      await Token.findByIdAndDelete(tokenDoc._id);

      res.status(200).json({ message: 'Email verified successfully. You can now login.' });
      // For redirect:
      // res.redirect(`${process.env.FRONTEND_URL}/login`);
   } catch (error) {
      res.status(500).json({ error: 'An error occurred during verification.' });
   }
};

module.exports = { verify };