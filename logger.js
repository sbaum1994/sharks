'use strict';

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: process.env.npm_package_name,
});

module.exports = logger;