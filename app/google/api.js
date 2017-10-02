'use strict';

const logger = require('../../logger');
const request = require('request-promise-native');
const config = require('../../config');

/**
 * @param  {String}   latitude latitude of the reverse lookup
 * @param  {String}   longitude longitude of the reverse lookup
 * @return {Promise}  The response object wrapped in a promise
 */
const getCountry = (latitude, longitude) => {
  const uri = `${config.google.host}/geocode/json`;

  const qs = {
    latlng: `${latitude},${longitude}`,
    key: config.google.apiKey,
    result_type: 'country',
  };

  return request(uri, { qs, json: true }).then((res) => {
    logger.debug({
      message: 'google reverse geocode lookup',
      uri,
      qs,
      res,
    });

    return {
      long: res.results[0].address_components[0].long_name,
      short: res.results[0].address_components[0].short_name,
    };
  });
}

/**
 * @param  {String}   latitude latitude of the reverse lookup
 * @param  {String}   longitude longitude of the reverse lookup
 * @return {Promise}  The response object wrapped in a promise (hopefully a location)
 */
const getNearbyLocation = (latitude, longitude) => {
  const uri = `${config.google.host}/place/nearbysearch/json`;

  const qs = {
    location: `${latitude},${longitude}`,
    radius: 50000,
    key: config.google.apiKey,
  };

  return request(uri, { qs, json: true }).then((res) => {
    logger.debug({
      message: 'google nearby search',
      uri,
      qs,
      res,
    });

    return res.results[0];
  });
}

module.exports = {
  getCountry,
  getNearbyLocation,
};


