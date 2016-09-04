'use strict';

let _ = require('lodash');
let BaseActions = require('./base.action');

class UpdateTemplates extends BaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  processRequest() {

    let newTemplate = super.resources.findOne({
      "_id": super.requestBody.id+''
    });

    newTemplate.then((template) => {
      template.increment();
      template = _.merge(template, super.requestBody);
      return template.save();
    })
    .then((t) => {
      return super.response(200, {error: false, data: t});
    })
    .catch((e) => {
      return super.response(200, {error: true, message: e});
    });
  }
}

module.exports = (request, reply) => {
  let creator = new UpdateTemplates(request, reply);
  creator.processRequest();
}
