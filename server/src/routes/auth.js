const router = require('express').Router();
const { signup } = require('../controllers/auth/signup');
const { verify } = require('../controllers/auth/verify');
const { login } = require('../controllers/auth/login')

router.post("/signup", signup)
    .get("/verify/:token", verify)
    .post("/login", login)

module.exports = router;