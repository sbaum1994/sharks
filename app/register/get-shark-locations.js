'use strict';

const joi = require('joi');

const sharkLocations = require('../models/sharkLocations');
const errorModel = require('../models/error');
const handler = require('../handlers/get-shark-locations');

module.exports.register = (server, options, next) => {
  server.route({
    path: '/sharks',
    method: 'GET',
    config: {
      handler: handler,
      response: {
        schema: sharkLocations,
      },
      description: 'Get shark locations given a set of filters.',
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
          fromDate: joi.date().iso().description('Filter results by from date.'),
          toDate: joi.date().iso().description('Filter results by to date.'),
          continent: joi.string().valid(['NA, SA, AF, AS, EU, AN, OC'])
            .description('Filter by nearest continent.'),
        },
      },
      tags: ['api'],
    },
  });

  next();
};

module.exports.register.attributes = {
  name: 'get-shark-locations',
};
