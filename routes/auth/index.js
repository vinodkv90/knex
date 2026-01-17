const express = require('express');
const authController = require('../../controller/auth');
const validate = require('../../middlewares/validate');
const registerSchema = require('../../schemas/register.schema');
const loginSchema = require('../../schemas/login.schema');

const router = express.Router();
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;