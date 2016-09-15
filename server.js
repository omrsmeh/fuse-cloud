'use strict';

const Composer = require('./index');
const validate = require('./server/api/auth/actions/validator');
const User     = require('./server/api/auth/model/users.model');
const Template = require('./server/api/template/model/template.model');

Composer((err, server) => {

  if (err) {
    console.log('Error: Traced >>> ', err);
    throw err;
  }

  // PreResponse Handler to Catch BOOM Errors
  const preResponse = function (request, reply) {

    let response = request.response;

    if (response.isBoom) {
      if (response.output.statusCode === 401) {
        return reply.redirect('/');
      }
      // Replace error
      let error = response;
      let ctx = {
        statusCode: error.output.statusCode,
        error: error.output.payload.error,
        message: (error.isDeveloperError ? 'Oops! it\'s not you, it\'s us.' : error.output.payload.message)
      };
      if(parseInt(process.env.SHOW_ERROR_LOG) === 1) { console.log(error); }
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
      algorithms: [ 'HS256' ],
      audience: process.env.AUTH_CLIENT_AUDIENCE
    }
  });

  server.auth.strategy('bellauth', 'bell', {
    provider: 'auth0',
    location: 'http://localhost:9000/auth',
    config: {domain: 'omrsmeh.auth0.com'},
    password: 'yTDbYctgnWPB6oormQ8W_PjL__XnTWjKoTET5Y-f_tJ6iSCOVt9UzHUWl3MoBUMx',
    clientId: 'xt2iij0FvfJroGkMNE67lZFL42q9IDH2',
    clientSecret: '5udWohq7kqcGKNmQl0wJdSRYqyFbGzSLWDe8eev48odYl42zrfYwVcTr-8Yer779',
    isSecure: false     // Terrible idea but required if not using HTTPS especially if developing locally
  });

  server.auth.default('token');

  // Register all routes here because they pre-loads
  // and strategy are post-load which cause
  // error and API is load
  server.register({
    register: require('acquaint'),
    options: {
      relativeTo: __dirname,
      routes: [
        {
          includes: [
            './server/api/**/*Routes.js',
            './server/api/index.js'
          ]
        }
      ],
    }
  }, (err) => {

    // Setting App models
    server.settings.app = {
      'users': (new User(server.plugins['hapi-mongoose'])),
      'templates': (new Template(server.plugins['hapi-mongoose'])),
    };

    // KickStart Web Server
    server.start(() => {
      console.log('Fusion HTML API Server Running on port ' + server.info.port);
    });
  });

});
