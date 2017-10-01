'use strict';

const joi = require('joi');

const error = joi.object({
  statusCode: joi.number().required().example(404),
  error: joi.string().required(),
  message: joi.string().required(),
}).label('Error');

module.exports = error;