const Joi = require('joi');

const receiptInputSchema = Joi.object({
    vehicleRegistrationNum: Joi.string().required().pattern(new RegExp('^[A-Z]{2}[-][0-9]{1,2}[-][A-Z]{1,2}[-][0-9]{3,4}$')),
    isReturn:Joi.boolean().required()
})

const checkValidityInputSchema = Joi.object({
    id:Joi.string().length(7).required()
})

module.exports = {
    receiptInputSchema,
    checkValidityInputSchema
}