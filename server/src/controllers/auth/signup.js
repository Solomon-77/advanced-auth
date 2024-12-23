const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { sendVerificationEmail } = require('../../utils/email');

const signup = async (req, res) => {
   try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({
         $or: [{ email }, { username }]
      });

      if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await argon2.hash(password);
      const verificationToken = jwt.sign(
         { email },
         process.env.JWT_SECRET,
         { expiresIn: '24h' }
      );

      const user = new User({
         username,
         email,
         password: hashedPassword,
         verificationToken
      });

      await user.save();
      await sendVerificationEmail(email, verificationToken);

      res.status(201).json({ message: 'User created. Please verify your email.' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

module.exports = { signup };