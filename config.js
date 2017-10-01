'use strict';

const config = {};

config.development = {
  name: 'Shark API',
  ocearch: {
    url: 'http://www.ocearch.org/tracker/ajax',
  },
  cache: false,
  manifest: {
    connections: [
      {
        routes: { cors: true },
        port: process.env.PORT | 3000,
      },
    ],
    registrations: [
      { plugin: 'vision' },
      { plugin: 'inert' },
      { plugin: 'hapi-swagger' },
      { plugin: 'blipp' },
      { plugin: './routes/pulse' },
      { plugin: './routes/get-shark-locations' },

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