const express = require('express');
const { signup } = require('../controllers/auth/signup');
const { verify } = require('../controllers/auth/verify');

const router = express.Router()

router.post("/signup", signup)
router.get("/verify/:token", verify)

module.exports = router;