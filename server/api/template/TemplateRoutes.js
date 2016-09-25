'use strict';
//let Joi = require('joi');

let Validator  = require('./validators/request.validator');
const basePath = '/template';

module.exports = [
  {
    method: 'GET',
    path: basePath + '/list/{type?}',
    config: {
      validate: {
        params: Validator.getListParameterValidator(),
        query: Validator.getListQueryValidator()
      }
    },
    handler: require('./actions/list')
  },

  {
    method: 'POST',
    path: basePath + '/create',
    config: {
      validate: {
        payload: Validator.getPostValidator()
      }
    },
    handler: require('./actions/create')
  },

  {
    method: ['POST', 'PUT'],
    path: basePath + '/update',
    config: {
      validate: {
        payload: Validator.getUpdateValidator()
      }
    },
    handler: require('./actions/update')
  }
]
