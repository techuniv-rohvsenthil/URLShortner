const Joi = require('@hapi/joi');

const getSiteSchema= Joi.object({
	id: Joi.string().required(),
});

const shortenURLSchema = Joi.object({
	url: Joi.string().required(),
});

module.exports = {getSiteSchema, shortenURLSchema};