const hashService = require("../services/hash-service")
const jwtService = require("../services/jwt-service")
const userService = require("../services/user-service")
const createError = require("../utils/create-error")

const authController = {}

authController.register = async (req,res,next) => {
    try {
const data = req.input
const existUser = await userService.findUserByUserName(data.userName)

if (existUser) {
    createError('username already existed', 400)
}

data.password = await hashService.hash(data.password)
await userService.createUser(data)
res.status(201).json({message: 'user created'})


    } catch (err) {
        next (err)
    }
}

authController.login = async (req,res,next) => {
    try {
        const data = req.body
        const existUser = await userService.findUserByUserName(data.userName)

        if (!existUser) {
            createError('user did not exist', 400)
        }

        const isMatch = await hashService.compare(
            data.password, existUser.password
        )

        if (!isMatch) {
            createError('wrong username or password', 400)
        }

        const accessToken = jwtService.sign({id: existUser.id})
        res.status(200).json({accessToken})

    } catch (err) {
        next(err)
    }
}

authController.getMe = (req,res,next) => {
    res.status(200).json({user: req.user})
}

module.exports = authController

