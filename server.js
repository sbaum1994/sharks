'use strict';

const Glue = require('glue');
const config = require('./config');
const path = require('path');
const logger = require('./logger');

const options = {
  relativeTo: path.join(process.cwd(), '/app/register'),
};

Glue.compose(config.manifest, options, (err, server) => {
  if (err) throw err;

  server.start((err) => {
    if (err) throw err;
    logger.info(`Server ${process.env.NODE_ENV} running on: ${server.info.uri}`);
  });
});
