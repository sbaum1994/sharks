'use strict';

const moment = require('moment');

const parsePingDate = raw => moment(raw, 'D MMM YYYY H:mm:ss ZZ').format();

const parseTagDate = raw => moment(raw, 'D MMM YYYY').format();

const sharkLocation = (raw) => {
  const locations = raw.pings.map(ping => ({
    latitude: ping.latitude,
    longitude: ping.longitude,
    dateTime: parsePingDate(ping.tz_datetime),
  }));

  return {
    name: raw.name,
    sharkId: raw.id,
    weight: raw.weight,
    length: raw.length,
    stageOfLife: raw.stageOfLife,
    gender: raw.gender,
    species: raw.species,
    tagDate: parseTagDate(raw.tagDate),
    tagLocation: raw.tagLocation,
    locations,
  }
};


module.exports = {
  sharkLocation
};