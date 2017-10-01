'use strict';

const logger = require('../../../logger');
const request = require('request-promise-native');
const config = require('../../../config');

/**
 * @param  {String}   query The query object of the request
 * @return {Promise}        The response object wrapped in a promise
 */
const getSharkLocations = ({ sharkId, species, fromDate, toDate }) => {
  const qs = {
    'tracking-activity': 'ping-most-recent',
    'sharks[]': sharkId,
    species,
    fromDate,
    toDate,
  };

  // not supported: gender, stage-of-life
  // TODO: calculate location filtering, add species

  const uri = `${config.ocearch.url}/filter-sharks`;

  logger.info({
    message: 'get shark locations request',
    uri,
    qs,
  });

  return request.get(uri, { json: true, qs })
    .then((res) => {
      logger.info({
        message: 'get shark locations response',
        res,
      });

      return res;
    })
}

module.exports = {
  getSharkLocations,
};

