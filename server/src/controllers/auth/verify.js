const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const verify = async (req, res) => {
   try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
         email: decoded.email,
         verificationToken: token
      });

      if (!user) {
         return res.status(400).json({ message: 'Invalid verification token' });
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();

      res.status(200).json({ message: 'Email verified successfully' });
      // res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
   } catch (error) {
      res.status(400).json({ message: 'Invalid token' });
   }
};

module.exports = { verify };