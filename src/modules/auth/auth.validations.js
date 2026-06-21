import Joi from 'joi'

const signUpValidation = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net']}
    }).required().trim(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required()
})

const signInValidation = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net']}
    }).required().trim(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required()
})

export {
    signUpValidation,
    signInValidation
}