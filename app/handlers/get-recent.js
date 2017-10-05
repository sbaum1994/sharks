'use strict';

const ocearch = require('../ocearch');
// const google = require('../google');
const geonames = require('../geonames');
const logger = require('../../logger');
const Promise = require('bluebird');
const boom = require('boom');
const moment = require('moment');

function addDataToLocation(location) {
  return geonames.getCountry(location.latitude, location.longitude)
    .then(({ countryCode, countryName }) => {
      location.countryCode = countryCode;
      location.country = countryName;
    })
    .catch((err) => {
      // we don't care if some of the lookups don't work
    })
    .then(() => geonames.getOcean(location.latitude, location.longitude))
    .then(ocean => {
      location.ocean = ocean;
    })
    .catch((err) => {
      // we don't care if some of the lookups don't work
    })
    .then(() => {
      return location;
    });
  // works but I don't want to pay for usage T_T
  // return google.getNearbyLocation(location.latitude, location.longitude)
  //   .then(res => google.getCountry(res.geometry.location.lat, res.geometry.location.lng))
  //   .then(country => {
  //     location.country = country.long;
  //     location.countryCode = country.short;
  //     return location;
  //   })
}

function handler(request, reply) {
  request.query.fromDate = moment().subtract(1, 'week').format('YYYY-MM-DD');
  request.query.toDate = moment().format('YYYY-MM-DD');

  return ocearch.getSharkLocations(request.query)
    .then(data => data.filter(shark => shark.pings.length > 0))
    .then(data => data.map(shark => ocearch.conversions.sharkLocation(shark)))
    .then((sharks) => {
      return Promise.map(sharks, (shark) => {
        shark.locations = Promise.map(shark.locations, addDataToLocation);
        return Promise.props(shark);
      });
    })
    .then(res => reply(res))
    .catch((err) => {
      logger.error(err);
      return reply(err.isBoom ? err : boom.badImplementation());
    })
}

module.exports = handler;