'use strict';

let Joi = require('joi');

class RequestVaildator {

  getListParameterValidator() {
    return {
      type: Joi.any().valid(process.env.TEMPLATE_PARTS.split(','))
    }
  }

  getListQueryValidator() {
    return {
      page: Joi.number().min(1),
      limit: Joi.number().min(parseInt(process.env.PAGINATION_LIMIT))
    }
  }

  getPostValidator() {
    return {
      name: Joi.string().min(5).max(35).required(),
      group: Joi.any().valid(process.env.TEMPLATE_PARTS.split(',')).required(),
      subgroup: Joi.string().min(5).max(35),
      content: Joi.object().keys({
        html: Joi.string().required(),
        css: Joi.string(),
        js: Joi.string(),
        engine: Joi.string()
      }).required(),
      viewareas: Joi.array()
    }
  }

  getUpdateValidator() {

    let updateValidator = this.getPostValidator();
    updateValidator.id  = Joi.string().alphanum().min(24);

    return updateValidator;
  }

}

module.exports = new RequestVaildator();
