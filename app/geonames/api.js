'use strict';

const logger = require('../../logger');
const request = require('request-promise');
const config = require('../../config');
const boom = require('boom');

/**
 * @param  {String}   latitude latitude of the reverse lookup
 * @param  {String}   longitude longitude of the reverse lookup
 * @return {Promise}  The response object wrapped in a promise
 */
const getCountry = (latitude, longitude) => {
  const uri = `${config.geonames.host}/countrySubdivisionJSON`;

  const qs = {
    lat: latitude,
    lng: longitude,
    username: config.geonames.username,
    radius: 100,
  };

  return request(uri, { qs, json: true }).then((res) => {
    logger.debug({
      message: 'geoname country lookup',
      uri,
      qs,
      res,
    });
    
    if (!res.countryCode || !res.countryName) {
      throw boom.notFound();
    }

    return {
      countryCode: res.countryCode,
      countryName: res.countryName,
    };
  });
};

/**
 * @param  {String}   latitude latitude of the reverse lookup
 * @param  {String}   longitude longitude of the reverse lookup
 * @return {Promise}  The response object wrapped in a promise
 */
const getOcean = (latitude, longitude) => {
  const uri = `${config.geonames.host}/oceanJSON`;

  const qs = {
    lat: latitude,
    lng: longitude,
    username: config.geonames.username,
  };

  return request(uri, { qs, json: true }).then((res) => {
    logger.debug({
      message: 'geoname ocean lookup',
      uri,
      qs,
      res,
    });

    if (!res.ocean) {
      throw boom.notFound();
    }

    return res.ocean.name;
  });
};


module.exports = {
  getCountry,
  getOcean,
};
