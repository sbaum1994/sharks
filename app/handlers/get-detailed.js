'use strict';

const ocearch = require('../ocearch');
const geonames = require('../geonames');
const logger = require('../../logger');
const Promise = require('bluebird');
const boom = require('boom');

function addOceanDataToLocation(location) {
  return geonames.getOcean(location.latitude, location.longitude)
    .then((ocean) => {
      location.ocean = ocean;
    }).catch((err) => {
    // we don't care if some of the lookups don't work
    })
    .then(() => location);
};

function addCountryDataToLocation(location) {
  return geonames.getCountry(location.latitude, location.longitude)
    .then(({ countryCode, countryName }) => {
      location.countryCode = countryCode;
      location.country = countryName;
    })
    .catch((err) => {
      // we don't care if some of the lookups don't work
    })
    .then(() => location);
};

function addDataToLocation(location, ocean, country) {
  if (!ocean && !country) {
    return location;
  }

  if (ocean && country) {
    return addOceanDataToLocation(location)
      .then(addCountryDataToLocation);
  } else if (ocean) {
    return addOceanDataToLocation(location);
  }
  return addCountryDataToLocation(location);
}

function handler(request, reply) {
  let ocean = false;
  let country = false;
  let include = [];

  if (request.query.include) {
    include = request.query.include.split(',');
    logger.error(include);
  }

  if (include.filter(q => 'country' === q).length > 0) {
    country = true;
  }

  if (include.filter(q => 'ocean' === q).length > 0) {
    ocean = true;
  }

  return ocearch.getSharkDetails(request.params.sharkId)
    .then(shark => ocearch.conversions.sharkLocation(shark))
    .then((shark) => {
      shark.locations = Promise.map(shark.locations, location =>
        addDataToLocation(location, ocean, country));
      return Promise.props(shark);
    })
    .then(res => reply(res))
    .catch((err) => {
      logger.error(err);
      return reply(err.isBoom ? err : boom.badImplementation());
    });
}

module.exports = handler;