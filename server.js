'use strict';

const Composer = require('./index');
const validate = require('./server/api/auth/actions/validator');
const User     = require('./server/api/auth/model/users.model');

Composer((err, server) => {

  if (err) {
    console.log('Error: Traced >>> ', err);
    throw err;
  }

  // PreResponse Handler to Catch BOOM Errors
  const preResponse = function (request, reply) {

    let response = request.response;

    if (response.isBoom) {
      // Replace error
      let error = response;
      let ctx = {
        statusCode: error.output.statusCode,
        error: error.output.payload.error,
        message: (error.isDeveloperError ? 'Oops! it\'s not you, it\'s us.' : error.output.payload.message)
      };

      return reply(ctx).code(200);
    }

    return reply.continue();
  };

  server.ext('onPreResponse', preResponse);

  // Authentication Strategy
  server.auth.strategy('token', 'jwt', {
    key: new Buffer(process.env.AUTH_CLIENT_SECRET, 'base64'),
    validateFunc: validate,
    verifyOptions: {
      algorithms: [ 'HS256' ]
    }
  });

  server.auth.default('token');

  server.settings.app = {
    'users': (new User(server.plugins['hapi-mongoose']))
  };

  // KickStart Web Server
  server.start(() => {

    console.log('Fuse Cloud API Server Running on port ' + server.info.port);
  });
});
