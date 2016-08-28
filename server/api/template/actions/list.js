'use strict';

let BaseActions = require('./base.action');

class ListTemplates extends BaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  processRequest() {
    let resource  = super.resources;
    let parameter = super.requestParams;
    let content   = null;

    switch (parameter.type) {
      case 'header':
        content = resource.findHeaders();
        break;
      case 'footer':
        content = resource.findFooters()
        break;
      case 'menu':
      case 'popups':
      case 'carousel':
      case 'form':
      case 'list':
        content = resource.findByGroup(parameter.type);
        break;
    }

    content.then((t) => {
      return super.response(200, {error: false, data: t});
    })
    .catch((e) => {
      return super.response(200, {error: true, message: e});
    })
  }
}

module.exports = (request, reply) => {
  let handler = new ListTemplates(request, reply);
  return handler.processRequest();
};
