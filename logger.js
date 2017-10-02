'use strict';

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: process.env.npm_package_name,
  serializers: bunyan.stdSerializers,
  level: 'debug',
});

module.exports = logger;