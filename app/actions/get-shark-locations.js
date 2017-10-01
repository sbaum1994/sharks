'use strict';

const ocearch = require('./ocearch');
const logger = require('../../logger');
const boom = require('boom');

function handler(request, reply) {
  return ocearch.api.getSharkLocations(request.query)
    .then(data => data.map(shark => ocearch.conversions.sharkLocation(shark)))
    .then(locations => reply(locations))
    .catch((err) => {
      logger.error(err);
      return (err.isBoom ? err : boom.badImplementation());
    })
}

module.exports = handler;