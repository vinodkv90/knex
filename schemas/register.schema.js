const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required(),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
        .required(),
    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required(),
});
