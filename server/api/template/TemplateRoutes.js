'use strict';
let Joi = require('joi');
const basePath = '/template';

module.exports = [
  {
    method: 'GET',
    path: basePath + '/list/{type?}',
    config: {
      auth: false,
      validate: {
        params: {
          type: Joi.any().valid(process.env.TEMPLATE_PARTS.split(','))
        }
      }
    },
    handler: require('./actions/list').handler
  },

  {
    method: 'POST',
    path: basePath + '/create',
    config: {
      auth: false
    },
    handler: require('./actions/create').handler
  },

  {
    method: ['POST', 'PUT'],
    path: basePath + '/update',
    config: {
      auth: false
    },
    handler: require('./actions/update').handler
  }
]
