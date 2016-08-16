'use strict';

const Confidence = require('confidence');
const Config = require('./config');


const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  $meta: 'Fuse Cloud API Server',
  server: {
    debug: {
      request: ['error'],
      log: ['error']
    },
    connections: {
      routes: {
        security: true
      }
    }
  },
  connections: [{
    port: Config.get('/port/api'),
    labels: ['api']
  }],
  registrations: [
    {
      plugin: {
        register: 'hapi-auth-jwt2'
      }
    },
    {
      plugin: {
        register: 'hapi-mongoose',
        options: {
          bluebird: false,
          uri: 'mongodb://'+process.env.MONGOOSE_DB_PATH
        }
      }
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: {
            interval: 1000
          },
          reporters: {
            myConsoleReporter: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
            }, {
              module: 'good-console'
            }, 'stdout'],
            myFileReporter: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ ops: '*' }]
            }, {
              module: 'good-squeeze',
              name: 'SafeJson'
            }, {
              module: 'good-file',
              args: ['./test/fixtures/awesome_log']
            }],
            myHTTPReporter: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ error: '*' }]
            }, {
              module: 'good-http',
              args: ['http://prod.logs:3000', {
                wreck: {
                  headers: { 'x-api-key': 12345 }
                }
              }]
            }]
          }
        }
      }
    },
    {
      plugin: {
        register: 'acquaint',
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
      }
    }
  ]
};


const store = new Confidence.Store(manifest);


exports.get = function (key) {

  return store.get(key, criteria);
};


exports.meta = function (key) {

  return store.meta(key, criteria);
};