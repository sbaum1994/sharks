'use strict';

const ocearch = require('../ocearch');
const google = require('../google');
const logger = require('../../logger');
const boom = require('boom');

function addCountryToLocation(location) {
  return google.getNearbyLocation(location.latitude, location.longitude)
    .then(res => google.getCountry(res.geometry.location.lat, res.geometry.location.lng))
    .then(country => {
      location.country = country.long;
      location.countryCode = country.short;
      return location;
    });
}

function handler(request, reply) {
  return ocearch.getSharkLocations(request.query)
    .then(data => data.map(shark => ocearch.conversions.sharkLocation(shark)))
    .then((sharks) => {
      const promises = sharks.map((shark) => {
        const locations = shark.locations.map(addCountryToLocation);
        shark.locations = Promise.all(locations);
        return Promise.resolve(shark);
      });
      return Promise.all(promises);
    })
    .then(res => {
      logger.debug(res);
      return res;
    })
    .then(res => reply(res))
    .catch((err) => {
      logger.error(err);
      return (err.isBoom ? err : boom.badImplementation());
    })
}

module.exports = handler;