'use strict';

const ocearch = require('../ocearch');
const logger = require('../../logger');
const boom = require('boom');

function handler(request, reply) {
  return ocearch.getSharkLocations(request.query)
    .then(data => data.filter(shark => shark.pings.length > 0))
    .then(data => data.map(shark => ocearch.conversions.sharkLocation(shark)))
    .then(res => reply(res))
    .catch((err) => {
      logger.error(err);
      return reply(err.isBoom ? err : boom.badImplementation());
    })
}

module.exports = handler;