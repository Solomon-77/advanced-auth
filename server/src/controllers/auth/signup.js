const argon2 = require('argon2');
const crypto = require('crypto');
const Token = require('../../models/Token');
const User = require('../../models/User');
const { sendVerificationEmail } = require('../../utils/email');

const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const validateUsername = (username) => {
   const minLength = 3;
   const maxLength = 20;
   const allowedChars = /^[a-zA-Z0-9_-]+$/; // Alphanumeric, underscores, and hyphens

   if (username.length < minLength) return "Username must be at least 3 characters long.";
   if (username.length > maxLength) return "Username must be no more than 20 characters long.";
   if (!allowedChars.test(username)) return "Username can only contain letters, numbers, underscores, and hyphens.";

   return null;
};

const validatePassword = (password) => {
   const hasUpperCase = /[A-Z]/.test(password);
   const hasLowerCase = /[a-z]/.test(password);
   const hasDigit = /[0-9]/.test(password);
   const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

   if (password.length < 8) return "Password must be at least 8 characters long.";
   if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
   if (!hasLowerCase) return "Password must contain at least one lowercase letter.";
   if (!hasDigit) return "Password must contain at least one digit.";
   if (!hasSpecialChar) return "Password must contain at least one special character.";

   return null;
};

const signup = async (req, res) => {
   try {
      const { username, email, password } = req.body;

      if (!validateEmail(email)) return res.status(400).json({ error: "Invalid email format" });

      const usernameError = validateUsername(username);
      if (usernameError) return res.status(400).json({ error: usernameError });

      const passwordError = validatePassword(password);
      if (passwordError) return res.status(400).json({ error: passwordError });

      const existingUser = await User.exists({ email });
      if (existingUser) return res.status(400).json({ error: "Email already taken" });

      const pendingToken = await Token.exists({ email });
      if (pendingToken) return res.status(400).json({ error: "Verification is already sent in your email. Please check your inbox." });

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