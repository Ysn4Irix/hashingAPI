const Joi = require('joi');

module.exports = validate = value => {
    const schema =
        Joi.object({
            input: Joi.string().max(20).required()
        });
    return schema.validate(value);
}