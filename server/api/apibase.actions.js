'use strict';

class ApiBaseActions {

  constructor(request, reply) {
    this.request   = request;
    this.response  = reply;
  }

  get requestBody() {
    return this.request.payload;
  }

  get requestParams() {
    return this.request.params;
  }

  get requestQuery() {
    return this.request.query;
  }

  get isAuthenticated() {
    let _r = this.request;
    return (_r.auth && (_r.auth.isAuthenticated === true));
  }

  response(statusCode, responseBody) {
    return this.response(responseBody).code(statusCode);
  }
}

module.exports = ApiBaseActions;
