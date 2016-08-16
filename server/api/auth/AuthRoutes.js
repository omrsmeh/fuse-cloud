'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/auth',
    config: { auth: false },
    handler: require('./actions/local').handler
  }
]
