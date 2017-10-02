'use strict';

module.exports.register = (server, options, next) => {
  server.route({
    path: '/pulse',
    method: 'GET',
    handler: (request, reply) => reply(),
  });

  next();
};

module.exports.register.attributes = {
  name: 'pulse',
};
