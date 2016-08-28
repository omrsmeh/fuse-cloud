'use strict';

let BaseActions = require('./base.action');

class CreateTemplates extends BaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  processRequest() {
    let newTemplate = super.resources.save(super.requestBody);

    newTemplate.then((template) => {
      return super.response(201, {error: false, data: template});
    }).catch((e) => {
      return super.response(200, {error: true, message: e});
    })
  }
}

module.exports = (request, reply) => {
  let creator = new CreateTemplates(request, reply);
  creator.processRequest();
}
