const express = require('express')
const authController = require('../controllers/auth-controller')
const { authValidator } = require('../middlewares/validator')
const {registerSchema, loginSchema} = require('../validators/auth-validators')

const authRouter = express.Router()

authRouter.post('/register', authValidator(registerSchema), authController.register)
authRouter.post('/login',authValidator(loginSchema), authController.login)

module.exports = authRouter