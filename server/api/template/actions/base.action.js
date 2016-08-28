'use strict';

class BaseTemplateActions {

  constructor(request, reply) {
    this.request   = request;
    this.response  = reply;
    this.dbResorce = request.server.settings.app.templates;
  }

  get requestBody() {
    return this.request.payload;
  }

  get resources() {
    return this.dbResorce
  }

  get requestParams() {
    return this.request.params;
  }

  get requestQuery() {
    return this.request.query;
  }

  response(statusCode, responseBody) {
    return this.response(responseBody).code(statusCode);
  }
}

module.exports = BaseTemplateActions;
