const { Joi } = require('../libraries');

module.exports = {
    search: Joi.object({
        Title: Joi.string().required()
    }),
    favorite: Joi.object({
        id: Joi.string().required()
    })
};