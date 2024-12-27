const argon2 = require('argon2');
const crypto = require('crypto');
const Token = require('../../models/Token');
const User = require('../../models/User');
const { sendVerificationEmail } = require('../../utils/email');

const signup = async (req, res) => {
   try {
      const { username, email, password } = req.body;

      const existingUser = await User.exists({ email });
      if (existingUser) return res.status(400).json({ error: "Email already taken" });

      const pendingToken = await Token.findOne({ email });
      if (pendingToken) return res.status(400).json({ error: "Verification email already sent. Please check your inbox." });

      const hashedPassword = await argon2.hash(password);
      const verificationToken = crypto.randomBytes(32).toString('hex');

      await Token.create({
         username,
         email,
         password: hashedPassword,
         token: verificationToken
      });   

      await sendVerificationEmail(email, verificationToken);

      res.status(201).json({ message: 'Please verify your email within 1 hour to complete registration.' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

module.exports = { signup };