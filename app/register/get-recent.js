'use strict';

const joi = require('joi');

const sharkLocations = require('../models/sharkLocations');
const errorModel = require('../models/error');
const handler = require('../handlers/get-recent');

module.exports.register = (server, options, next) => {
  server.route({
    path: '/shark-locations-recent',
    method: 'GET',
    config: {
      handler: handler,
      response: {
        schema: sharkLocations,
      },
      description: 'Get shark locations given a set of filters within the last month. ' + 
        'Includes a few more detailed computed statistics such as nearest country and ocean.',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: sharkLocations,
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
        query: {
          sharkId: joi.string().description('Filter results by shark ID.'),
        },
      },
      tags: ['api'],
    },
  });

  next();
};

module.exports.register.attributes = {
  name: 'get-recent',
};
