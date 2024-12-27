const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user || !(await argon2.verify(user.password, password))) {
         return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
         {
            userId: user._id,
            email: user.email,
            username: user.username
         },
         process.env.JWT_SECRET,
         { expiresIn: '24h' }
      );

      res.status(200).json({ token });
   } catch (error) {
      res.status(500).json({ error: 'An error occurred during login' });
   }
};

module.exports = { login };