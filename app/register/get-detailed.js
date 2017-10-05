'use strict';

const joi = require('joi');

// const sharkDetails = require('../models/sharkDetails');
const errorModel = require('../models/error');
const handler = require('../handlers/get-detailed');

module.exports.register = (server, options, next) => {
  server.route({
    path: '/sharks/{sharkId}',
    method: 'GET',
    config: {
      handler: handler,
      response: {
        schema: joi.object({}).unknown(),
      },
      description: 'Get shark details starting from their original tag date.',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: joi.object({}).unknown(),
            },
            400: {
              description: 'Bad Request',
              schema: errorModel,
            },
            500: {
              description: 'Server Error',
              schema: errorModel,
            }
          },
        },
      },
      validate: {
        params: {
          sharkId: joi.number().integer(),
        },
        query: {
          include: joi.string().description('Comma deliminated string, options: country, ocean'),
        },
      },
      tags: ['api'],
    },
  });

  next();
};

module.exports.register.attributes = {
  name: 'get-detailed',
};
