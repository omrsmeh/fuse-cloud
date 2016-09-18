'use strict';

let AuthRoutes = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: 'bellauth'
    },
    handler: function(request, reply) {
      reply({'part1': 'part1'}).code(200);
    }
  }, {
    method: 'GET',
    path: '/auth/',
    config: {
      auth: 'bellauth'
    },
    handler: require('./actions/local')
  }
];

module.exports = AuthRoutes;
