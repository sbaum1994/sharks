'use strict';

const logger = require('../../logger');
const request = require('request-promise');
const config = require('../../config');
const boom = require('boom');
const moment = require('moment');

/**
 * @param  {String}   sharkId
 * @return {Promise}  The response object wrapped in a promise
 */
const getSharkDetails = (sharkId) => {
  const qs = {
    'tracking-activity': 'ping-most-recent',
    'sharks[]': sharkId,
  };

  const uri = `${config.ocearch.url}/filter-sharks`;

  logger.debug({
    message: 'get shark locations request',
    uri,
    qs,
  });

  return request.get(uri, { json: true, qs })
    .then((res) => {
      logger.debug({
        message: 'get shark locations response',
        res,
      });

      if (res.length < 1) {
        throw boom.notFound();
      } else if (res.length > 1) {
        throw boom.badImplementation();
      }

      const fromDate = moment(res[0].tagDate, 'D MMM YYYY').format('YYYY-MM-DD');
      const toDate = moment().format('YYYY-MM-DD');

      qs['tracking-activity'] = 'choose_date';
      qs.fromDate = fromDate;
      qs.toDate = toDate;

      return request.get(uri, { json: true, qs });
    })
    .then((res) => {
      logger.debug({
        message: 'get shark locations response',
        res,
      });

      return res[0];
    })
};


/**
 * @param  {String}   query The query object of the request
 * @return {Promise}        The response object wrapped in a promise
 */
const getSharkLocations = ({ sharkId, species, fromDate, toDate }) => {
  const qs = {
    'tracking-activity': 'ping-most-recent',
    'sharks[]': sharkId,
    species,
  };

  if (fromDate && toDate) {
    qs['tracking-activity'] = 'choose_date';
    qs.fromDate = fromDate;
    qs.toDate = toDate;
  }
  // not supported: gender, stage-of-life
  // TODO: calculate location filtering, add species

  const uri = `${config.ocearch.url}/filter-sharks`;

  logger.debug({
    message: 'get shark locations request',
    uri,
    qs,
  });

  return request.get(uri, { json: true, qs })
    .then((res) => {
      logger.debug({
        message: 'get shark locations response',
        res,
      });

      return res;
    });
};

module.exports = {
  getSharkLocations,
  getSharkDetails,
};

