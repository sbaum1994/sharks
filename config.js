'use strict';

const config = {};

config.development = {
  name: 'Shark API',
  ocearch: {
    url: 'http://www.ocearch.org/tracker/ajax',
  },
  geonames: {
    host: 'http://api.geonames.org',
    username: 'sbaum',
  },
  google: {
    host: 'https://maps.googleapis.com/maps/api',
    geocode: {
      apiKey: 'AIzaSyB9v8siVtJtLHw5Oed7HdlMjaxxdG0i7Kw'
    },
    place: {
      apiKey: 'AIzaSyBXgv7zclbdnybtEtHMFfRiXR4Tb_MtA2Q',
    }
  },
  cache: false,
  manifest: {
    connections: [
      {
        routes: { cors: true },
        port: process.env.PORT | 3030,
      },
    ],
    registrations: [
      { plugin: 'vision' },
      { plugin: 'inert' },
      { plugin: 'hapi-swagger' },
      { plugin: 'blipp' },
      { plugin: './pulse' },
      { plugin: './get-shark-locations' },
      { plugin: './get-recent' },
      { plugin: './get-detailed' }
    ],
  }
}

config.test = Object.assign({}, config.development);

const envs = ['development', 'test'];

function load() {
  const valid = envs.filter(env => env === process.env.NODE_ENV).length > 0;

  if (valid) {
    return config[process.env.NODE_ENV];
  } else {
    return config.development;
  }
}

module.exports = load();