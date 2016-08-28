'use strict';

let BaseActions = require('./base.action');

class ListTemplates extends BaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  paginateContent(content, limit, page) {
    limit   = parseInt(limit ? limit : process.env.PAGINATION_LIMIT);
    page    = parseInt(page ? page : 1);
    content = content.limit(limit);
    content = content.skip((limit * (page - 1)))
    return content;
  }

  processRequest() {
    let resource  = super.resources;
    let parameter = super.requestParams;
    let query     = super.requestQuery;
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
      default:
        content = resource.find({});
        break;
    }

    this.paginateContent(content, query.limit, query.page).then((t) => {
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
