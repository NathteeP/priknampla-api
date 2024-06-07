const Joi = require('joi')

exports.registerSchema = Joi.object({
    userName: Joi.string().required().trim(),
    displayName: Joi.string().required().trim(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9@.#$!%*?&^]{6,}$/),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip(),
})