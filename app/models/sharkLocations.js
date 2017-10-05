'use strict';

const joi = require('joi');

const location = joi.object({
  latitude: joi.string().required().example('39.90747'),
  longitude: joi.string().required().example('-72.61677'),
  country: joi.string().allow(null).example('United States'),
  ocean: joi.string().allow(null).example('North Atlantic Ocean'),
  countryCode: joi.string().allow(null).example('US'),
  dateTime: joi.date().iso().required()
    .example('2017-09-27T07:57:20Z')
    .description('Timestamp in ISO format, UTC'),
});

const sharkLocation = joi.object({
  sharkId: joi.number().required().example(21),
  name: joi.string().required().example('Joe'),
  species: joi.string().required().example('White Shark (Carcharodon carcharias)'),
  gender: joi.string().required().example('male'),
  stageOfLife: joi.string().required().example('Mature'),
  length: joi.string().required().allow(null).example('9ft 10in (3 meters)'),
  weight: joi.string().required().allow(null).example('686 lbs.'),
  tagDate: joi.date().iso().required(),
  tagLocation: joi.string().required().example('Monterey Bay'),
  locations: joi.array().items(location),
}).label('sharkLocation');

module.exports = joi.array().items(sharkLocation);
