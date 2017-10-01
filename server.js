'use strict';

const Glue = require('glue');
const config = require('./config');
const path = require('path');
const logger = require('./logger');

const options = {
  relativeTo: path.join(process.cwd(), '/api'),
};

Glue.compose(config.manifest, options, (compErr, server) => {
  if (compErr) throw compErr;

  server.start((servErr) => {
    if (servErr) throw servErr;
    logger.info(`Server [env=${process.env.NODE_ENV}] running at: ${server.info.uri}`);
  });
});
