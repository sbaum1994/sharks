'use strict';

const config = {};

config.development = {
  name: 'Shark API',
  ocearch: {
    url: 'http://www.ocearch.org/tracker/ajax',
  },
  google: {
    host: 'https://maps.googleapis.com/maps/api',
    apiKey: 'AIzaSyBzeZhQjhyGfKnU4vHpJrFu1oyRisVUFoE',
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