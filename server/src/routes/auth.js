const router = require('express').Router();
const { signup } = require('../controllers/auth/signup');
const { verify, validateToken } = require('../controllers/auth/verify');
const { login } = require('../controllers/auth/login');
const { requestReset } = require('../controllers/auth/requestReset');
const { resetPassword } = require('../controllers/auth/resetPassword');

router.post("/signup", signup)
    .get("/validate-token/:token", validateToken)
    .get("/verify/:token", verify)
    .post("/login", login)
    .post("/request-reset", requestReset)
    .post("/reset-password/:token", resetPassword)

module.exports = router;