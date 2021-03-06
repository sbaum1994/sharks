'use strict';

const joi = require('joi');

const sharkLocations = require('../models/sharkLocations');
const errorModel = require('../models/error');
const handler = require('../handlers/get-shark-locations');

module.exports.register = (server, options, next) => {
  server.route({
    path: '/shark-locations',
    method: 'GET',
    config: {
      handler: handler,
      response: {
        schema: sharkLocations,
      },
      description: 'Get shark locations given a set of filters. ' +
        'No from and to date will only return the most recent location.',
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
        query: joi.object({
          sharkId: joi.string().description('Filter results by shark ID.'),
          fromDate: joi.date().iso().description('Filter results by from date.'),
          toDate: joi.date().iso().description('Filter results by to date.'),
        }).and('fromDate', 'toDate'),
      },
      tags: ['api'],
    },
  });

  next();
};

module.exports.register.attributes = {
  name: 'get-shark-locations',
};
