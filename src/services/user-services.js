const prisma = require("../models/prisma")

const userService = {}

userService.createUser = data => prisma.user.create({data})
userService.findUserByUserName = userName => 
    prisma.user.findFirst({
        where: {
            userName: userName
        }
    })

module.exports = userService